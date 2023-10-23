const express = require('express');
const apiRouter = express.Router();
const app = express();
const db = require('./db'); // Import your database functions
const checkMillionDollarIdea = require('./checkMillionDollarIdea');
const createMeeting = require('./db').createMeeting;

//API Minions
//get all minions
apiRouter.get('/minions', (req, res) => {
    const allMinions = db.getAllFromDatabase('minions');
    res.status(200).json(allMinions);
});

//create a new minion
apiRouter.post('/minions', (req, res) => {
//POST request bodies will not have an id property, I will have to set it based on the next id in sequence.
    const newMinion = req.body;
    // Add the new minion to the database and respond
    const addedMinion = db.addToDatabase('minions', newMinion);
    if (addedMinion) {
        res.status(201).json(addedMinion);
    } else {
        res.status(400).send('Invalid data or error adding to the database.');
    }
});

//get one minion by id
apiRouter.get('/minions/:minionId', (req, res) => {
    const minion = db.getFromDatabaseById('minions', req.params.minionId);
    if (minion) {
        res.status(200).json(minion);
    } else {
        res.status(404).send('Minion not found.');
    }
});

//update a minion by id
apiRouter.put('/minions/:minionId', (req, res) => {
    const updatedMinion = req.body;
    updatedMinion.salary = parseFloat(updatedMinion.salary); // Convert salary to a number
    updatedMinion.id = req.params.minionId;
    const updatedMinionResult = db.updateInstanceInDatabase('minions', updatedMinion);
    if (updatedMinionResult) {
        res.status(200).json(updatedMinionResult);
    } else {
        res.status(404).send('Not Found!');
    }
});

//delete a single minion by id
apiRouter.delete('/minions/:minionId', (req, res) => {
    const deleted = db.deleteFromDatabasebyId('minions', req.params.minionId);
    if (deleted) {
        res.status(204).send();
    } else {
        res.status(404).send('Minion not found.');
    }
});


//API Ideas
//get all ideas
apiRouter.get('/ideas', (req, res) => {
    const allIdeas = db.getAllFromDatabase('ideas');
    res.status(200).json(allIdeas);
});

//create a new idea
apiRouter.post('/ideas', checkMillionDollarIdea, (req, res) => {
    // If the middleware checkMillionDollarIdea returns a truthy value, this code will execute
    const newIdea = req.body;

    // Check if all required properties are present in the request body
    if (!newIdea.name || !newIdea.description || !newIdea.numWeeks || !newIdea.weeklyRevenue) {
            return res.status(400).send('Please provide all required fields.');
    }
    // Add the new idea to the database and respond
    const addedIdea = db.addToDatabase('ideas', newIdea);
    if (addedIdea) {
        res.status(201).json(addedIdea);
    } else {
        res.status(400).send('Invalid data or error adding to the database.');
    }
});

//get one idea by id
apiRouter.get('/ideas/:ideaId', (req, res) => {
    const idea = db.getFromDatabaseById('ideas', req.params.ideaId);
    if (idea) {
        res.status(200).json(idea);
    } else {
        res.status(404).send('Idea not found.');
    }
});

//update one idea by id
apiRouter.put('/ideas/:ideaId', (req, res) => {
    const updatedIdea = req.body;
    updatedIdea.id = req.params.ideaId;
    const updatedIdeaResult = db.updateInstanceInDatabase('ideas', updatedIdea);
    if (updatedIdeaResult) {
        res.status(200).json(updatedIdeaResult);   
} else {
        res.status(404).send('Not Found!');
    }
});

//delete a single idea by id
apiRouter.delete('/ideas/:ideaId', (req, res) => {
    const deleted = db.deleteFromDatabasebyId('ideas', req.params.ideaId);
    if (deleted) {
        res.status(204).send();
    } else {
        res.status(404).send('Idea not found.');
    }
});

//API Meetings
//get all meetings
apiRouter.get('/meetings', (req, res) => {
    const allMeetings = db.getAllFromDatabase('meetings');
    res.status(200).json(allMeetings);   
});

//create one new meeting
apiRouter.post('/meetings', (req, res) => {
    // Generate a new meeting using the createMeeting function
    const newMeeting = createMeeting();
    // Add the new meeting to the database and respond
    const addedMeeting = db.addToDatabase('meetings', newMeeting);
    if (addedMeeting) {
        res.status(201).json(addedMeeting);
    } else {
        res.status(400).send('Invalid data or error adding to the database.');
    }
});

//delete all meetings from Db
apiRouter.delete('/meetings', (req, res) => {
    const deleted = db.deleteAllFromDatabase('meetings');
    if (deleted) {
        res.status(204).send();
    } else {
        res.status(404).send('Meetings not found.');
    }    
});


module.exports = apiRouter;
