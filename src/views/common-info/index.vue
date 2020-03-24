<template>
  <div class="common" v-loading="loading">
    <div class="container-1200">
      <div class="common-info">
        <el-table class="common-table" :data="list" stripe border max-height="400px">
          <el-table-column type="index" label="序号" width="80"></el-table-column>
          <el-table-column prop="name" label="姓名" width="100"></el-table-column>
          <el-table-column prop="certificate" label="证件类型" width="100"></el-table-column>
          <el-table-column prop="idcard" label="证件号码" min-width="200"></el-table-column>
          <el-table-column prop="sex" label="性别" width="80"></el-table-column>
          <el-table-column prop="birth" label="出生日期" width="100"></el-table-column>
          <el-table-column prop="size" label="纪念服尺寸" width="100"></el-table-column>
          <el-table-column align="center" label="操作" width="130">
            <template slot-scope="scope">
              <el-button type="primary" icon="el-icon-edit" circle @click="handleEdit(scope.row)"></el-button>
              <el-button
                type="danger"
                icon="el-icon-delete"
                circle
                @click="handleDelete(scope.row.id)"
              ></el-button>
            </template>
          </el-table-column>
        </el-table>

        <div class="add-btn">
          <el-button type="primary" @click="handleAdd">新增常用报名人信息</el-button>
        </div>

        <div class="step-btn-group">
          <!-- <el-button type="primary" @click="prevStep()">上一步</el-button> -->
          <el-button type="primary" @click="nextStep()">下一步</el-button>
        </div>
      </div>
    </div>
    <edit ref="edit" @getList="getList"></edit>
  </div>
</template>

<script>
import { getMembers, delMember } from '@/api'
import edit from './edit'
export default {
  name: 'setCommonInfo',
  components: {
    edit
  },
  props: {

  },
  data () {
    return {
      list: [],
      loading: true

    };
  },
  computed: {
  },
  created () {

  },
  mounted () {
    this.getList()
  },
  watch: {

  },
  methods: {
    // 常用人信息编辑
    handleEdit (info) {
      this.$refs.edit.show(info)
    },
    // 删除
    handleDelete (id) {
      const _this = this
      _this.$confirm('是否删除该信息？', '系统消息', {
        confirmButtonText: '确定',
        cancelButtonText: '取消'
      }).then(() => {
        _this.loading = true
        delMember(id, this.$store.state.user.authority === 0 ? 'user' : 'admin').then(res => {
          _this.loading = false
          if (res.data.code === 200) {
            _this.$message({
              message: '删除成功',
              type: 'success'
            });
            _this.visible = false
            _this.$emit('getList')
          } else {
            _this.$message.error(res.data.message || '删除失败');
          }
        }).catch(err => {
          _this.loading = false
          _this.$message.error(err || '删除失败');
        })

      }).catch(() => {
        console.log('取消删除')
      });

    },
    // 添加常用报名人信息
    handleAdd () {
      this.$refs.edit.show()
    },
    // 获取常用人信息
    getList () {
      this.loading = true
      getMembers({ userId: this.$store.state.user.id }).then(res => {
        this.list = res.data.list
        this.$store.commit('SET_STATUS', res.data.status)
        this.$store.commit('SET_MEMBERS', res.data.list)
        this.loading = false
      }).catch(err => {
        this.loading = false
        console.log(err)
      })
    },
    nextStep () {
      console.log(this.$route)
      this.$store.dispatch('STEP_NEXT', { router: this.$router, route: this.$route })
    }
  }


};
</script>

<style scoped lang="scss">
.common {
  padding: 20px 30px;
  // max-width: 1200px;
  width: 100%;
  margin: 0 auto;
}
.common-table {
  width: 100%;
  // border: 1px solid #333;
  border-bottom: 0;
  margin: 0 0 50px;
}
.description {
  margin-top: 10px;
}
.common-info-table {
  width: 100%;
  max-width: 800px;
  margin: 30px auto;
  border-collapse: collapse;
  line-height: 2.5;
  td {
    padding: 10px 5px;

    .el-form-item {
      margin-bottom: 0px;
    }
    .el-input {
      border: none;
    }
  }
}
.add-btn {
  width: 100%;
  display: flex;
  justify-content: center;
}
</style>
