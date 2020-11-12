<template>
  <div class="margin-t">
    <b-container fluid>
      <div>
        <b-tabs no-body>
          <b-tab active>
            <template #title> หัวข้อวิจัย: </template>
            <p class="margin-t">หัวข้อวิจัย:</p>
            <div>
              <b-form-textarea
                id="textarea-rows"
                placeholder="พิมพ์ที่นี่........"
                rows="15"
                v-model="formdata.research_head"
              ></b-form-textarea>
            </div>
          </b-tab>

          <b-tab>
            <template #title> ความเป็นมาและความสำคัญของปัญหา: </template>
            <p class="margin-t">ความเป็นมาและความสำคัญของปัญหา:</p>
            <div>
              <b-form-textarea
                id="textarea-rows"
                placeholder="พิมพ์ที่นี่........"
                rows="15"
                v-model="formdata.research_history"
              ></b-form-textarea>
            </div>
          </b-tab>

          <b-tab>
            <template #title> จุดประสงค์: </template>
            <p class="margin-t">จุดประสงค์:</p>
            <div>
              <b-form-textarea
                id="textarea-rows"
                placeholder="พิมพ์ที่นี่........"
                rows="15"
                v-model="formdata.research_goal"
              ></b-form-textarea>
            </div>
          </b-tab>

          <b-tab>
            <template #title> ประชากร/กลุ่มตัวอย่าง: </template>
            <p class="margin-t">ประชากร/กลุ่มตัวอย่าง:</p>
            <div>
              <b-form-textarea
                id="textarea-rows"
                placeholder="พิมพ์ที่นี่........"
                rows="15"
                v-model="formdata.research_tester"
              ></b-form-textarea>
            </div>
          </b-tab>

          <b-tab>
            <template #title> นวัติกรรม/เครื่องมือ: </template>
            <p class="margin-t">นวัติกรรม/เครื่องมือ:</p>
            <div>
              <b-form-textarea
                id="textarea-rows"
                placeholder="พิมพ์ที่นี่........"
                rows="15"
                v-model="formdata.research_tool"
              ></b-form-textarea>
            </div>
          </b-tab>

          <b-tab>
            <template #title> วิธิดำเนินการ: </template>
            <p class="margin-t">วิธิดำเนินการ:</p>
            <div>
              <b-form-textarea
                id="textarea-rows"
                placeholder="พิมพ์ที่นี่........"
                rows="15"
                v-model="formdata.research_how"
              ></b-form-textarea>
            </div>
          </b-tab>

          <b-tab>
            <template #title> ผลการวิจัย: </template>
            <p class="margin-t">ผลการวิจัย:</p>
            <div>
              <b-form-textarea
                id="textarea-rows"
                placeholder="พิมพ์ที่นี่........"
                rows="15"
                v-model="formdata.research_result"
              ></b-form-textarea>
            </div>
          </b-tab>

          <b-tab>
            <template #title> บทคัดย่อ: </template>
            <p class="margin-t">บทคัดย่อ:</p>
            <div>
              <b-form-textarea
                id="textarea-rows"
                placeholder="พิมพ์ที่นี่........"
                rows="14"
                v-model="formdata.research_abstract"
              ></b-form-textarea>
            </div>
            <p class="margin-t">คำสำคัญ:</p>
            <div>
              <b-form-textarea
                id="textarea-rows"
                placeholder="พิมพ์ที่นี่........"
                rows="4"
                v-model="formdata.research_abstract_thai_keyword"
              ></b-form-textarea>
            </div>
          </b-tab>

          <b-tab>
            <template #title> Abstract: </template>
            <p class="margin-t">Abstract:</p>
            <div>
              <b-form-textarea
                id="textarea-rows"
                placeholder="พิมพ์ที่นี่........"
                rows="15"
                v-model="formdata.research_abstract_eng"
              ></b-form-textarea>
            </div>
            <p class="margin-t">Keyword:</p>
            <div>
              <b-form-textarea
                id="textarea-rows"
                placeholder="พิมพ์ที่นี่........"
                rows="4"
                v-model="formdata.research_abstract_eng_keyword"
              ></b-form-textarea>
            </div>
          </b-tab>

          <b-tab>
            <template #title> อื่นๆ: </template>
            <p class="margin-t">อื่นๆ:</p>
            <div>
              <b-form-select v-model="formdata.research_focus" class="mb-3">
                <!-- This slot appears above the options from 'options' prop -->
                <template #first>
                  <b-form-select-option :value="null" disabled
                    >-- กรุณาเลือกระดับชั้น --</b-form-select-option
                  >
                </template>

                <!-- These options will appear after the ones from 'options' prop -->
                <b-form-select-option value="1">1</b-form-select-option>
                <b-form-select-option value="D">Option D</b-form-select-option>
              </b-form-select>
            </div>
          </b-tab>
        </b-tabs>
      </div>
      <b-button
        variant="outline-success"
        class="margin-t"
        v-on:click="postresearch"
        >เพิ่มบทความวิจัย</b-button
      >
    </b-container>
  </div>
</template>

<script>
import Researchapi from "@/services/Research";
export default {
  name: "Createresearch",
  data() {
    return {
      formdata: {
        research_head: null,
        research_history: null,
        research_goal: null,
        research_tester: null,
        research_tool: null,
        research_how: null,
        research_result: null,
        research_abstract: null,
        research_focus: null,
        research_abstract_thai_keyword: null,
        research_abstract_eng: null,
        research_abstract_eng_keyword: null,
      },
    };
  },
  methods: {
    postresearch() {
      this.notify({ text: "กำลังอัพโหลดงานวิจัย", type: "warn" });
      Researchapi.Postresearch({
        data: this.formdata,
        userid: this.userid,
      }).then((res) => {
        if (res.data) {
          console.log(res);
          this.notify({ text: res.data.text, type: res.data.status });
        }
      });
    },
    notify(args) {
      this.$notify({
        group: "notifyy",
        title: "อัพโหลดงานวิจัย",
        text: args.text,
        position: "bottom right",
        type: args.type,
      });
    },
  },
  computed: {
    userid() {
      return this.$store.getters.userid;
    },
  },
};
</script>

<style scoped>
.margin-t {
  margin-top: 2%;
}
.txt-a {
  text-align: center;
}
.nav-tabs .nav-link.active,
.nav-tabs .nav-item.show .nav-link {
  color: #495057;
  background-color: #ffc107 !important;
  border-color: #dee2e6 #dee2e6 #fff;
}
a {
  color: #000000 !important;
  text-decoration: none;
  background-color: transparent;
}
</style>
