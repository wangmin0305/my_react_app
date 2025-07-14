js相关学习

### 白屏优化

css：
1、关键样式内联
2、分割css文件，按需加载
3、非关键样式使用link异步加载

js：
1、代码合理分割、懒加载
2、预加载关键js文件
3、webpack合理配置处理chunks

html：
骨架屏的体验优化

配置：
1、代码、图片压缩工具
2、服务器头部配置压缩
3、使用http2放开请求并行
4、多CDN域名分割请求

代码：
第三方ui库组件按需引入

### 简单聊聊nodejs

使用js语言实现开发后端应用服务、使得前后端能同构

npm对于模块化软件包的使用、yarn、pnpm可替代npm、淘宝镜像或其他镜像的切换或安装cnpm

nvm可切换node版本

### var,let,const

var
变量提升，违法编程
缺乏块级作用域、造成代码内存泄露
全局声明会被挂载到window

let、const
不存在变量提升、存在[暂时性死区]
引入块级作用域
不会被挂载到window

const
变量[引用的不可变性]，内部可变
增强代码的可预测性

### typeof

无法区分array object null

使用 === null
使用Array.isArray()

终极武器： 使用原型上的方法
Object.prototype.toString.call()

### 数据类型：普通类型，引用类型

普通类型：
值的拷贝、和引用无关、互不干涉
=== 比较的是值

引用类型：
引用、地址的拷贝、指向同一个地址
=== 比较的是引用地址

# 深拷贝、浅拷贝

## 浅拷贝：开销小
普通类型：复制值
引用类型：复制引用地址，[只会赋值一层]，多层级会受到影响 ，可以使用扩展运算符 {...obj}

## 深拷贝：开销大
遍历[所有层级属性]，完整复制一份出来
JSON.parase(JSON.stringify(obj)) 会造成[数据类型丢失]
推荐使用[structuredClone()] 但是[无法拷贝函数、dom节点]
使用三方库API

### 手写深拷贝
deepClone(obj, hash = new WeakMap()) {

    // 判断数据类型，非引用类型和null直接return
    if (obj === null || typeof obj !== "object") return obj;

    // 判断是否已拷贝，存在则return之前拷贝过的值
    if (hash.has(obj)) return hash.get(obj)

    // 对需要拷贝的值进行遍历拷贝，并存入哈希表

    // 判断类型并进行初始化赋值
    let cloneObj = Array.isArray(obj) ? [] : {}

    hash.set(obj, cloneObj) // 存入哈希表

    // Reflect.ownKeys(): 除了原型上的，其他都可以获取[深拷贝首选]
    
    // 自身和原型上的属性（可枚举、不能遍历symbol）
    for (let key in obj) {
        if (Object.prototype.hasOwnProperty.call(obj,key)) {
            cloneObj[key] = deepClone(obj[key], hash)
        }
    }
    return cloneObj;

}

# 数组方法
reduce 最好给初始值，避免空数组找不到第一个值报错
map可以链式操作，forEach不可以

react中不要使用修改原数组state的方法

# 遍历对象

for in：自身和原型上的属性（可枚举、不能遍历symbol）、需要结合hasOwnProperty使用

object.keys(): 遍历自身的、可枚举属性[一般首选]

getOwnPropertyNames(): 获取自身、不可枚举的属性

getOwnPropertyNames(): 获取自身、和symbol的属性

Reflect.ownKeys(): 除了原型上的，其他都可以获取[深拷贝首选]

# 隐式类型转换

[优先使用===]进行判断

有字符串相加=字符串

尝试[valueOf]转数字，或尝试[tostring()]后再比较

# === 和 ==

=== 类型相同、值相同、从[不进行类型转换]、比较的是引用类型的地址

== 会有类型转换、null == undefined为true，但是和其他都不不等的

NaN不等于任何值，使用Number.isNaN()可以判断

# 执行上下文、作用域、闭包

执行上下文：栈 先进后出

作用域链：向上查找

## 闭包：由函数和词法环境决定、新增let和const私有作用域

实现数据封装、创建私有变量、可以引用外部变量

### 写一个闭包
const a = function(prop1) {
    return function(prop2) {
        console.log(prop1 + prop2)
    }
}

const b = a("aaa")

b("bbbb")

### 如何解决闭包捕获的是引用

使用立即执行函数、或使用let

for(var i; i < 5; i++;) {
    (function(index){
        setTimeout(function(){
            console.log(index)
        })
    })(i);
}

闭包需要注意释放内存、且其[捕获的是引用，所以获取的是改变后的值]

### 高阶函数和柯里化

实现代码的[可复用性、函数组合、参数的延迟配置]
过渡使用降低代码阅读性、潜在的性能开销

高阶函数[HOF]
使用函数作为参数
返回一个函数
once、debounce等

[柯里化]
多个参数转为一个参数、拆解为简单函数
可以延迟配置参数传入、逐步传入参数、直到参数备齐
上面写的闭包就是一个柯里化的应用

# 节流、防抖

解决性能杀手-高频事件

## 节流
常用语scroll滚动事件
在一段时间内、只会触发一次，大于设定时间触发的话才会执行

