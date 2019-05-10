<template>
  <div class="student">
    <!-- 搜索栏 -->
    <search-bar @search="handleSearch" :classList="classList" :dormList="dormList"></search-bar>
    <!-- 添加按钮 -->
    <el-button @click="dialogShow(id)" type="primary">添加</el-button>
    <!-- 学员列表 -->
    <el-table v-loading="loading" class="student-list" :data="students" border style="width: 100%">
      <el-table-column fixed prop="addTime" label="入学日期" width="150"></el-table-column>
      <el-table-column prop="name" label="姓名" width="120"></el-table-column>
      <el-table-column prop="tel" label="电话" width="120"></el-table-column>
      <el-table-column prop="city" label="城市" width="120"></el-table-column>
      <el-table-column prop="id" label="学员id" width="300"></el-table-column>
      <el-table-column prop="school" label="学校" width="120"></el-table-column>
      <el-table-column prop="sex" label="性别" width="120"></el-table-column>
      <el-table-column prop="job" label="工作" width="120"></el-table-column>
      <el-table-column prop="dormname" label="宿舍" width="120"></el-table-column>
      <el-table-column fixed="right" label="操作" width="130">
        <template slot-scope="scope">
          <el-button @click="viewDialog(scope.row)" type="text" size="small">查看</el-button>
          <el-button @click="dialogShow(scope.row)" type="text" size="small">编辑</el-button>
          <template>
            <el-button class="del-button" @click="delStudent(scope.row)" type="text" size="small">删除</el-button>
          </template>
        </template>
      </el-table-column>
    </el-table>
    <!-- 对话框 -->
    <dialog-detail :dormData="dormList" :classList="classList" ref="show"></dialog-detail>
    <view-detail ref="view"></view-detail>
    <el-card>
      <el-col :span="8" :offset="14">
        <my-pagenation
          :page="page"
          @page-limit="handlePageLimit"
          @page-change="handlePageChange"
          class="my-pagination"
        ></my-pagenation>
      </el-col>
    </el-card>
  </div>
</template>
<script>
import xyApi from "@/api/xyApi";
import DialogDetail from "./dialogdetail/DialogDetail.vue";
import MyPagenation from "@/components/common/Pagination.vue";
import ViewDetail from "./viewDetail/ViewDetail.vue";
import SearchBar from "./searchbar/SearchBar.vue";
import lodash from "lodash";
import { CodeToText } from "element-china-area-data";
export default {
  name: "student",
  components: {
    DialogDetail,
    ViewDetail,
    SearchBar,
    MyPagenation
  },
  data() {
    return {
      stundentList: [],
      classList: [],
      dormList: [],
      id: "",
      loading: true,
      page: {
        start: 1, // 页码
        limit: 10, // 每页数量
        total: 0, // 总条数
        pageCount: 0 // 页数
      }
    };
  },
  created() {
    this.getStudentData();
    this.getclassList();
    this.getDormList();
  },
  computed: {
    students() {
      // 对数据进行修复
      // if(!this.studentsList) return [];
      var rs = this.stundentList.map(item => {
        var cityCode = item.city; // '1110010,11010,1001'
        var cityTextArr = [];
        var computedSex = [];
        if (item.sex == 0 || item.sex == "男") {
          item.sex = "男";
        }
        if (item.sex == 1 || item.sex == "女") {
          item.sex = "女";
        }
        computedSex.push(item);
        if (cityCode) {
          var cityCodeArr = cityCode.split(","); // ['1110010',11010','1001']
          cityCodeArr.forEach(element => {
            // 借助codeToText 把code解析为文本地址
            cityTextArr.push(CodeToText[element]);
          });
        }
        item.city = cityTextArr;
        return item;
      });
      return rs;
    }
  },
  methods: {
    // 获取学员列表
    getStudentData(searchForm = {}) {
      this.loading = true;
      xyApi
        .getStudentList({
          start: this.page.start,
          limit: this.page.limit,
          // lodash的方法
          ..._.pickBy(searchForm, v => {
            return v;
          })
        })
        .then(res => {
          this.stundentList = res.data.data.list;
          this.page.pageCount = res.data.data.totalPage;
          this.page.total = res.data.data.totalRow;
          this.loading = false;
        });
    },
    // 点击搜索遍历符合的条件
    handleSearch(form) {
      this.getStudentData(form);
    },
    // 调用子类的方法,打开对话框
    dialogShow(obj) {
      this.$refs.show.openDialog(obj.id);
    },
    // 删除学员的信息
    delStudent(row) {
      this.$confirm("此操作将永久删除该文件, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          //发送删除请求
          xyApi
            .delData({
              id: row.id
            })
            .then(res => {
              this.getStudentData();
            });
          this.$message({
            type: "success",
            message: "删除成功!"
          });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除"
          });
        });
    },
    // 点击查看,弹出明细
    viewDialog(row) {
      this.$refs.view.openview(row);
    },
    // 获取班级列表
    getclassList() {
      this.loading = true;
      xyApi.clazzlist().then(res => {
        this.classList = res.data.data.list;
        this.loading = false;
      });
    },
    // 获取宿舍信息
    getDormList() {
      this.loading = true;
      xyApi.dormList().then(res => {
        this.dormList = res.data.data.list;
        this.loading = false;
      });
    },
    //页面跳转
    handlePageChange(val) {
      this.page.start = val;
       this.getStudentData();
    },
    handlePageLimit(v) {
      this.page.limit = v;
      this.getStudentData();
    }
  }
};
</script>
<style lang = "scss" scoped>
.student-list {
  margin-top: 10px;
  .del-button {
    color: red;
  }
}
</style>


