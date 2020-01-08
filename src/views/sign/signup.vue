<template>
    <div>
      <div shadow="hover" class="box-card" id="account-box">
            <h2>注册</h2>
            <p>请填写表单以注册</p>
            <div>
                <el-form class="input-box" ref="register" :rules="rules" :model="dataForm">
                    <el-form-item prop="username">
                        <el-input placeholder="请输入账号" v-model="dataForm.username"></el-input>
                    </el-form-item>
                    <el-form-item prop="password">
                        <el-input placeholder="请输入密码" v-model="dataForm.password" show-password></el-input>
                    </el-form-item>
                    <el-form-item prop="repassword">
                        <el-input placeholder="请再次输入密码" v-model="dataForm.repassword" show-password></el-input>
                    </el-form-item>
                    <el-form-item prop="email">
                        <el-input placeholder="请输入邮箱" v-model="dataForm.email"></el-input>
                    </el-form-item>
                </el-form>
                <div>
                    <router-link class="login-button" :to="{name: 'login'}"><el-button>返回登陆</el-button></router-link>

                    <el-button class="login-button" type="primary" v-on:click="register">注册</el-button>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
  name: 'signup',
  data () {
    return {
      dataForm: {
        username: '',
        password: '',
        repassword: '',
        email: '',
        register_code: ''

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
    register () {

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
