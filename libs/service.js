const { file_name, service_analysis } = require('./type/type')
const { request } = require('./request')

// 定向引入文件
const export_list = require(`../generate/${file_name.interface}`);

class ServiceCore {
    constructor(ENC = {}) {
        (ENC.configuration || service_analysis.configuration) === 'overall' && (this.request = magicRequest(export_list['config']));
        for (let __function__ in export_list) {
            // 魔改配置这里应该有两个判断规则?（按照名字区分，按照类型区分）
            if (typeof export_list[__function__] === 'function' || __function__ !== 'config') {
                // 这里是需要注册到租用与的接口函数，[是function类型 || 名称不是 config]
                this[__function__] = export_list[__function__].bind({
                    request: this.request
                })
            } else {
                // [既不是function类型，名称又叫 config] 独立配置
                (ENC.configuration || service_analysis.configuration) === 'independent' && (this.request = magicRequest(export_list[__function__]));
            }
        }
    }
}


// 魔改request的方法
function magicRequest(config) {
    // 这里的做法是把配置梆到request的全局
    return request.bind({ config })
}

// export {
//     ServeCore
// }

module.exports = new ServiceCore;