import React, {useState} from 'react'
import Table from './Table'

// const characters = [
//    {
//       name: 'Charile',
//       job: 'Janitor',
//    },
//    {
//       name: 'Mac',
//       job: 'Bouncer',
//    }

// ];

function MyApp() {

   const [characters,  setCharacters] = useState([
      {
         name: 'Charlie',
         job: 'Janitor',

      },
   ]);

   function removeOneCharacter(index) {
      const updated = characters.filter((character, i) => {
         return i !== index
      });
      setCharacters(updated);
   }

   return (
      <div className="container">
         <Table characterData={characters} removeCharacter={removeOneCharacter}/>
      </div>
   );
}

export default MyApp;