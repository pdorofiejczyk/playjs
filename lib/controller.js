(function($) {
	var $document = $(document);

	var getActionName = function(action, type) {
		return action + type.charAt(0).toUpperCase() + type.slice(1)
	};

	var createHandler = function($ctrl, name, handlers) {

		return function(e) {
			var $container, $target, data, action, actionName;

			$container = $(this),
			$target = $(e.target),
			data = $.extend({}, $container.data(), $target.data());

			if($.type(data.action) === 'undefined') {
				return;
			}

			action = data.action.split('/');

			if(action.length < 2 || action[0] !== name) {
				return;
			}

			actionName = getActionName(action[1], e.type);

			if($.type(handlers[actionName]) !== 'undefined') {
				handlers[actionName].apply($ctrl, [$container, $target, data]);
			}

			$ctrl.trigger('action', [action, e.type, data]);
		}
	}

	$.controller = function(name, handlers) {
		return $document.controller(name, handlers);
	}

	$.fn.controller = function(name, handlers) {
		var $this = $(this);

		$this.on('click keyup', '[data-element], :not([data-element]) > [data-action]', createHandler($this, name, handlers));

		return $this;
	};
})(jQuery);
