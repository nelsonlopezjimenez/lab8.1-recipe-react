# lab8.1-recipe-react
## 6.16.2025

```{
  "name": "lab8.1-recipe-react",
  "version": "0.1.0",
  "private": true,
  "dependencies": {
    "@testing-library/jest-dom": "^5.16.2",
    "@testing-library/react": "^12.1.3",
    "@testing-library/user-event": "^13.5.0",
    "react": "^17.0.2",
    "react-dom": "^17.0.2",
    "react-scripts": "5.0.0",
    "web-vitals": "^2.1.4"
  },
  "scripts": {
    "start": "react-scripts start",
    "build": "react-scripts build",
    "test": "react-scripts test",
    "eject": "react-scripts eject"
  },
  "eslintConfig": {
    "extends": [
      "react-app",
      "react-app/jest"
    ]
  },
  "browserslist": {
    "production": [
      ">0.2%",
      "not dead",
      "not op_mini all"
    ],
    "development": [
      "last 1 chrome version",
      "last 1 firefox version",
      "last 1 safari version"
    ]
  }
}
```
```
C:\Users\localepsilon\Documents\2025-APRIL-Q3-PM\lab8.1-recipe-react>tree /f
Folder PATH listing
Volume serial number is AA58-195E
C:.
│   .env
│   .gitignore
│   package-lock.json
│   package.json
│   README.md
│
├───public
│       avocado_toast.jpg
│       favicon.ico
│       index.html
│       logo192.png
│       logo512.png
│       manifest.json
│       milkshake.jpg
│       robots.txt
│       spaghetti.jpg
│
└───src
        App.css
        App.js
        index.css
        index.js
```
## Code

