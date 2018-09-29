const productModel = require('../model/product');
var multer = require('multer');
var DIR = 'web-content/image';
var upload = multer({dest: DIR}).array('image'); // here image within quotes is name of property of input element of html



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
    console.log(req.body.id)
    console.log(req.body.name)
    console.log(req.body.category)
    console.log(req.body.description)
    //console.log(req.body.image)
    var image = req.body.image
    
   var mObject=[];
//list of image uploaded
    for(let i=0;i<image.length;i++){
            mObject.push({image:'image/'+image[i]})
    }

    for(let i=0;i<mObject.length;i++){
       console.log( mObject[i])
    }



    let pObject = productModel({
        id:req.body.id,
        name:req.body.name,
        price:req.body.price,
        description:req.body.description,
        category:req.body.category,
        image:mObject
         

        });
    var path = '';
    upload(req, res, function (err) {
       if (err) {
         // An error occurred when uploading
         console.log(err);
         return res.status(422).send("an Error occured")
       }  
      // No error occured.
       //path = req.files.path;
       //return res.send(); 
       console.log("file is saved to ")
        }); 

    pObject.save(function(err,data){
        if(err){
            console.log(" error not insert : "+err)
        }
        res.send("Upload Completed for  product added with id:  into the database");
    });

}


