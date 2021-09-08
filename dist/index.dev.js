"use strict";

var express = require("express");

var app = express();

var cors = require('cors');

var mongodb = require("mongodb");

var mongoclient = mongodb.MongoClient;
var url = "mongodb://localhost:27017/todo";
app.use(cors({
  origin: "*"
}));
app.use(express.json());
app.get("/todo", function _callee(req, res) {
  var client, db, data;
  return regeneratorRuntime.async(function _callee$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          _context.prev = 0;
          _context.next = 3;
          return regeneratorRuntime.awrap(mongoclient.connect(url));

        case 3:
          client = _context.sent;
          //select db
          db = client.db("todo"); //select collection and perform action

          _context.next = 7;
          return regeneratorRuntime.awrap(db.collection("tasks").find({}).toArray());

        case 7:
          data = _context.sent;
          _context.next = 10;
          return regeneratorRuntime.awrap(client.close());

        case 10:
          res.json(data);
          _context.next = 16;
          break;

        case 13:
          _context.prev = 13;
          _context.t0 = _context["catch"](0);
          res.status(500).json({
            message: "didn't get it"
          });

        case 16:
        case "end":
          return _context.stop();
      }
    }
  }, null, null, [[0, 13]]);
});
app.post("/create", function _callee2(req, res) {
  var client, db, data;
  return regeneratorRuntime.async(function _callee2$(_context2) {
    while (1) {
      switch (_context2.prev = _context2.next) {
        case 0:
          _context2.prev = 0;
          _context2.next = 3;
          return regeneratorRuntime.awrap(mongoclient.connect(url));

        case 3:
          client = _context2.sent;
          //select db
          db = client.db("todo"); //select collection and perform action

          _context2.next = 7;
          return regeneratorRuntime.awrap(db.collection("tasks").insertOne(req.body));

        case 7:
          data = _context2.sent;
          _context2.next = 10;
          return regeneratorRuntime.awrap(client.close());

        case 10:
          res.json({
            message: "created"
          });
          _context2.next = 16;
          break;

        case 13:
          _context2.prev = 13;
          _context2.t0 = _context2["catch"](0);
          res.status(500).json({
            message: "not created"
          });

        case 16:
        case "end":
          return _context2.stop();
      }
    }
  }, null, null, [[0, 13]]);
});
app.put("/update/:id", function _callee3(req, res) {
  var client, db, data;
  return regeneratorRuntime.async(function _callee3$(_context3) {
    while (1) {
      switch (_context3.prev = _context3.next) {
        case 0:
          _context3.prev = 0;
          _context3.next = 3;
          return regeneratorRuntime.awrap(mongoclient.connect(url));

        case 3:
          client = _context3.sent;
          //select db
          db = client.db("todo"); //select collection and perform action

          _context3.next = 7;
          return regeneratorRuntime.awrap(db.collection("tasks").findOneAndUpdate({
            _id: mongodb.ObjectId(req.params.id)
          }, {
            $set: req.body
          }));

        case 7:
          data = _context3.sent;
          _context3.next = 10;
          return regeneratorRuntime.awrap(client.close());

        case 10:
          res.json({
            message: "updated"
          });
          _context3.next = 16;
          break;

        case 13:
          _context3.prev = 13;
          _context3.t0 = _context3["catch"](0);
          res.status(500).json({
            message: "not updated"
          });

        case 16:
        case "end":
          return _context3.stop();
      }
    }
  }, null, null, [[0, 13]]);
});
app["delete"]("/delete/:id", function _callee4(req, res) {
  var client, db, data;
  return regeneratorRuntime.async(function _callee4$(_context4) {
    while (1) {
      switch (_context4.prev = _context4.next) {
        case 0:
          _context4.prev = 0;
          _context4.next = 3;
          return regeneratorRuntime.awrap(mongoclient.connect(url));

        case 3:
          client = _context4.sent;
          //select db
          db = client.db("todo"); //select collection and perform action

          _context4.next = 7;
          return regeneratorRuntime.awrap(db.collection("tasks").findOneAndDelete({
            _id: mongodb.ObjectId(req.params.id)
          }));

        case 7:
          data = _context4.sent;
          _context4.next = 10;
          return regeneratorRuntime.awrap(client.close());

        case 10:
          res.json({
            message: "deleted"
          });
          _context4.next = 16;
          break;

        case 13:
          _context4.prev = 13;
          _context4.t0 = _context4["catch"](0);
          res.status(500).json({
            message: "not deleted"
          });

        case 16:
        case "end":
          return _context4.stop();
      }
    }
  }, null, null, [[0, 13]]);
});
app.listen(process.env.PORT || 3000, function () {
  console.log("app running");
}); // {
// // const express = require("express");
// // const app = express();
// // const cors = require('cors');
// // const mongodb = require("mongodb");
// // const mongoclient = mongodb.MongoClient;
// // const url = "mongodb://localhost:27017"
// // app.use(cors({
// //     origin: "*"
// // }))
// // app.use(express.json())
// // app.get("/todo", async function(req, res) {
// //     try {
// //         //connceting db
// //         let client = await mongoclient.connect(url)
// //             //select db
// //         let db = client.db("todo_app")
// //             //select collection and perform action
// //         let data = await db.collection("tasks").find({}).toArray();
// //         //close connection
// //         await client.close();
// //         res.json(data)
// //     } catch (error) {
// //         res.status(500).json({
// //             message: "didn't get it"
// //         })
// //     }
// // })
// // app.post("/create", async function(req, res) {
// //     try {
// //         //connceting db
// //         let client = await mongoclient.connect(url)
// //             //select db
// //         let db = client.db("todo_app")
// //             //select collection and perform action
// //         let data = await db.collection("tasks").insertOne(req.body)
// //             //close connection
// //         await client.close();
// //         res.json({
// //             message: "created"
// //         })
// //     } catch (error) {
// //         res.status(500).json({
// //             message: "not created"
// //         })
// //     }
// // })
// // // app.put("/update/:id", async function(req, res) {
// // //     try {
// // //         //connceting db
// // //         let client = await mongoclient.connect(url);
// // //         //select db
// // //         let db = client.db("todo_app");
// // //         //select collection and perform action
// // //         let data = await db.collection("tasks").
// // //         findOneAndUpdate({
// // //             _id: mongodb.ObjectId(req.params.id)
// // //         }, {
// // //             $set: req.body
// // //         });
// // //         //close connection
// // //         await client.close();
// // //     } catch (error) {
// // //         res.status(500).json({
// // //             message: "not updated"
// // //         })
// // //     }
// // // })
// // // app.delete("/delete/:id", async function(req, res) {
// // //     try {
// // //         //connceting db
// // //         let client = await mongoclient.connect(url)
// // //             //select db
// // //         let db = client.db("todo_app")
// // //             //select collection and perform action
// // //         let data = await db.collection("tasks").findOneAndDelete({
// // //                 id: mongodb.ObjectId(req.params.id)
// // //             })
// // //             //close connection
// // //         await client.close()
// // //     } catch (error) {
// // //         res.status(500).json({
// // //             message: "not deleted"
// // //         })
// // //     }
// // // })
// // app.listen(3003, function() {
// //     console.log("app running")
// // })
// // // {
// // // app.get("/", function(req, res) {
// // //     res.send("welcome")
// // // })
// // // app.get("/users", function(req, res) {
// // //     res.send("users")
// // // })
// // // app.get("/products", function(req, res) {
// // //     res.json({
// // //         message: "products are safe"
// // //     })
// // // })
// // // app.get("/todo", function(req, res) {
// // //     res.json([{
// // //             id: 1,
// // //             message: "products are safe"
// // //         },
// // //         {
// // //             id: 2,
// // //             message: "u r gud"
// // //         }
// // //     ])
// // // })
// // // app.use(express.json())
// // // let tasks = [];
// // // app.get("/todo", function(req, res) {
// // //     res.json(tasks)
// // // })
// // // app.post("/create", function(req, res) {
// // //     req.body.id = tasks.length + 1;
// // //     req.body.status = false
// // //     tasks.push(req.body);
// // //     res.json({
// // //         message: "created"
// // //     })
// // // })
// // // app.put("/update/:id", function(req, res) {
// // //     let select = tasks.findIndex(obj => obj.id == req.params.id)
// // //     if (select != -1) {
// // //         tasks[select].status = req.body.status
// // //         res.json({
// // //             message: "success"
// // //         })
// // //     } else {
// // //         res.status(400).json({
// // //             message: "no task found"
// // //         })
// // //     }
// // // })
// // // app.delete("/delete/:id", function(req, res) {
// // //     let select = tasks.findIndex(obj => obj.id == req.params.id)
// // //     if (select != -1) {
// // //         tasks.splice(select, 1)
// // //         res.json({
// // //             message: "deleted"
// // //         })
// // //     } else {
// // //         res.status(400).json({
// // //             message: "no task found"
// // //         })
// // //     }
// // // })
// // // }
// }