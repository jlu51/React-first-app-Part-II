import React, {useState, useEffect} from 'react'
import axios from 'axios';
import Table from './Table'
import Form from './Form';

function MyApp() {

   const [characters,  setCharacters] = useState([]);


   useEffect(() => {
      fetchAll().then( result => {
         if (result)
            setCharacters(result);
      });
   }, []);

   async function fetchAll() {
      try {
         const response = await axios.get('http://localhost:5000/users');
         return response.data.users_list;
      }
      catch (error) {
         console.log(error);
         return false;
      }
   }

   async function makePostCall(person) {
      try{
         const response = await axios.post('http://localhost:5000/users', person);
         // console.log(response.data);
         return response;
      }
      
      catch (error) {
         console.log(error);
         return false;
      }
   }
   
   async function makeDeleteCall(id) {

      try {
         const response = await axios.delete('http://localhost:5000/users/' + id);
         return response;
      }
      catch (error) {
         console.log(error);
         return false;
      }
   }

   function removeOneCharacter(id) {

      makeDeleteCall(id).then( result => {

         if (result.status === 204) {

            const updated = characters.filter((character) => {
               if (character)
                  return character.id !== id
            });
            setCharacters(updated)
         }
      });
   }
   
   function updateList(person) {
      makePostCall(person).then( result => { // What if some other user posts at the same time?
         if (result.status === 201)
            setCharacters([...characters, result.data]); // Would this include the other new post?
      });
   }

   return (
      <div className="container">
         <Table characterData={characters} removeCharacter={removeOneCharacter}/>
         <Form handleSubmit={updateList} />
      </div>
   );
}

export default MyApp;