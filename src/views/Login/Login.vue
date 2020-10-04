<template>
    <div class="heap">
        <div class="login">
            <p> Login </p>
            <el-form :label-position="'right'" label-width="60px">
                <el-form-item label="账号">
                    <el-input v-model="user.username" style="width:300px" size="medium"></el-input>
                </el-form-item>
                <el-form-item label="密码">
                    <el-input type="password" v-model="user.password" style="width:300px" size="medium"></el-input>
                </el-form-item>

                <el-button type="primary" @click="login">登录</el-button>
            </el-form>
        </div>
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
    background-color: white;
    text-align: center;
    border-radius: 15.5px;
    // width: 600px;
    // width: 600px;
     height: 280px;
    p {
        margin: 30px;
        font-size: 1.5em;
        font-family:-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
    }
    /deep/.el-form-item__label {
        margin-right: -100px;
    }
    
    .el-input {
         padding-right: 40px;
    }
}
.heap {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
    height: 100%;
    background-image: linear-gradient(to right, #fbc2eb, #a6c1ee);
    .el-button {
        margin: 10px auto;

    }
}
// .heap {
//     width: 100%;
//     height: 100%;
//     position: relative;
// }
// .login {
//     position: absolute;
//     top: 0;
//     right: 0;
//     bottom: 0;
//     left: 0;
//     margin: auto;
// }

</style>