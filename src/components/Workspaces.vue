<template>
  <div class="row">
    <div >

    <div>
      <b-card
       v-for="w in workspaces"
      :title="w.name" class="mb-2"
              header-bg-variant="primary"

      >
        <b-card-text>
         {{w.description}}
        </b-card-text>


        <router-link class="btn btn-primary" :to="{name:'workspace',params:{workspaceName:w.name}}" >See pages </router-link>
      </b-card>
    </div>
    </div>
  </div>
</template>
<script>
export default {
  props:{
    workspaces:{
      type:Array,
      default:function() {
        return []
      },
    }
  },
  data() {
    return {};
  },
  mounted() {},
  methods: {},
};
</script>
