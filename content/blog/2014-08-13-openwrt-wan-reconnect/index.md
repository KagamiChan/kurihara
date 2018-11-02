---
draft: false
post_id: 1274
publish_date: '2014-08-13T12:26:49.000+08:00'
revise_date: '2014-08-13T12:26:49.000+08:00'
tags:
  - 未分类
title: Openwrt wan 的断线重连
---

早起发现断网了，登路由器的上 luci 一看，原因是 wan 断线了。于是就上网搜索了一下如何断线自动重连。总结的方法有两个：

### 使用 [pppoe 的 keepalive 属性](http://wiki.openwrt.org/doc/uci/network#protocol.pppoe.ppp.over.ethernet)

这个属性说法是经过多少次连接失败后会自动重连。具体的连接失败貌似是指 lcp echo 的失败。我没想出怎么测试管不管用，姑且设置成为 5 。

这个设置的 uci 命令是

```shell
uci set network.wan.keepalive=5uci commit
```

或者直接修改 luci wan 界面的 LCP echo failure threshold 一项。

### 使用自定义的检测脚本

综合参考了几个感觉很深奥，脚本很复杂的文章之后，我用了这么一个脚本：

```shell
#! /bin/shif ! ping -c 1 114.114.114.114 > /dev/nullthen ifup wanfi
```

该脚本的原理是 ping 114.114.114.114，如果没有通的话，则自动重连 wan。这个脚本的文件名和文件位置是随意的。我自己是放在了 /etc/config/reconnect.sh。然后在 luci 的  Scheduled Tasks 里边加入一行

```
\*/1 \* \* \* \* /etc/config/reconnect.sh
```

之后重启路由或者执行

```shell
/etc/init.d/cron restart
```

其结果就是每分钟执行一次 reconnect.sh 脚本
