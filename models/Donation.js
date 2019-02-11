var keystone = require('keystone');
var Types = keystone.Field.Types;

/**
 * Donation Model
 * ==========
 */

var Donation = new keystone.List('Donation', {
	map: { name: 'name' },
	autokey: { path: 'slug', from: 'name sponsor', unique: true },
	track: true
});

Donation.add({
	name: { 
		type: String 
	},
	year: { 
		type: Types.Select, 
		number: true,
		options: '2022, 2021, 2020, 2019'
	},
	level: {
		type: Types.Select,
		options: 'Platinum, Gold, Silver, Bronze'
	}
});

Donation.defaultColumns = 'name';
Donation.register();