<template>
  <div class="input tags-wrap">
    <div v-for="(item,index) in disSource" :style="{backgroundColor: bgc[item.bgc_no]}" :key="index" class="tags" transition="tags">
      <span class="content">{{ item.text }}</span><span class="del-icon" @click="del(index, false)">&times;</span>
    </div>
    <input :placeholder="placeholder" v-model="text" class="tags-input" type="text" @keyup.enter="add(text)" @keydown.delete="del(value.length - 1, true)">
  </div>
</template>
<script>
export default {
  props: {
    value: {
      type: Array,
      default: () => []
    },
    placeholder: {
      type: String,
      default: '标签，按 enter 创建'
    }
  },
  data() {
    const disSource = []
    this.value.forEach((item) => {
      const obj = {
        text: item,
        // bgc_no: Math.ceil(Math.random() * 10) - 1,
        bgc_no: 0
      }
      disSource.push(obj)
    })
    return {
      text: '',
      bgc: ['#75A4B9', '#3A9BFC', '#ed664b', '#7b6ac7', '#56abd1', '#f7af4c', '#fe5467', '#52c7bd', '#a479b7', '#cb81ce', '#5eabc5'],
      disSource: disSource
    }
  },
  methods: {
    add(text) {
      if (text !== '') {
        this.value.push(text)
        this.disSource.push({
          text: text,
          // bgc_no: Math.ceil(Math.random() * 10) - 1,
          bgc_no: 0
        })
        this.text = ''
      }
    },
    del(index, way) {
      if (way) {
        if (index >= 0 && this.text === '') {
          this.value.splice(index, 1)
          this.disSource.splice(index, 1)
        }
      } else {
        this.value.splice(index, 1)
        this.disSource.splice(index, 1)
      }
    }
  }
}
</script>
<style scoped>
/* 输入框tags */
.tags-wrap{
  width: 100%;
  height: 100%;
  outline: none;
  border: 1px solid #dddee1;
  padding: 0 3px;
  border-radius: 5px;
}
.tags-wrap::after{
  content: "";
  display: block;
  height: 0;
  clear: both;
}
.tags, .tags-input{
  position: relative;
  float: left;
  color: #fff;
  line-height: 24px;
  margin: 2px;
  padding: 0 22px 0 10px;
  border-radius: 6px;
}
.tags .content{
  line-height: 20px;
}
.tags .del-icon{
  width: 22px;
  height: 20px;
  font-weight: 600;
  text-align: center;
  cursor: pointer;
  position: absolute;
  top: -1px;
  right: 0;
  color: #c4d9fd;
}
.tags-input{
  font-size: 12px;
  line-height: inherit;
  padding: 0 5px;
  background-color: inherit;
  border: none;
  color: inherit;
  width: 100%;
  outline: 0;
}
.tags-input:hover{
  border-color: #57a3f3;
  outline: 0;
}
</style>
