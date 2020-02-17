/*
 * @Desc: 新增、编辑报项
 * @Author: liym
 * @Date: 2020-02-14 16:40:41
 * @Last Modified by: liym
 * @Last Modified time: 2020-02-16 19:09:22
 */

<template>
  <el-dialog
    class="common-applicants__choose"
    :title="title[state]+'个人报项'"
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
      <el-form-item prop="name">
        <template slot="label">
          <span style="color: #F56C6C; margin-right: 4px;">*</span>
          姓名：
        </template>
        <div class="form-user" @click="handleChoose">
          <label>{{edit | nameFormat}}</label>
          <i class="el-icon-user"></i>
        </div>
      </el-form-item>
      <el-form-item prop="project">
        <template slot="label">
          <!-- <span style="color: #F56C6C; margin-right: 4px;">*</span> -->
          拳术项目名称：
        </template>
        <el-select
          v-model="edit.project.boxing"
          value-key="label"
          placeholder="请选择报名项目"
          clearable
          style="width: 100%"
          @change="handleBoxingChange"
        >
          <el-option
            v-for="(boxingItem,boxingIndex)  in boxingOptions"
            :key="boxingIndex"
            :label="boxingItem.label"
            :value="boxingItem"
          ></el-option>
        </el-select>
      </el-form-item>
      <el-form-item
        prop="project.boxingRoutine"
        :rules="rules.boxingRoutine"
        v-if="edit.project.boxing.type === 0"
      >
        <template slot="label">
          <span style="color: #F56C6C;  margin-right: 4px;">*</span>
          拳术套路名称：
        </template>
        <el-input
          style="width: 100%;"
          v-model="edit.project.boxingRoutine"
          placeholder="请补充拳术套路名称"
        />
      </el-form-item>
      <el-form-item prop="project">
        <template slot="label">
          <!-- <span style="color: #F56C6C; margin-right: 4px;">*</span> -->
          器械项目名称：
        </template>
        <el-select
          v-model="edit.project.instrument"
          value-key="label"
          clearable
          placeholder="请选择报名项目"
          style="width: 100%;"
          @change="handleInstrumentChange"
        >
          <el-option
            v-for="(instrumentItem, instrumentIndex) in instrumentOptions"
            :key="instrumentIndex"
            :label="instrumentItem.label"
            :value="instrumentItem"
          ></el-option>
        </el-select>
      </el-form-item>
      <el-form-item
        prop="project.instrumentRoutine"
        :rules="rules.instrumentRoutine"
        v-if="edit.project.instrument.type === 0"
      >
        <template slot="label">
          <span style="color: #F56C6C; margin-right: 4px;">*</span>
          器械套路名称：
        </template>
        <el-input
          style="width: 100%;"
          v-model="edit.project.instrumentRoutine"
          placeholder="请补充器械套路名称"
        />
      </el-form-item>
    </el-form>

    <div class="form-footer">
      <el-button type="primary" @click="handleConfirm('formEdit')">{{state === 'add' ? '保存' : '修改'}}</el-button>
      <el-button @click="handleCancel('formEdit')">取消</el-button>
    </div>
  </el-dialog>
</template>

<script>
export default {
  name: 'personEdit',
  props: {
    boxingOptions: {},
    instrumentOptions: {}
  },
  data () {
    return {
      visible: false,
      state: 'add',
      title: {
        add: '新增',
        edit: '编辑'
      },
      edit: {
        id: '',
        name: '',
        certificate: '', // 证件类型
        idcard: '',
        birth: '',
        sex: '',
        size: '',
        group: '',
        project: {
          boxing: '', // 拳术项目
          boxingRoutine: '', // 拳术套路名称
          instrument: '', // 器械项目
          instrumentRoutine: '' // 器械套路名称
        }
      },
      rules: {
        name: [
          { required: true, message: '请选择报项人', trigger: 'change' }
        ],
        project: [
          { validator: this.validateProject, trigger: 'change' }
        ],
        boxingRoutine: [
          { required: true, message: '请填写拳术套路名称', trigger: 'blur' }
        ],
        instrumentRoutine: [
          { required: true, message: '请填写器械套路名称', trigger: 'change' }
        ]
      },
      commonApplicant: {},
      index: -1
    };
  },
  computed: {
    list () {
      return this.$store.state.applicants.applicants
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
        this.edit = {
          id: '',
          name: '',
          certificate: '', // 证件类型
          idcard: '',
          birth: '',
          sex: '',
          size: '',
          group: '',
          project: {
            boxing: '', // 拳术项目
            boxingRoutine: '', // 拳术套路名称
            instrument: '', // 器械项目
            instrumentRoutine: '' // 器械套路名称
          }
        }
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
    handleChoose () {
      this.$emit('choose-user')
    },
    applicantsConfirm (row) {
      let age = new Date().getFullYear() - new Date(row.birth).getFullYear()
      let group = ''
      if (age < 12) {
        group = '儿童组（A组）'
      } else if (age < 18) {
        group = '少年组（B组）'
      } else if (age < 40) {
        group = '青年组（C组）'
      } else if (age < 60) {
        group = '中年组（D组）'
      } else {
        group = '老年组（E组）'
      }
      this.edit = {
        ...this.edit,
        ...row,
        group
      }

      this.$nextTick(() => {
        this.$refs['formEdit'].validateField(['name'])
      })

    },
    validateProject (rule, value, callback) {
      if (value.boxing.label || value.instrument.label) {
        callback()
      } else {
        callback(new Error('拳术、器械项目至少选填一项。'))
      }
    },

    handleConfirm (form) {
      this.$refs[form].validate((valid) => {
        if (valid) {
          this.$emit('confirm', this.index, JSON.parse(JSON.stringify(this.edit)))
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
