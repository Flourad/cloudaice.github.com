---
layout: page
title: "Linux"
categories: "linux"
---
{% include JB/setup %}

linux 常用笔记
---------------

为ubuntu添加系统快捷方式
========================

有些时候，我们下载的软件通过在命令行里面执行就可以运行，例如我在安装Sublime_Text2的时候，
于是需要自己创建系统快捷方式，方法如下：

切换到`/usr/share/applications`目录下面，创建名字为Sublime_Text2.desktop文件。并且写入下面
内容。

    [Desktop Entry]
    Name=Sublime_Text2
    Comment=Sublime_text2
    Exec=/home/cloudaice/Sublime-Text2/sublime_text //执行路径
    Icon=/home/cloudaice/Sublime-Text2/Icon/16x16/sublime_text.png //软件图标
    Terminal=false
    Type=Application
    Categories=Application;Development; //系统中的位置


ubuntu终端常用快捷键
===================

Bash Shell 快捷键 

    l         <CTRL k>：删除从光标到行尾的部分 
    l         <CTRL u>：删除从光标到行首的部分 
    l         <ALT d>：删除从光标到当前单词结尾的部分 
    l         <CTRL w>：删除从光标到当前单词开头的部分 
    l         <CTRL a>：将光标移到行首 
    l         <CTRL e>：将光标移到行尾 
    l         <ALT a>：将光标移到当前单词头部 
    l         <ALT e>：将光标移到当前单词尾部 
    l         <CTRL y>：插入最近删除的单词 
    l         <!$>：重复前一个命令最后的参数。 
    
    Ctrl + a - 跳到行首   
    Ctrl + b - 左移一个字符   
    Ctrl + c - 终端进程   
    Ctrl + d - 从光标处向右删除   
    Ctrl + e - 跳到行尾   
    Ctrl + f - 右移一个字符   
    Ctrl + k - 从光标处删除到行尾   
    Ctrl + l - 清屏，类似 clear 命令   
    Ctrl + r - 查找历史命令   
    Ctrl + R - Search the history backwards with multi occurrence   
    Ctrl + u - Delete backward from cursor // 密码输入错误的时候比较有用   
    Ctrl + xx - Move between EOL and current cursor position   
    Ctrl + x @ - Show possible hostname completions    
    Ctrl + z - Suspend/ Stop the command   
    补充:   
    Ctrl + h - 删除当前字符   
    Ctrl + w - 删除最后输入的单词   

终端快捷键:alt+f2然后打gnome-terminal就可以打开终端了 

添加快捷键：系统——首选项——键盘快捷键 

最常用 
    win+n切换背景颜色风格 
    alt+tab=不用说了。 
    win+tab若开3D效果了切换 
    ctrl+alt+backspace=相当于强制注销 
    ctrl+alt+del=调出关机菜单 
    ctrl+alt+l=锁定桌面 
    
    ctrl+alt+d=最小化gnome所有窗口 
    ctrl+alt+f2=linux终端用户（alt + f7返回xwindows，alt+ <- 或-> 进行终端切换） 
    ctrl+alt+ <- 或-> =切换桌面 

终端快捷键 
    tab=补全 
    ctrl+a=开始位置 
    ctrl+e=最后位置 
    ctrl+k=删除此处至末尾所有内容 
    ctrl+u=删除此处至开始所有内容 
    ctrl+d=删除当前字母 
    
    ctrl+w=删除此处到左边的单词 
    ctrl+y=粘贴由ctrl+u，ctrl+d，ctrl+w删除的单词 
    ctrl+r=正在测试，还没弄明白，呵呵。 
    ctrl+l=相当于clear 
    ctrl+b=向回移动 
    ctrl+f=向前移动 
    ctrl+p=向上显示缓存命令 
    ctrl+n=向下显示缓存命令 
    ctrl+d=关闭终端 
    shift+上或下=终端上下滚动 
    shift+pgup或pgdown=终端上下翻页滚动 
    ctrl+shift+f=全屏（仅限于konsole） 
    ctrl+shift+n=新终端（terminal和konsole有所不同） 
    ctrl+c=终止 

桌面的快捷键

+ 打开主菜单 = Alt + F1 
+ 运行 = Alt + F2 
+ 显示桌面 = Ctrl + Alt + d 
+ 最小化当前窗口 = Alt + F9 
+ 最大化当前窗口 = Alt + F10 
+ 关闭当前窗口 = Alt + F4 
+ 截取全屏 = Print Screen 
+ 截取窗口 = Alt + Print Screen 

默认特殊快捷键 

+ 展示所有窗口程序 = F10 
+ 展示当前窗口最上层程序 = F11 
+ 展示当前窗口所有程序 = F12 
+ 切换窗口 = Alt + Tab 
+ 旋转3D桌面 = Ctrl + Alt + 左/右箭头（也可以把鼠标放在标题栏或桌面使用滚轮切换） 
+ 旋转3D桌面（活动窗口跟随） = Ctrl + Shift + Alt + 左/右箭头 
+ 手动旋转3D桌面 = Ctrl + Alt + 左键单击并拖拽桌面空白处 
+ 窗口透明/不透明 = possible with the “transset” utility or Alt + 滚轮 
+ 放大一次 = 超级键 + 右击 
+ 手动放大 = 超级键 + 滚轮向上 
+ 手动缩小 = 超级键 + 滚轮向下 
+ 移动窗口 = Alt + 左键单击 
+ 移动窗口时贴住边框 = 左键开始拖动后再 Ctrl + Alt 
+ 调整窗口大小 = Alt + 中击 
+ Bring up the window below the top window = Alt + middle-click 
+ 动态效果减速 = Shift + F10 
+ 水纹 = 按住 Ctrl+超级键 
+ 雨点 = Shift-F9 
+ 桌面展开＝ Ctrl + Alt + 下箭头，然后按住 Ctrl + Alt 和左/右箭头选择桌面


解决出现`Could not open /dev/vmmon:`错误
=======================================

    sudo su
    输入密码，切换到root权限
    /etc/init.d/vmware start


编译安装vim73之后设置vim为系统默认编辑器
========================================

    sudo update-alternatives --install /usr/bin/editor editor /usr/local/bin/vim 50 --slave /usr/share/man/man1/editor.1.gz editor.1.gz /usr/local/man/man1/vim.1.gz
    sudo update-alternatives --install /usr/bin/vi vi /usr/local/bin/vim 50 --slave /usr/share/man/man1/vi.1.gz vi.1.gz /usr/local/man/man1/vim.1.gz 

linux 相关文章
=============

+ [应该知道的linux技巧](http://cloudbbs.org/forum.php?mod=viewthread&tid=10815)
+ [做个环保主义程序员](http://coolshell.cn/articles/7186.html)
+ [你可能不知道的shell](http://coolshell.cn/articles/8619.html)
+ [28lnux命令行神器](http://coolshell.cn/articles/7829.html)
