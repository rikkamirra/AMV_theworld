import $ from 'jquery';

function ArticleService($http) {
  return {
    createArticle(params) {
      return $http({
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

    getAllArticles() {
      return $http({
        method: 'GET',
        url: 'articles/all'
      });
    },

    getArticlesByCategory(categoryId) {
      return $http({
        method: 'GET',
        url: `articles/category/${categoryId}`
      });
    },

    addCategoryToArticle(params) {
      return $http({
        method: 'POST',
        url: 'articles/add_category',
        data: $.param({ params })
      });
    }
  }
}

ArticleService.$inject = ['$http'];

export default ArticleService;
