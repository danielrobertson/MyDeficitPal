var mfp = require('mfp');
var prompt = require('prompt'); 

// get myfitnesspal username and date range 
prompt.start();
prompt.get([{
    name: 'username',
    description: 'MyFitnessPal username',
    required: true
}, {
    name: 'begin',
    description: 'begin date range (yyyy-mm-dd)',
    required: true
}, {
    name: 'end',
    description: 'end date range (yyyy-mm-dd)',
    required: true
}], function (err, result) {
    // find user 
    mfp.diaryStatusCheck(result.username, function (status) {
        if (status !== 'public') {
            console.log('Please update Diary Sharing to \'Public\' in Diary Settings.'); 
            return;
        }
    });

    // get calories consumed 
    mfp.fetchDateRange(result.username, result.begin, result.end, ['calories'], function (response) {
    	var totalCalories = 0, days = 0; 
    	response.data.forEach(function(nutrition){
        	console.log(nutrition.calories + ' calories consumed on ' + nutrition.date);   
        	totalCalories += nutrition.calories; 
        	++days; 
    	});

    	var averageCaloriesForRange = totalCalories / days; 
    	console.log('Average calories consumed per day for given range: ' + averageCaloriesForRange); 
    });
});
