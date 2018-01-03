# NG7
AngularJS Wrapper around  [Framework7](http://framework7.io/)
 is a Hybrid Application development API based Framework with its own eco system
of UI Components/Routing specifically targeted towards Android/iOS app development all using
HTML5 and CSS3.

NG7 is a wrapper or to be more precise a binding framework which help binds Framework7 and AngularJS 
together. NG7 allows existing developers to quickly start with Framework7 Components without reinventing
the learning curve(However,UI Components CSS need to be look into). NG7 allows Framework7 UI Components
to be written in AngularJS way.


## Getting Started

This is a wrapper around Framework7. This wrapper helps initialize Framework7 to be written as an AngularJS Application. All AngularjS Feature are supported along with Framework7
Download **WinDevice** [WinDevice](https://github.com/siddmegadeth/winDevice) for logging and Bootstrapping Application
 on** Android/iPhone/Browser**.
>  **WinDevice** is required . If not using winDevice then use the below code and copy/paste
into js file.

    log = console.log.bind(console);
    warn = console.warn.bind(console);
    error = console.error.bind(console);


### Prerequisites
This wrapper requires basic knowledge of AngularJS and Framework7 to bootstrap.


### Installing

Donwload the ** Framework7-angular **  or clone it.
add a reference to file in  ** index.html **

```
<script src="Framework7-angular/providers/framework7-providers.js" ></script>

```
Ensure you have also added jquery. Currently i am using jquery version 
```
jquery-3.2.1.min.js

```


This is a base init file and must be referenced ** (required) **

In your AngularJS Application add reference  ** framework7.core ** to DI (Dependency Injection) in angular.module 

```
var app = angular.module("myApp",["framework7.core"]);
```

Ensure Framework7 and AngularJS are referenced before in  ** index.html **

 

### Configuration
add reference in config block of AngularJS  ** "framework7CoreProvider" **

```
log = console.log.bind(console);
warn = console.warn.bind(console);
error = console.error.bind(console);

  app.config(['framework7Provider',function(framework7Provider) {

            framework7Provider.init({
                    modalTitle: 'iRover Cabs',
                    material: true,
                    pushState: false, //Would be False if Cordova Is Detected
                    angular: true,
                    domCache: true,
                    swipePanel: 'left',
                    tapHold: true //enable tap hold events

                }, function(resp) {
                    log("Initialize Service");
                    //Perform Check if User is Authorized To Landing Page Else Send To Login
                    //Before Routing To Landing CHeck For Permission For Request Device Feature
                    //isLocationAvailable isLocationAuthorized

                    //window.location.hash = "#!components/landing/templates/landing.html";
                }).event(function() {
                    log("No Event Are Prescribed");
                })
                .route([{
                    state: 'landing',
                    path: 'components/landing/templates/landing.html',
                    type: 'page'

                },
                {
                    state: 'global',
                    path: 'components/global/templates/test.html',
                    type: 'popup',
                    className : '.global'

                }])
                .landingRoute({ state: 'landing' });
        }
    ]);

    app.run(['$rootScope', function($rootScope) {

    }]);

```

## API Reference
ng7 supports rich set of API which enables any NG application to initialize using Framework7


```
var options = 
{
      modalTitle: 'Framework7',
      material: true,
      pushState: true,
     ** angular: true,**
      domCache: true,
      swipePanel: 'left'
}

framework7Provider.init(options,callbackFunction,callBackFunctionError);
framework7Provider.event(callbackFunction);


```

** framework7Provider.init **  
Provides a one time configuration to initiazlize Framework7 from  app.config  block. For Options <<br />
Please refer to Framework7.
angular: true must always be passed as a key value pair parameter
in options. (Required). Failing to pass angular: true  will result in ng7 errors or unexpected behavior


**framework7Provider.event ** 
This Functions allows to add Framework7 Page Level Events From Config Block.
** event ** function enables to initialize and pass Event for Framework7. This is a 
one time activity.

**Routing**
Ng7 currently routing using state management.
while initiazation in config the state can be passed as follow.
you can create a JSON Object containing the page type,path,and state name.
(For `type=='popup'` there is an additional property `className` which help identify the popup in **Framework7**. This popup `className` is mandatory as it is requiered to track the `popup` to open)


        .route([{
                state: 'landing',
                path: 'components/landing/templates/landing.html',
                type: 'page'

            },
            {
                state: 'global',
                path: 'components/global/templates/test.html',
                type: 'popup',
                className: '.global'

            }
        ])
        .landingRoute({ state: 'landing' });


This provided the basic for State. By Default it is **mandatory** to provide  landing  or default route. Refer to the below html for `popup`. this has reference to classsName `global`

```

    <div class="popup global">
      <div class="view">
        <div class="page">
          <div class="navbar">
            <div class="navbar-inner">
              <div class="title">Popup</div>
              <div class="right">
                <!-- Link to close popup -->
                <a class="link popup-close">Close</a>
              </div>
            </div>
          </div>
        </div>
        <div class="page-content">
          ...
        </div>
      </div>
      ...
    </div>
```

referrence the code for `page`

```
    <div data-page="landing" class="page toolbar-fixed navbar-fixed" ng-controller="landingCtrl">
        <div class="navbar">
            <div class="navbar-inner">
                <div class="left"><a href class="link open-panel icon-only open-panel"><i class="icon icon-bars"></i></a></div>
                <div class="center">Test PaGe</div>
                <div class="right"><a href class="link icon-only" ng-ref='global'><i class="fa fa-search"></i></a></div>
            </div>
        </div>
        <a href ng7-page="global" class="floating-button color-pink">
        <i class="icon icon-plus"></i>
      </a>
    </div>
```
It is not required to reference or load pages in` index.html` beforehand.
to navigate between `pages` and `popup pages` use the below directive in `html`

`ng-ref=<STATE-NAME>`

            <div class="right"><a href class="link icon-only" ng-ref='global'><i class="fa fa-search"></i></a></div>

to use navigation from controller refer to the below code for reference.



    
    
    
    app.controller('globalCtrl', ['framework7', function(framework7) {
        $rootScope.framework7 = framework7;
        $rootScope.geolocation = geolocation;
        $rootScope.notification = notification;
        $rootScope.background = background;
    }]);

use `$rootScope.framework7.gotoPage(<STATE_NAME>) ` in controllers or 
       ` framework7.gotoPage(<STATE_NAME>) ` in `html`.
		
### NG7 API Documentation

Below is the list of API built around Framework7 API. These API are wrapper for AngularJS


| API  | Description |
| ------ | ------ |
| framework7.picker(<element id>) | -Open Time Picker with Date
| framework7.datePicker() | Open Picker for Date only.
| framework7.modal.alert() | Provide Modal with Custom Message. Suport Object.
| framework7.modal.confirm() | Confirmation Modal with a Callback for success or failure based on click
| framework7.modal.indicatorShow() |  Show Async Screen loader while loading http request or Pages 
| framework7.modal.indicatorHide() | Hide loader once request is done
| framework7.preloader.show() | Screen loader with custom elements
| framework7.preloader.hide() | Hide screen loader.

Further work is in progress and i would release the full documentation with details such as function arguments.

## Authors

* **Siddharth Chandra** -  - [siddmegadeth](https://github.com/siddmegadeth)


## License

This project is licensed under the MIT License - see the [LICENSE.md](LICENSE.md) file for details

## Acknowledgments

* This NG7 Wrapper is based on work of [Ashwin Kumar Suthar](https://github.com/ashvin777)
* and was inspired from [Ashwin Kumar Suthar](https://github.com/ashvin777/framework7.angular)
