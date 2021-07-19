<template>
  <div class="home">
    <Workspaces :workspaces="workspaces" />
    <welcome msg="Welcome to Your Vue.js App" />
  </div>
</template>

<script>
// @ is an alias to /src
import welcome from '@/components/welcome.vue';
import Workspaces from '@/components/Workspaces.vue';
import getWorkspaces from '../core/Service';

export default {
  name: 'Home',
  components: {
    welcome,
    Workspaces,
  },
  data() {
    return {
      workspaces: [],
    };
  },
  mounted() {
    console.log('mounted');
    this.workspaces = this.getWorkspaces();
    console.log(this.workspaces);
  },
  methods: {
    ...getWorkspaces,
  },
};
</script>
