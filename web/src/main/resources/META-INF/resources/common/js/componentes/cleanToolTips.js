function cleanupTooltips(){
    $('.ui-tooltip').each(function(index, elem){
        $(elem).hide();
    });
}