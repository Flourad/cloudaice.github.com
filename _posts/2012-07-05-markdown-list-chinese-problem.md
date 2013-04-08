---
layout: post
title: "markdown解释中文列表的问题"
description: ""
category: markdown

---
{% include JB/setup %}

使用jekyll写博客不经意之间就会遇到列表解释不正确的问题，有的时候可以正常解释，有时候却不行。
我还一直以为是自己哪地方写错了。今天实在是不甘心，明明上下两句话是一样的，下一句话就是不对。
最后，调试了很多遍终于发现当列表中有英文字符的时候，列表就可以正常解释出来。否则不可以，
在网上查找到资料原来是jekyll的默认解释器的缘故。jekyll的默认markdown引擎是maruku。现在要改为
rdiscount。

>编辑`_config.yml`文件，在`pygments:true`上面添加一行`markdown: rdiscount`

