<template>
    <div class="search-bar">
    <!-- 搜索框 -->
    <el-card class="box-card">
        <el-input class="search" v-model="form.name" placeholder="姓名,支持模糊查询"></el-input>
        <el-col class="search">
            <el-select clearable  v-model="form.classId" placeholder="宿舍id查询">
                <el-option v-for="item in dormListMesg"
                    :key="item.id"
                    :label="item.id"
                    :value="item.id">
                </el-option>
            </el-select>
        </el-col>
        <el-col class="search">
                <el-select clearable  v-model="form.dormId" placeholder="宿舍名称查询">
                    <el-option v-for="item in dormListMesg"
                        :key="item.id"
                        :label="item.name"
                        :value="item.id">
                    </el-option>
                </el-select>
        </el-col>
        <el-button @click = "search" type = "primary">搜索</el-button>
    </el-card>
    </div>
</template>
<script>
export default {    
    name: 'SearchBar',
    props:{
           dormListMesg: Array 
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
            console.log('form',this.form);
            this.$emit('search',this.form);
        }
    }
}
</script>
<style lang = "scss" scoped>
.search-bar{
    .box-card{
        width: 100%;
        .search{
            width: 220px;
            margin-right: 20px;
                }
            } 
}                      
</style>


