import homeConfig from './homeConfig';
import UserService from './UserService';
import LoginController from './LoginController';
import twHome from './twHome/twHome';
import loginForm from './loginForm/loginForm';

const MODULE_NAME = 'TWApp.HomeApp';

angular.module(MODULE_NAME, [])
  .config(homeConfig)
  .factory('UserService', UserService)

  .controller('LoginController', LoginController)

  .component('twHome', twHome)
  .component('loginForm', loginForm);


export default MODULE_NAME;
