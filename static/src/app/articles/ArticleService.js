import $ from 'jquery';

function ArticleService($http) {
  return {
    createArticle(params, isCrypt) {
      return $http({
        method: 'POST',
        url: `/articles`,
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
        url: '/articles',
        params: {world: world_id}
      });
    },

    getArticlesByCategory(categoryId) {
      return $http({
        method: 'GET',
        url: '/articles',
        params: {category: categoryId}
      });
    },

    addArticleToCategory(params) {
      return $http({
        method: 'POST',
        url: 'articles/add_category',
        data: params
      });
    },

    addComment(params) {
      return $http({
        method: 'POST',
        url: 'comments/',
        data: params
      });
    },

    insertString(position, text, stringToInsert) {
      return text.slice(0, position) + stringToInsert + text.slice(position);
    }
  }
}

ArticleService.$inject = ['$http'];

export default ArticleService;
