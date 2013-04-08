---
layout: post
title: "用python的HTMLParser分析html页面"
date: 2012-02-19 13:44
comments: true
categories: python

---

python里面有很多实用简单的工具，下面记录一下自己学习使用HTMLParser模块分析抓取的网页的例子:
<!--more-->

+ ###基本使用模式

        class classname(HTMLParser):
           def __init__(self):
               '''
               设置自己定义的初始化变量


               '''
               #执行基类的初始化函数
               HTMLParser.__init__(self)
           def handle_starttag(self,tag,attrs):
               '''
               tag表示碰到的标签
               attrs是一个序列，序列中的内容为元组，
               一个元组中有两个元素，分别是该标签的属性和该属性的值
               判断逻辑语句
               '''
           def handle_data(self,data):
               '''
               这里的data为上面tag标签包含的内容
               对内容进行一些处理
               '''
           def handle_endtag(self,tag):
               '''
               这里tag对应的上面那个标签的结束标签
               例如上的标签为<p>，则这里对应的是</p>
               在这里写一些处理的语句
               '''
           def getresult(self):
               '''
               写一些自己要返回的内容
               '''
        if __name__=="__main__":
            obname=classname()
            obname.feed(html_data)
            obname.getresult()

+ ###分析
  
  在使用HTMLParser模块的时候，基本都是先建立这样一个类，类的名字可以根据自己的应用起，
  这个类继承**HTMLParser**类。里面主要写这三个方法：  
  + handle_starttag
  >这里写你要处理的html标签。例如  
  `if tag=='td':....`  
  你可以在这里写一些判断语句以及设置一些标记量

  + handle_data   
  >主要做一些对开始的时候铺货的标签的内容做一些处理

  + handle_endtag 
  >这个方法是和 handle_starttag 对应的。因为标准的html页面都是有闭合标签的
    在这里可以做一些完成工作
  
+ ###示例
  下面是一个抓取`www.python.org/index.html`页面中所有链接内容的程序

        from HTMLParser import HTMLParser
        import urllib
        import sys
        class parselinks(HTMLParser):
            def __init__(self):
                self.data=[]
                self.href=0
                self.linkname=''
                HTMLParser.__init__(self)
            def handle_starttag(self,tag,attrs):
                if tag =='a':
                    for name,value in attrs:
                        if name == 'href':
                            self.href=1
            def handle_data(self,data):
                if self.href:
                    self.linkname+=data
            def handle_endtag(self,tag):
                if tag=='a':
                    self.linkname=''.join(self.linkname.split())
                    self.linkname=self.linkname.strip()
                    if  self.linkname:
                        self.data.append(self.linkname)
                    self.linkname=''
                    self.href=0
            def getresult(self):
                for value in self.data:
                    print value
        if __name__=="__main__":
            IParser = parselinks()
            IParser.feed(urllib.urlopen("http://www.python.org/index.html").read())
            IParser.getresult()
            IParser.close()


下面是程序运行输出结果

        AdvancedSearch
        About
        News
        Documentation
        Download
        下载
        Community
        Foundation
        CoreDevelopment
        Help
        PackageIndex
        QuickLinks(2.7.2)
        Documentation
        WindowsInstaller
        SourceDistribution
        QuickLinks(3.2.2)
        Documentation
        WindowsInstaller
        SourceDistribution
        PythonJobs
        PythonMerchandise
        PythonWiki
        PythonInsiderBlog
        Python2or3?
        HelpMaintainWebsite
        HelpFundPython
        Non-EnglishResources
        PythonReleaseScheduleiCalCalendar
        Python3
        PyPIpackagename
        Results
        Rackspace
        IndustrialLightandMagic
        AstraZeneca
        Honeywell
        andmanyothers
        eWeek
        more...
        WebProgramming
        CGI
        Zope
        Django
        TurboGears
        XML
        Databases
        ODBC
        MySQL
        GUIDevelopment
        wxPython
        tkInter
        PyGtk
        PyQt
        ScientificandNumeric
        Physics
        Education
        pyBiblio
        SoftwareCarpentryCourse
        Networking
        Sockets
        Twisted
        SoftwareDevelopment
        Buildbot
        Trac
        Roundup
        IDEs
        GameDevelopment
        PyGame
        PyKyra
        3DRendering
        more...
        opensourcelicense
        Python2orPython3
        PythonSoftwareFoundation
        PyConconference
        Readmore
        downloadPythonnow
        O'ReillyOpenSourceConvention
        CallforProposals
        BestProgrammingLanguage
        PyConinChina
        IronPython2.7.1
        PyArkansas
        PyGotham
        Python3.2.2
        RSS
        WebsitemaintainedbythePythoncommunity
        hostingbyxs4all
        designbyTimParkin
        PythonSoftwareFoundation
        LegalStatements


