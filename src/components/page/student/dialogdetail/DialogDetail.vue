<template>
  <div class="dialog-detail">
    <el-dialog
      class="my-dialog"
      title="编辑"
      :visible.sync="dialogVisible"
      width="70%"
      :before-close="handleClose"
    >
      <!-- 学员信息表单 -->
      <p>基本信息</p>
      <hr>
      <el-form
        :model="studentDetail"
        :rules="rules"
        ref="studentDetail"
        label-width="100px"
        class="dialog-form"
      >
        <el-row :gutter="20">
          <el-col :span="8">
            <el-form-item class="id" prop="classId" label="班级">
              <el-select
                clearable
                v-model="studentDetail.classId"
                class="message"
                placeholder="选择班级"
              >
                <el-option
                  v-for="item in classList"
                  :key="item.id"
                  :label="item.className"
                  :value="item.id"
                ></el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item class="name" label="学员姓名" prop="name">
              <el-input v-model="studentDetail.name"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item class="sex" label="性别">
              <el-radio-group v-model="studentDetail.sex">
                <el-radio label="男"></el-radio>
                <el-radio label="女"></el-radio>
              </el-radio-group>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="城市">
              <el-cascader
                class="message"
                size="small"
                :options="cityOptions"
                v-model="selectedCitys"
                @change="handleCityChange"
              ></el-cascader>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item class="tel" prop="tel" label="电话">
              <el-input v-model="studentDetail.tel"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item class="school" label="学校">
              <el-input class="message" v-model="studentDetail.school"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item class="end-data" label="宿舍">
              <template>
                <el-select class="message" v-model="dormData.name" clearable>
                  <el-option
                    v-for="item in dormData"
                    :key="item.id"
                    :label="item.name"
                    :value="item.name"
                  ></el-option>
                </el-select>
              </template>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <template>
              <el-form-item class="dorm" label="入学日期">
                <el-date-picker
                  class="message"
                  value-format="yyyy-MM-dd"
                  v-model="studentDetail.addTime"
                  type="date"
                  placeholder="选择入住时间"
                ></el-date-picker>
              </el-form-item>
            </template>
          </el-col>
          <el-col :span="8">
            <template>
              <el-form-item class="dorm" label="离开日期">
                <el-date-picker
                  class="message"
                  value-format="yyyy-MM-dd"
                  v-model="studentDetail.endTime"
                  type="date"
                  placeholder="选择入住时间"
                ></el-date-picker>
              </el-form-item>
            </template>
          </el-col>
        </el-row>
      </el-form>
      <p class="else-mesg">补充信息</p>
      <hr>
      <el-form class="dialog-form2" label-position="right">
        <el-row :gutter="20">
          <el-col :span="6">
            <el-form-item class="tel2" label="紧急联系人">
              <el-input class="message" v-model="studentDetail.tel2"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item class="qq-contect" label="qq">
              <el-input class="message" v-model="studentDetail.qq"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item class="wx-contect" label="微信">
              <el-input class="message" v-model="studentDetail.wx"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item class="job" label="工作">
              <el-input class="message" v-model="studentDetail.job"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
      <p class="price">缴费信息</p>
      <el-button-group v-show="!costCard" class="add-price-mesg">
        <el-button @click="costCard=true" type="text">添加费用记录+</el-button>
      </el-button-group>
      <hr>
      <!-- 缴费信息的弹窗 -->
      <el-card class="cost-card" v-show="costCard" shadow="hover" style="margin-bottom:20px">
        <el-form :model="costForm" ref="costForm" label-width="80px">
          <el-row :gutter="20">
            <el-col :span="8">
              <el-form-item label="类型">
                <el-radio v-model="costForm.costType" label="0">学费</el-radio>
                <el-radio v-model="costForm.costType" label="1">住宿费</el-radio>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="金额">
                <el-input type="number" :min="0" v-model="costForm.costValue" placeholder></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="交费时间">
                <el-date-picker
                  type="datetime"
                  value-format="yyyy-MM-dd HH:mm:ss"
                  v-model="costForm.costTime"
                  placeholder="选择日期时间"
                ></el-date-picker>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="备注">
                <el-input
                  type="textarea"
                  :rows="2"
                  v-model="costForm.costBak"
                  maxlength="300"
                  show-word-limit
                  placeholder="请输入备注信息"
                ></el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="12" :offset="12" style="text-align:right;">
              <el-button @click="handleCostCancel" style="margin-right:20px">取消</el-button>
              <el-button @click="handleCostSave" type="primary">确定</el-button>
            </el-col>
          </el-row>
        </el-form>
      </el-card>
      <!-- 缴费信息的列表 -->
      <el-table v-loading="loading" class="student-list" border :data="costList" style="width: 94%">
        <el-table-column show-overflow-tooltip prop="costType" label="类型" width="150">
          <template slot-scope="scope">{{scope.row.costType=='0'?'学费':'住宿费'}}</template>
        </el-table-column>
        <el-table-column prop="costValue" label="金额" width="120"></el-table-column>
        <el-table-column prop="costTime" label="时间" width="120"></el-table-column>
        <el-table-column prop="costBak" label="备注" width="120"></el-table-column>
        <el-table-column label="操作" width="130">
          <template slot-scope="scope">
            <el-button v-show = "!scope.row.id" @click = "delCostData(scope.row)" type="text" size="small">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
      <span slot="footer" class="dialog-footer">
        <!-- <el-button @click ="dialogVisible = false">取 消</el-button> -->
        <el-button @click="open">取消</el-button>
        <el-button type="primary" @click="doSave(studentDetail.id)">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>
