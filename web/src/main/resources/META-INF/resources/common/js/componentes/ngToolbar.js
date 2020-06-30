var ngToolbar = {
	isProccessing: false,
	lastWidth: 0,
	baseWidth: 0,
	widthAjust: 20,
	minWidth: 0, 
	
	inject: function(){
		if($(".ng-toolbar .actions li").children().length <= 1){
			$(".ng-toolbar").hide();
		} else {
			$(window).off("resize", ngToolbar.windowsResize);
			$(window).resize(ngToolbar.windowsResize);
			
			this.moreActionsButtonContainer().hover(ngToolbar.showMoreActionsSubmenu, ngToolbar.hideMoreActionsSubmenu);
			this.moreActionsContainer().hover(ngToolbar.showMoreActionsSubmenu, ngToolbar.hideMoreActionsSubmenu);

			if($(".ng-toolbar-container").css("min-width") != null) {
				this.minWidth = parseInt($(".ng-toolbar-container").css("min-width").replace("px", "")) + 5;			
			}
			this.moreActionsButtonContainer().addClass("moreAction");
			this.lastButtonInToolbar().addClass("lastButtonInToolBar");
			this.injectMouseEventDisableButtons();
			this.baseWidth = this.toolBarContainerWidth();
		}		
	},
	
	windowsResize: function (){
		if (!ngToolbar.isProccessing) {
			ngToolbar.isProccessing = true;
			var width = ngToolbar.toolBarWidth();
			var lastBtn = ngToolbar.lastButtonInToolbar();
			ngToolbar.baseWidth = ngToolbar.toolBarContainerWidth();
			
			if(ngToolbar.decreasingWindowSize()){				
				if(ngToolbar.canMoveToMoreActions(width) && ngToolbar.buttonDoesntFitInToolbar(lastBtn, width)){					
					ngToolbar.moveToMoreActions(lastBtn);
				}
			} else {
				lastBtn = ngToolbar.moreActionsContainer().find("li:last");								
				if (ngToolbar.canMoveToActions(lastBtn, width) && (!ngToolbar.buttonDoesntFitInToolbar(lastBtn, width))){					
					ngToolbar.moveToActions(lastBtn);
				}
			}
			ngToolbar.isProccessing = false;
			ngToolbar.lastWidth = ngToolbar.baseWidth;
		}
	},
	
	moveToMoreActions: function(lastBtn){
		var moreActionsBtn = this.moreActionsButton();
		if(moreActionsBtn.css("display") == "none"){
			moreActionsBtn.css("display", "inline");
		}
		if(this.moreActionsContainer().find("ul:first").length == 0){
			this.moreActionsContainer().append("<ul/>");
		}
		lastBtn.removeClass("lastButtonInToolBar");
		this.moreActionsContainer().find("ul:first").append(this.outerHTML(lastBtn));
		lastBtn.remove();
	},
	
	moveToActions: function(lastBtn){
		this.moreActionsButtonContainer().before(this.outerHTML(lastBtn));		
		lastBtn.remove();
		var nextButton = this.lastButtonInToolbar();
		this.addMouseEvents(nextButton);		
		if(this.moreActionsContainer().length < 2){
			this.removeLastButttonClass();
			nextButton.addClass("lastButtonInToolBar");			
			this.moreActionsButton().css("display", "none");
			this.moreActionsContainer().hide();
		}
	},
	
	showMoreActionsSubmenu: function(){
		ngToolbar.moreActionsButtonContainer().find("a:first").click();
	},
	
	hideMoreActionsSubmenu: function(){
		ngToolbar.moreActionsContainer().hide();
	},
	
	removeLastButttonClass: function() {
		 $(".ng-toolbar .actions a:not('.moreActions'):visible").each(function(){
				$(this).parent().removeClass("lastButtonInToolBar") ;
		 });
	},
	
	lastButtonInToolbar: function(){
		return $(".ng-toolbar .actions a:not('.moreActions'):visible:last").parent();
	},
	
	addMouseEvents: function(button){
		button.unbind('mouseenter mouseleave');
		if(button.children().hasClass("ui-state-disabled")){
			button.mouseenter(function(){
				ngToolbar.removeAllMenuitemActive();
			});
		} else {
			button.mouseenter(function(){ 
				var menuitem = $(this);
				if(!menuitem.hasClass('ui-menuitem-active') && !menuitem.hasClass('ui-state-disabled')) {
					menuitem.addClass('ui-menuitem-active').children('a.ui-menuitem-link').addClass('ui-state-hover');
				}
			}).mouseleave(function() {
				var menuitem = $(this);
				if(menuitem.hasClass('ui-menuitem-active') || menuitem.hasClass('ui-state-disabled')) {
					menuitem.removeClass('ui-menuitem-active').children('a.ui-menuitem-link').removeClass('ui-state-hover');
				}
			});			
		}
	},
	
	injectMouseEventDisableButtons: function() {
		$(".ng-toolbar .actions a.ui-state-disabled:not('.moreActions'):visible").each(function(){	
			var menuitem = $(this).parent();
			menuitem.unbind('mouseenter mouseleave');
			menuitem.mouseenter(function(){
				ngToolbar.removeAllMenuitemActive();
			});
		});
	},
	
	removeAllMenuitemActive: function() {
		$(".ng-toolbar .actions a:not('.moreActions'):visible").each(function(){
				var menuitem = $(this).parent();
				if(menuitem.hasClass('ui-menuitem-active')){
					menuitem.removeClass('ui-menuitem-active').children('a.ui-menuitem-link').removeClass('ui-state-hover');
				}
		 });
	},	
	
	showMoreActions: function(element){
		$(element).children('ul').show();
	},
	
	hideMoreActions: function(element) {
		$(element).children('ul').hide();
	},
	
	toolBarContainerWidth: function() {
		return $('.ng-toolbar-container').outerWidth(true);
	},
	
	toolBarWidth: function() {
		return $('.ng-toolbar').outerWidth();
	},
	
	outerHTML: function(element){
		//Dois hacks para isso (ver compatibilidade de browsers): 1) element.get(0).outerHTML ou 2) (linha abaixo)
		return $("<div />").append(element.clone()).html();
	},
	
	moreActionsContainer: function(){
		return $(".ng-toolbar-moreActionsContainer");
	},
	
	moreActionsButton: function(){
		return $(".ng-toolbar a.dropdown.moreActions");
	},
	
	moreActionsButtonContainer: function(){
		return this.moreActionsButton().parent();
	},
	
	decreasingWindowSize: function(){
		return (this.lastWidth > this.baseWidth);
	},
	
	canMoveToMoreActions: function(actualWidth){
		return (actualWidth > this.minWidth);
	},
	
	canMoveToActions: function(lastBtn, actualWidth) {
		//TODO tratar se está ou não com o botão mais açoes visivel		  
		return (lastBtn != null) && (actualWidth + lastBtn.outerWidth(true) - this.widthAjust < this.baseWidth);
	},
	
	buttonDoesntFitInToolbar: function(lastBtn, actualWidth){
		return (this.baseWidth - lastBtn.outerWidth() < actualWidth);
	}
};

$(document).ready(function() {
	ngToolbar.inject();
});
