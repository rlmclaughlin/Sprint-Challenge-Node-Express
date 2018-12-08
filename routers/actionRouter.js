const express = require('express');
const router = express.Router();
const actionDb = require('../data/helpers/actionModel');
 
router.get('/', (req, res) => {
    actionDb.get()
        .then((actions) => {
            res.json(actions);
        })
        .catch((err) => {
            res.status(500).json({error: "Unable to retrieve actions."});
        });
});

 router.get('/:id', (req, res) => {
    actionDb.get(req.params.id)
        .then((action) => {
            res.json(action);
        })
        .catch((err) => {
            res.status(500).json({error: "Unable to retrieve actions."});
        });
});

 router.post('/', (req, res) => {
    const action = req.body;
    if (action.description && action.notes && action.project_id) {
        actionDb.insert(action)
            .then((action) => {
                res.status(201).json(action);
            })
            .catch((err) => {
                res.status(500).json({error: "Unable to create action."});
            });
    } else {
        res.status(400).json({errorMessage: "Action failed. More information is needed"});
    }
});

 router.delete('/:id', (req, res) => {
    actionDb.remove(req.params.id)
    .then(count => {
        if (count) {
            res.json({message: "Action has been deleted"})
        } else {
            res.status(404).json({message: "Action does not exist."})
        }
    })
    .catch(err => {
        res.status(500).json({error: "Unable to delete action."});
    })
});

 router.put('/:id', (req, res) => {
    const action = req.body;
    if (action.description && action.notes && action.project_id) {
        actionDb.update(req.params.id, action)
            .then(action => {
                if (action) {
                    res.json(action);
                } else {
                    res.status(404).json({message: "Action does not exist."});
                }
            })
            .catch(err => {
                res.status(500).json({error: "Unable to change action."});
            });
    } else {
        res.status(400).json({errorMessage: "Action failed. Please provide more information."});
    }
});

 module.exports = router;