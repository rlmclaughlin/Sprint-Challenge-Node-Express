const express = require("express")
const actionModelDb = require("./data/helpers/actionModel.js")
const projectModelDb = require("./data/helpers/projectModel.js")
const mappersDb = require("./data/helpers/mappers.js")

const port = 9000
const server = express()
server.use(express.json())


server.get('/api/actions', (req,res) => {
    actionModelDb.get()
      .then(actions => {       
         res.status(200).json(actions)
      })
    .catch(err => console.log(err))
})

 server.get('/api/projects', (req,res) => {
    projectModelDb.get()
      .then(projects => {
         res.status(200).json(projects)
    })
    .catch(err => console.log(err))
})

 server.get('/api/projects/actions/:projectId', (req,res) => {
    const {projectId} = req.params;
    projectModelDb.getProjectActions(projectId)
      .then(projectActions => {
         res.status(200).json(projectActions)
    })
    .catch(err => console.log(err))
})

server.post('/api/actions', (req,res) => {
    const {project_id, description, notes, completed} = req.body;
    actionModelDb.insert({project_id, description, notes, completed})
      .then(() => {
        actionModelDb.get().then(actions =>{
            res.status(200).json(actions)
        })
    })
    .catch(err => console.log(err))
})

 server.post('/api/projects', (req,res) => {
    const {name, description, completed} = req.body
    projectModelDb.insert({name, description, completed})
    .then(() => {
        projectModelDb.get().then(projects => {
            res.status(200).json(projects)
        })
    })
    .catch(err => console.log(err))
 })

 server.delete(`/api/actions/:actionId`, (req,res) => {
    const {actionId} = req.params
    actionModelDb.remove(actionId)
      .then(() => {
        actionModelDb.get()
          .then(actions => {
            res.json(actions)
        })
    })
 })

 server.delete(`/api/projects/:projectId`, (req,res) => {
    const {projectId} = req.params
    projectModelDb.remove(projectId)
      .then(() => {
        projectModelDb.get()
          .then(projects => {
            res.json(projects)
        })
    })
})

server.put(`/api/actions/:actionId`, (req,res) => {
    const {actionId} = req.params
    const {project_id, description, notes, completed} = req.body;
    actionModelDb.update(actionId, {project_id, description, notes, completed})
      .then(() =>{
        actionModelDb.get()
          .then(actions => {
            res.json(actions)
        })
    }) 
})

 server.put(`/api/projects/:projectId`, (req,res) => {
    const {projectId} = req.params
    const {name, description, completed} = req.body
    projectModelDb.update(projectId, {name, description,completed})
      .then(() => {
        projectModelDb.get()
          .then(projects => {
            res.json(projects)
        })
    })
})

server.listen(port, err => {
    if(err) console.log(err)
    console.log(`Server is running on port: ${port}`);
})