import Dexie from 'dexie';

const db = new Dexie('workspaces_tabs');
db.version(1).workspaces({
  tasks: '++id,date,description,done',
});
