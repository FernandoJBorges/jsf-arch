$(document).ready(function() {
	// Prevent JSF to click at first button of page when user press enter
	$('input').on('keypress', function(e) {
		if (e.keyCode == 13) {
			e.preventDefault();
			e.stopPropagation();
		}
	});
	
	PrimeFaces.widget.SelectOneMenu.prototype.handleEnterKey = function(e) {
	    if (this.panel.is(':visible')) {
	        this.selectItem(this.getActiveItem());
	        e.preventDefault();
	        e.stopPropagation();
	    }
	}
});
