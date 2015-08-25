/*
 * @file: GameBuilder.js 游戏开发框架
 * @author: PromeYang
 * @update: 2015-08-25 11:23:50
 */

;
(function() {

    var rAF = window.requestAnimationFrame ||
        window.webkitRequestAnimationFrame ||
        window.mozRequestAnimationFrame ||
        window.oRequestAnimationFrame ||
        window.msRequestAnimationFrame ||
        function(callback) {
            window.setTimeout(callback, 1000 / 60);
        };

    var utils = (function() {
        var gbu = {};

        var _elementStyle = document.createElement('div').style;
        var _vendor = (function() {
            var vendors = ['t', 'webkitT', 'MozT', 'msT', 'OT'],
                transform,
                i = 0,
                l = vendors.length;

            for (; i < l; i++) {
                transform = vendors[i] + 'ransform';
                if (transform in _elementStyle) return vendors[i].substr(0, vendors[i].length - 1);
            }

            return false;
        })();
        var _transform = _prefixStyle('transform');

        // This should find all Android browsers lower than build 535.19 (both stock browser and webview)
        gbu.isBadAndroid = /Android /.test(window.navigator.appVersion) && !(/Chrome\/\d/.test(window.navigator.appVersion));
        gbu.getTime = Date.now || function getTime() {
            return new Date().getTime();
        };
        gbu.hasTransform = _transform !== false;
        gbu.hasTransition = _prefixStyle('transition') in _elementStyle;
        gbu.hasTouch = 'ontouchstart' in window;

        gbu.extend = function(target, obj) {
            for (var i in obj) {
                target[i] = obj[i];
            }
        };

        gbu.each = function(arrays, callback) {
            for (var i = 0; i < arrays.length; i++) {
                callback.call(arrays[i], i, arrays[i])
            }
        };

        gbu.extend(gbu.style = {}, {
            transform: _transform,
            transitionTimingFunction: _prefixStyle('transitionTimingFunction'),
            transitionDuration: _prefixStyle('transitionDuration'),
            transitionDelay: _prefixStyle('transitionDelay'),
            transformOrigin: _prefixStyle('transformOrigin')
        });

        gbu.momentum = function(current, start, time, lowerMargin, wrapperSize, deceleration) {
            var distance = current - start,
                speed = Math.abs(distance) / time,
                destination,
                duration;

            deceleration = deceleration === undefined ? 0.0006 : deceleration;

            destination = current + (speed * speed) / (2 * deceleration) * (distance < 0 ? -1 : 1);
            duration = speed / deceleration;

            if (destination < lowerMargin) {
                destination = wrapperSize ? lowerMargin - (wrapperSize / 2.5 * (speed / 8)) : lowerMargin;
                distance = Math.abs(destination - current);
                duration = distance / speed;
            } else if (destination > 0) {
                destination = wrapperSize ? wrapperSize / 2.5 * (speed / 8) : 0;
                distance = Math.abs(current) + destination;
                duration = distance / speed;
            }

            return {
                destination: Math.round(destination),
                duration: duration
            };
        };

        gbu.extend(gbu.eventType = {}, {
            touchstart: 1,
            touchmove: 1,
            touchend: 1,

            mousedown: 2,
            mousemove: 2,
            mouseup: 2,

            pointerdown: 3,
            pointermove: 3,
            pointerup: 3,

            MSPointerDown: 3,
            MSPointerMove: 3,
            MSPointerUp: 3
        });

        gbu.extend(gbu.ease = {}, {
            quadratic: {
                style: 'cubic-bezier(0.25, 0.46, 0.45, 0.94)',
                fn: function(k) {
                    return k * (2 - k);
                }
            },
            circular: {
                style: 'cubic-bezier(0.1, 0.57, 0.1, 1)', // Not properly "circular" but this looks better, it should be (0.075, 0.82, 0.165, 1)
                fn: function(k) {
                    return Math.sqrt(1 - (--k * k));
                }
            },
            back: {
                style: 'cubic-bezier(0.175, 0.885, 0.32, 1.275)',
                fn: function(k) {
                    var b = 4;
                    return (k = k - 1) * k * ((b + 1) * k + b) + 1;
                }
            },
            bounce: {
                style: '',
                fn: function(k) {
                    if ((k /= 1) < (1 / 2.75)) {
                        return 7.5625 * k * k;
                    } else if (k < (2 / 2.75)) {
                        return 7.5625 * (k -= (1.5 / 2.75)) * k + 0.75;
                    } else if (k < (2.5 / 2.75)) {
                        return 7.5625 * (k -= (2.25 / 2.75)) * k + 0.9375;
                    } else {
                        return 7.5625 * (k -= (2.625 / 2.75)) * k + 0.984375;
                    }
                }
            },
            elastic: {
                style: '',
                fn: function(k) {
                    var f = 0.22,
                        e = 0.4;

                    if (k === 0) {
                        return 0;
                    }
                    if (k == 1) {
                        return 1;
                    }

                    return (e * Math.pow(2, -10 * k) * Math.sin((k - f / 4) * (2 * Math.PI) / f) + 1);
                }
            }
        });

        function _prefixStyle(style) {
            if (_vendor === false) return false;
            if (_vendor === '') return style;
            return _vendor + style.charAt(0).toUpperCase() + style.substr(1);
        }

        return gbu;
    })();

    var $ = (function() {
        var prome = {},
            $$ = {},
            _$;

        $$.html = function(html) {
            each(this, function() {
                this.innerHTML = html;
            })
            return this;
        };
        $$.attr = function(name, value) {
            if (value) {
                each(this, function() {
                    this.setAttribute(name, value);
                })
                return this;
            } else {
                return this[0].getAttribute(name);
            }
        };
        $$.each = function(callback) {
            each(this, callback);
        };
        $$.show = function() {
            each(this, function() {
                this.style.display = 'block';
            })
            return this;
        };
        $$.hide = function() {
            each(this, function() {
                this.style.display = 'none';
            })
            return this;
        };
        $$.addClass = function(name) {
            each(this, function() {
                this.classList.add(name);
            })
            return this;
        };
        $$.hasClass = function(name) {
            return this[0].classList.contains(name);
        };
        $$.removeClass = function(name) {
            each(this, function() {
                this.classList.remove(name);
            })
            return this;
        };
        $$.siblings = function() {
            var _nodes = [],
                elem = this[0];
            while ((elem = elem.previousSibling)) {
                if (elem.nodeType === 1) _nodes.push(elem);
            }
            elem = this[0];
            while ((elem = elem.nextSibling)) {
                if (elem.nodeType === 1) _nodes.push(elem);
            }
            _nodes.__proto__ = $$;
            return _nodes;
        };
        $$.append = function(content) {
            var elem;
            each(this, function() {
                elem = this;
                if (typeof content == 'string') {
                    var _div = document.createElement('div'),
                        _children = [],
                        _length;
                    _div.innerHTML = content;
                    _children = _div.childNodes;
                    _length = _children.length;
                    for (var i = 0; i < _length; i++) {
                        elem.appendChild(_children[0]);
                    }
                    _div = null, _children = null, _length = null;
                } else if (typeof content == 'object' && content.nodeType) {
                    elem.appendChild(content);
                } else if (type(content) == '[object NodeList]' || type(content) == '[object HTMLDivElement]' || type(content) == '[object HTMLBodyElement]' || type(content) == '[object HTMLDocument]') {
                    elem.appendChild(content);
                } else if (type(content) == '[object Array]') {
                    if (typeof content[0] == 'object' && content[0].nodeType) elem.appendChild(content[0]);
                }
            })
        };
        $$.on = function(type, fn) {
            each(this, function() {
                if (document.addEventListener) {
                    this.addEventListener(type, fn, false);
                } else {
                    this.attachEvent('on' + type, function() {
                        return fn.call(this, window.event);
                    });
                }
            });
        };

        prome.qsa = function(selector, element) {
            var found,
                dom,
                _length = 0,
                simpleSelectorRE = /^[\w-]*$/,
                maybeID = selector[0] == '#',
                maybeClass = !maybeID && selector[0] == '.',
                nameOnly = maybeID || maybeClass ? selector.slice(1) : selector, // Ensure that a 1 char tag name still gets checked
                isSimple = simpleSelectorRE.test(nameOnly);
            element = element == undefined ? document : element;
            dom = (isDocument(element) && isSimple && maybeID) ?
                ((found = element.getElementById(nameOnly)) ? [found] : []) :
                (found = element.querySelectorAll(selector));
            _length = found.length;
            dom.__proto__ = $$;
            if (!dom.length) dom.length = _length;
            return dom;
        };

        function isFunction(value) {
            return type(value) == '[object Function]'
        }

        function isWindow(obj) {
            return obj != null && obj == obj.window
        }

        function isDocument(obj) {
            return obj != null && obj.nodeType == obj.DOCUMENT_NODE
        }

        function each(arrays, callback) {
            for (var i = 0; i < arrays.length; i++) {
                callback.call(arrays[i], i, arrays[i])
            }
        }

        function type(value) {
            return Object.prototype.toString.call(value)
        }

        _$ = function(selector) {
            return typeof(selector) == "object" ? (selector = [selector], selector.__proto__ = $$, selector) : prome.qsa(selector);
        };

        return _$;

    })();

    function GameBuilder(options) {
        var self=this;

        this.resourcesAry = [];
        this.resourcesLength = 0;
        this.resourcesLoaded = 0;
        this.nowPageIndex = 0;
        this.maxPageIndex = $('.game-page').length;

        this.options = {
            scanImg:true,
            loadFinish: function() {
                console.log(self)
            }
        };

        utils.extend(this.options,options);

        this._init();
    }

    GameBuilder.prototype = {
        version: '0.1.1',
        utils: utils,
        $: $,
        _init: function() {
            this._scanImg();
        },
        _scanImg: function() {
            if(!this.options.scanImg) return;
            var self = this;
            $('img[data-id]').each(function(i, img) {
                var loader = new Image();
                self.resourcesLength++;
                loader.onload = loader.onerror = function() {
                    self.resourcesLoaded++;
                    $('#loadingProcess').html(Math.round(self.resourcesLoaded / self.resourcesLength * 100));
                    if (self.resourcesLoaded >= self.resourcesLength) {
                        self.options.loadFinish();
                    }
                };
                loader.src = 'http://lol.duowan.com/s/lolFaceGame/img/' + $(this).attr('data-id') + '.' + $(this).attr('data-type');
                self.resourcesAry.push({
                    id: $(this).attr('data-id'),
                    src: loader.src
                });
            });
        },
        prevPage: function() {
            if (this.nowPageIndex > 1) {
                $('.game-page[data-index="' + this.nowPageIndex + '"]').removeClass('is-active');
                this.nowPageIndex--;
            }
        },
        nextPage: function() {
            if (this.nowPageIndex < this.maxPageIndex) {
                this.nowPageIndex++;
                $('.game-page[data-index="' + this.nowPageIndex + '"]').addClass('is-active');
            }
        },
        gotoPage: function(index){
            if( index>0 && index<=this.maxPageIndex ){
                if(index==this.nowPageIndex) return;
                this.nowPageIndex=index;
                for(var i=1; i<=this.maxPageIndex;i++){
                    if(i<=index) $('.game-page[data-index="' + i + '"]').addClass('is-active');
                    else $('.game-page[data-index="' + i + '"]').removeClass('is-active');
                }
            }
        },
        showToolPage:function(opts){
            if(!opts || !opts.name) return;
            $('.tool-page[data-type="'+opts.name+'"]').show();
        },
        hideToolPage:function(opts){
            if(!opts || !opts.name ) $('.tool-page').hide();
            else $('.tool-page[data-type="'+opts.name+'"]').hide();
        }
    };

    if (typeof module != 'undefined' && module.exports) {
        module.exports = GameBuilder;
    } else {
        window.GB = GameBuilder;
    }

})();
