// import React from 'react'
// import Frying from './Frying'
// import { useState } from 'react'
// import Recipe from './Recipe'
// import {handleSearch,input} from 'react'
// // const Search = ({
// //     handleSearch,
// //     searchItem,
// //     setSeachItem,
// //     input,
// //     //saveItem,
// //   }) => {
   
// function Search() {
//     let [searchItem,setSeachItem]=useState('')
//     let [recipes,loading,error]=useState('')
//   return (
//     <div className='main'>
//     {/* <h1 className='heading mt-5 style-italic'>Search Your Food Recipe</h1> */}
//    <form className="search-bar" onSubmit={handleSearch}>
    
//         <div className='box d-flex mt-4 align-content-center'>
//           <input className=" rounded-pill" type="search" ref={input}
//     value={searchItem}
//       onChange={(e) => setSeachItem(e.target.value)}placeholder="Search"/>
//            <button type="Search">Search</button>
//            <p className="lg:text-4xl text-xl text-center text-dark font-semibold">
//             Nothing to show, please search something!
//           </p>
          
//         </div>
         
                      
//         </form>

//         <div className="py-8 container mx-auto flex flex-wrap justify-center gap-10">
//       {recipes.length === 0 && !loading && !error ? (
//         <div>
//           {/* <p className="lg:text-4xl text-xl text-center text-dark font-semibold">
//             Nothing to show, please search something!
//           </p> */}
//           <Frying />
//         </div>
//       ) : null}
//       {loading && <p>{error ? error : "loading..."}</p>}
//       {recipes?.length > 0 &&
//         recipes.map((recipe) => <Recipe recipe={recipe} key={recipe.id} />)}
//     </div>
//         </div>
// //     <div><form className="search-bar" onSubmit={handleSearch}>
// //     <input
// //       type="search"
// //       ref={input}
// //       value={searchItem}
// //       onChange={(e) => setSeachItem(e.target.value)}
// //       className="bg-white/75 p-3 px-8 rounded-full outline-none lg:w-96 shadow-lg shadow-red-100 focus:shadow-red-200 "
// //       placeholder="Search Items...."
// //     />
// //   </form></div>
//   )
// }



// export default Search



















import React, { useState } from 'react';
import Frying from './Frying';
import Recipe from './Recipe';
import { userLoginContextObj } from '../context/userLoginContext';
import { useContext } from 'react';
import './Search.css'
import { useLocation } from 'react-router-dom';


const Search = () => {
  const [searchItem, setSearchItem] = useState('');
  const [recipes, setRecipes] = useState({});
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [currentUser]=useContext(userLoginContextObj)

  const handleSearch = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      // Perform your API request or any other logic to fetch recipes based on the searchItem
      // For now, let's assume fetchRecipes is a function that fetches data and returns an array of recipes
      const fetchedRecipes = await fetchRecipes(searchItem);

      setRecipes(fetchedRecipes);
      setLoading(false);
      setError('');
    } catch (error) {
      setError('Error fetching recipes. Please try again.');
      setLoading(false);
    }
  };
  let {state}=useLocation()
  console.log(state)
  return (
    <div className="main">
        <p className='lead fs-2 text-end text-dark font-weight-bold'>Welcome,{currentUser.username}</p>
      <form className="search-bar" onSubmit={handleSearch}>
        <div className="box d-flex mt-4 align-content-center">
          <input
            className="rounded-pill"
            type="search"
            value={searchItem}
            onChange={(e) => setSearchItem(e.target.value)}
            placeholder="Search"
          />
          <button type="submit">Search</button>
        </div>
      </form>

      <div className="py-8 container mx-auto flex flex-wrap justify-center gap-10">
        {recipes.length === 0 && !loading && !error ? (
          <div>
            <p className="lg:text-4xl text-xl text-center text-dark font-semibold">
              Nothing to show, please search something!
            </p>
            <Frying />
          </div>
        ) : null}
        {loading && <p>{error ? error : 'Loading...'}</p>}
        {recipes?.length > 0 &&
          recipes.map((recipe) => <Recipe recipe={recipe} key={recipe.id} />)}
      </div>
    </div>
  );
};

// Assuming this function makes an API call to fetch recipes based on the searchItem
const fetchRecipes = async (searchItem) => {
  // Implement your logic to fetch recipes (e.g., using fetch or axios)
  // For now, let's simulate fetching data after a short delay
  return new Promise((resolve) => {
    setTimeout(() => {
      const dummyRecipes = [
        { id: 1, title: 'Recipe 1', ingredients: ['Ingredient 1', 'Ingredient 2'], instructions: ['Step 1', 'Step 2'] },
        { id: 2, title: 'Recipe 2', ingredients: ['Ingredient 3', 'Ingredient 4'], instructions: ['Step 3', 'Step 4'] },
      ];
      resolve(dummyRecipes);
    }, 1000);
  });
};

export default Search;
