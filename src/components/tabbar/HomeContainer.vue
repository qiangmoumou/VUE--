<template>
    <div>

        <!-- 轮播图 -->
        <mt-swipe :auto="4000">
            <mt-swipe-item>1</mt-swipe-item>
            <mt-swipe-item>2</mt-swipe-item>
            <mt-swipe-item>3</mt-swipe-item>
        </mt-swipe>


        <h1>HomeContainer</h1>

    </div>
</template>

<script>
    export default {
        data() {
            return {

            }
        },
        created() {
            this.getBanner()
        },
        methods: {
            getBanner() {   // 获取轮播图数据的方法
                this.$http.get('http://www.liulongbin.top:3005/api/getlunbo').then(result => {
                    console.log(result.body)
                })
            }
        }
    }
</script>

<style lang="scss" scoped>
    .mint-swipe{
        height:200px;
        .mint-swipe-item{
            &:nth-child(1){
                background-color:red;
            }
            &:nth-child(2){
                background-color:blue;
            }
            &:nth-child(3){
                background-color:cyan;
            }
        }
    }
</style>