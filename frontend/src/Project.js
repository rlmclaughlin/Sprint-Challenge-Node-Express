import React from 'react'; 

export const Project = (props) => {
    return(
        <div> 
          <div className="projects-container">
            <h3>{props.name}</h3>
            <p>{props.description}</p>
            <button onClick={props.projectDeleteHandler(props.id)}>Delete</button>
          </div> 
        </div> 
    )
}
