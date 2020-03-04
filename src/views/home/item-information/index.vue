<template>
  <div class="step3-wrap" v-loading="loading">
    <el-tabs v-model="active" @tab-click="handleTabClick">
      <el-tab-pane label="个人项目" name="person">
        <person
          class="match-item"
          ref="person"
          :data.sync="person"
          @choose-user="handleChoose"
        ></person>
        <!-- <div class="add-personal-info" @click="addPersonalInfo()">新增个人报项</div> -->
      </el-tab-pane>
      <el-tab-pane label="对练项目" name="duel">
        <duel
          class="match-item"
          ref="duel"
          :data.sync="duel"
          @choose-user="handleChoose"></duel>
        <!-- <step3-duel class="match-item"></step3-duel> -->
        <!-- <div class="add-personal-info" @click="addDuelObj()">新增对练报项</div> -->
      </el-tab-pane>
      <el-tab-pane label="集体项目" name="collective">
        <!-- 集体项目 -->
        <collective
          class="match-item"
          ref="collective"
          :data.sync="collective"
          @choose-user="handleChoose"></collective>
        <!-- <step3-collective class="match-item"></step3-collective> -->

        <!-- <div class="add-personal-info" @click="addTeamObj()">新增团体报项</div> -->
      </el-tab-pane>
    </el-tabs>

    <div class="step-btn-group">
      <el-button type="primary" @click="prevStep()">上一步</el-button>
      <el-button type="primary" @click="nextStep()">下一步</el-button>
    </div>
    <common-applicants :list="applicants" ref="commonApplicants" @confirm="applicantsConfirm"></common-applicants>
  </div>
</template>

<script>

import { getApplicants } from '@/api'
import commonApplicants from '../components/common-applicants'
import Person from './components/person'
import Duel from './components/duel'
import Collective from './components/collective'
export default {
  name: 'step3',
  props: {

  },
  data () {
    return {
      active: 'person',
      loading: true,
      applicants: []
    };
  },
  computed: {
    person: {
      get () {
        return this.$store.state.project.person
      },
      set (val) {
        this.$store.commit('SET_PERSON', val)
      }
    },
    duel: {
      get () {
        return this.$store.state.project.duel
      },
      set (val) {
        this.$store.commit('SET_DULE', val)
      }
    },
    collective: {
      get () {
        return this.$store.state.project.collective
      },
      set (val) {
        this.$store.commit('SET_COLLECTIVE', val)
      }
    }
  },
  created () {
    this.getApplicants()
  },
  mounted () {

  },
  watch: {

  },
  methods: {
    handleChoose (type, index) {
      this.$refs.commonApplicants.show(type, index)
    },
    applicantsConfirm (type, row, index) {
      console.log(type, row, index)
      this.$refs[type].applicantsConfirm(row, index)
    },
    handleTabClick () {

    },
    // 获取信息
    getApplicants () {
      this.loading = true
      getApplicants().then(res => {
        this.loading = false
        this.applicants = res.data
      }).catch(err => {
        this.loading = false
        console.log(err)
      })
    },

    prevStep () {
      this.$store.commit('SET_STEP', 1)
      this.$router.push('/home/step2')
    },
    nextStep () {
      this.$store.commit('SET_STEP', 3)
      this.$router.push('/home/step4')
    }
  },
  components: {
    commonApplicants,
    Person,
    Duel,
    Collective
  }
};
</script>

<style scoped lang="scss">
</style>
