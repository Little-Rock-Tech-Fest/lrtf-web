var keystone = require('keystone');

exports = module.exports = function (req, res) {

	var view = new keystone.View(req, res);
	var locals = res.locals;

	locals.section = 'jobs';

	locals.data = {
		jobs: [],
	}

	view.on('init', function (next) {

		var q = keystone.list('Job').model.find()
			.populate('sponsor')
			.sort('createdAt')
			.where('year', '2019');

		q.exec(function (err, results) {
			locals.data.jobs = results;
			next(err);
		});

	});

	view.render('jobs');

};
