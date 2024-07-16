var mongoose = require ('mongoose')
// const MongoClient = require('mongodb').MongoClient
require('dotenv').config()

const DB_Key = process.env.DB_Key

const localurl = "mongodb+srv://vaibhavpuri045:WRed405ghH1Cxp7C@complainease.blapmij.mongodb.net/?retryWrites=true&w=majority&appName=ComplainEase"

  mongoose.connect(localurl, {useNewUrlParser: true, useUnifiedTopology: true} ,(error)=>{

	if (error) throw error;
	console.log('connected to complaintSystem')
	})

	mongoose.set('useFindAndModify', false)


 
	




 