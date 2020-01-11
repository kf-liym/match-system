<template>
    <div class="common">
      <el-alert class="alert" title="注意事项" type="warning" show-icon :closable="false" />
      <ul class="description">
        <li>1、出质前盖坐着的著作权是否授权及授权情况说明：若未授权他人使用，填写“否”；若有授权情况，请在授权情况说明栏中填写著作权授权许可（包括专有）</li>
        <li>2、出质前盖坐着的著作权是否授权及授权情况说明：若未授权他人使用，填写“否”；若有授权情况，请在授权情况说明栏中填写著作权授权许可（包括专有）</li>
      </ul>
      <div class="common-info">
        <el-form ref="form" :model="{applicantList}" label-width="0px">
          <table
            class="common-info-table"
            border="1"
            cellspacing="0"
            cellpadding="10"
            align="center"
          >
            <thead>
              <tr>
                <th width="150">序号</th>
                <th width="250">姓名</th>
                <th width="200">证件类型</th>
                <th width="300">证件号码</th>
                <th width="150">性别</th>
                <th width="250">出生日期</th>
                <th width="300">操作</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="(item,index) in applicantList" :key="index">
                <td>{{index}}</td>
                <td>
                  <el-form-item :prop="`applicantList[${index}].name`" >
                    <el-input v-model="item.name" :readonly="item.readonly" ></el-input>
                  </el-form-item>
                </td>
                <td>
                  <el-form-item :prop="`applicantList[${index}].certificate`" >
                    <el-input v-model="item.certificate" :readonly="item.readonly"></el-input>
                  </el-form-item>
                </td>
                <td>
                  <el-form-item :prop="`applicantList[${index}].IDNumber`" >
                    <el-input v-model="item.IDNumber" :readonly="item.readonly"></el-input>
                  </el-form-item>
                </td>
                    <td>
                  <el-form-item :prop="`applicantList[${index}].sex`" >
                    <el-input v-model="item.sex" :readonly="item.readonly"></el-input>
                  </el-form-item>
                </td>
                <td>
                  <el-form-item :prop="`applicantList[${index}].birth`" >
                    <el-input v-model="item.birth" :readonly="item.readonly"></el-input>
                  </el-form-item>
                </td>
                <td>
                  <el-button type="primary" @click="save(index)">保存</el-button> <el-button type="primary" @click="deleteInfo(index)">删除</el-button></td>
              </tr>
            </tbody>
          </table>
        </el-form>

        <div class="add-btn">
          <el-button type="primary" @click="addInfo">新增常用报名人信息</el-button>
        </div>
      </div>
    </div>

</template>

<script>

export default {
  name: 'setCommonInfo',
  props: {

  },
  data () {
    return {
      applicantList: [{
        name: '',
        certificate: '', // 证件类型
        IDNumber: '',
        birth: '',
        sex: '',
        readonly: false
      }
      ]
      // rules: {
      //   name: [
      //     { required: true, message: '请输入报名人姓名', trigger: 'blur' }
      //   ],
      //   certificate: [
      //     { required: true, message: '请选择证件类型', trigger: 'blur' }
      //   ],
      //   IDNumber: [
      //     { required: true, message: '请输入证件号码', trigger: 'blur' }
      //   ],
      //   birth: [
      //     { required: true, message: '请输入出生年月', trigger: 'blur' }
      //   ],
      //   sex: [
      //     { required: true, message: '请输入性别', trigger: 'blur' }
      //   ]
      // }
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
    //保存常用人信息
    save (index) {
      console.log('保存信息')
      if (this.applicantList[index].readonly === false) {
        this.applicantList[index].readonly = true
        this.$store.commit('setApplicantListArray', this.applicantList[index])
        console.log(this.applicantList[index])
        console.log(this.$store.state)

      }
    },
    deleteInfo (index) {
      console.log('删除信息')
      this.applicantList.splice(index, 1)
      this.$store.commit('removeApplicant', index)

    },
    addInfo () {
      let info = {
        name: '',
        certificate: '', // 证件类型
        IDNumber: '',
        birth: '',
        sex: '',
        readonly: false
      }
      this.applicantList.push(info)
      console.log(this.applicantList)
    }
  }

};
</script>

<style scoped lang="scss">
.common {
  padding: 15px 30px 0;
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

    .el-form-item{
      margin-bottom: 0px;
    }
   .el-input{
    border:none;
   }


  }
}
.add-btn {
  width: 100%;
  display: flex;
  justify-content: center;
}
</style>
