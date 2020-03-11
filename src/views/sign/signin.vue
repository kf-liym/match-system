<template>
  <div class="box-card" id="account-box">
    <div class="page-title">登录</div>
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
        <el-checkbox v-model="dataForm.isRemember">记住我</el-checkbox>
      </div>
      <div>
        <router-link class="login-button" :to="{name: 'signup'}">
          <el-button>注册</el-button>
        </router-link>

        <el-button class="login-button" type="primary" v-on:click="handleLogin">登录</el-button>
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
        username: '',
        password: '',
        isRemember: false
      },
      rules: {
        username: [
          { required: true, message: '请输入用户名', trigger: 'blur' }
        ],
        password: [
          { required: true, message: '请输入密码', trigger: 'blur' }
        ]

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
    handleLogin () {
      this.$refs.login.validate((valid) => {
        if (valid) {
          this.$store.dispatch('LOGIN_BY_USERNAME', this.dataForm).then((res) => {
            if (res.authority === 1) {
              this.$router.push('/admin')
            } else {
              this.$router.push('/home')
            }
          }).catch(error => {
            this.$message.error(error);
          })
        } else {
          console.log('error submit!!')
          return false
        }
      })
    }

  },
  components: {
  }
}
</script>

<style scoped lang="scss">
.page-title {
  font-size: 24px;
  font-weight: bold;
  color: #333;
  padding: 25px 0px;
}
.input-box {
  width: 400px;
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
