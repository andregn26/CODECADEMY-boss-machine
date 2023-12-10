const checkMillionDollarIdea = (req, res, next) => {
	console.log("hi from million dollars");
	const numWeeks = req.body.numWeeks;
	const weeklyRevenue = req.body.weeklyRevenue;
	const total = numWeeks * weeklyRevenue;
	if (!numWeeks || !weeklyRevenue || isNaN(total) || total < 1000000) {
		res.status(400).send();
	} else {
		next();
	}
};

// Leave this exports assignment so that the function can be used elsewhere
module.exports = checkMillionDollarIdea;
