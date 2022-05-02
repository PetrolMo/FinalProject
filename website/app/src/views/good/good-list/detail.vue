<template>
  <div class="user-detail">
    <el-button type="primary" @click="$router.replace('/good-list')">返回列表</el-button>
    <el-card style="width: 100%; margin-top: 20px">
      <template #header>
        基本信息
      </template>
      <el-form :model="form" inline label-width="80px">
        <el-form-item label="商品状态">
          <el-tag v-if="form.status === 0" type="danger">禁用</el-tag>
          <el-tag v-else type="success">启用</el-tag>
        </el-form-item>
        <el-form-item label="商品ID">
          <el-input :disabled="true" v-model="form._id" style="width: 200px" autocomplete="off" />

        </el-form-item>
        <el-form-item v-if="form.user" label="发布者">
          <el-input :disabled="true" v-model="form.user.username" style="width: 200px" autocomplete="off" />
        </el-form-item>
        <el-form-item v-if="form.user"  label="发布者id">
          <el-input :disabled="true" v-model="form.user._id" style="width: 200px" autocomplete="off" />
        </el-form-item>
        <el-form-item label="发布时间">
          <el-date-picker :disabled="true" style="width: 150px" v-model="form.created" type="date" placeholder="选择日期" />
        </el-form-item>
        <el-form-item label="校区">
          <el-select :disabled="true" style="width: 150px" v-model="form.campus" placeholder="请选择校区">
            <el-option v-for="item in  [...campusOptions].splice(1, 4)" :key="item.label" :value="item.value" :label="item.label"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="商品原价">
          <el-input :disabled="true" v-model="form.origin_price" style="width: 200px" autocomplete="off" />
        </el-form-item>
        <el-form-item label="商品价格">
          <el-input :disabled="true" v-model="form.price" style="width: 200px" autocomplete="off" />
        </el-form-item>
        <el-form-item label="商品标题">
          <el-input :disabled="true" v-model="form.title" style="width: 200px" autocomplete="off" />
        </el-form-item>
        <el-form-item label="商品介绍">
          <el-input :disabled="true" v-model="form.desc"
                    :rows="4"
                    :max="300"
                    :show-word-limit="true"
                    type="textarea" style="width: 200px" autocomplete="off" />
        </el-form-item>
      </el-form>
      <div style="margin-left: 20px">
        <el-upload
          action="#"
          list-type="picture-card"
          :on-preview="handlePictureCardPreview"
          :on-remove="handleRemove"
          :before-upload="handleUpload"
          multiple
          accept="image/png, image/jpeg, image/jpg"
          :file-list="form.images"
          :disabled="true"
          :limit="9"
        >
          <template #default>
            <span v-if="false" style="font-size: 28px;">+</span>
          </template>
        </el-upload>
        <el-dialog v-model="dialogVisible">
          <img style="width: 100%;" :src="dialogImageUrl" alt="Preview Image" />
        </el-dialog>
      </div>
      <el-button type="primary" style="float: right;margin: 10px 50px 20px 0" @click="submit">去编辑</el-button>
    </el-card>
    <el-tabs type="border-card" v-model="activeName" class="demo-tabs" @tab-click="handleClick">
      <el-tab-pane lazy label="收藏者列表" name="mark">
        <el-table size="small" empty-text="暂无数据" :data="tableData.list1">
          <el-table-column :width="item.width" :align="item.align" v-for="item in userColumns" :key="item.key + 'mark'" :prop="item.key" :label="item.title">
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
              <el-button type="primary" @click="viewUser(scope.row._id)">查看</el-button>
            </span>
              <span v-else>{{scope.row[item.key]}}</span>
            </template>
          </el-table-column>
        </el-table>
      </el-tab-pane>
      <el-tab-pane lazy label="留言列表" name="reply">
        <el-table size="small" empty-text="暂无数据" :data="tableData.list2">
          <el-table-column :width="item.width" :align="item.align" v-for="item in replyColumns" :key="item.key + 'reply'" :prop="item.key" :label="item.title">
            <template #default="scope">
              <span v-if="item.key === 'username'">
              {{scope.row.user?.username || ''}}
            </span>
              <span v-else-if="item.key === 'avatar'">
              <el-avatar :size="50" fit="fill" :src="scope.row.user.avata" />
            </span>
              <span v-else-if="item.key === 'createdAt'">
              {{getDate(scope.row.created)}}
            </span>
              <span v-else-if="item.key === 'operation'">
              <el-button type="primary" @click="viewUser(scope.row.user._id)">查看</el-button>
            </span>
              <span v-else>{{scope.row[item.key]}}</span>
            </template>
          </el-table-column>
        </el-table>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script>
import { useRoute, useRouter } from "vue-router";
import { ref, reactive } from "vue";
import axios from '../../../utils/axios'
import {campusOptions, genderOptions, statusOptions, userColumns, replyColumns} from "../../../constant";
import {deepCopy, getAge} from "../../../utils";
import moment from "moment";
import OSS from "ali-oss";

export default {
  name: "detail",
  setup () {
    const router = useRouter()
    const route = useRoute()
    let activeName = ref('mark')
    const tableData = reactive({
      list1: [],
      list2: []
    })
    let client = {}
    const _id = route.query._id
    let form = ref({})
    function getSts() {
      return new Promise(resolve => {
        axios.get('/sts').then(res => {
          resolve(res.data)
        })
      })
    }
    init()
    function init() {
      queryGoodInfo()
      queryTableData('mark')
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
    }
    function handleClick () {
      tableData.list1 = []
      tableData.list2 = []
      queryTableData(activeName.value)
    }
    function submit () {
      router.push({
        name: 'good-edit',
        query: {
          _id: _id
        }
      })
    }
    function queryTableData(value) {
      switch (value) {
        case 'mark':
          // 获取用户发布的商品
          axios.get('/good/markUser', {
            params: {
              good: _id
            }
          }).then(res => {
            console.log(res)
            tableData.list1 = res.data.result.map(item => item.user)
          })
          break
        case 'reply':
          // 获取用户收藏的商品列表
          axios.get('/good/queryMsg', {
            params: {
              good: _id
            }
          }).then(res => {
            console.log(res)
            tableData.list2 = res.data.result
          })
          break
      }
    }
    function queryGoodInfo () {
      axios.get('/good/queryGood', {
        params: {
          _id: _id
        }
      }).then(res => {
        console.log(res)
        form.value = res.data
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
        form.value.images.push(res)
      }).catch(err => {
        console.log(err)
      })
      return false
    }
    function getDate (date) {
      return moment(date).format('YYYY.MM.DD HH:mm')
    }
    function viewUser(id) {
      const routeData = router.resolve({
        name: 'user-detail',
        query: {
          _id: id
        }
      })
      window.open(routeData.href, '_blank')
    }
    function viewGood(id) {
      const routeData = router.resolve({
        name: 'good-detail',
        query: {
          _id: id
        }
      })
      window.open(routeData.href, '_blank')
    }
    return {
      form,
      queryTableData,
      activeName,
      ...reactive({
        genderOptions,
        campusOptions,
        statusOptions,
        userColumns: deepCopy(userColumns),
        replyColumns
      }),
      viewUser,
      viewGood,
      handleRemove,
      handleUpload,
      handlePictureCardPreview,
      handleClick,
      images,
      dialogVisible,
      dialogImageUrl,
      tableData,
      getDate,
      getAge,
      submit
    }
  }
}
</script>

<style lang="less" scoped>
.user-detail {
  width: 100%;
  height: 100%;
}
</style>
<style lang="less">
.demo-tabs {
  margin-top: 20px;
}
</style>
