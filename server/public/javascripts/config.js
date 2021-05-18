module.exports = {
    port: 3000, // express 服务启动端口
    /* 数据库相关配置 */
    db: {
        host: 'localhost', // 主机名
        port: 3306,        // MySQL 默认端口为 3306
        user: 'root',          // 使用 root 用户登入 MySQL
        password: '123456', // MySQL 密码，用你自己的
        database: 'testDB', // 使用数据库
        socketPath:'/tmp/mysql.sock'
    },
}