```js
// ============= /src/App.js
import React, { Component } from 'react';
import './App.css';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      recipes: [
        {
          id: 0,
          title: "Spaghetti",
          instructions: "Open jar of Spaghetti sauce.  Bring to simmer.  Boil water.  Cook pasta until done.  Combine pasta and sauce",
          ingredients: ["pasta", "8 cups water", "1 box spaghetti"],
          img: "spaghetti.jpg"
        },
        {
          id: 1,
          title: "Milkshake",
          instructions: "Combine ice cream and milk.  Blend until creamy",
          ingredients: ["2 Scoops Ice cream", "8 ounces milk"],
          img: "milkshake.jpg"
        },
        {
          id: 2,
          title: "Avocado Toast",
          instructions: "Toast bread.  Slice avocado and spread on bread.  Add salt, oil, and pepper to taste.",
          ingredients: ["2 slices of bread", "1 avocado", "1 tablespoon olive oil", "1 pinch of salt", "pepper"],
          img: "avocado_toast.jpg"
        }
      ],
      nextRecipeId: 3,
    }

    this.handleSave = this.handleSave.bind(this);
  }

  handleSave(recipe) {
    this.setState((prevState, props) => {
      const newRecipe = { ...recipe, id: this.state.nextRecipeId };
      return {
        nextRecipeId: prevState.nextRecipeId + 1,
        recipes: [...this.state.recipes, newRecipe],
      }
    });
  }
  render() {
    return (
      <div className="App">

        <h1 style={{display:"flex", justifyContent:"center"}}>My Recipes</h1>

        <Form onSave = {this.handleSave}/> {/*Modify it here EXERCISE 1 */}

        <hr />

        <List recipes = { this.state.recipes} />  { /*Modify it here EXERCISE 2 */}
      </div>
    );
  }
}
function List(props) {

  //try <Recipe key={recipe.id} {...recipe} /> //spread operator instead of 
  // passing one-by-one property
  //In return statement you wrap Recipe JSX component with div class 'recipe-list'
  const recipesJSX = props.recipes.map((recipe, index) => (
    <Recipe key={recipe.id} title={recipe.title} img={recipe.img}
      instructions={recipe.instructions} id={recipe.id}
      ingredients={recipe.ingredients} />
  ));
  return (
    <div className="recipe-list">
      {recipesJSX}
    </div>
  );
}
function Recipe(props) {
  const { title, img, instructions, id } = props; // destructuring the props 
  // wrapping each ingredient with li HTML elements and returning them
  // with an implicit return inside an arrow function.
  // note that the unique key is the index, which is not optimal
  const ingredientsJSX = props.ingredients.map((ing, index) => (
    <li key={index}>{ing}</li>
  ));
  return (
    <div className="recipe-card">
      <div className="recipe-card-img">
        <img src={img} alt={title} />
      </div>
      <div className="recipe-card-content">
        <h3 className="recipe-title">{title}</h3>
        <h4>Ingredients:</h4>
        <ul>
          {ingredientsJSX}
        </ul>
        <h4>Instructions:</h4>
        <p>{instructions}</p>
        <button type="button" onClick={() => alert(`Are you sure to DELETE recipe number ${id + 1}?`)}>DELETE</button>
      </div>
    </div>
  );

}

class Form extends Component {

  
  constructor(props) {
    super(props);
    this.state = {
      title: '',
      instructions: "",
      ingredients: [''],
      img: ''
    };
    
    //this.handleChange = this.handleChange.bind(this);
    this.handleNewIngredient = this.handleNewIngredient.bind(this);
    this.handleChangeIng = this.handleChangeIng.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }
  
  // handleChange(e) {
  //   console.log(e.target.value);
  //   this.setState({[e.target.name]: e.target.value});
  // }

     // Pay ATTENTION: arrow functions DO NOT HAVE their own "this" : no need to bind
  handleChangeTitle= (e) => {
    console.log(e.target.value);
    this.setState({title: e.target.value})
  }
  handleChangeIns = (e) => {
    console.log(e.target.value);
    this.setState({instructions: e.target.value})
  }
  handleChangeImg = (e) => {
    console.log(e.target.value);
    this.setState({img: e.target.value})
  }
  
  handleNewIngredient(e) {
    const {ingredients} = this.state;
    this.setState({ingredients: [...ingredients, '']});
  }
  
  handleChangeIng(e) {
    const index = Number(e.target.name.split('-')[1]);
    const ingredients = this.state.ingredients.map((ing, i) => (
      i === index ? e.target.value : ing
    ));
    this.setState({ingredients});
  }
  handleReset = (e) => {
    e.preventDefault();
    alert(`Are you sure you want to reset?`);
    this.setState({
      title: '',
      instructions: '',
      ingredients: [''],
      img: ''
    })
}

  handleSubmit(e) {
    e.preventDefault();
    this.props.onSave({...this.state});
    this.setState({
      title: '',
      instructions: '',
      ingredients: [''],
      img: ''
    })
  }
  
  render() {
    const {title, instructions, img, ingredients} = this.state;
    let inputs = ingredients.map((ing, i) => (
      <div
        className="recipe-form-line"
        key={`ingredient-${i}`}
      >
        <label>{i+1}.
          <input
            type="text"
            name={`ingredient-${i}`}
            value={ing}
            size={45}
            autoComplete="off"
            placeholder=" Ingredient"
            onChange={this.handleChangeIng} />
        </label>
      </div>
    ));
    
    return (
      <div className="recipe-form-container">
        <form className='recipe-form' onSubmit={this.handleSubmit}>
          <button
            type="button"
            className="close-button"
            onClick={this.handleReset}
          >
            X
          </button>
          <div className='recipe-form-line'>
            <label htmlFor='recipe-title-input'>Title</label>
            <input
              id='recipe-title-input'
              key='title'
              name='title'
              type='text'
              value={title}
              size={42}
              autoComplete="off"
              onChange={this.handleChangeTitle}/>
          </div>
          <label
            htmlFor='recipe-instructions-input'
            style={{marginTop: '5px'}}
          >
            Instructions
          </label>
          <textarea
            key='instructions'
            id='recipe-instructions-input'
            type='Instructions'
            name='instructions'
            rows='8'
            cols='50'
            autoComplete='off'
            value={instructions}
            onChange={this.handleChangeIns}/>
          {inputs}
          <button
            type="button"
            onClick={this.handleNewIngredient}
            className="buttons"
          >
            +
          </button>
          <div className='recipe-form-line'>
            <label htmlFor='recipe-img-input'>Image Url</label>
            <input
              id='recipe-img-input'
              type='text'
              placeholder=''
              name='img'
              value={img}
              size={36}
              autoComplete='off'
              onChange={this.handleChangeImg} />
          </div>
          <button
            type="submit"
            className="buttons"
            style={{alignSelf: 'flex-end', marginRight: 0}}
          >
            SAVE
          </button>
        </form>
      </div>
    )
  }
}
export default App;
``` ============ /src/App.css
.recipe-list {
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
}

