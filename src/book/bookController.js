

const createBook = (req, res, next)=>{

    res.status(201).send({
        "message" : "Book Created",
    });
}


export { createBook };