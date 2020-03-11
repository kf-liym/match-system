/*
 * @Desc: 描述
 * @Date: 2020-03-07 14:08:42
 * @LastEditTime: 2020-03-10 23:45:14
 */
const getters = {
  token: state => state.user.token,
  author: state => state.user.author
}
export default getters
