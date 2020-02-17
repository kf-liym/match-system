<template>
  <div class="step-3">
    <el-tabs v-model="activeName" @tab-click="handleClick">
      <el-tab-pane label="个人项目" name="first">
        <step3-person class="match-item"></step3-person>
        <!-- <div class="add-personal-info" @click="addPersonalInfo()">新增个人报项</div> -->
      </el-tab-pane>
      <el-tab-pane label="对练项目" name="second">
        <!-- <step3-duel class="match-item"></step3-duel> -->
        <!-- <div class="add-personal-info" @click="addDuelObj()">新增对练报项</div> -->
      </el-tab-pane>
      <el-tab-pane label="集体项目" name="third">
        <!-- <step3-collective class="match-item"></step3-collective> -->

        <!-- <div class="add-personal-info" @click="addTeamObj()">新增团体报项</div> -->
      </el-tab-pane>
    </el-tabs>
    <el-dialog
      title="选择导入报名人信息"
      :visible.sync="dialogVisible"
      width="75%"
      :before-close="handleClose"
    >
      <div class="common-info">
        <table class="common-info-table" border="1" cellspacing="0" cellpadding="10" align="center">
          <thead>
            <tr>
              <th width="150">序号</th>
              <th width="250">姓名</th>
              <th width="300">证件类型</th>
              <th width="300">证件号码</th>
              <th width="150">性别</th>
              <th width="250">出生日期</th>
              <th width="300">操作</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(item,index) in $store.state.applicants.applicantList" :key="index">
              <td>{{index}}</td>
              <td>{{item.name}}</td>
              <td>{{item.certificate}}</td>
              <td>{{item.idcard}}</td>
              <td>{{item.group}}</td>
              <td>{{item.birth}}</td>
              <td>
                <el-button type="primary" @click="importInfo(index)">导入</el-button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
      </span>
    </el-dialog>
    <div class="step-btn-group">
      <el-button type="primary" @click="prevStep()">上一步</el-button>
      <el-button type="primary" @click="nextStep()">下一步</el-button>
    </div>
  </div>
</template>

