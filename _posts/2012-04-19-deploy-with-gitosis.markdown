---
layout: post
title: "deploy with gitosis"
date: 2012-04-19 15:14
comments: true
category: git
tags: []
---

>没想到一开学之后就那么久没有写新的博客了

由于项目开发的需要，我们小团队需要搭建一台git仓库服务器，虽然用git那么长时间，但是搭建git服务器还是
第一次，毕竟平时使用只要在github上面托管就OK了。下面介绍一下自己使用gitosis搭建git服务器的过程。<!--more-->

###gitosis介绍

应该也会有像我一样对gitosis只是知道名字，然后潜意识的认为它是一个软件。其实这么想也没有什么大的错误，
但是当我使用它的时候，我还是有点惊喜。仿佛形成了这样的一条规律，但是和git相关的都要使用“版本库”
这个东西，就像博客一样，对于gitosis，我们所要维护的就是一个特殊的版本库。

###gitosis配置过程

一台服务器，当然我使用的是ubuntu服务器。其他linux系统的服务器的方法应该也是打通小异。 

+ 安装openssh-server，因为我本身就是使用ssh登录远程服务器进行配置的，所以就不用安装。 

+ 安装git，使用`sudo apt-get install git-core`命令,在ubuntu下使用这个命令安装git会发现在使用git命令
  的时候不能自动补全，但是这在服务器端操作已经足够了。 

+ 安装python-setuptools,因为gitosis是用python语言编写的，因此需要安装它。  

