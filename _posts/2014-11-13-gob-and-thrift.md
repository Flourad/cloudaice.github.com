---
layout: post
title: "Go语言中Gob与Thrift的测试"
description: ""
category: default
published: true

---
{% include JB/setup %}


Golang提供了一个服务器之间传输数据的包Gob。使用这个包可以轻松的在服务器之间传递Go语言内置类型的数据。使用的时候只需要调用`Encode`和`Decode`两个方法，不需要关注内部的数据传输细节。同时thrift从0.9.1版本（目前最新的thrift版本是0.9.2）开始，实现了对Go语言的支持。最近在重新设计日志系统，涉及到数据传输，就考虑到使用Gob还是Thtift。这里的关注点比较多：发送相同大小的数据量，发送端占用机器的CPU资源多少，占用机器内存资源的大小，占用的带宽大小；另外还要考虑协议本身的通用性。于是对Gob和Thrift两种传输格式进行了测试。

### 基本信息

CPU型号：`i7-3770 CPU @ 3.4GHz`

Thtift定义：

    enum ResultCode
    {
        OK,
        TRY_LATER
    }
    
    struct LogEntry
    {
        1:    string    hostname,
        2:    string    message
    }
    
    service proxyTrans {
        ResultCode    Log(1: list<LogEntry> messages);
    }
    
Gob传输格式：
    
    type LogEntry struct {
        Hostname    string
        Message      string
    }


日志内容：

日志为一条400B大小的Nginx标准日志。

### 测试
针对Gob和Thrift分别编写客户端和服务端代码

Gob客户端代码：

    func main() {
        pdr, err := trans.NewProducer(":9102", false)
        if err != nil {
	       log.Printf("NewProducer: %v\n", err)
	   }
	   defer pdr.Close()
	   var count = 0
	   ticker := time.NewTicker(time.Second)
	   for {
	       select {
	       case <-ticker.C:
                log.Println(count)
                count = 0
            default:
		       var buf []*trans.LogEntry
		       for i := 0; i < 200; i++ {
			      entry := &trans.LogEntry{
			          Hostname: "",
				     Message:  logData,
                    }
			      buf = append(buf, entry)
			  }
			  err = pdr.SendArray(buf)
			  if err != nil {
			      log.Printf("SendArray error: %v\n", err)
			  }
			  count += 200
			  time.Sleep(time.Millisecond)
		   }
	   }
    }

Gob服务端代码：

    type Handler struct {
    }

    func NewHandler() *Handler {
	    return &Handler{}
    }

    func (h *Handler) Handle(conn net.Conn) {
	    cmr, err := trans.NewConsumer(conn, false)
	    if err != nil {
		    log.Printf("NewConsumer error: %v\n", err)
		    return
	    }
	    defer cmr.Close()
	    for {
		    msgs, err := cmr.Receive()
		    if err != nil {
			    if err == io.EOF {
				    log.Printf("Close Conn")
				    return
			    }
			    log.Printf("Receive error: %v\n", err)
			    return
		    }
		    _ = msgs
	    }
    }

    func main() {
	    server := &Server{":9102", NewHandler()}
	    log.Println(server.ListenAndServe())
    }

测试结果：

| 描述     | CPU%  | MEM | QPS  | Network |
| --------- |:----------:|: --------:|:------:| ------- :|
| Agent  | 20.6 | 2728 | 16.2万 | 60MB/s |
| Server | 37    | 5028 | 16.2万 | 60MB/s |

| 描述     | CPU%  | MEM | QPS  | Network |
| --------- |:----------:|: --------:|:------:| ------- :|
| Agent  | 44.5 | 2728 | 115万 | 425MB/s |
| Server | 137  | 5028 | 115万 | 425MB/s |

* 第一张表格在每次批量发送了200条日志之后Sleep 1 毫秒。
* 第二张表格一直持续发送日志，中间不会Sleep。

