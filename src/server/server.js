var express = require('express');
var mysql = require('mysql');
var cors = require('cors');
var bodyparser = require('body-parser');
const { parseXML } = require('jquery');
app = express();
app.use(cors());
app.use(bodyparser.json());
app.use(bodyparser.urlencoded({ extended: false }));
var connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'root123',
  database: 'ecomarce',
  port: 3306,
  multipleStatements: true
})
//get vendar
app.get('/vendar', (req, res) => {
  connection.query(`select * from vendar  order by id desc`, (err, records, fields) => {
    if (err) throw err;
    else {
      res.send(records);
    };
  });
});
//get vendar By Id
app.get('/vendar/:id', (req, res) => {
  connection.query(`select * from vendar where id = ${req.params.id}`, (err, records, fields) => {
    if (err) throw err;
    else {
      res.send(records);
    };
  });
});
//get vendar list method
app.get('/vendarlist', (req, res) => {
  connection.query(`select id,name from vendar  order by id desc`, (err, records, fields) => {
    if (err) throw err;
    else {
      res.send(records);
    };
  });
});
//insert vendar
app.post('/vendar', (req, res) => {
  connection.query(`insert into vendar(name,description)values('${req.body.vendar.name}',
    '${req.body.vendar.description}')`, (err, result) => {
    if (err) {
      //console.log(err);
      res.send(err);
    }
    else {
      res.send({ insert: 'success' });
    }
  })
});

//update vendar method
app.put('/vendar/:id', (req, res) => {
  const id = req.params.id;
  connection.query(`update vendar set name= '${req.body.vendar.name}',
      description='${req.body.vendar.description}' where id= ${id}`,
    (err, result) => {
      if (err) throw err;
      else {
        res.send({ update: 'success' });
      };
    });
});
//delete vendar method
app.delete('/vendar/:id', (req, res) => {
  const id = req.params.id;
  connection.query(`delete from vendar where id= ${id}`, (err, result) => {
    if (err) throw err;
    else {
      res.send({ delete: 'success' });
    };
  });
});
//update vendar method
app.put('/vendar/:id', (req, res) => {
  const id = req.params.id;
  connection.query(`update vendar set name= '${req.body.vendar.name}',
      description='${req.body.vendar.description}' where id= ${id}`,
    (err, result) => {
      if (err) throw err;
      else {
        res.send({ update: 'success' });
      };
    });
});
//get category method
app.get('/category', (req, res) => {
  connection.query(`select * from category  order by id desc`, (err, records, fields) => {
    if (err) throw err;
    else {
      res.send(records);
    };
  });
});
//get category By Id
app.get('/category/:id', (req, res) => {
  connection.query(`select * from category where id = ${req.params.id}`, (err, records, fields) => {
    if (err) throw err;
    else {
      res.send(records);
    };
  });
});
//get category list method
app.get('/categorylist', (req, res) => {
  connection.query(`select id,name from category  order by id desc`, (err, records, fields) => {
    if (err) throw err;
    else {
      res.send(records);
    };
  });
});
//insert category method
app.post('/category', (req, res) => {
  connection.query(`insert into category(name,description)values('${req.body.category.name}',
      '${req.body.category.description}')`, (err, result) => {
    if (err) {
      //console.log(err);
      res.send(err);
    }
    else {
      res.send({ insert: 'success' });
    }
  })
});
//update category method
app.put('/category/:id', (req, res) => {
  const id = req.params.id;
  connection.query(`update category set name= '${req.body.category.name}',
      description='${req.body.category.description}' where id= ${id}`,
    (err, result) => {
      if (err) throw err;
      else {
        res.send({ update: 'success' });
      };
    });
});
//delete Category method
app.delete('/category/:id', (req, res) => {
  const id = req.params.id;
  connection.query(`delete from category where id= ${id}`, (err, result) => {
    if (err) throw err;
    else {
      res.send({ delete: 'success' });
    };
  });
});

//get product method
app.get('/product', (req, res) => {
  let QueryIds = JSON.parse(req.query.Qparms);
  let itemId = QueryIds.id;
  let vendarId = QueryIds.vendarId;
  let categoryId = QueryIds.categoryId;
  if (itemId == 0 && vendarId == 0 && categoryId == 0) {
    query = `select * from product where isDelete = ${1} order by id desc`;
  } else {
    query = `select *  from product where (${itemId}=${0} or id=${itemId}) and (${vendarId}=${0} or vendarId=${vendarId})and(${categoryId}=${0} or categoryId=${categoryId}) and isDelete=${1}`;
    // console.log(query);
  }
  //console.log(query)
  connection.query(query, (err, records, fields) => {
    if (err) throw err;
    else {
      res.send(records);
    };
  });
});

