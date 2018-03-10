<template>
    <!--网友评论-->
    <div class="comment-box">
        <!--取得评论总数 要阻止默认的浏览器刷新提交-->
        <form id="commentForm" name="commentForm" class="form-box" @submit.prevent="sendComments">
            <div class="avatar-box">
                <i class="iconfont icon-user-full"></i>
            </div>
            <div class="conn-box">
                <div class="editor">
                    <textarea id="txtContent" name="txtContent" v-model="commenttxt.commenttxt" sucmsg=" " datatype="*10-1000" nullmsg="请填写评论内容！"></textarea>
                    <span class="Validform_checktip"></span>
                </div>
                <div class="subcon">
                    <input id="btnSubmit" name="submit" type="submit" value="提交评论" class="submit">
                    <span class="Validform_checktip"></span>
                </div>
            </div>
        </form>
        <ul id="commentList" class="list-box">
            <p v-if="comments.length==0" style="margin:5px 0 15px 69px;line-height:42px;text-align:center;border:1px solid #f7f7f7;">暂无评论，快来抢沙发吧！</p>
            <li v-for="(item,i) in comments" :key="i">
                <div class="avatar-box">
                    <i class="iconfont icon-user-full"></i>
                </div>
                <div class="inner-box">
                    <div class="info">
                        <span>{{item.user_name}}</span>
                        <span>{{item.add_time | date}}</span>
                    </div>
                    <p>{{item.content}}</p>
                </div>
            </li>
        </ul>
        <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="page.pageIndex" :page-sizes="[2,4, 6, 8]" :page-size="page.pageSize" layout="total, sizes, prev, pager, next, jumper" :total="page.total">
        </el-pagination>
    </div>

    <!--/网友评论-->
</template>

<script>
export default {
  props: ["id"],
  data() {
    return {
      page: {
        total: 1,
        pageSize: 2,
        pageIndex: 1
      },
      comments: [],
      commenttxt: {
        commenttxt: ""
      }
    };
  },
  methods: {
    getComment() {
      //获取评论
      //这个接口比较特殊,需要一个tablename用来指定评论模块,还需id用来指定某模块下某个商品的评论
      let url = `${this.$api.commentList}goods/${this.id}?pageIndex=${
        this.page.pageIndex
      }&pageSize=${this.page.pageSize}`;
      this.$axios.get(url).then(res => {
        if (res.data.status == 0) {
            // console.log(res.data.totalcount);
            this.page.total = res.data.totalcount;
          this.comments = res.data.message;
        }
      });
    },
    //发表评论
    sendComments() {
      let url = `${this.$api.comment}goods/${this.id}`;
      this.$axios.post(url, this.commenttxt).then(res => {
        if (res.data.status == 0) {
          this.commenttxt.commenttxt = "";//成功后清空评论框
          this.getComment(); //成功后再次调用获取评论
        }
      });
    },
    //分页
    handleSizeChange(val) {
      this.page.pageSize = val;
      this.getComment();
    },
    handleCurrentChange(val) {
      this.page.pageIndex = val;
      this.getComment();
    }
  },
  created() {
    this.getComment();
  },
  //局部过滤器
  filters: {
    //日期过滤器
    date(tplDate) {
      let date = new Date(tplDate);
      return `${date.getFullYear()}-${date.getMonth() +
        1}-${date.getDate()} ${date.getHours()}:${date.getMinutes()}:${date.getSeconds()}`;
    }
  },
  watch: {
    id() {
      this.getComment();
    }
  }
};
</script>

<style scoped>

</style>