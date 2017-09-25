function NewArticleController(category, world) {
  this.category = category;
  this.world = world;
};

NewArticleController.$inject = ['category', 'world'];

export default NewArticleController;
