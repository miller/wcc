window.app = {
    models: {}
};

app.models.person = Chassis.Model.extend({
    defaults : {
        cid: '', 
        ip:'', 
        name : '',
        connected:false,
        transfered:0,
        selected:false,
        photo:'http://tp4.sinaimg.cn/2129028663/180/5684393877/1'  
    },
    init: function() {
        this.set( 'cid', this.cid );
    }
});
