var Employees = function() {
	var self = $.observable(this),
		employees = [],
		validators = {
			name: /^[a-zA-Z]+$/,
			surname: /^[a-zA-Z]+$/
		},
		defaults = {
			active: false
		};

	self.validate = function(data) {
		var errors = [];
		$.each(validators, function(name, validator) {
			if($.type(data[name]) === 'undefined' || data[name].match(validator) === null) {
				errors.push({'name': name});
			}
		});

		return errors;
	}

	self.get = function(id) {
		return employees[id];
	}

	self.save = function(data) {
		data = $.type(data) === 'array' ? data : [data];

		$.each(data, function(id, d) {
			var errors = self.validate(d);

			if(errors.length > 0) {
			    self.trigger('error', errors);

			    return data;			
			}

			d = $.extend({}, defaults, d);

		    if($.type(d.id) !== 'undefined' && d.id !== '') {
		      employees[d.id] = $.extend(employees[d.id], d);
		    } else {
		    	var id = employees.push(d);
		    	d.id = id - 1;
			}
		});

	    self.trigger('change', employees);

	    return data;
	}

	self.remove = function(id) {
    	delete employees[id];
    	self.trigger('change', employees);
	}

	self.filter = function(name) {
		var filtered = [];
		$.each(employees, function(id, val) {
			if(val.name.search(name) !== -1 || val.surname.search(name) !== -1) {
				filtered.push(val);
			}
		});

		self.trigger('filter', filtered);
		
		return filtered;
	}

	return self;
}