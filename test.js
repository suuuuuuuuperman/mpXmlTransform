let xmlTransform = require('./index')
let str = `
<!-- h5跳转 -->
<view a:if="{{!ofoH5WebPageUrl}}">{{loadingText}}</view>
<web-view a:if="{{ofoH5WebPageUrl}}" src="{{ofoH5WebPageUrl}}&version={{version}}" onMessage="getPostMessage"></web-view>
`
let out = xmlTransform.transform(str);

console.log("in: ", str);
console.log("out: ", out);