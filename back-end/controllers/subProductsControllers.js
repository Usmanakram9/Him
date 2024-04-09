import SubProd from "../models/subProductsModel.js";

const addSubProducts = async (req, res) => {
  const { product, subimage, subprodname,subproPrice, subproddesc } = req.body;

  try {
    // Check if the subproduct already exists for the selected main product
    const subprodExist = await SubProd.findOne({ product, subprodname });

    if (subprodExist) {
      return res.status(400).json({ message: 'This subproduct is already registered for the selected main product' });
    }

    // Create the subproduct
    const addsub = await SubProd.create({
      product,
      subimage,
      subprodname,
      subproPrice,
      subproddesc,
    });

    return res.status(201).json({
      _id: addsub._id,
      product: addsub.product,
      subimage: addsub.subimage,
      subprodname: addsub.subprodname,
      subproPrice: addsub.subproPrice,
      subproddesc: addsub.subproddesc,
    });
  } catch (error) {
    return res.status(500).json({ message: 'Internal server error', error });
  }
};

const getsubproducts = async (req, res) => {
  try {
    const getallsubproducts = await SubProd.find({})
      .populate('product', 'nameofproduct'); // Assuming 'nameofproduct' is the field you want to populate

    res.status(200).json(getallsubproducts);
  } catch (error) {
    res.status(500).json({ message: 'Internal server error', error });
  }
};

 
const getsubProductById = async (req, res) =>{

    const subproductbyId = await SubProd.findById(req.params.id);
    if(subproductbyId){
      res.status(200).json(subproductbyId);
    }
    else{
      res.status(400).json('Sub Product not found');
    }
      
  }


const deletesubProduct = async (req, res) =>{

    const delsubprod = await SubProd.findById(req.params.id);
    if(delsubprod){
    
     await SubProd.deleteOne({_id: delsubprod._id});
     res.status(200).json({message: 'Sub Product deleted successfully'});
    }
    else{
     res.status(400).json('Sub Product not found');
    }
     
 };


 const udpatesubProduct = async (req, res) =>{

    const updatesubProd = await SubProd.findById(req.params.id);
    if(updatesubProd){
        updatesubProd.product = req.body.product || updatesubProd.product;
        updatesubProd.subimage = req.body.subimage || updatesubProd.subimage;
        updatesubProd.subprodname = req.body.subprodname || updatesubProd.subprodname;
        updatesubProd.subproPrice = req.body.subproPrice || updatesubProd.subproPrice;
        updatesubProd.subproddesc = req.body.subproddesc || updatesubProd.subproddesc;
      

  
      const updatesubpro = await updatesubProd.save();
      res.status(200).json({
          _id: updatesubpro._id,
          product: updatesubpro.product,
          subimage: updatesubpro.subimage,
          subprodname: updatesubpro.subprodname,
          subproPrice: updatesubpro.subproPrice,
          subproddesc: updatesubpro.subproddesc
          
      })
    }
    else{
      res.status(400).json('Sub Product not found');
    }
      
  }

export {addSubProducts,getsubproducts,deletesubProduct,getsubProductById,udpatesubProduct}