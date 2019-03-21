var keystone = require('keystone');
var Types = keystone.Field.Types;

/**
 * Sponsor Model
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
	description: { type: Types.Textarea },
	logo: { type: Types.CloudinaryImage },

	jobs: { type: Types.Relationship, ref: 'Job', many: true },
	website: { type: Types.Url }

});

Sponsor.relationship({ path: 'donations', ref: 'Donation', refPath: 'sponsors' });
Sponsor.defaultColumns = 'name, logo, description, donations, jobs';
Sponsor.register();
