const express = require("express");
const app = express();
const cors = require('cors');
const mongodb = require("mongodb");
const mongoclient = mongodb.MongoClient;
const url = "mongodb+srv://yadharth:thanumalya@cluster0.tbqrb.mongodb.net?retryWrites=true&w=majority"
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
