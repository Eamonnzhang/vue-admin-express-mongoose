<template>
	<section>
		<!--工具条-->
		<el-col :span="24" class="toolbar">
			<el-form :inline="true" :model="formInline" class="demo-form-inline">
				<el-form-item>
					<el-input v-model="formInline.user" placeholder="姓名"></el-input>
				</el-form-item>
				<el-form-item>
					<el-button>查询</el-button>
				</el-form-item>
				<el-form-item>
					<el-button @click="handleAdd">新增</el-button>
				</el-form-item>
			</el-form>
		</el-col>

		<!--表格-->
		<template>
			<!--data按照指定数组格式传进来就会自动渲染表格数据-->
			<!--v-loading为真时，显示loading动画-->
			<el-table :data="tableData" highlight-current-row v-loading="listLoading" style="width: 100%;">
				<el-table-column type="index" width="80">
				</el-table-column>
				<el-table-column prop="name" label="姓名" width="180" sortable>
				</el-table-column>
				<el-table-column prop="sex" label="性别" width="100" :formatter="formatSex" sortable>
				</el-table-column>
				<el-table-column prop="age" label="年龄" width="100" sortable>
				</el-table-column>
				<el-table-column prop="birth" label="生日" width="180" :formatter="formatDate" sortable>
				</el-table-column>
				<el-table-column prop="addr" label="地址" sortable>
				</el-table-column>
				<el-table-column label="操作" width="100">
					<template scope="scope">
						<el-button type="text" size="small" @click="handleEdit(scope.row)">编辑</el-button>
						<el-button type="text" size="small" @click="handleDel(scope.row)">删除</el-button>
					</template>
				</el-table-column>
			</el-table>
		</template>

		<!--分页-->
		<el-col :span="24" class="toolbar" style="padding-bottom:10px;">
			<el-pagination
            @size-change="handleSizeChange"
            @current-change="handleCurrentChange"
            :current-page="currentPage"
            :page-sizes="[10, 20, 30, 40]"
            :page-size="currentPageSize"
            layout="total, sizes, prev, pager, next, jumper"
			:total="tableDataLength"
            style="float:right">
			</el-pagination>
		</el-col>

		<!--编辑模态框-->
		<!--el-dialog的v-model绑定一个boolean值，表示显示或者隐藏-->
		<el-dialog :title="editFormTtile" v-model="editFormVisible" :close-on-click-modal="true">
			<el-form :model="editForm" label-width="80px" :rules="editFormRules" ref="editForm">
				<el-form-item label="姓名" prop="name">
					<el-input v-model="editForm.name" auto-complete="off"></el-input>
				</el-form-item>
				<el-form-item label="性别">
					<!--el-radio-group的v-model对应其子元素的label值-->
					<el-radio-group v-model="editForm.sex">
						<el-radio class="radio" :label="1">男</el-radio>
						<el-radio class="radio" :label="0">女</el-radio>
					</el-radio-group>
				</el-form-item>
				<el-form-item label="年龄">
					<el-input-number v-model="editForm.age" :min="0" :max="200"></el-input-number>
				</el-form-item>
				<el-form-item label="生日">
					<el-date-picker type="date" placeholder="选择日期" v-model="editForm.birth"></el-date-picker>
				</el-form-item>
				<el-form-item label="地址">
					<el-input type="textarea" v-model="editForm.addr"></el-input>
				</el-form-item>
			</el-form>
			<div slot="footer" class="dialog-footer">
				<el-button @click="editFormVisible = false">取 消</el-button>
				<el-button type="primary" @click="editSubmit" :loading="editLoading">{{btnEditText}}</el-button>
			</div>
		</el-dialog>
	</section>
</template>

