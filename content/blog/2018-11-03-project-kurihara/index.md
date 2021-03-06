---
title: Project Kurihara
publish_date: '2018-11-03T01:52:08.922+08:00'
revise_date: '2018-11-03T01:52:08.922+08:00'
tags:
  - gatsby.js
---

![Project Kurihara](Momokuri.png)

经历了这么久的反复拖延和尝试，现在这一版基于 Gatsby.js 的日志日志系统看起来是基本成型了，好比画马画出了一个轮廓，只剩下添加一些细节了（真）。虽然我不能说之前的 Wordpress 系统不舒服所以写作量越来越少，但是切换到 markdown 之后，至少写技术方面的文章会更简单，也因此希望不再坑了。

项目名 Kurihara 是 2016 年的时候就起好的了，出处是《ももくり》的女主角的名字。因为 Kaminomi 系已经有一个类似的日志项目（ayumi on Jekyll，然而坑掉了），所以就没有接着在里面取。按照我这个开坑进度，估计 kaminomi 计划完成是遥遥无期了。

## Gatsby.js

在 2016 年的时候我曾经基于 Hexo 进行过一波尝试，结果是觉得定制太麻烦所以弃坑了。而作为新型静态内容生成器的 Gatsby 在定制性方面，远远超越了 Hexo。一方面基于 React.js 的生态系统，可以用上很多现有组件，另一方面，数据获取的方式的革新也使得代码组织方式比 Hexo 更为科学。虽然还是有一些类似魔法的东西，比如每个页面只能有一个 query，数据类型是运行时推断等，但整体的开发体验还是上升的，这也成为了我开发下去的动力。

## 评论功能

我很想保留原来日志的评论，但是旧有评论的迁移有一点困难。

在 wordpress 上，Disqus 可以通过 sql 数据库的 id 来定位日志，而切换过来之后只能手动赋值。这部分依靠一些自己鼓捣的脚本，也是可以（暴力）完成的。我在迁移数据的时候也保留了 id，但是还是免不了一堆手动的映射。而且我现在也没考虑好 slug 的形式，如果之后变化的话还会很困难。

其它的备选的话，除了 isso 自建之外，就只剩下要求超高权限的基于 github 的评论系统，都不甚完美。所以，最终可能就会砍掉评论功能了。

## 主题

目前的主题色仍然是沿用之前首页的来自 [saekano](https://www.saenai.tv) 的配色，排版方面，从居中布局换为左对齐布局。整体主要受到了 [egoist](https://egoist.moe/) 和 [sparanoid](https://sparanoid.com/lab/amsf/) 的影响。目前感觉比较难以设计的是日志首页，因为将旧日志完全导入之后，预计会有 300 左右的条目，虽然目测不会有太大的性能影响，但是对于阅读者的体验可能会很差，还是需要考虑分页，或者干脆直接把存档页面当作首页处理了。

## 一言

「一言」是这次终于忍不住加入的个人安利内容。主要会是我自己印象深刻的一些一些简短的文字段。这部分内容放在版权声明上面的话，感觉会让人以为是正文的一部分，但是放在下方的话又显得像是广告。不过，开心就好。

## 部署计划

有两个部署选项，一个是 Github Pages，好处是有比较好的访问性，再怎么说，也比我的 Linode 服务器要稳。但是它只能支持一个 CNAME，也就是说其它域名还需要在我的服务器上进行一次重定向。另外一个选项自然就是还部署在我的 VPS 上，不过这样就需要再额外实现一个 cron 或者 webhook 来处理，感觉也是有一点麻烦。

---

目前剩下的迁移工作就是移植旧有日志。这些日志有好几个来源，导入 wordpress 的时候就很混乱，不过当时都是 HTML ，都靠 CSS 处理掉了，转回 markdown 的话需要每一篇都确认一下。其它的就是要完成我时不时出现的一些脑洞需求，比如，怎么在一个页面里安利自己喜欢的动画，歌曲，游戏等等……
