---
draft: false
post_id: 1122
publish_date: '2010-08-26T20:21:50.000+08:00'
revise_date: '2010-08-26T20:21:50.000+08:00'
tags:
  - DVDRip
  - VOBUtils
  - 宅科技
title: 分割 VOB 文件的小工具：VOBUtils
---

最近在弄真野恵里菜的《乙女の祈り》的 DVDRip。这个 DVDISO 大小是 1.5G，三段节目，分为两个 VOB 文件。自从发现 DGIndex 不能精确到帧进行分割之后，我就在 avs 里边用 trim 函数来分割，具体就是读取 ifo 文件中的时间码，然后自己算出相关的帧数。不过之前已经在网上看到了有人分割好的 VOB 文件下载，所以我自己想，是不是有什么工具可以无损分割。搜索了一下，的确有这样的软件，例如 DVD Decypter——据说之前的 DVDRip 都会用到这工具，不过小雪姐告诉我说，WinRAR 已经能够解压 ISO 了，根本犯不着再用那软件了。另外一个工具就是 VOBUtils，它的唯一用途就是读取 ifo 文件，再对相关的 VOB 进行无损分割。很奇怪的是，这个小软件在 Videohelp 上边根本找不到。之前所用到的各种工具在那上边都有的说。

以后再做 DVDRip 的话，我想我大概不会再 EP 地用 trim 函数了，下一次就试试载入镜像再用 DVD Decrypter 或者 VOBUtils 的效果如何。
