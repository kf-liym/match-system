<template>
  <el-dialog title="查看信息" :visible.sync="visible" width="80%" :before-close="handleClose" class="check-wrap">
    <!-- {{data}} -->
    <div class="body">
      <ul class="report-team-info">
        <li>责任书：{{ data.responsibility.length > 0 ? '' : '无' }}</li>
      </ul>
      <div class="image-preview" v-if="data.responsibility">
        <el-image v-for="(item, index) in responsibility" :key="index" style="width: 100px; height: 100px; margin-right: 10px;" :src="item" :preview-src-list="responsibility" fit="cover ">
        </el-image>
      </div>

      <ul class="report-team-info">
        <li>汇款证明：{{ data.prove.length > 0 ? '' : '无' }}</li>
      </ul>
      <div class="image-preview">
        <el-image  v-for="(item, index) in prove" :key="index" style="width: 100px; height: 100px; margin-right: 10px;" :src="item" :preview-src-list="prove" fit="cover">
        </el-image>
      </div>
      <ul class="report-team-info">
        <li>队伍名称：{{data.team.teamName}}</li>
        <li>领队：{{data.team.leaderName}}</li>
        <li>联系电话：{{data.team.tel}}</li>
        <li>教练：{{data.team.coachName}}</li>
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
          <el-table-column prop="groupType" label="组别" width="115"></el-table-column>
          <el-table-column prop="item" label="项目名称" min-width="280"></el-table-column>
          <el-table-column label="费用">
            <span>50</span>
          </el-table-column>
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
          <el-table-column type="index" label="序号" width="50"></el-table-column>
          <el-table-column prop="name" label="姓名" width="100"></el-table-column>
          <el-table-column prop="idcard" label="证件号码" width="180"></el-table-column>
          <el-table-column prop="birth" label="出生日期" width="110"></el-table-column>
          <el-table-column prop="sex" label="性别" width="60"></el-table-column>
          <el-table-column prop="groupType" label="组别" width="80"></el-table-column>
          <el-table-column prop="item" label="项目名称" min-width="280"></el-table-column>
          <el-table-column label="费用">
            <span>50</span>
          </el-table-column>
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
          <el-table-column type="index" label="序号" width="50"></el-table-column>
          <el-table-column prop="name" label="姓名" width="100"></el-table-column>
          <el-table-column prop="idcard" label="证件号码" width="180"></el-table-column>
          <el-table-column prop="birth" label="出生日期" width="110"></el-table-column>
          <el-table-column prop="sex" label="性别" width="60"></el-table-column>
          <el-table-column prop="groupType" label="组别" width="110"></el-table-column>
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
    <span slot="footer" class="dialog-footer">
      <el-button type="primary" v-if="data.status === 0" @click="handleReview">审核通过</el-button>
      <el-button type="success" v-else-if="data.status === 1" @click="visible = false">已审批</el-button>
      <el-button type="info" v-else  @click="visible = false">未提交</el-button>
    </span>
  </el-dialog>
</template>

<script>
import { teamPass, getAdminTeam } from '@/api'
export default {
  name: 'checkDialog',
  props: {
  },
  data () {
    return {

      visible: false,
      data: {
        'uid': '', //用户id
        'rid': '', //项目id
        'count': 0, //总费用（这里的需求改了，只需要显示所有项目的总费用）
        status: 0,
        team: {},
        person: [],
        duel: [],
        collective: [],
        responsibility: '',
        prove: ''
      },
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
      let data = this.data.responsibility.split(',')
      let file = []
      data.forEach(item => {
        console.log(item)
        file.push(item)
      })
      return file
    },
    prove () {
      let data = this.data.prove.split(',')
      let file = []
      data.forEach(item => {
        file.push(item)
      })
      return file
    },
    person () {
      // let arr = []


      // this.data.person.forEach(item => {
      //   if (item.boxing) {
      //     arr.push({
      //       ...item,
      //       itemName: `${item.boxing}${item.boxingRoutine ? '-' : ''}${item.boxingRoutine}`,
      //       cost: 50
      //     })
      //   }
      //   if (item.instrument) {
      //     arr.push({
      //       ...item,
      //       itemName: `${item.instrument}${item.instrumentRoutine ? '-' : ''}${item.instrumentRoutine}`,
      //       cost: 50
      //     })
      //   }
      // })
      // return arr
      return this.data.person
    },
    duel () {
      // let arr = []
      // this.data.duel.forEach((item, index) => {
      //   item.contestants.forEach((contestant, contestantsIndex) => {
      //     arr.push({
      //       index: `${index + 1}-${contestantsIndex + 1}`,
      //       ...contestant,
      //       itemType: item.itemType,
      //       itemRoutine: item.itemRoutine,
      //       itemName: `${item.item}${item.itemRoutine ? '-' : ''}${item.itemRoutine}`,
      //       cost: 50
      //     })
      //   })
      // })
      // return arr
      return this.data.duel
    },
    collective () {
      // return this.$store.state.project.collective
      // let arr = []
      // this.data.collective.forEach((item, index) => {
      //   item.contestants.forEach((contestant, contestantsIndex) => {
      //     arr.push({
      //       index: `${index + 1}-${contestantsIndex + 1}`,
      //       ...contestant,
      //       itemType: item.itemType,
      //       itemRoutine: item.itemRoutine,
      //       itemName: `${item.item}${item.itemRoutine ? '-' : ''}${item.itemRoutine}`,
      //       cost: 50
      //     })
      //   })
      // })
      // return arr
      return this.data.collective
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
  created () {
  },
  mounted () {

  },
  watch: {

  },
  methods: {
    show (id) {
      this.visible = true
      // 替换
      getAdminTeam({ id }).then(res => {
        console.log(res)
        this.data.uid = res.data.uid //用户id
        this.data.rid = res.data.rid //项目id
        this.data.count = res.data.count //总费用（这里的需求改了，只需要显示所有项目的总费用）
        this.data.status = res.data.status
        this.data.team = res.data.team
        this.data.person = res.data.person
        this.data.duel = res.data.duel
        this.data.collective = res.data.collective
        this.data.responsibility = res.data.responsibility
        this.data.prove = res.data.prove
      }).catch(err => {
        console.log(err)
      })
    },
    hide () {
      this.visible = false
    },
    handleClose () {
      this.visible = false
      this.data = {
        'uid': '', //用户id
        'rid': '', //项目id
        'count': 0, //总费用（这里的需求改了，只需要显示所有项目的总费用）
        status: 0,
        team: {},
        person: [],
        duel: [],
        collective: [],
        responsibility: '',
        prove: ''
      }
    },
    handleReview (done) {
      this.$confirm('点击确定通过审核', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消'
      }).then(() => {
        teamPass(this.data.id).then(res => {
          if (res.data.code === 200) {
            this.$emit('get-list')
            this.$message({
              type: 'success',
              message: '已成功通过该申请!'
            })
            this.visible = false
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
