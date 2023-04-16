---
banner_img: /images/uploads/sayathefox-lisa.jpg
index_img: /images/uploads/sayathefox-lisa.jpg
title: qt/Buttons Containers2
date: 2023-04-16 19:07:34
updated: 2023-04-16 19:07:34
tags:
  - C
categories:
  - 编程
comments: true
---
# Buttons Containers2

## 一、控件名称介绍

### 常用控件：

* Group Box：组合框
* Scroll Area：滚动区域
* Tab Widget：标签小部件
* Frame：框架
* Dock Widget：停靠窗体部件

### 不常用控件：

* Tool Box：工具箱
* Stacked Widget：堆叠部件
* Widget：小部件
* MdiArea：MDI区域
* QAxWidget：封装的Flash的ActiveX控件

## 二、控件编写

#### Group Box

> 需要一层一层的将组件嵌套放入每一级窗体

**widget.cpp**

```cpp
#include "widget.h"
#include <QGroupBox>//组合框
#include <QPushButton>//命令按钮
#include <QRadioButton>//单选按钮
#include <QCheckBox>//复选框
#include <QVBoxLayout>//垂直布局
#include <QGridLayout>
#include <QMenu>
#include <string>

Widget::Widget(QWidget *parent)
    : QWidget(parent)
{
    //层级从低到高->QVBoxLayout->QGroupBox->QGridLayout->this主窗口
    //四级窗体
    QVBoxLayout *vbly1=new QVBoxLayout;
    QCheckBox *cbx1=new QCheckBox("checkbox1");
    QCheckBox *cbx2=new QCheckBox("checkbox2");
    QCheckBox *cbx3=new QCheckBox("checkbox3");
    cbx1->setChecked(true);
    QVBoxLayout *vbly2=new QVBoxLayout;
    QRadioButton *rb_1=new QRadioButton("RadioButton1");
    QRadioButton *rb_2=new QRadioButton("RadioButton2");
    QRadioButton *rb_3=new QRadioButton("RadioButton3");
    QVBoxLayout *vbly3=new QVBoxLayout;
    QRadioButton *rb_11=new QRadioButton("RadioButton11");
    QRadioButton *rb_22=new QRadioButton("RadioButton22");
    QRadioButton *rb_33=new QRadioButton("RadioButton33");
    QCheckBox *cbx4=new QCheckBox("checkbox4");
    QVBoxLayout *vbly4=new QVBoxLayout;
    QPushButton *pb1=new QPushButton("菜单");
    QMenu *mu=new QMenu(this);
    for(int i=1;i<=4;i++)
        mu->addAction(QString::number(i));
    pb1->setMenu(mu);
    vbly1->addWidget(rb_1);
    vbly1->addWidget(rb_2);
    vbly1->addWidget(rb_3);
    vbly2->addWidget(cbx1);
    vbly2->addWidget(cbx2);
    vbly2->addWidget(cbx3);
    vbly3->addWidget(rb_11);
    vbly3->addWidget(rb_22);
    vbly3->addWidget(rb_33);
    vbly3->addWidget(cbx4);
    vbly4->addWidget(pb1);
    //三级窗体
    //组合框1
    QGroupBox *gpb_1=new QGroupBox("互相排斥单选按钮组1");
    //设置不可用状态
    gpb_1->setCheckable(true);
    //组合框2
    QGroupBox *gpb_2=new QGroupBox("复选钮组2");
    //组合框3
    QGroupBox *gpb_3=new QGroupBox("单选、复选选钮组3");
    gpb_1->setLayout(vbly1);
    gpb_2->setLayout(vbly2);
    gpb_3->setLayout(vbly3);
    //组合框4
    QGroupBox *gpb_4=new QGroupBox("命令按钮4");
    gpb_4->setLayout(vbly4);
    //三级窗体2
    //二级窗体
    QGridLayout*gdly=new QGridLayout;
    gdly->addWidget(gpb_1,0,0,1,1);
    gdly->addWidget(gpb_2,0,1,1,1);
    gdly->addWidget(gpb_3,1,0,1,1);
    gdly->addWidget(gpb_4,1,1,1,1);
    //主窗体
    this->setLayout(gdly);
}

Widget::~Widget()
{
}
```

#### Scroll Area

> 从main.cpp来实现，这个时候需要注意要设置layout才能显示

