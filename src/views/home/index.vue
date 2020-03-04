<template>
  <div class="home-wrap">
    <el-steps class="step" :active="active" align-center>
      <el-step
        v-for="(item, index) in step"
        :key="index"
        :title="item.title"
        @click.native="handleStep(index)"
      />
    </el-steps>
    <el-alert class="alert" title="操作注意事项" type="warning" show-icon :closable="false" />
    <ul class="description">
      <li>1、出质前盖坐着的著作权是否授权及授权情况说明：若未授权他人使用，填写“否”；若有授权情况，请在授权情况说明栏中填写著作权授权许可（包括专有和非专有）他人使用的有关情。</li>
      <li>2、软件为升级版本的，应在申请表软件基本信息栏中的软件作品说明中，选择“修改”并填写修改说明，前期版本已登记的应填写原登记号并提交原证件复印件。</li>
    </ul>
    <router-view class="home-container" />
  </div>
</template>

<script>
import { getProject } from '@/api'
export default {
  components: {
  },
  props: {

  },
  data () {
    return {
      step: [
        {
          title: '常用报名人设置',
          path: '/home/common-info'
        },
        {
          title: '填写基本信息',
          path: '/home/basic-information'
        },
        {
          title: '填写报项信息',
          path: '/home/item-information'
        },
        {
          title: '报项汇总',
          path: '/home/item-summary'
        },
        {
          title: '上传责任书',
          path: '/home/upload-responsibility'
        },
        {
          title: '上传汇款证明',
          path: '/home/upload-prove'
        },
        {
          title: '提交并等待审核',
          path: '/home/submit-review'
        }
      ],
      info: {
        status: '未提交',

        teamInfo: {
          teamName: '队伍名', // 队伍名称
          leaderName: '张小马', // 领队姓名
          tel: '123658252152', // 联系电话
          coachName: '刘小华' // 教练姓名
        },
        // 个人项目
        personalProject: [
          {
            index: '1',
            name: '张小明',
            idcard: '440671199725145421',
            birth: '1997-02-12',
            sex: '男',
            group: '男子少年组',
            projectName: '传统拳术-蔡李佛拳-杠力拳',
            cost: 50
          },
          {
            index: '2',
            name: '张小明',
            idcard: '440671199725145421',
            birth: '1997-02-12',
            sex: '男',
            group: '男子少年组',
            projectName: '传统拳术-蔡李佛拳-杠力拳',
            cost: 50
          },
          {
            index: '3',
            name: '张小明',
            idcard: '440671199725145421',
            birth: '1997-02-12',
            sex: '男',
            group: '男子少年组',
            projectName: '传统拳术-蔡李佛拳-杠力拳',
            cost: 50
          }
        ],
        // 对练项目
        duelExercises: [

          {
            index: '1-1',
            name: '张小明',
            idcard: '440671199725145421',
            birth: '1997-02-12',
            sex: '男',
            group: '男子少年组',
            projectName: '传统拳术-蔡李佛拳-杠力拳',
            cost: 50
          },
          {
            index: '1-2',
            name: '张小明',
            idcard: '440671199725145421',
            birth: '1997-02-12',
            sex: '男',
            group: '男子少年组',
            projectName: '传统拳术-蔡李佛拳-杠力拳',
            cost: 50
          },
          {
            index: '2-1',
            name: '张小明',
            idcard: '440671199725145421',
            birth: '1997-02-12',
            sex: '男',
            group: '男子少年组',
            projectName: '传统拳术-蔡李佛拳-杠力拳',
            cost: 50
          },
          {
            index: '2-2',
            name: '张小明',
            idcard: '440671199725145421',
            birth: '1997-02-12',
            sex: '男',
            group: '男子少年组',
            projectName: '传统拳术-蔡李佛拳-杠力拳',
            cost: 50
          }
        ],
        // 集体项目
        collectiveProject: [
          {
            index: '1-1',
            name: '张小明',
            idcard: '440671199725145421',
            birth: '1997-02-12',
            sex: '男',
            group: '男子少年组',
            projectName: '传统拳术-蔡李佛拳-杠力拳',
            cost: 50
          },
          {
            index: '1-2',
            name: '张小明',
            idcard: '440671199725145421',
            birth: '1997-02-12',
            sex: '男',
            group: '男子少年组',
            projectName: '传统拳术-蔡李佛拳-杠力拳',
            cost: 50
          }
        ]
      }
    }
  },
  computed: {
    // componentId () {
    //   return this.stepComponent[this.active]
    // }
    active: {
      get () {
        return this.$store.state.project.step
      },
      set (val) {
        this.$store.commit('SET_STEP', val)
      }
    },
    status: {
      get () {
        return this.$store.state.project.status
      },
      set (val) {
        this.$store.commit('SET_STATUS', val)
      }
    }
  },
  watch: {

  },
  created () {

  },
  mounted () {
    // this.active = parseInt(this.$route.name.substr(-1)) - 1
    getProject().then(res => {
      console.log(res.data)
      this.$store.commit('SET_STATUS', res.data.status)
      this.$store.commit('SET_RESPONSIBILITY', res.data.responsibility)
      this.$store.commit('SET_REMITTANCE', res.data.remittance)
      this.$store.commit('SET_TEAM', res.data.team)
      this.$store.commit('SET_PERSON', res.data.person)
      this.$store.commit('SET_DULE', res.data.duel)
      this.$store.commit('SET_COLLECTIVE', res.data.collective)
      if (res.data.status !== '未提交') {
        this.active = 5
        if (parseInt(this.$route.name.substr(-1)) !== 6) {
          this.$router.push(this.step[this.active].path)
        }
      }
    }).catch(err => {
      console.log(err)
    })
  },
  methods: {
    handleStep (index) {
      if (this.active === index || this.status !== '未提交') {return}
      // if (this.info.status !== 0) { return }
      this.active = index
      this.$router.push(this.step[index].path)
    },
    setStep (index) {
      this.active = index
    }

  }
}
</script>

<style scoped lang="scss">
.home-wrap {
  padding: 40px 30px 0;
}
.alert {
  margin-top: 20px;
}
.description {
  font-size: 14px;
  padding: 15px 10px;
  li {
    margin-bottom: 5px;
  }
}
</style>
