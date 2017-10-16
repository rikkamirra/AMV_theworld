import constructorConfig from './constructorConfig';
import ConstructService from './ConstructService';

import ConstructController from './ConstructController';
import ShowArticleController from './ShowArticleController';
import NewArticleController from './NewArticleController';

import worldManager from './worldManager/worldManager';
import categoryItem from './categoryItem/categoryItem';
import editWorld from './editWorld/editWorld';

const MODULE_NAME = 'TWApp.Constructor';

angular.module(MODULE_NAME, [])
.config(constructorConfig)
.factory('ConstructService', ConstructService)

.controller('ConstructController', ConstructController)
.controller('ShowArticleController', ShowArticleController)
.controller('NewArticleController', NewArticleController)

.component('worldManager', worldManager)
.component('categoryItem', categoryItem)
.component('editWorld', editWorld);

export default MODULE_NAME;
