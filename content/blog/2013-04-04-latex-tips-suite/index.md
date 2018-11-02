---
draft: false
post_id: 392
publish_date: '2013-04-04T03:12:47.000+08:00'
revise_date: '2013-04-04T03:12:47.000+08:00'
tags:
  - LaTeX
  - 宅科技
title: 再：LaTeX 使用小结
---

虽然一直都说 LaTeX 是屠龙之术，以后估计也没什么机会能用上，但是我还是不会放过任何屠龙的机会的。前两天又用 LaTeX 写了一个 15 页的报告，使得经验值又有了小幅提升，特此记录。

## 自定义封面

报告的封面我是用 photoshop 设计的。虽然封面很简单我觉得拿纯 LaTeX 也可以实现，但是还是没有去研究。设计完之后，我希望封面里边的文字仍然保持可选状态，于是直接保存成为了 pdf。为了缩小得到的 pdf 的体积，需要在保存选项里边取消掉可编辑功能，并且降低图片 dpi，图片压缩质量还是需要尽量往高了选，质量太低的话对于细节较多的图片的话失真是很厉害的。
之后要做的事情就是导入到 LaTeX 里边。使用 pdfpages 包，可以将 pdf 文件的页面直接作为 LaTeX 最终 pdf 的页面。为了统一，我的封面和报告都是用的 A4 幅面。

## 自定义图表格式

自定义说的是完全换成另外一种自定义的字体，就类似于使用 fontspec 一样。网上关于这个设置的说法很多都是 caption 和 caption2 包的。它们只能设置为 roman，ss 或者 mono 字形。虽然通过 setmainfont 等命令不是不能办到，但这三个字形我在别处也是要用到的。于是我又找到了 ccaption 包，它算是前边两者的增强版，设置起来差不多和 titlesec 一样方便。
我是这么使用的：先利用 fontspec 定义新字形，再将字形应用进去。

```latex
newfontfamilyfig[BoldFont={Open Sans Condensed},ItalicFont={* Italic}]{Open Sans Condensed Light}
usepackage{ccaption}
captionnamefont{smallfigbfseries}
captiontitlefont{smallfig}
```

另外一个纠结的点在于，caption 距离上下正文的边距往往是过大的，一般是有 abovecaptionskip 和 belowcaptionskip 可以进行设置。不过对我的情况，图的 caption 是在下方而表的 caption 在上方。太过激进的设置就不能够实现两者兼顾了，最后我是这么设置的：

```latex
setlength{abovecaptionskip}{0.5em}
setlength{belowcaptionskip}{0em}
```

## 浮动图表

因为有些图片很小，而且所有图片都隔开上下文的话也比较单调，所以这次我尝试用了 wrapfig 包。这个包用在图上还不错，用在表上却总不是很成功。这个包的最大问题是对于上下边距的确定。比如说有一幅图在第一页的底部，而第二页顶头却还有可能还为它留出空间。所以需要进行的微调操作仍然比较多。

最后给出一点源代码吧。因为是用了 Fontspec 所以直接拿 XeLaTeX 编译了，用 TeXLive 的 TeXWorks 默认的 pdfLaTeX 是无法编译成功的。

```latex
documentclass[a4paper, 12pt, onepage]{article}
usepackage[frenchb]{babel}
usepackage{pdfpages}
usepackage[paper=a4paper,top=2.54cm,bottom=1.91cm,left=1.91cm,right=1.91cm,footskip=2em]{geometry}
usepackage[cyr]{aeguill}
usepackage{multicol}
usepackage{wrapfig}
usepackage{calc}

%———————Hyperref——————-
usepackage{xcolor}
usepackage{color}

usepackage[xetex,unicode]{hyperref}
usepackage{url}
hypersetup{
unicode=true, % non-Latin characters in Acrobat’s bookmarks
pdftoolbar=true, % show Acrobat’s toolbar?
pdfmenubar=true, % show Acrobat’s menu?
pdffitwindow=true, % page fit to window when opened
pdftitle={Comment nourrir le monde? -un rqpport sur le développement durable}, % title
pdfauthor={Sonia, Jordan, Charles, Hugo, Anthony, Pascal}, % author
pdfsubject={Développement Durable}, % subject of the document
pdfnewwindow=true, % links in new window
pdfkeywords={}, % list of keywords
colorlinks=true , % false: boxed links; true: colored links
linkcolor=black, % color of internal links
citecolor=black, % color of links to bibliography
filecolor=black, % color of file links
urlcolor=black, % color of external links
bookmarksnumbered=true,
pdfpagelayout=SinglePage,
pdfstartview={FitB},
}

%—————————font style
usepackage{fontspec}
%fontspec[BoldFont={Open Sans}]{Open Sans Light}
setmainfont[BoldFont={Open Sans},ItalicFont={* Italic}]{Open Sans Light}
%setmainfont[BoldFont={Open Sans Condensed},ItalicFont={* Italic}]{Open Sans Condensed Light}
setsansfont[BoldFont={Open Sans},ItalicFont={* Italic}]{Open Sans Light}
setmonofont{Roboto Light}
newfontfamilyfig[BoldFont={Open Sans Condensed},ItalicFont={* Italic}]{Open Sans Condensed Light}

parskip 0.5ex

renewcommand{baselinestretch}{1.1}

%———————caption style
usepackage{ccaption}
captionnamefont{smallfigbfseries}
captiontitlefont{smallfig}
setlength{abovecaptionskip}{0.5em}
setlength{belowcaptionskip}{0em}

%——————–page style
usepackage{fancyhdr}
pagestyle{fancy}
fancyhead{}
fancyfoot{}
lhead{Page thepage}
chead{}
rhead{itshape leftmark}
renewcommand{headrulewidth}{0.2pt}

%—————–title——————
usepackage{titlesec}
titleformat{section}{hugeflushleftfontspec{Ubuntu Condensed}}{thesection}{1.5ex}{}

%_____________________________________________________________
begin{document}

includepdfmerge{face.pdf}
renewcommand{tablename}{Tableau}

clearpage
thispagestyle{empty}
renewcommand{contentsname}{Sommaire}
pdfbookmark[1]{contentsname}{toc}
tableofcontents
clearpage
setcounter{page}{1}
input{intro.tex}
input{analyse.tex}
input{conclusionacqui.tex}
input{biblio.tex}

end{document}
```
