import $ from 'jquery';

function ArticleService($http) {
  return {
    createArticle(params,categoryId,  isCrypt) {
      return $http({
        method: 'POST',
        url: `categories/${categoryId}/articles`,
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
        url: `worlds/${world_id}/articles`
      });
    },

    getArticlesByCategory(categoryId) {
      return $http({
        method: 'GET',
        url: `categories/${categoryId}/articles`
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

ArticleService.$inject = ['$http'];

export default ArticleService;