//get products method
app.get('/products', (req, res) => {
  connection.query(`select * from product where isDelete = ${1} and isActive = ${1}`, (err, records, fields) => {
    if (err) throw err;
    else {
      res.send(records);
    };
  });
});
//get select products method
app.get('/selectProducts', (req, res) => {
  connection.query(`select id,name from product where isDelete = ${1}`, (err, records, fields) => {
    if (err) throw err;
    else {
      res.send(records);
    };
  });
});
//get products quantity ,price method
app.get('/productFields/:id', (req, res) => {
  connection.query(`select id,name,quantity,unitPrice,units from product where id=${req.params.id}`, (err, records, fields) => {
    if (err) throw err;
    else {
      res.send(records);
    };
  });
});
//insert product method
app.post('/product', (req, res) => {
  connection.query(`insert into product(name,description,categoryId,vendarId,quantity,units,unitPrice,
    dateOfPurchage)values('${req.body.product.name}',
    '${req.body.product.description}',${req.body.product.categoryId},${req.body.product.vendarId},
    ${req.body.product.quantity},'${req.body.product.units}',${req.body.product.unitPrice},'${req.body.product.dateOfPurchage}')`, (err, result) => {
    if (err) {
      //console.log(err);
      res.send(err);
    }
    else {
      res.send({ insert: 'success' });
    }
  })
});
//update product method
app.put('/product/:id', (req, res) => {
  const id = req.params.id;
  connection.query(`update product set name= '${req.body.product.name}',
    description='${req.body.product.description}',
    categoryId= ${req.body.product.categoryId},
    vendarId= ${req.body.product.vendarId},
    quantity= ${req.body.product.quantity},
    unitPrice= ${req.body.product.unitPrice},
    units= '${req.body.product.units}',
    dateOfPurchage='${req.body.product.dateOfPurchage}' where id= ${id}`,
    (err, result) => {
      if (err) throw err;
      else {

        res.send({ update: 'success' });
      };
    });
});
//update product status
app.put('/productstatusUpdate/:id', (req, res) => {
  console.log(req.body)
  const id = req.params.id;
  connection.query(`update product set isActive = '${req.body.flag}' where id= ${id}`, (err, result) => {
    if (err) throw err;
    else {
      res.send({ update: 'success' });
    };
  });
});

