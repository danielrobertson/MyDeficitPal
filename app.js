var mfp = require('mfp');
var prompt = require('prompt');

// get myfitnesspal username and date range 
if (process.argv.length !== 5) {
    console.log("Usage: node app.js username begin_date end_date\nExample: node app.js losingweight123 2016-05-01 2016-05-08");
    return;
}

var username = process.argv[2];
var begin = process.argv[3];
var end = process.argv[4];
// find user 
mfp.diaryStatusCheck(username, function(status) {
    if (status !== 'public') {
        console.log('Please update Diary Sharing to \'Public\' in Diary Settings.');
        return;
    }
});

// get calories consumed 
mfp.fetchDateRange(username, begin, end, ['calories'], function(response) {
    var totalCalories = 0;
    var days = 0;
    response.data.forEach(function(nutrition) {
        console.log(nutrition.calories + ' calories consumed on ' + nutrition.date);
        totalCalories += nutrition.calories;
        ++days;
    });

    var averageCaloriesForRange = totalCalories / days;
    console.log('Average calories consumed per day for given range: ' + averageCaloriesForRange);
});