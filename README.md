# [GameBuilder]()

GameBuilder 是移动端轻量HTML5游戏快速开发框架，主要应用于活动推广。

## 开始之前

### 1.游戏形式活动推广页的生命周期

加载资源 --> 活动介绍 --> 游戏主体 --> 结果提示 --> 引导分享

分享进入 --> 参与结果 --> 引导参与 --> 进入游戏

### 2.

## 快速开始

**如果已经安装了 [generator-lego](https://github.com/duowan/generator-lego) ，可以直接使用 `yo lego` 命令来构建**

**或者直接 clone 到本地使用**

### 1.引入样式文件

```html
<link rel="stylesheet" href="http://assets.dwstatic.com/gamebuilder/css/gamebuilder.css">
```

### 2.引入脚本文件

```html
<body>
    ...
    <script src="http://assets.dwstatic.com/gamebuilder/js/gamebuilder.js"></script>
</body>
```

### 3.最佳实践

```html
<!doctype html>
<html>
<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0, user-scalable=0, minimum-scale=1.0, maximum-scale=1.0">
    <meta name="description" content="">
    <meta name="keywords" content="">
    <meta name="format-detection" content="telephone=no,address=no,email=no">
    <meta name="apple-mobile-web-app-capable" content="yes" />
    <meta name="screen-orientation" content="portrait">
    <meta name="x5-orientation" content="portrait">
    <meta name="full-screen" content="yes">
    <meta name="x5-fullscreen" content="true">
    <meta http-equiv="expires" content="0">
    <meta http-equiv="cache-control" content="no-cache">
    <link rel="stylesheet" href="http://assets.dwstatic.com/gamebuilder/css/gamebuilder.css">
    <title> title </title>
</head>
<body>
    <div id="preloadPage">
        <img id="loadingImg" src="http://lol.duowan.com/s/lolFaceGame/img/icon.png">
        <div id="loadingText">
            <i></i>
            <span>光速加载中...</span>
            <span id="loadingProcess">0</span>%
            </div>
    </div>
    <div class="body-page">
        <div class="game-page is-right" data-index="1" id="listPage">
            ...
        </div>
        <div class="tool-page" data-type="share" id="sharePage">
            ...
        </div>
        <div class="tool-page" data-type="wait" id="waitingPage" >
            <div class="mod-waiting">
                <div class="mod-waiting__bd">
                    <div class="mod-waiting__inner"></div>
                    <div class="mod-waiting__outer"></div>
                </div>
            </div>
        </div>    
    </div>
    <script src="http://assets.dwstatic.com/gamebuilder/js/gamebuilder.js"></script>
</body>
</html>
```

## 说明

### 1.推荐文件结构(游戏模板)

```
yourProj/
│
├── config.json                // 模板配置文件,必须编写,用于开发调试和上传模板时后台生成给用户编辑的选项
│
├── css/                       // 样式文件
│
├── img/                       // 图片资源
│
├── js/                        // 脚本文件
│
├── res/                       // 素材资源
│
└── index.html                 // 游戏入口
```

### 2.开发规范

1.界面分三种类型，资源加载界面（load-page）、主体内容界面（body-page）和消息提示界面（tool-page），主体内容分页（game-page）从`data-index="1"`开始，资源加载界面为`0`，消息提示界面不属于分页内容。

2.消息提示界面（tool-page）也有三种类型，分享页、等待页、弹出页（如结果提示，消息提示，文案提示）。

3.使用img标签加载图片资源时，使用`data-gb-url`自定义属性保存图片资源的路径,如:`data-gb-url="***"`。

### 3.`config.json`配置文件

作为游戏模板开发,必须包含config.json配置文件

```
{
    "name": "name",
    "version": "1.0.0",
    "description": "",
    "author": "",
    "editOptions": {
        "pageTitle": {
            "name": "页面标题",
            "type": "text",
            "tips": "请输入页面标题",
            "value": "游戏模板"
        },
        "gameStartTips": {
            "name": "提示文案",
            "type": "text",
            "tips": "请输入游戏开始前的提示文案",
            "value": "点击开始摇大奖"
        },
        "gameIcon": {
            "name": "游戏图标",
            "type": "photo-img",
            "tips": "请选择200x200的游戏图标,用于游戏加载时显示",
            "value": "http://lol.duowan.com/s/lolFaceGame/img/icon.png"
        },
        "gameBg": {
            "name": "游戏背景",
            "type": "photo-bgi",
            "tips": "请选择640x1136的游戏背景,用于游戏背景显示",
            "value": "http://lol.duowan.com/s/lolFaceGame/img/icon.png"
        },
        "gameGift": {
            "name": "游戏奖品",
            "type": "photo-img",
            "tips": "请选择200x200的奖品图案,用于获奖时显示",
            "value": "img/gift1.png"
        }
    }
}
```

`editOptions`为可以提供给用户的编辑项集合,每一项属性为一个可以编辑的选项,并与html页面中的自定义属性`data-gb`一一对应.如:

```
"gameStartTips": {
    "name": "提示文案",
    "type": "text",
    "tips": "请输入游戏开始前的提示文案",
    "value": "点击开始摇大奖"
}

对应

<div data-gb="gameStartTips" id="tips" class="ui-tips animated tada">点击开始摇大奖</div>
```

其中,`name`为该编辑项在后台编辑界面显示的可编辑项名称

其中,`type`为该编辑项在后台编辑界面生成可编辑的类型,目前可选项为:

* `text` - 纯文本编辑项

* `photo-img` - 对应`<img>`标签的图片素材编辑项

* `photo-bgi` - 对应使用`background-imgage`方式的图片素材编辑项

其中,`tips`为该编辑项在后台编辑界面显示的可编辑项提示文案

其中,`value`为该配置项的值,可以在开发过程中使用`getValue('gameStartTips')`获得该值

### 4.初始化`gamebuilder`

所有的`options`都是可选的,初始化会执行相关依赖代码,当`gamebuilder`准备就绪之后会调用`game.ready`

```html
<script>
    var game = new GB({
        // options here
    });

    game.ready =function(){
        // code here
    };
</script>
```

**配置项**

scanImg - 默认为 `false`，是否扫描img标签作为资源加载

popupTool - 默认为 `true`，是否使用弹出层

**回调函数**

loadFinish() - 资源加载完成的处理

startEvent() - 游戏开始的处理

pauseEvent() - 游戏暂停的处理

endEvent() - 游戏结束的处理

restartEvent() - 游戏重新开始的处理

devicemotionEvent() - 摇一摇事件触发的回调

updateEvent() - 资源发生变化时游戏视图更新的处理

### 5.gamebuilder使用说明

**utils工具库**

isBadAndroid - 是否低端安卓机

getTime - 返回当前时间戳

hasTransform - 是否支持transform

hasTransition - 是否支持transition

hasTouch - 是否支持触摸事件

extend(target,obj) - 用obj对象扩展target对象

each(arrays,callback) - 像$.each一样的用法

ease - 一些常用的贝塞尔曲线

**$工具库**

$()

html()

attr()

each()

show()

hide()

addClass()

hasClass()

removeClass()

siblings()

append()

on()

**静态方法**

prevPage() - 主体内容分页，上一页

nextPage() - 主体内容分页，下一页

gotoPage(index) - 主体内容分页，指定`index`页

showToolPage(opts) - 打开消息提示界面

hideToolPage(opts) - 关闭消息提示界面

start() - 游戏开始

pause() - 游戏暂停

end() - 游戏结束

restart() - 游戏重新开始

on() - 绑定自定义事件

off() - 移除自定义事件

trigger() - 触发自定义事件

getValue() - 获取config配置文件中的配置项的值

shake() - 触发一次摇一摇事件

loadFinish() - 触发加载完成的回调函数

devicemotion() - 监听摇一摇事件

getQueryString() - 获取url中的参数值

## 更新说明

* 1.0 基础版本。
* 1.1 新增gameStatus，0-游戏就绪 1-游戏开始 2-游戏暂停 3-游戏结束
* 1.2 新增start,pause,end静态方法和startEvent,pauseEvent,endEvent回调函数
* 1.3 新增devicemotion静态方法，和devicemotionEvent回调函数，用于监听摇一摇事件
* 1.4 新增popupTool配置，是否使用弹出层工具，showToolPage静态方法新增popup用法
* 1.5 新增restartEvent,updateEvent回调函数
* 1.6 新增restart,shake,getQueryString,getValue,loadFinish,on,off,trigger静态方法
* 1.7 新增game.ready入口
* 1.8 新增config.json配置文件的方式进行开发
