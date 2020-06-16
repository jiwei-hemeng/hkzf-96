##  前后端交互

- 原生ajax如何执行？
  - 创建xhr对象
  
  - 调用 xhr.open('get', url?参数=值&参数=值) 函数
  
  - 调用 xhr.send(null) 函数
  
  - 监听 xhr.onreadystatechange 事件（状态值0，1，2，3，4, 4的事后表示请求完成）
  
    ```js
    // 1. 创建xhr对象
    var xhr = new XMLHttpRequest();
    // 2. 调用open方法，设置请求方式和url
    xhr.open('GET', 'http://www.liulongbin.top:3006/api/getbooks?id=3');
    // 3. 调用send方法，发送请求
    xhr.send();
    // 4. 设置onreadystatechange事件，事件内部使用responseText属性接受结果
    xhr.onreadystatechange = function () {
        if (this.readyState === 4) {
            var res = this.responseText; // 是JSON格式的结果
            console.log(JSON.parse(res));
        }
    }
    ```
- 请求方式有哪些？
  - GET
  - POST
  - DELETE
  - PUT（完整修改）
  - PATCH（局部修改）
-  GET和POST有什么区别？
  - 本质上：GET 一般只是获取服务端数据；POST 可以修改服务端数据
  - 安全上：POST比GET安全
  - 传输数据量上：POST没有限制，而GET有限制
  
- 常见的模板引擎
  - 百度的`template`
  - 腾讯的`art-template`
- 同源策略
  - 以下三个不一致就会有同源策略
    - 协议
    - 域名
    - 端口号
- 如何解决跨域
  -  Jsonp
  - cors
  - 服务端代理
- Jsonp 的原理和特点是什么
  - 原理
    - img,script,这种标签如果有相应的src，那么便会发起一个htttp请求来请求相应的资源,如果有script标签对应的路径是一个js文件，那么在下载完毕这个js之后会马上执行
  - 特点
    - 只能发送get请求
    - 需要后台配合
- http协议是什么？
  - 首先有客服端发起http请求
  - 服务器收到客服端的请求后处理数据，然后将结果返回给客户端
-  状态码及其代表的意义
  - 200 表示请求成功
  - 401 身份认证失败
  - 403 没有访问权限
  -  404 找不到页面
  - 500 服务端错误
  -  507 数据库错误

## H5C3

- 前端的三层结构
  - Html
  - Css
  - Javascript
  
-  Css的优先级、权重
  - 行内样式（1000）
  - Id （100）
  -  Class （10）
  -  标签 （1）
  
-  H5新特性
  -  多媒体，用于媒介回放的video和audio元素
  - 图像效果，用于绘画的canvas元素，svg元素等。
  - 离线&存储，对本地离线存储能够更好地支持，比如localstorage,Cookies等
  -  设备兼容特性
  
-  C3新特性
  - CSS实现圆角（border-radius）,阴影（box-shadow）,边框图片border-image
  - 对文字加特效（text-shadow）,强制文本换行（word-wrap）,线性渐变（linear-gradient）
  -  旋转，缩放，定位，倾斜
  -  媒体查询（@media）,多栏布局（flex）
  
-  Px和rem的区别
  - Px单位是一个固定单位
  - Rem是一个相对单位，它会随着设备屏幕大小的变化而变化
  
- 清除浮动

  ```css
  .clearfix::afer {
      content: "";
      display: block;
      clear: both;
      width:0;
      visibility:hidden;
      height: 0
  }
  .clearfix {
      zoom: 1
  }
  ```

## javascript

- 本地存储

  - 保存数据到本地   `localStorage.setItem(key, value)`
  -  获取本地存储的数据  `localStorage.setItem(key) `
  -  从本地存储中移除数据  `localStorage.removeItem(key) ` 

-  Js 数据类型？如何判断

  - 简单数据类型：Number、String、布尔类型(boolean)
  -  复杂数据类型：对象类型、数组、Set类型
  - 可以通过typeof 或者 instrandof 判断

