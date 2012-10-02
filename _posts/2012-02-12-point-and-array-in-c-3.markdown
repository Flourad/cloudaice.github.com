---
layout: post
title: "pointer and array in C(3)"
date: 2012-02-12 19:00
comments: true
category: pure-c
tags: []
---

+ ###指针和字符数组

和整型类型的数组一样，字符数组名称也是指向数组元素下标为0元素的指针。但是在这里有一点比较特殊。
因为字符数组和字符串的联系很密切，而往往这样的关系容易把自己弄糊涂。
下面来观看一段程序；<!--more-->

如果这段代码的输出都能够完全明白，那么就可以跳过这篇文章了

    #include"stdio.h"
    #include"string.h"
    int main(int argc, int argv[])
    {
            int a[10];
            int i;
            int *p;
            for(i=0;i<10;i++)
            {
                a[i]=i;
            }
            printf("%d\n",sizeof(a));
            printf("%d\n",sizeof(p));
            char s1[10];
            char *s2="aaaaaaaaaa";
            char s3[]="aaaaaaaaaa";
            char *p1;
            char *p2;
            char *p3;
            p1=s1;
            p2=s2;
            p3=s3;
            for(i=0;i<10;i++)
            {
                s1[i]='a';
            }
            printf("s1: %d %d\n",sizeof(s1),strlen(s1));
            printf("p1: %d %d\n",sizeof(p1),strlen(p1));
            printf("s2: %d %d\n",sizeof(s2),strlen(s2));
            printf("p2: %d %d\n",sizeof(p2),strlen(p2));
            printf("s3: %d %d\n",sizeof(s3),strlen(s3));
            printf("p3: %d %d\n",sizeof(p3),strlen(p3));
            s1[1]='A'; printf("s1 is ok\n");
            p1[1]='A'; printf("p1 is ok\n");
           // s2[1]='A'; printf("s2 is ok\n");
           // p2[1]='A'; printf("p2 is ok\n");
            printf("%c\n",s2[1]);printf("%c\n",p2[1]);
            s3[1]='A'; printf("s3 is ok\n");
            p3[1]='A'; printf("p3 is ok\n");
         return 0;
     }

运行运行完这段代码后，输出结果如下：

![string_point](/images/string_point.png)

首先说一下sizeof()的作用。它的官方定义如下:

>The sizeof keyword gives the amount of storage, in bytes, associated with a variable or a type 
>(including aggregate types). This keyword returns a value of type size_t.
>
>The expression is either an identifier or a type-cast expression (a type specifier enclosed in 
>parentheses).
>
>When applied to a structure type or variable, sizeof returns the actual size, which may include 
>padding bytes inserted for alignment. When applied to a statically dimensioned array, sizeof 
>returns the size of the entire array. The sizeof operator cannot return the size of dynamically 
>allocated arrays or external arrays.

如果参数是一个变量，则返回变量占用的内存的长度。
如果是一个拥有固定长度的数组，则返回数组所占用内存的大小。
同时还有内存对齐等功能，详细描述可以参照官方介绍。

strlen()的功能就相对简单一些，它是一个函数，只接收char*型的参数。简单地说就是寻找字符串中`\0`的位置，
然后返回`\0`前的字符长度。

`sizeof`和`strlen`的最大区别就是：

>>* **sizeof是运算符**
>>* **strlen()是函数**

**现在我们来分析程序输出。**

第一行是两个`10`，因为声明了一个常数为`10`大小的字符数组，然后往里面填上字符;其中在数组的最后会有一个
`\0`。第二行输出`p1`的`sizeof`的值是`4`，说明`p1`仅仅是一个指针变量。占用了`4`个字节内存。
`s2`的`sizeof`也是`4`，说明`s2`也仅仅是一个指向字符的指针，指在字符数组的开始元素。
`s3`的`sizeof`是`11`。它和`s1`是不一样的，`s1`是一个声明的常熟大小的数组。而`s3`不是，
对于`s3`的声明可以这样解释，
把一个字符串放到一个数组里，使得一一对应。在这里我不知道编译器到底是给这个数组分配多少内存空间。
在这个例子中，我给`s3[20]`进行赋值，都不会报错，但是`s3[21]`就报错了。不过按照规则，我们能正常控制的内存
就是`11`。因为字符串末尾都会带一个`'\0'`
代码中注释的那两行，是因为没有注释的话，运行时候会报错。也就是说不能改变这样声明的字符串中的字符。
但是输出就可以。后来一查，原来`ANSI C`禁止这种修改。这个python中的字符串不可修改有些类似`(*^__^*)`

最后给两个形象的图

>`char str[]="aaaaaaaaa";`
>
>![str1](/images/str1.png)
>
>`char *str="aaaaaaaaa";`
>
>![str2](/images/str2.png)


注：`本文所有代码都是在linux下用gcc编译运行的`

