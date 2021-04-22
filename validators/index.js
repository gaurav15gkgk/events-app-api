

createEventValidator = (req, res, next ) => {
    //for the Event Name
    req.check('EventName',"Write an Event Name").notEmpty()
    req.check('EventName', "Event Name must be from 4 to 150 characters ").isLength({
        min: 4,
        max: 150
    })

    //for the Event Type
    req.check('EventType',"Write an Event Type").notEmpty()
    req.check('EventType', "Event Type must be from 4 to 50 characters ").isLength({
        min: 4,
        max: 50
    })

    //for the Event Organiser
    req.check('EventOrganiser',"Write the name of Event Organiser").notEmpty()
    req.check('EventOrganiser', "Event Organiser must be from 4 to 50 characters ").isLength({
        min: 4,
        max: 50
    })

    // for the Date of Event 
   
    
    req.check('DateOfEvent',"Date must not be empty").notEmpty()
    

    //for the Event Description
    req.check('EventDescription', "Write the description of the event ").notEmpty()
    req.check('EventOrganiser', "Event Description must be from 4 to 2000 characters").isLength({
        min: 4,
        max: 2000
    })

    //check for any errors
    const errors = req.validationErrors();

    //show the first error when there is multiple errrors
    if(errors){
        const firstError = errors.map(error => error.msg)[0]
        return res.status(400).json({
            error: firstError
        })
    }

    //proceed to next middleware
    next()
}

module.exports = {
    createEventValidator,
   
}