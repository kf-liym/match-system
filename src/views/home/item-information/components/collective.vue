/*
 * @Desc: 步骤3-集体项目
 * @Author: liym
 * @Date: 2020-02-14 17:57:29
 * @Last Modified by: liym
 * @Last Modified time: 2020-03-09 01:12:28
 */

<template>
  <div class="step3-person" v-loading="loading">
    <div class="empty" v-if="list.length < 1">暂无数据，请新增集体报项</div>
    <el-collapse v-else v-model="active" style="height: 400px; overflow-y: scroll;">
      <el-collapse-item :name="index" v-for="(item,index) in list" :key="index">
        <template slot="title">
          <!-- {{index+1}}. {{item.contestants | contestant}} -->
          {{index+1}}. {{item.item}}
          <div class="title-right">
            <el-button type="primary" size="mini" icon="el-icon-edit" @click.stop="edit(index)">编辑</el-button>
            <el-button type="danger" size="mini" icon="el-icon-delete" @click.stop="del(index)">删除</el-button>
          </div>
        </template>
        <div class="personal-info-item">
          <el-form class="form-wrap" label-width="140px">
            <el-form-item label="项目名称：" prop="duelType">
              <el-input style="width: 100%;" v-model="collective[index]" readonly />
            </el-form-item>
            <el-form-item
              label="姓名："
              prop="name"
              v-for="(contestant, contestantIndex) in item.contestants"
              :key="contestantIndex"
            >
              <el-input
                v-model="contestants[index][contestantIndex]"
                readonly
                style="width: 100%; max-width: 400px;"
              >
              </el-input>
            </el-form-item>
          </el-form>
        </div>
      </el-collapse-item>
    </el-collapse>
    <div style="text-align:center; padding: 30px 0 0;" v-if="list.length < 2">
      <el-button type="primary" @click="handleAdd()">新增集体报项</el-button>
    </div>

    <collective-edit
      ref="edit"
      :collective-options="collectiveOptions"
      @confirm="confirm"
      @choose-user="handleChoose"
    ></collective-edit>
  </div>
</template>

<script>
import { nameFormat } from '@/filters'
import { delCollective, putCollective, addCollective, getCollectives } from '@/api'
import collectiveEdit from './collective-edit'
export default {
  name: 'step3Collective',
  props: {
    // data: {
    //   type: Array,
    //   default () {
    //     return []
    //   }
    // }
  },
  data () {
    return {
      loading: false,
      active: [],
      // 集体项目选项 0：拳术    1：器械
      // collectiveOptions: [
      //   { label: '集体太极八法五步', type: 0 },
      //   { label: '集体太极拳术', type: 0 },
      //   { label: '集体太极器械', type: 1 }
      // ]
      collectiveOptions: ['集体太极八法五步', '集体太极拳术', '集体太极器械'],
      list: []
    };
  },
  computed: {
    // list: {
    //   get () {
    //     return this.data
    //   },
    //   set (val) {
    //     this.$emit('update:data', val)
    //   }
    // },
    collective () {
      let arr = []
      this.list.forEach((item, index) => {
        arr[index] = item.itemRoutine ? `${item.item}（${item.itemRoutine}）` : item.item
      })
      return arr
    },
    contestants () {
      let arr = []
      this.list.forEach((items, indexs) => {
        if (arr[indexs] === undefined) {
          arr[indexs] = []
        }
        items.contestants.forEach((item, index) => {
          arr[indexs][index] = nameFormat(item)
        })
      })
      return arr
    }

  },
  created () {
    this.getList()
  },
  mounted () {
  },
  watch: {

  },
  filters: {
    contestant (contestants) {
      let arr = ''
      contestants.forEach((item, index) => {
        arr += index === 0 ? item.name : `、${item.name}`
      })
      return arr
    }
  },
  methods: {
    getList () {
      this.loading = true
      getCollectives().then(res => {
        // console.log(res)
        this.loading = false
        this.$store.commit('SET_STATUS', res.data.status)
        this.list = res.data.list
        // this.applicants = res.data
      }).catch(err => {
        this.loading = false
        console.log(err)
      })
    },
    handleChoose (index) {
      this.$emit('choose-user', 'collective', index)
    },
    // 添加项
    handleAdd () {
      this.$refs.edit.show('add', -1)
      // this.active = ['edit']
    },

    applicantsConfirm (row, index) {
      this.$refs['edit'].applicantsConfirm(row, index)
    },
    // 删除
    del (id) {
      this.$confirm('是否确定删除?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        delCollective(id).then(res => {
          this.getList()
          this.$message({
            type: 'success',
            message: '删除成功!'
          });
        }).catch(err => {
          console.log(err)
        })
      }).catch(() => {
      });
    },
    edit (index) {
      let person = this.list[index]
      this.$refs.edit.show('edit', index, person)
    },
    // 验证是否有重复的证件号
    checkIdcard (index, row) {
      let flag = false
      for (let i = 0; i < this.list.length; i++) {
        if (flag) { break }
        for (let j = 0; j < this.list[i].contestants.length; j++) {
          let item = this.list[i].contestants[j]
          if (flag) { break }
          for (let k = 0; k < row.contestants.length; k++) {
            let contestants = row.contestants[k]
            if (index === -1) {
              if (item.idcard === contestants.idcard) {
                flag = true
                break
              }
            } else if (index !== i) {
              if (item.idcard === contestants.idcard) {
                flag = true
                break
              }
            }
          }
        }
      }
      return flag
    },
    checkItemType (index, row) {
      let flag = false
      for (let i = 0; i < this.list.length; i++) {
        if (flag) { break }
        if (index === -1 || index !== i) {
          if (this.list[i].itemType === row.itemType) {
            flag = true
            break
          }
        }
        // else if () {
        //   if (this.list[i].itemType === row.itemType) {
        //     flag = true
        //     break
        //   }
        // }
      }
      return flag
    },
    // 保存
    confirm (index, row) {
      if (this.checkIdcard(index, row)) {
        // this.$message.error('填报失败，一个人只能填报一组个人项目。');
        this.$alert('填报失败，一人只能填报一组集体项目。', '提示', {
          confirmButtonText: '确定',
          type: 'error'
        });
      } else if (this.checkItemType(index, row)) {
        // this.$message.error('填报失败，一个人只能填报一组个人项目。');
        this.$alert('填报失败，不同报填同种类型的项目。', '提示', {
          confirmButtonText: '确定',
          type: 'error'
        });
      } else if (index === -1) {
        addCollective(row).then(res => {
          this.getList()
          this.$refs.edit.hide()
        }).catch(err => {
          console.log(err)
        })
      } else {
        putCollective(row.id, row).then(res => {
          this.getList()
          this.$refs.edit.hide()
        }).catch(err => {
          console.log(err)
        })
      }
    }


  },
  components: {
    collectiveEdit
  }
};
</script>

<style scoped lang="scss">
.empty {
  height: 400px;
  line-height: 400px;
  text-align: center;
}
.title-right {
  position: absolute;
  right: 35px;
}
.form-wrap {
  width: 100%;
  max-width: 500px;
  .form-footer {
    text-align: center;
  }
  .form-user {
    display: flex;

    border-radius: 4px;
    height: 40px;
    line-height: 40px;
    padding: 0 0 0 15px;
    border: 1px solid #dcdfe6;
    label {
      flex: 1;
    }
    .el-icon-user {
      width: 50px;
      display: flex;
      align-items: center;
      justify-content: center;
      border-left: 1px solid #dcdfe6;
    }
  }
}
</style>
