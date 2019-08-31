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
	primaryContact: { 
		type: String, 
		required: true, 
		initial: true 
	},
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
 		required: false 
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
		//todo
		//this.sendNotificationEmail();
	}
});

 Job.defaultColumns = 'title, sponsor, year, approved';
 Job.register();
