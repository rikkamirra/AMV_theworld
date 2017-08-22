import $ from 'jquery';

function ConstructService($http, UserService) {
  return {
    createWorld(title) {
      return $http({
        method: 'POST',
        url: 'world/',
        data: $.param({ title })
      });
    }
  }
}

ConstructService.$inject = ['$http', 'UserService'];

export default ConstructService;
