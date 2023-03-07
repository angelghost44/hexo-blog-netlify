---
banner_img: /images/uploads/1616421416500-wallhaven-rddv31.jpg
index_img: /images/uploads/1616421416500-wallhaven-rddv31.jpg
title: win11 右键默认显示更多选项 设置方法
date: 2023-03-07 17:35:06
updated: 2023-03-07 17:35:06
categories:
  - 系统
keywords:
  - Win11
comments: true
---
1. **然后显示操作成功，重启之后，就可以恢复了**
2. **reg.exe delete "HKCU\Software\Classes\CLSID{86ca1aa0-34aa-4e8b-a509-50c905bae2a2}\InprocServer32" /va /f**



## 使用注册表修改

首先，通过修改注册表，我们就可以将Win11的右键菜单改为老样式。下面是具体的方法。

　　·运行“regedit”，开启注册表编辑器，定位到“HKEY_CURRENT_USER\SOFTWARE\CLASSES\CLSID”；

　　·接着，右键点击“CLSID”键值，新建一个名为{86ca1aa0-34aa-4e8b-a509-50c905bae2a2}的项；

　　·右键点击新创建的项，新建一个名为InprocServer32的项，按下回车键保存；

　　·最后选择新创建的项，然后双击右侧窗格中的默认条目，什么内容都不需要输入，按下回车键。

保存注册表后，重启explorer.exe，即可看到右键菜单恢复成旧样式了。

如果想要恢复成为Win11的设计，那么删掉InprocServer32的项就可以了。