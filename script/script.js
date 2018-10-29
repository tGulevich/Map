"use strict";
(function () {
    var MAP_SRC = 'img/map.png';
    var TIME_INTERVAL = 25;
    var STEP_MLN = 100;
    var ZONE_ONE_COLOR = [161,34,234];
    var ZONE_TWO_COLOR = [0,129,241];
    var ZONE_THREE_COLOR = [255,41,83];
    var ZONE_FOUR_COLOR = [255,115,70];
    var ZONE_FIVE_COLOR = [255,186,61];
    var ZONE_SIX_COLOR = [104,220,0];
    var ZONE_SEVEN_COLOR = [0,202,148];
    var ZONE_EIGHT_COLOR = [0,185,247];
    var ZONE_INACTIVE_COLOR = [173,173,173]

    var mapImage = document.querySelector('#mapImage');
    var value = document.querySelector('#value');
    var points = document.querySelectorAll('.point');
    var lines = document.querySelectorAll('.line--colored');

    // Change color of zone
    var changeColorOfZone = function (data, newColor, oldColor1, oldColor2, oldColor3, oldColor4, oldColor5, oldColor6, oldColor7, oldColor8)
    {
        var img = document.createElement('img');
        img.src = data;
        
        img.onload = function() {
            mapImage.src = draw(this);
        };
        
        function draw(img) {

            var cnv, ctx, imgData;
        
            cnv = document.createElement('canvas');
            cnv.width = img.width; 
            cnv.height = img.height;
        
            ctx = cnv.getContext('2d');
            ctx.drawImage(img, 0, 0);
            imgData = ctx.getImageData(0, 0, cnv.width, cnv.height);
            data = imgData.data;
        
            for(var x = 0, len = data.length; x < len; x += 4) {   

                if(
                    ((data[x] == oldColor1[0]) &&
                    (data[x + 1] >= oldColor1[1]-15 && data[x + 1] <= oldColor1[1]+15) &&
                    (data[x + 2] >= oldColor1[2]-15 && data[x + 2] <= oldColor1[2]+15)) ||
                    ((data[x] == oldColor2[0]) &&
                    (data[x + 1] >= oldColor2[1]-15 && data[x + 1] <= oldColor2[1]+15) &&
                    (data[x + 2] >= oldColor2[2]-15 && data[x + 2] <= oldColor2[2]+15)) ||
                    ((data[x] == oldColor3[0]) &&
                    (data[x + 1] >= oldColor3[1]-15 && data[x + 1] <= oldColor3[1]+15) &&
                    (data[x + 2] >= oldColor3[2]-15 && data[x + 2] <= oldColor3[2]+15)) ||
                    ((data[x] == oldColor4[0]) &&
                    (data[x + 1] >= oldColor4[1]-15 && data[x + 1] <= oldColor4[1]+15) &&
                    (data[x + 2] >= oldColor4[2]-15 && data[x + 2] <= oldColor4[2]+15)) ||
                    ((data[x] == oldColor5[0]) &&
                    (data[x + 1] >= oldColor5[1]-15 && data[x + 1] <= oldColor5[1]+15) &&
                    (data[x + 2] >= oldColor5[2]-15 && data[x + 2] <= oldColor5[2]+15)) ||
                    ((data[x] == oldColor6[0]) &&
                    (data[x + 1] >= oldColor6[1]-15 && data[x + 1] <= oldColor6[1]+15) &&
                    (data[x + 2] >= oldColor6[2]-15 && data[x + 2] <= oldColor6[2]+15)) ||
                    ((data[x] == oldColor7[0]) &&
                    (data[x + 1] >= oldColor7[1]-15 && data[x + 1] <= oldColor7[1]+15) &&
                    (data[x + 2] >= oldColor7[2]-15 && data[x + 2] <= oldColor7[2]+15)) ||
                    ((data[x] == oldColor8[0]) &&
                    (data[x + 1] >= oldColor8[1]-15 && data[x + 1] <= oldColor8[1]+15) &&
                    (data[x + 2] >= oldColor8[2]-15 && data[x + 2] <= oldColor8[2]+15)))
                {   
                    data[x] = newColor[0];
                    data[x + 1] = newColor[1];
                    data[x + 2] = newColor[2];
                }
            }

            ctx.putImageData(imgData, 0, 0);
            return cnv.toDataURL();
        }
    };


    // Change color of all map
    var changeColorOfAllMap = function (data, newColor) {
        var img, cnv, ctx, imgData;
    
        img = document.createElement('img');
        img.src = data;

        img.onload = function() {
            mapImage.src = draw(this);
        };
        
        function draw(img) {
            cnv = document.createElement('canvas');
            cnv.width = img.width;
            cnv.height = img.height;
        
            ctx = cnv.getContext('2d');
            ctx.drawImage(img, 0, 0);
            imgData = ctx.getImageData(0, 0, cnv.width, cnv.height)
            data = imgData.data;
        
            for(var x = 0, len = data.length; x < len; x += 4) {   
                
                if(data[x + 3] > 0) {   
                    data[x] = newColor[0];
                    data[x + 1] = newColor[1];
                    data[x + 2] = newColor[2];
                } 
    
            }
    
            ctx.putImageData(imgData, 0, 0);
            return cnv.toDataURL();
        };
        
    }

    
    // Inactive progress bar
    var resetProgress = function () {
        value.textContent = '0';

        for (var i = 0; i < points.length; i++) {
            points[i].classList.add('point--inactive');
        }

        for (var j = 0; j < lines.length; j++) {
            lines[j].style.width = 0;
        }
        changeColorOfAllMap(MAP_SRC, ZONE_INACTIVE_COLOR);
        
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
                var id = setInterval(progress, TIME_INTERVAL);
                function progress() {
                    if (width >= 100) {
                        clearInterval(id);
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
                var zoneTwo = document.querySelector('.point-8');
                zoneTwo.classList.remove('point--inactive');
                value.textContent = +value.textContent + STEP_MLN; 
                mapImage.src = MAP_SRC;
            };
    
        };
        

        var turnOnSeventhZone = function () {

            if (stopFlag == false) {
                return false;
            }

            function move() {
                var progressBar = document.querySelector('.line-7.line--colored');
                var width = 0;
                var id = setInterval(progress, TIME_INTERVAL);
                function progress() {
                    if (width >= 100) {
                        clearInterval(id);
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
                var zoneTwo = document.querySelector('.point-7');
                zoneTwo.classList.remove('point--inactive');

                changeColorOfZone(MAP_SRC, ZONE_INACTIVE_COLOR,
                    ZONE_EIGHT_COLOR, 0, 0, 0, 0, 0, 0, 0);

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
                var id = setInterval(progress, TIME_INTERVAL);
                function progress() {
                    if (width >= 100) {
                        clearInterval(id);
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
                var zoneTwo = document.querySelector('.point-6');
                zoneTwo.classList.remove('point--inactive');
            
                changeColorOfZone(MAP_SRC, ZONE_INACTIVE_COLOR,
                    ZONE_SEVEN_COLOR, ZONE_EIGHT_COLOR, 0, 0, 0, 0, 0, 0);
            
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
                var id = setInterval(progress, TIME_INTERVAL);
                function progress() {
                    if (width >= 100) {
                        clearInterval(id);
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
                var zoneTwo = document.querySelector('.point-5');
                zoneTwo.classList.remove('point--inactive');
            
                changeColorOfZone(MAP_SRC, ZONE_INACTIVE_COLOR,
                    ZONE_SIX_COLOR, ZONE_SEVEN_COLOR, ZONE_EIGHT_COLOR, 0, 0, 0, 0, 0);
                    
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
                var id = setInterval(progress, TIME_INTERVAL);
                function progress() {
                    if (width >= 100) {
                        clearInterval(id);
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
                var zoneTwo = document.querySelector('.point-4');
                zoneTwo.classList.remove('point--inactive');
            
                changeColorOfZone(MAP_SRC, ZONE_INACTIVE_COLOR,
                    ZONE_FIVE_COLOR, ZONE_SIX_COLOR, ZONE_SEVEN_COLOR, ZONE_EIGHT_COLOR, 0, 0, 0, 0);
                
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
                var id = setInterval(progress, TIME_INTERVAL);
                function progress() {
                    if (width >= 100) {
                        clearInterval(id);
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
                var zoneTwo = document.querySelector('.point-3');
                zoneTwo.classList.remove('point--inactive');
            
                changeColorOfZone(MAP_SRC, ZONE_INACTIVE_COLOR,
                    ZONE_FOUR_COLOR, ZONE_FIVE_COLOR, ZONE_SIX_COLOR, ZONE_SEVEN_COLOR, ZONE_EIGHT_COLOR, 0, 0, 0);
                
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
                var id = setInterval(progress, TIME_INTERVAL);
                function progress() {
                    if (width >= 100) {
                        clearInterval(id);
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
                var zoneTwo = document.querySelector('.point-2');
                zoneTwo.classList.remove('point--inactive');
            
                changeColorOfZone(MAP_SRC, ZONE_INACTIVE_COLOR,
                    ZONE_THREE_COLOR, ZONE_FOUR_COLOR, ZONE_FIVE_COLOR, ZONE_SIX_COLOR, ZONE_SEVEN_COLOR, ZONE_EIGHT_COLOR, 0, 0);
            
                value.textContent = +value.textContent + STEP_MLN;
            };
        };

        var turnOnFirstZone = function () {
            if (stopFlag == false) {
                return false;
            }
            resetProgress();
            var zoneOne = document.querySelector('.point-1');
            zoneOne.classList.remove('point--inactive');
            
            changeColorOfZone(MAP_SRC, ZONE_INACTIVE_COLOR,
                ZONE_TWO_COLOR, ZONE_THREE_COLOR, ZONE_FOUR_COLOR, ZONE_FIVE_COLOR, ZONE_SIX_COLOR, ZONE_SEVEN_COLOR, ZONE_EIGHT_COLOR, 0);
            
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

})();