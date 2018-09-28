const productModel = require('../model/product');
var multer = require('multer');
var DIR = '/web-content/image/';
var upload = multer({dest: DIR}).single('photo');



//for multiple product
exports.getProducts = (req,res)=>{
productModel.find({},function(err,data){
    if(err) {throw err}
    res.send(data) 
})
}

// for single product
exports.getProduct = (req,res)=>{
    productModel.find({id:req.params.id},function(err,data){
        if(err) {throw err}
        console.log("single product requested with params "+req.params.id)
        res.send(data) 
    })
    }
// for adding new product
exports.setProducts = function(req,res){
    let pObject = productModel({
        _id:req.body.id,
        name:req.body.name,
        price:req.body.price,
        description:req.body.description,
        category:req.body.category,
        image:'image/'+req.body.name+'.jpeg'


        });
    var path = '';
    upload(req, res, function (err) {
       if (err) {
         // An error occurred when uploading
         console.log(err);
         return res.status(422).send("an Error occured")
       }  
      // No error occured.
       path = req.file.Path;
       //return res.send(); 
       console.log("file is saved to "+path)
        }); 

    pObject.save(function(err,data){
        if(err){
            console.log(" error not insert : "+err)
        }
        res.send("Upload Completed for  product added with id:  into the database");
    });

}


