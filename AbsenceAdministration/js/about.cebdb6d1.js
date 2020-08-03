(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["about"],{bb51:function(t,e,a){"use strict";a.r(e);var r=function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",[a("v-slide-y-transition",{attrs:{"leave-absolute":"",mode:"out-in"}},[t.loading?t._e():[a("v-container",{staticStyle:{position:"relative"},attrs:{fluid:""}},[a("v-row",[a("v-col",{attrs:{cols:"12",md:"3"}},[a("dashboardCard",{attrs:{metricValue:t.metricActive,metricTitle:"Active",metricColor:"green--text",selectedFilters:t.selectedFilters},nativeOn:{click:function(e){return t.metricClick("active")}}})],1),a("v-col",{attrs:{cols:"12",md:"3"}},[a("dashboardCard",{attrs:{metricValue:t.metricPending,metricTitle:"Pending",metricColor:"orange--text",selectedFilters:t.selectedFilters},nativeOn:{click:function(e){return t.metricClick("pending")}}})],1),a("v-col",{attrs:{cols:"12",md:"3"}},[a("dashboardCard",{attrs:{metricValue:t.metricLatePay,metricTitle:"Late Pay",metricColor:"red--text",selectedFilters:t.selectedFilters}})],1),a("v-col",{attrs:{cols:"12",md:"3"}},[a("dashboardCard",{attrs:{metricValue:t.metricMonthlyBillable,metricTitle:"Monthly Billable",metricColor:"",selectedFilters:t.selectedFilters}})],1)],1),a("v-divider",{staticClass:"mt-5 mb-4"}),a("v-row",{attrs:{dense:""}},[a("v-col",{attrs:{cols:"12",md:"6"}},[a("v-text-field",{attrs:{color:"deep-purple accent-4",outlined:"",label:"Employee Search","append-icon":"mdi-magnify"},model:{value:t.eeSearch,callback:function(e){t.eeSearch=e},expression:"eeSearch"}})],1)],1),a("v-slide-x-transition",{staticClass:"row",staticStyle:{position:"absolute",left:"12px",right:"12px"},attrs:{tag:"div",group:"","leave-absolute":"",mode:"out-in"}},t._l(t.allEETextSearch,(function(e){return a("v-col",{key:e.doc,attrs:{cols:"12",md:"3"}},[a("eeCard",{attrs:{cardData:e},on:{eeDetail:t.prepEditEE}})],1)})),1),a("v-scale-transition",{staticClass:"row justify-center",staticStyle:{position:"absolute"},attrs:{mode:"out-in",tag:"div","leave-absolute":""}},[0==t.allEEFilter.length&&!t.loading&&t.selectedFilters.length>=0?[a("div",{staticStyle:{position:"absolute",left:"12px",right:"12px",margin:"auto"}},[a("v-col",{staticClass:"text-center"},[a("v-icon",{attrs:{size:"75px",color:"primary"}},[t._v("mdi-magnify")]),a("div",{staticClass:"display-1 font-weight-light"},[t._v("Get started by choosing a status above.")])],1)],1)]:t._e()],2),a("v-scale-transition",{staticClass:"row justify-center",staticStyle:{position:"absolute"},attrs:{mode:"out-in",tag:"div","leave-absolute":""}},[0==t.allEEs.length&&!t.loading&&t.selectedFilters.length>0?[a("div",{staticStyle:{position:"absolute",left:"12px",right:"12px",margin:"auto"}},[a("v-col",{staticClass:"text-center"},[a("v-icon",{attrs:{size:"75px",color:"primary"}},[t._v("mdi-magnify")]),a("div",{staticClass:"display-1 font-weight-light"},[t._v("Nothing to see here (yet).")]),a("div",{staticClass:"subtitle"},[t._v(" To get started, click "),a("v-btn",{staticClass:"mr-1",attrs:{depressed:"",small:"",color:"primary"},on:{click:t.addNew}},[a("v-icon",{attrs:{left:""}},[t._v("mdi-plus")]),t._v("New ")],1),t._v("to add a new Employee ")],1)],1)],1)]:t._e()],2)],1)]],2),a("v-scale-transition",{attrs:{"leave-absolute":""}},[t.loading?[a("v-col",{staticClass:"text-center"},[a("v-progress-circular",{attrs:{size:"70",width:"7",color:"purple",indeterminate:""}}),a("div",{staticClass:"display-1 font-weight-light"},[t._v("Loading...")])],1)]:t._e()],2)],1)},i=[],s=(a("4de4"),a("caad"),a("c975"),a("a434"),a("2532"),a("bc3a")),l=a.n(s),c=function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("v-card",{staticStyle:{cursor:"pointer"},attrs:{color:t.activeCard,dark:t.activeCardDark}},[a("v-card-title",{staticClass:"text-no-wrap"},[t._v(t._s(t.metricTitle))]),a("v-tooltip",{attrs:{bottom:"","close-delay":"250","open-delay":"250"},scopedSlots:t._u([{key:"activator",fn:function(e){var r=e.on,i=e.attrs;return[a("v-card-text",t._g(t._b({staticClass:"display-1 text-center pa-3 text-no-wrap text-truncate",class:t.metricColor},"v-card-text",i,!1),r),[t._v(t._s(t.metricValue))])]}}])},[a("span",{domProps:{textContent:t._s(t.metricValue)}})])],1)},o=[],n={name:"dashboardCard",props:["metricValue","metricTitle","metricColor","selectedFilters"],computed:{activeCard:function(){return this.selectedFilters.includes(this.metricTitle.toLowerCase())?"deep-purple":""},activeCardDark:function(){return!!this.selectedFilters.includes(this.metricTitle.toLowerCase())}}},d=n,u=a("2877"),v=a("6544"),m=a.n(v),p=a("b0af"),f=a("99d9"),h=a("3a2f"),g=Object(u["a"])(d,c,o,!1,null,null,null),C=g.exports;m()(g,{VCard:p["a"],VCardText:f["b"],VCardTitle:f["c"],VTooltip:h["a"]});var b=function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",[a("v-card",{staticClass:"mt-2",staticStyle:{position:"relative"},attrs:{color:t.cardStatusColor}},[a("v-card-title",{staticClass:"primary--text justify-space-between d-flex"},[a("div",[t._v(t._s(""==t.fullName?"N/A":t.fullName))]),a("div",{staticClass:"caption font-weight-bold",class:{"green--text":"Active"==t.cardStatus,"orange--text darken-5":"Active"!=t.cardStatus}},[t._v(t._s(t.cardStatus))])]),a("v-card-text",[a("div",[t._v(" Started: "),a("b",[t._v(t._s(t.startDate))])]),a("div",[t._v(" Monthly Amount: "),a("b",[t._v(t._s(t.billTotal))])])]),a("v-card-actions",{staticClass:"text-right"},[a("v-spacer"),a("v-btn",{attrs:{icon:"",color:"primary"},on:{click:function(e){return t.modifyEE(t.cardData.doc)}}},[a("v-icon",[t._v("mdi-magnify")])],1),a("v-btn",{attrs:{icon:"",color:"pink accent-3"},on:{click:function(e){return t.removeConfirm(t.cardData.doc)}}},[a("v-icon",[t._v("mdi-trash-can")])],1)],1)],1),[a("v-row",{attrs:{justify:"center"}},[a("v-dialog",{attrs:{persistent:"","max-width":"290"},model:{value:t.removeDialog,callback:function(e){t.removeDialog=e},expression:"removeDialog"}},[a("v-card",[a("v-card-title",{staticClass:"headline"},[t._v("Confirmation")]),a("v-card-text",[t._v("Are you sure you want to remove this Employee?")]),a("v-card-actions",[a("v-spacer"),a("v-btn",{attrs:{color:"dark",text:""},on:{click:function(e){t.removeDialog=!1}}},[t._v("Cancel")]),a("v-btn",{attrs:{color:"pink accent-1",text:""},on:{click:t.removeItem}},[t._v("Remove")])],1)],1)],1)],1)]],2)},_=[],x=(a("b680"),a("d3b7"),a("ac1f"),a("25f0"),a("5319"),a("17e1")),y={name:"eeCard",data:function(){return{removePrep:"",removeDialog:!1}},props:["cardData"],computed:{startDate:function(){var t=this,e=new Date(t.cardData.bill_start);return""==t.cardData.bill_start?"N/A":e.getMonth()+1+"/"+e.getDate()+"/"+e.getFullYear()},billTotal:function(){var t=this;return""==t.cardData.bill_sum||"N/A"==t.cardData.bill_sum?"N/A":"$"+t.numberWithCommas(t.cardData.bill_sum.toFixed(2))},fullName:function(){var t=this;return t.cardData.last_name+", "+t.cardData.first_name},cardStatus:function(){var t=this;return"active"==t.cardData.status?"Active":"Pending"},cardStatusColor:function(){var t=this;return"active"==t.cardData.status?"green lighten-5":""}},methods:{modifyEE:function(){var t=this;t.$emit("eeDetail",t.cardData)},numberWithCommas:function(t){return t.toString().replace(/\B(?=(\d{3})+(?!\d))/g,",")},removeConfirm:function(t){var e=this;e.removeDialog=!0,e.removePrep=t},removeItem:function(){var t=this;x["a"].collection("testEEs").doc(t.removePrep).delete(),t.removeDialog=!1}},watch:{removeDialog:function(){var t=this;t.removeDialog||(t.removePrep="")}}},E=y,w=a("8336"),D=a("169a"),V=a("132d"),S=a("0fd9"),F=a("2fa4"),k=Object(u["a"])(E,b,_,!1,null,null,null),T=k.exports;m()(k,{VBtn:w["a"],VCard:p["a"],VCardActions:f["a"],VCardText:f["b"],VCardTitle:f["c"],VDialog:D["a"],VIcon:V["a"],VRow:S["a"],VSpacer:F["a"]});var A={name:"Home",data:function(){return{metrics:[],eeSearch:""}},props:["activeEEs","pendingEEs","allEEs","selectedFilters","loading"],components:{dashboardCard:C,eeCard:T},methods:{prepEditEE:function(){for(var t=this,e=arguments.length,a=new Array(e),r=0;r<e;r++)a[r]=arguments[r];t.$emit("passToHome",a)},addNew:function(){this.$emit("addNewMissing",!0)},metricClick:function(t){var e=this,a=e.selectedFilters.indexOf(t);console.log(a),e.selectedFilters.includes(t)?e.selectedFilters.splice(a,a+1):e.selectedFilters.push(t)},getMetrics:function(){var t=this;l.a.get("/data/sampleMetrics.json").then((function(e){t.metrics=e.data})).catch((function(){alert("fail")}))}},computed:{allEEFilter:function(){var t=this;return t.allEEs.filter((function(e){return t.selectedFilters.includes(e.status)}))},allEETextSearch:function(){var t=this;return t.allEEFilter.filter((function(e){return e.first_name.toLowerCase().indexOf(t.eeSearch.toLowerCase())>-1||e.last_name.toLowerCase().indexOf(t.eeSearch.toLowerCase())>-1}))},metricActive:function(){var t=this;return t.allEEs.filter((function(t){return"active"==t.status})).length},metricPending:function(){var t=this;return t.allEEs.filter((function(t){return"pending"==t.status})).length},metricLatePay:function(){return"3"},metricMonthlyBillable:function(){return"$13,987.44"}},created:function(){this.getMetrics()}},P=A,N=a("62ad"),L=a("a523"),M=a("ce7e"),j=a("490a"),O=a("0789"),$=a("8654"),B=Object(u["a"])(P,r,i,!1,null,null,null);e["default"]=B.exports;m()(B,{VBtn:w["a"],VCol:N["a"],VContainer:L["a"],VDivider:M["a"],VIcon:V["a"],VProgressCircular:j["a"],VRow:S["a"],VScaleTransition:O["e"],VSlideXTransition:O["g"],VSlideYTransition:O["h"],VTextField:$["a"]})}}]);
//# sourceMappingURL=about.cebdb6d1.js.map