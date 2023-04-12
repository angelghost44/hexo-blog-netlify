---
banner_img: /images/uploads/水淼aqua-圣诞2b.jpg
index_img: /images/uploads/水淼aqua-圣诞2b.jpg
title: C++/atomic_flag
date: 2023-04-12 18:56:22
updated: 2023-04-12 18:56:22
tags:
  - C
categories:
  - 编程
comments: true
---
<!--StartFragment-->

#### atomic_flag应用

> atomic_flag是原子布尔类型。它不提供加载或存储操作，它保证是免锁的。

```cpp
#include <iostream>
#include <atomic>
#include <vector>
#include <thread>
using namespace std;

//ATOMIC_FLAG_INIT-->定义语句用于初始化操作，清除状态的初始化器
atomic_flag lock = ATOMIC_FLAG_INIT;

void funcat(int args) {
	for (int i = 0; i < 10; i++) {
		while (lock.test_and_set(memory_order_acquire));//获得锁,为真时返回之前锁的值
		cout << "Output Threads:" << i << endl;
		lock.clear(memory_order_release);//释放锁
	}
};
int main()
{
	vector<thread> vct;
	for (int i = 0; i < 2; i++) {
		vct.emplace_back(funcat, i);
	}
	for (auto& t : vct)
		t.join();
	return 0;
}
```

<!--EndFragment-->