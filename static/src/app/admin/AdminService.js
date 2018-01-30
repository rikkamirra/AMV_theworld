function AdminService($http) {
  const allowedInstances = ['Accounts', 'Articles', 'Worlds', 'Categories', 'Pictures'];

  function getAdminUrl(instanceName) {
    return `admin/${instanceName.toLowerCase()}`;
  }

  return {
    getList(instanceName) {
      return $http({
        method: 'GET',
        url: getAdminUrl(instanceName)
      });
    },

    getInstance(instanceName, instanceId) {
      return $http({
        method: 'GET',
        url: `${getAdminUrl(instanceName)}/${instanceId}`
      })
    },

    create(instanceName, data) {
      return $http({
        method: 'POST',
        url: getAdminUrl(instanceName),
        data: data
      });
    },

    update(instanceName, newData) {
      return $http({
        method: 'PUT',
        url: getAdminUrl(instanceName),
        data: newData
      });
    },

    remove(instanceName, instanceId) {
      return $http({
        method: 'DELETE',
        url: `${getAdminUrl(instanceName)}/${instanceId}`
      });
    }
  }
}

AdminService.$inject = ['$http'];

export default AdminService;
