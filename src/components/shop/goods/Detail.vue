<template>
    <div>
        <!-- 导航栏 -->
        <div class="section">
            <div class="location">
                <span>当前位置：</span>
                <a href="/index.html">首页</a> &gt;
                <a href="/goods.html">购物商城</a> &gt;
                <a href="/goods/42/1.html">商品详情</a>
            </div>
        </div>
        <!-- 商品详情 -->
        <div class="section">
            <div class="wrapper clearfix">
                <div class="wrap-box">
                    <!--页面左边-->
                    <div class="left-925">
                        <div class="goods-box clearfix">
                            <!--商品图片-->
                            <div class="pic-box">
                                <div class="magnifier" id="magnifier1">
                                    <div class="magnifier-container">
                                        <div class="images-cover"></div>
                                        <!--当前图片显示容器-->
                                        <div class="move-view"></div>
                                        <!--跟随鼠标移动的盒子-->
                                    </div>
                                    <div class="magnifier-assembly">
                                        <div class="magnifier-btn">
                                            <span class="magnifier-btn-left">&lt;</span>
                                            <span class="magnifier-btn-right">&gt;</span>
                                        </div>
                                        <!--按钮组-->
                                        <div class="magnifier-line">
                                            <ul class="clearfix animation03">
                                                <li v-for="item in top.imglist" :key="item.id">
                                                    <div class="small-img">
                                                        <img :src="item.original_path" />
                                                    </div>
                                                </li>
                                            </ul>
                                        </div>
                                        <!--缩略图-->
                                    </div>
                                    <div class="magnifier-view"></div>
                                    <!--经过放大的图片显示容器-->
                                </div>
                            </div>
                            <!--/商品图片-->

                            <!--商品信息-->
                            <div class="goods-spec">
                                <h1>{{top.goodsinfo.title}}</h1>
                                <p class="subtitle">{{top.goodsinfo.sub_title}}</p>
                                <div class="spec-box">
                                    <dl>
                                        <dt>货号</dt>
                                        <dd id="commodityGoodsNo">{{top.goodsinfo.goods_no}}</dd>
                                    </dl>
                                    <dl>
                                        <dt>市场价</dt>
                                        <dd>
                                            <s id="commodityMarketPrice">¥{{top.goodsinfo.market_price}}</s>
                                        </dd>
                                    </dl>
                                    <dl>
                                        <dt>销售价</dt>
                                        <dd>
                                            <em class="price" id="commoditySellPrice">¥{{top.goodsinfo.sell_price}}</em>
                                        </dd>
                                    </dl>
                                </div>

                                <div class="spec-box">
                                    <dl>
                                        <dt>购买数量</dt>
                                        <dd>
                                            <span class="stock-txt">
                                                <el-input-number size="mini" v-model="num" :min=0 :max="top.goodsinfo.stock_quantity"></el-input-number>
                                                库存
                                                <em id="commodityStockNum">{{top.goodsinfo.stock_quantity}}</em>件
                                            </span>
                                        </dd>
                                    </dl>
                                    <dl>
                                        <dd>
                                            <div class="btn-buy" id="buyButton">
                                                <button class="buy">立即购买</button>
                                                <button class="add" @click="addCart">加入购物车</button>
                                            </div>
                                        </dd>
                                    </dl>
                                </div>

                            </div>
                            <!--/商品信息-->
                        </div>

                        <!-- 商品详情和评论 -->
                        <div id="goodsTabs" class="goods-tab bg-wrap">
                            <el-tabs type="border-card">
                                <el-tab-pane label="商品介绍">
                                    <div v-html="top.goodsinfo.content"></div>
                                </el-tab-pane>
                                <el-tab-pane label="商品评论">
                                    <!-- 评论  抽取为公共组件,需要一个id来获取默认的评论列表以及发表评论 -->
                                    <app-comment :id="id"></app-comment>
                                </el-tab-pane>
                            </el-tabs>

                        </div>
                        <!-- 商品详情和评论 -->

                    </div>
                    <!--/页面左边-->

                    <!--页面右边-->
                    <app-side :list="top.hotgoodslist"></app-side>
                    <!--/页面右边-->
                </div>
            </div>
        </div>
    </div>
</template>

<script>
// 导入放大镜插件
import "@/lib/imgzoom/css/magnifier.css";
import "@/lib/imgzoom/js/magnifier.js";
import $ from "jquery";
/* 公共侧边 */
import Comside from "./subcom/Comside.vue";
/* 评论 */
import Comcomment from "./subcom/Comcomment.vue";

export default {
  components: {
    appSide: Comside,
    appComment: Comcomment
  },
  data() {
    return {
      id: this.$route.params.id,
      num: 0,
      top: {
        goodsinfo: [],
        imglist: [],
        hotgoodslist: []
      }
    };
  },
  methods: {
    getDataById() {
      this.$axios.get(this.$api.goodsDetail + this.id).then(res => {
        if (res.data.status == 0) {
          this.top = res.data.message;
        }
      });
    },
    addCart() {
      let newnum = this.num + (this.$store.state.cart[this.id] || 0);//当前的数量加上以前的数量
      this.$store.commit("modify", { id: this.id, num: newnum });
      this.num = 0; //加完之后重置计数框
    }
  },
  created() {
    this.getDataById();
  },
  /**
   * 商品详情页面的右侧列表,可以点击切换不同的商品进行商品预览
   * 但是默认情况下当前页面切换到当前页面不会触发组件的重新渲染,为了解决这个问题,
   * 我们可以监听$route对象的变化,因为切换商品后,$route.params.id变化了,我们监听它,
   * 然后主动发起http请求,调用接口获取id的数据进行试图刷新
   */
  watch: {
    $route() {
      this.id = this.$route.params.id;
      this.getDataById();
    },
    top() {
      var magnifierConfig = {
        magnifier: "#magnifier1", //最外层的大容器
        width: 370, //承载容器宽
        height: 370, //承载容器高
        moveWidth: null, //如果设置了移动盒子的宽度，则不计算缩放比例
        zoom: 5 //缩放比例
      };
      setTimeout(function() {
        var _magnifier = $().imgzoon(magnifierConfig);
      }, 80);
    }
  }
};
</script>

<style scoped>

</style>