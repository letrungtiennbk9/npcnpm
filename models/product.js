var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var productSchema = mongoose.Schema({
	name: {
		type: String,
		required: true
	},
	categoryId:{
		type:Schema.Types.ObjectId,
		required:true,
		ref: 'Category'
	},
	userId:{
		type:Schema.Types.ObjectId,
		required:true,
		ref: 'User'
	},
	brandId:{
		type:Schema.Types.ObjectId,
		ref:'Brand'		
	},
	images:[{
		type:String,
		required:true,
	}],
	price:{
		type:Number,
		required:true,
		default:0
	},
	detail:{
		type:String,
		required:true,
	},
	description:{
		type:String,
	},
	location:{
		type:Number,
		required:true,
	},
	views:{
		type:Number,
		required:true,
		default:0
	},
	sold:{
		type:Date,
		required:true,
		default:null,
	},
	status:{
		type: Number,
	},
	pending:{
		type:Number,
		required:true,
		default: 1
	},
	approvedOrRefusedBy:{
		adminId:{
			type: Schema.Types.ObjectId,
			ref: 'Admin',
			default:null
		},
		at:{
			type: Date,
			default:null
		}
	},
	deleted_at:{
		type:Date,
		required:true,
		default:null
	},
	created_at: { 
		type: Date,
		default: Date.now
	},
	updated_at:{
		type: Date,
		default: Date.now	
	}
},{collection:'products'});

var Product = mongoose.model('Product', productSchema);

module.exports = Product;