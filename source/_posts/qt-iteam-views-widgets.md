---
banner_img: /images/uploads/sayathefox-frost-2b.jpg
index_img: /images/uploads/sayathefox-frost-2b.jpg
title: qt/Iteam Views-Widgets
date: 2023-04-19 21:16:06
updated: 2023-04-19 21:16:06
tags:
  - C
categories:
  - 编程
comments: true
---
# Iteam Views

## 一、控件名称介绍

### 常用控件：

* List View：清单视图
* Tree View：树视图
* Table View：表视图
* Column View：列视图
* Undo View：撤销命令视图

### 二、控件编写

#### List View

> 1. 在头文件widget.h中定义好私有的对象以及点击槽函数
> 2. 在源文件widget.cpp中编写控件的大小、添加数据模型，并关联好槽函数

**widget.h**

```cpp
#ifndef WIDGET_H
#define WIDGET_H

#include <QWidget>
#include <QListView>
#include <QStringListModel>//字符串列表模型
#include <QMessageBox>

QT_BEGIN_NAMESPACE
namespace Ui { class Widget; }
QT_END_NAMESPACE

class Widget : public QWidget
{
    Q_OBJECT

public:
    Widget(QWidget *parent = nullptr);
    ~Widget();

private:
    Ui::Widget *ui;
private:
    QListView *listview1;
private slots:
    void SlotClickedFunc(const QModelIndex &index);
};
#endif // WIDGET_H
```

- - -

**widget.cpp**

```cpp
#include "widget.h"
#include "ui_widget.h"

Widget::Widget(QWidget *parent)
    : QWidget(parent)
    , ui(new Ui::Widget)
{
    ui->setupUi(this);
    resize(800,600);
    //创建对象
    listview1=new QListView(this);
    listview1->setGeometry(20,20,200,160);
    //创建数据
    QStringList qlist;
    qlist.append("运动类：篮球、足球");
    qlist.append("娱乐类：电影、音乐");
    qlist.append("游戏类：LOL、APEX");
    qlist.append("旅游类：国外、国内");

    //创建数据列表数据显示模型
    QStringListModel* listmodel=new QStringListModel(qlist);
    listview1->setModel(listmodel);
    connect(listview1,SIGNAL(clicked(const QModelIndex)),this,SLOT(SlotClickedFunc(const QModelIndex)));
}

Widget::~Widget()
{
    delete ui;
}

void Widget::SlotClickedFunc(const QModelIndex &index){
    QMessageBox::information(NULL,"兴趣爱好","你的选择类型为：\n"+index.data().toString());
}
```

#### Tree View

> 1. 在头文件mainwindow.h中定义Init初始化函数以及标准数据模型对象
>
>    * 在forms文件夹的ui文件中，直接拖出Tree View模型控件
> 2. 在源文件mainwindow.cpp中编写初始化函数，并在主函数中调用
>
>    * 构造model
>    * 创建1、2、3级节点并添加到model中
>    * 将完成数据添加的model应用到ui中，一定要完成数据构建才添加到ui中（注意，第一步中，手动添加了树视图，这里就需要多指向一次即ui->treeView->setModel()，以此应用model）

**mainwindow.h**

```cpp
#ifndef MAINWINDOW_H
#define MAINWINDOW_H

#include <QMainWindow>
#include <QMessageBox>
#include <QStandardItemModel>

QT_BEGIN_NAMESPACE
namespace Ui { class MainWindow; }
QT_END_NAMESPACE

class MainWindow : public QMainWindow
{
    Q_OBJECT

public:
    MainWindow(QWidget *parent = nullptr);
    ~MainWindow();

private:
    Ui::MainWindow *ui;
public:
    void inittreeviewfunc();
    QStandardItemModel *sItemModel;
};
#endif // MAINWINDOW_H
```

- - -

**mainwindow.cpp**

