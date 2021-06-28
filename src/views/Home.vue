<template>
  <div class="home">
    <Workspaces :workspaces="workspaces" />
    <HelloWorld msg="Welcome to Your Vue.js App" />
  </div>
</template>

<script>
// @ is an alias to /src
import HelloWorld from '@/components/HelloWorld.vue';
import Workspaces from '@/components/Workspaces.vue';
import getWorkspaces from '../core/Service';

export default {
  name: 'Home',
  components: {
    HelloWorld,
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
