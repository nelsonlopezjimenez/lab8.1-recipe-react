import React, { useState, Component } from 'react';
import './App.css';


// from Create user interfaces from components
const videos = [
{ url: "./RAW-VIDEOS/2022coltsteelebootcamp/Colt's Code Camp Day 1-SF_Xl5TOGlY.mp4", title: "Colt's Cod", description: "Colt's Code Camp Day 1-SF_Xl5TOGlY.mp4" },
{ url: "Colt's Code Camp Day 1-SF_Xl5TOGlY.mp4", title: "Colt's Code Camp Day 1-SF_Xl5TOGlY", description: "Colt's Code Camp Day 1-SF_Xl5TOGlY.mp4" },
{ url: "http://localhost:3999/youtube.nel/RAW_VIDEOS/2022vscode/VS Code - Customization-4wVF4w_53hs.mp4", title: "4wVF4w_53hs", description: "4wVF4w_53hs's Code   1-.mp4" },
{ url: "http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4", title: "/BigBuckBunny.mp4", description: "BigBuckBunny.mp4" }, {url: "http://localhost:3999/youtube.nel/RAW_VIDEOS/MSjavascriptforbeginners/Array%20methods%20[33%20of%2051]%20_%20JavaScript%20for%20Beginners-9ORixWHwPZM.mp4", title: "http://localhost:3999/youtube.nel/RAW_VIDEOS/MSjavascriptforbeginners/Array%20methods%20[33%20of%2051]%20_%20JavaScript%20for%20Beginners-9ORixWHwPZM.mp4", description: "http://localhost:3999/youtube.nel/RAW_VIDEOS/MSjavascriptforbeginners/Array%20methods%20[33%20of%2051]%20_%20JavaScript%20for%20Beginners-9ORixWHwPZM.mp4"}
];

