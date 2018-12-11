import React from 'react'
import axios from 'axios'
import {Project} from './Project.js'

export default class Projects extends React.Component {
    constructor(props){
        super(props); 
        this.state = {
            projects: [],
            name: '',
            description: '',
            id: null
        }
    }

    componentDidMount(){
        axios
        .get('http://localhost:9000/api/Projects')
          .then( response => {
              this.setState({projects: response.data})
          })
          .catch(err => {console.log("there was an error")})
    }

    inputHandler = (event) => {
        event.preventDefault(); 
        this.setState({
            [event.target.name]: event.target.value,
            id: Date.now()
        })
    }

    submitHandler = (event) => {
        event.preventDefault(); 
        this.setState({
            projects: [ ...this.state.projects, {id: this.state.id, name: this.state.name, description: this.state.description}]
        })
        let newFriend = {
            name: this.state.name,
            description: this.state.description,
            id: this.state.id
        }
        axios
          .post(`http://localhost:9000/api/Projects`, newFriend)
            .then( response => 
              this.setState({
                newFriend: {  name: '', description: '', id: null}
              })
            )
            .catch(error => {
              console.log("we've encountered an error")
            })
    }

    projectDeleteHandler = (id) => {
        return () => {
        axios
          .delete(`http://localhost:9000/api/Projects/${id}`)
            .then( response => {
                this.setState({ projects: response.data})
            })
            .catch( err => { console.log("we've encountered an error")})
        } 
    }
    
    
    
    render() {
        return(
            <div>
              <h1> Projects: </h1>
                <div className='actions-submission'>
                  <h3> Submit Project </h3> 
                  <div> Name: <input value={this.state.name} name='name' onChange={this.inputHandler} /></div> 
                  <div> Description: <input value={this.state.description} name='description' onChange={this.inputHandler} /></div> 
                  <button onClick={this.submitHandler}>Submit Action</button> 
                </div> 
                {this.state.projects.map((item, index) => {
                    return <Project projectDeleteHandler={this.projectDeleteHandler} key={index} id={item.id} name={item.name} description={item.description} />
                })}
            </div> 
        )
    }
}