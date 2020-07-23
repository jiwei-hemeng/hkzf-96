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
  
- axios 的拦截器
  
  ```js
  // 请求拦截器 常用来添加token
  axios.interceptors.request.use(config => {
    if(config.url.startsWith('/user') && config.url !== '/user/login'){
      config.headers.authorization = localStorage.getItem("token")
    }
    return config
  })
  
  // 响应拦截器 常用来处理错误的请求
  axios.interceptors.response.use(response => {
    if (response.data.status === 400) {
      // 移除 token
      localStorage.getItem("token")
    }
    return response
  })
  ```
  
- axios 基础地址的配置
  
  ```js
  // 导入axios 模块
  import axios from 'axios'
  let API = axios.create({
    baseURL: 'xx.com'
  })
  ```
  
- 请求方式有以下几种：
  
  - GET
  - POST
  - DELETE
  - PUT（完整修改）
  - PATCH（局部修改）
  
- https和http的区别主要如下：

  - http是超文本传输协议，信息是明文传输，https则是具有安全性的ssl加密传输协议。
  - 用的端口也不一样，http是80，https是443。
  - http和https使用的是完全不同的连接方式
  - http的连接很简单，是无状态的；HTTPS协议是由SSL+HTTP协议构建的可进行加密传输、身份认证的网络协议，比http协议安全。

- TCP协议的三次握手

  - 客户端发送了一个带有SYN的tcp报文到服务器，表示客户端想要和服务端建立连接
  - 服务端接收到客户端的请求，返回客户端报文，这个报文带有SYN和ACK标志，询问客户端是否准备好。
  - 客户端再次响应服务端一个ACK，表示我已经准备好

- GET和POST的区别：

  - 本质上：GET 一般只是获取服务端数据；POST 可以修改服务端数据
  - 安全上：POST比GET安全
  - 传输数据量上：POST没有限制，而GET有限制

- 常见的模板引擎
  - 百度的`template`
  - 腾讯的`art-template`
  
- 同源策略及产生的影响
  
  如果协议、域名、端口号不一致时就会非同源，就会阻止dom获取和操作，无法发送Ajax请求
  
- 如何解决跨域
  - Jsonp（本质是js调用）
  - cors（后台设置）
  - 服务端代理（运维配置）
  
- Jsonp 的原理和特点是什么
  - 原理
    - img,script,这种标签如果有相应的src，那么便会发起一个htttp请求来请求相应的资源,如果有script标签对应的路径是一个js文件，那么在下载完毕这个js之后会马上执行
  - 特点
    - 只能发送get请求
    - 需要后台配合
  
- http协议是什么？
  - 首先有客服端发起http请求
  - 服务器收到客服端的请求后处理数据，然后将结果返回给客户端
  
- 状态码及其代表的意义

  - 200 表示请求成功
  - 401 身份认证失败
  - 403 没有访问权限
  - 404 找不到页面
  - 500 服务端错误
  - 507 数据库错误

## H5C3

- 前端的三层结构
  - Html
  - Css
  - Javascript
  
-  Css的优先级、权重
  
  - !important(无穷大)
  - 行内样式（1000）
  - Id （100）
  - Class （10）
  - 标签 （1）
  
-  H5新特性
  
  - 多媒体，用于媒介回放的video和audio元素
  - 图像效果，用于绘画的canvas元素，svg元素等。
  - 离线&存储，对本地离线存储能够更好地支持，比如localstorage,Cookies等
  - 设备兼容特性
  
- 常见的让盒子居中显示的方法

  - **方法一：**

    父盒子给 position：relative；

    盒子给 position：absolute；top：0；right：0；bottom：0；left：0；margin：auto；

  - **方法二：**

    父盒子给 position：relative；

    盒子给 position：absolute；top：50%；left：50%；transform：translate（-50%，-50%）；

  - **方法三：**

    父盒子给 display: flex;align-items: center;justify-content: center;

