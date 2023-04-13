---
banner_img: /images/uploads/sayathefox-海滩随拍.jpg
index_img: /images/uploads/sayathefox-海滩随拍.jpg
title: qt/QLinkedList
date: 2023-04-13 16:26:57
updated: 2023-04-13 16:26:57
tags:
  - C
categories:
  - 编程
comments: true
---
#### qt-QLinkedList

> QLinkedList是一个链表，QLinkList类不能通过索引访问元素，因为它是一个链表，插入删除速度快、效率高
>
> 保存大规模数量数据信息，建议使用它

```cpp
#include <QCoreApplication>
#include <QDebug>
#include <QLinkedList>

int main(int argc, char *argv[])
{
    QCoreApplication a(argc, argv);

    //QList类
    QList<int> q;
    for(int i=0;i<10;i++)
        q.insert(q.end(),i+10);
    qDebug()<<q;

    //通过QList<int>::iterator读写迭代器
    QList<int>::iterator x;
    for(x=q.begin();x!=q.end();x++){
        qDebug()<<(*x);
        *x=(*x)*10+6;
    }

    //初始化一个QList<int>::const_iterator只读迭代器
    qDebug()<<endl;
    qDebug()<<"QList<int>::const_iterator只读迭代器:";
    QList<int>::const_iterator qi;
    for(qi=q.constBegin();qi!=q.constEnd();qi++)
        qDebug()<<*qi;

    //向q添加元素
    qDebug()<<endl;
    q.append(666);
    QList<int>::iterator x1;
    for(x1=q.begin();x1!=q.end();x1++)
        qDebug()<<(*x1);

    //查找q当中的元素，统计q的元素个数
    qDebug()<<endl;
    qDebug()<<q.at(3);
    qDebug()<<q.contains(13);

    //修改q列表元素值
    qDebug()<<endl;
    q.replace(0,888);
    qDebug()<<q;

    //删除元素
    qDebug()<<endl;
    q.removeAt(0);
    q.removeFirst();
    qDebug()<<q;

    //QLinkList类
    QLinkedList<QString> qAllMonth;
    qDebug()<<"Result1:";
    for(int i=1;i<=12;i++)
        qAllMonth<<QString("%1%2").arg("Month:").arg(i);

    //读写迭代器
    QLinkedList<QString>::iterator itrw=qAllMonth.begin();
    for(;itrw!=qAllMonth.end();itrw++)
        qDebug()<<qPrintable(*itrw);

    //只读迭代器
    qDebug()<<endl;
    qDebug()<<"Result2:";
    QLinkedList<QString>::const_iterator itr=qAllMonth.constBegin();
    for(;itr!=qAllMonth.constEnd();itr++)
        qDebug()<<qPrintable(*itr);

    //QLinkList类不能通过索引访问元素，因为它是一个链表，保存大规模数量数据信息，建议使用它
    //插入删除速度快、效率高

    return a.exec();
}
```