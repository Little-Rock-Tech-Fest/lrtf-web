var keystone = require('keystone');

exports = module.exports = function (req, res) {

	var view = new keystone.View(req, res);
	var locals = res.locals;

	locals.section = 'events';
	locals.filters = {
		year: req.params.year,
	}
	locals.data = {
		year: req.params.year,
		sponsors: [],
		speakers: [],
	};

	view.on('init', function (next) {

		locals.data.year = req.params.year;
		locals.data.sponsors = require('../../archive/'+locals.data.year+'/sponsors.json');
		locals.data.speakers = require('../../archive/'+locals.data.year+'/speakers.json');
		next();
		
	});

	view.render('event');

};