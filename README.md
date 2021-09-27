
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



待做：

* 自动对接mock，这是重中之重
* 要支持swagger直接生成，调研下
* 提供方式仅返回接口地址（类似antd的上传组件会用到）
* 接口返回值解析的时候要处理嵌套复杂类型
* 类型检查那里要做一份多语言数据类型对齐，比如java的integer应该对应number
* 考虑是否支持多篇文档缝合？

