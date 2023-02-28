const Config = {
    db: {
        name: 'ecommerce',
        collection: 'productos',
        cnxStr: 'mongodb://localhost:27017/',
        //projection: {_id:0, __v:0}
        projection: {__v:0}

    }
}

export default Config