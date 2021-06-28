<template>
  <td>
    <input type="checkbox" v-model="url.selected" />
    <a :href="url.url">{{ url.title }}</a>
  </td>
</template>
<script>
import Axios from 'axios';
export default {
  props: {
    url: {
      type: Object,
    },
  },
  data: function () {
    return {};
  },
  mounted() {
    this.getPage().then();
  },
  methods: {
    async getPage() {
      const page = await Axios.get(this.url.url);
      //console.log(page.data);
      const matches = page.data.match(/<title>(.*?)<\/title>/);
      if (matches && matches.length > 0) {
        this.url.title = matches[1];
      }
      console.log(this.url.title);
      console.log(matches);

      page.data.match(/favicon/);
    },
  },
};
</script>
