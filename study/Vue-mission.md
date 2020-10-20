## Vue的面试总结

### Vue的响应式原理

![data](https://cn.vuejs.org/images/data.png)

当你把一个普通的 JavaScript 对象传入 Vue 实例作为 `data` 选项，Vue 将遍历此对象所有的 property，并使用 [`Object.defineProperty`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Object/defineProperty) 把这些 property 全部转为 [getter/setter](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Guide/Working_with_Objects#定义_getters_与_setters)。这些 getter/setter 对用户来说是不可见的，但是在内部它们让 Vue 能够追踪依赖，在 property 被访问和修改时通知变更，每个组件实例都对应一个 **watcher** 实例，它会在组件渲染的过程中把“接触”过的数据 property 记录为依赖。之后当依赖项的 setter 触发时，会通知 watcher，从而使它关联的组件重新渲染。

- property是DOM中的属性，是JavaScript里的对象；
- attribute是HTML标签上的特性，它的值只能够是字符串；

### Vue实现数据双向绑定的原理:

采用**数据劫持结合发布者-订阅者模式**的方式，通过  **Object.defineProperty()** 来劫持各个属性的setter，getter，在数据变动时发布消息给订阅者，触发相应监听回调

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
+ *stop* 阻止单击事件冒泡，相当于JavaScript中的e.stopPropagation()
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

###  **methods和computed的作用**

methods方法调用时计算逻辑的过程，相当于js function结算逻辑的过程,computed直接拿到的结果，是一个值，相当于js函数中的return返回值

### **methods,computed和watch的区别**

methods调用一次计算一次，使用计算好的返回值时没有computed性能高。computed计算好的结果会进行缓存，如果没有变动，重复使用时，直接取到缓存的结果拿来使用，不会再进行计算。监听属性配合表单使用，当表单中绑定的属性变化时，会触发监听属性下对应的方法进行操作，当使用固定返回值要使用computed代替watch和methods

### **v-for中的key**

v-for的key值需要使用v-bind去绑定唯一的key，当 Vue 正在更新使用 v-for 渲染的元素列表时，需要使用key来给每一个节点做一个唯一标识,Diff算法就可以正确的识别此节点,作用更加高效的更新VDOM．

### **vue的优点**

+ 轻量级
+ 数据的双向绑定
+ 组件化开发
+ 视图、数据、结构分离
+ 虚拟DOM

### **vue和react的区别**

Vue通过getter/setter以及一些函数的劫持，能精确知道数据的变化，不需要特别的优化就能实现很好的性能。React则是通过diff算法比较不同，可能导致大量不必要的VDOM的重新渲染

### Vue 可以在哪个生命周期发送请求

可以在created、beforeMounte、Mounted发送ajax请求，但是我们建议在created发送请求。应为在服务端渲染（ssr）只支持beforeCreated、created两个生命周期钩子函数

### Vue生命周期在beforeMount和mounted 做了什么

在**beforemount**周期钩子函数生成了V-DOM，而mounted 真实的Dom已经生成

### vant组件的进阶（rem适配）

Vant 中的样式默认使用 `px` 作为单位，如果需要使用 `rem` 单位，推荐使用以下两个工具：

+ [postcss-pxtorem](https://github.com/cuth/postcss-pxtorem) 是一款 postcss 插件，用于将 px 单位转化为 rem
+ [lib-flexible](https://github.com/amfe/lib-flexible) 用于设置 rem 基准值

使用方法：

**（1）使用 [lib-flexible](https://github.com/amfe/lib-flexible) 动态设置 REM 基准值（html 标签的字体大小）**

安装依赖：

```shell
# yarn add amfe-flexible
npm i amfe-flexible
```

然后在 `main.js` 中加载执行该模块：

```js
import 'amfe-flexible'
```

**（2）使用 [postcss-pxtorem](https://github.com/cuth/postcss-pxtorem) 将 `px` 转为 `rem`**

安装依赖：

```shell
# yarn add -D postcss-pxtorem
# -D 是 --save-dev 的简写
npm install postcss-pxtorem -D
```

然后在**项目根目录**中创建 `postcss.config.js` 文件：

```js
module.exports = {
  plugins: {
    'autoprefixer': {
      browsers: ['Android >= 4.0', 'iOS >= 8']
    },
    'postcss-pxtorem': {
      rootValue: 37.5,
      propList: ['*']
    }
  }
}
```

配置完毕，**重新启动服务**。

### 动态路由

概念：不同的路由地址，指向同一个组件，此时需要使用动态路由。

```html
<!-- 路径传参  路由规则{path:'/article/:id'}-->
<router-link to="/article/10001"></router-link>
```

总结：

- 在路由规则中，匹配到不同的地址，指向同一个组件
- 代码：`{path:'/article/:id', component: ArticleItem}`
- 数据：模板 `{{$route.params.id}}`  组件  `this.$route.params.id`

### vue-router-属性to

+ 直接使用字符串，简单路径跳转。

  ```html
  <router-link to="/list"></router-link>
  ```

+ 也可以使用字符串，进行带参数的跳转。

  ```html
  <!-- 路径传参  路由规则{path:'/article/:id'}-->
  <router-link to="/article/10001"></router-link>
  <!-- 键值对传参 路由规则{path:'/article'}-->
  <router-link to="/article?id=10001"></router-link>
  ```

+ 注意：如果有复杂的参数传递，拼接字符串挺麻烦，**to属性支持对象写法**。

### vue-router-属性to的对象写法

+ 普通跳转

  ```html
  <router-link :to="{path:'/list'}"></router-link>
  ```

+ 路径传参（对象写法）

  ```js
  // 路由规则 (命名路由)
  const routes = [{path:'/article/:id',name:'article',component:ArticleItem}]
  ```

  ```html
  <router-link :to="{name:'article',params:{id: 10001}}"></router-link>
  <!-- /article/10001 -->
  ```

  获取 使用$route.params.id 

+ 键值对传参（对象写法）

  ```js
  const routes = [{path:'/article',component:ArticleItem}]
  ```

  ```html
  <router-link :to="{path:'/article',query:{id: 10001}}"></router-link>
  <!-- /article?id=10001 -->
  ```

  获取 使用$route.query.id 

### vue-router-编程式导航

+ 导航：可以发生路由跳转（地址hash值得改变）
  + <router-link> 这个标签可以实现导航功能,**声明式导航**。
  + 通过 `$router.push()`  这个函数可以实现导航功能，**编程式导航**。

### md5 在vue项目中的使用

+ 安装

  ```shell
  npm install --save js-md5
  ```

+ 在*main.js*导入

  ```js
  import md5 from 'js-md5';
  Vue.prototype.$md5 = md5;
  ```

+ 使用：

  ```js
  this.$md5('hello world')  // 5eb63bbbe01eeed093cb22bb8f5acdc3
  ```

### vue项目中使用RSA加密

+ 安装

  ```shell
  npm install --save jsencrypt
  ```

+ 在main.js中

  ```js
  
  import JSEncrypt from 'jsencrypt';
   
  Vue.prototype.$getRsaCode = function(str){ // 注册方法
    let pubKey = `-----BEGIN PUBLIC KEY-----
   rqerewrrrweqrwqewrwqrerwqrsfsafafsafsafqrewqrwqrqwreqer
    -----END PUBLIC KEY-----`;// ES6 模板字符串 引用 rsa 公钥
    let encryptStr = new JSEncrypt();
    encryptStr.setPublicKey(pubKey); // 设置 加密公钥
    let  data = encryptStr.encrypt(str.toString());  // 进行加密
    return data;
  }
  ```

+ 使用加密方法

  ```js
  let rasUserName = this.$getRsaCode(this.loginForm.userName); // ras 加密 用户名
  let rasPw = this.$getRsaCode(this.loginForm.password); // ras 加密 密码
  ```

### vue之watch属性使用方法

+ 用法一：基本数据监听

  ```js
  new Vue({
      el: '#myVue',
      data: {
          title:'123'
      },
      watch: {
          title: function(val){ //（new, old） new:变化后的值；old：变化前的值
              console.log(val)  // 打印出title变化后的数据
          }
      } 
  })
  ```

  这种用法有个特殊的地方：当值第一次绑定的时候，不会执行监听函数，只有值发生改变才会执行

+ 用法二：immediate和handler

  用法一有个不足的地方就是我们在初始值的时候不会执行handler方法。为了解决这个问题我们就需要用到immediate属性了

  ```js
  new Vue({
      el: '#myVue',
      data: {
          people: {id: 1, name: 'tom'}
      },
      watch: {
          people: {
              immediate: true
              handler(val) {
          		console.log(val)
  			}
       	}
  	} 
  })
  ```

  使用场景：父组件向子组件动态传值时，子组件props首次获取到父组件传来的默认值时，也需要执行函数，
  这时只需要将immediate设为true就行了

+ 用法三：deep

  监听一个对象的变化时，普通的watch方法无法监听到对象内部属性的变化，这时就需要使用deep属性对对象进行深度监听。

  ```js
  new Vue({
    el: '#vmyVue',
    data: {
      student: {id: 1, name: 'Tom',sex: '男'}
    },
    watch: {
      student: {
        handler(val) {
          console.log(val)
        },
        deep: true,
      }
    }, 
  })
  ```

  这种写法有个问题就是会监听对象中的全部的属性变化，只要有一个属性发生变化就会执行handler函数.在实际项目中我们
  可能只需要监听对象中的某一个属性。这时我们可以使用字符串的形式监听对象属性：
  下面的代码只会监听对象中的name属性，只有name属性发生变化的时候才会触发handler函数

  ```js
  new Vue({
    el: '#vmyVue',
    data: {
      student: {id: 1, name: 'Tom',sex: '男'}
    },
    watch: {
      'student.name': {
          handler(val) {
          	console.log(val)
          },
          deep: true,
       }
     } 
  })
  ```


### mock-server 的使用

> 当我们在做前后端分离的项目时，有时候不一定后端已经将接口写好，但是我们前端希望能够同时开发，这是我们就可以通过工具模拟出一些接口方便我们开发。常用请求方式：DELETE (删除)	GET(获取数据)	PUT(全部修改)	PATCH(局部修改)	POST(添加数据)

+ 安装

  ```shell
  npm i json-server -g
  ```

+ 接口数据

  ```json
  {
    "brands": [
      { "id": 1, "name": "宝马", "time": "2019-10-10 10:10:46" },
      { "id": 2, "name": "奥迪", "time": "2019-12-10 10:10:46" },
      { "name": "奔驰", "time": "2020-04-13T11:09:55.423Z", "id": 3},
      { "name": "奥托", "time": "2020-04-13T11:10:03.953Z", "id": 4}
    ],
    "heroes": [
      { "heroName": "德玛西亚", "gender": "女", "cTime": "2020-05-08T00:36:56.530Z","id": 10001 },
      { "id": 10002, "heroName": "刘三姐", "gender": "女", "cTime": "Fri Apr 17 2020 16:24:42 GMT+0800 (中国标准时间)" },
      { "id": 10003, "heroName": "超人", "gender": "男","cTime": "2020/10/10 10:10:10"},
      { "cTime": "2020-04-18T02:59:44.920Z", "heroName": "小乔", "gender": "女","id": 10004}
    ]
  }
  ```
  
+ 启动

  ```shell
  json-server db.json
  ```


### 递归组件的使用

> 有时候我们不知道后端返回数据的深度，而我们需要深度渲染各层的数据，我们就要使用到递归组件。

当我们定义组件是一定要设置name属性，而且递归组件一定要有递归结束，而不能使其无限制的一直递归下去，即递归是有限的。

```html
<template>
  <div class="WarpItem">
    <WarpItem />
  </div>
</template>

<script>
  export default {
    name: "WarpItem",
    components: {},
    data() {
      return {};
    },
    watch: {},
    created() {},
    methods: {},
  };
</script>
<style lang="scss" scoped></style>
```

递归组件向外传递数据直接用$emit是无法实现的。因为是递归的原因。

解决办法：用eventBus实现：这种方法用在兄弟组件之间通信很常见。当然也可以用在爷爷组件和孙子组件之间的传递数据。

+ 来创建出我们的eventBus，我们把它命名为bus.js

  ```js
  import Vue from 'vue';  
  export default new Vue();
  ```

+ 在递归组件和使用它的组件同时引入：

  ```js
  import Bus from 'common/js/bus.js';  
  ```

+ 在递归组件里面触发事件：

  ```js
  addCart(event) {  
      Bus.$emit('getTarget', event.target);   
  }   
  ```

+ 在使用递归组件的父组件里面监听事件：

  ```js
  created() {  
      Bus.$on('getTarget', target => {  
          console.log(target);  
      });  
  }
  ```

  

### vue 插槽

> 组件的插槽，提供的是界面上高度复用。

默认插槽（组件只有一处内容不固定）

```html
<div id="app">
    <!-- 组件标签之间的内容，插入定义组件的slot标签位置 -->
    <page>内容1</page>
    <page>内容2</page>
    <page>内容3</page>
  </div>
  <script src="./vue.js"></script>
  <script>
    // 组件
    Vue.component('page',{
      template: `<div class="page">
          <header>头部</header>
          <section>
            <!-- 默认插槽 -->
            <slot></slot>
          </section>
          <footer>底部</footer>
        </div>`
    })
    const vm = new Vue({
      el: '#app'
    })
  </script>
```

具名插槽（如果组件中有多处内容不固定）

```html
<div id="app">
    <!-- 组件标签之间的内容，插入定义组件的slot标签位置 -->
    <page>
      <!-- slot="插槽的名字" 把当前标签内的结构插入到名字为content的插槽中 -->
      <div slot="content">内容1</div>
      <div slot="footer">底部1</div>
    </page>
 </div>
<script>
    // 组件
    Vue.component('page',{
        template: `<div class="page">
            <header>头部</header>
            <section>
                <!-- 具名插槽 -->
                <slot name="content"></slot>
            </section>
            <footer>
                <!-- 具名插槽 -->
                <slot name="footer"></slot>
            </footer>
        </div>`
    })
    const vm = new Vue({
        el: '#app'
    })
</script>
```

### vue中style scope深度访问方式

> **使用场景:** 当我们需要覆盖element-ui中的样式时只能通过深度作用选择器

+ **>>>**

  如果vue的style使用的是css，那么则

  ```css
  <style lang="css" scoped>
  .a >>> .b {
  /* ... */
  }
  </style>
  ```

  但是像scss等预处理器却无法解析>>>，所以我们使用下面的方式.

+ **/deep/**

  ```scss
  <style lang="scss" scoped>
  .a{
  /deep/ .b {
  /* ... */
  }
  }
  </style>
  ```

  但是有些开发者反应，在vue-cli3编译时，deep的方式会报错或者警告。

+ **::v-deep**

  ```scss
  <style lang="scss" scoped>
  .a{
  ::v-deep .b {
  /* ... */
  }
  }
  </style>
  ```

  

