/* eslint-disable */
<template>
  <div class="margin-t">
    <b-container fluid>
      <!-- User Interface controls -->
      <b-card
        bg-variant="dark"
        text-variant="white"
        title="เครื่องมือค้นหา/และเลือกหน้า"
      >
        <b-row>
          <b-col lg="6" class="my-1">
            <b-form-group
              label="ค้นหาคำค้นเฉพาะ"
              label-cols-sm="3"
              label-align-sm="right"
              label-size="sm"
              description="เลือกอย่างใดอย่างหนึ่งเพื่อค้นหาตำค้น"
              class="mb-0"
            >
              <b-form-checkbox-group v-model="filterOn" class="mt-1">
                <b-form-checkbox value="research_id">ลำดับ</b-form-checkbox>
                <b-form-checkbox value="research_head">หัวข้อ</b-form-checkbox>
                <b-form-checkbox value="user_firstname"
                  >ชื่อจริง</b-form-checkbox
                >
                <b-form-checkbox value="research_focus_name"
                  >ชั้นปี</b-form-checkbox
                >
                <b-form-checkbox value="research_research_year"
                  >ปี</b-form-checkbox
                >
              </b-form-checkbox-group>
            </b-form-group>
          </b-col>

          <b-col lg="6" class="my-1">
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
                  <option :value="false">บทความทั้งหมด</option>
                  <option :value="true">บทความล่าสุด</option>
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
        <template #cell(actions)="row">
          <b-button
            size="sm"
            @click="info(row.item, row.index, $event.target)"
            class="mr-1"
            variant="outline-primary"
          >
            ดูบทคัดย่อ
          </b-button>
          <b-button
            size="sm"
            @click="viewResearch(row.item, row.index)"
            class="mr-1"
            variant="outline-success"
          >
            ดูฉบับเต็ม
          </b-button>
          <b-button
            size="sm"
            @click="deleteResearch(row.item, row.index)"
            class="mr-1"
            variant="outline-danger"
            v-if="IsAdmin == 4"
          >
            ลบข้อมูลงายวิจัย
          </b-button>
        </template>
      </b-table>

      <!-- Info modal -->
      <b-modal
        :id="infoModal.id"
        :title="infoModal.title"
        ok-only
        @hide="resetInfoModal"
      >
        <pre>{{ infoModal.content }}</pre>
      </b-modal>
    </b-container>
  </div>
</template>

<script>
import Researchapi from "@/services/Research";
export default {
  data() {
    return {
      items: [],
      fields: [
        {
          key: "research_id",
          label: "ลำดับ",
          sortable: true,
          sortDirection: "desc",
        },
        {
          key: "research_head",
          label: "หัวข้อ",
          sortable: true,
          class: "text-center",
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
        {
          key: "research_research_year",
          label: "ปี",
          sortable: true,
          class: "text-center",
        },
        {
          key: "research_focus_name",
          label: "ชั้นปี",
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
      }
    }
  },
  computed: {
    sortOptions() {
      // Create an options list from our fields
      return this.fields
        .filter((f) => f.sortable)
        .map((f) => {
          return { text: f.label, value: f.key }
        })
    },
    IsAdmin() {
      return this.$store.getters.ifUserwasAdmin
    },
  },
  mounted() {
    // Set the initial number of items
    this.totalRows = this.items.length
    this.getResearchData()
  },
  methods: {
    info(item, index, button) {
      this.infoModal.title = `ดูบทความเรื่อง ${item.research_head}`
      this.infoModal.content = item.research_abstract
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
    getResearchData() {
      Researchapi.Getresearchdata().then((res) => {
        if (res.data) {
          this.items = res.data
          this.totalRows = this.items.length
        }
      })
    },
    viewResearch(item, index) {
      this.$router.push(`/view/${item.research_id}`)
    },
    deleteResearch(item, index) {
      this.notify({ text: "กำลังลบข้อมูลผู้ใช้", type: "warning" })
      Researchapi.Deleteresearchadmin({ index: item.research_id }).then(
        (res) => {
          if (res.data) {
            this.notify({ text: res.data.text, type: res.data.status })
            this.getResearchData()
          }
        }
      )
    },
    notify(args) {
      this.$notify({
        group: "notifyy",
        title: "ลบงานวิจัย",
        text: args.text,
        position: "bottom right",
        type: args.type,
      })
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.margin-t {
  margin-top: 3%;
}
</style>
