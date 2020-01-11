<template>
  <div class="admin-review">
    <el-form :inline="true" size="small" class="admin-query" label-width="85px">
      <el-form-item label="审核状态：">
        <el-select v-model="query.reviewStatus" placeholder="审核状态">
          <el-option label="全部" value=""></el-option>
          <el-option label="已审核" value="已审核"></el-option>
          <el-option label="未审核" value="未审核"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="提交状态：">
        <el-select v-model="query.comfirmStatus" placeholder="提交状态">
          <el-option label="全部" value=""></el-option>
          <el-option label="已提交" value="已提交"></el-option>
          <el-option label="未提交" value="未提交"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="onConfirm">搜索</el-button>
      </el-form-item>
    </el-form>
    <el-table class="report-item__body" :data="teamList" border fit style="width: 100%;">
      <el-table-column type="index" label="序号" width="50"></el-table-column>
      <el-table-column prop="teamName" label="队伍名称" min-width="150"></el-table-column>
      <el-table-column prop="leaderName" label="领队姓名" width="100"></el-table-column>
      <el-table-column prop="tel" label="联系电话" width="150"></el-table-column>
      <el-table-column prop="cost" label="报名费用" width="80"></el-table-column>
      <el-table-column prop="username" label="账号" width="150"></el-table-column>
      <el-table-column prop="pwd" label="密码" width="150"></el-table-column>
      <el-table-column prop="comfirmStatus" label="提交状态" width="80"></el-table-column>
      <el-table-column prop="reviewStatus" label="审核状态" width="80"></el-table-column>
      <el-table-column fixed="right" label="操作" width="150" align="center">
        <template slot-scope="scope">
          <el-button type="text" @click="handleCheck(scope.row)" size="small">查看</el-button>
          <el-button type="text" @click="handleUpdate(scope.row)" size="small">修改</el-button>
          <el-button type="text" @click="handleReject(scope.row)" size="small">打回</el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page.sync="query.page" :page-size="query.limit" layout="total, prev, pager, next" :total="count" style="text-align: center; margin-top: 15px;">
    </el-pagination>
    <check-dialog v-if="checkVisible" :visible.sync="checkVisible" v-model="info"></check-dialog>
  </div>
</template>

<script>
import checkDialog from './components/check'
export default {
  props: {},
  data () {
    return {
      info: null,
      checkVisible: false,
      query: {
        reviewStatus: '',
        comfirmStatus: '',
        page: 1,
        limit: 5
      },
      count: 10,
      teamList: [
        {
          // 报名状态
          status: '未提交',
          comfirmStatus: '提交', // 提交状态
          reviewStatus: '未提交', // 审核状态
          username: 'admin', // 账号
          pwd: '123456', // 密码

          teamName: '队伍名', // 队伍名称
          leaderName: '张小马', // 领队姓名
          tel: '123658252152', // 联系电话
          cost: 100, // 费用
          coachName: '刘小华', // 教练姓名\
          // 责任书
          responsibility: [
            'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1578756102875&di=dee35c73172542f2c6b022fa971e69c1&imgtype=0&src=http%3A%2F%2Fg.hiphotos.baidu.com%2Fzhidao%2Fpic%2Fitem%2Fc83d70cf3bc79f3d6e7bf85db8a1cd11738b29c0.jpg',
            'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1578756102874&di=5535a5334424d42cbbd9977e8cea08fd&imgtype=0&src=http%3A%2F%2Ffile02.16sucai.com%2Fd%2Ffile%2F2014%2F0920%2F9865f4ed66ec1829fed3fd626689c448.jpg'
          ],
          // 汇款证明
          remittance: [
            'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1578756102871&di=b6867b8a0f11543d9fd017c25492c8dd&imgtype=0&src=http%3A%2F%2Fwww.littleducks.cn%2Fuploads%2Fallimg%2F1208%2F1688-120Q40U258.jpg',
            'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1578756102859&di=85f3fc12ec3315d002048b320985059d&imgtype=0&src=http%3A%2F%2Fa0.att.hudong.com%2F16%2F90%2F01300000199940121626908088366.jpg'
          ],
          // 个人项目
          personalProject: [
            {
              index: '1',
              name: '张小明',
              IDNumber: '440671199725145421',
              birth: '1997-02-12',
              sex: '男',
              group: '男子少年组',
              projectName: '传统拳术-蔡李佛拳-杠力拳',
              cost: 50
            },
            {
              index: '2',
              name: '张小明',
              IDNumber: '440671199725145421',
              birth: '1997-02-12',
              sex: '男',
              group: '男子少年组',
              projectName: '传统拳术-蔡李佛拳-杠力拳',
              cost: 50
            },
            {
              index: '3',
              name: '张小明',
              IDNumber: '440671199725145421',
              birth: '1997-02-12',
              sex: '男',
              group: '男子少年组',
              projectName: '传统拳术-蔡李佛拳-杠力拳',
              cost: 50
            }
          ],
          // 对练项目
          duelExercises: [
            {
              index: '1-1',
              name: '张小明',
              IDNumber: '440671199725145421',
              birth: '1997-02-12',
              sex: '男',
              group: '男子少年组',
              projectName: '传统拳术-蔡李佛拳-杠力拳',
              cost: 50
            },
            {
              index: '1-2',
              name: '张小明',
              IDNumber: '440671199725145421',
              birth: '1997-02-12',
              sex: '男',
              group: '男子少年组',
              projectName: '传统拳术-蔡李佛拳-杠力拳',
              cost: 50
            },
            {
              index: '2-1',
              name: '张小明',
              IDNumber: '440671199725145421',
              birth: '1997-02-12',
              sex: '男',
              group: '男子少年组',
              projectName: '传统拳术-蔡李佛拳-杠力拳',
              cost: 50
            },
            {
              index: '2-2',
              name: '张小明',
              IDNumber: '440671199725145421',
              birth: '1997-02-12',
              sex: '男',
              group: '男子少年组',
              projectName: '传统拳术-蔡李佛拳-杠力拳',
              cost: 50
            }
          ],
          // 集体项目
          collectiveProject: [
            {
              index: '1-1',
              name: '张小明',
              IDNumber: '440671199725145421',
              birth: '1997-02-12',
              sex: '男',
              group: '男子少年组',
              projectName: '传统拳术-蔡李佛拳-杠力拳',
              cost: 50
            },
            {
              index: '1-2',
              name: '张小明',
              IDNumber: '440671199725145421',
              birth: '1997-02-12',
              sex: '男',
              group: '男子少年组',
              projectName: '传统拳术-蔡李佛拳-杠力拳',
              cost: 50
            }
          ]
        }
      ]
    }
  },
  computed: {
  },
  created () { },
  mounted () { },
  watch: {},
  methods: {
    // 搜索
    onConfirm () {

    },
    handleCheck (row) {
      this.info = row
      this.checkVisible = true
    },
    handleUpdate (row) {

    },
    handleReject (row) {
      this.$confirm('是否确定将该申请打回？', '提示', {
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
    },
    handleSizeChange (val) {
      console.log(`每页 ${val} 条`);
    },
    handleCurrentChange (val) {
      console.log(`当前页: ${val}`);
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
