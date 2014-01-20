Chassis.Model.define( 'receive', {
    init: function() {
        this.listMap = {};
    },

    defaults: {
        list: []
    },

    add: function( person ) {
        var cid = person.cid,
            me = this;

        if( !this.listMap[ cid ] ) {
            this.get( 'list' ).push( person );
            this.listMap[ cid ] = this.get( 'list' ).length;

            person.on( 'change', function() {
                me.trigger( 'change' );
            } );

            this.trigger( 'change' );
        }
    },

    remove: function( cid ) {
        var me = this,
            idx = this.listMap[ cid ];

        if( idx ) {
            this.get( 'list' )[ idx - 1 ] = null;
            delete this.listMap[ cid ];

            this.trigger( 'change' );
        }
    },

    clear: function() {
        this.set( 'list', [] );
        this.listMap = {};
        this.trigger( 'change' );
    },

    selectedCount: function() {
        var any = 0;
        $.each( this.get( 'list' ), function( idx, person ) {
            if( person.get( 'selected' ) ) {
                any++;
            }
        } );

        return any;
    },

    anyselected: function() {
        return this.selectedCount() > 0;
    },

    getPerson: function( cid ) {
        var idx = this.listMap[ cid ];

        return this.get( 'list' )[ idx - 1 ];
    },

    toJSON: function() {
        var data = Chassis.Model.receive.__super__.toJSON.call( this ),
            list = [];

        $.each( data.list, function( idx, person ) {

            if( person.toJSON ) {
                list[ idx ] = person.toJSON();
            }
        } );

        return {
            list: list
        };
    }
} );
