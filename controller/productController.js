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
  console.log(req.params)
    productModel.find({_id:req.params.id},function(err,data){
        if(err) {throw err}
        console.log("single product requested with params "+req.params.id)
        res.send(data)
    })
    }


// for adding new product
exports.setProducts = function(req,res){

    var image = req.files;
console.log("inside of setProducts")
   var mObject=[];
//list of image uploaded
    for(let i=0;i<image.length;i++){
            mObject.push({image:'image/'+image[i].filename})
    }

    for(let i=0;i<mObject.length;i++){
       console.log( mObject[i])
    }



    let pObject =new productModel({
        name:req.body.name,
        price:req.body.price,
        description:req.body.description,
        category:req.body.category,
        image:mObject


        });
        console.log(pObject)
    var path = '';

    pObject.save(function(err,data){
        if(err){
            console.log(" error not insert : "+err)
            res.send("product exists")
        }else{
          res.send("success");
        }

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
