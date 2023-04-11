---
banner_img: /images/uploads/闷闷碳-双黑白夜之主.jpg
index_img: /images/uploads/闷闷碳-双黑白夜之主.jpg
title: C++/unordered_set
date: 2023-04-11 12:54:56
updated: 2023-04-11 12:54:56
tags:
  - C
categories:
  - 编程
comments: true
---
#### unordered_set

> unordered_set的数据存储结构也是采用哈希表的方式结果操作，除此之外，它在插入时不会进行自动排序

```cpp
#include <iostream>
#include <set>
#include <string>
#include <unordered_set>
using namespace std;

int main()
{
    //unordered_set不会修改它的序列
    unordered_set<int> un_set;
    un_set.insert(1);
    un_set.insert(2);
    un_set.insert(3);
    un_set.insert(5);
    un_set.insert(4);
    cout << "\nunordered_set:";
    for (auto i : un_set)
        cout << i << " ";
    cout << "\n\n";
	//set会自动排序
    set<int> s;
    s.insert(12);
    s.insert(41);
    s.insert(6);
    s.insert(1);
    cout << "\nset:";
    for (auto i : s)
        cout << i << " ";
}
```