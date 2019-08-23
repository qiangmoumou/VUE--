<template>
    <div>
        
        <!-- 顶部滑动条区域 -->
        <div id="slider" class="mui-slider"> <!-- 删掉 mui-fullscreen 这个类 -->
            <div id="sliderSegmentedControl" class="mui-scroll-wrapper mui-slider-indicator mui-segmented-control mui-segmented-control-inverted">
                <div class="mui-scroll">
                    <a :class="['mui-control-item', item.id === 0 ? 'mui-active' : '' ]" v-for="item in cates" :key="item.id" @click="getPhotoListByCateId(item.id)">
                        {{ item.title }}
                    </a>
                </div>
            </div>

        </div>

        <!-- 图片列表区域 -->
        <!-- 因为图片运用到了懒加载，所以要用到 mint-ui 的 Lazyload 的组件，在main.js引入并安装，在这里 img 处使用 -->
        <ul class="photo-list">
            <router-link v-for="item in list" :key="item.id" :to="'/home/photoinfo/' + item.id" tag="li">
                <img v-lazy="item.img_url" />
                <div class="info">
                    <h1 class="info-title">{{ item.title }}</h1>
                    <div class="info-body">{{ item.zhaiyao }}</div>
                </div>
            </router-link>
        </ul>

    </div>
</template>

<script>
    // 1. 导入 mui 的 js 文件, 这里用到了 caller,callee,arguments 非严格模式，和 webpack打包好的 bundle.js中，默认是启用严格模式的，所以，这两这冲突了，就报了严重的错
    //  最终，我们选择了 plan B 移除严格模式：使用这个插件
    //     cnpm i babel-plugin-transform-remove-strict-mode -D 安装，并在 .babelrc 加上 "plugins":["transform-remove-strict-mode"] 即可取消 bundle.js 的严格模式
    import mui from '../../lib/mui/js/mui.min.js'

    export default {
        data() {
            return {
                cates: [],   // 所有分类的列表数组
                list: []
            }
        },
        created() {      // 当 data 和 mothods 都准备好之后执行的 钩子函数（第二个生命周期函数）
            this.getAllCategory(),
            // 默认进入页面，就主动请求 所有图片列表的数据
            this.getPhotoListByCateId(0)
        },  
        mounted() {     // 当组件中 DOM 结构被渲染好并放到页面中后，会执行这个 钩子函数（最后一个生命周期函数）
            // 如果要操作元素了，最好在 mounted 里面，因为，这里时候的 DOM 元素 是最新的
            // 2. 初始化 滑动控件
            mui('.mui-scroll-wrapper').scroll({
                deceleration: 0.0005 //flick 减速系数，系数越大，滚动速度越慢，滚动距离越小，默认值0.0006
            })
        },
        methods: {
            getAllCategory() {
                // 获取所有的图片分类
                this.$http.get("api/getimgcategory").then(result => {
                    if(result.body.status === 0) {
                        // 手动拼接出一个最完整的 分类列表
                        result.body.message.unshift({ title: "全部", id: 0 })
                        this.cates = result.body.message
                    }
                })
            },
            getPhotoListByCateId(cateId)  {
                // 根据 分类Id ，获取图片列表
                this.$http.get("api/getimages/" + cateId).then(result => {
                    if(result.body.status === 0) {
                        this.list = result.body.message
                    }
                })
            }
        }
    }
</script>

<style lang="scss" scoped>
    *{
        // 取消警告
        touch-action: pan-y;
    }

    .photo-list{
        list-style:none;
        padding:10px;
        margin:0;
        padding-bottom:0;
        li{
            background:#ccc;
            text-align: center;
            margin-bottom:10px;
            box-shadow:0 0 10px #999;
            position:relative;
            img{
                width:100%;
                display: block;
            }
            img[lazy="loading"] {
                width:40px;
                height:300px;
                margin:auto;
            }

            .info{
                color:white;
                text-align:left;
                position:absolute;
                left:0;
                bottom:0;
                background-color:rgba(0,0,0,.3);
                max-height:84px;
                .info-title{
                    font-size:14px;
                }
                .info-body{
                    font-size:13px;
                }
            }
        }
    }

</style>