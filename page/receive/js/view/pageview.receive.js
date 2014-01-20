Chassis.PageView.define( 'receive', {
    
    // 设置PageView所在的DOM
    el: '#page-receive',

    // 配置事件
    events: {
        'click .receiver-list li': 'toggle',
        'change model': 'onModelChanged'
    },

    init: function( opts ) {
        this.els = {
            '$waveChildren': this.$el.find( '#wave' ).children(),
            '$receiverList': this.$el.find( '#wait-receiver-list' ),
            '$waitingText': this.$el.find( '#waiting-text' ),
            '$addBtn': this.$el.find( '#btn-add' ),
            '$wavebg': this.$el.find( '.wavebg' )
        };

        app.models.receivers = this.model = Chassis.Model.create( 'receive' );
        this.tpl = {};
        this.tpl.list = dust.compile( 
            $( '#receive-template' ).html(), 'receive-list' );
    },

    // 在APP路由到当前页面之前会调用该方法
    onBeforePageIn: function() {
        var me = this;

        me.model.clear();

        // 模拟效果
        setTimeout( function() {
            me.model.add( new app.models.person({
                name: 'Miller'
            }) );
        }, 3000 );

        setTimeout( function() {
            me.model.add( new app.models.person({
                name: '张自萌'
            }) );
        }, 3800 );

        setTimeout( function() {
            me.model.add( new app.models.person({
                name: '张自萌2'
            }) );
        }, 5000 );
    },

    toggle: function( evt ) {
        var li = $( evt.target ).closest( 'li' ),
            person = this.model.getPerson( li.attr( 'data-cid' ) );

        if( person ) {
            person.set( 'selected', !person.get( 'selected' ) );
        }
    },

    onModelChanged: function() {
        // console.log( this.model.toJSON() );
        var me = this,
            data = this.model.toJSON();

        dust.loadSource( this.tpl.list );
        dust.render( 'receive-list', data, function( err, out ) {
            me.els.$receiverList.html( out );
        } );

        if( this.model.anyselected() ) {
            this.els.$addBtn.show();
        }
        else {
            this.els.$addBtn.hide();
        }

        if( data.list.length ) {
            this.els.$wavebg.removeClass( 'wave' );
        }
        else {
            this.els.$wavebg.addClass( 'wave' );
            me.els.$receiverList.html( '' );
        }
    }
} );