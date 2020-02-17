/*
 * @Desc: 步骤3-对练项目
 * @Author: liym
 * @Date: 2020-02-14 17:57:29
 * @Last Modified by: liym
 * @Last Modified time: 2020-02-17 02:19:41
 */

<template>
  <div class="step3-person">
    <div class="empty" v-if="list.length < 1">暂无数据，请新增对练报项</div>
    <el-collapse v-else v-model="active">
      <el-collapse-item :name="index" v-for="(item,index) in list" :key="index">
        <template slot="title">
          {{(index+1)+'. '+item.contestants[0].name+'、'+item.contestants[1].name}}
          <div class="title-right">
            <el-button type="primary" size="mini" icon="el-icon-edit" @click.stop="edit(index)">编辑</el-button>
            <el-button type="danger" size="mini" icon="el-icon-delete" @click.stop="del(index)">删除</el-button>
          </div>
        </template>
        <div class="personal-info-item">
          <el-form class="form-wrap" label-width="140px">
            <el-form-item label="项目名称：" prop="duelType">
              <el-input style="width: 100%;" v-model="duel[index]" readonly />
            </el-form-item>
            <el-form-item label="姓名：" prop="name">
              <el-input
                v-model="contestants[index][0]"
                readonly
                style="width: 100%; max-width: 400px;"
              >
                <!-- <template slot="append">
                  <i class="el-icon-user"></i>
                </template> -->
              </el-input>
            </el-form-item>
            <el-form-item label="姓名：" prop="name">
              <el-input
                v-model="contestants[index][1]"
                readonly
                style="width: 100%; max-width: 400px;"
              >
                <!-- <template slot="append">
                  <i class="el-icon-user"></i>
                </template> -->
              </el-input>
            </el-form-item>
          </el-form>
        </div>
      </el-collapse-item>
    </el-collapse>
    <div style="text-align:center; padding: 30px;">
      <el-button type="primary" @click="handleAdd()">新增对练报项</el-button>
    </div>

    <duel-edit
      ref="edit"
      :duel-options="duelOptions"
      @choose-user="handleChoose"
      @confirm="confirm"
    ></duel-edit>
  </div>
</template>

<script>
import { nameFormat } from '@/filters'
import { duelDel, duelAdd } from '@/api'
import duelEdit from './duel-edit'
export default {
  name: 'step3Person',
  props: {
    data: {
      type: Array,
      default () {
        return []
      }
    }
  },
  data () {
    return {
      active: [],
      // 对练项目选项
      duelOptions: [
        '双人太极拳对练',
        '双人太极器械对练'
      ]
    };
  },
  computed: {
    list: {
      get () {
        return this.data
      },
      set (val) {
        this.$emit('update:data', val)
      }
    },
    duel () {
      let arr = []
      this.list.forEach((item, index) => {
        arr[index] = item.duelName ? `${item.duelType}（${item.duelName}）` : item.duelType
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

  },
  mounted () {
  },
  watch: {

  },
  methods: {

    handleChoose (index) {
      this.$emit('choose-user', 'duel', index)
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
    del (index) {
      this.$confirm('是否确定删除?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        duelDel(this.list[index].id).then(res => {
          this.$delete(this.list, index)
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
    // 保存
    confirm (index, row) {
      if (this.checkIdcard(index, row)) {
        // this.$message.error('填报失败，一个人只能填报一组个人项目。');
        this.$alert('填报失败，一人只能填报一组对练项目。', '提示', {
          confirmButtonText: '确定',
          type: 'error'
        });
      } else {
        duelAdd(row).then(res => {
          let list = JSON.parse(JSON.stringify(this.list))
          if (index === -1) { // 新增
            this.active.push(list.length)
            list.push(row)
          } else { // 修改
            this.$set(list, index, row)
          }
          this.$refs.edit.hide()
          this.list = list
        }).catch(err => {
          console.log(err)
        })

      }
    }


  },
  components: {
    duelEdit
  }
};
</script>

<style scoped lang="scss">
.empty {
  height: 300px;
  line-height: 300px;
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
