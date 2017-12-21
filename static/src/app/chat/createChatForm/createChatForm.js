const createChatForm = {
  restrict: 'E',
  template: require('./createChatForm.html'),
  bindings: {
    resolve: '<',
    close: '&',
    dismiss: '&'
  },
  controller: CreateChatFormController
};

function CreateChatFormController(UserService, ChatService) {
  this.$onInit = () => {
    this.chat = {
      name: '',
      is_public: false
    };
  };

  this.createChat = () => {
    ChatService.createChat(this.chat).then(res => this.close({$value: res.data}));
  }
}

CreateChatFormController.$inject = ['UserService', 'ChatService'];

export default createChatForm;
