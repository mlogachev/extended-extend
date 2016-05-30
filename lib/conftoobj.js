var Url = require('url');
var Extend  = require('extend');


module.exports = confToObj;

// -- Config --

const defaultConfig = {
	_debug: false,
	_init: function () {}
};

const events = {
	init: function () {  return this.conf._init.call( this ) }
};



// --------------- example config -------------------
// var conf = {
	
	// attr1: {
	// 	param:
	// 	dfautl:
	// 	value:
	// } 
// 	absolute_url: 'pageUrl',
// 	title: 'title',
// 	description: 'description',
// 	keywords: 'keywords',
// 	content: 'text',
// 	h1: 'h1',
// 	h2: 'h2',
// 	h3: 'h3',
// 	h4: 'h4',
// 	scheme: {
// 		param: 'protocol',
// 		default: 'http',
// 		value: ( protocol ) => { return protocol.replace( /^(.+):$/, '$1' )  }
// 	},
// 	scheme: [
// 		'protocol',
// 		function( proto, cleanObj ) { return protocol.replace( /^(.+):$/, '$1' )  },
// 		'http',
// 	],
// 	host: 'host',
// 	path: 'path',
// 	query: 'query',
// 	fragment: {
// 		param : 'hash',
// 		value: ( hash ) => {  return hash.slice( 1 )  }
//  },
//  created_at: {
//  	default: 'NOW()'
//  },
//  updated_at: {
//  	default: 'NOW()'
//  },
// _debug : true,
// _fromOrigin: [ 'attr1', 'attr2' ],
// 	_init: function () {
// 		var absolute_url = this.obj[ this.conf.absolute_url ];
// 		this.obj = Extend( {}, this.obj, Url.parse( absolute_url ) );
// 	}
// };


// -- confToObj --

function confToObj( conf, obj ) {



	if ( !( this instanceof confToObj ) ) return new confToObj( conf, obj );

	conf = Extend( {}, defaultConfig, conf );


	this.conf 	= conf;
	this.obj   	= obj;
	this.source = source;


	var cleanObj = {};
	var value;

	this.trigger( 'init' );

	for (var attr in conf) {
		value = conf[ attr ];

		switch ( typeof value ) {
			case 'string':
				
				if ( this.obj[ value ] ) {
					cleanObj[ attr ] = this.obj[ value ];
						
				}
			break;
			case 'object':

				if ( value.param && this.obj[ value.param ] ) {
					cleanObj[ attr ] = value.value( this.obj[ value.param ] );
				} 

				if ( cleanObj[ attr ] === undefined && value.default ) cleanObj[ attr ] = value.default;

				// cleanObj[ attr ] = obj[ value.param ] ? value.value( obj[ value.param ] ) : value.default;
			break;

		}
	}

	return cleanObj;
}

Object.defineProperties( confToObj.prototype, {
	trigger: {
		value: function ( eventName ) {
			// events[eventName].apply( this, Array.prototype.slice.call( arguments, 1 ) );
			events[eventName].call( this );
		}
	}
});

// {
// 	as: {
// 		asd: {
// 			test: 123, // final
// 			test2: 456
// 		},
// 		asd1: [ '123', '456' ]
// 	}
// }

// {
// 	as: {
// 		asd: ['asd']
// 		asd1: [ '123', '456' ]
// 	}
// }


// confToOjbe( conf, true, obj, [ obj1, { params: [ {
// 	as: {
// 		asd: [
// 			'test'
// 		],
// 		asd1: [
// 			0
// 		]
		
// 	}
// } ] } ], ...objects ) 

// confToOjbe( conf, false, objMain, [ obj, { params: {
// 	attr1:{
// 		param:
// 		value:
// 		default:
// 	},
// 	attr2:{
// 		param:
// 		value:
// 		default:
// 	}
// }  } ], ...objects ) 





