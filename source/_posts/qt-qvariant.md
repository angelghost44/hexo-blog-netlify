---
banner_img: /images/uploads/sayathefox-浴室诱惑.jpg
index_img: /images/uploads/sayathefox-浴室诱惑.jpg
title: qt/QVariant
date: 2023-04-13 16:47:22
updated: 2023-04-13 16:47:22
tags:
  - C
categories:
  - 编程
comments: true
---
#### qt-QVariant

> （从根目录往下）目录结构:
>
> * QVariant
>
>      QVaroamt.pro
>
>   * Headers
>
>     mainwindow.h
>   * Sources
>
>     main.cpp
>
>     mainwindow.cpp

- - -

**mainwindow.h**

```cpp
#ifndef MAINWINDOW_H
#define MAINWINDOW_H
#include <QMainWindow>
//从这开始
//定义学生结构体类型
struct student{
    int iNO;
    QString strName;
    int score;
};
//定义完后要进行声明，在需要的时候还要把这些数据放到QVariant中去，因为QVariant是一个接受绝大部分类型的数据类型
Q_DECLARE_METATYPE(student)
//改动结束
class MainWindow : public QMainWindow
{
    Q_OBJECT

public:
    MainWindow(QWidget *parent = nullptr);
    ~MainWindow();
};
#endif // MAINWINDOW_H
```

- - -

**main.cpp**

```cpp
#include "mainwindow.h"
#include <QApplication>

int main(int argc, char *argv[])
{
    QApplication a(argc, argv);
    MainWindow w;
//	将窗口显示关闭，启动就不会出现了
//  w.show();
    return a.exec();
}
```

- - -

**mainwindow.cpp**

```cpp
#include "mainwindow.h"
#include <QVariant>
#include <QDebug>
#include <QColor>

MainWindow::MainWindow(QWidget *parent)
    : QMainWindow(parent)
{
    QVariant qv1(298);
    qDebug()<<"qv1:"<<qv1.toInt();

    QVariant qv2("ABC");
    qDebug()<<"qv2:"<<qv2.toString();

    QMap<QString,QVariant> qmap;
    qDebug()<<endl;
    qmap["int"]=2000;
    qmap["double"]=99.8;
    qmap["string"]="good";
    qmap["color"]=QColor(255,0,0);

    //输出：转换函数来处理
    qDebug()<<qmap["int"]<<qmap["int"].toInt();
    qDebug()<<qmap["double"]<<qmap["double"].toDouble();
    qDebug()<<qmap["string"]<<qmap["string"].toString();
    qDebug()<<qmap["color"]<<qmap["color"].value<QColor>();

    //创建一个字符串列表：QStringList
    qDebug()<<endl;
    QStringList qsl;
    qsl<<"A"<<"B"<<"C"<<"D";
    QVariant qvsl(qsl);
    if(qvsl.type()==QVariant::StringList){

        QStringList qlist=qvsl.toStringList();
        for(int i=0;i<qlist.size();i++){
            qDebug()<<qlist.at(i);//输出列表数据信息
        }
    }

    //应用结构体自定义类型和QVariant类配合使用
    qDebug()<<endl;
    student s;
    s.iNO=202201;
    s.strName="mike";
    s.score=780;

    //使用静态方法保存数据
    QVariant qstu=QVariant::fromValue(s);
    if(qstu.canConvert<student>()){  //判断是否可以转换操作
        student temp=qstu.value<student>();//获取数据方法1
        student qtemp=qvariant_cast<student>(qstu);//获取数据方法2
        qDebug()<<"student:iNo="<<temp.iNO<<",strName="<<temp.strName<<",score="<<temp.score;
        qDebug()<<"student:iNo="<<qtemp.iNO<<",strName="<<qtemp.strName<<",score="<<qtemp.score;
    }
}

MainWindow::~MainWindow()
{
}
```

**最终输出**

```textile
qv1: 298
qv2: "ABC"


QVariant(int, 2000) 2000
QVariant(double, 99.8) 99.8
QVariant(QString, "good") "good"
QVariant(QColor, QColor(ARGB 1, 1, 0, 0)) QColor(ARGB 1, 1, 0, 0)


"A"
"B"
"C"
"D"


student:iNo= 202201 ,strName= "mike" ,score= 780
student:iNo= 202201 ,strName= "mike" ,score= 780
```