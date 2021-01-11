const { MongoClient } = require('mongodb')

const url = 'mongodb://localhost:27017'

const dbName = 'mongodbproject'

const client = new MongoClient(url, { useUnifiedTopology: true });

client.connect(function (err) {
    if (err) {
        console.log(err);
        return
    }
    console.log('数据库连接成功');
    const db = client.db(dbName);

    //1、查找数据
    db.collection('orders').find({}).toArray((err, data) => {
        //异步操作，操作数据库完毕以后一定要 关闭数据库连接
        if (err) return
        console.log(data)
        client.close()
    })

    //2、增加数据
    db.collection('orders').insertOne({ 'orderId': '000', 'name': 'order1' }, (err, result) => {
        if (err) return
        console.log('增加成功', result.insertedId)
        client.close()
    })

    //3、修改数据
    db.collection('orders').updateOne({ 'orderId': '000' }, { $set: { "name": 'order2' } }, (err, result) => {
        if (err) return
        console.log('修改成功', result)
        client.close()
    })

    //4、删除一条数据
    db.collection('orders').deleteOne({ 'orderId': '000' }, (err, result) => {
        if (err) return
        console.log('删除一条数据成功', result)
        client.close()
    })

    //5、删除多条数据
    db.collection('orders').deleteMany({ 'orderId': '000' }, (err, result) => {
        if (err) return
        console.log('删除多条数据成功', result)
        client.close()
    })

})