const videoList_10 = `
[{"id":"4cf5cdd0-ec11-11ed-ba37-ddee954b0e12","name":"Colt's Code Camp Day 1-SF_Xl5TOGlY.mp4","filename":"Colt's Code Camp Day 1-SF_Xl5TOGlY.mp4","filepath":"/"},{"id":"4cf5cdd1-ec11-11ed-ba37-ddee954b0e12","name":"Colt's Code Camp Day 2-L1h--yeMbZc.mp4","filename":"Colt's Code Camp Day 2-L1h--yeMbZc.mp4","filepath":"/"},{"id":"4cf5cdd2-ec11-11ed-ba37-ddee954b0e12","name":"Colt's Code Camp Day 3 - HTML Tables & Entities-ZEHRyN6y71M.mp4","filename":"Colt's Code Camp Day 3 - HTML Tables & Entities-ZEHRyN6y71M.mp4","filepath":"/"},{"id":"4cf5cdd3-ec11-11ed-ba37-ddee954b0e12","name":"Colt's Code Camp Day 4 - Forms & Inputs-sPStRhWqNMg.mp4","filename":"Colt's Code Camp Day 4 - Forms & Inputs-sPStRhWqNMg.mp4","filepath":"/"},{"id":"4cf5cdd4-ec11-11ed-ba37-ddee954b0e12","name":"CSS Color Systems HSL, RGB, HEX - Colt's Code Camp-rNtW2PHVoNM.mp4","filename":"CSS Color Systems HSL, RGB, HEX - Colt's Code Camp-rNtW2PHVoNM.mp4","filepath":"/"},{"id":"4cf5cdd5-ec11-11ed-ba37-ddee954b0e12","name":"Essential CSS Text Properties - Colt's Code Camp-v9Hqy5Nxthc.mp4","filename":"Essential CSS Text Properties - Colt's Code Camp-v9Hqy5Nxthc.mp4","filepath":"/"},{"id":"4cf5cdd6-ec11-11ed-ba37-ddee954b0e12","name":"Intro to CSS - Colt's Code Camp-jNwCMTQ9ico.mp4","filename":"Intro to CSS - Colt's Code Camp-jNwCMTQ9ico.mp4","filepath":"/"},{"id":"4cf5cdd7-ec11-11ed-ba37-ddee954b0e12","name":"JavaScript for Beginners Course (2020) - Colt Steele-x2RNw4M6cME.mp4","filename":"JavaScript for Beginners Course (2020) - Colt Steele-x2RNw4M6cME.mp4","filepath":"/"},{"id":"4cf5cdd8-ec11-11ed-ba37-ddee954b0e12","name":"Master The All Important CSS Box Model - Colt's Code Camp-M1xEi_BBW1I.mp4","filename":"Master The All Important CSS Box Model - Colt's Code Camp-M1xEi_BBW1I.mp4","filepath":"/"},{"id":"4cf5cdd9-ec11-11ed-ba37-ddee954b0e12","name":"Responsive Design & Media Queries In 30ish Minutes - Colt's Code Camp-na-X_SM8vg0.mp4","filename":"Responsive Design & Media Queries In 30ish Minutes - Colt's Code Camp-na-X_SM8vg0.mp4","filepath":"/"},{"id":"4cf5cdda-ec11-11ed-ba37-ddee954b0e12","name":"The CSS Units You Should Use - em, rem, % , vh, vw, and more - Colt's Code Camp-fi81bovqxXI.mp4","filename":"The CSS Units You Should Use - em, rem, % , vh, vw, and more - Colt's Code Camp-fi81bovqxXI.mp4","filepath":"/"},{"id":"4cf5cdda-ec11-11ed-ba38-ddee954b0e12","name":"The%20CSS%20Units%20You%20Should%20Use%20-%20em,%20rem,%20%25%20,%20vh,%20vw,%20and%20more%20-%20Colt's%20Code%20Camp-fi81bovqxXI.mp4","filename":"The CSS Units You Should Use - em, rem, % , vh, vw, and more - Colt's Code Camp-fi81bovqxXI.mp4","filepath":"/"},{"id":"4cf5cddb-ec11-11ed-ba37-ddee954b0e12","name":"The Ultimate CSS3 Flexbox Tutorial - Colt's Code Camp-qZv-rNx0jEA.mp4","filename":"The Ultimate CSS3 Flexbox Tutorial - Colt's Code Camp-qZv-rNx0jEA.mp4","filepath":"/"},{"id":"4cf5cddc-ec11-11ed-ba37-ddee954b0e12","name":"Top CSS Selectors You Should Know - Colt's Code Camp-qj20o5UQ3qI.mp4","filename":"Top CSS Selectors You Should Know - Colt's Code Camp-qj20o5UQ3qI.mp4","filepath":"/"},{"id":"4cf5cddd-ec11-11ed-ba37-ddee954b0e12","name":"Using & Optimizing Google Fonts - Colt's Code Camp-iHGxxPxGUgA.mp4","filename":"Using & Optimizing Google Fonts - Colt's Code Camp-iHGxxPxGUgA.mp4","filepath":"/"},{"id":"4cf5cdde-ec11-11ed-ba37-ddee954b0e12","name":"What is HTML5 Semantic Markup - Colt's Code Camp-naha1DIHK4E.mp4","filename":"What is HTML5 Semantic Markup - Colt's Code Camp-naha1DIHK4E.mp4","filepath":"/"}]
`
const videoList_11 = JSON.parse(videoList_10);

function ListVideo({ videos }) {
  const prefix =  "http://localhost:3999/youtube.nel/RAW_VIDEOS/2022coltsteelebootcamp/";
  const videosJSX = videos.map((item) => (
    <Video key={item.id} url={prefix + item.filename} title={item.name} description={item.name} />
    // <Video key={item.id} {...item} />
  ));
  return (
    <div className="video-list">
      {videosJSX}
    </div>
  );
}
function ListYoutubeNel({ videos }) {
  const videosJSX = videos.map((item) => (
    <Video key={item.url} url={item.url} title={item.title} description={item.description} />
    // <Video key={item.id} {...item} />
  ));
  return (
    <div className="video-list">
      {videosJSX}
    </div>
  );
}