Thrift客户端代码：

    func main() {
        tSocket, err := thrift.NewTSocket(HOSTPORT)
	    if err != nil {
		   log.Printf("NewTSocket error: %v\n", err)
	    }

	    transport := thrift.NewTFramedTransport(tSocket)
	    protocolFactory := thrift.NewTBinaryProtocolFactoryDefault()
	    client := translate.NewProxyTransClientFactory(transport, protocolFactory)
	    if err := transport.Open(); err != nil {
		    log.Printf("transport.Open error: %v\n", err)
	    }
	    defer transport.Close()

	    var count = 0
	    ticker := time.NewTicker(time.Second)
	    for {
		    select {
		    case <-ticker.C:
			    log.Println(count)
			    count = 0
		    default:
			    var buf []*translate.LogEntry
			    for i := 0; i < 200; i++ {
				    entry := &translate.LogEntry{
					    Hostname: "",
					    Message:  logData,
				    }
				    buf = append(buf, entry)
			    }
			    code, err := client.Log(buf)
			    if err != nil {
				    log.Printf("Log error: %v, code: %d\n", err, code)
			    }
			    count += 200
			    time.Sleep(time.Millisecond)
		    }
	    }
    }

Thrift服务端代码：

    type proxyTrans struct{}

    func (pt *proxyTrans) Log(msgs []*translate.LogEntry) (translate.ResultCode, error) {
	    _ = msgs
	    return translate.ResultCode_OK, nil
    }

    func main() {
	    transportFactory := thrift.NewTFramedTransportFactory(thrift.NewTTransportFactory())
	    protocolFactory := thrift.NewTBinaryProtocolFactoryDefault()
	    serverTransport, err := thrift.NewTServerSocket(NetworkAddr)
	    if err != nil {
		    log.Printf("NewTServerSocket error: %v\n", err)
		    return
	    }

	    processor := translate.NewProxyTransProcessor(&proxyTrans{})
	    server := thrift.NewTSimpleServer4(processor, serverTransport, transportFactory, protocolFactory)
	    log.Println(server.Serve())
    }

测试结果：

| 描述     | CPU%  | MEM | QPS  | Network |
| --------- |:----------:|: --------:|:------:| ------- :|
| Agent  | 23.6 | 2984K | 10.5万 | 40MB/s |
| Server | 45.5 | 5540K | 10.5万 | 40MB/s |

| 描述     | CPU%  | MEM | QPS  | Network |
| --------- |:----------:|: --------:|:------:| ------- :|
| Agent  |  41     | 3244 | 27.5万 | 103MB/s |
| Server | 105.5 | 5540 | 27.5万 | 103MB/s |

### 结论

针对测试结果进行简单地对比，发现仅仅从数据传输的角度看，Gob在吞吐量，资源利用率等方面都要优于Thrift。这样的结果也比较容易接受，显然一次thrift的调用需要消耗的时间比一次Gob的写入要长，thrift每次调用都是带Ack的，必须等待上一次调用结果确认成功之后才会发起下一个调用。而Gob只是需要写网络即可，没有等待调用结果的返回确认。因此在日志传输上我会倾向于使用Gob。但是缺点是不通用，客户端只能使用Go来实现，其它第三语言无法顺利接入，因此在实现Gob传输协议之后，我会实现一套Thrift的传输方案，同事也提供了一种确定性的网络传输方式。

最后还测试了使用Golang的zlib库压缩过滤之后的Gob传输性能，压缩效率真的很高，从上百兆直接压缩到几兆，可能我传输的都是同一个字符串的原因，但是对CPU的使用率也是翻了3倍左右。实际上对于日志收集系统而言，CPU比带宽更敏感，应用服务器的网卡都是千兆网卡，一般都是跑不满，但是CPU资源在业业务繁忙的时候可能会跑的比较满，作为底层的日志收集系统就不要占用过多的CPU资源了。

* 完整的测试代码地址：[thriftAndGob](https://github.com/cloudaice/thriftAndGob)
* 查看网络流量大小：`dstat -n -N lo`
