webpackJsonp([1],{"+Gxq":function(t,a,n){"use strict";var e=n("fnDg").a,i=n("VU/8")(e,null,!1,function(t){n("4veK")},null,null);a.a=i.exports},"+N9k":function(t,a){},"3c+Y":function(t,a){},"4veK":function(t,a){},"9M+g":function(t,a){},"HUt/":function(t,a,n){"use strict";var e=n("qRo1").a,i=n("VU/8")(e,null,!1,function(t){n("n9mN")},null,null);a.a=i.exports},JCpY:function(t,a,n){"use strict";var e=n("rKsW").a,i=n("VU/8")(e,null,!1,function(t){n("xBwK")},null,null);a.a=i.exports},JDVb:function(t,a,n){"use strict";var e=n("9NuQ").a,i=n("VU/8")(e,null,!1,function(t){n("Y9O/")},null,null);a.a=i.exports},Jmt5:function(t,a){},NHnr:function(t,a,n){"use strict";Object.defineProperty(a,"__esModule",{value:!0});var e=n("7+uW"),i=n("mvHQ"),s=n.n(i),r=n("vwbq"),o=n("wvfG"),u=n.n(o),c=n("e6fC"),l={props:{data:{type:Array,required:!0}}},d={render:function(){var t=this,a=t.$createElement,n=t._self._c||a;return n("table",{staticClass:"table table-sm table-hover"},[t._m(0),t._v(" "),n("tbody",t._l(t.data,function(a){return n("tr",[n("td",[t._v(t._s(a[0]))]),t._v(" "),n("td",[t._v(t._s(t._f("formatNumber")(a[1])))])])}))])},staticRenderFns:[function(){var t=this.$createElement,a=this._self._c||t;return a("thead",[a("tr",[a("th",{attrs:{width:"10%"}},[this._v("X")]),this._v(" "),a("th",[this._v("Y")])])])}]},m=n("VU/8")(l,d,!1,null,null,null).exports,h=n("d7EF"),f=n.n(h),p=n("M4fF"),v={props:{data:{type:Array,required:!0},yMin:{type:Number,required:!0},yMax:{type:Number,required:!0},width:{type:String,default:"100%"},height:{type:String,default:"300px"},margin:{type:Object,default:function(){return{top:30,right:30,bottom:30,left:30}}}},data:function(){return{actualWidth:0,actualHeight:0}},computed:{mainGTransform:function(){return"translate("+this.margin.left+", "+this.margin.top+")"},x:function(){return r.d().rangeRound([0,this.actualWidth-this.margin.left-this.margin.right]).domain(this.data.map(function(t){return t[0]})).padding(.1)},yDomain:function(){return[this.yMin,this.yMax]},y:function(){return r.e().rangeRound([this.actualHeight-this.margin.top-this.margin.bottom,0]).domain(this.yDomain)},invisibleRects:function(){if(0===this.actualWidth)return[];var t=this;return this.data.map(function(a,n){var e=f()(a,1)[0];return{index:n,width:t.x.bandwidth(),height:t.actualHeight-t.margin.top-t.margin.bottom-t.y(t.yDomain[1]),x:t.x(e),y:t.y(t.yDomain[1])}})},rects:function(){if(0===this.actualWidth)return[];var t=this;return this.data.map(function(a,n){var e=f()(a,2),i=e[0],s=e[1];return{index:n,width:t.x.bandwidth(),height:t.actualHeight-t.margin.top-t.margin.bottom-t.y(s),rawX:i,rawY:s,x:t.x(i),y:t.y(s)}})}},methods:{updateDatum:function(t){var a=t.target,n=this.$refs.svg,e=+a.getAttribute("data-datum-index"),i=this.data[e],s=null;if(n.createSVGPoint){var r=n.createSVGPoint();r.x=t.clientX,r.y=t.clientY,s=(r=r.matrixTransform(a.getScreenCTM().inverse())).y}else{var o=a.getBoundingClientRect();s=t.clientY-o.top-a.clientTop}var u=this.y.invert(s),c=p.cloneDeep(this.data);c[e]=[i[0],u],this.$emit("update:data",c)}},mounted:function(){this.$nextTick(function(){var t=this.$refs.svg.getBoundingClientRect();this.actualWidth=t.width,this.actualHeight=t.height})}},g={render:function(){var t=this,a=t.$createElement,n=t._self._c||a;return n("svg",{ref:"svg",attrs:{width:t.width,height:t.height}},[n("g",{attrs:{transform:t.mainGTransform}},[n("g",{staticClass:"bars"},[t._l(t.rects,function(t){return n("rect",{staticClass:"bar",attrs:{width:t.width,height:t.height,x:t.x,y:t.y}})}),t._v(" "),t._l(t.invisibleRects,function(a){return n("rect",{staticClass:"bar-invisible",attrs:{"data-datum-index":a.index,width:a.width,height:a.height,x:a.x,y:a.y},on:{mouseover:t.updateDatum,mousemove:t.updateDatum}})})],2),t._v(" "),n("g",{staticClass:"axis axis-top"}),t._v(" "),n("g",{staticClass:"axis axis-bottom"})])])},staticRenderFns:[]},_=n("VU/8")(v,g,!1,function(t){n("+N9k")},"data-v-5e537d30",null).exports,y={props:{numPoints:{type:Number,required:!0},yMin:{type:Number,required:!0},yMax:{type:Number,required:!0}}},b={render:function(){var t=this,a=t.$createElement,n=t._self._c||a;return n("aside",{staticClass:"col-2",attrs:{id:"settings"}},[t._m(0),t._v(" "),n("h2",[t._v("Settings")]),t._v(" "),n("form",[n("div",{staticClass:"form-group"},[n("label",{attrs:{for:"num_points"}},[t._v("Data Points")]),t._v(" "),n("input",{staticClass:"form-control",attrs:{id:"num_points",type:"number",min:"5",max:"100","aria-describedby":"num_points_help"},domProps:{value:t.numPoints},on:{input:function(a){t.$emit("update:num-points",a.target.value)}}}),t._v(" "),n("small",{staticClass:"form-text text-muted",attrs:{id:"num_points_help"}},[t._v("Between 5 and 100")])]),t._v(" "),n("div",{staticClass:"form-row"},[n("div",{staticClass:"form-group col-6"},[n("label",{attrs:{for:"y_min"}},[t._v("Y min")]),t._v(" "),n("input",{staticClass:"form-control",attrs:{id:"y_min",type:"number"},domProps:{value:t.yMin},on:{input:function(a){t.$emit("update:y-min",a.target.value)}}})]),t._v(" "),n("div",{staticClass:"form-group col-6"},[n("label",{attrs:{for:"y_max"}},[t._v("Y max")]),t._v(" "),n("input",{staticClass:"form-control",attrs:{id:"y_max",type:"number"},domProps:{value:t.yMax},on:{input:function(a){t.$emit("update:y-max",a.target.value)}}})]),t._v(" "),n("div",{staticClass:"invalid-feedback"},[t._v("\n        Minimum must be < maximum\n      ")])])]),t._v(" "),t._m(1),t._v(" "),n("a",{staticClass:"github-button",attrs:{href:"https://github.com/msukmanowsky/datadrawer","data-icon":"octicon-star","data-show-count":"true","aria-label":"Star msukmanowsky/datadrawer on GitHub"}},[t._v("Star")]),t._v(" "),n("a",{staticClass:"github-button",attrs:{href:"https://github.com/msukmanowsky/datadrawer/fork","data-icon":"octicon-repo-forked","data-show-count":"true","aria-label":"Fork msukmanowsky/datadrawer on GitHub"}},[t._v("Fork")])])},staticRenderFns:[function(){var t=this.$createElement,a=this._self._c||t;return a("header",[a("h1",[this._v("Data Drawer")]),this._v(" "),a("small",[this._v("A prototyping tool to create timeseries-like data. Start by dragging your mouse over the bars.")])])},function(){var t=this.$createElement,a=this._self._c||t;return a("p",{attrs:{id:"credit"}},[a("small",[this._v("\n              Made by "),a("a",{attrs:{href:"https://twitter.com/msukmanowsky",target:"_blank"}},[this._v("@msukmanowsky")]),this._v(".\n              Comments and pull requests welcome.\n          ")])])}]},x=n("VU/8")(y,b,!1,function(t){n("V78R")},"data-v-1146410c",null).exports,w={install:function(t,a){window.dataLayer=window.dataLayer||[],window.gtag=function(){window.dataLayer.push(arguments)},t.prototype.$gtag=window.gtag}};n("Jmt5"),n("9M+g");e.a.use(c.a),e.a.use(u.a),e.a.use(w);var C=r.b(",.2r");e.a.filter("formatNumber",function(t){return C(t)});var M={name:"app",data:function(){var t={settings:{numPoints:24,yMin:0,yMax:1,format:"json"}};return t.data=r.c(0,t.settings.numPoints).map(function(a){return[a,t.settings.yMax]}),t},components:{BarChart:_,DataTable:m,Settings:x},created:function(){this.$gtag("js",new Date),this.$gtag("config","UA-2433797-12")},watch:{"settings.numPoints":function(t){var a=this;if(t!==this.data.length)if(t>this.data.length){var n=r.c(this.data.length,this.data.length+(t-this.data.length)).map(function(t){return[t,a.settings.yMax]});this.data=this.data.concat(n)}else t<this.data.length&&(this.data=this.data.slice(0,t))}},computed:{csvFormat:function(){return r.a(this.data)},jsonFormat:function(){return s()(this.data)},formattedData:function(){switch(this.settings.format){case"json":return this.jsonFormat;case"csv":return this.csvFormat}},exportPrefix:function(){switch(this.settings.format){case"json":return"data:application/json;charset=utf-8,";case"csv":return"data:text/csv;charset=utf-8,"}},exportData:function(){return encodeURI(this.exportPrefix+this.formattedData)}},methods:{onNumPointsUpdate:function(t){this.$gtag("event","change_points",{event_category:"micro actions"}),t=+t,isNaN(t)||t<5||t>100||(this.settings.numPoints=t)},onYMinUpdate:function(t){t=+t,isNaN(t)||t>=this.settings.yMin||(this.settings.yMin=t)},onYMaxUpdate:function(t){t=+t,isNaN(t)||t<=this.settings.yMax||(this.settings.yMax=t)},onCopy:function(){this.$gtag("event","data_copied",{event_category:"micro actions",event_label:this.settings.format}),this.$copyText(this.formattedData).then(function(t){alert("copied")}).catch(function(t){alert("error")})},onExport:function(){this.$refs.exportAnchor.click(),this.$gtag("event","data_exported",{event_category:"micro actions",event_label:this.settings.format})},onReset:function(){var t=this;this.data=r.c(0,this.settings.numPoints).map(function(a){return[a,t.settings.yMax]})}}},k={render:function(){var t=this,a=t.$createElement,n=t._self._c||a;return n("div",{staticClass:"container-fluid",attrs:{id:"app"}},[n("div",{staticClass:"row"},[n("Settings",{attrs:{"num-points":t.settings.numPoints,"y-min":t.settings.yMin,"y-max":t.settings.yMax},on:{"update:num-points":t.onNumPointsUpdate,"update:y-min":t.onYMinUpdate,"update:y-max":t.onYMaxUpdate}}),t._v(" "),n("main",{staticClass:"col-10"},[n("div",{staticClass:"row"},[n("div",{staticClass:"col"},[n("BarChart",{attrs:{data:t.data,"y-min":t.settings.yMin,"y-max":t.settings.yMax},on:{"update:data":function(a){t.data=a}}})],1)]),t._v(" "),n("div",{staticClass:"row"},[n("div",{staticClass:"col",attrs:{id:"controls"}},[n("form",[n("div",{staticClass:"btn-group",attrs:{id:"format_controls","data-toggle":"buttons",role:"group","aria-label":"Download Format"}},[n("label",{staticClass:"text-muted btn",attrs:{disabled:"true"}},[t._v("Format")]),t._v(" "),n("label",{class:{btn:!0,"btn-outline-primary":!0,active:"json"==t.settings.format}},[n("input",{directives:[{name:"model",rawName:"v-model",value:t.settings.format,expression:"settings.format"}],attrs:{type:"radio",name:"format",autocomplete:"off",value:"json"},domProps:{checked:t._q(t.settings.format,"json")},on:{change:function(a){t.$set(t.settings,"format","json")}}}),t._v(" JSON\n        ")]),t._v(" "),n("label",{class:{btn:!0,"btn-outline-primary":!0,active:"csv"==t.settings.format}},[n("input",{directives:[{name:"model",rawName:"v-model",value:t.settings.format,expression:"settings.format"}],attrs:{type:"radio",name:"format",autocomplete:"off",value:"csv"},domProps:{checked:t._q(t.settings.format,"csv")},on:{change:function(a){t.$set(t.settings,"format","csv")}}}),t._v(" CSV\n        ")])]),t._v(" "),n("button",{staticClass:"btn btn-outline-primary",attrs:{id:"copy_button",type:"button",title:"Copied!"},on:{click:t.onCopy}},[t._v("Copy")]),t._v(" "),n("button",{staticClass:"btn btn-outline-primary",attrs:{id:"export_button",type:"button"},on:{click:t.onExport}},[t._v("Export")]),t._v(" "),n("button",{staticClass:"btn btn-link",attrs:{id:"reset_button",type:"button"},on:{click:t.onReset}},[t._v("Reset")])])])]),t._v(" "),n("div",{staticClass:"row"},[n("div",{staticClass:"col"},[n("DataTable",{attrs:{data:t.data}})],1)])])],1),t._v(" "),n("a",{ref:"exportAnchor",staticClass:"export-anchor",attrs:{download:"data_drawer",href:t.exportData}})])},staticRenderFns:[]},N=n("VU/8")(M,k,!1,function(t){n("3c+Y")},null,null).exports;e.a.config.productionTip=!1,new e.a({el:"#app",template:"<App/>",components:{App:N}})},V78R:function(t,a){},"Y9O/":function(t,a){},dW2o:function(t,a){},n9mN:function(t,a){},r15W:function(t,a,n){"use strict";var e=n("E9Zr").a,i=n("VU/8")(e,null,!1,function(t){n("dW2o")},null,null);a.a=i.exports},xBwK:function(t,a){}},["NHnr"]);
//# sourceMappingURL=app.f29854f57e479e63f39b.js.map