const imgItem = {
  restrict: 'E',
  template: require('./imgItem.html'),
  bindings: {
    image: '<'
  },
  controller: ImgItemController
};

function ImgItemController() {

}

ImgItemController.$inject = [];

export default imgItem;
