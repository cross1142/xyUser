<template>
  <div class="new-management">
    <!-- 添加按钮 -->
    <el-button @click="handleClick(id)" type="primary">添加</el-button>
    <template>
      <el-table v-loading="loading" :data="computedSrc" border style="width: 100%">
        <el-table-column fixed prop="addTime" label="日期" width="150"></el-table-column>
        <el-table-column prop="author" label="作者" width="120"></el-table-column>
        <el-table-column prop="title" label="题目" width="120"></el-table-column>
        <el-table-column
          class="text-content"
          :show-overflow-tooltip="true"
          prop="content1"
          label="文本内容"
          width="120"
        >
        </el-table-column>
        <el-table-column prop="desc" label="简介" width="120"></el-table-column>
        <el-table-column prop="id" label="id" width="120"></el-table-column>
        <el-table-column prop="viewCount" label="浏览量" width="120"></el-table-column>
        <el-table-column prop="type" label="类型" width="120"></el-table-column>
        <el-table-column prop="cover" label="图片" width="120">
          <template slot-scope="scope">
            <div class="demo-image__placeholder">
              <div class="block">
                <el-image fit="cover" class="face-img" :src="scope.row.cover"></el-image>
              </div>
            </div>
          </template>
        </el-table-column>
        <el-table-column label="操作" fixed="right" width="120">
          <template slot-scope="scope">
            <el-button @click="handleClick(scope.row)" type="text" size="small">编辑</el-button>
            <el-button @click="delNews(scope.row.id)" type="text" size="small">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
    </template>
    <news-dialog class="news-dialog" ref="show"></news-dialog>
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
import newsApi from "@/api/newsApi";
import NewsDialog from "./newsdialog/NewsDialog.vue";
import MyPagenation from "@/components/common/Pagination.vue";
import url from "@/api/url";
export default {
  name: "NewsManagement",
  components: {
    NewsDialog,
    MyPagenation
  },
  data() {
    return {
      html: "<b style='color:red'>v-html</b>",
      id: "",
      src: "",
      loading: true,
      newsList: [
        {
          addTime: "",
          author: "",
          fileName: "",
          id: "",
          cover: "",
          desc: "",
          title: ""
        }
      ],
      page: {
        start: 1, // 页码
        limit: 10, // 每页数量
        total: 0, // 总条数
        pageCount: 0 // 页数
      }
    };
  },
  created() {
    this.getMackDownData();
  },
  computed: {
    computedSrc() {
      var computedNewsList = [];
      this.newsList.map(item => {
        item.cover = url.upload + item.cover;
        computedNewsList.push(item);
      });
      return computedNewsList;
    }
  },
  methods: {
    //获取新闻列表
    getMackDownData() {
      this.loading = true;
      newsApi
        .newsList({
          start: this.page.start,
          limit: this.page.limit
        })
        .then(res => {
          this.newsList = res.data.data.list;
          this.page.pageCount = res.data.data.totalPage;
          this.page.total = res.data.data.totalRow;
          this.loading = false;
        });
    },
    handleClick(row) {
      this.$refs.show.dialogshow(row);
    },
    //删除news信息
    delNews(id) {
      this.$confirm("此操作将永久删除该文件, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          newsApi
            .newsDel({
              id: id
            })
            .then(res => {
              this.getMackDownData();
              if (res.data.code == "success") {
                this.$message({
                  message: "删除成功!",
                  type: "success"
                });
              } else {
                this.$message.error("删除失败!");
              }
            });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除"
          });
        });
    },
    //页面跳转
    handlePageChange(val) {
      this.page.start = val;
      this.getMackDownData();
    },
    handlePageLimit(v) {
      this.page.limit = v;
      this.getMackDownData();
    }
  }
};
</script>
<style lang = "scss" scoped>
.news-dialog ::v-deep .el-upload--text {
  width: 400px;
  height: 300px;
  border: none;
  .face-img{
    width: 100%;
    height: 100%;
  }
}
::v-deep .el-image__error {
  margin-top: -20px;
}
.demo-image__placeholder {
  width: 130px;
  height: 130px;
}
</style>


