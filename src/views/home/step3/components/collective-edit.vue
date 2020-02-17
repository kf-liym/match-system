/*
 * @Desc: 新增、编辑报项
 * @Author: liym
 * @Date: 2020-02-14 16:40:41
 * @Last Modified by: liym
 * @Last Modified time: 2020-02-16 23:31:56
 */

<template>
  <el-dialog
    class="common-applicants__choose"
    :title="title[state]+'集体报项'"
    :before-close="handleClose"
    :visible.sync="visible"
    width="580px"
    :close-on-click-modal="false"
    :close-on-press-escape="false"
  >
    <el-form
      class="form-wrap"
      ref="formEdit"
      :hide-required-asterisk="true"
      :model="edit"
      :rules="rules"
      label-width="140px"
    >
      <el-form-item prop="itemType">
        <template slot="label">
          <span style="color: #F56C6C; margin-right: 4px;">*</span>
          项目类型：
        </template>
        <el-select
          v-model="edit.itemType"
          value-key="label"
          placeholder="请选择报名项目"
          clearable
          style="width: 100%"
        >
          <el-option
            v-for="(item,index)  in collectiveOptions"
            :key="index"
            :label="item.label"
            :value="item"
          ></el-option>
        </el-select>
      </el-form-item>
      <el-form-item prop="itemName">
        <template slot="label">
          <span style="color: #F56C6C;  margin-right: 4px;">*</span>
          项目名称：
        </template>
        <el-input style="width: 100%;" v-model="edit.itemName" placeholder="请补充项目名称" />
      </el-form-item>
      <el-form-item
        label="姓名："
        :prop="''+(contestant - 1)"
        :rules="rules.contestants"
        v-for="(contestant) in contestantsLen"
        :key="contestant"
      >
        <template slot="label">
          <span style="color: #F56C6C;  margin-right: 4px;">*</span>
          姓名：
        </template>
        <div style="display: flex; align-items: center;">
          <el-input
            v-model="contestants[contestant - 1]"
            readonly
            style="flex: 1; min-width: 0;"
            @click.native="handleChoose(contestant - 1)"
          >
            <template slot="append">
              <i class="el-icon-user"></i>
            </template>
          </el-input>
          <i class="el-icon-delete" v-if="contestantsLen > 6" @click="addDel(contestant - 1)" style="padding: 0 10px;" title="删除"></i>
        </div>
      </el-form-item>
    </el-form>

    <div style="text-align: center; margin-bottom: 30px;">
      <el-button type="success" @click="addUser">添加报项人</el-button>
    </div>
    <div class="form-footer">
      <el-button type="primary" @click="handleConfirm('formEdit')">{{state === 'add' ? '保存' : '修改'}}</el-button>
      <el-button @click="handleCancel('formEdit')">取消</el-button>
    </div>
  </el-dialog>
</template>

<script>
import { nameFormat } from '@/filters'
export default {
  name: 'collectiveEdit',
  props: {
    collectiveOptions: {
      type: Array,
      default () {
        return []
      }
    }
  },
  data () {
    return {
      visible: false,
      state: 'add',
      title: {
        add: '新增',
        edit: '编辑'
      },
      template: {
        contestants: [],
        itemType: '',
        itemName: ''
      },
      edit: {
        contestants: [],
        itemType: '',
        itemName: ''
      },
      rules: {
        contestants: [
          { validator: this.validateContestants, trigger: 'change' }
        ],
        itemType: [
          { required: true, message: '请选择项目类型', trigger: 'change' }
        ],
        itemName: [
          { required: true, message: '请填写项目名称', trigger: 'blur' }
        ]
      },
      commonApplicant: {},
      index: -1
    };
  },
  computed: {
    contestants () {
      let arr = []
      this.edit.contestants.forEach((item, index) => {
        arr[index] = nameFormat(item)
      })
      return arr
    },
    contestantsLen () {
      return this.edit.contestants.length < 6 ? 6 : this.edit.contestants.length
    }
  },
  created () {

  },
  mounted () {

  },
  watch: {
  },
  methods: {
    show (type, index, data) {
      this.state = type
      this.index = index
      if (data) {
        this.edit = JSON.parse(JSON.stringify(data))
      } else {
        this.edit = JSON.parse(JSON.stringify(this.template))
      }

      this.visible = true
      this.$nextTick(() => {
        this.$refs['formEdit'].clearValidate()
      })
    },
    hide () {
      this.handleClose()
    },
    // 关闭前的操作
    handleClose () {
      this.visible = false
      this.$refs['formEdit'].clearValidate()
    },
    // 点击选择用户
    handleChoose (index) {
      this.$emit('choose-user', index)
    },
    applicantsConfirm (row, index) {
      console.log('applicantsConfirm', row, index)
      let age = new Date().getFullYear() - new Date(row.birth).getFullYear()
      let group = ''
      if (age < 18) {
        group = '少年组'
      } else {
        group = '成年组'
      }
      // this.edit = {
      //   ...this.edit,
      //   ...row,
      //   group
      // }
      this.$set(this.edit.contestants, index, {
        ...row,
        group
      })
    },
    validateContestants (rule, value, callback) {
      let end = parseInt(rule.fullField)
      if (this.edit.contestants[end]) {
        if (this.edit.contestants[end] && this.edit.contestants[end].name && this.edit.contestants[end].name.length > 0) {
          let flag = true
          for (let i = 0; i < end; i++) {
            if (this.edit.contestants[rule.fullField] && this.edit.contestants[i] && (this.edit.contestants[rule.fullField].idcard === this.edit.contestants[i].idcard)) {
              flag = false
            }
          }
          if (flag) {
            callback()
          } else {
            callback(new Error('组内不能有重复的参赛者。'))
          }

        } else {
          callback(new Error('请选择报项人。'))
        }

      } else {
        callback(new Error('请选择报项人。'))
      }
    },

    handleConfirm (form) {
      this.$refs[form].validate((valid) => {
        if (valid) {
          if (this.edit.contestants.length < 6) {
            this.$alert('填报失败，集体项目至少要6个人。', '提示', {
              confirmButtonText: '确定',
              type: 'error'
            });
          } else {
            this.$emit('confirm', this.index, JSON.parse(JSON.stringify(this.edit)))
          }

        } else {
          return false
        }
      })
    },

    handleCancel () {
      this.visible = false
    },
    handleBoxingChange (val) {
      if (val.type === 1) {
        this.edit.project.boxingRoutine = ''
      }
      this.$refs['formEdit'].validateField(['project', 'project.boxingRoutine'])
    },
    handleInstrumentChange (val) {
      if (val.type === 1) {
        this.edit.project.instrumentRoutine = ''
      }
      this.$refs['formEdit'].validateField(['project', 'project.instrumentRoutine'])
    },
    // 添加报项人
    addUser () {
      this.$set(this.edit.contestants, this.contestantsLen, {})
    },
    // 添加报项人
    addDel (index) {
      this.$delete(this.edit.contestants, index)
    }

  },
  components: {

  }
};
</script>

<style scoped lang="scss">
.form-wrap {
  width: 100%;
  max-width: 500px;
  .form-user {
    display: flex;

    border-radius: 4px;
    height: 40px;
    line-height: 40px;
    padding: 0 0 0 15px;
    border: 1px solid #dcdfe6;
    label {
      flex: 1;
    }
    .el-icon-user {
      width: 50px;
      display: flex;
      align-items: center;
      justify-content: center;
      border-left: 1px solid #dcdfe6;
    }
  }
}
.form-footer {
  text-align: center;
}
</style>
