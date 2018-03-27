/**
 * Created by ryf on 2018/1/27.
 */
Vue.component('tabs',{
    template:'\
        <div class="tabs">\
            <div class="tabs-bar">\
                <div v-for="(item,index) in navList"\
                    :class="tabCls(item)"\
                    @click="handleChange(index)">\
                    {{item.label}}\
                    <span v-show="item.closeable" @click="deleteTab(index)">X</span>\
                </div>\
            </div>\
            <div class="tabs-content">\
                <slot></slot>\
            </div>\
        </div>',
    props:{
        value:{
            type:[String,Number]
        }
    },
    data:function(){
        return {
            currentValue:this.value,
            navList:[]
        }
    },
    methods:{
        tabCls:function(item){
            return [
                'tabs-tab',
                {
                    'tabs-tab-active':item.name === this.currentValue
                }
            ]
        },
        getTabs:function(){

            return this.$children.filter(function(item){
                //console.log(item.$options.name);
                return item.$options.name === 'pane'
            });
        },
        updateNav:function(){
            this.navList = [];
            var _this = this;

            this.getTabs().forEach(function(pane,index){
                _this.navList.push({
                    label:pane.label,
                    name:pane.name || index,
                    closeable:pane.closeable||false
                })
                if(!pane.name)pane.name = index;
                if(index === 0){
                    if(!_this.currentValue){
                        _this.currentValue = pane.name || index;
                    }
                }
            });
            console.log(_this.navList);
            this.updateStatus();
        },
        updateStatus:function(){
          var tabs = this.getTabs() ;
          var _this = this;
            tabs.forEach(function(tab){
                return tab.show = tab.name === _this.currentValue
            })
        },
        deleteTab:function(index){
            var tabs = this.getTabs() ;
            this.navList.splice(index,1);
            if(index ==  this.navList.length-1){
                handleChange(index -1);
            }else{
                handleChange(index +1);
            }
        },
        handleChange:function(index){
            var nav = this.navList[index];
            var name = nav.name;
            this.currentValue = name;
            this.$emit('input',name);
            this.$emit('on-click',name);
            //this.$emit('a',name);
        }
    },
    watch:{
        value:function(val){
            //console.log('chufalalal');
            this.currentValue = val;
        },
        currentValue:function(){
            //console.log('chufalalal');
            this.updateStatus()
        }
    }

})