-  C3新特性
  - CSS实现圆角（border-radius）,阴影（box-shadow）,边框图片border-image
  - 对文字加特效（text-shadow）,强制文本换行（word-wrap）,线性渐变（linear-gradient）
  -  旋转，缩放，定位，倾斜
  -  媒体查询（@media）,多栏布局（flex）
  
- 清除浮动

  **1. 额外标签法**：给谁清除浮动，就在其后额外添加一个空白标签 。

  ```css
  .clear {
      clear: both;
  }
  ```

  **2. 父级添加overflow方法**：

  ```css
  .father {
      overflow: hidden;
  }
  ```

  **3. 使用after伪元素清除浮动**

  ```css
  .clearfix::after {
      content: "";
      display: block;
      clear: both;
      width:0;
      visibility:hidden;
      height: 0
  }
  .clearfix {
      /*   IE6、7、8的写法  */
      zoom: 1
  }
  ```

+ 关于flex布局

  + flex-direction：设置主轴的方向
  + justify-content：设置主轴上的子元素排列方式
  + flex-wrap：设置子元素是否换行  
  + align-content：设置侧轴上的子元素的排列方式（多行）
  + align-items：设置侧轴上的子元素排列方式（单行）
  + flex-flow：复合属性，相当于同时设置了 flex-direction 和 flex-wrap

+ 关于媒体查询

  H5的新特性，为了移动端的使用而新增的特性，使用 @media 查询，你可以针对不同的媒体类型定义不同的样式，响应式布局就是使用媒体查询的原理

  ```css
  /*and  可以将多个媒体特性链接到一块,相当于且*/
  /*only   指定某个特定的媒体类型, 可以省略*/
  @media only screen and (min-width: 320px) and (max-width: 767px) {}
  ```

+ px 、em 和 rem 的区别

  + px 是一个固定单位
  + em是一个相对单位，相对于当前标签的字体大小
  + rem是一个相对单位，相对于html的字体大小
  
+ localStorage与sessionStorage与cookie的区别总结

  + **共同的** ：都保存在浏览器端，且同源
  + **不同点**
    + 传递的数据量不同，cookie不能超过4k，而localStorage 与 sessionStorage大小为5M
    + 传递方式不同，cookie在浏览器和服务器间来回传递（即使不需要），而localStorage 与 sessionStorage不会自动把数据发给服务器，仅在本地保存。
    + 生命周期不同:localStorage永久保存, sessionStorage当前会话, 都可手动清除，cookie只在设置的cookie过期时间之前一直有效，即使窗口或浏览器关闭。
    + 作用域不同sessionStorage不在不同的浏览器窗口中共享，即使是同一个页面；localStorage 在所有同源窗口中都是共享的；cookie也是在所有同源窗口中都是共享的。

+ c3 盒模型

  + div p 等元素的大小会受到内边距、外边距以及边框的影响，可以通过设置c3 和模型使其更稳固的结构，意味着如果添加border或padding会造成真正放置内容的区域变小

    ```css
    div {
       box-sizing: border-box; 
    }
    ```

+ 前端网站常规优化方案
  + 合并、压缩、混淆html/css/js文件（webpack实现，减小资源大小）
  + Nginx开启Gzip，进一步压缩资源（减小资源大小）
  + 图片资源使用CDN加速（提高加载速度）
  + 符合条件的图标做base64处理（减小资源大小）
  + 样式表放首部，JS放尾部（JS单线程，会阻塞页面；资源加载方式）
  + 设置缓存（强缓存和协商缓存，提高加载速度）
  + link或者src添加rel属性，设置prefetch或preload可预加载资源。（加载时机）
  + 如果使用了UI组件库，采用按需加载（减小资源大小）
  + SPA项目，通过import或者require做路由按需（减小资源大小）
  + 服务端渲染SSR，加快首屏渲染，利于SEO
  + 页面使用骨架屏，提高首页加载速度（提高加载速度）
  + 使用 JPEG 2000, JPEG XR, and WebP 的图片格式来代替现有的jpeg和png，当页面图片较多时，这点作用非常明显
  + 使用图片懒加载-lazyload

