(window.webpackJsonpclient=window.webpackJsonpclient||[]).push([[0],{19:function(e,t,n){e.exports=n(31)},24:function(e,t,n){},25:function(e,t,n){},31:function(e,t,n){"use strict";n.r(t);var a=n(0),l=n.n(a),c=n(11),r=n(5),u=(n(24),n(3)),i=(n(25),function(){return l.a.createElement("div",{className:"App"},l.a.createElement("h1",null,"Project Home"),l.a.createElement(r.b,{to:"./list"},l.a.createElement("button",{type:"button"},"My List")))}),o=n(14),s=n(15),m=n(17),p=n(16),E=n(18),f=function(e){function t(e){var n;return Object(o.a)(this,t),(n=Object(m.a)(this,Object(p.a)(t).call(this,e))).getList=function(){fetch("/api/getList").then(function(e){return e.json()}).then(function(e){return n.setState({list:e})})},n.state={list:[]},n}return Object(E.a)(t,e),Object(s.a)(t,[{key:"componentDidMount",value:function(){this.getList()}},{key:"render",value:function(){var e=this.state.list;return l.a.createElement("div",{className:"App"},l.a.createElement("h1",null,"List of Items"),e.length?l.a.createElement("div",null,e.map(function(e){return l.a.createElement("div",null,e)})):l.a.createElement("div",null,l.a.createElement("h2",null,"No List Items Found")))}}]),t}(a.Component),h=function(){return l.a.createElement(u.c,null,l.a.createElement(function(){return l.a.createElement("div",null,l.a.createElement(u.c,null,l.a.createElement(u.a,{exact:!0,path:"/",component:i}),l.a.createElement(u.a,{path:"/list",component:f})))},null))};Object(c.render)(l.a.createElement(r.a,null,l.a.createElement(h,null)),document.getElementById("root"))}},[[19,1,2]]]);
//# sourceMappingURL=main.7d80e453.chunk.js.map