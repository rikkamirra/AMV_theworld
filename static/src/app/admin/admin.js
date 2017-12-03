import adminConfig from './adminConfig';
import AdminController from './AdminController';
import AdminService from './AdminService';

const MODULE_NAME = 'TWApp.AdminApp';


angular.module(MODULE_NAME, [])
  .config(adminConfig)

  .factory('AdminService', AdminService)

  .controller('AdminController', AdminController);

export default MODULE_NAME;
