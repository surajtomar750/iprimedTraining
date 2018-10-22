const express = require('express')
const aController = require('./controller/adminController')
const pController = require('./controller/productController')
const uController = require('./controller/userController')
const cartController = require('./controller/cartController')
const lController = require('./controller/logisticController')
const authcheck= require('./auth/auth-check')

var multer = require('multer');
var storage = multer.diskStorage({
    // destination
    destination: function (req, file, cb) {
      cb(null, './web-content/image')
    },
    filename: function (req, file, cb) {
      cb(null, ''+Date.now()+file.originalname);
    }
  });
var upload = multer({storage: storage})


const mRouter = express.Router();
const path = require('path');



// middleware function to check for logged-in users



// route for user Login




mRouter.get('/',(req,res)=>{
  res.sendFile(__dirname+'/web-content/home.html')
})

mRouter.post('/placeOrder',(req,res)=>{
  console.log("user ordering a product")
  uController.placeOrder(req,res);

})

mRouter.post('/placeOrders',(req,res)=>{
  console.log("user ordering a product")
  uController.placeMultiOrder(req,res);

})

mRouter.get('/admin',(req,res)=>{
    res.sendFile(__dirname+"/web-content/admin.html");
})





mRouter.post('/adminaddproduct', upload.array('image',10),function (req, res) {
    console.log("admin requested to add product : weldone admin")
    pController.setProducts(req,res);

})




mRouter.post('/signupdata',(req,res)=>{
        uController.signup(req,res);

})




// mRouter.get('/cart/:userId',(req,res)=>{
//     res.send("this is product");
//   });
mRouter.get('/cart',(req,res)=>{
    res.sendFile(__dirname+'/web-content/cart.html')
  })




mRouter.get('/products',(req,res)=>{
    console.log("products requested")
    pController.getProducts(req,res);
    });

mRouter.get('/product/:id',(req,res)=>{

    pController.getProduct(req,res);

    });

    mRouter.post('/loginData',(req,res)=>{
        uController.authenticate(req,res);

    });

    mRouter.get('/Status',(req,res)=>{

        res.status(404).send("this is a custom status code");

    });



   mRouter.get('/admin-control-panel',(req,res)=>{
       res.sendFile(__dirname+'/web-content/admin-control-panel.html');
   })

   mRouter.post('/admin-control-panel',(req,res)=>{
       res.sendFile(__dirname+'/web-content/admin-control-panel.html');
   })


   mRouter.get('/view-modify-product',(req,res)=>{
    res.sendFile(__dirname+'/web-content/view-modify-product.html');
   })


   mRouter.get('/removeproduct/:_id',(req,res)=>{
    console.log('delete product requested')
        pController.removeProduct(req,res);
   })

   mRouter.post('/updateproduct',(req,res)=>{
       console.log('update product requested')
       pController.updateProduct(req,res);
   })
   mRouter.get('/modify-product',(req,res)=>{
          res.sendFile(__dirname+'/web-content/modify-product.html')
        }

   )

   mRouter.get('/admin-login',(req,res)=>{
    res.sendFile(__dirname+'/web-content/admin-login.html');
   })

    mRouter.post('/admin-login-check',(req,res)=>{
        console.log("admin-login-check")
        aController.authenticate(req,res);


   })
   mRouter.get('/admin-signup',(req,res)=>{
     res.sendFile(__dirname+'/web-content/admin-signup.html')
   })
   mRouter.post('/admin-signup-data',(req,res)=>{
     aController.signup(req,res);
   })

   mRouter.get('/cart/:emailid',(req,res)=>{
     cartController.getCart(req,res)

   })

   //logistic routes
   mRouter.get('/logistics-control-panel',(req,res)=>{
     res.sendFile(__dirname+'/web-content/logistics-control-panel.html')
   })

   mRouter.get('/getOrders',(req,res)=>{
     console.log('getOrders is requested')
      lController.getOrders(req,res);
   })


   mRouter.post('/update-status',(req,res)=>{
     console.log("update status")
     lController.updateOrder(req,res);
   })

   mRouter.post('/logisticsLogin',(req,res)=>{
     console.log('logisticsLogin requested')
     lController.authenticate(req,res);
   })



module.exports = mRouter;
