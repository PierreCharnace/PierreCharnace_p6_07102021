const Sauce  = require('../models/sauces');
const fs = require('fs');

exports.createSauces = (req, res, next) => {
    const saucesObject = JSON.parse(req.body.sauce);
    delete saucesObject._id;
    const sauce = new Sauce ({ //copy fields inside req
        ...saucesObject,
        imageUrl: `${req.protocol}://${req.get('host')}/images/${req.file.filename}`
    })
    sauce.save()
        .then(() => res.status(201).json({ message : 'Sauce bien enregistée !'}))
        .catch(error => res.status(400).json({ error }));
};

exports.modifySauces = (req, res, next) => {
    const sauceObject = req.file ?
    { 
        ...JSON.parse(req.body.sauce),
        imageUrl: `${req.protocol}://${req.get('host')}/images/${req.file.filename}`
    } : {...req.body };
    Sauce.updateOne({ _id: req.params.id }, { ...sauceObject, _id: req.params.id})
        .then(sauce => res.status(200).json(sauce))
        .catch(error => res.status(403).json({ error }));
};

exports.deleteSauces = (req, res, next) => {
    Sauce.findOne({ _id: req.params.id })
    .then(sauce => {
        const filename = sauce.imageUrl.split('/images/')[1];//extract name to delete
        fs.unlink(`images/${filename}`, () => { // delete with fs.unlink
            Sauce.deleteOne({_id: req.params.id })
        .then(() => res.status(200).json({ message: 'Objet supprimé !'}))
        .catch(error => res.status(404).json({ error }));
        })
    })
    .catch(error => res.status(500).json({ message: 'Erreur serveur' }))
    
};

exports.getOneSauces = (req, res, next) => {
    Sauce.findOne({ _id: req.params.id })  //  find one object
        .then(sauce => res.status(200).json(sauce)) //If it's Ok send back one sauce
        .catch( error => res.status(404).json({ error })); // If isn't Ok send back an error
};

exports.getAllSauces = (req, res, next) => {
    Sauce.find() // find all objects
        .then(sauce => res.status(200).json(sauce)) //send back array of all sauces
        .catch( error => res.status(400).json({ error })); // send back an error
};

exports.likeOrDislikeSauce = (req, res, next) => {

    const likeStatus = req.body.like;
    const userId = req.body.userId;
    const thisSauceId = req.params.id;
    Sauce.findOne({ _id: req.params.id }).then(sauce => { //get back sauces ID
  
      if (likeStatus === 1) {   
        Sauce.updateOne(
          { _id: thisSauceId },
          {$push: { usersLiked: userId }, $inc: { likes: +1 },} // like this sauce
        )
        .then(() => res.status(200).json({ message: 'Vous aimez cette sauce. (^-^) ' }))
        .catch((error) => res.status(400).json({ error }))
  
  
      }
  
      if (likeStatus === -1) {
        Sauce.updateOne(
          { _id: thisSauceId },
          {$push: { usersDisliked: userId }, $inc: { dislikes: +1 },}
        )
        .then(() => res.status(200).json({ message: 'Vous n\'aimez pas cette sauce. :-( ' }))
        .catch((error) => res.status(400).json({ error }))
      }
  
      if (likeStatus === 0) {
        const ind = sauce.usersLiked.indexOf(userId);
        if (ind > -1) {
          sauce.usersLiked.slice(ind, 1);
          Sauce.updateOne(
            { _id: thisSauceId },
            {$push: { usersLiked: {$each: [ ], $slice: ind} }, $inc: { likes: -1 },}
  
          )
          .then(() => res.status(200).json({ message: ' ' }))
          .catch((error) => res.status(400).json({ error }))
        } else if (ind === -1) {
          const indDisliked = sauce.usersDisliked.indexOf(userId);
          sauce.usersDisliked.slice(indDisliked, 1);
          Sauce.updateOne(
            { _id: thisSauceId },
            {$push: { usersDisliked: {$each: [ ], $slice: indDisliked} }, $inc: { dislikes: -1 },}
  
          )
          .then(() => res.status(200).json({ message: ' ' }))
          .catch((error) => res.status(400).json({ error }))
        }
      }
  
    });
  
  }

  