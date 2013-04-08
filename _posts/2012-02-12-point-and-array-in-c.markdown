---
layout: post
title: "pointer and array in C(2)"
date: 2012-02-12 09:25
comments: true
category: C

---

+ ###二维数组与指针

在[point and array in C(1)][1]中已经详细讨论了数组和指针的关系。关于二维数组其实在这上面上的一个扩展，
或者可以说仅仅是类型的扩展。

    int calendar[12][31];

上面声明语句表达的意思：

>声明了一个数组名称为calendar的数组，该数组有着12个**数组类型**的数组。它的每个数组类型的元素是一个
>有着31个整型元素的数组。<!--more-->

这句话，读着很不顺口，但是细细理解，还是非常有意义的。其实就是在普通数组的外面又包了一层。普通数组里面
元素的类型都是简单的数据类型。而这个数组内的元素的类型就是一个数组。学过java等面向对象语言就会知道，在
java里面，数组就是一个类型。

    int value;
    value= calendar[2][7];
    value=*(calendar[2]+7);
    value= *(*(calendar+2)+7);

我们来分析一下上面的四行代码：

**第一行：**   声明了一个整型变量value

**第二行：**   将数组中的一个值赋给变量value

**第三行：**   calendar[2]表示的是一个数组，因此由数组和指针的关系我们知道，calendar[2]也表示指向元素
calendar[2][0]的指针。因此*(calendar[2]+7)就表示calendar[2][7]。

**第四行：**   有了第三行的分析，我们很容易知道calendar[2]和*(calendar+2)表达的内容是一样的。所以

>   \*(\*(calendar+2)+7)  =>  *(calendar[2]+7)  => calendar[2][7]

读者可以运行下面代码，看看结果是不是一样的，细细品味一下

    #include"stdio.h"
    int main(int argc,char* argv[])
    {
        int calendar[12][31];
        int i,j;
        int value;
        for (i =0;i<12;i++)
        {
            for (j=0;j<31;j++)
            {
                calendar[i][j]=i*j+j;
            }
        }
        value=calendar[2][7];
        printf("%d\n",value);
        value = *(calendar[2]+7);
        printf("%d\n",value);
        value = *(*(calendar+2)+7);
        printf("%d\n",value);
        return 0;
    }

接着上面的讨论，当我们执行下面语句的时候，会发生什么：

    int *p;
    p = calendar[2]

运行上面的代码不会出现任何问题。

    int *p;
    p = calendar;

当我们运行这段代码的时候，编译器会报错，我们来分析一下：

>`p` 是一个指向一个整型变量的指针。那么 `calendar` 表示什么呢？ `calendar` 是一个数组的名称。
>它是一个怎样的数组呢？它是一个有着12个数组类型的元素的数组。换句话说：
>**它是一个有着12有着31个整型元素的数组的数组类型元素的数组。**这句话太拗口了。

想想这三行代码：

    int a[2];
    int *p;
    p = a;

我们在声明指针变量的时候为什么要用int呢？很明显，因为我们声明了一个int类型的数组。

那我们看看calendar是什么类型数组：

>包含31个整型元素的数组

没错，你可以理解，这就是calendar的类型。OK，因此，我们需要声明一个指向这种类型的指针，
即指向数组的指针，那么下面的代码就顺理成章了

    int (*p)[31];
    p=calendar;

到这里为止，我们好好整理一下自己的思绪，想想每一步走下来是不是都是清晰明白的。如果你都明白了，
那么接着看下面的内容。

    #include"stdio.h"
    int main(int argc,char* argv[])
    {
        int a[3];
        int *p;
        int i;
        for (p=a;p<&a[3];p++)
        {
            *(p)=1;
        }
        for(i=0;i<3;i++)
        {
            printf("%d\n",a[i]);
        }
       return 0; 
    }

上面这段代码在我么看完point and array in C (1)的时候应该就可以明白了，如果还有些迷糊的话，
可以点击右上角的download下载下来自己运行一下。

明白之后，我们再来运行一下这段代码

    #include"stdio.h"
    int main(int argc,char* argv[])
    {
        int calendar[12][31];
        int (*p)[31];
        int *q;
        int i,j;
        p = calendar;
        for (i=0;i<12;i++)
        {
            for (j=0;j<31;j++)
            {
                *(*(p+i)+j)=i*31+j;
            }
         }
        for (p=calendar;p<&calendar[12];p++)
        {
            for (q=*p;q<&((*p)[31]);q++)
            {
                printf("%d ",*q);
            }
            printf("\n");
        }
        return 0;
    }

下载它并且运行一下，看看自己是不是能够完全理解了。

注：`本文所有代码都是在linux下用gcc编译运行的`

[1]:http://www.cloudaice.com/blog/2012/02/11/point-and-array-in-c/
