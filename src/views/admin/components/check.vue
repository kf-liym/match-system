<template>
  <el-dialog title="查看信息" :visible.sync="visibles" width="80%" :before-close="handleClose" class="check-wrap">
    <!-- {{value}} -->
    <div class="body">
      <ul class="report-team-info">
        <li>责任书：{{ value.responsibility.length > 0 ? '' : '无' }}</li>
      </ul>
      <div class="image-preview" v-if="value.responsibility">
        <el-image v-for="(item, index) in responsibility" :key="index" style="width: 100px; height: 100px; margin-right: 10px;" :src="item" :preview-src-list="responsibility" fit="cover ">
        </el-image>
      </div>

      <ul class="report-team-info">
        <li>汇款证明：{{ value.prove.length > 0 ? '' : '无' }}</li>
      </ul>
      <div class="image-preview">
        <el-image  v-for="(item, index) in prove" :key="index" style="width: 100px; height: 100px; margin-right: 10px;" :src="item" :preview-src-list="prove" fit="cover">
        </el-image>
      </div>
      <ul class="report-team-info">
        <li>队伍名称：{{value.team.teamName}}</li>
        <li>领队：{{value.team.leaderName}}</li>
        <li>联系电话：{{value.team.tel}}</li>
        <li>教练：{{value.team.coachName}}</li>
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
    <span slot="footer" class="dialog-footer">
      <el-button type="primary" @click="handleReview">审核通过</el-button>
    </span>
  </el-dialog>
</template>

<script>
import { teamPass } from '@/api'
export default {
  name: 'checkDialog',
  props: {
    visible: {
      type: Boolean
    },
    value: {
      default () {
        return {
        }
      }
    }
  },
  data () {
    return {

      // visible: false,
      cover: 'https://ss1.bdstatic.com/70cFvXSh_Q1YnxGkpoWK1HF6hhy/it/u=2844401865,2654823704&fm=26&gp=0.jpg',
      cover1: 'https://ss1.bdstatic.com/70cFvXSh_Q1YnxGkpoWK1HF6hhy/it/u=1305353222,2352820043&fm=26&gp=0.jpg',
      srcList: [
        'https://ss1.bdstatic.com/70cFuXSh_Q1YnxGkpoWK1HF6hhy/it/u=1207178343,294634082&fm=26&gp=0.jpg',
        'https://ss0.bdstatic.com/70cFvHSh_Q1YnxGkpoWK1HF6hhy/it/u=1282658402,332009284&fm=26&gp=0.jpg'
      ]
    }
  },
  computed: {
    responsibility () {
      let arr = []
      this.value.responsibility.forEach(item => {
        arr.push(item.url)
      })
      return arr
    },
    prove () {
      let arr = []
      this.value.prove.forEach(item => {
        arr.push(item.url)
      })
      return arr
    },
    visibles: {
      get () {
        return this.visible
      },
      set (val) {
        this.$emit('update:visible', val)
      }
    },
    // responsibility: {
    //   get () {
    //     return this.value.responsibility
    //   },
    //   set (val) {
    //     this.$store.commit('SET_RESPONSIBILITY', val)
    //   }
    // },
    // remittance: {
    //   get () {
    //     return this.value.remittance
    //   },
    //   set (val) {
    //     this.$store.commit('SET_REMITTANCE', val)
    //   }
    // },
    person () {
      let arr = []
      this.value.person.forEach(item => {
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
      let arr = []
      this.value.duel.forEach((item, index) => {
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
      this.value.collective.forEach((item, index) => {
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
  created () {
    console.log(this.value)
  },
  mounted () {

  },
  watch: {

  },
  methods: {
    handleClose () {
      this.visibles = false
    },
    handleReview (done) {
      this.$confirm('点击确定通过审核', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消'
      }).then(() => {
        teamPass(this.value.id).then(res => {
          if (res.data.code === 200) {
            this.$emit('get-list')
            this.$message({
              type: 'success',
              message: '已成功打回该申请!'
            })
            this.visibles = false
          }
        }).catch(err => {
          console.log(err)
        })
      }).catch(() => {
        // this.$message({
        //   type: 'info',
        //   message: '已取消删除'
        // })
      });
    }
  },
  components: {

  }
};
</script>

<style scoped lang="scss">
.body {
  flex: 1;
  border: 1px solid #ddd;
  padding: 30px;
  border-radius: 5px;
  overflow: auto;
}
.report-team-info {
  margin-top: 15px;
}
.image-preview {
  padding: 10px;
}
</style>
