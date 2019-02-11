var keystone = require('keystone');
var Types = keystone.Field.Types;

/**
 * Member Model
 * ==========
 */

var Member = new keystone.List('Member', {
	map: { name: 'name' },
	autokey: { path: 'slug', from: 'name', unique: true },
	track: true,
});

Member.add({
	name: { type: String },
	img: { type: Types.CloudinaryImage },
	twitter: { type: Types.Url },
	linkedin: { type: Types.Url },
	github: { type: Types.Url },
	website: { type: Types.Url },
	title: { type: String },
	company: { type: String },
	altTitle: { type: String },
	altCompany: { type: String }
});

Member.defaultColumns = 'name, twitter, linkedin, github, website, title, company, altTitle, altCompany';
Member.register();