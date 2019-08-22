<template>
    <div>
        
        <div id="slider" class="mui-slider"> <!-- 删掉 mui-fullscreen 这个类 -->
            <div id="sliderSegmentedControl" class="mui-scroll-wrapper mui-slider-indicator mui-segmented-control mui-segmented-control-inverted">
                <div class="mui-scroll">
                    <a class="mui-control-item mui-active" href="#item1mobile" data-wid="tab-top-subpage-1.html">
                        推荐
                    </a>
                    <a class="mui-control-item" href="#item2mobile" data-wid="tab-top-subpage-2.html">
                        热点
                    </a>
                    <a class="mui-control-item" href="#item3mobile" data-wid="tab-top-subpage-3.html">
                        北京
                    </a>
                    <a class="mui-control-item" href="#item4mobile" data-wid="tab-top-subpage-4.html">
                        社会
                    </a>
                    <a class="mui-control-item" href="#item5mobile" data-wid="tab-top-subpage-5.html">
                        娱乐
                    </a>
                </div>
            </div>

        </div>


    </div>
</template>

<script>
    // 1. 导入 mui 的 js 文件, 这里用到了 caller,callee,arguments 非严格模式，和 webpack打包好的 bundle.js中，默认是启用严格模式的，所以，这两这冲突了，就报了严重的错
    //  最终，我们选择了 plan B 移除严格模式：使用这个插件
    //     cnpm i babel-plugin-transform-remove-strict-mode -D 安装，并在 .babelrc 加上 "plugins":["transform-remove-strict-mode"] 即可取消 bundle.js 的严格模式
    import mui from '../../lib/mui/js/mui.min.js'

    export default {
        data() {
            return {}
        },
        created() {},   // 当 data 和 mothods 都准备好之后执行的 钩子函数（第二个生命周期函数）
        mounted() {     // 当组件中 DOM 结构被渲染好并放到页面中后，会执行这个 钩子函数（最后一个生命周期函数）
            // 如果要操作元素了，最好在 mounted 里面，因为，这里时候的 DOM 元素 是最新的
            // 2. 初始化 滑动控件
            mui('.mui-scroll-wrapper').scroll({
                deceleration: 0.0005 //flick 减速系数，系数越大，滚动速度越慢，滚动距离越小，默认值0.0006
            })
        },
        methods: {

        }
    }
</script>

<style lang="scss" scoped>
    *{
        // 取消警告
        touch-action: pan-y;
    }
</style>