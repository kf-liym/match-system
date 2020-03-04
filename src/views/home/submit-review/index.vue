<template>
  <div class="step-6">
    <div class="unsubmitted" v-if="status === '未提交'">
      <el-button style="width: 200px;" type="primary" @click="handleConfirm">提交</el-button>
    </div>
    <div class="pending" v-else-if="status === '已提交' || status === '未审核'">
      <div class="title">
        <i class="pending-success el-icon-success"></i>提交成功
      </div>
      <div class="info">管理员审核中，请耐心等待。</div>
    </div>
    <div class="pass" v-else-if="status === '已审核'">
      <div class="title">你已经通过审核</div>
      <div style="text-align: center; margin-bottom: 30px;">
        <el-button type="primary">下载汇总表</el-button>
      </div>

      <ul class="report-team-info">
        <li>责任书：{{ responsibility.length > 0 ? '' : '无' }}</li>
      </ul>
      <div class="image-preview" v-if="responsibility">
        <el-image v-for="(item, index) in responsibility" :key="index" style="width: 100px; height: 100px; margin-right: 10px;" :src="item" :preview-src-list="responsibility" fit="cover ">
        </el-image>
      </div>
      <ul class="report-team-info">
        <li>汇款证明：{{ remittance.length > 0 ? '' : '无' }}</li>
      </ul>
      <div class="image-preview">
        <el-image  v-for="(item, index) in remittance" :key="index" style="width: 100px; height: 100px; margin-right: 10px;" :src="item" :preview-src-list="remittance" fit="cover">
        </el-image>
      </div>
      <ul class="report-team-info">
        <li>队伍名称：{{team.teamName}}</li>
        <li>领队：{{team.leaderName}}</li>
        <li>联系电话：{{team.tel}}</li>
        <li>教练：{{team.coachName}}</li>
      </ul>

      <div class="report-item">
        <div class="report-item__header">个人项目</div>
        <el-table class="report-item__body" :data="person" border fit style="width: 100%;">
          <el-table-column type="index" label="序号" width="50"></el-table-column>
          <el-table-column prop="name" label="姓名" width="100"></el-table-column>
          <el-table-column prop="idcard" label="证件号码" width="180"></el-table-column>
          <el-table-column prop="birth" label="出生日期" width="110"></el-table-column>
          <el-table-column prop="sex" label="性别" width="60"></el-table-column>
          <el-table-column prop="group" label="组别" width="115"></el-table-column>
          <el-table-column prop="item" label="项目名称" min-width="280"></el-table-column>
          <el-table-column prop="cost" label="费用"></el-table-column>
        </el-table>
        <div class="cost-box">合计：{{personalCost}} 元</div>
      </div>

      <div class="report-item">
        <div class="report-item__header">对练项目</div>
        <el-table class="report-item__body" :data="duel" border fit style="width: 100%;">
          <el-table-column prop="index" label="序号" width="50"></el-table-column>
          <el-table-column prop="name" label="姓名" width="100"></el-table-column>
          <el-table-column prop="idcard" label="证件号码" width="180"></el-table-column>
          <el-table-column prop="birth" label="出生日期" width="110"></el-table-column>
          <el-table-column prop="sex" label="性别" width="60"></el-table-column>
          <el-table-column prop="group" label="组别" width="80"></el-table-column>
          <el-table-column prop="item" label="项目名称" min-width="280"></el-table-column>
          <el-table-column prop="cost" label="费用"></el-table-column>
        </el-table>
        <div class="cost-box">合计：{{duelCost}} 元</div>
      </div>

      <div class="report-item">
        <div class="report-item__header">集体项目</div>
        <el-table class="report-item__body" :data="collective" border fit style="width: 100%;">
          <el-table-column prop="index" label="序号" width="50"></el-table-column>
          <el-table-column prop="name" label="姓名" width="100"></el-table-column>
          <el-table-column prop="idcard" label="证件号码" width="180"></el-table-column>
          <el-table-column prop="birth" label="出生日期" width="110"></el-table-column>
          <el-table-column prop="sex" label="性别" width="60"></el-table-column>
          <el-table-column prop="group" label="组别" width="110"></el-table-column>
          <el-table-column prop="item" label="项目名称" min-width="280"></el-table-column>
        </el-table>
        <div class="cost-box">合计：{{collectiveCost}} 元</div>
      </div>
      <div class="report-item">
        <el-table class="report-item__body" :data="aggregateCost" border fit style="width: 100%;">
          <el-table-column prop="item" label="项目" width="100"></el-table-column>
          <el-table-column prop="personal" label="个人项目" min-width="100"></el-table-column>
          <el-table-column prop="duel" label="对练项目" min-width="100"></el-table-column>
          <el-table-column prop="collective" label="集体项目" min-width="100"></el-table-column>
          <el-table-column prop="cost" label="合计" width="150"></el-table-column>
        </el-table>
      </div>
    </div>
  </div>
