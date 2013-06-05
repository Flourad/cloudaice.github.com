---
layout: post
title: "使用tornado的coroutine进行编程"
description: "programming with tornado'coroutine"
category: Python
published: true

---
{% include JB/setup %}

在tornado3发布之后，强化了`coroutine`的概念，在异步编程中，替代了原来的`gen.engine`，
变成现在的`gen.coroutine`。这个装饰器本来就是为了简化在tornado中的异步编程。避免写回调函数，
使得开发起来更加符合正常逻辑思维。一个简单的例子如下：

    class MaindHandler(web.RequestHandler):
        @asynchronous
        @gen.coroutine
        def post(self):
            client = AsyncHTTPClient()
            resp = yield client.fetch(https://api.github.com/users")
            if resp.code == 200:
                resp = escape.json_decode(resp.body)
                self.write(json.dumps(resp, indent=4, separators=(',', ':')))
            else:
                resp = {"message": "error when fetch something"}
                self.write(json.dumps(resp, indent=4, separators={',', ':')))
            self.finish()
                
在`yield`语句之后，`ioloop`将会注册该事件，等到`resp`返回之后继续执行。这个过程是异步的。在这里使用`json.dumps`，而没有使用`tornado`自带的`escape.json_encode`，是因为在构建`REST`风格的`API`的时候，往往会从浏览器里访问获取`JSON`格式的数据。使用`json.dumps`格式化数据之后，在浏览器端显示查看的时候会更加友好。`Github API`就是这一风格的使用者。其实`escape.json_encode`就是对`json.dumps`的简单包装，我在提[pull request](https://github.com/facebook/tornado/pull/781)要求包装更多功能的时候，作者的回答`escape`并不打算提供全部的`json`功能，使用者可以自己直接使用`json`模块。


Gen.coroutine原理
--------------

在之前一篇博客中讲到要使用到tornado的异步特性，必须使用异步的库。否则单个进程阻塞，根本不会达到异步的效果。
Tornado的异步库中最常用的就是自带的AsyncHTTPClient，以及在其基础上实现的OpenID登录验证接口。另外更多的异步库可以在[这里](https://github.com/facebook/tornado/wiki/Links)找到。包括用的比较多的`MongoDB`的`Driver`。

在3.0版本之后，`gen.coroutine`模块显得比较突出。`coroutine`装饰器可以让本来靠回调的异步编程看起来像同步编程。其中便是利用了`Python`中生成器的`Send`函数。在生成器中，`yield`关键字往往会与正常函数中的`return`相比。它可以被当成迭代器，从而使用`next()`返回`yield`的结果。但是生成器还有另外一个用法，就是使用`send`方法。在生成器内部可以将`yield`的结果赋值给一个变量，而这个值是通过外部的生成器`client`来`send`的。举一个例子:

    def test_yield():
        pirnt "test yeild"
        says = (yield)
        print says
        
    if __name__ == "__main__":
        client = test_yield()
        client.next()
        client.send("hello world")
        
输出结果如下：

    test yeild
    hello world
    
已经在运行的函数会挂起，直到调用它的`client`使用`send`方法，原来函数继续运行。而这里的`gen.coroutine`方法就是异步执行需要的操作，然后等待结果返回之后，再`send`到原函数，原函数则会继续执行，这样就以同步方式写的代码达到了异步执行的功能。


Tornado异步编程
--------------
使用`coroutine`实现函数分离的异步编程。具体如下：

    @gen.coroutine
    def post(self):
        client = AsyncHTTPClient()
        resp = yield client.fetch("https://api.github.com/users")
        if resp == 200:
            body = escape.json_decode(resy.body)
        else:
            body = {"message": "client fetch error"}
            logger.error("client fetch error %d, %s" % (resp.code, resp.message))
        self.write(escape.json_encode(body))
        self.finish()
 
换成函数之后可以变成这样;

    @gen.coroutime
    def post(self):
        resp = yield GetUser()
        self.write(resp)
        
    @gen.coroutine
    def GetUser():
        client = AsyncHTTPClient()
        resp = yield client.fetch("https://api.github.com/users")
        if resp.code == 200:
            resp = escape.json_decode(resp.body)
        else:
            resp = {"message": "fetch client error"}
            logger.error("client fetch error %d, %s" % (resp.code, resp.message))
        raise gen.Return(resp)
        
这里，当把异步封装在一个函数中的时候，并不是像普通程序那样使用`return`关键字进行返回，`gen`模块提供了一个`gen.Return`的方法。是通过`raise`方法实现的。这个也是和它是使用生成器方式实现有关的。


使用coroutine跑定时任务
---------------------

Tornado中有这么一个方法：

    tornado.ioloop.IOLoop.instance().add_timeout()
    
该方法是`time.sleep`的非阻塞版本，它接受一个时间长度和一个函数这两个参数。表示多少时间之后调用该函数。在这里它是基于`ioloop`的，因此是非阻塞的。该方法在于客户端长连接以及回调函数编程中使用的比较多。但是用它来跑一些定时任务是我自己想出来的。通常跑定时任务也没必要使用到它。但是我在使用`heroku`的时候，发现没有注册信用卡的话仅仅能够使用一个简答`Web Application`的托管。不能添加定时任务来跑。于是就想出这么一个方法。在这里，我主要使用它隔一段时间通过`Github API`接口去抓取数据。大自使用方法如下：

+ 装饰器

    
        def sync_loop_call(delta=60 * 1000):
        """
        Wait for func down then process add_timeout
        """
            def wrap_loop(func):
                @wraps(func)
                @gen.coroutine
                def wrap_func(*args, **kwargs):
                    options.logger.info("function %r start at %d" %
                                        (func.__name__, int(time.time())))
                    try:
                        yield func(*args, **kwargs)
                    except Exception, e:
                        options.logger.error("function %r error: %s" %
                                             (func.__name__, e))
                    options.logger.info("function %r end at %d" %
                                        (func.__name__, int(time.time())))
                    tornado.ioloop.IOLoop.instance().add_timeout(
                        datetime.timedelta(milliseconds=delta),
                        wrap_func)
                return wrap_func
            return wrap_loop

+ 任务函数
        
        @sync_loop_call(delta=10 * 1000)
        def worker():
            """
            Do something
            """

+ 添加任务

        if __name__ == "__main__":
        worker()
        app.listen(options.port)
        tornado.ioloop.IOLoop.instance().start()
        
这样做之后，当`Web Application`启动之后，定时任务就会随着跑起来，而且因为它是基于事件的，并且异步执行的，所以并不会影响`Web`服务的正常运行，当然任务不能是阻塞的和计算密集型的。我这里主要是抓取数据，而且用的是`Tornado`自带的异步抓取方法。

在`sync_loop_call`装饰器中，我在`wrap_func`函数上加了`@gen.coroutine`装饰器，这样就保证只有`yeild`的函数执行完之后，才会执行`add_timeout`操作。如果没有`@gen.coroutine`装饰器。那么不等到`yeild`返回，就会执行`add_timeout`了。

完整地例子可以参见我的[Github](https://github.com/cloudaice/simple-data)


总结
---
Tornado是一个非阻塞的web服务器以及web框架，但是在使用的时候只有使用异步的库才会真正发挥它异步的优势，当然有些时候因为App本身要求并不是很高，如果不是阻塞特别严重的话，也不会有问题。另外使用coroutine模块进行异步编程的时候，当把一个功能封装到一个函数中时，在函数运行中，即使出现错误，如果没有去捕捉的话也不会抛出，这在调式上显得非常困难。
