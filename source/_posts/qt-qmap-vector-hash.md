---
banner_img: /images/uploads/sayathefox-粉色套裝.jpg
index_img: /images/uploads/sayathefox-粉色套裝.jpg
title: qt/Qmap-vector-hash
date: 2023-04-13 15:48:09
updated: 2023-04-13 15:48:09
tags:
  - C
categories:
  - 编程
comments: true
---
#### qt-Qmap-vector-hash

1. Qmap

   > value()
   >
   > remove()
   >
   > key()
   >
   > insert()
   >
   > qPrintable() //删除“”符号的输出
   >
   > contains()

   ```cpp
   #include <QCoreApplication>
   #include <QDebug>
   int main(int argc, char *argv[])
   {
       QCoreApplication a(argc, argv);

       /*1:QMap类
        * -创建QMap实例，第一个参数为QString类型的键，第二个参数为int
       */
       QMap<QString,int> map;
       //插入数据信息，2种方式
       map["Chinese"]=119;
       map["English"]=120;
       map.insert("Math",150);
       qDebug()<<map;
       //删除数据Key键
       map.remove("Math");
       qDebug()<<map;
       //遍历QMap类的实例数据信息
       qDebug()<<endl;
       //1：迭代器
       QMapIterator<QString,int> itr(map);
       while (itr.hasNext()) {
           itr.next();
           qDebug()<<itr.key()<<":"<<itr.value();
       }
       qDebug()<<endl;
       //2：STL类型的迭代
       QMap<QString,int>::const_iterator strit=map.constBegin();
       while (strit!=map.constEnd()) {
           qDebug()<<strit.key()<<":"<<strit.value();
           strit++;
       }

       //通过Key键/T键-->来查找
       qDebug()<<"根据键Key来查找对应的T键值："<<map.value("Chinese");
       qDebug()<<"根据键T来查找对应的Key键值："<<qPrintable(map.key(119));


       qDebug()<<endl;
       //查询是否包含某个键
       qDebug()<<map.contains("Math");

       qDebug()<<endl;
       //输出所有QMap实例化：Key键与T值
       QList<QString> akeys=map.keys();
       qDebug()<<akeys;
       QList<int> aval=map.values();
       qDebug()<<aval;

       qDebug()<<endl;
       //一个键对应多个值
       QMultiMap<QString,QString> qmul;
       qmul.insert("s","chinese");
       qmul.insert("s","math");
       qDebug()<<qmul;
   	return a.exec();
   }
   ```
2. vector

   > 1.定义对象
   >
   > 2.插入数据
   >
   > 3.遍历循环

   ```cpp
   #include <QCoreApplication>
   #include <QDebug>
   int main(int argc, char *argv[])
   {
       QCoreApplication a(argc, argv);

       //QHash类--要比QMap类查找速度更快
       qDebug()<<"qHash:";
       QHash<QString,int> qh;
       qh["k1"]= 1;
       qh["k2"]= 2;
       qh["k3"]= 3;
       qh["k4"]= 4;
       qh.insert("k5",5);

       QList<QString> l=qh.keys();
       for (int i=0;i<l.length();i++)
           qDebug()<<l[i]<<":"<<qh.value(l[i]);

       //QHash内部的迭代器QHashIterator类
       QHash<QString,int>::const_iterator iterator;
       for(iterator=qh.begin();iterator!=qh.end();iterator++)
           qDebug()<<iterator.key()<<":"<<iterator.value();
   	return a.exec();
   }
   ```
3. hash

   > 数据存储
   >
   > 计数
   >
   > 遍历

   ```cpp
   #include <QCoreApplication>
   #include <QDebug>
   int main(int argc, char *argv[])
   {
       QCoreApplication a(argc, argv);

       //QVector类
       QVector<int> qv;
       //第一种方式存数据
       qv<<10<<20;

       //第二种方式存数据
       qv.append(30);
       qDebug()<<qv;

       //求出元素个数
       qDebug()<<qv.count();

       //遍历所有元素
       for(int i=0;i<qv.count();i++){
           qDebug()<<qv[i];qv.remove(i);
       }
       //删除
       qv.remove(0,2);//从第一个开始，删除2个元素
       return a.exec();
   }
   ```