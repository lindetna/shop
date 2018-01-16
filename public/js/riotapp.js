/***********************
	Execution
************************/

// Routes for all the SPApp
var routes = {
    base_url_tags: '/js/tag/',
	accueil : {
        tags: [{name:'accueil', url:'accueil.html', mountPoint:'.content_container'}],
        css: [{id: 'accueil_css', url:'/css/accueil.css'}],
	},
    shop : {
        tags: [{name:'shop', url:'shop.html', mountPoint:'.content_container'}],
        css: [{id: 'shop_css', url:'/css/shop.css'}, {id: 'inscription_theme', url: '/css/selectize.default.css'}],
	},
};

var app = new App();

app.initRoutes(routes);

riot.compile(function() {
    riot.route.start(true);
    if (window.location.hash === '' || window.location.hash === '/') {
        riot.mount('accueil', app);
    }
});