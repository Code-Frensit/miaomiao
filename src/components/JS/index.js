import Vue from 'vue';
import MessageBox from './MessagenBox';

export var messageBox = (function(){

    var defaults = {
        title : '',
        content : '',
        cancel : '',
        ok : '',
        handleCancel : null,
        handlOk : null
    };

    var MyComponent = Vue.extend(MessageBox);

    return function( opts ){//配置参数

        for(var attr in opts ){
            defaults[attr] = opts[attr];
        }

        

        var vm = new MyComponent({
            el : document.createElement('div'),
            data : {
                title : defaults.title,
                content : defaults.content,
                cancel : defaults.cancel,
                ok : defaults.ok
            },
            methods : {
                handleCancel(){
                    defaults.handleCancel && defaults.handleCancel.call(this);
                    document.body.removeChild( vm.$el );
                },
                handlOk(){
                    defaults.handlOk && defaults.handlOk.call(this);
                    document.body.removeChild( vm.$el );
                }
            }
        });

        document.body.appendChild( vm.$el );

    };

})();