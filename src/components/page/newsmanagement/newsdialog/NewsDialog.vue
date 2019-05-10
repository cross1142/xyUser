<template>
  <div class="news-dialog">
    <el-dialog
      v-loading="loading"
      title="文章明细"
      :visible.sync="dialogVisible"
      width="70%"
      :before-close="handleClose"
    >
      <el-form
        :model="newsDetail"
        :rules="rules"
        ref="newsDetail"
        label-width="100px"
        class="dialog-form"
      >
        <el-row :gutter="20">
          <el-col :span="8">
            <el-form-item label="开始时间">
              <el-date-picker
                type="datetime"
                value-format="yyyy-MM-dd HH:mm:ss"
                v-model="newsDetail.addTime"
                placeholder="选择日期时间"
              ></el-date-picker>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="题目" prop="title" class="title">
              <el-input v-model="newsDetail.title"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="作者" prop="author">
              <el-input v-model="newsDetail.author"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="24">
            <el-form-item label="简介">
              <el-input v-model="newsDetail.desc"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item class="class-desc" label="编辑工具">
              <template>
                <el-select v-model="newsDetail.type" @change="handleChange" placeholder="请选择">
                  <el-option
                    v-for="item in options"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value"
                  ></el-option>
                </el-select>
              </template>
            </el-form-item>
          </el-col>
          <el-col :span="4">
            <el-form-item label="是否hot">
              <el-switch v-model="newsDetail.hot" active-color="#13ce66" inactive-color="#ff4949"></el-switch>
            </el-form-item>
          </el-col>
          <el-col :span="4">
            <el-form-item label="封面是否显示在正文">
              <el-switch
                v-model="newsDetail.coverShow"
                active-color="#13ce66"
                inactive-color="#ff4949"
              ></el-switch>
            </el-form-item>
          </el-col>
          <el-col :span="20">
            <el-form-item label="封面图片">
              <el-upload
                class="upload-demo"
                action="/admin/xy/upload/uploadImg"
                :on-success="handlesublit"
              >
                <span class="el-upload-icon">
                  <i class="el-icon-upload2">点击上传</i>
                </span>
                <img :src="src" class="face-img" alt>
              </el-upload>
            </el-form-item>
          </el-col>
          <el-col :span="24">
            <el-form-item v-if="editMdType" label="文章内容" class="markdown-form">
              <div class="markdown-wrapper">
                <mavon-editor
                  class="markdown-area"
                  @change="handleMdChange"
                  :boxShadow="false"
                  placeholder="请输入"
                  ref="md"
                  v-model="newsDetail.content1"
                />
              </div>
            </el-form-item>
          </el-col>
          <el-col :span="24">
            <el-form-item v-if="editQuType" label="文章内容">
              <quill-editor
                v-model="newsDetail.content2"
                ref="myQuillEditor"
                :options="editorOption"
                @blur="onEditorBlur($event)"
                @focus="onEditorFocus($event)"
                @ready="onEditorReady($event)"
              ></quill-editor>
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="submit(newsDetail.id)">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>
<script>
import url from "@/api/url";
import { mavonEditor } from "mavon-editor";
import "mavon-editor/dist/css/index.css";
import newsApi from "@/api/newsApi";
// require styles
import "quill/dist/quill.core.css";
import "quill/dist/quill.snow.css";
import "quill/dist/quill.bubble.css";

import { quillEditor } from "vue-quill-editor";
export default {
  name: "NewsDialog",
  components: {
    mavonEditor,
    quillEditor
  },
  data() {
    return {
      dialogVisible: false,
      loading: true,
      editMdType: false,
      editQuType: false,
      editorOption: {
        // some quill options
      },
      rules: {
        title: [
          { required: true, message: "请输入内容", trigger: "change" },
          {
            min: 2,
            max: 20,
            message: "长度在 3 到 20个字符",
            trigger: "change"
          }
        ],
        author: [
          { required: true, message: "请输入内容", trigger: "change" },
          {
            min: 1,
            max: 10,
            message: "长度在 3 到 20个字符",
            trigger: "change"
          }
        ]
      },
      options: [
        {
          value: "0",
          label: "富文本"
        },
        {
          value: "1",
          label: "markdown"
        }
      ],
      newsDetail: {
        addTime: " ",
        author: " ",
        id: " ",
        dir: " ",
        hot: " ",
        content1: " ",
        content2: " ",
        cover: " "
      },
      src: " "
    };
  },
  methods: {
    handleClose(done) {
      this.$confirm("确认关闭？")
        .then(_ => {
          done();
        })
        .catch(_ => {});
    },
    //对话框显示
    dialogshow(row) {
      this.loading = true;
      if (row.id) {
        newsApi
          .newsDetail({
            id: row.id
          })
          .then(res => {
            this.newsDetail = res.data.data;
            this.src = url.upload + this.newsDetail.cover;
            this.loading = false;
          });
      } else {
        this.newsDetail = {
          addTime: "",
          author: "",
          id: "",
          dir: "",
          hot: "",
          cover: ""
        };
      }
      this.dialogVisible = true;
    },
    submit(id) {
      this.dialogVisible = false;
      this.$refs.newsDetail.validate(valid => {
        if (valid) {
          if (id) {
            newsApi
              .newsUpdate({
                xyNews: this.newsDetail
              })
              .then(res => {
                if (res.data.code == "success") {
                  this.$parent.getMackDownData();
                  this.$message({
                    message: "修改成功!",
                    type: "success"
                  });
                } else {
                  this.$message.error("修改失败!");
                }
              });
          } else {
            newsApi
              .newsSave({
                xyNews: this.newsDetail
              })
              .then(res => {
                // console.log(res);
                if (res.data.code == "success") {
                  this.$parent.getMackDownData();
                  this.$message({
                    message: "添加成功!",
                    type: "success"
                  });
                } else {
                  this.$message.error("添加失败!");
                }
              });
          }
        } else {
          this.dialogVisible = true;
          this.$message.error("请注意验证信息!");
        }
      });
    },
    handleMdChange(value, render) {
      this.newsDetail.content2 = render;
    },
    handlePreview(file) {},
    handlesublit(res) {
      this.newsDetail.cover = res.url;
      this.src = url.upload + res.url;
    },
    handleChange(value) {
      // console.log(value);
      if (value == "0") {
        this.editMdType = false;
        this.editQuType = true;
      }
      if (value == "1") {
        this.editQuType = false;
        this.editMdType = true;
      }
    },
    //富文本编辑
    onEditorBlur(quill) {
      console.log("editor blur!", quill);
    },
    onEditorFocus(quill) {
      console.log("editor focus!", quill);
    },
    onEditorReady(quill) {
      console.log("editor ready!", quill);
    }
  }
};
</script>
<style lang = "scss" scoped>
.news-form {
  margin-top: 50px;
}
.demo-image__placeholder {
  width: 300px;
  height: 200px;
}
.el-upload-icon {
  display: block;
  width: 102px;
  height: 34px;
  background-color: rgb(64, 172, 42);
  color: white;
  border-radius: 6px;
}
.el-upload-icon-text {
  position: relative;
  top: -32px;
  left: 22px;
}
</style>


