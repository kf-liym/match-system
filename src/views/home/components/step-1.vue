<template>
  <div class="step-1">
    <el-upload
      action="https://jsonplaceholder.typicode.com/posts/"
      list-type="picture-card"
      :on-preview="handlePictureCardPreview"
      :on-remove="handleRemove"
      class="upload-wrap"
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
export default {
  name: 'Step1',
  components: {

  },
  props: {

  },
  data () {
    return {
      dialogImageUrl: '',
      dialogVisible: false
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
      this.$emit('stepChange', 1)
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
