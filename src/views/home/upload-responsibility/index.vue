<template>
  <div class="step-1">
    <el-upload
      action="api/upload/responsibility"
      list-type="picture-card"
      :data= '{ token: $store.state.user.token }'
      :on-preview="handlePictureCardPreview"
      :on-remove="handleRemove"
      :on-error="handleError"
      :on-success="handleSuccess"
      class="upload-wrap"
      :file-list="fileList"
    >
      <i class="el-icon-plus" />
    </el-upload>
    <el-dialog :visible.sync="dialogVisible">
      <img width="100%" :src="dialogImageUrl" alt />
    </el-dialog>
    <div class="btn-group">
      <!-- <el-button type="primary">
        上一步
      </el-button>-->
      <el-button type="primary" @click="prevStep()">上一步</el-button>
      <el-button type="primary" @click="nextStep()">下一步</el-button>
    </div>
  </div>
</template>

<script>
// import tinymce from 'tinymce/tinymce'
// import Editor from '@tinymce/tinymce-vue'
import { getResponsibility } from '@/api'
export default {
  name: 'Step1',
  components: {
    // Editor

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

  },
  watch: {

  },
  created () {
    getResponsibility().then(res => {
      this.fileList = res.data.list
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
.step-1 {
  margin-bottom: 20px;
}
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
