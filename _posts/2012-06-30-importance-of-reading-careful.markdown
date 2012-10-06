---
layout: post
title: "importance of reading careful"
date: 2012-06-30 22:33
comments: true
---

又有好一段时间没有写博客了，总觉得自己在忙，但是细数起来，自己并没有做多少实在的事情。<!--more-->这样想着，不免就有些沮丧了。
早几天发生一件事情，让我的情绪好几天没有缓过来，不过一直以来，自认为是一个非常乐观的人。所以生活还是要继续的。
有些东西就自己知道，埋在心底吧。下面还是说说实在的。

早些时候用到python的geventhttpclient库的时候，总是有一个警告，告诉我某个包已经被丢弃了，用另外某某包替换了。
当时也是刚刚用这个扩展库做东西，还没有上手，就告诉我各种错误，连样例都过不了。心中甚是不爽，又因为学校的各种事情，
也就放着，没有怎么管了。现在回头想想，还是仔细看看吧，于是晚上从新根据提示，查看相应依赖的gevent包，因为本机上的是egg包，
所以就直接去github上看源代码。发现版本不对，相差了好多，代码对不上。于是就上了gevent的网站上，看到有提示最新的1.0版本可以在
google code上面下载。于是跑到google上面去下载源代码，因为依赖关系，又安装了cython。最后安装好了最新的gevent扩展包。
但是当我执行

    import geventhttpclient

又告诉另外一个警告，gevent.core已经被替换成gevent.lock了。这个时候我知道肯定是这个gevent安装的太新了。geventhttpclient
还没有来得及更新过来。但是哪个是比较好的呢？于是我就在gevent的github的readme上看，发现原来写了这么几个字

    Python 2.6 and 2.7 are supported as well as gevent 0.13 and gevent 1.0a3.

自己当时就没有仔细好好看看。装的gevent是1.0b2的，所以就有出错了。于是重新卸载gevent1.0b2，再次安装gevent1.0a3。
再次打开python运行就完全ok了。以后真的应该仔细看看文档。
