Chassis.PageView.define( 'index', {
    
    // 设置PageView所在的DOM
    el: '#album-list',

    // 配置事件
    events: {
        // 监听model change
        'change model': 'onModelChange',
        // 监听model error
        'error model': 'onModelError'
    },

    init: function( opts ) {
        this.model = Chassis.Model.create( 'index' );
        this.tpl = {};
        this.tpl.list = dust.compile( 
            $( '#index-template' ).html(), 'index-list' );
    },

    // 在APP路由到当前页面之前会调用该方法
    onBeforePageIn: function() {

        // 获取数据
        if ( !this.model.fetched ) {
            this.showLoading();

            this.model.fetch();
            this.model.fetched = true;
        }
    },

    onModelChange: function( ) {
        var me = this;
        var compiled = 

        dust.loadSource( this.tpl.list );

        // 渲染模板并输出
        dust.render( 'index-list', this.model.toJSON(), function(err, out){ 
            me.$el.html( out );

            // 隐藏Loading
            me.hideLoading();
        } )
    },

    onModelError: function( ) {

        // 渲染模板并输出
        this.$el.html( '<h4>数据获取失败</h4>' );

    }
} );