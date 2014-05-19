(function($) {
	var RELATION_PREFIX = 'relation';

	var getRelationName = function(name) {
		return RELATION_PREFIX + (name ? (name.charAt(0).toUpperCase() + name.slice(1)) : '');
	};

	$.fn.related = function(name, ctx) {
		var $this = $(this),
			relationSelector = $this.data(getRelationName(name));

		if($.type(relationSelector) !== 'undefined') {
			return $(relationSelector, ctx);
		}

		return $();
	}

})(jQuery);
