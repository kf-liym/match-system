<template>
  <div class="home">
    <el-steps class="step" :active="active">
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
    <component v-model="info" :is="componentId" @stepChange="setStep" />
  </div>
</template>

<script>
import step1 from './components/step-1'
import step2 from './components/step-2'
import step3 from './step3'
import step4 from './components/step-4'
import step5 from './components/step-5'
import step6 from './components/step-6'
export default {
  components: {
  },
  props: {

  },
  data () {
    return {
      stepComponent: [
        step1, step2, step3, step4, step5, step6
      ],
      active: 0,
      step: [
        {
          title: '上传责任书'
        },
        {
          title: '填写基本信息'
        },
        {
          title: '填写报项信息'
        },
        {
          title: '报项汇总'
        },
        {
          title: '上传汇款证明'
        },
        {
          title: '提交并等待审核'
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
    componentId () {
      return this.stepComponent[this.active]
    }
  },
  watch: {

  },
  created () {

  },
  mounted () {
  },
  methods: {
    handleStep (index) {
      if (this.info.status !== 0) { return }
      this.active = index
    },
    setStep (index) {
      this.active = index
    }

  }
}
</script>

<style scoped lang="scss">
.home {
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
