(function($) {
	var getPath = function(data) {
		return data.name.split('/');
	}

	var render = function(templateName, data) {
		var template = $("[type='html/"+templateName+"']").html(),
			$rendered = $();

		if($.type(data) !== 'array') {
			data = [data];
		}

		$.each(data, function(id, value) {
			$rendered = $rendered.add($.render(template, value));
		});

		return $rendered;
	}

	$.model = function(name) {
		return $(document).model(name);
	}

	$.fn.model = function(name) {
		var $this = $(document),
			$fields = $(),
			name;

		$this.model = {};

		$this.model.data = function(data) {
			if($.type(data) === 'undefined') {
				var data = {};
				$fields.each(function(id, el) {
					var $el = $(el),
						path = getPath($el.data());

					data[path[1]] = $el.is('input:checkbox') ? $el.prop('checked') : $el.val();
				});

				return data;
			}

			$.each(data, function(id, val) {
				var $el = $this.find('[data-name="' + name + '/' + id + '"]'),
					data = $el.data();

				if($el.is('input:checkbox')) {
					$el.prop('checked', val);
				} else if($el.is('input') || $el.is('textarea') || $el.is('select')) {
					$el.val(val);
				} else {
					if($.type(data.template) !== 'undefined') {
						$el.html(render(data.template, val));
					} else {
						$el.text(val);
					}
				}

				$fields = $fields.add($el);
			});
		} 

		$this.model.clear = function() {
			$fields.val('');
		}
		
		$this.on('click keyup', '[data-name]', function(e) {
			var $target = $(this),
				data = $target.data(),
				path = getPath(data);

			if(path.length < 2 || path[0] !== name) {
				return;
			}

			$fields = $fields.add($target);

			$this.trigger('changed', $target);
		});

		return $this;
	}
})(jQuery);
