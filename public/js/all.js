

// add scripts
$(function() {

	//set focus on search on page load
	$("#search-box").focus();

	// algolia instantsearch widgets
	var search = instantsearch({
	       appId: 'W8I2YD0GJC',
	       apiKey: '861d0757703675d68f5a0f915072381b',
	       indexName: 'tech_shop_data'
	});

	//searchbar
	search.addWidget(
             instantsearch.widgets.searchBox({
               container: '#search-box',
               placeholder: 'Search for products...'
             })
            );

	//product tiles 
	search.addWidget(
	  instantsearch.widgets.hits({
	    container: '#hits-container',
	    cssClasses:{
	    	item: "productItem"
	    		},
	    hitsPerPage: 50,
	    templates: {
	      item: function(data){
	      	if(data.popularity >= 0 && data.popularity < 1000){
	      		data.popularity = '☆☆';
			return '<img id="prodPic" src="'+ data.image +'" alt="bestbuy item"><div class="row"><span id="popularity"><h4>'+data.popularity+' 2/5</h4></span></div><div class="row"><p id="price">$'+data.price+'</p></div><div class="row"><a href="'+data.url+'"><button class="btn btn-success btn-lg">Buy</button></a></div><h1 id="title">'+data.name+'</h1><p id="description">'+data.description+'</p>';

		}else if(data.popularity >= 1000 && data.popularity < 5000 ){
	      		data.popularity = '☆☆☆';
			return '<img id="prodPic" src="'+ data.image +'" alt="bestbuy item"><div class="row"><span id="popularity"><h4>'+data.popularity+' 3/5</h4></div></span><div class="row"><p id="price">$'+data.price+'</p></div><div class="row"><a href="'+data.url+'"><button class="btn btn-success btn-lg">Buy</button></a></div><h1 id="title">'+data.name+'</h1><p id="description">'+data.description+'</p>';

	     	}else if(data.popularity >= 5000 && data.popularity < 8000 ){
	      		data.popularity = '☆☆☆☆';
			return '<img id="prodPic" src="'+ data.image +'" alt="bestbuy item"><div class="row"><span id="popularity"><h4>'+data.popularity+' 4/5</h4></div></span><div class="row"><p id="price">$'+data.price+'</p></div><div class="row"><a href="'+data.url+'"><button class="btn btn-success btn-lg">Buy</button></a></div><h1 id="title">'+data.name+'</h1><p id="description">'+data.description+'</p>';

	     	}else{
	      		data.popularity = '☆☆☆☆☆';
			return '<img id="prodPic" src="'+ data.image +'" alt="bestbuy item"><div class="row"><span id="popularity"><h4>'+data.popularity+' 5/5</h4></div></span><div class="row"><p id="price">$'+data.price+'</p></div><div class="row"><a href="'+data.url+'"><button class="btn  btn-success btn-lg">Buy</button></a></div><h1 id="title">'+data.name+'</h1><p id="description">'+data.description+'</p>';
	     	}

	       },
	       empty: '<div id="notFoundContainer"><h1 id="notFoundHeader">Sorry Snoopy cannot find what you seek...</h1><img id="notFound" src="notFound.gif"></div>'	
	    }
	  })
	);


	//categories menu
	search.addWidget(
	  instantsearch.widgets.refinementList({
	    container: '#categoryMenu',
	    attributeName: 'categories',
	    operator: 'or',
	    limit: 10,
	    cssClasses:{
	    	list: 'categoryList',
	    	label: 'checkbox-inline',
	    	count:'count',
	    	item: 'lineItem'
	    }
	  })
	  );

	//price range bar
	search.addWidget(
	  instantsearch.widgets.rangeSlider({
	    container: '#priceMenu',
	    attributeName: 'price',
	    tooltips: {
	      format: function(formattedValue) {
	        return '$' + Math.floor(formattedValue);
	      },
	      min:-1,
	      max: 5000,
	    }
	  })
	);

	//brands menu
	search.addWidget(
	  instantsearch.widgets.refinementList({
	    container: '#brandsMenu',
	    attributeName: 'brand',
	    operator: 'or',
	    limit: 10,
	    cssClasses:{
	    	list: 'brandsList',
	    	label: 'checkbox-inline',
	    	count:'count',
	    	item: 'lineItem'
	    }
	  })
	);	

	//types menu
	search.addWidget(
	  instantsearch.widgets.refinementList({
	    container: '#typesMenu',
	    attributeName: 'type',
	    operator: 'or',
	    limit: 10,
	    cssClasses:{
	    	list: 'typesList',
	    	label: 'checkbox-inline',
	    	count:'count',
	    	item: 'lineItem'
	    }
	  })
	);

	//pagination footer
	search.addWidget(
	  instantsearch.widgets.pagination({
	    container: '#pagination-container',
	     scrollTo: '#search-box',
	     cssClasses: {
	     	root:"page",
	     	link:"num"
	     }
	  })
	);

	search.addWidget(
	  instantsearch.widgets.stats({
	    container: '#stats'
	  })
	);

	search.addWidget(
	  instantsearch.widgets.sortBySelector({
	    container: '#sort-by',
	    autoHideContainer: true,
	    indices: [{
	      name: "tech_shop_data", label: 'Most popular'
	    }, {
	      name: "tech_shop_data" + '_price_asc', label: 'Lowest price'
	    }, {
	      name: "tech_shop_data" + '_price_desc', label: 'Highest price'
	    }],
	    cssClasses: {
	  	root: "dropdown"
	     }
	  })
	);

	//call to start searc on page load
	search.start();

	//Navbar animations

	//category menu animations
	$('.categoryLink').on("click", function () {
		$('#categoryMenu').css("display", "block");
	});	

	$('#categoryMenu').on('mouseover', function(){
		$('#categoryMenu').css("display", "block");
	});	

	$('#categoryMenu').on('mouseout', function(){
		$('#categoryMenu').css("display", "none");
	});	


	//price menu animations
	$('.priceLink').on("click", function () {
		$('#priceMenu').css("display", "block");
	});	

	$('#priceMenu').on('mouseover', function(){
		$('#priceMenu').css("display", "block");
	});	

	$('#priceMenu').on('mouseout', function(){
		$('#priceMenu').css("display", "none");
	});	


	//brand menu animations
	$('.brandLink').on("click", function () {
		$('#brandsMenu').css("display", "block");
	});	

	$('#brandsMenu').on('mouseover', function(){
		$('#brandsMenu').css("display", "block");
	});	

	$('#brandsMenu').on('mouseout', function(){
		$('#brandsMenu').css("display", "none");
	});

	//types menu animations
	$('.typeLink').on("click", function () {
		$('#typesMenu').css("display", "block");
	});	

	$('#typesMenu').on('mouseover', function(){
		$('#typesMenu').css("display", "block");
	});	

	$('#typesMenu').on('mouseout', function(){
		$('#typesMenu').css("display", "none");
	});
}); 
$(function(){$("#search-box").focus();var i=instantsearch({appId:"W8I2YD0GJC",apiKey:"861d0757703675d68f5a0f915072381b",indexName:"tech_shop_data"});i.addWidget(instantsearch.widgets.searchBox({container:"#search-box",placeholder:"Search for products..."})),i.addWidget(instantsearch.widgets.hits({container:"#hits-container",cssClasses:{item:"productItem"},hitsPerPage:50,templates:{item:function(i){return i.popularity>=0&&i.popularity<1e3?(i.popularity="☆☆",'<img id="prodPic" src="'+i.image+'" alt="bestbuy item"><div class="row"><span id="popularity"><h4>'+i.popularity+' 2/5</h4></span></div><div class="row"><p id="price">$'+i.price+'</p></div><div class="row"><a href="'+i.url+'"><button class="btn btn-success btn-lg">Buy</button></a></div><h1 id="title">'+i.name+'</h1><p id="description">'+i.description+"</p>"):i.popularity>=1e3&&i.popularity<5e3?(i.popularity="☆☆☆",'<img id="prodPic" src="'+i.image+'" alt="bestbuy item"><div class="row"><span id="popularity"><h4>'+i.popularity+' 3/5</h4></div></span><div class="row"><p id="price">$'+i.price+'</p></div><div class="row"><a href="'+i.url+'"><button class="btn btn-success btn-lg">Buy</button></a></div><h1 id="title">'+i.name+'</h1><p id="description">'+i.description+"</p>"):i.popularity>=5e3&&i.popularity<8e3?(i.popularity="☆☆☆☆",'<img id="prodPic" src="'+i.image+'" alt="bestbuy item"><div class="row"><span id="popularity"><h4>'+i.popularity+' 4/5</h4></div></span><div class="row"><p id="price">$'+i.price+'</p></div><div class="row"><a href="'+i.url+'"><button class="btn btn-success btn-lg">Buy</button></a></div><h1 id="title">'+i.name+'</h1><p id="description">'+i.description+"</p>"):(i.popularity="☆☆☆☆☆",'<img id="prodPic" src="'+i.image+'" alt="bestbuy item"><div class="row"><span id="popularity"><h4>'+i.popularity+' 5/5</h4></div></span><div class="row"><p id="price">$'+i.price+'</p></div><div class="row"><a href="'+i.url+'"><button class="btn  btn-success btn-lg">Buy</button></a></div><h1 id="title">'+i.name+'</h1><p id="description">'+i.description+"</p>")},empty:'<div id="notFoundContainer"><h1 id="notFoundHeader">Sorry Snoopy cannot find what you seek...</h1><img id="notFound" src="notFound.gif"></div>'}})),i.addWidget(instantsearch.widgets.refinementList({container:"#categoryMenu",attributeName:"categories",operator:"or",limit:10,cssClasses:{list:"categoryList",label:"checkbox-inline",count:"count",item:"lineItem"}})),i.addWidget(instantsearch.widgets.rangeSlider({container:"#priceMenu",attributeName:"price",tooltips:{format:function(i){return"$"+Math.floor(i)},min:-1,max:5e3}})),i.addWidget(instantsearch.widgets.refinementList({container:"#brandsMenu",attributeName:"brand",operator:"or",limit:10,cssClasses:{list:"brandsList",label:"checkbox-inline",count:"count",item:"lineItem"}})),i.addWidget(instantsearch.widgets.refinementList({container:"#typesMenu",attributeName:"type",operator:"or",limit:10,cssClasses:{list:"typesList",label:"checkbox-inline",count:"count",item:"lineItem"}})),i.addWidget(instantsearch.widgets.pagination({container:"#pagination-container",scrollTo:"#search-box",cssClasses:{root:"page",link:"num"}})),i.addWidget(instantsearch.widgets.stats({container:"#stats"})),i.addWidget(instantsearch.widgets.sortBySelector({container:"#sort-by",autoHideContainer:!0,indices:[{name:"tech_shop_data",label:"Most popular"},{name:"tech_shop_data_price_asc",label:"Lowest price"},{name:"tech_shop_data_price_desc",label:"Highest price"}],cssClasses:{root:"dropdown"}})),i.start(),$(".categoryLink").on("click",function(){$("#categoryMenu").css("display","block")}),$("#categoryMenu").on("mouseover",function(){$("#categoryMenu").css("display","block")}),$("#categoryMenu").on("mouseout",function(){$("#categoryMenu").css("display","none")}),$(".priceLink").on("click",function(){$("#priceMenu").css("display","block")}),$("#priceMenu").on("mouseover",function(){$("#priceMenu").css("display","block")}),$("#priceMenu").on("mouseout",function(){$("#priceMenu").css("display","none")}),$(".brandLink").on("click",function(){$("#brandsMenu").css("display","block")}),$("#brandsMenu").on("mouseover",function(){$("#brandsMenu").css("display","block")}),$("#brandsMenu").on("mouseout",function(){$("#brandsMenu").css("display","none")}),$(".typeLink").on("click",function(){$("#typesMenu").css("display","block")}),$("#typesMenu").on("mouseover",function(){$("#typesMenu").css("display","block")}),$("#typesMenu").on("mouseout",function(){$("#typesMenu").css("display","none")})});


