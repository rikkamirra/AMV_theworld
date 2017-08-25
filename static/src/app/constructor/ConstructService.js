import $ from 'jquery';

function ConstructService($http, UserService) {
  return {
    createWorld(title) {
      return $http({
        method: 'POST',
        url: 'worlds/new',
        data: $.param({ title })
      });
    },

    getAllWorlds() {
      return $http({
        method: 'GET',
        url: 'worlds/all'
      });
    },

    createCategory(params) {
      return $http({
        method: 'POST',
        url: 'categories/new',
        data: $.param(params)
      });
    },

    deleteCategory(categoryId) {
      return $http({
        method: 'DELETE',
        url: `categories/${categoryId}/delete`,
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
        url: `categories/${categoryId}`
      });
    },

    getChildren(parentId) {
      return $http({
        method: 'GET',
        url: `categories/${parentId}/children`
      });
    }
  }
}

ConstructService.$inject = ['$http', 'UserService'];

export default ConstructService;
