<template>
  <div class="user">
    <el-card>
      <el-form inline inline-message size="small" label-width="80" :model="tableData.query">
        <el-form-item label="用户名">
          <el-input placeholder="请输入用户名" v-model="tableData.query.username"></el-input>
        </el-form-item>
        <el-form-item label="用户状态">
          <el-select style="width: 150px" v-model="tableData.query.status" placeholder="请选择用户状态">
            <el-option v-for="item in statusOptions" :key="item.label" :value="item.value" :label="item.label"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="性别">
          <el-select style="width: 120px" v-model="tableData.query.gender" placeholder="请选择性别">
            <el-option v-for="item in genderOptions" :key="item.label" :value="item.value" :label="item.label"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="校区">
          <el-select v-model="tableData.query.campus" placeholder="请选择校区">
            <el-option v-for="item in campusOptions" :key="item.label" :value="item.value" :label="item.label"></el-option>
          </el-select>
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
            <span v-if="item.key === 'age'">
              {{getAge(scope.row.birthday)[0]}}
            </span>
            <span v-else-if="item.key === 'avatar'">
              <el-avatar :size="50" fit="fill" :src="scope.row.avatar" />
            </span>
            <span v-else-if="item.key === 'status'">
              <el-tag v-if="scope.row.status === 0" type="danger">禁用</el-tag>
              <el-tag v-else type="success">启用</el-tag>
            </span>
            <span v-else-if="item.key === 'gender'">
              {{genderOptions.find(item => item.value === scope.row.gender).label}}
            </span>
            <span v-else-if="item.key === 'campus'">
               {{campusOptions.find(item => item.value === scope.row.campus).label}}
            </span>
            <span v-else-if="item.key === 'operation'">
              <el-button type="default" size="small" @click="viewInfo(scope.row)">查看</el-button>
              <el-button type="primary" size="small" @click="editInfo(scope.row)">编辑</el-button>
              <el-button type="success" size="small" v-if="scope.row.status === 0" @click="enable(scope.row._id)">启用</el-button>
              <el-button type="danger" size="small" v-if="scope.row.status === 1" @click="disable(scope.row._id)">禁用</el-button>
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
    <el-dialog v-model="openModal" :title="isEdit? '编辑用户信息' : '查看用户信息'">
      <el-form :model="form" label-width="80px">
      <el-row>
        <el-col :span="12">
          <el-form-item label="用户状态">
            <el-tag v-if="form.status === 0" type="danger">禁用</el-tag>
            <el-tag v-else type="success">启用</el-tag>
          </el-form-item>
            <el-form-item label="用户头像">
              <el-upload
                  action="#"
                  :limit="1"
                  :file-list="images"
                  :on-remove="handleRemove"
                  :before-upload="handleUpload"
                  multiple
                  accept="image/png, image/jpeg, image/jpg"
                  :disabled="!isEdit"
              >
                <el-avatar :size="50" fit="contain" :src="form.avatar" />
              </el-upload>
            </el-form-item>
            <el-form-item label="用户名">
              <el-input :disabled="!isEdit" v-model="form.username" style="width: 200px" autocomplete="off" />
            </el-form-item>
            <el-form-item label="性别">
              <el-select :disabled="!isEdit" style="width: 150px" v-model="form.gender" placeholder="请选择性别">
                <el-option v-for="item in [...genderOptions].splice(1, 2)" :key="item.label" :value="item.value" :label="item.label"></el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="校区">
              <el-select :disabled="!isEdit" style="width: 150px" v-model="form.campus" placeholder="请选择校区">
                <el-option v-for="item in [...campusOptions].splice(1, 4)" :key="item.label" :value="item.value" :label="item.label"></el-option>
              </el-select>
            </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="用户id">
            {{form._id}}
          </el-form-item>
          <el-form-item label="出生日期">
            <el-date-picker :disabled="!isEdit" style="width: 150px" v-model="form.birthday" type="date" placeholder="选择日期" />
          </el-form-item>
          <el-form-item label="电话号码">
            <el-input :disabled="!isEdit" type="" v-model="form.phone" style="width: 200px" autocomplete="off" />
          </el-form-item>
          <el-form-item label="用户简介">
            <el-input :disabled="!isEdit" v-model="form.desc"
                      :rows="4"
                      :max="300"
                      :show-word-limit="true"
                      type="textarea" style="width: 200px" autocomplete="off" />
          </el-form-item>
        </el-col>
      </el-row>
      </el-form>
      <template #footer>
      <span class="dialog-footer">
        <el-button @click="openModal = false">取消</el-button>
        <el-button v-if="isEdit" type="primary" @click="submit"
        >确认</el-button
        >
      </span>
      </template>
    </el-dialog>
  </div>
