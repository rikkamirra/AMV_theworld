import $ from 'jquery';
import { pick } from 'underscore';

function ConstructService($http, UserService, ArticleService, $q) {
  return {
    createWorld(params, config) {
      return $http(Object.assign(config || {}, {
        method: 'POST',
        url: 'worlds/',
        data: Object.assign(params, { author: UserService.getCurrentUser().id })
      }));
    },

    updateWorld(params, config) {
      return $http(Object.assign(config || {}, {
        method: 'PUT',
        url: `worlds/${params.id}`,
        data: params
      }));
    },

    getAllWorlds() {
      return $http({
        method: 'GET',
        url: 'worlds/'
      });
    },

    getArticles(worldId) {
      return $http({
        method: 'GET',
        url: '/articles',
        params: {
          world: worldId
        }
      });
    },

    updateAllArticles(worldId, isPrivate) {
      return this.getArticles(worldId).then(res => {
        var promises = [];
        res.data.forEach((article) => {
          promises.push(ArticleService.updateArticle(article.id, pick(article, 'title', 'body'), isPrivate))
        });
        return $q.all(promises);
      });
    },

    createCategory(params, config) {
      return $http(Object.assign(config || {}, {
        method: 'POST',
        url: 'worlds/categories/',
        data: params
      }));
    },

    deleteCategory(categoryId) {
      return $http({
        method: 'DELETE',
        url: `worlds/categories/${categoryId}`
      });
    },

    getWorld(world_id) {
      return $http({
        method: 'GET',
        url: `worlds/${world_id}`
      });
    },

    getLocation(categoryId) {
      return $http({
        method: 'GET',
        url: `worlds/categories/${categoryId}`
      });
    },

    getChildren(parentId) {
      return $http({
        method: 'GET',
        url: 'worlds/categories',
        params: {parent: parentId}
      });
    }
  }
}

ConstructService.$inject = ['$http', 'UserService', 'ArticleService', '$q'];

export default ConstructService;
