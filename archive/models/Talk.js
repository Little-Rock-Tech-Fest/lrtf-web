
var keystone = require('keystone');
var Types = keystone.Field.Types;

/**
 * Talk Model
 * ==========
 */

var Talk = new keystone.List('Talk', {
	map: { name: 'name' },
	autokey: { path: 'slug', from: 'title speaker startDate', unique: true },
  tracked: true
});

Talk.add({
	speaker: {type: Types.Relationship, ref: 'Speaker' },
	name: { type: String },
  startDate: {type: Types.Datetime},
  endDate: {types: Types.Datetime},
	description: { type: String },
});



Talk.defaultColumns = 'name, startDate|20%, endDate|20%, description, speaker';
Talk.register();
