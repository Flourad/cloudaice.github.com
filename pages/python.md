---
layout: page
title: "Python"
description: ""
---
{% include JB/setup %}

####去掉多余的空格和换行

    "".join(s.split())

####sqlite3相关的数据库操作

    import sqlite3
    conn = sqlite3.connect("db path")
    c = conn.cursor()
    c.execute("select ....")
    result = c.fetchall()

#####使用like语句的时候

    c.execute("select status room from tablename where status = ? and room like ?",[statusname,roomname])

####字符编码

**这是很头痛的事情**
+ 保证文件开发有"#coding:utf-8"
+ 出现问题的时候主要考虑unicode对象和unicode编码问题
+ 注意使用decode和encode函数

####python内存管理
python编程中，很多时候我们申请内存都是小块的内寻，而且使用完之后就会释放掉。如果每次都使用molloc和free的话，就会不断在内核和用户态之间交替，造成开销很大。
因此，简单的思想就是采用一个叫做内存池的技术。就是维持一块内存的大小，专门用来处理这些小的内寻申请。当某个变量引用计数为0的时候，并不是直接将这一块内存释放掉，
而是将其放在内存池当中。在python中有个专门控制内存池大小的常量。当申请的内存大小超过这个常量的时候，就会退化成amlloc。如果没有将限制内存池大小的符号打开的时候，
就会造成内存泄漏。因为某次你申请了一个很大的内存，而这次用完了可能下次就用不到了，而这块内存被当作内存池中的内存，就造成了内存泄漏。

####WSGI
关于WSGI，在用Django框架编写web应用的时候，就比较多的研究了下，当时也没有仔细记录下来，现在发现原来这是一个比较重要的概念。当时只是使用fastcgi把Django和nginx连接
上去了。关于fastcgi也看了不少关于它的描述，主要是讲相比于普通cgi。性能上有很大的提高，具体原因和线程的载入载出有关系。现在说说WSGI的内容。在部署一个网站的时候，
很明显需要两个部分：web服务器，网站应用程序。web服务器有apache，nginx，lighttpd，tonado等。于是我们要做的就是怎么把它们很好的连接起来呢。这个问题在我刚刚学web
的时候根本没有遇到，因为当时用PHP。环境本身就已经配好了。而python应用程序中，要和web服务器进行连接，一般有三种方式，CGI，FastCGI,mod_python。其中mod_python是针对
apache的。了解apache的就知道它就是apache的实现模块。有一个问题就是这几中方式各自都是不一样的，每一个python应用程序或者说应用程序框架可能需要做出三套这样字的接口，
或者更多的是只是支持其中一种接口方式，而WSGI就是web服务器和web应用程序之间的一种低级别的接口，提高web应用程序开发的共同性。在WSGI里主要有两方：服务器，应用程序。
通过WSGI中间件实现API的两方。起到两方互相连接的作用。WSGI所描述的标准的一种实现就是FLUP。这是python的一个第三方开源模块。以我自己搭建的网站为例，使用nginx服务器，
FLUP所处的位置应该是在fastcgi和django之间更加靠近django。对于FLUP，服务端便是fastcgi，应用程序就是django应用程序框架。最后总的而言，WSGI仅是一个规范标准和接口。

下面从网上摘录一段讲的比较好的解释

***
>Apache/lighttpd: 相当于一个request proxy，根据配置，把不同的请求转发给不同的server处理，例如静态的文件请求自己处理，这个时候它就像一个web server，
>对于fastcgi/python这样的请求转发给flup这样的Server/Gateway进行处理
>
>flup: 一个用python写的web server，也就是cgi中所谓的Server/Gateway，它负责接受apache/lighttpd转发的请求，并调用你写的程序 (application)，
>并将application处理的结果返回到apache/lighttpd
>
>fastcgi: apache/lighttpd的一个模块，虽然flup可以作为一个独立的web server使用，但是对于浏览器请求处理一般都交给 apache/lighttpd处理，
>然后由apache/lighttpd转发给flup处理，这样就需要一个东西来把apache/lighttpd跟flup联系起来，这个东西就是fastcgi，
>它通过环境变量以及socket将客户端请求的信息传送给flup并接收flup返回的结果
>
>web.py: 应该说有了上面的东西你就可以开始编写你的web程序了，但是问题是你就要自己处理浏览器的输入输出，还有cookie、session、
>模板等各种各样的问题了，web.py的作用就是帮你把这些工作都做好了，它就是所谓的web framework，另外一个出名的是django，不过感觉太复杂了，web.py差不多就够用了
>
>WSGI : 除了flup Server/Gateway外还有很多其他人的写的Server/Gateway, 这个时候就会出问题了，如果你在flup上写了一个程序，现在由于各种原因你要使用xdly了，
>这个时候你的程序也许就要做很多痛苦的修改才能使用 xdly server了，WSGI就是一个规范，他规范了flup这个服务应该怎么写，
>应该使用什么方式什么参数调用你写的程序(application)等，当然同时也规范你的程序应该怎么写了，
>这样的话，只要flup跟xdly都遵守WSGI的话，你的程序在两个上面都可以使用了，flup就是一个WSGI server
***
**注**: 摘自[http://www.douban.com/note/13508388/](http://www.douban.com/note/13508388/)

####pythonbrew
pythonbrew:这是python的版本管理工具，非常好用。具体安装方法如下：  
假设你当前的python版本是系统自己带的2.6.6采用下面命令安装

    $curl -kL http://github.com/utahta/pythonbrew/raw/master/pythonbrew-install | bash
    $. $HOME/.pythonbrew/etc/bashrc
    pythonbrew install 2.7.1
    pythonbrew switch 2.7.1
    python -V

这个时候你会发现自己的python版本已经是2.7.1了

    pythonbrew install 2.7.1 #安装某个python版本
    pythonbrew switch 2.7.1 #选择python的版本号
    pythonbrew list #列出当前系统安装的python版本
    pythonbrew list -k #列出目前可以安装的python版本
    pythonbrew uninstall 2.7.1 #卸载某个python版本
    pythonbrew update #升级pythonbrew
    pythonbrew off #禁用pythonbrew，使用系统自带的python

####pip使用命令
安装扩展包:  

    pip install packagename

卸载扩展包:  

    pip uninstall packagename

升级扩展包:

    pip install -upgrade packagename

####python中带星号的参数
写函数的时候有一个比较大的一类，那就是对于不定参数的函数。在C语言中使用`...`。在python中使用`*`。可以分为两类.  

* 位置参数  

**使用单个星号**

    def foo(*args):
        for arg in args:
            print arg

* 关键字参数  

**使用两个星号**

    def foo(**kwargs):
        for key,value in kwargs.items():
            print  "%s %s " %(key,value)


####python执行系统命令

    os.system("cmd") 
    
**cmd**表示要执行的命令

+ python matplotlib绘图手册[http://hyry.dip.jp/tech/book/page/scipy/matplotlib.html](http://hyry.dip.jp/tech/book/page/scipy/matplotlib.html)
+ [matplotlib绘图入门](http://www.cnblogs.com/wei-li/archive/2012/05/23/2506940.html)
