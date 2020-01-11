<template>
  <div class="step-3">
    <el-tabs v-model="activeName" @tab-click="handleClick">
      <el-tab-pane label="个人项目" name="first">
        <el-collapse v-model="activeNames" class="match-item" @change="handleChange">
          <el-collapse-item
            name="1"
            v-for="(person,personIndex) in personalProjects"
            :key="personIndex"
          >
            <template slot="title">
              {{person.name}}
              <i
                class="header-icon el-icon-delete"
                @click="deletePersonalInfo.stop(personIndex)"
              ></i>
            </template>
            <div class="personal-info-item">
              <el-form
                class="step-3"
                :ref="'form'+personIndex"
                :model="person"
                :rules="rules"
                label-width="80px"
              >
                <el-row>
                  <el-col :span="12" class="grid-content">
                    <div>
                      <el-form-item label="姓名" prop="name">
                        <el-input v-model="person.name">
                          <template slot="append">
                            <i class="el-icon-user" @click="showImportApplicantDailog()"></i>
                          </template>
                        </el-input>
                      </el-form-item>
                    </div>
                  </el-col>
                  <el-col :span="12" class="grid-content">
                    <div class="sex-form-item">
                      <el-form-item label="性别" prop="sex">
                        <el-radio v-model="person.sex" label="1">男</el-radio>
                        <el-radio v-model="person.sex" label="2">女</el-radio>
                      </el-form-item>
                    </div>
                  </el-col>
                </el-row>
                <el-row>
                  <el-col :span="24">
                    <div class="grid-content">
                      <el-form-item label="证件类型" prop="certificate">
                        <el-input
                          placeholder="请输入证件号码"
                          v-model="person.IDNumber"
                          class="input-with-select"
                        >
                          <el-select
                            class="ddd"
                            v-model="person.certificate"
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
                      <el-form-item label="出生日期" prop="birth">
                        <el-date-picker v-model="person.birth" type="date" placeholder="选择日期"></el-date-picker>
                      </el-form-item>
                    </div>
                  </el-col>
                  <el-col :span="12">
                    <div class="grid-content">
                      <el-form-item label="组别" prop="group">
                        <el-input v-model="person.group" />
                      </el-form-item>
                    </div>
                  </el-col>
                </el-row>
                <el-row>
                  <el-col :span="12">
                    <div class="grid-content">
                      <el-form-item label="报名项目1" prop="selectProjectObj[0].label">
                        <el-select
                          v-model="person.selectProjectObj[0]"
                          placeholder="请选择报名项目"
                          @change="selectOption1"
                        >
                          <el-option
                            v-for="option in projectOptions"
                            :key="option.value"
                            :label="option.label"
                            :value="option"
                            :disabled="option.disabled"
                          ></el-option>
                        </el-select>
                      </el-form-item>
                    </div>
                  </el-col>
                  <el-col :span="12">
                    <div class="grid-content" v-show="person.selectProjectObj[0].category ===1">
                      <el-form-item label="项目名称" prop="setProjectObj[0]">
                        <el-input v-model="person.setProjectObj[0]" />
                      </el-form-item>
                    </div>
                  </el-col>
                </el-row>

                <el-row>
                  <el-col :span="12">
                    <div class="grid-content">
                      <el-form-item label="报名项目2">
                        <el-select
                          v-model="person.selectProjectObj[1]"
                          placeholder="请选择报名项目"
                          @change="selectOption2"
                        >
                          <el-option
                            v-for="option in projectOptions"
                            :key="option.value"
                            :label="option.label"
                            :value="option"
                            :disabled="option.disabled"
                          ></el-option>
                        </el-select>
                      </el-form-item>
                    </div>
                  </el-col>
                  <el-col :span="12">
                    <div class="grid-content" v-show="person.selectProjectObj[1].category ===1">
                      <el-form-item label="项目名称">
                        <el-input v-model="person.setProjectObj[1]" />
                      </el-form-item>
                    </div>
                  </el-col>
                </el-row>
              </el-form>
              <div class="personal-info-btn">
                <el-button type="primary" @click="confirm(personIndex)">保存</el-button>
                <el-button type="primary" @click="deletePersonalInfo(personIndex)">删除</el-button>
              </div>
            </div>
          </el-collapse-item>
        </el-collapse>
        <div class="add-personal-info" @click="addPersonalInfo()">新增个人报项</div>
      </el-tab-pane>
      <el-tab-pane label="对练项目" name="second">
        <el-collapse v-model="activeNames" class="match-item" @change="handleChange">
          <el-collapse-item
            name="1"
            v-for="(duelObj,duelIndex) in duelExercisesObj"
            :key="duelIndex"
          >
            <template slot="title">
              {{duelObj.participants[0].name}} {{duelObj.participants[1].name}}
              <i
                class="header-icon el-icon-delete"
                @click="deleteduelObj.stop(duelIndex)"
              ></i>
            </template>
            <div class="personal-info-item">
              <el-form
                class="step-3"
                :ref="'duelform'+duelIndex"
                :model="duelObj"
                :rules="rules"
                label-width="80px"
              >
                <el-row>
                  <el-col :span="12">
                    <div class="grid-content">
                      <el-form-item label="对练项目" prop="duelExercise">
                        <el-select
                          v-model="duelObj.duelExercise"
                          placeholder="请选择对练项目"
                          @change="selectOption1"
                        >
                          <el-option
                            v-for="duelItem in duelOptions"
                            :key="duelItem.value"
                            :label="duelItem.label"
                            :value="duelItem"
                          ></el-option>
                        </el-select>
                      </el-form-item>
                    </div>
                  </el-col>
                  <el-col :span="12">
                    <div class="grid-content" v-show="duelObj.duelExercise.category ===1">
                      <el-form-item label="项目名称" prop="setDuelExercise">
                        <el-input v-model="duelObj.setDuelExercise" />
                      </el-form-item>
                    </div>
                  </el-col>
                </el-row>
                <el-row>
                  <el-col :span="12" class="grid-content">
                    <div>
                      <el-form-item label="姓名" prop="name">
                        <el-input v-model="duelObj.participants[0].name">
                          <template slot="append">
                            <i class="el-icon-user" @click="showImportApplicantDailog()"></i>
                          </template>
                        </el-input>
                      </el-form-item>
                    </div>
                  </el-col>
                  <el-col :span="12" class="grid-content">
                    <div class="sex-form-item">
                      <el-form-item label="性别" prop="sex">
                        <el-radio v-model="duelObj.participants[0].sex" label="1">男</el-radio>
                        <el-radio v-model="duelObj.participants[0].sex" label="2">女</el-radio>
                      </el-form-item>
                    </div>
                  </el-col>
                </el-row>
                <el-row>
                  <el-col :span="24">
                    <div class="grid-content">
                      <el-form-item label="证件类型" prop="certificate">
                        <el-input
                          placeholder="请输入证件号码"
                          v-model="duelObj.participants[0].IDNumber"
                          class="input-with-select"
                        >
                          <el-select
                            class="ddd"
                            v-model="duelObj.participants[0].certificate"
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
                      <el-form-item label="出生日期" prop="birth">
                        <el-date-picker
                          v-model="duelObj.participants[0].birth"
                          type="date"
                          placeholder="选择日期"
                        ></el-date-picker>
                      </el-form-item>
                    </div>
                  </el-col>
                  <el-col :span="12">
                    <div class="grid-content">
                      <el-form-item label="组别" prop="group">
                        <el-input v-model="duelObj.participants[0].group" />
                      </el-form-item>
                    </div>
                  </el-col>
                </el-row>
                <el-row>
                  <el-col :span="12" class="grid-content">
                    <div>
                      <el-form-item label="姓名" prop="name">
                        <el-input v-model="duelObj.participants[1].name">
                          <template slot="append">
                            <i class="el-icon-user" @click="showImportApplicantDailog()"></i>
                          </template>
                        </el-input>
                      </el-form-item>
                    </div>
                  </el-col>
                  <el-col :span="12" class="grid-content">
                    <div class="sex-form-item">
                      <el-form-item label="性别" prop="sex">
                        <el-radio v-model="duelObj.participants[1].sex" label="1">男</el-radio>
                        <el-radio v-model="duelObj.participants[1].sex" label="2">女</el-radio>
                      </el-form-item>
                    </div>
                  </el-col>
                </el-row>
                <el-row>
                  <el-col :span="24">
                    <div class="grid-content">
                      <el-form-item label="证件类型" prop="certificate">
                        <el-input
                          placeholder="请输入证件号码"
                          v-model="duelObj.participants[1].IDNumber"
                          class="input-with-select"
                        >
                          <el-select
                            class="ddd"
                            v-model="duelObj.participants[1].certificate"
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
                      <el-form-item label="出生日期" prop="birth">
                        <el-date-picker
                          v-model="duelObj.participants[1].birth"
                          type="date"
                          placeholder="选择日期"
                        ></el-date-picker>
                      </el-form-item>
                    </div>
                  </el-col>
                  <el-col :span="12">
                    <div class="grid-content">
                      <el-form-item label="组别" prop="group">
                        <el-input v-model="duelObj.participants[1].group" />
                      </el-form-item>
                    </div>
                  </el-col>
                </el-row>
              </el-form>
              <div class="personal-info-btn">
                <el-button type="primary" @click="confirmduelObj(duelIndex)">保存</el-button>
                <el-button type="primary" @click="deleteduelObj(duelIndex)">删除</el-button>
              </div>
            </div>
          </el-collapse-item>
        </el-collapse>
        <div class="add-personal-info" @click="addDuelObj()">新增对练报项</div>
      </el-tab-pane>
      <el-tab-pane label="集体项目" name="third">
        <el-collapse v-model="activeNames" class="match-item" @change="handleChange">
          <el-collapse-item
            name="1"
            v-for="(groupObj,groupIndex) in groupExercisesObj"
            :key="groupIndex"
          >
            <template slot="title">
              {{groupObj.team[0].name}}
              <i
                class="header-icon el-icon-delete"
                @click.stop="deleteGroupObj(groupIndex)"
              ></i>
            </template>
            <div class="personal-info-item">
              <el-form
                class="step-3"
                :ref="'groupform'+groupIndex"
                :model="groupObj"
                :rules="rules"
                label-width="80px"
              >
                <el-row>
                  <el-col :span="12">
                    <div class="grid-content">
                      <el-form-item label="报名项目1" prop="groupExerciseSelections[0].label">
                        <el-select
                          v-model="groupObj.groupExerciseSelections[0]"
                          placeholder="请选择报名项目"
                          @change="selectOption1"
                        >
                          <el-option
                            v-for="groupExceciseItem in groupExceciseOptions"
                            :key="groupExceciseItem.value"
                            :label="groupExceciseItem.label"
                            :value="groupExceciseItem"
                            :disabled="groupExceciseItem.disabled"
                          ></el-option>
                        </el-select>
                      </el-form-item>
                    </div>
                  </el-col>
                  <el-col :span="12">
                    <div
                      class="grid-content"
                      v-show="groupObj.groupExerciseSelections[0].category ===1"
                    >
                      <el-form-item label="项目名称" prop="setGroupExerciseObj[0]">
                        <el-input v-model="groupObj.setGroupExerciseObj[0]" />
                      </el-form-item>
                    </div>
                  </el-col>
                </el-row>

                <el-row>
                  <el-col :span="12">
                    <div class="grid-content">
                      <el-form-item label="报名项目2">
                        <el-select
                          v-model="groupObj.groupExerciseSelections[1]"
                          placeholder="请选择报名项目"
                          @change="selectOption2"
                        >
                          <el-option
                            v-for="groupExceciseItem in groupExceciseOptions"
                            :key="groupExceciseItem.value"
                            :label="groupExceciseItem.label"
                            :value="groupExceciseItem"
                            :disabled="groupExceciseItem.disabled"
                          ></el-option>
                        </el-select>
                      </el-form-item>
                    </div>
                  </el-col>
                  <el-col :span="12">
                    <div
                      class="grid-content"
                      v-show="groupObj.groupExerciseSelections[1].category ===1"
                    >
                      <el-form-item label="项目名称">
                        <el-input v-model="groupObj.setGroupExerciseObj[1]" />
                      </el-form-item>
                    </div>
                  </el-col>
                </el-row>

                <div v-for="(teamMember,index) in  groupObj.team" :key="index" class="team">
                  <div class="team-icon" @click="deleteTeamMember(groupIndex,index)">
                    删除该成员
                    <i class="el-icon-delete"></i>
                  </div>

                  <el-row>
                    <el-col :span="12" class="grid-content">
                      <div>
                        <el-form-item label="姓名" prop="name">
                          <el-input v-model="groupObj.team[index].name">
                            <template slot="append">
                              <i class="el-icon-user" @click="showImportApplicantDailog()"></i>
                            </template>
                          </el-input>
                        </el-form-item>
                      </div>
                    </el-col>
                    <el-col :span="12" class="grid-content">
                      <div class="sex-form-item">
                        <el-form-item label="性别" prop="sex">
                          <el-radio v-model="groupObj.team[index].sex" label="1">男</el-radio>
                          <el-radio v-model="groupObj.team[index].sex" label="2">女</el-radio>
                        </el-form-item>
                      </div>
                    </el-col>
                  </el-row>
                  <el-row>
                    <el-col :span="24">
                      <div class="grid-content">
                        <el-form-item label="证件类型" prop="certificate">
                          <el-input
                            placeholder="请输入证件号码"
                            v-model="groupObj.team[index].IDNumber"
                            class="input-with-select"
                          >
                            <el-select
                              class="ddd"
                              v-model="groupObj.team[index].certificate"
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

                  <el-row style="border-bottom:1px solid rgb(170, 167, 167);margin-bottom:20px">
                    <el-col :span="12">
                      <div class="grid-content">
                        <el-form-item label="出生日期" prop="birth">
                          <el-date-picker
                            v-model="groupObj.team[index].birth"
                            type="date"
                            placeholder="选择日期"
                          ></el-date-picker>
                        </el-form-item>
                      </div>
                    </el-col>
                    <el-col :span="12">
                      <div class="grid-content">
                        <el-form-item label="组别" prop="group">
                          <el-input v-model="groupObj.team[index].group" />
                        </el-form-item>
                      </div>
                    </el-col>
                  </el-row>
                </div>
              </el-form>
              <div class="personal-info-btn">
                <el-button type="primary" @click="addTeamMember(groupIndex)">添加报名人</el-button>
                <el-button type="primary" @click="confirmduelObj(groupIndex)">保存</el-button>
                <el-button type="primary" @click="deleteduelObj(groupIndex)">删除</el-button>
              </div>
            </div>
          </el-collapse-item>
        </el-collapse>
        <div class="add-personal-info" @click="addTeamObj()">新增团体报项</div>
      </el-tab-pane>
    </el-tabs>
    <el-dialog title="选择导入报名人信息" :visible.sync="dialogVisible" width="75%" :before-close="handleClose">
          <div class="common-info">
          <table
            class="common-info-table"
            border="1"
            cellspacing="0"
            cellpadding="10"
            align="center"
          >
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
                <td>
                  {{item.name}}
                </td>
                <td>
                   {{item.certificate}}
                </td>
                <td>
                   {{item.IDNumber}}
                </td>
                    <td>
                       {{item.group}}
                </td>
                <td>
                   {{item.birth}}
                </td>
                <td>
                  <el-button type="primary" @click="importInfo(index)">导入</el-button> </td>
              </tr>
            </tbody>
          </table>


      </div>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
      </span>
    </el-dialog>
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
      dialogVisible: false, //导入常用联系人弹框
      activeName: 'third',
      activeNames: ['1'],
      // 个人报项信息数组
      personalProjects: [
        {
          name: '张小明',
          certificate: '', // 证件类型
          IDNumber: '440671199725145421',
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
      projectOptions: [{
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
              IDNumber: '440671199725145421',
              birth: '1997-02-12',
              sex: '男',
              group: ''
            },
            {
              name: '张小明',
              certificate: '', // 证件类型
              IDNumber: '440671199725145421',
              birth: '1997-02-12',
              sex: '男',
              group: ''
            }
          ]
        }
      ],
      // 对练项目可选列表
      duelOptions: [{
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
              IDNumber: '440671199725145421',
              birth: '1997-02-12',
              sex: '男',
              group: ''
            }
          ]
        }
      ],

      // 对练项目可选列表
      groupExceciseOptions: [{
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
        IDNumber: [
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
        IDNumber: '440671199725145421',
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
            IDNumber: '440671199725145421',
            birth: '1997-02-12',
            sex: '男',
            group: ''
          },
          {
            name: '张小明',
            certificate: '', // 证件类型
            IDNumber: '440671199725145421',
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
        IDNumber: '',
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
            IDNumber: '440671199725145421',
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
        .catch(_ => {});
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
</style>
