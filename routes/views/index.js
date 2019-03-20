var keystone = require('keystone');
//var async = require('async');

exports = module.exports = function (req, res) {

	var view = new keystone.View(req, res);
	var locals = res.locals;

	locals.section = 'home';
	locals.data = {
		sponsors: [],
		donations: [],
	}

	view.on('init', function (next) {
		
		var q = keystone.list('Donation').model.find()
			.populate('sponsors')
			.sort('weight')
			.where('year', '2019');

		q.exec(function (err, results) {
			locals.data.donations = results;
			next(err);
		});

	});

	view.on('init', function (next) {

		var q = keystone.list('Sponsor').model.find()
			.populate('donations');

		q.exec(function (err, results) {
			locals.data.sponsors =  results;
			next(err);
		});

	});

	// Render the view
	view.render('index');
};
