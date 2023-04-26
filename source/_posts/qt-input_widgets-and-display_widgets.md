---
banner_img: /images/uploads/sayathefox-ann-takamaki.jpg
index_img: /images/uploads/sayathefox-ann-takamaki.jpg
title: qt/Input_Widgets and Display_Widgets
date: 2023-04-26 17:05:41
updated: 2023-04-26 17:05:41
tags:
  - C
categories:
  - 编程
comments: true
---
# Input_Widgets and Display_Widgets

## Input_Widgets

### 一、控件名称介绍

#### 常用控件：

* Combo Box：组合框
* Font Combo Box：字体组合框
* Line Edit：单行编辑框
* Text Edit：文本编辑框
* Plain Text Edit：多行文本编辑器
* Spin Box：
* TimeEdit/DateEdit/DateTimeEdit：
* Scroll Bar：
* Key Sequence Edit：

#### 不常用控件：

* Dial
* 等等

### 二、控件编写

#### 总览

> 内容框架，设置颜色，位置，大小，边框等

**mainwindow.h**

```cpp
#ifndef MAINWINDOW_H
#define MAINWINDOW_H

#include <QMainWindow>
#include <QLabel>
#include <QRadioButton>
#include <QPushButton>
//1.ComboBox
#include <QComboBox>
//2.Font Combo Box
#include <QFontComboBox>
//3.Line Edit
#include <QLineEdit>
//4.Plain Text Edit
#include <QPlainTextEdit>
//5.Spin Box整数、小数
#include <QSpinBox>
//6.TimeEdit/DateEdit/DateTimeEdit
#include <QTimeEdit>
#include <QDateEdit>
#include <QDateTimeEdit>
//7.Scroll Bar
#include <QScrollBar>
//8.Key Sequence Edit
#include <QKeySequenceEdit>


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
    //1.ComboBox
    QComboBox *combox;
    //2.Font Combo Box
    QFontComboBox *fontcombox;
    QLabel *qlabels;
    //3.Line Edit
    QLineEdit *lineedit;
    QPushButton *pushbutton;
    QLabel *qlabelL;
    //4.Plain Text Edit
    QPlainTextEdit *plainedit;
    QRadioButton *rabu;
    //5.Spin Box
    QSpinBox *spinbox;
    //6.TimeEdit/DateEdit/DateTimeEdit
    QDateTimeEdit *dte;
    QTimeEdit *te;
    QDateEdit *de;
    //7.Scroll Bar
    QScrollBar *sbar,*vbar;
    //8.Key Sequence Edit
    QKeySequenceEdit *kse;


private slots:
    void comboxindex(int);
    void fontcomboxindex(QFont);
    void lineeditclicked();
    void plaintexteditclicked();
    void spinboxchanged(int);
    void ksechanged(const QKeySequence &);
};
#endif // MAINWINDOW_H
```

**mainwindow.cpp**

