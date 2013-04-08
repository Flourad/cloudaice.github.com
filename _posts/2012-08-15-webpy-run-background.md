---
layout: post
title: "让webpy在服务后台运行并且记录log"
description: ""
category: grass

---
{% include JB/setup %}


###让webpy在开发环境下以后台的形式运行在服务器上

    setsid python index.py 8888 2> webpy.log
