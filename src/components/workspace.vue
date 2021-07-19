<template>
  <div>
     <router-link to="/">Go Back</router-link>
    <h3>You are in workspace: {{workspace.name}}</h3>
    <table class="table table-sm table-bordered">
      <thead>
        <tr></tr>
      </thead>
      <tbody v-if="workspace">
        <tr v-for="v in workspace.tabs" :key="v">
          <!-- <input type="checkbox" v-model="v.selected">
        <a :href="v.url">{{v.url}}</a> -->
          <Url :url="v"
                @click="openHere(v)"
           />


          <td>
            <b-button variant="danger" size="sm" @click="remove(v)"
              v-b-tooltip.hover title="Remove this from workspace">
              <font-awesome-icon icon="trash" />
            </b-button>
            <b-button variant="info" size="sm" @click="openHere(v)"
              v-b-tooltip.hover title="open here">
              <font-awesome-icon icon="link" />
            </b-button>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>
<script>
import { workspaceService } from '../core/Service';

export default {
  data() {
    return {
      workspace: null,
    };
  },
  props: {
    workspaceName: {
      type: String,
      default: undefined,
    },
  },
  mounted() {
    console.log('Mounted');
    this.workspace = workspaceService.getWorkspaceDetail(this.workspaceName);
    if (!this.workspace) console.log(`Workspace not found ${this.workspaceName}`);
  },
  methods: {
    async remove(tab) {
      this.workspace = await workspaceService.removeFromWorkspace(this.workspaceName, tab);
    },
    openHere(tab){
      console.log(tab)
      browser.tabs.create({
        url:tab.url
      })
    }
  },
  watch: {
    workspaceName(newVal) {
      this.workspace = workspaceService.getWorkspaceDetail(newVal.name);
      if (!this.workspace) console.log('Workspace not found');
    },
  },
};
</script>
