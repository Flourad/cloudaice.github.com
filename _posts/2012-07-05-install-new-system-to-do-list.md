---
layout: post
title: "重新安装系统之后要做的事情"
description: ""
category: grass

---
{% include JB/setup %}

####设置分区
主要挂载四个分区：
+ /boot  100 M
+ /      20 G
+ /home  留下的比较大的磁盘空间
+ swap   1G 到2G之间

####安装git

1. 复制原来的.ssh文件到新的系统的用户目录下面（保证ssh的公钥和私钥和原来一样  

2. 安装一些依赖的库

        sudo apt-get install zlib1g-dev libssl-dev libcurl4-openssl-dev libexpat1-dev
        sudo apt-get install git-core git-doc git-gui

3. 配置git
 
        git config --global user.name "cloudaice" 
        git config --global user.email "cloudaice@163.com"

        git config --global color.status auto  
        git config --global color.diff auto  
        git config --global color.branch auto  
        git config --global color.interactive auto  

        git config --global alias.st status  
        git config --global alias.ci commit  
        git config --global alias.co checkout  
        git config --global alias.br branch 

4. 设置git默认编辑器为vim
    
    编辑`.gitconfig`文件
        
        vim ~/.gitconfig

    添加如下

        [core]
            editor = vim
             
5. 安装gitstats

gitstats是一个统计git项目的工作量的工具，统计之后会在一个目录下生成html的统计信息。

    sudo apt-get install gitstats 

使用方法：

    gitstats /your/project/path  reportname

这样就会在reportname目录下面产生很多html文件。用浏览器打开里面的`html.index`文件就可以查看了。

####安装vim 
这里我最终还是决定使用apt-get来安装vim
 
    sudo apt-get install vim
    cd 
    git clone git@github.com:cloudaice/my-vim.git ~/.vim
    ln -s ~/.vim/vimrc ~/.vimrc
    sudo apt-get install exuberant-ctags
    sudo apt-get install ack-grep

####配置python环境

    下载ez_setup.py，安装它
    下载pip源码包，安装
    sudo apt-get install python-dev
    sudo pip install cython
    ...

####修改用户目录下的文件为英文

    export LANG=en_US 
    xdg-user-dirs-gtk-update 

在提示框中选择转换目录

    export LANG=zh_CN 

重启之后，选择保存不再提示，保存旧名字

####设置goagent开机自动启动

+ 将`.proxy.py`设置成可执行文件：`chmod +x proxy.py`
+ 在应用程序中找到**启动应用程序**。点击**添加**，写上应用程序名字，浏览到`proxy.py`的文件。再添加
**注释**。这样在下次启动电脑的时候就自动运行了。


####安装软件
安装茄子摄像头拍照软件

    sudo apt-get install cheese

安装rednotebook,用于记录日记

    sudo apt-get install rednotebook 

安装思维导图软件xmind

    去官方网站下载xmind相应的安装包并且安装


####配置终端提示符
+ 简洁模式 (只是显示路径信息)

        PS1="[\[\033[32m\]\w]\[\033[0m\]-> \[\033[0m\]"
+ 其他模式见[8个实用而有趣Bash命令提示行](http://coolshell.cn/articles/1399.html)
    

####配置conky

conky是一个看上去很酷的监控工具，可以让桌面看上去更加hack

1. 安装conky以及相关的软件

        sudo add-apt-repository ppa:norsetto/ppa
        sudo apt-get update
        sudo apt-get install conky-all
        sudo apt-get install python-statgrab ttf-droid curl
        sudo apt-get install lm-sensors hddtemp
        sudo sensors-detect         （一路回车，软件会自动检测）
        sudo /etc/init.d/module-init-tools start
        sudo chmod u+s /usr/sbin/hddtemp

2. 去下载[conky-color](https://github.com/cloudaice/conky-colors)，然后

        cd conky_colors
        make
        make install （安装完成conky-color）

3. 生成配置文件

        .conkycolors$ conky-colors –lang=en –theme=human –clock=modern –calendar –hdtemp1=sda –cpu=2 –cputemp –swap –updates –proc=6 –mpd –network –eth=0 –battery –ubuntu –weather=CHXX0037 –unit=C –ring
    这一步有很多方法，具体参考[个性化配置conky](http://forum.ubuntu.org.cn/viewtopic.php?t=313031)

4. 启动观察效果

        conky -c /home/shua/.conkycolors/conkyrc 

