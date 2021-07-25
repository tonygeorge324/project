const mongoose = require('mongoose');
var Customer = mongoose.model('Customer',{
    name:{type: String},
    invoice:{type: String},
    reference:{type:String},
    amount:{type:String}
})
module.exports = {Customer};