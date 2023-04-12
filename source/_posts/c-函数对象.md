---
banner_img: /images/uploads/雨波-蒂法.jpg
index_img: /images/uploads/雨波-蒂法.jpg
title: C++/函数对象
date: 2023-04-12 18:53:13
updated: 2023-04-12 18:53:13
tags:
  - C
categories:
  - 编程
comments: true
---
<!--StartFragment-->

#### C++函数对象

> C++函数对象：函数对象指的是定义operator()的对象
>
> 优势：比普通函数要灵活（可以拥有状态），执行速度比函数指针要快。

```cpp
//语法
class FunctionObjectType
{
    public:
    void operator()(){
        //操作语句
    }
}
```

###### 代码示例：

```cpp
#include <iostream>
#include <set>
using namespace std;

class testA {
public:
    testA(string lname, string fname):_fname(fname),_lname(lname) {
        cout << "执行构造函数" << endl;
    }
    string firstname()const {
        return _fname;
    }
    string lastname()const {
        return _lname;
    }
private:
    string _lname = nullptr;
    string _fname = nullptr;
};

class testB
{
public:
    bool operator()(const testA& t1, const testA& t2)const {
        //返回从大到小进行排序
        return t1.lastname() < t2.lastname() || t1.lastname() == t2.lastname() &&
            t1.firstname() < t2.firstname();
    }
};

int main()
{
    set<testA, testB> set1;
    testA t1("liu", "san");
    testA t2("xiao", "ming");
    //这里从后往前插入，但是最终输出的结果是按照上面定义的函数对象来排序，即"liu"这一组在"xiao"这一组前面
    set1.insert(t2);
    set1.insert(t1);
    for (auto i : set1)
        cout << i.lastname() << ":" << i.firstname() << endl;
}
```



<!--EndFragment-->