<script>
	import util from '../../common/util'
	import NProgress from 'nprogress'
    import axios from 'axios'
    import moment from 'moment'
    export default {
        data() {
            return {
                formInline: {
                    user: ''
                },
                editFormVisible:false,//编辑界面显是否显示
                editFormTtile:'编辑',//编辑界面标题
                //编辑界面数据
                editForm: {
                    _id:0,
                    name: '',
                    sex: -1,
                    age: 0,
                    birth: '',
                    addr: ''
                },
                editLoading:false,
                btnEditText:'提 交',
                editFormRules:{
                    name:[
                        { required: true, message: '请输入姓名', trigger: 'blur' }
                    ]
                },
                tableData:[],
                tableDataLength : 0,
                listLoading:false,
                currentPage:1,
                currentPageSize:10
            }
        },
        created:function(){
            this.getUserList();
        },
        methods: {
            //性别显示转换
            formatSex:function(row,column){
                return row.sex==1?'男':row.sex==0?'女':'未知';
            },
            //性别显示转换
            formatDate:function(row,column){
                return moment(row.birth).format('YYYY-MM-DD');
            },
            //删除记录
            handleDel:function(row){
                var _this=this;
                this.$confirm('确认删除该记录吗?', '提示', {
                    type: 'warning'
                }).then(() => {
                    _this.listLoading=true;
                    NProgress.start();
                    axios.delete(`/api/user/${row._id}`).then(function(res){
                        if(res.data.success){
                            _this.$message({
                                message:'删除成功',
                                type: 'success'
                            });
                            _this.listLoading=false;
                            NProgress.done();
                            _this.getUserList()
                        }else{
                            _this.$message({
                                message:'删除失败',
                                type: 'error'
                            });
                        }
                    })
                }).catch(() => {

                });
            },
            //显示编辑界面
            handleEdit:function(row){
                this.editFormVisible = true;
                this.editFormTtile = '编辑';
                this.editForm.id = row._id;
                this.editForm.name = row.name;
                this.editForm.sex = row.sex;
                this.editForm.age = row.age;
                this.editForm.birth = row.birth;
                this.editForm.addr = row.addr;
            },
            //编辑 or 新增
            editSubmit:function(){
                var _this=this;
                _this.$refs.editForm.validate((valid)=>{
                    if(valid){
                        _this.$confirm('确认提交吗？','提示',{}).then(()=>{
                            _this.editLoading=true;
                            NProgress.start();
                            _this.btnEditText='提交中';
                            var userData = {
                                name: _this.editForm.name,
                                sex: _this.editForm.sex,
                                age: _this.editForm.age,
                                birth: _this.editForm.birth==''?'':util.formatDate.format(new Date(_this.editForm.birth),'yyyy-MM-dd'),
                                addr: _this.editForm.addr
                            }
                            let url = _this.editForm.id?'/api/user/${_this.editForm.id}':'/api/user'
                            axios.post(url,userData).then(function(res){
                                if(res.data.success){
                                    _this.$message({
                                        message:'提交成功',
                                        type: 'success'
                                    });
                                    _this.editFormVisible = false;
                                    _this.getUserList()
                                }else{
                                     _this.$message({
                                        message:'提交失败',
                                        type: 'error'
                                    });
                                }
                                _this.btnEditText='提 交';
                                _this.editLoading=false;
                                NProgress.done();
                            })
                        });
                    }
                });

            },
            //显示新增界面
            handleAdd:function(){
                var _this=this;

                this.editFormVisible = true;
                this.editFormTtile = '新增';

                this.editForm.id = 0;
                this.editForm.name = '';
                this.editForm.sex = 1;
                this.editForm.age = 0;
                this.editForm.birth = '';
                this.editForm.addr = '';
            },
            //获取用户列表
            getUserList : function(){
                var vm = this;
                var params = {
                    limit : vm.$data.currentPageSize,
                    page : vm.$data.currentPage
                }
                axios.get('/api/user',{params:params}).then(function(res){
                    vm.$data.tableData = res.data.data;
                    vm.$data.tableDataLength = res.data.meta.count;
                })
            },
            handleSizeChange(val) {
                this.$data.currentPageSize = val;
                this.getUserList();
            },
            handleCurrentChange(val) {
                this.$data.currentPage = val;
                this.getUserList();
            }
        }
    }
</script>

<style lang="scss" scoped>
	.toolbar .el-form-item {
		margin-bottom: 10px;
	}
	.toolbar {
		background: #fff;
        padding-top:10px;
	}
</style>
