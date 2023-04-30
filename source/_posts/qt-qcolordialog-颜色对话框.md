---
banner_img: /images/uploads/Saya The Fox-Zenith Maid.jpg
index_img: /images/uploads/Saya The Fox-Zenith Maid.jpg
title: qt/QColorDialog 颜色对话框
date: 2023-04-30 17:45:08
updated: 2023-04-30 17:45:08
tags:
  - C
categories:
  - 编程
comments: true
---
# QColorDialog 颜色对话框

#### 基本实现

> setPalette调色板

###### **dialog.h**

```cpp
#ifndef DIALOG_H
#define DIALOG_H

#include <QDialog>
#include <QPushButton>
#include <QFrame>
#include <QColorDialog>
#include <QGridLayout>
#include <QDialog>

class Dialog : public QDialog
{
    Q_OBJECT

public:
    Dialog(QWidget *parent = nullptr);
    ~Dialog();
private:
    QGridLayout *gl;
    QPushButton *colorbutton;
    QFrame *colorframe;
private slots:
    void dispcolorfunc();
};
#endif // DIALOG_H
```

###### **dialog.cpp**

```cpp
#include "dialog.h"

Dialog::Dialog(QWidget *parent)
    : QDialog(parent)
{
    setWindowTitle("颜色对话框测试");
    gl=new QGridLayout(this);
    colorbutton=new QPushButton("调用颜色对话框");
    colorframe=new QFrame;
    colorframe->setFrameShape(QFrame::Box);
    colorframe->setAutoFillBackground(true);//背景填充处理
    gl->addWidget(colorbutton,0,0);
    gl->addWidget(colorframe,1,0);
    resize(600,400);
    connect(colorbutton,SIGNAL(clicked()),this,SLOT(dispcolorfunc()));
}

Dialog::~Dialog()
{
}

void Dialog::dispcolorfunc(){
    QColor colorvalues=QColorDialog::getColor(Qt::red);
    if(colorvalues.isValid()){
        colorframe->setPalette(QPalette(colorvalues));
    }
}
```

