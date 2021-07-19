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
          {{w.tabs.length}} pages

        </b-card-text>


        <router-link class="btn btn-info" :to="{name:'workspace',params:{workspaceName:w.name}}"
        v-b-tooltip.hover title="Go to workspace(see url's saved)"
        >
              <font-awesome-icon icon="eye" />

        </router-link>
        <button class="btn btn-primary" @click="openWorkspace(w)"
        v-b-tooltip.hover title="Open workspace (open tab in a new windows)"
        >
          <font-awesome-icon icon="folder-open" />

        </button>
        <button class="btn btn-danger" @click="openWorkspace(w)">
           <font-awesome-icon icon="trash" />
        </button>
      </b-card>
    </div>
    </div>
  </div>
</template>
<script>
import Toastify from 'toastify-js'

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
  methods: {
      openWorkspace(workspace){


        // for(let i=0;i<workspace.tabs.length;i++){
        //   console.log("terando"+workspace.tabs[i].url)
        //     let creating = browser.tabs.create({
        //     url:workspace.tabs[i].url,
        //     active:false,
        //   });
        // }
        const urls=workspace.tabs.map(x=>x.url);
        const creating=browser.windows.create({
          url:urls
        })
        creating.then(()=>{
          Toastify({
          text: "Workspace opened",
          backgroundColor: "linear-gradient(to right, #00b09b, #96c93d)",
          className: "info",
        }).showToast();

        },
        ()=>{

        })
    }
  },
};
</script>
