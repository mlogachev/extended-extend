var BaseExtend 	= require('extend');
var confToObj	= require('./lib/conftoobj.js');

module.exports = EE;

// --------------- default congig -------------------

var defaultConfig = {
	_debug: false,
	_fromOrigin: [],
	_init: function() {}
}



// --------------- configurable-objects -------------------

function EE( config, deepExtend, object ) {

	config = BaseExtend( {}, defaultConfig, config );

	var objectsQueue = Array.prototype.slice.call( arguments, 3 );
	objectsQueue.unshift( [ object, { params: config._fromOrigin }]);

	var selectedObjects = [];
	var basicObjects 	= [];

	for (var i = 0; i < objectsQueue.length; i++) {

		if ( !( Array.isArray( objectsQueue[i]))) {
			
			basicObjects.push( objectsQueue[i] );
			filteredObject.unshift( objectsQueue[i] );

		} else {
			var currentObject 	= objectsQueue[i][0];
			var params 			= objectsQueue[i][1].params;
			var filteredObject 	= {};

			for (var j = 0; j < params.length; j++) {

				var prop = params[j];

				switch( typeof prop ) {
					case 'string':
						
						filteredObject[ prop ] = currentObject[ prop ];

					break;
					case 'object':
						if ( deepExtend ) {
							Extend( filteredObject, goinDeep( prop, currentObject ) );
						}

					break;
				} 
	 		}

	 		basicObjects.push( currentObject );
	 		selectedObjects.unshift( filteredObject );
	 	}
	}

	basicObjects = basicObjects.unshift( deepExtend, {} );

	var basic = BaseExtend.apply(null, basicObjects );

	selectedObjects = selectedObjects.unshift( deepExtend, {}, basic );

	var finalObject = BaseExtend.apply( null, selectedObjects );

	return confToObj( config, finalObject );

}


// --------------- helpers -------------------


// --------------- Extending Array of Objects into one -------------------
// function reduceCallback( prevObject, curObject ) {
// 	return Extend( prevObject, curObject );
// }

// --------------- Go throught the object and get object with -------
// --------------- desired properties from config -------------------

function goinDeep( currentConfig, obj  ) {

	var object = Array.isArray( obj ) ? [] : {};

	if ( !Array.isArray( currentConfig ) && typeof currentConfig == 'object' ) {

		for (prop in currentConfig) if ( obj[ prop ] !== undefined ) {

			object[ prop ] =  goinDeep( currentConfig[ prop ], obj[ prop ] );

		}

	} else {

		if ( !Array.isArray( currentConfig ) ) currentConfig = [ currentConfig ];

		for (var i = 0; i < currentConfig.length; i++) {

			if (typeof currentConfig[ i ] != 'object') {

				object[ currentConfig[ i ] ] = obj[ currentConfig[ i ] ];

			} else {
				
				var tempConfig = currentConfig[ i ];

				for (prop in tempConfig)  {

					object[ prop ] = goinDeep( tempConfig[ prop ], obj[ prop ] )

				}
			}
		}

	}

	return object;

}



// function goinDeep( conf, object, path ) {
// 	if ( Array.isArray( conf ) ) {
		
// 	}
// 	else {
// 		for (prop in conf) {
			
// 		}
// 	}
// }


// function goinDeep( currentConfig, obj ) {


// 	if ( Array.isArray( currentConfig ) ) {

// 		var objects = [];

// 		for (var i = 0; i < currentConfig.length; i++) {
// 			objects.push( obj[ currentConfig[ i ] ] )
// 		}
// 		objects.unshift( {} );

// 		return BaseExtend.apply( null, objects );

// 	} else {

// 		var objects = [];

// 		for (prop in currentConfig) {
			
// 			objects.push( goinDeep( currentConfig[prop], obj[ prop ] ) )

// 		}
// 		objects.unshift( {} );

// 		return BaseExtend.apply( null, objects );

// 	}

// }