// add scripts
$(function() {

	//set focus on search on page load
	$("#search-box").focus();

	// algolia instantsearch widgets
	var search = instantsearch({
	       appId: 'W8I2YD0GJC',
	       apiKey: '861d0757703675d68f5a0f915072381b',
	       indexName: 'tech_shop_data'
	});

	//searchbar
	search.addWidget(
             instantsearch.widgets.searchBox({
               container: '#search-box',
               placeholder: 'Search for products...'
             })
            );

	//product tiles 
	search.addWidget(
	  instantsearch.widgets.hits({
	    container: '#hits-container',
	    cssClasses:{
	    	item: "productItem"
	    		},
	    hitsPerPage: 50,
	    templates: {
	      item: function(data){
	      	if(data.popularity >= 0 && data.popularity < 1000){
	      		data.popularity = '☆☆';
			return '<img id="prodPic" src="'+ data.image +'" alt="bestbuy item"><div class="row"><span id="popularity"><h4>'+data.popularity+' 2/5</h4></span></div><div class="row"><p id="price">$'+data.price+'</p></div><div class="row"><a href="'+data.url+'"><button class="btn btn-success btn-lg">Buy</button></a></div><h1 id="title">'+data.name+'</h1><p id="description">'+data.description+'</p>';

		}else if(data.popularity >= 1000 && data.popularity < 5000 ){
	      		data.popularity = '☆☆☆';
			return '<img id="prodPic" src="'+ data.image +'" alt="bestbuy item"><div class="row"><span id="popularity"><h4>'+data.popularity+' 3/5</h4></div></span><div class="row"><p id="price">$'+data.price+'</p></div><div class="row"><a href="'+data.url+'"><button class="btn btn-success btn-lg">Buy</button></a></div><h1 id="title">'+data.name+'</h1><p id="description">'+data.description+'</p>';

	     	}else if(data.popularity >= 5000 && data.popularity < 8000 ){
	      		data.popularity = '☆☆☆☆';
			return '<img id="prodPic" src="'+ data.image +'" alt="bestbuy item"><div class="row"><span id="popularity"><h4>'+data.popularity+' 4/5</h4></div></span><div class="row"><p id="price">$'+data.price+'</p></div><div class="row"><a href="'+data.url+'"><button class="btn btn-success btn-lg">Buy</button></a></div><h1 id="title">'+data.name+'</h1><p id="description">'+data.description+'</p>';

	     	}else{
	      		data.popularity = '☆☆☆☆☆';
			return '<img id="prodPic" src="'+ data.image +'" alt="bestbuy item"><div class="row"><span id="popularity"><h4>'+data.popularity+' 5/5</h4></div></span><div class="row"><p id="price">$'+data.price+'</p></div><div class="row"><a href="'+data.url+'"><button class="btn  btn-success btn-lg">Buy</button></a></div><h1 id="title">'+data.name+'</h1><p id="description">'+data.description+'</p>';
	     	}

	       },
	       empty: '<div id="notFoundContainer"><h1 id="notFoundHeader">Sorry Snoopy cannot find what you seek...</h1><img id="notFound" src="notFound.gif"></div>'	
	    }
	  })
	);


	//categories menu
	search.addWidget(
	  instantsearch.widgets.refinementList({
	    container: '#categoryMenu',
	    attributeName: 'categories',
	    operator: 'or',
	    limit: 10,
	    cssClasses:{
	    	list: 'categoryList',
	    	label: 'checkbox-inline',
	    	count:'count',
	    	item: 'lineItem'
	    }
	  })
	  );

	//price range bar
	search.addWidget(
	  instantsearch.widgets.rangeSlider({
	    container: '#priceMenu',
	    attributeName: 'price',
	    tooltips: {
	      format: function(formattedValue) {
	        return '$' + Math.floor(formattedValue);
	      },
	      min:-1,
	      max: 5000,
	    }
	  })
	);

	//brands menu
	search.addWidget(
	  instantsearch.widgets.refinementList({
	    container: '#brandsMenu',
	    attributeName: 'brand',
	    operator: 'or',
	    limit: 10,
	    cssClasses:{
	    	list: 'brandsList',
	    	label: 'checkbox-inline',
	    	count:'count',
	    	item: 'lineItem'
	    }
	  })
	);	

	//types menu
	search.addWidget(
	  instantsearch.widgets.refinementList({
	    container: '#typesMenu',
	    attributeName: 'type',
	    operator: 'or',
	    limit: 10,
	    cssClasses:{
	    	list: 'typesList',
	    	label: 'checkbox-inline',
	    	count:'count',
	    	item: 'lineItem'
	    }
	  })
	);

	//pagination footer
	search.addWidget(
	  instantsearch.widgets.pagination({
	    container: '#pagination-container',
	     scrollTo: '#search-box',
	     cssClasses: {
	     	root:"page",
	     	link:"num"
	     }
	  })
	);

	search.addWidget(
	  instantsearch.widgets.stats({
	    container: '#stats'
	  })
	);

	search.addWidget(
	  instantsearch.widgets.sortBySelector({
	    container: '#sort-by',
	    autoHideContainer: true,
	    indices: [{
	      name: "tech_shop_data", label: 'Most popular'
	    }, {
	      name: "tech_shop_data" + '_price_asc', label: 'Lowest price'
	    }, {
	      name: "tech_shop_data" + '_price_desc', label: 'Highest price'
	    }],
	    cssClasses: {
	  	root: "dropdown"
	     }
	  })
	);

	//call to start searc on page load
	search.start();

	//Navbar animations

	//category menu animations
	$('.categoryLink').on("click", function () {
		$('#categoryMenu').css("display", "block");
	});	

	$('#categoryMenu').on('mouseover', function(){
		$('#categoryMenu').css("display", "block");
	});	

	$('#categoryMenu').on('mouseout', function(){
		$('#categoryMenu').css("display", "none");
	});	


	//price menu animations
	$('.priceLink').on("click", function () {
		$('#priceMenu').css("display", "block");
	});	

	$('#priceMenu').on('mouseover', function(){
		$('#priceMenu').css("display", "block");
	});	

	$('#priceMenu').on('mouseout', function(){
		$('#priceMenu').css("display", "none");
	});	


	//brand menu animations
	$('.brandLink').on("click", function () {
		$('#brandsMenu').css("display", "block");
	});	

	$('#brandsMenu').on('mouseover', function(){
		$('#brandsMenu').css("display", "block");
	});	

	$('#brandsMenu').on('mouseout', function(){
		$('#brandsMenu').css("display", "none");
	});

	//types menu animations
	$('.typeLink').on("click", function () {
		$('#typesMenu').css("display", "block");
	});	

	$('#typesMenu').on('mouseover', function(){
		$('#typesMenu').css("display", "block");
	});	

	$('#typesMenu').on('mouseout', function(){
		$('#typesMenu').css("display", "none");
	});
}); 
$(function(){$("#search-box").focus();var i=instantsearch({appId:"W8I2YD0GJC",apiKey:"861d0757703675d68f5a0f915072381b",indexName:"tech_shop_data"});i.addWidget(instantsearch.widgets.searchBox({container:"#search-box",placeholder:"Search for products..."})),i.addWidget(instantsearch.widgets.hits({container:"#hits-container",cssClasses:{item:"productItem"},hitsPerPage:50,templates:{item:function(i){return i.popularity>=0&&i.popularity<1e3?(i.popularity="☆☆",'<img id="prodPic" src="'+i.image+'" alt="bestbuy item"><div class="row"><span id="popularity"><h4>'+i.popularity+' 2/5</h4></span></div><div class="row"><p id="price">$'+i.price+'</p></div><div class="row"><a href="'+i.url+'"><button class="btn btn-success btn-lg">Buy</button></a></div><h1 id="title">'+i.name+'</h1><p id="description">'+i.description+"</p>"):i.popularity>=1e3&&i.popularity<5e3?(i.popularity="☆☆☆",'<img id="prodPic" src="'+i.image+'" alt="bestbuy item"><div class="row"><span id="popularity"><h4>'+i.popularity+' 3/5</h4></div></span><div class="row"><p id="price">$'+i.price+'</p></div><div class="row"><a href="'+i.url+'"><button class="btn btn-success btn-lg">Buy</button></a></div><h1 id="title">'+i.name+'</h1><p id="description">'+i.description+"</p>"):i.popularity>=5e3&&i.popularity<8e3?(i.popularity="☆☆☆☆",'<img id="prodPic" src="'+i.image+'" alt="bestbuy item"><div class="row"><span id="popularity"><h4>'+i.popularity+' 4/5</h4></div></span><div class="row"><p id="price">$'+i.price+'</p></div><div class="row"><a href="'+i.url+'"><button class="btn btn-success btn-lg">Buy</button></a></div><h1 id="title">'+i.name+'</h1><p id="description">'+i.description+"</p>"):(i.popularity="☆☆☆☆☆",'<img id="prodPic" src="'+i.image+'" alt="bestbuy item"><div class="row"><span id="popularity"><h4>'+i.popularity+' 5/5</h4></div></span><div class="row"><p id="price">$'+i.price+'</p></div><div class="row"><a href="'+i.url+'"><button class="btn  btn-success btn-lg">Buy</button></a></div><h1 id="title">'+i.name+'</h1><p id="description">'+i.description+"</p>")},empty:'<div id="notFoundContainer"><h1 id="notFoundHeader">Sorry Snoopy cannot find what you seek...</h1><img id="notFound" src="notFound.gif"></div>'}})),i.addWidget(instantsearch.widgets.refinementList({container:"#categoryMenu",attributeName:"categories",operator:"or",limit:10,cssClasses:{list:"categoryList",label:"checkbox-inline",count:"count",item:"lineItem"}})),i.addWidget(instantsearch.widgets.rangeSlider({container:"#priceMenu",attributeName:"price",tooltips:{format:function(i){return"$"+Math.floor(i)},min:-1,max:5e3}})),i.addWidget(instantsearch.widgets.refinementList({container:"#brandsMenu",attributeName:"brand",operator:"or",limit:10,cssClasses:{list:"brandsList",label:"checkbox-inline",count:"count",item:"lineItem"}})),i.addWidget(instantsearch.widgets.refinementList({container:"#typesMenu",attributeName:"type",operator:"or",limit:10,cssClasses:{list:"typesList",label:"checkbox-inline",count:"count",item:"lineItem"}})),i.addWidget(instantsearch.widgets.pagination({container:"#pagination-container",scrollTo:"#search-box",cssClasses:{root:"page",link:"num"}})),i.addWidget(instantsearch.widgets.stats({container:"#stats"})),i.addWidget(instantsearch.widgets.sortBySelector({container:"#sort-by",autoHideContainer:!0,indices:[{name:"tech_shop_data",label:"Most popular"},{name:"tech_shop_data_price_asc",label:"Lowest price"},{name:"tech_shop_data_price_desc",label:"Highest price"}],cssClasses:{root:"dropdown"}})),i.start(),$(".categoryLink").on("click",function(){$("#categoryMenu").css("display","block")}),$("#categoryMenu").on("mouseover",function(){$("#categoryMenu").css("display","block")}),$("#categoryMenu").on("mouseout",function(){$("#categoryMenu").css("display","none")}),$(".priceLink").on("click",function(){$("#priceMenu").css("display","block")}),$("#priceMenu").on("mouseover",function(){$("#priceMenu").css("display","block")}),$("#priceMenu").on("mouseout",function(){$("#priceMenu").css("display","none")}),$(".brandLink").on("click",function(){$("#brandsMenu").css("display","block")}),$("#brandsMenu").on("mouseover",function(){$("#brandsMenu").css("display","block")}),$("#brandsMenu").on("mouseout",function(){$("#brandsMenu").css("display","none")}),$(".typeLink").on("click",function(){$("#typesMenu").css("display","block")}),$("#typesMenu").on("mouseover",function(){$("#typesMenu").css("display","block")}),$("#typesMenu").on("mouseout",function(){$("#typesMenu").css("display","none")})}),$(function(){$("#search-box").focus();var i=instantsearch({appId:"W8I2YD0GJC",apiKey:"861d0757703675d68f5a0f915072381b",indexName:"tech_shop_data"});i.addWidget(instantsearch.widgets.searchBox({container:"#search-box",placeholder:"Search for products..."})),i.addWidget(instantsearch.widgets.hits({container:"#hits-container",cssClasses:{item:"productItem"},hitsPerPage:50,templates:{item:function(i){return i.popularity>=0&&i.popularity<1e3?(i.popularity="☆☆",'<img id="prodPic" src="'+i.image+'" alt="bestbuy item"><div class="row"><span id="popularity"><h4>'+i.popularity+' 2/5</h4></span></div><div class="row"><p id="price">$'+i.price+'</p></div><div class="row"><a href="'+i.url+'"><button class="btn btn-success btn-lg">Buy</button></a></div><h1 id="title">'+i.name+'</h1><p id="description">'+i.description+"</p>"):i.popularity>=1e3&&i.popularity<5e3?(i.popularity="☆☆☆",'<img id="prodPic" src="'+i.image+'" alt="bestbuy item"><div class="row"><span id="popularity"><h4>'+i.popularity+' 3/5</h4></div></span><div class="row"><p id="price">$'+i.price+'</p></div><div class="row"><a href="'+i.url+'"><button class="btn btn-success btn-lg">Buy</button></a></div><h1 id="title">'+i.name+'</h1><p id="description">'+i.description+"</p>"):i.popularity>=5e3&&i.popularity<8e3?(i.popularity="☆☆☆☆",'<img id="prodPic" src="'+i.image+'" alt="bestbuy item"><div class="row"><span id="popularity"><h4>'+i.popularity+' 4/5</h4></div></span><div class="row"><p id="price">$'+i.price+'</p></div><div class="row"><a href="'+i.url+'"><button class="btn btn-success btn-lg">Buy</button></a></div><h1 id="title">'+i.name+'</h1><p id="description">'+i.description+"</p>"):(i.popularity="☆☆☆☆☆",'<img id="prodPic" src="'+i.image+'" alt="bestbuy item"><div class="row"><span id="popularity"><h4>'+i.popularity+' 5/5</h4></div></span><div class="row"><p id="price">$'+i.price+'</p></div><div class="row"><a href="'+i.url+'"><button class="btn  btn-success btn-lg">Buy</button></a></div><h1 id="title">'+i.name+'</h1><p id="description">'+i.description+"</p>")},empty:'<div id="notFoundContainer"><h1 id="notFoundHeader">Sorry Snoopy cannot find what you seek...</h1><img id="notFound" src="notFound.gif"></div>'}})),i.addWidget(instantsearch.widgets.refinementList({container:"#categoryMenu",attributeName:"categories",operator:"or",limit:10,cssClasses:{list:"categoryList",label:"checkbox-inline",count:"count",item:"lineItem"}})),i.addWidget(instantsearch.widgets.rangeSlider({container:"#priceMenu",attributeName:"price",tooltips:{format:function(i){return"$"+Math.floor(i)},min:-1,max:5e3}})),i.addWidget(instantsearch.widgets.refinementList({container:"#brandsMenu",attributeName:"brand",operator:"or",limit:10,cssClasses:{list:"brandsList",label:"checkbox-inline",count:"count",item:"lineItem"}})),i.addWidget(instantsearch.widgets.refinementList({container:"#typesMenu",attributeName:"type",operator:"or",limit:10,cssClasses:{list:"typesList",label:"checkbox-inline",count:"count",item:"lineItem"}})),i.addWidget(instantsearch.widgets.pagination({container:"#pagination-container",scrollTo:"#search-box",cssClasses:{root:"page",link:"num"}})),i.addWidget(instantsearch.widgets.stats({container:"#stats"})),i.addWidget(instantsearch.widgets.sortBySelector({container:"#sort-by",autoHideContainer:!0,indices:[{name:"tech_shop_data",label:"Most popular"},{name:"tech_shop_data_price_asc",label:"Lowest price"},{name:"tech_shop_data_price_desc",label:"Highest price"}],cssClasses:{root:"dropdown"}})),i.start(),$(".categoryLink").on("click",function(){$("#categoryMenu").css("display","block")}),$("#categoryMenu").on("mouseover",function(){$("#categoryMenu").css("display","block")}),$("#categoryMenu").on("mouseout",function(){$("#categoryMenu").css("display","none")}),$(".priceLink").on("click",function(){$("#priceMenu").css("display","block")}),$("#priceMenu").on("mouseover",function(){$("#priceMenu").css("display","block")}),$("#priceMenu").on("mouseout",function(){$("#priceMenu").css("display","none")}),$(".brandLink").on("click",function(){$("#brandsMenu").css("display","block")}),$("#brandsMenu").on("mouseover",function(){$("#brandsMenu").css("display","block")}),$("#brandsMenu").on("mouseout",function(){$("#brandsMenu").css("display","none")}),$(".typeLink").on("click",function(){$("#typesMenu").css("display","block")}),$("#typesMenu").on("mouseover",function(){$("#typesMenu").css("display","block")}),$("#typesMenu").on("mouseout",function(){$("#typesMenu").css("display","none")})}),$(function(){$("#search-box").focus();var i=instantsearch({appId:"W8I2YD0GJC",apiKey:"861d0757703675d68f5a0f915072381b",indexName:"tech_shop_data"});i.addWidget(instantsearch.widgets.searchBox({container:"#search-box",placeholder:"Search for products..."})),i.addWidget(instantsearch.widgets.hits({container:"#hits-container",cssClasses:{item:"productItem"},hitsPerPage:50,templates:{item:function(i){return i.popularity>=0&&i.popularity<1e3?(i.popularity="☆☆",'<img id="prodPic" src="'+i.image+'" alt="bestbuy item"><div class="row"><span id="popularity"><h4>'+i.popularity+' 2/5</h4></span></div><div class="row"><p id="price">$'+i.price+'</p></div><div class="row"><a href="'+i.url+'"><button class="btn btn-success btn-lg">Buy</button></a></div><h1 id="title">'+i.name+'</h1><p id="description">'+i.description+"</p>"):i.popularity>=1e3&&i.popularity<5e3?(i.popularity="☆☆☆",'<img id="prodPic" src="'+i.image+'" alt="bestbuy item"><div class="row"><span id="popularity"><h4>'+i.popularity+' 3/5</h4></div></span><div class="row"><p id="price">$'+i.price+'</p></div><div class="row"><a href="'+i.url+'"><button class="btn btn-success btn-lg">Buy</button></a></div><h1 id="title">'+i.name+'</h1><p id="description">'+i.description+"</p>"):i.popularity>=5e3&&i.popularity<8e3?(i.popularity="☆☆☆☆",'<img id="prodPic" src="'+i.image+'" alt="bestbuy item"><div class="row"><span id="popularity"><h4>'+i.popularity+' 4/5</h4></div></span><div class="row"><p id="price">$'+i.price+'</p></div><div class="row"><a href="'+i.url+'"><button class="btn btn-success btn-lg">Buy</button></a></div><h1 id="title">'+i.name+'</h1><p id="description">'+i.description+"</p>"):(i.popularity="☆☆☆☆☆",'<img id="prodPic" src="'+i.image+'" alt="bestbuy item"><div class="row"><span id="popularity"><h4>'+i.popularity+' 5/5</h4></div></span><div class="row"><p id="price">$'+i.price+'</p></div><div class="row"><a href="'+i.url+'"><button class="btn  btn-success btn-lg">Buy</button></a></div><h1 id="title">'+i.name+'</h1><p id="description">'+i.description+"</p>")},empty:'<div id="notFoundContainer"><h1 id="notFoundHeader">Sorry Snoopy cannot find what you seek...</h1><img id="notFound" src="notFound.gif"></div>'}})),i.addWidget(instantsearch.widgets.refinementList({container:"#categoryMenu",attributeName:"categories",operator:"or",limit:10,cssClasses:{list:"categoryList",label:"checkbox-inline",count:"count",item:"lineItem"}})),i.addWidget(instantsearch.widgets.rangeSlider({container:"#priceMenu",attributeName:"price",tooltips:{format:function(i){return"$"+Math.floor(i)},min:-1,max:5e3}})),i.addWidget(instantsearch.widgets.refinementList({container:"#brandsMenu",attributeName:"brand",operator:"or",limit:10,cssClasses:{list:"brandsList",label:"checkbox-inline",count:"count",item:"lineItem"}})),i.addWidget(instantsearch.widgets.refinementList({container:"#typesMenu",attributeName:"type",operator:"or",limit:10,cssClasses:{list:"typesList",label:"checkbox-inline",count:"count",item:"lineItem"}})),i.addWidget(instantsearch.widgets.pagination({container:"#pagination-container",scrollTo:"#search-box",cssClasses:{root:"page",link:"num"}})),i.addWidget(instantsearch.widgets.stats({container:"#stats"})),i.addWidget(instantsearch.widgets.sortBySelector({container:"#sort-by",autoHideContainer:!0,indices:[{name:"tech_shop_data",label:"Most popular"},{name:"tech_shop_data_price_asc",label:"Lowest price"},{name:"tech_shop_data_price_desc",label:"Highest price"}],cssClasses:{root:"dropdown"}})),i.start(),$(".categoryLink").on("click",function(){$("#categoryMenu").css("display","block")}),$("#categoryMenu").on("mouseover",function(){$("#categoryMenu").css("display","block")}),$("#categoryMenu").on("mouseout",function(){$("#categoryMenu").css("display","none")}),$(".priceLink").on("click",function(){$("#priceMenu").css("display","block")}),$("#priceMenu").on("mouseover",function(){$("#priceMenu").css("display","block")}),$("#priceMenu").on("mouseout",function(){$("#priceMenu").css("display","none")}),$(".brandLink").on("click",function(){$("#brandsMenu").css("display","block")}),$("#brandsMenu").on("mouseover",function(){$("#brandsMenu").css("display","block")}),$("#brandsMenu").on("mouseout",function(){$("#brandsMenu").css("display","none")}),$(".typeLink").on("click",function(){$("#typesMenu").css("display","block")}),$("#typesMenu").on("mouseover",function(){$("#typesMenu").css("display","block")}),$("#typesMenu").on("mouseout",function(){$("#typesMenu").css("display","none")})});


