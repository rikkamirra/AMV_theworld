import paintMap from './paintMap/paintMap';

const MODULE_NAME = 'TWApp.Painter';

angular.module(MODULE_NAME, [])
.component('paintMap', paintMap);

export default MODULE_NAME
