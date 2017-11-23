function chatConfig($stateProvider) {
  $stateProvider.state('chat', {
    url: '/chat/:roomName',
    params: {
      roomName: ''
    },
    template: '<chat-component messages="ctrl.messages" room-name="ctrl.roomName"></chat-component>',
    controller: 'ChatController as ctrl',
    resolve: {
      messages: ['ChatService', '$stateParams', (ChatService, $stateParams) => {
        return ChatService.getMessages($stateParams.roomName).then(res => {
          console.log('response', res.data);
          return res.data
        });
      }]
    }
  })
}

chatConfig.$inject = ['$stateProvider'];

export default chatConfig;
