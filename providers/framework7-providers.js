(function()
{

	


if(window.Framework7)
{
	
	console.log("Framework7 Compile On Plugins AngularJS");
	Framework7.prototype.plugins.angular = function (app, params) {
  function compile(newPage) {
    try {
      var $page = $(newPage);
      var injector = angular.element(document).injector();
      if (injector && $page ) {
        var $compile = injector.invoke(function ($compile) { return $compile; });
        var $timeout = injector.invoke(function ($timeout) { return $timeout; });
        var $scope = injector.invoke(function ($rootScope) { return $rootScope; });
        $scope = $scope.$$childHead;
        $timeout(function () {
          $compile($page)($scope);
        });
      }
    } catch (e) {
      console.error("Some Error Occured While Compiling The Template", e);
    }
  }

  function removeOldPage(pageData) {
    var $oldPage = $(".views .view .pages .page").not($(pageData.container));
    if ($oldPage.length > 0) {
      var controllerName = $oldPage.attr("ng-controller");
      var $scope = angular.element('[ng-controller=' + controllerName + ']').scope();
      if ($scope) {
        $scope.$destroy();
        $oldPage.remove();
      }
    }
  }

  return {
    hooks: {
      pageInit: function (pageData) {
        compile(pageData.container);
      },
      pageAfterAnimation: function (pageData) {
        removeOldPage(pageData);
      }
    }
  }
};

angular.module("framework7.core",[]).provider('framework7Core', [function () {

	return {
		init : function(config,cb)
		{
				frame7 = myApp = {};
				mainView = {};
				rightView = {};
				$$ = Dom7;
				myApp = new Framework7(config);
				mainView = myApp.addView('.view-main', {
					domCache: true //enable inline pages
				});
				if(myApp)
				{
					//Execute Page Hook
					cb(myApp);
				}
				return this;
		},
		event : function(cb)
		{
			if(myApp)
			{
				cb(this);
			}
			return this;
		},
		$get : [function() {
			return {
				event : function(cb)
				{
					if(myApp)
					{
						cb(myApp);
					}
				}
				

			}  // Return Ends
		}]

	}  //Return Ends
}])
.directive('frameworkView', [function () 
{
  return {
    restrict: 'EA',
    template : '<div class="views"><div class="view view-main"><div class="pages navbar-fixed"><p class="open-indicator"></p></div></div></div>',
    link: function (scope, iElement, iAttrs) {
      
	    }
	  };
}]);

}
else
{
console.error("Framework7 Not Found");
}

})();

