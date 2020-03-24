<!--
 * @Desc: 描述
 * @Date: 2020-02-14 22:24:20
 * @LastEditTime: 2020-03-25 00:33:39
 -->
<template>
  <div class="step-1">
    <el-upload
      :action="$store.state.user.authority == 1 ? '/admin/upload/prove': '/api/upload/prove'"
      list-type="picture-card"
      :data= '{ uid: uid, token: $store.state.user.token }'
      :on-preview="handlePictureCardPreview"
      :on-remove="handleRemove"
      :on-error="handleError"
      :on-success="handleSuccess"
      class="upload-wrap"
      :headers="myHeaders"
      :file-list="fileList"
    >
      <i class="el-icon-plus" />
    </el-upload>
    <el-dialog :visible.sync="dialogVisible">
      <img width="100%" :src="dialogImageUrl" alt />
    </el-dialog>
    <div class="step-btn-group">
      <el-button type="primary" @click="prevStep()">上一步</el-button>
      <el-button type="primary" @click="nextStep()" v-if="$store.state.user.authority === 0">下一步</el-button>
    </div>
  </div>
</template>

<script>
import {
  getToken,
  getCookie
} from '@/utils/auth'
import { getProve } from '@/api'
export default {
  name: 'Step1',
  components: {

  },
  props: {

  },
  data () {
    return {
      dialogImageUrl: '',
      dialogVisible: false,
      fileList: []
    }
  },
  computed: {
    myHeaders () {
      return {
        'X-AccountType': getToken(),
        'X-Token': getCookie('authority'),
        'X-Author': this.$store.getters.author
      }
    },
    uid () {
      return this.$store.state.user.authority === 1 ? this.$route.query.id || this.$store.state.user.id : this.$store.state.user.id
    }
  },
  watch: {

  },
  created () {
    getProve().then(res => {
      let data = res.data.list.split(',')
      let file = []
      data.forEach(item => {
        file.push({
          url: item
        })
      })
      this.fileList = file
    }).catch(err => {
      this.$message({
        type: 'error',
        message: err
      });
    })
  },
  mounted () {

  },
  methods: {
    handleRemove (file, fileList) {
      console.log(file, fileList)

    },
    handleError (err, file, fileList) {
      this.$message({
        type: 'error',
        message: err
      });
    },
    handleSuccess (response, file, fileList) {
      console.log(response, file, fileList)
    },
    handlePictureCardPreview (file) {
      this.dialogImageUrl = file.url
      this.dialogVisible = true
    },
    prevStep () {
      this.$store.dispatch('STEP_PREV', { router: this.$router, route: this.$route })
    },
    nextStep () {
      this.$store.dispatch('STEP_NEXT', { router: this.$router, route: this.$route })
    }
  }
}
</script>

<style scoped lang="scss">
.upload-wrap {
  border: 1px solid rgb(133, 132, 132);
  border-radius: 5px;
  padding: 20px 20px;
}
.btn-group {
  margin-top: 20px;
  width: 100%;
  display: flex;
  justify-content: center;
}
</style>
