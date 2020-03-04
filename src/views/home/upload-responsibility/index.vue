<template>
  <div class="step-1">
    <el-upload
      action="https://jsonplaceholder.typicode.com/posts/"
      list-type="picture-card"
      :on-preview="handlePictureCardPreview"
      :on-remove="handleRemove"
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
      <el-button type="primary" @click="nextStep()">下一步</el-button>
    </div>
  </div>
</template>

<script>
// import tinymce from 'tinymce/tinymce'
// import Editor from '@tinymce/tinymce-vue'
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
      fileList: [
        { name: 'ddd.jpg', url: 'https://img-blog.csdnimg.cn/20190918140012416.png' },
        { name: 'eee.jpg', url: 'https://img-blog.csdnimg.cn/2019092715111047.png' }
      ]
    }
  },
  computed: {

  },
  watch: {

  },
  created () {

  },
  mounted () {

  },
  methods: {
    handleRemove (file, fileList) {
      console.log(file, fileList)
    },
    handlePictureCardPreview (file) {
      this.dialogImageUrl = file.url
      this.dialogVisible = true
    },
    nextStep () {
      this.$store.commit('SET_STEP', 1)
      this.$router.push('/home/step2')
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
