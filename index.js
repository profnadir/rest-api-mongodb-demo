const { MongoClient } = require('mongodb');
const express = require('express');

const app = express(); 
app.listen(82,()=> {
    console.log('listning');
});

const url = 'mongodb://127.0.0.1:27017';
const dbName = 'bdmonapi';

async function conncetToDatabase() {
    const client = await MongoClient.connect(url);
    const db = client.db(dbName);
    console.log('Connected');
    return db;
}

//conncetToDatabase();

app.get('/equipes',async (req,res)=>{
    try {
        // get database
        const db = await conncetToDatabase();
        // get collection equipe
        const equipe = db.collection('equipe');

        const docs = await equipe.find({}).toArray();

        res.status(200).json(docs);

    } catch (error) {
        console.error(error);
        res.status(500).json({message: 'Erreur de serveur'})
    }
})

app.get('/equipes/:id',async (req,res)=>{
    const id = parseInt(req.params.id);
    try {
        const db = await conncetToDatabase();

        const equipe = db.collection('equipe');

        const docs = await equipe.find({id}).toArray();

        res.status(200).json(docs);

    } catch (error) {
        console.error(error);
        res.status(500).json({message: 'Erreur de serveur'})
    }
})

const bodyParser = require('body-parser');
app.use(bodyParser.json());

app.post('/equipes',async (req,res)=>{
    try {

        const equipeData = req.body;

        console.log(req.body);

        const db = await conncetToDatabase();

        const equipe = db.collection('equipe');

        await equipe.insertOne(equipeData);

        res.status(201).json({message : 'ajoutée'});

    } catch (error) {
        console.error(error);
        res.status(500).json({message: 'Erreur de serveur'})
    }
})

app.put('/equipes/:id',async (req,res)=>{
    try {
        const id = parseInt(req.params.id);

        const equipeData = req.body;

        const db = await conncetToDatabase();

        const equipe = db.collection('equipe');

        await equipe.replaceOne({id},equipeData);

        res.status(201).json({message : 'modifiée'});
    } catch (error) {
        console.error(error);
        res.status(500).json({message: 'Erreur de serveur'})
    }
})

app.delete('/equipes/:id',async (req,res)=>{
    try {

        const id = parseInt(req.params.id);

        const db = await conncetToDatabase();

        const equipe = db.collection('equipe');

        await equipe.deleteOne({id});

        res.status(201).json({message : 'supprimée'});
        
    } catch (error) {
        console.error(error);
        res.status(500).json({message: 'Erreur de serveur'})
    }
})
