/*
 * @Desc: 步骤3-对练项目
 * @Author: liym
 * @Date: 2020-02-14 17:57:29
 * @Last Modified by: liym
 * @Last Modified time: 2020-02-14 18:06:30
 */
<template>
  <el-collapse v-model="duelActive" class="step3-duel" @change="handleChange">
    <el-collapse-item name="1" v-for="(duelObj,duelIndex) in duelExercisesObj" :key="duelIndex">
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
                    v-model="duelObj.participants[0].idcard"
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
                    v-model="duelObj.participants[1].idcard"
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
</template>

<script>
export default {
  name: 'step3Duel',
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
