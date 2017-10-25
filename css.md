### z-index只有在position为absolute或者relative或者fixed的时候才有效

### 如何产生BFC
   1. float的值不为none
   2. overflow的值不为visible
   3. display的值为 table-cell, table-caption, inline-block, flex, inline-flex
   4. position的值不为relative, static
   
### 要使设置的::after 和 before伪类有效，必须设置content

### 给元素加上 absolute 或者 float, 就相当于给元素加上了display:block
### 如果absolute元素没有position:static以外的父元素，那将相对body定位

### 数学表达式calc()常用于布局中的不同单位的数字运算

### flex布局中利用align-items:center 设置垂直居中时，必须得知道父元素的height

### 行内元素设置padding和margin时，设置border时可以看到行内元素自身会起作用，但是元素堆叠时，padding-top/margin-top和padding-bottom/margin-bottom不起作用

### 清除浮动的4种方法 ###
 1. 给父元素设置高度，父元素具有高度了，就解决了父元素无法自动获取height的问题
 2. 新增加一个div   .clearfix{height:0; clear:both;}
 3. 新增伪类, 原理和2类似 
    .clearfix{
        zoom:1;   /*兼容IE*/
    }
    .clearfix::after{
        content:'';
        display:block;
        height:0;
        clear:both;
        visibility:hidde;
    }
 4. 设置overflow属性，不能为visible,变成一个BFC (hidden 或者 auto) 
    
    
    
  