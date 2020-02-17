/*
 * @Desc: 步骤3-个人项目
 * @Author: liym
 * @Date: 2020-02-14 17:57:29
 * @Last Modified by: liym
 * @Last Modified time: 2020-02-14 22:49:54
 */

<template>
  <div class="step3-person">
    <div class="empty" v-if="list.length < 1">暂无数据，请添加数据</div>
    <el-collapse v-else v-model="active" @change="handleChange">
      <el-collapse-item :name="index" v-for="(person,index) in list" :key="index">
        <template slot="title">
          {{(index+1)+'、'+person.name}}
          <i
            class="header-icon el-icon-delete"
            @click="deletePersonalInfo.stop(index)"
          ></i>
        </template>
        <div class="personal-info-item">
          <el-form
            class="step-3"
            :ref="'form'+index"
            :model="person"
            :rules="rules"
            label-width="110px"
          >
            <el-form-item label="姓名：" prop="name">
              <el-input v-model="person.name" style="width: 100%; max-width: 400px;">
                <template slot="append">
                  <i class="el-icon-user" @click="chooseUser"></i>
                </template>
              </el-input>
            </el-form-item>
            <el-form-item label="拳术项目名称：" prop="selectProjectObj[0].label">
              <el-select
                v-model="person.selectProjectObj[0]"
                placeholder="请选择报名项目"
                style="width: 100%; max-width: 400px;"
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
              <!-- <el-input
                    style="float: left; width: 300px; margin-left: 10px;"
                    v-model="person.setProjectObj[0]"
                    placeholder="请补充拳术套路名称"
              />-->
            </el-form-item>
            <el-form-item label="拳术套路名称：" prop="selectProjectObj[0].label">
              <el-input
                style="width: 100%; max-width: 400px;"
                v-model="person.setProjectObj[0]"
                placeholder="请补充拳术套路名称"
              />
            </el-form-item>
            <el-form-item label="器械项目名称：" prop="selectProjectObj[0].label">
              <el-select
                v-model="person.selectProjectObj[0]"
                placeholder="请选择报名项目"
                style="width: 100%; max-width: 400px;"
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
              <!-- <el-input
                    style="float: left; width: 300px; margin-left: 10px;"
                    v-model="person.setProjectObj[0]"
                    placeholder="请补充器械套路名称"
              />-->
            </el-form-item>
            <el-form-item label="器械套路名称：" prop="selectProjectObj[0].label">
              <el-input
                style="width: 100%; max-width: 400px;"
                v-model="person.setProjectObj[0]"
                placeholder="请补充器械套路名称"
              />
            </el-form-item>
          </el-form>
          <div class="personal-info-btn">
            <el-button type="primary" @click="confirm(index)">保存</el-button>
            <el-button type="primary" @click="deletePersonalInfo(index)">删除</el-button>
          </div>
        </div>
      </el-collapse-item>
      <el-collapse-item :name="edit" :key="index">
        <template slot="title">
          {{(index+1)+'、'+person.name}}
          <i
            class="header-icon el-icon-delete"
            @click="deletePersonalInfo.stop(index)"
          ></i>
        </template>
        <div class="personal-info-item">
          <el-form
            class="step-3"
            :ref="'form'+index"
            :model="person"
            :rules="rules"
            label-width="110px"
          >
            <el-form-item label="姓名：" prop="name">
              <el-input v-model="person.name" style="width: 100%; max-width: 400px;">
                <template slot="append">
                  <i class="el-icon-user" @click="chooseUser"></i>
                </template>
              </el-input>
            </el-form-item>
            <el-form-item label="拳术项目名称：" prop="selectProjectObj[0].label">
              <el-select
                v-model="person.selectProjectObj[0]"
                placeholder="请选择报名项目"
                style="width: 100%; max-width: 400px;"
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
              <!-- <el-input
                    style="float: left; width: 300px; margin-left: 10px;"
                    v-model="person.setProjectObj[0]"
                    placeholder="请补充拳术套路名称"
              />-->
            </el-form-item>
            <el-form-item label="拳术套路名称：" prop="selectProjectObj[0].label">
              <el-input
                style="width: 100%; max-width: 400px;"
                v-model="person.setProjectObj[0]"
                placeholder="请补充拳术套路名称"
              />
            </el-form-item>
            <el-form-item label="器械项目名称：" prop="selectProjectObj[0].label">
              <el-select
                v-model="person.selectProjectObj[0]"
                placeholder="请选择报名项目"
                style="width: 100%; max-width: 400px;"
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
              <!-- <el-input
                    style="float: left; width: 300px; margin-left: 10px;"
                    v-model="person.setProjectObj[0]"
                    placeholder="请补充器械套路名称"
              />-->
            </el-form-item>
            <el-form-item label="器械套路名称：" prop="selectProjectObj[0].label">
              <el-input
                style="width: 100%; max-width: 400px;"
                v-model="person.setProjectObj[0]"
                placeholder="请补充器械套路名称"
              />
            </el-form-item>
          </el-form>
          <div class="personal-info-btn">
            <el-button type="primary" @click="confirm(index)">保存</el-button>
            <el-button type="primary" @click="deletePersonalInfo(index)">删除</el-button>
          </div>
        </div>
      </el-collapse-item>
    </el-collapse>

    <div class="add" @click="add()">新增个人报项</div>
  </div>
</template>

<script>
export default {
  name: 'step3Person',
  props: {
    list: {
      type: Array,
      default () {
        return []
      }
    }
  },
  data () {
    return {
      active: [],
      edit: -1
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
    // 选择常用人
    chooseUser () {

    },
    // 添加项
    add () {

    }
  },
  components: {

  }
};
</script>

<style scoped lang="scss">
.empty {
  height: 300px;
  line-height: 300px;
  text-align: center;
}
</style>
