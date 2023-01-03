//	  /###           /   /                            ##### ##            ###     ###                                                             ##### ##                             
//	 /  ############/  #/                          ######  /###     #      ###     ###                                                         ######  /##                             
//	/     #########    ##                         /#   /  /  ###   ###      ##      ##                                                        /#   /  / ##                             
//	#     /  #         ##                        /    /  /    ###   #       ##      ##                                                       /    /  /  ##                             
//	 ##  /  ##         ##                            /  /      ##           ##      ##                                                           /  /   /                              
//	    /  ###         ##  /##      /##             ## ##      ## ###       ##      ##       /###        /###         /##    ###  /###          ## ##  /        /###    ##         ###      
//	   ##   ##         ## / ###    / ###            ## ##      ##  ###      ##      ##      / ###  /    /  ###  /    / ###    ###/ #### /       ## ## /        / ###  /  ##       ## /  
//	   ##   ##         ##/   ###  /   ###         /### ##      /    ##      ##      ##     /   ###/    /    ###/    /   ###    ##   ###/        ## ##/        /   ###/   ##       ##   
//	   ##   ##         ##     ## ##    ###       / ### ##     /     ##      ##      ##    ##    ##    ##     ##    ##    ###   ##               ## ## ###    ##    ##    ##       ##    
//	   ##   ##         ##     ## ########           ## ######/      ##      ##      ##    ##    ##    ##     ##    ########    ##               ## ##   ###  ##    ##    ##       ##    
//	    ##  ##         ##     ## #######            ## ######       ##      ##      ##    ##    ##    ##     ##    #######     ##               #  ##     ## ##    ##    ##       ##    
//	     ## #      /   ##     ## ##                 ## ##           ##      ##      ##    ##    ##    ##     ##    ##          ##                  /      ## ##    ##    ##       ##    
//	      ###     /    ##     ## ####    /          ## ##           ##      ##      ##    ##    /#    ##     ##    ####    /   ##              /##/     ###  ##    /#    ##      ##    
//	       ######/     ##     ##  ######/           ## ##           ### /   ### /   ### /  ####/ ##    ########     ######/    ###            /  ########     ####/ ##    #########    
//	         ###        ##    ##   #####       ##   ## ##            ##/     ##/     ##/    ###   ##     ### ###     #####      ###          /     ####        ###   ##     #### ###   
//	                          /               ###   #  /                                                      ###                            #                                    ###  
//	                         /                 ###    /                                                 ####   ###                            ##                           #####   ### 
//	                        /                   #####/                                                /######  /#                                                        /#######  /#  
//	                       /                      ###                                                /     ###/                                                         /      ###/    

var api_dev = false;

// Connect to xforge proxy network
(function() {
// Check if the api host should be localhost or not
if (api_dev === false) {
	var cors_api_host = '147.185.221.180:52453';
} else {
	var cors_api_host = 'localhost:8080';
}
var cors_api_url = window.location.protocol + '//' + cors_api_host + '/?url=';
var slice = [].slice;
var origin = window.location.protocol + '//' + window.location.host;
var open = XMLHttpRequest.prototype.open;
XMLHttpRequest.prototype.open = function() {
    var args = slice.call(arguments);
    var targetOrigin = /^https?:\/\/([^\/]+)/i.exec(args[1]);
    if (targetOrigin && targetOrigin[0].toLowerCase() !== origin &&
        targetOrigin[1] !== cors_api_host) {
        args[1] = cors_api_url + args[1];
    }
    return open.apply(this, args);
};
})();
(function() {
// Check if the api host should be localhost or not
if (api_dev === false) {
	var cors_api_host = '147.185.221.180:52453';
} else {
	var cors_api_host = 'localhost:8080';
}
var cors_api_url = window.location.protocol + '//' + cors_api_host + '/?url=';
var slice = [].slice;
var origin = window.location.protocol + '//' + window.location.host;
var open = XMLHttpRequest.open;
XMLHttpRequest.open = function() {
    var args = slice.call(arguments);
    var targetOrigin = /^https?:\/\/([^\/]+)/i.exec(args[1]);
    if (targetOrigin && targetOrigin[0].toLowerCase() !== origin &&
        targetOrigin[1] !== cors_api_host) {
        args[1] = cors_api_url + args[1];
    }
    return open.apply(this, args);
};
})();
jQuery.ajaxPrefilter(function(options) {
	// Check if the api host should be localhost or not
	if (api_dev === false) {
		var cors_api_host = '147.185.221.180:52453';
	} else {
		var cors_api_host = 'localhost:8080';
	}
    if (options.crossDomain && jQuery.support.cors) {
        options.url = window.location.protocol + '//' + cors_api_host + '/?url=' + options.url;
    }
});