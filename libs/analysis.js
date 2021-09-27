
const { Arraying, Find, Except } = require('./utils')
const { console_name, ts_lint, table_thead, table_return, table_required } = require('./type/type')

/**
 * 配置接口表的表头
 * 
 * 这里是以key : value 的方式逐步解析
 * 有什么生成什么，只是对应文档里写的环境而不是经验上的环境
*/
module.exports.Config = (param, request = {}) => {
    let _proxy_ = '';
    Arraying('p', param).forEach(item => {
        const proxy_list = Find('p', item).split(':') ;
        _proxy_ += ` ${proxy_list[0]}: ${proxy_list[1]},`;
    })
    return `module.exports.config = { proxy: {${_proxy_}}, request: ${request} } \n`
}



/**
 * 接口的js遍历生成方法
 * 
 * @param param string 这是每一个<h2>标签包裹的接口描述
*/
module.exports.Analysis = (param) => {
    let notes = '// \n'; // 注释
    let template = `module.exports.${Except('code', Find('h2', param))} = async function (params) { return await this.request({ url: '${Find('p', Arraying('p', Find('blockquote', param))[0]).split(' ')[1]}', method: '${Find('p', Arraying('p', Find('blockquote', param))[1]).split(' ')[1]}', data: params}) } \n`;
    return template

    // 这里还可以自动生成d.ts文件用来描述接口
}

/**
 * request封装的配置
*/
module.exports.Request = (param) => {
    let re_ = '';
    param.forEach(item => {
        re_ += `${[Find('h2', item)]}: ${!Find('code', item) ? '{}' : '{' + Find('code', item).split('\n').join('') + '}' }, `
    });

    return `{ ${re_} }`
}

/**
 * d.ts解析方法
 * 
 * param string 这个字段是h2下的整个描述
*/
module.exports.DTS = (param) => {
    // 需要一个描述和一个接口

    // 接口名字
    const interface_name = Except('code', Find('h2', param));
    const table_array = Arraying('h3', param);

    // 生成注释部分
    let description = `/** ### ${Find('code', Find('h2', param)) || '未命名接口'} \n * --- \n`;

    // 类型检查部分
    let type_check_param = `${interface_name}(param:{`;
    let type_check_return = `{`;

    

    try { // 请求格式解析
        Arraying('tr', Find('tbody', table_array[0])).map((item) => {
            const description_arry = Arraying('td', Find('tr', item));
            type_check_param += Find('td', description_arry[table_thead.indexOf('字段')]) + `${table_required.true.indexOf(Find('td', description_arry[table_thead.indexOf('是否必填')])) !== -1 ? '' : '?'}` + ':' + (Find('td', description_arry[table_thead.indexOf('类型')]) || 'any') + ',';
            description += ` * ${table_required.true.indexOf(Find('td', description_arry[table_thead.indexOf('是否必填')])) !== -1 ? '\\* ' : ''}\`\`\`${Find('td', description_arry[table_thead.indexOf('字段')])}\`\`\` _${Find('td', description_arry[table_thead.indexOf('类型')]) || 'any'}_ ${Find('td', description_arry[table_thead.indexOf('说明')])} \n * \n`
        })
    } catch (error) {
        console.log(`${console_name} 丢失描述表格 - 请求参数 >>> ${interface_name}`);
        // return false
    }  
    

    try { // 返回格式解析
        description += ' * --- \n';
        Arraying('tr', Find('tbody', table_array[1])).map((item) => {
            const description_arry = Arraying('td', Find('tr', item));
            type_check_return += Find('td', description_arry[table_return.indexOf('字段')]) + ':' + (Find('td', description_arry[table_return.indexOf('类型')]) || 'any') + ',';
            description += ` * \`\`\`${Find('td', description_arry[table_return.indexOf('字段')])}\`\`\` _${Find('td', description_arry[table_return.indexOf('类型')]) || 'any'}_ ${Find('td', description_arry[table_return.indexOf('说明')])} \n * \n`
        })
    } catch (error) {
        console.log(`${console_name} 丢失描述表格 - 返回参数 >>> ${interface_name}`);
        // return false
    }
    
    type_check_param += `}${ts_lint.check === 'easy' ? '|any' : ''}):${type_check_return}}${ts_lint.check === 'easy' ? '|any' : ''} \n`;
    description += '*/\n';

    return description + type_check_param

}