---
layout: post
title: "Go语言HTTP包浅谈（二）"
description: "golang http"
category: default
published: true

---
{% include JB/setup %}

在[Go语言HTTP包浅谈一](http://cloudaice.com/golang-http-analysis/)中讲解了Server和Handler这两个结构，接下来深入讲解一个http请求是如何被解析和处理的。

越看Go的`net/http`就会越觉得`Handler`这个接口设计的巧妙，至少你会发现很多关于Go的web中间件都是在`Handler`接口上做文章的。

http包内部使用`Handler`接口最有效的例子就是他的路由`mux`模块。因此开发实际上是可以自己实现一个单独的路由的。甚至实现一个链状的嵌套中间件模型，[negroni](https://github.com/codegangsta/negroni)就是利用了这种特性实现的一种中间件模型。

`Server`结构体有一个`Serve`方法，它的主要工作是接口一个TCP连接，经过简单的判断确定无错误之后，基于这个TCP连接创建一个新的连接对象。然后使用`go`关键字调用该对象的一个私有方法`serve`，启动一个单独的`groutine`处理随后的逻辑。主协程继续等待下一个连接的建立。打字模型如下：

     for {
          rw, err := l.Accept()
          if err != nil {
              // do something
          }
          c, err := newConn(rw)
          if err != nil {
              continue
          }
          go c.serve()
     }

关键点在`newConn`和`serve`这两个方法中。

`http`内部声明了一个私有的结构体`conn`。用于包装一个TCP连接。

    type conn struct {
        remoteAddr string
        server *Server
        rwc *net.Conn
        buf *bufio.ReadWriter
        ......
    }
    
在`conn`对象中包含了`Server`对象，`conn`对象本身是在`Server`对象中产生的，本身又包含了`Server`对象，这种用法在我刚开始看的时候，觉得很新奇，但是渐渐地发现，其实这在Golang里面是一件很常见的事情。`rwc`表示原生的TCP连接句柄。`buf`是对TCP句柄的一个包装，使用了`bufio.Reader`和`bufio.Writer`来封装。同时这两个封装是对具有读写方法的对象最常见的封装。其实newConn主要就是做了这么一件事情。

`serve`方法进来之后，使用了`defer func`，并且在函数内部使用了recover，防止用户处理请求的时候出现运行时错误导致整个web服务挂掉。然后在一个for循环里面调用了`readRequest`方法。在这个方法里面做了所有HTTP协议解析工作。把TCP字节流解析成HTTP协议请求中报文中对应的header和body。应用开发者可以通过调用相应的函数来获得对应的数据体。这一步完成之后，就开始调用`Handler`的`ServeHTTP`方法了，首先传递给路由模块处理，然后根据用户注册的url和处理函数对应关系，调用相应的处理函数。在调用这些处理函数的时候，同时传递了一个ResponseWriter接口，用于写入返回给客户端的数据。这里，由于http包本身使用了bufio模块，并且设置了固定大小的缓存区（4KB）。因此，对于小数据量的写入会有一定的性能影响，尤其，http包为了兼容`chunked`传输方式，会额外建立2KB的bufio缓存区，并且会先写入该缓存区。在源码TODO里面表示了要改进。但是对于一般的应用，这一点应该不会有太大的影响。
