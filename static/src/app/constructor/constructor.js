import constructorConfig from './constructorConfig';
import ConstructService from './ConstructService';

import ConstructController from './ConstructController';

import worldManager from './worldManager/worldManager';
import categoryItem from './categoryItem/categoryItem';

const MODULE_NAME = 'TWApp.Constructor';

angular.module(MODULE_NAME, [])
.config(constructorConfig)
.factory('ConstructService', ConstructService)

.controller('ConstructController', ConstructController)

.component('worldManager', worldManager)
.component('categoryItem', categoryItem);

export default MODULE_NAME;
