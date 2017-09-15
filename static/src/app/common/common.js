import ModalService from './ModalService';

import twForm from './TwForm/twForm';
import cloudUpload from './cloudUpload/cloudUpload';
import addPicture from './addPicture/addPicture';

const MODULE_NAME = 'TWApp.Common';

angular.module(MODULE_NAME, [])
.factory('ModalService', ModalService)

.component('cloudUpload', cloudUpload)
.component('addPicture', addPicture);

export default MODULE_NAME;
