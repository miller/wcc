Chassis.PageView.define( 'history', {
    
    // 设置PageView所在的DOM
    el: '#page-history',

    // 配置事件
    events: {
        'click .btn-back': function(){ window.history.back();}
    },

    init: function( opts ) {
        
    },

    // 在APP路由到当前页面之前会调用该方法
    onBeforePageIn: function() {

    }
} );