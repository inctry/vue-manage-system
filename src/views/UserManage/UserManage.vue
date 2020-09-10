<template>
  
    <div class="manage">
        <div class="manage-header">
            <el-button type="primary">+新增</el-button>
            <common-form inline 
            :formLabel="formLabel"
            :form="searchForm">
             <el-button type="primary">搜索</el-button>
            </common-form>
           
        </div>

        <div class="manage-content">
            <common-table></common-table>
        </div>
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
            searchForm: {
                keyword: ''
            },
            formLabel: [
                {
                    model: 'keyword',
                    label: ''
                }
            ]
        }
    }
}
</script>

<style lang="scss" scoped>
@import '../../assets/scss/common.scss';
</style>