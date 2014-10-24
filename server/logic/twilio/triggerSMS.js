var client = require('./client');
var sms = {
	triggerSMS: function(reminder){
		return client.sendMessage({
			to: reminder.user.phone,
			from: '+14158010400',
			body: '[Reminder]: ' + reminder.remindThis // This is the text
		}, function(error, response){
			console.log(error || response);
		});
	}
}

module.exports = sms;