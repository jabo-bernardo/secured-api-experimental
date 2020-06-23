const { Router } = require("express");
const router = new Router();

router.get("/", (req, res) => {
    res.send("Hello :D");
});

module.exports = router;