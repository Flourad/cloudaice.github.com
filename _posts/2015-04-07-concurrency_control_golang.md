---
layout: post
title: "Golang 中并发控制的一种场景"
description: ""
category: default
published: true

---
{% include JB/setup %}


在使用Go编写并发程序的时候，往往需要很好地控制已经启动的协程。下面讲解在工作中遇到的一个场景。

>  实现一个函数，该函数包含两个参数，一个是需要并行处理的任务个数，另外一个是一个信号通道，当该通道关闭的时候，所有的任务都必须停止。

函数定义如下：`StartTasks(n int, exit chan struct{}) error`

具体实现
    
    // Create a channel which length is n.
    // Every task going done will write into this channel
    done := make(chan struct{}, n)
    
    // Follow channel used to manage all tasks,
    // if close stop, all tasks will shutdown
    stop := make(chan struct{})
    
    wg := &sync.WaitGroup{}
    wg.Add(n)
    for i := 0; i < n; i ++ {
        go func(){
            DoTask()
            done <- struct{}
        }()
    }
    
    select {
        case <- done:
            // If one task stoped, then notice all other tasks,
            // then wait for all tasks stop.
            close(stop)
            wg.Wait()
        case _, ok := <-exit:
            if !ok {
                close(stop)
                wg.Wait()
            }
    }
    
上面的一段代码基本上实现了最初想要的功能，这里关键是在创建的任务中，当我一个关闭了，那么其它的任务也都需要停止，因此创建了一个长度为n的stop通道，用于感知任务失败后的状态。