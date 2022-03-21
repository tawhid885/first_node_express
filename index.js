const express = require("express");
const { MongoClient, ServerApiVersion } = require('mongodb');
const ObjectId = require("mongodb").ObjectId;
const cors = require("cors");
const app = express();
const port = process.env.PORT || 4000;

app.use(cors());
app.use(express.json());

// database 
// user : user1
// password : QhPt8A7E6dDpGC0O


// database code start

const uri = "mongodb+srv://user1:QhPt8A7E6dDpGC0O@cluster0.zppce.mongodb.net/myFirstDatabase?retryWrites=true&w=majority";

const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });

async function run() {
    try {
        await client.connect();
        const database = client.db("foodMaster");
        const usersCollectinos = database.collection("users");



        // GET API 
        app.get("/users", async (req, res) => {
            const cursor = usersCollectinos.find({});
            const users = await cursor.toArray();
            console.log("users ,", users);
            res.json(users);
        })

        // POST API 
        app.post("/users", async (req, res) => {
            const newUser = req.body;
            const result = await usersCollectinos.insertOne(newUser);
            console.log("database hitting");
            console.log("this is working well!", req.body);
            console.log("got new user, ", result);
            res.json(result);
        })

        // DELETE API 
        app.delete("/users/:id", async (req, res) => {
            const id = req.params.id;
            const query = { _id: ObjectId(id) };
            const result = await usersCollectinos.deleteOne(query);
            console.log("deleting user with id ,", result);
            res.json(result);
        })

        // GET API 
        app.get("/users/:id", async (req, res) => {
            const id = req.params.id;
            const query = { _id: ObjectId(id) }
            const user = await usersCollectinos.findOne(query);
            console.log("update id hitting the database ", user);
            res.json(user);
        })

        // UPDATE API 
        app.put("/users/:id", async (req, res) => {
            const id = req.params.id;
            const updateUser = req.body;

            const filter = { _id: ObjectId(id) };
            const updateDoc = {
                $set: {
                    name: updateUser.name,
                    email: updateUser.email,
                }
            }
            const result = await usersCollectinos.updateOne(filter, updateDoc);
            console.log(result);
            res.json(result);
        })
    } finally {
        // await client.close();
    }
}
run().catch(console.dir);
// database code end here 

app.get("/", (req, res) => {
    res.send("testign purpose");
})

app.listen(port, () => {
    console.log(`Server Running on Port ${port}`);
})