const axios = require('axios')
const { ENV } = require('./type/type')

const default_config = {
    timeout: 10000, // 超时时间  下发拓扑时间大概40s 暂时改成1min
    withCredentials: true, // 允许携带cookie
    // crossDomain: true,
    headers: {
        'Content-Type': 'application/json;charset=utf-8',
        'Cache-Control': 'no-cache',
    },
}

// 二维码拼接
function GetAddressSplit(param = {}) {
    let get_link = '?'
    for (let _param_ in param) {
        get_link += _param_ + '=' + param[_param_] + '&'
    }
    return get_link.slice(0, get_link.length - 1)
}

class HttpRequest {

    /**
     * 这里注入了基础的例如 baseUrl 和 header 的配置，将来可能还有别的需要添加
    */
    constructor(config) {
        this.config = {
            baseURL: config.proxy[ENV.environment],
            // baseURL: config.proxy['dev'], 
            headers: {
                ...config.headers,
                ...config.request.send.headers
            },
        }
    }

    /** 设定拦截器 */ 
    interceptors(instance) {

        /** 请求拦截器 */
        instance.interceptors.request.use(
            (config) => {
                console.log('请求拦截器', config);

                // 处理get的地址拼接 
                if(config.method === "get"){
                    config.url += GetAddressSplit(config.data)
                }    

                return config
            },
            (error) => {
                return Promise.reject(error)
            }
        );

        /** 响应请求的拦截器 */
        instance.interceptors.response.use(
            (response) => {
                if (response.status === 200) {
                    return Promise.resolve(response.data)
                } else {
                    return Promise.reject(response)
                }
                // return response;
            },
            (error) => {
                // errorHandle(error)
                return Promise.reject(error);
            }
        )
    }

    // 创建实例
    request(options) {
        const instance = axios.create({
            ...this.config,
            ...options
        });
        this.interceptors(instance);
        return instance(options)
    }

    // get方法这边记得要做个自动处理

}


module.exports.request = function (config) {
    const core = new HttpRequest({ ...this.config, ...default_config });

    return core.request(config)
}