const jwt = require('jsonwebtoken');
const fs = require('fs');

module.exports = (req, res, next) => {
    try {
        const token = req.headers.authorization.split(' ')[1]; //return array with bearer for catch seconde element
        const decodedToken = jwt.verify(token, 'RANDOM_TOKEN_SECRET'); // decode token for verify if it's true
        const userId = decodedToken.userId;
        if (req.body.userId && req.body.userId !== userId) {    //  compare UserID  if it's ok
            throw 'user ID non valable ! ';
        } else {
            next ();
        }
    } catch (error){
        res.status(401).json({ error: error | 'requête non authentifiée !'});
    }
}

function createFolder () {

    if (!fs.existsSync('./images')) {
        fs.mkdir('./images', (err) => {
        if (err) {
        console.log(err)
        }
        console.log('folder created')
        })
        } else {
        console.log('The folder already exist')
        }
    }

createFolder()