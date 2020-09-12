<template>
    <div class="common-table">
         <el-table strip 
            height="90%"
            :data="tableData"
            style="width: 100%"
            v-loading="config.loading">

            <el-table-column show-overflow-tooltip
            label="序号"
            width="85">
                <template 
                    slot-scope="scope">
                    <span 
                        style="margin-left: 10px">
                        {{ (config.page - 1) * 20 + scope.$index + 1  }}
                    </span>
                </template>
            </el-table-column>

            <el-table-column 
                v-for="item in tableLabel"
                :key="item.prop"
                :prop="item.prop"
                :label="item.label"
                :width="item.width ? item.width : 125+'px'"
                >

                <template 
                    slot-scope="scope">
                    <span 
                        style="margin-left: 10px">
                        {{ scope.row[item.prop] }}
                    </span>
                </template>
            </el-table-column>

             <el-table-column label="操作" width="180">
                <template slot-scope="scope">
                    <el-button
                    size="mini"
                    @click="handleEdit(scope.row)">编辑</el-button>
                    <el-button
                    size="mini"
                    type="danger"
                    @click="handleDelete(scope.row)">删除</el-button>
                </template>
            </el-table-column>
         </el-table>
            <el-pagination class="pager"
                layout="prev, pager, next"
                :total="config.total"
                :current-page.sync="config.page"
                @current-change="changePage">
            </el-pagination>
    </div>
</template>

<script>
export default {
    props: {
        tableData: Array,
        tableLabel: Array,
        config: Object
    },
    methods: {
        handleEdit(row) {
            this.$emit('edit', row);
        },
        handleDelete(row) {
            this.$emit('delete', row);
        },
        changePage(page) {
            this.$emit('changePage', page)
        }
    }
}
</script>

<style lang="scss" scoped>
.common-table {
    height: calc(100% - 62px);
    background-color: #fff;
    position: relative;
    .pager {
        position: absolute;
        bottom: 0px;
        right: 20px;
    }
}
</style>