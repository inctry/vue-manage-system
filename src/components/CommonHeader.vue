<template>
  
  <header>
    <div class="l-content">
        <el-button type="primary" icon="el-icon-menu" size="mini" 
        @click="collapseMenu">
        </el-button>
        <el-breadcrumb separator="/">
            <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
            <el-breadcrumb-item :to="current.path" v-if="current">
                {{current.label}}
            </el-breadcrumb-item>
        </el-breadcrumb>
    </div>
    <div class="r-content">
        <el-dropdown trigger="click">
            <span class="el-dropdown-link" size="mini">
              <img :src="userImg" class="user">
            </span>
            <el-dropdown-menu slot="dropdown">
              <el-dropdown-item>个人中心</el-dropdown-item>
              <el-dropdown-item @click.native="logOut">退出</el-dropdown-item>
            </el-dropdown-menu>
        </el-dropdown>
    </div>
  </header>


</template>



<script>
import {mapState} from  'vuex';
export default {
    computed: {
        ...mapState({
            current: state => state.tab.currentMenu
        })
    },
    data: function() {
        return {
            userImg: require('../assets/image/user.png')
        }
    },
    methods: {
        collapseMenu() {
            this.$store.commit('collapse');
        },
        logOut() {
            this.$store.commit('clearToken');
            this.$store.commit('clearMenu');
            location.reload();
        }
    }
}
</script>

<style lang="scss" scoped>
header {
    display: flex;
    align-items:center;
    height:100%;
    justify-content: space-between;
}
.r-content {
   .user{
       width: 40px;
       height: 40px;
       border-radius: 50%;
   }
}
.l-content {
    display: flex;
    align-items: center;
    .el-button {
        margin-right: 20px;
    }
}
</style>

<style>
.el-breadcrumb__item:last-child .el-breadcrumb__inner{
    color:azure;
    font-weight: 700;
}
.el-breadcrumb__inner a, .el-breadcrumb__inner.is-link {
    color:#ffffff;
}
</style>