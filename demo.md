title: vue 组件详解
speaker: 杨国超
url:
transition: slide3
files: /js/demo.js,/css/demo.css,/js/zoom.js
theme: moon
usemathjax: yes


[slide]
# 组件与复用
## 为什么使用组件
----

在正式介绍组件之前,我们先看一个简单的场景
----
![](https://i.imgur.com/mcZcUFA.png)


[slide]
## 场景介绍
----
* 右上角的关闭框,输入框,发送按钮,没什么难的 {:&.rollIn}
* 需求升级了,然后这个输入框要在所有的产品线上使用.
* 产品快要上线了,产品经理说所有的输入框的地方要改成支持回车键提交,好吧,给我一天的时间,我一个一个加上去.
* 上面的需求变态,业务中很常见.其实是一些控件,JS能力的复用.
* vue.js的组件就是提高复用性,让代码可复用.学习完组件后,上面的问题就可以分分钟搞定,再也不用怕产品经理的变态需求了.

[slide]
## 场景代码

    ```
	     <Card style="width: 350px">
            <p slot="title">与XXX聊天</p>
            <a href="#" slot="extra">
                <Icon type="android-close" size="18"></Icon>
            </a>
            <div style="height:100px">

            </div>
            <div>
                <Row :gutter="16">
                    <i-col span="17">
                        <i-input v-model="value" placeholder="请输入....."></i-input>
                    </i-col>
                    <i-col span="4">
                        <i-button type="primary" icon="paper-airplane">发送</i-button>
                    </i-col>
                </Row>
            </div>
        </Card>
	
	```
<small>代码中的自定义标签就是组件,每个标签代表一个组件,在任何使用Vue的地方都可以直接使用.</small> {:&.rollIn}
[slide]

# 组件的用法
----
```
<div id="app">
	<my-component></my-component>
</div>
<script>
Vue.component('my-component',{
	template:'<div>这里是组件内容</div>'
})

var app = new Vue({
	el:'#app'
})
</script>
```



[slide]

##注意几点:
----
*  要在父实例中使用这个组件,必须在实例创建前注册  {:&.rollIn}
*  组件命名推荐使用小写加减号的形式命名
* template方法下面的DOM结构必须被一个元素包含,如果直接写成"这里是组件内容"是不被渲染的.
* 除了template以外,组件还可以像Vue实例那样使用其他选项,比如data,computed,methods等.但是用data的时候和实例稍有区别.data必须是函数.然后数据return 出去.要不会报错.


[slide]
## 使用props数据传递
----


1. 组件不仅要把模板的内容进行复用,重要的是组件间要通讯. {:&.rollIn}
2. 通常是父组件的模板中包含子组件,父组件要正向的向子组件传递数据或者参数
3. 子组件收到后根据不同的参数渲染不同的内容或者执行操作.这个数据传递用props.


[slide style="background-image:url('/img/bg1.png')"]

## 代码

```
    <div id="app">
        <my-child msg='用心学习vue.js'></my-child>
    </div>
<script type="text/javascript">
    Vue.component('my-child',{
        props:['msg'],
        template:"<div>{{msg}}</div>"
    });
    var vm = new Vue({
        el:"#app"
    });
</script>
```

[slide]
----
大部分时候传递的数据是动态的,是来自父级的动态数据,可以用v-bind指令动态绑定props的值,父组件数据变化时传递给子组件.
----
```
    <div id="app">
		<input v-model="message">	
        <my-child :msg='message'></my-child>
    </div>
<script type="text/javascript">
    Vue.component('my-child',{
        props:['msg'],
        template:"<div>{{msg}}</div>"
    });
    var vm = new Vue({
        el:"#app",
		data:{
			message:'hello Vue'
		}
    });
</script>
```
 {:&.rollIn}
[slide]
----
### 注意: ###
* 如果传递的数字,布尔值,数组,对象,而且不适用v-bind,传递的紧紧是字符串.  {:&.rollIn}
```
    <div id="app">	
        <my-child msg='[1,2,3]'></my-child>
		<my-child :msg='[1,2,3]'></my-child>
    </div>
	<script type="text/javascript">
	    Vue.component('my-child',{
	        props:['msg'],
	        template:"<div>{{msg.length}}</div>"
	    });
	    var vm = new Vue({
	        el:"#app"
	    });
	</script>
```

[slide]

## 单向数据流
----
vue2.0通过props传递的数据时单向的,也就是父组件数据变化会传递给子组件,但是反过来不行,之所以这样设计,是尽可能的父子组件解耦,避免子组件无意修改父组件的状态.

[slide]
### 业务中两种需要改变props数据的情况: ###
----
1. 父组件的值传递到子组件,子组件将值保存下来,在自己的作用域下可以随意修改和使用,在data中声明数据,引用父组件的props,代码如下: {:&.rollIn}

```
    <div id="app">	
		<my-child :init-count='1'></my-child>
    </div>
	<script type="text/javascript">
	    Vue.component('my-child',{
	        props:['initCount'],
	        template:"<div>{{count}}</div>",
			data:function(){
				return {
					count:this.initCount
				}
			}
	    });
	    var vm = new Vue({
	        el:"#app"
	    });
	</script>

```
[slide]
2.prop作为需要被转变的原始值传入,这种情况用计算属性就好了.代码: {:&.rollIn}

```
    <div id="app">	
		<my-child :width='100'></my-child>
    </div>
	<script type="text/javascript">
	    Vue.component('my-child',{
	        props:['width'],
	        template:"<div :style='style'></div>",
			computed:{
				style:function(){
					return {
						width:this.width+"px"
					}
				}
			}
	    });
	    var vm = new Vue({
	        el:"#app"
	    });
	</script>

```

 ### 注意: ###
js的引用类型,指向统一内存空间,所以props是引用类型时,子组件内的数据改变会影响父组件的数据变化.

[slide]
## props的数据验证
一般你的组件需要提供给别人用时,推荐使用props的数据验证,比如某个数据必须数字类型,如果传入字符串会警告:
```
    <div id="app">	
		<my-child :width='100'></my-child>
    </div>
	<script type="text/javascript">
    Vue.component('my-child',{
        props:{
            width:{
                type:Number,
                require:true
            }
        },
        template:"<div :style='style'></div>",
        computed:{
            style:function(){
                return {
                    width:this.width+"px",
                    backgroundColor:"red",
                    height:this.width+"px"
                }
            }
        }
    });
    var vm = new Vue({
        el:"#app",
        data:{
            aaa:100
        }
    });
	</script>

```

[slide]
## 组件通讯
-----
父组件向子组件通信,通过props传递,但是VUE的组件通信不止这一种.
1. 兄弟组件通信 {:&.rollIn}
2. 跨级组件通信
3. $emit()来触发事件$on()来监听子组件事件

### 自定义事件 ###
子组件向父组件传递数据时用到自定义事件.v-on除了监听自定义事件以外,还可以用于组件之间的自定义事件.
如果了解过JS的设计模式--观察者模式,vue也有一套类似的模式,子组件用$emit()来触发事件,父组件用$on()来监听子组件事件.
代码见自定义事件.

[slide]
## 使用v-model ##
vue2.x 可以在自定义组件是使用v-model指令,是语法糖.
实际是:
```
<input
  v-bind:value="something"
  v-on:input="something = arguments[0]">
```
[slide]
## 非父子组件通信 ##
1. 兄弟组件  {:&.rollIn}
2. 跨级组件
3. 中央事件总线(bus)

* 在vue2.x中,使用一个空的Vue实例作为中央事件总线(bus),也就是中介.详见bus demo {:&.rollIn}
* 在业务中,特别是协同开发中,非常有用,组件化开发中用来统一管理组件之间的数据传递.很方便.

[slide]

### 父链this.$parent

在子组件中,this,$parent可以直接访问该组件的父实例或者组件,父组件也可以通过this.$children访问所有的子组件.

但是在业务中,子组件要避免修改父组件的数据,这样会使父子组件紧耦合,只看父组件,很难理解父组件的状态,因为他可能会被任意组件修改.父组件最好还用props和$emit进行通信

[slide]
### 子组件索引 ###
当子组件比较多时,this.$chidren来一遍遍的遍历出我们需要的组件实例是困难的,Vue提供李了组件索引的方法,用特殊的属性ref来为子组件指定一个索引名称.
子组件的标签上使用ref指定一个名称,在父组件用this.$refs来访问指定的子组件.
用在普通的DOM元素上,引用指向DOM元素,如果在组件上,引用指向组件实例.

[slide]

### 代码实例: ###
```
<div id="app">
    <p ref="p">{{parentData}}</p>
    <button @click="handleEvent">我是父组件</button>
    <my-child ref="myChild"></my-child>
</div>
<script type="text/javascript">
    Vue.component('my-child',{
        template:"<button>{{childData}}</button>",
        data:function(){
            return {
                childData : "我是my-child组件"
            }
        }
    });
    var vm = new Vue({
        el:"#app",
        data:{
            parentData:"我是parentData"
        },
        methods:{
            handleEvent:function(){
                console.log(this.$refs.myChild.childData);
                console.log(this.$refs.p);
                console.log(this.$children[0].childData);
//                this.$children[0].childData = "hahah";
//                this.$refs.myChild.childData = "哈哈哈哈"
            }
        }
    });

```

[slide]

注意:
- $ref在组件渲染完成后才填充,在组件声明周期的并且他是非响应式的.  {:&.rollIn}
- 计算属性在created阶段之后mounted之前执行。
- $refs的项在mounted之后才存在。
- 紧紧作为访问子组件的应急方案,应避免在模板(差值语法)或计算属性中使用$refs


[slide]
## 后面安排
----

slot分发,异步组件,动态组件,递归组件,内联模板.
