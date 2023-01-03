// Listen on a specific host via the HOST environment variable
var host = process.env.HOST || '0.0.0.0';
// Listen on a specific port via the PORT environment variable
var port = process.env.PORT || 8080;

// Grab the blacklist from the command-line so that we can update the blacklist without deploying
// again. CORS Anywhere is open by design, and this blacklist is not used, except for countering
// immediate abuse (e.g. denial of service). If you want to block all origins except for some,
// use originWhitelist instead.
var originBlacklist = parseEnvList(process.env.CORSANYWHERE_BLACKLIST);
var originWhitelist = parseEnvList(process.env.CORSANYWHERE_WHITELIST);
function parseEnvList(env) {
  if (!env) {
    return [];
  }
  return env.split(',');
}

// Set up rate-limiting to avoid abuse of the public CORS Anywhere server.
//var checkRateLimit = require('./lib/rate-limit')(process.env.CORSANYWHERE_RATELIMIT);

var cors_proxy = require('./lib/cors-anywhere');
var serverOptions = {
  originBlacklist: originBlacklist,
  originWhitelist: originWhitelist,
  setHeader: [{"user-agent": "cpprestsdk/2.9.0"}], 

  //requireHeader: ['origin', 'x-requested-with'],
  requireHeader: [],
  //checkRateLimit: checkRateLimit,
  setHeaders: [{
	'origin': '',
	'referer': '',
	'user-agent': 'cpprestsdk/2.9.0',
  }],
  removeHeaders: [
	'sec-ch-ua-platform',
	'sec-ch-ua-mobile',
	'sec-ch-ua',
	'origin',
	'referer',
    'cookie',
    'cookie2',
	'host',
    // Strip Heroku-specific headers
    'x-request-start',
    'x-request-id',
    'via',
    'connect-time',
    'total-route-time',
    // Other Heroku added debug headers
    // 'x-forwarded-for',
    // 'x-forwarded-proto',
    // 'x-forwarded-port',
  ],
  redirectSameOrigin: true,
  httpProxyOptions: {
    // Do not add X-Forwarded-For, etc. headers, because Heroku already adds it.
    xfwd: false,
  },
  //spoofOrigin: true
};

cors_proxy.createServer(serverOptions).listen(port, host, function() {
 /* console.log(`
 /$$$$$$$$ /$$                       /$$$$$$$  /$$ /$$ /$$                                               /$$$$$$$                     
|__  $$__/| $$                      | $$__  $$|__/| $$| $$                                              | $$__  $$                    
   | $$   | $$$$$$$   /$$$$$$       | $$  \\ $$ /$$| $$| $$  /$$$$$$   /$$$$$$   /$$$$$$   /$$$$$$       | $$  \\ $$  /$$$$$$  /$$   /$$
   | $$   | $$__  $$ /$$__  $$      | $$$$$$$/| $$| $$| $$ |____  $$ /$$__  $$ /$$__  $$ /$$__  $$      | $$$$$$$  |____  $$| $$  | $$
   | $$   | $$  \\ $$| $$$$$$$$      | $$____/ | $$| $$| $$  /$$$$$$$| $$  \\ $$| $$$$$$$$| $$  \\__/      | $$__  $$  /$$$$$$$| $$  | $$
   | $$   | $$  | $$| $$_____/      | $$      | $$| $$| $$ /$$__  $$| $$  | $$| $$_____/| $$            | $$  \\ $$ /$$__  $$| $$  | $$
   | $$   | $$  | $$|  $$$$$$$      | $$      | $$| $$| $$|  $$$$$$$|  $$$$$$$|  $$$$$$$| $$            | $$$$$$$/|  $$$$$$$|  $$$$$$$
   |__/   |__/  |__/ \\_______/      |__/      |__/|__/|__/ \\_______/ \\____  $$ \\_______/|__/            |_______/  \\_______/ \\____  $$
                                                                     /$$  \\ $$                                               /$$  | $$
                                                                    |  $$$$$$/                                              |  $$$$$$/
                                                                     \\______/                                                \\______/  \n`);*/
console.log("\x1b[31m\x1b[40m" + `
  /###           /   /                            ##### ##            ###     ###                                                             ##### ##                             
 /  ############/  #/                          ######  /###     #      ###     ###                                                         ######  /##                             
/     #########    ##                         /#   /  /  ###   ###      ##      ##                                                        /#   /  / ##                             
#     /  #         ##                        /    /  /    ###   #       ##      ##                                                       /    /  /  ##                             
 ##  /  ##         ##                            /  /      ##           ##      ##                                                           /  /   /                              
    /  ###         ##  /##      /##             ## ##      ## ###       ##      ##       /###        /###         /##    ###  /###          ## ##  /        /###    ##         ###      
   ##   ##         ## / ###    / ###            ## ##      ##  ###      ##      ##      / ###  /    /  ###  /    / ###    ###/ #### /       ## ## /        / ###  /  ##       ## /  
   ##   ##         ##/   ###  /   ###         /### ##      /    ##      ##      ##     /   ###/    /    ###/    /   ###    ##   ###/        ## ##/        /   ###/   ##       ##   
   ##   ##         ##     ## ##    ###       / ### ##     /     ##      ##      ##    ##    ##    ##     ##    ##    ###   ##               ## ## ###    ##    ##    ##       ##    
   ##   ##         ##     ## ########           ## ######/      ##      ##      ##    ##    ##    ##     ##    ########    ##               ## ##   ###  ##    ##    ##       ##    
    ##  ##         ##     ## #######            ## ######       ##      ##      ##    ##    ##    ##     ##    #######     ##               #  ##     ## ##    ##    ##       ##    
     ## #      /   ##     ## ##                 ## ##           ##      ##      ##    ##    ##    ##     ##    ##          ##                  /      ## ##    ##    ##       ##    
      ###     /    ##     ## ####    /          ## ##           ##      ##      ##    ##    /#    ##     ##    ####    /   ##              /##/     ###  ##    /#    ##      ##    
       ######/     ##     ##  ######/           ## ##           ### /   ### /   ### /  ####/ ##    ########     ######/    ###            /  ########     ####/ ##    #########    
         ###        ##    ##   #####       ##   ## ##            ##/     ##/     ##/    ###   ##     ### ###     #####      ###          /     ####        ###   ##     #### ###   
                          /               ###   #  /                                                      ###                            #                                    ###  
                         /                 ###    /                                                 ####   ###                            ##                           #####   ### 
                        /                   #####/                                                /######  /#                                                        /#######  /#  
                       /                      ###                                                /     ###/                                                         /      ###/    

\n\x1b[0m`);
console.log('\x1b[2m\x1b[31mRunning CORS/xForge proxy server on: \x1b[0m\x1b[2m"\x1b[4m' + host + '\x1b[2m:' + port + '\x1b[0m\x1b[0m\x1b[2m"\x1b[0m\x1b[2m\x1b[31m.\x1b[0m');
console.log('\x1b[2m\x1b[36mCORS Anywhere proxy created by: \x1b[37m"\x1b[4mRob\x1b[0m\x1b[2m\x1b[37m"\x1b[36m.\x1b[0m');
console.log('\x1b[2m\x1b[32mProxy modified by: \x1b[37m"\x1b[4mCosmic\x1b[0m\x1b[2m\x1b[37m"\x1b[32m.\x1b[0m\n');
});