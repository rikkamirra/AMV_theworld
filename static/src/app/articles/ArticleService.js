import $ from 'jquery';

function ArticleService($http, CryptoService) {
  return {
    createArticle(params, isCrypt) {
      return $http({
        method: 'POST',
        url: 'articles/',
        crypt: isCrypt,
        data: params
      });
    },

    updateArticle(articleId, params, isCrypt) {
      return $http({
        method: 'PUT',
        url: `articles/${articleId}/`,
        crypt: isCrypt,
        data: params
      });
    },

    deleteArticle(articleId) {
      return $http({
        method: 'DELETE',
        url: `articles/${articleId}/`
      });
    },

    getArticle(articleId, isCrypt) {
      return $http({
        method: 'GET',
        url: `articles/${articleId}`,
        crypt: isCrypt
      });
    },

    getArticlesByWorld(world_id) {
      return $http({
        method: 'GET',
        url: `articles_by_world/${world_id}`
      });
    },

    getArticlesByCategory(categoryId) {
      return $http({
        method: 'GET',
        url: `articles_by_category/${categoryId}`
      });
    },

    addArticleToCategory(params) {
      return $http({
        method: 'POST',
        url: 'articles/add_category',
        data: params
      });
    }
  }
}

ArticleService.$inject = ['$http', 'CryptoService'];

export default ArticleService;
