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

  // EXERCISE 1 : Form component is where user enter recipe's data. Its initial state is empty 
  //              string for title, instructions, img and an empty array for ingredients
  //              it has onSubmit event, onClick event, and several onChange events with associated function calls
  //              onSubmit event triggers a onSave call (passed as prop from App component) and state  is updated.
  //              onClick event reset the form.
  //              onChange event set the state to the values entered by the user as new recipe.
  //              onSave passed from App component through the props is linked to this.handleSave in the App component
  //                 By submitting the form, onSave function call allows App component, parent of Form, to acquire the new
  //                 recipe values and add it to its state.recipes array. The event happens in Form component, but it 
  //                 is being implemented in App component. Remember data travels down the tree only, not upstream or between
  //                  siblings. In order for the new recipe to be listed, the new recipe values must pass to List
  //                 component. It cannot happen directly. So, Form "communicate" the new recipe values to App through onSave call
  //                  then App component passes its new state (with the new recipe) downstream as prop to List component
                  // ** HOW DO YOU PASS AS PROP this.handleSave in App component to onSave in FORM COMPONENT?

  // EXERCISE 2 : this.state.recipes contains the data you do want to pass to List component.
  //in the List component you can access it through props.recipes
  // in the List component you generate a JSX element by using map method on recipes object


  render() {
    return (
      <div className="App">

        <h1>My Recipes</h1>

        <Form 
          onSave={this.handleSave}
        /> {/*Modify it here EXERCISE 1 */}

        <hr />

        <List  
          recipes={this.state.recipes}
        />  {/*Modify it here EXERCISE 2 */}
      </div>
    );
  }
}
                  {/*go to line 187 for EXERCISE 3 */}

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

  resetState = () => 
    this.setState({
      title: '',
      instructions: "",
      ingredients: [''],
      img: ''
    });

  // EXERCISE 3: handleReset call must set state to its initial state as 
  //             when the constructor of class Form is called (look above)
  //            You should use this.setState( {.....})
  handleReset = (e) => {
    e.preventDefault();
    alert(`Are you sure you want to reset?`);
    this.resetState();
}

  handleSubmit(e) {
    e.preventDefault();
    this.props.onSave({...this.state});
    this.resetState();
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

/**
 * THIS IS THE ERROR YOU SHOULD RECEIVE WHEN TRYING TO RUN THE APP AS IT IS NOW:
 * It points to line 89: cannot run map on an undefined value: what is the object
 * that map is expecting to execute on??
 * 
 * App.js:89 Uncaught TypeError: Cannot read properties of undefined (reading 'map')
    at List (App.js:89:1)
    at renderWithHooks (react-dom.development.js:14985:1)
    at mountIndeterminateComponent (react-dom.development.js:17811:1)
    at beginWork (react-dom.development.js:19049:1)
    at HTMLUnknownElement.callCallback (react-dom.development.js:3945:1)
    at Object.invokeGuardedCallbackDev (react-dom.development.js:3994:1)
    at invokeGuardedCallback (react-dom.development.js:4056:1)
    at beginWork$1 (react-dom.development.js:23964:1)
    at performUnitOfWork (react-dom.development.js:22776:1)
    at workLoopSync (react-dom.development.js:22707:1)
List @ App.js:89
renderWithHooks @ react-dom.development.js:14985
mountIndeterminateComponent @ react-dom.development.js:17811
beginWork @ react-dom.development.js:19049
callCallback @ react-dom.development.js:3945
invokeGuardedCallbackDev @ react-dom.development.js:3994
invokeGuardedCallback @ react-dom.development.js:4056
beginWork$1 @ react-dom.development.js:23964
performUnitOfWork @ react-dom.development.js:22776
workLoopSync @ react-dom.development.js:22707
renderRootSync @ react-dom.development.js:22670
performSyncWorkOnRoot @ react-dom.development.js:22293
scheduleUpdateOnFiber @ react-dom.development.js:21881
updateContainer @ react-dom.development.js:25482
(anonymous) @ react-dom.development.js:26021
unbatchedUpdates @ react-dom.development.js:22431
legacyRenderSubtreeIntoContainer @ react-dom.development.js:26020
render @ react-dom.development.js:26103
./src/index.js @ index.js:7
options.factory @ react refresh:6
__webpack_require__ @ bootstrap:24
(anonymous) @ startup:7
(anonymous) @ startup:7
react-dom.development.js:20085 The above error occurred in the <List> component:

    at List (http://localhost:3003/static/js/bundle.js:118:28)
    at div
    at App (http://localhost:3003/static/js/bundle.js:28:5)

Consider adding an error boundary to your tree to customize error handling behavior.
Visit https://reactjs.org/link/error-boundaries to learn more about error boundaries.
logCapturedError @ react-dom.development.js:20085
update.callback @ react-dom.development.js:20118
callCallback @ react-dom.development.js:12318
commitUpdateQueue @ react-dom.development.js:12339
commitLifeCycles @ react-dom.development.js:20736
commitLayoutEffects @ react-dom.development.js:23426
callCallback @ react-dom.development.js:3945
invokeGuardedCallbackDev @ react-dom.development.js:3994
invokeGuardedCallback @ react-dom.development.js:4056
commitRootImpl @ react-dom.development.js:23151
unstable_runWithPriority @ scheduler.development.js:468
runWithPriority$1 @ react-dom.development.js:11276
commitRoot @ react-dom.development.js:22990
performSyncWorkOnRoot @ react-dom.development.js:22329
scheduleUpdateOnFiber @ react-dom.development.js:21881
updateContainer @ react-dom.development.js:25482
(anonymous) @ react-dom.development.js:26021
unbatchedUpdates @ react-dom.development.js:22431
legacyRenderSubtreeIntoContainer @ react-dom.development.js:26020
render @ react-dom.development.js:26103
./src/index.js @ index.js:7
options.factory @ react refresh:6
__webpack_require__ @ bootstrap:24
(anonymous) @ startup:7
(anonymous) @ startup:7
App.js:89 Uncaught TypeError: Cannot read properties of undefined (reading 'map')
    at List (App.js:89:1)
    at renderWithHooks (react-dom.development.js:14985:1)
    at mountIndeterminateComponent (react-dom.development.js:17811:1)
    at beginWork (react-dom.development.js:19049:1)
    at HTMLUnknownElement.callCallback (react-dom.development.js:3945:1)
    at Object.invokeGuardedCallbackDev (react-dom.development.js:3994:1)
    at invokeGuardedCallback (react-dom.development.js:4056:1)
    at beginWork$1 (react-dom.development.js:23964:1)
    at performUnitOfWork (react-dom.development.js:22776:1)
    at workLoopSync (react-dom.development.js:22707:1)
List @ App.js:89
renderWithHooks @ react-dom.development.js:14985
mountIndeterminateComponent @ react-dom.development.js:17811
beginWork @ react-dom.development.js:19049
callCallback @ react-dom.development.js:3945
invokeGuardedCallbackDev @ react-dom.development.js:3994
invokeGuardedCallback @ react-dom.development.js:4056
beginWork$1 @ react-dom.development.js:23964
performUnitOfWork @ react-dom.development.js:22776
workLoopSync @ react-dom.development.js:22707
renderRootSync @ react-dom.development.js:22670
performSyncWorkOnRoot @ react-dom.development.js:22293
scheduleUpdateOnFiber @ react-dom.development.js:21881
updateContainer @ react-dom.development.js:25482
(anonymous) @ react-dom.development.js:26021
unbatchedUpdates @ react-dom.development.js:22431
legacyRenderSubtreeIntoContainer @ react-dom.development.js:26020
render @ react-dom.development.js:26103
./src/index.js @ index.js:7
options.factory @ react refresh:6
__webpack_require__ @ bootstrap:24
(anonymous) @ startup:7
(anonymous) @ startup:7
 */