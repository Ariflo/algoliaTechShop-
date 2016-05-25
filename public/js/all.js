var algoliaApp = angular.module('algoliaApp', ['ngRoute', 'ngAnimate', 'algoliasearch', 'rzModule']);

algoliaApp.config(function($routeProvider, $locationProvider, $httpProvider){

	$routeProvider
	//landing page 
	.when('/',{
		templateUrl: '/views/homepage.html',
        		controller: 'homeController'
	})		

	.otherwise({
	        redirectTo: '/'
	      });

	$locationProvider.html5Mode({
  		enabled: true,
  		requireBase: false
	});
});
algoliaApp.controller('homeController', ['$scope', '$http', '$parse', '$location', '$routeParams', '$timeout', '$anchorScroll', '$window', 'anchorSmoothScroll', 'algolia'
	                                     ,function($scope,  $http,  $parse,  $location,   $routeParams, $timeout, $anchorScroll,$window, anchorSmoothScroll, algolia) {

	            //hide modal form         
	            $scope.showProduct = false;                         		
	            $scope.showDropdown = false;                         		
	            $scope.displayPrice = false;                         		
	            $scope.displayBrands = false;                         		
	            $scope.displayTypes = false;                         		

	            //initialize search, hits, categories and product
	             $scope.query = '';
	             $scope.hits = [];   
	             $scope.categories = [];
	             $scope.product = {};

	             $scope.categories = ['Computers & Tablets', 
	                                                           'Cell Phones', 
	                                                           'Appliances', 
	                                                           'Audio', 
	                                                           'Cameras & Camcorders', 
	                                                           'TV & Home Theater', 
	                                                           'Car Electronics & GPS', 
	                                                           'Office',
	                                                           'Health, Fitness & Beauty',
	                                                           'Home',
	                                                           'Video Games',
	                                                           'Wearable Technology',
	                                                           'Name Brands',
	                                                           'Best Buy Gift Cards',
	                                                           'Musical Instruments',
	                                                           'Movies & Music',
	                                                           'Magnolia Home Theater',
	                                                           'Batteries & Power',
	                                                           'Carfi Instore Only',
	                                                           'Microwaves' ]

		  var client = algolia.Client('W8I2YD0GJC', '861d0757703675d68f5a0f915072381b');
		  var index = client.initIndex('tech_shop_data');

		  // index.setSettings({'attributesForFaceting': ['hierarchicalCategories.lvl0']}, function(err) {
		  // 		    if (!err) {
		  // 		      console.log('success');
		  // 		    }
		 	// 	});

		  index.clearCache();

		  $scope.algoliaSearch = function (product){
		  	if(product){
		  		$scope.showProduct = !$scope.showProduct;
		  		$scope.product.url = product.url;
		  		$scope.product.image = product.image;
		  		$scope.product.type = product.type;
		  		$scope.product.name = product.name;
		  		$scope.product.price = product.price;
		  		$scope.product.description = product.description;
		  		$scope.product.type = product.type;
		  	}else{
		  		index.search($scope.query, {hitsPerPage: 10000})
		  		.then(function searchSuccess(content) {
		  		     	$scope.products = content.hits;

		  		     	// $scope.products.forEach(function(product){
		  		     	// 	for(var i = 0; i<product.categories.length; i++){
		  		     	// 		$scope.categories.push(product.categories[i]);
		  		     	// 	}
		  		     	// })
		  		}, function searchFailure(err) {
		  		     	console.log(err);
		  		})
		  	}
		 }
		 $scope.algoliaSearch();

		 $scope.showCategories = function(){
		 	$scope.showDropdown = !$scope.showDropdown; 
		 }		 

		 $scope.showPrice = function(){
		 	$scope.displayPrice = !$scope.displayPrice; 
		 }

		 $scope.showBrands = function(){
		 	$scope.displayBrands = !$scope.displayBrands; 
		 }		 

		 $scope.showTypes = function(){
		 	$scope.displayTypes = !$scope.displayTypes; 
		 }

		 $scope.slider = {
		   min: 100,
		   max: 180,
		   options: {
		     floor: 0,
		     ceil: 450,
		     translate: function(value) {
		       return '$' + value;
		     }
		   }
		 };
}]);
algoliaApp.directive('modal', function () {
    return {
      template: '<div class="modal fade">' + 
          '<div class="modal-dialog">' + 
            '<div class="modal-content">' + 
              '<div class="modal-header">' + 
                '<button type="button" class="close" data-dismiss="modal" ng-click="return()" aria-hidden="true">&times;</button>' + 
                '<h4 class="modal-title">{{projectTitle}}</h4>' +
              '</div>' + 
              '<div class="modal-body" ng-transclude></div>' + 
            '</div>' + 
          '</div>' + 
        '</div>',
      restrict: 'E',
      transclude: true,
      replace:true,
      scope:true,
      link: function postLink(scope, element, attrs) {
        scope.title = attrs.title;

        scope.$watch(attrs.visible, function(value){
          if(value == true)
            $(element).modal('show');
          else
            $(element).modal('hide');
        });

        $(element).on('shown.bs.modal', function(){
          scope.$apply(function(){
            scope.$parent[attrs.visible] = true;
          });
        });

        $(element).on('hidden.bs.modal', function(){
          scope.$apply(function(){
            scope.$parent[attrs.visible] = false;
          });
        });
      }
    };
});

