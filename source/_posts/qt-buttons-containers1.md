---
banner_img: /images/uploads/sayathefox-triss-merigold.jpg
index_img: /images/uploads/sayathefox-triss-merigold.jpg
title: qt/Buttons Containers1
date: 2023-04-14 19:24:10
updated: 2023-04-14 19:24:10
tags:
  - C
categories:
  - 编程
---
#### Buttons Containers1

[TOC]

##### 一、控件名称介绍

- [ ] Push Button：命令按钮
- [ ] Tool Button：工具按钮
- [ ] Radio Button：单选按钮
- [ ] Check Box：复选框
- [ ] Command Link Buttons：命令链接按钮
- [ ] Dialog Button Box：按钮盒

##### 二、控件编写

###### Push Button

> 1. 首先去mainwindow.h中定义好对象与槽函数
> 2. 再来到mainwindow.cpp中编写实例化对象与具体实现

**mainwindow.h**

```c++
#ifndef MAINWINDOW_H
#define MAINWINDOW_H
#include <QMainWindow>
#include <QPushButton>
class MainWindow : public QMainWindow
{
    Q_OBJECT
public:
    MainWindow(QWidget *parent = nullptr);
    ~MainWindow();
    //开始
private:
    //声明两个QPushbutton对象
    QPushButton *pb1,*pb2;
private slots:
    //声明对象，给这两个指针对象创建一个槽函数
    void pushbutton1_click();
    void pushbutton2_click();
    //结束
};
#endif // MAINWINDOW_H
```

------

**mainwindow.cpp**

```c++
#include "mainwindow.h"

MainWindow::MainWindow(QWidget *parent)
    : QMainWindow(parent)
{
    //设置窗口运行时的位置、大小
    this->setGeometry(900,500,800,600);
    //实例化两个按钮
    pb1=new QPushButton("命令按钮1",this);
    pb2=new QPushButton("命令按钮2",this);
    //设置两个按钮的位置坐标
    pb1->setGeometry(20,20,150,50);
    pb2->setGeometry(190,20,150,50);
    //将信号槽函数与按钮连接
    connect(pb1,SIGNAL(clicked()),this,SLOT(pushbutton1_click()));
    connect(pb2,SIGNAL(clicked()),this,SLOT(pushbutton2_click()));
}

MainWindow::~MainWindow()
{
}

//声明槽函数
void MainWindow::pushbutton1_click(){
    this->setStyleSheet("QMainWindow{background-color:rgba(255,100,3,100%);}");
}
void MainWindow::pushbutton2_click(){
    this->setStyleSheet("QMainWindow{background-color:rgba(255,255,255,100%);}");
}
```

###### Tool Button

> 1. 首先去mainwindow.h中定义好对象与槽函数
> 2. 再来到mainwindow.cpp中编写实例化对象、样式设定，添加控件

**mainwindow.h**

```c++
#ifndef MAINWINDOW_H
#define MAINWINDOW_H
#include <QMainWindow>
#include <QToolButton>
#include <QToolBar>

class MainWindow : public QMainWindow
{
    Q_OBJECT
public:
    MainWindow(QWidget *parent = nullptr);
    ~MainWindow();
private:
    //声明一个QToolButton对象和QToolBar对象
    QToolBar *tbar;
    QToolButton *tbuton;
};
#endif // MAINWINDOW_H
```

----

**mainwindow.cpp**

```c++
#include "mainwindow.h"
#include <QApplication>
#include <QStyle>
MainWindow::MainWindow(QWidget *parent)
    : QMainWindow(parent)
{
    this->setGeometry(900,500,800,600);
    //将对象进行实例化
    tbar=new QToolBar(this);
    tbar->setGeometry(20,20,160,90);
    //设置QStyle类对象并实例化，设置风格，图标系统自带
    QStyle *sty=QApplication::style();
    QIcon ico=sty->standardIcon(QStyle::SP_TitleBarContextHelpButton);

    //将QToolbutton对象实例化
    tbuton=new QToolButton();
    tbuton->setIcon(ico);
    tbuton->setText("系统帮助提示");
    //调用setToolButtonStyle函数设置tbutton样式，设置文本在图标下方
    tbuton->setToolButtonStyle(Qt::ToolButtonTextBesideIcon);
    //将tbutton添加到tbar中
    tbar->addWidget(tbuton);
}

MainWindow::~MainWindow()
{
}
```

###### Radio Button

> 1. 首先去mainwindow.h中定义好对象与槽函数
> 2. 再来到mainwindow.cpp中编写实例化对象与具体实现

**mainwindow.h**

```c++
#ifndef MAINWINDOW_H
#define MAINWINDOW_H
#include <QMainWindow>
#include <QRadioButton>
class MainWindow : public QMainWindow
{
    Q_OBJECT

public:
    MainWindow(QWidget *parent = nullptr);
    ~MainWindow();
private:
    //声明2个QRadioButton对象
    QRadioButton *radio1,*radio2;
};
#endif // MAINWINDOW_H
```

----

**mainwindow.cpp**

```c++
#include "mainwindow.h"

MainWindow::MainWindow(QWidget *parent)
    : QMainWindow(parent)
{
    //设置窗口运行时的位置、大小
    this->setGeometry(900,500,800,600);
    radio1=new QRadioButton(this);
    radio2=new QRadioButton(this);
    radio1->setGeometry(20,20,150,40);
    radio2->setGeometry(20,80,150,40);
    //设置两个单选按钮的文本
    radio1->setText("单选按钮1");
    radio2->setText("单选按钮2");
    //设置默认值
    radio1->setChecked(true);
}

MainWindow::~MainWindow()
{
}
```