@media (max-width: 580px) {
  .recipe-list {
    display: block;
  }
}

.recipe-card {
  width: 31%;
  min-width: 240px;
  margin: 1%;
  border: 1px solid rgba(160,160,160,0.2);
  background: white;
  border-radius: 0 0 2px 2px;
  box-shadow: 0 2px 2px 0 rgba(0,0,0,0.14), 0 1px 5px 0 rgba(0,0,0,0.12), 0 3px 1px -2px rgba(0,0,0,0.2);
}


.recipe-card-content {
  padding: 16px;
}


.recipe-card-image {
  overflow: hidden;
  height: 50%;
}

.recipe-card img {
  width: 100%;
  max-height: 250px;
}

.recipe-title {
  margin: 0;
}

.recipe-form {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: center;
  margin: 10px;
  padding: 15px;
  border-radius: 10px;
  border: 7px solid #2c3e50;
}

.recipe-form input[type=text] {
    padding: 5px 8px;
    box-sizing: border-box;
}

.recipe-form-line {
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: flex-start;
  margin-top: 5px;
}

.recipe-form-line input {
  margin-left: 15px;
}

.buttons {
  color: white;
  background-color: #2c3e50;
  border-radius: 6px;
  padding: 0 10px 1px 10px;
  margin: 8px 0;
  align-self: flex-end;
  font-size: 1.1em;
}

.close-button {
  background-color: transparent;
  background-repeat: no-repeat;
  border: none;
  cursor: pointer;
  overflow: hidden;
  font-size: 0.9em;
  color: #777;
  text-shadow: 0 1px 0 #fff;
  align-self: flex-end;
}

.recipe-form-container {
  display: flex;
  align-items: center;
  justify-content: center;
}
```
```js
// =============== /src/index.js
import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';


ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);

```


# Getting Started with Create React App

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

The page will reload when you make changes.\
You may also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `npm run eject`

**Note: this is a one-way operation. Once you `eject`, you can't go back!**

If you aren't satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you're on your own.

You don't have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn't feel obligated to use this feature. However we understand that this tool wouldn't be useful if you couldn't customize it when you are ready for it.

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).

### Code Splitting

This section has moved here: [https://facebook.github.io/create-react-app/docs/code-splitting](https://facebook.github.io/create-react-app/docs/code-splitting)

### Analyzing the Bundle Size

This section has moved here: [https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size](https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size)

### Making a Progressive Web App

This section has moved here: [https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app](https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app)

### Advanced Configuration

This section has moved here: [https://facebook.github.io/create-react-app/docs/advanced-configuration](https://facebook.github.io/create-react-app/docs/advanced-configuration)

### Deployment

This section has moved here: [https://facebook.github.io/create-react-app/docs/deployment](https://facebook.github.io/create-react-app/docs/deployment)

### `npm run build` fails to minify

This section has moved here: [https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify](https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify)
