/*
const checkMillionDollarIdea = () => {
    const idea = document.getElementById("idea-title").value;
    const numPeople = document.getElementById("num-people").value;
    const revenue = document.getElementById("weekly-revenue").value;
    const total = (Number(numPeople) * Number(revenue));
    if (idea === "" || numPeople === "" || revenue === "") {
        alert("Please fill out all fields");
    } else if (total < 1000000) {
        alert("Total must be greater than or equal to 1,000,000");
    } else {
        return true;
    }
    return false;
};
*/

//REFACTORING FUNCTION TO MAKE IT CALL BY PASSING THE CREATED VARIABLES AS ARGUMENTS

const checkMillionDollarIdea = (req, res, next) => {
    const { name, description, numWeeks, weeklyRevenue } = req.body;
    if (!name || !description || !(numWeeks && numWeeks > 0) || !(weeklyRevenue && weeklyRevenue > 0)) {
        return res.status(400).send('Please provide all required fields.');
    } else {
        const total = Number(numWeeks) * Number(weeklyRevenue);
        if (total < 1000000) {
            res.status(400).send('Idea must meet the requirements to yield at least one million dollars.');
        } 
        next(); 
    }
};

/*
const checkMillionDollarIdea = (req, res, next) => {
    const { name, description, numWeeks, weeklyRevenue } = req.body;
    if (!name || !description || !numWeeks || !weeklyRevenue) {
        res.status(400).send("Please fill out all required fields.");
    } else {
        const total = Number(numWeeks) * Number(weeklyRevenue);
        if (total < 1000000 || typeof total === null) {
            res.status(400).send("Idea must meet the requirements to yield at least one million dollars.");
        } else {
            next(); // Call next if the idea is valid
        } 
    }
};
*/

 // If the idea meets the requirements, return true, otherwise return false. 
    // This will be used in the app.js file to determine if the idea meets the requirements. 
    // If the idea meets the requirements, the idea will be added to the database. 
    // If the idea does not meet the requirements, the idea will not be added to the database. 
    // The idea will be added to the database only if it meets the requirements.



// Leave this exports assignment so that the function can be used elsewhere
module.exports = checkMillionDollarIdea;