</template>

<script>
import { reactive, ref } from "vue";
import { genderOptions, campusOptions, userQuery, userColumns, statusOptions } from "../../../constant";
import {deepCopy, getAge, removeProperty} from "../../../utils";
import { ElNotification } from 'element-plus'
import axios from "@/utils/axios";
import moment from "moment";
import OSS from "ali-oss";
export default {
  name: "UserList",
  setup () {
    let client = {}
    function getSts() {
      return new Promise(resolve => {
        axios.get('/sts').then(res => {
          resolve(res.data)
        })
      })
    }
    getSts().then(res => {
      client = new OSS({
        // yourRegion填写Bucket所在地域。以华东1（杭州）为例，Region填写为oss-cn-hangzhou。
        region: 'oss-cn-beijing',
        // 从STS服务获取的临时访问密钥（AccessKey ID和AccessKey Secret）。
        accessKeyId: res.AccessKeyId,
        accessKeySecret: res.AccessKeySecret,
        // 从STS服务获取的安全令牌（SecurityToken）。
        stsToken: res.SecurityToken,
        secure: true,
        refreshSTSToken: async () => {
          // 向您搭建的STS服务获取临时访问凭证。
          return getSts()
        },
        // 刷新临时访问凭证的时间间隔，单位为毫秒。
        refreshSTSTokenInterval: 300000,
        // 填写Bucket名称。
        bucket: 'store-front-avatar'
      })
    })
    let tableData = reactive({
      query: deepCopy(userQuery),
      list: []
    })
    function getType(type){
      if(type === 0){
        return "修改"
      }else if(type === 1){
        return "删除"
      }else if(type === 2){
        return "重置"
      }

    }
    function handleSizeChange () {
      queryTable()
    }
    function handleCurrentChange () {
      queryTable()
    }
    function clear () {
      tableData.query = deepCopy(userQuery)
      queryTable()
    }
    function search () {
      refresh()
    }
    function enable (_id) {
      axios.get('/users/enable', {
        params: {
          _id
        }
      }).then(() => {
        ElNotification({
          title: '启用成功',
          type: 'success',
          duration: 1000
        })
        refresh()
      }).catch(err => {
        ElNotification({
          title: '启用失败',
          message: err.data.msg,
          type: 'error',
          duration: 1000
        })
      })
    }
    function disable (_id) {
      axios.get('/users/disable', {
        params: {
          _id
        }
      }).then(() => {
        ElNotification({
          title: '禁用成功',
          type: 'success',
          duration: 1000
        })
        refresh()
      }).catch(err => {
        ElNotification({
          title: '禁用失败',
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
      axios.get('/users/userList', { params: removeProperty(params) }).then(({ data }) => {
        tableData.query.total = data.total || 0
        tableData.list = data.data
      })
    }
    queryTable()
    let openModal = ref(false)
    let isEdit = ref(true)
    let form = ref({})
    function editInfo (data) {
      isEdit.value = true
      form.value = deepCopy(data)
      openModal.value = true
    }
    function viewInfo (data) {
      isEdit.value = false
      form.value = deepCopy(data)
      openModal.value = true
    }
    function submit () {
      axios.post('/users/edit', { ...form.value }).then(() => {
        openModal.value = false
        ElNotification({
          type: 'success',
          title: '修改成功'
        })
        refresh()
      })
    }
    const dialogImageUrl = ref('')
    const dialogVisible = ref(false)
    const images = ref([])
    function handleRemove (uploadFile, uploadFiles) {
      form.value.images = uploadFiles
    }
    function handlePictureCardPreview (uploadFile) {
      dialogImageUrl.value = uploadFile.url
      dialogVisible.value = true
    }
    function handleUpload (file) {
      const filename = moment().format('YYYYMMDD') + file.name
      client.put(filename, file).then(res => {
        form.value.avatar = res.url
      }).catch(err => {
        console.log(err)
      })
      return false
    }
    return {
      ...reactive({
        genderOptions,
        campusOptions,
        statusOptions,
        columns: deepCopy(userColumns)
      }),
      tableData,
      getType,
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
      isEdit,
      form,
      editInfo,
      viewInfo,
      submit,
      handleRemove,
      handleUpload,
      handlePictureCardPreview,
      dialogVisible,
      dialogImageUrl,
      images
    }
  }
}
</script>

<style>
.user {
  margin-bottom: 50px;
}
</style>

