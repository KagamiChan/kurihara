import i18n from 'i18next'
import LanguageDetector from 'i18next-browser-languagedetector'
import { initReactI18next } from 'react-i18next'

const resources = {
  'zh-CN': {
    ui: {
      Archives: '存档',
      List: '列表',
      About: '关于',
      meta_first_line:
        '自豪地基于 <1>React.js</1> 与 <3>Gatsby.js</3> 驱动 | 托管于 Netlify | <5>RSS 订阅可用</5>',
      meta_second_line:
        '内容基于 <1>CC-BY-SA 4.0</1> 授权 | 评点或斧正可以 <3> 在此提交 issue </3>',
      Posted: '发布于',
      'Last revised': '最后修订于',
      blog: '日志',
      zhihu: '知乎',
      weibo: '新浪微博',
      twitter: 'Twitter',
      github: 'GitHub',
      '{{minutes}} min': '{{minutes}} 分钟',
      draft_status: '该日志处于草稿状态',
    },
  },
  ja: {
    ui: {
      Archives: 'アーケイブ',
      List: '一覧表',
      About: '私について',
      meta_first_line:
        'Proudly powered by <1>React.js</1> and <3>Gatsby.js</3> | Netlify で提供 | <5>RSS フィード</5>',
      meta_second_line:
        '内容は <1>CC-BY-SA 4.0</1> ライセンスの下で | <3> コメントをする </3>',
      Posted: '公開',
      'Last revised': '最終改定',
      blog: 'ブログ',
      zhihu: '知乎',
      weibo: '新浪微博',
      twitter: 'Twitter',
      github: 'GitHub',
      '{{minutes}} min': '{{minutes}} 分',
      draft_status: 'この記事はドラフト状態です',
    },
  },
  fr: {
    ui: {
      Archives: 'Archives',
      List: 'Liste',
      About: 'À propos',
      meta_first_line:
        'Fièrement propulsé par <1>React.js</1> et <3>Gatsby.js</3> | Servi sur Netlify | <5>Flux RSS</5>',
      meta_second_line:
        'Contenu sous licence <1>CC-BY-SA 4.0</1> | <3> Laissez un commentaire </3>',
      Posted: 'Posté le',
      'Last revised': 'Dernière révision le',
      blog: 'Blog',
      zhihu: 'Zhihu',
      weibo: 'Weibo',
      twitter: 'Twitter',
      github: 'GitHub',
      '{{minutes}} min': '{{minutes}} min',
      draft_status: "Cet article est dans l'état brouillon",
    },
  },
  en: {
    ui: {
      Archives: 'Archives',
      List: 'List',
      About: 'About',
      meta_first_line:
        'Proudly powered by <1>React.js</1> and <3>Gatsby.js</3> | Served on Netlify | <5>RSS Feed</5>',
      meta_second_line:
        'Contents Licensed under <1>CC-BY-SA 4.0</1> | <3> Leave a comment </3>',
      Posted: 'Posted',
      'Last revised': 'Last revised',
      blog: 'Blog',
      zhihu: 'Zhihu',
      weibo: 'Weibo',
      twitter: 'Twitter',
      github: 'GitHub',
      '{{minutes}} min': '{{minutes}} min',
      draft_status: 'This article is in draft status',
    },
  },
}

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    fallbackLng: 'zh-CN',
    resources,

    // have a common namespace used around the full app
    ns: ['ui'],
    defaultNS: 'ui',

    debug: process.env.NODE_ENV === 'development',

    interpolation: {
      escapeValue: false, // not needed for react!!
    },
  })

export default i18n