- Typeof 判断复杂数据类型

  - 用于判断数据类型，返回值为6个字符串，分别为string、Boolean、number、function、object、undefined
  -  typeof对于丰富的对象实例，只能返回"Object"字符串
  -  instanceof用来判断对象，代码形式为obj1 instanceof obj2（obj1是否是obj2的实例），obj2必须为对象，否则会报错！其返回值为布尔值
  -  instanceof可以对不同的对象实例进行判断，判断方法是根据对象的原型链依次向下查询，如果obj2的原型属性存在obj1的原型链上，（obj1 instanceof obj2）值为true。

- 简单数据类型和复杂数据类型的存储方式？

  - 简单数据类型存放到堆
  - 复杂数据类型存放到栈

- ‘==’和’===’ 的区别？

  - ’==’ 只是值的相等；
  - ’===’则是值和数据类型必须都相等

- 如何获取Dom元素？

  - `document.getElementById(‘id’)` 通过id获取元素
  - `document.querySelect()` 通过选择器获取元素
  - `document.querrySelectAll()` 通过选择器获取一类元素，得到伪数组

- this 指向问题

    - 在普通函数中，this指向 `window`
    - 在事件处理程序中，this 指向 `事件源`
    - 在构造函数中，this 指向 创建的对象
    - 在方法中，this 指向当前方法所属的对象

-  如何创建、删除Dom元素？

  -  创建元素 `document.createElement('标签名')`
  -  删除元素：`父元素.removeChild(子元素)`

-  函数的作用

  - 封装---一次定义多次使用

- 创建对象的方式

  - 字面量的方式 var Object = {}

    ```js
    var obj = {}
    ```

  - `new Object()`的方式创建对象

    ```js
    var obj = new Obect()
    ```

  - 自定义构造函数创建对象

    ```js
    function  CreateHero ( name, age, height ) {
        this.name = name;
        this.age = age;
          this.height = height;
     }
    ```

  - 工厂的方式创建对象

    ```js
    function  create ( name, age, height ) {
    var  Ob = new Object()
    	  Ob.name = name;
    	  Ob.age = age;
      	  Ob.height = height;
      	  Ob.eat = function () {}
       return Ob;
    }
    ```

- 数组的常用方法

  - `join(separator)` 将数组的元素组起一个字符串
  - `push()` 追加数组元素，将其放在数组的最后一个位置，并增加数组的长度
  - `pop()`数组末尾移除最后一项，减少数组的 length 值，然后返回移除的项。
  - `shift()`删除原数组第一项，并返回删除元素的值；如果数组为空则返回undefined 。
  - `unshift`将参数添加到原数组开头，并返回数组的长度 。
  -  `splice(index, length)`删除数组中的元素，参数一：删除的开始位置，参数二：删除数组元素的条目数
  - `forEach()`对数组进行遍历循环，对数组中的每一项运行给定函数。这个方法没有返回值。参数都是function类型，默认有传参，参数分别为：遍历的数组内容；第对应的数组索引，数组本身。
  -  `map()` 循环遍历数组 参数是一个函数，该函数的第一个参数是item表示遍历项目，第二个参数是遍历项的索引,第三个参数循环项本身

-  数组的反转方法是什么

  - `reverse()`反转数组项的顺序。

- 事件的组成以及执行是什么？

  - 事件的组成：事件源、事件类型、事件处理函数
  - 在js中绑定的事件默认执行时间是在冒泡阶段执行，而非在捕获阶段

- 如何阻止事件的冒泡？如何阻止时间的默认行为？

  - 阻止事件冒泡`event.stopPropagation()`
  - 阻止默认行为` event.preventDefault()`

- 事件委托的原理是什么？

  - 事件冒泡
  - 当事件冒泡到上级元素时会被上级监听并捕获，可以通过e.target找到事件源

- JQuery的两大特点是什么

  - 链式编程
  - 隐式迭代

- Bind、Call() 和apply的区别

  - apply()方法 接收两个参数，一个是函数运行的作用域（this），另一个是参数数组。
  -  call()方法 第一个参数和apply()方法的一样，但是传递给函数的参数必须列举出来
  - Bind()和call很相似，第一个参数是this的指向，从第二个参数开始是接收的参数列表，不会立即执行

