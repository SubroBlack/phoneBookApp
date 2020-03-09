const mongoose = require("mongoose");
mongoose.set("useFindAndModify", false);

const url = process.env.MONGODB_URI;

console.log("connecting to", url);

// Connecting to MongoDB database
mongoose
  .connect(url, { useNewUrlParser: true })
  .then(result => {
    console.log("Connected to MongoDB");
  })
  .catch(error => {
    console.log("Error connecting to MongoDB: ", error.message);
  });

const contactSchema = new mongoose.Schema({
  name: String,
  number: String
});

contactSchema.set("toJSON", {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString();
    delete returnedObject._id;
    delete returnedObject.__v;
  }
});

module.exports = mongoose.model("Contact", contactSchema);