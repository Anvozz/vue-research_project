<template>
  <div class="margint-5">
    <b-container fluid>
      <div>

        <b-row>
<b-col lg="4">
          <b-card title="เพิ่มผู้ใช้" sub-title="Adduser">


            <div role="group">
            <label for="input-live">ชื่อจริง:</label>
            <b-form-input
            id="input-live"
            v-model="userdata.firstname"
            :state="firstnamelength"
            aria-describedby="input-live-help input-live-feedback"
            placeholder="กรุณาใส่ชื่อจริง"
            trim
            type="text"
            ></b-form-input>

            <!-- This will only be shown if the preceding input has an invalid state -->
            <b-form-invalid-feedback id="input-live-feedback">
            กรุณากรอกข้อมูลอย่างน้อย 3 ตัวขึ้นไป
            </b-form-invalid-feedback>

            <!-- This is a form text block (formerly known as help block) -->
           <b-form-text id="input-live-help">Your full name.</b-form-text>
          </div>

          <div role="group">
            <label for="input-live">นามสกุล:</label>
            <b-form-input
            id="input-live"
            v-model="userdata.lastname"
            :state="lastnamelength"
            aria-describedby="input-live-help input-live-feedback"
            placeholder="กรุณาใส่นามสกุล"
            trim
            type="text"
            ></b-form-input>

            <!-- This will only be shown if the preceding input has an invalid state -->
            <b-form-invalid-feedback id="input-live-feedback">
            กรุณากรอกข้อมูลอย่างน้อย 3 ตัวขึ้นไป
            </b-form-invalid-feedback>

            <!-- This is a form text block (formerly known as help block) -->
           <b-form-text id="input-live-help">ใส่นามสกุล</b-form-text>
          </div>

          <div role="group">
            <label for="input-live">Email:</label>
            <b-form-input
            id="input-live"
            v-model="userdata.email"
            :state="Isvalid"
            aria-describedby="input-live-help input-live-feedback"
            placeholder="กรุณาใส่อีเมลล์"
            trim
            type="email"
            @change="validemailcheck()"
            ></b-form-input>

            <!-- This will only be shown if the preceding input has an invalid state -->
            <b-form-invalid-feedback id="input-live-feedback">
            มีผู้ใช้อีเมลล์นีแล้ว
            </b-form-invalid-feedback>

            <!-- This is a form text block (formerly known as help block) -->
           <b-form-text id="input-live-help">ใส่อีเมลล์</b-form-text>
          </div>

          <div role="group">
            <label for="input-live">Password:</label>
            <b-form-input
            id="input-live"
            v-model="userdata.password"
            :state="passwordlength"
            aria-describedby="input-live-help input-live-feedback"
            placeholder="กรุณาใส่พาสเวิร์ด"
            trim
            type="password"
            ></b-form-input>

            <!-- This will only be shown if the preceding input has an invalid state -->
            <b-form-invalid-feedback id="input-live-feedback">
            กรุณากรอกข้อมูลอย่างน้อย 3 ตัวขึ้นไป
            </b-form-invalid-feedback>

            <!-- This is a form text block (formerly known as help block) -->
           <b-form-text id="input-live-help">ใส่พาสเวิร์ด</b-form-text>
          </div>


          <b-button variant="outline-success" v-on:click="Adduser">เพิ่มผู้ใช้</b-button>




        </b-card>
        </b-col>

        <b-col lg="8">
          <b-card title="แก้ไข/ลบผู้ใช้" sub-title="Edit/Delete User">

          <b-card
        bg-variant="dark"
        text-variant="white"
        title="เครื่องมือค้นหา"
      >
        <b-row>
          <b-col lg="5" class="my-1">
            <b-form-group
              label="ค้นหาคำค้นเฉพาะ"
              label-cols-sm="3"
              label-align-sm="right"
              label-size="sm"
              description="เลือกอย่างใดอย่างหนึ่งเพื่อค้นหาตำค้น"
              class="mb-0"
            >
              <b-form-checkbox-group v-model="filterOn" class="mt-1">
                <b-form-checkbox value="userid">ลำดับ</b-form-checkbox>
                <b-form-checkbox value="user_firstname"
                  >ชื่อจริง</b-form-checkbox
                >
                <b-form-checkbox value="user_lastname"
                  >นามสกุล</b-form-checkbox
                >
              </b-form-checkbox-group>
            </b-form-group>
          </b-col>

          <b-col lg="4" class="my-1">
            <b-form-group
              label="ค้นหาแบบคำค้น"
              label-cols-sm="3"
              label-align-sm="right"
              label-size="sm"
              label-for="filterInput"
              class="mb-0"
            >
              <b-input-group size="sm">
                <b-form-input
                  v-model="filter"
                  type="search"
                  id="filterInput"
                  placeholder="พิมพ์เพื่อหาเฉพาะ"
                ></b-form-input>
                <b-input-group-append>
                  <b-button :disabled="!filter" @click="filter = ''"
                    >Clear</b-button
                  >
                </b-input-group-append>
              </b-input-group>
            </b-form-group>
          </b-col>

          <b-col lg="6" class="my-1">
            <b-form-group
              label="เครื่องมือจัดเรียงลำดับ"
              label-cols-sm="3"
              label-align-sm="right"
              label-size="sm"
              label-for="sortBySelect"
              class="mb-0"
            >
              <b-input-group size="sm">
                <b-form-select
                  v-model="sortBy"
                  id="sortBySelect"
                  :options="sortOptions"
                  class="w-75"
                >
                  <template #first>
                    <option value="">ถ้าหากจะเรียงลำดับให้เลือกตรงนี้</option>
                  </template>
                </b-form-select>
                <b-form-select
                  v-model="sortDesc"
                  size="sm"
                  :disabled="!sortBy"
                  class="w-25"
                >
                  <option :value="false">ผู้ใช้ทั้งหมด</option>
                  <option :value="true">ผู้ใช้ล่าสุด</option>
                </b-form-select>
              </b-input-group>
            </b-form-group>
          </b-col>

          <b-col sm="5" md="6" class="my-1">
            <b-form-group
              label="จำนวนบรรทัดต่อ 1 หน้า"
              label-cols-sm="6"
              label-cols-md="4"
              label-cols-lg="3"
              label-align-sm="right"
              label-size="sm"
              label-for="perPageSelect"
              class="mb-0"
            >
              <b-form-select
                v-model="perPage"
                id="perPageSelect"
                size="sm"
                :options="pageOptions"
              ></b-form-select>
            </b-form-group>
          </b-col>

          <b-col sm="7" md="6" class="my-1">
            <b-pagination
              v-model="currentPage"
              :total-rows="totalRows"
              :per-page="perPage"
              align="fill"
              size="sm"
              class="my-0"
            ></b-pagination>
          </b-col>
        </b-row>
      </b-card>

      <!-- Main table element -->
      <b-table
        show-empty
        small
        stacked="md"
        :items="items"
        :fields="fields"
        :current-page="currentPage"
        :per-page="perPage"
        :filter="filter"
        :filter-included-fields="filterOn"
        :sort-by.sync="sortBy"
        :sort-desc.sync="sortDesc"
        :sort-direction="sortDirection"
        :head-variant="dark"
        :table-variant="secondary"
        @filtered="onFiltered"
      >
        <template #cell(name)="row">
          {{ row.value.first }} {{ row.value.last }}
        </template>

        <template #cell(actions)="row">
          <b-button
            size="sm"
            @click="info(row.item, row.index , $event.target)"
            class="mr-1"
            variant="outline-warning"
          >
            แก้ไขผู้ใช้
          </b-button>
          <b-button
            size="sm"
            @click="Deleteuser(row.item, row.index,$event.target)"
            class="mr-1"
            variant="outline-danger"
          >
            ลบผู้ใช้
          </b-button>
        </template>

        <template #row-details="row">
          <b-card>
            <ul>
              <li v-for="(value, key) in row.item" :key="key">
                {{ key }}: {{ value }}
              </li>
            </ul>
          </b-card>
        </template>
      </b-table>


          </b-card>
        </b-col>

        </b-row>

    </div>

     <!-- Info modal -->
      <b-modal
        :id="infoModal.id"
        ok-only
        @hide="resetInfoModal"
        hide-footer
      >

      <b-col lg="12">
          <b-card title="แก้ไขผู้ใช้" sub-title="Edit">


            <div role="group">
            <label for="input-live">ชื่อจริง:</label>
            <b-form-input
            id="input-live"
            v-model="edituserdata.user_firstname"
            aria-describedby="input-live-help input-live-feedback"
            placeholder="กรุณาใส่ชื่อจริง"
            trim
            type="text"
            ></b-form-input>
          </div>

          <div role="group">
            <label for="input-live">นามสกุล:</label>
            <b-form-input
            id="input-live"
            v-model="edituserdata.user_lastname"
            aria-describedby="input-live-help input-live-feedback"
            placeholder="กรุณาใส่นามสกุล"
            trim
            type="text"
            ></b-form-input>
          </div>

          <div role="group">
            <label for="input-live">Email:</label>
            <b-form-input
            id="input-live"
            v-model="edituserdata.email"
            aria-describedby="input-live-help input-live-feedback"
            placeholder="กรุณาใส่อีเมลล์"
            trim
            type="email"
            @change="validemailcheck()"
            ></b-form-input>
          </div>

          <div role="group">
            <label for="input-live">Password:</label>
            <b-form-input
            id="input-live"
            v-model="edituserdata.password"
            aria-describedby="input-live-help input-live-feedback"
            placeholder="กรุณาใส่พาสเวิร์ด"
            trim
            type="password"
            ></b-form-input>
          </div>


          <b-button variant="outline-primary" v-on:click="Edituser">แก้ไขผู้ใช้</b-button>




        </b-card>
        </b-col>

      </b-modal>

    </b-container>
  </div>
