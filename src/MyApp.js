import React from 'react'
import Table from './Table'

const characters = [
   {
      name: 'Charile',
      job: 'Janitor',
   },
   {
      name: 'Mac',
      job: 'Bouncer',
   }

];

function MyApp() {
   return (
      <div className="container">
         <Table characterData={characters}/>
      </div>
   );
}

export default MyApp;