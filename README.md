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
<link rel="stylesheet" href="http://assets.dwstatic.com/game/gamebulider/css/gamebulider.css">
```

### 2.引入脚本文件

```html
<body>
    ...
    <script src="http://assets.dwstatic.com/game/gamebulider/js/gamebulider.js"></script>
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
    <link rel="stylesheet" href="css/gamebulider.css">
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
    <script src="js/gamebulider.js"></script>
</body>
</html>
```

## 说明

### 约定

1.界面分三种类型，资源加载界面（load-page）、主体内容界面（body-page）和消息提示界面（tool-page），主体内容分页（game-page）从`data-index="1"`开始，资源加载界面为`0`，消息提示界面不属于分页内容。

2.消息提示界面（tool-page）也有三种类型，分享页、等待页、弹出页（如结果提示，消息提示，文案提示）。

3.使用img标签加载图片资源时，`data-id`代表图片文件名，`data-type`代表图片文件格式。

4.如果是设定为可以配置内容的项，需要提供`data-set-xxx`的钩子

### gamebulider.js使用说明

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

**配置项**

scanImg - 默认为 `true`，是否扫描img标签作为资源加载

**回调函数**

loadFinish() - 资源加载完成的处理

**静态方法**

prevPage() - 主体内容分页，上一页

nextPage() - 主体内容分页，下一页

gotoPage(index) - 主体内容分页，指定`index`页

showToolPage(opts) - 打开消息提示界面

hideToolPage(opts) - 关闭消息提示界面

## 更新说明

* 1.0 基础版本。