import $ from 'jquery';

function ArticleService($http) {
  return {
    createArticle(params) {
      return $http({
        method: 'POST',
        url: 'articles/',
        data: $.param(params)
      });
    },

    updateArticle(articleId, params) {
      return $http({
        method: 'PUT',
        url: `articles/${articleId}/`,
        data: params
      });
    },

    deleteArticle(articleId) {
      return $http({
        method: 'DELETE',
        url: `articles/${articleId}/`
      });
    },

    getArticle(articleId) {
      return $http({
        method: 'GET',
        url: `articles/${articleId}`
      });
    },

    getAllArticles(world_id) {
      return $http({
        method: 'POST',
        url: 'articles/all',
        data: $.param({ world_id })
      });
    },

    getArticlesByCategory(categoryId) {
      return $http({
        method: 'GET',
        url: `articles/category/${categoryId}`
      });
    },

    addArticleToCategory(params) {
      return $http({
        method: 'POST',
        url: 'articles/add_category',
        data: $.param(params)
      });
    }
  }
}

ArticleService.$inject = ['$http'];

export default ArticleService;
