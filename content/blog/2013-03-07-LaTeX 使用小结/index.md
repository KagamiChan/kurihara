---
draft: false
post_id: 332
publish_date: '2013-03-07T19:53:36.000+08:00'
revise_date: '2013-03-07T19:53:36.000+08:00'
tags:
  - LaTeX
  - 宅科技
title: LaTeX 使用小结
---

1.IEEEtrans

前段时间因为忍受不了用 word/mathtype 输入公式了，所以就先学现用用 LaTeX 写了一份大作业报告。在看教程的时候看到了有 `IEEEtrans` 这样的文档格式，自己常常被 IEEE 的论文虐，而正好大作业写的东西也是和 CS 相关的，所以就学了一下 `IEEEtrans` 的用法。

`IEEEtrans`，意思就是用于 IEEE 论文发表用的，这个类提供了很多种选项，比如草稿、初稿、出版物等等。对于计算机协会的，还有专门的一个叫做 `compsoc` 的样式选项。我用了以下语句之后，写出来的就和期刊的样式一模一样了：

```latex
[cci lang=”latex”]documentclass[a4paper,10pt,journal,compsoc]{IEEEtran}[/cci]
```

和别的很多包一样，`IEEEtrans` 也附带了一个很详细的说明文档，介绍怎么使用这个样式。我印象比较深刻的有（感叹号都是我脑补的）：

- IEEE 的作者从来不修改默认字体！
- IEEE 的作者都是把 caption 放在图下边，表格上边！
- IEEE 的文章从来不会第一页放图片！

其它的一些小的方面有，表格可以用 `renewcommand{arraystretch}{1.3}` 让行显得更宽敞一点。对于 `itemize` 来说，可以用 `IEEEsetlabelwidth` 进行调整。

2.中文 LaTeX，完全无压力

前两天开始接触 LaTeX 的时候，感觉还是 CTeX 的时代，那时候我看到的说法是，想要使用某种字体，就得生成相应的字符包，而这种生成很麻烦所以 CTeX 只有几种常用字体。这回我直接不用 CTeX，而是安装了 TeXLive，并且试用了 XeCJK 包，发现让 LaTeX 支持中文和使用漂亮的中文字体已经非常方便了。比如以下语句

```latex
usepackage{fontspec}
usepackage{xunicode}
defaultfontfeatures{Mapping=tex-text}
usepackage[slantfont,boldfont,CJKnumber]{xeCJK}
setCJKmainfont{Hiragino Sans GB W3}
setCJKsansfont{Hiragino Sans GB W3}
setCJKmonofont{Hiragino Sans GB W3}
```

再使用 XeTeX/XeLaTex 编译，就可以使用系统里边装好的字体，比如这里给出的冬青黑等等。

`fontspec` 包对于英文来说也是很好用的，LaTeX 一般只有开源的英文字体，虽然给出的选择是蛮多的（可见 LaTeXFont Catalogue），但是我总有些时候想用用商业字体嘛……

当然对于 Windows 来说，比 Linux 要多的一步是要生成一个字体索引，如果系统装的字体很多的话，索引速度是很慢的。所以第一次使用或者安装了字体之后最好用 `fc-list` 命令等更新一下索引。

我现在觉得 LaTeX 最缺乏的也许就是 `figure` 的浮动控制了，写小文章的时候，图像不按自己的想法四处乱游走这一点没有完美的办法解决。此外，不得不说 LaTeX 是标准的屠龙之术，学习曲线不平缓，估计只能在大批量科学符号出现的地方展现自己的魅力了。