## javascript

- 写Javascript的基本规范

  - 不要在一行申明多个变量
  - 使用  *===* 或 *！==*  来比较true/false
  - switch必须带有default分支
  - 函数应该返回值
  - for if else 必须使用大括号
  - 语句结束加分号
  - 命名要有意义，使用驼峰命名法

- 本地存储

  - 保存数据到本地   *localStorage.setItem(key, value)*
  -  获取本地存储的数据  *localStorage.setItem(key)*
  -  从本地存储中移除数据  *localStorage.removeItem(key)*

-  Js 数据类型？如何判断

  - 简单数据类型：Number、String、布尔类型(boolean)
  - 复杂数据类型：对象类型、数组、Set类型
  - 可以通过typeof 或者 instrandof 判断

- typeof 判断复杂数据类型

  - *typeof*  用于判断数据类型，返回值为6个字符串，分别为string、Boolean、number、function、object、undefined
  -  *typeof* 对于丰富的对象实例，只能返回"Object"字符串
  -  *instanceof* 用来判断对象，代码形式为obj1 instanceof obj2（obj1是否是obj2的实例），obj2必须为对象，否则会报错！其返回值为布尔值
  -  *instanceof* 可以对不同的对象实例进行判断，判断方法是根据对象的原型链依次向下查询，如果obj2的原型属性存在obj1的原型链上，（obj1 instanceof obj2）值为true。

- 简单数据类型和复杂数据类型的存储方式？

  - 简单数据类型存放到堆
  - 复杂数据类型存放到栈

- 栈和堆的区别

    - 栈：由编译器自动分配释放，存放函数的参数值，局部变量等
    - 堆：一般由程序员分配释放，若程序员不释放，程序结束可能由操作系统释放

- JavaScript的作用域链

    当需要从局部函数查找某一属性或方法时，如果当前作用域没有找到，就会上溯到上层作用域查找，直至全局作用域，这种组织形式就是作用域链

- ‘==’和’===’ 的区别？

  - ’==’ 只是值的相等；
  - ’===’则是值和数据类型必须都相等

- 如何获取Dom元素？

  - *document.getElementById(‘id’)*  通过id获取元素
  - *document.querySelect()*  通过选择器获取元素
  - *document.querrySelectAll()*  通过选择器获取一类元素，得到伪数组

- new 操作符具体干了什么

    - 创建一个空对象，并且this 变量引用该对象，同时继承了该函数的原型
    - 属性和方法被加入到this应用的对象中
    - 新创建的对象由this所应用，并且最后隐式返回this

- this 指向问题

    - 在普通函数中，this指向 *window*
    - 在事件处理程序中，this 指向  *事件源*
    - 在构造函数中，this 指向 创建的对象
    - 在方法中，this 指向当前方法所属的对象

- 关于原型链

    每一个函数都拥有一个prototype属性，每一个函数的实例对象都有一个`__proto__` 属性，而这个属性指向了函数的prototype，当我们访问实例对象的属性或方法时回先从自身的构造函数中查找，如果没有找到就会去`__proto__` 中查找，这个查找过程就是原型链

-  如何创建、删除Dom元素？

  -  创建元素 *document.createElement('标签名')*
  -  删除元素 *父元素.removeChild(子元素)*

-  函数的作用

  - 封装---一次定义多次使用

- 创建对象的方式

  - 字面量的方式 

    ```js
    var obj = {}
    ```

  - *new Object()*  的方式创建对象

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

  - *join(separator)* 将数组的元素组起一个字符串
  - *push()* 追加数组元素，将其放在数组的最后一个位置，并增加数组的长度
  - *pop()* 数组末尾移除最后一项，减少数组的 length 值，然后返回移除的项。
  - *shift()* 删除原数组第一项，并返回删除元素的值；如果数组为空则返回undefined 。
  - *unshift()* 将参数添加到原数组开头，并返回数组的长度 。
  - *splice(index, length)* 删除数组中的元素，参数一：删除的开始位置，参数二：删除数组元素的条目数
  - *forEach()* 对数组进行遍历循环，对数组中的每一项运行给定函数。这个方法没有返回值。参数都是function类型，默认有传参，参数分别为：遍历的数组内容；第对应的数组索引，数组本身。
  - *map()* 循环遍历数组 参数是一个函数，该函数的第一个参数是item表示遍历项目，第二个参数是遍历项的索引,第三个参数循环项本身