function Video({ url, title, description }) {
  return (
    <div style={{ display: 'flex', flexDirection: "row", justifyContent: "space-between", padding: "3%", flexGrow: 1 }}>
      <Thumbnail url={url} style={{ flexGrow: 0 }} />
      <a href={url} style={{ border: "2px green solid", flexGrow: 2, display: "flex", flexDirection: "column", alignItems: "center" }}>
        <h3>{title}</h3>
        <p>{description}</p>
      </a>
      <LikeButton style={{ flexGrow: 1 }} />

    </div>
  )
}
function Thumbnail({ url }) {
  return (
    <>
      <video controls style={{ width: "50%", height: "50%" }}>
        <source src={url} type="video/mp4" />
        Your browser does not support the video tag.
      </video>
    </>
  )
}
function LikeButton() {
  return (
    <>
      <button style={{ width: '30px', height: '30px', alignSelf: "center", border: "2px yellow solid" }}>;)</button>
    </>
  )
}
function App() {

  const [myState, setMyState] = useState(
    [
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
    ]
  )

  // this.handleSave = this.handleSave.bind(this);


  // handleSave(recipe) {
  //   this.setState((prevState, props) => {
  //     const newRecipe = {...recipe, id: this.state.nextRecipeId };
  //     return {
  //       nextRecipeId: prevState.nextRecipeId + 1,
  //       recipes: [...this.state.recipes, newRecipe],
  //     }
  //   });
  // }


  return (
    <div className="App">

      <h1 style={{display: "flex", justifyContent:"center"}}>My JavaScript Videos</h1>

      <ListYoutubeNel videos={videos} />
      <ListVideo videos={videoList_11} />

      <hr />

    </div>
  );

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
  handleChangeTitle = (e) => {
    console.log(e.target.value);
    this.setState({ title: e.target.value })
  }
  handleChangeIns = (e) => {
    console.log(e.target.value);
    this.setState({ instructions: e.target.value })
  }
  handleChangeImg = (e) => {
    console.log(e.target.value);
    this.setState({ img: e.target.value })
  }

  handleNewIngredient(e) {
    const { ingredients } = this.state;
    this.setState({ ingredients: [...ingredients, ''] });
  }

  handleChangeIng(e) {
    const index = Number(e.target.name.split('-')[1]);
    const ingredients = this.state.ingredients.map((ing, i) => (
      i === index ? e.target.value : ing
    ));
    this.setState({ ingredients });
  }

  // EXERCISE 3: handleReset call must set state to its initial state as
  //             when the constructor of class Form is called (look above)
  //            You should use this.setState( {.....})
  handleReset = (e) => {
    e.preventDefault();
    alert(`Are you sure you want to reset?`)
    this.setState({
      title: '',
      instructions: '',
      ingredients: [''],
      img: ''
    })
  }

  handleSubmit(e) {
    e.preventDefault();
    this.props.onSave({ ...this.state });
    this.setState({
      title: '',
      instructions: '',
      ingredients: [''],
      img: ''
    })
  }

  render() {
    const { title, instructions, img, ingredients } = this.state;
    let inputs = ingredients.map((ing, i) => (
      <div
        className="recipe-form-line"
        key={`ingredient-${i}`}
      >
        <label>{i + 1}.
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
              onChange={this.handleChangeTitle} />
          </div>
          <label
            htmlFor='recipe-instructions-input'
            style={{ marginTop: '5px' }}
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
            onChange={this.handleChangeIns} />
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
            style={{ alignSelf: 'flex-end', marginRight: 0 }}
          >
            SAVE
          </button>
        </form>
      </div>
    )
  }
}
export default App;
