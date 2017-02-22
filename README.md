# Vue-Admin-Express-Mongoose
基于Vue2.0(Vue-cli)+ElementUI+Express+Mongoose的全栈开发环境

[OnlineDemo](http://admin.eamonn.cn/admin)

前端页面部分基于[vueAdmin](https://github.com/taylorchen709/vueAdmin)项目，修复了其中的一些BUG。
## 用法
### 安装依赖
```
npm install
```
### 开发环境
首先，启动Express服务（4501端口），提供API接口，
请确保已经安装MongoDB
```
npm run server
```
然后，开启前端部分开发环境（8088端口）
```
npm run dev
```
最后在8088端口开发前端部分即可，vue-cli已经把webpack的热替换功能加入了进去，十分方便。

后台的修改也是被`nodemon`监控的，会自动在3000端口重启。

所以是全栈自动刷新，非常适合开发。

需要注意的是，这里配置了`config/index.js`的
```javascript
proxyTable:{
    '/api' : 'http://localhost:4501'
}
```
这样就需要约定，Express后台的所有API接口都要以`/api/*`来命名。
### 构建
```
npm run build
```
然后浏览器访问：
```
http://localhost:4501/admin
```

