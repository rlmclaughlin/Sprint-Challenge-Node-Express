import React from 'react'
import axios from 'axios'
import {Action} from './Action.js'

export default class Actions extends React.Component {
    constructor(props){
        super(props); 
        this.state = {
            actions: [],
            notes: '',
            description: '',
            project_id: null,
            friend: {},
            id: null
        }
    }

    componentDidMount(){
        axios
          .get('http://localhost:9000/api/Actions')
            .then( response => {
                this.setState({
                    actions: response.data
                })
            })
            .catch( err => { console.log("There was an error")})
    }

    inputHandler = (event) => {
        event.preventDefault(); 
        this.setState({
            [event.target.name]: event.target.value,
            project_id: Date.now(),
            id: this.state.project_id + 1
        })
    }

    submitHandler = (event) => {
        event.preventDefault(); 
        this.setState({
            actions: [ ...this.state.actions, {id: this.state.id, project_id: this.state.project_id, notes: this.state.notes, description: this.state.description}]
        })
        
        let newFriend = {
            description: this.state.description,
            notes: this.state.notes,
            project_id: this.state.project_id,
            id: this.state.id
        }
        axios
          .post(`http://localhost:9000/api/Actions`, newFriend)
            .then( response => 
              this.setState({
                newFriend: {description: '', notes: '', project_id: null, id: null}
              })
            )
            .catch(error => {
              console.log("we've encountered an error")
            })
    }
    
    deleteHandler = (eventId) => {
      return () => {
        axios
          .delete(`http://localhost:9000/api/Actions/${eventId}`)
            .then( response => {
                this.setState({actions: response.data})
            })
            .catch( err => {console.log("there was an error")})
        }
    }

    render() {
        return(
            <div>
              <h1> Actions: </h1>
                <div className='actions-submission'>
                  <h3> Submit Action </h3> 
                  <div> Description: <input onChange={this.inputHandler} value={this.state.description} name="description" /></div> 
                  <div> Notes: <input onChange={this.inputHandler} value={this.state.notes} name="notes" /></div> 
                  <button onClick={this.submitHandler}>Submit Action</button> 
                </div> 
                {this.state.actions.map( (item, index) => {
                    return <Action deleteHandler={this.deleteHandler} id={item.id} key={index} notes={item.notes} description={item.description}/> 
                })}
            </div> 
        )
    }
}