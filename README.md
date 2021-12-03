
# MAIG
star项目，对于网络请求的封装


> 需要 node 10.13.0+  （推荐14+） 
>
> 需要 npm 6.14+

## 使用

从npm安装
```
npm i xxxxxx
```

使用自动脚手架
```
TN init
```


---

<br>

### `需要的配置`

> package.json

```
{
  "name": "这里要填项目名用作识别，现在还没有接入",
  "environment": "这里要填环境，比如dev，test",
  "version": "0.0.1",
  ...
}
```

<br>

> 项目目录结构（以react为例）

```
    -
    |- 📁 node_modules
    |- 📁 service
        |- 📁 core
            |- 📃 request.md // 这里是对request的修改，比如header加入某个字段
        | 📃 service.md // 这里是接口文档
    |- 📁 src
    |- package.json
    | ...

```

### request 模板
```
# lianyou

## create

请求头部配置（暂时ban掉）


- Cookie "jd-cookie" 


## send 

发送拦截配置
instance.interceptors.request
\```
headers: {
    pin: 123,
    /* test: Cookie.Read('pin') */
}
\```
注意这里如果使用了包内容，一定要确定有这个包以及方法


## back

返回拦截配置
instance.interceptors.response

```

### service模板
```
# `联友接口文档` lianyou

> dev: http://iot-vehicle-licensedev.jd.local
>
> tests: http://test.jd.com

要注意的这个:要英文格式，中文的会报错，冒号和后文要空一格
右尖括号>要在换行的时候准确写出来，不能省略，因为markdown-it会使用经典渲染方式来渲染这个以保证不会出错

<br>

如果对标准md格式有疑惑可以去掘金的写文章面板上写一下

## `获取用户信息` getUserInfo 

这里保证正确md格式的前提下空不空格都行，但是##和```是不能省略的

>请求地址: /app/queryEquipment
>
>请求方法: GET


### 请求参数

| 字段 |  类型  |  是否必填  | 说明 | 
| ---- | ----  | ---- | ---- | 
| expires  | string | 是 | Thu, 18 Dec 2043 12:00:00 GMT | 
| path  | string | 否 | 这里是详尽的解释 | 
| test  |  | 否 | 这里是一条注释 | 


表格如果有空值会自动对应填充any类型
是否必填这里其实必不一定要写【是/否】，实际上有非常多的备选字例如 必填，true，yes，1，Y，y等等都可以

### 返回参数

|  字段   |  类型  |  说明 | 
|  ----  | ----  |  ---- | 
| code  | string |  Thu, 18 Dec 2043 12:00:00 GMT | 
| data  |  | 要解释下这个data | 
| msg  | any | 这是如果错的时候返回的错误信息 | 



<hr>
<br>

## `获取登陆状态` getLoginStatus



>请求地址: /api/getLoginStatus
>
>请求方法: GET



|     |    |    |  | 
|  ----  | ----  | ----  | ---- | 
| expires  | string | 过期时间（以 UTC 或 GMT 时间） | Thu, 18 Dec 2043 12:00:00 GMT | 
| path  | string | 路径（默认cookie属于当前页面）| /test/ | 


```

待做：

* 自动对接mock，这是重中之重
* 要支持swagger直接生成，调研下
* 提供方式仅返回接口地址（类似antd的上传组件会用到）
* 接口返回值解析的时候要处理嵌套复杂类型
* 类型检查那里要做一份多语言数据类型对齐，比如java的integer应该对应number
* 考虑是否支持多篇文档缝合？

