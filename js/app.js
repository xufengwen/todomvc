(function (window) {
	'use strict';
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
			hash:{
				completed:'',
				status:'all'
			},
		},
		computed:{
			nowTodo(){
				var arr=this.tasks.filter(item=>!item.completed);
				return arr.length;
			}
		},
		methods:{
			show(i){
				if(this.hash.completed===''){
					return true;
				}else if(this.hash.completed===i){
					return true;
				}else{
					return false;
				}
			},
			clearCompleted(){
				this.tasks=this.tasks.filter(item=>!item.completed);
				storage.setStorage(this.tasks);
			},
			deleteOne(id){
				this.tasks=this.tasks.filter(item=>item.id!=id);
				storage.setStorage(this.tasks);
			},
			toggleOne(id){
				var item=this.tasks.find(item=>item.id==id);
				item.completed=!item.completed;
				storage.setStorage(this.tasks);
			},
			toggleAll(){
				this.tasks.map(item=>item.completed=this.status);
				this.status=!this.status
				storage.setStorage(this.tasks);
			},
			edit(id){
				this.flag=-1;
				storage.setStorage(this.tasks);
			},
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
	});
	
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
	};
	
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

	// Your starting point. Enjoy the ride!

})(window);
