(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-2d0e95af"],{"8cd2":function(t,e,s){"use strict";s.r(e);var n=function(){var t=this,e=t.$createElement,s=t._self._c||e;return s("div",{staticClass:"singer"},[s("singer-show"),s("singer-list-show")],1)},a=[],i=function(){var t=this,e=t.$createElement;t._self._c;return t._m(0)},r=[function(){var t=this,e=t.$createElement,s=t._self._c||e;return s("div",{staticClass:"singer-show"},[s("div",{staticClass:"bg_singer"},[s("div",{staticClass:"section_inner"},[s("h2",{staticClass:"singer_push_tit"}),s("div",{staticClass:"singer_push_desx"}),s("a",{staticClass:"singer_push_btn_login",attrs:{href:"javascript:;"}},[s("span",{staticClass:"singer_push_btn_text div1"},[t._v("立即登录")])])])])])}],c={data:function(){return{SingerList:[]}},methods:{}},g=c,u=s("2877"),l=Object(u["a"])(g,i,r,!1,null,null,null),o=l.exports,d=function(){var t=this,e=t.$createElement,s=t._self._c||e;return s("div",{staticClass:"singer-list-show"},[s("div",{staticClass:"tags"},t._l(t.tags,(function(e,n){return s("ul",{key:n,staticClass:"tags-ul"},t._l(e,(function(e,a){return s("li",{key:a,staticClass:"tags-li"},[s("a",{class:{"singer-active":t.activeIndex[n]===a},on:{click:function(e){return t.categoryClick(n,a)}}},[s("i",{staticClass:"select"},[t._v(t._s(e.name))])])])})),0)})),0),s("div",{staticClass:"singer-list"},t._l(t.SingerList,(function(e,n){return s("div",{key:n,staticClass:"singer-out-wrap",class:{"img-show":n<10&&1==t.currentPage&&0==t.activeIndex.index}},[s("div",{staticClass:"singer-wrap"},[n<10&&1==t.currentPage&&0==t.activeIndex.index?s("router-link",{attrs:{to:"/singerinfopage/"+e.singer_mid}},[s("img",{staticClass:"singer-cover",attrs:{src:e.singer_pic,alt:""}})]):t._e(),s("a",{attrs:{href:"javascript:;"}},[s("span",[t._v(t._s(e.singer_name))])])],1)])})),0),s("paging",{attrs:{"page-index":t.currentPage,total:t.count},on:{change:t.pageChange}})],1)},h=[],p=(s("96cf"),s("1da1")),f=s("4f8a"),v={components:{paging:f["a"]},data:function(){return{SingerList:[],SingerListIndex:0,tags:[],activeIndex:{area:0,genre:0,index:0,sex:0},tagIndex:298,currentPage:1,count:298,items:[]}},methods:{fetchApiInfo:function(t){var e=this;return Object(p["a"])(regeneratorRuntime.mark((function s(){var n,a;return regeneratorRuntime.wrap((function(s){while(1)switch(s.prev=s.next){case 0:return e.SingerList="",n="http://81.70.93.91:3200/getSingerList?page=".concat(e.currentPage),s.next=4,e.$http.get(n,{params:t});case 4:a=s.sent,e.tags=a.data.response.singerList.data.tags,e.SingerList=a.data.response.singerList.data.singerlist;case 7:case"end":return s.stop()}}),s)})))()},pageChange:function(t){this.currentPage=t,this.fetchApiInfo()},categoryClick:function(t,e){this.activeIndex[t]=e;var s={};for(var n in this.tags)s[n]=this.tags[n][this.activeIndex[n]].id;this.fetchApiInfo(s)}},created:function(){this.fetchApiInfo()},computed:{pageCount:function(){switch(this.tagIndex){case 1:case 2:case 297:case 298:return 4;case 3:case 296:return 5;case 4:case 295:return 6;default:return 7}}}},_=v,C=Object(u["a"])(_,d,h,!1,null,null,null),x=C.exports,m={components:{SingerShow:o,SingerListShow:x}},w=m,I=Object(u["a"])(w,n,a,!1,null,null,null);e["default"]=I.exports}}]);
//# sourceMappingURL=chunk-2d0e95af.cbb6eb06.js.map