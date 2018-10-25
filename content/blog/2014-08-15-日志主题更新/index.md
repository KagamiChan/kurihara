---
draft: false
post_id: 1276
publish_date: '2014-08-15T03:03:33.000+08:00'
revise_date: '2014-08-15T03:03:33.000+08:00'
tags:
  - 未分类
title: 日志主题更新
---

前两天总算痛下决心把引发载入阻塞的 Google Webfont 从 wp 中去掉了。因为这日志除了自己也基本没人看，加之我一般都是科学上网过来的，所以一直都懒得动。感谢微博上的某位同学如此热心的提醒。

其实更深层的原因在于，造成阻塞的罪魁祸首不是谷歌，而是大结界，从两三个月前我就开始期待有回复正常的一天，可现在看来 Minitrue 是铁了心了，也只能另找办法。

国内有 360 的谷歌 Webfont 镜像，但是见到这三个数字我是主动回避了。此外做 Webfont 服务还是有几家可替代的，Adobe Typekit 应该算是比较专业的，但是免费版本居然带个小广告，不能忍。

七牛 CDN 看起来貌似很不错，可惜要验证身份，好麻烦——虽然我觉得生活在幻想乡也别想有什么秘密了。

于是决定把 Webfont 放到服务器上，一些 webfont 资源比如我用的 Open Sans 可以从 [Fontsquirrel](http://www.fontsquirrel.com/) 上获得，使用 SIL 授权的一些字体比如 Inconsolata 也可以用他家的 [Webfont 生成器](http://www.fontsquirrel.com/tools/webfont-generator)来制作。

需要注意的是 Chrome 和 Firefox 开始把 Webfont 也列入 CORS 的范围，不同域的访问会失效，最后我是放在日志的域的 webfont.css 上边了。至于跨域调用，我一开始想的是用 php 来加入 header 信息，最后再输出 css 文件，但是连 webfont 资源也这么做感觉很蛋疼，后来查了一下，[其实这是该由 httpd 做的事情](http://support.maxcdn.com/howto/use-cdn-with-webfonts/)。

此外 wp 默认还会载入 Open Sans 字体，我用的 TwentyFourteen 修改版主题还会载入 Lato。我最后采用的解决方案不是疏通而是把它堵上，在主题的 functions.php 中最后加上了这么一段代码：

```php
if (!function_exists('remove_google_fonts')):
  function remove_google_fonts() {
    wp_deregister_style('open-sans');
    wp_register_style('open-sans', false);
    wp_dequeue_style('twentyfourteen-lato');
  }
  add_action('wp_enqueue_scripts', 'remove_google_fonts');
endif;
```

在同一个文件里其实有一个关于 lato 载入的函数，只不过本地 Linux Nginx+PHP+Mariadb 环境还没搭好，就不乱改了。

最后，我的主题是基于  TwentyFourteen 修改来的。原来的主题是固定宽度的页面，还只能靠左显示，个人觉得在高分辨率显示器下太浪费，但响应式设计又做得挺好的，所以就拿来改了。改的时候才发现其实坑不小，全视界显示之后，很多固定宽度的地方就要改成相对值，还有一些浮动和边界也要相对化，最后还得给每个宽度的 media 做相应的变动……哦，好不容易调完了发现还有 featured post 展示栏没修改过。既然  TwentyFourteen 有新版了，我也计划在新版的基础上重新做一个，不过真的不是现在……
