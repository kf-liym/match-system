<!-- 常用报名人信息编辑 -->
<template>
  <el-dialog
    class="common-applicants__edit"
    :title="info[type].title"
    :before-close="handleClose"
    :visible.sync="visible"
    :close-on-click-modal="false"
    :close-on-press-escape="false"
  >
    <el-form ref="form" v-loading="loading" :model="form" label-width="100px" size="small" :rules="rules">
      <el-form-item label="姓名" prop="name">
        <el-input v-model="form.name"></el-input>
      </el-form-item>
      <el-form-item label="证件类型" prop="idcard">
        <el-input placeholder="请输入证件号码" v-model="form.idcard" class="input-with-select">
          <el-select
            v-model="form.certificate"
            slot="prepend"
            placeholder="请选择证件类型"
            style="width: 100px"
            @change="validateIdcard"
          >
            <el-option label="身份证" value="身份证"></el-option>
            <el-option label="护照" value="护照"></el-option>
            <el-option label="港澳回乡证" value="港澳回乡证"></el-option>
            <el-option label="台湾回乡证" value="台湾回乡证"></el-option>
            <el-option label="出生证" value="出生证"></el-option>
          </el-select>
        </el-input>
      </el-form-item>
      <!-- <el-form-item label="证件号码" prop="idcard">
        <el-input v-model="form.idcard"></el-input>
      </el-form-item>-->
      <el-form-item label="出生日期" prop="birth">
        <el-date-picker type="date" placeholder="选择出生日期" v-model="form.birth" style="width: 100%;"></el-date-picker>
      </el-form-item>
      <el-form-item label="性别" prop="sex">
        <el-radio-group v-model="form.sex">
          <el-radio label="男"></el-radio>
          <el-radio label="女"></el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item label="纪念服尺寸" prop="size">
        <el-select v-model="form.size" placeholder="请选择纪念服尺寸" style="width: 100%">
          <el-option label="小码" value="小码"></el-option>
          <el-option label="中码" value="中码"></el-option>
          <el-option label="大码" value="大码"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="handleUpdate" v-if="type === 'edit'">修改</el-button>
        <el-button type="primary" @click="handleAdd" v-else>提交</el-button>
        <el-button @click="visible = false">取消</el-button>
      </el-form-item>
    </el-form>
  </el-dialog>
</template>

<script>
import { addMember, putMember } from '@/api'
export default {
  props: {

  },
  data () {
    const validateIdcard = (rule, value, callback) => {
      if (this.form.certificate === '身份证') {
        const regIdCard = /(^\d{15}$)|(^\d{18}$)|(^\d{17}(\d|X|x)$)/;
        if (!regIdCard.test(value)) {
          callback(new Error('身份证号填写有误'))
        } else {
          let year = value.slice(6, 10)
          let month = value.slice(10, 12)
          let day = value.slice(12, 14)
          let sex = value.slice(16, 17) % 2 === 0 ? '女' : '男'
          this.form.birth = `${year}-${month}-${day}`
          this.form.sex = sex
          callback()
        }
      } else {
        callback()
      }
    }
    return {
      loading: false,
      visible: false,
      type: 'add',
      info: {
        add: {
          title: '新增常用报名人信息'
        },
        edit: {
          title: '编辑常用报名人信息'
        }
      },
      form: {
        name: '',
        certificate: '身份证', // 证件类型
        idcard: '',
        birth: '',
        sex: '男',
        size: ''
      },
      rules: {
        name: [
          { required: true, message: '请输入报名人姓名', trigger: 'blur' }
        ],
        certificate: [
          { required: true, message: '请选择证件类型', trigger: 'blur' }
        ],
        idcard: [
          { required: true, message: '请输入证件号码', trigger: 'blur' },
          { validator: validateIdcard, trigger: 'blur' }
        ],
        birth: [
          { required: true, message: '请输入出生年月', trigger: ['blur', 'change'] }
        ],
        sex: [
          { required: true, message: '请输入性别', trigger: 'blur' }
        ],
        size: [
          { required: true, message: '请输入纪念服尺寸', trigger: 'blur' }
        ]
      }
    };
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
    // 显示弹窗
    show (info) {
      if (info) {
        this.type = 'edit'
        this.form.id = info.id
        this.form.name = info.name
        this.form.certificate = info.certificate
        this.form.idcard = info.idcard
        this.form.birth = info.birth
        this.form.sex = info.sex
        this.form.size = info.size
      } else {
        this.type = 'add'
        this.form.name = ''
        this.form.certificate = ''
        this.form.idcard = ''
        this.form.birth = ''
        this.form.sex = '男'
        this.form.size = ''
      }
      this.$nextTick(() => {
        if (this.$refs.form) {
          this.$refs.form.clearValidate()
        }

        this.visible = true
      })

    },
    // 提交
    handleAdd () {
      let _this = this
      _this.loading = true
      _this.form.userId = this.$store.state.user.id
      _this.$refs.form.validate((validate) => {
        if (validate) {
          // 提交/修改完成
          addMember(_this.form, this.$store.state.user.authority === 0 ? 'user' : 'admin').then(res => {
            _this.loading = false
            if (res.data.code === 200) {
              _this.$alert('添加成功', '标题名称', {
                confirmButtonText: '确定',
                callback: action => {
                  _this.visible = false
                  _this.$emit('getList')
                }
              });
            } else {
              _this.$alert(res.data.message || '添加失败', '系统提示', {
                confirmButtonText: '确定',
                callback: action => {

                }
              });
            }
          }).catch(err => {
            _this.loading = false
            _this.$alert(err, '系统提示', {
              confirmButtonText: '确定',
              callback: action => {

              }
            });
          })
        }
      })
    },
    // 修改
    handleUpdate () {
      let _this = this
      _this.loading = true
      _this.$refs.form.validate((validate) => {
        if (validate) {
          putMember(_this.form.id, _this.form, this.$store.state.user.authority === 0 ? 'user' : 'admin').then(res => {
            _this.loading = false
            if (res.data.code === 200) {
              _this.$alert('修改成功', '系统消息', {
                confirmButtonText: '确定',
                callback: action => {
                  _this.visible = false
                  _this.$emit('getList')
                }
              });
            } else {
              _this.$alert('修改失败', '系统消息', {
                confirmButtonText: '确定',
                callback: action => {

                }
              });
            }
          }).catch(err => {
            _this.loading = false
            _this.$alert(err, '系统消息', {
              confirmButtonText: '确定',
              callback: action => {

              }
            });
          })
        }
      })
    },
    // 关闭前的操作
    handleClose () {
      this.visible = false
    },
    // 验证身份证
    validateIdcard () {
      this.$refs.form.validateField('idcard', (errorMessage) => {
        console.log(errorMessage)
      })
    }
  },
  components: {

  }
};
</script>

<style scoped>
.common-applicants__edit >>> .el-dialog {
  width: 500px;
  max-width: 90%;
}
.input-with-select >>> .el-input-group__prepend {
  background-color: #fff;
}
</style>
