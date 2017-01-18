<template>
	<div id="app">
		<router-view></router-view>
	</div>
</template>

<script>

	export default {
		name: 'app',
		components: {
		},
		created: function () {
			// this.$router.replace('/login')
		}
	}
</script>

<style>
	@import "../../node_modules/font-awesome/css/font-awesome.min.css";
	@import "../../node_modules/flex.css/dist/flex.css";

	body {
		margin: 0px;
		padding: 0px;
		background: #1F2D3D;
		font-family: Helvetica Neue, Helvetica, PingFang SC, Hiragino Sans GB, Microsoft YaHei, SimSun, sans-serif;
		font-weight: 400;
		-webkit-font-smoothing: antialiased;
	}

	#app {
		position: absolute;
		top: 0px;
		bottom: 0px;
		width: 100%;
	}

	.el-submenu [class^=fa] {
		vertical-align: baseline;
		margin-right: 10px;
	}

	.el-menu-item [class^=fa] {
		vertical-align: baseline;
		margin-right: 10px;
	}
</style>
