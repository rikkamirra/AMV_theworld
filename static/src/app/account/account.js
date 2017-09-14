import accountConfig from './accountConfig';
import AccountController from './AccountController';

import userAccount from './userAccount/userAccount';

const MODULE_NAME = 'TWApp.AccountApp';

angular.module(MODULE_NAME, [])
.config(accountConfig)

.controller('AccountController', AccountController)

.component('userAccount', userAccount);

export default MODULE_NAME;
