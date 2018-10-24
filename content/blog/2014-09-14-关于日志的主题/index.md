---
draft: false
post_id: 1287
publish_date: '2014-09-14T04:05:00.000+08:00'
revise_date: '2014-09-14T04:05:00.000+08:00'
tags:
  - 未分类
title: |
  关于日志的主题
---

正式确认了旧日志已经阵亡，有事烧香之后，重建也在计划当中了。此时 Linode 的注册就送 10 刀的优惠简直让人心动 = =

前几天说要给自己的日志做一个新主题，不过现在还是没有动手。当然，治疗拖延症的首要手段就是「马上去做」，但是作为高级患者，还是忍不住为自己找一个理由：wordpress 的主题开发是投入大产出小的事情。

上次基于 `twentyfourteen` 改主题的时候，主要是将原本最高只有 1152px 宽的页面，在我的 1080p 屏幕上看，右边会空出一大截，实在不舒服，所以改造成为全画面的。当时的我还不知道有子主题这样的手段，也对 `SASS` / `LESS` 之类的了解不多，所以都是直接查找替换颜色，各个 `@media` 里边的绝对宽度换成相对宽度，每次变动都得进行各分辨率调试，而且当时的 Chrome 和 Firefox 还没有开发者工具还没有响应式工具，改得很痛苦，最后还是留下了一些问题。

从这个主题的 css 注释来看，开发者应该用了 css 编程编译工具——我才不信他们和我一样批量替换修改呢，但是却恶意地没有提供源代码，虽然 github 上有基于 [SCSS 的](https://github.com/arounditNet/TwentyFourteen-Child-SCSS) 和 [LESS 的](https://github.com/pelicanpaul/twentyfourteen-childless) 子主题，不过响应式调整方面的坑估计还是还是很大，作罢。

基于前端框架开发的主题也是有的，比如用 `bootstrap` 的主题就有很漂亮的 [Flat](http://demo.yoarts.com/flatblog/) 和 [Fullby](http://www.marchettidesign.net/fullby/demo/)，用 `Semantic-UI` 的有 [Semantic UI for wordpress](https://github.com/KagamiChan/Semantic-UI-WordPress) 所有的 WP 主题也都是 GPL 的，可以随便改，但是又感觉改动量会不小，作罢。

寻找到这里的时候，我突然意识到，我为什么需要开发一款符合[所有单元测试](http://codex.wordpress.org/Theme_Unit_Test)的主题呢？那些左边栏右边栏顶栏底栏，那些各种类型的主题，对于我来说也并不是都有用的，自用的话，完全可以精简嘛。基于这个思路，我又开始刷官方的主题制作文档。不过略浏览了一下才发现，需要掌握的 wordpress 知识有点多。那些各种各样的内置方法，各种各样的钩子，一方面可以说是完善，另一方面可以说是臃肿。我又没有打算以开发主题为生——虽然一个好的主题能以几十块钱来按份卖，wordpress 开发也有一个小行业，但是实在提不起兴趣去学。

当然，我也有考虑过切换到非 wp 的日志系统，基本来说就是基于 markdown 的系统，比如 Typecho，Octopress，Hexo，Ghost 以及现在临时在用的 Github Pages，但是实际写作才发现，有富文本编辑器以及媒体管理，有时候还是挺方便的（[上一篇日志](/tokyo-victory/)的引用块和图片着实让我为难了一下），而且现有数据的迁移也需要花时间，因此也作罢。

所以，最后定的方案是，统统推倒，自己发明个轮子。用 [JSON API](http://wordpress.org/plugins/json-api/) 生成 wp 的 Restful API，用 Lavarel 作为后台，前端能避开 jQuery 就避开，顺便也练练手。整个方案里比较薄弱的环节有可能是 Restful API 的可玩性和安全性了，而且从效率的角度来看，这个方案不一定能有 wordpress 原生主题来得高，不过这么玩了之后，获得的经验值应该更有营养一点。以后有机会的话还可以再拿 python 或者 rails 开发一遍，获得附加经验值呢……
