const mongoose = require('mongoose');

// Import of the model Recipe from './models/Recipe.model.js'
const Recipe = require('./models/Recipe.model');
// Import of the data from './data.json'
const data = require('./data');

const MONGODB_URI = 'mongodb://localhost:27017/recipe-app';

// Connection to the database "recipe-app"
mongoose
  .connect(MONGODB_URI)
  .then(x => {
    console.log(`Connected to the database: "${x.connection.name}"`);
    // Before adding any recipes to the database, let's remove all existing ones
    return Recipe.deleteMany()
  })
  .then(() => {
    const sojaCochinita = new Recipe({
      title: 'Soja Cochinita',
      level: 'Easy Peasy',
      ingredients:['soja', 'onion','garlic', 'achiote', 'orange', 'white vinigar', 'olive oil', 'peper', 'salt'],
      cuisine: 'Mexican',
      dishType: ['main_course'],
      image:'https://img-global.cpcdn.com/recipes/96007f400c84167d/680x482cq70/tacos-veganos-de-cochinita-pibil-de-soja-texturizada-foto-principal.webp',
      duration: 30,
      creator: 'Emmanuel Solis',
      created: '06/07/2022'
    });
    //Destructuration to get the title and the level of the recipe
    // let { title, level, ingredients, cuisine, dishType, image, duration, creator, created } = sojaCochinita;
    sojaCochinita.save();

    console.log(`Recipe "${sojaCochinita.title}" has been added to the database`)
    // return Recipe.insertMany(data);

    // Run your code here, after you have insured that the connection was made
  })
  //adding all recipies to the database
  .then(()=> {
    Recipe
    .insertMany(data)
    .then(recipies =>  {
     return recipies.map(recipe => console.log("Recipe:", recipe.title ))
    })
    .catch(err => console.log(err));
  })
  //Update A Recipe
  .then(() => {
    Recipe
    .findOneAndUpdate({title:'Rigatoni alla Genovese'}, {duration:100})
    .then(recipe => console.log(`Recipe Rigatoni alla Genovese has been updated`))
    .catch(err => console.log(err));
  })
  //delete a recipe from the database
  .then(() => {
    Recipe
    .deleteOne({title:'Carrot Cake'})
    .then(() =>  console.log('Recipe Carrot Cake has been deleted'))
    .then(() => {
    mongoose.connection.close()
    console.log('Connection to the database closed');     
    })
    .catch(err => console.log(err))
  })
  //Close the connection to the database
  .catch(error => {
    console.error('Error connecting to the database', error);
  })
   