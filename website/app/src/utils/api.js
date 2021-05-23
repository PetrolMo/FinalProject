import request from './network'

export function login(data){
  return request({
    url:'/login',
    method:'post',
    data
  })
}
export function register(data){
  return request({
    url:'/register',
    method:'post',
    data
  })
}
export function users(){
  return request({
    url:'/users',
    method:'get'
  })
}
export function good(data){
  return request({
    url:'/good',
    method:'post',
    data
  })
}
export function postGood(data){
  return request({
    url:'/good/postGood',
    method:'post',
    data
  })
}

export function getOss(){
  return request({
    url:'/getOss',
    method:'get',
  })
}

export function uploadImg(data){
  return request({
    url:'/upload',
    method:'post',
    data
  })
}
export function uploadTest(data){
  return request({
    url:'/uploadTest',
    method:'post',
    data
  })
}
export function uploadImg2(data){
  return request({
    baseURL:'http://192.168.31.45:5000',
    url:'/imgUpload',
    data: data,
    //async: false,
    cache: false,
    contentType: false,
    enctype: 'multipart/form-data',
    processData: false,
  })
}
