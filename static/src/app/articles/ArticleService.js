import $ from 'jquery';

function ArticleService($http) {
  return {
    createArticle(params) {
      $http({
        method: 'POST',
        url: 'articles/new',
        data: $.param(params)
      });
    },

    updateArticle(articleId, params) {
      return $http({
        method: 'POST',
        url: `articles/${articleId}/edit`,
        data: $.param(params)
      });
    },

    deleteArticle(articleId) {
      return $http({
        method: 'DELETE',
        url: `articles/${articleId}/delete`
      });
    },

    getArticlesByCategory(categoryId) {
      return $http({
        method: 'GET',
        url: `articles/category/${categoryId}`
      });
    }
  }
}

ArticleService.$inject = ['$http'];

export default ArticleService;
