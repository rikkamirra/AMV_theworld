const twForm = {
  restrict: 'E',
  template: require('./twForm.html'),
  bindings: {
    fields: '<',
    submit: '&'
  },
  controller: TwFormController
};

function TwFormController(UserService) {
  
}

TwFormController.$inject = ['UserService'];

export default twForm;
