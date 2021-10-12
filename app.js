const express = require('express');
const app = express();
const mongoose = require('mongoose');
const sauces = require('./models/sauces');

const sauces = require('./models/sauces')

mongoose.connect('mongodb+srv://Ervan_ST:Poupine.123@cluster0.qajja.mongodb.net/myFirstDatabase?retryWrites=true&w=majority',
  { useNewUrlParser: true,
    useUnifiedTopology: true })
  .then(() => console.log('Connexion à MongoDB réussie !'))
  .catch(() => console.log('Connexion à MongoDB échouée !'));
  

app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
    next();
});

app.use(express.urlencoded({extended: true}));
app.use(express.json());


app.post('/api/auth/signup',(req, res, next) => {
    console.log(req.body);
    res.status(201).json({
        message : 'Vous êtes bien enregistré'
    });
    next();
});

app.use('/api/auth/login',(req,res, next) => {
    res.status(201);
     res.json({message: 'Vous êtes maintenant connecté !'})
    next();
});

app.post('/api/sauces', (req, res, next) => {
    const sauces = new Sauces ({ //copy fields inside req
        ...req.body
    })
    sauces.save()
    .then(() => res.status(201).json({ message : 'Sauce bien enregistée !'}))
    .catch(error => res.status(400).json({ error}));
    next();
})

app.use('/api/sauces', (req, res, next) => {
    const stuff = [
      {
        _id: 'oeihfzeoi',
        title: 'Mon premier objet',
        description: 'Les infos de mon premier objet',
        imageUrl: 'https://cdn.pixabay.com/photo/2019/06/11/18/56/camera-4267692_1280.jpg',
        price: 4900,
        userId: 'qsomihvqios',
        heat: 8,
      },
      {
          
        _id: 'oeihfzeomoihi',
        title: 'Mon deuxième objet',
        description: 'Les infos de mon deuxième objet',
        imageUrl: 'https://cdn.pixabay.com/photo/2019/06/11/18/56/camera-4267692_1280.jpg',
        price: 2900,
        userId: 'qsomihvqios',
        heat: 5,
      },
    ];
    res.status(200).json(stuff);
    next();
});


app.use('/api/sauces/:id',(req, res, next) => {
    console.log('réponse finale');

    next();
});

module.exports = app;

