(function(){'use strict';angular.module('app',['ngAnimate','ngSanitize','ngAria','ui.router','ui.bootstrap','toastr','ngProgress','ng-showdown','angulartics','angulartics.google.analytics'])})();(function(){'use strict';angular.module('app').service('scroll',function scroll(){var _self=this;_self.getPosition=function(elementId){var e=document.getElementById(elementId);var y=e.offsetTop;var node=e;while(node.offsetParent&&node.offsetParent!==document.body){node=node.offsetParent;y+=node.offsetTop}
return y};_self.getCurrentPosition=function(){if(self.pageYOffset){return self.pageYOffset}
if(document.documentElement&&document.documentElement.scrollTop){return document.documentElement.scrollTop}
if(document.body.scrollTop){return document.body.scrollTop}
return 0};_self.scrollToHash=function(elementId,seconds){_self.scrollTo(_self.getPosition(elementId),seconds)};_self.scrollTo=function(position,seconds){seconds=seconds<=0?1000:seconds*1000;var start=_self.getCurrentPosition();var stop=position;var distance=stop>start?stop-start:start-stop;var frames=25;var frameSeconds=0;var step=distance/frames;for(var i=1;i<=frames;i++){var nextPosition=stop>start?(start+i*step):(start-i*step);window.setTimeout('window.scrollTo(0, '+nextPosition+')',frameSeconds);frameSeconds+=seconds/frames}}})})();(function(){'use strict';angular.module('app').controller('menuScrollController',function menuScrollController($window,$location,$scope,scroll){var _self=this;$scope.menuScrollMenuFixed=!1;_self.clicked=function(hash){scroll.scrollTo(scroll.getPosition(hash)-document.getElementById('menuScroll-element').offsetHeight,0.2);angular.element(document.querySelector('.cd-secondary-nav-trigger')).removeClass('menu-is-open');angular.forEach(document.getElementById('menuScroll-element').querySelectorAll('ul'),function(value){angular.element(value).removeClass('is-visible')})};_self.menu=function(){angular.element(document.querySelector('.cd-secondary-nav-trigger')).toggleClass('menu-is-open');angular.forEach(document.getElementById('menuScroll-element').querySelectorAll('ul'),function(value){angular.element(value).toggleClass('is-visible')})}})})();(function(){'use strict';angular.module('app').directive('menuScroll',function menuScroll($window){return{restrict:'EA',scope:{items:'=list'},controller:'menuScrollController',controllerAs:'controller',templateUrl:'app/packages/menuScroll/menuScroll.html',link:function($scope){var $page=angular.element($window);var menu=angular.element(document.getElementById('menuScroll-element'));var offsetLimit=menu[0].offsetTop-menu[0].offsetHeight;function menuTrigger(){if($window.innerWidth>=500){if($window.pageYOffset>=offsetLimit){$scope.menuScrollMenuFixed=!0;menu.addClass('is-fixed');setTimeout(function(){menu.addClass('animate-children')},50)}else{$scope.menuScrollMenuFixed=!1;menu.removeClass('is-fixed');setTimeout(function(){menu.removeClass('animate-children')},50)}}
angular.forEach(document.querySelectorAll('.cd-section'),function(value){var actual=angular.element(value);angular.forEach(document.querySelectorAll('.cd-anchor'),function(value){var actualAnchor=angular.element(value);if(actualAnchor.attr('hash')===actual.attr('id')){if((actual[0].offsetTop-menu[0].offsetHeight<=$window.pageYOffset)&&(actual[0].offsetTop+actual[0].offsetHeight-menu[0].offsetHeight>$window.pageYOffset)){actualAnchor.addClass('cd-active')}else{actualAnchor.removeClass('cd-active')}}})});$scope.$apply()}
$page.bind('scroll',menuTrigger)}}})})();(function(){'use strict';angular.module('app').controller('PluginsListController',function PluginsListController($http,PluginsResolve){var _self=this;_self.menu=[{hash:'section-1',label:'Presentation'},{hash:'section-2',label:'About'},{state:'root.plugins',label:'Plugins'},{url:'https://github.com/reisraff/phulp',label:'Github'}];_self.query=null;_self.pluginsResolve=PluginsResolve;_self.plugins=_self.pluginsResolve.results;_self.more=function(){$http.get(_self.pluginsResolve.next).then(function(response){_self.pluginsResolve=response.data;angular.forEach(_self.pluginsResolve.results,function(value,key){_self.plugins.push(value)})})};_self.search=function(){if(_self.query!==''){$http.get('https://packagist.org/search.json?tags=phulpplugin&q='+_self.query).then(function(response){_self.pluginsResolve=response.data;_self.plugins=_self.pluginsResolve.results})}else{$http.get('https://packagist.org/search.json?tags=phulpplugin').then(function(response){_self.pluginsResolve=response.data;_self.plugins=_self.pluginsResolve.results})}}})})();(function(){'use strict';angular.module('app').controller('HomeController',function HomeController(PhulpStats,PluginsResolve,$sce){var _self=this;_self.phulp=PhulpStats.package;_self.plugins=PluginsResolve;_self.code=$sce.trustAsHtml("&lt;?php\n\n"+"<span style=\"color:#e28964\">use</span> <span style=\"color:#9b859d\">Phulp\\Output</span> <span style=\"color:#e28964\">as</span> <span style=\"color:#9b859d\">out</span>;\n\n"+"<span style=\"color:#aeaeae;font-style:italic\">// Define the default task</span>\n"+"<span style=\"color:#3e87e3\">$phulp</span><span style=\"color:#e28964\">-></span>task(<span style=\"color:#65b042\">'default'</span>, <span style=\"color:#99cf50\">function</span> (<span style=\"color:#3e87e3\">$phulp</span>) {\n"+"    <span style=\"color:#3e87e3\">$phulp</span><span style=\"color:#e28964\">-></span>start([<span style=\"color:#65b042\">'exec_command'</span>]);\n"+"});\n\n"+"<span style=\"color:#aeaeae;font-style:italic\">// Define the exec_command task</span>\n"+"<span style=\"color:#3e87e3\">$phulp</span><span style=\"color:#e28964\">-></span>task(<span style=\"color:#65b042\">'exec_command'</span>, <span style=\"color:#99cf50\">function</span> (<span style=\"color:#3e87e3\">$phulp</span>) {\n"+"    <span style=\"color:#3e87e3\">$return</span> <span style=\"color:#e28964\">=</span> <span style=\"color:#3e87e3\">$phulp</span><span style=\"color:#e28964\">-></span>exec([\n"+"        <span style=\"color:#65b042\">'command'</span> <span style=\"color:#e28964\">=></span> <span style=\"color:#65b042\">'ls -lh'</span>,\n"+"        <span style=\"color:#65b042\">'cwd'</span> <span style=\"color:#e28964\">=></span> <span style=\"color:#65b042\">'/tmp'</span>\n"+"    ]);\n\n"+"<span style=\"color:#e28964\">    if</span> (<span style=\"color:#3e87e3\">$return</span>[<span style=\"color:#65b042\">'exit_code'</span>] <span style=\"color:#e28964\">==</span> <span style=\"color:#3387cc\">0</span>) {\n"+"        <span style=\"color:#9b859d\">out</span><span style=\"color:#e28964\">::</span>out(<span style=\"color:#9b859d\">out</span><span style=\"color:#e28964\">::</span>colorize(<span style=\"color:#65b042\">'Command Output: '</span> <span style=\"color:#e28964\">.</span> <span style=\"color:#3e87e3\">$return</span>[<span style=\"color:#65b042\">'output'</span>], <span style=\"color:#65b042\">'green'</span>));\n"+"    }<span style=\"color:#e28964\"> else</span> {\n"+"        <span style=\"color:#9b859d\">out</span><span style=\"color:#e28964\">::</span>out(<span style=\"color:#9b859d\">out</span><span style=\"color:#e28964\">::</span>colorize(<span style=\"color:#65b042\">'Command Output: '</span> <span style=\"color:#e28964\">.</span> <span style=\"color:#3e87e3\">$return</span>[<span style=\"color:#65b042\">'output'</span>], <span style=\"color:#65b042\">'red'</span>));\n"+"    }\n"+"});\n");_self.menu=[{hash:'section-1',label:'Presentation'},{hash:'section-2',label:'About'},{state:'root.plugins',label:'Plugins'},{url:'https://github.com/reisraff/phulp',label:'Github'}]})})();(function(){'use strict';angular.module('app').config(function config(ngProgressProvider,$locationProvider){ngProgressProvider.setColor('#4F5B93');ngProgressProvider.setHeight('4px');$locationProvider.hashPrefix('!')})})();(function(){'use strict';angular.module('app').config(function routerConfig($stateProvider,$urlRouterProvider){var PhulpStats=function($http){return $http.get('https://packagist.org/packages/reisraff/phulp.json').then(function(response){return response.data})};var PluginsResolve=function($http){return $http.get('https://packagist.org/search.json?tags=phulpplugin').then(function(response){return response.data})};var states=[{stateName:'root',stateData:{abstract:!0,templateUrl:'app/views/base/base.html'}},{stateName:'root.home',stateData:{url:'/home',views:{'content':{templateUrl:'app/views/base/home/home.html',controller:'HomeController',controllerAs:'controller',resolve:{PhulpStats:PhulpStats,PluginsResolve:PluginsResolve}}}}},{stateName:'root.plugins',stateData:{url:'/plugins',views:{'content':{templateUrl:'app/views/base/plugins/list/list.html',controller:'PluginsListController',controllerAs:'controller',resolve:{'PluginsResolve':PluginsResolve}}}}}];angular.forEach(states,function(state){$stateProvider.state(state.stateName,state.stateData)});$urlRouterProvider.otherwise('/home')})})();(function(){'use strict';angular.module('app').run(function run($rootScope,ngProgress,scroll){$rootScope.$on('$stateChangeStart',function(){ngProgress.start()});$rootScope.$on('$stateChangeSuccess',function(){ngProgress.complete();scroll.scrollTo(0,0.2)})})})();(function(){'use strict';angular.module('app').constant('malarkey',malarkey).constant('moment',moment)})();angular.module("app").run(["$templateCache",function($templateCache){$templateCache.put("app/packages/menuScroll/menuScroll.html","<div class=\"cd-secondary-nav\" ng-show=\"menuScrollMenuFixed\"></div><nav id=\"menuScroll-element\" class=\"navbar-inverse cd-secondary-nav phulp-nav\"> <a href=\"javascript://\" class=\"cd-secondary-nav-trigger\" ng-click=\"controller.menu()\">Menu<span></span></a> <div class=\"container\"> <a href=\"javascript://\" ui-sref=\"root.home\"> <img src=\"https://raw.githubusercontent.com/reisraff/phulp/master/phulp.png\" /> </a> <ul class=\"nav navbar-nav navbar-right\"> <li ng-repeat=\"item in items\"> <a ng-if=\"item.hash\" href=\"javascript://\" class=\"cd-anchor\" ng-click=\"controller.clicked(item.hash)\"> <span>{{ item.label }}</span> </a> <a ng-if=\"item.state\" href=\"javascript://\" ui-sref=\"{{item.state}}\"> <span>{{ item.label }}</span> </a> <a ng-if=\"item.url\" href=\"{{ item.url }}\"> <span>{{ item.label }}</span> </a> </li> </ul> </div></nav>");$templateCache.put("app/views/base/plugins/list/list.html","<div class=\"cd-secondary-nav\"></div><nav id=\"menuScroll-element\" class=\"navbar-inverse cd-secondary-nav phulp-nav is-fixed\"> <a href=\"javascript://\" class=\"cd-secondary-nav-trigger\" ng-click=\"controller.menu()\">Menu<span></span></a> <div class=\"container\"> <div class=\"row\"> <div class=\"col-md-2 hidden-xs hidden-sm logo-plugin\"> <a href=\"javascript://\" ui-sref=\"root.home\"> <img src=\"https://raw.githubusercontent.com/reisraff/phulp/master/phulp.png\" /> </a> </div> <div class=\"col-md-6 col-md-offset-4 search\"> <input type=\"text\" class=\"form-control search-input\" ng-model=\"controller.query\" ng-change=\"controller.search()\" placeholder=\"Search\"> </div> </div> </div></nav><div class=\"full-height bg-php-light-color\"> <div class=\"container-fluid\"> <section ng-repeat=\"plugin in controller.plugins\" class=\"bg-white\"> <div class=\"item container text-center\"> <a href=\"{{ plugin.url }}\" target=\"_blank\"><b class=\"larger\">{{ plugin.name }}</b></a> <br /> <i class=\"medium\">{{ plugin.description }}</i> <br /> <strong>Stars</strong>: {{ plugin.favers }} | <strong>Downloads</strong>: {{ plugin.downloads }} | <a href=\"{{ plugin.repository }}\">View on Github</a> </div> </section> <section class=\"bg-white\"> <div class=\"item container text-center\" ng-show=\"controller.pluginsResolve.next\"> <b class=\"larger\"><a href=\"javascript://\" class=\"grey\" ng-click=\"controller.more()\">MORE</a></b> </div> </section> </div></div>");$templateCache.put("app/views/base/home/home.html","<menu-scroll list='controller.menu'></menu-scroll><div id=\"section-1\" class=\"presentation\"> <div class=\"container text-center\"> <span class=\"phulp-title uppercase\">The task manager for PHP</span> <p class=\"phulp-help\"> Find your plugins, define your tasks, and let phulp work for you. </p> <p> <a class=\"btn btn-primary phulp-btn\" href=\"https://github.com/reisraff/phulp#usage\" target=\"_blank\">Get Started</a> </p> </div></div><section id=\"section-2\" class=\"stats\"> <div class=\"container text-center\"> <div class=\"row\"> <div class=\"col-md-4\"> <p> <span class=\"whats-phulp\">Whats Phulp?</span> </p> <p> <img src=\"assets/images/task.png\" class=\"whats-phulp-img\"> </p> <p class=\"whats-phulp-description\"> It is a framework that provide automation for build your stuff, manage your tasks easily. </p> </div> <div class=\"col-md-4\"> <p> <span class=\"whats-phulp\">Downloads</span> </p> <p class=\"whats-phulp-description big\"> {{ controller.phulp.downloads.total }} </p> <p class=\"whats-phulp-description\"> Average of {{ controller.phulp.downloads.monthly }} downloads monthly. </p> </div> <div class=\"col-md-4\"> <p> <span class=\"whats-phulp\">Registered Plugins</span> </p> <p class=\"whats-phulp-description big\"> {{ controller.plugins.total }} </p> <p class=\"whats-phulp-description\"> You can also register yours as described <a href=\"https://github.com/reisraff/phulp#plugins\" target=\"_blank\">here</a>. </p> </div> </div> </div></section><section id=\"section-3\" class=\"contribute\"> <div class=\"container\"><pre style=\"background:#000;color:#f8f8f8\" ng-bind-html=\"controller.code\"></pre> <p class=\"text-center\"> <a class=\"btn btn-primary phulp-btn\" href=\"https://github.com/reisraff/phulp#usage\" target=\"_blank\">Get Started</a> </p> </div></section><section class=\"footer\"> <div class=\"container text-center\"> <img src=\"https://raw.githubusercontent.com/reisraff/phulp/master/phulp.png\" width=\"330px\"> </div></section>");$templateCache.put("app/views/base/base.html","<div ui-view=\"content\"></div>")}])