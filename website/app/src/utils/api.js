import request from './network'

export function login(data){
  return request({
    url:'/api/login',
    method:'post',
    data
  })
}
export function register(data){
  return request({
    url:'/api/register',
    method:'post',
    data
  })
}
export function users(){
  return request({
    url:'/api/users',
    method:'get'
  })
}
export function good(data){
  return request({
    url:'/api/good',
    method:'post',
    data
  })
}
export function postGood(data){
  return request({
    url:'/api/good/postGood',
    method:'post',
    data
  })
}

export function getOss(){
  return request({
    url:'/api/getOss',
    method:'get',
  })
}

export function uploadImg(data){
  return request({
    url:'/api/upload',
    method:'post',
    data
  })
}
export function uploadTest(data){
  return request({
    url:'/api/uploadTest',
    method:'post',
    data
  })
}
export function uploadImg2(data){
  return request({
    baseURL:'http://localhost:5000',
    url:'/imgUpload',
    data,
    method:'post',
    cache: false,
    contentType: false,
    processData: false,
    timeout:10000
  })
}
export function colorize(data){
  return request({
    //baseURL:'http://localhost:5000',
    url:'/api/upload',
    method:'post',
    data,
    enctype: 'multipart/form-data',
  })
}
export function uploadCSV(data){
  return request({
    url:'/api/test/test1',
    method:'post',
    data,
    enctype:'multipart/form-data'
  })
}
