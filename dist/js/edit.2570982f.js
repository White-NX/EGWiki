"use strict";(self["webpackChunkmodulecreator"]=self["webpackChunkmodulecreator"]||[]).push([[6922],{2144:function(t,s,i){i.r(s),i.d(s,{default:function(){return X}});var n=function(){var t=this,e=t._self._c;return e("edit-main")},o=[],l=i(41653),r=i(16190),c=i(52084),d=c.y.extend({name:"button-group",provide(){return{btnToggle:this}},computed:{classes(){return c.y.options.computed.classes.call(this)}},methods:{genData:c.y.options.methods.genData}}),h=i(16878),u=i(67678),g=(0,u.Z)(d,h.Z).extend({name:"v-btn-toggle",props:{backgroundColor:String,borderless:Boolean,dense:Boolean,group:Boolean,rounded:Boolean,shaped:Boolean,tile:Boolean},computed:{classes(){return{...d.options.computed.classes.call(this),"v-btn-toggle":!0,"v-btn-toggle--borderless":this.borderless,"v-btn-toggle--dense":this.dense,"v-btn-toggle--group":this.group,"v-btn-toggle--rounded":this.rounded,"v-btn-toggle--shaped":this.shaped,"v-btn-toggle--tile":this.tile,...this.themeClasses}}},methods:{genData(){const t=this.setTextColor(this.color,{...d.options.methods.genData.call(this)});return this.group?t:this.setBackgroundColor(this.backgroundColor,t)}}}),p=i(79582),v=i(54886),m=i(60266),f=i(65879),_=i(99223),Z=i(31267),k=i(4324),y=i(43201),C=i(65808),x=i(54525),B=i(31289),I=i(77912),w=i(42933),S=i(29592),$=i(11713),T=i(67423),L=i(96669),D=i(91444),F=i(14263),E=i(75352),A=i(74101),O=(0,u.Z)(T.Z,h.Z,D.Z,(0,F.d)(["absolute","bottom","left","right","top"])).extend({name:"v-snackbar",props:{app:Boolean,centered:Boolean,contentClass:{type:String,default:""},multiLine:Boolean,text:Boolean,timeout:{type:[Number,String],default:5e3},transition:{type:[Boolean,String],default:"v-snack-transition",validator:t=>"string"===typeof t||!1===t},vertical:Boolean},data:()=>({activeTimeout:-1}),computed:{classes(){return{"v-snack--absolute":this.absolute,"v-snack--active":this.isActive,"v-snack--bottom":this.bottom||!this.top,"v-snack--centered":this.centered,"v-snack--has-background":this.hasBackground,"v-snack--left":this.left,"v-snack--multi-line":this.multiLine&&!this.vertical,"v-snack--right":this.right,"v-snack--text":this.text,"v-snack--top":this.top,"v-snack--vertical":this.vertical}},hasBackground(){return!this.text&&!this.outlined},isDark(){return this.hasBackground?!this.light:L.Z.options.computed.isDark.call(this)},styles(){if(this.absolute||!this.app)return{};const{bar:t,bottom:e,footer:s,insetFooter:a,left:i,right:n,top:o}=this.$vuetify.application;return{paddingBottom:(0,E.kb)(e+s+a),paddingLeft:(0,E.kb)(i),paddingRight:(0,E.kb)(n),paddingTop:(0,E.kb)(t+o)}}},watch:{isActive:"setTimeout",timeout:"setTimeout"},mounted(){this.isActive&&this.setTimeout()},created(){this.$attrs.hasOwnProperty("auto-height")&&(0,A.Jk)("auto-height",this),0==this.timeout&&(0,A.Rn)('timeout="0"',"-1",this)},methods:{genActions(){return this.$createElement("div",{staticClass:"v-snack__action "},[(0,E.z9)(this,"action",{attrs:{class:"v-snack__btn"}})])},genContent(){return this.$createElement("div",{staticClass:"v-snack__content",class:{[this.contentClass]:!0},attrs:{role:"status","aria-live":"polite"}},[(0,E.z9)(this)])},genWrapper(){const t=this.hasBackground?this.setBackgroundColor:this.setTextColor,e=t(this.color,{staticClass:"v-snack__wrapper",class:T.Z.options.computed.classes.call(this),style:T.Z.options.computed.styles.call(this),directives:[{name:"show",value:this.isActive}],on:{pointerenter:()=>window.clearTimeout(this.activeTimeout),pointerleave:this.setTimeout}});return this.$createElement("div",e,[this.genContent(),this.genActions()])},genTransition(){return this.$createElement("transition",{props:{name:this.transition}},[this.genWrapper()])},setTimeout(){window.clearTimeout(this.activeTimeout);const t=Number(this.timeout);this.isActive&&![0,-1].includes(t)&&(this.activeTimeout=window.setTimeout((()=>{this.isActive=!1}),t))}},render(t){return t("div",{staticClass:"v-snack",class:this.classes,style:this.styles},[!1!==this.transition?this.genTransition():this.genWrapper()])}}),N=i(81631),M=function(){var t=this,e=t._self._c;return e(m.Z,{staticClass:"pageMain"},[e(w.Z,{attrs:{value:t.loadingOverlay,"z-index":"10"}},[e(p.Z,{attrs:{color:"primary",dark:"",width:"320"}},[e(v.ZB,[t._v(" 请稍等…… "),e(S.Z,{staticClass:"mb-0",attrs:{indeterminate:"",color:"white"}})],1)],1)],1),e(O,{attrs:{timeout:"4000",text:"",color:t.snackbarColor},scopedSlots:t._u([{key:"action",fn:function({attrs:s}){return[e(r.Z,t._b({attrs:{color:"primary",text:""},on:{click:function(e){t.snackbar=!1}}},"v-btn",s,!1),[t._v(" Close ")])]}}]),model:{value:t.snackbar,callback:function(e){t.snackbar=e},expression:"snackbar"}},[t._v(" "+t._s(t.snackbarText)+" ")]),e(y.Z,{attrs:{wrap:""}},[e(Z.Z,{attrs:{lg8:"",xs12:""}},[e("h1",[t._v("编辑中："),e("b",[t._v(t._s(t.labelInfo.name)+" / "+t._s(this.files[this.selectedFile].name))])]),e(l.Z,{attrs:{outlined:"",type:"warning",text:""}},[e("h3",[t._v("你正在编辑并非你创建的label")]),t._v(" 一些意外修改可能会造成问题，请确保在明确此次改动的目的和方式基础上进行修改。 ")]),1==t.labelInfo.uniUse?e(l.Z,{attrs:{outlined:"",type:"info",text:""}},[e("h3",[t._v(t._s(t.labelInfo.name)+"被标记为强泛用性")]),t._v(" 这意味着该模板被广泛使用，稳定性和实用性已经被确认，无需大规模更改。 ")]):t._e(),1==t.labelInfo.isLock?e(l.Z,{attrs:{outlined:"",type:"info",text:""}},[e("h3",[t._v(t._s(t.labelInfo.name)+"正在被他人(username)编辑")]),t._v(" 如果你执意进行编辑可能会造成编辑冲突，如果你有编辑需要，可以将编辑请求告知此时的编辑人员或者等待对方编辑完毕。 ")]):t._e(),e(_.Z),void 0!=t.current?e("monaco",{attrs:{codes:t.content,current:t.current,language:t.lang},on:{"update:contentBody":t.handleUpdateContentBody}}):t._e()],1),e(Z.Z,{attrs:{lg4:"",xs12:""}},[e(m.Z,{staticClass:"rightSideBar"},[e(p.Z,{staticClass:"my-4",attrs:{elevation:"0",outlined:""}},[e("template",{slot:"progress"},[e(S.Z,{attrs:{color:"deep-purple",height:"10",indeterminate:""}})],1),e(v.EB,[t._v("文件列表")]),e(v.ZB,[e(g,{attrs:{dense:""}},[e(r.Z,[e(k.Z,[t._v("mdi-file-plus")]),t._v(" 新建文件 ")],1),e(f.Z,{attrs:{persistent:"","max-width":"320"},scopedSlots:t._u([{key:"activator",fn:function({on:s,attrs:a}){return[e(r.Z,t._g(t._b({attrs:{depressed:""}},"v-btn",a,!1),s),[e(k.Z,[t._v("mdi-delete")]),t._v("删除文件 ")],1)]}}]),model:{value:t.deleteFileDialog,callback:function(e){t.deleteFileDialog=e},expression:"deleteFileDialog"}},[e(p.Z,[e(v.EB,{staticClass:"text-h5"},[t._v(" 删除文件确认 ")]),e(v.ZB,[t._v("你确认删除"+t._s(this.files[this.selectedFile].name)+"吗？此次操作"),e("b",[t._v("将在修改提交后进行。")])]),e(v.ZB,[e(r.Z,{attrs:{block:"",color:"error",outlined:""},on:{click:t.deleteLabelFile}},[t._v("删除")]),e("br"),e(r.Z,{attrs:{block:"",color:"success",outlined:""},on:{click:function(e){t.deleteFileDialog=!1}}},[t._v("还是算了")])],1),e(v.h7)],1)],1),e(r.Z,[e(k.Z,[t._v("mdi-content-save")]),t._v(" 保存修改 ")],1)],1),e(C.Z,{attrs:{dense:""}},[e(I.Z,{attrs:{color:"primary"},model:{value:t.selectedFile,callback:function(e){t.selectedFile=e},expression:"selectedFile"}},t._l(t.files,(function(s,a){return e(x.Z,{key:a},[e(B.km,[e(B.V9,{domProps:{textContent:t._s(s.name)}})],1)],1)})),1)],1)],1)],2),e(p.Z,{attrs:{elevation:"0",outlined:""}},[e("template",{slot:"progress"},[e(S.Z,{attrs:{color:"deep-purple",height:"10",indeterminate:""}})],1),e(v.EB,[t._v(t._s(t.labelInfo.name)+" 操作")]),e(v.ZB,[e("h3",[t._v("操作")]),e("br"),[e(m.Z,{attrs:{id:"label_action"}},[e(y.Z,{attrs:{wrap:""}},[e(Z.Z,{attrs:{lg8:"",xs12:""}},[e("b",[t._v("删除此label")]),e("br"),t._v("这样做会失去这个label ")]),e(Z.Z,{attrs:{lg4:"",xs12:""}},[e(f.Z,{attrs:{persistent:"","max-width":"320"},scopedSlots:t._u([{key:"activator",fn:function({on:s,attrs:a}){return[e(r.Z,t._g(t._b({attrs:{depressed:"",color:"error"}},"v-btn",a,!1),s),[t._v(" 删除label ")])]}}]),model:{value:t.deletedialog,callback:function(e){t.deletedialog=e},expression:"deletedialog"}},[e(p.Z,[e(v.EB,{staticClass:"text-h5"},[t._v(" 删除Label ")]),e(l.Z,{attrs:{prominent:"",type:"error"}},[e($.Z,{attrs:{align:"center"}},[e(m.Z,{staticClass:"grow"},[t._v(" 如果您不仔细阅读对话框内的文字可能会造成严重后果！ ")])],1)],1),e(v.ZB,[t._v("本次操作将"),e("b",[t._v("难以被撤销")]),t._v("，该Label的一切源代码将会被删除。"),e("br"),t._v("如果您知晓了此风险，请在下方输入： "),e("code",[t._v("delete:"+t._s(t.labelInfo.name))])]),e(v.ZB,[e(N.Z,{attrs:{"hide-details":"auto"},on:{input:t.isDeclarationMatch},model:{value:t.declaration,callback:function(e){t.declaration=e},expression:"declaration"}}),e("br"),e(r.Z,{attrs:{block:"",color:"error",outlined:"",disabled:!t.declarationMatch}},[t._v("我已知晓行动的后果")]),e("br"),e(r.Z,{attrs:{block:"",color:"success",outlined:""},on:{click:function(e){t.deletedialog=!1}}},[t._v("还是算了")])],1),e(v.h7)],1)],1)],1)],1),e("br"),e(_.Z),e("br"),e(y.Z,{attrs:{wrap:""}},[e(Z.Z,{attrs:{lg8:"",xs12:""}},[e("b",[t._v("提交label")]),e("br"),t._v("将此次修改作为更新进行提交 ")]),e(Z.Z,{attrs:{lg4:"",xs12:""}},[e(f.Z,{attrs:{persistent:"","max-width":"320"},scopedSlots:t._u([{key:"activator",fn:function({on:s,attrs:a}){return[e(r.Z,t._g(t._b({attrs:{depressed:"",color:"success"}},"v-btn",a,!1),s),[t._v(" 提交label ")])]}}]),model:{value:t.prLabelDialog,callback:function(e){t.prLabelDialog=e},expression:"prLabelDialog"}},[e(p.Z,[e(v.EB,{staticClass:"text-h5"},[t._v(" 提交 ")]),e(v.ZB,[t._v("你将要提交以下修改"),e("b",[e("br"),t._v("注意：没有被保存的修改不会被提交，请仔细确认")]),t._v(" "+t._s(t.compareChange.onlyInOrigin)+" ")]),e(v.ZB,[e(r.Z,{attrs:{block:"",color:"primary",outlined:""}},[t._v("提交")]),e("br"),e(r.Z,{attrs:{block:"",color:"success",outlined:""},on:{click:function(e){t.prLabelDialog=!1}}},[t._v("还是算了")])],1),e(v.h7)],1)],1)],1)],1),e("br"),e(_.Z),e("br"),e(y.Z,{attrs:{wrap:""}},[e(Z.Z,{attrs:{lg8:"",xs12:""}},[e("b",[t._v("锁定label")]),e("br"),t._v("锁定此label以防止编辑冲突 ")]),e(Z.Z,{attrs:{lg4:"",xs12:""}},[e(r.Z,{attrs:{depressed:"",color:"warning"}},[t._v(" 锁定label ")])],1)],1)],1)]],2)],2)],1)],1)],1),e(p.Z,{staticClass:"my-4 striped-bg"},[e(v.EB,{staticClass:"bender"},[e(k.Z,{attrs:{large:""}},[t._v("mdi-file-document-outline")]),t._v("文档 | DOCUMENTATION")],1),e(v.ZB,[e(p.Z,{attrs:{elevation:"0",outlined:""}},[e(v.ZB,{staticStyle:{"font-size":"12pt",color:"black"},domProps:{innerHTML:t._s(t.documentation)}})],1),e(p.Z,{staticClass:"my-2",attrs:{elevation:"0",outlined:""}},[e(v.EB,{staticClass:"bender"},[e(k.Z,{attrs:{large:""}},[t._v("mdi-scale-balance")]),t._v("LICENSE")],1),e(v.ZB,[t._v(" 如"),e("b",[t._v("无特别声明（如在label的核心文件{js、css等}、文档文件{README.md等}等文件内明确表明的声明）")]),t._v("，此label将遵循GNU General Public License v3.0协议进行开源。 ")])],1)],1)],1)],1)},j=[],U=i(78945);function R(t){const e=t.split(".").pop();switch(e){case"js":return"javascript";case"css":return"css";case"md":return"markdown";case"json":return"json";default:return"text"}}function J(t,e,s="success"){t.snackbarColor=s,t.snackbarText=e,t.snackbar=!0}var P={name:"editpage",data:()=>({dialog:!1,deletedialog:!1,PICdialog:!1,deleteFileDialog:!1,prLabelDialog:!1,snackbar:!1,snackbarText:"",snackbarColor:"primary",loadingOverlay:!1,current:0,content:"",lang:"javascript",declaration:"",declarationMatch:!1,declarationM:"",selectedFile:0,files:[{name:"加载中……"}],labelInfo:{name:"",size:100,PIC:"",uniUse:!0,isLock:!0},documentation:"<i>文档正在加载……</i>",isLabelDefined:!1,compareChange:{onlyInChanged:"",onlyInOrigin:""}}),methods:{isDeclarationMatch(){console.log(this.declaration),this.declaration=="delete:"+this.labelInfo.name?this.declarationMatch=!0:this.declarationMatch=!1},handleUpdateContentBody(t){sessionStorage.setItem(this.files[this.selectedFile].name,t)},deleteLabelFile(){this.$route.query.label;this.loadingOverlay=!0,this.deleteFileDialog=!1;var t=this.files[this.selectedFile].name;if("config.json"==t)return this.loadingOverlay=!1,void J(this,"错误：配置文件不可删除","error");var e=JSON.parse(sessionStorage.getItem("files"));e=e.filter((e=>e.name!=t)),this.files=e,this.selectedFile--,sessionStorage.setItem("files",JSON.stringify(e)),J(this,"文件在此次修改提交后将被删除。","success"),this.loadingOverlay=!1},prLabelChange(){}},mounted(){const t=this.$route.query.label;if(this.labelInfo.name=t,"undefined"==typeof t||""==t)return window.location.href="/#/search",void(this.documentation="<b>错误：没有指定label。</b>");U.Z.get(`${this.$globalApiURL}/label?type=getLabelTree&name=${t}`).then((t=>{var e=t.data.data.children;this.files=e,sessionStorage.setItem("files",JSON.stringify(this.files)),sessionStorage.setItem("files_bak",JSON.stringify(this.files))})).catch((t=>{J(this,"错误：文件列表加载失败:"+e,"error")})),U.Z.get(`${this.$globalApiURL}/label?type=labelAction&name=${t}&fileName=README.md`).then((t=>{"undefined"==typeof t.data.errorCode?this.documentation=t.data:this.documentation="<b>错误：此label没有文档文件。</b>"})).catch((t=>{this.documentation="<b>文档加载失败。</b><br>错误信息："+t,J(this,"文档加载失败。"+e,"error")})),U.Z.get(`${this.$globalApiURL}/label?type=labelAction&name=${t}&fileName=config.json`).then((t=>{this.lang="json",this.content=JSON.stringify(t.data),this.current++})).catch((t=>this.content=`console.error('An error occurred. Error message: ${t}')`)),this.compareChange.onlyInChanged=z().onlyInChanged,this.compareChange.onlyInOrigin=z.onlyInOrigin},watch:{selectedFile:function(){const t=this.$route.query.label;var e=sessionStorage.getItem(this.files[this.selectedFile].name);if(null!=e)return this.lang=R(this.files[this.selectedFile].name),this.content=e,void this.current++;U.Z.get(`${this.$globalApiURL}/label?type=labelAction&name=${t}&fileName=${this.files[this.selectedFile].name}&source=true`).then((t=>{"string"!=typeof t.data&&"undefined"!=typeof t.data&&"object"!=typeof t.data&&(t.data=t.data.toString()),this.lang=R(this.files[this.selectedFile].name),"json"==this.lang?this.content=JSON.stringify(t.data):this.content=t.data,this.current++})).catch((t=>this.content=`console.error('An error occurred. Error message: ${t}')`))}}};function z(){const t=sessionStorage.getItem("files_bak"),e=sessionStorage.getItem("files"),s=t.filter((t=>!b.includes(t))),i=e.filter((t=>!a.includes(t)));return console.log(`[${s}, ${i}]`),{onlyInChanged:i,onlyInOrigin:s}}var q=P,W=i(1001),G=(0,W.Z)(q,M,j,!1,null,null,null),H=G.exports,V={name:"Edit",components:{editMain:H}},K=V,Q=(0,W.Z)(K,n,o,!1,null,null,null),X=Q.exports}}]);
//# sourceMappingURL=edit.2570982f.js.map