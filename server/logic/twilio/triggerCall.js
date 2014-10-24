var client = require('./client');

var call = {
	triggerCall: function (reminder) {
		return client.makeCall({
			to: reminder.user.phone,
			from:'+14158010400',
			url: 'http://4487093a.ngrok.com/call/twim1/' + reminder.user._id + '/' + reminder._id
		}, function(error, response){
			console.log(error || response);
		});
	}
}

module.exports = call;