<template>
    <div class="categories">
        <div class="type-wrap">
            <a href="javascript:;" v-for="item in typeList" :key="item.id"
               :class="{'select-title':typeInfo.id==item.id}"
               @click="changeButton(item.id,item.name)"
            >
                <i>{{item.name}}</i>
            </a>
        </div>
    </div>
</template>

<script>
    export default {
        props:{
            //接收分类数组
            setTypeList:{
                type: Array,
                require: true
            },
            //接收当前活动的id
            setTypeId:{
                type: Number,
                require: true
            }
        },
        data(){
            return{
                typeList:[],
                typeInfo:{
                    id:0,
                    name:''
                },
            }
        },
        methods:{
            //点击按钮
            changeButton(id,name){
                this.typeInfo.id=id
                this.typeInfo.name=name

                //派发点击事件
                this.$emit('getTypeInfo',this.typeInfo)
            },
        },
        watch:{
            //设置监听事件
            setTypeList(val){
              this.typeList=val
              this.typeInfo.id = this.setTypeId

            },

        }
    }
</script>

<style lang="scss">
    .categories{
        //border: 1px solid red;
        width: 100%;
        .type-wrap{
            width: 100%;
            height: 40.6px;
            display: flex;
            //border: 1px solid blue;
            a{
                //border: 1px solid blue;
                //width: 44px;
                padding: 0 6px;
                height: 25.6px;
                //display: inline-block;
                margin: 0 25px 0 0;
                display: flex;
                justify-content: center;

            }
        }
    }
    .select-title{
        background: #31c27c;
        color: white;
        &:hover{
            color: white;
        }
    }
</style>
