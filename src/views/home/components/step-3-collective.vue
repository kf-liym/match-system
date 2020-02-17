/*
 * @Desc: 步骤3-集体项目
 * @Author: liym
 * @Date: 2020-02-14 17:57:29
 * @Last Modified by: liym
 * @Last Modified time: 2020-02-14 18:06:55
 */

<template>
  <el-collapse v-model="collectiveActive" class="match-item" @change="handleChange">
    <el-collapse-item name="1" v-for="(groupObj,groupIndex) in groupExercisesObj" :key="groupIndex">
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
              <div class="grid-content" v-show="groupObj.groupExerciseSelections[0].category ===1">
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
              <div class="grid-content" v-show="groupObj.groupExerciseSelections[1].category ===1">
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
                      v-model="groupObj.team[index].idcard"
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
</template>

<script>
export default {
  name: 'step3Collective',
  props: {

  },
  data () {
    return {

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

  },
  components: {

  }
};
</script>

<style scoped lang="scss">
</style>
