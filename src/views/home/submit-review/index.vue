<template>
  <div class="step-6">
    <div class="unsubmitted" v-if="status === 0">
      <el-button style="width: 200px;" type="primary" @click="handleConfirm">提交</el-button>
    </div>
    <div class="pending" v-else-if="status === 1">
      <div class="title">
        <i class="pending-success el-icon-success"></i>提交成功
      </div>
      <div class="info">管理员审核中，请耐心等待。</div>
    </div>
    <div class="pass" v-else-if="status === 2">
      <div class="title">你已经通过审核</div>
      <div style="text-align: center; margin-bottom: 30px;">
        <el-button type="primary">下载汇总表</el-button>
      </div>

      <ul class="report-team-info">
        <li>责任书：{{ responsibility.length > 0 ? '' : '无' }}</li>
      </ul>
      <div class="image-preview" style="width: 100%; max-width: 1000px; margin: 0 auto;" v-if="responsibility">
        <el-image
          v-for="(item, index) in responsibility"
          :key="index"
          style="width: 100px; height: 100px; margin-right: 10px;"
          :src="item.url"
          :preview-src-list="responsibility"
          fit="cover "
        ></el-image>
      </div>
      <ul class="report-team-info">
        <li>汇款证明：{{ prove.length > 0 ? '' : '无' }}</li>
      </ul>
      <div class="image-preview"  style="width: 100%; max-width: 1000px; margin: 0 auto;" >
        <el-image
          v-for="(item, index) in prove"
          :key="index"
          style="width: 100px; height: 100px; margin-right: 10px;"
          :src="item.url"
          :preview-src-list="prove"
          fit="cover"
        ></el-image>
      </div>
      <ul class="report-team-info">
        <li>队伍名称：{{team.teamName}}</li>
        <li>领队：{{team.leaderName}}</li>
        <li>联系电话：{{team.tel}}</li>
        <li>教练：{{team.coachName}}</li>
      </ul>

      <div class="report-item">
        <div class="report-item__header">个人项目</div>
        <el-table
          class="report-item__body"
          :data="person"
          max-height="400px"
          border
          fit
          style="width: 100%;"
        >
          <el-table-column type="index" label="序号" width="50"></el-table-column>
          <el-table-column prop="name" label="姓名" width="100"></el-table-column>
          <el-table-column prop="idcard" label="证件号码" width="180"></el-table-column>
          <el-table-column prop="birth" label="出生日期" width="110"></el-table-column>
          <el-table-column prop="sex" label="性别" width="60"></el-table-column>
          <el-table-column prop="group" label="组别" width="115"></el-table-column>
          <el-table-column prop="itemName" label="项目名称" min-width="280"></el-table-column>
          <el-table-column prop="cost" label="费用"></el-table-column>
        </el-table>
        <div class="cost-box">合计：{{personalCost}} 元</div>
      </div>

      <div class="report-item">
        <div class="report-item__header">对练项目</div>
        <el-table
          class="report-item__body"
          :data="duel"
          max-height="400px"
          border
          fit
          style="width: 100%;"
        >
          <el-table-column prop="index" label="序号" width="50"></el-table-column>
          <el-table-column prop="name" label="姓名" width="100"></el-table-column>
          <el-table-column prop="idcard" label="证件号码" width="180"></el-table-column>
          <el-table-column prop="birth" label="出生日期" width="110"></el-table-column>
          <el-table-column prop="sex" label="性别" width="60"></el-table-column>
          <el-table-column prop="group" label="组别" width="80"></el-table-column>
          <el-table-column prop="itemName" label="项目名称" min-width="280"></el-table-column>
          <el-table-column prop="cost" label="费用"></el-table-column>
        </el-table>
        <div class="cost-box">合计：{{duelCost}} 元</div>
      </div>

      <div class="report-item">
        <div class="report-item__header">集体项目</div>
        <el-table
          class="report-item__body"
          :data="collective"
          max-height="400px"
          border
          fit
          style="width: 100%;"
        >
          <el-table-column prop="index" label="序号" width="50"></el-table-column>
          <el-table-column prop="name" label="姓名" width="100"></el-table-column>
          <el-table-column prop="idcard" label="证件号码" width="180"></el-table-column>
          <el-table-column prop="birth" label="出生日期" width="110"></el-table-column>
          <el-table-column prop="sex" label="性别" width="60"></el-table-column>
          <el-table-column prop="group" label="组别" width="110"></el-table-column>
          <el-table-column prop="itemName" label="项目名称" min-width="280"></el-table-column>
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
import { getAll, formSubmit } from '@/api'
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
      team: {},
      personT: [],
      duelT: [],
      collectiveT: [],
      responsibility: [],
      prove: []


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
    // team: {
    //   get () {
    //     return this.$store.state.project.team
    //   },
    //   set (val) {
    //     this.$store.commit('SET_TEAM', val)
    //   }
    // },
    // responsibility: {
    //   get () {
    //     return this.$store.state.project.responsibility
    //   },
    //   set (val) {
    //     this.$store.commit('SET_RESPONSIBILITY', val)
    //   }
    // },
    // remittance: {
    //   get () {
    //     return this.$store.state.project.remittance
    //   },
    //   set (val) {
    //     this.$store.commit('SET_REMITTANCE', val)
    //   }
    // },
    person () {
      let arr = []
      this.personT.forEach(item => {
        if (item.boxing) {
          arr.push({
            ...item,
            itemName: `${item.boxing}${item.boxingRoutine ? '-' : ''}${item.boxingRoutine}`,
            cost: 50
          })
        }
        if (item.instrument) {
          arr.push({
            ...item,
            itemName: `${item.instrument}${item.instrumentRoutine ? '-' : ''}${item.instrumentRoutine}`,
            cost: 50
          })
        }
      })
      return arr
    },
    duel () {
      // return this.$store.state.project.duel
      let arr = []
      this.duelT.forEach((item, index) => {
        item.contestants.forEach((contestant, contestantsIndex) => {
          arr.push({
            index: `${index + 1}-${contestantsIndex + 1}`,
            ...contestant,
            itemType: item.itemType,
            itemRoutine: item.itemRoutine,
            itemName: `${item.item}${item.itemRoutine ? '-' : ''}${item.itemRoutine}`,
            cost: 50
          })
        })
      })
      return arr
    },
    collective () {
      // return this.$store.state.project.collective
      let arr = []
      this.collectiveT.forEach((item, index) => {
        item.contestants.forEach((contestant, contestantsIndex) => {
          arr.push({
            index: `${index + 1}-${contestantsIndex + 1}`,
            ...contestant,
            itemType: item.itemType,
            itemRoutine: item.itemRoutine,
            itemName: `${item.item}${item.itemRoutine ? '-' : ''}${item.itemRoutine}`,
            cost: 50
          })
        })
      })
      return arr
    },
    personalCost () {
      let cost = 0
      this.person.forEach(element => {
        cost += 50
      })
      return cost
    },
    duelCost () {
      let cost = 0
      this.duel.forEach(element => {
        cost += 50
      })
      return cost
    },
    collectiveCost () {
      let cost = 0
      this.collective.forEach(element => {
        cost += 50
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
    getAll().then(res => {
      console.log(res)
      this.$store.commit('SET_STATUS', res.data.status)
      this.team = res.data.team
      this.personT = res.data.person
      this.duelT = res.data.duel
      this.collectiveT = res.data.collective
      // this.responsibility = res.data.responsibility
      // this.prove = res.data.prove
      console.log(res.data)
      let responsibility = res.data.responsibility.split(',')
      let responsibilityarr = []
      responsibility.forEach(item => {
        responsibilityarr.push({
          url: item
        })
      })
      this.responsibility = responsibilityarr
      let prove = res.data.responsibility.split(',')
      let provearr = []
      prove.forEach(item => {
        provearr.push({
          url: item
        })
      })
      this.prove = provearr
    }).catch(err => {
      console.log(err)
    })

  },
  mounted () {
  },
  methods: {
    handleConfirm () {
      formSubmit().then(res => {
        if (res.data.code === 200) {
          this.$store.commit('SET_STATUS', res.data.status)
        }
      }).catch(err => {
        this.$message({
          type: 'error',
          message: err
        });
      })
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

.report-team-info {
  margin-top: 15px;
}
.image-preview {
  padding: 10px;
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
