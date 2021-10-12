app.post('/api/sauces', (req, res, next) => {
    const sauces = new Sauces ({ //copy fields inside req
        ...req.body
    })
    sauces.save()
    .then(() => res.status(201).json({ message : 'Sauce bien enregistée !'}))
    .catch(error => res.status(400).json({ error}));
    next();
})