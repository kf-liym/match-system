const Mock = require('mockjs')
const axios = {
  signin: {
    post: (options) => {
      console.log(options)
      const user = JSON.parse(options.body);
      if (user.username === 'admin') {
        return {
          // 登录成功
          code: 200,
          token: '2222222222',
          // 权限  0-用户 1-管理员
          authority: 1,
          message: '登录成功'
        }
      } else if (user.username === 'user') {
        return {
          // 登录成功
          code: 200,
          token: '2222222222',
          // 权限  0-用户 1-管理员
          authority: 0,
          message: '登录成功'
        }
      } else {
        return {
          // 登录失败
          code: '',
          message: '账号或者密码不正确'
        }
      }
    }
  },
  signout: {
    post: (options) => {
      return {
        code: 200,
        message: '成功登出'
      }
    }
  },
  signup: {
    post: (options) => {
      let randomBoolean = Math.random() >= 0.5;
      if (randomBoolean) {
        return {
          code: 200,
          message: ''
        }
      } else {
        return {
          code: -1,
          message: '账号已存在。'
        }
      }

    }
  },
  members: {
    get: (options) => {
      return Mock.mock({
        code: 200,
        // 提交状态 0-未提交 1-待审核 2-已审核
        'status': 0,
        // 'status|1': [0, 1, 2],
        'list|20': [{
          id: '@id',
          name: '@cname',
          'certificate|1': ['身份证', '护照', '港澳回乡证', '台湾回乡证', '出生证'], // 证件类型
          idcard: '@id',
          birth: '@date',
          'sex|1': ['男', '女'],
          'size|1': ['小码', '中码', '大码']
        }]
      })
    }
  },
  member: {
    post: (options) => {
      return {
        code: 200,
        message: '添加成功'
      }
    },
    put: (options) => {
      return {
        code: 200,
        message: '修改成功'
      }
    },
    del: (options) => {
      return {
        code: 200,
        message: '删除成功'
      }
    }
  },
  team: {
    post: (options) => {
      return {
        code: 200,
        message: '保存成功'
      }
    },
    get: (options) => {
      return {
        status: 0,
        team: {
          teamName: '队伍名称',
          leaderName: '李四',
          tel: '13000000000',
          coachName: '张三'
        }
      }
    },
    put: (options) => {},
    del: (options) => {}
  },
  all: {
    post: (options) => {},
    get: (options) => {
      return Mock.mock({
        status: 0,
        team: {
          teamName: '队伍名称',
          leaderName: '李四',
          tel: '13000000000',
          coachName: '张三'
        },
        'person|3-10': [{
          id: '@id',
          name: '@cname',
          'certificate|1': ['身份证', '护照', '港澳回乡证', '台湾回乡证', '出生证'], // 证件类型
          idcard: '@id',
          birth: '@date',
          'sex|1': ['男', '女'],
          'size|1': ['小码', '中码', '大码'],
          'group|1': ['儿童组（A组）', '少年组（B组）', '青年组（C组）'],
          'boxing|1': ['规定陈式太极拳', '规定杨式太极拳', '规定吴式太极拳', '规定武式太极拳', '规定孙式太极拳', '42 式太极拳', '24 式太极拳', '太极八法五步', '传统陈式太极拳', '传统杨式太极拳', '传统吴式太极拳', '传统式太极拳', '传统武式太极拳', '其他传统太极拳'],
          'boxingType|1': [0, 1],
          boxingRoutine: '我是一个套路名称1',
          'instrument|1': ['42 式太极剑', '32 式太极剑', '传统陈式太极器械', '传统杨式太极器械', '传统吴式太极器械', '传统孙式太极器械', '传统武式太极器械', '其他传统太极器械'],
          'instrumentType|1': [0, 1],
          instrumentRoutine: '我是一个套路名称2'
        }],
        'duel|3-10': [{
          'contestants|2': [{
            id: '@id',
            name: '@cname',
            'certificate|1': ['身份证', '护照', '港澳回乡证', '台湾回乡证', '出生证'], // 证件类型
            idcard: '@id',
            birth: '@date',
            'sex|1': ['男', '女'],
            'size|1': ['小码', '中码', '大码'],
            'group|1': ['少年组', '成年组']
          }],
          'item|1': ['双人太极拳对练', '双人太极器械对练'],
          'itemType|1': [0, 1],
          itemRoutine: '我是一个套路名称3'
        }],
        'collective': [{
          'contestants|6': [{
            id: '@id',
            name: '@cname',
            'certificate|1': ['身份证', '护照', '港澳回乡证', '台湾回乡证', '出生证'], // 证件类型
            idcard: '@id',
            birth: '@date',
            'sex|1': ['男', '女'],
            'size|1': ['小码', '中码', '大码'],
            'group|1': ['少年组', '成年组']
          }],
          'item|1': ['集体太极八法五步', '集体太极拳术', '集体太极器械'],
          'itemType|1': [0, 1],
          itemRoutine: '我是一个套路名称3'
        }],
        responsibility: [
          {
            name: 'ddd.jpg',
            url: 'https://img-blog.csdnimg.cn/20190918140012416.png'
          }, {
            name: 'eee.jpg',
            url: 'https://img-blog.csdnimg.cn/2019092715111047.png'
          }
        ],
        prove: [
          {
            name: 'ddd.jpg',
            url: 'https://img-blog.csdnimg.cn/20190918140012416.png'
          }, {
            name: 'eee.jpg',
            url: 'https://img-blog.csdnimg.cn/2019092715111047.png'
          }
        ]
      })
    },
    put: (options) => {},
    del: (options) => {}
  },
  person: {
    list: (options) => {
      return Mock.mock({
        status: 0,
        'list|3-10': [{
          id: '@id',
          name: '@cname',
          'certificate|1': ['身份证', '护照', '港澳回乡证', '台湾回乡证', '出生证'], // 证件类型
          idcard: '@id',
          birth: '@date',
          'sex|1': ['男', '女'],
          'size|1': ['小码', '中码', '大码'],
          'group|1': ['儿童组（A组）', '少年组（B组）', '青年组（C组）'],
          'boxing|1': ['规定陈式太极拳', '规定杨式太极拳', '规定吴式太极拳', '规定武式太极拳', '规定孙式太极拳', '42 式太极拳', '24 式太极拳', '太极八法五步', '传统陈式太极拳', '传统杨式太极拳', '传统吴式太极拳', '传统式太极拳', '传统武式太极拳', '其他传统太极拳'],
          'boxingType|1': [0, 1],
          boxingRoutine: '我是一个套路名称1',
          'instrument|1': ['42 式太极剑', '32 式太极剑', '传统陈式太极器械', '传统杨式太极器械', '传统吴式太极器械', '传统孙式太极器械', '传统武式太极器械', '其他传统太极器械'],
          'instrumentType|1': [0, 1],
          instrumentRoutine: '我是一个套路名称2'
        }]
      })
    },
    post: (options) => {
      return {
        code: 200,
        message: '添加成功'
      }
    },
    get: (options) => {},
    put: (options) => {
      return {
        code: 200,
        message: '修改成功'
      }
    },
    del: (options) => {
      return {
        code: 200,
        message: '删除成功'
      }
    }
  },
  duel: {
    list: (options) => {
      return Mock.mock({
        status: 0,
        'list|3-10': [{
          id: '@id',
          'item|1': ['双人太极拳对练', '双人太极器械对练'],
          'itemType|1': [0, 1],
          itemRoutine: '我是一个套路名称3',
          'contestants|2': [{
            id: '@id',
            name: '@cname',
            'certificate|1': ['身份证', '护照', '港澳回乡证', '台湾回乡证', '出生证'], // 证件类型
            idcard: '@id',
            birth: '@date',
            'sex|1': ['男', '女'],
            'size|1': ['小码', '中码', '大码'],
            'group|1': ['少年组', '成年组']
          }]
        }]
      })
    },
    post: (options) => {
      return {
        code: 200,
        message: '添加成功'
      }
    },
    get: (options) => {},
    put: (options) => {
      return {
        code: 200,
        message: '修改成功'
      }
    },
    del: (options) => {
      return {
        code: 200,
        message: '删除成功'
      }
    }
  },
  collective: {
    list: (options) => {
      return Mock.mock({
        status: 0,
        'list': [{
          id: '@id',
          'item|1': ['集体太极八法五步', '集体太极拳术', '集体太极器械'],
          'itemType|1': [0, 1],
          itemRoutine: '我是一个套路名称3',
          'contestants|6': [{
            id: '@id',
            name: '@cname',
            'certificate|1': ['身份证', '护照', '港澳回乡证', '台湾回乡证', '出生证'], // 证件类型
            idcard: '@id',
            birth: '@date',
            'sex|1': ['男', '女'],
            'size|1': ['小码', '中码', '大码'],
            'group|1': ['少年组', '成年组']
          }]
        }]
      })
    },
    post: (options) => {
      return {
        code: 200,
        message: '添加成功'
      }
    },
    get: (options) => {},
    put: (options) => {
      return {
        code: 200,
        message: '修改成功'
      }
    },
    del: (options) => {
      return {
        code: 200,
        message: '删除成功'
      }
    }
  },
  responsibility: {
    list: options => {
      return {
        list: [{
          name: 'ddd.jpg',
          url: 'https://img-blog.csdnimg.cn/20190918140012416.png'
        }, {
          name: 'eee.jpg',
          url: 'https://img-blog.csdnimg.cn/2019092715111047.png'
        }]
      }
    },
    post: (options) => {
      return {
        code: 200,
        message: ''
      }
    },
    get: (options) => {
      return {
        code: 200,
        message: ''
      }
    },
    put: (options) => {},
    del: (options) => {}
  },
  prove: {
    list: options => {
      return {
        list: [{
          name: 'ddd.jpg',
          url: 'https://img-blog.csdnimg.cn/20190918140012416.png'
        }, {
          name: 'eee.jpg',
          url: 'https://img-blog.csdnimg.cn/2019092715111047.png'
        }]
      }
    },
    post: (options) => {
      return {
        code: 200,
        message: ''
      }
    },
    get: (options) => {
      return {
        code: 200,
        message: ''
      }
    },
    put: (options) => {},
    del: (options) => {}
  },
  form: {
    post: (options) => {
      return {
        code: 200,
        message: '',
        status: 2
      }
    },
    get: (options) => {},
    put: (options) => {},
    del: (options) => {}
  },
  admin: {
    count: (options) => {
      return {
        registered: 3000,
        unsubmitted: 3000,
        pending: 3000,
        pass: 3000,
        sex: 3000,
        male: 3000,
        female: 3000,
        project: 3000,
        personal: 3000,
        duel: 3000,
        collective: 3000
      }
    },
    list: (options) => {
      return Mock.mock({
        count: 100,
        'list|10-15': [{
          id: 'ddd',
          status: 0,
          username: '用户名',
          password: '密码',
          team: {
            teamName: '队伍名称',
            leaderName: '李四',
            tel: '13000000000',
            coachName: '张三'
          },
          'person|3-10': [{
            id: '@id',
            name: '@cname',
            'certificate|1': ['身份证', '护照', '港澳回乡证', '台湾回乡证', '出生证'], // 证件类型
            idcard: '@id',
            birth: '@date',
            'sex|1': ['男', '女'],
            'size|1': ['小码', '中码', '大码'],
            'group|1': ['儿童组（A组）', '少年组（B组）', '青年组（C组）'],
            'boxing|1': ['规定陈式太极拳', '规定杨式太极拳', '规定吴式太极拳', '规定武式太极拳', '规定孙式太极拳', '42 式太极拳', '24 式太极拳', '太极八法五步', '传统陈式太极拳', '传统杨式太极拳', '传统吴式太极拳', '传统式太极拳', '传统武式太极拳', '其他传统太极拳'],
            'boxingType|1': [0, 1],
            boxingRoutine: '我是一个套路名称1',
            'instrument|1': ['42 式太极剑', '32 式太极剑', '传统陈式太极器械', '传统杨式太极器械', '传统吴式太极器械', '传统孙式太极器械', '传统武式太极器械', '其他传统太极器械'],
            'instrumentType|1': [0, 1],
            instrumentRoutine: '我是一个套路名称2'
          }],
          'duel|3-10': [{
            'contestants|2': [{
              id: '@id',
              name: '@cname',
              'certificate|1': ['身份证', '护照', '港澳回乡证', '台湾回乡证', '出生证'], // 证件类型
              idcard: '@id',
              birth: '@date',
              'sex|1': ['男', '女'],
              'size|1': ['小码', '中码', '大码'],
              'group|1': ['少年组', '成年组']
            }],
            'item|1': ['双人太极拳对练', '双人太极器械对练'],
            'itemType|1': [0, 1],
            itemRoutine: '我是一个套路名称3'
          }],
          'collective': [{
            'contestants|6': [{
              id: '@id',
              name: '@cname',
              'certificate|1': ['身份证', '护照', '港澳回乡证', '台湾回乡证', '出生证'], // 证件类型
              idcard: '@id',
              birth: '@date',
              'sex|1': ['男', '女'],
              'size|1': ['小码', '中码', '大码'],
              'group|1': ['少年组', '成年组']
            }],
            'item|1': ['集体太极八法五步', '集体太极拳术', '集体太极器械'],
            'itemType|1': [0, 1],
            itemRoutine: '我是一个套路名称3'
          }],
          responsibility: [{
            name: 'ddd.jpg',
            url: 'https://img-blog.csdnimg.cn/20190918140012416.png'
          }, {
            name: 'eee.jpg',
            url: 'https://img-blog.csdnimg.cn/2019092715111047.png'
          }],
          prove: [{
            name: 'ddd.jpg',
            url: 'https://img-blog.csdnimg.cn/20190918140012416.png'
          }, {
            name: 'eee.jpg',
            url: 'https://img-blog.csdnimg.cn/2019092715111047.png'
          }]
        }]
      })
    },
    reject: (options) => {
      return {
        code: 200,
        message: ''
      }
    },
    pass: (options) => {
      return {
        code: 200,
        message: ''
      }
    }
  }
}

export default axios