<template>
  <div>

    <p>no</p>



    <div class="form-group">
      <label for="">Workspace:</label>
      <b-form-select
        v-model="selectedWorkspace"
        :options="workspaces"
      ></b-form-select>
    </div>

    <h3>Tabs opened in current window</h3>
    <input type="text" class="form-control" v-model="workspaceName" placeholder="Write here the workspace name" />

    <div class="row">
      <button class="btn btn-success col-sm-6 col-md-4" @click="createWorkSpaceWithSelectedUrl"
        v-b-tooltip.hover title="Create Workspace with selected tabs">
        <font-awesome-icon icon="save" />

      </button>
      <button class="btn btn-warning col-sm-6 col-md-4" @click="createWorkSpaceWithSelectedUrl"
        v-b-tooltip.hover title="Create Workspace with selected tabs and close">
        <font-awesome-icon icon="save" />

      </button>
      <button class="btn btn-info col-sm-6 col-md-4" @click="selectAll(true)"
        v-b-tooltip.hover title="Select all">
        <font-awesome-icon icon="check-square" />
      </button>
      <button class="btn btn-secundary col-sm-6 col-md-4" @click="selectAll(false)"
        v-b-tooltip.hover title="Unselect all">


      <font-awesome-icon icon="square" />

      </button>
    </div>
  <b-card>
    <table class="table table-sm">
      <thead>
        <tr></tr>
      </thead>
      <tbody>
        <tr v-for="v in datos" :key="v.url">
          <!-- <input type="checkbox" v-model="v.selected">
        <a :href="v.url">{{v.url}}</a> -->
          <Url :url="v" />
          <td>
            <b-button variant="danger" size="sm"
            v-b-tooltip.hover title="close this tab"
            @click="closeTab(v)"
            >
            <font-awesome-icon icon="window-close" />
            </b-button>
          </td>
        </tr>
      </tbody>
    </table>
    </b-card>
    <div></div>
  </div>
</template>

<script>
import workspaceService from '../core/Service';
import Toastify from 'toastify-js'

export default {
  components: {},
  name: 'welcome',
  data() {
    return {
      datos: [],
      workspaces: [],
      selectedWorkspace: {},
      workspaceName: '',
    };
  },
  mounted() {
    this.workspaces.push({ value: 'currentWindow', text: 'Current Window' });
    browser.runtime.sendMessage({});
    this.getTabs().then(() => console.log('done'));

    this.workspaces = this.getWorkspaces();
  },
  computed: {
    defaultText() {
      return browser.i18n.getMessage('extName');
    },
  },
  methods: {
    async getTabs() {
      const result = await browser.tabs.query({ currentWindow: true });
      console.log(result);
      result
        .filter((x) => x.url)
        .forEach((tab) => {
          this.datos.push({
            url: tab.url,
            selected: false,
            title: '',
            id:tab.id,
          });
        });
    },
    selectAll(bvalue) {
      this.datos.forEach((x) => {
        x.selected = bvalue;
      });
    },
    createWorkSpaceWithSelectedUrl() {
      const selected = this.datos.filter((x) => x.selected);
      workspaceService
        .addWorkspaceName(this.workspaceName, selected)
        .then(async (workspaceName) => {
          // await this.$bvModal
          //   .msgBoxOk(`Workspace ${workspaceName} was created successfully` , {
          //     title: 'Confirmation',
          //     size: 'sm',
          //     buttonSize: 'sm',
          //     okVariant: 'success',
          //     headerClass: 'p-2 border-bottom-0',
          //     footerClass: 'p-2 border-top-0',
          //     centered: true,
          //   })

            Toastify({
            text: `Workspace  ${workspaceName} created`,
            backgroundColor: "linear-gradient(to right, #00b09b, #96c93d)",
            className: "info",
            }).showToast();
        })
        .catch((error) => {
          debugger
          this.$bvModal.msgBoxOk(error.message, {
            title: 'Confirmation',
            size: 'sm',
            buttonSize: 'sm',
            okVariant: 'danger',
            headerClass: 'p-2 border-bottom-0',
            footerClass: 'p-2 border-top-0',
            centered: true,
          });
        });
    },
    getWorkspaces() {
      return [
        { name: 'job', created_at: new Date().toISOString(), description: '' },
        {
          name: 'project 1',
          created_at: new Date().toISOString(),
          description: '',
        },
        {
          name: 'project B',
          created_at: new Date().toISOString(),
          description: '',
        },
      ];
    },
    closeTab(tab){
      let removing=browser.tabs.remove(
          tab.id
        )

        removing.then(()=>{
             this.datos= this.datos.filter(x=>x.id!=tab.id)
        });
    }
  },
};
</script>

<style scoped>
p {
  font-size: 20px;
}
</style>
