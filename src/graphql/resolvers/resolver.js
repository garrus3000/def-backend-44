const { productsDao } = require("../../daos");
const MongoDaoProducts = require("../../daos/mongodb/MongoDaoProducts");
// const { getAllProducts } = require("../../services/products-services");

const productos = new MongoDaoProducts();
/*

esto no, llamar a new CLASS

const getAllProducts = async () => {
    const prods = await productos.getAll()
    return prods;
};
*/
const getAllProducts = async () => {
    const prods = await productsDao.getAll()
    return prods;
};

const getProductById = async ({id: _id}) => {
    const prods = await productsDao.getById(_id);
    return prods;
};

const addProduct = async ({input}) => {
    const newProd = await productsDao.save(input)
    return newProd;
};

const deleteProductById = async ({id: _id}) => {
    const deletedProd = await productsDao.deleteById(_id)
    return deletedProd;
};

const updateProductById = async (_id, {input}) => {
    console.log(_id)
    const UdapteProd = await productsDao.updateById({ id: _id }, input )
    return UdapteProd;
};

module.exports = {
    getAllProducts,
    getProductById,
    addProduct,
    deleteProductById,
    updateProductById
};