const whitelistedHosts = ["http://127.0.0.1:5500"];
const rateLimits = {
    request: 0.16,
}

let cooldown = new Map();

module.exports = (req, res, next) => {

    const origin = req.get("origin");

    if(!whitelistedHosts.includes(origin)) {
        return res.status(302).send("Authentication Failed");
    }

    if(cooldown.has(origin)) {
        return res.send("Too many request");
    }

    cooldown.set(origin, Date.now());
    setTimeout(() => {
        cooldown.delete(origin);
    }, rateLimits.request * 1000);

    next();
}