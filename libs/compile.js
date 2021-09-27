const fs = require('fs');
const path = require('path');
const MarkdownIt = require('markdown-it');
const { Arraying, Find, Except, CreateFile, AddFile } = require('./utils');
const { Config, Analysis, Request, DTS } = require('./analysis');
const { console_name, file_name } = require('./type/type')

MD = new MarkdownIt();

try {
    /** 接口.md文件 */
    InterfaceMD = fs.readFileSync(path.resolve(__dirname, file_name.input), 'utf-8');
    /** request配置.md文件 */
    RequestMD = fs.readFileSync(path.resolve(__dirname, file_name.requestMD), 'utf-8');
} catch (error) {
    // console.log('未找到文件', error.path.substring(error.path.lastIndexOf('/') + 1, error.path.lastIndexOf('.')) );
    if (error.path.substring(error.path.lastIndexOf('/') + 1, error.path.lastIndexOf('.')) === 'request') {
        console.log(`${console_name} 未找到 「request」 描述文件，将使用默认配置`);
        RequestMD = ''
    } else {
        console.log(`${console_name} 未找到 「接口文档」 MarkDown文件，请检查`);
        // return false
    }
}

// 检查并声称文件夹
if (!fs.existsSync(path.resolve(__dirname, '../generate'))) {
    fs.mkdirSync(path.resolve(__dirname, '../generate'));
}


const result = MD.render(InterfaceMD);
const result_request = MD.render(RequestMD);


/** request模块，负责解析request */
function RequestModule() {
    // 解析标识
    const father_request = Find('h1', result_request);
    // 每个接口组成的数组 request
    return Arraying('h2', result_request); // request描述文件的解读
}


/**
 * 主模块
 * 这里需要直接自动解析生成文件
*/
async function Compile () {
    // 写在头部 # 后面的文件标识

    const father = Except('code', Find('h1', result));

    /** 
     * 弱检查 - 检查是否已经生成过了 描述文件
     * */
    if (fs.readdirSync(path.resolve(__dirname, `../`)).indexOf(`${file_name.dts}`) !== -1) console.log(`${console_name} 已有描述文件 - 弱检查（仅针对文件名检查）`);


    /** 
     * 弱检查 - 检查是否已经生成过了 运行文件
     * */
    if (fs.readdirSync(path.resolve(__dirname, `../generate`)).indexOf(`${father}.js`) !== -1) {
        console.log(`${console_name} 已有运行文件 - 弱检查（仅针对文件名检查）`);
        return
    }

    // 写在头部的proxy内容
    const proxy = Find('blockquote', result)

    // 每个接口组成的数组 interface
    const InterfaceArray = Arraying('h2', result);

    // compile 头部
    const _config_ = Config(proxy, Request(RequestModule())); // request配置

    /**
     * 生成config
    */
    CreateFile(path.resolve(__dirname, `../generate/${file_name.interface}`), _config_);

    /**
     * 生成d.ts描述文件
    */
    CreateFile(path.resolve(__dirname, `../${file_name.dts}`), 'export interface ServiceClass {\n')

    /** 
     * 遍历文档中每个接口并添加进接口文件中 
     * */
    InterfaceArray.forEach(item => {
        // js运行代码
        const _interface_ = Analysis(item);
        AddFile(path.resolve(__dirname, `../generate/${file_name.interface}`), _interface_); // 生成js运行文件
        const _dts_ = DTS(item);
        AddFile(path.resolve(__dirname, `../${file_name.dts}`), _dts_);

    });

    /**
     * .d.ts文件收尾
    */
    AddFile(path.resolve(__dirname, `../${file_name.dts}`), '}\n/** ### MAIG Core */\ndeclare const service: ServiceClass;\nexport default service')

    console.log('====== 生成了文件 ======')
};


Compile();
