import adminConfig from './adminConfig';
import AdminController from './AdminController';
import AdminWordlsController from './AdminWorldsController';
import AdminService from './AdminService';

import adminDashboard from './adminDashboard/adminDashboard';
import adminForm from './adminForm/adminForm';
import adminTable from './adminTable/adminTable';
import adminInstanceView from './adminInstanceView/adminInstanceView';

const MODULE_NAME = 'TWApp.AdminApp';


angular.module(MODULE_NAME, [])
  .config(adminConfig)

  .factory('AdminService', AdminService)

  .component('adminDashboard', adminDashboard)
  .component('adminForm', adminForm)
  .component('adminTable', adminTable)
  .component('adminInstanceView', adminInstanceView)

  .controller('AdminController', AdminController)
  .controller('AdminWorldsController', AdminWordlsController);

export default MODULE_NAME;
