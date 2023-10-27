const mongoose = require('mongoose')

const url = process.env.MONGODB_URL
mongoose.set('strictQuery', false)

console.log('Connecting to MongoDB url: ', url)

mongoose.connect(url).then(result=>{
    console.log('Connected to MongoDB')
}).catch(err=>{
    console.log('Failed to connect to MongoDB: ', err)
    process.exit(1)
})

const phonebookSchema = new mongoose.Schema({
    name: {
        type: String,
        minLength: 3,
        required: true
    },
    number: {
        type: String,
        validate: {
            validator: (num)=>{
                return /^\d{2,3}-\d{6,}$/.test(num)
            },
            message: `{VALUE} is not a valid number`
        }
    }
})

phonebookSchema.set('toJSON',{
    transform: (document, returnedObject)=>{
        returnedObject.id = returnedObject._id.toString()
        delete returnedObject._id
        delete returnedObject.__v
    }
})

module.exports = mongoose.model('phonebook', phonebookSchema)