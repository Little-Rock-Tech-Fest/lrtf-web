var keystone = require('keystone');
//var async = require('async');

function shuffle(a) {
    for (let i = a.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [a[i], a[j]] = [a[j], a[i]];
    }
    return a;
}

exports = module.exports = function (req, res) {

	var view = new keystone.View(req, res);
	var locals = res.locals;
	var request = require('request');

	locals.section = 'home';
	locals.data = {
		sponsors: [],
		speakers: [],
		donations: [],
	}

	view.on('init', function (next) {

		var q = keystone.list('Donation').model.find()
		.populate('sponsors')
		.sort('weight')
		.where('year', '2019');

		q.exec(function (err, results) {
			locals.data.donations = results;
			next(err);
		});

	});

	view.on('init', function (next) {

		var q = keystone.list('Sponsor').model.find()
		.populate('donations');

		q.exec(function (err, results) {
			locals.data.sponsors =  results;
			next(err);
		});

	});

	view.on('init', function (next) {

		request('https://sessionize.com/api/v2/vmstvnf4/view/speakers', function (error, response, body) {

			if (error) {
				return console.dir(error)
			}

			var speakers = [];
			var json = JSON.parse(body);
			for (var speaker in json) {
				if(json[speaker].isTopSpeaker === false) {
					speakers.push(json[speaker]);
				}
			}
			shuffle(speakers);
			speakers = speakers.slice(0, 4);

			locals.data.speakers = speakers;
			next();

		});

	});

	// Render the view
	view.render('index');
};
