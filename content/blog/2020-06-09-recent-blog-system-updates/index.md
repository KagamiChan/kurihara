---
title: 最近日志系统的一些小更新
publish_date: '2020-06-09T01:57:07.613+08:00'
revise_date: '2020-06-09T01:57:07.613+08:00'
tags: []
draft: true
---

尽管从去年至今，一直因为各种原因没有写新的文字。不过我还是陆陆续续地把以前的文章迁移过来了，尽管大部分都是很无聊也没什么意义的内容，但是实在没有时间一点一点地审阅。同时其实整个系统也是有各个方面的小更新的。大概记录一下看看有没有助于后人避坑吧。

## 自动升级与测试

Gatsby 是以 monorepo 的形式开发的。这种形式的好处是组合比较灵活自由，但是坏处就是包的数量非常多。之前都是手动升级的，但是有一次隔了大约几个月的升级，因为兼容性问题，折腾了很久。加上 `dependabot` 这样的自动升级机器人已经变得较为成熟了，我觉得实现小周期的定时升级，可以有助于问题的定位。所以决定也部署一个。

但是比较尴尬的是，之前我在写代码的时候是没有配套单元测试的，实在是因为纯个人项目，并且心中的想法也没有最终的定稿。虽然靠 linter 和 build 已经能解决不少很初级的回归，但是还是感觉有测试会更轻松一点。因为工作过程中见识到了图像差分测试，所以就想给项目也来一个，至少能保证自动升级前后大体上页面没有变化。

差分测试的思路是比较清晰的，用`serve`来起一个静态服务器，通过`jest-puppeteer`来驱动`chromium`跑 E2E test，在需要截图的地方截个图，再和 repo 里面的现有参考截图比较。不过实际操作中发现两个小坑，

- 随机变量的影响。我的页面是有一些随机元素的，比如首页的背景是随机生成的，还有日志中的“一言”部分。为了控制这些影响，就只能用变量来控制随机性，这个可以在编译的时候专门加一个环境变量，也可以检测`query params`，不过就是需要多写不少代码
- 机器环境的影响。我本地是在 macOS 下生成参考截图的。然而 ci 机器上面跑的是 Linux，第一没有安装中文字体，第二就是 chromium 的渲染结果总有细微的差别，比如文字渲染和（阴影）渐变。前者可以手动安装字体，后面这个就只能用 ci 机器上的图作为参考图了，为此又专门加了一个发布的任务。然而这回又轮到在我本地更新参考截图变得有点困难了

于是最后也只能放弃了做图像差分的方案，简单地保留了 e2e 的部分。之后应该会逐渐地加一些单元测试。

## Github Actions

之前日志的测试和部署是平行的，在 circleci 上跑编译和测试，而 netlify 上面做的部署的时候也是需要编译一遍。随着自动更新的启用，netlify 的编译频次显著地增加了。因为 `dependabot` 以包为粒度发布 PR 的，而我又开启了 PR 预览，所以一个包的更新会的 netlify 上走两次编译。不巧地是 gatsby 的包又巨多无比，每个月都要花几百分钟的机器时间（项目克隆 + 缓存下载 + 编译 + 优化 + 部署的总时间），而且我的 netlify 用户下面还有其它项目。种种因素，导致 netlify 开启免费计划的机器时间限额的第一个月，我吃到了 7 美元的账单。这显然是不划算的，因为一个放静态内容 VPS 的月租撑死了也就 5 刀。

虽然我也考虑过把 netlify 换掉，用类似的其它方案。但是 netlify 本身的其它地方做得还是可以的，就只有编译时间限额这一点显得比较黑——把克隆和下载之类的不占资源的垃圾时间也算进去了。最后决定首先是关掉 PR 预览，其次是把编译移走，换到 CI 机器上去做。正好当时 Github Actions 开放使用了，就顺便切换到了 Github Actions。

改进后的流程是 Github Actions 编译，测试，把结果部署到 release 分支上，然后 release 分支触发 netlify 的部署。这样下来每个月终于能保证在额度内了。

## TypeScript

Gatsby 本身是没有原生 TypeScript 支持的。虽然借助`babel-preset-typescript`，编译不成问题，但是难点主要在 GraphQL 数据的 typing 上。所以我就一直不想动。不过今年年初，[TypeScript 团队宣布使用 Gatsby 来搭建新版本网站](https://www.gatsbyjs.org/blog/2020-01-23-why-typescript-chose-gatsby/)，这让我觉得也许是时候了。

GraphQL 的 typing 之前已经有轮子了，至少据我了解我前司的同事们已经顺利调教过了——虽然直到跑路也没什么机会了解他们在架构上怎么设计的。总而言之，就是同一个 codegen 轮子，根据 GraphQL 的 schema，生成一堆正常人写不出来的 typing，然后在代码里面引入这些 types，就能顺利地让自己的组件变得科学起来。具体细节上还有一些值得推敲的地方：

### 要不要提交这个 typing

这个 typing 比较大，又像是编译产物，TypeScript 团队的那一位作者是不赞成的。不过我最后还是决定提交了，因为下文的其它选择的限制。这个文件提交之后，我发现它是经常变的，开发和编译时候的一些变量会有增减，而且随着升级，也有可能引入新的一些变量——尽管这都不会有什么大影响。我又是一个喜欢在 VS Code 里面点个大加号全都提交的，所以总有误提交的时候，创造了不必要的提交历史。我也想过是不是应该忽略掉这个文件的改动，但是实际操作起来感觉有点麻烦，并且万一真的有需要做提交，也是一样有点麻烦，所以就暂时随缘提交了。

### Gatsby 的配置要不要改成 TypeScript

这个具体就是 `gatsby-node.js`/`gatsby-ssr.js`/`gatsby-config.js` 之类的。因为配置里面有很多读 GraphQL 数据的地方，用 ts 的确有助于保证正确性。于是我就还试着把最大的一块 `gatsby-node.js` 改成了 ts。技术上也很直观，用 `babel` 或者 `ts-node` 来注册一下转译。不过做完之后才发现，我陷入了一个鸡蛋问题。需要有 typing，于是要先跑`gatsby build`，但是`gatsby build`需要有 typing 才能跑起来。当然其实可以只去 type 跑，不管是`babel`或者`ts-node`都能办到（`ts-node`我是后来才知道的），不过我最终还是选择了提交 typing 来避免自己陷入这种奇怪的情况。

## Tailwind

未完待续
