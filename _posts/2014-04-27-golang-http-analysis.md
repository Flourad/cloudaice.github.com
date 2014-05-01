---
layout: post
title: "Go语言HTTP包浅谈（一）"
description: "Golang http web"
category: default
published: true

---
{% include JB/setup %}

使用Golang进行Web开发，HTTP包的使用是离不开的。但是相比net包，http相对要逊色很多，这个从http包源码中的注释也可以轻易看出来，不少的TODO都写着要优化。好在1.3对http包的[优化粒度](http://tip.golang.org/doc/go1.3#major_library_changes)还是挺大的，尤其是`sync.Pool`的加入，对于在高并发下，频繁申请读写buffer优化非常大。查看1.3对包的优化描述，是不是也间接说明了原来的http的不足。

使用http进行编程最常见的方式如下：

    func ServeApi(w http.ResponseWriter, r *http.Request){
        // do something
        io.WriteString(w, "this is api")
    }
    
    func ServerHandle() {
        http.HandleFunc("/api", ServeApi)
        err := http.ListenAndServe(":8080", nil)
        if err != nil {
            log.Fatal(err)
        }
    }

    func main(){
        ServeHandle()
    }
    
在这段代码里面基本都使用了http包内部默认的配置。对于一般的小应用也足够应付了，但是对于大并发量的服务，还是需要优化很多东西的。下面来具体分析一下。

### Server结构

http包种的server.go文件是请求的入口，同时也是整个http包的核心文件。其中就定义http包种最重要的一个结构`Server`，其定义如下：

    // A Server defines parameters for running an HTTP server.
    type Server struct {
	    Addr           string        
	    Handler        Handler       
	    ReadTimeout    time.Duration 
	    WriteTimeout   time.Duration 
	    MaxHeaderBytes int           
	    TLSConfig      *tls.Config   
	    TLSNextProto map[string]func(*Server, *tls.Conn, Handler)
    }

除去`TLS`相关的之外，一共有5个可以公共访问的变量：

+ Addr  
  >服务监听地址
+ Handler  
  >实现Handler接口的对象  
+ ReadTimeout
  >读超时时间
+ WriteTimeout
  >写超时时间
+ MaxHeaderBytes
  >读取头数据的最大值

`ReadTimeout`是读取TCP连接中的数据的超时时间，设置这个值有以下用处：

1. 避免长时间读取请求数据时候长时间阻塞
2. 在客户端以`Keep Alive`方式发起请求的时候，如果下一次请求迟迟不来，而服务端没有设置`ReadTimtout`值，则服务端会长时间挂起连接，而有读不到数据，这页很容易被用来攻击。

其它几个参数根据自己业务需求设置相应的值即可（Handler会在后面讲解），然后调用`Server`的方法`ListenAndServe()`就可以启动Web服务了。

### Handler

Handler接口在http包里面算是一个比较神奇的接口。其定义如下：

    type Handler interface {
            ServeHTTP(ResponseWriter, *Request)
    }
    
也就是说实现了`ServeHTTP(ResponseWriter, *Request)`方法的对象也就是实现了`Handler`接口。跟踪一个请求的处理过程，会发现它是穿过一个接着一个的`ServeHTTP`方法最后到达业务处理函数的。这种情景在写返回体的时候再次重现了。其实`ServeHTTP`这个方法也为用户实现http中间件提供了一种方式。

一般情况下，在Server结构体内赋值的Handler是http包里的`ServeMux`结构体的对象。因为该对象实现了对请求的路由方法，当然，也可以使用自己实现的路由对象。因此在实例化`Server`对象的时候，应该使用自己声明的Handler，而不是使用http默认的Handler。在调用`ServeHTTP`方法的时候，该Handler会根据用户注册的路由规则，调用相应的用户实现的逻辑处理函数来处理请求，但是最终都是在实现`ServeHTTP(ResponseWriter, *Request)`这个方法。那么在启动Web服务之后，是怎样从TCP连接中读取数据并且解析的呢？这就涉及到http包的核心功能了，下篇再分析。



