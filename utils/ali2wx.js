/**
 * @name ali小程序=>wx小程序
 */

// 转换-替换
function genAst(ast) {
    let { childNodes, attrs, content = {}, tagName } = ast;

    // xml属性更新
    if (attrs) {
        ast.attrs = attrs.map(item => {
            let { name, value } = item;

            // xml中引入的外部模版
            if ((tagName === 'include' || tagName === 'import') && name === 'src') {
                // 名称替换
                value = value.replace(/\.axml$/i, '.wxml');
                // 路径变更
                value = value[0] === './' ? value.split('./')[1] : value;
            }

            return {
                name: name.replace(/^a\:/, 'wx:').replace(/^on(.*)/, (rep, $1) => {
                    return `bind${$1[0].toLowerCase()}${$1.slice(1)}`;
                }),
                value
            };
        })
    }

    // 子节点
    if (childNodes) {
        ast.childNodes = childNodes.map(item => {
            return genAst(item);
        })
    }

    // content 确认。
    if (content.childNodes) {
        ast.content.childNodes = content.childNodes.map(item => {
            return genAst(item);
        })
    }

    // tag 图片标签更新
    ast.tagName = ast.tagName === 'img' ? 'image' : ast.tagName;

    return ast;
}

// xml解密
function unescapeXML(a) {
    a = "" + a;
    // 特殊字符处理
    let renderString = a.replace(/&lt;/g, "<").replace(/&gt;/g, ">").replace(/&amp;/g, "&").replace(/&quot;/g, '"').replace(/&apos;/g, "'")

    renderString = renderString

    // input 标签处理
        .replace(/\<input(.*)\>/g, (rep, $1) => {
        return `\<input${$1}\/\>`;
    })

    // import 标签处理
    .replace(/\<import(.*)\>/g, (rep, $1) => {
        return `\<import${$1}\/\>`;
    }).replace(/\<\/import>/g, (rep, $1) => {
        return ``;
    });

    return renderString;
}

module.exports = {
    genAst: genAst,
    unescapeXML: unescapeXML
}