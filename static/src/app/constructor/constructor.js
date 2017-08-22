import constructorConfig from './constructorConfig';
import ConstructService from './ConstructService';

const MODULE_NAME = 'TWApp.Constructor';

angular.module(MODULE_NAME, [])
.config(constructorConfig)
.factory('ConstructService', ConstructService);

export default MODULE_NAME;
