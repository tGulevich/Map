"use strict";
(function () {
    var MAP_SRC = 'img/map.png';
    var TIME_INTERVAL = 2500;
    var ZONE_ONE_COLOR = [161,34,234];
    var ZONE_TWO_COLOR = [0,129,241];
    var ZONE_THREE_COLOR = [255,41,83];
    var ZONE_FOUR_COLOR = [255,115,70];
    var ZONE_FIVE_COLOR = [255,186,61];
    var ZONE_SIX_COLOR = [104,220,0];
    var ZONE_SEVEN_COLOR = [0,202,148];
    var ZONE_EIGHT_COLOR = [0,185,247];

    var mapImage = document.querySelector('#mapImage');
    var value = document.querySelector('#value');
    var point = document.querySelector('.point');
    var line = document.querySelector('.line');
    var points = document.querySelectorAll('.point');
    var lines = document.querySelectorAll('.line');

    value.textContent = '100';


    // Change color of zone
    var changeColorPixel = function (data, newColor, oldColor1, oldColor2, oldColor3, oldColor4, oldColor5, oldColor6, oldColor7, oldColor8)
    {
        var img, cnv, ctx, imgData;
        
    
        img = document.createElement('img');
        img.src = data;
    
        cnv = document.createElement('canvas');
        
        //img.width = img.naturalWidth;
        cnv.width = img.width || img.naturalWidth; 
        cnv.height = img.height;
    
        ctx = cnv.getContext('2d');
        
        ctx.drawImage(img, 0, 0);
    
        imgData = ctx.getImageData(0, 0, cnv.width, cnv.height);
        data = imgData.data;
    
        
        for(var x = 0, len = data.length; x < len; x += 4) {   
            

            if((data[x] == oldColor1[0]) &&
                (data[x + 1] >= oldColor1[1]-15 && data[x + 1] <= oldColor1[1]+15) &&
                (data[x + 2] >= oldColor1[2]-15 && data[x + 2] <= oldColor1[2]+15))
            {   
                data[x] = newColor[0];
                data[x + 1] = newColor[1];
                data[x + 2] = newColor[2];

            }

            if((data[x] == oldColor2[0]) &&
                (data[x + 1] >= oldColor2[1]-15 && data[x + 1] <= oldColor2[1]+15) &&
                (data[x + 2] >= oldColor2[2]-15 && data[x + 2] <= oldColor2[2]+15))
            {   
                data[x] = newColor[0];
                data[x + 1] = newColor[1];
                data[x + 2] = newColor[2];

            }

            if((data[x] == oldColor3[0]) &&
                (data[x + 1] >= oldColor3[1]-15 && data[x + 1] <= oldColor3[1]+15) &&
                (data[x + 2] >= oldColor3[2]-15 && data[x + 2] <= oldColor3[2]+15))
            {   
                data[x] = newColor[0];
                data[x + 1] = newColor[1];
                data[x + 2] = newColor[2];

            }

            if((data[x] == oldColor4[0]) &&
                (data[x + 1] >= oldColor4[1]-15 && data[x + 1] <= oldColor4[1]+15) &&
                (data[x + 2] >= oldColor4[2]-15 && data[x + 2] <= oldColor4[2]+15))
            {   
                data[x] = newColor[0];
                data[x + 1] = newColor[1];
                data[x + 2] = newColor[2];

            }

            if((data[x] == oldColor5[0]) &&
                (data[x + 1] >= oldColor5[1]-15 && data[x + 1] <= oldColor5[1]+15) &&
                (data[x + 2] >= oldColor5[2]-15 && data[x + 2] <= oldColor5[2]+15))
            {   
                data[x] = newColor[0];
                data[x + 1] = newColor[1];
                data[x + 2] = newColor[2];

            }

            if((data[x] == oldColor6[0]) &&
                (data[x + 1] >= oldColor6[1]-15 && data[x + 1] <= oldColor6[1]+15) &&
                (data[x + 2] >= oldColor6[2]-15 && data[x + 2] <= oldColor6[2]+15))
            {   
                data[x] = newColor[0];
                data[x + 1] = newColor[1];
                data[x + 2] = newColor[2];

            }

            if((data[x] == oldColor7[0]) &&
                (data[x + 1] >= oldColor7[1]-15 && data[x + 1] <= oldColor7[1]+15) &&
                (data[x + 2] >= oldColor7[2]-15 && data[x + 2] <= oldColor7[2]+15))
            {   
                data[x] = newColor[0];
                data[x + 1] = newColor[1];
                data[x + 2] = newColor[2];

            }

            if((data[x] == oldColor8[0]) &&
                (data[x + 1] >= oldColor8[1]-15 && data[x + 1] <= oldColor8[1]+15) &&
                (data[x + 2] >= oldColor8[2]-15 && data[x + 2] <= oldColor8[2]+15))
            {   
                data[x] = newColor[0];
                data[x + 1] = newColor[1];
                data[x + 2] = newColor[2];

            }

        }

        ctx.putImageData(imgData, 0, 0);
        return cnv.toDataURL();
    }


    // Change color of all map
    var changeColorImage = function (data, newColor) {
        var img, cnv, ctx, imgData;
    
        img = document.createElement('img');
        img.src = data;
    
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
    }

    
    // Inactive progress bar

    var resetProgress = function () {
        for (var i = 0; i < points.length; i++) {
            points[i].classList.add('point--inactive');
        }
        mapImage.src = changeColorImage(MAP_SRC, [173,173,173]);
        
    }

    resetProgress();

    


    var loadMap = function() {

        var turnOnEighthZone = function () {
            function move() {
                var yyy = document.querySelector('.line-8.line--colored');
                var width = 0;
                var id = setInterval(frame, 15);
                function frame() {
                    if (width >= 100) {
                        clearInterval(id);
                        callback();
                    } else {
                        width++; 
                        yyy.style.width = width + '%'; 
                        value.textContent = +value.textContent + 1;
                    }
                }
    
            }
    
            move();
    
            function callback() {
                var zoneTwo = document.querySelector('.point-8');
                zoneTwo.classList.remove('point--inactive');
            
                mapImage.src = MAP_SRC;
            
            };
    
        };
        

        var turnOnSeventhZone = function () {
            function move() {
                var yyy = document.querySelector('.line-7.line--colored');
                var width = 0;
                var id = setInterval(frame, 15);
                function frame() {
                    if (width >= 100) {
                        clearInterval(id);
                        callback();
                        turnOnEighthZone();
                    } else {
                        width++; 
                        yyy.style.width = width + '%';
                        value.textContent = +value.textContent + 1;
                    }
                }
    
            }
    
            move();
    
            function callback() {
                var zoneTwo = document.querySelector('.point-7');
                zoneTwo.classList.remove('point--inactive');
            
                mapImage.src = changeColorPixel(MAP_SRC, [173,173,173],
                    ZONE_EIGHT_COLOR, 0, 0, 0, 0, 0, 0, 0);
            
            };
    
        };
        

        var turnOnSixthZone = function () {
            function move() {
                var yyy = document.querySelector('.line-6.line--colored');
                var width = 0;
                var id = setInterval(frame, 15);
                function frame() {
                    if (width >= 100) {
                        clearInterval(id);
                        callback();
                        turnOnSeventhZone();
                    } else {
                        width++; 
                        yyy.style.width = width + '%';
                        value.textContent = +value.textContent + 1;
                    }
                }
    
            }
    
            move();
    
            function callback() {
                var zoneTwo = document.querySelector('.point-6');
                zoneTwo.classList.remove('point--inactive');
            
                mapImage.src = changeColorPixel(MAP_SRC, [173,173,173],
                    ZONE_SEVEN_COLOR, ZONE_EIGHT_COLOR, 0, 0, 0, 0, 0, 0);
            
            };
    
        };
        

        var turnOnFifthZone = function () {
            function move() {
                var yyy = document.querySelector('.line-5.line--colored');
                var width = 0;
                var id = setInterval(frame, 15);
                function frame() {
                    if (width >= 100) {
                        clearInterval(id);
                        callback();
                        turnOnSixthZone();
                    } else {
                        width++; 
                        yyy.style.width = width + '%';
                        value.textContent = +value.textContent + 1;
                    }
                }
    
            }
    
            move();
    
            function callback() {
                var zoneTwo = document.querySelector('.point-5');
                zoneTwo.classList.remove('point--inactive');
            
                mapImage.src = changeColorPixel(MAP_SRC, [173,173,173],
                    ZONE_SIX_COLOR, ZONE_SEVEN_COLOR, ZONE_EIGHT_COLOR, 0, 0, 0, 0, 0);
            
            };
    
        };
        

        var turnOnFourthZone = function () {
            function move() {
                var yyy = document.querySelector('.line-4.line--colored');
                var width = 0;
                var id = setInterval(frame, 15);
                function frame() {
                    if (width >= 100) {
                        clearInterval(id);
                        callback();
                        turnOnFifthZone();
                    } else {
                        width++; 
                        yyy.style.width = width + '%';
                        value.textContent = +value.textContent + 1;
                    }
                }
    
            }
    
            move();
    
            function callback() {
                var zoneTwo = document.querySelector('.point-4');
                zoneTwo.classList.remove('point--inactive');
            
                mapImage.src = changeColorPixel(MAP_SRC, [173,173,173],
                    ZONE_FIVE_COLOR, ZONE_SIX_COLOR, ZONE_SEVEN_COLOR, ZONE_EIGHT_COLOR, 0, 0, 0, 0);
            
            };
    
        };
        
        
        var turnOnThirdZone = function () {
            function move() {
                var yyy = document.querySelector('.line-3.line--colored');
                var width = 0;
                var id = setInterval(frame, 15);
                function frame() {
                    if (width >= 100) {
                        clearInterval(id);
                        callback();
                        turnOnFourthZone();
                    } else {
                        width++; 
                        yyy.style.width = width + '%';
                        value.textContent = +value.textContent + 1; 
                    }
                }
    
            }
    
            move();
    
            function callback() {
                var zoneTwo = document.querySelector('.point-3');
                zoneTwo.classList.remove('point--inactive');
            
                mapImage.src = changeColorPixel(MAP_SRC, [173,173,173],
                    ZONE_FOUR_COLOR, ZONE_FIVE_COLOR, ZONE_SIX_COLOR, ZONE_SEVEN_COLOR, ZONE_EIGHT_COLOR, 0, 0, 0);
            
            };
    
        };
        
    
        var turnOnSecondZone = function () {
            function move() {
                var yyy = document.querySelector('.line-2.line--colored');
                var width = 0;
                var id = setInterval(frame, 15);
                function frame() {
                    if (width >= 100) {
                        clearInterval(id);
                        callback();
                        turnOnThirdZone();
                    } else {
                        width++; 
                        yyy.style.width = width + '%';
                        value.textContent = +value.textContent + 1;
                    }
                }
    
            }
    
            move();
    
            function callback() {
                var zoneTwo = document.querySelector('.point-2');
                zoneTwo.classList.remove('point--inactive');
            
                mapImage.src = changeColorPixel(MAP_SRC, [173,173,173],
                    ZONE_THREE_COLOR, ZONE_FOUR_COLOR, ZONE_FIVE_COLOR, ZONE_SIX_COLOR, ZONE_SEVEN_COLOR, ZONE_EIGHT_COLOR, 0, 0);
            
            };
        };

        var turnOnFirstZone = function () {
            var zoneOne = document.querySelector('.point-1');
            zoneOne.classList.remove('point--inactive');
            
            mapImage.src = '' + changeColorPixel(MAP_SRC, [173,173,173],
                ZONE_TWO_COLOR, ZONE_THREE_COLOR, ZONE_FOUR_COLOR, ZONE_FIVE_COLOR, ZONE_SIX_COLOR, ZONE_SEVEN_COLOR, ZONE_EIGHT_COLOR, 0);
            
            turnOnSecondZone();
        }();

    }();


})();