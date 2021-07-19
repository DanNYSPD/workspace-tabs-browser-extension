<template>
  <div>
    <h2>workspace:</h2>
    <table class="table table-sm table-bordered">
      <thead>
        <tr></tr>
      </thead>
      <tbody v-if="workspace">
        <tr v-for="v in workspace.tabs" :key="v">
          <!-- <input type="checkbox" v-model="v.selected">
        <a :href="v.url">{{v.url}}</a> -->
          <Url :url="v" />


          <td>
            <b-button variant="danger" @click="remove(v)">
              <i class="fas fa-trash-alt"></i>
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
    debugger;
    this.workspace = workspaceService.getWorkspaceDetail(this.workspaceName);
    if (!this.workspace) console.log(`Workspace not found ${this.workspaceName}`);
  },
  methods: {
    async remove(tab) {
      this.workspace = await workspaceService.removeFromWorkspace(this.workspaceName, tab);
    },
  },
  watch: {
    workspaceName(newVal) {
      this.workspace = workspaceService.getWorkspaceDetail(newVal.name);
      if (!this.workspace) console.log('Workspace not found');
    },
  },
};
</script>
