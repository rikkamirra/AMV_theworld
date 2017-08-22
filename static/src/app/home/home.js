import homeConfig from './homeConfig';
import UserService from './UserService';
import LoginController from './LoginController';
import twHome from './twHome/twHome';
import twLoginForm from './twLoginForm/twLoginForm';
import regForm from './regForm/regForm';

const MODULE_NAME = 'TWApp.HomeApp';

angular.module(MODULE_NAME, [])
  .config(homeConfig)
  .factory('UserService', UserService)

  .controller('LoginController', LoginController)

  .component('twHome', twHome)
  .component('twLoginForm', twLoginForm)
  .component('regForm', regForm);


export default MODULE_NAME;
