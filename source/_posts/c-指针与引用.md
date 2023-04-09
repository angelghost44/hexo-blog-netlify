---
banner_img: /images/uploads/蠢沫沫-海风.jpg
index_img: /images/uploads/蠢沫沫-海风.jpg
sticky: ""
title: C++/指针与引用
date: 2023-04-08 10:24:00
updated: 2023-04-08 10:24:00
tags:
  - C
categories:
  - 编程
comments: true
---
#### 语法

```cpp
//引用
int i=0;
cout<<"i在内存中的地址编号:"<<&i<<endl;
cout<<"i的值为:"<<i<<endl;
//指针
int a,b;
int * pa,* pb;
cout<<"请输入a,b的值:";
cin>>a>>b;
pa=&a;//将指针指向a的地址
pb=&b;
//此时输出指针与变量都会是同一个值，但是&符号输出的是地址
cout<<"a="<<a<<",b="<<b<<endl;
cout<<"a="<<*pa<<",b="<<*pb<<endl;
```

#### 拓展

值也可以直接传递给地址变量，例如：

```cpp
int a=999;
int& max=a;
cout<<"a的地址:"<<&a<<endl;
cout<<"max的地址:"<<&max<<endl;
//但是a,max的值相同
cout<<"a的值:"<<a<<endl;
cout<<"max的值:"<<max<<endl;
```