const productModel = require('../model/product');



//for multiple product
exports.getProducts = (req,res)=>{
productModel.find({},function(err,data){
    if(err) {throw err}
    res.send(data)
})
}

// for single product
exports.getProduct = (req,res)=>{
    productModel.find({_id:req.params._id},function(err,data){
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
    console.log(req.files)
    var image = req.files;

   var mObject=[];
//list of image uploaded
    for(let i=0;i<image.length;i++){
            mObject.push({image:'image/'+image[i].filename})
    }

    for(let i=0;i<mObject.length;i++){
       console.log( mObject[i])
    }



    let pObject = productModel({
        name:req.body.name,
        price:req.body.price,
        description:req.body.description,
        category:req.body.category,
        image:mObject


        });
    var path = '';

    pObject.save(function(err,data){
        if(err){
            console.log(" error not insert : "+err)
        }
        //res.send("Upload Completed for  product added with id:  into the database");
        res.send('success');
         });


}


exports.updateProduct = (req,res)=>{
      
    productModel.findByIdAndUpdate(req.body._id,{$set:req.body},function(err,data){
        if(err) {
                    console.log("ERROR in productController inside update product: \n"+err)
                    res.send("")
                }

        res.send("success");
    })
    }



    exports.removeProduct = (req,res)=>{
        productModel.findByIdAndDelete(req.params._id,(err)=>{
            if(err){
                console.log("error in removeProduct function "+err)
                res.send()
            }else{
               res.send("true");
            }

            }
    )
    }
