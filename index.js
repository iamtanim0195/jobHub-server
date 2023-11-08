const express = require('express');
const port = 5000;
const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');
var jwt = require('jsonwebtoken');
require('dotenv').config();
const app = express();

//parsers
app.use(express.json());


const secret = process.env.JWT_SECRET;

const uri = `mongodb+srv://${process.env.DB_USER
    }:${process.env.DB_PASS
    }@cluster0.ub6gcmp.mongodb.net/pro-11?retryWrites=true&w=majority`;

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
    serverApi: {
        version: ServerApiVersion.v1,
        strict: true,
        deprecationErrors: true,
    }
});

async function run() {
    try {
        // Connect the client to the server	(optional starting in v4.7)
        await client.connect();
        //! Connect to collection
        const db = client.db("pro-11");
        const jovCollection = db.collection("jobs");

        //!curd
        app.get('/api/jobs', async (req, res) => {
            const cursor = jovCollection.find();
            const result = await cursor.toArray();
            res.send(result);
        });

        app.post('/api/user/add-job', async (req, res) => {
            const addJob = req.body;
            const result = await addJobCollection.insertOne(addJob);
        });

        app.delete('api/user/delete-job/:add-job-id', async (req, res) => {
            const id = req.params.add - job - id
            const query = { _id: new ObjectId(id) }
            const result = await addJobCollection.deleteOne(query);
            res.send(result);
        })
        //! authenticated jwt
        app.post('/api/auth/jwt', async (req, res) => {
            //creating token and send to client
            const user = req.body
            const token = jwt.sign(user, secret);
            res.cookie('token', {
                httpOnly: true,
                security: true,
                sameSite: 'none',
            }).send({ success: true });
        });
        // Send a ping to confirm a successful connection
        await client.db("admin").command({ ping: 1 });
        console.log("Pinged your deployment. You successfully connected to MongoDB!");
    } finally {
        // Ensures that the client will close when you finish/error
        /* await client.close(); */
    }
}
run().catch(console.dir);




app.get('/', (req, res) => {
    res.send('Hello World!');
});


app.listen(port, () => {
    console.log(`Example app listening on port ${port}`);
});