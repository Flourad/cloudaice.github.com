---
layout: page
title: "Ruby"
description: ""
---
{% include JB/setup %}

####安装必要的开发包

    sudo apt-get install wget vim openssl curl git-core automake imagemagick 
    sudo apt-get install build-essential libreadline6 libreadline6-dev  zlib1g zlib1g-dev libssl-dev libyaml-dev libxml2-dev libxslt-dev autoconf libtool libpcre3-dev

####安装rvm
 
    curl -L get.rvm.io | bash -s stable
    
在.bashrc文件最后添加下面这句话：

    [[ -s "$HOME/.rvm/scripts/rvm" ]] && source "$HOME/.rvm/scripts/rvm" # Load RVM into a shell session *as a function*
    
执行下面命令：

    source .bashrc

查看rvm是否安装正确：

    rvm -v

####安装ruby环境：

    rvm pkg install readline
    rvm install 1.9.2 --with-readline-dir=$rvm_path/usr

+ 查看已安装的ruby版本：  

        rvm list
    
+ 列出已知的ruby版本：

        rvm list known

+ 安装一个ruby版本：

        rvm install 1.9.3

+ 使用一个ruby版本：

        rvm use 1.9.2

+ 设置默认ruby版本：

        rvm use 1.9.2 --default

+ 卸载一个已经安装的版本：

         rvm remove 1.9.3

在这里我们使用1.9.2为默认ruby版本

    rvm use 1.9.2 --default

到这里我们已经安装好了ruby和gem，查看ruby和gem的版本：

    ruby -v

    gem -v

因为gem包的官方源下载比较慢，所以我们在这里添加淘宝的源。

    $ gem sources --remove http://rubygems.org/
    $ gem sources -a http://ruby.taobao.org/

使用下面命令查看是否变成了淘宝的源，我们以后在项目中使用bundle工具的时候，修改Gemfile中的`source "http://ruby.taobao.org/"` 

    $ gem sources -l
    
    *** CURRENT SOURCES ***

    http://ruby.taobao.org

安装`bundler`和`rails`：

    gem install bundler rails

安装完成之后查看：

    bundle -v
    rails -v

安装制定版本的rails:

    gem install rails --version 3.2.0

查看本地安装的rails：

    $ gem list --local rails

    *** LOCAL GEMS ***

    rails (3.2.6, 3.2.0)

具体在项目中使用哪个rails版本，你可以在Gemfile里面写，然后`bundle install`
