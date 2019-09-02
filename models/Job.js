var keystone = require('keystone');
var Types = keystone.Field.Types;

/**
 * Job Model
 * ==========
 */

 var Job = new keystone.List('Job', {
 	map: { name: 'title' },
 	autokey: { path: 'slug', from: 'title sponsor', unique: true },
 	track: true
 });

 Job.add({
	title: { 
 		type: String, 
 		required: true, 
 		initial: true 
 	},
 	approved: { 
 		type: Boolean 
 	},
 	description: { 
 		type: Types.Textarea, 
 		required: true, 
 		initial: true 
 	},
 	employmentType: { 
 		type: Types.Select, 
 		label: 'Employment Type', 
 		options: 'Full-time, Part-time, Contract, Temporary, Volunteer, Internship',
 		required: true,
 		initial: true
 	},
 	location: {	
 		type: String, 
 		initial: true,
 		required: true
 	},
 	sponsor: { 
 		type: Types.Relationship, 
 		ref: 'Sponsor', 
 		many: false, 
 		initial: true, 
 		required: true 
 	},
	primaryContact: { 
		type: String, 
		required: false, 
		initial: true 
	},
	applicationWebsite: { 
		type: String, 
		required: false, 
		initial: true 
	},
	applicationEmail: { 
		type: String, 
		required: false, 
		initial: true 
	},
	year: {
		type: Types.Select,
		number: true,
		options: '2022, 2021, 2020, 2019'
	}
 });

Job.schema.pre('save', function (next) {
	this.wasNew = this.isNew;
	next();
});

Job.schema.post('save', function () {
	if (this.wasNew) {
		this.sendNotificationEmail();
	}
});

Job.schema.methods.sendNotificationEmail = function (callback) {
	if (typeof callback !== 'function') {
		callback = function (err) {
			if (err) {
				console.error('There was an error sending the notification email:', err);
			}
		};
	}

	if (!process.env.MAILGUN_API_KEY || !process.env.MAILGUN_DOMAIN) {
		console.log('Unable to send email - no mailgun credentials provided');
		return callback(new Error('could not find mailgun credentials'));
	}

	var job = this;
	var brand = keystone.get('brand');

	keystone.list('Y').model.find().where('isAdmin', true).exec(function (err, admins) {
		if (err) return callback(err);
		new keystone.Email({
			templateName: 'job-notification',
			transport: 'mailgun',
		}).send({
			to: 'curtis@lrtechfest.com',
			from: {
				name: 'Curtis Weeks',
				email: 'curtis@lrtechfest.com',
			},
			subject: 'New Job for Little Rock Tech Fest',
			job: job,
			brand: brand,
		}, callback);
	});
};

Job.defaultColumns = 'title, sponsor, year, approved';
Job.register();
