// 入口文件 
import Vue from 'vue'

// 配置 vuex 的步骤
// 1. 运行 cnpm i vuex -S 装包
// 2. 导入包
import Vuex from 'vuex'
// 3. 注册 vuex 到 vue 中
Vue.use(Vuex)

// 每次刚进入 网站, 肯定会 调用 main.js 在刚调用的时候, 先从本地存储中, 把 购物车的数据读出来 放到 store 中
var car = JSON.parse(localStorage.getItem('car') || '[]')

// 4. new Vuex.Store() 实例, 得到一个 数据 仓储对象
var store = new Vuex.Store({
    state: {    // 数据
        // 可以把 state 想象成 组件中的 data, 专门用来存储数据的
        // 如果在 组件中,想要访问 store 中的数据,只能通过 this.$store.state.*** 来访问
        // count: 0

        car:car  // 将 购物车中的商品数据,用一个数组存储起来, 在 car 数组中, 存储一些商品的对象, 咱们可以暂时将这个商品对象,设计成这个样子  {id:商品的id, count: 要购买的数量, price: 商品的单价, selected: false}
        // 在最后把上面的 本地存储里的 car 传过来, 不能再初始化 car : [] 了 

    },
    mutations: {    // 方法
        // // 注意:如果要操作 store 中的 state 值,只能通过 调用 mutations 提供的方法,才能操作对应的数据,不推荐直接操作 state 中的数据,
        // //  因为 万体导致了数据的紊乱,不能快速定位到错误的原因,因为,每个组件都可能有操作数据的方法
        // increment(state) {
        //     state.count ++
        // },
        // // 注意: 如果组件想要调用 mutations 中的方法, 只能使用 this.$store.commit('方法名')   ==>  this.$store.commit('increment')
        // // 这种 调用 mutations 方法的格式, 和 this.$emit('父组件中方法名') 一样
        // subtract(state, c) {
        //     // 注意: mutations 的 函数参数列表中,最多支持两个参数,其中,参数1:是 state 状态; 参数2:通过 commit 提交过来的参数;
        //     state.count -= c
        //     // 传参方式, 这里方法参数的第二个就是参数,   在组件中调用的方法是怎么写的  this.$store.commit('subtract', 3)
        // },
        //  // 如果就想用多传一个参数怎么办?   mutations 的 函数参数列表中的第二个参数,可以用对象代替, 在对象中可以定义多个属性来实现 传递多个参数
        //  subtract1(state, obj) {
        //      state.count -= (obj.c + obj.d)
        //      // 组件调用的时候可以这么调用   ==>   this.$store.commit('subtract1', { c: 3, d: 1 })
        //  }


        addToCar(state, goodsinfo) {
            // 点击加入购物车,把商品信息,保存到 store 中的 car 上
            // 分析: 
            // 1. 如果购物车中,之前就已经有这个对应的商品了,那么,只需要更新数量
            // 2. 如果没有,则直接把 商品数据, push 到 car 中即可

            // 假设 在购物车中, 没有找到对应的商品
            var flag = false

            state.car.some(item=>{
                if(item.id == goodsinfo.id) {
                    item.count += parseInt(goodsinfo.count)
                    flag = true
                    return true
                }
            })

            // 如果最终, 循环完毕, 得到的 flag 还是 false , 则把商品数据直接 push 到 购物车中
            if(!flag) {
                state.car.push(goodsinfo)
            }

            // 当 更新 car 之后, 把 car 数组, 存储到 本地的 localStorage 中
            localStorage.setItem('car', JSON.stringify(state.car))

        },
        updateGoodsInfo(state, goodsinfo) {
            // 修改购物车中商品的数量值
            // 分析: 
            state.car.some(item=>{
                if(item.id == goodsinfo.id) {
                    item.count = parseInt(goodsinfo.count)
                    return true
                }
            })
            // 当修改完商品的数量,把最新的购物车数据,保存到 本地存储中
            localStorage.setItem('car', JSON.stringify(state.car))
        },
        removeFormCar(state, id) {
            // 根据 id, 从 store 中的购物车中删除对应的那条商品数据
            state.car.some((item, i)=>{
                if(item.id == id) {
                    state.car.splice(i, 1)
                    return true
                }
            })
            // 将删除完毕后的,最新的购物车数据,同步到 本地存储中
            localStorage.setItem('car', JSON.stringify(state.car))
        },
        updateGoodsSelected(state, info){
            state.car.some(item=>{
                if(item.id == info.id) {
                    item.selected = info.selected
                }
            })
            // 把最新的 所有购物车商品的状态 保存到 store 中去
            localStorage.setItem('car', JSON.stringify(state.car))
        }

    },
    getters: {    // 
        // // 注意: 这里的 getters, 只负责 对外提供数据,不负责 修改数据, 如果想要修改 state 中的数据, 请 去找 mutations
        // optCount: function (state) {
        //     return '当前最新的count值是:' + state.count
        //     // 在组件中就不用直接访问 new Vuex.Store 上 state 里的值了    直接在组件中访问 getters 里面灵活提供的值   ==>   $store.getters.optCount
        // }
        // // 经过回顾对比, 发现 getters 中的方法, 和组件中的过滤器比较类似, 因为 过滤器 和 getters 都没有修改原数据, 都是把 原数据 做了一层包装, 提供给了 调用者
        // //  其次, getters 也和 computed 比较像, 只要 state 中的数据发生变化了, 那么, 如果 getters 正好也引用了这个数据, 那么 就会立即触发 getters 的重新求值;


        // 相当于 计算属性, 也相当于 filters
        getAllCount(state) {    // 计算所有数组里面的 数量加起来的值 
            var c = 0;
            state.car.forEach(item=>{
                c += item.count
            })
            return c
        },
        getGoodsCount(state) {    // 拿到id 和 count 数量,将要给购物车里面商品加上数量
            var o = []
            state.car.forEach(item=>{
                o[item.id] = item.count
            })
            return o
        },
        getGoodsSelected(state) {
            var o = {}
            state.car.forEach(item => {
                o[item.id] = item.selected
            })
            return o
        },
        getGoodsCountAndAmount(state) {
            var o = {
                count: 0,   // 勾选的数量
                amount: 0   // 勾选的总价
            }
            state.car.forEach(item=>{
                if(item.selected) {
                    o.count += item.count
                    o. amount += item.price * item.count
                }
            })
            return o
        }

    }
})
// 总结:
// 1. state 中的数据, 不能直接修改, 如果想要修改, 必须通过 mutations
// 2. 如果组件想要直接 从 state 上获取数据: 需要 this.$store.state.***
// 3. 如果 组件, 想要修改数据, 必须使用 mutations 提供的方法, 需要通过 this.$store.commit('方法的名称', 唯一的一个参数)
// 4. 如果 store 中的 state 上的数据, 在对外提供的时候, 需要做一层包装, 那么, 推荐使用 getters, 如果需要使用 getters, 则用 this.$store.getters.***



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
    router,      // 1.4 挂载路由对象到 vm 实例上
    store   // 5.将 vuex 创建的 store 挂载到 vm 实例上,只要挂载到了 vm 上,任何组件都能使用 store 来存取数据
})

