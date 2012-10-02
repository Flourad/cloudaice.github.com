---
layout: page
title: "svn 常用命令"
description: ""
---
{% include JB/setup %}

    svn status     ====查看当前状态
    svn info       ====查看当前版本信息
    svn log        ====查看提交记录
    svn commit -m ""    ====提交版本库
    svn resolve --accept working filename    ====结束该文件的冲突状态
