
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
export const statusOptions = [
  {
    value: -1,
    label: '全部'
  },
  {
    value: 0,
    label: '禁用'
  },
  {
    value: 1,
    label: '启用'
  }
]
export const userQuery = {
  username: '',
  gender: -1,
  campus: -1,
  page: 1,
  size: 10,
  total: 0,
  status: -1
}
export const userColumns = [
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
    align: "left"
  },
]
