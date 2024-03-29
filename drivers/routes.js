module.exports = function(app){
	return {
		create : function(appExpress, express){
            appExpress.use('/static', express.static(app.root + '/public'));
			for(key in app.config.routes){
				var _route = app.config.routes[key];
				appExpress.get(_route.path, function(req, res){
					res.sendFile(app.root + '/views/'+_route.view+'.html');
				});
			}
		}
	}
}