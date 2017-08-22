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
import ConstructorApp from './constructor/constructor';

angular.module('TWApp', [
  'ui.router',
  'ngCookies',
  HomeApp,
  CommonApp,
  AccountApp,
  ConstructorApp
])
.config(AppConfig)
.run(AppRun)
.controller('RootController', RootController);
