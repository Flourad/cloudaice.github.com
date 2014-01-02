---
layout: post
title: "谈谈Go语言开发"
description: ""
category: Go
published: true

---
{% include JB/setup %}

很早的时候就听说Google出得Go语言，但是等真正去了解它是在去年上半年的时候，那个时候从各个渠道听到关于Go语言的各种传说。后来的ECUG大会爆出的各种猛料顿时让Go火起来了。从我受到影响的方面来讲，七牛云存储功不可没。后来就买了本许式伟的Go语言编程。不知道为什么，那个时候就觉得Go语言以后一定是主流语言，可能是被洗脑的原因吧。但是无论怎样，现在Go的影响力越来越广是事实。

自己本来就是喜欢Python和C这两门语言。但是实际工作中真正那C来写工程很少，只是在各个OnlineJudge提交代码的时候用它来实现算法。我喜欢Python的简洁语法风格，喜欢C的严谨，底层。该指针就是指针，该变量是变量，而且把操作系统底层的东西都暴露出来。让开发者明明白白知道自己在干什么事情。而Go语言就是Python和C的结合。从语法上更像C，但是它拥有Python的一些隐性思想。具体或许只有真正写过Python的人来写Go才会有体会吧。

说说刚开始学习Go语言的时候，可能会遇到的坑。

时间函数，通常我需要`sleep`的时候会调用`sleep(1)`表示睡眠一秒钟，但是在Go里面默认单位是1毫秒。所以我们准确的用法是`time.Sleep(time.Second)`。如果不注意，很多初学者会在这里被坑。

关于Select，有的时候，我们需要获取一个channel数组的数据的时候，为了简化代码的编写：可能会去这么实现

    for {
        for i := 0; i < len(chan_array); i ++ {
            select {
                case item := <-chan_array[i]:
                    // do something
                default:
            }
        }
    }
这样的确巧妙的使用循环避免了重复写代码的问题，但是这段代码在Go1.2以前是会进入一个死循环的，也就是在select里面执行的永远是`default`，而不会从通道里取数据。当然，如果你设置使用的CPU使用核心数大于1。那么运行是没有问题的。这里的原因是go协程不支持抢占，case那段代码会因为抢占不到执行的资格而一直无法执行。go1.2支持了协程的抢占。但是这样写法毕竟还是不好的，会很耗费CPU。所以在代码编写中尽量避免编写这样的代码。
还有一个关于channel的错误写法。假设，我们需要这样的一个场景，把数据从各个channel里面取出来，然后放到另外一个channel里面供另外的程序串行处理。

    for {
        select {
        case channel <- <-channel0:
        case channel <- <-channel1:
        case channel <- <-channel2:
        case channel <- <-channel3:
        }
    }

这段代码看着好像是没有问题的，但是实际上你最终在一个channel里面拿到的数据只有总数的1/4。这里里面的具体原因我还没有找到，但是可能和select的IO触发条件有关，因为在这段代码中，一个case里面有两个I/O动作发生。反正在没有找到原因的情况下，我们还是老老实实，规规矩矩的一个一个读，然后写。

定时器，当程序当中需要处理隔一段时间处理一个任务的时候，不用再自己显式地调用`time.sleep`，可以使用Go里面自带的`ticker`

    ticker := time.NewTicker(time.Second)
    for _ := ticker.C{
        //do task
    }

上面这段代码则会每隔一秒钟做执行一次任务。

构建一个项目的时候，我们希望能够在主函数里面不要退出。因为Go是原生支持并发的，所以不知不觉中我们就有这个需求了。初学的时候我们会采取各种阻塞的方法。这里可以使用信号量来一举两得；

    import (
        "os"
        "os/signal"
        "syscall"
    )
    
    func main(){
        // do something
        signals := make(chan os.Signal, 1)
        signal.Notify(signals, syscall.SIGINT, syscall.SIGTERM)
        sig := <-signals
        log.Println(sig)
        os.Exit(0)
    }
    
这里，我们通过监听信号量来阻塞主程序的退出。同时根据自己程序的需求监听不同的信号量，并且做出相应地处理动作。
