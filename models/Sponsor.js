var keystone = require('keystone');
var Types = keystone.Field.Types;

/**
 * Talk Model
 * ==========
 */

var Sponsor = new keystone.List('Sponsor', {
	map: { name: 'name' },
	autokey: { path: 'slug', from: 'name', unique: true },
  track: true,
  drilldown: 'jobs'
});

Sponsor.add({

	name: { type: String },
	description: { type: String },
  logo: { type: Types.CloudinaryImage },
  jobs: { type: Types.Relationship, ref: 'Job', many: true },

});



Sponsor.defaultColumns = 'name, logo, description, jobs';
Sponsor.register();
