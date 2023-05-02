---
banner_img: /images/uploads/Saya The Fox-Zenith Maid.jpg
index_img: /images/uploads/Saya The Fox-Zenith Maid.jpg
title: qt/颜色、字体、输入、自定义消息对话框
date: 2023-04-30 17:45:08
updated: 2023-04-30 17:45:08
tags:
  - C
categories:
  - 编程
comments: true
---
# Q颜色、字体、输入、自定义消息对话框

1. QColorDialog
2. QFontDialog
3. QInputDialog
4. QMessageBox

#### 基本实现

> setPalette调色板

| Constant                     | Value | Description                         |
| ---------------------------- | ----- | ----------------------------------- |
| QMessageBox::InvalidRole     | \-1   | 按钮无效。                               |
| QMessageBox::AcceptRole      | 0     | 单击按钮将使对话框被接受(例如，OK)。                |
| QMessageBox::RejectRole      | 1     | 点击按钮会导致对话框被拒绝(例如取消)。                |
| QMessageBox::DestructiveRole | 2     | 点击按钮会导致破坏性的改变(例如，丢弃改变)并关闭对话框。       |
| QMessageBox::ActionRole      | 3     | 单击该按钮将导致对话框中的元素发生更改。                |
| QMessageBox::HelpRole        | 4     | 可以单击该按钮以请求帮助。                       |
| QMessageBox::YesRole         | 5     | 按钮是一个类似“是”的按钮。                      |
| QMessageBox::NoRole          | 6     | 这个按钮是一个类似“不”的按钮。                    |
| QMessageBox::ApplyRole       | 8     | 该按钮应用当前更改。                          |
| QMessageBox::ResetRole       | 7     | The button applies current changes. |

###### **dialog.h**

```cpp
#ifndef DIALOG_H
#define DIALOG_H

#include <QDialog>
#include <QPushButton>
#include <QFrame>
#include <QColorDialog>
#include <QGridLayout>
#include <QDialog>
#include <QFontDialog>
#include <QTextEdit>
#include <QLineEdit>
#include <QInputDialog>
#include <QMessageBox>
#include <QLabel>

class Dialog : public QDialog
{
    Q_OBJECT

public:
    Dialog(QWidget *parent = nullptr);
    ~Dialog();
private:
    QGridLayout *gl;
    QPushButton *colorbutton;
    QFrame *colorframe;

    QPushButton *fontbutton;
    QPushButton *inputbutton;
    QLineEdit *text;

    QPushButton *messagebutton;

    QPushButton *specialbutton;
    QLabel *lb;

private slots:
    void dispcolorfunc();
    void dispfontfunc();
    void dispinputfunc();
    void dispmessfunc();
    void dispspecialfunc();
};
#endif // DIALOG_H
```

###### **dialog.cpp**

```cpp
#include "dialog.h"

Dialog::Dialog(QWidget *parent)
    : QDialog(parent)
{
    setWindowTitle("颜色对话框测试");
    gl=new QGridLayout(this);
    colorbutton=new QPushButton("调用颜色对话框");
    colorframe=new QFrame;
    colorframe->setFrameShape(QFrame::Box);
    colorframe->setAutoFillBackground(true);//背景填充处理
    colorframe->setFixedWidth(150);
    gl->addWidget(colorbutton,0,0);
    gl->addWidget(colorframe,1,0,2,1);


    fontbutton=new QPushButton("调用字体对话框");
    text=new QLineEdit;
    text->setText("123");
    text->setFixedWidth(150);
    gl->addWidget(fontbutton,0,1);
    gl->addWidget(text,3,1);

    inputbutton=new QPushButton("输入测试:");
    gl->addWidget(inputbutton,1,1);

    messagebutton=new QPushButton("消息测试");
    gl->addWidget(messagebutton,2,1);

    specialbutton=new QPushButton("自定义消息框");
    gl->addWidget(specialbutton,0,2);
    lb=new QLabel("未测试状态");
    gl->addWidget(lb,1,2);


    connect(colorbutton,SIGNAL(clicked()),this,SLOT(dispcolorfunc()));
    connect(fontbutton,SIGNAL(clicked()),this,SLOT(dispfontfunc()));
    connect(inputbutton,SIGNAL(clicked()),this,SLOT(dispinputfunc()));
    connect(messagebutton,SIGNAL(clicked()),this,SLOT(dispmessfunc()));
    connect(specialbutton,SIGNAL(clicked()),this,SLOT(dispspecialfunc()));
    resize(600,400);
}

Dialog::~Dialog()
{
}

void Dialog::dispcolorfunc(){
    QColor colorvalues=QColorDialog::getColor(Qt::red);
    if(colorvalues.isValid()){
        colorframe->setPalette(QPalette(colorvalues));
    }
}
void Dialog::dispfontfunc(){
    bool isbool;
    QFont font=QFontDialog::getFont(&isbool);
    if(isbool){
        text->setFont(font);
    }
}
void Dialog::dispinputfunc(){
    bool isbool;
    QString strtext=QInputDialog::getText(this,"标准输入对话框","请输入",QLineEdit::Normal,text->text(),&isbool);
    if(isbool && !strtext.isEmpty()){
        text->setText(strtext);
    }
}
void Dialog::dispmessfunc(){
    switch (QMessageBox::question(this,"问题消息框","是否退出?"
                                  ,QMessageBox::Ok|QMessageBox::Cancel,QMessageBox::Ok)) {
    case QMessageBox::Ok:
        text->setText("你选择🆗");break;
    case QMessageBox::Cancel:
        text->setText("你选择cancel");break;
    default:break;
    }

}
void Dialog::dispspecialfunc(){
    QMessageBox msgbox;
    msgbox.setWindowTitle("Apex Legends");
    QPushButton *yes=msgbox.addButton("Yes",QMessageBox::ActionRole);
    QPushButton *no=msgbox.addButton("No",QMessageBox::ActionRole);
    //添加图标
    msgbox.setIconPixmap(QPixmap("D:\\图\\webp\\SayatheFox\\A\\1499877278300.png"));
    msgbox.exec();
    if(msgbox.clickedButton()==yes){
        lb->setText("Yes");
    }
    else if (msgbox.clickedButton()==no) {
        lb->setText("No");
    }
}
```