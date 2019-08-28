// 导入 vue-router 包
import VueRouter from 'vue-router'

// 导入对应的路由组件
import HomeContainer from './components/tabbar/HomeContainer.vue'
import MemberContainer from './components/tabbar/MemberContainer.vue'
import ShopcarContainer from './components/tabbar/ShopcarContainer.vue'
import SearchContainer from './components/tabbar/SearchContainer.vue'

import Newslist from './components/news/Newslist.vue'
import NewsInfo from './components/news/NewsInfo.vue'

import PhotoList from './components/photos/PhotoList.vue'
import PhotoInfo from './components/photos/PhotoInfo.vue'

import GoodsList from './components/goods/GoodsList.vue'
import GoddsInfo from './components/goods/GoodsInfo.vue'
import GoodsDesc from './components/goods/GoodsDesc.vue'
import GoddsComment from './components/goods/GoodsComment.vue'


// 3. 创建路由对象
var router = new VueRouter({
    routes: [
        { path: '/', component: HomeContainer },
        { path: '/home', component: HomeContainer },
        { path: '/member', component: MemberContainer },
        { path: '/shopcar', component: ShopcarContainer },
        { path: '/search', component: SearchContainer },
        { path: '/home/newslist', component: Newslist },
        { path: '/home/newsinfo/:id', component: NewsInfo },
        { path: '/home/photolist', component: PhotoList },
        { path: '/home/photoinfo/:id', component: PhotoInfo },
        { path: '/home/goodslist', component: GoodsList },
        { path: '/home/goodsinfo/:id', component: GoddsInfo, name: 'goodsinfo' },
        { path: '/home/goodsdesc/:id', component: GoodsDesc, name: 'goodsdesc' },
        { path: '/home/goodscomment/:id', component: GoddsComment, name: 'goodscomment' }

    ],
    linkActiveClass: 'mui-active'   // 覆盖默认的路由高亮的类，默认的类叫做，router-link-active
})


// 把路由对象暴露出去
export default router