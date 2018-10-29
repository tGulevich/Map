"use strict";
(function () {
    var TIME_INTERVAL = 25;
    var STEP_MLN = 100;
    var ZONE_ONE_COLOR = '#8A27E5';
    var ZONE_TWO_COLOR = '#2F80ED';
    var ZONE_THREE_COLOR = '#E82D53';
    var ZONE_FOUR_COLOR = '#F2724A';
    var ZONE_FIVE_COLOR = '#F2B94A';
    var ZONE_SIX_COLOR = '#94DB21';
    var ZONE_SEVEN_COLOR = '#1AC995';
    var ZONE_EIGHT_COLOR = '#4CB8F5';
    var COLOR_INACTIVE = 'rgb(173,173,173)';

    var value = document.querySelector('#value');
    var points = document.querySelectorAll('.point');
    var lines = document.querySelectorAll('.line--colored');


    
    var svgDoc;
    var mySVG = document.querySelector('#map');
    mySVG.onload = function() {
        svgDoc = this.contentDocument;
        var zoneOne = svgDoc.querySelectorAll('#usa path');
        var zoneTwo = svgDoc.querySelectorAll('#europ path');
        var zoneThree = svgDoc.querySelectorAll('#sng path');
        var zoneFour = svgDoc.querySelectorAll('#asia path');
        var zoneFive = svgDoc.querySelectorAll('#africa path');
        var zoneSix = svgDoc.querySelectorAll('#oceania path');
        var zoneSeven = svgDoc.querySelectorAll('#australia path');
        var zoneEight = svgDoc.querySelectorAll('#lamerica path');
    
        // Change color of all map
    
        var changeMapColor = function () {
            var el = svgDoc.querySelectorAll('path');
            for (var i = 0; i < el.length; i++) {
                el[i].style.fill = COLOR_INACTIVE;
            }
        };
      
        var changeZoneColor = function(zone, color) {
            for (var i = 0; i < zone.length; i++) {
                zone[i].style.fill = color;
            }
        };
        
        // Inactive progress bar
        var resetProgress = function () {
            value.textContent = '0';

            for (var i = 0; i < points.length; i++) {
                points[i].classList.add('point--inactive');
            }

            for (var j = 0; j < lines.length; j++) {
                lines[j].style.width = 0;
            }
            changeMapColor();
        };

        // Map loading
        
        var Map = function() {

            var stopFlag = true;
            if (stopFlag == false) {
                return false;
            }

            // Methods
            this.start = function () {
                turnOnFirstZone();
            };
            this.stop = function () {
                stopFlag = false;
            };
            this.getCurrentPointValue = function () {
                console.log(value.textContent);
                return value.textContent;
            };

            // Loading zones
            var turnOnEighthZone = function () {

                if (stopFlag == false) {
                    return false;
                }

                function move() {
                    var progressBar = document.querySelector('.line-8.line--colored');
                    var width = 0;
                    var progressAnimation = setInterval(progress, TIME_INTERVAL);
                    function progress() {
                        if (width >= 100) {
                            clearInterval(progressAnimation);
                            displayZone();
                            setTimeout(function() {
                                turnOnFirstZone();
                            },2500);
                        } else {
                            width++; 
                            progressBar.style.width = width + '%';
                        }
                    }
        
                }
                move();
        
                function displayZone() {
                    var zonePoint = document.querySelector('.point-8');
                    zonePoint.classList.remove('point--inactive');
                    value.textContent = +value.textContent + STEP_MLN; 

                    changeZoneColor(zoneEight, ZONE_EIGHT_COLOR);
                };
            };
        
            var turnOnSeventhZone = function () {

                if (stopFlag == false) {
                    return false;
                }

                function move() {
                    var progressBar = document.querySelector('.line-7.line--colored');
                    var width = 0;
                    var progressAnimation = setInterval(progress, TIME_INTERVAL);
                    function progress() {
                        if (width >= 100) {
                            clearInterval(progressAnimation);
                            displayZone();
                            turnOnEighthZone();
                        } else {
                            width++; 
                            progressBar.style.width = width + '%';
                        }
                    }
                }
        
                move();
        
                function displayZone() {
                    var zonePoint = document.querySelector('.point-7');
                    zonePoint.classList.remove('point--inactive');

                    changeZoneColor(zoneSeven, ZONE_SEVEN_COLOR);
                    value.textContent = +value.textContent + STEP_MLN; 
                };
            };
            

            var turnOnSixthZone = function () {

                if (stopFlag == false) {
                    return false;
                }
                function move() {
                    var progressBar = document.querySelector('.line-6.line--colored');
                    var width = 0;
                    var progressAnimation = setInterval(progress, TIME_INTERVAL);
                    function progress() {
                        if (width >= 100) {
                            clearInterval(progressAnimation);
                            displayZone();
                            turnOnSeventhZone();
                        } else {
                            width++; 
                            progressBar.style.width = width + '%';
                        }
                    }
        
                }
        
                move();
        
                function displayZone() {
                    var zonePoint = document.querySelector('.point-6');
                    zonePoint.classList.remove('point--inactive');

                    changeZoneColor(zoneSix, ZONE_SIX_COLOR);
                    value.textContent = +value.textContent + STEP_MLN;                     
                };
        
            };

            var turnOnFifthZone = function () {

                if (stopFlag == false) {
                    return false;
                }
                function move() {
                    var progressBar = document.querySelector('.line-5.line--colored');
                    var width = 0;
                    var progressAnimation = setInterval(progress, TIME_INTERVAL);
                    function progress() {
                        if (width >= 100) {
                            clearInterval(progressAnimation);
                            displayZone();
                            turnOnSixthZone();
                        } else {
                            width++; 
                            progressBar.style.width = width + '%';
                        }
                    }
        
                }
        
                move();
        
                function displayZone() {
                    var zonePoint = document.querySelector('.point-5');
                    zonePoint.classList.remove('point--inactive');

                    changeZoneColor(zoneFive, ZONE_FIVE_COLOR);   
                    value.textContent = +value.textContent + STEP_MLN; 
                };
            };
            

            var turnOnFourthZone = function () {
                if (stopFlag == false) {
                    return false;
                }

                function move() {
                    var progressBar = document.querySelector('.line-4.line--colored');
                    var width = 0;
                    var progressAnimation = setInterval(progress, TIME_INTERVAL);
                    function progress() {
                        if (width >= 100) {
                            clearInterval(progressAnimation);
                            displayZone();
                            turnOnFifthZone();
                        } else {
                            width++; 
                            progressBar.style.width = width + '%';
                        }
                    }
        
                }
        
                move();
        
                function displayZone() {
                    var zonePoint = document.querySelector('.point-4');
                    zonePoint.classList.remove('point--inactive');

                changeZoneColor(zoneFour, ZONE_FOUR_COLOR);
                    value.textContent = +value.textContent + STEP_MLN; 
                };
            };
            
            
            var turnOnThirdZone = function () {

                if (stopFlag == false) {
                    return false;
                }

                function move() {
                    var progressBar = document.querySelector('.line-3.line--colored');
                    var width = 0;
                    var progressAnimation = setInterval(progress, TIME_INTERVAL);
                    function progress() {
                        if (width >= 100) {
                            clearInterval(progressAnimation);
                            displayZone();
                            turnOnFourthZone();
                        } else {
                            width++; 
                            progressBar.style.width = width + '%';
                        }
                    }
                }
        
                move();
        
                function displayZone() {
                    var zonePoint = document.querySelector('.point-3');
                    zonePoint.classList.remove('point--inactive');

                changeZoneColor(zoneThree, ZONE_THREE_COLOR);
                    value.textContent = +value.textContent + STEP_MLN; 
                };
        
            };
            
        
            var turnOnSecondZone = function () {

                if (stopFlag == false) {
                    return false;
                }

                function move() {
                    var progressBar = document.querySelector('.line-2.line--colored');
                    var width = 0;
                    var progressAnimation = setInterval(progress, TIME_INTERVAL);
                    function progress() {
                        if (width >= 100) {
                            clearInterval(progressAnimation);
                            displayZone();
                            turnOnThirdZone();
                            
                        } else {
                            width++; 
                            progressBar.style.width = width + '%';
                        }
                    }
        
                }
        
                move();
        
                function displayZone() {
                    var zonePoint = document.querySelector('.point-2');
                    zonePoint.classList.remove('point--inactive');

                    changeZoneColor(zoneTwo, ZONE_TWO_COLOR);
                    value.textContent = +value.textContent + STEP_MLN;
                };
            };

            var turnOnFirstZone = function () {
                if (stopFlag == false) {
                    return false;
                }
                resetProgress();
                var zonePoint = document.querySelector('.point-1');
                zonePoint.classList.remove('point--inactive');

                changeZoneColor(zoneOne, ZONE_ONE_COLOR);
                value.textContent = STEP_MLN; 
                turnOnSecondZone();
            };

        };

        resetProgress();
        var map = new Map();
        setTimeout(function () {
        map.start();
        }, 1000);
        //map.stop();
        //map.getCurrentPointValue();
    };


})();