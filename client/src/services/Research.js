import Api from '@/services/Api'

export default{
    Getalluser () {
      return Api().get('getjlist')
    },
    Postresearch (condition) {
      return Api().post('research/post', condition)
    },
    GetuserResearch (condition) {
      return Api().post('research/getusersresearchlist', condition)
    },
    DeleteResearch (condition) {
      return Api().post('research/deleteresearch', condition)
    },
    fecthAccoountResearch (condition) {
      return Api().post('research/geteditresearch', condition)
    },
    Updateresearch (condition) {
      return Api().post('research/updateresearch', condition)
    },
    Getresearchdata () {
      return Api().get('home/getResearchdata')
    },
    Getresearchdataview (condition) {
      return Api().post('home/getresearchdataview', condition)
    },
    Deleteresearchadmin (condition) {
      return Api().post('mainadmin/deleteresearch', condition)
    }
  }
