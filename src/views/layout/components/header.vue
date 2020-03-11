<template>
  <div class="appHeader">
    <div class="header-item">新兴县太极拳精英大赛报名系统</div>
    <div class="header-item" v-if="$store.state.user.username">
      <el-button type="text" @click="backHome()">首页</el-button>
    </div>
    <div class="header-item" v-if="$store.state.user.username">
      <el-button type="text">查看比赛通知</el-button>
      <el-button type="text">下载责任书</el-button>
    </div>
    <div class="username" v-if="$store.state.user.username" >
      {{ $store.state.user.username }}
      <span @click="logout" style="font-weight: normal; font-size: 14px; margin-left: 15px; cursor: pointer;">注销</span>
    </div>
  </div>
</template>

<script>
export default {
  components: {},
  props: {},
  data () {
    return {
      username: ''
    };
  },
  computed: {},
  watch: {},
  created () {},
  mounted () {},
  methods: {
    showCommonInfo () {
      this.$router.push('/commonInfo');
    },
    backHome () {
      this.$router.push('/home');
    },
    logout () {
      this.$store.dispatch('LogOut').then((res) => {
        this.$router.push('/signin')
      }).catch(error => {
        this.$message.error(error);
      })
    }
  }
};
</script>

<style scoped lang="scss">
.appHeader {
  position: fixed;
  top: 0;
  height: 65px;
  line-height: 65px;
  width: 100%;
  background: rgb(48, 4, 167);
  font-size: 24px;
  padding: 0 20px;
  font-weight: bold;
  color: #fff;
  display: flex;
  align-items: center;
  flex-wrap: nowrap;
}
.header-item {
  margin-right: 16px;
  align-self: stretch;
}
.username {
  padding: 0 10px;
  position: absolute;
  right: 35px;
  font-size: 20px;
}
</style>
