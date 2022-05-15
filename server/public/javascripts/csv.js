function csvToObject(csvString){
  // console.log(csvArray)
  let csvArray = csvString.split("\r\n");
  let res = [];
  //获取所有专业
  csvArray.forEach((value,index) => {
    console.log(value)
    let row = value.split(',')
    res.push(row)
  })
  return res
}
function readCSVFile(file) {
  let reader = new FileReader();
  reader.onload = function () {
    return csvToObject(this.result);
    //console.log(data,tableData);//data为csv转换后的对象
  }
  reader.readAsText(file);
}
module.exports = {readCSVFile,csvToObject}
