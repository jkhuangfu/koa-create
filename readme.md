
## koa 项目模板生成工具

```
    1、全局安装 npm install koa-create -g
    2、使用koa-create init <project name>生成项目
```
``
    已包含以下配置功能
``

1、koa-router 路由功能

2、koa-views 前端页面渲染功能(ejs 模板引擎)存放在 views 文件夹

3、koa-static 前端页面静态资源 存放在 public 文件夹

4、koa-bodyparser 支持解析 post 请求体放在 body 中

5、koa-session session存储功能（与 express-session 有所不不同，加密存放在客户端）

#更新日志
0.1.2 增加创建项目后自动安装项目依赖功能