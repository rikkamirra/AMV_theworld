function chatConfig($stateProvider) {
  $stateProvider.state('chat', {
    url: '/chat/:roomName',
    params: {
      roomName: ''
    },
    template: '<chat-component chat="ctrl.chat" room-name="ctrl.roomName"></chat-component>',
    controller: 'ChatController as ctrl',
    resolve: {
      chat: ['ChatService', '$stateParams', (ChatService, $stateParams) => {
        return ChatService.getChat($stateParams.roomName).then(res => {
          return res.data
        });
      }]
    }
  })
}

chatConfig.$inject = ['$stateProvider'];

export default chatConfig;