</template>

<script>
import { getProject } from '@/api'
export default {
  name: 'Step6',
  components: {

  },
  props: {
    value: {
      type: Object
    }
  },
  data () {
    return {

    }
  },
  computed: {
    status: {
      get () {
        return this.$store.state.project.status
      },
      set (val) {
        this.$store.commit('SET_STATUS', val)
      }
    },
    team: {
      get () {
        return this.$store.state.project.team
      },
      set (val) {
        this.$store.commit('SET_TEAM', val)
      }
    },
    responsibility: {
      get () {
        return this.$store.state.project.responsibility
      },
      set (val) {
        this.$store.commit('SET_RESPONSIBILITY', val)
      }
    },
    remittance: {
      get () {
        return this.$store.state.project.remittance
      },
      set (val) {
        this.$store.commit('SET_REMITTANCE', val)
      }
    },
    person () {
      let arr = []
      this.$store.state.project.person.forEach(item => {
        if (item.project.boxing && item.project.boxing.label) {
          arr.push({
            ...item,
            item: `${item.project.boxing.label}${item.project.boxingRoutine ? '-' : ''}${item.project.boxingRoutine}`,
            cost: 50
          })
        }
        if (item.project.instrument && item.project.instrument.label) {
          arr.push({
            ...item,
            item: `${item.project.instrument.label}${item.project.instrumentRoutine ? '-' : ''}${item.project.instrumentRoutine}`,
            cost: 50
          })
        }
      })
      return arr
    },
    duel () {
      // return this.$store.state.project.duel
      let arr = []
      // console.log(this.$store.state.project.duel)
      this.$store.state.project.duel.forEach((item, index) => {
        item.contestants.forEach((contestant, contestantsIndex) => {
          arr.push({
            index: `${index + 1}-${contestantsIndex + 1}`,
            ...contestant,
            itemType: item.itemType,
            itemName: item.itemName,
            item: `${item.itemType.label}${item.itemName ? '-' : ''}${item.itemName}`,
            cost: 50
          })
        })
      })
      return arr
    },
    collective () {
      // return this.$store.state.project.collective
      let arr = []
      this.$store.state.project.collective.forEach((item, index) => {
        item.contestants.forEach((contestant, contestantsIndex) => {
          // console.log(contestant)
          arr.push({
            index: `${index + 1}-${contestantsIndex + 1}`,
            ...contestant,
            itemType: item.itemType,
            itemName: item.itemName,
            item: `${item.itemType.label}${item.itemName ? '-' : ''}${item.itemName}`,
            cost: 50
          })
        })
      })
      return arr
    },
    personalCost () {
      let cost = 0
      this.person.forEach(element => {
        cost += element.cost
      })
      return cost
    },
    duelCost () {
      let cost = 0
      this.duel.forEach(element => {
        cost += element.cost
      })
      return cost
    },
    collectiveCost () {
      let cost = 0
      this.collective.forEach(element => {
        cost += element.cost
      })
      return cost
    },
    // 汇总费用
    aggregateCost () {
      return [
        {
          item: '费用',
          personal: this.personalCost,
          duel: this.duelCost,
          collective: this.collectiveCost,
          cost: this.personalCost + this.duelCost + this.collectiveCost
        }
      ]
    }
  },
  watch: {

  },
  created () {
    getProject().then(res => {
      console.log(res.data)
      this.$store.commit('SET_STATUS', res.data.status)
      this.$store.commit('SET_RESPONSIBILITY', res.data.responsibility)
      this.$store.commit('SET_REMITTANCE', res.data.remittance)
      this.$store.commit('SET_TEAM', res.data.team)
      this.$store.commit('SET_PERSON', res.data.person)
      this.$store.commit('SET_DULE', res.data.duel)
      this.$store.commit('SET_COLLECTIVE', res.data.collective)
    }).catch(err => {
      console.log(err)
    })

  },
  mounted () {
  },
  methods: {
    handleConfirm () {
      this.status = '已提交'
    }
  }
}
</script>

<style scoped lang="scss">
.unsubmitted {
  text-align: center;
  padding: 60px 0 0;
}
.pending {
  text-align: center;
  margin-top: 50px;
  .title {
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 30px;
    line-height: 1;
  }
  .info {
    color: #969696;
    margin-top: 10px;
  }
  .pending-success {
    color: green;
    font-size: 46px;
    margin-right: 10px;
  }
}

.pass {
  padding: 20px 0 30px;
  .title {
    color: green;
    font-size: 20px;
    font-weight: bold;
    text-align: center;
    margin-bottom: 30px;
  }
}
</style>