// add scripts
$(function() {

	//set focus on search on page load
	$("#search-box").focus();

	// algolia instantsearch widgets
	var search = instantsearch({
	       appId: 'W8I2YD0GJC',
	       apiKey: '861d0757703675d68f5a0f915072381b',
	       indexName: 'tech_shop_data'
	});

	//searchbar
	search.addWidget(
             instantsearch.widgets.searchBox({
               container: '#search-box',
               placeholder: 'Search for products...'
             })
            );

	//product tiles 
	search.addWidget(
	  instantsearch.widgets.hits({
	    container: '#hits-container',
	    cssClasses:{
	    	item: "productItem"
	    		},
	    hitsPerPage: 50,
	    templates: {
	      item: function(data){
	      	if(data.popularity >= 0 && data.popularity < 1000){
	      		data.popularity = '☆☆';
			return '<img id="prodPic" src="'+ data.image +'" alt="bestbuy item"><div class="row"><span id="popularity"><h4>'+data.popularity+' 2/5</h4></span></div><div class="row"><p id="price">$'+data.price+'</p></div><div class="row"><a href="'+data.url+'"><button class="btn btn-success btn-lg">Buy</button></a></div><h1 id="title">'+data.name+'</h1><p id="description">'+data.description+'</p>';

		}else if(data.popularity >= 1000 && data.popularity < 5000 ){
	      		data.popularity = '☆☆☆';
			return '<img id="prodPic" src="'+ data.image +'" alt="bestbuy item"><div class="row"><span id="popularity"><h4>'+data.popularity+' 3/5</h4></div></span><div class="row"><p id="price">$'+data.price+'</p></div><div class="row"><a href="'+data.url+'"><button class="btn btn-success btn-lg">Buy</button></a></div><h1 id="title">'+data.name+'</h1><p id="description">'+data.description+'</p>';

	     	}else if(data.popularity >= 5000 && data.popularity < 8000 ){
	      		data.popularity = '☆☆☆☆';
			return '<img id="prodPic" src="'+ data.image +'" alt="bestbuy item"><div class="row"><span id="popularity"><h4>'+data.popularity+' 4/5</h4></div></span><div class="row"><p id="price">$'+data.price+'</p></div><div class="row"><a href="'+data.url+'"><button class="btn btn-success btn-lg">Buy</button></a></div><h1 id="title">'+data.name+'</h1><p id="description">'+data.description+'</p>';

	     	}else{
	      		data.popularity = '☆☆☆☆☆';
			return '<img id="prodPic" src="'+ data.image +'" alt="bestbuy item"><div class="row"><span id="popularity"><h4>'+data.popularity+' 5/5</h4></div></span><div class="row"><p id="price">$'+data.price+'</p></div><div class="row"><a href="'+data.url+'"><button class="btn  btn-success btn-lg">Buy</button></a></div><h1 id="title">'+data.name+'</h1><p id="description">'+data.description+'</p>';
	     	}

	       },
	       empty: '<div id="notFoundContainer"><h1 id="notFoundHeader">Sorry Snoopy cannot find what you seek...</h1><img id="notFound" src="notFound.gif"></div>'	
	    }
	  })
	);


	//categories menu
	search.addWidget(
	  instantsearch.widgets.refinementList({
	    container: '#categoryMenu',
	    attributeName: 'categories',
	    operator: 'or',
	    limit: 10,
	    cssClasses:{
	    	list: 'categoryList',
	    	label: 'checkbox-inline',
	    	count:'count',
	    	item: 'lineItem'
	    }
	  })
	  );

	//price range bar
	search.addWidget(
	  instantsearch.widgets.rangeSlider({
	    container: '#priceMenu',
	    attributeName: 'price',
	    tooltips: {
	      format: function(formattedValue) {
	        return '$' + Math.floor(formattedValue);
	      },
	      min:-1,
	      max: 5000,
	    }
	  })
	);

	//brands menu
	search.addWidget(
	  instantsearch.widgets.refinementList({
	    container: '#brandsMenu',
	    attributeName: 'brand',
	    operator: 'or',
	    limit: 10,
	    cssClasses:{
	    	list: 'brandsList',
	    	label: 'checkbox-inline',
	    	count:'count',
	    	item: 'lineItem'
	    }
	  })
	);	

	//types menu
	search.addWidget(
	  instantsearch.widgets.refinementList({
	    container: '#typesMenu',
	    attributeName: 'type',
	    operator: 'or',
	    limit: 10,
	    cssClasses:{
	    	list: 'typesList',
	    	label: 'checkbox-inline',
	    	count:'count',
	    	item: 'lineItem'
	    }
	  })
	);

	//pagination footer
	search.addWidget(
	  instantsearch.widgets.pagination({
	    container: '#pagination-container',
	     scrollTo: '#search-box',
	     cssClasses: {
	     	root:"page",
	     	link:"num"
	     }
	  })
	);

	search.addWidget(
	  instantsearch.widgets.stats({
	    container: '#stats'
	  })
	);

	search.addWidget(
	  instantsearch.widgets.sortBySelector({
	    container: '#sort-by',
	    autoHideContainer: true,
	    indices: [{
	      name: "tech_shop_data", label: 'Most popular'
	    }, {
	      name: "tech_shop_data" + '_price_asc', label: 'Lowest price'
	    }, {
	      name: "tech_shop_data" + '_price_desc', label: 'Highest price'
	    }],
	    cssClasses: {
	  	root: "dropdown"
	     }
	  })
	);

	//call to start searc on page load
	search.start();

	//Navbar animations

	//category menu animations
	$('.categoryLink').on("click", function () {
		$('#categoryMenu').css("display", "block");
	});	

	$('#categoryMenu').on('mouseover', function(){
		$('#categoryMenu').css("display", "block");
	});	

	$('#categoryMenu').on('mouseout', function(){
		$('#categoryMenu').css("display", "none");
	});	


	//price menu animations
	$('.priceLink').on("click", function () {
		$('#priceMenu').css("display", "block");
	});	

	$('#priceMenu').on('mouseover', function(){
		$('#priceMenu').css("display", "block");
	});	

	$('#priceMenu').on('mouseout', function(){
		$('#priceMenu').css("display", "none");
	});	


	//brand menu animations
	$('.brandLink').on("click", function () {
		$('#brandsMenu').css("display", "block");
	});	

	$('#brandsMenu').on('mouseover', function(){
		$('#brandsMenu').css("display", "block");
	});	

	$('#brandsMenu').on('mouseout', function(){
		$('#brandsMenu').css("display", "none");
	});

	//types menu animations
	$('.typeLink').on("click", function () {
		$('#typesMenu').css("display", "block");
	});	

	$('#typesMenu').on('mouseover', function(){
		$('#typesMenu').css("display", "block");
	});	

	$('#typesMenu').on('mouseout', function(){
		$('#typesMenu').css("display", "none");
	});
}); 
$(function(){$("#search-box").focus();var i=instantsearch({appId:"W8I2YD0GJC",apiKey:"861d0757703675d68f5a0f915072381b",indexName:"tech_shop_data"});i.addWidget(instantsearch.widgets.searchBox({container:"#search-box",placeholder:"Search for products..."})),i.addWidget(instantsearch.widgets.hits({container:"#hits-container",cssClasses:{item:"productItem"},hitsPerPage:50,templates:{item:function(i){return i.popularity>=0&&i.popularity<1e3?(i.popularity="☆☆",'<img id="prodPic" src="'+i.image+'" alt="bestbuy item"><div class="row"><span id="popularity"><h4>'+i.popularity+' 2/5</h4></span></div><div class="row"><p id="price">$'+i.price+'</p></div><div class="row"><a href="'+i.url+'"><button class="btn btn-success btn-lg">Buy</button></a></div><h1 id="title">'+i.name+'</h1><p id="description">'+i.description+"</p>"):i.popularity>=1e3&&i.popularity<5e3?(i.popularity="☆☆☆",'<img id="prodPic" src="'+i.image+'" alt="bestbuy item"><div class="row"><span id="popularity"><h4>'+i.popularity+' 3/5</h4></div></span><div class="row"><p id="price">$'+i.price+'</p></div><div class="row"><a href="'+i.url+'"><button class="btn btn-success btn-lg">Buy</button></a></div><h1 id="title">'+i.name+'</h1><p id="description">'+i.description+"</p>"):i.popularity>=5e3&&i.popularity<8e3?(i.popularity="☆☆☆☆",'<img id="prodPic" src="'+i.image+'" alt="bestbuy item"><div class="row"><span id="popularity"><h4>'+i.popularity+' 4/5</h4></div></span><div class="row"><p id="price">$'+i.price+'</p></div><div class="row"><a href="'+i.url+'"><button class="btn btn-success btn-lg">Buy</button></a></div><h1 id="title">'+i.name+'</h1><p id="description">'+i.description+"</p>"):(i.popularity="☆☆☆☆☆",'<img id="prodPic" src="'+i.image+'" alt="bestbuy item"><div class="row"><span id="popularity"><h4>'+i.popularity+' 5/5</h4></div></span><div class="row"><p id="price">$'+i.price+'</p></div><div class="row"><a href="'+i.url+'"><button class="btn  btn-success btn-lg">Buy</button></a></div><h1 id="title">'+i.name+'</h1><p id="description">'+i.description+"</p>")},empty:'<div id="notFoundContainer"><h1 id="notFoundHeader">Sorry Snoopy cannot find what you seek...</h1><img id="notFound" src="notFound.gif"></div>'}})),i.addWidget(instantsearch.widgets.refinementList({container:"#categoryMenu",attributeName:"categories",operator:"or",limit:10,cssClasses:{list:"categoryList",label:"checkbox-inline",count:"count",item:"lineItem"}})),i.addWidget(instantsearch.widgets.rangeSlider({container:"#priceMenu",attributeName:"price",tooltips:{format:function(i){return"$"+Math.floor(i)},min:-1,max:5e3}})),i.addWidget(instantsearch.widgets.refinementList({container:"#brandsMenu",attributeName:"brand",operator:"or",limit:10,cssClasses:{list:"brandsList",label:"checkbox-inline",count:"count",item:"lineItem"}})),i.addWidget(instantsearch.widgets.refinementList({container:"#typesMenu",attributeName:"type",operator:"or",limit:10,cssClasses:{list:"typesList",label:"checkbox-inline",count:"count",item:"lineItem"}})),i.addWidget(instantsearch.widgets.pagination({container:"#pagination-container",scrollTo:"#search-box",cssClasses:{root:"page",link:"num"}})),i.addWidget(instantsearch.widgets.stats({container:"#stats"})),i.addWidget(instantsearch.widgets.sortBySelector({container:"#sort-by",autoHideContainer:!0,indices:[{name:"tech_shop_data",label:"Most popular"},{name:"tech_shop_data_price_asc",label:"Lowest price"},{name:"tech_shop_data_price_desc",label:"Highest price"}],cssClasses:{root:"dropdown"}})),i.start(),$(".categoryLink").on("click",function(){$("#categoryMenu").css("display","block")}),$("#categoryMenu").on("mouseover",function(){$("#categoryMenu").css("display","block")}),$("#categoryMenu").on("mouseout",function(){$("#categoryMenu").css("display","none")}),$(".priceLink").on("click",function(){$("#priceMenu").css("display","block")}),$("#priceMenu").on("mouseover",function(){$("#priceMenu").css("display","block")}),$("#priceMenu").on("mouseout",function(){$("#priceMenu").css("display","none")}),$(".brandLink").on("click",function(){$("#brandsMenu").css("display","block")}),$("#brandsMenu").on("mouseover",function(){$("#brandsMenu").css("display","block")}),$("#brandsMenu").on("mouseout",function(){$("#brandsMenu").css("display","none")}),$(".typeLink").on("click",function(){$("#typesMenu").css("display","block")}),$("#typesMenu").on("mouseover",function(){$("#typesMenu").css("display","block")}),$("#typesMenu").on("mouseout",function(){$("#typesMenu").css("display","none")})}),$(function(){$("#search-box").focus();var i=instantsearch({appId:"W8I2YD0GJC",apiKey:"861d0757703675d68f5a0f915072381b",indexName:"tech_shop_data"});i.addWidget(instantsearch.widgets.searchBox({container:"#search-box",placeholder:"Search for products..."})),i.addWidget(instantsearch.widgets.hits({container:"#hits-container",cssClasses:{item:"productItem"},hitsPerPage:50,templates:{item:function(i){return i.popularity>=0&&i.popularity<1e3?(i.popularity="☆☆",'<img id="prodPic" src="'+i.image+'" alt="bestbuy item"><div class="row"><span id="popularity"><h4>'+i.popularity+' 2/5</h4></span></div><div class="row"><p id="price">$'+i.price+'</p></div><div class="row"><a href="'+i.url+'"><button class="btn btn-success btn-lg">Buy</button></a></div><h1 id="title">'+i.name+'</h1><p id="description">'+i.description+"</p>"):i.popularity>=1e3&&i.popularity<5e3?(i.popularity="☆☆☆",'<img id="prodPic" src="'+i.image+'" alt="bestbuy item"><div class="row"><span id="popularity"><h4>'+i.popularity+' 3/5</h4></div></span><div class="row"><p id="price">$'+i.price+'</p></div><div class="row"><a href="'+i.url+'"><button class="btn btn-success btn-lg">Buy</button></a></div><h1 id="title">'+i.name+'</h1><p id="description">'+i.description+"</p>"):i.popularity>=5e3&&i.popularity<8e3?(i.popularity="☆☆☆☆",'<img id="prodPic" src="'+i.image+'" alt="bestbuy item"><div class="row"><span id="popularity"><h4>'+i.popularity+' 4/5</h4></div></span><div class="row"><p id="price">$'+i.price+'</p></div><div class="row"><a href="'+i.url+'"><button class="btn btn-success btn-lg">Buy</button></a></div><h1 id="title">'+i.name+'</h1><p id="description">'+i.description+"</p>"):(i.popularity="☆☆☆☆☆",'<img id="prodPic" src="'+i.image+'" alt="bestbuy item"><div class="row"><span id="popularity"><h4>'+i.popularity+' 5/5</h4></div></span><div class="row"><p id="price">$'+i.price+'</p></div><div class="row"><a href="'+i.url+'"><button class="btn  btn-success btn-lg">Buy</button></a></div><h1 id="title">'+i.name+'</h1><p id="description">'+i.description+"</p>")},empty:'<div id="notFoundContainer"><h1 id="notFoundHeader">Sorry Snoopy cannot find what you seek...</h1><img id="notFound" src="notFound.gif"></div>'}})),i.addWidget(instantsearch.widgets.refinementList({container:"#categoryMenu",attributeName:"categories",operator:"or",limit:10,cssClasses:{list:"categoryList",label:"checkbox-inline",count:"count",item:"lineItem"}})),i.addWidget(instantsearch.widgets.rangeSlider({container:"#priceMenu",attributeName:"price",tooltips:{format:function(i){return"$"+Math.floor(i)},min:-1,max:5e3}})),i.addWidget(instantsearch.widgets.refinementList({container:"#brandsMenu",attributeName:"brand",operator:"or",limit:10,cssClasses:{list:"brandsList",label:"checkbox-inline",count:"count",item:"lineItem"}})),i.addWidget(instantsearch.widgets.refinementList({container:"#typesMenu",attributeName:"type",operator:"or",limit:10,cssClasses:{list:"typesList",label:"checkbox-inline",count:"count",item:"lineItem"}})),i.addWidget(instantsearch.widgets.pagination({container:"#pagination-container",scrollTo:"#search-box",cssClasses:{root:"page",link:"num"}})),i.addWidget(instantsearch.widgets.stats({container:"#stats"})),i.addWidget(instantsearch.widgets.sortBySelector({container:"#sort-by",autoHideContainer:!0,indices:[{name:"tech_shop_data",label:"Most popular"},{name:"tech_shop_data_price_asc",label:"Lowest price"},{name:"tech_shop_data_price_desc",label:"Highest price"}],cssClasses:{root:"dropdown"}})),i.start(),$(".categoryLink").on("click",function(){$("#categoryMenu").css("display","block")}),$("#categoryMenu").on("mouseover",function(){$("#categoryMenu").css("display","block")}),$("#categoryMenu").on("mouseout",function(){$("#categoryMenu").css("display","none")}),$(".priceLink").on("click",function(){$("#priceMenu").css("display","block")}),$("#priceMenu").on("mouseover",function(){$("#priceMenu").css("display","block")}),$("#priceMenu").on("mouseout",function(){$("#priceMenu").css("display","none")}),$(".brandLink").on("click",function(){$("#brandsMenu").css("display","block")}),$("#brandsMenu").on("mouseover",function(){$("#brandsMenu").css("display","block")}),$("#brandsMenu").on("mouseout",function(){$("#brandsMenu").css("display","none")}),$(".typeLink").on("click",function(){$("#typesMenu").css("display","block")}),$("#typesMenu").on("mouseover",function(){$("#typesMenu").css("display","block")}),$("#typesMenu").on("mouseout",function(){$("#typesMenu").css("display","none")})}),$(function(){$("#search-box").focus();var i=instantsearch({appId:"W8I2YD0GJC",apiKey:"861d0757703675d68f5a0f915072381b",indexName:"tech_shop_data"});i.addWidget(instantsearch.widgets.searchBox({container:"#search-box",placeholder:"Search for products..."})),i.addWidget(instantsearch.widgets.hits({container:"#hits-container",cssClasses:{item:"productItem"},hitsPerPage:50,templates:{item:function(i){return i.popularity>=0&&i.popularity<1e3?(i.popularity="☆☆",'<img id="prodPic" src="'+i.image+'" alt="bestbuy item"><div class="row"><span id="popularity"><h4>'+i.popularity+' 2/5</h4></span></div><div class="row"><p id="price">$'+i.price+'</p></div><div class="row"><a href="'+i.url+'"><button class="btn btn-success btn-lg">Buy</button></a></div><h1 id="title">'+i.name+'</h1><p id="description">'+i.description+"</p>"):i.popularity>=1e3&&i.popularity<5e3?(i.popularity="☆☆☆",'<img id="prodPic" src="'+i.image+'" alt="bestbuy item"><div class="row"><span id="popularity"><h4>'+i.popularity+' 3/5</h4></div></span><div class="row"><p id="price">$'+i.price+'</p></div><div class="row"><a href="'+i.url+'"><button class="btn btn-success btn-lg">Buy</button></a></div><h1 id="title">'+i.name+'</h1><p id="description">'+i.description+"</p>"):i.popularity>=5e3&&i.popularity<8e3?(i.popularity="☆☆☆☆",'<img id="prodPic" src="'+i.image+'" alt="bestbuy item"><div class="row"><span id="popularity"><h4>'+i.popularity+' 4/5</h4></div></span><div class="row"><p id="price">$'+i.price+'</p></div><div class="row"><a href="'+i.url+'"><button class="btn btn-success btn-lg">Buy</button></a></div><h1 id="title">'+i.name+'</h1><p id="description">'+i.description+"</p>"):(i.popularity="☆☆☆☆☆",'<img id="prodPic" src="'+i.image+'" alt="bestbuy item"><div class="row"><span id="popularity"><h4>'+i.popularity+' 5/5</h4></div></span><div class="row"><p id="price">$'+i.price+'</p></div><div class="row"><a href="'+i.url+'"><button class="btn  btn-success btn-lg">Buy</button></a></div><h1 id="title">'+i.name+'</h1><p id="description">'+i.description+"</p>")},empty:'<div id="notFoundContainer"><h1 id="notFoundHeader">Sorry Snoopy cannot find what you seek...</h1><img id="notFound" src="notFound.gif"></div>'}})),i.addWidget(instantsearch.widgets.refinementList({container:"#categoryMenu",attributeName:"categories",operator:"or",limit:10,cssClasses:{list:"categoryList",label:"checkbox-inline",count:"count",item:"lineItem"}})),i.addWidget(instantsearch.widgets.rangeSlider({container:"#priceMenu",attributeName:"price",tooltips:{format:function(i){return"$"+Math.floor(i)},min:-1,max:5e3}})),i.addWidget(instantsearch.widgets.refinementList({container:"#brandsMenu",attributeName:"brand",operator:"or",limit:10,cssClasses:{list:"brandsList",label:"checkbox-inline",count:"count",item:"lineItem"}})),i.addWidget(instantsearch.widgets.refinementList({container:"#typesMenu",attributeName:"type",operator:"or",limit:10,cssClasses:{list:"typesList",label:"checkbox-inline",count:"count",item:"lineItem"}})),i.addWidget(instantsearch.widgets.pagination({container:"#pagination-container",scrollTo:"#search-box",cssClasses:{root:"page",link:"num"}})),i.addWidget(instantsearch.widgets.stats({container:"#stats"})),i.addWidget(instantsearch.widgets.sortBySelector({container:"#sort-by",autoHideContainer:!0,indices:[{name:"tech_shop_data",label:"Most popular"},{name:"tech_shop_data_price_asc",label:"Lowest price"},{name:"tech_shop_data_price_desc",label:"Highest price"}],cssClasses:{root:"dropdown"}})),i.start(),$(".categoryLink").on("click",function(){$("#categoryMenu").css("display","block")}),$("#categoryMenu").on("mouseover",function(){$("#categoryMenu").css("display","block")}),$("#categoryMenu").on("mouseout",function(){$("#categoryMenu").css("display","none")}),$(".priceLink").on("click",function(){$("#priceMenu").css("display","block")}),$("#priceMenu").on("mouseover",function(){$("#priceMenu").css("display","block")}),$("#priceMenu").on("mouseout",function(){$("#priceMenu").css("display","none")}),$(".brandLink").on("click",function(){$("#brandsMenu").css("display","block")}),$("#brandsMenu").on("mouseover",function(){$("#brandsMenu").css("display","block")}),$("#brandsMenu").on("mouseout",function(){$("#brandsMenu").css("display","none")}),$(".typeLink").on("click",function(){$("#typesMenu").css("display","block")}),$("#typesMenu").on("mouseover",function(){$("#typesMenu").css("display","block")}),$("#typesMenu").on("mouseout",function(){$("#typesMenu").css("display","none")})}),$(function(){$("#search-box").focus();var i=instantsearch({appId:"W8I2YD0GJC",apiKey:"861d0757703675d68f5a0f915072381b",indexName:"tech_shop_data"});i.addWidget(instantsearch.widgets.searchBox({container:"#search-box",placeholder:"Search for products..."})),i.addWidget(instantsearch.widgets.hits({container:"#hits-container",cssClasses:{item:"productItem"},hitsPerPage:50,templates:{item:function(i){return i.popularity>=0&&i.popularity<1e3?(i.popularity="☆☆",'<img id="prodPic" src="'+i.image+'" alt="bestbuy item"><div class="row"><span id="popularity"><h4>'+i.popularity+' 2/5</h4></span></div><div class="row"><p id="price">$'+i.price+'</p></div><div class="row"><a href="'+i.url+'"><button class="btn btn-success btn-lg">Buy</button></a></div><h1 id="title">'+i.name+'</h1><p id="description">'+i.description+"</p>"):i.popularity>=1e3&&i.popularity<5e3?(i.popularity="☆☆☆",'<img id="prodPic" src="'+i.image+'" alt="bestbuy item"><div class="row"><span id="popularity"><h4>'+i.popularity+' 3/5</h4></div></span><div class="row"><p id="price">$'+i.price+'</p></div><div class="row"><a href="'+i.url+'"><button class="btn btn-success btn-lg">Buy</button></a></div><h1 id="title">'+i.name+'</h1><p id="description">'+i.description+"</p>"):i.popularity>=5e3&&i.popularity<8e3?(i.popularity="☆☆☆☆",'<img id="prodPic" src="'+i.image+'" alt="bestbuy item"><div class="row"><span id="popularity"><h4>'+i.popularity+' 4/5</h4></div></span><div class="row"><p id="price">$'+i.price+'</p></div><div class="row"><a href="'+i.url+'"><button class="btn btn-success btn-lg">Buy</button></a></div><h1 id="title">'+i.name+'</h1><p id="description">'+i.description+"</p>"):(i.popularity="☆☆☆☆☆",'<img id="prodPic" src="'+i.image+'" alt="bestbuy item"><div class="row"><span id="popularity"><h4>'+i.popularity+' 5/5</h4></div></span><div class="row"><p id="price">$'+i.price+'</p></div><div class="row"><a href="'+i.url+'"><button class="btn  btn-success btn-lg">Buy</button></a></div><h1 id="title">'+i.name+'</h1><p id="description">'+i.description+"</p>")},empty:'<div id="notFoundContainer"><h1 id="notFoundHeader">Sorry Snoopy cannot find what you seek...</h1><img id="notFound" src="notFound.gif"></div>'}})),i.addWidget(instantsearch.widgets.refinementList({container:"#categoryMenu",attributeName:"categories",operator:"or",limit:10,cssClasses:{list:"categoryList",label:"checkbox-inline",count:"count",item:"lineItem"}})),i.addWidget(instantsearch.widgets.rangeSlider({container:"#priceMenu",attributeName:"price",tooltips:{format:function(i){return"$"+Math.floor(i)},min:-1,max:5e3}})),i.addWidget(instantsearch.widgets.refinementList({container:"#brandsMenu",attributeName:"brand",operator:"or",limit:10,cssClasses:{list:"brandsList",label:"checkbox-inline",count:"count",item:"lineItem"}})),i.addWidget(instantsearch.widgets.refinementList({container:"#typesMenu",attributeName:"type",operator:"or",limit:10,cssClasses:{list:"typesList",label:"checkbox-inline",count:"count",item:"lineItem"}})),i.addWidget(instantsearch.widgets.pagination({container:"#pagination-container",scrollTo:"#search-box",cssClasses:{root:"page",link:"num"}})),i.addWidget(instantsearch.widgets.stats({container:"#stats"})),i.addWidget(instantsearch.widgets.sortBySelector({container:"#sort-by",autoHideContainer:!0,indices:[{name:"tech_shop_data",label:"Most popular"},{name:"tech_shop_data_price_asc",label:"Lowest price"},{name:"tech_shop_data_price_desc",label:"Highest price"}],cssClasses:{root:"dropdown"}})),i.start(),$(".categoryLink").on("click",function(){$("#categoryMenu").css("display","block")}),$("#categoryMenu").on("mouseover",function(){$("#categoryMenu").css("display","block")}),$("#categoryMenu").on("mouseout",function(){$("#categoryMenu").css("display","none")}),$(".priceLink").on("click",function(){$("#priceMenu").css("display","block")}),$("#priceMenu").on("mouseover",function(){$("#priceMenu").css("display","block")}),$("#priceMenu").on("mouseout",function(){$("#priceMenu").css("display","none")}),$(".brandLink").on("click",function(){$("#brandsMenu").css("display","block")}),$("#brandsMenu").on("mouseover",function(){$("#brandsMenu").css("display","block")}),$("#brandsMenu").on("mouseout",function(){$("#brandsMenu").css("display","none")}),$(".typeLink").on("click",function(){$("#typesMenu").css("display","block")}),$("#typesMenu").on("mouseover",function(){$("#typesMenu").css("display","block")}),$("#typesMenu").on("mouseout",function(){$("#typesMenu").css("display","none")})}),$(function(){$("#search-box").focus();var i=instantsearch({appId:"W8I2YD0GJC",apiKey:"861d0757703675d68f5a0f915072381b",indexName:"tech_shop_data"});i.addWidget(instantsearch.widgets.searchBox({container:"#search-box",placeholder:"Search for products..."})),i.addWidget(instantsearch.widgets.hits({container:"#hits-container",cssClasses:{item:"productItem"},hitsPerPage:50,templates:{item:function(i){return i.popularity>=0&&i.popularity<1e3?(i.popularity="☆☆",'<img id="prodPic" src="'+i.image+'" alt="bestbuy item"><div class="row"><span id="popularity"><h4>'+i.popularity+' 2/5</h4></span></div><div class="row"><p id="price">$'+i.price+'</p></div><div class="row"><a href="'+i.url+'"><button class="btn btn-success btn-lg">Buy</button></a></div><h1 id="title">'+i.name+'</h1><p id="description">'+i.description+"</p>"):i.popularity>=1e3&&i.popularity<5e3?(i.popularity="☆☆☆",'<img id="prodPic" src="'+i.image+'" alt="bestbuy item"><div class="row"><span id="popularity"><h4>'+i.popularity+' 3/5</h4></div></span><div class="row"><p id="price">$'+i.price+'</p></div><div class="row"><a href="'+i.url+'"><button class="btn btn-success btn-lg">Buy</button></a></div><h1 id="title">'+i.name+'</h1><p id="description">'+i.description+"</p>"):i.popularity>=5e3&&i.popularity<8e3?(i.popularity="☆☆☆☆",'<img id="prodPic" src="'+i.image+'" alt="bestbuy item"><div class="row"><span id="popularity"><h4>'+i.popularity+' 4/5</h4></div></span><div class="row"><p id="price">$'+i.price+'</p></div><div class="row"><a href="'+i.url+'"><button class="btn btn-success btn-lg">Buy</button></a></div><h1 id="title">'+i.name+'</h1><p id="description">'+i.description+"</p>"):(i.popularity="☆☆☆☆☆",'<img id="prodPic" src="'+i.image+'" alt="bestbuy item"><div class="row"><span id="popularity"><h4>'+i.popularity+' 5/5</h4></div></span><div class="row"><p id="price">$'+i.price+'</p></div><div class="row"><a href="'+i.url+'"><button class="btn  btn-success btn-lg">Buy</button></a></div><h1 id="title">'+i.name+'</h1><p id="description">'+i.description+"</p>")},empty:'<div id="notFoundContainer"><h1 id="notFoundHeader">Sorry Snoopy cannot find what you seek...</h1><img id="notFound" src="notFound.gif"></div>'}})),i.addWidget(instantsearch.widgets.refinementList({container:"#categoryMenu",attributeName:"categories",operator:"or",limit:10,cssClasses:{list:"categoryList",label:"checkbox-inline",count:"count",item:"lineItem"}})),i.addWidget(instantsearch.widgets.rangeSlider({container:"#priceMenu",attributeName:"price",tooltips:{format:function(i){return"$"+Math.floor(i)},min:-1,max:5e3}})),i.addWidget(instantsearch.widgets.refinementList({container:"#brandsMenu",attributeName:"brand",operator:"or",limit:10,cssClasses:{list:"brandsList",label:"checkbox-inline",count:"count",item:"lineItem"}})),i.addWidget(instantsearch.widgets.refinementList({container:"#typesMenu",attributeName:"type",operator:"or",limit:10,cssClasses:{list:"typesList",label:"checkbox-inline",count:"count",item:"lineItem"}})),i.addWidget(instantsearch.widgets.pagination({container:"#pagination-container",scrollTo:"#search-box",cssClasses:{root:"page",link:"num"}})),i.addWidget(instantsearch.widgets.stats({container:"#stats"})),i.addWidget(instantsearch.widgets.sortBySelector({container:"#sort-by",autoHideContainer:!0,indices:[{name:"tech_shop_data",label:"Most popular"},{name:"tech_shop_data_price_asc",label:"Lowest price"},{name:"tech_shop_data_price_desc",label:"Highest price"}],cssClasses:{root:"dropdown"}})),i.start(),$(".categoryLink").on("click",function(){$("#categoryMenu").css("display","block")}),$("#categoryMenu").on("mouseover",function(){$("#categoryMenu").css("display","block")}),$("#categoryMenu").on("mouseout",function(){$("#categoryMenu").css("display","none")}),$(".priceLink").on("click",function(){$("#priceMenu").css("display","block")}),$("#priceMenu").on("mouseover",function(){$("#priceMenu").css("display","block")}),$("#priceMenu").on("mouseout",function(){$("#priceMenu").css("display","none")}),$(".brandLink").on("click",function(){$("#brandsMenu").css("display","block")}),$("#brandsMenu").on("mouseover",function(){$("#brandsMenu").css("display","block")}),$("#brandsMenu").on("mouseout",function(){$("#brandsMenu").css("display","none")}),$(".typeLink").on("click",function(){$("#typesMenu").css("display","block")}),$("#typesMenu").on("mouseover",function(){$("#typesMenu").css("display","block")}),$("#typesMenu").on("mouseout",function(){$("#typesMenu").css("display","none")})}),$(function(){$("#search-box").focus();var i=instantsearch({appId:"W8I2YD0GJC",apiKey:"861d0757703675d68f5a0f915072381b",indexName:"tech_shop_data"});i.addWidget(instantsearch.widgets.searchBox({container:"#search-box",placeholder:"Search for products..."})),i.addWidget(instantsearch.widgets.hits({container:"#hits-container",cssClasses:{item:"productItem"},hitsPerPage:50,templates:{item:function(i){return i.popularity>=0&&i.popularity<1e3?(i.popularity="☆☆",'<img id="prodPic" src="'+i.image+'" alt="bestbuy item"><div class="row"><span id="popularity"><h4>'+i.popularity+' 2/5</h4></span></div><div class="row"><p id="price">$'+i.price+'</p></div><div class="row"><a href="'+i.url+'"><button class="btn btn-success btn-lg">Buy</button></a></div><h1 id="title">'+i.name+'</h1><p id="description">'+i.description+"</p>"):i.popularity>=1e3&&i.popularity<5e3?(i.popularity="☆☆☆",'<img id="prodPic" src="'+i.image+'" alt="bestbuy item"><div class="row"><span id="popularity"><h4>'+i.popularity+' 3/5</h4></div></span><div class="row"><p id="price">$'+i.price+'</p></div><div class="row"><a href="'+i.url+'"><button class="btn btn-success btn-lg">Buy</button></a></div><h1 id="title">'+i.name+'</h1><p id="description">'+i.description+"</p>"):i.popularity>=5e3&&i.popularity<8e3?(i.popularity="☆☆☆☆",'<img id="prodPic" src="'+i.image+'" alt="bestbuy item"><div class="row"><span id="popularity"><h4>'+i.popularity+' 4/5</h4></div></span><div class="row"><p id="price">$'+i.price+'</p></div><div class="row"><a href="'+i.url+'"><button class="btn btn-success btn-lg">Buy</button></a></div><h1 id="title">'+i.name+'</h1><p id="description">'+i.description+"</p>"):(i.popularity="☆☆☆☆☆",'<img id="prodPic" src="'+i.image+'" alt="bestbuy item"><div class="row"><span id="popularity"><h4>'+i.popularity+' 5/5</h4></div></span><div class="row"><p id="price">$'+i.price+'</p></div><div class="row"><a href="'+i.url+'"><button class="btn  btn-success btn-lg">Buy</button></a></div><h1 id="title">'+i.name+'</h1><p id="description">'+i.description+"</p>")},empty:'<div id="notFoundContainer"><h1 id="notFoundHeader">Sorry Snoopy cannot find what you seek...</h1><img id="notFound" src="notFound.gif"></div>'}})),i.addWidget(instantsearch.widgets.refinementList({container:"#categoryMenu",attributeName:"categories",operator:"or",limit:10,cssClasses:{list:"categoryList",label:"checkbox-inline",count:"count",item:"lineItem"}})),i.addWidget(instantsearch.widgets.rangeSlider({container:"#priceMenu",attributeName:"price",tooltips:{format:function(i){return"$"+Math.floor(i)},min:-1,max:5e3}})),i.addWidget(instantsearch.widgets.refinementList({container:"#brandsMenu",attributeName:"brand",operator:"or",limit:10,cssClasses:{list:"brandsList",label:"checkbox-inline",count:"count",item:"lineItem"}})),i.addWidget(instantsearch.widgets.refinementList({container:"#typesMenu",attributeName:"type",operator:"or",limit:10,cssClasses:{list:"typesList",label:"checkbox-inline",count:"count",item:"lineItem"}})),i.addWidget(instantsearch.widgets.pagination({container:"#pagination-container",scrollTo:"#search-box",cssClasses:{root:"page",link:"num"}})),i.addWidget(instantsearch.widgets.stats({container:"#stats"})),i.addWidget(instantsearch.widgets.sortBySelector({container:"#sort-by",autoHideContainer:!0,indices:[{name:"tech_shop_data",label:"Most popular"},{name:"tech_shop_data_price_asc",label:"Lowest price"},{name:"tech_shop_data_price_desc",label:"Highest price"}],cssClasses:{root:"dropdown"}})),i.start(),$(".categoryLink").on("click",function(){$("#categoryMenu").css("display","block")}),$("#categoryMenu").on("mouseover",function(){$("#categoryMenu").css("display","block")}),$("#categoryMenu").on("mouseout",function(){$("#categoryMenu").css("display","none")}),$(".priceLink").on("click",function(){$("#priceMenu").css("display","block")}),$("#priceMenu").on("mouseover",function(){$("#priceMenu").css("display","block")}),$("#priceMenu").on("mouseout",function(){$("#priceMenu").css("display","none")}),$(".brandLink").on("click",function(){$("#brandsMenu").css("display","block")}),$("#brandsMenu").on("mouseover",function(){$("#brandsMenu").css("display","block")}),$("#brandsMenu").on("mouseout",function(){$("#brandsMenu").css("display","none")}),$(".typeLink").on("click",function(){$("#typesMenu").css("display","block")}),$("#typesMenu").on("mouseover",function(){$("#typesMenu").css("display","block")}),$("#typesMenu").on("mouseout",function(){$("#typesMenu").css("display","none")})}),$(function(){$("#search-box").focus();var i=instantsearch({appId:"W8I2YD0GJC",apiKey:"861d0757703675d68f5a0f915072381b",indexName:"tech_shop_data"});i.addWidget(instantsearch.widgets.searchBox({container:"#search-box",placeholder:"Search for products..."})),i.addWidget(instantsearch.widgets.hits({container:"#hits-container",cssClasses:{item:"productItem"},hitsPerPage:50,templates:{item:function(i){return i.popularity>=0&&i.popularity<1e3?(i.popularity="☆☆",'<img id="prodPic" src="'+i.image+'" alt="bestbuy item"><div class="row"><span id="popularity"><h4>'+i.popularity+' 2/5</h4></span></div><div class="row"><p id="price">$'+i.price+'</p></div><div class="row"><a href="'+i.url+'"><button class="btn btn-success btn-lg">Buy</button></a></div><h1 id="title">'+i.name+'</h1><p id="description">'+i.description+"</p>"):i.popularity>=1e3&&i.popularity<5e3?(i.popularity="☆☆☆",'<img id="prodPic" src="'+i.image+'" alt="bestbuy item"><div class="row"><span id="popularity"><h4>'+i.popularity+' 3/5</h4></div></span><div class="row"><p id="price">$'+i.price+'</p></div><div class="row"><a href="'+i.url+'"><button class="btn btn-success btn-lg">Buy</button></a></div><h1 id="title">'+i.name+'</h1><p id="description">'+i.description+"</p>"):i.popularity>=5e3&&i.popularity<8e3?(i.popularity="☆☆☆☆",'<img id="prodPic" src="'+i.image+'" alt="bestbuy item"><div class="row"><span id="popularity"><h4>'+i.popularity+' 4/5</h4></div></span><div class="row"><p id="price">$'+i.price+'</p></div><div class="row"><a href="'+i.url+'"><button class="btn btn-success btn-lg">Buy</button></a></div><h1 id="title">'+i.name+'</h1><p id="description">'+i.description+"</p>"):(i.popularity="☆☆☆☆☆",'<img id="prodPic" src="'+i.image+'" alt="bestbuy item"><div class="row"><span id="popularity"><h4>'+i.popularity+' 5/5</h4></div></span><div class="row"><p id="price">$'+i.price+'</p></div><div class="row"><a href="'+i.url+'"><button class="btn  btn-success btn-lg">Buy</button></a></div><h1 id="title">'+i.name+'</h1><p id="description">'+i.description+"</p>")},empty:'<div id="notFoundContainer"><h1 id="notFoundHeader">Sorry Snoopy cannot find what you seek...</h1><img id="notFound" src="notFound.gif"></div>'}})),i.addWidget(instantsearch.widgets.refinementList({container:"#categoryMenu",attributeName:"categories",operator:"or",limit:10,cssClasses:{list:"categoryList",label:"checkbox-inline",count:"count",item:"lineItem"}})),i.addWidget(instantsearch.widgets.rangeSlider({container:"#priceMenu",attributeName:"price",tooltips:{format:function(i){return"$"+Math.floor(i)},min:-1,max:5e3}})),i.addWidget(instantsearch.widgets.refinementList({container:"#brandsMenu",attributeName:"brand",operator:"or",limit:10,cssClasses:{list:"brandsList",label:"checkbox-inline",count:"count",item:"lineItem"}})),i.addWidget(instantsearch.widgets.refinementList({container:"#typesMenu",attributeName:"type",operator:"or",limit:10,cssClasses:{list:"typesList",label:"checkbox-inline",count:"count",item:"lineItem"}})),i.addWidget(instantsearch.widgets.pagination({container:"#pagination-container",scrollTo:"#search-box",cssClasses:{root:"page",link:"num"}})),i.addWidget(instantsearch.widgets.stats({container:"#stats"})),i.addWidget(instantsearch.widgets.sortBySelector({container:"#sort-by",autoHideContainer:!0,indices:[{name:"tech_shop_data",label:"Most popular"},{name:"tech_shop_data_price_asc",label:"Lowest price"},{name:"tech_shop_data_price_desc",label:"Highest price"}],cssClasses:{root:"dropdown"}})),i.start(),$(".categoryLink").on("click",function(){$("#categoryMenu").css("display","block")}),$("#categoryMenu").on("mouseover",function(){$("#categoryMenu").css("display","block")}),$("#categoryMenu").on("mouseout",function(){$("#categoryMenu").css("display","none")}),$(".priceLink").on("click",function(){$("#priceMenu").css("display","block")}),$("#priceMenu").on("mouseover",function(){$("#priceMenu").css("display","block")}),$("#priceMenu").on("mouseout",function(){$("#priceMenu").css("display","none")}),$(".brandLink").on("click",function(){$("#brandsMenu").css("display","block")}),$("#brandsMenu").on("mouseover",function(){$("#brandsMenu").css("display","block")}),$("#brandsMenu").on("mouseout",function(){$("#brandsMenu").css("display","none")}),$(".typeLink").on("click",function(){$("#typesMenu").css("display","block")}),$("#typesMenu").on("mouseover",function(){$("#typesMenu").css("display","block")}),$("#typesMenu").on("mouseout",function(){$("#typesMenu").css("display","none")})});


