import Userapi from '@/services/Users'
import Vue from 'vue'
import Vuex from 'vuex'
Vue.use(Vuex)

const store = new Vuex.Store({
  state: {
    idToken: null,
    userId: null,
    user_role: null,
    user_firstname: null,
    user_lastname: null,
    user_status: null,
    user_email: null
  },
  actions: {
    login ({commit}, data) {
      Userapi.Login({email: data.email, password: data.password})
        .then(res => {
          if (res.data) {
            console.log(res)
            commit('authUser', {
              token: res.data.token,
              userId: res.data.data.userid,
              user_firstname: res.data.data.firstname,
              user_lastname: res.data.data.lastname,
              user_email: res.data.data.email,
              user_status: res.data.data.status,
              user_role: res.data.data.role
            })
            localStorage.setItem('token', res.data.token)
            localStorage.setItem('userId', res.data.data.userid)
            localStorage.setItem('user_firstname', res.data.data.firstname)
            localStorage.setItem('user_lastname', res.data.data.lastname)
            localStorage.setItem('user_email', res.data.data.email)
            localStorage.setItem('user_status', res.data.data.status)
            localStorage.setItem('user_role', res.data.data.role)
          }
        })
    },
    logout ({commit}) {
      localStorage.removeItem('token')
      localStorage.removeItem('userId')
      localStorage.removeItem('user_firstname')
      localStorage.removeItem('user_lastname')
      localStorage.removeItem('user_email')
      localStorage.removeItem('user_status')
      localStorage.removeItem('user_role')
      commit('clearuser')
    },
    autologin ({commit}) {
      const token = localStorage.getItem('token')
      if (!token) {
        return
      }
      const UserId = localStorage.getItem('userId')
      const Userfirstname = localStorage.getItem('user_firstname')
      const Userlastname = localStorage.getItem('user_lastname')
      const Useremail = localStorage.getItem('user_email')
      const Userstatus = localStorage.getItem('user_status')
      const Userrole = localStorage.getItem('user_role')
      commit('autologin', {
        token: token,
        userId: UserId,
        user_firstname: Userfirstname,
        user_lastname: Userlastname,
        user_email: Useremail,
        user_status: Userstatus,
        user_role: Userrole
      })
    }
  },
  mutations: {
    authUser (state, userData) {
      state.idToken = userData.token
      state.userId = userData.userId
      state.user_firstname = userData.user_firstname
      state.user_lastname = userData.user_lastname
      state.user_email = userData.user_email
      state.user_status = userData.user_status
      state.user_role = userData.user_role
    },
    clearuser (state) {
      state.idToken = null
      state.userId = null
      state.user_firstname = null
      state.user_lastname = null
      state.user_email = null
      state.user_status = null
      state.user_role = null
    },
    autologin (state, userData) {
      state.idToken = userData.token
      state.userId = userData.userId
      state.user_firstname = userData.user_firstname
      state.user_lastname = userData.user_lastname
      state.user_email = userData.user_email
      state.user_status = userData.user_status
      state.user_role = userData.user_role
    }
  },
  getters: {
    user (state) {
      return state.user_firstname
    },
    ifAuthenticated (state) {
      return state.idToken !== null
    },
    ifUserwasAdmin (state) {
      return state.user_role
    },
    Getusername (state) {
      return state.user_firstname
    },
    userid (state) {
      return state.userId  
    }
  }
})

export default store
