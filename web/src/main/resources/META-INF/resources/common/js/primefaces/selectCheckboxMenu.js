
function readonly() {
    $('.readonly').keypress(function(event) {
            return false;
    });
}	

$( document ).ready(function() {
	$(document).on('mouseover click', 'div.ui-row-editor', function() {
	    $('span.ui-icon-pencil').prop('title', 'Editar');
	    $('span.ui-icon-close').prop('title', 'Cancelar');
	    $('span.ui-icon-check').prop('title', 'Salvar');
	});
});

var selectCheckboxMenuLabelControl = {
    //Warn: messages will be replaced by messages.properties.
    allItemsSelected: "Todos selecionados",
    noItemsSelected: "Nenhum selecionado",
    nItemsSelected: "{0} item(ns) selecionado(s)",

    getContainerId: function(parent) {
    	var id = parent.attr("id");
    	if (id == null) {
    		return null;
    	} else {
        	return "#" + id.replace("_panel", "").replace(/:/g,"\\:");
    	}
    },

    getComponentLabel: function(containerId) {
        return $(containerId).find(".ui-selectcheckboxmenu-label-container label");
    },

    inject: function () {
    	var $$this = this;
        $('.ui-selectcheckboxmenu-header span').click(
                function() {
                    var containerId = $$this.getContainerId($(this).parent().parent().parent().parent());
                    var label = $$this.getComponentLabel(containerId);
                    var allSelected = $(this).hasClass('ui-icon-blank');
                    if (allSelected > 0) {
                        label.html($$this.allItemsSelected);
                    } else {
                        label.text($$this.noItemsSelected);
                    }
                });

        $(".ui-selectcheckboxmenu-items-wrapper li").click(
                function() {
                    var containerId = $$this.getContainerId($(this).parent().parent().parent());
                    var label = $$this.getComponentLabel(containerId);
                    var itemQty = $(this).parent().find("[aria-checked]").length;
                    var selectedQty = $(this).parent().find("[aria-checked='true']").length;
                    
                    if (selectedQty > 0 && itemQty != selectedQty) {
                        label.html( $$this.nItemsSelected.replace("{0}", selectedQty));
                    } else if (itemQty == selectedQty) {
                    	label.text($$this.allItemsSelected);
                    } else {
                        label.text($$this.noItemsSelected);
                    }
                });
    }
};