- 字符串常用的方法

    - *split()* 用于将字符串按照某个分隔符分隔，得到一个数组

        ```js
        var myStr = "I,Love,You,Do,you,love,me"
        var substrArray = myStr.split(",")    // ["I", "Love", "You", "Do", "you", "love", "me"];
        ```

    - *str.length()* 用于计算字符串长度

    - *indexOf()* 用于查找某个字符在字符串中的位置

    - 常用的转换为大写或者小写字符串函数，如下：

        ```js
        var myStr = "I,love,you,Do,you,love,me"
        var lowCaseStr = myStr.toLowerCase()
        //"i,love,you,do,you,love,me"
        var upCaseStr = myStr.toUpperCase()
        //"I,LOVE,YOU,DO,YOU,LOVE,ME"
        ```

    - *字符串切割和提取*

        有三种可以从字符串中抽取和切割的方法，如：

        第一种，使用slice():

        ```js
        var myStr = "I,love,you,Do,you,love,me"
        var subStr = myStr.slice(1,5)	//",lov"
        ```

        第二种，使用substring():

        ```js
        var myStr = "I,love,you,Do,you,love,me"
        var subStr = myStr.substring(1,5)	 //",lov"
        ```

        第三种，使用substr():

        ```js
        var myStr = "I,love,you,Do,you,love,me"
        var subStr = myStr.substr(1,5)	 //",love"
        ```

        与第一种和第二种不同的是，substr()第二个参数代表截取的字符串最大长度，如上结果所示

    - *replace()* 用于字符串的替换

        ```js
        var myStr = "I,love,you,Do,you,love,me"
        var replacedStr = myStr.replace(/love/g,"hate")
        ```

    - *charAt(8)* 查找给定位置的字符或其字符编码值

      ```js
      var myStr = "I,love,you,Do,you,love,me"
      var theChar = myStr.charAt(8)		// "o",同样从0开始
      ```

-  数组的反转方法是什么

  - *reverse()* 反转数组项的顺序。

- 事件的组成以及执行是什么？

    - 事件的组成：事件源、事件类型、事件处理函数
    - 在js中绑定的事件默认执行时间是在冒泡阶段执行，而非在捕获阶段

- 如何阻止事件的冒泡？如何阻止时间的默认行为？

  - 阻止事件冒泡 *event.stopPropagation()*
  - 阻止默认行为 *event.preventDefault()*

- 事件委托的原理是什么？

  - 事件冒泡
  - 当事件冒泡到上级元素时会被上级监听并捕获，可以通过e.target找到事件源

- JQuery的两大特点是什么

  - 链式编程
  - 隐式迭代

- 继承方式有以下几种

  - 原型继承
  - 构造继承
  - 实例继承
  - call/apply继承（组合继承）
  - ES6 使用class extends 继承

- 关于深/浅拷贝

  js的数据类型分别为基本数据类型和复杂数据类型，基本数据从类型保存的是值，复杂数据类型保存的是内存的地址。浅拷贝共用一个引用地址，深拷贝会创建新的内存地址

  浅拷贝的方法：直接复制、Object.assign

  深拷贝的方法： JSON.stringify转为字符串再JSON.parse    深度遍历

- Bind、Call() 和apply的区别

  - apply()方法 接收两个参数，一个是函数运行的作用域（this），另一个是参数数组。
  - call()方法 第一个参数和apply()方法的一样，但是传递给函数的参数必须列举出来
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

