---
banner_img: /images/uploads/sayathefox-忍野忍.jpg
index_img: /images/uploads/sayathefox-忍野忍.jpg
title: qt/布局
date: 2023-04-13 19:47:42
updated: 2023-04-13 19:47:42
tags:
  - C
categories:
  - 编程
comments: true
---
#### qt-布局

1. 网格布局（Grid_layout）

   > 首先在Headers文件夹内的widget.h中定义好所需要的组件对象

   **widget.h**

   ```cpp
   #ifndef WIDGET_H
   #define WIDGET_H
   #include <QWidget>
   #include <QGridLayout>
   #include <QLabel>
   #include <QFormLayout>
   #include <QPushButton>

   class Widget : public QWidget
   {
       Q_OBJECT

   public:
       Widget(QWidget *parent = nullptr);
       ~Widget();
   	//就是下面这些,其他都是自动生成的
       QGridLayout *pGrid_layouts;
       QPushButton *button1;
       QPushButton *button2;
       QPushButton *button3;
       QPushButton *button4;
   };
   #endif // WIDGET_H
   ```

   > 然后就可以在Sources文件夹内的widget.cpp中开始编写组件的属性

   - - -

   **widget.cpp**

   ```cpp
   #include "widget.h"

   Widget::Widget(QWidget *parent)
       : QWidget(parent)
   {
       button1=new QPushButton(this);
       button1->setText("第一区：顶部菜单栏选项");
       button1->setFixedHeight(100);
       button1->setSizePolicy(QSizePolicy::Expanding,QSizePolicy::Expanding);

       button2=new QPushButton(this);
       button2->setText("第二区：侧边栏菜单栏选项");
       button2->setFixedWidth(200);
       button2->setSizePolicy(QSizePolicy::Expanding,QSizePolicy::Expanding);

       button3=new QPushButton(this);
       button3->setText("第三区：底部选项");
       button3->setFixedHeight(100);
       button3->setSizePolicy(QSizePolicy::Expanding,QSizePolicy::Expanding);

       button4=new QPushButton(this);
       //不设置高度就会自适应
       button4->setText("第四区：子窗体");
       button4->setSizePolicy(QSizePolicy::Expanding,QSizePolicy::Expanding);

       pGrid_layouts=new QGridLayout;
       //通过此函数设置整体左侧 右侧 顶部 底部边距
       pGrid_layouts->setContentsMargins(5,5,5,5);
       //设置窗体左右距离
       pGrid_layouts->setMargin(5);
       //设置窗体左右上下
       pGrid_layouts->setSpacing(5);
       /*
        * 1.插入的对象
        * 2.插入的开始行
        * 3.插入的开始列
        * 4.占用的行数
        * 5.占用的列数
        * 6.指定对其方式
       */
       pGrid_layouts->addWidget(button1,0,1);
       pGrid_layouts->addWidget(button2,0,0,3,1);
       pGrid_layouts->addWidget(button3,2,1);
       pGrid_layouts->addWidget(button4,1,1);

       setLayout(pGrid_layouts);
   }

   Widget::~Widget()
   {
   }
   ```
2. 表单布局（Formlayout）

   > 直接在Sources文件夹中的widget.cpp写即可
   >
   > 表单布局这里直接添加到当前窗口

   **widget.cpp**

   ```cpp
   #include "widget.h"
   #include <QFormLayout>
   #include <QLineEdit>
   Widget::Widget(QWidget *parent)
       : QWidget(parent)
   {
       //固定窗口大小(宽,高)
       setFixedSize(800,600);
       //设置窗口标题
       setWindowTitle("表单布局");
       //创建表单布局指针
       //1.会直接添加到当前窗口内
       QFormLayout* qLayout=new QFormLayout(this);
       //2.只会创建，但不做任何操作，需要手动添加至窗口
       //QFormLayout* qLayout = new QFormLayout();
       QLineEdit *le1=new QLineEdit();//输入学号
       QLineEdit *le2=new QLineEdit();//输入姓名
       QLineEdit *le3=new QLineEdit();//输入学校

       qLayout->addRow("学号",le1);
       qLayout->addRow("姓名",le2);
       qLayout->addRow("学校",le3);
       qLayout->setSpacing(5);

       //将标签显示在单行编辑框上面
   //    qLayout->setRowWrapPolicy(QFormLayout::WrapAllRows);
       //当前标签和单选编辑框，将标签显示在同一行
       qLayout->setRowWrapPolicy(QFormLayout::WrapLongRows);
       //设置标签对其方式
       qLayout->setLabelAlignment(Qt::AlignLeft);
   }

   Widget::~Widget()
   {
   }
   ```