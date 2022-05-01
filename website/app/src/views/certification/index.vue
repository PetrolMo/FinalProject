<template>
  <div class="user">
    <el-card>
      <el-form inline inline-message size="small" label-width="80" :model="tableData.query">
        <el-form-item label="发布者">
          <el-input placeholder="请输入发布者用户名" v-model="tableData.query.username"></el-input>
        </el-form-item>
        <el-form-item label="认证状态">
          <el-select style="width: 150px" v-model="tableData.query.status" placeholder="请选择认证状态">
            <el-option v-for="item in certificationStatusOptions" :key="item.label" :value="item.value" :label="item.label"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="学号">
          <el-input placeholder="请输入学号" v-model="tableData.query.campus_id"></el-input>
        </el-form-item>
        <el-form-item label="发布时间">
          <el-date-picker
            v-model="tableData.query.date_range"
            type="daterange"
            :shortcuts="shortcuts"
            style="width: 300px"
            range-separator="至"
            start-placeholder="开始日期"
            end-placeholder="结束日期"
          />
        </el-form-item>
        <el-form-item label-width="0">
          <el-button type="info" style="margin-left: 10px" @click="clear">清空</el-button>
          <el-button type="primary" @click="search">查询</el-button>
        </el-form-item>
      </el-form>
    </el-card>
    <el-card style="margin-top: 20px">
      <el-table empty-text="暂无数据" :data="tableData.list">
        <el-table-column :width="item.width" :align="item.align" v-for="item in columns" :key="item.key" :prop="item.key" :label="item.title">
          <template #default="scope">
            <span v-if="item.key === 'status'">
              <el-tag v-if="scope.row.status === 0">待审核</el-tag>
              <el-tag v-else-if="scope.row.status === 1" type="success">已通过</el-tag>
              <el-tag v-else type="danger">已拒绝</el-tag>
            </span>
            <span v-else-if="item.key === 'username'">
              {{scope.row.user.username}}
            </span>
            <span v-else-if="item.key === 'createdAt'">
              {{getDate(scope.row.created)}}
            </span>
            <span v-else-if="item.key === 'operation'">
              <el-button type="default" size="small" @click="viewInfo(scope.row)">查看</el-button>
            </span>
            <span v-else>{{scope.row[item.key]}}</span>
          </template>
        </el-table-column>
      </el-table>
      <el-pagination
        style="float: right; margin: 10px 0"
        v-model:currentPage="tableData.query.page"
        v-model:page-size="tableData.query.size"
        :page-sizes="[10, 15, 20, 25]"
        layout="total, sizes, prev, pager, next, jumper"
        :total="tableData.query.total"
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
      />
    </el-card>
    <el-dialog v-model="openModal" title="查看认证信息">
      <el-form :model="form" label-width="100px">
        <el-row>
          <el-col :span="12">
            <el-form-item label="发布者昵称">
              {{getDate(form.user.username)}}
            </el-form-item>
            <el-form-item label="发布时间">
              {{getDate(form.created)}}
            </el-form-item>
            <el-form-item label="姓名">
              <span>{{ form.name }}</span>
            </el-form-item>
            <el-form-item label="学号">
              <span>{{ form.campus_id}}</span>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="认证状态">
              <el-tag v-if="form.status === 0">待审核</el-tag>
              <el-tag v-else-if="form.status === 1" type="success">已通过</el-tag>
              <el-tag v-else type="danger">已拒绝</el-tag>
            </el-form-item>
            <el-form-item label="认证描述">
              {{form.desc}}
            </el-form-item>
            <el-form-item label="认证图片">
              <el-upload
                action="#"
                list-type="picture-card"
                :on-preview="handlePictureCardPreview"
                multiple
                accept="image/png, image/jpeg, image/jpg"
                :file-list="form.images"
                :disabled="true"
                :limit="9"
              >
                <template #default v-if="isEdit">
                  <span style="font-size: 28px;">+</span>
                </template>
              </el-upload>
              <el-dialog v-model="dialogVisible">
                <img style="width: 100%;" :src="dialogImageUrl" alt="Preview Image" />
              </el-dialog>
            </el-form-item>
          </el-col>
        </el-row>
        <div style='display: flex; justify-content: center;' v-if='form.status === 0'>
          <el-button type='success' @click='enable(form._id)'>审核通过</el-button>
          <el-button type='danger' @click='disable(form._id)'>审核拒绝</el-button>
        </div>
      </el-form>
    </el-dialog>
  </div>