algoliaApp.filter('unique', function() {

   return function(collection, keyname) {

      var output = [];

      angular.forEach(collection, function(item) {

          if(output.indexOf(item[keyname]) === -1) {
              output.push(item[keyname]);
          }
      });

      return output;
   };
});
// add scripts
$(function() {

	var $grid = $('.grid').masonry({
			// options
			itemSelector: '.grid-item',
			columnWidth:  '.grid-sizer',
			percentPosition: true,
			fitWidth: true
			});

	// layout Masonry after each image loads
	$grid.imagesLoaded().progress( function() {
	  $grid.masonry('layout');
	});

	$grid.masonry( 'on', 'mouseover', function (e) {
		e.target.toggleClass('highlight');
	})
}); 



	  // app({
	  //   appId: 'latency',
	  //   apiKey: '6be0576ff61c053d5f9a3225e2a90f76',
	  //   indexName: 'instant_search'
	  // });

	  // function app(opts) {
	  //   var search = instantsearch({
	  //     appId: opts.appId,
	  //     apiKey: opts.apiKey,
	  //     indexName: opts.indexName,
	  //     urlSync: true
	  //   });

	  //   var widgets = [
	  //     instantsearch.widgets.searchBox({
	  //       container: '#search-input',
	  //       placeholder: 'Search for products'
	  //     }),
	  //     instantsearch.widgets.hits({
	  //       container: '#hits',
	  //       hitsPerPage: 10,
	  //       templates: {
	  //         item: getTemplate('hit'),
	  //         empty: getTemplate('no-results')
	  //       }
	  //     }),
	  //     instantsearch.widgets.stats({
	  //       container: '#stats'
	  //     }),
	  //     instantsearch.widgets.sortBySelector({
	  //       container: '#sort-by',
	  //       autoHideContainer: true,
	  //       indices: [{
	  //         name: opts.indexName, label: 'Most relevant'
	  //       }, {
	  //         name: opts.indexName + '_price_asc', label: 'Lowest price'
	  //       }, {
	  //         name: opts.indexName + '_price_desc', label: 'Highest price'
	  //       }]
	  //     }),
	  //     instantsearch.widgets.pagination({
	  //       container: '#pagination',
	  //       scrollTo: '#search-input'
	  //     }),
	  //     instantsearch.widgets.refinementList({
	  //       container: '#category',
	  //       attributeName: 'categories',
	  //       limit: 10,
	  //       operator: 'or',
	  //       templates: {
	  //         header: getHeader('Category')
	  //       }
	  //     }),
	  //     instantsearch.widgets.refinementList({
	  //       container: '#brand',
	  //       attributeName: 'brand',
	  //       limit: 10,
	  //       operator: 'or',
	  //       templates: {
	  //         header: getHeader('Brand')
	  //       }
	  //     }),
	  //     instantsearch.widgets.rangeSlider({
	  //       container: '#price',
	  //       attributeName: 'price',
	  //       templates: {
	  //         header: getHeader('Price')
	  //       }
	  //     }),
	  //     instantsearch.widgets.refinementList({
	  //       container: '#type',
	  //       attributeName: 'type',
	  //       limit: 10,
	  //       operator: 'and',
	  //       templates: {
	  //         header: getHeader('Type')
	  //       }
	  //     })
	  //   ];

	  //   widgets.forEach(search.addWidget, search);
	  //   search.start();
	  // }

	  // function getTemplate(templateName) {
	  //   return document.querySelector('#' + templateName + '-template').innerHTML;
	  // }

	  // function getHeader(title) {
	  //   return '<h5>' + title + '</h5>';
	  // }




	// var search = instantsearch({
	//        appId: 'W8I2YD0GJC',
	//        apiKey: 'YourSearchOnlyAPIKey',
	//        indexName: '861d0757703675d68f5a0f915072381b'
	//      });

	//      search.addWidget(
	//        instantsearch.widgets.searchBox({
	//          container: '#search-box',
	//          placeholder: 'Search for products...'
	//        })
	//      );

	//      search.addWidget(
	//        instantsearch.widgets.hits({
	//          container: '#hits-container',
	//          templates: {
	//            item: 'Hit {{objectID}}: FIXME'
	//          }
	//        })
	//      );

	//      search.addWidget(
	//        instantsearch.widgets.pagination({
	//          container: '#pagination-container'
	//        })
	//      );

	//      search.start();

