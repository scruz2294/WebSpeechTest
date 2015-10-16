var myApp = angular.module('app', []);

myApp.controller('MainCtrl', function($scope) {
	var recognizing = false;
	var final_transcript = '';
	var ignore_onend;
	var start_timestamp;

	var recognition = new webkitSpeechRecognition();
	recognition.continuous = true;
	recognition.interimResults = true;

	recognition.onstart = function() {
		recognizing = true;
	};

	recognition.onresult = function(event) {
		var interim_transcript = '';
		for(var i = event.resultIndex; i < event.results.legnth; ++i) {
			if(event.results[i].isFinal) {
				final_transcript += event.results[i][0].transcript;
			} else {
				interim_transcript += event.results[i][0]
			}
		}
	};

	recognition.onerror = function(event) {
		console.log("something went wrong");
	};

	recognition.onend = function() {
		recognizing = false;
	};

	$scope.startRecord = function(event) {
		console.log("have pressed start button");
		recognition.start();
		ignore_onend = false;
	};
});