---
banner_img: /images/uploads/saya-the-fox-ciri.jpg
index_img: /images/uploads/saya-the-fox-ciri.jpg
sticky: -1
title: qt/QFileDialog文件对话框
date: 2023-04-30 17:14:30
updated: 2023-04-30 17:14:30
tags:
  - C
categories:
  - 编程
comments: true
---
# QFileDialog文件对话框

## 一、对话框结构

* Qwidget

  * QDialog

    * QFileDialog
    * QcolorDialog
    * QFontDialog
    * QinputDialog

## 二、代码内容

> 它是一个文件对话框，但是实际上布局控件都是使用日常常用的垂直、水平布局以及一些按钮文本等，QFileDialog的主要作用就是通过参数，获取系统的一些信息，基类是Dialog

###### **dialog.h**

```cpp
#ifndef DIALOG_H
#define DIALOG_H

#include <QDialog>
#include <QLabel>
#include <QLineEdit>
#include <QPushButton>
#include <QHBoxLayout>
#include <QVBoxLayout>
#include <QFileDialog>

class Dialog : public QDialog
{
    Q_OBJECT

public:
    Dialog(QWidget *parent = nullptr);
    ~Dialog();
    void Qfiledia();
private:
    QLabel *f1;
    QLineEdit *fe1;
    QPushButton *pb1;
    QLabel *f2;
    QLineEdit *fe2;
    QPushButton *pb2;
private slots:
    void getfileinfo();//打开文件
    void getfilesize();//获取文件大小
};
#endif // DIALOG_H
```

###### **dialog.hcpp**

```cpp
#include "dialog.h"

Dialog::Dialog(QWidget *parent)
    : QDialog(parent)
{
    Qfiledia();
}

Dialog::~Dialog()
{
}

void Dialog::Qfiledia(){
    setWindowTitle("QFileDialog测试");
    //1.创建控件
    f1=new QLabel("文件名称:");
    fe1=new QLineEdit;
    pb1=new QPushButton("选择...");

    f2=new QLabel("文件大小:");
    fe2=new QLineEdit;

    pb2=new QPushButton("获取文件大小");
    //2.排列布局
    QGridLayout *gl=new QGridLayout;
    gl->addWidget(f1,0,0);
    gl->addWidget(fe1,0,1);
    gl->addWidget(pb1,0,2);

    gl->addWidget(f2,1,0);
    gl->addWidget(fe2,1,1,1,2);

    QHBoxLayout *hl=new QHBoxLayout;
    hl->addWidget(pb2);

    QVBoxLayout *vl=new QVBoxLayout(this);
    vl->addLayout(gl);
    vl->addLayout(hl);

    connect(pb1,SIGNAL(clicked()),this,SLOT(getfileinfo()));
    connect(pb2,SIGNAL(clicked()),this,SLOT(getfilesize()));
}
void Dialog::getfileinfo(){
    QString fname=QFileDialog::getOpenFileName(this,"打开","/","Files(*)");
    fe1->setText(fname);
    fe1->setReadOnly(true);
}
void Dialog::getfilesize(){
    //获取单行编辑框文件路径
    QString fsize=fe1->text();
    QFileInfo fileinfo(fsize);
    qint64 fs=fileinfo.size();
    fe2->setText(QString::number(fs));
    fe2->setReadOnly(true);
}
```