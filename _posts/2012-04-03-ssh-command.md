---
layout: post
title: "ssh command"
description: ""
category: 
tags: []
---
{% include JB/setup %}

+ 远程登录服务器
>ssh username@ip地址

+ 从远程主机拷贝文件或者文件夹到本地
> scp -r username@ip地址:/path/file  /localpath

+ 将本地文件拷贝到远程服务器
> scp -r /localpath  username@ip地址:/path

