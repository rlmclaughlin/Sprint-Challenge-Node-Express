import React from 'react'; 

export const Action = (props) => {
    return(
        <div>
            <div className='action-container'>
              <h3>{props.description}</h3> 
              <p>{props.notes}</p>
              <button onClick={props.deleteHandler(props.id)}>Delete</button> 
            </div>
        </div> 
    )
}