const mongoose = require('mongoose');
// const strCon = 'mongodb+srv://admin:admin@cluster0-sv2jx.mongodb.net/noderest?retryWrites=true&w=majority'
const strCon = 'mongodb://localhost:27017/noderest'



mongoose.connect(strCon, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
    useFindAndModify: false
});

mongoose.Promise = global.Promise;

module.exports = mongoose;