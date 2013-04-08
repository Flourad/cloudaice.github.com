---
layout: post
title: "mongodb cooks"
date: 2012-02-21 14:45
comments: true
category: mongodb

---

+  导引
   +  [安装](#q1)
   +  [配置启动和停止](#q2)
   +  [使用](#q3)


+  <h3 id = "q1">安装</h3><!--more-->
之前写的一片mongodb使用小记过于简单，当时自己觉得没有必要详细写作，因为很多自己看文档就可以轻松搞定了，
但是到自己要重新使用的时候，发现有些还是很容易忘记的。看文档固然可以理解，但是花费时间比较长，
还有一点，文档都是面向大众话的，语言讲的覆盖比较广，但是却不细，现在重新记载一下使用过程，
以便以后快速参考。  
   1. 去mongodb的[官方网站][1]下载和自己的机器相适应的.tar.gz压缩包。
   2. 使用一下命令解压缩：`tar zxf mongodb-linux-xxx...`
   3. 创建一个数据库存储的目录，mongodb默认会使用**/data/db**目录，因此，我们需要创建该目录，
同时要给目录加上一定的权限，可以使用以下命令：__根据自己的情况，使用root权限操作。__
          mkdir -p /data/db
          chown -R $USER:$USER /data/db
   4. 切换到自己刚才解压出来的mongodb目录，会发现有一个`bin`目录，进去之后，会发现里面全部是可执行文件，
在该目录下执行
          ./mongod
      mongodb数据库就可以以默认的方式启动了。

+  <h3 id = "q2">配置启动和停止</h3>
上面我们已经以默认的方式让mongodb启动了，但是在实际中，对于启动有多种配置方式。
使用下面命令可以查看都可以配置那些配置方式：

        ./mongod --help

现在简单介绍一下一些常用的配置参数  
**--dbpath** [数据目录地址]  
用于指定数据存储目录，默认情况下,使用`\data/db`.在mongodb中，
每个mongod进程只能用一个单独的数据目录，注意这里指的是每个mongodb进程示例，并不是指数据库。
因此每个数据目录下面都有一个mongod.lock文件。当有多个mongod进程使用同一个数据目录的时候，
就会报错。

**--port** [端口号]  
指定mongod启动的时候监听的端口号，默认情况下是27017。

**--fork**  
让mongod以守护进程启动

**--config** [配置文件]  
在这里可以制定,mongod启动的时候的配置文件，配置文件主要就是命令行参数的一些集合，写法为`键=值`,
像fork这些参数，使用true或者false。下面是一个配置文件示例

        # my mongod config
        port = 20000
        fork = true
        logpath = mongodb.log

**--logpath** [log文件]  
指定输出的log文件

在mongod启动后都会有一个轻量的http端口开放，该端口号为mongod启动端口的值加上1000。
因此你可以在浏览器中输入`localhost:28017`(默认端口)来访问web页面。里面会有一些关于mongodb的运行信息。
但是有的时候为了安全原因，你可以关闭该端口，只要你在启动的时候加入`--nohttpinter-face`。另外，还可以
使用参数`--bindip localhost`,指定本机访问。还有一个在实际中要用的参数，`--auth`，加上这个参数之后启动
mongodb。在客户端连接mongodb服务器之后，当执行一些操作的时候，就需要认证。这就要和用户名权限相关联了。
同时也有一个root账户。

有两种普遍的方法可以停止mongodb数据库运行:  
**1，**当mongodb是在终端运行的时候，可以直接按下`Ctri+C`，来终止mongodb进程。 

**2，**当mongodb以守护进程的方式运行的时候，使用以下命令：
`kill -2 [mongodb进程号]`其中mongodb进程号，可以使用`ps -ef | grep mongod`来查看。

<h3 id = "q3">使用</h3>

启动mongodb服务进程之后，mongodb自带有一个客户端程序，也是在bin目录下。运行`./mongo`就可以启动客户端
界面。这是一个典型的shell界面，可以在这里面进行对数据库的操作。不过在这个shell有一个比较特别的地方，
就是可以使用javascrip。它会自动解析javascrip语言。下面记录一下使用python的接口操作mongodb的过程。  
首先，你会发现你至少可以搜到这样的三个python扩展库：`pymongo`,`mongoengine`,`django-mongodb`。
这些都是python操作mongodb的接口。它们之间的关系大自是这样字的。`pymongo`相当于是一个比较low level
的driver。仅仅是可以用python语言与数据库交互。因此相对来说是比较底层的驱动而已。而其它两种则是
object relation mapping，也就是ORM。经过对象抽象化的，相对而言要高层一些。比如我们在用django
这些web框架编写应用的时候，就会选择使用这些ORM。下面记录pymongo这个扩展包操作数据库的方法。
>安装python很简单，就像安装其他python的扩展库一般，使用`easy_install`或者`pip`都一样。安装完之后，
进入python命令行。

建立连接：建立连接的时候，只是和mongodb进程连接

    from pymongo import Connection
    connection = Connection()
    #another way to connection
    connection = Connection('localhost',27017)

选择连接数据库：如果该数据库不存在，则会自动创建

    db = connection.blog
    #如果有安全验证的话,要执行以下语句进行认证
    db.authenticate(user,password)

选择一个集合：在mongodb中是以库，集合，文档这样的结构组织的

    blogs = db.blogs

尝试在mongodb中插入一个文档：

    post={"author":"jom","text":"this is my first blog","tag":["mongodb","python"]}
    blogs.insert(post)

查询文档：

    #find one document
    blogs.find_one()
    #寻找全部符合一定要求的文档
    blogs.find({"author":"jom"})
    #list all documents
    blogs.find()



[1]:http://www.mongodb.org