// add scripts
$(function() {

	//set focus on search on page load
	$("#search-box").focus();

	// algolia instantsearch widgets
	var search = instantsearch({
	       appId: 'L309RTZ2UR',
	       apiKey: '7b77008ea319b33cb25e7ecdca09cb33',
	       indexName: 'tech_shop_data'
	});

	//searchbar
	search.addWidget(
             instantsearch.widgets.searchBox({
               container: '#search-box',
               placeholder: 'Search for products...'
             })
            );

	//product tiles 
	search.addWidget(
	  instantsearch.widgets.hits({
	    container: '#hits-container',
	    cssClasses:{
	    	item: "productItem"
	    		},
	    hitsPerPage: 50,
	    templates: {
	      item: function(data){
	      	if(data.popularity >= 0 && data.popularity < 1000){
	      		data.popularity = '★★☆☆☆';
			return '<img id="prodPic" src="'+ data.image +'" alt="bestbuy item"><div class="row"><span id="popularity"><h4>'+data.popularity+' </h4></span></div><div class="row"><p id="price">$'+data.price+'</p></div><div class="row"><a href="'+data.url+'"><button class="btn btn-success btn-lg">Buy</button></a></div><h1 id="title">'+data.name+'</h1><p id="description">'+data.description+'</p>';

		}else if(data.popularity >= 1000 && data.popularity < 5000 ){
	      		data.popularity = '★★★☆☆';
			return '<img id="prodPic" src="'+ data.image +'" alt="bestbuy item"><div class="row"><span id="popularity"><h4>'+data.popularity+' </h4></div></span><div class="row"><p id="price">$'+data.price+'</p></div><div class="row"><a href="'+data.url+'"><button class="btn btn-success btn-lg">Buy</button></a></div><h1 id="title">'+data.name+'</h1><p id="description">'+data.description+'</p>';

	     	}else if(data.popularity >= 5000 && data.popularity < 8000 ){
	      		data.popularity = '★★★★☆';
			return '<img id="prodPic" src="'+ data.image +'" alt="bestbuy item"><div class="row"><span id="popularity"><h4>'+data.popularity+' </h4></div></span><div class="row"><p id="price">$'+data.price+'</p></div><div class="row"><a href="'+data.url+'"><button class="btn btn-success btn-lg">Buy</button></a></div><h1 id="title">'+data.name+'</h1><p id="description">'+data.description+'</p>';

	     	}else{
	      		data.popularity = '★★★★★';
			return '<img id="prodPic" src="'+ data.image +'" alt="bestbuy item"><div class="row"><span id="popularity"><h4>'+data.popularity+' </h4></div></span><div class="row"><p id="price">$'+data.price+'</p></div><div class="row"><a href="'+data.url+'"><button class="btn  btn-success btn-lg">Buy</button></a></div><h1 id="title">'+data.name+'</h1><p id="description">'+data.description+'</p>';
	     	}

	       },
	       empty: '<div id="notFoundContainer"><h1 id="notFoundHeader">Sorry Snoopy cannot find what you seek...</h1><img id="notFound" src="notFound.gif"></div>'	
	    }
	  })
	);


	//categories menu
	search.addWidget(
	  instantsearch.widgets.refinementList({
	    container: '#categoryMenu',
	    attributeName: 'categories',
	    operator: 'or',
	    limit: 10,
	    cssClasses:{
	    	list: 'categoryList',
	    	label: 'checkbox-inline',
	    	count:'count',
	    	item: 'lineItem'
	    }
	  })
	  );

	//price range bar
	search.addWidget(
	  instantsearch.widgets.rangeSlider({
	    container: '#priceMenu',
	    attributeName: 'price',
	    tooltips: {
	      format: function(formattedValue) {
	        return '$' + Math.floor(formattedValue);
	      },
	      min:-1,
	      max: 5000,
	    }
	  })
	);

	//brands menu
	search.addWidget(
	  instantsearch.widgets.refinementList({
	    container: '#brandsMenu',
	    attributeName: 'brand',
	    operator: 'or',
	    limit: 10,
	    cssClasses:{
	    	list: 'brandsList',
	    	label: 'checkbox-inline',
	    	count:'count',
	    	item: 'lineItem'
	    }
	  })
	);	

	//types menu
	search.addWidget(
	  instantsearch.widgets.refinementList({
	    container: '#typesMenu',
	    attributeName: 'type',
	    operator: 'or',
	    limit: 10,
	    cssClasses:{
	    	list: 'typesList',
	    	label: 'checkbox-inline',
	    	count:'count',
	    	item: 'lineItem'
	    }
	  })
	);

	//pagination footer
	search.addWidget(
	  instantsearch.widgets.pagination({
	    container: '#pagination-container',
	     scrollTo: '#search-box',
	     cssClasses: {
	     	root:"page",
	     	link:"num"
	     }
	  })
	);

	search.addWidget(
	  instantsearch.widgets.stats({
	    container: '#stats'
	  })
	);

	search.addWidget(
	  instantsearch.widgets.sortBySelector({
	    container: '#sort-by',
	    autoHideContainer: true,
	    indices: [{
	      name: "tech_shop_data", label: 'Most popular'
	    }, {
	      name: "tech_shop_data" + '_price_asc', label: 'Lowest price'
	    }, {
	      name: "tech_shop_data" + '_price_desc', label: 'Highest price'
	    }],
	    cssClasses: {
	  	root: "dropdown"
	     }
	  })
	);

	//call to start searc on page load
	search.start();

	//Navbar animations

	//category menu animations
	$('.categoryLink').on("click", function () {
		$('#categoryMenu').css("display", "block");
	});	

	$('#categoryMenu').on('mouseover', function(){
		$('#categoryMenu').css("display", "block");
	});	

	$('#categoryMenu').on('mouseout', function(){
		$('#categoryMenu').css("display", "none");
	});	


	//price menu animations
	$('.priceLink').on("click", function () {
		$('#priceMenu').css("display", "block");
	});	

	$('#priceMenu').on('mouseover', function(){
		$('#priceMenu').css("display", "block");
	});	

	$('#priceMenu').on('mouseout', function(){
		$('#priceMenu').css("display", "none");
	});	


	//brand menu animations
	$('.brandLink').on("click", function () {
		$('#brandsMenu').css("display", "block");
	});	

	$('#brandsMenu').on('mouseover', function(){
		$('#brandsMenu').css("display", "block");
	});	

	$('#brandsMenu').on('mouseout', function(){
		$('#brandsMenu').css("display", "none");
	});

	//types menu animations
	$('.typeLink').on("click", function () {
		$('#typesMenu').css("display", "block");
	});	

	$('#typesMenu').on('mouseover', function(){
		$('#typesMenu').css("display", "block");
	});	

	$('#typesMenu').on('mouseout', function(){
		$('#typesMenu').css("display", "none");
	});
}); 
$(function(){$("#search-box").focus();var i=instantsearch({appId:"W8I2YD0GJC",apiKey:"861d0757703675d68f5a0f915072381b",indexName:"tech_shop_data"});i.addWidget(instantsearch.widgets.searchBox({container:"#search-box",placeholder:"Search for products..."})),i.addWidget(instantsearch.widgets.hits({container:"#hits-container",cssClasses:{item:"productItem"},hitsPerPage:50,templates:{item:function(i){return i.popularity>=0&&i.popularity<1e3?(i.popularity="☆☆",'<img id="prodPic" src="'+i.image+'" alt="bestbuy item"><div class="row"><span id="popularity"><h4>'+i.popularity+' 2/5</h4></span></div><div class="row"><p id="price">$'+i.price+'</p></div><div class="row"><a href="'+i.url+'"><button class="btn btn-success btn-lg">Buy</button></a></div><h1 id="title">'+i.name+'</h1><p id="description">'+i.description+"</p>"):i.popularity>=1e3&&i.popularity<5e3?(i.popularity="☆☆☆",'<img id="prodPic" src="'+i.image+'" alt="bestbuy item"><div class="row"><span id="popularity"><h4>'+i.popularity+' 3/5</h4></div></span><div class="row"><p id="price">$'+i.price+'</p></div><div class="row"><a href="'+i.url+'"><button class="btn btn-success btn-lg">Buy</button></a></div><h1 id="title">'+i.name+'</h1><p id="description">'+i.description+"</p>"):i.popularity>=5e3&&i.popularity<8e3?(i.popularity="☆☆☆☆",'<img id="prodPic" src="'+i.image+'" alt="bestbuy item"><div class="row"><span id="popularity"><h4>'+i.popularity+' 4/5</h4></div></span><div class="row"><p id="price">$'+i.price+'</p></div><div class="row"><a href="'+i.url+'"><button class="btn btn-success btn-lg">Buy</button></a></div><h1 id="title">'+i.name+'</h1><p id="description">'+i.description+"</p>"):(i.popularity="☆☆☆☆☆",'<img id="prodPic" src="'+i.image+'" alt="bestbuy item"><div class="row"><span id="popularity"><h4>'+i.popularity+' 5/5</h4></div></span><div class="row"><p id="price">$'+i.price+'</p></div><div class="row"><a href="'+i.url+'"><button class="btn  btn-success btn-lg">Buy</button></a></div><h1 id="title">'+i.name+'</h1><p id="description">'+i.description+"</p>")},empty:'<div id="notFoundContainer"><h1 id="notFoundHeader">Sorry Snoopy cannot find what you seek...</h1><img id="notFound" src="notFound.gif"></div>'}})),i.addWidget(instantsearch.widgets.refinementList({container:"#categoryMenu",attributeName:"categories",operator:"or",limit:10,cssClasses:{list:"categoryList",label:"checkbox-inline",count:"count",item:"lineItem"}})),i.addWidget(instantsearch.widgets.rangeSlider({container:"#priceMenu",attributeName:"price",tooltips:{format:function(i){return"$"+Math.floor(i)},min:-1,max:5e3}})),i.addWidget(instantsearch.widgets.refinementList({container:"#brandsMenu",attributeName:"brand",operator:"or",limit:10,cssClasses:{list:"brandsList",label:"checkbox-inline",count:"count",item:"lineItem"}})),i.addWidget(instantsearch.widgets.refinementList({container:"#typesMenu",attributeName:"type",operator:"or",limit:10,cssClasses:{list:"typesList",label:"checkbox-inline",count:"count",item:"lineItem"}})),i.addWidget(instantsearch.widgets.pagination({container:"#pagination-container",scrollTo:"#search-box",cssClasses:{root:"page",link:"num"}})),i.addWidget(instantsearch.widgets.stats({container:"#stats"})),i.addWidget(instantsearch.widgets.sortBySelector({container:"#sort-by",autoHideContainer:!0,indices:[{name:"tech_shop_data",label:"Most popular"},{name:"tech_shop_data_price_asc",label:"Lowest price"},{name:"tech_shop_data_price_desc",label:"Highest price"}],cssClasses:{root:"dropdown"}})),i.start(),$(".categoryLink").on("click",function(){$("#categoryMenu").css("display","block")}),$("#categoryMenu").on("mouseover",function(){$("#categoryMenu").css("display","block")}),$("#categoryMenu").on("mouseout",function(){$("#categoryMenu").css("display","none")}),$(".priceLink").on("click",function(){$("#priceMenu").css("display","block")}),$("#priceMenu").on("mouseover",function(){$("#priceMenu").css("display","block")}),$("#priceMenu").on("mouseout",function(){$("#priceMenu").css("display","none")}),$(".brandLink").on("click",function(){$("#brandsMenu").css("display","block")}),$("#brandsMenu").on("mouseover",function(){$("#brandsMenu").css("display","block")}),$("#brandsMenu").on("mouseout",function(){$("#brandsMenu").css("display","none")}),$(".typeLink").on("click",function(){$("#typesMenu").css("display","block")}),$("#typesMenu").on("mouseover",function(){$("#typesMenu").css("display","block")}),$("#typesMenu").on("mouseout",function(){$("#typesMenu").css("display","none")})}),$(function(){$("#search-box").focus();var i=instantsearch({appId:"W8I2YD0GJC",apiKey:"861d0757703675d68f5a0f915072381b",indexName:"tech_shop_data"});i.addWidget(instantsearch.widgets.searchBox({container:"#search-box",placeholder:"Search for products..."})),i.addWidget(instantsearch.widgets.hits({container:"#hits-container",cssClasses:{item:"productItem"},hitsPerPage:50,templates:{item:function(i){return i.popularity>=0&&i.popularity<1e3?(i.popularity="☆☆",'<img id="prodPic" src="'+i.image+'" alt="bestbuy item"><div class="row"><span id="popularity"><h4>'+i.popularity+' 2/5</h4></span></div><div class="row"><p id="price">$'+i.price+'</p></div><div class="row"><a href="'+i.url+'"><button class="btn btn-success btn-lg">Buy</button></a></div><h1 id="title">'+i.name+'</h1><p id="description">'+i.description+"</p>"):i.popularity>=1e3&&i.popularity<5e3?(i.popularity="☆☆☆",'<img id="prodPic" src="'+i.image+'" alt="bestbuy item"><div class="row"><span id="popularity"><h4>'+i.popularity+' 3/5</h4></div></span><div class="row"><p id="price">$'+i.price+'</p></div><div class="row"><a href="'+i.url+'"><button class="btn btn-success btn-lg">Buy</button></a></div><h1 id="title">'+i.name+'</h1><p id="description">'+i.description+"</p>"):i.popularity>=5e3&&i.popularity<8e3?(i.popularity="☆☆☆☆",'<img id="prodPic" src="'+i.image+'" alt="bestbuy item"><div class="row"><span id="popularity"><h4>'+i.popularity+' 4/5</h4></div></span><div class="row"><p id="price">$'+i.price+'</p></div><div class="row"><a href="'+i.url+'"><button class="btn btn-success btn-lg">Buy</button></a></div><h1 id="title">'+i.name+'</h1><p id="description">'+i.description+"</p>"):(i.popularity="☆☆☆☆☆",'<img id="prodPic" src="'+i.image+'" alt="bestbuy item"><div class="row"><span id="popularity"><h4>'+i.popularity+' 5/5</h4></div></span><div class="row"><p id="price">$'+i.price+'</p></div><div class="row"><a href="'+i.url+'"><button class="btn  btn-success btn-lg">Buy</button></a></div><h1 id="title">'+i.name+'</h1><p id="description">'+i.description+"</p>")},empty:'<div id="notFoundContainer"><h1 id="notFoundHeader">Sorry Snoopy cannot find what you seek...</h1><img id="notFound" src="notFound.gif"></div>'}})),i.addWidget(instantsearch.widgets.refinementList({container:"#categoryMenu",attributeName:"categories",operator:"or",limit:10,cssClasses:{list:"categoryList",label:"checkbox-inline",count:"count",item:"lineItem"}})),i.addWidget(instantsearch.widgets.rangeSlider({container:"#priceMenu",attributeName:"price",tooltips:{format:function(i){return"$"+Math.floor(i)},min:-1,max:5e3}})),i.addWidget(instantsearch.widgets.refinementList({container:"#brandsMenu",attributeName:"brand",operator:"or",limit:10,cssClasses:{list:"brandsList",label:"checkbox-inline",count:"count",item:"lineItem"}})),i.addWidget(instantsearch.widgets.refinementList({container:"#typesMenu",attributeName:"type",operator:"or",limit:10,cssClasses:{list:"typesList",label:"checkbox-inline",count:"count",item:"lineItem"}})),i.addWidget(instantsearch.widgets.pagination({container:"#pagination-container",scrollTo:"#search-box",cssClasses:{root:"page",link:"num"}})),i.addWidget(instantsearch.widgets.stats({container:"#stats"})),i.addWidget(instantsearch.widgets.sortBySelector({container:"#sort-by",autoHideContainer:!0,indices:[{name:"tech_shop_data",label:"Most popular"},{name:"tech_shop_data_price_asc",label:"Lowest price"},{name:"tech_shop_data_price_desc",label:"Highest price"}],cssClasses:{root:"dropdown"}})),i.start(),$(".categoryLink").on("click",function(){$("#categoryMenu").css("display","block")}),$("#categoryMenu").on("mouseover",function(){$("#categoryMenu").css("display","block")}),$("#categoryMenu").on("mouseout",function(){$("#categoryMenu").css("display","none")}),$(".priceLink").on("click",function(){$("#priceMenu").css("display","block")}),$("#priceMenu").on("mouseover",function(){$("#priceMenu").css("display","block")}),$("#priceMenu").on("mouseout",function(){$("#priceMenu").css("display","none")}),$(".brandLink").on("click",function(){$("#brandsMenu").css("display","block")}),$("#brandsMenu").on("mouseover",function(){$("#brandsMenu").css("display","block")}),$("#brandsMenu").on("mouseout",function(){$("#brandsMenu").css("display","none")}),$(".typeLink").on("click",function(){$("#typesMenu").css("display","block")}),$("#typesMenu").on("mouseover",function(){$("#typesMenu").css("display","block")}),$("#typesMenu").on("mouseout",function(){$("#typesMenu").css("display","none")})}),$(function(){$("#search-box").focus();var i=instantsearch({appId:"W8I2YD0GJC",apiKey:"861d0757703675d68f5a0f915072381b",indexName:"tech_shop_data"});i.addWidget(instantsearch.widgets.searchBox({container:"#search-box",placeholder:"Search for products..."})),i.addWidget(instantsearch.widgets.hits({container:"#hits-container",cssClasses:{item:"productItem"},hitsPerPage:50,templates:{item:function(i){return i.popularity>=0&&i.popularity<1e3?(i.popularity="☆☆",'<img id="prodPic" src="'+i.image+'" alt="bestbuy item"><div class="row"><span id="popularity"><h4>'+i.popularity+' 2/5</h4></span></div><div class="row"><p id="price">$'+i.price+'</p></div><div class="row"><a href="'+i.url+'"><button class="btn btn-success btn-lg">Buy</button></a></div><h1 id="title">'+i.name+'</h1><p id="description">'+i.description+"</p>"):i.popularity>=1e3&&i.popularity<5e3?(i.popularity="☆☆☆",'<img id="prodPic" src="'+i.image+'" alt="bestbuy item"><div class="row"><span id="popularity"><h4>'+i.popularity+' 3/5</h4></div></span><div class="row"><p id="price">$'+i.price+'</p></div><div class="row"><a href="'+i.url+'"><button class="btn btn-success btn-lg">Buy</button></a></div><h1 id="title">'+i.name+'</h1><p id="description">'+i.description+"</p>"):i.popularity>=5e3&&i.popularity<8e3?(i.popularity="☆☆☆☆",'<img id="prodPic" src="'+i.image+'" alt="bestbuy item"><div class="row"><span id="popularity"><h4>'+i.popularity+' 4/5</h4></div></span><div class="row"><p id="price">$'+i.price+'</p></div><div class="row"><a href="'+i.url+'"><button class="btn btn-success btn-lg">Buy</button></a></div><h1 id="title">'+i.name+'</h1><p id="description">'+i.description+"</p>"):(i.popularity="☆☆☆☆☆",'<img id="prodPic" src="'+i.image+'" alt="bestbuy item"><div class="row"><span id="popularity"><h4>'+i.popularity+' 5/5</h4></div></span><div class="row"><p id="price">$'+i.price+'</p></div><div class="row"><a href="'+i.url+'"><button class="btn  btn-success btn-lg">Buy</button></a></div><h1 id="title">'+i.name+'</h1><p id="description">'+i.description+"</p>")},empty:'<div id="notFoundContainer"><h1 id="notFoundHeader">Sorry Snoopy cannot find what you seek...</h1><img id="notFound" src="notFound.gif"></div>'}})),i.addWidget(instantsearch.widgets.refinementList({container:"#categoryMenu",attributeName:"categories",operator:"or",limit:10,cssClasses:{list:"categoryList",label:"checkbox-inline",count:"count",item:"lineItem"}})),i.addWidget(instantsearch.widgets.rangeSlider({container:"#priceMenu",attributeName:"price",tooltips:{format:function(i){return"$"+Math.floor(i)},min:-1,max:5e3}})),i.addWidget(instantsearch.widgets.refinementList({container:"#brandsMenu",attributeName:"brand",operator:"or",limit:10,cssClasses:{list:"brandsList",label:"checkbox-inline",count:"count",item:"lineItem"}})),i.addWidget(instantsearch.widgets.refinementList({container:"#typesMenu",attributeName:"type",operator:"or",limit:10,cssClasses:{list:"typesList",label:"checkbox-inline",count:"count",item:"lineItem"}})),i.addWidget(instantsearch.widgets.pagination({container:"#pagination-container",scrollTo:"#search-box",cssClasses:{root:"page",link:"num"}})),i.addWidget(instantsearch.widgets.stats({container:"#stats"})),i.addWidget(instantsearch.widgets.sortBySelector({container:"#sort-by",autoHideContainer:!0,indices:[{name:"tech_shop_data",label:"Most popular"},{name:"tech_shop_data_price_asc",label:"Lowest price"},{name:"tech_shop_data_price_desc",label:"Highest price"}],cssClasses:{root:"dropdown"}})),i.start(),$(".categoryLink").on("click",function(){$("#categoryMenu").css("display","block")}),$("#categoryMenu").on("mouseover",function(){$("#categoryMenu").css("display","block")}),$("#categoryMenu").on("mouseout",function(){$("#categoryMenu").css("display","none")}),$(".priceLink").on("click",function(){$("#priceMenu").css("display","block")}),$("#priceMenu").on("mouseover",function(){$("#priceMenu").css("display","block")}),$("#priceMenu").on("mouseout",function(){$("#priceMenu").css("display","none")}),$(".brandLink").on("click",function(){$("#brandsMenu").css("display","block")}),$("#brandsMenu").on("mouseover",function(){$("#brandsMenu").css("display","block")}),$("#brandsMenu").on("mouseout",function(){$("#brandsMenu").css("display","none")}),$(".typeLink").on("click",function(){$("#typesMenu").css("display","block")}),$("#typesMenu").on("mouseover",function(){$("#typesMenu").css("display","block")}),$("#typesMenu").on("mouseout",function(){$("#typesMenu").css("display","none")})}),$(function(){$("#search-box").focus();var i=instantsearch({appId:"W8I2YD0GJC",apiKey:"861d0757703675d68f5a0f915072381b",indexName:"tech_shop_data"});i.addWidget(instantsearch.widgets.searchBox({container:"#search-box",placeholder:"Search for products..."})),i.addWidget(instantsearch.widgets.hits({container:"#hits-container",cssClasses:{item:"productItem"},hitsPerPage:50,templates:{item:function(i){return i.popularity>=0&&i.popularity<1e3?(i.popularity="☆☆",'<img id="prodPic" src="'+i.image+'" alt="bestbuy item"><div class="row"><span id="popularity"><h4>'+i.popularity+' 2/5</h4></span></div><div class="row"><p id="price">$'+i.price+'</p></div><div class="row"><a href="'+i.url+'"><button class="btn btn-success btn-lg">Buy</button></a></div><h1 id="title">'+i.name+'</h1><p id="description">'+i.description+"</p>"):i.popularity>=1e3&&i.popularity<5e3?(i.popularity="☆☆☆",'<img id="prodPic" src="'+i.image+'" alt="bestbuy item"><div class="row"><span id="popularity"><h4>'+i.popularity+' 3/5</h4></div></span><div class="row"><p id="price">$'+i.price+'</p></div><div class="row"><a href="'+i.url+'"><button class="btn btn-success btn-lg">Buy</button></a></div><h1 id="title">'+i.name+'</h1><p id="description">'+i.description+"</p>"):i.popularity>=5e3&&i.popularity<8e3?(i.popularity="☆☆☆☆",'<img id="prodPic" src="'+i.image+'" alt="bestbuy item"><div class="row"><span id="popularity"><h4>'+i.popularity+' 4/5</h4></div></span><div class="row"><p id="price">$'+i.price+'</p></div><div class="row"><a href="'+i.url+'"><button class="btn btn-success btn-lg">Buy</button></a></div><h1 id="title">'+i.name+'</h1><p id="description">'+i.description+"</p>"):(i.popularity="☆☆☆☆☆",'<img id="prodPic" src="'+i.image+'" alt="bestbuy item"><div class="row"><span id="popularity"><h4>'+i.popularity+' 5/5</h4></div></span><div class="row"><p id="price">$'+i.price+'</p></div><div class="row"><a href="'+i.url+'"><button class="btn  btn-success btn-lg">Buy</button></a></div><h1 id="title">'+i.name+'</h1><p id="description">'+i.description+"</p>")},empty:'<div id="notFoundContainer"><h1 id="notFoundHeader">Sorry Snoopy cannot find what you seek...</h1><img id="notFound" src="notFound.gif"></div>'}})),i.addWidget(instantsearch.widgets.refinementList({container:"#categoryMenu",attributeName:"categories",operator:"or",limit:10,cssClasses:{list:"categoryList",label:"checkbox-inline",count:"count",item:"lineItem"}})),i.addWidget(instantsearch.widgets.rangeSlider({container:"#priceMenu",attributeName:"price",tooltips:{format:function(i){return"$"+Math.floor(i)},min:-1,max:5e3}})),i.addWidget(instantsearch.widgets.refinementList({container:"#brandsMenu",attributeName:"brand",operator:"or",limit:10,cssClasses:{list:"brandsList",label:"checkbox-inline",count:"count",item:"lineItem"}})),i.addWidget(instantsearch.widgets.refinementList({container:"#typesMenu",attributeName:"type",operator:"or",limit:10,cssClasses:{list:"typesList",label:"checkbox-inline",count:"count",item:"lineItem"}})),i.addWidget(instantsearch.widgets.pagination({container:"#pagination-container",scrollTo:"#search-box",cssClasses:{root:"page",link:"num"}})),i.addWidget(instantsearch.widgets.stats({container:"#stats"})),i.addWidget(instantsearch.widgets.sortBySelector({container:"#sort-by",autoHideContainer:!0,indices:[{name:"tech_shop_data",label:"Most popular"},{name:"tech_shop_data_price_asc",label:"Lowest price"},{name:"tech_shop_data_price_desc",label:"Highest price"}],cssClasses:{root:"dropdown"}})),i.start(),$(".categoryLink").on("click",function(){$("#categoryMenu").css("display","block")}),$("#categoryMenu").on("mouseover",function(){$("#categoryMenu").css("display","block")}),$("#categoryMenu").on("mouseout",function(){$("#categoryMenu").css("display","none")}),$(".priceLink").on("click",function(){$("#priceMenu").css("display","block")}),$("#priceMenu").on("mouseover",function(){$("#priceMenu").css("display","block")}),$("#priceMenu").on("mouseout",function(){$("#priceMenu").css("display","none")}),$(".brandLink").on("click",function(){$("#brandsMenu").css("display","block")}),$("#brandsMenu").on("mouseover",function(){$("#brandsMenu").css("display","block")}),$("#brandsMenu").on("mouseout",function(){$("#brandsMenu").css("display","none")}),$(".typeLink").on("click",function(){$("#typesMenu").css("display","block")}),$("#typesMenu").on("mouseover",function(){$("#typesMenu").css("display","block")}),$("#typesMenu").on("mouseout",function(){$("#typesMenu").css("display","none")})}),$(function(){$("#search-box").focus();var i=instantsearch({appId:"W8I2YD0GJC",apiKey:"861d0757703675d68f5a0f915072381b",indexName:"tech_shop_data"});i.addWidget(instantsearch.widgets.searchBox({container:"#search-box",placeholder:"Search for products..."})),i.addWidget(instantsearch.widgets.hits({container:"#hits-container",cssClasses:{item:"productItem"},hitsPerPage:50,templates:{item:function(i){return i.popularity>=0&&i.popularity<1e3?(i.popularity="☆☆",'<img id="prodPic" src="'+i.image+'" alt="bestbuy item"><div class="row"><span id="popularity"><h4>'+i.popularity+' 2/5</h4></span></div><div class="row"><p id="price">$'+i.price+'</p></div><div class="row"><a href="'+i.url+'"><button class="btn btn-success btn-lg">Buy</button></a></div><h1 id="title">'+i.name+'</h1><p id="description">'+i.description+"</p>"):i.popularity>=1e3&&i.popularity<5e3?(i.popularity="☆☆☆",'<img id="prodPic" src="'+i.image+'" alt="bestbuy item"><div class="row"><span id="popularity"><h4>'+i.popularity+' 3/5</h4></div></span><div class="row"><p id="price">$'+i.price+'</p></div><div class="row"><a href="'+i.url+'"><button class="btn btn-success btn-lg">Buy</button></a></div><h1 id="title">'+i.name+'</h1><p id="description">'+i.description+"</p>"):i.popularity>=5e3&&i.popularity<8e3?(i.popularity="☆☆☆☆",'<img id="prodPic" src="'+i.image+'" alt="bestbuy item"><div class="row"><span id="popularity"><h4>'+i.popularity+' 4/5</h4></div></span><div class="row"><p id="price">$'+i.price+'</p></div><div class="row"><a href="'+i.url+'"><button class="btn btn-success btn-lg">Buy</button></a></div><h1 id="title">'+i.name+'</h1><p id="description">'+i.description+"</p>"):(i.popularity="☆☆☆☆☆",'<img id="prodPic" src="'+i.image+'" alt="bestbuy item"><div class="row"><span id="popularity"><h4>'+i.popularity+' 5/5</h4></div></span><div class="row"><p id="price">$'+i.price+'</p></div><div class="row"><a href="'+i.url+'"><button class="btn  btn-success btn-lg">Buy</button></a></div><h1 id="title">'+i.name+'</h1><p id="description">'+i.description+"</p>")},empty:'<div id="notFoundContainer"><h1 id="notFoundHeader">Sorry Snoopy cannot find what you seek...</h1><img id="notFound" src="notFound.gif"></div>'}})),i.addWidget(instantsearch.widgets.refinementList({container:"#categoryMenu",attributeName:"categories",operator:"or",limit:10,cssClasses:{list:"categoryList",label:"checkbox-inline",count:"count",item:"lineItem"}})),i.addWidget(instantsearch.widgets.rangeSlider({container:"#priceMenu",attributeName:"price",tooltips:{format:function(i){return"$"+Math.floor(i)},min:-1,max:5e3}})),i.addWidget(instantsearch.widgets.refinementList({container:"#brandsMenu",attributeName:"brand",operator:"or",limit:10,cssClasses:{list:"brandsList",label:"checkbox-inline",count:"count",item:"lineItem"}})),i.addWidget(instantsearch.widgets.refinementList({container:"#typesMenu",attributeName:"type",operator:"or",limit:10,cssClasses:{list:"typesList",label:"checkbox-inline",count:"count",item:"lineItem"}})),i.addWidget(instantsearch.widgets.pagination({container:"#pagination-container",scrollTo:"#search-box",cssClasses:{root:"page",link:"num"}})),i.addWidget(instantsearch.widgets.stats({container:"#stats"})),i.addWidget(instantsearch.widgets.sortBySelector({container:"#sort-by",autoHideContainer:!0,indices:[{name:"tech_shop_data",label:"Most popular"},{name:"tech_shop_data_price_asc",label:"Lowest price"},{name:"tech_shop_data_price_desc",label:"Highest price"}],cssClasses:{root:"dropdown"}})),i.start(),$(".categoryLink").on("click",function(){$("#categoryMenu").css("display","block")}),$("#categoryMenu").on("mouseover",function(){$("#categoryMenu").css("display","block")}),$("#categoryMenu").on("mouseout",function(){$("#categoryMenu").css("display","none")}),$(".priceLink").on("click",function(){$("#priceMenu").css("display","block")}),$("#priceMenu").on("mouseover",function(){$("#priceMenu").css("display","block")}),$("#priceMenu").on("mouseout",function(){$("#priceMenu").css("display","none")}),$(".brandLink").on("click",function(){$("#brandsMenu").css("display","block")}),$("#brandsMenu").on("mouseover",function(){$("#brandsMenu").css("display","block")}),$("#brandsMenu").on("mouseout",function(){$("#brandsMenu").css("display","none")}),$(".typeLink").on("click",function(){$("#typesMenu").css("display","block")}),$("#typesMenu").on("mouseover",function(){$("#typesMenu").css("display","block")}),$("#typesMenu").on("mouseout",function(){$("#typesMenu").css("display","none")})}),$(function(){$("#search-box").focus();var i=instantsearch({appId:"W8I2YD0GJC",apiKey:"861d0757703675d68f5a0f915072381b",indexName:"tech_shop_data"});i.addWidget(instantsearch.widgets.searchBox({container:"#search-box",placeholder:"Search for products..."})),i.addWidget(instantsearch.widgets.hits({container:"#hits-container",cssClasses:{item:"productItem"},hitsPerPage:50,templates:{item:function(i){return i.popularity>=0&&i.popularity<1e3?(i.popularity="☆☆",'<img id="prodPic" src="'+i.image+'" alt="bestbuy item"><div class="row"><span id="popularity"><h4>'+i.popularity+' 2/5</h4></span></div><div class="row"><p id="price">$'+i.price+'</p></div><div class="row"><a href="'+i.url+'"><button class="btn btn-success btn-lg">Buy</button></a></div><h1 id="title">'+i.name+'</h1><p id="description">'+i.description+"</p>"):i.popularity>=1e3&&i.popularity<5e3?(i.popularity="☆☆☆",'<img id="prodPic" src="'+i.image+'" alt="bestbuy item"><div class="row"><span id="popularity"><h4>'+i.popularity+' 3/5</h4></div></span><div class="row"><p id="price">$'+i.price+'</p></div><div class="row"><a href="'+i.url+'"><button class="btn btn-success btn-lg">Buy</button></a></div><h1 id="title">'+i.name+'</h1><p id="description">'+i.description+"</p>"):i.popularity>=5e3&&i.popularity<8e3?(i.popularity="☆☆☆☆",'<img id="prodPic" src="'+i.image+'" alt="bestbuy item"><div class="row"><span id="popularity"><h4>'+i.popularity+' 4/5</h4></div></span><div class="row"><p id="price">$'+i.price+'</p></div><div class="row"><a href="'+i.url+'"><button class="btn btn-success btn-lg">Buy</button></a></div><h1 id="title">'+i.name+'</h1><p id="description">'+i.description+"</p>"):(i.popularity="☆☆☆☆☆",'<img id="prodPic" src="'+i.image+'" alt="bestbuy item"><div class="row"><span id="popularity"><h4>'+i.popularity+' 5/5</h4></div></span><div class="row"><p id="price">$'+i.price+'</p></div><div class="row"><a href="'+i.url+'"><button class="btn  btn-success btn-lg">Buy</button></a></div><h1 id="title">'+i.name+'</h1><p id="description">'+i.description+"</p>")},empty:'<div id="notFoundContainer"><h1 id="notFoundHeader">Sorry Snoopy cannot find what you seek...</h1><img id="notFound" src="notFound.gif"></div>'}})),i.addWidget(instantsearch.widgets.refinementList({container:"#categoryMenu",attributeName:"categories",operator:"or",limit:10,cssClasses:{list:"categoryList",label:"checkbox-inline",count:"count",item:"lineItem"}})),i.addWidget(instantsearch.widgets.rangeSlider({container:"#priceMenu",attributeName:"price",tooltips:{format:function(i){return"$"+Math.floor(i)},min:-1,max:5e3}})),i.addWidget(instantsearch.widgets.refinementList({container:"#brandsMenu",attributeName:"brand",operator:"or",limit:10,cssClasses:{list:"brandsList",label:"checkbox-inline",count:"count",item:"lineItem"}})),i.addWidget(instantsearch.widgets.refinementList({container:"#typesMenu",attributeName:"type",operator:"or",limit:10,cssClasses:{list:"typesList",label:"checkbox-inline",count:"count",item:"lineItem"}})),i.addWidget(instantsearch.widgets.pagination({container:"#pagination-container",scrollTo:"#search-box",cssClasses:{root:"page",link:"num"}})),i.addWidget(instantsearch.widgets.stats({container:"#stats"})),i.addWidget(instantsearch.widgets.sortBySelector({container:"#sort-by",autoHideContainer:!0,indices:[{name:"tech_shop_data",label:"Most popular"},{name:"tech_shop_data_price_asc",label:"Lowest price"},{name:"tech_shop_data_price_desc",label:"Highest price"}],cssClasses:{root:"dropdown"}})),i.start(),$(".categoryLink").on("click",function(){$("#categoryMenu").css("display","block")}),$("#categoryMenu").on("mouseover",function(){$("#categoryMenu").css("display","block")}),$("#categoryMenu").on("mouseout",function(){$("#categoryMenu").css("display","none")}),$(".priceLink").on("click",function(){$("#priceMenu").css("display","block")}),$("#priceMenu").on("mouseover",function(){$("#priceMenu").css("display","block")}),$("#priceMenu").on("mouseout",function(){$("#priceMenu").css("display","none")}),$(".brandLink").on("click",function(){$("#brandsMenu").css("display","block")}),$("#brandsMenu").on("mouseover",function(){$("#brandsMenu").css("display","block")}),$("#brandsMenu").on("mouseout",function(){$("#brandsMenu").css("display","none")}),$(".typeLink").on("click",function(){$("#typesMenu").css("display","block")}),$("#typesMenu").on("mouseover",function(){$("#typesMenu").css("display","block")}),$("#typesMenu").on("mouseout",function(){$("#typesMenu").css("display","none")})}),$(function(){$("#search-box").focus();var i=instantsearch({appId:"W8I2YD0GJC",apiKey:"861d0757703675d68f5a0f915072381b",indexName:"tech_shop_data"});i.addWidget(instantsearch.widgets.searchBox({container:"#search-box",placeholder:"Search for products..."})),i.addWidget(instantsearch.widgets.hits({container:"#hits-container",cssClasses:{item:"productItem"},hitsPerPage:50,templates:{item:function(i){return i.popularity>=0&&i.popularity<1e3?(i.popularity="☆☆",'<img id="prodPic" src="'+i.image+'" alt="bestbuy item"><div class="row"><span id="popularity"><h4>'+i.popularity+' 2/5</h4></span></div><div class="row"><p id="price">$'+i.price+'</p></div><div class="row"><a href="'+i.url+'"><button class="btn btn-success btn-lg">Buy</button></a></div><h1 id="title">'+i.name+'</h1><p id="description">'+i.description+"</p>"):i.popularity>=1e3&&i.popularity<5e3?(i.popularity="☆☆☆",'<img id="prodPic" src="'+i.image+'" alt="bestbuy item"><div class="row"><span id="popularity"><h4>'+i.popularity+' 3/5</h4></div></span><div class="row"><p id="price">$'+i.price+'</p></div><div class="row"><a href="'+i.url+'"><button class="btn btn-success btn-lg">Buy</button></a></div><h1 id="title">'+i.name+'</h1><p id="description">'+i.description+"</p>"):i.popularity>=5e3&&i.popularity<8e3?(i.popularity="☆☆☆☆",'<img id="prodPic" src="'+i.image+'" alt="bestbuy item"><div class="row"><span id="popularity"><h4>'+i.popularity+' 4/5</h4></div></span><div class="row"><p id="price">$'+i.price+'</p></div><div class="row"><a href="'+i.url+'"><button class="btn btn-success btn-lg">Buy</button></a></div><h1 id="title">'+i.name+'</h1><p id="description">'+i.description+"</p>"):(i.popularity="☆☆☆☆☆",'<img id="prodPic" src="'+i.image+'" alt="bestbuy item"><div class="row"><span id="popularity"><h4>'+i.popularity+' 5/5</h4></div></span><div class="row"><p id="price">$'+i.price+'</p></div><div class="row"><a href="'+i.url+'"><button class="btn  btn-success btn-lg">Buy</button></a></div><h1 id="title">'+i.name+'</h1><p id="description">'+i.description+"</p>")},empty:'<div id="notFoundContainer"><h1 id="notFoundHeader">Sorry Snoopy cannot find what you seek...</h1><img id="notFound" src="notFound.gif"></div>'}})),i.addWidget(instantsearch.widgets.refinementList({container:"#categoryMenu",attributeName:"categories",operator:"or",limit:10,cssClasses:{list:"categoryList",label:"checkbox-inline",count:"count",item:"lineItem"}})),i.addWidget(instantsearch.widgets.rangeSlider({container:"#priceMenu",attributeName:"price",tooltips:{format:function(i){return"$"+Math.floor(i)},min:-1,max:5e3}})),i.addWidget(instantsearch.widgets.refinementList({container:"#brandsMenu",attributeName:"brand",operator:"or",limit:10,cssClasses:{list:"brandsList",label:"checkbox-inline",count:"count",item:"lineItem"}})),i.addWidget(instantsearch.widgets.refinementList({container:"#typesMenu",attributeName:"type",operator:"or",limit:10,cssClasses:{list:"typesList",label:"checkbox-inline",count:"count",item:"lineItem"}})),i.addWidget(instantsearch.widgets.pagination({container:"#pagination-container",scrollTo:"#search-box",cssClasses:{root:"page",link:"num"}})),i.addWidget(instantsearch.widgets.stats({container:"#stats"})),i.addWidget(instantsearch.widgets.sortBySelector({container:"#sort-by",autoHideContainer:!0,indices:[{name:"tech_shop_data",label:"Most popular"},{name:"tech_shop_data_price_asc",label:"Lowest price"},{name:"tech_shop_data_price_desc",label:"Highest price"}],cssClasses:{root:"dropdown"}})),i.start(),$(".categoryLink").on("click",function(){$("#categoryMenu").css("display","block")}),$("#categoryMenu").on("mouseover",function(){$("#categoryMenu").css("display","block")}),$("#categoryMenu").on("mouseout",function(){$("#categoryMenu").css("display","none")}),$(".priceLink").on("click",function(){$("#priceMenu").css("display","block")}),$("#priceMenu").on("mouseover",function(){$("#priceMenu").css("display","block")}),$("#priceMenu").on("mouseout",function(){$("#priceMenu").css("display","none")}),$(".brandLink").on("click",function(){$("#brandsMenu").css("display","block")}),$("#brandsMenu").on("mouseover",function(){$("#brandsMenu").css("display","block")}),$("#brandsMenu").on("mouseout",function(){$("#brandsMenu").css("display","none")}),$(".typeLink").on("click",function(){$("#typesMenu").css("display","block")}),$("#typesMenu").on("mouseover",function(){$("#typesMenu").css("display","block")}),$("#typesMenu").on("mouseout",function(){$("#typesMenu").css("display","none")})}),$(function(){$("#search-box").focus();var i=instantsearch({appId:"W8I2YD0GJC",apiKey:"861d0757703675d68f5a0f915072381b",indexName:"tech_shop_data"});i.addWidget(instantsearch.widgets.searchBox({container:"#search-box",placeholder:"Search for products..."})),i.addWidget(instantsearch.widgets.hits({container:"#hits-container",cssClasses:{item:"productItem"},hitsPerPage:50,templates:{item:function(i){return i.popularity>=0&&i.popularity<1e3?(i.popularity="☆☆",'<img id="prodPic" src="'+i.image+'" alt="bestbuy item"><div class="row"><span id="popularity"><h4>'+i.popularity+' 2/5</h4></span></div><div class="row"><p id="price">$'+i.price+'</p></div><div class="row"><a href="'+i.url+'"><button class="btn btn-success btn-lg">Buy</button></a></div><h1 id="title">'+i.name+'</h1><p id="description">'+i.description+"</p>"):i.popularity>=1e3&&i.popularity<5e3?(i.popularity="☆☆☆",
'<img id="prodPic" src="'+i.image+'" alt="bestbuy item"><div class="row"><span id="popularity"><h4>'+i.popularity+' 3/5</h4></div></span><div class="row"><p id="price">$'+i.price+'</p></div><div class="row"><a href="'+i.url+'"><button class="btn btn-success btn-lg">Buy</button></a></div><h1 id="title">'+i.name+'</h1><p id="description">'+i.description+"</p>"):i.popularity>=5e3&&i.popularity<8e3?(i.popularity="☆☆☆☆",'<img id="prodPic" src="'+i.image+'" alt="bestbuy item"><div class="row"><span id="popularity"><h4>'+i.popularity+' 4/5</h4></div></span><div class="row"><p id="price">$'+i.price+'</p></div><div class="row"><a href="'+i.url+'"><button class="btn btn-success btn-lg">Buy</button></a></div><h1 id="title">'+i.name+'</h1><p id="description">'+i.description+"</p>"):(i.popularity="☆☆☆☆☆",'<img id="prodPic" src="'+i.image+'" alt="bestbuy item"><div class="row"><span id="popularity"><h4>'+i.popularity+' 5/5</h4></div></span><div class="row"><p id="price">$'+i.price+'</p></div><div class="row"><a href="'+i.url+'"><button class="btn  btn-success btn-lg">Buy</button></a></div><h1 id="title">'+i.name+'</h1><p id="description">'+i.description+"</p>")},empty:'<div id="notFoundContainer"><h1 id="notFoundHeader">Sorry Snoopy cannot find what you seek...</h1><img id="notFound" src="notFound.gif"></div>'}})),i.addWidget(instantsearch.widgets.refinementList({container:"#categoryMenu",attributeName:"categories",operator:"or",limit:10,cssClasses:{list:"categoryList",label:"checkbox-inline",count:"count",item:"lineItem"}})),i.addWidget(instantsearch.widgets.rangeSlider({container:"#priceMenu",attributeName:"price",tooltips:{format:function(i){return"$"+Math.floor(i)},min:-1,max:5e3}})),i.addWidget(instantsearch.widgets.refinementList({container:"#brandsMenu",attributeName:"brand",operator:"or",limit:10,cssClasses:{list:"brandsList",label:"checkbox-inline",count:"count",item:"lineItem"}})),i.addWidget(instantsearch.widgets.refinementList({container:"#typesMenu",attributeName:"type",operator:"or",limit:10,cssClasses:{list:"typesList",label:"checkbox-inline",count:"count",item:"lineItem"}})),i.addWidget(instantsearch.widgets.pagination({container:"#pagination-container",scrollTo:"#search-box",cssClasses:{root:"page",link:"num"}})),i.addWidget(instantsearch.widgets.stats({container:"#stats"})),i.addWidget(instantsearch.widgets.sortBySelector({container:"#sort-by",autoHideContainer:!0,indices:[{name:"tech_shop_data",label:"Most popular"},{name:"tech_shop_data_price_asc",label:"Lowest price"},{name:"tech_shop_data_price_desc",label:"Highest price"}],cssClasses:{root:"dropdown"}})),i.start(),$(".categoryLink").on("click",function(){$("#categoryMenu").css("display","block")}),$("#categoryMenu").on("mouseover",function(){$("#categoryMenu").css("display","block")}),$("#categoryMenu").on("mouseout",function(){$("#categoryMenu").css("display","none")}),$(".priceLink").on("click",function(){$("#priceMenu").css("display","block")}),$("#priceMenu").on("mouseover",function(){$("#priceMenu").css("display","block")}),$("#priceMenu").on("mouseout",function(){$("#priceMenu").css("display","none")}),$(".brandLink").on("click",function(){$("#brandsMenu").css("display","block")}),$("#brandsMenu").on("mouseover",function(){$("#brandsMenu").css("display","block")}),$("#brandsMenu").on("mouseout",function(){$("#brandsMenu").css("display","none")}),$(".typeLink").on("click",function(){$("#typesMenu").css("display","block")}),$("#typesMenu").on("mouseover",function(){$("#typesMenu").css("display","block")}),$("#typesMenu").on("mouseout",function(){$("#typesMenu").css("display","none")})}),$(function(){$("#search-box").focus();var i=instantsearch({appId:"W8I2YD0GJC",apiKey:"861d0757703675d68f5a0f915072381b",indexName:"tech_shop_data"});i.addWidget(instantsearch.widgets.searchBox({container:"#search-box",placeholder:"Search for products..."})),i.addWidget(instantsearch.widgets.hits({container:"#hits-container",cssClasses:{item:"productItem"},hitsPerPage:50,templates:{item:function(i){return i.popularity>=0&&i.popularity<1e3?(i.popularity="☆☆",'<img id="prodPic" src="'+i.image+'" alt="bestbuy item"><div class="row"><span id="popularity"><h4>'+i.popularity+' 2/5</h4></span></div><div class="row"><p id="price">$'+i.price+'</p></div><div class="row"><a href="'+i.url+'"><button class="btn btn-success btn-lg">Buy</button></a></div><h1 id="title">'+i.name+'</h1><p id="description">'+i.description+"</p>"):i.popularity>=1e3&&i.popularity<5e3?(i.popularity="☆☆☆",'<img id="prodPic" src="'+i.image+'" alt="bestbuy item"><div class="row"><span id="popularity"><h4>'+i.popularity+' 3/5</h4></div></span><div class="row"><p id="price">$'+i.price+'</p></div><div class="row"><a href="'+i.url+'"><button class="btn btn-success btn-lg">Buy</button></a></div><h1 id="title">'+i.name+'</h1><p id="description">'+i.description+"</p>"):i.popularity>=5e3&&i.popularity<8e3?(i.popularity="☆☆☆☆",'<img id="prodPic" src="'+i.image+'" alt="bestbuy item"><div class="row"><span id="popularity"><h4>'+i.popularity+' 4/5</h4></div></span><div class="row"><p id="price">$'+i.price+'</p></div><div class="row"><a href="'+i.url+'"><button class="btn btn-success btn-lg">Buy</button></a></div><h1 id="title">'+i.name+'</h1><p id="description">'+i.description+"</p>"):(i.popularity="☆☆☆☆☆",'<img id="prodPic" src="'+i.image+'" alt="bestbuy item"><div class="row"><span id="popularity"><h4>'+i.popularity+' 5/5</h4></div></span><div class="row"><p id="price">$'+i.price+'</p></div><div class="row"><a href="'+i.url+'"><button class="btn  btn-success btn-lg">Buy</button></a></div><h1 id="title">'+i.name+'</h1><p id="description">'+i.description+"</p>")},empty:'<div id="notFoundContainer"><h1 id="notFoundHeader">Sorry Snoopy cannot find what you seek...</h1><img id="notFound" src="notFound.gif"></div>'}})),i.addWidget(instantsearch.widgets.refinementList({container:"#categoryMenu",attributeName:"categories",operator:"or",limit:10,cssClasses:{list:"categoryList",label:"checkbox-inline",count:"count",item:"lineItem"}})),i.addWidget(instantsearch.widgets.rangeSlider({container:"#priceMenu",attributeName:"price",tooltips:{format:function(i){return"$"+Math.floor(i)},min:-1,max:5e3}})),i.addWidget(instantsearch.widgets.refinementList({container:"#brandsMenu",attributeName:"brand",operator:"or",limit:10,cssClasses:{list:"brandsList",label:"checkbox-inline",count:"count",item:"lineItem"}})),i.addWidget(instantsearch.widgets.refinementList({container:"#typesMenu",attributeName:"type",operator:"or",limit:10,cssClasses:{list:"typesList",label:"checkbox-inline",count:"count",item:"lineItem"}})),i.addWidget(instantsearch.widgets.pagination({container:"#pagination-container",scrollTo:"#search-box",cssClasses:{root:"page",link:"num"}})),i.addWidget(instantsearch.widgets.stats({container:"#stats"})),i.addWidget(instantsearch.widgets.sortBySelector({container:"#sort-by",autoHideContainer:!0,indices:[{name:"tech_shop_data",label:"Most popular"},{name:"tech_shop_data_price_asc",label:"Lowest price"},{name:"tech_shop_data_price_desc",label:"Highest price"}],cssClasses:{root:"dropdown"}})),i.start(),$(".categoryLink").on("click",function(){$("#categoryMenu").css("display","block")}),$("#categoryMenu").on("mouseover",function(){$("#categoryMenu").css("display","block")}),$("#categoryMenu").on("mouseout",function(){$("#categoryMenu").css("display","none")}),$(".priceLink").on("click",function(){$("#priceMenu").css("display","block")}),$("#priceMenu").on("mouseover",function(){$("#priceMenu").css("display","block")}),$("#priceMenu").on("mouseout",function(){$("#priceMenu").css("display","none")}),$(".brandLink").on("click",function(){$("#brandsMenu").css("display","block")}),$("#brandsMenu").on("mouseover",function(){$("#brandsMenu").css("display","block")}),$("#brandsMenu").on("mouseout",function(){$("#brandsMenu").css("display","none")}),$(".typeLink").on("click",function(){$("#typesMenu").css("display","block")}),$("#typesMenu").on("mouseover",function(){$("#typesMenu").css("display","block")}),$("#typesMenu").on("mouseout",function(){$("#typesMenu").css("display","none")})}),$(function(){$("#search-box").focus();var i=instantsearch({appId:"W8I2YD0GJC",apiKey:"861d0757703675d68f5a0f915072381b",indexName:"tech_shop_data"});i.addWidget(instantsearch.widgets.searchBox({container:"#search-box",placeholder:"Search for products..."})),i.addWidget(instantsearch.widgets.hits({container:"#hits-container",cssClasses:{item:"productItem"},hitsPerPage:50,templates:{item:function(i){return i.popularity>=0&&i.popularity<1e3?(i.popularity="☆☆",'<img id="prodPic" src="'+i.image+'" alt="bestbuy item"><div class="row"><span id="popularity"><h4>'+i.popularity+' 2/5</h4></span></div><div class="row"><p id="price">$'+i.price+'</p></div><div class="row"><a href="'+i.url+'"><button class="btn btn-success btn-lg">Buy</button></a></div><h1 id="title">'+i.name+'</h1><p id="description">'+i.description+"</p>"):i.popularity>=1e3&&i.popularity<5e3?(i.popularity="☆☆☆",'<img id="prodPic" src="'+i.image+'" alt="bestbuy item"><div class="row"><span id="popularity"><h4>'+i.popularity+' 3/5</h4></div></span><div class="row"><p id="price">$'+i.price+'</p></div><div class="row"><a href="'+i.url+'"><button class="btn btn-success btn-lg">Buy</button></a></div><h1 id="title">'+i.name+'</h1><p id="description">'+i.description+"</p>"):i.popularity>=5e3&&i.popularity<8e3?(i.popularity="☆☆☆☆",'<img id="prodPic" src="'+i.image+'" alt="bestbuy item"><div class="row"><span id="popularity"><h4>'+i.popularity+' 4/5</h4></div></span><div class="row"><p id="price">$'+i.price+'</p></div><div class="row"><a href="'+i.url+'"><button class="btn btn-success btn-lg">Buy</button></a></div><h1 id="title">'+i.name+'</h1><p id="description">'+i.description+"</p>"):(i.popularity="☆☆☆☆☆",'<img id="prodPic" src="'+i.image+'" alt="bestbuy item"><div class="row"><span id="popularity"><h4>'+i.popularity+' 5/5</h4></div></span><div class="row"><p id="price">$'+i.price+'</p></div><div class="row"><a href="'+i.url+'"><button class="btn  btn-success btn-lg">Buy</button></a></div><h1 id="title">'+i.name+'</h1><p id="description">'+i.description+"</p>")},empty:'<div id="notFoundContainer"><h1 id="notFoundHeader">Sorry Snoopy cannot find what you seek...</h1><img id="notFound" src="notFound.gif"></div>'}})),i.addWidget(instantsearch.widgets.refinementList({container:"#categoryMenu",attributeName:"categories",operator:"or",limit:10,cssClasses:{list:"categoryList",label:"checkbox-inline",count:"count",item:"lineItem"}})),i.addWidget(instantsearch.widgets.rangeSlider({container:"#priceMenu",attributeName:"price",tooltips:{format:function(i){return"$"+Math.floor(i)},min:-1,max:5e3}})),i.addWidget(instantsearch.widgets.refinementList({container:"#brandsMenu",attributeName:"brand",operator:"or",limit:10,cssClasses:{list:"brandsList",label:"checkbox-inline",count:"count",item:"lineItem"}})),i.addWidget(instantsearch.widgets.refinementList({container:"#typesMenu",attributeName:"type",operator:"or",limit:10,cssClasses:{list:"typesList",label:"checkbox-inline",count:"count",item:"lineItem"}})),i.addWidget(instantsearch.widgets.pagination({container:"#pagination-container",scrollTo:"#search-box",cssClasses:{root:"page",link:"num"}})),i.addWidget(instantsearch.widgets.stats({container:"#stats"})),i.addWidget(instantsearch.widgets.sortBySelector({container:"#sort-by",autoHideContainer:!0,indices:[{name:"tech_shop_data",label:"Most popular"},{name:"tech_shop_data_price_asc",label:"Lowest price"},{name:"tech_shop_data_price_desc",label:"Highest price"}],cssClasses:{root:"dropdown"}})),i.start(),$(".categoryLink").on("click",function(){$("#categoryMenu").css("display","block")}),$("#categoryMenu").on("mouseover",function(){$("#categoryMenu").css("display","block")}),$("#categoryMenu").on("mouseout",function(){$("#categoryMenu").css("display","none")}),$(".priceLink").on("click",function(){$("#priceMenu").css("display","block")}),$("#priceMenu").on("mouseover",function(){$("#priceMenu").css("display","block")}),$("#priceMenu").on("mouseout",function(){$("#priceMenu").css("display","none")}),$(".brandLink").on("click",function(){$("#brandsMenu").css("display","block")}),$("#brandsMenu").on("mouseover",function(){$("#brandsMenu").css("display","block")}),$("#brandsMenu").on("mouseout",function(){$("#brandsMenu").css("display","none")}),$(".typeLink").on("click",function(){$("#typesMenu").css("display","block")}),$("#typesMenu").on("mouseover",function(){$("#typesMenu").css("display","block")}),$("#typesMenu").on("mouseout",function(){$("#typesMenu").css("display","none")})}),$(function(){$("#search-box").focus();var i=instantsearch({appId:"W8I2YD0GJC",apiKey:"861d0757703675d68f5a0f915072381b",indexName:"tech_shop_data"});i.addWidget(instantsearch.widgets.searchBox({container:"#search-box",placeholder:"Search for products..."})),i.addWidget(instantsearch.widgets.hits({container:"#hits-container",cssClasses:{item:"productItem"},hitsPerPage:50,templates:{item:function(i){return i.popularity>=0&&i.popularity<1e3?(i.popularity="☆☆",'<img id="prodPic" src="'+i.image+'" alt="bestbuy item"><div class="row"><span id="popularity"><h4>'+i.popularity+' 2/5</h4></span></div><div class="row"><p id="price">$'+i.price+'</p></div><div class="row"><a href="'+i.url+'"><button class="btn btn-success btn-lg">Buy</button></a></div><h1 id="title">'+i.name+'</h1><p id="description">'+i.description+"</p>"):i.popularity>=1e3&&i.popularity<5e3?(i.popularity="☆☆☆",'<img id="prodPic" src="'+i.image+'" alt="bestbuy item"><div class="row"><span id="popularity"><h4>'+i.popularity+' 3/5</h4></div></span><div class="row"><p id="price">$'+i.price+'</p></div><div class="row"><a href="'+i.url+'"><button class="btn btn-success btn-lg">Buy</button></a></div><h1 id="title">'+i.name+'</h1><p id="description">'+i.description+"</p>"):i.popularity>=5e3&&i.popularity<8e3?(i.popularity="☆☆☆☆",'<img id="prodPic" src="'+i.image+'" alt="bestbuy item"><div class="row"><span id="popularity"><h4>'+i.popularity+' 4/5</h4></div></span><div class="row"><p id="price">$'+i.price+'</p></div><div class="row"><a href="'+i.url+'"><button class="btn btn-success btn-lg">Buy</button></a></div><h1 id="title">'+i.name+'</h1><p id="description">'+i.description+"</p>"):(i.popularity="☆☆☆☆☆",'<img id="prodPic" src="'+i.image+'" alt="bestbuy item"><div class="row"><span id="popularity"><h4>'+i.popularity+' 5/5</h4></div></span><div class="row"><p id="price">$'+i.price+'</p></div><div class="row"><a href="'+i.url+'"><button class="btn  btn-success btn-lg">Buy</button></a></div><h1 id="title">'+i.name+'</h1><p id="description">'+i.description+"</p>")},empty:'<div id="notFoundContainer"><h1 id="notFoundHeader">Sorry Snoopy cannot find what you seek...</h1><img id="notFound" src="notFound.gif"></div>'}})),i.addWidget(instantsearch.widgets.refinementList({container:"#categoryMenu",attributeName:"categories",operator:"or",limit:10,cssClasses:{list:"categoryList",label:"checkbox-inline",count:"count",item:"lineItem"}})),i.addWidget(instantsearch.widgets.rangeSlider({container:"#priceMenu",attributeName:"price",tooltips:{format:function(i){return"$"+Math.floor(i)},min:-1,max:5e3}})),i.addWidget(instantsearch.widgets.refinementList({container:"#brandsMenu",attributeName:"brand",operator:"or",limit:10,cssClasses:{list:"brandsList",label:"checkbox-inline",count:"count",item:"lineItem"}})),i.addWidget(instantsearch.widgets.refinementList({container:"#typesMenu",attributeName:"type",operator:"or",limit:10,cssClasses:{list:"typesList",label:"checkbox-inline",count:"count",item:"lineItem"}})),i.addWidget(instantsearch.widgets.pagination({container:"#pagination-container",scrollTo:"#search-box",cssClasses:{root:"page",link:"num"}})),i.addWidget(instantsearch.widgets.stats({container:"#stats"})),i.addWidget(instantsearch.widgets.sortBySelector({container:"#sort-by",autoHideContainer:!0,indices:[{name:"tech_shop_data",label:"Most popular"},{name:"tech_shop_data_price_asc",label:"Lowest price"},{name:"tech_shop_data_price_desc",label:"Highest price"}],cssClasses:{root:"dropdown"}})),i.start(),$(".categoryLink").on("click",function(){$("#categoryMenu").css("display","block")}),$("#categoryMenu").on("mouseover",function(){$("#categoryMenu").css("display","block")}),$("#categoryMenu").on("mouseout",function(){$("#categoryMenu").css("display","none")}),$(".priceLink").on("click",function(){$("#priceMenu").css("display","block")}),$("#priceMenu").on("mouseover",function(){$("#priceMenu").css("display","block")}),$("#priceMenu").on("mouseout",function(){$("#priceMenu").css("display","none")}),$(".brandLink").on("click",function(){$("#brandsMenu").css("display","block")}),$("#brandsMenu").on("mouseover",function(){$("#brandsMenu").css("display","block")}),$("#brandsMenu").on("mouseout",function(){$("#brandsMenu").css("display","none")}),$(".typeLink").on("click",function(){$("#typesMenu").css("display","block")}),$("#typesMenu").on("mouseover",function(){$("#typesMenu").css("display","block")}),$("#typesMenu").on("mouseout",function(){$("#typesMenu").css("display","none")})}),$(function(){$("#search-box").focus();var i=instantsearch({appId:"W8I2YD0GJC",apiKey:"861d0757703675d68f5a0f915072381b",indexName:"tech_shop_data"});i.addWidget(instantsearch.widgets.searchBox({container:"#search-box",placeholder:"Search for products..."})),i.addWidget(instantsearch.widgets.hits({container:"#hits-container",cssClasses:{item:"productItem"},hitsPerPage:50,templates:{item:function(i){return i.popularity>=0&&i.popularity<1e3?(i.popularity="☆☆",'<img id="prodPic" src="'+i.image+'" alt="bestbuy item"><div class="row"><span id="popularity"><h4>'+i.popularity+' 2/5</h4></span></div><div class="row"><p id="price">$'+i.price+'</p></div><div class="row"><a href="'+i.url+'"><button class="btn btn-success btn-lg">Buy</button></a></div><h1 id="title">'+i.name+'</h1><p id="description">'+i.description+"</p>"):i.popularity>=1e3&&i.popularity<5e3?(i.popularity="☆☆☆",'<img id="prodPic" src="'+i.image+'" alt="bestbuy item"><div class="row"><span id="popularity"><h4>'+i.popularity+' 3/5</h4></div></span><div class="row"><p id="price">$'+i.price+'</p></div><div class="row"><a href="'+i.url+'"><button class="btn btn-success btn-lg">Buy</button></a></div><h1 id="title">'+i.name+'</h1><p id="description">'+i.description+"</p>"):i.popularity>=5e3&&i.popularity<8e3?(i.popularity="☆☆☆☆",'<img id="prodPic" src="'+i.image+'" alt="bestbuy item"><div class="row"><span id="popularity"><h4>'+i.popularity+' 4/5</h4></div></span><div class="row"><p id="price">$'+i.price+'</p></div><div class="row"><a href="'+i.url+'"><button class="btn btn-success btn-lg">Buy</button></a></div><h1 id="title">'+i.name+'</h1><p id="description">'+i.description+"</p>"):(i.popularity="☆☆☆☆☆",'<img id="prodPic" src="'+i.image+'" alt="bestbuy item"><div class="row"><span id="popularity"><h4>'+i.popularity+' 5/5</h4></div></span><div class="row"><p id="price">$'+i.price+'</p></div><div class="row"><a href="'+i.url+'"><button class="btn  btn-success btn-lg">Buy</button></a></div><h1 id="title">'+i.name+'</h1><p id="description">'+i.description+"</p>")},empty:'<div id="notFoundContainer"><h1 id="notFoundHeader">Sorry Snoopy cannot find what you seek...</h1><img id="notFound" src="notFound.gif"></div>'}})),i.addWidget(instantsearch.widgets.refinementList({container:"#categoryMenu",attributeName:"categories",operator:"or",limit:10,cssClasses:{list:"categoryList",label:"checkbox-inline",count:"count",item:"lineItem"}})),i.addWidget(instantsearch.widgets.rangeSlider({container:"#priceMenu",attributeName:"price",tooltips:{format:function(i){return"$"+Math.floor(i)},min:-1,max:5e3}})),i.addWidget(instantsearch.widgets.refinementList({container:"#brandsMenu",attributeName:"brand",operator:"or",limit:10,cssClasses:{list:"brandsList",label:"checkbox-inline",count:"count",item:"lineItem"}})),i.addWidget(instantsearch.widgets.refinementList({container:"#typesMenu",attributeName:"type",operator:"or",limit:10,cssClasses:{list:"typesList",label:"checkbox-inline",count:"count",item:"lineItem"}})),i.addWidget(instantsearch.widgets.pagination({container:"#pagination-container",scrollTo:"#search-box",cssClasses:{root:"page",link:"num"}})),i.addWidget(instantsearch.widgets.stats({container:"#stats"})),i.addWidget(instantsearch.widgets.sortBySelector({container:"#sort-by",autoHideContainer:!0,indices:[{name:"tech_shop_data",label:"Most popular"},{name:"tech_shop_data_price_asc",label:"Lowest price"},{name:"tech_shop_data_price_desc",label:"Highest price"}],cssClasses:{root:"dropdown"}})),i.start(),$(".categoryLink").on("click",function(){$("#categoryMenu").css("display","block")}),$("#categoryMenu").on("mouseover",function(){$("#categoryMenu").css("display","block")}),$("#categoryMenu").on("mouseout",function(){$("#categoryMenu").css("display","none")}),$(".priceLink").on("click",function(){$("#priceMenu").css("display","block")}),$("#priceMenu").on("mouseover",function(){$("#priceMenu").css("display","block")}),$("#priceMenu").on("mouseout",function(){$("#priceMenu").css("display","none")}),$(".brandLink").on("click",function(){$("#brandsMenu").css("display","block")}),$("#brandsMenu").on("mouseover",function(){$("#brandsMenu").css("display","block")}),$("#brandsMenu").on("mouseout",function(){$("#brandsMenu").css("display","none")}),$(".typeLink").on("click",function(){$("#typesMenu").css("display","block")}),$("#typesMenu").on("mouseover",function(){$("#typesMenu").css("display","block")}),$("#typesMenu").on("mouseout",function(){$("#typesMenu").css("display","none")})}),$(function(){$("#search-box").focus();var i=instantsearch({appId:"W8I2YD0GJC",apiKey:"861d0757703675d68f5a0f915072381b",indexName:"tech_shop_data"});i.addWidget(instantsearch.widgets.searchBox({container:"#search-box",placeholder:"Search for products..."})),i.addWidget(instantsearch.widgets.hits({container:"#hits-container",cssClasses:{item:"productItem"},hitsPerPage:50,templates:{item:function(i){return i.popularity>=0&&i.popularity<1e3?(i.popularity="☆☆",'<img id="prodPic" src="'+i.image+'" alt="bestbuy item"><div class="row"><span id="popularity"><h4>'+i.popularity+' 2/5</h4></span></div><div class="row"><p id="price">$'+i.price+'</p></div><div class="row"><a href="'+i.url+'"><button class="btn btn-success btn-lg">Buy</button></a></div><h1 id="title">'+i.name+'</h1><p id="description">'+i.description+"</p>"):i.popularity>=1e3&&i.popularity<5e3?(i.popularity="☆☆☆",'<img id="prodPic" src="'+i.image+'" alt="bestbuy item"><div class="row"><span id="popularity"><h4>'+i.popularity+' 3/5</h4></div></span><div class="row"><p id="price">$'+i.price+'</p></div><div class="row"><a href="'+i.url+'"><button class="btn btn-success btn-lg">Buy</button></a></div><h1 id="title">'+i.name+'</h1><p id="description">'+i.description+"</p>"):i.popularity>=5e3&&i.popularity<8e3?(i.popularity="☆☆☆☆",'<img id="prodPic" src="'+i.image+'" alt="bestbuy item"><div class="row"><span id="popularity"><h4>'+i.popularity+' 4/5</h4></div></span><div class="row"><p id="price">$'+i.price+'</p></div><div class="row"><a href="'+i.url+'"><button class="btn btn-success btn-lg">Buy</button></a></div><h1 id="title">'+i.name+'</h1><p id="description">'+i.description+"</p>"):(i.popularity="☆☆☆☆☆",'<img id="prodPic" src="'+i.image+'" alt="bestbuy item"><div class="row"><span id="popularity"><h4>'+i.popularity+' 5/5</h4></div></span><div class="row"><p id="price">$'+i.price+'</p></div><div class="row"><a href="'+i.url+'"><button class="btn  btn-success btn-lg">Buy</button></a></div><h1 id="title">'+i.name+'</h1><p id="description">'+i.description+"</p>")},empty:'<div id="notFoundContainer"><h1 id="notFoundHeader">Sorry Snoopy cannot find what you seek...</h1><img id="notFound" src="notFound.gif"></div>'}})),i.addWidget(instantsearch.widgets.refinementList({container:"#categoryMenu",attributeName:"categories",operator:"or",limit:10,cssClasses:{list:"categoryList",label:"checkbox-inline",count:"count",item:"lineItem"}})),i.addWidget(instantsearch.widgets.rangeSlider({container:"#priceMenu",attributeName:"price",tooltips:{format:function(i){return"$"+Math.floor(i)},min:-1,max:5e3}})),i.addWidget(instantsearch.widgets.refinementList({container:"#brandsMenu",attributeName:"brand",operator:"or",limit:10,cssClasses:{list:"brandsList",label:"checkbox-inline",count:"count",item:"lineItem"}})),i.addWidget(instantsearch.widgets.refinementList({container:"#typesMenu",attributeName:"type",operator:"or",limit:10,cssClasses:{list:"typesList",label:"checkbox-inline",count:"count",item:"lineItem"}})),i.addWidget(instantsearch.widgets.pagination({container:"#pagination-container",scrollTo:"#search-box",cssClasses:{root:"page",link:"num"}})),i.addWidget(instantsearch.widgets.stats({container:"#stats"})),i.addWidget(instantsearch.widgets.sortBySelector({container:"#sort-by",autoHideContainer:!0,indices:[{name:"tech_shop_data",label:"Most popular"},{name:"tech_shop_data_price_asc",label:"Lowest price"},{name:"tech_shop_data_price_desc",label:"Highest price"}],cssClasses:{root:"dropdown"}})),i.start(),$(".categoryLink").on("click",function(){$("#categoryMenu").css("display","block")}),$("#categoryMenu").on("mouseover",function(){$("#categoryMenu").css("display","block")}),$("#categoryMenu").on("mouseout",function(){$("#categoryMenu").css("display","none")}),$(".priceLink").on("click",function(){$("#priceMenu").css("display","block")}),$("#priceMenu").on("mouseover",function(){$("#priceMenu").css("display","block")}),$("#priceMenu").on("mouseout",function(){$("#priceMenu").css("display","none")}),$(".brandLink").on("click",function(){$("#brandsMenu").css("display","block")}),$("#brandsMenu").on("mouseover",function(){$("#brandsMenu").css("display","block")}),$("#brandsMenu").on("mouseout",function(){$("#brandsMenu").css("display","none")}),$(".typeLink").on("click",function(){$("#typesMenu").css("display","block")}),$("#typesMenu").on("mouseover",function(){$("#typesMenu").css("display","block")}),$("#typesMenu").on("mouseout",function(){$("#typesMenu").css("display","none")})}),$(function(){$("#search-box").focus();var i=instantsearch({appId:"W8I2YD0GJC",apiKey:"861d0757703675d68f5a0f915072381b",indexName:"tech_shop_data"});i.addWidget(instantsearch.widgets.searchBox({container:"#search-box",placeholder:"Search for products..."})),i.addWidget(instantsearch.widgets.hits({container:"#hits-container",cssClasses:{item:"productItem"},hitsPerPage:50,templates:{item:function(i){return i.popularity>=0&&i.popularity<1e3?(i.popularity="☆☆",'<img id="prodPic" src="'+i.image+'" alt="bestbuy item"><div class="row"><span id="popularity"><h4>'+i.popularity+' 2/5</h4></span></div><div class="row"><p id="price">$'+i.price+'</p></div><div class="row"><a href="'+i.url+'"><button class="btn btn-success btn-lg">Buy</button></a></div><h1 id="title">'+i.name+'</h1><p id="description">'+i.description+"</p>"):i.popularity>=1e3&&i.popularity<5e3?(i.popularity="☆☆☆",'<img id="prodPic" src="'+i.image+'" alt="bestbuy item"><div class="row"><span id="popularity"><h4>'+i.popularity+' 3/5</h4></div></span><div class="row"><p id="price">$'+i.price+'</p></div><div class="row"><a href="'+i.url+'"><button class="btn btn-success btn-lg">Buy</button></a></div><h1 id="title">'+i.name+'</h1><p id="description">'+i.description+"</p>"):i.popularity>=5e3&&i.popularity<8e3?(i.popularity="☆☆☆☆",'<img id="prodPic" src="'+i.image+'" alt="bestbuy item"><div class="row"><span id="popularity"><h4>'+i.popularity+' 4/5</h4></div></span><div class="row"><p id="price">$'+i.price+'</p></div><div class="row"><a href="'+i.url+'"><button class="btn btn-success btn-lg">Buy</button></a></div><h1 id="title">'+i.name+'</h1><p id="description">'+i.description+"</p>"):(i.popularity="☆☆☆☆☆",'<img id="prodPic" src="'+i.image+'" alt="bestbuy item"><div class="row"><span id="popularity"><h4>'+i.popularity+' 5/5</h4></div></span><div class="row"><p id="price">$'+i.price+'</p></div><div class="row"><a href="'+i.url+'"><button class="btn  btn-success btn-lg">Buy</button></a></div><h1 id="title">'+i.name+'</h1><p id="description">'+i.description+"</p>")},empty:'<div id="notFoundContainer"><h1 id="notFoundHeader">Sorry Snoopy cannot find what you seek...</h1><img id="notFound" src="notFound.gif"></div>'}})),i.addWidget(instantsearch.widgets.refinementList({container:"#categoryMenu",attributeName:"categories",operator:"or",limit:10,cssClasses:{list:"categoryList",label:"checkbox-inline",count:"count",item:"lineItem"}})),i.addWidget(instantsearch.widgets.rangeSlider({container:"#priceMenu",attributeName:"price",tooltips:{format:function(i){return"$"+Math.floor(i)},min:-1,max:5e3}})),i.addWidget(instantsearch.widgets.refinementList({container:"#brandsMenu",attributeName:"brand",operator:"or",limit:10,cssClasses:{list:"brandsList",label:"checkbox-inline",count:"count",item:"lineItem"}})),i.addWidget(instantsearch.widgets.refinementList({container:"#typesMenu",attributeName:"type",operator:"or",limit:10,cssClasses:{list:"typesList",label:"checkbox-inline",count:"count",item:"lineItem"}})),i.addWidget(instantsearch.widgets.pagination({container:"#pagination-container",scrollTo:"#search-box",cssClasses:{root:"page",link:"num"}})),i.addWidget(instantsearch.widgets.stats({container:"#stats"})),i.addWidget(instantsearch.widgets.sortBySelector({container:"#sort-by",autoHideContainer:!0,indices:[{name:"tech_shop_data",label:"Most popular"},{name:"tech_shop_data_price_asc",label:"Lowest price"},{name:"tech_shop_data_price_desc",label:"Highest price"}],cssClasses:{root:"dropdown"}})),i.start(),$(".categoryLink").on("click",function(){$("#categoryMenu").css("display","block")}),$("#categoryMenu").on("mouseover",function(){$("#categoryMenu").css("display","block")}),$("#categoryMenu").on("mouseout",function(){$("#categoryMenu").css("display","none")}),$(".priceLink").on("click",function(){$("#priceMenu").css("display","block")}),$("#priceMenu").on("mouseover",function(){$("#priceMenu").css("display","block")}),$("#priceMenu").on("mouseout",function(){$("#priceMenu").css("display","none")}),$(".brandLink").on("click",function(){$("#brandsMenu").css("display","block")}),$("#brandsMenu").on("mouseover",function(){$("#brandsMenu").css("display","block")}),$("#brandsMenu").on("mouseout",function(){$("#brandsMenu").css("display","none")}),$(".typeLink").on("click",function(){$("#typesMenu").css("display","block")}),$("#typesMenu").on("mouseover",function(){$("#typesMenu").css("display","block")}),$("#typesMenu").on("mouseout",function(){$("#typesMenu").css("display","none")})}),$(function(){$("#search-box").focus();var i=instantsearch({appId:"L309RTZ2UR",apiKey:"7b77008ea319b33cb25e7ecdca09cb33",indexName:"tech_shop_data"});i.addWidget(instantsearch.widgets.searchBox({container:"#search-box",placeholder:"Search for products..."})),i.addWidget(instantsearch.widgets.hits({container:"#hits-container",cssClasses:{item:"productItem"},hitsPerPage:50,templates:{item:function(i){return i.popularity>=0&&i.popularity<1e3?(i.popularity="★★☆☆☆",'<img id="prodPic" src="'+i.image+'" alt="bestbuy item"><div class="row"><span id="popularity"><h4>'+i.popularity+' </h4></span></div><div class="row"><p id="price">$'+i.price+'</p></div><div class="row"><a href="'+i.url+'"><button class="btn btn-success btn-lg">Buy</button></a></div><h1 id="title">'+i.name+'</h1><p id="description">'+i.description+"</p>"):i.popularity>=1e3&&i.popularity<5e3?(i.popularity="★★★☆☆",'<img id="prodPic" src="'+i.image+'" alt="bestbuy item"><div class="row"><span id="popularity"><h4>'+i.popularity+' </h4></div></span><div class="row"><p id="price">$'+i.price+'</p></div><div class="row"><a href="'+i.url+'"><button class="btn btn-success btn-lg">Buy</button></a></div><h1 id="title">'+i.name+'</h1><p id="description">'+i.description+"</p>"):i.popularity>=5e3&&i.popularity<8e3?(i.popularity="★★★★☆",'<img id="prodPic" src="'+i.image+'" alt="bestbuy item"><div class="row"><span id="popularity"><h4>'+i.popularity+' </h4></div></span><div class="row"><p id="price">$'+i.price+'</p></div><div class="row"><a href="'+i.url+'"><button class="btn btn-success btn-lg">Buy</button></a></div><h1 id="title">'+i.name+'</h1><p id="description">'+i.description+"</p>"):(i.popularity="★★★★★",
'<img id="prodPic" src="'+i.image+'" alt="bestbuy item"><div class="row"><span id="popularity"><h4>'+i.popularity+' </h4></div></span><div class="row"><p id="price">$'+i.price+'</p></div><div class="row"><a href="'+i.url+'"><button class="btn  btn-success btn-lg">Buy</button></a></div><h1 id="title">'+i.name+'</h1><p id="description">'+i.description+"</p>")},empty:'<div id="notFoundContainer"><h1 id="notFoundHeader">Sorry Snoopy cannot find what you seek...</h1><img id="notFound" src="notFound.gif"></div>'}})),i.addWidget(instantsearch.widgets.refinementList({container:"#categoryMenu",attributeName:"categories",operator:"or",limit:10,cssClasses:{list:"categoryList",label:"checkbox-inline",count:"count",item:"lineItem"}})),i.addWidget(instantsearch.widgets.rangeSlider({container:"#priceMenu",attributeName:"price",tooltips:{format:function(i){return"$"+Math.floor(i)},min:-1,max:5e3}})),i.addWidget(instantsearch.widgets.refinementList({container:"#brandsMenu",attributeName:"brand",operator:"or",limit:10,cssClasses:{list:"brandsList",label:"checkbox-inline",count:"count",item:"lineItem"}})),i.addWidget(instantsearch.widgets.refinementList({container:"#typesMenu",attributeName:"type",operator:"or",limit:10,cssClasses:{list:"typesList",label:"checkbox-inline",count:"count",item:"lineItem"}})),i.addWidget(instantsearch.widgets.pagination({container:"#pagination-container",scrollTo:"#search-box",cssClasses:{root:"page",link:"num"}})),i.addWidget(instantsearch.widgets.stats({container:"#stats"})),i.addWidget(instantsearch.widgets.sortBySelector({container:"#sort-by",autoHideContainer:!0,indices:[{name:"tech_shop_data",label:"Most popular"},{name:"tech_shop_data_price_asc",label:"Lowest price"},{name:"tech_shop_data_price_desc",label:"Highest price"}],cssClasses:{root:"dropdown"}})),i.start(),$(".categoryLink").on("click",function(){$("#categoryMenu").css("display","block")}),$("#categoryMenu").on("mouseover",function(){$("#categoryMenu").css("display","block")}),$("#categoryMenu").on("mouseout",function(){$("#categoryMenu").css("display","none")}),$(".priceLink").on("click",function(){$("#priceMenu").css("display","block")}),$("#priceMenu").on("mouseover",function(){$("#priceMenu").css("display","block")}),$("#priceMenu").on("mouseout",function(){$("#priceMenu").css("display","none")}),$(".brandLink").on("click",function(){$("#brandsMenu").css("display","block")}),$("#brandsMenu").on("mouseover",function(){$("#brandsMenu").css("display","block")}),$("#brandsMenu").on("mouseout",function(){$("#brandsMenu").css("display","none")}),$(".typeLink").on("click",function(){$("#typesMenu").css("display","block")}),$("#typesMenu").on("mouseover",function(){$("#typesMenu").css("display","block")}),$("#typesMenu").on("mouseout",function(){$("#typesMenu").css("display","none")})});


