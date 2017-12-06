import angular from 'angular';
import 'angular-ui-router';

import 'angular-ui-bootstrap';
import 'angular-ui-carousel';

import 'angular-cookies';
import 'angular-animate';
import 'ng-file-upload';
import 'cloudinary-angular';
import 'jquery';

import AppConfig from './shared/AppConfig';
import AppRun from './shared/AppRun';
import RootController from './shared/RootController';

import HomeApp from './home/home';
import CommonApp from './common/common';
import AccountApp from './account/account';
import ConstructorApp from './constructor/constructor';
import ArticleApp from './articles/articles';
import ChatApp from './chat/chat';
import AdminApp from './admin/admin';

import Config from './shared/Config';

angular.module('TWApp', [
  'ui.router',
  'ui.bootstrap',
  'ui.carousel',
  'ngAnimate',
  'ngCookies',
  'ngFileUpload',
  'cloudinary',
  HomeApp,
  CommonApp,
  AccountApp,
  ConstructorApp,
  ArticleApp,
  ChatApp,
  AdminApp
])
.config(AppConfig)
.constant('Config', Config)
.run(AppRun)
.controller('RootController', RootController);
