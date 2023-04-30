---
banner_img: /images/uploads/saya-the-fox-kasumi-yoshizawa.jpg
index_img: /images/uploads/saya-the-fox-kasumi-yoshizawa.jpg
title: qt/QSplitter与QDockWidget
date: 2023-04-30 17:11:21
updated: 2023-04-30 17:11:21
tags:
  - C
categories:
  - 编程
permalink: ""
comments: true
---
# QSplitter与QDockWidget停靠窗口

## QSplitter窗口分割与QDockWidget停靠窗口

### 简介

> 拆分器允许用户通过拖动子窗口小部件之间的边界来控制子窗口小部件的大小。任何数量的小部件都可以由单个拆分器控制。 QSplitter 的典型用途是创建多个小部件并使用 insertWidget() 或 addWidget() 添加它们。
>
> 这里主要用addWidget()
>
> 且在QDockWidget中，用函数封装了它

### 编写

#### mainwindow.h

```cpp
#ifndef MAINWINDOW_H
#define MAINWINDOW_H

#include <QMainWindow>


class MainWindow : public QMainWindow
{
    Q_OBJECT

public:
    MainWindow(QWidget *parent = nullptr);
    ~MainWindow();
    void Dockwidget();
};
#endif // MAINWINDOW_H
```

#### mainwindow.cpp

```cpp
#include "mainwindow.h"
#include <QSplitter>
#include <QTextEdit>
#include <QDockWidget>

MainWindow::MainWindow(QWidget *parent)
    : QMainWindow(parent)
{
//    //1.拆分窗口(分割窗口、分裂窗口布局)
//    QSplitter *sp=new QSplitter(Qt::Horizontal,0);//水平分割
//    QTextEdit *te1=new QTextEdit("左边主窗口",sp);
//    sp->setWindowTitle("Splitter窗口类拆分窗口测试");
//    sp->resize(800,600);
//    //2.拆分右边部分窗口
//    QSplitter *spri=new QSplitter(Qt::Vertical,sp);//右边垂直分割
//    QTextEdit *teup=new QTextEdit("右边上窗口",spri);
//    QTextEdit *tedo=new QTextEdit("右边下窗口",spri);

//    //3.
//    QSplitter *sptest=new QSplitter(Qt::Horizontal,spri);
//    QTextEdit *tetestt=new QTextEdit("右边下下窗口",sptest);
//    QTextEdit *tetestt1=new QTextEdit("右边下下窗口左",sptest);

//    //4.
//    QTextEdit *te2=new QTextEdit("右边主窗口",sp);

//    sp->show();



    Dockwidget();
}

MainWindow::~MainWindow()
{
}

void MainWindow::Dockwidget(){
    setWindowTitle("QDockWidge停靠窗口测试");
    resize(800,600);
    QTextEdit *tedit=new QTextEdit(this);//将对象设为主窗口
    tedit->setAlignment(Qt::AlignCenter);
    setCentralWidget(tedit);//将编辑框控件设置为主窗口的中央窗体

    //创建停靠窗口1
    QDockWidget *dw1=new QDockWidget("停靠窗口1",this);
    dw1->setFeatures(QDockWidget::DockWidgetMovable);//可移动
    dw1->setAllowedAreas(Qt::LeftDockWidgetArea|Qt::RightDockWidgetArea);

    QTextEdit *qt1=new QTextEdit();
    dw1->setWidget(qt1);
    qt1->setText("456");
    addDockWidget(Qt::RightDockWidgetArea,dw1);

    //创建停靠窗口2
    QDockWidget *dw2=new QDockWidget("停靠窗口2",this);
    dw2->setFeatures(QDockWidget::DockWidgetClosable|QDockWidget::DockWidgetFloatable);
    QTextEdit *qt2=new QTextEdit();
    qt2->setText("123");
    dw2->setWidget(qt2);
    addDockWidget(Qt::RightDockWidgetArea,dw2);

}
```