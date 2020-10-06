## 小程序的生命周期

+ onLaunch 启动就执行
+ onShow 切换到前台运行时
+ onHide 切后台时
+ onError 小程序抛出错误时，捕获错误时
+ onPageNotFound 没用找到页面时

小程序中将生命周期分成两类：应用级别App；页面级别Page。

## 小程序原生的api

* 加载框

  ```js
  wx.showLoading({
    title: '加载中',
  })
  
  setTimeout(function () {
    wx.hideLoading()；
  }, 2000)
  ```

+ 显示一个弹出框，确定和取消按钮

  ```js
  wx.showModal({
    title: '提示',
    content: '这是一个模态弹窗',
    // 点击按钮的执行函数；
    success (res) {
      if (res.confirm) {
        console.log('用户点击确定')
      } else if (res.cancel) {
        console.log('用户点击取消')
      }
    }
  })
  ```

+ 点击组件，后简单的信息提示

  ```js
  wx.showToast({
      title: '成功',
      icon: 'success',
      duration: 2000
  })
  ```

+ 模拟类似于系统的菜单，菜单项可以进行设置，选择后知道选择是哪个

  ```js
  wx.showActionSheet({
    itemList: ['A', 'B', 'C'],
    success (res) {
      console.log(res.tapIndex);
    },
    fail (res) {
      console.log(res.errMsg)
    }
  })
  ```

+ 选择图片

  ```js
  wx.chooseImage({
   // 选择几张照片
    count: 1,
    // 所选的图片的尺寸：原图，压缩图
    sizeType: ['original', 'compressed'],
    // 来源：相册、相机
    sourceType: ['album', 'camera'],
    // 选择其中一项后的回调
    success (res) {
      // 临时的文件地址
      const tempFilePaths = res.tempFilePaths;
    }
  })
  ```

+ 给服务器传递数据

  ```js
  wx.uploadFile({
      url: 'https://example.weixin.qq.com/upload', // 仅为示例，非真实的接口地址
      filePath: "https://xx.com/asd/xxx.png",   // 上传的文件！形式：网络地址形式；
      name: 'image_file',  // 后台接受图片文件的字段；后台定；
      success (res){
  		// 请求成功的时候回调
      }
  })
  ```

## 地址参数

在页面上的使用

```html
<navigator wx:for="{{List}}" to="/page/index?id={{item.id}}">{{item.name}}</navigator>
```

在js中的获取

```js
Page({
    onLoad: function(query){
        console.log(query)
    }
})
```

## 在项目中使用less的步骤

不能直接使用，必须先安装，再使用

```shell
npm i less less-loader -D
```

配置：

```html
<style lang="less"></style>
```

## open 系列小结

+ 组件：`<button> open-type属性：会有一些行为:客服、意见、获取电话、用户信息`【button设计理念：用户**主动**（潜意识，自己同意被获取自己信息）点击才有效，属性可以设置获取用户隐私信息；】需要用户自己点击；
+ 组件：`<open-data> type 展示用户昵称、头像、性别、国家等非隐私信息`  【不需要用户同意，代码直接进行获取】

## 地图相关

+ 展示：组件map

  ```html
  <map longitude="113.324520" latitude="23.099994"></map>
  ```

+ 获取经纬度：需要在pages.json增加配置：位置信息是用户隐私；

  ```js
  wx.getLocation({success(res){
      // 用户经纬度：GPS模块；
  }});
  ```

+ 使用**getLocation**前的page.json的配置

  ```json
  {
    "pages": ["pages/index/index"],
    "permission": {
      "scope.userLocation": {
        "desc": "你的位置信息将用于小程序位置接口的效果展示" 
      }
    }
  }
  ```

## uni-ui 使用说明

安装

```shell
npm install @dcloudio/uni-ui
```

将**node_modules\@dcloudio\uni-ui\lib**目录下的组件复制到项目的根目录下的**src\components**目录中

在 `script` 中引用组件：

```js
import uniGrid from "@/components/uni-grid/uni-grid.vue"
import uniGridItem from "@/components/uni-grid-item/uni-grid-item.vue"
export default {
    components: {
        uniGrid,
        uniGridItem
    }
}
```

在 `template` 中使用组件

```html
<uni-grid :column="3">
    <uni-grid-item>
        <text class="text">文本</text>
    </uni-grid-item>
    <uni-grid-item>
        <text class="text">文本</text>
    </uni-grid-item>
    <uni-grid-item>
        <text class="text">文本</text>
    </uni-grid-item>
</uni-grid>
```

