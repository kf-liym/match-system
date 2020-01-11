<template>
  <div>
    <div class="box-card" id="account-box">
      <div class="page-title">注册</div>
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
          <router-link class="login-button" :to="{ name: 'signin' }">
            <el-button>返回登陆</el-button>
          </router-link>
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
    const validatePass2 = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请再次输入密码'))
      } else if (value !== this.dataForm.password) {
        callback(new Error('两次输入密码不一致!'))
      } else {
        callback()
      }
    }
    return {
      dataForm: {
        username: '',
        password: '',
        repassword: '',
        email: '',
        register_code: ''
      },
      rules: {
        username: [
          { required: true, message: '请输入注册用户名', trigger: 'blur' }
        ],
        password: [
          { required: true, message: '请输入密码', trigger: 'blur' }
        ],
        repassword: [
          { validator: validatePass2, message: '请再次输入密码', trigger: 'blur' }
        ],
        email: [
          { required: true, message: '请输入邮箱', trigger: 'blur' }
        ]
      }

    }
  },
  computed: {},
  created () { },
  mounted () { },
  watch: {},
  methods: {
    register () {
      this.$refs.register.validate((valid) => {
        if (valid) {
          // eslint-disable-next-line no-alert
          alert('submit!')
        } else {
          console.log('error submit!!')
          return false
        }
      })
    }
  },
  components: {}
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
