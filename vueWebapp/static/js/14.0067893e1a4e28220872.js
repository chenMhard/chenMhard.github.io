webpackJsonp([14,18],{101:function(e,t,a){var s,r,i={};a(102),s=a(103),r=a(108),e.exports=s||{},e.exports.__esModule&&(e.exports=e.exports.default);var o="function"==typeof e.exports?e.exports.options||(e.exports.options={}):e.exports;r&&(o.template=r),o.computed||(o.computed={}),Object.keys(i).forEach(function(e){var t=i[e];o.computed[e]=function(){return t}})},102:function(e,t){},103:function(e,t,a){"use strict";function s(e){return e&&e.__esModule?e:{default:e}}Object.defineProperty(t,"__esModule",{value:!0});var r,i=a(104),o=s(i),d=a(13),n=s(d),u=a(14),c=s(u);n.default.mock("address.json",{retcode:1,retmsg:"查询成功",data:{total:1,records:10,page:1,"addressList|3":[(r={"aid|+1":1},(0,o.default)(r,"aid|+1",88801),(0,o.default)(r,"name","@name()"),(0,o.default)(r,"country",1),(0,o.default)(r,"province",1),(0,o.default)(r,"city",1),(0,o.default)(r,"district",1),(0,o.default)(r,"address","@county(true)"),(0,o.default)(r,"zipcode|+100",518e3),(0,o.default)(r,"tel+19090","075525252522"),(0,o.default)(r,"mobile+19090",12452154822),(0,o.default)(r,"isdefault",0),r)]}}),t.default={data:function(){return{title:"地址管理",isIndex:!0,lists:[]}},components:{appHeader:c.default},route:{data:function(e){var t=this;t.getAjaxData()},deactivate:function(e){e.next()}},methods:{getAjaxData:function(){var e=this;e.$http.get("address.json").then(function(t){var a=t.data;1==a.retcode&&(e.lists=a.data.addressList)},function(e){})}}}},104:function(e,t,a){"use strict";function s(e){return e&&e.__esModule?e:{default:e}}t.__esModule=!0;var r=a(105),i=s(r);t.default=function(e,t,a){return t in e?(0,i.default)(e,t,{value:a,enumerable:!0,configurable:!0,writable:!0}):e[t]=a,e}},105:function(e,t,a){e.exports={default:a(106),__esModule:!0}},106:function(e,t,a){var s=a(107);e.exports=function(e,t,a){return s.setDesc(e,t,a)}},107:function(e,t){var a=Object;e.exports={create:a.create,getProto:a.getPrototypeOf,isEnum:{}.propertyIsEnumerable,getDesc:a.getOwnPropertyDescriptor,setDesc:a.defineProperty,setDescs:a.defineProperties,getKeys:a.keys,getNames:a.getOwnPropertyNames,getSymbols:a.getOwnPropertySymbols,each:[].forEach}},108:function(e,t){e.exports=' <div class=adsList> <app-header title=地址管理 :title-bg=true header-bg=#fff> <a href=javascript:history.back(); slot=left><i class=icon>&#xe60b;</i></a> <a v-link="{ path: \'/center/addressEdit\' }" slot=right>添加</a> </app-header> <div class=ads-list> <a class=adsItem v-link="{ name:\'addressEdit\', query:{adsId:item.aid} }" v-for="item in lists"> <div class=adsheader> <p class=name>{{item.name}}</p> <p class=mobile>{{item.mobile}}</p> </div> <div class=adsinfo> <p class=msg><label v-if="item.isdefault == 1">[默认]</label>{{item.province}}{{item.city}}{{item.address}}</p> </div> </a> </div> </div> '}});
//# sourceMappingURL=14.0067893e1a4e28220872.js.map