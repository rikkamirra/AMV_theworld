import angular from 'angular';
import 'angular-ui-router';
import 'angular-cookies';
import 'jquery';

import AppConfig from './shared/AppConfig';
import AppRun from './shared/AppRun';
import RootController from './shared/RootController';

import HomeApp from './home/home';
import CommonApp from './common/common';
import AccountApp from './account/account';

angular.module('TWApp', [
  'ui.router',
  'ngCookies',
  HomeApp,
  CommonApp,
  AccountApp
])
.config(AppConfig)
.run(AppRun)
.controller('RootController', RootController);
