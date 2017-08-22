function AppRun($state, $cookies, UserService) {
  //UserService.createUser({ email: "test@tset.com", password: "1234", username: 'test' });
  UserService.getCurrentUser();
}

AppRun.$inject = ['$state', '$cookies', 'UserService'];

export default AppRun;
