---
layout: post
title: "Networkx to Draw graph"
description: "Python Networkx Drawing"
category: python
published: true

---
{% include JB/setup %}

使用Python的Networkx和matplotlib两个库可以画出由边和节点组成的图，支持节点，边的多项属性的设置。
包括颜色，标签，形状，边的宽度等等。

图的构建和基本使用
===============

使用下面两条语句作为程序开始导入的库语句。

    import networkx as nx
    import matplotlib as plt

使用Networkx的库建立初始化一个图：

    G = nx.Graph()
    
添加节点。nodename可以为字符串，也可以为一个整型。

    G.add_node(nodename)

添加一个由节点组成的列表。nodes_list为一系列节点组成的一个节点列表。

    G.add_nodes_from(nodes_list)

添加边。node1,node2为节点名字.
    
    G.add_edge(node1, node2)
    e = (node1, node2)
    G.add_edge(*e) #unpack edge tuple*
    
添加一个边的列表，edges_list为一系列边组成的一个列表

    G.add_edges_from(edges_list)
 
获得图G的节点总数
  
    G.number_of_nodes()
    
获得图G的边总数

    G.number_of_edges()
    
获得图G的所有节点的一个列表

    G.nodes()
    
获得图G所有边的一个列表

    G.edges()
    
为图，节点或者边添加属性，可以直接以字典的方式操作图的节点和边，而且它基本就是以字典的方式存储这些属性的。
>G.graph['attr_name'] = attr_value  
>G.node[nodename]['attr_name'] = attr_value  
>G.edge[node1][node2]['attr_name'] = attr_value  

例子：
    
    G.graph['title'] = 'cloudaice' #给图G添加一个title属性，值为'cloudaice'
    G.node[1]['means'] = 'grass' #给图G的节点1添加一个means的属性，值为'grass'
    G.edge[1][2]['len'] = 2 ＃给图G的边(1,2)添加一个len的属性，值为2
    
**注意：这里添加属性的作用仅仅在于方便自己的使用，不要把这里的属性名字和后面的画图时候的属性联系起来**
    
获得和node1相邻的所有节点

    G.neighbors(node1)

迭代访问图G的所有的边，根据上面的介绍，我们可以使用G.edges()获得图G的所有的边的一个列表，然后迭代访问，
但是对于比较大的图，它的边会非常多，这里提供一种迭代器访问的方法：

    for edge in G.adjacency_iter():
        print edge
        
更多使用方法可以参考[Networkx的官方文档](http://networkx.github.io/documentation/latest/tutorial/tutorial.html)

画图生成图片
==========

方法：

     nx.draw_networkx(G, pos, **kwds)
 
`pos`表示布局方式,常见的有以下几种布局方式：

* circular_layout
* random_layout
* shell_layout
* spring_layout
* spectral_layout

具体获得方法：

    pos = nx.circular_layout(G)
    pos = nx.random_layout(G)
    pos = nx.shell_layout(G)
    pos = nx.spring_layout(G)
    pos = nx.spectral_layout(G)

参数列表：

* with_labels:
    - 填写一个bool值，表示是否画出labels，默认是True.
* nodelist:
    - 所有节点的一个列表，默认是G.nodes().
* edgelist:
    - 所有边的一个列表，默认是G.edges().
* node_size:
    - 节点大小，可以是单个float值，也可以是一个列表，如果是列表的话，要与nodelist里面的节点对应。
* node_color:
    - 节点颜色，可以是单个string值，也可以是一个列表，如果是一个列表的话，也要与nodelist里面的节点对应。
* node_shape:
    - 设置节点形状,String。
* width
    - 边的宽度。默认是1.0。
* edge_color
    - 边的颜色，可以是单个string值，也可以是一个列表，如果是一个列表的话，要与edgelist里面的边对应。
* font_size
    - 字体的大小，默认是12。
* font_color
    - 字体颜色，默认是black。

显示图片：

    nx.draw(G, pos)
    plt.show()

保存图片：

    nx.draw(G, pos)
    plt.savefig('simple.png')

**这里的nx.draw()和nx.draw_networkx()里面使用的参数基本是一样的，只是draw_networkx()画出来的图片带坐标，这只是我试验的结果，不保证绝对正确**  
更多具体内容可以阅读[官方文档](http://networkx.github.io/documentation/latest/reference/generated/networkx.drawing.nx_pylab.draw_networkx.html#networkx.drawing.nx_pylab.draw_networkx)

总结
===
networkx库作为Python的一个强大的图处理库。基本可以处理关于图的所有建模问题，再加上使用matplotlib库对图进行可视化，操作起来非常好用,不过windows用户在安装这两个库的时候可能需要一些额外的扩展包，安装的时候注意一下就可以了。
    



  