---
draft: false
post_id: 1278
publish_date: '2014-08-16T18:58:44.000+08:00'
revise_date: '2014-08-16T18:58:44.000+08:00'
tags:
  - 未分类
title: |
  随手记 20140816
---

最近开始尝试[中文文案排版指北](https://github.com/sparanoid/chinese-copywriting-guidelines)的汉字-拉丁文间隙部分，大意就是人肉加空格。之前试过[自动增加间隙的 han.js](https://github.com/ethantw/Han)，但是感觉不是很舒服。在我眼里有些中文格式推广者太过于……原教旨主义了。

给 VPS 上安装了 [Rainloop](http://rainloop.net/)  网页邮件客户端，作为无科学上网条件下访问 Gmail 的备用选择。服务器上是采用了 nginx + php-fpm 的方案。为了让程序能够正常执行，也方便自己以后通过 SFTP 修改，给自己的用户设置了一个用户组，并且把 www-data 加入了这个组，再给程序文件轰成 640 属性，需要写入的数据文件夹才会加上组内写入权限。恶补了一些关于权限方面的知识。

给 VPS 上加了 fail2ban 和 logwatch 服务。

见到有人提了一个问题，如何把 %23 重写成 # 符号。这个问题的关键在于浏览器在处理相对的地址转向的时候会把 %23 等同于 #。解决方法是把重写 URI 写完整。代码如下（ nginx ），假定传入 URI 为 `http://xxx.xx/www/www/%23example`：

```nginx
location /www/www/ {
  rewrite "/\\#(.\*)$" http://xxx.xx/www/www/#$1 last;
}
```

关于 WP 的代码语法高亮，我实在找不到不冲突且不另外定义标签的插件可用了，于是就这么放着吧。
