<template>
  
    <el-row class="home" :gutter="20">
        <el-col :span="8">
            <el-card shadow="hover">
            </el-card>
            <el-card shadow="hover">
            </el-card>
        </el-col>
        <el-col :span="16">
            <el-card shadow="hover"></el-card>

            <div class="num">
                <el-card shadow="hover" v-for="item in 6" :key=item></el-card>
            </div>

            <el-card shadow="hover">
            </el-card>

            <div class="graph">
                <el-card shadow="hover"></el-card>
                <el-card shadow="hover"></el-card>
            </div>
        </el-col>
    </el-row>

</template>

<script>
export default {
    mounted() {
        this.$http.get('/home/getData').then(res=>{
            console.log(res.data)
        })
    }
}
</script>

<style lang="scss" scoped>

@import '~@/assets/scss/home';

</style>