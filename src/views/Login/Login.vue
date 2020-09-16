<template>
  
    <div class="login">
        <el-form :label-position="'right '" label-width="80px" >
            <el-form-item label="账号">
                <el-input v-model="user.username" style="width:300px" size="medium"></el-input>
            </el-form-item>
            <el-form-item label="密码">
                <el-input type="password" v-model="user.password" style="width:300px" size="medium"></el-input>
            </el-form-item>

            <el-button type="primary" @click="login">登录</el-button>
        </el-form>
    </div>

</template>

<script>
export default {
    data: function() {
        return {
            user: {
                username: '',
                password: ''
            }
        }
    },
    methods: {
        login() {
            this.$http.post('/permission/getMenu', this.user).then( res=>{
                res = res.data;
                if(res.code === 20000) {
                    this.$store.commit('clearMenu');
                    this.$store.commit('setMenu', res.data.menu);
                    this.$store.commit('setToken', res.data.token);
                    this.$store.commit('addMenu', this.$router);
                    this.$router.push({name: 'home'})
                } else {
                    this.$message(res.data.message);
                }
            });
        }
    }
}
</script>

<style lang="scss" scoped>

.login {
    padding: 15% 0 0 30%;
}

</style>