css3中通过transition给元素添加的动画，当动画效果发生改变时，通常是说duration或者ease函数发生了改变。该产品就是通过改变这两个值来改变动画效果。用户可以通过左侧的canvas界面，方便的勾出ease函数。或者通过rang滑块改变duration的值来改变动画效果。

该实现原理中主要牵涉到4个函数:

1. updateCanvas();
该函数用于更新canvas画布，用户通过拖拽会改变贝塞尔曲线的顶点，重新绘制canvas。
2. freshTheTime();
该函数用于更新transition的duration值。
3. setCubicBesireValue();
该函数用于更新贝斯曲线的参数。
4. addTransition()
该函数会将更改的duration及贝斯曲线参数，应用到div元素上。



