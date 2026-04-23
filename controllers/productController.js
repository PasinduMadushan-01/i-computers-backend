import Product from "../models/product.js";
import authentication from "../middlewares/authentication.js";

export async  function createProduct(req,res){

   if (!req.user || !req.user.isAdmin) {
        return res.status(403).json({
            message: "Admin only"
        });
    }

    try{
         const existingProduct = await Product.findOne({
            productId : req.body.productId
         })
         if(existingProduct != null){
            res.status(400).json({
                message : "product with this productId alredy exists."
            })
            return
         }

         const newProduct = new Product ({
            productId: req.body.productId,
            name: req.body.name,  
            altNames: req.body.altNames,
            price: req.body.price,
            labelledPrice: req.body.labelledPrice,
            description: req.body.description,
            image: req.body.images,
            brand: req.body.brand,
            model: req.body.model,
            category: req.body.category,
            stock: req.body.stock

         })
         await newProduct.save()
          
         res.status(201).json({
            message : "product create successful"
         })

   }catch(error){
       res.status(500).json({
           message : "error creating product"
       })
   }
}

export async function getAllProduct(req, res) {
    try {

        let products;

       
        if (req.user && req.user.isAdmin) {
            products = await Product.find();
        } 
    
        else {
            products = await Product.find({ isAvailable: true });
        }

        res.json(products);

    } catch (error) {
        console.log(error); 
        res.status(500).json({
            message: "error fetching products",
            error: error.message
        });
    }
}
export async function deleteProduct(req, res) {
    if (!req.user || !req.user.isAdmin) {
        return res.status(403).json({
            message: "Admin only"
        });
    }
    try {
        await Product.deleteOne({
            productId: req.params.productId
        });
        res.json({
            message: "Delete successful"
        });
    } catch (error) {
        res.status(500).json({
            message: "Delete unsuccessful"
        });
    }
}
export async function updateProduct(req, res) {
    if (!req.user || !req.user.isAdmin) {
        return res.status(403).json({
            message: "Admin only"
        });
    }
    try {
      await Product.UpdateOne({
            productId: req.params.productId 
      },{
        name: req.body.name,
        altNames: req.body.altNames,
        price: req.body.price,
        labelledPrice: req.body.labelledPrice,
        description: req.body.description,
        image: req.body.images,
        brand: req.body.brand,
        model: req.body.model,
        category: req.body.category,
        stock: req.body.stock,
        isAvailable: req.body.isAvailable})
        
        res.json({
            message: "Update successful"
        });
      
    } catch (error) {
        res.status(500).json({
            message: "Update unsuccessful"
        });
    }
}

export async function getProductById(req, res) {
    if (!req.user || !req.user.isAdmin) {
        return res.status(403).json({
            message: "Admin only"
        });
    }

    try {
        const product = await Product.findOne({ productId: req.params.productId });
        if (!product) {
            return res.status(404).json({
                message: "Product not found"
            });
        }
        res.json(product);
    } catch (error) {
        res.status(500).json({
            message: "Error fetching product"
        });
    }
}