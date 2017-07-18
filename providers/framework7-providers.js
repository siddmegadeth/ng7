(function()
{

if(window.Framework7)
{
	
  console.warn("Framework7 Compile On Plugins AngularJS");
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

angular.module("framework7.core",[])
.provider('framework7', [function () 
{

	var today = new Date();
	if(window.Framework7)
	{

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
				},
				timePicker : function(element)
		{
			picker = myApp.picker({
			    input: element,
			     rotateEffect: true,
			       value: [today.getMonth(), today.getDate(), today.getFullYear(), today.getHours(), (today.getMinutes() < 10 ? '0' + today.getMinutes() : today.getMinutes())],
			   
			     onChange: function (picker, values, displayValues) {
			        var daysInMonth = new Date(picker.value[2], picker.value[0]*1 + 1, 0).getDate();
			        if (values[1] > daysInMonth) {
			            picker.cols[1].setValue(daysInMonth);
			        }
			    }, formatValue: function (p, values, displayValues) {
			        return displayValues[0] + ' ' + values[1] + ', ' + values[2] + ' ' + values[3] + ':' + values[4];
			    },
			    cols: [
			        // Months
			        {
			            values: ('0 1 2 3 4 5 6 7 8 9 10 11').split(' '),
			            displayValues: ('January February March April May June July August September October November December').split(' '),
			            textAlign: 'left'
			        },
			        // Days
			        {
			            values: [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30,31],
			        },
			        // Years
			        {
			            values: (function () {
			                var arr = [];
			                for (var i = 1950; i <= 2030; i++) { arr.push(i); }
			                return arr;
			            })(),
			        },
			        // Space divider
			        {
			            divider: true,
			            content: '  '
			        },
			        // Hours
			        {
			            values: (function () {
			                var arr = [];
			                for (var i = 0; i <= 23; i++) { arr.push(i); }
			                return arr;
			            })(),
			        },
			        // Divider
			        {
			            divider: true,
			            content: ':'
			        },
			        // Minutes
			        {
			            values: (function () {
			                var arr = [];
			                for (var i = 0; i <= 59; i++) { arr.push(i < 10 ? '0' + i : i); }
			                return arr;
			            })(),
			        }
			    ]
			 
			});

			return picker;
		},  //Func Endss
		picker : function(element)
		{
			var picker = myApp.picker({
			    input: element,
			    toolbar: true,
			    rotateEffect: false,
			    cols: [
			       {
			         values: ['Car', 'Walk', 'Bicycle','Motor Bike']
			       }
			     ]
			});
			return picker;
		},
		datePicker :function(element)
		{
			var calendarDateFormat = myApp.calendar({
			    input: element,
			    dateFormat: 'DD, MM dd, yyyy'
			});   
			return calendarDateFormat;      
		},
		notification : function(not)
		{
			myApp.addNotification({
		        message: not.message,
		        button: {
		            text: not.buttonText,
		            color: not.buttonColor
		        }
		    });
		},
		modal :
			{
			alert : function(message,cb)
			{
				myApp.alert(message,cb);
			},
			confirm : function(message,title,cbOk,cbCancel)
			{
				myApp.confirm(message, title,cbOk,cbCancel);
			},
			indicatorShow : function()
			{
				myApp.showIndicator();
			},
			indicatorHide : function()
			{
				myApp.hideIndicator();
			}
		},
		preloader :
		{
			show : function()
			{
				myApp.showIndicator();
			},
			hide : function()
			{
				myApp.hideIndicator();
			}




		}
				

	}  // Return Ends
}]

}  //Return Ends
  
  }
  else
  {
  	console.log("No Framework7 Found.Kindly Initialize Framework 7");
  }

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

