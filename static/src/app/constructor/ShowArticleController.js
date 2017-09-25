function ShowArticleController(article) {
  this.article = article;
  this.category = article.categories[0];
  this.world = article.world;
};

ShowArticleController.$inject = ['article'];

export default ShowArticleController;
