## Vue的面试总结

### Vue的基本原理

<img src="./images\Vue-yuanli.png"  />

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