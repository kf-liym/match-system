<template>
  <div class="step3-wrap">
    <el-tabs v-model="active" @tab-click="handleTabClick">
      <el-tab-pane label="个人项目" name="person">
        <person
          class="match-item"
          ref="person"
          @choose-user="handleChoose"
        ></person>
        <!-- <div class="add-personal-info" @click="addPersonalInfo()">新增个人报项</div> -->
      </el-tab-pane>
      <el-tab-pane label="对练项目" name="duel">
        <duel
          class="match-item"
          ref="duel"
          @choose-user="handleChoose"></duel>
        <!-- <step3-duel class="match-item"></step3-duel> -->
        <!-- <div class="add-personal-info" @click="addDuelObj()">新增对练报项</div> -->
      </el-tab-pane>
      <el-tab-pane label="集体项目" name="collective">
        <!-- 集体项目 -->
        <collective
          class="match-item"
          ref="collective"
          @choose-user="handleChoose"></collective>
        <!-- <step3-collective class="match-item"></step3-collective> -->

        <!-- <div class="add-personal-info" @click="addTeamObj()">新增团体报项</div> -->
      </el-tab-pane>
    </el-tabs>

    <div class="step-btn-group" >
      <el-button type="primary" @click="prevStep()">上一步</el-button>
      <el-button type="primary" @click="nextStep()">下一步</el-button>
    </div>
    <common-applicants ref="commonApplicants" @confirm="applicantsConfirm"></common-applicants>
  </div>
</template>

<script>

// import { getItems } from '@/api'
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
      loading: true
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
    handleChoose (type, index) {
      this.$refs.commonApplicants.show(type, index)
    },
    applicantsConfirm (type, row, index) {
      this.$refs[type].applicantsConfirm(row, index)
    },
    handleTabClick () {

    },

    prevStep () {
      this.$store.dispatch('STEP_PREV', { router: this.$router, route: this.$route })
    },
    nextStep () {
      this.$store.dispatch('STEP_NEXT', { router: this.$router, route: this.$route })
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