//delete Product method
app.delete('/product/:id', (req, res) => {
  const id = req.params.id;
  connection.query(`update product set isDelete = false where id= ${id}`, (err, result) => {
    if (err) throw err;
    else {
      res.send({ delete: 'success' });
    };
  });
});
//get createOrder method
app.get('/createOrder', (req, res) => {
  connection.query(`select * from createorder order by id desc`, (err, records, fields) => {
    if (err) throw err;
    else {
      res.send(records);
    };
  });
});
//inser createOrder method
function CreateOrder(sql, req) {
  connection.query(sql, (error, result) => {
    if (error) {
      console.error(error.message);
    } else {
      CreateOrderItems(result.insertId, req);
      UpdateProduct(req);
    }
  });
};
function CreateOrderItems(orderId, req) {
  req.body.ordItemarray.forEach(element => {
    connection.query(`insert into orderitems(itemId,orderId,name,quantity,price,total)values(${element.id},${orderId},'${element.name}','${element.customQuantity}',${element.unitPrice},${element.total}
  ) `, (err, result) => {
      if (err) {
        console.log('oops msql err', err)
      };
    })
  });
};
// update product quantity
function UpdateProduct(req) {
  req.body.ordItemarray.forEach(element => {
    connection.query(`update product set quantity=quantity-${element.customQuantity} where id=${element.id}`, (err, result) => {
      if (err) {
        //res.send(err);
        console.log('oops msql err', err)
      } else {
        // res.send({ insert: 'success' });
      }
    })
  })
}
app.post('/createOrder', (req, res) => {
  var query1 = `insert into createOrder(orderCode,name,contactNo,orderdate)values(concat('#ORD',round(rand()*100000)),'${req.body.product.name}','${req.body.product.contactNo}',
      '${req.body.product.orderdate}')`;
  CreateOrder(query1, req);
  res.send({ insert: 'success' })
})
//get orderItems By Id method
app.get('/orderItems/:id', (req, res) => {
  //console.log(req.params.id);
  connection.query(`select * from orderitems where orderId=${req.params.id} `, (err, records, fields) => {
    if (err) throw err;
    else {
      res.send(records);
    };
  });
});
//getCustomer Detail method
app.get('/customerDetail/:id', (req, res) => {
  //console.log(req.params.id);
  connection.query(`select * from createorder where id=${req.params.id} `, (err, records, fields) => {
    if (err) throw err;
    else {
      res.send(records);
    };
  });
});
//get customerList method
app.get('/customerList', (req, res) => {
  connection.query(`select name,contactNo from createorder order by id desc`, (err, records, fields) => {
    if (err) throw err;
    else {
      res.send(records);
    };
  });
});
//get Selected Customer Orders method(Reports)
app.get('/customerOrderList', (req, res) => {
  let QueryParam = JSON.parse(req.query.Qparams);
  //console.log(QueryParam);
  let contactNo = QueryParam.contactNo;
  let fromDate = QueryParam.fromDate;
  let toDate = QueryParam.toDate;
  if (contactNo == 0 && fromDate == 0 && toDate == 0) {
    query = `select id,orderCode,name,contactNo,orderdate from createorder order by id desc`;
  } else {
    query = `select id,orderCode,name,contactNo,orderdate from createorder where (${contactNo}=${0} or contactNo=${contactNo}) and orderdate between '${fromDate}' and '${toDate}'`;
    // console.log(query);
  }
  //console.log(query)
  connection.query(query, (err, records, fields) => {
    if (err) throw err;
    else {
      res.send(records);
    };
  });
});
//get Selected Vendor Orders method(Reports)
app.get('/vendorOrderList', (req, res) => {
  let QueryParam = JSON.parse(req.query.Qparams);
  //console.log(QueryParam);
  let vendarId = QueryParam.vendarId;
  let fromDate = QueryParam.fromDate;
  let toDate = QueryParam.toDate;
  if (vendarId == 0 && fromDate == 0 && toDate == 0) {
    query = `select id,orderCode,name,contactNo,orderdate from createorder order by id desc`;
  } else {
    query = `select createorder.id,product.name,createorder.orderCode,createorder.name,createorder.contactNo,createorder.orderdate from createorder join orderitems on 
    orderitems.orderId=createorder.id join product on product.id=orderitems.itemId
     where (${vendarId}=${0} or vendarId=${vendarId}) and orderdate between '${fromDate}' and '${toDate}'`;
    // console.log(query);
  };
  //console.log(query)
  connection.query(query, (err, records, fields) => {
    if (err) throw err;
    else {
      res.send(records);
    };
  });
});

//get Selected product Orders method(Reports)
app.get('/productrOrderList', (req, res) => {
  let QueryParam = JSON.parse(req.query.Qparams);
  //console.log(QueryParam);
  let productId = QueryParam.productId;
  let fromDate = QueryParam.fromDate;
  let toDate = QueryParam.toDate;
  if (productId == 0 && fromDate == 0 && toDate == 0) {
    query = `select id,orderCode,name,contactNo,orderdate from createorder order by id desc`;
  } else {
    query = `select createorder.id,product.name,createorder.orderCode,createorder.name,createorder.contactNo,createorder.orderdate from createorder join orderitems on 
    orderitems.orderId=createorder.id join product on product.id=orderitems.itemId
     where (${productId}=${0} or product.id=${productId}) and orderdate between '${fromDate}' and '${toDate}'`;
    // console.log(query);
  };
  //console.log(query)
  connection.query(query, (err, records, fields) => {
    if (err) throw err;
    else {
      res.send(records);
    };
  });
});
//get Sold Product Count (ChartsService)
app.get('/productBasedCount/:id', (req, res) => {
  connection.query(`select itemId,name,sum(quantity) AS productCount from orderitems  where itemId=${req.params.id} group by year(name);`, (err, records, fields) => {
    if (err) throw err;
    else {
      res.send(records);
    };
  });
});
//get Sold Vendor Count (ChartsService)
app.get('/customerBasedCount/:id', (req, res) => {
  connection.query(` select itemId,name,COUNT(orderId) AS customerCount from orderitems where itemId=${req.params.id} group by year(name);`, (err, records, fields) => {
    if (err) throw err;
    else {
      res.send(records);
    };
  });
});
app.listen(8000);
console.log('server listening port no 8000');
