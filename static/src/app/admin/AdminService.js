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

    update(instanceName, instanceId, newData) {
      return $http({
        method: 'PUT',
        url: `${getAdminUrl(instanceName)}/${instanceId}`,
        data: newData
      });
    },

    remove(instanceName, instanceId) {
      return $http({
        method: 'DELETE',
        url: `${getAdminUrl(instanceName)}/${instanceId}`
      });
    },

    getType(value) {
      if (this.isArray(value)) return 'list';
      if (this.isDict(value)) return 'dict';
      if (this.isLink(value)) return 'link';
      if (this.isLongString(value)) return 'long_string';
      if (this.isString(value)) return 'string';
      if (this.isNumber(value)) return 'number';
      if (this.isDate(value)) return 'date';
      if (this.isBoolean(value)) return 'boolean';
      return 'value';
    },

    isDict(value) {
      return typeof value === "object" && value != null && !this.isArray(value);
    },

    isArray(value) {
      return Array.isArray(value);
    },

    isString(value) {
      return typeof value === 'string' && !this.isDate(value);
    },

    isLongString(value) {
      return this.isString(value) && value.length > 100;
    },

    isDate(value) {
      return !isNaN(Date.parse(value)) && !Number.isInteger(value);
    },

    isLink(value) {
      if (!this.isString(value)) return false;
      const linkRegExp = /^https?:\/\/./;
      return linkRegExp.test(value);
    },

    isNumber(value) {
      return Number.isInteger(value);
    },

    isBoolean(value) {
      return typeof value == typeof true;
    }
  }
}

AdminService.$inject = ['$http'];

export default AdminService;
