---
draft: false
post_id: 1256
publish_date: '2014-02-26T20:36:27.000+08:00'
revise_date: '2014-02-26T20:36:27.000+08:00'
tags:
  - 未分类
title: 2014 年 2 月 26 日
---

随手记一下这几天认知到的冷知识。我对冷知识的定义是，网上（Google）很难搜索得到正确答案的，或者虽然有答案但是语焉不详或者过时的，而且这个问题不解决的话还是相当困扰的，但是它的意义本身也不应该花这么多时间……好吧闲话不表，因为不想占用太多的时间，就直切主题了。

- [Font Awesome 4.0](http://fortawesome.github.io/Font-Awesome/) 的 Play 按钮不是真正的三角形，在 Photoshop 里边设置一个大的字体大小，比如 4000 点，就能看出来了。三个角都是圆角。当然 Google Play 的图标也不是尖角，所以有可能本来 Play 图标就应该是这样。对于（暂时）尖角强迫症的我来说，最后用的是 [Genericons](http://genericons.com/) 的。

- WordPress 的 Widget 在最后输出的时候会有一个特定的 Class 名，如何修改这个 class 名，使得它可以继承别的类的样式呢？在构建 widget 的属性 array 中加上：

  ```
  'classname' => 'a-class  your-widget-class'
  ```

- python 的安装包管理程序 pip 需要连接的官方源被墙了，国内可用的是清华源。对于 windows 7 来说，需要做的设置是打开系统盘下的用户/你的用户名/pip。如果里边有一个 pip.ini 那么就打开它，没有的话就创建一个 pip.ini，在里边写上：

  ```ini
  [global] index-url=http://mirrors.tuna.tsinghua.edu.cn/pypi/simple
  ```

  这个对于未安装 pip 的人来说也是适用的，因为人家的 get-pip.py 也能读取这个 ini 来确定源。

- ruby 1.94 windows 上，修改文件默认读取编码的方法是加入一个 RUBYOPT 的环境变量，值为：

  ```
  -E utf-8
  ```

- Photoshop CS 6 的图层分布方式基本都是以每个图层的某一个外围点作为起点来计算的，不能实现等距离分布（图层和图层之间的距离都是相等的）。Trevor Morris 提供了两段代码，可以实现这一目的。使用的时候图层需要先栅格化。
  http://morris-photographics.com/photoshop/scripts/distribute-horizontally.html
  http://morris-photographics.com/photoshop/scripts/distribute-vertically.html
