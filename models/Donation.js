var keystone = require('keystone');
var Types = keystone.Field.Types;

/**
 * Donation Model
 * ==========
 */

var Donation = new keystone.List('Donation', {
	map: { name: 'name' },
	autokey: { path: 'slug', from: 'year name', unique: true },
	track: true,
});

Donation.add({
	name: {
		type: String,
		note: 'e.g. 2022 Platinum'
	},
	year: {
		type: Types.Select,
		number: true,
		options: '2022, 2021, 2020, 2019'
	},
	level: {
		type: Types.Select,
		options: 'Platinum, Gold, Silver, Bronze'
	},
	weight: {
		type: Types.Number,
		note: 'Used for sorting. e.g. Platinum = 0, Gold = 1...'
	}
});
Donation.relationship({ path: 'sponsors', ref: 'Sponsor', refPath: 'donations' });
Donation.defaultColumns = 'name', 'year', 'level', 'sponsors';
Donation.register();
