const mongoose = require('mongoose')

const addPhoneNumber = (password, name, phoneNumber)=>{
    
    const contact = new Contact({
        name: name,
        number: phoneNumber
    })
    
    contact.save().then(result=> {
        console.log('Added ', result)
        mongoose.connection.close();
    })
}
const getAllPhoneNumbers = ()=>{
    console.log('fetched all phone numbers')
    Contact.find({}).then(contacts=>{
        contacts.forEach(c=> console.log(c))
        mongoose.connection.close();
    })
}

const phonebookSchema = new mongoose.Schema({
    name: String,
    number: String
})

const Contact = mongoose.model('Phonebook', phonebookSchema)

if(process.argv.length<3)
{
    console.log('Make sure to provide password')
    process.exit(1)
}

const password = process.argv[2];
const url = `mongodb+srv://captaincoder:${password}@fullstackcourse.ifidch4.mongodb.net/phonebook?retryWrites=true&w=majority`
mongoose.set('strictQuery', false)
mongoose.connect(url)


if(process.argv.length===3)
{
    getAllPhoneNumbers();
}
else if(process.argv.length===5)
{
    addPhoneNumber(process.argv[2], process.argv[3], process.argv[4])
}



