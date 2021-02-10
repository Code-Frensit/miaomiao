<template>
    <div class="wrapper" ref="wrapper">
        <slot></slot>
    </div>
</template>

<script>
import BScroll from 'better-scroll';
export default {
    name : 'Scroller',
    props : {
        handleToScroll : {
            type : Function,
            default : function(){}
        },
        handleTouchEnd : {
            type : Function,
            default : function(){}
        }
    },
    // mounted (){
    //         var scroll = new BScroll( this.$refs.wrapper , {
    //         tap : 'tap',
    //         probeType: 1
    //     });
    // }
     mounted() {

      // 保证在DOM渲染完毕后初始化better-scroll
      setTimeout(() => {
        // this._initScroll()
        var scroll = new BScroll(this.$refs.wrapper, {
            tap : 'tap',
            probeType : 1
        });
        
        scroll.on('scroll',(pos)=>{
            this.handleToScroll(pos);
        });

        scroll.on('touchEnd',(pos)=>{
            this.handleTouchEnd(pos);
        });
      }, 500)

  }
}
</script>

<style scoped>
    .wrapper{ height:100%;}
</style>