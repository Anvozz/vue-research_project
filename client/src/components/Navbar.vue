/* eslint-disable */
<template>
  <div class="margin-0">
  <div>
  <b-navbar toggleable="lg" type="light" variant="warning">
    <b-navbar-brand href="#/">ระบบแสดงผลงานวิจัยในชันเรียน</b-navbar-brand>

    <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>

    <b-collapse id="nav-collapse" is-nav>
      <b-navbar-nav>
        <b-nav-item-dropdown text="ผลงานวิจัย" v-if='IsAuth'>
          <b-dropdown-item href="#/createresearch">เพิ่มผลงานวิจัย</b-dropdown-item>
          <b-dropdown-item href="#/editresearchlist">แก้ไข/ลบผลงานวิจัย</b-dropdown-item>
        </b-nav-item-dropdown>
        <b-nav-item href="#/dashboard" v-if='IsAdmin == 4' >จัดการข้อมูล</b-nav-item>
        </b-navbar-nav>

      <!-- Right aligned nav items -->
      <b-navbar-nav class="ml-auto">

        <b-nav-item href="#"><font-awesome-icon icon="fa-book" />คู่มือการใช้งาน</b-nav-item>
        <b-button @click="$bvModal.show('modal-scoped')" variant="outline-primary" v-if='!IsAuth'>เข้าสู่ระบบ</b-button>
        <b-nav-item-dropdown right v-if='IsAuth'>
          <!-- Using 'button-content' slot -->
          <template #button-content>
            <em>{{Username}}</em>
          </template>
          <b-dropdown-item v-on:click="Logout" >ออกจากระบบ</b-dropdown-item>
        </b-nav-item-dropdown>
      </b-navbar-nav>
    </b-collapse>
  </b-navbar>

  <b-modal id="modal-scoped" type="dark" variant="dark" >

    <template #modal-header="{ close }">
      <!-- Emulate built in modal header close button action -->
      <b-button size="sm" variant="outline-danger" @click="close()">
        ปิด
      </b-button>
      <h5>เข้าสู่ระบบ</h5>
    </template>

    <template #default="{ hide }">
        <b>Email :</b>
        <b-form-input v-model="Logindata.email" type="email" placeholder="Email"></b-form-input>
        <b>Password :</b>
        <b-form-input v-model="Logindata.password" type="password" placeholder="Password"></b-form-input>
    </template>

    <template #modal-footer="{ ok, cancel, hide }">
      <b>ถ้าหากยังไม่มีชื่อผู้ใช่กรุณาติดต่อผู้ดูแลระบบ.</b>
      <b-button size="sm" variant="success" @click="ok()" v-on:click="Login">
        ล็อกอิน
      </b-button>
      <b-button size="sm" variant="danger" @click="cancel()" v-on:click="Cancellogin">
        ยกเลิก
      </b-button>
    </template>
  </b-modal>
</div>
</div>
</template>

<script>
export default {
  name: 'Navbar',
  data: function () {
    return {
      Logindata: {
        email: '',
        password: ''
      }
    }
  },
  methods: {
    Cancellogin () {
      this.Logindata.email = ''
      this.Logindata.password = ''
    },
    Login () {
      this.$store.dispatch('login', this.Logindata)
    },
    Logout () {
      this.$store.dispatch('logout')
    }
  },
  computed: {
    IsAuth () {
      return this.$store.getters.ifAuthenticated
    },
    IsAdmin () {
      console.log(this.$store.getters.ifUserwasAdmin)
      return this.$store.getters.ifUserwasAdmin
    },
    Username () {
      return this.$store.getters.Getusername
    }
  },
  created () {
    this.$store.dispatch('autologin')
  }
}
</script>

<style>
  .margin-0{
    margin-top: 0;
  }
  .navbar-transparent{
    background: rgba(0,0,0,0.0);
  }
</style>
