<template>
  
    <div class="manage">
        <el-dialog :title="operateType === 'add'? '新增' : '更新'"
        :visible.sync="dialogVisible">
            <common-form :formLabel="operateFormLabel" :form="operateForm"></common-form>
              <div slot="footer" class="dialog-footer">
                <el-button @click="dialogVisible = false">取 消</el-button>
                <el-button type="primary" @click="comfirm">确 定</el-button>
            </div>
        </el-dialog>
        <div class="manage-header">
            <el-button type="primary" @click="addUser">+新增</el-button>
            <common-form inline 
            :formLabel="formLabel"
            :form="searchForm">
             <el-button type="primary" v-model="searchForm.keyword" 
             @click="searchUser">搜索
             </el-button>
            </common-form>
           
        </div>

            <common-table 
            :tableData="tableData" 
            :tableLabel="tableLabel"
            :config="config"
            @changePage="getlist"
            @edit="editUser"
            @delete="deleteUser">
            </common-table>
    </div>

</template>

<script>
import CommonForm from '../../components/CommonForm.vue'
import CommonTable from '../../components/CommonTable.vue'
export default {
    components: {
        CommonForm, CommonTable
    },
    data: function() {
        return {
            dialogVisible: false,
            operateType: 'add',
            keyword: '',
            operateForm: {
                id: '',
                name: '',
                addr: '',
                age: '',
                birth: '',
                sex: ''
            },
            operateFormLabel: [
                {
                    model: 'name',
                    label: '姓名'
                },
                {
                    model: 'age',
                    label: '年龄'
                },
                {
                    model: 'sex',
                    label: '性别',
                    opts: 
                    [
                        {
                            label: '男',
                            value: 1
                        },
                        {
                            label: '女',
                            value: 0
                        }
                    ],
                    type: 'select'
                },
                {
                    model: 'birth',
                    label: '出生日期',
                    type: 'date'
                },
                {
                    model: 'addr',
                    label: '地址'
                },
            ],
            tableData: [],
            tableLabel: [
                {
                    prop: 'name',
                    label: '姓名',
                },
                {
                    prop: 'age',
                    label: '年龄',
                },
                {
                    prop: 'sexLabel',
                    label: '性别',
                },
                {
                    prop: 'birth',
                    label: '出生日期',
                    width: 200
                },   
                {
                    prop: 'addr',
                    label: '地址',
                    width: 320
                },                             
            ],
            config: {
                page: 1,
                total: 30,
                pagesize: 10,
                loading: false
            },
            searchForm: {
                keyword: ''
            },

            formLabel: [
                {
                    model: 'keyword',
                    label: ''
                }
            ],


        }
    },
    methods: {
        getlist() {
            this.config.loading = true;
            this.$http.get('/api/user/getUser', {
                params: {
                    page: this.config.page,
                    keyword: this.searchForm.keyword
                }
            }).then(res => {
                this.tableData = res.data.list.map(item=> {
                    item.sexLabel = item.sex == 0 ? '女' : '男'
                    return item;
                })
                this.config.total = res.data.count;
                this.config.loading = false;
                this.config.pagesize = 20
            })
        },
        searchUser() {
            this.getlist();
        },
        editUser(row) {
            
            for(let key in this.operateForm) {
                this.operateForm[key] = row[key]
            }
            this.operateType = 'edit';
            this.dialogVisible = true;
        },
        addUser(row) {
            this.operateType = 'add';
            this.dialogVisible = true;
        },
        changePage(val) {
            
        },
        comfirm() {
            if(this.operateType === 'edit') {
               // console.log(this.operateForm)
                this.$http.post('/api/user/edit', this.operateForm).then(res =>{
                    //console.log()
                    this.dialogVisible = false;
                    this.getlist();
                })
            } else {
                this.$http.post('/api/user/add', this.operateForm).then(res => {
                    this.dialogVisible = false;
                    this.$message({
                        type: 'success',
                        message: '新增成功'
                    })
                    this.getlist();
                }).catch(res => {
                    this.$message({
                        type: 'info',
                        message: '新增失败'
                    });    
                })
            }
        },
        deleteUser(row) {
                this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
                    let id = row.id;
                    this.$http.get('/api/user/del', {
                        params: {
                            id: id
                        }
                    }).then(res => {
                        this.$message({
                            type: 'success',
                            message: '删除成功!'
                        });
                    })
                    this.getlist();
                }).catch(() => {
                    this.$message({
                        type: 'info',
                        message: '已取消删除'
                    });          
                });
            
        }
    },
    mounted() {
        this.getlist();
    }
}
</script>

<style lang="scss" scoped>
@import '../../assets/scss/common.scss';
</style>