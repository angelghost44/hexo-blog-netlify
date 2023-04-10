---
banner_img: /images/uploads/宮本桜-毒蛇.jpg
index_img: /images/uploads/宮本桜-毒蛇.jpg
title: C++/nullptr与constexpr
date: 2023-04-10 11:47:01
updated: 2023-04-10 11:47:01
tags:
  - C
categories:
  - 编程
comments: true
---
#### nullptr([官方文档](https://learn.microsoft.com/zh-cn/cpp/cpp/nullptr?view=msvc-140))

1. nullptr关键字：它的出现为了代替NULL
2. _ptr：能够隐式转化为任何类型

```cpp
#include <iostream>
using namespace std;

void Func(char* pc) {
    printf("\n调用此函数为:char*\n\n");
}
void Func(int inumber) {
    printf("\n调用此函数为:int\n\n");
}
int main()
{
    Func(0);
    Func(nullptr);
    return 0;
}
```

#### constexpr([官方文档](https://learn.microsoft.com/zh-cn/cpp/cpp/constexpr-cpp?view=msvc-140))

1. constexpr关键字：常量，constexpr可以修饰函数、结构体，而const后面不可改变
2. constexpr是c++11新添加的特征，目的是将运算尽量放在编译阶段，而不是运行阶段。
3. 修饰函数

   * 修饰的函数只能包括return 语句。
   * 修饰的函数只能引用全局不变常量。
   * 修饰的函数只能调用其他constexpr修饰的函数。
   * 函数不能为void 类型和，并且prefix operation（v++）不允许出现。

```cpp
#include <iostream>
using namespace std;

int main()
{
    int x = 400, y = 2000;
    cout << "x=" << x << endl;
    constexpr int* p = &x;
    *p = 120;
    cout << "x=" << x << endl;

    //p=&y;错误的，因为p定义的时候已经是一个常量了

    return 0;
}
```

4. 修饰结构体

```cpp
#include <bits/stdc++.h> 
using namespace std; 
class Rectangle 
{ 
int _h, _w; 
public: 
    // 修饰一个结构体
	constexpr Rectangle (int h, int w) : _h(h), _w(w) {} 
	// 修饰一个函数，_h, _w为全局，并且在实例化时就已经是初始化后的常量了
	constexpr int getArea () { return _h * _w; } 
}; 
int main() 
{ 
	// 对象在编译时就已经初始化了
	constexpr Rectangle obj(10, 20); 
	cout << obj.getArea(); 
	return 0; 
}
```