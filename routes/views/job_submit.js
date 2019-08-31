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
	locals.year = new Date().getFullYear();

	view.query('sponsors', keystone.list('Sponsor').model.find().sort('sortOrder'));

	// On POST requests, add the Job item to the database
	view.on('post', { action: 'submit' }, function (next) {

		var newJob = new Job.model();
		var updater = newJob.getUpdateHandler(req);

		updater.process(req.body, {
			flashErrors: true,
			fields: 'year, sponsor, primaryContact, title, location, employmentType, description',
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