+ 关于防抖与节流

  防抖与节流都是希望在同一时间内，不要重复触发请求。

  防抖主要是在规定的时间内只触发一次，如果再次调用，事件重新计算

  节流是要是在规定的时间内只触发一次

## Git

+ **Git常用命令**

  ```shell
  # 初始化仓库
  git init
  # 工作区提交到暂存区
  git add file
  # 从暂存区提交到本地仓库
  git commit -m '提交说明'
  # 删除文件
  git rm file
  # 查看版本库日志信息
  git log
  # 查看当前文件修改状态
  git status
  ```

+ **Git 配置命令**

  ```shell
  # 设置用户名
  git config --global user.name 'userName'
  # 设置邮箱
  git config --global user.email 'example@xx.com'
  # 配置SSH
  ssh-keygen -t rsa -C "你的邮箱地址"
  ```

+ **关于分支的命令**

  ```shell
  # 查看当前分支
  git branch
  # 创建分支
  git branch name
  # 修改当前分支名称
  git branch -m oldName newName
  # 创建分支并切换分支
  git checkout -b name
  # 切换分支
  git checkout name
  # 合并分支
  git merge dev
  ```

+ **工作中想将dev分支合并到master分支，操作如下：**

  + 首先切换到master分支上

    ```shell
    git  checkout master
    ```

  + 如果是多人开发的话 需要把远程master上的代码pull下来

    ```shell
    git pull origin master
    //如果是自己一个开发就没有必要了，为了保险期间还是pull
    ```

  + 然后我们把dev分支的代码合并到master上

    ```shell
    git  merge dev
    ```

  + 然后查看状态及执行提交命令

    ```shell
    git status
    
    On branch master
    Your branch is ahead of 'origin/master' by 12 commits.
      (use "git push" to publish your local commits)
    nothing to commit, working tree clean
    
    //上面的意思就是你有12个commit，需要push到远程master上 
    > 最后执行下面提交命令
    git push origin master
    ```

## ES6

+ 关于*var* 、 *const* 、*let* 的区别

  |       | 初始值   | 更改值 | 重新声明 | 变量提升 | 块级作用域 | window调用 |
  | ----- | -------- | ------ | -------- | -------- | ---------- | ---------- |
  | var   | 可有可无 | √      | √        | √        | ×          | √          |
  | const | 必须有   | ×      | ×        | ×        | √          | ×          |
  | let   | 可有可无 | √      | ×        | ×        | √          | ×          |

+ 箭头函数与普通函数的异同？

  + 普通函数 *this* 指向 window；箭头函数没有 *this* 指向，所以箭头函数的 *this* 指向上级作用域
  + 普通函数有arguments；而箭头函数没有必须使用剩余参数 *...* 
  + 箭头函数不能用于构造函数: 普通函数可以用于构造函数

+ 对象的简写形式

  + 对象的属性名与属性值一样时，可以省略属性值

+ Set 新的数据类型

  ```js
  // 应用于数组去重
  var arr = [1,2,3,4,5,6]
  var newArr = [...new Set(...arr)]
  ```

+ 对象、数组的解构

+ es6中的class

  ```js
  class Student{
      constructor(name){
          // 如果有super必须写在最强面
          this.name = name
      }
      doSth(){
          console.log(this.name)
      }
  }
  let s1 = new Student('若川')
  s1.doSth();
  ```

+ 模板字符串

  ```js
  var str = `bhjdc ${item}`
  ```

## Vue

+ 对vue核心的理解
  + 数据驱动视图
    + 数据的改变会驱动视图的自动更新。
    + 传统的做法是手动改变DOM来使视图更新，而vue只需改变数据
  + 组件化开发
    + 可以降低数据之间的耦合度
    + 代码封装成组件之后更够高度复用，提高代码的可用性
  + “渐近式框架” & “自底向上逐层应用”
  + 响应式的数据双向绑定

