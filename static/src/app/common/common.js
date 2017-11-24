import ModalService from './ModalService';
import CryptoService from './CryptoService';

import twForm from './TwForm/twForm';
import cloudUpload from './cloudUpload/cloudUpload';
import addPicture from './addPicture/addPicture';
import imgItem from './imgItem/imgItem';
import enterKey from './enterKey/enterKey';

const MODULE_NAME = 'TWApp.Common';

angular.module(MODULE_NAME, [])
.factory('ModalService', ModalService)
.factory('CryptoService', CryptoService)

.component('cloudUpload', cloudUpload)
.component('addPicture', addPicture)
.component('imgItem', imgItem)
.component('enterKey', enterKey)

.filter('myDate', () => {
  return (input) => {
    const date = new Date(input);
    const months = {
      0: 'января',
      1: 'февраля',
      2: 'марта',
      3: 'апреля',
      4: 'мая',
      5: 'июня',
      6: 'июля',
      7: 'августа',
      8: 'сентября',
      9: 'октября',
      10: 'ноября',
      11: 'декабря'
    };

    var showTimeFormat = (date) => {
      let hours = date.getHours() < 10 ? `0${date.getHours()}` : `${date.getHours()}`;
      let minutes = date.getMinutes() < 10 ? `0${date.getMinutes()}` : `${date.getMinutes()}`;
      return `${hours}:${minutes}`;
    }
    return `${date.getDate()} ${months[date.getMonth()]} ${date.getFullYear()}  ${showTimeFormat(date)}`;
  }
});

export default MODULE_NAME;
