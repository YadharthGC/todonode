const express = require("express");
const app = express();
const cors = require('cors');
const mongodb = require("mongodb");
const mongoclient = mongodb.MongoClient;
const url = "mongodb://localhost:27017/todo"
app.use(cors({
    origin: "*"
}))

app.use(express.json())

app.get("/todo", async function(req, res) {
    try {
        //connceting db
        let client = await mongoclient.connect(url)
            //select db
        let db = client.db("todo")
            //select collection and perform action
        let data = await db.collection("tasks").find({}).toArray();
        //close connection
        await client.close();
        res.json(data)
    } catch (error) {
        res.status(500).json({
            message: "didn't get it"
        })
    }

})

app.post("/create", async function(req, res) {
    try {
        //connceting db
        let client = await mongoclient.connect(url)
            //select db
        let db = client.db("todo")
            //select collection and perform action
        let data = await db.collection("tasks").insertOne(req.body)
            //close connection
        await client.close();
        res.json({
            message: "created"
        })
    } catch (error) {
        res.status(500).json({
            message: "not created"
        })
    }

})

app.put("/update/:id", async function(req, res) {
    try {
        //connceting db
        let client = await mongoclient.connect(url);
        //select db
        let db = client.db("todo");
        //select collection and perform action
        let data = await db.collection("tasks").findOneAndUpdate({
            _id: mongodb.ObjectId(req.params.id)
        }, {
            $set: req.body
        });
        //close connection
        await client.close();
        res.json({
            message: "updated"
        })
    } catch (error) {
        res.status(500).json({
            message: "not updated"
        })
    }
})

app.delete("/delete/:id", async function(req, res) {
    try {
        //connceting db
        let client = await mongoclient.connect(url)
            //select db
        let db = client.db("todo")
            //select collection and perform action
        let data = await db.collection("tasks").findOneAndDelete({
                _id: mongodb.ObjectId(req.params.id)
            })
            //close connection
        await client.close()
        res.json({
            message: "deleted"
        })
    } catch (error) {
        res.status(500).json({
            message: "not deleted"
        })
    }

})





app.listen(process.env.PORT || 3000, function() {
    console.log("app running")
})



















// {
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