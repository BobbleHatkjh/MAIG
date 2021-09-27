const fs = require('fs');

/** 
 * 数组化
 * 
 * @param param string 标签名称，例如 h1
 * @param string string 需要传进来的总字符串 
 * @param first boolean 是否只需要传回第一次出现的值，默认是否
 * @param back 这是递归里要传出去的数组
 * */
module.exports.Arraying = (param, string, back = []) => {
    if(!string){
        return null
    }
    const top = '<' + param + '>'; // 开标签
    // const tail = '</' + param + '>'; // 闭标签

    const string_long = string.length; // 字符串长度
    const top_position = string.lastIndexOf(top); // 开标签在总字符串中最后一次出现的位置

    if (top_position === -1) { // 如果已经找不到了
        return back
    }

    back.unshift(string.substring(top_position, string_long));
    return this.Arraying(param, string.substring(0, top_position), back) // 递归
    
}

/**
 * 寻找 标签之间的字符串 第一次出现
 * 
 * @param param string 标签名称，例如 h1
 * @param string string 需要传进来的总字符串 
 * */
module.exports.Find = (param, string) => {
    const top = '<' + param + '>'; // 开标签
    const tail = '</' + param + '>'; // 闭标签
    if (!string || string.indexOf(top) === -1) return null; // 没有找到指定标签
    return string.substring(string.indexOf(top) + top.length, string.indexOf(tail))
}

/**
 * 返回指定内容中除了xxx标签之外的东西
 * 
 * @param param string 除了xxx标签的那个标签
 * @param string string 指定的一串内容
*/
module.exports.Except = (param, string) => {
    if (!string) return null; // 字符串为空
    const top = '<' + param + '>'; // 开标签
    const tail = '</' + param + '>'; // 闭标签
    if (string.indexOf(top) === -1) return string; // 没有找到指定标签
    return (string.substring(0, string.indexOf(top)) + string.substring(string.indexOf(tail) + param.length + 3, string.length)).trim()
}

/**
 * 消除两端空格
*/
module.exports.Trim = (string) => {
    return string.trim()
}

/**
 * 见字如面，生成文件（没有会覆盖）
 * 
 * @param name 文件名（包括后缀） 例如：123.js
 * @param content 文件内容
 * */
module.exports.CreateFile = (name, content) => {
    fs.writeFileSync(name, content, 'utf8')
}


/**
 * 追加内容
 * 
 * @param name 文件名（包括后缀） 例如：123.js
 * @param content 文件内容
 * */
module.exports.AddFile = (name, content) => {
    fs.appendFileSync(name, content)
}
