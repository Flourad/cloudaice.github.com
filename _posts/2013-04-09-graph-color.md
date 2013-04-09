---
layout: post
title: "图着色问题的Python实现"
description: ""
category: python
published: true

---
{% include JB/setup %}

问题描述
=======

给一个无向图进行着色。要求是任意两个相连的定点着不同的颜色。要求使用最少的颜色数目，这是一个典型的NP问题。
也就是说在多项式时间内是无法解决的。

着色算法
=======
这里提供一种普遍的启发式算法：随机得到一个节点的序列，按照顺序依次对列表的节点进行以下操作：  

> 判断该节点的所有邻居节点，是否有着颜色1的，如果没有则将当前节点颜色着为1，如果有，则看是否有颜色2...依次类推，直到着上颜色为止。

经过这样的一个过程之后，整个图就会被着上各种颜色。这种方法最后得到的颜色总数不一定会是最少。但是我们可以通过对多个随机节点序列进行这样的操作，最后得到一个颜色最少的方案。

使用pygraphviz画图
=================
在上一篇[文章](http://cloudaice.com/networkx-to-draw-graph/)中讲解了使用networkx和matplotlib两个Python扩展库进行画图。这里介绍使用graphviz这个扩展库来绘制图。graphviz这个软件应该并不陌生，它在可视化领域中应用中非常广泛。基于它的python扩展功能也很强大。并且graphviz中使用的图可以通过networkx中画出来的图进行转化，本例程就是通过将networkx中的图转化成pygraphviz中的图来完成的。具体着色代码如下：

    import networkx as nx
    import pygraphviz as pgv
    import sys
    #解决字体编码问题
    reload(sys)
    sys.setdefaultencoding('utf-8')
    node_map = {}
    MAX_COLORS = 100
    iteraters = 0
    
    
    def format_color(num):
        color_num = '%6X' % num
        color_num = color_num.strip()
        return '#' + '0' * (6 - len(color_num)) + color_num


    def random_color(n):
        #随即产生颜色迭代器
        max = 2 ** 24 - 1
        step = max / n
        for i, color in enumerate([format_color(x) for x in range(1, max, step)]):
            yield color, i + 1


    def build_graph(docs):
        G = nx.Graph()
        nodes = docs.keys()
        G.add_nodes_from(nodes)
        total_edges = [(node1, node2) for i, node1 in enumerate(nodes) \
            for node2 in nodes[i + 1:]]
        for node1, node2 in total_edges:
            intersection = list(set(docs[node1]) & set(docs[node2]))
            if intersection:
                G.add_edge(node1, node2)
        G = nx.to_agraph(G)
        for i, node in enumerate(G.nodes()):
            node_map[i + 1] = node
        return G
        
        
    def post_colors(G):
        for i, node in enumerate(G.nodes()):
            neighbors_colors = []
            for node1 in G.in_neighbors(node):
                node1 = G.get_node(node1)
                neighbors_colors.append(node1.attr['color'])
            neighbors_colors = list(set(neighbors_colors))
            this_color = 'black'
            colors = random_color(MAX_COLORS)
            for color, num in colors:
                if color not in neighbors_colors:
                    this_color = color
                    print num
                    break
            n = G.get_node(node)
            n.attr['color'] = this_color
            if this_color == 'black':
                print 'black'
        return G
        
        
    def draw_graph(G):
        G.graph_attr.update(splines='polyline')
        G.node_attr['style'] = 'filled'
        G.node_attr['shape'] = 'circle'
        G.node_attr['fixedsize'] = 'true'
        G.node_attr['fontcolor'] = 'black'
        G.node_attr['fontsize'] = 24
        G.node_attr['height'] = 2.4
        G.node_attr['labelloc'] = 'b'
        G.edge_attr['color'] = 'grey'
        G.edge_attr['fillcolor'] = 'black'
        G.edge_attr['minlen'] = 5
        G.write('simple.dot')
        G = pgv.AGraph('simple.dot')
        G.layout('fdp')
        G.draw('simple.png')
        
        
    if __name__ == "__main__":
        docs = read_xls(filename)
        G = build_graph(docs)
        G = post_colors(G, 10)
        draw_graph(G)
        
这里我通过读取一个excel表格的数据来构建一张图。使用`G = nx.to_agraph(G)`这条语句将从networkx建立的图转成pygraphviz构建的图。注意画图时候设置各种参数来调整画出来的图的样式。这里和使用matplotlib[画图的方式](http://cloudaice.com/networkx-to-draw-graph/)有很大的不同.

递归着色方法
==========
这个问题的着色方法也可以采用递归遍历着色的方法，主要涉及两个函数，一个用于判断当前节点着当前颜色是否可行，另一个函数对图节点进行递归着色。

    def isok(G, node):
        this_node = G.get_node(node)
        for node_neighbor in G.in_neighbors(node):
            node_neighbor = G.get_node(node_neighbor)
            if this_node.attr['color'] == node_neighbor.attr['color']:
                return False
        return True

***

    def DFS(G, step, color_num):
        global iteraters
        iteraters += 1
        if step > G.order():
            return True
        for color in range(1, color_num + 1, 1):
            node = G.get_node(node_map[step])
            node.attr['color'] = color
            if isok(G, node_map[step]):
                if (DFS(G, step + 1, color_num)):
                    return True
            node.attr['color'] = 0
        return False
        
有解决该问题的时间复杂度是非多项式的，在这里通过多线程的方法设置一个等待时间，一旦使用n种颜色进行着色的迭代时间超过等待时间，则认为最少使用颜色数目为`n+1`。等待时间可以作为一个参数传入。实现代码如下，颜色数目从节点个数依次减一，直到某次颜色迭代时间超过了等待时间。

    def min_colors(G, i):
        if DFS(G, 1, i):
            print 'min color nums:', i
    
    
    def post_min_colors(G, seconds):
        for i in range(G.order(), 1, -1):
            A = G.copy()
            global iteraters
            iteraters = 0
            t = threading.Thread(target=min_colors, args=(G, i))
            t.setDaemon(True)
            t.start()
            t.join(timeout=seconds)
            if t.isAlive():
                print 'iteraters:', iteraters
                break
        colors = [color[0] for color in random_color(MAX_COLORS)]
        for node in range(1, A.order() + 1, 1):
            node = A.get_node(node_map[node])
            node.attr['color'] = colors[int(node.attr['color'].encode('utf-8'))]
            node.attr['label'] = str(node)
        return A

通过设置second的值的大小来调整等待时间的大小.

输出结果图
=========
这里主要强化了节点，弱化了边，因此边的颜色设置比较淡。

![着色图](/images/m-graphviz.png)

关于绘图的更多样式介绍，可参考[官方手册](http://www.graphviz.org/doc/info/attrs.html)。

        


