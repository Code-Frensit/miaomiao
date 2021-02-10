<template>
  <div id="main">
      <Header title="喵喵电影" />
            <div id="content">
                <div class="movie_menu">
                        <router-link tag="div" to="/movie/city" class="city_name">
                            <span>{{ $store.state.city.name }}</span><i class="iconfont icon-lower-triangle"></i>
                        </router-link>
                        <div class="hot_swtich">
                            <router-link tag="div" to="/movie/nowPlaying" class="hot_item">正在热映</router-link>
                            <router-link tag="div" to="/movie/comingSoon" class="hot_item">即将上映</router-link>
                        </div>
                        <router-link tag="div" to="/movie/search" class="search_entry">
                            <i class="iconfont icon-sousuo"></i>
                        </router-link>
                    </div>
                    <keep-alive>
                        <router-view />
                    </keep-alive>
            </div>
      <TabBar />
  </div>
</template>

<script>
import Header from '@/components/Header';
import TabBar from '@/components/TabBar';
import { messageBox } from '@/components/JS'
export default {
    name : 'Movie',
    components : {
        Header,
        TabBar
    },
    mounted(){//http://api.map.baidu.com/location/ip?ak=pKghccYVNR1w51brG4he7GGl0iYa5eBe&ip=&coor=bd09ll
    // WjxAmSP8lVt2tAOfdInmZM32gYaPw7zq
    // http://api.map.baidu.com/location/ip?ak=WjxAmSP8lVt2tAOfdInmZM32gYaPw7zq&ip=&coor=bd09ll

         setTimeout(()=>{
                // this.$axios.get('/location/ip?ak=pKghccYVNR1w51brG4he7GGl0iYa5eBe&ip=&coor=').then((res)=>{
                    // this.$axios.get('http://ip-api.com/json').then((res)=>{
                    this.$axios.get('http://localhost:8080/ceshi.json').then((res)=>{
                        // var myObj =  JSON.parse(res);
                    // console.log(res.data.content.address);
                    // var msg = res.data;
                    // console.log(res.data.content.address_detail.city_code);
                    var nm = res.data.content.address;
                    var id = res.data.content.address_detail.city_code;
                    if( this.$store.state.city.id == id ){return;}
                            messageBox({
                            title : '定位',
                            content : nm,
                            cancel : '取消',
                            ok : '切换定位',
                            handlOk(){
                                // console.log(2);
                                window.localStorage.setItem('nowNm',nm);
                                window.localStorage.setItem('nowId',id);
                                window.location.reload();
                            }
                        });
                    
                });
          },500);
        // messageBox({
        //     title : '定位',
        //     content : '沈阳',
        //     cancel : '取消',
        //     ok : '切换定位',
        //     handleCancel(){
        //         console.log(1);
        //     },
        //     handlOk(){
        //         console.log(2);
        //     }
        // });
    }
}
</script>

<style scoped>
#content .movie_menu{ width: 100%; height: 45px; border-bottom:1px solid #e6e6e6; display: flex; justify-content:space-between; align-items:center; background:white; z-index:10;}
.movie_menu .city_name{ margin-left: 20px; height:100%; line-height: 45px;}
.movie_menu .city_name.active{ color: #ef4238; border-bottom: 2px #ef4238 solid;}
.movie_menu .city_name.router-link-active{ color: #ef4238; border-bottom: 2px #ef4238 solid;}
.movie_menu .hot_swtich{ display: flex; height:100%; line-height: 45px;}
.movie_menu .hot_item{ font-size: 15px; color:#666; width:80px; text-align:center; margin:0 12px; font-weight:700;}
.movie_menu .hot_item.active{ color: #ef4238; border-bottom: 2px #ef4238 solid;}
.movie_menu .hot_item.router-link-active{ color: #ef4238; border-bottom: 2px #ef4238 solid;}
.movie_menu .search_entry{ margin-right:20px; height:100%; line-height: 45px;}
.movie_menu .search_entry.active{ color: #ef4238; border-bottom: 2px #ef4238 solid;}
.movie_menu .search_entry.router-link-active{ color: #ef4238; border-bottom: 2px #ef4238 solid;}
.movie_menu .search_entry i{  font-size:24px; color:red;}
</style>