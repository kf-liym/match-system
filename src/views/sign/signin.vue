<template>
     <div shadow="hover" class="box-card" id="account-box">
        <h2>登录</h2>
        <p>要继续操作，请输入账号密码</p>
        <div>
            <el-form class="input-box" ref="login" :rules="rules" :model="dataForm">
                <el-form-item prop="username">
                    <el-input v-model="dataForm.username" placeholder="用户名"></el-input>
                </el-form-item>
                <el-form-item prop="password">
                    <el-input v-model="dataForm.password" placeholder="密码" show-password></el-input>
                </el-form-item>
            </el-form>
            <div>
                <br>
                <el-checkbox v-model="dataForm.isRemember">记住我</el-checkbox>
            </div>
            <div>
                <router-link class="login-button" :to="{name: 'register'}"><el-button>注册</el-button></router-link>

                <el-button class="login-button" type="primary" v-on:click="login">登录</el-button>
            </div>
        </div>
    </div>
</template>

<script>
export default {
  name: 'signin',
  data () {
    return {
      dataForm: {
        username: 'admin',
        password: 'admin1234565',
        isRemember: false
      }
    }
  },
  computed: {

  },
  created () {

  },
  mounted () {

  },
  watch: {

  },
  methods: {
    login () {

    }
  },
  components: {

  }
}
</script>

<style scoped lang="scss">
    .input-box {
        width: 61.8%;
        /* margin-top: 10px; */
        margin: auto;
    }
    #account-box {
        text-align: center;
    }
    .login-button {
        margin-top: 10px;
        margin-left: 10px;
    }
</style>
