import $ from 'jquery';

function ConstructService($http, UserService) {
  return {
    createWorld(title) {
      return $http({
        method: 'POST',
        url: 'worlds/',
        data: $.param({ title })
      });
    },

    createCategory(params) {
      return $http({
        method: 'POST',
        url: 'worlds/categories/',
        data: $.param(params)
      });
    },

    getWorld(world_id) {
      return $http({
        method: 'GET',
        url: `worlds/${world_id}`
      });
    }
  }
}

ConstructService.$inject = ['$http', 'UserService'];

export default ConstructService;
