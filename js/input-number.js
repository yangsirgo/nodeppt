Vue.component('input-number',{
    template:'<div>\
    <input type="text" :value="msg" @change="handlerChange" @keyup.up="clickadd" @keyup.down="clickjian" >\
    <button @click="clickadd">+</button>\
    <button @click="clickjian">-</button>\
    </div>',
    props:{
        step:Number,
        value:Number,
        min:Number,
        max:Number
    },
    data:function(){
        return{
            msg:this.value
        }
    },
    methods:{
        clickadd:function(){
            if(this.min<=this.msg&&this.msg<this.max){
                this.msg+=this.step;
            }else{
                return;
            }

        },
        clickjian:function(){
            if(this.min<this.msg&&this.msg<=this.max){
                this.msg-=this.step;
            }else{
                return;
            }
        },
        handlerChange:function(e){
            this.msg = Number(e.target.value);
        }
    },
    watch:{
        msg:function(n){
            this.$emit('input',n);
            //this.$emit('on-change',n);
        },
        value:function(val){
            this.msg = val
        }
    }
})