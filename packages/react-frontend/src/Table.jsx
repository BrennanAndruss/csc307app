import React from "react";

function TableHeader() {
  return (
    <thead>
      <tr>
        <th>Name</th>
        <th>Job</th>
        <th>Remove</th>
      </tr>
    </thead>
  );
}

function TableBody(props) {
  return (
    <tbody>
      {props.characterData.map((row, index) => (
        <tr key={index}>
          <td>{row.name}</td>
          <td>{row.job}</td>
          <td>
            <button onClick={() => props.removeCharacter(index)}>
              Delete
            </button>
          </td>
        </tr>
      ))}
    </tbody>
  );
}

function Table(props) {
  return (
    <table>
      <TableHeader />
      <TableBody 
        characterData={props.characterData} 
        removeCharacter={props.removeCharacter}
      />
    </table>
  );
}

export default Table;