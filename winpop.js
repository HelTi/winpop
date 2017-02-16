/**
 * Created by Administrator on 2017/2/16 0016.
 */

!(function(window,$,undefined){

    var htmls={
        'popbg':'<div class="pop-bg"></div>',
        'pwraper':'<div class="p-wraper"></div>',
        'popheader':'<div class="p-heaer"></div>',
        'popdes':'<p class="p-des"></p>',
        'palert':'<div class="p-alert"><button id="btn-ok">确定</button></div>',
        'pconfim':'<div class="p-confim"><button class="btn-ok">确定</button> <button class="btn-cancel">取消</button></div>'
    };
    var winpop=function(opt,callback){
        var defaults={
            headercon:'',
            popdes:''
        }
        this.options= $.extend({},defaults,opt);
        this.$body=$('body');
        //背景
        this.$popbg=$(htmls.popbg);
        //pop父容器
        this.$wraper=$(htmls.pwraper);

        if(callback !='undefined'){
            if(typeof callback == 'function'){
                this.callback=callback;
            }
        }else{
            throw new Error ('callback need function')
        }

    };
    winpop.prototype={

        /*
          alert 或者 confim
         */
        createdom:function(ele){
            var $popheaer=$(htmls.popheader).text(this.options.headercon);

            var $contenthtml=$(htmls.popdes).text(this.options.popdes);
               // $palert=$(htmls.palert);

            this.$wraper.append($popheaer).append($contenthtml).append(ele);
            this.$body.append(this.$popbg).append(this.$wraper);
           // this.callback();
          //  console.log(this.callback);
        },
        okclick:function(){
            //确认按钮执行回调函数
            this.callback();
        },
        eventclick:function(){
              var that=this;
              $(document).one("click","#btn-ok",function(){

                  that.remove();
                  that.okclick();

              });
              $(document).one("click",".btn-ok",function(){

                  that.remove();
                  that.okclick()

              });
              $(document).one("click",".btn-cancel",function(){
                  that.remove();
              })
        },
        alertpop:function(){
            var $palert=$(htmls.palert);
            this.createdom($palert);
            this.eventclick();
        },
        confimpop:function(){
            var $pconfim=$(htmls.pconfim);
            this.createdom($pconfim);
            this.eventclick();
        },
        remove:function(){
            this.$wraper.empty().remove();
            this.$popbg.empty().remove();

        }
    };


    window.winpop=winpop;

}(window,jQuery));