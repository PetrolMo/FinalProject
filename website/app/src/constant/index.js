
export const genderOptions = [
  {
    value: -1,
    label: '全部'
  },
  {
    value: 0,
    label: '男'
  },
  {
    value: 1,
    label: '女'
  }
]
export const campusOptions = [
  {
    value: -1,
    label: '全部'
  },
  {
    value: 0,
    label: '四平路校区'
  },
  {
    value: 1,
    label: '嘉定校区'
  },
  {
    value: 2,
    label: '彰武校区'
  },
  {
    value: 3,
    label: '沪西校区'
  }
]
export const priceOptions = [
  {
    value: 0,
    label: '0-200'
  },
  {
    value: 1,
    label: '200-500'
  },
  {
    value: 2,
    label: '500-1000'
  },
  {
    value: 3,
    label: '1000-2000'
  },
  {
    value: 4,
    label: '2000以上'
  }
]
export const statusOptions = [
  {
    value: 0,
    label: '禁用'
  },
  {
    value: 1,
    label: '启用'
  }
]
export const certificationStatusOptions =[
  {
    value: -1,
    label: '已拒绝'
  },
  {
    value: 0,
    label: '待审核'
  },
  {
    value: 1,
    label: '已通过'
  }
]
export const userQuery = {
  username: '',
  gender: '',
  campus: '',
  page: 1,
  size: 10,
  total: 0,
  status: ''
}
export const goodQuery = {
  username: '',
  title: '',
  date_range: '',
  price_range: '',
  campus: '',
  page: 1,
  size: 10,
  total: 0,
  status: ''
}
export const certQuery = {
  username: '',
  campus_id: '',
  date_range: '',
  price_range: '',
  page: 1,
  size: 10,
  total: '',
  status: ''
}
export const userColumns = [
  {
    title:"用户头像",
    key:"avatar",
    align:"center",
    width: 100,
  },
  {
    title:"用户名",
    key:"username",
    align:"center",
    width: 150,
  },
  {
    title:"用户状态",
    key:"status",
    align:"center",
    width: 100,
  },
  {
    title: "年龄",
    key: "age",
    align: "center",
    width: 100,
  },
  {
    title: "性别",
    key: "gender",
    align: "center",
    width: 100,
  },
  {
    title: "校区",
    key: "campus",
    align: "center",
    width: 150,
  },
  {
    title: "电话",
    key: "phone",
    align: "center",
    width: 150,
  },
  {
    title: "个人简介",
    key: "desc",
    align: "center",
    width: 150,
  },
  {
    title: "操作",
    key: "operation",
    width: 240,
    align: "left"
  },
]
export const goodColumns = [
  {
    title: '发布者',
    key: 'username',
    width: 140,
    align: 'center'
  },
  {
    title: '发布时间',
    key: 'createdAt',
    width: 150,
    align: 'center'
  },
  {
    title: '标题',
    key: 'title',
    width: 100,
    align: 'center'
  },
  {
    title: '商品描述',
    key: 'desc',
    width: 150,
    align: 'center'
  },
  {
    title: '商品状态',
    key: 'status',
    width: 100,
    align: 'center'
  },
  {
    title: '价格',
    key: 'price',
    width: 120,
    align: 'center'
  },
  {
    title: '原价',
    key: 'origin_price',
    width: 120,
    align: 'center'
  },
  {
    title: '校区',
    key: 'campus',
    width: 100,
    align: 'center'
  },
  {
    title: '操作',
    key: 'operation',
    width: 250,
    align: 'center'
  }
]
export const certColumns = [
  {
    title: '发起者',
    key: 'username',
    width: 140,
    align: 'center'
  },
  {
    title: '发起时间',
    key: 'createdAt',
    width: 150,
    align: 'center'
  },
  {
    title: '姓名',
    key: 'name',
    width: 100,
    align: 'center'
  },
  {
    title: '学号',
    key: 'campus_id',
    width: 150,
    align: 'center'
  },
  {
    title: '认证状态',
    key: 'status',
    width: 150,
    align: 'center'
  },
  {
    title: '认证描述',
    key: 'desc',
    width: 150,
    align: 'center'
  },
  {
    title: '操作',
    key: 'operation',
    width: 250,
    align: 'center'
  }
]
