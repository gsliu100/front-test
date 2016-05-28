# my-calendar
> 一个日历小插件

#How to use
1. 在你的项目中引入myC.css文件
2. 引入myC.js 文件
3. 在html中创建一个id='myRili'的盒子做为日历的容器
4. 在你的js文件中初始化日历myC(color1,color2,color3,changedListener);

> myC(color1,color2,color3,changeListener),
> color1为头部背景色,
> color2为星期字体颜色,
> color3为选中背景色,
> changeListener为用户改变日期时执行的函数，接收一个对象参数cDate,
> cDate包含year,month,date属性用于获取用户选择的日期信息。

[请参见样例](https://github.com/gsliu100/my-calendar/blob/master/index.html)
