<template>
  <el-dialog title="查看信息" :visible.sync="visibles" width="80%" :before-close="handleClose" class="check-wrap">
    <div class="body">
      <ul class="report-team-info">
        <li>责任书：{{ value.responsibility.length > 0 ? '' : '无' }}</li>
      </ul>
      <div class="image-preview" v-if="value.responsibility">
        <el-image v-for="(item, index) in value.responsibility" :key="index" style="width: 100px; height: 100px; margin-right: 10px;" :src="item" :preview-src-list="value.responsibility" fit="cover ">
        </el-image>
      </div>

      <ul class="report-team-info">
        <li>汇款证明：{{ value.remittance.length > 0 ? '' : '无' }}</li>
      </ul>
      <div class="image-preview">
        <el-image  v-for="(item, index) in value.remittance" :key="index" style="width: 100px; height: 100px; margin-right: 10px;" :src="item" :preview-src-list="value.remittance" fit="cover">
        </el-image>
      </div>
      <ul class="report-team-info">
        <li>队伍名称：{{value.teamName}}</li>
        <li>领队：{{value.leaderName}}</li>
        <li>联系电话：{{value.tel}}</li>
        <li>教练：{{value.coachName}}</li>
      </ul>
      <div class="report-item">
        <div class="report-item__header">个人项目</div>
        <el-table class="report-item__body" :data="value.personalProject" border fit style="width: 100%;">
          <el-table-column prop="index" label="序号" width="50"></el-table-column>
          <el-table-column prop="name" label="姓名" width="100"></el-table-column>
          <el-table-column prop="IDNumber" label="证件号码" width="180"></el-table-column>
          <el-table-column prop="birth" label="出生日期" width="110"></el-table-column>
          <el-table-column prop="sex" label="性别" width="60"></el-table-column>
          <el-table-column prop="group" label="组别" width="110"></el-table-column>
          <el-table-column prop="projectName" label="项目名称" min-width="280"></el-table-column>
          <el-table-column prop="cost" label="费用"></el-table-column>
        </el-table>
        <div class="cost-box">合计：{{personalCost}} 元</div>
      </div>
      <div class="report-item">
        <div class="report-item__header">对练项目</div>
        <el-table class="report-item__body" :data="value.duelExercises" border fit style="width: 100%;">
          <el-table-column prop="index" label="序号" width="50"></el-table-column>
          <el-table-column prop="name" label="姓名" width="100"></el-table-column>
          <el-table-column prop="IDNumber" label="证件号码" width="180"></el-table-column>
          <el-table-column prop="birth" label="出生日期" width="110"></el-table-column>
          <el-table-column prop="sex" label="性别" width="60"></el-table-column>
          <el-table-column prop="group" label="组别" width="110"></el-table-column>
          <el-table-column prop="projectName" label="项目名称" min-width="280"></el-table-column>
          <el-table-column prop="cost" label="费用"></el-table-column>
        </el-table>
        <div class="cost-box">合计：{{duelCost}} 元</div>
      </div>

      <div class="report-item">
        <div class="report-item__header">集体项目</div>
        <el-table class="report-item__body" :data="value.collectiveProject" border fit style="width: 100%;">
          <el-table-column prop="index" label="序号" width="50"></el-table-column>
          <el-table-column prop="name" label="姓名" width="100"></el-table-column>
          <el-table-column prop="IDNumber" label="证件号码" width="180"></el-table-column>
          <el-table-column prop="birth" label="出生日期" width="110"></el-table-column>
          <el-table-column prop="sex" label="性别" width="60"></el-table-column>
          <el-table-column prop="group" label="组别" width="110"></el-table-column>
          <el-table-column prop="projectName" label="项目名称" min-width="280"></el-table-column>
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
      // visible: false

      cover: 'https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg',
      cover1: 'https://fuss10.elemecdn.com/1/8e/aeffeb4de74e2fde4bd74fc7b4486jpeg.jpeg',
      srcList: [
        'https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg',
        'https://fuss10.elemecdn.com/1/8e/aeffeb4de74e2fde4bd74fc7b4486jpeg.jpeg'
      ]
    }
  },
  computed: {
    visibles: {
      get () {
        return this.visible
      },
      set (val) {
        this.$emit('update:visible', val)
      }
    },
    // 个人项目费用汇总
    personalCost () {
      let cost = 0
      this.value.personalProject.forEach(element => {
        cost += parseInt(element.cost)
      })
      return cost
    },
    // 对练项目费用汇总
    duelCost () {
      let cost = 0
      this.value.duelExercises.forEach(element => {
        cost += parseInt(element.cost)
      })
      return cost
    },
    // 集体项目费用汇总
    collectiveCost () {
      let cost = 0
      this.value.collectiveProject.forEach(element => {
        cost += parseInt(element.cost)
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
        this.visibles = false
        // this.$message({
        //   type: 'success',
        //   message: '删除成功!'
        // })
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
