---
layout: post
title: "arch installation"
category: arch

---

{% include JB/setup %}


这几天整了一下archlinux，想要自己配置一个个性化的系统。在虚拟机里面安装了，但是使用的过程中还是遇到
了不少的问题，各种更新不成功。由于现在时间真的是不够用，只能先这样子放下了。以后有时间再好好研究研究吧.

###安装环境
ubuntu 下的vmware8.0.1

###获得安装资源

在[www.archlinux.org/download](www.archlinux.org/download)下载core的镜像，我选择的是i686

**注**：一共有两种镜像，core是用来本地安装的，而另外一个Netinstall是用来网络安装的，一般网络不好的都
是下载core镜像进行安装。


###配置虚拟机参数

这里主要是设置Vmware中的一些硬件配置，基本和安装其它linnux发行版相似。我最后将打印机和软盘直接删除了，
另外网络选择nNAT连接。

###安装archlinux

+ 打开Vmware运行开关  
+ 会进入一个命令行的界面

###配置archlinux

安装完成后，执行  

    ping www.baidu.com

测试网络是否已经连接  

    vi /etc/pacman.d/mirrorlist

观察里面的内容，将china下的源的注释去掉。设置软件下载源，选择设置中国的源，下载更新的时候速度会比较快。

执行 

    pacman -Syy

刷新所有软件包


执行  

    pacman -Syu

更新系统，在这里会遇到一些很难缠的问题，我在安装的时候出现了类似下面的错误信息：

    glibc: /usr/sbin/zic exists in filesystem
    glibc: /usr/sbin/zdump exists in filesystem
    glibc: /usr/bin/tzselect exists in filesystem

这个问题纠结了我很长的时间，一度让我几乎是中断了安装archlinux。解决方法如下：  
显然，这里提示安装出现了冲突,可以强制更新pacman,输入下面的命令:

    pacman -Sf pacman

这条命令真的是异常好用,执行时候，屏幕上面会有一大堆的字，到最后会有这么一句警告：

    warning: /etc/pacman.conf installed as /etc/pacman.conf.pacnew

于是可以执行下面的命令对它进行修改

    mv /etc/pacman.conf.pacnew /etc/pacman.conf

编辑 /etc/pacman.conf文件
在[option]后面加上一行

    SigLevel = Never 

然后继续执行上面指令，更新系统:

    pacman -Syu

这个时候，就不会出现可恶的glibc了，因此，在我的机器上还是出现了冲突，其中一个是filesystem。但是，
这些问题很容易解决，只要执行下面命令就可以了：

    pacman -S filesystem --force

如果是碰到另外的包的名字，则可以把filesystem替换成另外的名字。
把这些冲突解决之后再运行

    pacman -Syu

直到更新完成后没有任何错误为止。
_走完这一步之后，下面的路基本上是平步青云了_

###配置系统

#####安装Xorg

    pacman -S xorg-server xorg-xinit xorg-utils xorg-server-utils

#####安装mesa获得3D支持

    pacman -S mesa

#####查看显卡驱动

    pacman –Ss xf86-video|more

#####安装显卡驱动
因为这里是在Vmware中安装arch，所以安装以下驱动

    pacman –S xf86-video-vmware

#####查看输入设备驱动

    pacman -Ss xf86-input

#####安装鼠标，键盘，热插拔，触摸板驱动

    pacman -S xf86-input-vmmouse xf86-input-keyboard xf86-input-evdev xf86-input-synaptics

#####安装gnome守护程序dbus

    pacman -S dbus

启动dbus进程

    rc.d start dbus

将dbus假如到守护进程中去,编辑/etc/rc.conf,在DAEMONS中添加dbus

    DAEMONS = (..dbus..)

#####测试xorg的图形界面
执行下面命令

    Xorg -configure

系统会在/root/下面生成一个xorg.conf.new的文件，我们需要将xorg.conf.new拷贝到/etc/X11/目录下，并且重命名为xorg.conf。命令如下

    cp /root/xorg.conf.new /etc/X11/xorg.conf

#####安装测试图形界面的环境

    pacman -S xorg-twm xorg-xclock xterm

测试xorg图形界面：

    startx

出现图形界面的命令行，你可以输入exit退出

#####安装字体

    pacman –S ttf-dejavu

#####安装gnome
在安装gnome之前先检查系统当前是不是最新,运行下面两条命令:

    pacman -Syu
    pacman =Syy

安装gnome桌面

    pacman -S gnome

这里会问你要安装那些包，由于我是第一次安装，就选择默认，全部安装，因此直接敲击回车就可以。另外安装gnome需要下载较多的软件包。网络环境要好，
不然会花费较多的时间，这里我提供一个能够加快下载速度的方法：使用axel。一个linux下面的多线程下载工具。我们可以把它和pacman连在一起使用。方法如下
**安装axel**

    pacman -S axel

修改配置文件

    vi /etc/pacman.conf

在option这一项里加上下面一句话

    XferCommand = /usr/bin/axel -n 5 -a -o %o %u

这样子，以后使用pacman下载的时候，就可以利用多线程的优势了。

安装gnome扩展

    pacman -S gnome-extra

**注**:在这个过程中，如果安装结束出现类似下面的错误：

    error failed to commit transaction (invalid or corrupted package)

可能是因为安装包不完整导致的原因，进入/var/cache/pacman/pkg/目录下，执行下面命令寻找不完整的包：
    
    ls *.part*
 
看到列出的不完整的包，则手动删除。然后再重新安装相关软件。

安装vmware虚拟机扩展：

    pacman -S open-vm-tools


#####启用gnome

    startx


###下面是一张图片


![arch-gnome](/images/arch-gnome.png)

