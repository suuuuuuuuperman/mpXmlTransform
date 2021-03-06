/**
 * @name 转换聚合入口
 * @function transform
 * @param scrXml 原始xml样式；
 * @param type 转化方式
 */

const parse5 = require('parse5');
let ali2wx = require("./ali2wx.js");

let Transfrom = {
    ali2wx: ali2wx
}

// 编译-转化过程
function transform(srcXml, type) {
    // 碎片化 srcXml => document
    const document = parse5.parseFragment(srcXml);

    // 替换更新
    Transfrom.ali2wx.genAst(document);

    // 序列化
    const targetXml = parse5.serialize(document);

    return Transfrom.ali2wx.unescapeXML(targetXml);
}

module.exports = transform;