<template>
    <div class="margin-five">
      <b-container fluid>


  <div class="mt-3">
    <b-row>
    <b-col sm="12">
       <b-card border-variant="dark" header="หัวข้อวิจัย" >
        <b-card-text>{{formdata.research_head}}</b-card-text>
      </b-card>
    </b-col>

  </b-row>
  </div>

  <div class="mt-3">
    <b-row>
    <b-col sm="12">
       <b-card border-variant="dark" header="ความเป็นมาและความสำคัญของปัญหา" >
        <b-card-text>{{formdata.research_history}}</b-card-text>
      </b-card>
    </b-col>

  </b-row>
  </div>

  <div class="mt-3">
    <b-row>
    <b-col sm="12">
       <b-card border-variant="dark" header="จุดประสงค์" >
        <b-card-text>{{formdata.research_goal}}</b-card-text>
      </b-card>
    </b-col>

  </b-row>
  </div>

  <div class="mt-3">
    <b-row>
    <b-col sm="12">
       <b-card border-variant="dark" header="ประชากร/กลุ่มตัวอย่าง" >
        <b-card-text>{{formdata.research_tester}}</b-card-text>
      </b-card>
    </b-col>

  </b-row>
  </div>

  <div class="mt-3">
    <b-row>
    <b-col sm="12">
       <b-card border-variant="dark" header="นวัติกรรม/เครื่องมือ" >
        <b-card-text>{{formdata.research_tool}}</b-card-text>
      </b-card>
    </b-col>

  </b-row>
  </div>

  <div class="mt-3">
    <b-row>
    <b-col sm="12">
       <b-card border-variant="dark" header="วิธิดำเนินการ" >
        <b-card-text>{{formdata.research_how}}</b-card-text>
      </b-card>
    </b-col>

  </b-row>
  </div>

  <div class="mt-3">
    <b-row>
    <b-col sm="12">
       <b-card border-variant="dark" header="ผลการวิจัย" >
        <b-card-text>{{formdata.research_result}}</b-card-text>
      </b-card>
    </b-col>

  </b-row>
  </div>

  <div class="mt-3">
    <b-row>
    <b-col sm="12">
       <b-card border-variant="dark" header="บทคัดย่อ" >
        <b-card-text>{{formdata.research_abstract}} <p class="margin-five"><b>คำสำคัญ:</b> {{formdata.research_abstract_thai_keyword}}</p></b-card-text>
      </b-card>
    </b-col>

  </b-row>
  </div>

  <div class="mt-3">
    <b-row>
    <b-col sm="12">
       <b-card border-variant="dark" header="Abstract" >
        <b-card-text>{{formdata.research_abstract_eng}} <p class="margin-five"><b>Keyword:</b> {{formdata.research_abstract_eng_keyword}}</p></b-card-text>
      </b-card>
    </b-col>

  </b-row>
  </div>

      </b-container>
    </div>
</template>

<script>
import Researchapi from '@/services/Research'
export default {
  name: 'Researchview',
  data () {
    return {
      formdata: {
        research_head: '',
        research_history: '',
        research_goal: '',
        research_tester: '',
        research_tool: '',
        research_how: '',
        research_result: '',
        research_abstract: '',
        research_focus_id: '',
        research_abstract_thai_keyword: null,
        research_abstract_eng: null,
        research_abstract_eng_keyword: null
      }
    }
  },
  methods: {
    fectResearchview () {
      Researchapi.Getresearchdataview({research_id: this.$route.params.researchid})
        .then(res => {
          if (res.data) {
            this.formdata.research_head = res.data[0].research_head
            this.formdata.research_history = res.data[0].research_history
            this.formdata.research_goal = res.data[0].research_goal
            this.formdata.research_tester = res.data[0].research_tester
            this.formdata.research_tool = res.data[0].research_tool
            this.formdata.research_how = res.data[0].research_how
            this.formdata.research_result = res.data[0].research_result
            this.formdata.research_abstract = res.data[0].research_abstract
            this.formdata.research_focus_id = res.data[0].research_focus_id
            this.formdata.research_abstract_thai_keyword = res.data[0].research_abstract_thai_keyword
            this.formdata.research_abstract_eng = res.data[0].research_abstract_eng
            this.formdata.research_abstract_eng_keyword = res.data[0].research_abstract_eng_keyword
          }
        })
    }
  },
  mounted() {
    this.fectResearchview()
  }
}
</script>

<style>
    .margin-five{
      margin-top:5%;
    }
</style>
