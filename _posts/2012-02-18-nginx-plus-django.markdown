---
layout: post
title: "Nginx + Django"
date: 2012-02-18 15:35
comments: true
categories: tree
---

*  导引
    *  [前记](#q1)
    *  [实践的机会](#q2)
    *  [开始安装](#q3)
    *  [观察nginx的安装目录](#q4)
    *  [web应用的基本原理](#q5)
    *  [配置nginx服务器](#q6)
    *  [启动应用](#q7)
    *  [测试自己的网站](#q8)

        
+ <h3 id = "q1">前记</h3>

很早就听说nginx在高并发处理静态页面方面的能力惊人，于是就在心中想着什么时候，可以用它搭建一个网站，
然后再自己亲自测试测试。之前一直用apache做web服务器，<!--more-->当然也都是自己练习练习而使用的。想起自己刚
接触它是在学linux+apache+mysql+php。这是一个流行的不能再流行的组合。可惜一开始接触它们的时候，
我就一门心思想把它们搞懂，而没有把心思放在学习php和web前端语言本身上。那时才大二，除了会几行C语言
之外，其它的啥也不知道，就只是觉得好奇，还自以为是的去问给我们培训的学长，估计是学长觉得不好意思拒绝
回答又怕我听不懂，于是就简单的讲了几句。我感觉自己啥也没有收获到。不过在心里告诉自己弄懂这个原理才是
真本事，语言本身都是浮云。可想而知，那时候连计算机网络的边都没有碰到，怎么可能弄懂这些啊。最后php,html
,css这些也都学得半生不熟。不过我只是一直好奇为什么那么神奇，装上这个lamp之后，运行浏览器，就可以显示
自己编写的网页，还可以和php写的脚本进行交互。直到现在，看了三分之一的《计算机网络》。再加上在网上的
一些学习，原来这里面有web服务器，数据库服务器，还有以apache模块方式运行的各种东西。我可一画一张图，
说什么到哪里到哪里，但是要我说清每一个细节，还真说不清，不过至少现在不再对它那么好奇了。寒假的时候
还去图书管借了一本《apache cook book》,一看里面都是将怎么配置，怎么设置虚拟主机啊，还有各种模块啊。
虽然看着挺明白的，但是总觉得不是自己想要的。后来在一份邮件列表里面发了一份疑惑，有人推介我看看lighttpd
的源代码。于是就下载了，有时间真的应该好好看看。

+ <h3 id="q2">实践的机会</h3>

寒假也是无意之中，产生一个想法，写一个网站应用，主要是查询课表和教学楼教室的使用状态。因为很多时候
要去上课，却忘记了在哪一间教室，更多的时候，要去教学楼自习，自习到一半的时候，来人了，说这个教室有课。
于是，就想写一个简单的网页应用，大家可以直接用手机登录这个网站，然后就可以查询相关信息。虽然在自己的
电脑上也可以登录学校的官方网站查询。但是学校的网站过于繁杂更加不适合手机页面访问。于是就抱着试试看
的心理，开始写了。首先去学校的网站抓取必要的网页。（因为不可能轻易要到学校的数据库查询权限）。还好
这些事情用python很容易就可以搞定。用post或者get得到想要的网页之后。就使用python自带的库对html页面
进行解析。找出自己想要的内容。因为也是刚刚学习django，于是就使用sqlite3数据库，因为之前使用mysql
的时候，总是会被各种各样的问题困住，比如中文乱码，修改密码等一些问题。尽管之前也没有使用过sqlite3,
但是都是关系数据库，基本的方法还是查不多的，更何况，django自身提供了一个ORM。基本上就是用python语言
在对数据库操作。经过差不多一星期的努力时间，完成了查询课表，查询教室状态，以及使用反馈的功能。也算是
基本能够使用了吧。到了该部署的时候了，虽然桌上就放着一本《apache cook books》，但是有点不想用apache。
在lighttpd和nginx之间最后选择了nginx，原因是相对而言，它没有apache的臃肿，比lighttpd性能要优秀。

+ <h3 id="q3">开始安装</h3>

我选择的是用源码安装

首先要安装一些编译的时候需要的工具和依赖的库

**在ubuntu下使用以下方法**

>安装gcc g++ 具体可以使用tab建查看，选择版本

    sudo apt-get install gcc g++

>还要安装两个工具

    sudo apt-get install autoconf automake

>安装依赖的库

    sudo apt-get install zlib1g zlib1g-dev openssl libpcre3 libpcre3-dev

在centos下用以下命令

    yum -y install gcc gcc-g++ autoconf automake
    yum -y install zlib zlib-devel openssl openssl-devel pcre pcre-devel

安装完这些依赖的工具和库之后，就可以去[官方网站][1]下载tar.gz格式的源码包,根据情况下载最新版本的
下载得到源码包之后，切换到源码包文件目录，执行以下命令

    tar zxvf nginx-0.x.xx.tar.gz
    cd nginx-0.x.xx

接下来如果采用默认配置安装可以执行以下命令

    ./configure
    make
    sudo make install

如果要自定义安装，可以输入以下命令，查看各个参数表达的意思，再自行配置

    ./configure --help

如果是初次安装的话，建议先使用默认配置，先熟悉一下，等到熟悉之后，再自行配置参数进行安装

OK,现在已经把nginx安全地安装到电脑上了，如果这之间出现问题，可以一步一步检查，一般只要依赖的工具
和库都安装了，不会有什么问题，如果缺少库，则可以根据提示，安装相应的库。

+ <h3 id='q4'>观察nginx的安装目录</h3>

对于安装完一个程序，我最想知道的就是它在我的电脑都做了些什么，这样才会感到踏实。其实安装程序就是
把可执行文件，还有一些配置文件按照一定的组织方式放在一些地方。因此我们最应该要知道的就是它安装在
哪里了。当然这里讲的都是默认安装的情况下，如果是自己配置安装，那当然是一清二楚了。在默认安装的情况下
，nginx被安装在/usr/local/nginx。基本所有的有关nginx的都在这个目录下。其中可执行nginx文件在`sbin`目录下
，其他还有各种配置文件什么的，我们可以在这些目录下用`cd`,`ls`一个一个看过去。这样也有助于我们
消除好奇心。其实你可以在该目录下使用`ll`命令，你会发现实际上就只有四个目录是一般用户可以进去查看的，
其他目录都必须要管理员权限。这也近似的说明我们一般的操作只要对这四个目录进行一下操作。这四个目录分别是

>+ __conf__  存放一些配置文件，其中我们要重点配置就是这个目录下面的nginx.conf文件
>
>+ __html__  这个目录默认情况下就存放了两个html文件，其中一个是index.html，很显然这是测试我们nginx
>是否运行起来的测试显示文件，另外一个htnl文件也是类似作用
>
>+ __sbin__  这个目录刚才说过了，默认情况下就是只有一个nginx的可执行文件
>
>+ __logs__  这个目录下就只有两个文件：access.log，error.log，从名字上我们可以看出来，这是两个日志文件，
>分别记录，访问日志和错误日志。

经过这些分析，是不是感觉情况变得很明了了o(∩∩)o...

+ <h3 id='q5'>web应用的基本原理</h3>

首先要有一个web服务器，它的作用就是监听某个端口号，web服务里默认都是监听80端口。就仿佛你在浏览器中输入
一个网址，然后按回车建。其实默认是在你的网址后面再加上`:80`，只是这个大家都是知道的，所以就不用加上
`:80`了。而用户输入的域名呢，经过网络中的各种转换传输，最终就会映射到你的服务器上，换句话说，就是你
的主机。也就是说，用户在浏览器中发送了一个请求到你的主机的80端口上。而你的主机正好有一个web服务器监听着
80端口。OK，这个web服务就收到用户发出的请求了。基本的过程就是这样子的。所以web服务器就像是一个看守的
人，监视着是否有人发消息过来。web服务器收到消息之后，接下就要把消息给另外的程序，处理这个消息或者是请求
，这里有动态的和静态的两种，其实静态可以由web服务器自己直接抓取静态的东西发送给用户，但是动态的一些
就要另外的程序处理了。根据用不用的服务器端编程语言，如python,php,jsp,ruby等。针对发过来的动态请求，
用相应的程序运行处理之后，得到一个结果然后返回给服务器，服务器再发送给用户。而这个处理的过程可能又要
用到其它的东西，比如最重要的数据库。所以这些程序在处理的时候又会调用数据库。所以基本的过程就是这样子的。
至于具体的根据不用的情况会作出各种的优化。针对django和nginx，我们要引进一个fastcgi。具体的介绍可以
用google搜索。在这里简单介绍一下。它就是相当于连接web服务器和那些处理程序的。在这里就是链接nginx和
django的。负责获得web服务器给的信息。然后交给django里写的程序执行。相对来说它和django这一端关系比较紧密
至于具体fastcgi的好处，可以自行搜索。下面给个图形象展示一下：

![web](/images/web.png)

当然在实际中，web服务器担任了更加大角色。以及前面还会有均衡负载服务器等。

+ <h3 id='q6'>配置nginx服务器</h3>

上面讲到我们要使用fastcgi，因此在这里我们要安装一个python库，名字叫flup。你可以在google搜索，并且下载
到它，就想安装其它python库一样安装它就行。至此，我们最重要的一个步骤就是配置nginx的配置文件了。
就像我们刚才说过的，该配置文件在conf目录下，名字叫nginx.conf。在此，我先把自己的nginx.conf贴出来，
然后再一行一行分析：

    #使用的用户和组
    user  xc xc;
    #制定工作衍生进程数
    worker_processes  4;
    #制定log存放位置
    #error_log  /usr/local/nginx/logs/error.log;
    #error_log  /usr/local/nginx/logs/error.log  notice;
    error_log  /usr/local/nginx/logs/error.log  info;
    #error_log  /usr/local/nginx/logs/error.log  error;
    
    #制定pid存放路径
    pid        /usr/local/nginx/conf/nginx.pid;
    #制定文件描述符数量
    worker_rlimit_nofile 51200;
    
    #event模块
    events {
        #使用网络I/O模型  linux 推介使用epoll模型
        use epoll;
        # 允许的连接数
        worker_connections  51200;
    }
    
    http {
        include       mime.types;
        default_type  application/octet-stream;
    #默认log的格式，名称为main
        log_format  main  '$remote_addr - $remote_user [$time_local] "$request" '
                          '$status $body_bytes_sent "$http_referer" '
                          '"$http_user_agent" "$http_x_forwarded_for"';
    #设置访问日志，格式为main
        access_log  /usr/local/nginx/logs/access.log  main;
    
        sendfile        on;
        #tcp_nopush     on;
    
        #keepalive_timeout  0;
        keepalive_timeout  65;
    #设置压缩输出，作用是能够把信息压缩后再输出，浏览器再解压显示
        gzip  on;
        gzip_min_length 1k;
        gzip_buffers 4 16k;
        gzip_http_version 1.1;
        gzip_comp_level 2;
        gzip_types text/plain application/x-javascript text/css application/xml;
        gzip_vary on;
    #主机配置
        server {
            listen       80;
            server_name  localhost;
    
            #charset koi8-r;
    
            #access_log  logs/host.access.log  main;
            #设置该网站应用中所需要的静态文件的根目录
            location ~/static/ {
                root   /home/xc/jwcsite/;
               # root  html;
               # index  index.html index.htm;
                break;
            }
            #设置静态页面的根目录，此为admin的静态页面根目录，是我再查看错误日志的时候，看到admin应用是要调用admin/css/下面的内同的，所以我就按照这种路径进行修改了
            location ~/media/ {
                root   /home/xc/jwcsite/static/;
               # root  html;
               # index  index.html index.htm;
                break;
            }
           
            
            #host and port to fastcgi server 
            location / {
            fastcgi_pass 127.0.0.1:8080;
            fastcgi_param PATH_INFO $fastcgi_script_name;
            fastcgi_param REQUEST_METHOD $request_method;
            fastcgi_param QUERY_STRING $query_string;
            fastcgi_param CONTENT_TYPE $content_type;
            fastcgi_param CONTENT_LENGTH $content_length;
            fastcgi_param pass_header Authorization;
            fastcgi_intercept_errors off; 
            }
            #设置浏览器缓存这些图片格式文件浏览器缓存时间是30天，css/js缓存时间1小时
            location ~ .*\.(gif|jpg|jpeg|png|bmp|swf)$
            {
                expires 30d;
            }
           
            location ~ .*\.(js|css)?$
            {
                expires 1h;
            }
            #error_page  404              /404.html;
    
            # redirect server error pages to the static page /50x.html
            #
            error_page   500 502 503 504  /50x.html;
            location = /50x.html {
                root   html;
            }
    
            # proxy the PHP scripts to Apache listening on 127.0.0.1:80
            #
            #location ~ \.php$ {
            #    proxy_pass   http://127.0.0.1;
            #}
    
            # pass the PHP scripts to FastCGI server listening on 127.0.0.1:9000
            #
            #location ~ \.php$ {
            #    root           html;
            #    fastcgi_pass   127.0.0.1:9000;
            #    fastcgi_index  index.php;
            #    fastcgi_param  SCRIPT_FILENAME  /scripts$fastcgi_script_name;
            #    include        fastcgi_params;
            #}
    
            # deny access to .htaccess files, if Apache's document root
            # concurs with nginx's one
            #
            #location ~ /\.ht {
            #    deny  all;
            #}
        }
    
    
        # another virtual host using mix of IP-, name-, and port-based configuration
        #
        #server {
        #    listen       8000;
        #    listen       somename:8080;
        #    server_name  somename  alias  another.alias;
    
        #    location / {
        #        root   html;
        #        index  index.html index.htm;
        #    }
        #}
    
    
        # HTTPS server
        #
        #server {
        #    listen       443;
        #    server_name  localhost;
    
        #    ssl                  on;
        #    ssl_certificate      cert.pem;
        #    ssl_certificate_key  cert.key;
    
        #    ssl_session_timeout  5m;
    
        #    ssl_protocols  SSLv2 SSLv3 TLSv1;
        #    ssl_ciphers  HIGH:!aNULL:!MD5;
        #    ssl_prefer_server_ciphers   on;
    
        #    location / {
        #        root   html;
        #        index  index.html index.htm;
        #    }
        #}
    
    }

看起来有点长，不过后面灰色的内同都是注释掉的内容，只是配置文件默认就存在的。这些注释掉的内容分别是
设置反向代理和虚拟主机用的。这份配置文件在我的django应用中能够很好地使用。
**强调一下，仅仅是可以使用，因此是初步的设置，具体的分析和优化还没有做**
>+ 第二行的user只的是你的linux机器上你的组和你的用户名。如果不知道的话,可以在shell中输入`id`，
>就会显示你所在的组和你的用户名。
>
>+ 第四行可以根据你的cpu性能进行设置，一般4个差不多了，在下面的测试，
>我会讲到。
>
>+ 第八行，设置你的error_log的位置，而后面跟着的`info`表示要显示的类型，你可以分别试试，我注释掉的
>同的显示，看看到底有什么不一样。
>
>+ 第八行，设置你存放pid的位置，在这里，当nginx启动之后，会有一个master进程，以及若干个worker进程。
>当你在这里设置pid后面的路径之后，比如我这里，就会在该路径的nginx.pid中存入master进程号。
>这个进程号在我们要停止nginx以及重启等有很大用处。
>
>+ 接下来是events模块，基本都用详细的注释，按照设置就行，其中worker_connections后面的数字，
>我这里设置的比较大，其实可以小一点，一两千就够了。这里的数字是我在压力测试的时候设置的。
>
>+ 接下来是http模块，这些选项照抄就行，其中log_format定义了一个log的格式为`main`。
>基本上这个格式就挺好，在后面会用到`main`这个格式。
>access_log 和之前设置的error_log表示的意思类似。
>
>+ 看看http模块中的server模块,先是监听80端口，server_name我们这里就设置为localhost，也可以写127.0.0.1
>我们在自己机器上都是使用这个作为测试的。location ~/static/和location ~/madia/这两个比较重要，
>在这里详细讲解一下。刚才我展示了一张图片，其中当要用到静态文件的时候,是由nginx自己去抓取的。
>而我们在网站应用开发的时候都会有一个static或者media文件。里面一般存放着三个文件`js`,`css`,`images`，
>这些都是静态文件，因此我们要告诉nginx去哪里抓取静态文件。在这里location后面跟着的名字不时很重要
>只要不重复就行，但是最好是有一定的代表意义。关键是root这里的设置。举个简单的例子，
>假如在我们的一个htnl文件里有这么一个引用图片的语句`src = "/static/images/tree.png"`。
>那么实际上工作的时候就会把这个路径加上root设置的路径，然后去寻图片。对于css，js也是这么寻找的。
>也就是你设置完之后，这样字加起来能够成为这些静态文件的绝对路径，就没有问题了。
>我这里有两个这样的设置，是因为django里面admin这个应用本身要用到静态文件，因此我就把它拷贝出来。
>放到我自己的应用的static下面。但是我运行的时候，发现admin应用还是没有加载静态文件，
>然后，我就打开error.log。发现在admin应用里的静态文件引用是`admin/css/base.css`，
>于是我按照**路径组合最终是绝对路径**的原理。在上面加了一个`admin`的目录。因此我的静态文件的目录
>是这样子的

    /home/xc/jwcsite/-
                     -static-
                            -css
                            -js
                            -images
                            -admin-
                                  -css
                                  -js
                                  -img
>另外`admin`的静态文件目录如下
>

    /usr/local/lib/python2.6/dist-packages/django/contrib/admin/media/

>
>+ 再接下来就是设置fastcgi模块了。这里就先照抄，只要先知道fastcgi_pass。这个是等一下启动
>fastcgi的时候要用的。相当于告诉web服务器到时候怎么和fastcgi通信。很明显这里我们使用的是
>tcp/ip形式。主机名加端口方式，另外还有一中unix的socket方式。大家可以看fastcgi介绍。
>
>82行这里是设置浏览器缓存，在这里的意思就是，这些后缀名的图片在浏览器端缓存30天。
>而js，css这些缓存一小时，浏览器缓存可以明显较少网络传输的负担。

+ <h3 id = 'q7'>启动应用</h3>
到现在为止我们已经完成了nginx的设置。可以尝试启动nginx服务器了。在这里，
我又感到一个好处，就是nginx可以由自己启动`^_^`。fastcgi也是由自己启动的


    sudo /usr/local/nginx/sbin/nginx -c /usr/local/nginx/conf/nginx.conf

上面这条命令可以启动nginx服务器，可以看出前面部分是nginx的可执行文件，后面是配置文件，
`-c`表示制定配置文件。

    sudo /usr/local/nginx/sbin/nginx -t -c /usr/local/nginx/conf/nginx.conf

上面这条命令用于测试配置文件是否正确，如果不正确会出现提示，告诉你哪一行有错误

    kill -HUP nginx主进程号

上面命令可以让nginx平滑重启，当修改过配置文件之后，就可以使用这个命令使得载入新的配置文件
其中，nginx的主进程号，可以有两种方式获得。第一种是我们在配置文件里提到的。
在我们设置的配置文件里面的那个nginx.pid存放着nginx的主进程号可以使用cat命令查看。
还有一种方法，执行下面命令

    ps -ef | grep nginx

会显示出nginx的主master进程，和worker进程，master进程号就是主进程号。

    kill -QUIT nginx主进程号

上面命令可以从容停止nginx


    python manage.py runfcgi host=127.0.0.1 port=8080 --settings=settings

上面命令用于启动fastcgi，其中host和port就是我们之前在nginx配置文件中对fastcgi的设置。
启动安装settings.py文件的设置启动，这里我们要注意，在开发的时候，我们使用django都是
在debug模式下面的。但是，现在真正部署了，我们必须把debug设置为`False`。之后，
我们最好添加一些404.html,500.html这些页面增加界面友好性，我们只要自己写出这些页面，
然后扔到`template`的根目录下面就OK了。

>>好了，现在你打开浏览器，输入`localhost`，尽情享用你自己的网站吧。

+ <h3 id='q8'>对自己网站的测试</h3>
我在虚拟机中搭建完成之后，下载了一个webbench压力测试软件，安装很简单，直接解压
make和sudo make install。输入`webbench`就会显示参数帮助，一般`-c`表示并发数，
`-t`表示持续时间。

下面看看测试结果：

* * * 

> 200个并发数，持续5秒，worker_processes 2  worker_connections 1024

![webbench1](/images/webbench1.png)

* * * 

>1000个并发数，持续5秒，worker_processes 2  worker_connections 1024

![webbench2](/images/webbench2.png)


* * * 

>3000个并发数，持续5秒，worker_processes 2  worker_connections 1024

![webbench3](/images/webbench3.png)

* * * 

>3000个并发数，持续5秒，worker_processes 4  worker_connections 51200

![webbench4](/images/webbench4.png)

* * * 

>5000个并发数，持续5秒，worker_processes 4  worker_connections 51200

![webbench5](/images/webbench5.png)

* * * 

>5000个并发数，持续10秒，worker_processes 4  worker_connections 51200

![webbench6](/images/webbench6.png)




[1]:http://www.nginx.net/