<script>
import xyApi from "@/api/xyApi";
import { resetData, resetForm, handlePostObjArr } from "@/util/index";
import { regionDataPlus } from "element-china-area-data";
export default {
  name: "DialogDetail",
  props: {
    dormData: Array,
    classList: Array
  },
  data() {
    return {
      loading: true,
      costCard: false,
      costListNew: [],
      costList: [],
      num: 1,
      NewPriceMesg: [],
      cityOptions: regionDataPlus, //地市三级联动
      selectedCitys: ["410000", "410100", ""],
      costForm: {
        costType: "0", //默认0 学费 , 1 住宿费
        costTime: "",
        costValue: 0,
        costBak: ""
      },
      form: {
        name: "",
        classId: "",
        dormId: "",
        startTime: "",
        endTime: ""
      },
      studentDetail: {
        id: "",
        name: "",
        sex: "",
        qq: "",
        tel: "",
        school: "",
        job: "",
        dormname: "",
        ensTime: "",
        city: ""
      },
      // 宿舍信息
      dormList: [],
      dialogVisible: false,
      dialogShow: false,

      rules: {
        name: [
          { required: true, message: "请输入姓名", trigger: "change" },
          { min: 2, max: 5, message: "长度在 2 到 5 个字符", trigger: "change" }
        ],
        tel: [{ required: true, message: "请输入联系电话", trigger: "change" }],
        classId: [{ required: true, message: "请选择宿舍", trigger: "change" }]
      }
    };
  },
  computed: {
    computedSex() {
      var sexArr = [];
      var computedSexArr = {};
      sexArr.push(this.studentDetail);
      sexArr.map(item => {
        if (item.sex == "男" || item.sex == "0" || item.sex == 0) {
          item.sex = 0;
        }
        if (item.sex == "女" || item.sex == "1" || item.sex == 1) {
          item.sex = 1;
        }
      });
      computedSexArr = sexArr[0];
      return computedSexArr;
    }
  },
  methods: {
    handleClose(done) {
      this.$confirm("确认关闭？")
        .then(_ => {
          done();
        })
        .catch(_ => {});
    },
    handleCostCancel() {
      this.costCard = false;
      //重置表单
    },
    //取消编辑弹出框
    open() {
      this.$confirm("尚未, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          this.dialogVisible = false;
        })
        .catch(() => {
          this.dialogVisible = true;
        });
    },
    handleCostSave() {
      var costArr = [];
      this.costCard = false;
      //clone一个对象 否则会被清空
      var costInfo = _.cloneDeep(this.costForm);
      //新增一个tempid 方便删除
      costInfo.tempId = new Date().getTime();
      this.costListNew.push(costInfo);
      this.costList.push(costInfo);
      resetData(this, "costForm");
    },
    //地区三级联动
    handleCityChange(value) {
      var cityArr = "";
      for (var i = 0; i < value.length; i++) {
        cityArr += "," + value[i];
      }
      var newCityString = cityArr.substring(1, cityArr.length);
      this.studentDetail.city = newCityString;
    },
    //   打开弹窗
    openDialog(id) {
      this.dialogVisible = true;
      if (id) {
        this.getCostList();
        this.getCostList(id);
        this.getDetail(id);
      } else {
        this.loading = false;
        this.studentDetail = {
          id: "",
          name: "",
          sex: "",
          calssId: "",
          dormId: "",
          school: "",
          status: "",
          qq: "",
          job: "",
          wx: "",
          dormname: ""
        };
      }
    },
    // 获取数据详情
    getDetail(id) {
      this.loading = true;
      xyApi
        .getStudentDetail({
          id
        })
        .then(res => {
          this.studentDetail = res.data.data;
          this.loading = false;
        });
    },
    //删除缴费信息
    delCostData(row){
      for(var i = 0 ; i < this.costList.length ; i ++){
         this.costList[i].index = i ;
         var index  = this.costList[i].index
      }
      this.costList.splice(index,1);
    },
    /**
     * 根据id获取交费信息
     */
    getCostList(id) {
      xyApi
        .getCostList({
          userId: id
        })
        .then(res => {
          this.costList = res.data.data;
        });
    },
    // 点击确定执行操作
    doSave(id) {
      this.dialogVisible = false;
      this.$refs.studentDetail.validate(valid => {
        if (valid) {
          if (id) {
            xyApi
              .doUpDate({
                xyUser: this.studentDetail,
                 ...handlePostObjArr("xyCostItems", this.costListNew) //xyCostItems 必须字段
              })
              .then(res => {
                if (res.data.code == "success") {
                  this.$parent.getStudentData();
                  this.$message({
                    message: "修改成功!",
                    type: "success"
                  });
                } else {
                  this.$message.error("修改失败!");
                }
              });
          } else {
            xyApi
              .doStudentSave({
                xyUser: this.studentDetail,
                ...handlePostObjArr("xyCostItems", this.costListNew) //xyCostItems 必须字段
              })
              .then(res => {
                this.$parent.getStudentData();
                this.$message({
                  message: "保存成功!",
                  type: "success"
                });
              });
          }
          this.costForm = {
        costType: "", //默认0 学费 , 1 住宿费
        costTime: "",
        costValue: '',
        costBak: ""
      }
        } else {
          this.dialogVisible = true;
          this.$message.error("请注意验证信息!");
        }
      });
    },
    priceDialogShow() {
      this.costCard = true;
    }
  }
};
</script>
<style lang = "scss" scoped>
.dialog-detail {
  .add-price-mesg {
    position: relative;
    top: 0;
    left: 900px;
  }
  .dialog-form {
    margin-top: 80px;
    .start-data {
      margin-left: 45px;
    }
  }
  .dialog-form2 {
    margin-top: 80px;
  }
  .student-list {
    margin-top: 50px;
  }
  .cost-card {
    margin-top: 50px;
  }
}
</style>


