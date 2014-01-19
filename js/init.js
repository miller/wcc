( function() {
    // 减少命名空间调用层级
    // Chassis.mixin( window, Chassis );

    // 设置Loading
    Chassis.Loading.setup( '.global-loading','.page-loading' );

    Chassis.history.start( {
        router: {
            routes: [ 'share','receive','send','history' ],
            // detail: function(){ return false;},
            pageOrder: [ 'index', 'share', 'receive', 'send', 'history' ]
        } 
    } );

    // 显示App Loading
    Chassis.Loading.Global.show();

} )();