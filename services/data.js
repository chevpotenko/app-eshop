function queryCollection(err, docs) {
    if (err) {
        console.log('Documents:' + err);
    } else {
        res.json(docs);
    }
}

module.exports = {
    queryCollection
}

