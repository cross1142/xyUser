<template>
    <div class="clazz">
              <!-- 搜索框 -->
       <!-- <class-search :clazzList = "clazzList"></class-search> -->
        <!-- 添加按钮 -->
    <el-button @click = "dialogShow(id)"  type = "primary">添加</el-button>
          <!-- 班级列表 -->
    <el-table v-loading="loading" class="student-list"
            :data="codeToText"
            border
            style="width: 100%">
            <el-table-column
            fixed
            prop="className"
            label="班级名称"
            width="150">
            </el-table-column>
            <el-table-column
            prop="id"
            label="班级id"
            width="150">
            </el-table-column>
            <el-table-column
            prop="startTime"
            label="开始时间"
            width="150">
            </el-table-column>
            <el-table-column
            prop="endTime"
            label="结束时间"
            width="150">
            </el-table-column>
            <el-table-column
            prop="type"
            label="学科"
            width="150">
            </el-table-column>
            <el-table-column
            prop="desc"
            label="班级描述"
            width="150">
            </el-table-column>
            <el-table-column
            label="操作"
            width="130">
            <template slot-scope="scope">
                <el-button @click="dialogShow(scope.row)" type="text" size="small">编辑</el-button>
                <el-button @click = "delStudentClazz(scope.row)" type="text" size="small">删除</el-button>
            </template>
            </el-table-column>
  </el-table>
  <!-- 弹窗 -->
  <dialog-detail :clazzList = "clazzList" ref = "show"></dialog-detail>
     <el-card>
      <el-col :span="8" :offset="14">
      <my-pagenation :page = "page" @page-change="handlePageChange" @page-limit = "handlePageLimit" class="my-pagination"></my-pagenation>
      </el-col>
  </el-card>
    </div>
</template>
<script>
import xyApi from '@/api/xyApi'
import DialogDetail from './dialogdetail/DialogDetail.vue'
import ClassSearch from './classsearch/ClassSearch.vue'
import MyPagenation from '@/components/common/Pagination.vue'
export default {
    name: 'Clazz',
    components:{
        DialogDetail,
        ClassSearch,
        MyPagenation
    },
    data(){
        return{
            clazzList: [],
            id:'',
            loading: false,
            page: {
                start: 1, // 页码
                limit: 10, // 每页数量
                total: 0, // 总条数
                pageCount: 0 // 页数
              },
        }
    },
    created(){
        this.getClassList();
    },
    computed:{
        codeToText(){
            var computedType = [];
            this.clazzList.map(item=>{
                if(item.type == 0||item.type == '0'){
                    item.type = '前端开发'
                }
                if(item.type == 1|| item.type == '1'){
                    item.type = 'UI设计'
                }
                if(item.type == '2'|| item.type == 2){
                    item.type = 'java'
                }
                computedType.push(item);
            })
            return computedType
        }
    },
    methods:{
        getClassList(){
            this.loading = true;
            xyApi.clazzlist({
                start: this.page.start,
                limit: this.page.limit,
            })
            .then(res=>{
                this.clazzList= res.data.data.list;
                this.page.pageCount = res.data.data.totalPage;
                this.page.total = res.data.data.totalRow;
                this.loading = false;
            })
        },
        dialogShow(row){
            this.$refs.show.openDialog(row);
        },
        delStudentClazz(row){
            this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning'
            }).then(() => {
                //发送删除请求
           xyApi.delClazz({
                id: row.id
            })
            .then(res=>{
                this.getClassList();
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
            this.getClassList();
        },
        handlePageLimit(v){
            this.page.limit = v;
            this.getClassList();
        }
    }
}
</script>
<style lang = "scss" scoped>
.clazz{
    .box-card{
        width: 100%;
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
