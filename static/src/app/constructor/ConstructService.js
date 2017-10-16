import $ from 'jquery';

function ConstructService($http, UserService) {
  return {
    createWorld(params, config) {
      return $http(Object.assign(config, {
        method: 'POST',
        url: 'worlds/',
        data: Object.assign(params, { author: UserService.getCurrentUser().id })
      }));
    },

    updateWorld(params, config) {
      return $http(Object.assign(config, {
        method: 'PUT',
        url: `worlds/${params.id}`,
        data: params
      }));
    },

    getAllWorlds() {
      return $http({
        method: 'GET',
        url: 'worlds/'
      });
    },

    createCategory(params, config) {
      return $http(Object.assign(config, {
        method: 'POST',
        url: 'worlds/categories/',
        data: params
      }));
    },

    deleteCategory(categoryId) {
      return $http({
        method: 'DELETE',
        url: `worlds/categories/${categoryId}`
      });
    },

    getWorld(world_id) {
      return $http({
        method: 'GET',
        url: `worlds/${world_id}`
      });
    },

    getLocation(categoryId) {
      return $http({
        method: 'GET',
        url: `worlds/categories/${categoryId}`
      });
    },

    getChildren(parentId) {
      return $http({
        method: 'GET',
        url: `worlds/categories/${parentId}/children`
      });
    }
  }
}

ConstructService.$inject = ['$http', 'UserService'];

export default ConstructService;
