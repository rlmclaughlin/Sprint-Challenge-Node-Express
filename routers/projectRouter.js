const express = require('express');
const router = express.Router();
const projectDb = require('../data/helpers/projectModel');


 router.get('/', (req, res) => {
    projectDb.get()
        .then((projects) => {
            res.json(projects);
        })
        .catch((err) => {
            res.status(500).json({error: "Unable to retrieve projects."});
        });
});

 router.get('/:id', (req, res) => {
    projectDb.get(req.params.id)
        .then((project) => {
            res.json(project);
        })
        .catch((err) => {
            res.status(500).json({error: "Unable to retrieve project"});
        });
});

 router.post('/', (req, res) => {
    const project = req.body;
    if (project.name && project.description) {
        projectDb.insert(project)
            .then((project) => {
                res.status(201).json(project);
            })
            .catch((err) => {
                res.status(500).json({error: "Unable to create post."});
            });
    } else {
        res.status(400).json({errorMessage: "More information is needed."});
    }
});

 router.delete('/:id', (req, res) => {
    projectDb.remove(req.params.id)
    .then(count => {
        if (count) {
            res.json({message: "Project has been deleted."})
        } else {
            res.status(404).json({message: "Project does not exist."})
        }
    })
    .catch(err => {
        res.status(500).json({error: "Unable to delete project"});
    })
});

 router.put('/:id', (req, res) => {
    const project = req.body;
    if (project.name && project.description) {
        projectDb.update(req.params.id, project)
            .then(project => {
                if (project) {
                    res.json(project);
                } else {
                    res.status(404).json({message: "Project does not exist."});
                }
            })
            .catch(err => {
                res.status(500).json({error: "Unable to update project."});
            });
    } else {
        res.status(400).json({errorMessage: "More information is needed"});
    }
});

 router.get('/:id/actions', (req, res) => {
    projectDb.get(req.params.id)
        .then((project) => {
            res.json(project);
        })
        .catch((err) => {
            res.status(500).json({error: "Project actions could not be retrieved."});
        });
});

 module.exports = router;