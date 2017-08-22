import accountConfig from './accountConfig';

import userAccount from './userAccount/userAccount';

const MODULE_NAME = 'TWApp.AccountApp';

angular.module(MODULE_NAME, [])
.config(accountConfig)

.component('userAccount', userAccount);

export default MODULE_NAME;
