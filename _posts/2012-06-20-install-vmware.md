---
layout: post
title: "安装vmware"
category: vmware 

---
{% include JB/setup %}


+ 官方网站下载linux安装包，如果下载的包的后缀名不是`.bundle`则修改成`.bundle`后缀名，然后执行下面命令：

        sudo chmod +x xxxx.bundle
        sudo ./xxxx.bundle
    按照一定步骤安装酒可以了。

+ 解决在ubuntu12.04下安装vmware8.04不成功的问题：

        cd /tmp
        wget http://www.nfix.de/download/vmware804fixlinux320.tar.gz
        tar -xvf vmware804fixlinux320.tar.gz
        sudo ./patch-modules_3.2.0.sh 

  * 主要目的是针对linux3.0以上内核安装一个补丁
  * 参考文章[VMware Workstation 8.0.3 / 8.0.4 und der Linuxkernel 3.2.x (Ubuntu 12.04)](http://www.wls-online.de/?q=vmware803)

