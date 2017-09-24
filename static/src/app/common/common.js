import ModalService from './ModalService';

import twForm from './TwForm/twForm';
import cloudUpload from './cloudUpload/cloudUpload';
import addPicture from './addPicture/addPicture';
import imgItem from './imgItem/imgItem';

const MODULE_NAME = 'TWApp.Common';

angular.module(MODULE_NAME, [])
.factory('ModalService', ModalService)

.component('cloudUpload', cloudUpload)
.component('addPicture', addPicture)
.component('imgItem', imgItem);

export default MODULE_NAME;
