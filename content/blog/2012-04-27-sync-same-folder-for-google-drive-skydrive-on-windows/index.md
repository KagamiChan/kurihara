---
draft: false
post_id: 315
publish_date: '2012-04-27T22:56:34.000+08:00'
revise_date: '2012-04-27T22:56:34.000+08:00'
tags:
  - drive
  - google
  - it
  - skydrive
  - 同步
  - 宅科技
  - 文件夹
title: Windows 下让 google Drive 和 Skydrive 同步同一个文件夹
---

注意：蛋疼有风险，操作需谨慎，有问题吾恕不负责

Google Drive 发布了，第一时间试用。目前的情况是 PC 客户端还能畅通。于是又看了一下我之前有的微软 Skydrive，深感为了同步同一份文件在同一台电脑上建立两个备份实在是不方便也不环保，如果能两个客户端同步同一个文件夹的话就好了。不幸的是，两家的程序都认文件夹名，Google Drive 的文件夹一定要叫 googledrive，Skydrive 同理，在小雪姐的提示下，使用了文件链接，总算是解决了这个问题。

经过测试，skydrive 不认文件夹链接，而 Google Drive 认。

skydrive 不介意要同步的文件夹事先有文件，google drive 介意。

于是我的步骤是这样的：

1.建立 SkyDrive 文件夹

2.建立 SkyDrive 文件夹的链接 Google Drive

```
mklink /j "X:/Google Drive" "X:/skydrive"
```

3.安装 Google Drive 客户端，设置同步文件夹为刚才的那个链接

5.安装 SkyDrive，设置同步文件夹为 SkyDrive

这样子做比较省硬盘空间，也省心，但是很有可能出现循环同步的灾难……虽然目前好像还没事……

所以后果自负，最好不要拿自己的重要的同步文件做这个试验 = =

---

请注意文件夹链接的特性：在这里 Google Drive 其实是一个链接，虽然使用起来和文件夹差不多。删除这个文件链接的命令是 rmdir 哦，删了的话不会对 skydrive 文件夹有影响

还有，做关于文件夹的操作前请把同步程序暂时退出，目前好像没看见有什么恢复手滑的选项
