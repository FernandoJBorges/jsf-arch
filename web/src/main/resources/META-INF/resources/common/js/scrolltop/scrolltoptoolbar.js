/*
 * Script scrolltopoffset
 * Responsável por fixar a barra de ações 'toolbar' no topo caso haja scroll nas telas de pesquisa
 * 
 */
$(document).ready(
		function() {
			var classFixed = "ng-toolbar-fixed";
			var classPanelTitleFixed = "ng-panel-title-fixed";
			var classPanelActionFixed = "ng-panel-action-fixed";
			var classPanelToolbarFixed = "ng-panel-toolbar-fixed";

			var panelTitle = $('.ng-title-view');
			var panelToolbar = $('.ng-panel-toolbar');
			var panelAction = $('.ng-panel-action');
			var panelDatatable = $(".ng-panel-datatable");
			var panelContent = $("#ng-page-content");
			var panelHidden = $(".hidden_toolbars");
			
			var headerHeight = 72;
			var minHeight = 550;
			
			$(window).off("scroll");
			var addClass = function() {
				panelTitle.addClass(classPanelTitleFixed).addClass(classFixed);
				panelAction.addClass(classPanelActionFixed).addClass(classFixed);
				panelToolbar.addClass(classPanelToolbarFixed).addClass(classFixed);
				panelHidden.css('height', '108px').css('width', '100%');
			}
			var removeClass = function() {
				panelAction.removeClass(classPanelActionFixed).removeClass(classFixed);
				panelTitle.removeClass(classPanelTitleFixed).removeClass(classFixed);
				panelToolbar.removeClass(classPanelToolbarFixed).removeClass(classFixed);
				panelHidden.css('height', '0px');
			}

			var init = function() {
				if (panelContent.height() < minHeight) {
					removeClass();
				}
			}
			window.setTimeout(init, 1);
			$(window).scroll(function() {
				var scrollTopoffset = panelDatatable.offset().top - headerHeight;
				if ($(window).scrollTop() > scrollTopoffset) {
					addClass();
				} else {
					removeClass();
				}
			});
		});