- Vue的组件传值
  - 父-->子
    - 父组件：v-bind绑定自定义属性
    - 子组件：组件实例对象中使用Prop对象接收
  - 子--> 父	
    - 子组件：$emit(‘字定义事件名’，值)
    - 父组件：v-on绑定该自定义事件
  
- vue-router 的路由懒加载

  首先，可以将异步组件定义为返回一个 Promise 的工厂函数 (该函数返回的 Promise 应该 resolve 组件本身)：

  ```js
  const Foo = () => Promise.resolve({ /* 组件定义对象 */ })
  ```

  第二，在 Webpack 2 中，我们可以使用[动态 import](https://github.com/tc39/proposal-dynamic-import)语法来定义代码分块点 (split point)：

  ```js
  import('./Foo.vue') // 返回 Promise
  ```

  结合这两者，这就是如何定义一个能够被 Webpack 自动代码分割的异步组件。

  ```js
  const Foo = () => import('./Foo.vue')
  ```

  在路由配置中什么都不需要改变，只需要像往常一样使用 `Foo`：

  ```js
  const router = new VueRouter({
    routes: [
      { path: '/foo', component: Foo }
    ]
  })
  ```

- 把组件按组分块
  
  有时候我们想把某个路由下的所有组件都打包在同个异步块 (chunk) 中。只需要使用 [命名 chunk](https://webpack.js.org/guides/code-splitting-require/#chunkname)，一个特殊的注释语法来提供 chunk name (需要 Webpack > 2.4)。
  
  ```js
  const Foo = () => import(/* webpackChunkName: "group-foo" */ './Foo.vue')
  const Bar = () => import(/* webpackChunkName: "group-foo" */ './Bar.vue')
  const Baz = () => import(/* webpackChunkName: "group-foo" */ './Baz.vue')
  ```
  
- vue路由钩子大致可以分为三类
  
  - 全局钩子,主要包括beforeEach和aftrEach
  - 单个路由里面的钩子,主要用于写某个指定路由跳转时需要执行的逻辑
  - 组件路由
  
- *vue-router*  提供的导航守卫用来控制组件是否允许访问
  
  - 全局前置守卫
  
    ```js
    const router = new VueRouter({ ... })
    router.beforeEach((to, from, next) => {
      // to 表示去哪 from 表示来源 next表示放行
    })
    ```
  
  - 全局后置守卫
  
    你也可以注册全局后置钩子，然而和守卫不同的是，这些钩子不会接受 `next` 函数也不会改变导航本身：
  
    ```js
    router.afterEach((to, from) => {
      // ...
    })
    ```
  
  - 路由独享的守卫
  
    ```js
    const router = new VueRouter({
      routes: [
        {
          path: '/foo',
          component: Foo,
          beforeEnter: (to, from, next) => {
            // ...
          }
        }
      ]
    })
    ```
  
- 不打包第三方包

  我们推荐使用第三方的 CDN 来加载资源，所谓的 CDN 说白了就是一个在线链接。

  ```html
  <!-- element 依赖了 Vue，所以这里也必须加载 Vue -->
  <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/element-ui@2.13.1/lib/theme-chalk/index.css">
  <script src="https://cdn.jsdelivr.net/npm/vue@2.6.11/dist/vue.min.js"></script>
  <script src="https://cdn.jsdelivr.net/npm/element-ui@2.13.1/lib/index.js"></script>
  <script src="https://cdn.jsdelivr.net/npm/echarts@4.7.0/dist/echarts.min.js"></script>
  ```

  在项目的根目录创建 `vue.config.js`

  ```js
  // 该配置文件必须导出一个对象（Node 中的模块语法）
  module.exports = {
    // 自定义 VueCLI 中的 webpack 配置
    configureWebpack: {
      // 告诉 webpack 使用 script 标签加载的那个资源，而不是去 node_moudles 中打包处理
      externals: {
        // 属性名：你加载的那个包名
        // 属性值：script 标签暴露的全局变量，注意，写到字符串中！！！
        // 'element-ui': 'ELEMENT'
        'vue': 'Vue',
        'element-ui': 'ELEMENT',
        'echarts': 'echarts'
      }
    }
  }
  ```

- Vue的生命周期
  
  - BeforeCreate 实例创建之前
  -  Created 实例创建完成
  - BeforeMount 渲染模板之前
  - Mounted 渲染模板完成
  -  BeforeUpdate 更新组件之前
  - Updated 更新组件之后
  - BeforeDestroy 组件销毁之前
  -  Destoryed 组件销毁完毕
  
- vue 双向数据绑定的原理

  - *v-modle* 默认接受 *input* 事件，相当于 *@input=“事件名”*  默认发送  *:value=“数据 ”*  的数据。

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
  
- 对比jQuery、vue有什么不同

  jQuery专注于视图层，通过操作Dom去实现页面的一些逻辑渲染；vue专注于数据层，通过数据的双向绑定，最终表现在DOM层面，减少了DOM的操作

## react

- 原理
  - 虚拟dom 它是一个js对象，它和页面真实dom一一对应。react会在页面加载时自动在内存中生成虚拟dom，根据虚拟dom会在页面生成真实的dom
  - diff算法，它会一层一层、一级一级的比较，如果发现不同将不会在继续进行比较，而是直接更新其组件、及其后代组件
  
- 特点

  - 数据驱动视图的更新
  - 组件化开发

- 鉴定路由 **AuthRoute**

  ```js
  import React, { Component } from 'react'
  import { Route, Redirect } from 'react-router-dom'
  // 导入获取token的文件
  import { isAuto } from '../../utils/token'
  export default class AuthRoute extends Component {
    render() {
      const { path, exact, Page } = this.props
      return (
        <Route
          path={path}
          exact={exact}
          render={(props)=>{
            if(isAuth()){
              // 封装以后必须先张开props然后传给相应的页面
              return <Page {...props}></Page>
            }
            return <Redirect to="/login"></Redirect>
          }}
        ></Route>
      )
    }
  }
  ```

- 可视区域渲染（React-virtualized）
  
  原理：只渲染页面可视区域的列表项，非可视区域的数据 **完全不渲染(预加载前面几项和后面几项)** ，在滚动列表时动态更新列表项

+ 关于ref的使用步骤

  - 1 调用 `React.createRef()` 方法创建ref对象

  - 2 将创建好的 ref 对象添加到文本框中

  - 3 通过ref对象获取到文本框的值

    ```js
    class App extends React.Component {
        constructor(){
            super()  
            //创建 ref
            this.txtRef = React.createRef()
        }
        //或者 txtRef = React.createRef()
        // 获取文本框的值
        getTxt =() => {
            console.log(this.txtRef.current.value)
        }
        render(){
            return (
              <div>
                <input type ="text" ref={this.txtRef} />
                <button onClick ={this.getTxt}>获取值</button>
              </div>
            )
        }
    }
    ```

+ 组件之间的传值

  + 父传子
    + 父组件：传入一个自定义属性
    + 子组件：通过props接受
  + 子传父
    + 父组件：定义并传入一个方法
    + 子组件：通过props调用该方法

+ 数据的双向绑定原理

  react没有v-modle，但是其可以使用value实现从数据到视图的绑定，onChange事件可以实现从视图到数据的绑定，从而实现了数据的双向绑定

- react的生命周期
  - 创建时
    - *constructor()*
      - 初始化state
      - 为事件处理程序绑定 *this*
    - *render()*
      - 加载到内存上
    - *componentDidMount()*
      - 组件DOM初次渲染完成时调用此函数
      - 在该函数中可以发送ajax请求，也可以获取DOM元素
  - 更新时
    - *shouldComponentUpdate()*
      - 控制组件是否更新。*return true*  表示可以更新，*return false* 表示不更新
    - *render()*
      - 把更新的结果加载到内存上
    - *componeentsDidUpdate()*
      - 组件更新完成时调用该函数
  - 组件卸载时
    - *componentWillUnmount()*
      - 组件卸载完成时调用的函数
