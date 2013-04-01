---
layout: post
title: "非root用户配置Python环境"
description: ""
category: default
published: true

---
{% include JB/setup %}

我使用Python都是在linux系统下。一般也都是直接使用系统自带的python解释器，在需要不同的python版本的时候，最多也就是装一个python版本管理工具[pythonbrew](http://cloudaice.com/pages/python.html).就可以自由切换使用了。但是昨天碰到一个问题。需要在公用的服务器上安装配置python环境，包括依赖包的安装。由于是大家公用的hpc－server。所以安装的时候是没有root权限的.并且服务器上的python版本是2.4的。在这样的情况下，只能是自己选择安装一个python的版本。
####下载安装python解释器
在这里假设我把python安装在`~/opt/python`下面。

    mkdir -p ~/opt/python
    wget http://python-url
    tar zxvf python2.7.3.tar.gz
    cd python2.7.3
    ./configure --prefix ~/opt/python
    make & make install
    
####安装setuptool
这个工具是安装python扩展包的必须工具。

    wget http://setuptool-url
    tar zxvf setup-tool.bar.gz
    cd setuptool
    ~/opt/python/bin/python setup.py build
    ~/opt/python/bin/python install --prefix ~/opt/python
    
####安装第三方扩展包
打开当前用户目录下的`.bashrc`。在最后加上`export PYTHONPATH=~/opt/python:PYTHONPATH`,再执行`source .bashrc`。

+ 下载扩展包
+ 解压扩展包
+ 切换到扩展包目录下
+ 执行`~/opt/python/bin/python setup.py install --prefix ~/opt/python`


所有的配置过程就是这些，具体环境需要修改相应的参数，或者根据错误提示也很好解决。另外修改环境变量，可以使得自己的python环境成为默认的python环境。另外如果要安装一些系统的依赖库，例如画图的graphviz可能还需要另外的设置。
    
