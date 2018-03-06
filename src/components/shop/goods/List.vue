<template>
    <div>
        <!-- 面包屑导航 -->
        <div class="section">
            <div class="location">
                <span>当前位置：</span>
                <router-link :to="{name:'goodslist'}">首页</router-link> &gt;
                <router-link to="adc">购物商城</router-link>
            </div>
        </div>
        <!-- 页面头部 分类列表与轮播图 -->
        <div class="section">
            <div class="wrapper">
                <div class="wrap-box">
                    <!--类别菜单-->
                    <div class="left-220" style="margin:0;">
                        <div class="banner-nav">
                            <ul>
                                <!--此处声明下面可重复循环-->

                                <li v-for="item in top.catelist" :key="item.id">
                                    <h3>
                                        <i class="iconfont icon-arrow-right"></i>
                                        <span>{{item.title}}</span>
                                        <p>
                                            <span v-for="subitem in item.subcates" :key="subitem.id">{{subitem.title}}&nbsp;&nbsp;</span>
                                        </p>
                                    </h3>

                                    <div class="item-box">
                                        <!--如有三级分类，此处可循环-->
                                        <dl v-for="subitem in item.subcates" :key="subitem.id">
                                            <dt>
                                                <a href="/goods/40.html">{{subitem.title}}</a>
                                            </dt>
                                            <dd>
                                                <a v-for="sub_item in subitem.subcates" :key="sub_item.id">{{sub_item.title}}</a>
                                            </dd>
                                        </dl>
                                    </div>
                                </li>

                            </ul>
                        </div>
                    </div>
                    <!--/类别菜单-->

                    <!--幻灯片-->
                    <div class="left-705">
                        <div class="banner-img">
                            <el-carousel height="350px">
                                <el-carousel-item v-for="item in top.sliderlist" :key="item.id">
                                    <h3>{{ item.title }}</h3>
                                    <img height="100%" :src="item.img_url" alt="">
                                </el-carousel-item>
                            </el-carousel>
                        </div>
                    </div>
                    <!--/幻灯片-->

                    <!-- 侧边栏 推荐商品列表,公共组件 -->
                    <appSide :list="top.toplist"></appSide>
                </div>
            </div>
        </div>
        <!-- 页面主体 商品列表预览,子组件 -->
        <app-list></app-list>
    </div>
</template>

<script>
import Comside from "./subcom/Comside.vue";
import Listmain from "./subcom/Listmain.vue";
export default {
  components: {
    appSide:Comside,
    appList:Listmain,
  },
  data() {
    return {
      top: {
        catelist: [],
        sliderlist: [],
        toplist: []
      }
    };
  },
  methods: {
    getDataTop() {
      this.$axios.get(this.$api.goodsTop).then(res => {
        if (res.data.status == 0) {
          this.top = res.data.message;
        }
      });
    }
  },
  created() {
    this.getDataTop();
  }
};
</script>

<style scoped>

</style>