// add scripts
$(function() {

	//set focus on search on page load
	$("#search-box").focus();

	// algolia instantsearch widgets
	var search = instantsearch({
	       appId: 'L309RTZ2UR',
	       apiKey: '7b77008ea319b33cb25e7ecdca09cb33',
	       indexName: 'tech_shop_data'
	});

	//searchbar
	search.addWidget(
             instantsearch.widgets.searchBox({
               container: '#search-box',
               placeholder: 'Search for products...'
             })
            );

	//product tiles 
	search.addWidget(
	  instantsearch.widgets.hits({
	    container: '#hits-container',
	    cssClasses:{
	    	item: "productItem"
	    		},
	    hitsPerPage: 50,
	    templates: {
	      item: function(data){
	      	if(data.popularity >= 0 && data.popularity < 1000){
	      		data.popularity = '★★☆☆☆';
			return '<img id="prodPic" src="'+ data.image +'" alt="bestbuy item"><div class="row"><span id="popularity"><h4>'+data.popularity+' </h4></span></div><div class="row"><p id="price">$'+data.price+'</p></div><div class="row"><a href="'+data.url+'"><button class="btn btn-success btn-lg">Buy</button></a></div><h1 id="title">'+data.name+'</h1><p id="description">'+data.description+'</p>';

		}else if(data.popularity >= 1000 && data.popularity < 5000 ){
	      		data.popularity = '★★★☆☆';
			return '<img id="prodPic" src="'+ data.image +'" alt="bestbuy item"><div class="row"><span id="popularity"><h4>'+data.popularity+' </h4></div></span><div class="row"><p id="price">$'+data.price+'</p></div><div class="row"><a href="'+data.url+'"><button class="btn btn-success btn-lg">Buy</button></a></div><h1 id="title">'+data.name+'</h1><p id="description">'+data.description+'</p>';

	     	}else if(data.popularity >= 5000 && data.popularity < 8000 ){
	      		data.popularity = '★★★★☆';
			return '<img id="prodPic" src="'+ data.image +'" alt="bestbuy item"><div class="row"><span id="popularity"><h4>'+data.popularity+' </h4></div></span><div class="row"><p id="price">$'+data.price+'</p></div><div class="row"><a href="'+data.url+'"><button class="btn btn-success btn-lg">Buy</button></a></div><h1 id="title">'+data.name+'</h1><p id="description">'+data.description+'</p>';

	     	}else{
	      		data.popularity = '★★★★★';
			return '<img id="prodPic" src="'+ data.image +'" alt="bestbuy item"><div class="row"><span id="popularity"><h4>'+data.popularity+' </h4></div></span><div class="row"><p id="price">$'+data.price+'</p></div><div class="row"><a href="'+data.url+'"><button class="btn  btn-success btn-lg">Buy</button></a></div><h1 id="title">'+data.name+'</h1><p id="description">'+data.description+'</p>';
	     	}

	       },
	       empty: '<div id="notFoundContainer"><h1 id="notFoundHeader">Sorry Snoopy cannot find what you seek...</h1><img id="notFound" src="notFound.gif"></div>'	
	    }
	  })
	);


	//categories menu
	search.addWidget(
	  instantsearch.widgets.refinementList({
	    container: '#categoryMenu',
	    attributeName: 'categories',
	    operator: 'or',
	    limit: 10,
	    cssClasses:{
	    	list: 'categoryList',
	    	label: 'checkbox-inline',
	    	count:'count',
	    	item: 'lineItem'
	    }
	  })
	  );

	//price range bar
	search.addWidget(
	  instantsearch.widgets.rangeSlider({
	    container: '#priceMenu',
	    attributeName: 'price',
	    tooltips: {
	      format: function(formattedValue) {
	        return '$' + Math.floor(formattedValue);
	      },
	      min:-1,
	      max: 5000,
	    }
	  })
	);

	//brands menu
	search.addWidget(
	  instantsearch.widgets.refinementList({
	    container: '#brandsMenu',
	    attributeName: 'brand',
	    operator: 'or',
	    limit: 10,
	    cssClasses:{
	    	list: 'brandsList',
	    	label: 'checkbox-inline',
	    	count:'count',
	    	item: 'lineItem'
	    }
	  })
	);	

	//types menu
	search.addWidget(
	  instantsearch.widgets.refinementList({
	    container: '#typesMenu',
	    attributeName: 'type',
	    operator: 'or',
	    limit: 10,
	    cssClasses:{
	    	list: 'typesList',
	    	label: 'checkbox-inline',
	    	count:'count',
	    	item: 'lineItem'
	    }
	  })
	);

	//pagination footer
	search.addWidget(
	  instantsearch.widgets.pagination({
	    container: '#pagination-container',
	     scrollTo: '#search-box',
	     cssClasses: {
	     	root:"page",
	     	link:"num"
	     }
	  })
	);

	search.addWidget(
	  instantsearch.widgets.stats({
	    container: '#stats'
	  })
	);

	search.addWidget(
	  instantsearch.widgets.sortBySelector({
	    container: '#sort-by',
	    autoHideContainer: true,
	    indices: [{
	      name: "tech_shop_data", label: 'Most popular'
	    }, {
	      name: "tech_shop_data" + '_price_asc', label: 'Lowest price'
	    }, {
	      name: "tech_shop_data" + '_price_desc', label: 'Highest price'
	    }],
	    cssClasses: {
	  	root: "dropdown"
	     }
	  })
	);

	//call to start searc on page load
	search.start();

	//Navbar animations

	//category menu animations
	$('.categoryLink').on("click", function () {
		$('#categoryMenu').css("display", "block");
	});	

	$('#categoryMenu').on('mouseover', function(){
		$('#categoryMenu').css("display", "block");
	});	

	$('#categoryMenu').on('mouseout', function(){
		$('#categoryMenu').css("display", "none");
	});	


	//price menu animations
	$('.priceLink').on("click", function () {
		$('#priceMenu').css("display", "block");
	});	

	$('#priceMenu').on('mouseover', function(){
		$('#priceMenu').css("display", "block");
	});	

	$('#priceMenu').on('mouseout', function(){
		$('#priceMenu').css("display", "none");
	});	


	//brand menu animations
	$('.brandLink').on("click", function () {
		$('#brandsMenu').css("display", "block");
	});	

	$('#brandsMenu').on('mouseover', function(){
		$('#brandsMenu').css("display", "block");
	});	

	$('#brandsMenu').on('mouseout', function(){
		$('#brandsMenu').css("display", "none");
	});

	//types menu animations
	$('.typeLink').on("click", function () {
		$('#typesMenu').css("display", "block");
	});	

	$('#typesMenu').on('mouseover', function(){
		$('#typesMenu').css("display", "block");
	});	

	$('#typesMenu').on('mouseout', function(){
		$('#typesMenu').css("display", "none");
	});
}); 