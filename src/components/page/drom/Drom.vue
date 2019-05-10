<template>
    <div class="drom">
            <!-- 搜索框 -->
    <!-- <search-bar :dormListMesg ="dormListMesg"></search-bar> -->
       <!-- 添加按钮 -->
    <el-button @click = "dialogShow(id)"  type = "primary">添加</el-button>
        <el-table class="student-list"
            :data="dormListMesg"
            border
            style="width: 100%">
            <el-table-column
            fixed
            prop="name"
            label="宿舍名称"
            width="150">
            </el-table-column>
            <el-table-column
            prop="id"
            label="宿舍id"
            width="150">
            </el-table-column>
            <el-table-column
            prop="position"
            label="位置"
            width="150">
            </el-table-column>
            <el-table-column
            prop="startTime"
            label="入住时间"
            width="150">
            </el-table-column>
            <el-table-column
            prop="endTime"
            label="离开时间"
            width="150">
            </el-table-column>
            <el-table-column
            prop="bak"
            label="宿舍简介"
            width="150">
            </el-table-column>
            <el-table-column
            label="操作"
            width="130">
            <template slot-scope="scope">
                <el-button @click="dialogShow(scope.row)" type="text" size="small">编辑</el-button>
                <el-button @click = "delDormData(clazzData[0].id)" type="text" size="small">删除</el-button>
            </template>
            </el-table-column>
  </el-table>
  <dorm-detail ref = "show"></dorm-detail>
  <el-card>
      <el-col :span="8" :offset="10">
      <my-pagenation :page = "page" @page-change="handlePageChange" @page-limit = "handlePageLimit" class="my-pagination"></my-pagenation>
      </el-col>
  </el-card>
    </div>
</template>
<script>
import xyApi from '@/api/xyApi'
import DormDetail from './dormdetail/DormDetail.vue'
import SearchBar from './searchbar/SearchBar.vue'
import MyPagenation from '@/components/common/Pagination.vue'
export default {
    name: 'DromStudent',
    components:{
        DormDetail,
        SearchBar,
        MyPagenation
    },
    data(){
        return{
            dormListMesg: [],
            id: '',
            clazzData: {},
             page: {
                start: 1, // 页码
                limit: 10, // 每页数量
                total: 0, // 总条数
                pageCount: 0 // 页数
              },
            
        }
    },
    created(){
        this.getDormList();
        this.getClassList();
    },
    methods:{
          dialogShow(row){
            this.$refs.show.openDialog(row);
        },
        //获取宿舍列表
        getDormList(){
            xyApi.dormList({
                start: this.page.start,
                limit: this.page.limit,
            })
            .then(res=>{
                this.dormListMesg = res.data.data.list;
                this.page.pageCount = res.data.data.totalPage;
                this.page.total = res.data.data.totalRow;
            })
        },
        //获取班级信息
        getClassList(){
            xyApi.clazzlist()
            .then(res=>{
                this.clazzData= res.data.data.list;
            })
        },
        // 删除宿舍信息
        delDormData(id){
        this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning'
            }).then(() => {
                //发送删除请求
           xyApi.dormDel(
                {
                    id: id
                }
            )
            .then(res=>{
                this.getDormList();
            })
            this.$message({
                type: 'success',
                message: '删除成功!' 
            });
            }).catch(() => {
            this.$message({
                type: 'info',
                message: '已取消删除'
            });          
            });
        },
        //页面跳转
        handlePageChange(val){
            this.page.start = val;
            this.getDormList();
        },
        handlePageLimit(v){
            this.page.limit = v;
           this.getDormList();
        }
    }
}
</script>
<style lang = "scss" scoped>
.drom{
    .box-card{
        /* width: 100%; */
        .search{
            width: 220px;
            margin-right: 30px;
        }
    }
.student-list{
    margin-top: 10px;
   }
}
</style>

