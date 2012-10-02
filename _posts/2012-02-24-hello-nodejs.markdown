---
layout: post
title: "hello nodejs"
date: 2012-02-24 11:46
comments: true
categories: nodejs
---

###first meet nodejs

说起来也是挺巧的，一天,在新浪微博中浏览，无意间发现有个开源社区的关注者发了一条[nodeclub][1]发布的消息。
于是顺着链接点击进去，看着网页界面就是给人一种很清新的感觉，也感觉特别的熟悉，后来一想，<!--more-->
和[V2EX][2]的界面风格有些像。其实之前就很喜欢V2EX的界面风格。由于是新建立的社区，
里面的东西都感觉很舒服。
虽然我之前也有听过nodejs的相关事情，但是一直都没有怎么关注，只是知道它是在服务器端的javascript脚本语言。
对于我自己而言，一直对前端的设计感到无力。因为开始学的时候，就觉得自己没有什么艺术设计细胞。
我可以想象出我自己想要的效果，但是要是让我自己去实现，往往会很沮丧，有好多的时候，为了设计一张自己
满意的页面，要花费很多的时间，往往会在几个px之间纠结，最终也是失望而归。
所以我觉得自己不适合设计前端页面，但是，提提建议还行。
因为如此，也一直没有怎么接触javascript.因此也没有怎么关注nodejs。不过这次在社区的相遇，
第一要素完全是因为nodeclub这个社区的优雅设计。而且还开放源代码，更加方便的是，源代码就在github上面，
简直就是送到嘴边的肉啊(*^__^*) ，让我对它的源代码产生很大的兴趣。于是果断安装node,至于mongodb，哈哈，
自己最近也正是在研究的东西，于是一切都很顺利。就把网站在虚拟机里面起来了。自己还用压力测试软件无聊的
对它进行压力测试，在并发不是很高的情况下，效果异常好，不过好像在很高的并发下。我的内存就不够了。
不管怎么样，与nodejs的相遇就这样开始了。

###安装node

安装node很简单。这里顺便也讲怎样把这个nodeclub论坛搭建起来。主要四个步骤：

>安装mongodb
>
>这个步骤在我的[mongodb小记][3]里面详细讲解了

* * *

>安装node
>
>在ubuntu下面先使用下面命令安装一些可能要依赖到的软件包，在我安装的时候出现缺少openssl的警告。
>

    sudo apt-get install g++ curl libssl-dev apache2-utils

>然后去nodejs的[官方网站][8]下载源码包，`tar.gz`为后缀名的压缩包。解压压缩包：
>

    tar -xf node-v0.xxxxxxxx.tar.gz
    cd node-xxxxxxx
    ./configure
    make 
    sudo make install

>和安装一般的软件一样，很简单，不过在这里要提醒一下，在执行`./configure`的时候，注意输出的信息，
>看看每一项是否都是OK的。如果提示缺少某个软件包，那么就下载安装软件包，然后再`./configure`。
>直到一切OK，另外编译的时候比较慢，要耐心等待一会儿。

* * *

>安装npm
>
>安装npm就比较简单了，根据[官方网站][9]的意见，直接运行一条命令，就OK了

    curl http://npmjs.org/install.sh | sh

>安装的时候，还是直接去官方网站看比较好，时间不同，可能会有一些变化。

* * *

>配置nodeclub网站
>
>先去[nodeclub][10]的github版本库下载项目代码，可以用git，也可以自己打包下载。切换到项目的目录
>执行下面命令，安装项目程序依赖的node包

    npm install ./

安装完成之后，你会发现项目中多了一个`node_modules`的目录，这个目录中就是存放着安装的依赖包。
然后，你要修改配置文件，使得能够符合自己的项目要求，在原项目中有一个config.default.js文件。
我们把它复制一份。并且重命名成config.js。修改里面的内容。主要是修改邮箱信息，因为注册的时候，
论坛采用邮箱验证的方法。所以你要申请一个邮箱，专门用作论坛系统邮箱。

>port:设置监听的端口号；  
>mail_user:设置你用来当作系统邮箱的邮箱名称  
>mail_pass:填写邮箱密码   
>mail_host:看你是什么邮箱，例如是gmail邮箱的话，就填写`smtp.gmail.com`  
>mail_sender:填写邮箱名称  

到这里为止，基本的配置就已经完成了，接下来就是启动应用了。首先，要启动mongodb，
这个方法可以在[这里][3]查看。
然后切换到nodeclub的目录，你会看到有一个'app.js'文件，这个文件就是项目的入口文件。
执行一下命令：

    npm app.js

如果权不够，那么就加上`sudo`
这样，你在浏览器中输入`localhost`再加上你自己设置的端口号，就可以访问你自己的论坛了。

###这几天学习的感想

这几天都在社区里面逛，学完了那本入门书籍，也照着例子写了一些代码。感觉还行，
尽管自己之前并没有怎么写过javascript代码。对前端也不怎么熟悉，不过学的时候，
感觉代码风格很像C语言，但是整体的语言风格机制又很像我学的python。也是刚刚写完一个python小项目，
因此，感觉还是听容易的。只是因为它是单线程的，因此在编写代码的时候，就要考虑阻塞和非阻塞的问题。
下面推介一下自己读的感觉比较好的文章吧：

+ [node入门][4]，不用说，是最好的入门教材。
+ [nodejs 脱离浏览器的javascript][5] 一个很炫的网站。
+ [什么是node][6]  分析的非常好的文章
+ [我为什么向后端工程师推介nodejs][7] 能够让你了解node更深一点。
+ 随后也是最好的地方，那就是[nodeclub][1]啦。




[1]:http://club.cnodejs.org/
[2]:http://www.v2ex.com/
[3]:http://www.cloudaice.com/blog/mongodb-shi-yong-xiao-ji.html
[4]:http://nodebeginner.org/index-zh-cn.html
[5]:http://fengmk2.github.com/ppt/qcon2011/index.html#slide-0
[6]:http://jayli.github.com/whatisnode/index.html
[7]:http://cnodejs.org/blog/?p=780
[8]:http://nodejs.org/
[9]:http://npmjs.org/
[10]:https://github.com/muyuan/nodeclub
