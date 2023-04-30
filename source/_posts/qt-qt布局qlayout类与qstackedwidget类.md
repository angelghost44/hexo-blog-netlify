---
banner_img: /images/uploads/sayathefox-2b.jpg
index_img: /images/uploads/sayathefox-2b.jpg
title: qt/QT布局QLayout类与QstackedWidget类
date: 2023-04-30 17:09:04
updated: 2023-04-30 17:09:04
tags:
  - C
categories:
  - 编程
comments: true
---
# QT布局QLayout类与QstackedWidget类

## 一.各类关系

* QLayout

  * QGridLayout
  * QBoxLayout

    * QHBoxLayout
    * QVBoxLayout
  * QStackedLayout

## 二.QLayout

> 最外面用一个网格布局包裹住，然后把页面分为三个部分，即左右下，然后将左边设为网格布局，一张表；右边设为垂直水平布局，在垂直的基础上安排控件，水平方面看需增加控件，这里只是把水平布局放到垂直布局里面，并设置间距，然后再把其他控件也添加到垂直布局里，水平布局并没有任何东西；下边底部则也是用一个网格布局来写，将他们放到后面，也就是从0开始，但是前面是空的，即从1开始安排两个按钮，1和2这个索引，即可将两个按钮放到最后。

## 基于dialog

## 编写部分

##### **dialog.h**

```cpp
#ifndef DIALOG_H
#define DIALOG_H

#include <QDialog>
#include <QLabel>
#include <QLineEdit>
#include <QComboBox>
#include <QTextEdit>
#include <QGridLayout>
#include <QPushButton>


class Dialog : public QDialog
{
    Q_OBJECT

public:
    Dialog(QWidget *parent = nullptr);
    ~Dialog();

private:
    //左边:网格布局
    QGridLayout *leftlayout;

    QLabel *usernum;
    QLineEdit *usernumedit;
    QLabel *username;
    QLineEdit *usernamedit;
    QLabel *usersex;
    QComboBox *usersexcombox;
    QLabel *userdepart;
    QTextEdit *userdepartextedit;
    QLabel *userage;
    QLineEdit *userageedit;

    //右边:水平布局
    QHBoxLayout *rtlayout;
    QVBoxLayout *toprtlayout;

    QLabel *myinfo;
    QTextEdit *myinfotextedit;

    //右边底部
    QPushButton *okbu,*cancelbu;
    QHBoxLayout *buttomlayout;
};
#endif // DIALOG_H
```

##### **dialog.cpp**

```cpp
#include "dialog.h"

Dialog::Dialog(QWidget *parent)
    : QDialog(parent)
{
    setWindowTitle("干员信息");
    resize(800,600);
    //左边控件
    usernum=new QLabel("干员编号:");
    usernumedit=new QLineEdit();

    username=new QLabel("干员姓名:");
    usernamedit=new QLineEdit;

    usersex=new QLabel("干员性别:");
    usersexcombox=new QComboBox;
    usersexcombox->addItem("男");
    usersexcombox->addItem("女");

    userdepart=new QLabel("干员类别:");
    userdepartextedit=new QTextEdit;

    userage=new QLabel("干员年龄:");
    userageedit=new QLineEdit;

    //左边网格布局
    leftlayout=new QGridLayout();
    leftlayout->addWidget(usernum,0,0);
    leftlayout->addWidget(usernumedit,0,1);
    leftlayout->addWidget(username,1,0);
    leftlayout->addWidget(usernamedit,1,1);
    leftlayout->addWidget(usersex,2,0);
    leftlayout->addWidget(usersexcombox,2,1);
    leftlayout->addWidget(userdepart,3,0);
    leftlayout->addWidget(userdepartextedit,3,1);
    leftlayout->addWidget(userage,4,0);
    leftlayout->addWidget(userageedit,4,1);

    leftlayout->setColumnStretch(0,1);
    leftlayout->setColumnStretch(1,3);

    //右边控件
    rtlayout=new QHBoxLayout();
    rtlayout->setSpacing(25);
    myinfo=new QLabel("个人信息:");
    myinfotextedit=new QTextEdit;
    toprtlayout=new QVBoxLayout();
    toprtlayout->addLayout(rtlayout);
    toprtlayout->addWidget(myinfo);
    toprtlayout->addWidget(myinfotextedit);

    //右边底部
    okbu=new QPushButton("确定");
    cancelbu=new QPushButton("取消");

    buttomlayout=new QHBoxLayout();
    buttomlayout->addStretch();
    buttomlayout->addWidget(okbu);
    buttomlayout->addWidget(cancelbu);


    QGridLayout *mlayout=new QGridLayout(this);
    mlayout->setMargin(20);
    mlayout->setSpacing(10);
    mlayout->addLayout(leftlayout,0,0);
    mlayout->addLayout(toprtlayout,0,1);
    mlayout->addLayout(buttomlayout,1,0,1,2);

    mlayout->setSizeConstraint(QLayout::SetFixedSize);
}

Dialog::~Dialog()
{
}
```

## 三.QLayout

> 专门提供一个控件存放一些控件，但是每次只能有一个控件被设置为当前控件。

## 基于dialog

## 编写部分

##### **dialog.h（stacked.h）**

```cpp
#ifndef STACKED_H
#define STACKED_H

#include <QDialog>
#include <QListWidget>
#include <QStackedWidget>
#include <QLabel>

class stacked : public QDialog
{
    Q_OBJECT

public:
    stacked(QWidget *parent = nullptr);
    ~stacked();

    QStackedWidget *stacks;
    QListWidget *qlist;//列表框控件创建

    QLabel *lb1,*lb2,*lb3,*lb4,*lb5;
};
#endif // STACKED_H
```

##### **dialog.cpp（stacked.cpp）**

```cpp
#include "stacked.h"
#include <QHBoxLayout>

stacked::stacked(QWidget *parent)
    : QDialog(parent)
{
       setWindowTitle("堆栈窗体测试");

       qlist=new QListWidget();
       qlist->insertItem(0,"Linux");
       qlist->insertItem(1,"Linux1");
       qlist->insertItem(2,"Linux2");
       qlist->insertItem(3,"Linux3");
       qlist->insertItem(4,"Linux4");

       lb1=new QLabel("1 qt");
       lb2=new QLabel("2 qt");
       lb3=new QLabel("3 qt");
       lb4=new QLabel("4 qt");
       lb5=new QLabel("5 qt");

       stacks=new QStackedWidget(this);
       stacks->addWidget(lb1);
       stacks->addWidget(lb2);
       stacks->addWidget(lb3);
       stacks->addWidget(lb4);
       stacks->addWidget(lb5);

       QHBoxLayout *ml=new QHBoxLayout(this);
       ml->setSpacing(10);
       ml->setMargin(10);

       ml->addWidget(qlist);
       ml->addWidget(stacks,0,Qt::AlignCenter);
       ml->setStretchFactor(qlist,1);
       ml->setStretchFactor(stacks,1);
}

stacked::~stacked()
{
}
```