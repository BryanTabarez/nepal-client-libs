module.exports = function( config ) {
    var sharedConfig = require( "../../karma.shared.config.js" );
    sharedConfig( config, "external-scan-scheduler" );
}
