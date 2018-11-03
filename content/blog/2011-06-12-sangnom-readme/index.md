---
draft: false
post_id: 269
publish_date: '2011-06-12T15:05:00.000+08:00'
revise_date: '2011-06-12T15:05:00.000+08:00'
tags:
  - avisynth
  - sangnom
  - 宅科技
  - 杂谈
title: SangNom Readme 说明
---

虽然 nmm 的文档库里边已经有一个简要版本了……还是献丑吧

---

SangNom beta - "readme"

alors, il vous faut :

- du YV12 entrelac?
- un proc qui gere l'isse (athlon tbird &+,PIII &+)

syntaxe :

SangNom(order,aa)

- order :

  0 -> vire le top field

  1 -> vire le bottom field

  2 -> alterne, pour faire du bob :DoubleWeave.SangNom(order=2)

- aa : (antialiasing)

  pour eviter que l'algo face n'importe quoi

  sur des trucs trop complexes & sharp

  (pour le rendre kanji-proof quoi)

par def, SangNom() equivaut a SangNom(order=1,aa=48)

creds : cas pour le nom :p (& les betatesteurs bien sur ^^)

SangNom beta - Copyright (C) 2003-2004 MarcFD

---

嘛，我们需要：

- 交错的 YV12

- 一个支持 iSSE 的处理器（Althlon Thunderbird+, P3+）

参数：

SangNom(order,aa)

- order:

  1 -> 保持 top field

  2 -> 保持 bottom field

  3 -> 交替，用来做 bob :DoubleWeave.SangNom(order=2)

- aa: （抗锯齿）

  为了避免算法面对那些太复杂、太锐的东西的各种情况

  （为了使汉字不受影响或者别的）

默认情况下，SangNom() 等效于 SangNom(order=1,aa=48)
