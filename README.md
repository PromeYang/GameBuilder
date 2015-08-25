# [GameBuilder]()

GameBuilder 是移动端轻量HTML5游戏快速开发框架，主要应用于活动推广。

## 开始之前

### 1.游戏形式活动推广页的生命周期

加载资源 --> 活动介绍 --> 游戏主体 --> 结果提示 --> 引导分享

分享进入 --> 参与结果 --> 引导参与 --> 进入游戏

### 2.

## 快速开始

**如果已经安装了 [generator-lego](https://github.com/duowan/generator-lego) ，可以直接使用 `yo lego` 命令来构建**

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
        </div>
        <div class="tool-page" data-type="share" id="sharePage">
            <div class="ui-sharePic">
                <img data-id="share" data-type="png" height="128" alt="">
            </div>
            <div class="ui-shareText">  
            </div>
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

## 说明文档

低调、绝不华丽的文档展示，[这里走起](http://ued.yypm.com/legomobi/3.0.0/src/docs/home.html)

## 交互组件

### [1.Tab](http://ued.yypm.com/legomobi/3.0.0/src/docs/tab.html)



## 更新说明

* 1.0 基础版本。
