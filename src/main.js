// 入口文件 
import Vue from 'vue'
// 1.1 导入路由的包
import VueRouter from 'vue-router'
// 1.2 安装路由
Vue.use(VueRouter)


// 导入格式化时间的插件
import moment from 'moment'
// 定义全局的过滤器
Vue.filter('dateFormat', (dataStr, pattern="YYYY-MM-DD HH:mm:ss") => {
    return moment(dataStr).format(pattern)
})


// 2.1 导入 vue-resource
import VueResource from 'vue-resource'
// 2.2 安装 vue-resource
Vue.use(VueResource)
// 设置请求的根路径
Vue.http.options.root = 'http://www.liulongbin.top:3005/'
// 全局设置 post 时候表单数据格式组织形式
Vue.http.options.emulateJSON = true


// 导入 MUI 的样式
import './lib/mui/css/mui.min.css'
import './lib/mui/css/icons-extra.css'

// 按需导入 Mint-UI 中的组件
// import { Header, Swipe, SwipeItem, Button, Lazyload } from 'mint-ui'
// Vue.component(Header.name, Header)
// Vue.component(Swipe.name, Swipe)
// Vue.component(SwipeItem.name, SwipeItem)
// Vue.component(Button.name, Button)
// Vue.use(Lazyload)
// 因为要使用懒加载图片列表，所以不能用这种按需导入，只能全部导入
import MintUi from 'mint-ui'
Vue.use(MintUi)
import 'mint-ui/lib/style.css'


// 安装 图片预览插件
import VuePreview from 'vue-preview'
Vue.use(VuePreview)


// 1.3 导入自定义的 router.js 路由模块
import router from './router.js'

// 导入 App 根组件
import app from './App.vue'

var vm = new Vue({
    el: '#app',
    render: c => c(app),
    router      // 1.4 挂载路由对象到 vm 实例上
})