```cpp
#include "mainwindow.h"
#include "ui_mainwindow.h"

MainWindow::MainWindow(QWidget *parent)
    : QMainWindow(parent)
    , ui(new Ui::MainWindow)
{
    ui->setupUi(this);
    inittreeviewfunc();
}

MainWindow::~MainWindow()
{
    delete ui;
}

void MainWindow::inittreeviewfunc(){
    //1.构造model
    sItemModel=new QStandardItemModel(ui->treeView);
    sItemModel->setHorizontalHeaderLabels(QStringList()<<QStringLiteral("编号")<<QStringLiteral("学校"));
    //创建一级结点，将他加入到sItemModel
    QList<QStandardItem*> item11;

    QStandardItem *i1=new QStandardItem(QString::number(1));
    QStandardItem *i2=new QStandardItem("初中");

    item11.append(i1);
    item11.append(i2);
    sItemModel->appendRow(item11);

    //二级结点，将他加入到sItemModel
    QList<QStandardItem*> item112;

    QStandardItem *i1121=new QStandardItem(QString::number(2));
    QStandardItem *i1122=new QStandardItem("一年级");

    item112.append(i1121);
    item112.append(i1122);
    i1->appendRow(item112);

    //三级结点，将他加入到sItemModel
    QList<QStandardItem*> item1231;
    QStandardItem *i12311=new QStandardItem(QString::number(3));
    QStandardItem *i12312=new QStandardItem("01");
    item1231.append(i12311);
    item1231.append(i12312);
    i1121->appendRow(item1231);

    QList<QStandardItem*> item1232;
    QStandardItem *i12321=new QStandardItem(QString::number(3));
    QStandardItem *i12322=new QStandardItem("02");
    item1232.append(i12321);
    item1232.append(i12322);
    i1121->appendRow(item1232);

    //创建一级结点，将他加入到sItemModel
    QList<QStandardItem*> item12;

    QStandardItem *i3=new QStandardItem(QString::number(1));
    QStandardItem *i4=new QStandardItem("高中");

    item12.append(i3);
    item12.append(i4);
    sItemModel->appendRow(item12);


    //2.应用model
    ui->treeView->setModel(sItemModel);
}
```

#### Table View

> 1. 在头文件mainwindow.h中定义Init初始化函数以及标准数据模型对象
>
>    * 在forms文件夹的ui文件中，直接拖出Table View模型控件
> 2. 在源文件mainwindow.cpp中编写初始化函数，并在主函数中调用
>
>    * 构建数据模型，并将模型绑定到ui中
>    * 设置数据模型的格式如：宽、高等
>    * 添加数据信息进入模型
>    * 设置数据信息的编辑模式、排序方式等

**mainwindow.h**

```cpp
#ifndef MAINWINDOW_H
#define MAINWINDOW_H

#include <QMainWindow>

QT_BEGIN_NAMESPACE
namespace Ui { class MainWindow; }
QT_END_NAMESPACE

class MainWindow : public QMainWindow
{
    Q_OBJECT

public:
    MainWindow(QWidget *parent = nullptr);
    ~MainWindow();

private:
    Ui::MainWindow *ui;
public:
    void initTableViewFunc();
};
#endif // MAINWINDOW_H
```

- - -

**mainwindow.cpp**

```cpp
#include "mainwindow.h"
#include "ui_mainwindow.h"
#include <QStandardItemModel>


MainWindow::MainWindow(QWidget *parent)
    : QMainWindow(parent)
    , ui(new Ui::MainWindow)
{
    ui->setupUi(this);
    initTableViewFunc();
}

MainWindow::~MainWindow()
{
    delete ui;
}
void MainWindow::initTableViewFunc(){
    resize(800,600);
    ui->tableView->resize(750,550);
    //1.添加表头：准备数据模型
    QStandardItemModel *stuModel=new QStandardItemModel();
    stuModel->setHorizontalHeaderItem(0,new QStandardItem(QObject::tr("学号")));
    stuModel->setHorizontalHeaderItem(1,new QStandardItem(QObject::tr("姓名")));
    stuModel->setHorizontalHeaderItem(2,new QStandardItem(QObject::tr("性别")));
    stuModel->setHorizontalHeaderItem(3,new QStandardItem(QObject::tr("分数")));
    //绑定数据模型绑定到UI
    ui->tableView->setModel(stuModel);

    //设置表格列的宽度
    ui->tableView->setColumnWidth(0,200);

    //2.添加数据信息
    stuModel->setItem(0,0,new QStandardItem("2022001"));
    stuModel->setItem(0,1,new QStandardItem("张三"));
    stuModel->setItem(0,2,new QStandardItem("男"));
    stuModel->setItem(0,3,new QStandardItem("721"));

    stuModel->setItem(1,0,new QStandardItem("2022002"));
    stuModel->setItem(1,1,new QStandardItem("李四"));
    stuModel->setItem(1,2,new QStandardItem("男"));
    stuModel->setItem(1,3,new QStandardItem("722"));

    //不可编辑
    ui->tableView->setEditTriggers(QAbstractItemView::NoEditTriggers);

    //排序 从大到小
    stuModel->sort(3,Qt::DescendingOrder);
}
```

# Item Widgets

## 一、控件名称介绍

### 常用控件：

* List Widget：清单控件
* Tree Widget：树控件
* Table Widget：表控件

### 二、控件编写

#### List Widget