+ 接下来是要克隆gitosis到本地。[progit](http://progit.org/book/zh/ch4-7.html)和github上的  
  [gitosis](https://github.com/res0nat0r/gitosis)介绍使用`git clone git://eagain.net/gitosis`命令克隆，
  但是我在使用的时候返回：  

  `eagain.net[0: 208.78.102.120]: errno=Connection refused   
   fatal: unable to connect a socket (Connection refused)`错误。google后未果。我就直接克隆github上的gitosis仓库。
  至少在我的理解上，这里的的仓库是不会缺少某些东西的。

+ 安装gitosis,   
`cd gitosis`  
`sudo python setup.py install`   
如果没有出现错误的话，gitosis就已经安装在你的服务器上面了。

>下面讲述它神奇的使用方式了

###ssh访问

其实我自己对ssh也不时研究很多，讲一讲我自己的了解吧，举个例子：你有一台linux服务器，上面运行
openssh程序，那么你使用 `youname@servername`命令就可以登录远程主机，当然这里面有验证的方式，主要有两种，
一种是基于password的，也就是在你输入上面这条命令之后，再输入密码。另外一种是应用最广泛也最安全的，
使用公钥和私钥方法，使用`ssh-keygen`命令可以在`~/.ssh/`目录下产生一对公钥和私钥，正常情况下名字分别为
`id_rsa`和`id_rsa.pub`,你可以使用文本查看器来观看里面的内容。这两个文件一个是公钥，一个是私钥。
这两个文件不能被别人知道。尤其是私钥。下面使用网上的一张图片说明一下它们的认证原理。

![ssh](/images/ssh.jpg)

我们使用ssh公钥私钥机制进行认证的时候，需要将公钥文件上传到服务器，在服务器的`~/.ssh/`目录下面会有一个
`authorized_keys`文件，我们需要把上传到服务器的公钥放到这个里面就可以了。多个用户可以顺序将各自的公钥
放在这个文本文件里面。

###添加一个git用户

我们需要在服务器上面添加一个git用户，以后凡是访问这个服务托管代码的都需要使用这个
用户名，我们想一下github是不是也是如此呢？添加用户的命令`sudo useradd git`.gitosis wiki上的方法应该
是

        sudo adduser \
        --system \
        --shell /bin/sh \
        --gecos 'git version control' \
        --group \
        --disabled-password \
        --home /srv/example.com/git \
        git

使用这两种方法添加用户都可以，其中注意一点：git用户是否可以使用sudo。如果不能，在后面初始化gitosis-admin
仓库的时候会出错，解决办法是`visudo`，在打开的文件的最后一行加入`git ALL = (ALL) ALL`。

###执行gitosis-init命令

执行该命令就相当于是初始化一个管理仓库，执行这条命令前，我们需要准备一个公钥，
以后，你也将使用这个公钥和私钥对管理这个gitosis服务器。现在我们执行下面这条命令:

`sudo -H -u git gitosis-init < /tmp/id_dsa.pub`   

其中`id_dsa.pub`是你的公钥的名字。这条命令会在你的git
用户的目录下面新建一个`repositories`的目录，并且初始化出一个gitosis-admin.git的仓库。在这里说一下，
gitosis的管理主要就是维护这个仓库。另外一点:以后新建的一些仓库都会在`repositories`的目录下面。显然，
这个gitosis-admin是一个特殊的仓库，或者可以说是一个管理员维护的仓库。最后，还要执行下面命令，
给`post-update`加上权限。` sudo chmod 755 /home/git/repositories/gitosis-admin.git/hooks/post-update`

###维护gitosis-admin仓库

在上面的操作基础上，执行`ssh git@gitserver`,如果出现类似
`PTY allocation request failed on channel 0`的信息，则表示用户身份已经识别，因为没有运行git命令，所以
链接断开。现在把远程的gitosis-admin仓库克隆到本地：`git clone git@gitserver:gitosis-admin.git`。
就像使用github一样，你会得到一个gitosis-admin的目录。里面的内容也是非常简单，基本上显示的目录如下： 

        |-- gitosis.conf
        `-- keydir

其中gitosis.conf是一个配置文件，keydir是一个目录。查看gitosis.conf文件， 

        [gitosis]
        
        [group gitosis-admin]
        writable = gitosis-admin
        members = cloudaice@gmail.com

配置文件可读性也非常强，它显示了gitosis-admin仓库的管理者cloudaice@gmail.com。并且具有写权限
`writable`

现在我们新建立一个仓库,仓库的名字叫web-project,并且添加开发者:cloudaice@gmail.com

        [group web-developer]
        writable = web-project
        members = cloudaice@gmail.com

修改配置之后就可以像提交普通仓库一样 

        git add .
        git commit -m "message"
        git push

在这里，我们不需要到服务器上面建立仓库。只要将gitosis-admin推送到远程服务器上面就可以。然后在你真正
推送项目的时候，会自己自动建立仓库，想一想，github是不是也是这么使用的？
现在我们切换到web-project项目的目录下面。 

        cd web-project
        git remote add origin git@gitserver:web-project
        git push origin master

这里填写版本库的名字的时候，直接在服务器名字的后面用冒号引出来就可以了。到这里都没有出现错误的话，
基本就已经OK了。
现在，我们要进行团队之间的协作了，我们为john,josie和jessica添加公钥，把john.pub,josie.pub,
jessica.pub添加到`keydir`目录下面.接下来把这里人加入到`web-developer`团队当中。编辑gitosis.conf文件 

        [group web-developer]
        writable = web-project
        members = john josie jessica

最后提交这个修改。这些新成员也可以对版本库拥有推送的权限了。

* * *

>**注**：这里添加的用户的名字，应该要和公钥文件的名字对应，另外，gitosis仓库比较特殊，因为是使用gitosis-init命令初始化建立的，因此就使用了公钥里面最后的邮箱地址。

###简单的权限控制


如果想让john只有读取的权限,可以建立另外一个组   

        [group web-developer]
        writable = web-project
        members = josie jessica
        
        [group web-developer-ro]
        readonly = web-project
        members = john

另外还有可以让一个组作为另外一个组的成员,在组名的前面加上@   

        [group python-developer]
        members = lucy lily
        
        [group web-developer]
        writable = web-project
        members =@python-developer josie jessica

gitosis的简单应用就这些，另外还有更加深入的用法有待以后探究
