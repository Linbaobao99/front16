<template>
    <div id="header" class="header">
        <!-- 最顶端 -->
        <div class="head-top">
            <div class="section">
                <div class="left-box">
                    <span>vue2.0单页应用</span>
                    <a target="_blank" href="#"></a>
                    <a target="_blank" href="#"></a>
                </div>
                <div id="menu" class="right-box">
                    <a href="/login.html">登录</a>
                    <a href="/register.html">注册</a>
                    <strong>|</strong>
                    <a>
                        <i class="iconfont icon-phone"></i>联系我们</a>
                    <router-link :to="{ name: 'shopcart' }">
                        <i class="iconfont icon-cart"></i>
                        <span>购物车({{$store.getters.total}})</span>
                    </router-link>
                </div>
            </div>
        </div>
        <!-- 头部导航栏 -->
        <div id="header" class="header">
            <div class="head-nav">
                <div class="section">
                    <!-- <div class="logo">
                       <a href="/index.html"><img width="230px" height="70px" src="/templates/main/images/logo.png" /></a>
                   </div>-->
                    <div id="menu2" class="nav-box menuhd">
                        <ul>
                            <li class="index">
                                <a href="/index.html">
                                    首页
                                </a>
                            </li>
                            <li class="news">
                                <a href="/news.html">
                                    学员问题汇总
                                </a>
                            </li>
                            <li class="photo">
                                <a href="/photo.html">
                                    重难点专区
                                </a>
                            </li>
                            <!--<li class="goods"><a href="">就业阶段</a></li>-->
                            <li class="video">
                                <a href="/video.html">
                                    前端常用功能
                                </a>
                            </li>
                            <li class="down">
                                <a href="/down.html">
                                    资源下载
                                </a>
                            </li>
                            <li>
                                <a target="_blank" href="/admin/index.aspx">
                                    问题提交
                                </a>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
};
</script>

<style scoped>

</style>