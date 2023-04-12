---
banner_img: /images/uploads/水淼aqua-上弦陆堕姬.jpg
index_img: /images/uploads/水淼aqua-上弦陆堕姬.jpg
title: C++/条件变量
date: 2023-04-12 18:58:33
updated: 2023-04-12 18:58:33
tags:
  - C
categories:
  - 编程
comments: true
---
<!--StartFragment-->

#### 条件变量

> [condition_variable](https://www.apiref.com/cpp-zh/cpp/thread/condition_variable.html)：能用于阻塞一个线程，或同时阻塞多个线程

```cpp
#include <iostream>
#include <thread>
#include <mutex>
#include <condition_variable>
using namespace std;

mutex mx;
condition_variable scv;
bool ready = false;

void printid(int id) {
    unique_lock<mutex> lock(mx);
	while (!ready)
	{
		scv.wait(lock);//当前线程被阻塞，当全局标志位变为true，	才唤醒
	}
	cout << "Threads:" << id << endl;
}
void runfunc() {
	unique_lock<mutex> lock(mx);
	ready = true;//设置全局标志位
	scv.notify_all();//唤醒所有线程
}

int main()
{
	thread thrs[5];
	for (int i = 0; i < 5; i++)
	{
		thrs[i] = thread(printid, i);
	}
	cout << "5 threads ready to run ...\n";
	runfunc();
	for (auto& i : thrs)
		i.join();
}
```

<!--EndFragment-->