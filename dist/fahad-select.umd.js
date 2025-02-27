(function(t,c){typeof exports=="object"&&typeof module<"u"?module.exports=c(require("vue"),require("axios"),require("lodash")):typeof define=="function"&&define.amd?define(["vue","axios","lodash"],c):(t=typeof globalThis<"u"?globalThis:t||self,t.FahadSelect=c(t.Vue,t.Axios,t._))})(this,function(t,c,O){"use strict";function f(e){return e===0?!1:Array.isArray(e)&&e.length===0?!0:!e}function L(e){return(...i)=>!e(...i)}function B(e,i){return e===void 0&&(e="undefined"),e===null&&(e="null"),e===!1&&(e="false"),e.toString().toLowerCase().indexOf(i.trim())!==-1}function $(e){return e.filter(i=>!i.$isLabel)}function m(e,i){return l=>l.reduce((n,a)=>a[e]&&a[e].length?(n.push({$groupLabel:a[i],$isLabel:!0}),n.concat(a[e])):n,[])}const y=(...e)=>i=>e.reduce((l,n)=>n(l),i);var k={data(){return{search:"",isOpen:!1,preferredOpenDirection:"below",optimizedHeight:this.maxHeight}},props:{internalSearch:{type:Boolean,default:!0},options:{type:Array,required:!0},multiple:{type:Boolean,default:!1},trackBy:{type:String},label:{type:String},searchable:{type:Boolean,default:!0},clearOnSelect:{type:Boolean,default:!0},hideSelected:{type:Boolean,default:!1},placeholder:{type:String,default:"Select option"},allowEmpty:{type:Boolean,default:!0},resetAfter:{type:Boolean,default:!1},closeOnSelect:{type:Boolean,default:!0},customLabel:{type:Function,default(e,i){return f(e)?"":i?e[i]:e}},taggable:{type:Boolean,default:!1},tagPlaceholder:{type:String,default:"Press enter to create a tag"},tagPosition:{type:String,default:"top"},max:{type:[Number,Boolean],default:!1},id:{default:null},optionsLimit:{type:Number,default:1e3},groupValues:{type:String},groupLabel:{type:String},groupSelect:{type:Boolean,default:!1},blockKeys:{type:Array,default(){return[]}},preserveSearch:{type:Boolean,default:!1},preselectFirst:{type:Boolean,default:!1},preventAutofocus:{type:Boolean,default:!1},filteringSortFunc:{type:Function,default:null}},mounted(){!this.multiple&&this.max&&console.warn("[Vue-Multiselect warn]: Max prop should not be used when prop Multiple equals false."),this.preselectFirst&&!this.internalValue.length&&this.options.length&&this.select(this.filteredOptions[0])},computed:{internalValue(){return this.modelValue||this.modelValue===0?Array.isArray(this.modelValue)?this.modelValue:[this.modelValue]:[]},filteredOptions(){const e=this.search||"",i=e.toLowerCase().trim();let l=this.options.concat();return this.internalSearch?l=this.groupValues?this.filterAndFlat(l,i,this.label):this.filterOptions(l,i,this.label,this.customLabel):l=this.groupValues?m(this.groupValues,this.groupLabel)(l):l,l=this.hideSelected?l.filter(L(this.isSelected)):l,this.taggable&&i.length&&!this.isExistingOption(i)&&(this.tagPosition==="bottom"?l.push({isTag:!0,label:e}):l.unshift({isTag:!0,label:e})),l.slice(0,this.optionsLimit)},valueKeys(){return this.trackBy?this.internalValue.map(e=>e[this.trackBy]):this.internalValue},optionKeys(){return(this.groupValues?this.flatAndStrip(this.options):this.options).map(i=>this.customLabel(i,this.label).toString().toLowerCase())},currentOptionLabel(){return this.multiple?this.searchable?"":this.placeholder:this.internalValue.length?this.getOptionLabel(this.internalValue[0]):this.searchable?"":this.placeholder}},watch:{internalValue:{handler(){this.resetAfter&&this.internalValue.length&&(this.search="",this.$emit("update:modelValue",this.multiple?[]:null))},deep:!0},search(){this.$emit("search-change",this.search)}},emits:["open","search-change","close","select","update:modelValue","remove","tag"],methods:{getValue(){return this.multiple?this.internalValue:this.internalValue.length===0?null:this.internalValue[0]},filterAndFlat(e,i,l){return y(this.filterGroups(i,l,this.groupValues,this.groupLabel,this.customLabel),m(this.groupValues,this.groupLabel))(e)},flatAndStrip(e){return y(m(this.groupValues,this.groupLabel),$)(e)},updateSearch(e){this.search=e},isExistingOption(e){return this.options?this.optionKeys.indexOf(e)>-1:!1},isSelected(e){const i=this.trackBy?e[this.trackBy]:e;return this.valueKeys.indexOf(i)>-1},isOptionDisabled(e){return!!e.$isDisabled},getOptionLabel(e){if(f(e))return"";if(e.isTag)return e.label;if(e.$isLabel)return e.$groupLabel;const i=this.customLabel(e,this.label);return f(i)?"":i},select(e,i){if(e.$isLabel&&this.groupSelect){this.selectGroup(e);return}if(!(this.blockKeys.indexOf(i)!==-1||this.disabled||e.$isDisabled||e.$isLabel)&&!(this.max&&this.multiple&&this.internalValue.length===this.max)&&!(i==="Tab"&&!this.pointerDirty)){if(e.isTag)this.$emit("tag",e.label,this.id),this.search="",this.closeOnSelect&&!this.multiple&&this.deactivate();else{if(this.isSelected(e)){i!=="Tab"&&this.removeElement(e);return}this.multiple?this.$emit("update:modelValue",this.internalValue.concat([e])):this.$emit("update:modelValue",e),this.$emit("select",e,this.id),this.clearOnSelect&&(this.search="")}this.closeOnSelect&&this.deactivate()}},selectGroup(e){const i=this.options.find(l=>l[this.groupLabel]===e.$groupLabel);if(i){if(this.wholeGroupSelected(i)){this.$emit("remove",i[this.groupValues],this.id);const l=this.trackBy?i[this.groupValues].map(a=>a[this.trackBy]):i[this.groupValues],n=this.internalValue.filter(a=>l.indexOf(this.trackBy?a[this.trackBy]:a)===-1);this.$emit("update:modelValue",n)}else{const l=i[this.groupValues].filter(n=>!(this.isOptionDisabled(n)||this.isSelected(n)));this.max&&l.splice(this.max-this.internalValue.length),this.$emit("select",l,this.id),this.$emit("update:modelValue",this.internalValue.concat(l))}this.closeOnSelect&&this.deactivate()}},wholeGroupSelected(e){return e[this.groupValues].every(i=>this.isSelected(i)||this.isOptionDisabled(i))},wholeGroupDisabled(e){return e[this.groupValues].every(this.isOptionDisabled)},removeElement(e,i=!0){if(this.disabled||e.$isDisabled)return;if(!this.allowEmpty&&this.internalValue.length<=1){this.deactivate();return}const l=typeof e=="object"?this.valueKeys.indexOf(e[this.trackBy]):this.valueKeys.indexOf(e);if(this.multiple){const n=this.internalValue.slice(0,l).concat(this.internalValue.slice(l+1));this.$emit("update:modelValue",n)}else this.$emit("update:modelValue",null);this.$emit("remove",e,this.id),this.closeOnSelect&&i&&this.deactivate()},removeLastElement(){this.blockKeys.indexOf("Delete")===-1&&this.search.length===0&&Array.isArray(this.internalValue)&&this.internalValue.length&&this.removeElement(this.internalValue[this.internalValue.length-1],!1)},activate(){this.isOpen||this.disabled||(this.adjustPosition(),this.groupValues&&this.pointer===0&&this.filteredOptions.length&&(this.pointer=1),this.isOpen=!0,this.searchable?(this.preserveSearch||(this.search=""),this.preventAutofocus||this.$nextTick(()=>this.$refs.search&&this.$refs.search.focus())):this.preventAutofocus||typeof this.$el<"u"&&this.$el.focus(),this.$emit("open",this.id))},deactivate(){this.isOpen&&(this.isOpen=!1,this.searchable?this.$refs.search!==null&&typeof this.$refs.search<"u"&&this.$refs.search.blur():typeof this.$el<"u"&&this.$el.blur(),this.preserveSearch||(this.search=""),this.$emit("close",this.getValue(),this.id))},toggle(){this.isOpen?this.deactivate():this.activate()},adjustPosition(){if(typeof window>"u")return;const e=this.$el.getBoundingClientRect().top,i=window.innerHeight-this.$el.getBoundingClientRect().bottom;i>this.maxHeight||i>e||this.openDirection==="below"||this.openDirection==="bottom"?(this.preferredOpenDirection="below",this.optimizedHeight=Math.min(i-40,this.maxHeight)):(this.preferredOpenDirection="above",this.optimizedHeight=Math.min(e-40,this.maxHeight))},filterOptions(e,i,l,n){return i?e.filter(a=>B(n(a,l),i)).sort((a,r)=>typeof this.filteringSortFunc=="function"?this.filteringSortFunc(a,r):n(a,l).length-n(r,l).length):e},filterGroups(e,i,l,n,a){return r=>r.map(s=>{if(!s[l])return console.warn("Options passed to vue-multiselect do not contain groups, despite the config."),[];const h=this.filterOptions(s[l],e,i,a);return h.length?{[n]:s[n],[l]:h}:[]})}}},E={data(){return{pointer:0,pointerDirty:!1}},props:{showPointer:{type:Boolean,default:!0},optionHeight:{type:Number,default:40}},computed:{pointerPosition(){return this.pointer*this.optionHeight},visibleElements(){return this.optimizedHeight/this.optionHeight}},watch:{filteredOptions(){this.pointerAdjust()},isOpen(){this.pointerDirty=!1},pointer(){this.$refs.search&&this.$refs.search.setAttribute("aria-activedescendant",this.id+"-"+this.pointer.toString())}},methods:{optionHighlight(e,i){return{"multiselect__option--highlight":e===this.pointer&&this.showPointer,"multiselect__option--selected":this.isSelected(i)}},groupHighlight(e,i){if(!this.groupSelect)return["multiselect__option--disabled",{"multiselect__option--group":i.$isLabel}];const l=this.options.find(n=>n[this.groupLabel]===i.$groupLabel);return l&&!this.wholeGroupDisabled(l)?["multiselect__option--group",{"multiselect__option--highlight":e===this.pointer&&this.showPointer},{"multiselect__option--group-selected":this.wholeGroupSelected(l)}]:"multiselect__option--disabled"},addPointerElement({key:e}="Enter"){this.filteredOptions.length>0&&this.select(this.filteredOptions[this.pointer],e),this.pointerReset()},pointerForward(){this.pointer<this.filteredOptions.length-1&&(this.pointer++,this.$refs.list.scrollTop<=this.pointerPosition-(this.visibleElements-1)*this.optionHeight&&(this.$refs.list.scrollTop=this.pointerPosition-(this.visibleElements-1)*this.optionHeight),this.filteredOptions[this.pointer]&&this.filteredOptions[this.pointer].$isLabel&&!this.groupSelect&&this.pointerForward()),this.pointerDirty=!0},pointerBackward(){this.pointer>0?(this.pointer--,this.$refs.list.scrollTop>=this.pointerPosition&&(this.$refs.list.scrollTop=this.pointerPosition),this.filteredOptions[this.pointer]&&this.filteredOptions[this.pointer].$isLabel&&!this.groupSelect&&this.pointerBackward()):this.filteredOptions[this.pointer]&&this.filteredOptions[0].$isLabel&&!this.groupSelect&&this.pointerForward(),this.pointerDirty=!0},pointerReset(){this.closeOnSelect&&(this.pointer=0,this.$refs.list&&(this.$refs.list.scrollTop=0))},pointerAdjust(){this.pointer>=this.filteredOptions.length-1&&(this.pointer=this.filteredOptions.length?this.filteredOptions.length-1:0),this.filteredOptions.length>0&&this.filteredOptions[this.pointer].$isLabel&&!this.groupSelect&&this.pointerForward()},pointerSet(e){this.pointer=e,this.pointerDirty=!0}}},V={name:"vue-multiselect",mixins:[k,E],compatConfig:{MODE:3,ATTR_ENUMERATED_COERCION:!1},props:{name:{type:String,default:""},modelValue:{type:null,default(){return[]}},selectLabel:{type:String,default:"Press enter to select"},selectGroupLabel:{type:String,default:"Press enter to select group"},selectedLabel:{type:String,default:"Selected"},deselectLabel:{type:String,default:"Press enter to remove"},deselectGroupLabel:{type:String,default:"Press enter to deselect group"},showLabels:{type:Boolean,default:!0},limit:{type:Number,default:99999},maxHeight:{type:Number,default:300},limitText:{type:Function,default:e=>`and ${e} more`},loading:{type:Boolean,default:!1},disabled:{type:Boolean,default:!1},spellcheck:{type:Boolean,default:!1},openDirection:{type:String,default:""},showNoOptions:{type:Boolean,default:!0},showNoResults:{type:Boolean,default:!0},tabindex:{type:Number,default:0},required:{type:Boolean,default:!1}},computed:{hasOptionGroup(){return this.groupValues&&this.groupLabel&&this.groupSelect},isSingleLabelVisible(){return(this.singleValue||this.singleValue===0)&&(!this.isOpen||!this.searchable)&&!this.visibleValues.length},isPlaceholderVisible(){return!this.internalValue.length&&(!this.searchable||!this.isOpen)},visibleValues(){return this.multiple?this.internalValue.slice(0,this.limit):[]},singleValue(){return this.internalValue[0]},deselectLabelText(){return this.showLabels?this.deselectLabel:""},deselectGroupLabelText(){return this.showLabels?this.deselectGroupLabel:""},selectLabelText(){return this.showLabels?this.selectLabel:""},selectGroupLabelText(){return this.showLabels?this.selectGroupLabel:""},selectedLabelText(){return this.showLabels?this.selectedLabel:""},inputStyle(){return this.searchable||this.multiple&&this.modelValue&&this.modelValue.length?this.isOpen?{width:"100%"}:{width:"0",position:"absolute",padding:"0"}:""},contentStyle(){return this.options.length?{display:"inline-block"}:{display:"block"}},isAbove(){return this.openDirection==="above"||this.openDirection==="top"?!0:this.openDirection==="below"||this.openDirection==="bottom"?!1:this.preferredOpenDirection==="above"},showSearchInput(){return this.searchable&&(this.hasSingleSelectedSlot&&(this.visibleSingleValue||this.visibleSingleValue===0)?this.isOpen:!0)},isRequired(){return this.required===!1?!1:this.internalValue.length<=0}}};const M=["tabindex","aria-expanded","aria-owns","aria-activedescendant"],N={ref:"tags",class:"multiselect__tags"},T={class:"multiselect__tags-wrap"},D=["textContent"],C=["onKeypress","onMousedown"],H=["textContent"],A={class:"multiselect__spinner"},K=["name","id","spellcheck","placeholder","required","value","disabled","tabindex","aria-label","aria-controls"],F=["id","aria-multiselectable"],P={key:0},G={class:"multiselect__option"},R=["aria-selected","id","role"],q=["onClick","onMouseenter","data-select","data-selected","data-deselect"],z=["data-select","data-deselect","onMouseenter","onMousedown"],j={class:"multiselect__option"},I={class:"multiselect__option"};function U(e,i,l,n,a,r){return t.openBlock(),t.createElementBlock("div",{tabindex:e.searchable?-1:l.tabindex,class:t.normalizeClass([{"multiselect--active":e.isOpen,"multiselect--disabled":l.disabled,"multiselect--above":r.isAbove,"multiselect--has-options-group":r.hasOptionGroup},"multiselect"]),onFocus:i[14]||(i[14]=s=>e.activate()),onBlur:i[15]||(i[15]=s=>e.searchable?!1:e.deactivate()),onKeydown:[i[16]||(i[16]=t.withKeys(t.withModifiers(s=>e.pointerForward(),["self","prevent"]),["down"])),i[17]||(i[17]=t.withKeys(t.withModifiers(s=>e.pointerBackward(),["self","prevent"]),["up"]))],onKeypress:i[18]||(i[18]=t.withKeys(t.withModifiers(s=>e.addPointerElement(s),["stop","self"]),["enter","tab"])),onKeyup:i[19]||(i[19]=t.withKeys(s=>e.deactivate(),["esc"])),role:"combobox","aria-expanded":e.isOpen,"aria-owns":"listbox-"+e.id,"aria-activedescendant":e.isOpen&&e.pointer!==null?e.id+"-"+e.pointer:null},[t.renderSlot(e.$slots,"caret",{toggle:e.toggle},()=>[t.createElementVNode("div",{onMousedown:i[0]||(i[0]=t.withModifiers(s=>e.toggle(),["prevent","stop"])),class:"multiselect__select"},null,32)]),t.renderSlot(e.$slots,"clear",{search:e.search}),t.createElementVNode("div",N,[t.renderSlot(e.$slots,"selection",{search:e.search,remove:e.removeElement,values:r.visibleValues,isOpen:e.isOpen},()=>[t.withDirectives(t.createElementVNode("div",T,[(t.openBlock(!0),t.createElementBlock(t.Fragment,null,t.renderList(r.visibleValues,(s,h)=>t.renderSlot(e.$slots,"tag",{option:s,search:e.search,remove:e.removeElement},()=>[(t.openBlock(),t.createElementBlock("span",{class:"multiselect__tag",key:h,onMousedown:i[1]||(i[1]=t.withModifiers(()=>{},["prevent"]))},[t.createElementVNode("span",{textContent:t.toDisplayString(e.getOptionLabel(s))},null,8,D),t.createElementVNode("i",{tabindex:"1",onKeypress:t.withKeys(t.withModifiers(p=>e.removeElement(s),["prevent"]),["enter"]),onMousedown:t.withModifiers(p=>e.removeElement(s),["prevent"]),class:"multiselect__tag-icon"},null,40,C)],32))])),256))],512),[[t.vShow,r.visibleValues.length>0]]),e.internalValue&&e.internalValue.length>l.limit?t.renderSlot(e.$slots,"limit",{key:0},()=>[t.createElementVNode("strong",{class:"multiselect__strong",textContent:t.toDisplayString(l.limitText(e.internalValue.length-l.limit))},null,8,H)]):t.createCommentVNode("v-if",!0)]),t.createVNode(t.Transition,{name:"multiselect__loading"},{default:t.withCtx(()=>[t.renderSlot(e.$slots,"loading",{},()=>[t.withDirectives(t.createElementVNode("div",A,null,512),[[t.vShow,l.loading]])])]),_:3}),e.searchable?(t.openBlock(),t.createElementBlock("input",{key:0,ref:"search",name:l.name,id:e.id,type:"text",autocomplete:"off",spellcheck:l.spellcheck,placeholder:e.placeholder,required:r.isRequired,style:t.normalizeStyle(r.inputStyle),value:e.search,disabled:l.disabled,tabindex:l.tabindex,"aria-label":l.name+"-searchbox",onInput:i[2]||(i[2]=s=>e.updateSearch(s.target.value)),onFocus:i[3]||(i[3]=t.withModifiers(s=>e.activate(),["prevent"])),onBlur:i[4]||(i[4]=t.withModifiers(s=>e.deactivate(),["prevent"])),onKeyup:i[5]||(i[5]=t.withKeys(s=>e.deactivate(),["esc"])),onKeydown:[i[6]||(i[6]=t.withKeys(t.withModifiers(s=>e.pointerForward(),["prevent"]),["down"])),i[7]||(i[7]=t.withKeys(t.withModifiers(s=>e.pointerBackward(),["prevent"]),["up"])),i[9]||(i[9]=t.withKeys(t.withModifiers(s=>e.removeLastElement(),["stop"]),["delete"]))],onKeypress:i[8]||(i[8]=t.withKeys(t.withModifiers(s=>e.addPointerElement(s),["prevent","stop","self"]),["enter"])),class:"multiselect__input","aria-controls":"listbox-"+e.id},null,44,K)):t.createCommentVNode("v-if",!0),r.isSingleLabelVisible?(t.openBlock(),t.createElementBlock("span",{key:1,class:"multiselect__single",onMousedown:i[10]||(i[10]=t.withModifiers((...s)=>e.toggle&&e.toggle(...s),["prevent"]))},[t.renderSlot(e.$slots,"singleLabel",{option:r.singleValue},()=>[t.createTextVNode(t.toDisplayString(e.currentOptionLabel),1)])],32)):t.createCommentVNode("v-if",!0),r.isPlaceholderVisible?(t.openBlock(),t.createElementBlock("span",{key:2,class:"multiselect__placeholder",onMousedown:i[11]||(i[11]=t.withModifiers((...s)=>e.toggle&&e.toggle(...s),["prevent"]))},[t.renderSlot(e.$slots,"placeholder",{},()=>[t.createTextVNode(t.toDisplayString(e.placeholder),1)])],32)):t.createCommentVNode("v-if",!0)],512),t.createVNode(t.Transition,{name:"multiselect",persisted:""},{default:t.withCtx(()=>[t.withDirectives(t.createElementVNode("div",{class:"multiselect__content-wrapper",onFocus:i[12]||(i[12]=(...s)=>e.activate&&e.activate(...s)),tabindex:"-1",onMousedown:i[13]||(i[13]=t.withModifiers(()=>{},["prevent"])),style:t.normalizeStyle({maxHeight:e.optimizedHeight+"px"}),ref:"list"},[t.createElementVNode("ul",{class:"multiselect__content",style:t.normalizeStyle(r.contentStyle),role:"listbox",id:"listbox-"+e.id,"aria-multiselectable":e.multiple},[t.renderSlot(e.$slots,"beforeList"),e.multiple&&e.max===e.internalValue.length?(t.openBlock(),t.createElementBlock("li",P,[t.createElementVNode("span",G,[t.renderSlot(e.$slots,"maxElements",{},()=>[t.createTextVNode("Maximum of "+t.toDisplayString(e.max)+" options selected. First remove a selected option to select another.",1)])])])):t.createCommentVNode("v-if",!0),!e.max||e.internalValue.length<e.max?(t.openBlock(!0),t.createElementBlock(t.Fragment,{key:1},t.renderList(e.filteredOptions,(s,h)=>(t.openBlock(),t.createElementBlock("li",{class:"multiselect__element",key:h,"aria-selected":e.isSelected(s),id:e.id+"-"+h,role:s&&(s.$isLabel||s.$isDisabled)?null:"option"},[s&&(s.$isLabel||s.$isDisabled)?t.createCommentVNode("v-if",!0):(t.openBlock(),t.createElementBlock("span",{key:0,class:t.normalizeClass([e.optionHighlight(h,s),"multiselect__option"]),onClick:t.withModifiers(p=>e.select(s),["stop"]),onMouseenter:t.withModifiers(p=>e.pointerSet(h),["self"]),"data-select":s&&s.isTag?e.tagPlaceholder:r.selectLabelText,"data-selected":r.selectedLabelText,"data-deselect":r.deselectLabelText},[t.renderSlot(e.$slots,"option",{option:s,search:e.search,index:h},()=>[t.createElementVNode("span",null,t.toDisplayString(e.getOptionLabel(s)),1)])],42,q)),s&&(s.$isLabel||s.$isDisabled)?(t.openBlock(),t.createElementBlock("span",{key:1,"data-select":e.groupSelect&&r.selectGroupLabelText,"data-deselect":e.groupSelect&&r.deselectGroupLabelText,class:t.normalizeClass([e.groupHighlight(h,s),"multiselect__option"]),onMouseenter:t.withModifiers(p=>e.groupSelect&&e.pointerSet(h),["self"]),onMousedown:t.withModifiers(p=>e.selectGroup(s),["prevent"])},[t.renderSlot(e.$slots,"option",{option:s,search:e.search,index:h},()=>[t.createElementVNode("span",null,t.toDisplayString(e.getOptionLabel(s)),1)])],42,z)):t.createCommentVNode("v-if",!0)],8,R))),128)):t.createCommentVNode("v-if",!0),t.withDirectives(t.createElementVNode("li",null,[t.createElementVNode("span",j,[t.renderSlot(e.$slots,"noResult",{search:e.search},()=>[i[20]||(i[20]=t.createTextVNode("No elements found. Consider changing the search query."))])])],512),[[t.vShow,l.showNoResults&&e.filteredOptions.length===0&&e.search&&!l.loading]]),t.withDirectives(t.createElementVNode("li",null,[t.createElementVNode("span",I,[t.renderSlot(e.$slots,"noOptions",{},()=>[i[21]||(i[21]=t.createTextVNode("List is empty."))])])],512),[[t.vShow,l.showNoOptions&&(e.options.length===0||r.hasOptionGroup===!0&&e.filteredOptions.length===0)&&!e.search&&!l.loading]]),t.renderSlot(e.$slots,"afterList")],12,F)],36),[[t.vShow,e.isOpen]])]),_:3})],42,M)}V.render=U;const J=["innerHTML"],Q=["innerHTML"],W={key:0,class:"multiselect__selection"},X=["innerHTML"],Y=["innerHTML"];return{__name:"FahadSelect",props:{modelValue:Object,searchRoute:{type:String,required:!0},multiple:{type:Boolean,default:!1},param:{type:[Object,Boolean],default:!1},placeholder:{type:String,default:"Select an option"},label:{type:String,default:"name"}},emits:["update:modelValue","triggerChange","reload"],setup(e,{expose:i,emit:l}){const n=o=>(console.log("Rendering option:",{option:o,html:o.html,label:o[a.label],result:o.html||`<span>${o[a.label]}</span>`}),o.html||`<span>${o[a.label]}</span>`),a=e,r=l,s=t.ref([]),h=t.ref(!1),p=t.ref(a.modelValue||[]);t.watch(p,o=>{r("update:modelValue",o),r("triggerChange",o)}),t.onMounted(()=>{g("")});const g=async o=>{h.value=!0;try{const u=await c.get(route(a.searchRoute),{params:{query_:o,param:a.param}});s.value=u.data.results.map(d=>({id:d.id,html:d.html||`<span>${d[a.label]}</span>`}))}catch(u){console.error(u)}finally{h.value=!1}},w=async()=>{await t.nextTick(),await g(""),p.value=null};i({reload:w}),r("reload",w);const Z=O.debounce(o=>{g(o)},300),x=o=>{var u;((u=p.value)==null?void 0:u.name)!==o&&Z(o)};return(o,u)=>(t.openBlock(),t.createElementBlock("div",null,[t.createVNode(t.unref(V),{modelValue:p.value,"onUpdate:modelValue":u[0]||(u[0]=d=>p.value=d),options:s.value,"track-by":"id",onSearchChange:x,label:e.label,placeholder:e.placeholder,loading:h.value,multiple:e.multiple,"custom-label":n},{option:t.withCtx(({option:d})=>[t.createElementVNode("div",{innerHTML:n(d)},null,8,J)]),singleLabel:t.withCtx(({option:d})=>[t.createElementVNode("span",{innerHTML:n(d)},null,8,Q)]),selection:t.withCtx(({values:d,isOpen:S})=>[d.length&&!S?(t.openBlock(),t.createElementBlock("span",W,[(t.openBlock(!0),t.createElementBlock(t.Fragment,null,t.renderList(d,b=>(t.openBlock(),t.createElementBlock("span",{key:b.id,innerHTML:n(b),class:"multiselect__tag"},null,8,X))),128))])):t.createCommentVNode("",!0)]),tag:t.withCtx(({option:d,handleTagRemove:S,disabled:b})=>[t.createElementVNode("span",{innerHTML:n(d)},null,8,Y)]),_:1},8,["modelValue","options","label","placeholder","loading","multiple"])]))}}});