//Found on http://stackoverflow.com/questions/21749878/angular-js-anchorscroll-smooth-duration
algoliaApp.service('anchorSmoothScroll', function(){
    
    this.scrollTo = function(eID) {

        // This scrolling function 
        // is from https://jsfiddle.net/brettdewoody/y65G5/
        var startY = currentYPosition();
        var stopY = elmYPosition(eID);
        var distance = stopY > startY ? stopY - startY : startY - stopY;
        if (distance < 100) {
            scrollTo(0, stopY); return;
        }
        var speed = Math.round(distance / 2);
        if (speed >= 20) speed = 25;
        var step = Math.round(distance / 25);
        var leapY = stopY > startY ? startY + step : startY - step;
        var timer = 0;
        if (stopY > startY) {
            for ( var i=startY; i<stopY; i+=step ) {
                setTimeout("window.scrollTo(0, "+leapY+")", timer * speed);
                leapY += step; if (leapY > stopY) leapY = stopY; timer++;
            } return;
        }
        for ( var j=startY; j>stopY; j-=step ) {
            setTimeout("window.scrollTo(0, "+leapY+")", timer * speed);
            leapY -= step; if (leapY < stopY) leapY = stopY; timer++;
        }
        
        function currentYPosition() {
            // Firefox, Chrome, Opera, Safari
            if (self.pageYOffset) return self.pageYOffset;
            // Internet Explorer 6 - standards mode
            if (document.documentElement && document.documentElement.scrollTop)
                return document.documentElement.scrollTop;
            // Internet Explorer 6, 7 and 8
            if (document.body.scrollTop) return document.body.scrollTop;
            return 0;
        }
        
        function elmYPosition(eID) {
            var elm = document.getElementById(eID);
            var y = elm.offsetTop;
            var node = elm;
            while (node.offsetParent && node.offsetParent != document.body) {
                node = node.offsetParent;
                y += node.offsetTop;
            } return y;
        }

    }; 
});
