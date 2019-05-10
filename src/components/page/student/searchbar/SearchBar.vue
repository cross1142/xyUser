<template>
    <div class="search-bar">
    <!-- 搜索框 -->
    <el-card class="box-card">
        <el-input class="search" v-model="form.name" placeholder="姓名,支持模糊查询"></el-input>
        <el-col class="search">
            <el-select clearable  v-model="form.classId" placeholder="选择班级">
                <el-option v-for="item in classList"
                    :key="item.id"
                    :label="item.className"
                    :value="item.id">
                </el-option>
            </el-select>
        </el-col>
        <el-col class="search">
                <el-select clearable  v-model="form.dormId" placeholder="选择宿舍">
                    <el-option v-for="item in dormList"
                        :key="item.id"
                        :label="item.name"
                        :value="item.id">
                    </el-option>
                </el-select>
        </el-col>
        <template>
                <el-date-picker class="search"
                value-format="yyyy-MM-dd"
                v-model="form.startTime"
                type="date"
                placeholder="选择入住时间"
                ></el-date-picker>
        </template>
        <template>
                <el-date-picker class="search"
                value-format="yyyy-MM-dd"
                v-model="form.endTime"
                type="date"
                placeholder="选择入住时间"
                ></el-date-picker>
        </template>
        <el-button @click = "search" type = "primary">搜索</el-button>
        <el-button @click = "calcleSearch" type = "info">重置</el-button>
    </el-card>
    </div>
</template>
<script>
import {resetData} from '@/util/index'
export default {    
    name: 'SearchBar',
    props:{
         classList: Array,
         dormList: Array
    },
    data(){
        return{
            form:{
                name: '',
                classId: '',
                dormId: '',
                startTime: '',
                endTime: '',
            }
        }
    },
    methods:{
        search(){
            this.$emit('search',this.form);
        },
        calcleSearch(){
              resetData(this,'form')
            this.$emit('search')
        }
    }
}
</script>
<style lang = "scss" scoped>
.search-bar{
    .box-card{
        width: 100%;
        .search{
            width: 150px;
            margin-right: 50px;
                }
            } 
}                      
</style>