```cpp
#include "mainwindow.h"
#include "ui_mainwindow.h"
#include <QMessageBox>
#include <QDebug>
#include <QDir>
#include <QTextStream>
#include <QCoreApplication>

MainWindow::MainWindow(QWidget *parent)
    : QMainWindow(parent)
    , ui(new Ui::MainWindow)
{
    ui->setupUi(this);
    this->resize(1200,800);
    setWindowTitle("输入控件");
    this->setStyleSheet("QMainWindow{background-color:""rgba(100,200,100,100%)}");
    //1.ComboBox
    combox=new QComboBox(this);
    combox->setGeometry(10,10,200,30);
    combox->addItem("寻血猎犬");
    combox->addItem("瓦尔基里");
    connect(combox,SIGNAL(currentIndexChanged(int)),this,SLOT(comboxindex(int)));

    //2.Font Combo Box
    fontcombox=new QFontComboBox(this);
    qlabels=new QLabel(this);
    fontcombox->setGeometry(10,50,200,30);
    qlabels->setGeometry(10,90,300,50);
    connect(fontcombox,SIGNAL(currentFontChanged(QFont)),this,SLOT(fontcomboxindex(QFont)));

    //3.Line Edit
    lineedit=new QLineEdit(this);
    lineedit->setGeometry(10,150,200,30);
    pushbutton=new QPushButton(this);
    pushbutton->setGeometry(220,150,100,30);
    pushbutton->setText("点我");
    qlabelL=new QLabel(this);
    qlabelL->setGeometry(10,200,400,30);
    connect(pushbutton,SIGNAL(clicked()),this,SLOT(lineeditclicked()));

    //4.Plain Text Edit
    plainedit=new QPlainTextEdit(this);
    plainedit->setGeometry(10,250,400,200);
    rabu=new QRadioButton(this);
    rabu->setGeometry(12,220,200,30);
    rabu->setText("只读模式");
    //设置当前目录为可执行程序的工作目录
    QDir::setCurrent(QCoreApplication::applicationDirPath());
    QFile fe("moc_mainwindow.cpp");
    fe.open((QFile::ReadOnly|QFile::Text));
    //加载到文件流
    QTextStream strin(&fe);
    plainedit->insertPlainText(strin.readAll());
    connect(rabu,SIGNAL(clicked()),this,SLOT(plaintexteditclicked()));

    //5.Spin Box
    spinbox=new QSpinBox(this);
    spinbox->setGeometry(440,10,150,30);
    spinbox->setSingleStep(10);
    spinbox->setRange(10,100);
    spinbox->setValue(100);
    spinbox->setSuffix("%不透明度");
    connect(spinbox,SIGNAL(valueChanged(int)),this,SLOT(spinboxchanged(int)));

    //6.TimeEdit/DateEdit/DateTimeEdit
    dte=new QDateTimeEdit(QDateTime::currentDateTime(),this);
    dte->setGeometry(440,70,200,30);
    te=new QTimeEdit(QTime::currentTime(),this);
    te->setGeometry(440,110,200,30);
    de=new QDateEdit(QDate::currentDate(),this);
    de->setGeometry(440,150,200,30);

    //7.Scroll Bar
    sbar=new QScrollBar(Qt::Horizontal,this);
    sbar->setGeometry(0,780,1200,20);
    vbar=new QScrollBar(Qt::Vertical,this);
    vbar->setGeometry(1180,0,20,780);

    //8.Key Sequence Edit
    kse=new QKeySequenceEdit(this);
    kse->setGeometry(440,250,200,30);
    connect(kse,SIGNAL(keySequenceChanged(const QKeySequence &)),
            this,SLOT(ksechanged(const QKeySequence &)));
}

MainWindow::~MainWindow()
{
    delete ui;
}

void MainWindow::comboxindex(int i){
    qDebug()<<"你的选择是："<<combox->itemText(i)<<endl;
    QMessageBox bo(QMessageBox::Question,"信息",combox->itemText(i),QMessageBox::Yes|QMessageBox::No);
    bo.exec();

}
void MainWindow::fontcomboxindex(QFont f){
    qlabels->setFont(f);
    qlabels->setText("Apex Legends");

}
void MainWindow::lineeditclicked(){
    QString str1="你的输入内容为："+lineedit->text();
    qlabelL->setText(str1);
}
void MainWindow::plaintexteditclicked(){
    if (rabu->isChecked()){
        plainedit->setReadOnly(true);
    }
    else {
        plainedit->setReadOnly(false);
    }
}
void MainWindow::spinboxchanged(int i){
    double dx= (double)i/100;
    this->setWindowOpacity(dx);
}
void MainWindow::ksechanged(const QKeySequence &k){
    if (k==QKeySequence(tr("Ctrl+Q")))
        this->close();
    else
        qDebug()<<k.toString();
}
```

## Display_Widgets

### 一、控件名称介绍

