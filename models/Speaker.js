var keystone = require('keystone');
var Types = keystone.Field.Types;

/**
 * Speaker Model
 * ==========
 */

var Speaker = new keystone.List('Speaker', {
	map: { name: 'name' },
	autokey: { path: 'slug', from: 'name', unique: true },
	track: true
});

Speaker.add({
	name: { type: String, required: true },
	image: { type: Types.CloudinaryImage },
	content: {
		brief: { type: Types.Html, wysiwyg: true, height: 150 },
		extended: { type: Types.Html, wysiwyg: true, height: 400 },
	},
	talks: { type: Types.Relationship, ref: 'Talk', many: true },
});

Speaker.schema.virtual('content.full').get(function () {
	return this.content.extended || this.content.brief;
});

Speaker.defaultColumns = 'name, image|20%, talks';
Speaker.register();
