---
banner_img: /images/uploads/sayathefox-精灵.jpg
index_img: /images/uploads/sayathefox-精灵.jpg
title: qt/字符串与常见数据类型
date: 2023-04-13 15:18:23
updated: 2023-04-13 15:18:23
tags:
  - C
categories:
  - 编程
comments: true
---
#### qt-字符串与常见数据类型

1. QString类型（基本方法）

   * append()

     ```cpp
     QString str2="1234";
     str2+="ab";
     str2.append("a");
     qDebug()<<str2; //打印信息
     ```
   * sprintf()

     ```cpp
     QString strtemp;
     strtemp.sprintf("%s","Hello World");
     qDebug()<<qPrintable(strtemp); //打印信息
     ```
   * insert()
   * prepend()
   * replace()
   * startsWith() 是否以某个字符串为开头

     > Qt::CaseInsensitive代表大小写不敏感

     ```cpp
     QString str5="How";
     qDebug()<<str5.startsWith("h",Qt::CaseInsensitive);//不对大小写敏感
     ```
   * args()

     ```cpp
     QString str4;
     str4 =QString("%1 was born in %2").arg("s").arg("2000");
     qDebug()<<qPrintable(str4); //打印信息
     ```
   * contains()

     ```cpp
     QString str6="how";
     qDebug()<<str6.contains("h");
     ```
   * toInt()-进制转换

     ```cpp
     QString str6="25";
     bool is;
     qDebug()<<str6;
     qDebug()<<str6.toInt();
     qDebug()<<str6.toInt(&is,16);
     ```
   * compare()

     ```cpp
     int a1=QString::compare("a","A",Qt::CaseInsensitive);
     int b1=QString::compare("a","A",Qt::CaseSensitive);
     int c1=QString::compare("a","c",Qt::CaseInsensitive);
     qDebug()<<a1<<'\n'<<b1<<'\n'<<c1;
     ```
   * QString转换为ASCII码

     ```cpp
     QString str7="ABC abc";
     QByteArray bye=str7.toUtf8();
     for(int i=0;i<str7.size();i++)
     	qDebug()<<int(bye.at(i));
     ```
   * toDouble()
   * toFloat()
   * toLong()
   * QDateTime QByteArray

     > \#include <QDateTime> //不要忘记引入事件模块

     ```cpp
     QDateTime dt;
     QString strDT=dt.currentDateTime().toString("yyyy-MM-dd hh:mm:ss");
     qDebug()<<qPrintable(strDT);
     QByteArray a1("Qt creator hello world.");
     QByteArray b1=a1.toUpper();
     qDebug()<<qPrintable(a1);qDebug()<<qPrintable(b1);
     ```
2. 字符串大小写转换

   > toUpper() //小写字母转大写
   >
   > toLower() //大写字母转小写