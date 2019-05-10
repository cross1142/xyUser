<template>
    <div class="dialog-detail">
    <el-dialog
        title="提示"
        :visible.sync="dialogVisible"
        width="60%"
        :before-close="handleClose">
        <!-- 学员信息表单 -->
       <el-form v-loading="loading"  ref="form" class="class-detail-form" label-width="80px">
           <el-row :gutter="20">
               <el-col :span="8">
                 <el-form-item class="class-name"  label="班级名称">
                    <el-input class="message" v-model="classDetali.className"></el-input>
                </el-form-item>
                </el-col>
                <el-col :span="8">
                  <el-form-item class="class-desc" label="专业">
                   <template>
                        <el-select v-model="classDetali.type" placeholder="请选择">
                            <el-option
                            v-for="item in options"
                            :key="item.value"
                            :label="item.label"
                            :value="item.value">
                            </el-option>
                        </el-select>
                    </template>
                 </el-form-item>
                 </el-col>
                <el-col :span="10">
                <template>
                    <el-form-item class="class-end-time" label="入学日期">
                        <el-date-picker class="message"
                        value-format="yyyy-MM-dd"
                        v-model="classDetali.startTime"
                        type="date"
                        placeholder="选择入住时间"
                        ></el-date-picker>
                    </el-form-item>
                </template>
                </el-col>
                <el-col :span="10">
                <template>
                    <el-form-item class="class-add-time" label="离开时间">
                        <el-date-picker class="message"
                        value-format="yyyy-MM-dd"
                        v-model="classDetali.endTime"
                        type="date"
                        placeholder="选择入住时间"
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
                        v-model="classDetali.desc">
                     </el-input>
                </el-form-item>
                </el-col>
           </el-row>
        </el-form>
        <span slot="footer" class="dialog-footer">
            <el-button @click="dialogVisible = false">取 消</el-button>
            <el-button type="primary" @click="doSave(classDetali)">确 定</el-button>
        </span>
    </el-dialog>
    </div>
</template>
<script>
import xyApi from '@/api/xyApi'
export default {
    name: 'DialogDetail',
    props:{
        clazzList: Array
    },
    data(){
        return{
        classDetali: {
            id: '',
            startTime: '',
            className: '',
            desc: '',
            endTime: '',
            type: ''
             },
        dialogVisible: false,
        loading: false,
        options:[
            {
          value: '0',
          label: '前端开发'
        }, {
          value: '1',
          label: 'UI设计'
        }, {
          value: '2',
          label: 'java'
        }
        ],
        value: '0'
        }
    },
    created(){
        // this.numToStr();
    },
    methods:{
    handleClose(done) {
        this.$confirm('确认关闭？')
          .then(_ => {
            done();
          })
          .catch(_ => {});
      },
      getClassDate(){

      },
    openDialog(row){
        this.loading = true;
        this.dialogVisible = true;
        if(row){
            this.getClazzDetail(row);
        }else{
            this.classDetali = {
                id: '',
                startTime: '',
                className: '',
                desc: '',
                endTime: ''
            }
             this.loading = false;
        }
    },
    getClazzDetail(row){
        xyApi.clazzDetail({
            id: row.id
        })
        .then(res=>{
            this.classDetali = res.data.data;
            console.log('type',this.classDetali.type);
            this.loading = false;
        })
    },
    doSave(obj){
        if(obj.id){
            xyApi.clazzUpdate({
                xyClassInfo: this.classDetali
            }).then(res=>{
                this.$parent.getClassList();
                if(res.data.code == true){
                this.$message({
                    type: 'success',
                    message: '修改成功'
                }); 
            }else{
                  this.$message({
                    type: 'info',
                    message: '修改失败'
                });
            }
            })
        }else{
            xyApi.saveClazz({
                xyClassInfo: this.classDetali
            })
            .then(res=>{
                console.log(res);
                this.$parent.getClassList();
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


