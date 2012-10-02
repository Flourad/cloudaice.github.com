---
layout: page
title: cloudaice 
tagline: Supporting tagline
---
{% include JB/setup %}

浮生此处，唯留微心


<ul class="posts">
  {% for post in site.posts %}
    <li><span>{{ post.date | date_to_string }}</span> &raquo; <a href="{{ BASE_PATH }}{{ post.url }}">{{ post.title }}</a></li>
  {% endfor %}
</ul>


###待阅读博客
+ 讲解git使用以及ruby语言的方法 [http://www.yangzhiping.com/](http://www.yangzhiping.com/)
+ 关于jekyll 
  + jekyll的github[https://github.com/mojombo/jekyll](https://github.com/mojombo/jekyll)
  + 讲解搭建jekyll-bootstrap的方法[http://jekyllbootstrap.com/](http://jekyllbootstrap.com/)

+ 关于python 
  + [python code test](http://docs.python-guide.org/en/latest/writing/tests/#the-basics)
  + [django+jquery](http://blog.csdn.net/thinkinside/article/details/7269378)
  + [运用Django的admin设置django项目的前端](http://blog.chinaunix.net/uid-20306166-id-687533.html)

+ 关于levelDB
  + [对levelDB于源码的解析](http://blog.xiaoheshang.info/?cat=26)
  + [levelDB的整体解析](http://www.cnblogs.com/haippy/archive/2011/12/04/2276064.html)
  + [levelDB资料整理](http://hideto.iteye.com/blog/1328921)
  + [levelDB代码库](http://code.google.com/p/leveldb/)

+ 关于算法
  + [B树，B+树...](http://blog.csdn.net/v_JULY_v/article/details/6530142)

+ 关于ruby
  + [devise验证使用的gem包](https://github.com/plataformatec/devise)
  + [devise包的介绍](http://hlee.iteye.com/blog/673058)

+ 关于mongodb
  + [mongodb学习系列](http://www.cnblogs.com/huangxincheng/category/355399.html)

+ 关于limux
  + [linux设备文件介绍](http://lamp.linux.gov.cn/Linux/device_files.html)
  + [linux系统编程](http://blog.csdn.net/woshixingaaa/article/category/719756)
  + [fdisk详解](http://blog.csdn.net/liumang_D/article/details/3895747)
  + [debian学习笔记](http://man.chinaunix.net/linux/debian/debian_learning/index.html)

###已阅读博客

+ [levelDB实例编写](http://qiuqiang1985.iteye.com/blog/1255365)
+ [如何从零开始学习ROR](http://huacnlee.com/blog/how-to-start-learning-ruby-on-rails/)
+ [什么是nodejs](http://www.infoq.com/cn/articles/what-is-nodejs)
+ [nodejs&npm安装和配置](http://www.infoq.com/cn/articles/nodejs-npm-install-config)
+ [深入nodejs模块机制](http://www.infoq.com/cn/articles/nodejs-module-mechanism)
+ [nodejs事件机制](http://www.infoq.com/cn/articles/tyq-nodejs-event)
+ [初探nodejs异步IO实现](http://www.infoq.com/cn/articles/nodejs-asynchronous-io)
+ [深入浅出REST](http://www.infoq.com/cn/articles/rest-introduction)

###待研究项目
+ jekyll
+ ruby on rails
+ nodejs
+ bootstrap
+ mqtt

###正在研究的东西
+ levelDB
+ 用fuse写文件系统  
+ 编写算术表达式测编译器

###散记

+ 关于vimwiki
  + [用vimwiki搭建自己的wiki世界](http://wiki.ktmud.com/tips/vim/vimwiki-guide.html)
  + [vimwiki使用介绍](http://www.berlinix.com/VimWiki.html#toc_1.1)
  + [vimwiki的github](https://github.com/vim-scripts/vimwiki)

+ 关于vim
  + [vim](http://wiki.hotoo.me/Vim.html)
  + [amix](http://amix.dk/blog/post/19486)
  + [易水博客](http://easwy.com/blog/archives/advanced-vim-skills-introduce-vimrc/)
  + [learn vim](http://yannesposito.com/Scratch/en/blog/Learn-Vim-Progressively/)
  + 编译安装vim73之后设置vim为系统默认编辑器  

        sudo update-alternatives --install /usr/bin/editor editor /usr/local/bin/vim 50 --slave /usr/share/man/man1/editor.1.gz editor.1.gz /usr/local/man/man1/vim.1.gz
       *** 
        sudo update-alternatives --install /usr/bin/vi vi /usr/local/bin/vim 50 --slave /usr/share/man/man1/vi.1.gz vi.1.gz /usr/local/man/man1/vim.1.gz 


+ 关于git
  + [git使用指南](https://sites.google.com/a/kingofat.com/wiki/git-tutorial)
  + [finding git](http://blog.jayway.com/2012/01/25/finding-with-git/)

###一些文档

+ [express中文手册](http://www.csser.com/board/4f77e6f996ca600f78000936#manual/creating-a-server)
+ [javascript参考教程](http://www.jb51.net/shouce/javascript/)
+ [rails官方文档](http://guides.rubyonrails.org/getting_started.html)
+ [mongoose文档](http://mongoosejs.com/)
+ [pymongo官方文档](http://api.mongodb.org/python/2.0.1/tutorial.html#indexing)
+ [mastering node 介绍nodejs的英文资料](http://visionmedia.github.com/masteringnode/book.html)
+ [fuse文件系统开发API](http://fuse.sourceforge.net/)
+ [express官方文档](http://expressjs.com/)

###有时间要做的事情

+ LFS一个自己的linux系统。深入了解linux
+ slackware发行版挺有挑战

###感兴趣的东西

+ 服务端和移动端的通信方式  

    看了苹果，微软，谷歌的各自通讯方式。有评价说谷歌的因为服务器时不时会被强因此不是那么理想。然后就有新的替代品，叫MQTT。据说是IBM公司弄的一个东西。看得也是似懂非懂的，可能是因为自己计算机网络没怎么学好吧（过几天还要考计算机网络）。其实在之前，我自己做的一个android和服务器段通讯的时候就寻找过相似的实现技术。当时自己就是很原始的想，使用socket通信。而且基本也算是成功了，使用多线程来支持多个客户端的链接。当然在这一点上面有很多的优化可以做。比如使用异步，协程之类的。 后来从某些地方得到另外一个消息，说其实它们之间的通讯可以是直接用http的。当时就想用http不是会占用更多的数据流量吗？ 但是貌似事实中，还真的是使用http直接链接传递数据的。使用什么http长链接，轮询机制的。也没有深刻理解到它的意思。最近在 一篇文章中看到有人提到只能手机电池耗电量是大的瓶颈。说道使用push的功能。如果能够把push深度结合到android系统中。 可以在某种程度上大大节省耗电量。等考完计算机网络之后好好研究研究MQTT这个东西。


####Vmware虚拟机安装方法

+ 官方网站下载linux安装包，如果下载的包的后缀名不是`.bundle`则修改成`.bundle`后缀名，然后执行下面命令：

        sudo chmod +x xxxx.bundle
        sudo ./xxxx.bundle
    按照一定步骤安装酒可以了。

+ 解决在ubuntu12.04下安装vmware8.04不成功的问题：

        cd /tmp
        wget http://www.nfix.de/download/vmware804fixlinux320.tar.gz
        tar -xvf vmware804fixlinux320.tar.gz
        sudo ./patch-modules_3.2.0.sh 
    主要目的是针对linux3.0以上内核安装一个补丁包,参考文章[VMware Workstation 8.0.3 / 8.0.4 und der Linuxkernel 3.2.x (Ubuntu 12.04)](http://www.wls-online.de/?q=vmware803)

+ 解决出现`Could not open /dev/vmmon:`错误

        sudo su
        输入密码，切换到root权限
        /etc/init.d/vmware start


####介绍各种cgi原理的博客

    [简单生活](http://www.mike.org.cn/articles/what-is-cgi-fastcgi-php-fpm-spawn-fcgi/)