<script>
import step3Person from './step-3-person'
export default {
  name: 'Step3',
  components: {
    step3Person
  },
  props: {

  },
  data () {
    return {
      content: '<p>hello world</p>',


      dialogVisible: false, //导入常用联系人弹框
      activeName: 'first',
      personActive: [0],
      duelActive: [0],
      collectiveActive: [0],
      // 个人报项信息数组
      personalProjects: [
        {
          name: '张小明',
          certificate: '', // 证件类型
          idcard: '440671199725145421',
          birth: '1997-02-12',
          sex: '男',
          group: '',
          selectProjectObj: [
            {
              type: 0, // 类别  0 ：拳术  1：器械
              category: 1, // 类型 0 ：规定  1：传统
              label: '' // 选项名
            },
            {
              type: 0, // 类别  0 ：拳术  1：器械
              category: 0, // 类型 0 ：规定  1：传统
              label: '' // 选项名
            }
          ],
          setProjectObj: [
            '', ''
          ]
        },
        {
          name: '张小明',
          certificate: '', // 证件类型
          idcard: '440671199725145421',
          birth: '1997-02-12',
          sex: '男',
          group: '',
          selectProjectObj: [
            {
              type: 0, // 类别  0 ：拳术  1：器械
              category: 1, // 类型 0 ：规定  1：传统
              label: '' // 选项名
            },
            {
              type: 0, // 类别  0 ：拳术  1：器械
              category: 0, // 类型 0 ：规定  1：传统
              label: '' // 选项名
            }
          ],
          setProjectObj: [
            '', ''
          ]
        }
      ],
      // 个人报项项目列表
      projectOptions: [
        {
          value: '1', // 选项值
          label: '个人项目1', // 选项名
          type: 0, // 选项类别
          category: 1 // 选项类型
        }, {
          value: '选项2',
          label: '个人项目2',
          type: 0,
          category: 1
        }, {
          value: '选项3',
          label: '个人项目2',
          type: 1,
          category: 1
        }, {
          value: '选项4',
          label: '个人项目4',
          type: 1,
          category: 0
        },
        {
          value: '选项5',
          label: '个人项目4',
          type: 0,
          category: 0
        }],

      // 对练项目报项列表
      duelExercisesObj: [
        {
          // 对练项目
          duelExercise: {
          },
          setDuelExercise: '',
          participants: [ // 对练双方
            {
              name: '张小明',
              certificate: '', // 证件类型
              idcard: '440671199725145421',
              birth: '1997-02-12',
              sex: '男',
              group: ''
            },
            {
              name: '张小明',
              certificate: '', // 证件类型
              idcard: '440671199725145421',
              birth: '1997-02-12',
              sex: '男',
              group: ''
            }
          ]
        }
      ],
      // 对练项目可选列表
      duelOptions: [
        {
          value: '1', // 选项值
          label: '对练项目1', // 选项名
          type: 0, // 选项类别
          category: 1 // 选项类型
        }, {
          value: '选项2',
          label: '对练项目2',
          type: 0,
          category: 1
        }, {
          value: '选项3',
          label: '对练项目3',
          type: 1,
          category: 1
        }, {
          value: '选项4',
          label: '对练项目4',
          type: 1,
          category: 0
        },
        {
          value: '选项5',
          label: '对练项目5',
          type: 0,
          category: 0
        }],
      // 集体项目报项列表
      groupExercisesObj: [
        {
          // 集体报项项目
          groupExerciseSelections: [
            {
              type: 0, // 类别  0 ：拳术  1：器械
              category: 0, // 类型 0 ：规定  1：传统
              label: '' // 选项名
            },
            {
              type: 0, // 类别  0 ：拳术  1：器械
              category: 0, // 类型 0 ：规定  1：传统
              label: '' // 选项名
            }
          ],
          // 集体报项项目补充名
          setGroupExerciseObj: [
            '', ''
          ],
          team: [ // 团体
            {
              name: '张小明',
              certificate: '', // 证件类型
              idcard: '440671199725145421',
              birth: '1997-02-12',
              sex: '男',
              group: ''
            }
          ]
        }
      ],

      // 对练项目可选列表
      groupExceciseOptions: [
        {
          value: '1', // 选项值
          label: '团体项目1', // 选项名
          type: 0, // 选项类别
          category: 1 // 选项类型
        }, {
          value: '选项2',
          label: '团体项目2',
          type: 0,
          category: 1
        }, {
          value: '选项3',
          label: '团体项目3',
          type: 1,
          category: 1
        }, {
          value: '选项4',
          label: '团体项目4',
          type: 1,
          category: 0
        },
        {
          value: '选项5',
          label: '团体项目5',
          type: 0,
          category: 0
        }],
      rules: {
        name: [
          { required: true, message: '请输入报名人姓名', trigger: 'blur' }
        ],
        certificate: [
          { required: true, message: '请选择证件类型', trigger: 'blur' }
        ],
        idcard: [
          { required: true, message: '请输入证件号码', trigger: 'blur' }
        ],
        birth: [
          { required: true, message: '请输入出生年月', trigger: 'blur' }
        ],
        sex: [
          { required: true, message: '请输入性别', trigger: 'blur' }
        ],
        group: [
          { required: true, message: '请输入组别', trigger: 'blur' }
        ],
        projectName: [
          { required: true, message: '请选择报名项目', trigger: 'blur' }
        ]
      },

      // 拳术项目选项 0:传统项目，1：规定项目
      boxingOptions: [
        { title: '规定陈式太极拳', type: 1 },
        { title: '规定杨式太极拳', type: 1 },
        { title: '规定吴式太极拳', type: 1 },
        { title: '规定武式太极拳', type: 1 },
        { title: '规定孙式太极拳', type: 1 },
        { title: '42式太极拳', type: 1 },
        { title: '24式太极拳', type: 1 },
        { title: '太极八法五步', type: 1 },
        { title: '传统陈式太极拳', type: 0 },
        { title: '传统杨式太极拳', type: 0 },
        { title: '传统吴式太极拳', type: 0 },
        { title: '传统孙式太极拳', type: 0 },
        { title: '传统武式太极拳', type: 0 },
        { title: '其他传统太极拳', type: 0 }
      ],
      // 器械项目选项 0:传统项目，1：规定项目
      instrumentOptions: [
        { title: '42式太极剑', type: 1 },
        { title: '32式太极剑', type: 1 },
        { title: '传统陈式太极器械', type: 0 },
        { title: '传统杨式太极器械', type: 0 },
        { title: '传统吴式太极器械', type: 0 },
        { title: '传统孙式太极器械', type: 0 },
        { title: '传统武式太极器械', type: 0 },
        { title: '其他传统太极器械', type: 0 }
      ]
    }
  },
  computed: {
    editor () {
      return this.$refs.myQuillEditor.quill;
    },
    personalTitle () {
      let title = ''
      this.personalProjects.forEach((item, index) => {
        title += index > 0 ? ` ${index + 1}.${item.name};` : `${index + 1}.${item.name};`
      })
      return title
    }
  },
  watch: {

  },
  created () {

  },
  mounted () {

  },
  methods: {

    // onEditorReady (editor) { // 准备编辑器
    //   console.log('准备编辑器')
    // },
    // onEditorBlur () {// 失去焦点事件

    //   console.log('失去焦点事件')
    // },
    // onEditorFocus () {// 获得焦点事件

    //   console.log('获得焦点事件')
    // },
    // onEditorChange () {// 内容改变事件

    //   console.log('内容改变事件')
    // },
    // saveHtml (event) {
    //   alert(this.content);
    // },


    selectOption1 (val) {
      console.log(val)
      // if(val.type)
      console.log('项目1：', this.personalProjects)
    },
    selectOption2 (val) {
      console.log(val)
      console.log('项目2：', this.personalProjects)
    },
    confirm (index) {
      console.log(this.personalProjects)
      let formName = `form${index}`
      console.log(formName, this.$refs)
      console.log(this.$refs[formName])
      this.$refs[formName][0].validate((valid) => {
        if (valid) {
          alert('submit!')
        } else {
          console.log('error submit!!')
          return false
        }
      })
    },
    addPersonalInfo () {
      let info = {
        name: '张小明',
        certificate: '', // 证件类型
        idcard: '440671199725145421',
        birth: '1997-02-12',
        sex: '男',
        group: '',
        selectProjectObj: [
          {
            type: 0, // 类别  0 ：拳术  1：器械
            category: 1, // 类型 0 ：规定  1：传统
            label: '' // 选项名
          },
          {
            type: 0, // 类别  0 ：拳术  1：器械
            category: 0, // 类型 0 ：规定  1：传统
            label: '' // 选项名
          }
        ],
        setProjectObj: [
          '', ''
        ]
      }
      this.personalProjects.push(info)
    },
    deletePersonalInfo (index) {
      this.personalProjects.splice(index, 1)
    },
    // 保存对练报项信息
    confirmduelObj (index) {
      let duelform = `duelform${index}`
      this.$refs[duelform][0].validate((valid) => {
        if (valid) {
          alert('submit!')
        } else {
          console.log('error submit!!')
          return false
        }
      })
    },
    // 删除对练报项信息
    deleteduelObj (index) {
      if (this.duelExercisesObj.length > 1) {
        this.duelExercisesObj.splice(index, 1)
      }
    },
    // 添加对练报项信息
    addDuelObj () {
      let info = {
        // 对练项目
        duelExercise: {
          type: 0, // 类别  0 ：拳术  1：器械
          category: 1, // 类型 0 ：规定  1：传统
          label: '' // 选项名
        },
        setDuelExercise: '',
        participants: [ // 对练双方
          {
            name: '张小明',
            certificate: '', // 证件类型
            idcard: '440671199725145421',
            birth: '1997-02-12',
            sex: '男',
            group: ''
          },
          {
            name: '张小明',
            certificate: '', // 证件类型
            idcard: '440671199725145421',
            birth: '1997-02-12',
            sex: '男',
            group: ''
          }
        ]
      }
      this.duelExercisesObj.push(info)
    },
    // 添加团队成员
    addTeamMember (index) {
      let teamMember =
      {
        name: '',
        certificate: '', // 证件类型
        idcard: '',
        birth: '',
        sex: '',
        group: ''
      }

      this.groupExercisesObj[index].team.push(teamMember)
    },
    // 删除团队成员
    deleteTeamMember (objIndex, index) {
      console.log('删除成员', objIndex, index)
      console.log('前', this.groupExercisesObj[objIndex])
      if (this.groupExercisesObj[objIndex].team.length > 1) {
        this.groupExercisesObj[objIndex].team.splice(index, 1)
      }
      console.log('后', this.groupExercisesObj[objIndex])
    },
    // 删除团体报项信息
    deleteGroupObj (index) {
      if (this.groupExercisesObj.length > 1) {
        this.groupExercisesObj.splice(index, 1)
      }
    },
    // 新增团体报项信息
    addTeamObj () {
      console.log('新增团体报项')
      let info = {
        // 集体报项项目
        groupExerciseSelections: [
          {
            type: 0, // 类别  0 ：拳术  1：器械
            category: 0, // 类型 0 ：规定  1：传统
            label: '' // 选项名
          },
          {
            type: 0, // 类别  0 ：拳术  1：器械
            category: 0, // 类型 0 ：规定  1：传统
            label: '' // 选项名
          }
        ],
        // 集体报项项目补充名
        setGroupExerciseObj: [
          '', ''
        ],
        team: [ // 团体
          {
            name: '张小明',
            certificate: '', // 证件类型
            idcard: '440671199725145421',
            birth: '1997-02-12',
            sex: '男',
            group: ''
          }

        ]
      }
      let length = this.groupExercisesObj.length
      if (length < 2) {
        this.groupExercisesObj.push(info)
      } else {
        this.$alert('最多报名两项团体项目', '提示', {
          confirmButtonText: '确定'

        })
      }
    },
    //显示导入常用联系人信息面板
    showImportApplicantDailog () {
      console.log('选择常用报名人')
      this.dialogVisible = true
    },
    //导入报名人信息
    importInfo () {

    },
    handleClose (done) {
      this.$confirm('确认关闭？')
        .then(_ => {
          done();
        })
        .catch(_ => { });
    },
    handleClick (tab, event) {
      console.log(tab, event)
    },
    handleChange (val) {
      console.log(val)
    },
    prevStep () {
      this.$emit('stepChange', 1)
    },
    nextStep () {
      this.$emit('stepChange', 3)
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
.header-icon1 {
  font-size: 18px;
  position: absolute;
  right: 60px;
}
.team {
  position: relative;
  font-size: 12px;
  width: 100%;
  color: rgb(252, 6, 6);
}
.team-icon {
  font-size: 12px;
  position: absolute;
  right: 0px;
  z-index: 2;
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

.personal-info-btn {
  display: flex;
  justify-content: flex-end;
}

.step-3__row {
}
.step-3__col {
  float: left;
  + .step-3__col {
    margin-left: 10px;
  }
}
</style>
