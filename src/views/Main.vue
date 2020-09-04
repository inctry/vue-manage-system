<template>
    <el-container style="height: 100%">
        <el-aside width="200px">
            
            <common-aside></common-aside>

        </el-aside>

        <el-container>
            
            <common-header></common-header>
                
            <el-main></el-main>

        </el-container>
    </el-container>    
</template>

<script>
import CommonHeader from '../components/CommonHeader.vue'
import CommonAside from '../components/CommonAside.vue'
export default {
    components: {
        CommonHeader,CommonAside
    }
}
</script>

<style>

</style>