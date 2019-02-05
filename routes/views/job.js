var keystone = require('keystone');

exports = module.exports = function (req, res) {

	var view = new keystone.View(req, res);
	var locals = res.locals;

	// Set locals
	locals.section = 'job';

	// Load the galleries by sortOrder
	view.query('jobs', keystone.list('Job').model.find().sort('sortOrder'));

	// Render the view
	view.render('job');

};
