import homeConfig from './homeConfig';
import UserService from './UserService';
import LoginController from './LoginController';
import twHome from './twHome/twHome';
import loginForm from './loginForm/loginForm';
import regForm from './regForm/regForm';

const MODULE_NAME = 'TWApp.HomeApp';

angular.module(MODULE_NAME, [])
  .config(homeConfig)
  .factory('UserService', UserService)

  .controller('LoginController', LoginController)

  .component('twHome', twHome)
  .component('loginForm', loginForm)
  .component('regForm', regForm);


export default MODULE_NAME;
