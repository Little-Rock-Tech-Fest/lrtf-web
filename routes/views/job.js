var keystone = require('keystone');

exports = module.exports = function (req, res) {

	var view = new keystone.View(req, res);
	var locals = res.locals;

	locals.section = 'jobs';
	locals.filters = {
		job: req.params.job,
	}
	locals.data = {
		job: [],
	}

	view.on('init', function (next) {

		var q = keystone.list('Job').model.findOne({
			slug: locals.filters.job,
		}).populate('sponsor');

		q.exec(function (err, result) {
			console.log(result);
			locals.data.job = result;
			next(err);
		});

	});

	view.render('job');

};
