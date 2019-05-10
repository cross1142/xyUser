<template>
    <div class="view-detail">
        <el-dialog
            :visible.sync="dialogVisible"
            width="50%"
            :before-close="handleClose">
            <h3 class="student-title">学员信息</h3>
            姓名:<p class="student-name">{{viewDetail.name}}</p>
            id:<p class="student-name">{{viewDetail.id}}</p>
            入学时间:<p class="student-time">{{viewDetail.addTime}}</p>
            性别:<p class="student-name">{{viewDetail.sex}}</p>
            QQ:<p class="student-name">{{viewDetail.qq}}</p>
            <span slot="footer" class="dialog-footer">
                <el-button @click="dialogVisible = false">取 消</el-button>
                <el-button type="primary" @click="dialogVisible = false">确 定</el-button>
            </span>
        </el-dialog>
    </div>
</template>
<script>
export default {
    name: 'ViewDetail',
    data(){
        return{
              dialogVisible: false,
              viewDetail: {}
        }
    },
    methods:{
    handleClose(done) {
        this.$confirm('确认关闭？')
          .then(_ => {
            done();
          })
          .catch(_ => {});
      },
      openview(row){
          console.log(row);
          this.viewDetail = row;
          this.dialogVisible = true;
      }
    }
}
</script>
<style lang = "scss" scoped>
.view-detail{
    .student-title{
        margin-left: 160px;
    }
    .student-name{
        position: relative;
        top: -18px;
        left: 70px;
        width: 250px;
    }
    .student-time{
        position: relative;
        top: -18px;
        left: 70px;
    }
}
    
</style>


