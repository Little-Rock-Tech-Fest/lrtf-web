var keystone = require('keystone');
var Job = keystone.list('Job');

exports = module.exports = function (req, res) {

	var view = new keystone.View(req, res);
	var locals = res.locals;

	// Set locals
	locals.section = 'jobs';
	locals.employmentTypes = Job.fields.employmentType.ops;
	locals.formData = req.body || {};
	locals.validationErrors = {};
	locals.jobSubmitted = false;

	locals.data = {
		sponsors: [],
		year: new Date().getFullYear(),
	}

	view.on('init', function (next) {
		var q = keystone.list('Sponsor').model.find()
			.sort('name');
		q.exec(function (err, result) {
			locals.data.sponsors = result;
			next(err);
		});
	});

	// On POST requests, add the Job item to the database
	view.on('post', { action: 'submit' }, function (next) {

		var newJob = new Job.model();
		var updater = newJob.getUpdateHandler(req);

		updater.process(req.body, {
			flashErrors: true,
			fields: 'title, location, sponsor, employmentType, primaryContact, applicationWebsite, applicationEmail, description, year',
			errorMessage: 'There was a problem submitting your job:',
		}, function (err) {
			if (err) {
				if (err.errors) {
					locals.validationErrors = err.errors;
				}
			} else {
				locals.jobSubmitted = true;
			}
			next();
		});
	});

	view.render('job_submit');
};
