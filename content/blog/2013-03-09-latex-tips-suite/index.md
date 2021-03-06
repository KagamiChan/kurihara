---
draft: false
post_id: 333
publish_date: '2013-03-09T20:51:17.000+08:00'
revise_date: '2013-03-09T20:51:17.000+08:00'
tags:
  - it
  - LaTeX
  - 宅科技
title: 续：LaTeX 使用小结
---

上篇日志时间关系写得比较匆忙，所以还是再做点（比正文还长的）补充吧

## CTeX 环境

上次说的 XeCJK 包其实是给中文（C）、日文（J）与韩文（K）三种的。对于中文的特定要求，CTeX 开发了 cTeX 包，调用方式有在 `documentclass` 里边声明 `cTeXart`，`cTeXbook`，或者使用 `usepackage` 载入。由于 cTeX 默认情况下载入 XeCJK，再单独使用 `usepackage{XeCJK}` 就会报错，我的解决方法是把 XeCJK 的设置放入 `documentclass` 当中——虽然从编译报告里边我也没看出来能不能支持调用，但是至少不报错了。之后还可以使用 `SetCJKmainfont` 将 cTeX 定义的字体全面覆盖掉。

插一句：我个人其实对于 cTeX 没有多少好感，因为自我感觉它提供的默认样式也没什么讨人喜欢的地方，还是需要做很多单独调整，工作量只能是比单用 XeCJK 少一点。现在不得已用 cTeX，是发现它很轻松地就能做到两个汉字缩进，而我这边自己手动调节我还没有找到可用的方法。

cTeX 提供了一些自定义的功能

- `zihao`，可以弄出初号到小五的字体大小——虽然自己写也不是不可以啦，此外感觉有几个号码没效果，不知为啥；

- `CTeXnumber`，主要是在章节号等需要从阿拉伯数字转汉字数字的设置等环境中能用着。它的用法是这样的：`CTeX{num}{thechapter}num`，可以输出章节数字，按照文档的说法，要比 XeCJK 的 CJKnumber 方法要稳健；

`documentclass` 里边的 cs4size 选项，可以将字号系统转成以小四为基准的

## footmisc

这个是用来控制脚注的。比如 `perpage` 选项可以让每页的脚注单独编号。

默认情况下 LaTeX 喜欢把长的脚注分页显示，为了避免分页，可以使用 `interfootnotelinepenalty=10000` 语句来避免

## titlesec/titletoc

这个是用来修改题目样式和目录样式的，通过它可以轻松搞出很漂亮的标题样式，这些样式在包手册上就有不少。比如

```latex
titleclass{part}{top} %让部分标题不另起一页
titleformat{chapter}[display]{bfseriesLARGEflushright}{第{CJKnumber{thechapter}}章}{2ex}{}%重定义chapter样式
```

4.hyperref

这个是在 pdf 生成内外部超链接用的，效果就是比如点击引用的数字跳到相应引用项，点击目录中的一项自动跳到那页等等。hyperref 的要点是要启用 unicode 模式。比如我根据别人的代码自己写的一个

```latex
usepackage[CJKbookmarks,xeTeX,unicode]{hyperref}
usepackage{bookmark}
hypersetup{
  unicode=true, % non-Latin characters inAcrobat’s bookmarks
  pdftoolbar=true, % show Acrobat’stoolbar?
  pdfmenubar=true, % show Acrobat’s menu?
  pdffitwindow=true, % page fit to windowwhen opened
  pdftitle={管理：任务、责任、实践}, % title
  pdfauthor={彼得·F·德鲁克}, % author
  pdfsubject={管理学}, % subject of thedocument
  pdfnewwindow=true, % links in newwindow
  pdfkeywords={}, % list of keywords
  colorlinks=true , % false: boxed links;true: colored links
  linkcolor=black, % color of internallinks
  citecolor=black, % color of links tobibliography
  filecolor=black, % color of file links
  urlcolor=black % color of externallinks
  pdfstartview ={XYZ null null 1.00}
  bookmarksnumbered={true}
}
```

应用的时候，如果存在不参加编号单独放入目录的部分（如 `section\*{XX}addtocontent{toc}{XX}}`，一般可用于参考文献等），需要加入在之前 `phantonsection` 语句以进行定位。目录可以通过 `pdfbookmark{contentsname}{toc}` 来加入到 pdf 的书签当中，在 `tableofcontent` 之前放置——自然也可以活用来加入别的书签。

既然写了这么多，不如顺便写写我对 LaTeX 的想法吧。前不久曾经以「完全 Linux 工作」而扬名的清华退学博士王垠突然写了一篇文章，表达了对于\*nix 系统的不满，顺便还把 TeX 系统给评判了一番，原文是这样：

> 我曾经强烈的推崇 FVWM，TeX 等工具，可是现在擦亮眼睛看来，它们给用户的界面，其实是非常糟糕的设计。他们把程序设计的许许多多的细节，无情的暴露给用户。让用户感觉有那么多东西要记，仿佛永远也没法完全操纵它。实话说吧，当年我把 TeXbook 看了两遍，做完了所有的习题（包括最难的「double bend」习题）。几个月之后，几乎全部忘记干净。为什么呢？因为 TeX 的语言是非常糟糕的设计。它的设计者几乎完全不明白程序语言设计的基本原则，不明白什么叫做「抽象」。

> 一个好的工具，应该只有少数几条需要记忆的规则，就像象棋一样。而这些源于 Unix 的工具却像是「魔鬼棋」或者「三国杀」，有无数的，无聊的，人造的规则。有些人鄙视图形界面，鄙视 IDE，鄙视含有垃圾回收的语言（比如 Java），鄙视一切「容易」的东西。他们却不知道，把自己沉浸在别人设计的繁复的规则中，是始终无法成为大师的。就像一个人，他有能力学会各种「魔鬼棋」的规则，却始终无法达到象棋大师的高度。所以，容易的东西不一定是坏的，而困难的东西也不一定是好的。学习计算机（或者任何其它领域）的东西，应该「只选对的，不选难的」。记忆一堆的命令，乌七八糟的工具用法，最后脑子里什么也不会留下。学习「原理性」的东西，才是永远不会过时的。

不得不说我也有点同感，学习 LaTeX 最痛苦的一点就是，很多想要的效果根本不知道如何实现，很多遇到的错误不知道错在哪里，只好不停地搜索答案。中英文共通的问题还好办，国外的 TeX 社区的解答一般都很不错。中文独有的问题，能很快找到满意答案的基本很难。cTeX 论坛上没人回答的问题一大堆，有些有人回答的问题却因为中间换过一次论坛系统什么的原因根本没法读。而且 LaTeX 是挺没有规律性的。它和 Linux 系统一样，有各种各样的人开发各种各样的包。虽然有 CTAN 这样的索引，但是到底哪个包可以真的解决自己的问题，没有经验的人永远也猜不到，去话费大量时间阅读完各种包的文档也不是现实的解决问题的方法。

但是不得不说用 LaTeX 的时间越来越长，我就越觉得 Word 的难用。用 LaTeX 可以轻松实现的一些优美的效果，在 word 下操作却是梦魇。每次写报告什么的，我就不得不和章节编号以及目录域等作对，写论文的时候，输入一个公式还有数学符号是极其辛苦的活，更别说页眉的莫名其妙的横线、嵌入的图片和正文一样缩进两字符需要一个一个往回挪、输入多个短横回车就能出来的横线不知怎么就变成两根了之类的乱七八糟的问题……所以为了能让自己某些时候更轻松一点，估计我还是会继续用下去吧。
