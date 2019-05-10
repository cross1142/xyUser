<template>
    <div class="dorm-detail">
    <el-dialog
        title="提示"
        :visible.sync="dialogVisible"
        width="60%"
        :before-close="handleClose">
        <!-- 学员信息表单 -->
       <el-form ref="form" v-loading="loading" label-width="80px">
           <el-row :gutter="20">
               <el-col :span="8">
                 <el-form-item  label="宿舍名称">
                    <el-input class="message" v-model="dormDetail.name"></el-input>
                </el-form-item>
               </el-col>
                <el-col :span="8">
                 <el-form-item   label="宿舍id">
                    <el-input class="message" v-model="dormDetail.id"></el-input>
                </el-form-item>
               </el-col>
               <el-col :span="20">
                 <el-form-item  label="宿舍地址">
                    <el-input  v-model="dormDetail.position" placeholder="宿舍详细地址"></el-input>
                </el-form-item>
               </el-col>
                <el-col :span="8">
                    <template>
                        <el-form-item class="dorm" label="入住日期">
                            <el-date-picker class="message"
                            value-format="yyyy-MM-dd"
                            v-model="dormDetail.startTime"
                            type="date"
                            placeholder="选择入住时间"
                            ></el-date-picker>
                        </el-form-item>
                    </template>
                </el-col>
                <el-col :span="8">
                    <template>
                        <el-form-item class="dorm" label="离开日期">
                            <el-date-picker class="message"
                            value-format="yyyy-MM-dd"
                            v-model="dormDetail.endTime"
                            type="date"
                            placeholder="离开时间"
                            ></el-date-picker>
                        </el-form-item>
                    </template>
                </el-col>
               <el-col :span="20">
                  <el-form-item  label="班级描述">
                    <el-input
                        type="textarea"
                        :rows="2"
                        placeholder="请输入内容"
                        v-model="dormDetail.bak">
                     </el-input>
                </el-form-item>
               </el-col>
           </el-row>   
        </el-form>
        <span slot="footer" class="dialog-footer">
            <el-button @click="dialogVisible = false">取 消</el-button>
            <el-button type="primary" @click="doSave(dormDetail)">确 定</el-button>
        </span>
    </el-dialog>
    </div>
</template>
<script>
import xyApi from '@/api/xyApi'
export default {
    name: 'DormDetail',
    data(){
        return{
        dormDetail: {
            id: '',
            name: '',
            startTime: '',
            bak: '',
            endTime: ''
             },
        dialogVisible: false,
        loading: true
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
    //打开对话框,有id的话获取详情,没有id的话清空
    openDialog(row){
        this.loading = true;
        this.dialogVisible = true;
        if(row){
        xyApi.dormDetail({
            id: row.id
        })
        .then(res=>{
            this.dormDetail = res.data.data;
            console.log('text',this.dormDetail);
        })
        }else{
            this.dormDetail = {
                id: '',
                startTime: '',
                bak: '',
                endTime: ''
            }
        }
        this.loading = false;
    },
    // 执行提交,判断是否有id,有的话发送编辑的请求,没有就发送保存请求
    doSave(obj){
        if(obj.id){
            console.log('有id');
            xyApi.dormUpdate({
                xyDormInfo: this.dormDetail
            })
            .then(res=>{
                this.$parent.getDormList();
                if(res.data.code == false){
                    this.$message({
                        type: 'info',
                        message: '修改失败'
                    }); 
                }else{
                    this.$message({
                        type: 'success',
                        message: '修改成功'
                    });
                }
            })
        }else{
            console.log(this.dormDetail);
                xyApi.dormSave({
                xyDormInfo: this.dormDetail
            })
            .then(res=>{
                console.log(res);
                this.$parent.getDormList();
                if(res.data.code == true){
                    this.$message({
                        type: 'success',
                        message: '添加成功'
                    }); 
                }else{
                      this.$message({
                        type: 'info',
                        message: '添加失败'
                    }); 
                }
            })
        }
    this.dialogVisible = false;
    }
    }
}
</script>
<style lang = "scss" scoped>


</style>


