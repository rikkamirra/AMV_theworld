import ModalService from './ModalService';
import CryptoService from './CryptoService';

import twForm from './TwForm/twForm';
import cloudUpload from './cloudUpload/cloudUpload';
import addPicture from './addPicture/addPicture';
import imgItem from './imgItem/imgItem';
import enterKey from './enterKey/enterKey';

const MODULE_NAME = 'TWApp.Common';

angular.module(MODULE_NAME, [])
.factory('ModalService', ModalService)
.factory('CryptoService', CryptoService)

.component('cloudUpload', cloudUpload)
.component('addPicture', addPicture)
.component('imgItem', imgItem)
.component('enterKey', enterKey);

export default MODULE_NAME;
