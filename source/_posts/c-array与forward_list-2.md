---
banner_img: /images/uploads/面饼仙儿-大虎鲸.jpg
index_img: /images/uploads/面饼仙儿-大虎鲸.jpg
title: C++/array与forward_list
date: 2023-04-09 00:53:39
updated: 2023-04-09 00:53:39
comments: true
---
## C++﻿11

### 1﻿.array

> array可以直接传入数组

```
#include <iostream>
#include <array>
using namespace std;

int main()
{
    //两个参数，1：类型，2：大小，并紧跟名字
    array<int, 5>v1{};
    for (int i = 0; i < v1.size(); i++) {
        v1.at(i)=i;//将每一个位置赋值
    }
    //两种取数组元素的方法
    //1.begin、end方法
    for (auto i = v1.begin(); i != v1.end(); i++)
        cout << *i<<" ";//必须要用*来表示，否则会报没有对应的操作符错误
    cout<<endl;
    //2.利用C++11新特性auto
    for (auto i : v1)
        cout << i;
}
```

### 2﻿.forward_list

```
#include <iostream>
#include <forward_list>
using namespace std;

int main()
{
    //只有一个参数即类型，并紧跟名字与
    forward_list<int> va{1,2,3,4,5};
    va.emplace_front(12);//插入到最前面
    va.emplace_after(va.before_begin(), 589);//插入到最前面
    va.emplace_after(va.begin(), 589);//插入到第二个位置
    for (auto i = va.begin(); i != va.end(); i++)
        cout << *i << " ";
}
```