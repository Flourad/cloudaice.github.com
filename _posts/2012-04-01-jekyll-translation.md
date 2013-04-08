---
layout: post
title: "Jekyll 简介(译)"
description: ""
category: grass

---
{% include JB/setup %}

# jekyll 介绍

这篇文章将会详细介绍Jekyll是什么，为什么会有那么多的人喜欢用它。在下面的篇章里，
我们将一步一步学习使用Jekyll可以做些什么。

##概述

***
###什么是Jekyll?

Jekyll是一个ruby的gem包，同时它是一个解析引擎，可以将templates,partials,liquid代码，markdown等
解析成静态网站页面。被成为“博客和静态网站的发电机”。

***
### 例子

该网站就是使用Jekyll引擎搭建的。[Other Jekyll websites](https://github.com/mojombo/jekyll/wiki/Sites).

***
### 用Jekyll可以做什么

Jekyll作为一个ruby的gem，你可以将它安装在你的本地系统中。你可以在你的工程目录下使用`jekyll --server`
命令。当然jekyll的环境变量中要包含该路径。你会神奇地发现你的那些用markdown语法写的东西都被解析成静态
网站的页面。

一旦解析完成之后，这些解析后的静态文件都会放在一个`_site`的目录中。这样子，
该目录下的静态网页都可以被一个静态的web-server解析。

你可以认为jekyll通过将静态页面全部解析出来存放在一个目录下，从而形成一个动态博客的效果。

***
### Jekyll不是一个搭建博客的软件

**jekyll仅仅是一个解析引擎**

jekyll不会产生任何内容或者做一些模板和设计的元素，这对于初次接触的同学往往会产生混乱，事实上jekyll没有做出任何你在网站上看到的东西，一切东西都是你自己做出来的。

***
### 为什么要关心jekyll?

jekyll非常的小巧精致，并且高效。最重要的是你要明白jekyll帮你创建了一个静态的仓库，从而你只是需要一个静态的web服务器就可以了。传统的动态博客，
比如Wordpress需要一个数据库并且需要编写服务端的代码。那些笨重的动态博客还需要一些缓冲层，而最终也就是完成了和jekyll的相同功能。而jekyll不需要这些，
它仅仅帮你提供那些内容。

因此，如果你喜欢让事情变得简单，你喜欢使用命令行来管理面板UI，那么你旧尝试一下jekyll带来的快乐吧。

**开发者们喜欢使用jekyll，因为我们使用jekyll写博客可以像在编程一样**

+ 你可以用你喜欢的文本编辑器使用markdown语法或者textfile语法写你的博客
+ 你可以在你的本地编写并且预览你的博客
+ 你可以在没有网络情况下照样工作
+ 你可以使用git版本控制工具来管理你写的东西
+ 你可以将你写的博客搭建到一个静态web服务器
+ 你可以将你的博客免费的搭建在github主页上
+ 你不需要使用数据库

***
***
# jekyll是如何工作的？

























