/*
 * @Desc: 步骤3-个人项目
 * @Author: liym
 * @Date: 2020-02-14 17:57:29
 * @Last Modified by: liym
 * @Last Modified time: 2020-02-17 02:16:35
 */

<template>
  <div class="step3-person">
    <div class="empty" v-if="list.length < 1">暂无数据，请新增个人报项</div>
    <el-collapse v-else v-model="active" @change="handleCollapseChange">
      <el-collapse-item :name="index" v-for="(person,index) in list" :key="index">
        <template slot="title">
          {{(index+1)+'. '+person.name}}
          <div class="title-right">
            <el-button type="primary" size="mini" icon="el-icon-edit" @click.stop="edit(index)">编辑</el-button>
            <el-button type="danger" size="mini" icon="el-icon-delete" @click.stop="del(index)">删除</el-button>
            <!-- <i
              class="header-icon el-icon-edit"
              @click.stop="edit(index)"
              style="margin-right: 10px;"
            ></i>
            <i class="header-icon el-icon-delete" @click.stop="del(index)"></i>-->
          </div>
        </template>
        <div class="personal-info-item">
          <el-form class="form-wrap" label-width="140px">
            <el-form-item label="姓名：" prop="name">
              <div class="form-user">
                <label>{{person | nameFormat}}</label>
              </div>
            </el-form-item>
            <el-form-item label="拳术项目名称：" prop="project" v-if="person.project.boxing">
              <el-input
                style="width: 100%;"
                v-model="person.project.boxing.label"
                readonly
                placeholder="拳术项目名称"
              />
            </el-form-item>
            <el-form-item
              label="拳术套路名称："
              prop="project.boxingRoutine"
              v-if="person.project.boxingRoutine"
            >
              <el-input
                style="width: 100%;"
                v-model="person.project.boxingRoutine"
                readonly
                placeholder="请补充拳术套路名称"
              />
            </el-form-item>
            <el-form-item label="器械项目名称：" prop="project" v-if="person.project.instrument">
              <el-input
                style="width: 100%;"
                v-model="person.project.instrument.label"
                readonly
                placeholder="器械项目名称"
              />
            </el-form-item>
            <el-form-item
              label="器械套路名称："
              prop="project.instrumentRoutine"
              v-if="person.project.instrumentRoutine"
            >
              <el-input
                style="width: 100%;"
                v-model="person.project.instrumentRoutine"
                readonly
                placeholder="请补充器械套路名称"
              />
            </el-form-item>
          </el-form>
        </div>
      </el-collapse-item>
    </el-collapse>
    <div style="text-align:center; padding: 30px;">
      <el-button type="primary" @click="handleAdd()">新增个人报项</el-button>
    </div>

    <person-edit
      ref="edit"
      :boxing-options="boxingOptions"
      :instrument-options="instrumentOptions"
      @choose-user="handleChoose"
      @confirm="confirm"
    ></person-edit>
  </div>
</template>

<script>
import { personDel, personAdd } from '@/api'
import personEdit from './person-edit'
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
      // 拳术项目选项 0:传统项目，1：规定项目
      boxingOptions: [
        { label: '规定陈式太极拳', type: 1 },
        { label: '规定杨式太极拳', type: 1 },
        { label: '规定吴式太极拳', type: 1 },
        { label: '规定武式太极拳', type: 1 },
        { label: '规定孙式太极拳', type: 1 },
        { label: '42式太极拳', type: 1 },
        { label: '24式太极拳', type: 1 },
        { label: '太极八法五步', type: 1 },
        { label: '传统陈式太极拳', type: 0 },
        { label: '传统杨式太极拳', type: 0 },
        { label: '传统吴式太极拳', type: 0 },
        { label: '传统孙式太极拳', type: 0 },
        { label: '传统武式太极拳', type: 0 },
        { label: '其他传统太极拳', type: 0 }
      ],
      // 器械项目选项 0:传统项目，1：规定项目
      instrumentOptions: [
        { label: '42式太极剑', type: 1 },
        { label: '32式太极剑', type: 1 },
        { label: '传统陈式太极器械', type: 0 },
        { label: '传统杨式太极器械', type: 0 },
        { label: '传统吴式太极器械', type: 0 },
        { label: '传统孙式太极器械', type: 0 },
        { label: '传统武式太极器械', type: 0 },
        { label: '其他传统太极器械', type: 0 }
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
    }
  },
  created () {

  },
  mounted () {
  },
  watch: {

  },
  methods: {

    handleChoose () {
      this.$emit('choose-user', 'person')
    },
    // 添加项
    handleAdd () {
      this.$refs.edit.show('add', -1)
      // this.active = ['edit']
    },
    handleCollapseChange (activeNames) {
      // if (activeNames.indexOf('edit')) {
      //   this.isEdit = true
      //   // this.edit = {
      //   //   id: '',
      //   //   name: '',
      //   //   certificate: '', // 证件类型
      //   //   idcard: '',
      //   //   birth: '',
      //   //   sex: '',
      //   //   size: '',
      //   //   group: '',
      //   //   boxing: {}, // 拳术项目
      //   //   boxingRoutine: '', // 拳术套路名称
      //   //   instrument: {}, // 器械项目
      //   //   instrumentRoutine: '' // 器械套路名称
      //   // }
      //   this.$refs.formEdit.resetFields()
      //   this.active = ['edit']
      // }
    },

    applicantsConfirm (row) {
      this.$refs['edit'].applicantsConfirm(row)
    },
    // 删除
    del (index) {
      this.$confirm('是否确定删除?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {

        personDel(this.list[index].id).then(res => {
          this.$delete(this.list, index)
          this.$message({
            type: 'success',
            message: '删除成功!'
          });
        }).catch(err => {
          console.log(err)
        })

      }).catch(() => {
        // this.$message({
        //   type: 'info',
        //   message: '已取消删除'
        // });
      });
    },
    edit (index) {
      let person = this.list[index]
      this.$refs.edit.show('edit', index, person)
    },
    // 保存
    confirm (index, row) {
      let check = this.list.filter((item, listIndex) => {
        if (index === -1) {
          return item.idcard === row.idcard
        } else if (index !== listIndex) {
          return item.idcard === row.idcard
        }

      })

      let list = JSON.parse(JSON.stringify(this.list))
      if (check.length < 1) {
        personAdd(row).then(res => {
          if (index === -1) { // 新增
            list.push(row)
          } else { // 修改
            this.$set(list, index, row)
          }
          this.$refs.edit.hide()
          this.list = list
        }).catch(err => {
          console.log(err)
        })

      } else {
        // this.$message.error('填报失败，一个人只能填报一组个人项目。');
        this.$alert('填报失败，一个人只能填报一组个人项目。', '提示', {
          confirmButtonText: '确定',
          type: 'error'
        });
      }


    }


  },
  components: {
    personEdit
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
