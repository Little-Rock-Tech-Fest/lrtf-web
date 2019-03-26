var keystone = require('keystone');
var Types = keystone.Field.Types;

/**
 * Job Model
 * ==========
 */

 var Job = new keystone.List('Job', {
 	map: { name: 'name' },
 	autokey: { path: 'slug', from: 'name sponsor', unique: true },
 	track: true
 });

 Job.add({
 	name: { type: String, required: true, initial: true },
 	description: { type: Types.Textarea, required: true, initial: true },
 	type: { 
 		type: Types.Select, 
 		label: 'Employment Type', 
 		options: 'Full-time, Part-time, Contract, Temporary, Volunteer, Internship',
 		required: true,
 		initial: true
 	},
 	location: {	type: String, initial: true },
 	sponsor: { type: Types.Relationship, ref: 'Sponsor', many: false, initial: true, required: true },
 	approved: { type: Boolean }
 });



 Job.defaultColumns = 'name, sponsor, approved';
 Job.register();
