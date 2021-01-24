const mongoose = require('mongoose')
const uniqueValidator = require('mongoose-unique-validator')
const mongoosePaginate = require("mongoose-paginate-v2");
require('mongoose-type-email');
require('dotenv').config()
const url = process.env.MONGODB_URI

mongoose.connect(url, {
  useNewUrlParser: true,
  useUnifiedTopology: true
}).then(() => {
  console.log('connected to MongoDB')
}).catch(err => {
  console.log(err)
})

const phonebookSchema = new mongoose.Schema({
  name: { type: String, unique: true, required: true},
  number: { type: String, minlength: 10},
  email: {type: mongoose.SchemaTypes.Email, required: true}
})

phonebookSchema.plugin(mongoosePaginate)

phonebookSchema.plugin(uniqueValidator)

phonebookSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString()
    delete returnedObject._id
    delete returnedObject.__v
  }
})

module.exports = mongoose.model('Phonebook', phonebookSchema)