**main.cpp**

```cpp
#include "widget.h"

#include <QApplication>
#include <QLabel>
#include <QScrollArea>
#include <QGridLayout>

int main(int argc, char *argv[])
{
    QApplication a(argc, argv);
    Widget w;
    w.resize(500,800);
    QLabel *qlim1=new QLabel;
    qlim1->setGeometry(0,0,400,700);
    qlim1->setScaledContents(true);
//    QImage im1(":/new/prefix1/img/1.jpeg");
//    QImage im1(":/new/prefix1/img/2.jpeg");
    QImage im1(":/new/prefix1/img/3.jpeg");
    qlim1->setPixmap(QPixmap::fromImage(im1));
    QScrollArea *sa=new QScrollArea;
    sa->setHorizontalScrollBarPolicy(Qt::ScrollBarAlwaysOn);
    sa->setVerticalScrollBarPolicy(Qt::ScrollBarAlwaysOff);
    sa->setWidget(qlim1);
    //居中
    sa->setAlignment(Qt::AlignCenter);
    //根据窗口比例进行显示
//    sa->setWidgetResizable(true);
    QGridLayout *grid=new QGridLayout;
    grid->addWidget(sa);
    w.setLayout(grid);


    w.show();
    return a.exec();
}
```

#### Tab Widget

> 1. 首先去widget.h中定义好对象与槽函数,用于测试按钮消息
> 2. 再来到widget.cpp中编写实例化对象与具体实现

**widget.h**

```cpp
#ifndef WIDGET_H
#define WIDGET_H

#include <QWidget>
#include <QTabWidget>
#include <QMessageBox>

class Widget : public QWidget
{
    Q_OBJECT

public:
    Widget(QWidget *parent = nullptr);
    ~Widget();
private:
    QTabWidget*tabui;
private slots:
    void msgcommit();
};
#endif // WIDGET_H
```

- - -

**widget.cpp**

```cpp
#include "widget.h"
#include <QLabel>
#include <QGridLayout>
#include <QPushButton>
#include <QLineEdit>

Widget::Widget(QWidget *parent)
    : QWidget(parent)
{
    this->setWindowTitle("标签小部件");
    this->setFixedSize(1200,800);
    tabui=new QTabWidget(this);
    tabui->setGeometry(200,100,800,600);
    tabui->show();
    bool show_tabui1=true;
    bool show_tabui2=true;
    bool show_tabui3=false;
    bool show_tabui4=false;
    if(show_tabui1){
        QWidget *qwg1=new QWidget();
        tabui->addTab(qwg1,"进程");

        QGridLayout*glout=new QGridLayout();
        QLabel*lb1=new QLabel("请选择文件");
        QLineEdit*ld1=new QLineEdit();
        glout->addWidget(lb1,0,0);
        glout->addWidget(ld1,0,1);


        QPushButton*pb1=new QPushButton("消息框");
        connect(pb1,SIGNAL(clicked(bool)),this,SLOT(msgcommit()));
        glout->addWidget(pb1,0,2);

        qwg1->setLayout(glout);
    }
    if(show_tabui2){
        QWidget *qwg2=new QWidget();
        tabui->addTab(qwg2,"性能");
    }
    if(show_tabui3){
        QWidget *qwg3=new QWidget();
        tabui->addTab(qwg3,"应用");
    }
    if(show_tabui4){
        QWidget *qwg4=new QWidget();
        tabui->addTab(qwg4,"启动");
    }
}

Widget::~Widget()
{
}
void Widget::msgcommit(){
    QMessageBox::information(NULL,"Test","命令按钮测试成功！");
}
```

#### Frame

> 内容框架，设置颜色，位置，大小，边框等

**widget.cpp**

```cpp
#include "widget.h"
#include "ui_widget.h"

Widget::Widget(QWidget *parent)
    : QWidget(parent)
    , ui(new Ui::Widget)
{
    ui->setupUi(this);
    setWindowTitle("Frame框架测试");
    ui->frame->setStyleSheet("background-color:yellow");
    ui->frame_2->setStyleSheet("background-color:blue");
    ui->frame->setMidLineWidth(2);
    ui->frame->setLineWidth(2);
    ui->frame->setFrameShape(QFrame::Box);
}

Widget::~Widget()
{
    delete ui;
}
```