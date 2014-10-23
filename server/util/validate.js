var validate = {
	validateSchdl: function (isDate) {
		if (isDate.toString().toLowerCase() != 'false'){
			var d = new Date(parseInt(isDate));
			if (isNaN(d.getTime())){
				return false;
			}
			else {
				return !validate.isPastTime(d);
			}
		}
		else{
			return true;
		}
	},
	isPastTime: function(date){
		var now = new Date;
		var target = new Date(date);
		if (now > target){
			return true;
		}
		else{
			return false;
		}
	}
}

module.exports = validate;