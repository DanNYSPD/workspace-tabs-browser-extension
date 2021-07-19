<template>
  <td>
    <input type="checkbox" v-model="url.selected" />
    <a :href="url.url"
    v-b-tooltip.hover :title="url.url"
    >

      <span v-if="url.title">{{ url.title }} </span>
      <span v-else>
        {{url.url|host}}
      </span>
    </a>
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
  data() {
    return {};
  },
  mounted() {
    this.getPage().then();
    console.log(this.url.url);
  },
  methods: {
    async getPage() {
      const page = await Axios.get(this.url.url);
      //console.log(page.data);
      const matches = page.data.match(/<title>(.*?)<\/title>/);
      if (matches && matches.length > 0) {
        this.url.title = matches[1];
      }
      //console.log(this.url.title);
      //console.log(matches);

      page.data.match(/favicon/);
    },
  },
};
</script>
