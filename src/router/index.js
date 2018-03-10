import Vue from 'vue'
import Router from 'vue-router'
//element-ui
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css'
//登录组件
import Login from '../components/account/login/Login.vue'
//购物
import Shop from '../components/shop/Shop.vue'
import GoodsList from '../components/shop/goods/List.vue'
import GoodsDetail from '../components/shop/goods/Detail.vue'
import OrderSite from '../components/shop/order/Site.vue'
import OrderComplete from '../components/shop/order/Complete.vue'
import OrderPay from '../components/shop/order/Pay.vue'
import Shopcart from '../components/shop/shopcart/Shopcart.vue'

//goods路由配置
let goods = [
  { name: 'goodsList', path: 'goods/list', component: GoodsList },
  { name: 'goodsDetail', path: 'goods/detail/:id', component: GoodsDetail }
]

//order路由配置
let order = [
  { name: 'orderSite', path: 'order/site/:ids', component: OrderSite },
  { name: 'orderComplete', path: 'order/complete', component: OrderComplete },
  { name: 'orderPay', path: 'order/pay/:id', component: OrderPay }
]

//shopcart路由配置
let shopcart = [
  { name: 'shopcart', path: 'shopcart', component: Shopcart }
]

//使用组件
Vue.use(Router)
Vue.use(ElementUI)

let router = new Router({
  routes: [
    //登录路由配置
    { name: 'login', path: '/account/login', component: Login },
    //购物商城路由配置
    { name: 'shop', path: '/shop', component: Shop, children: [...goods, ...order, ...shopcart] }
  ]
});

export default router;
