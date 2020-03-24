/*
 * @Desc: 步骤3-个人项目
 * @Author: liym
 * @Date: 2020-02-14 17:57:29
 * @Last Modified by: liym
 * @Last Modified time: 2020-03-09 00:57:10
 */

<template>
  <div class="step3-person" v-loading="loading">
    <div class="empty" v-if="list.length < 1">暂无数据，请新增个人报项</div>
    <el-collapse v-else v-model="active" @change="handleCollapseChange" style="height: 400px; overflow-y: scroll;">
      <el-collapse-item :name="index" v-for="(item,index) in list" :key="index">
        <template slot="title">
          {{(index+1)+'. '+item.name}}
          <div class="title-right">
            <el-button type="primary" size="mini" icon="el-icon-edit" @click.stop="edit(index, item)">编辑</el-button>
            <el-button type="danger" size="mini" icon="el-icon-delete" @click.stop="del(item.id)">删除</el-button>
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
            <el-form-item label="姓名：">
              <div class="form-user">
                <label>{{item | nameFormat}}</label>
              </div>
            </el-form-item>
            <el-form-item label="拳术项目名称：" v-if="item.boxing">
              <el-input
                style="width: 100%;"
                v-model="item.boxing"
                readonly
                placeholder="拳术项目名称"
              />
            </el-form-item>
            <el-form-item
              label="拳术套路名称："
              v-if="item.boxingRoutine"
            >
              <el-input
                style="width: 100%;"
                v-model="item.boxingRoutine"
                readonly
                placeholder="请补充拳术套路名称"
              />
            </el-form-item>
            <el-form-item label="器械项目名称：" v-if="item.instrument">
              <el-input
                style="width: 100%;"
                v-model="item.instrument"
                readonly
                placeholder="器械项目名称"
              />
            </el-form-item>
            <el-form-item
              label="器械套路名称："
              v-if="item.instrumentRoutine"
            >
              <el-input
                style="width: 100%;"
                v-model="item.instrumentRoutine"
                readonly
                placeholder="请补充器械套路名称"
              />
            </el-form-item>
          </el-form>
        </div>
      </el-collapse-item>
    </el-collapse>
    <div style="text-align:center; padding: 30px 0 0;">
      <el-button type="primary" @click="handleAdd()">新增个人报项</el-button>
    </div>

    <person-edit
      ref="edit"
      :boxing-options="boxingOptions"
      :boxing-tradition="boxingTradition"
      :instrument-options="instrumentOptions"
      :instrument-tradition="instrumentTradition"
      @confirm="confirm"
      @choose-user="handleChoose"
    ></person-edit>
  </div>
</template>

<script>
import { delPerson, addPerson, putPerson, getPersons } from '@/api'
import personEdit from './person-edit'
export default {
  name: 'step3Person',
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
      // 拳术项目选项 0:传统项目，1：规定项目
      boxingOptions: ['规定陈式太极拳', '规定杨式太极拳', '规定吴式太极拳', '规定武式太极拳', '规定孙式太极拳', '42式太极拳', '24式太极拳', '太极八法五步', '传统陈式太极拳', '传统杨式太极拳', '传统吴式太极拳', '传统孙式太极拳', '传统武式太极拳', '其他传统太极拳'
      ],
      boxingTradition: ['传统陈式太极拳', '传统杨式太极拳', '传统吴式太极拳', '传统孙式太极拳', '传统武式太极拳', '其他传统太极拳'],
      // 器械项目选项 0:传统项目，1：规定项目
      instrumentOptions: ['42式太极剑', '32式太极剑', '传统陈式太极器械', '传统杨式太极器械', '传统吴式太极器械', '传统孙式太极器械', '传统武式太极器械', '其他传统太极器械'
      ],
      instrumentTradition: ['传统陈式太极器械', '传统杨式太极器械', '传统吴式太极器械', '传统孙式太极器械', '传统武式太极器械', '其他传统太极器械'],
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
    // }
  },
  created () {
    this.getList()
  },
  mounted () {
  },
  watch: {

  },
  methods: {
    getList () {
      this.loading = true
      getPersons().then(res => {
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
    del (id) {
      this.$confirm('是否确定删除?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {

        delPerson(id, this.$store.state.user.authority === 0 ? 'user' : 'admin').then(res => {
          this.getList()
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
    edit (index, item) {
      this.$refs.edit.show('edit', index, item)
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

      if (check.length < 1) {
        if (index === -1) {
          addPerson(row, this.$store.state.user.authority === 0 ? 'user' : 'admin').then(res => {
            this.getList()
            this.$refs.edit.hide()
          }).catch(err => {
            console.log(err)
          })
        } else {
          putPerson(row.id, row, this.$store.state.user.authority === 0 ? 'user' : 'admin').then(res => {
            this.getList()
            this.$refs.edit.hide()
          }).catch(err => {
            console.log(err)
          })
        }


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
