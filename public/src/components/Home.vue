<template>
	<el-row class="panel">
		<!--顶部导航栏-->
		<el-col :span="24" class="panel-top">
			<el-col :span="20">
                <span class="logo-txt">Vue<i>ADMIN</i><a href="http://element.eleme.io" target="_blank">(by ElementUI)</a></span>
			</el-col>
			<el-col :span="4">
				<el-tooltip class="item tip-logout" effect="dark" content="退出" placement="bottom">
					<i class="fa fa-sign-out" aria-hidden="true" v-on:click="logout"></i>
				</el-tooltip>
			</el-col>
		</el-col>
		<!--顶部导航栏END-->
		<el-col :span="24" class="panel-center">
			<!--左侧导航菜单-->
			<aside class="left-aside">
				<!--<h5 class="admin"><i class="fa fa-user" aria-hidden="true"></i>欢迎系统管理员</h5>-->
				<el-menu :default-active="$route.path" :default-openeds="openedArr" class="aside-menu" @open="handleopen"
					@close="handleclose" @select="handleselect" theme="dark" unique-opened router>
					<!--通过循环构造右侧菜单-->
					<template v-for="(item,index) in $router.options.routes" v-if="!item.hidden">
						<!--对于非单个菜单的-->
						<el-submenu :index="index+''" v-if="!item.leaf">
							<!--标题-->
							<template slot="title"><i :class="item.iconCls"></i>{{item.name}}</template>
							<!--内嵌菜单-->
							<el-menu-item v-for="child in item.children" v-if="!child.hidden" :index="child.path">{{child.name}}</el-menu-item>
						</el-submenu>
						<!--单个菜单-->
						<el-menu-item v-if="item.leaf&&item.children.length>0" :index="item.children[0].path"><i :class="item.iconCls"></i>{{item.children[0].name}}</el-menu-item>
					</template>
				</el-menu>
			</aside>
			<!--左侧导航菜单END-->
			<!--右侧内容-->
			<section class="panel-c-c">
				<div class="grid-content bg-purple-light">
					<!--右侧顶部面包屑-->
					<el-col :span="24" class="panel-inner-top">
						<strong>{{$route.name}}</strong>
						<el-breadcrumb separator="/" class="bread-crumb">
							<el-breadcrumb-item :to="{ path: '/' }" v-if="$route.path!='/'">首页</el-breadcrumb-item>
							<el-breadcrumb-item v-if="$route.path!='/'">{{$route.matched[0].name}}</el-breadcrumb-item>
							<el-breadcrumb-item>{{$route.name}}</el-breadcrumb-item>
						</el-breadcrumb>
					</el-col>
					<!--右侧顶部面包屑END-->
					<el-col :span="24" class="panel-inner-bottom">
						<!--路由视图-->
						<router-view></router-view>
					</el-col>
				</div>
			</section>
			<!--右侧内容END-->
		</el-col>
	</el-row>
</template>

<script>
  export default {
    data() {
        return {
            openedArr:[],
            currentPath:''
        }
    },
	watch: {
		'$route' (to, from) {//监听路由改变
            if(to.path == '/'){
                this.openedArr = [];
            }
		}
	},
    methods: {
		onSubmit() {
			// console.log('submit!');
		},
		handleopen(){
			// console.log('handleopen');
		},
		handleclose(){
			// console.log('handleclose');
		},
		handleselect:function(a,b){
		},
		logout:function(){
			var _this=this;
			this.$confirm('确认退出吗?', '提示', {
				type: 'warning'
			}).then(() => {
				_this.$router.replace('/login');
			}).catch(() => {
			});
		}
    }
  }
</script>

<style lang="scss" scoped>
	.panel {
		position: absolute;
		top: 0px;
		bottom: 0px;
		width: 100%;
	}
	.panel-top {
		height: 60px;
		line-height: 60px;
		background: #1F2D3D;
		color: #c0ccda;
	}
	.panel-center {
		background: #324057;
		position: absolute;
		top: 60px;
		bottom: 0px;
		overflow: hidden;
	}
    .logo-txt{
        margin-left:10px;
        font-size:20px;
        i{
            color:#20a0ff;
            font-style:normal;
        }
        a{
            font-size:14px;
            margin-left:5px;
            color:#fff;
            text-decoration:none;
            &:hover{
                color:#ddd;
            }
        }
    }
    .left-aside{
        width:230px;
        .aside-menu{
        }
    }
	.panel-c-c {
		background: #f1f2f7;
		position: absolute;
		right: 0px;
		top: 0px;
		bottom: 0px;
		left: 230px;
		overflow-y: scroll;
		padding: 20px;
        .panel-inner-top{
            margin-bottom:15px;
            .bread-crumb{
                height:22px;
                line-height:22px;
                float:right;
            }
            strong{
                width:200px;
                float:left;
                color: #475669;
            }
        }
        .panel-inner-bottom{
            background-color:#fff;
            box-sizing: border-box;
            padding:15px;
        }
	}
	.logout {
		// background: url(../assets/logout_36.png);
		background-size: contain;
		width: 20px;
		height: 20px;
		float: left;
	}
	.logo {
		width: 40px;
		float: left;
		margin: 10px 10px 10px 18px;
	}
	.tip-logout {
		float: right;
		margin-right: 20px;
		padding-top: 5px;
	}
	.tip-logout i {
		cursor: pointer;
	}
	.admin {
		color: #c0ccda;
        margin-left:20px;
        i{
            margin-right:5px;
        }
	}
</style>
