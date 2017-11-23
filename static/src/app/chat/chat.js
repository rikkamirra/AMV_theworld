import chatConfig from './chatConfig';

import ChatService from './ChatService';

import ChatController from './ChatController';

import chatItem from './chatItem/chatItem';
import chatComponent from './chatComponent/chatComponent';
import createChatForm from './createChatForm/createChatForm';


const MODULE_NAME = 'TWApp.ChatApp';

angular.module(MODULE_NAME, [])
  .config(chatConfig)

  .factory('ChatService', ChatService)

  .controller('ChatController', ChatController)

  .component('chatItem', chatItem)
  .component('chatComponent', chatComponent)
  .component('createChatForm', createChatForm);


export default MODULE_NAME;