</template>

<script>
import { reactive, ref } from "vue";
import OSS from 'ali-oss'
import { genderOptions, campusOptions, certQuery, certColumns, certificationStatusOptions, priceOptions } from "../../constant";
import {deepCopy, getAge, removeProperty} from "../../utils";
import { ElNotification } from 'element-plus'
import axios from "@/utils/axios";
import moment from "moment";
export default {
  name: "CertificationList",
  setup () {
    let client = {}
    let tableData = reactive({
      query: deepCopy(certQuery),
      list: []
    })
    function handleSizeChange () {
      queryTable()
    }
    function handleCurrentChange () {
      queryTable()
    }
    function clear () {
      tableData.query = deepCopy(certQuery)
      queryTable()
    }
    function search () {
      refresh()
    }
    function enable (_id) {
      axios.get('/cert/enable', {
        params: {
          _id
        }
      }).then(() => {
        ElNotification({
          title: '通过成功',
          type: 'success',
          duration: 1000
        })
        refresh()
        openModal.value = false
      }).catch(err => {
        ElNotification({
          title: '通过失败',
          message: err.data.msg,
          type: 'error',
          duration: 1000
        })
      })
    }
    function disable (_id) {
      axios.get('/cert/disable', {
        params: {
          _id
        }
      }).then(() => {
        ElNotification({
          title: '拒绝成功',
          type: 'success',
          duration: 1000
        })
        refresh()
        openModal.value = false
      }).catch(err => {
        ElNotification({
          title: '拒绝失败',
          message: err.data.msg,
          type: 'error',
          duration: 1000
        })
      })
    }
    function refresh () {
      tableData.query.page = 1
      queryTable()
    }
    function queryTable () {
      const params = {
        ...tableData.query
      }
      params.date_begin = tableData.query.date_range[0]
      params.date_end = tableData.query.date_range[1]
      delete params.date_range
      axios.get('/cert/certList', { params: removeProperty(params) }).then(({ data }) => {
        tableData.query.total = data.total || 0
        tableData.list = data.data
      })
    }
    queryTable()
    let openModal = ref(false)
    let form = ref({})
    function viewInfo (data) {
      form.value = deepCopy(data)
      openModal.value = true
    }
    const shortcuts = [
      {
        text: '上周',
        value: () => {
          const end = new Date()
          const start = new Date()
          start.setTime(start.getTime() - 3600 * 1000 * 24 * 7)
          return [start, end]
        },
      },
      {
        text: '上个月',
        value: () => {
          const end = new Date()
          const start = new Date()
          start.setTime(start.getTime() - 3600 * 1000 * 24 * 30)
          return [start, end]
        },
      },
      {
        text: '近三个月',
        value: () => {
          const end = new Date()
          const start = new Date()
          start.setTime(start.getTime() - 3600 * 1000 * 24 * 90)
          return [start, end]
        },
      },
    ]
    function getDate (date) {
      return moment(date).format('YYYY.MM.DD HH:mm')
    }

    const dialogImageUrl = ref('')
    const dialogVisible = ref(false)
    function handlePictureCardPreview (uploadFile) {
      dialogImageUrl.value = uploadFile.url
      dialogVisible.value = true
    }
    return {
      ...reactive({
        genderOptions,
        campusOptions,
        priceOptions,
        certificationStatusOptions,
        columns: deepCopy(certColumns)
      }),
      tableData,
      handleSizeChange,
      handleCurrentChange,
      queryTable,
      clear,
      search,
      disable,
      enable,
      getAge,
      refresh,
      openModal,
      form,
      getDate,
      viewInfo,
      shortcuts,
      handlePictureCardPreview,
      dialogVisible,
      dialogImageUrl
    }
  }
}
</script>

<style>
.user {
  margin-bottom: 50px;
}
</style>

