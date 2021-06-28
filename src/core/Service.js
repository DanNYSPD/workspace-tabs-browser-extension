const workspaceService = {
  getWorkspaces() {
    /*
    return [
      { name: 'job', created_at: new Date().toISOString(), description: '' },
      { name: 'project 1', created_at: new Date().toISOString(), description: '' },
      { name: 'project B', created_at: new Date().toISOString(), description: '' },
    ];
    */
    const workspaceNames = JSON.parse(localStorage.getItem('workspaces_tabs_name'));
    if (!workspaceNames) {
      return [];
    }
    const workspaces = [];
    workspaceNames.forEach((w) => {
      const worspace = this.getWorkspaceDetail(w);
      if (worspace) workspaces.push(worspace);
    });

    return workspaces;
  },
  /**
   *
   * @param {String} workspaceId
   */
  getWorkspaceDetail(workspaceId) {
    let worskpaceObject = localStorage.getItem(workspaceId);
    if (worskpaceObject) {
      worskpaceObject = JSON.parse(worskpaceObject);
    }

    return worskpaceObject;
  },
  async addWorkspaceName(workspaceName, tabs) {
    if (!workspaceName) {
      throw new Error(`Invalid workspace name`);
    }
    if (localStorage.getItem(workspaceName)) {
      throw new Error(`Workspace ${workspaceName} already exist! `);
    }
    if (!tabs || tabs.length == 0) {
      throw new Error(`No tabs selected`);
    }

    localStorage.setItem(
      workspaceName,
      JSON.stringify({
        tabs,
        title: workspaceName,
        name: workspaceName,
        created_at: new Date().toISOString(),
        description: '',
      })
    );

    // get and if exist update.
    let workspaces = [];
    if (localStorage.getItem('workspaces_tabs_name')) {
      workspaces = JSON.parse(localStorage.getItem('workspaces_tabs_name'));
    }
    workspaces.push(workspaceName);
    localStorage.setItem('workspaces_tabs_name', JSON.stringify(workspaces));
    return workspaceName;
  },
  async removeFromWorkspace(workspaceName, tab) {
    const workspace = this.getWorkspaceDetail(workspaceName);
    workspace.tabs = workspace.tabs.filter((t) => t.url !== tab.url);
    localStorage.setItem(workspaceName, JSON.stringify(workspace));
    return workspace;
  },
};

export default workspaceService;

export { workspaceService };
