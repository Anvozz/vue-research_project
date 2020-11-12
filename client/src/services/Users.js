import Api from '@/services/Api'

export default{

  Login (condition) {
    return Api().post('login', condition)
  },
  Validemailcheck (condition) {
    return Api().post('user/valideemailcheck', condition)
  },
  Adduser (condition) {
    return Api().post('user/addusersdata', condition)
  },
  Getusers () {
    return Api().get('user/getusersdata')
  },
  Editusers (condition) {
    return Api().post('user/edituser',condition)
  },
  Deleteusers (codition) {
    return Api().post('user/deleteuser',codition)
  },
  Fetchuserfocus () {
    return Api().get('user/getresearch_focus')
  }
}
