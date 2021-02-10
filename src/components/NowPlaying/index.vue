<template>
  <div class="movie_body">
	  <Loading v-if="isLoading" />
	             <Scroller v-else :handleToScroll="handleToScroll" :handleTouchEnd="handleTouchEnd">
							<ul>
								<li class="movie_li">{{pullDownMsg}}</li>
								<li v-for="item in movieList" :key="item.filmId" @tap="handleToDetail">
									<div class="pic_show" ><img :src="item.poster"></div>
									<div class="info_list">
										<h2>{{item.name}}</h2>
										<p>观众评 <span class="grade">9.2</span></p>
										<p>主演: 陈建斌,任素汐,潘斌龙</p>
										<p>今天55家影院放映607场</p>
									</div>
									<div class="btn_mall">
										购票
									</div>
								</li>
							</ul>
				</Scroller>
			</div>
</template>

<script>
// import Bscroll from 'better-scroll';
import axios from 'axios'
export default {
	name : 'NowPlaying',
	data(){
		return {
			movieList : [],
			pullDownMsg:'',
			isLoading : true
		}
	},
	activated(){
		console.log(123);
		axios({
			url:"https://m.maizuo.com/gateway?cityId=371600&pageNum=1&pageSize=10&type=1&k=8406651",
			headers:{
				'X-Client-Info': '{"a":"3000","ch":"1002","v":"5.0.4","e":"1612147085766879295602689","bc":"110100"}',
                'X-Host': 'mall.film-ticket.film.list'
			}
		}).then(res=>{
			console.log(res.data.data.films);
			this.movieList = res.data.data.films;
			this.isLoading=false;
			// this.$nextTick(()=>{
			// 	var scroll = new Bscroll( this.$refs.movie_body, {
			// 		tap: 'tap',
			// 		probeType: 1
			// 	});
			// 	scroll.on('scroll',(pos)=>{
			// 		console.log('scroll');
			// 		if(pos.y > 30){
			// 			this.pullDownMsg = '正在更新中';
			// 		}
			// 	});	
			// 	scroll.on('touchEnd',(pos)=>{
			// 		console.log('touchEnd');
			// 		if(pos.y >30){
			// 					this.pullDownMsg = "更新成功";
			// 					setTimeout(()=>{
			// 						this.movieList = res.data.data.films;
			// 						this.pullDownMsg = '';
			// 					},1000);
			// 		}
			// 	});	
			// });
		})
	},
	methods : {
		handleToDetail(){
			console.log('handleToDetail');
		},
		handleToScroll(pos){
			if( pos.y > 30){
				this.pullDownMsg = "正在更新中";
			}
		},
		handleTouchEnd(pos){
			if(pos.y >30){
						this.pullDownMsg = "更新成功";
						setTimeout(()=>{
							
							this.pullDownMsg = '';
						},1000);
						
			}
		}
	}
}
</script>

<style scoped>
#content .movie_body{ flex:1; overflow:auto;}
.movie_body ul{ margin:0 12px; overflow: hidden;}
.movie_body ul li{ margin-top:12px; display: flex; align-items:center; border-bottom: 1px #e6e6e6 solid; padding-bottom: 10px;}
.movie_body .pic_show{ width:64px; height: 90px;}
.movie_body .pic_show img{ width:100%;}
.movie_body .info_list { margin-left: 10px; flex:1; position: relative;}
.movie_body .info_list h2{ font-size: 17px; line-height: 24px; width:150px; overflow: hidden; white-space: nowrap; text-overflow:ellipsis;}
.movie_body .info_list p{ font-size: 13px; color:#666; line-height: 22px; width:200px; overflow: hidden; white-space: nowrap; text-overflow:ellipsis;}
.movie_body .info_list .grade{ font-weight: 700; color: #faaf00; font-size: 15px;}
.movie_body .info_list img{ width:50px; position: absolute; right:10px; top: 5px;}
.movie_body .btn_mall , .movie_body .btn_pre{ width:47px; height:27px; line-height: 28px; text-align: center; background-color: #f03d37; color: #fff; border-radius: 4px; font-size: 12px; cursor: pointer;}
.movie_body .btn_pre{ background-color: #3c9fe6;}
.movie_body .movie_li{padding: 0;margin: 0;border: none;}
</style>