-  闭包的优点和缺点是什么 

  - 在本质上，闭包是将函数内部和函数外部连接起来的桥梁。

  - 形成闭包的必要条件：

    - 两个函数形成嵌套关系
    -  内部函数访问外部函数的变量
    - 内部函数作为返回值返回 

    ```js
    function warp () {
        let num = 1
        return function () {
            console.log(num)
        }
    }
    const p = warp()
    p()
    ```
  
-  优点
  
    - 外部函数能访问到内部变量
  - 延长变量的生命周期（函数内部的变量是局部变量垃圾回收机制不能自动清除，所以会延长生命周期）
  
- 缺点
  
    - 会形成数据的缓存，用完之后需要手动清空（给该变量赋一个空值null）
  
- 防抖

  - 概念：短时间内多次触发同一事件，只执行最后一次，或者只执行最开始的一次，中间的不执行

  ```js
  var timer = null
  function debounce(){
      if(timer) clearTimeout(timer);
      timer = setTimeout(()=>{
          ...
          timer = false
      },100)
  }
  debounce()
  ```



## Vue

- Vue的组件传值
  - 父-->子
    - 父组件：v-bind绑定自定义属性
    - 子组件：组件实例对象中使用Prop对象接收
  - 子--> 父	
    - 子组件：$emit(‘字定义事件名’，值)
    - 父组件：v-on绑定该自定义事件
- Vue的生命周期
  - BeforeCreate 实例创建之前
  -  Created 实例创建完成
  - BeforeMount 渲染模板之前
  - Mounted 渲染模板完成
  -  BeforeUpdate 更新组件之前
  - Updated 更新组件之后
  - BeforeDestroy 组件销毁之前
  -  Destoryed 组件销毁完毕
- Es6的新语法
  - Const 用来定义常量
  
  - Let 用来定义变量
  
  - 箭头函数（没有this）
  
  - 对象的简写形式
  
  - Set 新的数据类型
  
  - 对象、数组的解构
  
  - 模板字符串
  
    ```js
    var str = `string ${item}`
    ```
- 关于Promise？
  - Promise 是Es6 新的对象，用来解决异步程序回调地狱的问题
  
  - 定义：Let p = new promise((resolve, reject)=>{ 异步请求代码写这里 }) 
    -  resolve 是成功调用的方法
    - reject 是失败调用的方法
    
  - 获取结果 p.then(res =>{ 请求成功 }).catch(err =>{ 请求失败 })
  
  - promise 的封装和`async` 函数的应用
  
    ```js
    // promise 异步的封装
    function request(option){
        return new promise(resolve, reject){
            try{
                const [err, res] = axios(option)
                resolve(res)
            }catch{
                reject(err)
            }
        }
    }
    // async 函数的使用
    async function abc () {
        const res = await request({
            method: 'xxx',
            url: 'http://xxx.com/api'
        })
    }
    ```
- 模块化开发和组件开发的区别
  -  组件是具体的
  - 组件开发更多的关注UI部分
  - 模块是抽象的
  - 模块开发侧重于数据的分装

## react

- 原理
  - 虚拟dom 它是一个js对象，它和页面真是dom一一对应。react会在页面加载时自动在内存中生成虚拟dom，根据虚拟dom会在页面生成真实的dom
  - diff算法，它会一层一层、一级一级的比较，如果发现不同将不会在继续进行比较，而是直接更新其组件、及其后代组件
- react的生命周期
  - 创建时
    - *constructor()*
      - 初始化state
      - 为事件处理程序绑定this
    - *render()*
      - 加载到内存上
    - *componentDidMount()*
      - 组件DOM初次渲染完成时调用此函数
      - 在该函数中可以发送ajax请求，也可以获取DOM元素
  - 更新时
    - *shouldComponentUpdate()*
      - 控制组件是否更新。`return true` 表示可以更新，`return false` 表示不更新
    - *render()*
      - 把更新的结果加载到内存上
    - *componeentsDidUpdate()*
      - 组件更新完成时调用该函数
  - 组件卸载时
    - *componentWillUnmount()*
      - 组件卸载完成时调用的函数