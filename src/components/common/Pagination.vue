<template>
    <div class="pagenation">
         <div class="block">
            <el-pagination
            @size-change="handleSizeChange"
            @current-change="handleCurrentChange"
            :current-page="currentPage1"
            :page-sizes="[10, 20, 30, 40]"
            :page-size="page.limit"
            layout="total, sizes, prev, pager, next, jumper"
            :total="page.total">
            </el-pagination>
        </div>
    </div>
</template>
<script>
export default {
    name: 'Pagenation',
    props:{
        page: Object
    },
    data(){
        return{
             currentPage1: 1
        }
    },
    methods:{
        handleSizeChange(v) {
                this.$emit('page-limit',v);
            },
        handleCurrentChange(val) {
                this.$emit('page-change',val);
            }
    }
}
</script>

