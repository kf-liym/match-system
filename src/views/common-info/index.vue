<template>
  <div class="common">
    <div class="container-1200">
      <el-alert class="alert" title="注意事项" type="warning" show-icon :closable="false" />
      <ul class="description">
        <li>1、出质前盖坐着的著作权是否授权及授权情况说明：若未授权他人使用，填写“否”；若有授权情况，请在授权情况说明栏中填写著作权授权许可（包括专有和非专有）他人使用的有关情。</li>
        <li>2、软件为升级版本的，应在申请表软件基本信息栏中的软件作品说明中，选择“修改”并填写修改说明，前期版本已登记的应填写原登记号并提交原证件复印件。</li>
      </ul>
      <div class="common-info">
        <el-table class="common-table" :data="applicantList" stripe border>
          <el-table-column type="index" label="序号" width="80">
          </el-table-column>
          <el-table-column prop="name" label="姓名" width="100">
          </el-table-column>
          <el-table-column prop="certificate" label="证件类型" width="100">
          </el-table-column>
          <el-table-column prop="idcard" label="证件号码" min-width="200">
          </el-table-column>
          <el-table-column prop="sex" label="性别" width="80">
          </el-table-column>
          <el-table-column prop="birth" label="出生日期" width="100">
          </el-table-column>
          <el-table-column prop="size" label="纪念服尺寸" width="100">
          </el-table-column>
          <el-table-column align="center" label="操作" width="130">
            <template slot-scope="scope">
              <el-button type="primary" icon="el-icon-edit" circle @click="handleEdit(scope.row)"></el-button>
              <el-button type="danger" icon="el-icon-delete" circle @click="handleDelete(scope.row.id)"></el-button>
            </template>
          </el-table-column>
        </el-table>

        <div class="add-btn">
          <el-button type="primary" @click="handleAdd">新增常用报名人信息</el-button>
        </div>
      </div>
    </div>
    <edit ref="edit" @confirm="getList"></edit>
  </div>

</template>

<script>
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
      applicantList: [
        {
          id: '001',
          name: '王小虎',
          certificate: '身份证', // 证件类型
          idcard: '444444444444444444',
          birth: '2020-02-03',
          sex: '男',
          size: '大码'
        }
      ]

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
    // 常用人信息编辑
    handleEdit (info) {
      this.$refs.edit.show(info)
    },
    // 删除
    handleDelete (id) {
      this.$confirm('是否删除该信息？', '系统消息', {
        confirmButtonText: '确定',
        cancelButtonText: '取消'
      }).then(() => {
        console.log('删除')
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
      console.log('获取常用人信息')
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
  margin: 30px 0 50px;
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
