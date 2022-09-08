var keystone = require('keystone');

exports = module.exports = function (req, res) {

	var view = new keystone.View(req, res);
	var locals = res.locals;
	var request = require('request');

	locals.section = 'session';

	locals.filters = {
		session: req.params.session,
	}

	locals.data = {
		session: [],
		speakers: [],
		tags: [],
	}

	view.on('init', function (next) {

		request('https://sessionize.com/api/v2/picvw5z5/view/all', function (error, response, body) {
			if (error) { 
				return console.dir(error) 
			}
			var speakers = [];
			var categoryItems = [];
			var json = JSON.parse(body);
			for (var session in json.sessions) {
				if(json.sessions[session].id == locals.filters.session) {
					locals.data.session = json.sessions[session];
					for (var sessionSpeakerId in json.sessions[session].speakers) {
						for(var speaker in json.speakers) {
							if(json.sessions[session].speakers[sessionSpeakerId] == json.speakers[speaker].id) {
								speakers.push(json.speakers[speaker]);
							}
						}
					}
					for (var sessionCategoryItemId in json.sessions[session].categoryItems) {
						for(var category in json.categories) {
							for(var item in json.categories[category].items) {
								if(json.sessions[session].categoryItems[sessionCategoryItemId] == json.categories[category].items[item].id) {
									categoryItems.push(json.categories[category].items[item]);
								}
							}
						}
					}
				}
			}
			locals.data.speakers = speakers;
			locals.data.tags = categoryItems;
			//console.log(locals.data);
			if (locals.data.session === undefined || locals.data.session.length == 0) {
				res.status(404).send('Page not found');
			} else {
				next();
			}

		});

	});

	view.render('session');

};
