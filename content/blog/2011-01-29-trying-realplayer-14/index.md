---
draft: false
post_id: 241
publish_date: '2011-01-29T00:24:25.000+08:00'
revise_date: '2011-01-29T00:24:25.000+08:00'
tags:
  - it
  - mpc-hc
  - real
  - realnetworks
  - realplayer
  - rmvb
  - 宅科技
  - 视频
  - 解码器
title: Realplayer 14 简单试用
---

今天看到 Realplayer 14 发布了，这一个曾经的流行播放器让我有一点怀旧的心绪，于是试用了一下。就用了几分钟，却花了我几个小时为这个软件造成的问题折腾。果然当小白鼠得开虚拟机啊……用真实机器的我不幸中弹了。

RealNetworks 公司抱着已经腐朽的 rmvb 编码格式不放，在媒体支持上并没有任何新意。很奇怪的是它不能播放 mkv 格式，即使我的计算机上装有了 haali matroskasplitter。而播放自己家 rmvb 的效果反而是比 mpc-hc 还要差，我很怀疑是渲染器的问题。因为放大之后 Realplayer 的视频有着明显的锯齿感。

接下来的时间就是讲述这个软件怎么让我中弹的了。试用完之后，我用 mpc-hc 打开 rmvb，意外地发现解码器由之前的"RealVideo 解码器"变成了"ThunderRMVideo Decoder"，在 mpc-hc 中禁用了迅雷的 rmvb 解码器之后，mpc-hc 居然播放不了 rmvb 了，显示没有找到合适的解码器。虽然其实播放效果差不多（除了 ffmpeg，所有 rmvb 解码器的核心都是 realmedia 的东西），但是迅雷的附加的东西总是让我本能地反感。因为迅雷 7 也是最近新装的，于是我认为着了这两位中某一位的道。

首先，重装了 real alternativelite，并且在 mpc-hc 外挂滤镜中手动添加，调到最高优先级，无效，一样找不到合适的解码器。

之后是卸载 realplayer，使用自带卸载程序卸载，使用网上的一个卸载脚本卸载，均无法使 Real AlternativeLite 正常工作。重复 RAL 的安装也没有用。

最后是鼓捣迅雷的解码器，解除相关 ax 的注册，解除滤镜的注册，卸载迅雷，删除解码器所在文件夹，均无效。

在我心灰意冷地开始评测 ffmpeg 播放 rmvb 能力的时候，突然想到，既然 RAL 的原理是连接 realnetworks 的解码器，那么会不会是 realnetworks 的解码器版本更新了，或者关闭了接口的缘故呢？搜索了几遍也没有找到 realnetworks 的解码器在系统或者注册表的路径，于是最后还原到了上了还原点，总算圆满解决了。

于是这篇日志的内容主要还是自己的流水账，完毕。

Realplayer 14 dose not work with Real Alternative/RealAlternative Lite! DO NOT installRealplayer 14!
