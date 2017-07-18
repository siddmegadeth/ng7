# NG7
AngularJS Wrapper around Framework7

## Getting Started

This is a wrapper around Framework7 Framework. This wrapper helps initialize Framework7 to be written as an 
AngularJS Application. All AngularjS Feature are supported along with Framework7

### Prerequisites
This wrapper requires basic knowledge of AngularJS and Framework7 to bootstrap.


### Installing

Donwload the ** Framework7-angular **  or clone it.
add a reference to file in  ** index.html **

```
<script src="Framework7-angular/providers/framework7-providers.js" ></script>

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
app.config("framework7CoreProvider",function()
{
  framework7CoreProvider.init({
      modalTitle: 'Framework7',
      material: true,
      pushState: true,
      angular: true,
      domCache: true,
      swipePanel: 'left'
},function(resp)
{
  log("Framework7 Initialization Successful");
 

}).event(function()
{
    $$('body').on('touchstart','.pac-container', function(e){
    e.stopImmediatePropagation();
    });
    $$(document).on('pageInit', function (e) 
    {
       var page = e.detail.page;
       log(page);
       if (page.name === 'login') 
       {

       }
    });
});


};

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

framework7CoreProvider.init(options,callbackFunction,callBackFunctionError);
framework7CoreProvider.event(callbackFunction);


```
**framework7CoreProvider.init  : **  
Provides a one time configuration to initiazlize Framework7 from 
** app.config ** block. For Options Please refer to Framework7.
** angular: true** must always be passed as a key value pair parameter
in options. (Required)
Failing to pass ** angular: true** will result in ng7 errors or unexpected behavior




**framework7CoreProvider.event  : 
** This Functions allows to add Framework7 Page Level Events From Config Block.
** event ** function enables to initialize and pass Event for Framework7. This is a 
one time activity.


## Authors

* **Siddharth Chandra** -  - [siddmegadeth](https://github.com/siddmegadeth)


## License

This project is licensed under the MIT License - see the [LICENSE.md](LICENSE.md) file for details

## Acknowledgments

* This NG7 Wrapper is based on work of [Ashwin Kumar Suthar](https://github.com/ashvin777)
* and was inspired from [Ashwin Kumar Suthar](https://github.com/ashvin777/framework7.angular)
