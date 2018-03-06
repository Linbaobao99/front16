<template>
    <div>
        <div class="section" v-for="item in goodsGroup" :key="item.level1cateid">

            <!--子类-->
            <div class="main-tit">
                <h2>{{item.catetitle}}</h2>
                <p>
                    <router-link :to="{path:'/goods/detail'}" v-for="subitem in item.level2catelist" :key="subitem.subcateid">{{subitem.subcatetitle}}</router-link>
                    <a href="/goods/40.html">更多
                        <i>+</i>
                    </a>
                </p>
            </div>
            <!--/子类-->
            <div class="wrapper clearfix">
                <div class="wrap-box">
                    <ul class="img-list">

                        <li v-for="subitem in item.datas" :key="subitem.artID">
                            <a href="/goods/show-91.html">
                                <div class="img-box">
                                    <img :src="subitem.img_url">
                                </div>
                                <div class="info">
                                    <h3>{{subitem.artTitle}}</h3>
                                    <p class="price">
                                        <b>¥{{subitem.sell_price}}</b>元</p>
                                    <p>
                                        <strong>库存 {{subitem.stock_quantity}}</strong>
                                        <span>市场价：
                                            <s>{{subitem.market_price}}</s>
                                        </span>
                                    </p>
                                </div>
                            </a>
                        </li>

                    </ul>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    data(){
        return {
            goodsGroup:[]
        }
    },
    methods:{
        getDataGroups(){
            this.$axios.get(this.$api.goodsContent).then(res=>{
                if(res.data.status==0){
                    this.goodsGroup = res.data.message;
                }
            })
        }
    },
    created(){
        this.getDataGroups();
    },
};
</script>

<style scoped>

</style>