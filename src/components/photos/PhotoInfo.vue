<template>
    <div class="photo-container">
        <h3>{{ photoinfo.title }}</h3>
        <p class="subtitle">
            <span>发表时间: {{ photoinfo.add_time | dateFormat }}</span>
            <span>点击：{{ photoinfo.click }}次</span>
        </p>

        <hr>

        <!-- 缩略图区域 -->
        <!-- 1. 不用自己写,安装一个 Vue集成 PhotoSwipe 图片浏览插件  npm i vue-preview -S -->
        <!-- 2. 获取到所有的图片列表,然后使用 :slides="list" 指令渲染数据 并 给 handleClose写一个方法以免报警告未定义 -->
        <!-- 3. 注意: 每个 图片数据对象中,必须有 w 和 h 和 msrc属性 -->
        <div class="thumbs">
            <vue-preview :slides="list"  @close= "handleClose" > </vue-preview >
        </div>

        <!-- 图片内容区域 -->
        <div class="content" v-html="photoinfo.content"></div>
        
        <!-- 放置一个现成的 评论子组件 -->
        <cmt-box :id="id"></cmt-box>
        
    </div>
</template>

<script>

    // 1.导入评论子组件
    import comment from '../subcomponents/comment.vue'

    export default {
        data() {
            return {
                id: this.$route.params.id,   // 从路由中获取到的 图片id
                photoinfo: {},   // 图片详情
                list: []    // 缩略图的数组
            }
        },
        created() {
            this.getPhotoInfo()
            this.getThumbs()
        },
        methods: {
            getPhotoInfo() {
                // 获取图片的详情
                this.$http.get('api/getimageInfo/' + this.id).then(result => {
                    if(result.body.status === 0) {
                        this.photoinfo = result.body.message[0]
                    }
                })
            },
            getThumbs() {
                // 获取缩略图
                this.$http.get('api/getthumimages/' + this.id).then(result => {
                    if(result.body.status === 0) {
                        result.body.message.forEach(item=>{
                            // 循环每个图片数据,补全图片的宽和高
                            item.msrc = item.src
                            item.w = 600
                            item.h = 400
                        })
                        // 把完整的数据保存到 list 中
                        this.list = result.body.message
                    }
                })
            },
            handleClose() {

            }
        },
        components: {   // 注册评论子组件
            'cmt-box': comment
        }
    }
</script>

<style lang="scss" scoped>
    .photo-container{
        padding:3px;
        h3{
            color:#26A2FF;
            font-size:15px;
            text-align:center;
            margin:15px 0;
        }
        .subtitle{
            display:flex;
            justify-content: space-between;
            font-size:13px;
        }
        .content{
            font-size:13px;
            line-height:30px;
        }

        .thumbs{
         /* /deep/是深层作用选择器(必须加,不然样式不生效) */
         /deep/ .my-gallery{   //deep深层作用选择器
              display: flex;
              flex-wrap:wrap;//默认换行
              figure{
                  width: 30%;  
                  margin: 5px; 
                  img{
                      width: 100%;
                      box-shadow: 0 0 8px #999;  
                      border-radius: 5px;
                  }
              }
          }
        }

    }
</style>