###### Check Box

> 1. 首先去mainwindow.h中定义好对象与槽函数
> 2. 再来到mainwindow.cpp中编写实例化对象与具体实现

**mainwindow.h**

```c++
#ifndef MAINWINDOW_H
#define MAINWINDOW_H

#include <QMainWindow>
#include <QCheckBox>

class MainWindow : public QMainWindow
{
    Q_OBJECT

public:
    MainWindow(QWidget *parent = nullptr);
    ~MainWindow();
private:
    QCheckBox *cb;
private slots:
    //声明槽函数,在操作过程中带参数传递，通过参数接受信号
    void checkboxstate(int);
};
#endif // MAINWINDOW_H
```

----

**mainwindow.cpp**

```c++
#include "mainwindow.h"

MainWindow::MainWindow(QWidget *parent)
    : QMainWindow(parent)
{
    //设置窗口运行时的位置、大小
    this->setGeometry(900,500,800,600);
    cb=new QCheckBox(this);
    cb->setGeometry(30,100,250,50);
    cb->setText("复选框");
    //初始化状态：Checked
    cb->setCheckState(Qt::Checked);
    //开启三态模式，必须开启，否则只有两种状态（CHecked or Unchecked）
    cb->setTristate();
    connect(cb,SIGNAL(stateChanged(int)),this,SLOT(checkboxstate(int)));
}

MainWindow::~MainWindow()
{
}

void MainWindow::checkboxstate(int istate){
    switch (istate) {
    case Qt::Checked:
        cb->setText("选中状态OK");break;
    case Qt::Unchecked:
        cb->setText("未选中状态NO");break;
    case Qt::PartiallyChecked:
        cb->setText("半选中状态OK");break;
    default:
        break;
    }
}
```

###### Command Link Buttons

> 1. 首先去mainwindow.h中定义好对象与槽函数
> 2. 再来到mainwindow.cpp中编写实例化对象与具体实现

**mainwindow.h**

```c++
#ifndef MAINWINDOW_H
#define MAINWINDOW_H
#include <QMainWindow>
#include <QCommandLinkButton>


class MainWindow : public QMainWindow
{
    Q_OBJECT

public:
    MainWindow(QWidget *parent = nullptr);
    ~MainWindow();
private:
    QCommandLinkButton *clb;
private slots:
    //声明槽函数，鼠标点击后的触发事件
    void clblinkbuttonclick();
};
#endif // MAINWINDOW_H
```

----

**mainwindow.cpp**

```c++
#include "mainwindow.h"
#include <QDesktopServices>
#include <QUrl>
MainWindow::MainWindow(QWidget *parent)
    : QMainWindow(parent)
{
    //设置窗口运行时的位置、大小
    this->setGeometry(900,500,800,600);
    clb=new QCommandLinkButton("Commandbutton","clicked",this);
    clb->setGeometry(300,200,250,70);
    connect(clb,SIGNAL(clicked()),this,SLOT(clblinkbuttonclick()));
}

MainWindow::~MainWindow()
{
}

void MainWindow::clblinkbuttonclick(){
    QDesktopServices::openUrl(QUrl("www.miaohome.tk"));
}
```

###### Dialog Button Box

> 1. 首先去mainwindow.h中定义好对象与槽函数
> 2. 再来到mainwindow.cpp中编写实例化对象与具体实现

**mainwindow.h**

```c++
#ifndef MAINWINDOW_H
#define MAINWINDOW_H
#include <QMainWindow>
#include <QDialogButtonBox>
#include <QPushButton>
class MainWindow : public QMainWindow
{
    Q_OBJECT

public:
    MainWindow(QWidget *parent = nullptr);
    ~MainWindow();
private:
    QDialogButtonBox *db;
    QPushButton *pb;
private slots:
    //QAbstractButton判断哪一个按钮被按下
    void dbpbclick(QAbstractButton *);
};
#endif // MAINWINDOW_H
```

----

**mainwindow.cpp**

```c++
#include "mainwindow.h"
#include <QDebug>
using namespace std;

MainWindow::MainWindow(QWidget *parent)
    : QMainWindow(parent)
{
    //设置窗口运行时的位置、大小
    this->setGeometry(900,500,800,600);
    db=new QDialogButtonBox(this);
    db->setGeometry(300,200,200,30);
    db->addButton(QDialogButtonBox::Cancel);
    db->button(QDialogButtonBox::Cancel)->setText("取消");

    pb=new QPushButton("自定义");
    //将pb添加到db控件里面，并且设定ButtonRole为ActionRole
    db->addButton(pb,QDialogButtonBox::ActionRole);
    connect(db,SIGNAL(clicked(QAbstractButton*)),this,
            SLOT(dbpbclick(QAbstractButton*)));
}

MainWindow::~MainWindow()
{
}

void MainWindow::dbpbclick(QAbstractButton *bt){
    if (bt==db->button(QDialogButtonBox::Cancel)){
        qDebug()<<"你已经点击【取消】按钮"<<endl;
    }
    else if(bt==pb){
        qDebug()<<"你已经点击【自定义】按钮"<<endl;
    }
}
```