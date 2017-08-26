import twForm from './TwForm/twForm';
import cloudUpload from './cloudUpload/cloudUpload';

const MODULE_NAME = 'TWApp.Common';

angular.module(MODULE_NAME, [])
.component('cloudUpload', cloudUpload);

export default MODULE_NAME;
