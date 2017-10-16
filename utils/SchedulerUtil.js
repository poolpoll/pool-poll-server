/**
 * Scheduler Util
 */
var schedule = require('node-schedule');

module.exports = function(db) {
	/**
	 * Poll Expire Job
	 * 10분에 한번씩 만료된 설문을 찾아 Deactivate
	 */
	var pollDeactivateJob = schedule.scheduleJob('*/10 * * * *', function() {
		var currentDate = new Date();
		var isoCurrentDate = currentDate.toISOString();
		var today = isoCurrentDate.slice(0, 10);
		var expiredPollListIds = [];

		console.log('');
		console.log('**************************************');
		console.log('Poll Deactivation Scheduler is Running');
		console.log('Find out Expired Polls');
		console.log('Scheduler lanched at ' + currentDate.toDateString() + ' ' + currentDate.toTimeString());
		console.log('**************************************');
		console.log('');		

		db.Poll.findAll({
			where: {
				expireDate: today,
				activeFlag: true
			}
		}).then(todayPolls => {
			if(todayPolls && todayPolls.length > 0) {
				todayPolls.forEach(function(todayPoll) {
					var pollExpireTime = todayPoll.expireTime.split(':');
					var pollExpireHour = pollExpireTime[0];
					var pollExpireMinute = pollExpireTime[1];

					var pollExpireDateTime = new Date();
					pollExpireDateTime.setHours(pollExpireHour);
					pollExpireDateTime.setMinutes(pollExpireMinute);
					
					if(currentDate > pollExpireDateTime) {
						expiredPollListIds.push(todayPoll.id);
					}
				});

				expiredPollListIds.forEach(function(expiredPollId) {

					console.log('');
					console.log('**************************************');
					console.log('Expired target Poll IDs: ', expiredPollId);
					console.log('**************************************');
					console.log('');

					db.Poll.update({
						activeFlag: false
					}, {
						where: {
							id: expiredPollId
						}
					}).then(poll => {
						console.log('Poll ID ' + expiredPollId + ' deactived!');
					}).catch(error => {
						throw error;
					})
				});				
			} else {
				console.log('');
				console.log('**************************************');
				console.log('There is no Expired poll!');
				console.log('**************************************');
				console.log('');
			}
		})
	});
};