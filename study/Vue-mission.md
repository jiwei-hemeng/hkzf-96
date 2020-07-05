## Vue的面试总结

### Vue的基本原理

<img src="https://github.com/jiwei-hemeng/hkzf-96/edit/master/study/images\Vue-yuanli.png"  />

+ 建立虚拟DOM Tree，通过document.createDocumentFragment()，遍历指定根节点内部节点，根据{{ prop }}、v-model等规则进行compile；

+ 通过Object.defineProperty()进行数据变化拦截；
+ 截取到的数据变化，通过发布者-订阅者模式，触发Watcher，从而改变虚拟DOM中的具体数据；
+ 通过改变虚拟DOM元素值，从而改变最后渲染dom树的值，完成双向绑定
+ 完成数据的双向绑定在于Object.defineProperty()

### Vue实现数据双向绑定的原理:

采**用数据劫持结合发布者-订阅者模式**的方式，通过**Object.defineProperty（）**来劫持各个属性的setter，getter，在数据变动时发布消息给订阅者，触发相应监听回调

### Vue 自定义过滤器

局部过滤器

```js
var vm=new Vue({
    el:"#app",
    data:{
        msg:''
    },
    filters: {
      capitalize: function (value) {
        if (!value) return ''
        value = value.toString()
        return value.charAt(0).toUpperCase() + value.slice(1)
      }
    }
})
```

全局过滤器

```js
Vue.filter('capitalize', function (value) {
  if (!value) return ''
  value = value.toString()
  return value.charAt(0).toUpperCase() + value.slice(1)
})
```

### 对keep-alive 的了解

keep-alive是 Vue 内置的一个组件，可以使被包含的组件保留状态，或避免重新渲染。

```html
<keep-alive include='include_components' exclude='exclude_components'>
  <component>
    <!-- 该组件是否缓存取决于include和exclude属性 -->
  </component>
</keep-alive>
```

参数解释
include - 字符串或正则表达式，只有名称匹配的组件会被缓存
exclude - 字符串或正则表达式，任何名称匹配的组件都不会被缓存
include 和 exclude 的属性允许组件有条件地缓存。二者都可以用“，”分隔字符串、正则表达式、数组。当使用正则或者是数组时，要记得使用v-bind 。

### **vue常用的修饰符**

+ *prevent* 提交事件不再重载页面；
+ *stop* 阻止单击事件冒泡；
+ *self* 当事件发生在该元素本身而不是子元素的时候会触发；
+ *capture* 事件侦听，事件发生的时候会调用

### Vue的路由实现：hash模式 和 history模式

+ **hash模式：**
  + 在浏览器中符号“#”，#以及#后面的字符称之为hash，用window.location.hash读取；
  + 特点：
    + hash虽然在URL中，但不被包括在HTTP请求中；用来指导浏览器动作，对服务端安全无用，hash不会重加载页面。
    + hash 模式下，仅 hash 符号之前的内容会被包含在请求中，如 [http://www.xxx.com](http://www.xxx.com/)，因此对于后端来说，即使没有做到对路由的全覆盖，也不会返回 404 错误。
+ **history 模式：**
  + history采用HTML5的新特性；且提供了两个新方法：pushState（），replaceState（）可以对浏览器历史记录栈进行修改，以及popState事件的监听到状态变更。
  + history 模式下，前端的 URL 必须和实际向后端发起请求的 URL 一致，如 http://www.xxx.com/items/id。后端如果缺少对 /items/id 的路由处理，将返回 404 错误。

### **vue指令有哪些，分别作用是什么**

+ v-html 绑定DOM元素并解析

+ v-text 绑定元素解析为文本
+ v-on:事件名=’方法名’  绑定事件  等价于简写方式@click=’方法名’
+ v-show=’布尔值’  控制节点的显示隐藏
+ v-if=’布尔值’  控制节点的显示隐藏
+ v-model=’渲染的数据’  数据的双向绑定，和表单元素配置使用
+ v-for  DOM遍历  for = ‘item of arr’
+ v-once  让DOM中的数据只渲染一次，不能再改动
+ v-bind  绑定DOM属性 :简写方式
+ v-cloak  当数据真正渲染到DOM上之后才进行显示
+ v-pre 让DOM中的数据不进行解析
+ for循环写法繁杂  for..in遍历对象使用，不适合遍历数组forEach 不能和continue break return配合使用  for..of修正以上缺点

### **methods和computed的作用**

methods方法调用时计算逻辑的过程，相当于js function结算逻辑的过程,computed直接拿到的结果，是一个值，相当于js函数中的return返回值

### **methods,computed和watch的区别**

methods调用一次计算一次，使用计算好的返回值时没有computed性能高。computed计算好的结果会进行缓存，如果没有变动，重复使用时，直接取到缓存的结果拿来使用，不会再进行计算。监听属性配合表单使用，当表单中绑定的属性变化时，会触发监听属性下对应的方法进行操作，当使用固定返回值要使用computed代替watch和methods

### **v-for中的key**

v-for的key值需要使用v-bind去绑定唯一的key，当 Vue 正在更新使用 v-for 渲染的元素列表时，它默认使用“就地更新”的策略。如果需要dom记录自己的什么，当进行值变动时把DOM节点摧毁重建需要给他加上唯一的key值。建议尽可能在使用 v-for 时提供 key attribute，除非遍历输出的 DOM 内容非常简单，或者是刻意依赖默认行为以获取性能上的提升。