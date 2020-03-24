<template>
  <div class="admin-review">
    <el-form :inline="true" size="small" class="admin-query" label-width="85px">
      <el-form-item label="状态：">
        <el-select v-model="query.status" placeholder="状态">
          <el-option label="全部" value></el-option>
          <el-option label="待审批" :value="0"></el-option>
          <el-option label="审批通过" :value="1"></el-option>
          <el-option label="未提交" :value="2"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="onConfirm">搜索</el-button>
      </el-form-item>
    </el-form>
    <el-table class="report-item__body" :data="teamList" border fit style="width: 100%;">
      <el-table-column type="index" label="序号" width="50"></el-table-column>
      <el-table-column label="队伍名称" min-width="150">
        <template slot-scope="scope">
          <span>{{ scope.row.teamName }}</span>
        </template>
      </el-table-column>
      <el-table-column label="领队姓名" width="100">
        <template slot-scope="scope">
          <span>{{ scope.row.leaderName }}</span>
        </template>
      </el-table-column>
      <el-table-column label="联系电话" width="150">
        <template slot-scope="scope">
          <span>{{ scope.row.tel }}</span>
        </template>
      </el-table-column>
      <el-table-column label="报名费用" width="80">
        <template slot-scope="scope">
          <span>{{ scope.row.count }}</span>
        </template>
      </el-table-column>
      <el-table-column label="账号" width="150">
        <template slot-scope="scope">
          <span>{{ scope.row.username }}</span>
        </template>
      </el-table-column>
      <el-table-column label="状态" width="90">
        <template slot-scope="scope">
          <span v-if="scope.row.status === 0">待审批</span>
          <span style="color: #67C23A" v-else-if="scope.row.status === 1">审批通过</span>
          <span v-else>未提交</span>
        </template>
      </el-table-column>
      <el-table-column fixed="right" label="操作" width="250" align="center">
        <template slot-scope="scope">
          <el-button type="primary" @click="handleCheck(scope.row.rid)" size="mini">查看</el-button>
          <el-button type="success" @click="handleUpdate(scope.row)" size="mini">修改</el-button>
          <el-button type="danger" :disabled="scope.row.status === 1" @click="handleReject(scope.row)" size="mini">打回</el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-pagination
      @current-change="handleCurrentChange"
      :current-page.sync="query.page"
      :page-size="query.limit"
      layout="total, prev, pager, next"
      :total="count"
      style="text-align: center; margin-top: 15px;"
    ></el-pagination>
    <check-dialog ref="check" @get-list="getList"></check-dialog>
  </div>
</template>

<script>
import checkDialog from './components/check'
import { getAllList, teamReject } from '@/api'
export default {
  props: {},
  data () {
    return {
      info: null,
      query: {
        status: '',
        page: 1,
        limit: 10
      },
      count: 0,
      teamList: []
    }
  },
  computed: {
    // cost () {
    //   let costArr = []
    //   this.teamList.forEach(item => {
    //     let cost = 0
    //     item.person.forEach(element => {
    //       cost += 50
    //     })
    //     item.duel.forEach(element => {
    //       cost += 50
    //     })
    //     item.collective.forEach(element => {
    //       cost += 50
    //     })
    //     costArr.push(cost)
    //   })
    //   return costArr
    // }
  },
  created () {
    this.getList()
  },
  mounted () { },
  watch: {},
  methods: {
    getList () {
      getAllList(this.query).then(res => {
        console.log(res)
        this.teamList = res.data.list
        this.count = res.data.count
      }).catch(err => {
        console.log(err)
      })
    },
    // 搜索
    onConfirm () {
      this.getList()
    },
    handleCheck (id) {
      // this.info = row
      // this.checkVisible = true
      this.$refs.check.show(id)
    },
    handleUpdate (row) {
      this.$router.push({ path: '/home/common-info', query: { id: row.id } })
    },
    handleReject (row) {
      this.$confirm('是否确定将该申请打回？', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消'
      }).then(() => {
        teamReject(row.id).then(res => {
          console.log(res)
          if (res.data.code === 200) {
            this.$message({
              type: 'success',
              message: '已成功打回该申请!'
            })
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
    },
    handleCurrentChange (val) {
      // console.log(`当前页: ${val}`);
      this.query.page = val
      this.getList()
    }
  },
  components: {
    checkDialog
  }
}
</script>

<style scoped lang="scss">
.admin-review {
  padding: 30px;
}
</style>
