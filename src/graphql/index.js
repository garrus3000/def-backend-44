const fs = require('fs');
const path = require('path');

const { Router } = require('express')

const { buildSchema } = require('graphql')
const { graphqlHTTP } = require('express-graphql')


const {
    getAllProducts,
    getProductById,
    addProduct,
    deleteProductById,
    updateProductById,
} = require("./resolvers/resolver");

const schemaContenido = fs.readFileSync(path.join(__dirname,'./schemas/productos.gql')).toString();

const schema = buildSchema(schemaContenido)

const graphMiddleware = graphqlHTTP({
    schema: schema,
    rootValue: {
        getAllProducts: getAllProducts,
        getProductById: getProductById,
        addProduct: addProduct,
        deleteProductById: deleteProductById,
        updateProductById: updateProductById
    },
    graphiql: true
})

const routerGraphql = Router();

routerGraphql.use('/ql', graphMiddleware)

module.exports = routerGraphql;