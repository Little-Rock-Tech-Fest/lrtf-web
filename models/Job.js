var keystone = require('keystone');
var Types = keystone.Field.Types;

/**
 * Talk Model
 * ==========
 */

var Job = new keystone.List('Job', {
	map: { name: 'name' },
	autokey: { path: 'slug', from: 'name sponsor', unique: true },
  track: true
});

Job.add({
	name: { type: String },
	description: { type: String },
  sponsor: { type: Types.Relationship, ref: 'Sponsor', many: false },
});



Job.defaultColumns = 'name, sponsor';
Job.register();
