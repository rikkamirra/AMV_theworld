const imgItem = {
  restrict: 'E',
  template: require('./imgItem.html'),
  bindings: {
    image: '<'
  },
  controller: ImgItemController
};

function ImgItemController($state) {
  this.goTo = (relationship) => {
    $state.go('showArticle', {articleId: relationship.instance_id});
  }
}

ImgItemController.$inject = ['$state'];

export default imgItem;