> 1. 在forms文件夹的ui文件中，直接拖出List Widget模型控件
> 2. 设置List Widget的属性以及信息(widget.cpp)
>
>    * 设置小标题以及标题格式
>    * 添加一个QStringList对象，将这个字符串列表加入清单控件List Widget
>    * 将这个清单控件List Widget应用到ui中

**widget.cpp**

```cpp
#include "widget.h"
#include "ui_widget.h"
#include <QListWidget>

Widget::Widget(QWidget *parent)
    : QWidget(parent)
    , ui(new Ui::Widget)
{
    ui->setupUi(this);
    QListWidgetItem *qi=new QListWidgetItem("姜二嫚 | 七岁");
    ui->listWidget->addItem(qi);
    qi->setTextAlignment(Qt::AlignCenter|Qt::AlignVCenter);
    QStringList slist;
    slist<<"灯把黑夜，烫了一个洞。";
    ui->listWidget->addItems(slist);

}

Widget::~Widget()
{
    delete ui;
}
```

#### Tree Widget

> 1. 在forms文件夹的ui文件中，直接拖出Tree Widget模型控件
> 2. 设置Tree Widget的属性以及信息(widget.cpp)
>
>    * 添加多级节点(这里只添加到了2级)
>    * 构建时就指定到ui中
>    * 设置Tree Widget控件的属性如：隐藏表头数字、展开每一个节点、启动选择模式等

**widget.cpp**

```cpp
#include "widget.h"
#include "ui_widget.h"

Widget::Widget(QWidget *parent)
    : QWidget(parent)
    , ui(new Ui::Widget)
{
    ui->setupUi(this);
    //1：添加1级节点
    QTreeWidgetItem *topitem1=new QTreeWidgetItem(ui->treeWidget);
    topitem1->setText(0,"清华大学");
    topitem1->setCheckState(0,Qt::Checked);
    ui->treeWidget->addTopLevelItem(topitem1);
    //隐藏表头
    ui->treeWidget->setHeaderHidden(true);
    //展开节点
    ui->treeWidget->expandAll();

    //2：二级节点添加到一级节点的topitem1
    QTreeWidgetItem *topitem11=new QTreeWidgetItem(topitem1);
    topitem11->setText(0,"清华大学建筑学院");
    QTreeWidgetItem *topitem12=new QTreeWidgetItem(topitem1);
    topitem12->setText(0,"清华大学科学学院");
    QTreeWidgetItem *topitem13=new QTreeWidgetItem(topitem1);
    topitem13->setText(0,"清华大学电竞学院");
    QTreeWidgetItem *topitem14=new QTreeWidgetItem(topitem1);
    topitem14->setText(0,"清华大学政治学院");
}

Widget::~Widget()
{
    delete ui;
}
```

#### Table Widget

> 1. 在forms文件夹的ui文件中，直接拖出Table Widget模型控件
> 2. 设置Table Widget的属性以及信息(widget.cpp)
>
>    * 设置水平表头以及整个表的行和列数量
>    * 以QList为基础添加QString数据如分数列表：QList<QString> strscore;
>    * 使用循环为表格赋值

**widget.cpp**

```cpp
#include "widget.h"
#include "ui_widget.h"

Widget::Widget(QWidget *parent)
    : QWidget(parent)
    , ui(new Ui::Widget)
{
    ui->setupUi(this);

    //设置表格的行和列数
    ui->tableWidget->setRowCount(2);
    ui->tableWidget->setColumnCount(2);

    //设置水平表头
    QStringList slist;
    slist<<"学号"<<"分数";
    ui->tableWidget->setHorizontalHeaderLabels(slist);
    //添加数据
    QList<QString> strno;
    strno<<"01"<<"02";
    QList<QString> strscore;
    strscore<<"98"<<"96";
    //循环为表格赋值
    for(int i=0;i<strno.count();i++){
        int icolumn=0;
        QTableWidgetItem* pitem=new QTableWidgetItem(strno.at(i));
        ui->tableWidget->setItem(i,icolumn++,pitem);
        ui->tableWidget->setItem(i,icolumn,new QTableWidgetItem(strscore.at(i)));
    }
}

Widget::~Widget()
{
    delete ui;
}
```

# 总结

```tex
本节最需要注意的地方是理解每个控件的类型问题，它有许多节点(多级节点)，每个节点都是用添加父元素的方式放入的，这个时候要注意想要添加到哪个父元素，你就得保证子元素与父元素都是相同的类型，如QStandardItem标准元素只能添加到QStandardItem类型的元素底下，而不能添加到QStandardItemModel标准元素模型底下，QStandardItem与QStandardItemModel是两个不同的类型
```