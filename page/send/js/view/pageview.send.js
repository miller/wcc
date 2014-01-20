Chassis.PageView.define( 'send', {
    
    // 设置PageView所在的DOM
    el: '#page-send',

    // 配置事件
    events: {
        'click .receiver-col': 'toggle',
        'click .btn-close': function(){ window.history.back();},
        'change model': 'onModelChanged'
    },

    init: function( opts ) {
        this.model = app.models.receivers;

        this.els = {
            '$sendBtn': this.$el.find( '.btn-send' ),
            '$receivers': this.$el.find( '#explorer-receivers' ),
            '$count': this.$el.find( '#receiver-count' )
        };

        this.tpl = {};
        this.tpl.list = dust.compile( 
            $( '#send-template' ).html(), 'send-list' );

        this.onModelChanged();
    },

    // 在APP路由到当前页面之前会调用该方法
    onBeforePageIn: function() {

    },

    toggle: function( evt ) {
        var container = $( evt.currentTarget ),
            person = this.model.getPerson( container.attr( 'data-cid' ) );

        if( person ) {
            person.set( 'selected', !person.get( 'selected' ) );
        }
    },

    onModelChanged: function() {
        var me = this,
            data = this.model.toJSON();

        dust.loadSource( this.tpl.list );
        dust.render( 'send-list', data, function( err, out ) {
            me.els.$receivers.html( out );
        } );

        if( this.model.anyselected() ) {
            this.els.$sendBtn.show();
        }
        else {
            this.els.$sendBtn.hide();
        }

        this.els.$count.html( this.model.selectedCount() );
    }
} );