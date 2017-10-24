# z-index只有在position为absolute或者relative或者fixed的时候才有效

## 如何产生BFC
   # float的值不为none
   # overflow的值不为visible
   # display的值为 table-cell, table-caption, inline-block, flex, inline-flex
   # position的值不为relative, static
   
# 要使设置的::after 和 before伪类有效，必须设置content

# 给元素加上 absolute 或者 float, 就相当于给元素加上了display:block
# 如果absolute元素没有position:static以外的父元素，那将相对body定位
    
    
    
    
  