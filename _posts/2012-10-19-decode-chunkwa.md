---
layout: post
title: "日志收集系统chukwa协议分析"
description: ""
category: grass

---
{% include JB/setup %}

chukwa是apache下的一个开源项目。主要是用于日志收集分析，结合hadoop进行有效的日志处理和计算。下面这张图片描述的比较形象。

![chunkwa](/images/chukwa.jpg)

在这个架构中可以看出主要由`agent`,`collector`,`hadoop`，这样几块组成。而我现在要关注的就是`agent`和`collector`的交互部分。原来的日志收集系统是直接使用chukwa的一整套服务搭建起来的。
但是这样子的系统有一个比较明显的缺点就是不能达到实时处理的要求。正常的情况下，日志处理的延时在5到10分钟左右。因此，需要在此基础上修改这样的架构。分析后发现，chukwa的agent还是比较好用的，
拥有很多的配置方法，方便对服务器的调控。另外因为是线上服务器，也不可以随便换用agent。因为决定自己实现collector端，收集agent发过来的数据。因此就需要研究chunkwa传输的时候是怎么编码的。
下面这张图片是我分析后得到的结果：

![chunk](/images/chukwa.png)

每一次，agent会发送一个package过来，这个package包括很多个chunk。其中开始的4个字节表示的int值表示这个package有多少个chunk。上面这张图片表示的就是一个chunk的各个字段组成。
因为这是一个流的形式字符，需要根据java中的相应编码方式使用python进行解码。但是我查看了一下，python中没有直接支持的包，不过有一个struct扩展模块，通过对该扩展模块进行简单包装，
就可以实现读取Int型，Long型，UTF字符等。代码如下：

    # -*-coding: utf-8 -*-
    from struct import *
    
    class BinaryStream:
        def __init__(self,base_stream):
            self.base_stream = base_stream
            self.offset = 0
    
        def readBytes(self,length):
            string, =  unpack_from(str(length) + 's',self.base_stream[self.offset:])
            self.offset += calcsize(str(length) + 's')
            self.offset +=1
            return string
    
        def readUTF(self):
            length, = unpack_from('!H',self.base_stream[self.offset:])
            self.offset +=calcsize('!H')
            string, =  unpack_from(str(length) + 's',self.base_stream[self.offset:])
            self.offset +=calcsize(str(length) + 's')
            return string
    
    
        def readLong(self):
            num, = unpack_from('!Q',self.base_stream[self.offset:])
            self.offset +=calcsize('!Q')
            return num
    
        def readInt(self):
            num, =  unpack_from('!I',self.base_stream[self.offset:])
            self.offset += calcsize('!I')
            return num
     
使用这个方法就可以很简单的把收集到的package包中的chunk解码，并且提取其中的日志内容。通过这个方法基本上可以使得延时缩小到10秒以内。




