parcelRequire=function(e,r,t,n){var i,o="function"==typeof parcelRequire&&parcelRequire,u="function"==typeof require&&require;function f(t,n){if(!r[t]){if(!e[t]){var i="function"==typeof parcelRequire&&parcelRequire;if(!n&&i)return i(t,!0);if(o)return o(t,!0);if(u&&"string"==typeof t)return u(t);var c=new Error("Cannot find module '"+t+"'");throw c.code="MODULE_NOT_FOUND",c}p.resolve=function(r){return e[t][1][r]||r},p.cache={};var l=r[t]=new f.Module(t);e[t][0].call(l.exports,p,l,l.exports,this)}return r[t].exports;function p(e){return f(p.resolve(e))}}f.isParcelRequire=!0,f.Module=function(e){this.id=e,this.bundle=f,this.exports={}},f.modules=e,f.cache=r,f.parent=o,f.register=function(r,t){e[r]=[function(e,r){r.exports=t},{}]};for(var c=0;c<t.length;c++)try{f(t[c])}catch(e){i||(i=e)}if(t.length){var l=f(t[t.length-1]);"object"==typeof exports&&"undefined"!=typeof module?module.exports=l:"function"==typeof define&&define.amd?define(function(){return l}):n&&(this[n]=l)}if(parcelRequire=f,i)throw i;return f}({"A2T1":[function(require,module,exports) {
var e="h8cohorts";window.init=function(t){var r=localStorage[e]||"{}";return r=JSON.parse(r),{base_url:t,viewType:"table",sortDirection:1,sortSelected:null,users:[],alerts:[],repos:{},branchDetail:{},selectedRepo:null,selectedRepoBranches:[],cohorts:Object.keys(r),dropdown:!1,title:"GCH - Git Commit History",page:location.hash,form:{name:"",text:""},selectRepoHandler:function(){this.selectedRepoBranches=this.repos[this.selectedRepo]},parsedData:function(){var e=[],t=[],r=1;return this.selectedRepoBranches.forEach(function(s,n){var a=n+1;t.push({id:a,title:s.branch_name}),s.commits.forEach(function(t,s){e.push({id:r,start:t.author.date.split(" ")[0],end:t.author.date.split(" ")[0],title:t.message,resourceId:a}),r++})}),{commits:e,branchGroups:t}},formatDate:function(e){var t=new Date(e);return new Intl.DateTimeFormat("id-ID",{dateStyle:"full",timeStyle:"short"}).format(t)},displayCalendar:function(){var e=this.parsedData(),t=e.commits,r=e.branchGroups;console.log(r),console.log(t);var s=document.getElementById("calendar"),n=new FullCalendar.Calendar(s,{timeZone:"UTC",initialView:"resourceTimelineDay",aspectRatio:1.5,headerToolbar:{left:"prev,next",center:"title",right:"resourceTimelineDay,resourceTimelineWeek,resourceTimelineMonth"},editable:!0,resourceAreaHeaderContent:"Branch",resources:r,events:t});this.viewType="table"==this.viewType?"timeline":"table",n.render()},sort:function(e,t){var r=this;this[e]=this[e].sort(function(e,s){return"commits"===t?s[t].length<e[t].length?-r.sortDirection:r.sortDirection:s[t]<e[t]?-r.sortDirection:r.sortDirection}),this.sortDirection=-this.sortDirection,this.sortSelected=t},selectBranchHandler:function(e){this.branchDetail=this.selectedRepoBranches.filter(function(t){return t.branch_name===e})[0],location.hash="branch_"+this.branchDetail.branch_name},fetchRepoCommits:function(){var e=this,t=this.base_url+"/hooks/github";fetch(t,{method:"POST",body:JSON.stringify({cache:!0})}).then(function(e){return e.json()}).then(function(t){e.repos=t})},getGroups:function(){var t=localStorage[e];return t=JSON.parse(t),Object.keys(t)},cohortSelectHandler:function(e){},pasteHandler:function(e){var t=e.target.value.split("\n").map(function(e){return e.split("\t")});this.users=t},pageChangeHandler:function(e){this.page=location.hash},saveGroup:function(){var t=this;try{var r=localStorage[e]||"{}";(r=JSON.parse(r))[this.form.name]=this.users,localStorage.setItem(e,JSON.stringify(r)),this.cohorts=Object.keys(r),this.alerts.push({status:"success",message:"Successfully add"})}catch(s){this.alerts.push({status:"danger",message:s.message})}setTimeout(function(){t.alert=[]},2e3)}}};
},{}]},{},["A2T1"], "app")
//# sourceMappingURL=/app.prod.js.map