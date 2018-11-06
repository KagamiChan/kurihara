---
draft: false
post_id: 1013
publish_date: '2004-10-23T18:02:00.000+08:00'
revise_date: '2004-10-23T18:02:00.000+08:00'
tags:
  - 日常
title: 我的第一个程序
---

上个星期写的，可以说是第一个比较完整的程序，VB 的。

其实也是很简单的加法运算，不过总算解决了溢出问题，不过输入的校验还是没有做好。

VB 代码：

```vb
Private Sub exit_Click()
  End
End Sub

Private Sub pluscom_Click()
  res.Caption = ""
  Dim a, b
  a = Val(plus1.Text)
  b = Val(plus2.Text)
  If plus2.Text = "" Or plus1.Text = "" Then
    result.Caption = "不能输入空值，请重输。"

  Else
    Dim re
    re = a + b
    res.Caption = re
    result.Caption = "代数表达式为：" & a & "+" & b & "=" & re
  End If
End Sub
```

自己的技术还很差，而且身边没有课本，自己摸索……下一次准备做多一个窗体。
