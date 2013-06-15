---
layout: post
title: "可以使用Tornado的免费云平台寻记"
description: ""
category: default
published: true

---
{% include JB/setup %}

目前的PaaS平台很火，在用的很爽的时候总遇到不少的限制。因为自己写了一个基于Tornado框架的[应用](http://data.cloudaice.com)，想要用它原生的ioloop。下面分别从heroku，appfog，openshift这三个PaaS平台来谈谈。

heroku
======

这个是我目前实际部署的PaaS平台。使用git管理。官方的git代码推送需要使用到ssh，但是在github上有一个名叫`heroku-push`的项目做为heroku命令行工具的一个插件，可以直接调用`heroku push`命令，就可以把代码推送到服务器上面，而不用使用ssh来操作，这页符合了我的现实情况，因为我目前只是能够通过wifi连接上网，而我所在的地方的wifi网络限制了22端口。所以我没有办法直接使用ssh命令，当然会有ssh端口代理什么的办法，但是个人觉得折腾起来太费劲了。heroku上使用gunicorn来管理web服务程序，这一点appfog也是一样的，幸好在gunicorn里面有一项是针对Tornado的，所以在这里我能够用上了它自带的ioloop。相对来说heroku对使用gunicorn比较自由一些，在后来尝试appfog的时候证实了这一点。当我再次想使用websocket的时候，发现heroku不支持websocket。不止是heroku，基本上所有的PaaS服务都不支持websocket服务，包括GAE。不过dotcloud似乎是支持websocket的，但是现在已经是没有免费服务了。heroku上免费的服务还挺多，而且从量上来讲，基本上还算是比较大的，但是它需要绑定信用卡，才可以使用那些额外的免费服务。否则仅仅只能使用一个裸的web应用服务。连数据库都不能使用，更不用说什么worker了。对于国内的用户来说，heroku还有一个不好的消息就是它现在已经被墙了，部署在heroku上的应用，如果不翻墙，根本是访问不了的。可以试试我[这个](http://data.cloudaice.com)

appfog
=======

在确定heroku完全被墙之后，我把目光瞄向了appfog，因为从风格上来说，我是比较喜欢appfog的。它提供的各项免费服务已经完全我使用了，而且还可以选择AWS的机器地点。据说在新加坡的服务器国内是没有墙的。因为目前在国外，也没有办法去亲身测试。相对于heroku来说，它可以让我使用数据库了，还有额外的调度任务也可以使用。但是我没有办法使用Tornado自身的ioloop了。只能使用WSGI，这里说明一点，就是我在写自己的应用程序的时候严重依赖ioloop。这里不再是一个web application的问题。因为当时部署在heroku，不能使用它的worker功能去后台抓取数据，因此就利用ioloop的特性去定时抓取数据。如果我要使用appfog，那么整个程序都要重新写，若是这样子的话，我还不如直接使用appfog上推荐的flask框架。再加上我未来的打算是在现在的项目基础上使用websocket。因此重新把项目部署到appfog上付出的代价有些高。在这里，appfog也是可以不通过ssh来部署应用的。


openshift
==========

它的web端的操作界面真的是让我感到很伤啊，整个就是一个黑色的基调，让我在操作的时候有一种压抑感。但是界面归界面，openshift提供的do it yourself真的很给力，至少在服务方面的问题全部解决了，给了最大的自由来部署自己的服务器，包括websocket，Tornado的ioloop全部解决，而且简单看了一下它提供的各项资源，感觉还是挺丰富的。可是对于目前的我来说还是那一项恼人的限制，我的网络环境不允许我使用22端口。而openshift部署代码必须使用22端口。没有办法，只能回到国内再使用，貌似在国内openshift没有被墙。

总结
====

目前PaaS应用很多，对于一般的网络应用也完全足够了，无论是国外的还是国内，但是对于想用比较新的东西，或者是自己的服务器的话还是比较麻烦的，各家都有各家的限制。目前对于各个PaaS的调研，结果是openshift的do it yourself 的限制最少。另外要使用MongoDB数据库的话有一个叫MongoLab的开放数据存储服务，可以免费使用500M。而且使用RESTFUL接口进行访问。期待回国后把毕业答辩一些事情都处理完之后，好好实现自己的小想法。