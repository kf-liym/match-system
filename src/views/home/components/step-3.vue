<template>
  <div class="step-3">
    <el-tabs v-model="activeName" @tab-click="handleClick">
      <el-tab-pane label="个人项目" name="first">
        <el-collapse v-model="activeNames" class="match-item" @change="handleChange">
          <el-collapse-item name="1" v-for="(item,index) in personalProjects" :key="index">
            <template slot="title">
              {{item.name}}
              <i class="header-icon el-icon-info" @click="deletePersonalInfo()"></i>
            </template>
            <div class="personal-info-item">
              <el-form
                class="step-2"
                ref="form"
                :model="personalProjectsObject"
                :rules="rules"
                label-width="80px"
              >
                <el-row>
                  <el-col :span="12" class="grid-content">
                    <div>
                      <el-form-item label="姓名">
                        <el-input v-model="item.name" />
                      </el-form-item>
                    </div>
                  </el-col>
                  <el-col :span="12" class="grid-content">
                    <div class="sex-form-item">
                      <el-form-item label="性别">
                        <el-radio v-model="item.sex" label="1">男</el-radio>
                        <el-radio v-model="item.sex" label="2">女</el-radio>
                      </el-form-item>
                    </div>
                  </el-col>
                </el-row>
                <el-row>
                  <el-col :span="24">
                    <div class="grid-content">
                      <el-form-item label="证件类型">
                        <el-input
                          placeholder="请输入证件号码"
                          v-model="item.IDNumber"
                          class="input-with-select"
                        >
                          <el-select
                            class="ddd"
                            v-model="item.certificate"
                            slot="prepend"
                            placeholder="请选择"
                          >
                            <el-option label="身份证" value="1"></el-option>
                            <el-option label="护照" value="2"></el-option>
                            <el-option label="港澳回乡证" value="3"></el-option>
                            <el-option label="台湾回乡证" value="4"></el-option>
                            <el-option label="出生证" value="5"></el-option>
                          </el-select>
                        </el-input>
                      </el-form-item>
                    </div>
                  </el-col>
                </el-row>

                <el-row>
                  <el-col :span="12">
                    <div class="grid-content">
                      <el-form-item label="出生日期">
                        <el-date-picker v-model="item.birth" type="date" placeholder="选择日期"></el-date-picker>
                      </el-form-item>
                    </div>
                  </el-col>
                  <el-col :span="12">
                    <div class="grid-content">
                      <el-form-item label="组别">
                        <el-input v-model="item.group" />
                      </el-form-item>
                    </div>
                  </el-col>
                </el-row>
                <el-form-item label="报名项目1">
                  <el-select
                    v-model="item.selectProjects[0].type"
                    placeholder="请选择报名项目"
                    @change="selectOption(val)"
                  >
                    <el-option
                      v-for="item in projectOptions"
                      :key="item.value"
                      :label="item.label"
                      :value="item.value"
                      :disabled="item.disabled"
                    ></el-option>
                  </el-select>
                </el-form-item>
                <el-form-item label="报名项目2">
                  <el-select
                    v-model="item.selectProjects[1].type"
                    placeholder="请选择报名项目"
                    @change="selectOption(val)"
                  >
                    <el-option
                      v-for="item in projectOptions"
                      :key="item.value"
                      :label="item.label"
                      :value="item.value"
                      :disabled="item.disabled"
                    ></el-option>
                  </el-select>
                </el-form-item>
              </el-form>
              <div class="personal-info-btn">
                <el-button type="primary" @click="confirm()">保存</el-button>
                <el-button type="primary" @click="deletePersonalInfo(index)">删除</el-button>
              </div>
            </div>
          </el-collapse-item>
        </el-collapse>
        <div class="add-personal-info" @click="addPersonalInfo()">新增报项</div>
      </el-tab-pane>
      <el-tab-pane label="对练项目" name="second">配置管理</el-tab-pane>
      <el-tab-pane label="集体项目" name="third">角色管理</el-tab-pane>
    </el-tabs>
  </div>
</template>

<script>
export default {
  name: 'Step3',
  components: {

  },
  props: {

  },
  data () {
    return {
      activeName: 'second',
      activeNames: ['1'],
      personalProjectsObject: {},
      personalProjects: [
        {
          name: '张小明',
          certificate: '', // 证件类型
          IDNumber: '440671199725145421',
          birth: '1997-02-12',
          sex: '男',
          group: '',
          selectProjects: [
            {
              type: '',
              name: ''
            },
            {
              type: '',
              name: ''
            }
          ]
        }
      ],
      selectProjectTemp: [
        {
          type: '',
          name: ''
        },
        {
          type: '',
          name: ''
        }
      ],
      projectOptions: [{
        value: '选项1',
        label: '黄金糕',
        type: 0
      }, {
        value: '选项2',
        label: '双皮奶',
        type: 0

      }, {
        value: '选项3',
        label: '蚵仔煎',
        type: 1

      }, {
        value: '选项4',
        label: '龙须面',
        type: 1
      },
      {
        value: '选项5',
        label: '北京烤鸭',
        type: 0

      }], // 可选项目列表
      selectedList: [],
      rules: {
        name: [
          { required: true, message: '请输入报名人姓名', trigger: 'blur' }
        ],
        certificate: [
          { required: true, message: '请选择证件类型', trigger: 'blur' }
        ],
        IDNumber: [
          { required: true, message: '请输入证件号码', trigger: 'blur' }
        ],
        birth: [
          { required: true, message: '请输入出生年月', trigger: 'blur' }
        ],
        sex: [
          { required: true, message: '请输入性别', trigger: 'blur' }
        ],
        projectName: [
          { required: true, message: '请选择报名项目', trigger: 'blur' }
        ]
      }
    }
  },
  computed: {

  },
  watch: {

  },
  created () {

  },
  mounted () {

  },
  methods: {
    selectOption (val) {
      console.log(val)
    },
    confirm () {
      console.log(this.personalProjects)
    },
    addPersonalInfo () {
      const info = {
        name: '',
        IDNumber: '',
        birth: '',
        sex: '',
        group: '***组',
        projectName: ''
      }
      this.personalProjects.push(info)
    },
    deletePersonalInfo (index) {
      this.personalProjects.splice(index, 1)
    },
    handleClick (tab, event) {
      console.log(tab, event)
    },
    handleChange (val) {
      console.log(val)
    }
  }
}
</script>

<style scoped lang="scss">
.step-3 {
  padding: 20px 20px;
}

.grid-content {
  border-radius: 4px;
  min-height: 36px;
}
.sex-form-item {
  line-height: 36px;
}
.header-icon {
  font-size: 18px;
  position: absolute;
  right: 30px;
}
.ddd {
  width: 130px;
}
.add-personal-info {
  width: 100%;
  height: 30px;
  line-height: 30px;
  text-align: center;
  font-size: 16px;
  color: #333;
  background: rgb(231, 231, 231);
}
// .personal-info-item {
//   border: 1px solid #333;
//   padding: 10px 10px;
// }
.personal-info-btn {
  display: flex;
  justify-content: flex-end;
}
</style>
