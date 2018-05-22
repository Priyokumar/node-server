const express = require("express");

const router = express.Router();

router.get("/", (req, res, next) => {
    res.status(200).json({
        message: "get works!"
    });
});

router.get("/:id/view", (req, res, next) => {

    var id = req.params.id;

    if (id == 23) {
        res.status(200).json({
            message: req.params.id
        });
    } else {
        res.status(200).json({
            message: "ID you are sending is wrong"
        });
    }
});

router.post("/", (req, res, next) => {

    const product = {
        name : req.body.name,
        price : req.body.price
    }

    res.status(200).json({
        message: "post works!",
        body : product
    });
});

module.exports = router;