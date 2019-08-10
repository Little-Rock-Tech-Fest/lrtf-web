var keystone = require('keystone');

exports = module.exports = function (req, res) {

	var view = new keystone.View(req, res);
	var locals = res.locals;
	var request = require('request');

	locals.section = 'speakers';

	locals.data = {
		speakers: [],
	}

	view.on('init', function (next) {

		request('https://sessionize.com/api/v2/vmstvnf4/view/speakers', function (error, response, body) {
			
			if (error) {
				return console.dir(error)
			}
			
			locals.data.speakers = JSON.parse(body);
			next();

		});

	});

	view.render('speakers');

};