#### 常用控件：

* Label：标签
* Text Browser：文本浏览器
* LCD Number：液晶字体数字控件
* Progress Bar：进度条

### 二、控件编写

#### 总览

> 通过ui界面创建控件，然后在代码编辑它们的操作

**widget.h**

```cpp
#ifndef WIDGET_H
#define WIDGET_H

#include <QWidget>
#include <QTextBrowser>
#include <QTimer>
QT_BEGIN_NAMESPACE
namespace Ui { class Widget; }
QT_END_NAMESPACE

class Widget : public QWidget
{
    Q_OBJECT

public:
    Widget(QWidget *parent = nullptr);
    ~Widget();

private slots:
    void on_pushButton_clicked();

    void on_pushButton_2_clicked();

    void on_pushButton_3_clicked();

    void on_pushButton_4_clicked();
    //自定义函数：定时器
    void on_timeout();

private:
    Ui::Widget *ui;
    void textlabel();
    void textbrowser();
    int iValues=0;
    QTimer *timeers;
    void initfunc();
};
#endif // WIDGET_H
```

**widget.cpp**

```cpp
#include "widget.h"
#include "ui_widget.h"
#include <QMessageBox>
#include <QFile>
#include <QTime>
Widget::Widget(QWidget *parent)
    : QWidget(parent)
    , ui(new Ui::Widget)
{
    ui->setupUi(this);
    this->resize(1200,800);
    textlabel();
    textbrowser();
    //初始化进度条
    initfunc();
    ui->progressBar->setRange(0,1000000);
    ui->progressBar->setValue(0);
    connect(timeers,&QTimer::timeout,this,&Widget::on_timeout);
}

Widget::~Widget()
{
    delete ui;
}

void Widget::textlabel(){
    QString filename("C:\\Users\\rain\\source\\QT\\01-learn\\Dsiplaywidget\\1.jpg");
    QImage *img=new QImage;
    if (!(img->load(filename))){
        QMessageBox::information(this,"失败","加载jpg图片失败");
        delete img;
        return;
    }
    ui->labeljpg->setScaledContents(true);
    ui->labeljpg->setPixmap(QPixmap::fromImage(*img));

}
void Widget::textbrowser(){
    QString qstr;
    QFile qf("C:\\Users\\rain\\source\\QT\\01-learn\\Dsiplaywidget\\1.txt");
    if(!(qf.open(QIODevice::ReadOnly|QIODevice::Text))){
        QMessageBox::warning(this,"fail","打开文件失败");
    }
    while (!qf.atEnd()) {
        QByteArray ay=qf.readLine();
        QString strs(ay);
        qstr.append(strs);
    }
    ui->tb->setText(qstr);
}

void Widget::on_pushButton_clicked()
{
    for(int i=1;i<=1000000;i++){
        for(int j=0;j<1;j++){
            ui->progressBar->setValue(i);
        }
    }
}

void Widget::on_pushButton_2_clicked()
{
    timeers->start();
    ui->pushButton_2->setEnabled(false);
    ui->pushButton_3->setEnabled(true);
    ui->pushButton_4->setEnabled(true);
}

void Widget::on_pushButton_3_clicked()
{
    timeers->stop();
    ui->pushButton_2->setEnabled(true);
    ui->pushButton_3->setEnabled(false);
    ui->pushButton_4->setEnabled(true);
}

void Widget::on_pushButton_4_clicked()
{
    timeers->stop();
    iValues=0;
    ui->lcdNumber->display(iValues);
    ui->pushButton_2->setEnabled(true);
    ui->pushButton_3->setEnabled(true);
    ui->pushButton_4->setEnabled(false);
}

void Widget::initfunc(){
    timeers=new QTimer(this);
    timeers->setInterval(1000);//1s
    timeers->stop();
}
void Widget::on_timeout(){
    iValues++;
    ui->lcdNumber->display(iValues);
}
```