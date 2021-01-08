import React from 'react'


// Props are an effective way to pass existing data to a React component, however, the component cannot change the props - they're read-only. 
//In the next React assignment (Part II), we'll learn how to use state to have further control over handling data in React.

function TableHeader() {
   return (
      <thead>
         <tr>
            <th>Name</th>
            <th>Job</th>
         </tr>
      </thead>

   );
}

function Table(props) { 
   return (
      <div>
         <TableHeader />
         <TableBody characterData={props.characterData} />
      </div>
   );
}

function TableBody(props) {
   const rows = props.characterData.map((row, index) => {
      return (
         <tr key={index}>
            <td>{row.name}</td>
            <td>{row.job}</td>
         </tr>
      )
   })

// function TableBody(props) {
//    const rows = props.characterData.map((row, index) => {
//       return (
//          <div key={index}>
//             <div>{row.name}</div>
//             <td>{row.job}</td>
//          </div>
//       )
//    })
//    console.log(rows);

   return (
      <tbody>
         {rows}
      </tbody>
   );
 }

export default Table;