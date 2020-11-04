# TodoMVC App Template

###功能描述
1、添加任务
2、展示任务
3、切换任务完成状态
4、批量切换任务完成状态
5、批量展示对应任务状态
   +路由选择
6、清除已完成任务
7、本地存储数据
8、编辑任务
9、删除任务
10、显示/隐藏清除按钮
11、未完成任务数量
###功能完成列表
1、添加任务：.new-todo中的enter事件；
2、展示任务：根据本地存储实时渲染
3、切换任务完成状态:".todo-list">li点击事件
4、批量切换任务完成状态:".toggle-all"点击事件
5、批量展示对应任务状态：根据本地存储实时渲染；
6、清除已完成任务：".clear-completed"点击事件
7、本地存储数据：window.localstorge.setItem();
8、编辑任务:".view>label"双击给".todo-list">li添加类名"editing"
9、删除任务:".destroy"点击事件
10、显示/隐藏清除按钮：根据本地存储实时渲染；
11、未完成任务数量：根据本地存储实时渲染；
###1、本地存储数据
```js
window.storage={
	getLocalstorge(){
		return JSON.parse(window.localStorage.getItem('todos')||'[]');
	},
	setStorage(json){
		window.localStorage.setItem('todos',JSON.stringify(json));
	}
}
window.app=new Vue({
	el:'.todoapp',
	data:{
			tasks:storage.getLocalstorge(),
			flag:-1,
			text:'',
			status:true,
		},
})
```
```html
<li v-for="task in tasks" :key="task.id" :class="{completed:task.completed,editing:flag==task.id}">
	<div class="view">
		<input class="toggle" type="checkbox" @click="toggleOne(task.id)" v-model="">
		<label v-text="task.title" @dblclick="flag=task.id"></label>
		<button class="destroy"></button>
	</div>
	<input class="edit" value="" @blur="edit(task.id)" @keyup.enter="edit(task.id)" v-model="task.title">
</li>
```
###2、展示任务：根据本地存储实时渲染
```html
<li v-for="task in tasks" :key="task.id" :class="{completed:task.completed,editing:flag==task.id}">
	<div class="view">
		<input class="toggle" type="checkbox" @click="toggleOne(task.id)" v-model="">
		<label v-text="task.title" @dblclick="flag=task.id"></label>
		<button class="destroy"></button>
	</div>
	<input class="edit" value="" @blur="edit(task.id)" @keyup.enter="edit(task.id)" v-model="task.title">
</li>
```
###3、添加任务
```js
methods:{
	addOne(){
		var obj={
		title:this.text,
		completed:false,
			id:new Date().getTime(),
		};
		this.tasks.push(obj);
		this.text="";
		storage.setStorage(this.tasks);
	}
}
})
```
```html
<input class="new-todo" placeholder="What needs to be done?" autofocus @keyup.enter="addOne" v-model="text">
<li v-for="task in tasks" :key="task.id" :class="{completed:task.completed,editing:flag==task.id}">
	<div class="view">
		<input class="toggle" type="checkbox" @click="toggleOne(task.id)" v-model="">
		<label v-text="task.title" @dblclick="flag=task.id"></label>
		<button class="destroy"></button>
	</div>
	<input class="edit" value="" @blur="edit(task.id)" @keyup.enter="edit(task.id)" v-model="task.title">
</li>
```
###4、切换任务完成状态
```js
toggleOne(id){
	var item=this.tasks.find(item=>item.id==id);
	item.completed=!item.completed;
	storage.setStorage(this.tasks);
},
```
###5、批量切换任务完成状态:".toggle-all"点击事件
```js
toggleAll(){
	this.tasks.map(item=>item.completed=this.status);
	this.status=!this.status
	storage.setStorage(this.tasks);
},
```
```html
<input id="toggle-all" class="toggle-all" type="checkbox">
<label for="toggle-all" @click="toggleAll">Mark all as complete</label>
```
###6、编辑任务
```js
edit(id){
				this.flag=-1;
				storage.setStorage(this.tasks);
			},
```
```html
<input class="edit" value="" @blur="edit(task.id)" @keyup.enter="edit(task.id)" v-model="task.title">
```
###7、删除任务:".destroy"点击事件
```js
deleteOne(id){
	this.tasks=this.tasks.filter(item=>item.id!=id);
	storage.setStorage(this.tasks);
},
```
```html
<button class="destroy" @click="deleteOne(task.id)"></button>
```
###8、显示/隐藏清除按钮：根据本地存储实时渲染
```js
computed:{
			nowTodo(){
				var arr=this.tasks.filter(item=>!item.completed);
				return arr.length;
			}
		},
```
```html
<span class="todo-count"><strong>{{nowTodo}}</strong> item left</span>
```
###9、清除已完成任务：".clear-completed"点击事件
```js
clearCompleted(){
				this.tasks=this.tasks.filter(item=>!item.completed);
				storage.setStorage(this.tasks);
			},
```
```html
<button class="clear-completed" @click="clearCompleted" v-if="nowTodo!=tasks.length">Clear completed</button>
```
###10、显示/隐藏清除按钮：根据本地存储实时渲染
```html
<button class="clear-completed" @click="clearCompleted" v-if="nowTodo!=tasks.length">Clear completed</button>
```
###11、批量展示对应任务状态
```js
show(i){
	if(this.hash.completed===''){
		return true;
	}else if(this.hash.completed===i){
		return true;
	}else{
		return false;
	}
},
window.onhashchange=function(){
	if(window.location.hash=='#/active'){
		app.hash.completed=false;
		app.hash.status='active';
	}else if(window.location.hash=='#/completed'){
		app.hash.completed=true;
		app.hash.status='completed';
	}else{
		app.hash.completed='';
		app.hash.status='all';
	}
}

//初始化就查地址栏显示对应的刷新页面之前的样子
if(window.location.hash=='#/active'){
	app.hash.completed=false;
	app.hash.status='active';
}else if(window.location.hash=='#/completed'){
	app.hash.completed=true;
	app.hash.status='completed';
}else{
	app.hash.completed='';
	app.hash.status='all';
}
```
```html
<li v-for="task in tasks" :key="task.id" 
	:class="{completed:task.completed,editing:flag==task.id}"
	v-if="show(task.completed)"
>
	<div class="view">
		<input class="toggle" type="checkbox" @click="toggleOne(task.id)" v-model="task.completed">
		<label v-text="task.title" @dblclick="flag=task.id"></label>
		<button class="destroy" @click="deleteOne(task.id)"></button>
	</div>
	<input class="edit" value="" @blur="edit(task.id)" @keyup.enter="edit(task.id)" v-model="task.title">
</li>
<ul class="filters">
	<li>
		<a :class="{selected:hash.status=='all'}" href="#/">All</a>
	</li>
	<li>
		<a :class="{selected:hash.status=='active'}" href="#/active">Active</a>
	</li>
	<li>
		<a :class="{selected:hash.status=='completed'}" href="#/completed">Completed</a>
	</li>
</ul>
```