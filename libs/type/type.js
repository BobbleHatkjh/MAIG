/** 配置文件 */

module.exports.console_name = '[MAIG]'

// 环境配置，package.json的那个
// module.exports.ENV = {environment: 'dev'}
module.exports.ENV = require('../../../../package.json')

// 输入输出的文件名
module.exports.file_name = {
    input: '../../../service/service.md', // 输入的接口文档 (src 同级的service文件下)
    requestMD: '../../../service/core/request.md', // 输入的request文档 
    request: 'request.md', // 输入的request文档

    dts: 'index.d.ts', // 输出的dts文件
    interface: 'interface.js' // 输出/生成的接口执行文件  *这里需要讨论是否完全阉割多版本交付的功能，不阉割的话这里不应写死* 
}

// 接口解析的时候
module.exports.service_analysis = {
    configuration: 'overall', // request绑定模式    independent 独立配置，overall 整体配置
}

// 生成的ts文件模式
module.exports.ts_lint = {
    /** 
     * ts的类型检查模式
     * 
     * easy 轻松模式，此时所有ts类型检查后面都有 | any，省心些
     * stric 严格模式，此时使用接口时一定要按规定好的类型传入传出
    */
    check: 'stric',
}

// 接口 请求格式 表头含义的解读 
module.exports.table_thead = ['字段', '类型', '是否必填', '说明'];

// 接口 返回格式 表头含义解读
module.exports.table_return = ['字段', '类型', '说明'];

// 解析是否是必填
module.exports.table_required = {
    true: ['是', 'true', 'yes', 'y', 'Y', '1', '必填'], // 这些都是表示是的字段
    false: ['否', 'false', 'no' ,'n', 'N', '0', '非', '非必填'] // 这些是表示不是的字段
} 