固定频率执行

 function throttle(func, delay) {
    let lastTime = 0;

    return function(...args) {
        const that = this;
        const now = Date.now();
        if (now - lastTime >= delay) {
            lastTime = now;
            func.apply(that, args);
        }
    }
 }

## 防抖
事件在设定时间内触发，会重新计时，并在计时后执行

空闲一段时间再执行

function debounce(func, delay) {
    let timer = null;

    return function(...args) {
        const that = this; // 修改this指向

        if (timer) { // 若此前已经有定时器活动、则先清空定时器后面重新声明
            clearTimeout(timer);
        }

        // 设置定时器
        timer = setTimeout(function(){
            func.apply(that, ...args)
            timer = null; // 再次初始化定时器
        }, delay)
    } 
}

# 纯函数

输入相同参数，输出相同结果、没有任何副作用（指不会与外部有任何交互和影响：I/O、不确定性函数）

封装性强、隔离、提高可预测性和可测试性、安全可靠

核心思想是控制和隔离副作用

# setTimeout 和 setInterval 的陷阱

延迟不精确、决定于事件循环

存在最小延迟设置

setInterval任务堆积、间隔失控
需要及时取消定时器

this指向问题

# 浅谈promise

解决回调地狱、改善代码的可读性、统一处理报错的机制、解决异步操作中结果的传值问题

pending fullfiled rejected 三个状态，状态改变后是不可逆的

推荐每个promise链最后都加.catch()  .catch()可以捕获到同步的错误

## 手写promise



## promise的一些方法：

all（必须成功，返回的是成功值的数组）、
allSettled（不限制是否成功，返回的是状态信息的对象数组）、
race（返回第一个产生结果，改变状态的promise，竞速）、
any（只要有一个成功的就会返回，如果所有都失败才会reject）

## async/await

await不会阻塞主线程 只是暂停当前async函数，将控制权交给主线程（可执行其他任务）
但是await会按顺序执行

async内部使用try catch

# XSS脚本注入、CRSF跨站请求伪造攻击

[存储型、反射型、DOM型]

从注入端解决：[过滤]特殊标签、方法、限制输入[长度]

从执行端解决：对需要渲染的内容进行[转义]、设置[http-only]让其无法直接通过脚本代码获取和[secure双重验证]

# 如何理解递归

简单来说就是自己调用自己

1、找到规律
2、找等价关系
3、找到终止条件，避免循环

// 斐波那契 求第n个元素的值
const fib = (n) => {
    if (n <= 2) return 1
    return fbi(n-2) + fbi(n-1)
}

# 简单理解diff

首先理解虚拟DOM，就是把页面元素转化成一个js对象

diff根据比对新旧对象，对虚拟dom进行修改后重新渲染

对元素节点绑定key也是为了方便比对

发布订阅模式：触发setter、通知订阅者、进行同级比对

# console调试

清空控制台
.clear()

打印对象或dom
.dir()

获取执行时间，成对出现
time()
timeEnd()

获取执行时的时间戳
.timeStamp

# 输入地址  https://ant-design.antgroup.com 做了什么

## 缓存机制 

减少服务器压力、加速请求

exprise 可设置过期时间
cache-control 过期时长

强缓存：直接使用浏览器缓存
[协商缓存]：咨询服务器是否可以使用缓存资源、使用[last- modified]、最新🉑️使用[ETag]标识来判断

## DNS解析获取ip地址

先 [本地解析]
本地浏览器缓存--》操作系统缓存--》本地HOST文件

后 [互联网域名服务器解析]
本地DNS服务器缓存--》根服务器--》.com管理员--》xxx.com

最终找到ip地址后返回给客户端

## 获取ip地址后，进行TCP三次握手建立连接

客户端携带信息发送给服务端

服务端接收并回复客户端连接序号

客户端接收后、带着收到的信息发送给服务端确认建立连接

## 建立连接后，发送http、https请求

### http、https

http：明文传输、无状态请求响应

https：对称加密传输、非对称密钥交换、身份验证、额外的握手过程（SSL/TLS 握手流程）
       优点： SEO优势、浏览器标记不会标记为不安全、有些API只能在https使用（Geolocation API用户设备的地理位置信息、媒体属性）

## 处理请求并返回资源后，TCP的四次挥手

客户端发送分手信息给服务端

服务端接受后，同意并告知客户端，此时服务端进入处理数据状态，客户端等待服务端执行

服务端处理完毕后，再次发送信息给客户端表示已经可以分手

客户端获取信息后，带着序列号告知服务端，此时正式断开连接

## 浏览器拿到资源后，渲染页面

重绘和回流、减少页面回流，因为回流一定会触发重绘且消耗性能

## 加载js，相关执行机制

### 异步任务：事件循环 --> 宏任务、微任务
同步代码永远优先

事件循环机制：执行[异步]操作的[浏览器或nodejs机制]，按顺序进入[任务队列]后，按下面的顺序执行

主线程空闲时，执行任务队列中的异步任务

宏任务：setTimeOut、I/O、UI渲染 [一次性完成不需要连贯执行]
        等上一个宏任务、以及其中的微任务执行完后立即执行

微任务：promise、nextTick（优先级高） [需要连贯执行]
        同步代码执行完以后，执行微任务队列，在下一个宏任务执行之前执行