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

    getAllWorlds() {
      return $http({
        method: 'GET',
        url: 'worlds/'
      });
    },

    createCategory(params) {
      return $http({
        method: 'POST',
        url: 'worlds/categories/',
        data: $.param(params)
      });
    },

    deleteCategory(categoryId) {
      return $http({
        method: 'DELETE',
        url: `worlds/categories/${categoryId}`,
        data: { categoryId }
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
        url: `worlds/categories/children/${parentId}`
      });
    }
  }
}

ConstructService.$inject = ['$http', 'UserService'];

export default ConstructService;
