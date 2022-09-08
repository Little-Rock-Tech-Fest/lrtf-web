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
		donations: [],
		sponsors: [],
		speakers: [],
		members: [],
	}

	view.on('init', function (next) {

		var Donation = keystone.list('Donation');
		var Sponsor = keystone.list('Sponsor');
		var Member = keystone.list('Member');

		Donation.model.find()
			.populate('sponsors')
			.sort('weight')
			.where('year',  '2022')
			.exec(function (err, donations) {
				locals.data.donations = donations;
			});

		Sponsor.model.find()
			.populate('donations')
			.exec(function (err, sponsors) {
				locals.data.sponsors = sponsors;
			});

		Member.model.find()
			.exec(function (err, members) {
				locals.data.members = members;
			});

		request('https://sessionize.com/api/v2/picvw5z5/view/Speakers', function (error, response, body) {
			if (error) { 
				return console.dir(error); 
			}
			var speakers = [];
			var json = JSON.parse(body);
			for (var speaker in json) {
				if (json[speaker].isTopSpeaker === false) {
					speakers.push(json[speaker]);
				}
			}
			shuffle(speakers);
			speakers = speakers.slice(0,4);
			locals.data.speakers = speakers;
			next();
		});		

	});

	view.render('index');
};
