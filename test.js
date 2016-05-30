// var cto = require('./index.js');
// var BaseExtend = require('extend');



// function goinDeep( currentConfig, obj  ) {

// 	var object = Array.isArray( obj ) ? [] : {};

// 	if ( !Array.isArray( currentConfig ) && typeof currentConfig == 'object' ) {

// 		for (prop in currentConfig) if ( obj[ prop ] !== undefined ) {

// 			object[ prop ] =  goinDeep( currentConfig[ prop ], obj[ prop ] );

// 		}

// 	} else {

// 		if ( !Array.isArray( currentConfig ) ) currentConfig = [ currentConfig ];

// 		for (var i = 0; i < currentConfig.length; i++) {

// 			if (typeof currentConfig[ i ] != 'object') {

// 				object[ currentConfig[ i ] ] = obj[ currentConfig[ i ] ];

// 			} else {
				
// 				var tempConfig = currentConfig[ i ];

// 				for (prop in tempConfig)  {

// 					object[ prop ] = goinDeep( tempConfig[ prop ], obj[ prop ] )

// 				}
// 			}
// 		}

// 	}

// 	return object;

// }


var cto = require('./index.js');


var testObject = {
	as: {
		asd: {
			a: {
				test: 123,
				test2: 456
			},
			b: {
				c: {
					test3: 789,
					test4: 'aaa'
				}
			}
		},
		bsd: {
			a: {
				test22: '222'
			},
			b: ['1541', '251']
		},
		ttt: '123',
		asd1: [ 
			1, 2, 3
		]
	}
}

var conf = {
	as: [
		{
			asd: {
				a: ['test'],
				b: {
					c: ['test4']
				}
			}
		},
		'ttt',
		{
			asd1: [0, 1]
		}
	]
}

var cleanedObject = goinDeep( conf, testObject );
console.log( goinDeep( conf, testObject ) );

console.log('>>> RESULTS');
console.log('>>>', cleanedObject.as.asd.a.test);
console.log('>>>', cleanedObject.as.asd.b.c.test4);
console.log('>>>', cleanedObject.as.ttt);



