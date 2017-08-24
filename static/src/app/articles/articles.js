import articleConfig from './articleConfig';
import ArticleService from './ArticleService';
import ArticleController from './ArticleController';
import CreateArticleController from './CreateArticleController';
import articleManager from './articleManager/articleManager';

const MODULE_NAME = 'TWApp.ArticleApp';

angular.module(MODULE_NAME, [])
.config(articleConfig)
.factory('ArticleService', ArticleService)

.controller('ArticleController', ArticleController)
.controller('CreateArticleController', CreateArticleController)

.component('articleManager', articleManager);

export default MODULE_NAME;
