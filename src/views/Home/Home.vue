<template>
  
    <el-row class="home" :gutter="20">
        <el-col :span="8">
            <el-card shadow="hover" style="height: 290px">
                <div class="user">
                    <img :src="userImg" alt="">
                    <div class="userinfo">

                        <p class="name">Nick</p>
                        <p class="access">超级管理员</p>
                    </div>
                </div>
                <div class="login-info">
                    <p>上次登录时间 <span>2020-10-01</span></p>
                    <p>上次登录地点 <span>广州</span></p>
                </div>
            </el-card>
            <el-card shadow="hover" style="height: 370px; margin-top: 20px; 
            width: 311.5%">
                <el-table :data="tableData">
                    <el-table-column 
                        v-for="(val, key) in tableLabel" 
                        :key="key" :prop="key" :label="val"
                        show-overflow-tooltip>
                    </el-table-column>
                </el-table>
            </el-card>
        </el-col>
        <el-col :span="16">

            <div class="num">
                <el-card
                shadow="hover"
                v-for="(item, index) in countData"
                :key="index"
                :body-style="{ display: 'flex', padding: 0}"
                >
                <i
                    class="icon"
                    :class="`el-icon-${item.icon}`"
                    :style="{ background: item.color }"
                ></i>
                <div class="detail">
                    <p class="num">￥ {{ item.value }}</p>
                    <p class="txt">{{ item.name }}</p>
                </div>
                </el-card>
            </div>
        </el-col>
    </el-row>

</template>

<script>
// import EChart from '../../components/EChart'
export default {

    data() {
        return {
            userImg: require('../../assets/image/user.png'),
            countData: [
                {
                    name: "今日支付订单",
                    value: 1000,
                    icon: "success",
                    color: "#2ec7c9",
                },
                {
                    name: "今日收藏订单",
                    value: 210,
                    icon: "star-on",
                    color: "#ffb980",
                },
                {
                    name: "今日未支付订单",
                    value: 324,
                    icon: "s-goods",
                    color: "#5ab1ef",
                },
                {
                    name: "本月支付订单",
                    value: 1997,
                    icon: "success",
                    color: "#2ec7c9",
                },
                {
                    name: "本月收藏订单",
                    value: 2320,
                    icon: "star-on",
                    color: "#ffb980",
                },
                {
                    name: "本月未支付订单",
                    value: 12324,
                    icon: "s-goods",
                    color: "#5ab1ef",
                },
            ],
            tableData: [],
            tableLabel: {
                name: '课程',
                todayBuy: '今日购买',
                monthBuy: '本月购买',
                totalBuy: '总购买'
            },

        }
    },
    created() {
        this.getTableData()
    },
    methods: {
    getTableData() {
        this.$http.get("/home/getData")
            .then((res) => {
                res = res.data;
                this.tableData = res.data.tableData;
            }).catch((err) => {
                console.log(err);
            });
        },
    },
    mounted() {
        this.getTableData();
    }
}
</script>

<style lang="scss" scoped>

@import '~@/assets/scss/home';

</style>