</template>

<script>
import Userapi from "@/services/Users";
export default {
  name: 'Dashboard',
  data() {
    return {
      userdata: {
        firstname: '',
        lastname: '',
        email: '',
        password: ''
      },
      Isvalid: null,
      fields: [
        {
          key: "userid",
          label: "ลำดับ",
          sortable: true,
          sortDirection: "desc",
        },
        {
          key: "user_firstname",
          label: "ชื่อจริง",
          sortable: true,
          class: "text-center",
        },
        {
          key: "user_lastname",
          label: "นามสกุล",
          sortable: true,
          class: "text-center",
        },
        { key: "actions", label: "จัดการข้อมูล" },
      ],
      totalRows: 1,
      currentPage: 1,
      perPage: 5,
      pageOptions: [5, 10, 15, { value: 100, text: "100" }],
      sortBy: "",
      sortDesc: false,
      sortDirection: "asc",
      filter: null,
      filterOn: [],
      infoModal: {
        id: "info-modal",
        title: "",
        content: "",
      },
      edituserdata: []
    }

  },
  computed: {
    firstnamelength () {
      return this.userdata.firstname.length > 2 ? true : false
    },
    lastnamelength () {
      return this.userdata.lastname.length > 2 ? true : false
    },
    emaillength () {
      return this.userdata.email.length > 2 ? true : false
    },
    passwordlength () {
      return this.userdata.password.length > 2 ? true : false
    },
    sortOptions() {
      // Create an options list from our fields
      return this.fields
        .filter((f) => f.sortable)
        .map((f) => {
          return { text: f.label, value: f.key };
        });
    }
  },
  methods: {
    validemailcheck () {
      Userapi.Validemailcheck({email: this.userdata.email})
        .then(res =>{
          this.Isvalid = res.data.state
        })
    },
    Adduser () {
      if (this.Isvalid){
        this.notify({ text: "กำลังเพิ่มข้อมูลผู้ใช้", type: "warning" })
        Userapi.Adduser({data: this.userdata})
          .then(res =>{
            this.notify({ text: res.data.text, type: res.data.status });
            this.fecthuserData()
            this.clearData()
        })
      }else{
        this.notify({ text: "ไม่สารมารถเพิ่มผู้ใช้ได้เนื่องจากมีอีเมลล์นี้ในระบบอยู่แล้ว", type: "error" })
      }
    },
    notify(args) {
      this.$notify({
        group: "notifyy",
        title: "AdminDashboard",
        text: args.text,
        position: "bottom right",
        type: args.type,
      })
    },
    clearData () {
      this.userdata.email = ''
      this.userdata.password = ''
      this.userdata.firstname = ''
      this.userdata.lastname = ''
      this.Isvalid = null
    },
    fecthuserData () {
      Userapi.Getusers()
        .then( (res) =>{
          this.items = res.data
          this.totalRows = this.items.length
        })
    },
    info(item, index, button) {
      this.infoModal.title = `แก้ไขข้อมูลผู้ใช้ของ ${item.user_firstname}`
      this.infoModal.content = ``
      this.edituserdata = item
      this.$root.$emit("bv::show::modal", this.infoModal.id, button)
    },
    resetInfoModal() {
      this.infoModal.title = ""
      this.infoModal.content = ""
    },
    onFiltered(filteredItems) {
      // Trigger pagination to update the number of buttons/pages due to filtering
      this.totalRows = filteredItems.length
      this.currentPage = 1
    },
    Edituser () {
      if(this.Isvalid) {
        this.notify({ text: "กำลังแก้ไขข้อมูลผู้ใช้", type: "warning" })
        Userapi.Editusers({data: this.edituserdata})
        .then((res) => {
          this.notify({ text: res.data.text, type: res.data.status });
          this.clearData();
        })
      }else{
        this.notify({ text: "ไม่สารมารถเพิ่มผู้ใช้ได้เนื่องจากมีอีเมลล์นี้ในระบบอยู่แล้ว", type: "error" })
      }
    },
    Deleteuser (item , index , button) {
        this.notify({ text: "กำลังลบข้อมูลผู้ใช้", type: "warning" })
        Userapi.Deleteusers({userid: item.userid})
          .then((res) => {
            this.notify({ text: res.data.text, type: res.data.status });
            this.fecthuserData()
          })
    }
  },
  mounted() {
    this.fecthuserData()
    this.totalRows = this.items.length
  },


}
</script>

<style>
  .margint-5{
    margin-top: 5%;
  }
</style>
