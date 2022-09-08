var keystone = require('keystone');

exports = module.exports = function (req, res) {

	var view = new keystone.View(req, res);
	var locals = res.locals;
	var request = require('request');
	
	locals.moment = require('moment');
	locals.section = 'schedule';

	locals.data = {
		schedule: [],
	}

	view.on('init', function (next) {

		request('https://sessionize.com/api/v2/picvw5z5/view/GridSmart', function (error, response, body) {
			
			if (error) {
				return console.dir(error)
			}
			
			locals.data.schedule = JSON.parse(body);
			next();

		});

	});

	view.render('schedule');

};
