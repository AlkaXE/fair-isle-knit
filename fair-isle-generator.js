#!/bin/sh
':' //; exec "$(command -v nodejs || command -v node)" "$0" "$@"

//Parameters:

/*
specify:
colors = array of colors used in pattern array
numColors = length of colors array
patw = width of repeating section
patt = height of repeating section
patr = number of times pattern is repeated width wise
Height = number of times pattern is repeated height wise
pattern = 2D array of pattern using numbers from colors

Note: base color defaults to carrier 1
the index of each color is the carrier that uses it
*/

const carriers = ["1", "2", "3", "4", "5", "6", "7", "8", "9","10"];
const colors = [1,2,3];
const numColors = 3;
const patw = 14;
const patt = 15;
const patr = 3;
const Height = 3;
let pattern =  [[2,1,2,2,1,2,1,2,1,2,1,2,2,1],
                [1,2,1,1,2,1,2,1,2,1,2,1,1,2],
                [2,1,1,1,1,2,1,2,1,2,1,1,1,1],
                [1,1,1,2,1,1,2,1,2,1,1,2,1,1],
                [1,3,1,1,3,1,1,3,1,1,3,1,1,3],
                [3,1,3,1,1,3,3,3,3,3,1,1,3,1],
                [1,3,1,3,1,3,1,1,1,3,1,3,1,3],
                [2,1,2,1,1,2,1,1,1,2,1,1,1,1],
                [1,3,1,3,1,3,1,1,1,3,1,3,1,3],
                [3,1,3,1,1,3,3,3,3,3,1,1,3,1],
                [1,3,1,1,3,1,1,3,1,1,3,1,1,3],
                [1,1,1,2,1,1,2,1,2,1,1,2,1,1],
                [2,1,1,1,1,2,1,2,1,2,1,1,1,1],
                [1,2,1,1,2,1,2,1,2,1,2,1,1,2],
                [2,1,2,2,1,2,1,2,1,2,1,2,2,1],
                ];
const Width = patw * patr;

console.log(";!knitout-2");
console.log(";;Carriers: 1 2 3 4 5 6 7 8 9 10");


//Set up
let min = 1;
let max = min + Width - 1;
let baseCarrier = "1";
let usedColors = [];
for (let c = 0; c < numColors; ++c){
    usedColors.push(0);
}
let rowCount = 0;

//Alternating tucks cast-on :

console.log("inhook " + baseCarrier);
for (let n = max; n >= min; --n) {
	if ((max-n) % 2 == 0) {
		console.log("tuck - f" + n + " " + baseCarrier);
	}
}
for (let n = min; n <= max; ++n) {
	if ((max-n)%2 == 1) {
		console.log("tuck + f" + n + " " + baseCarrier);
	}
}
console.log("releasehook " + baseCarrier);
usedColors[0] = 2;
rowCount = 1;

//start bit

for (let r = 0; r <= 4; ++r){
    for (let n = max; n >= min; --n){
        console.log("knit - f" + n + " " + baseCarrier);
    }
    for (let n = min; n <= max; ++n){
        console.log("knit + f" + n + " " + baseCarrier);
    }
    rowCount += 1;
}


//Pattern Begins

for(let r=0; r <= Height; ++r){
    for (let h = 0; h < patt; ++h){
        if (rowCount%2 == 0){
            for (let c = 0; c < numColors; ++c){
                currCarrier = carriers[c];
                currColor = colors[c];
                for (let n = max; n>= min; n-= patw){
                    for (let i =0; i<patw; i++){
                        if(pattern[h][i] == currColor){
                            if (usedColors[c] == 0){
                                console.log("inhook " + currCarrier);
                                usedColors[c] = 1;
                            }
                            console.log("knit - f" + (n-i) + " " + currCarrier);
                        }
                    }
                }
                if (usedColors[c] == 1){
                    console.log("releasehook " + currCarrier);
                    usedColors[c] = 2;
                }
            }
            
        } else{
            for (let c = 0; c < numColors; ++c){
                currCarrier = carriers[c];
                currColor = colors[c];
                for (let n = min; n<= max; n+= patw){
                    for (let i =0; i<patw; i++){
                        if(pattern[h][patw-i-1] == currColor){
                            if (usedColors[c] == 0){
                                console.log("inhook " + currCarrier);
                                usedColors[c] = 1;
                            }
                            console.log("knit + f" + (n+i) + " " + currCarrier);
                        
                        }
                    }
                }
                if (usedColors[c] == 1){
                    console.log("releasehook " + currCarrier);
                    usedColors[c] = 2;
                }
            }
        }
        rowCount += 1;
    }
}

//end bit
if (rowCount %2 == 0){
    for (let r = 0; r <= 4; ++r){
        for (let n = max; n >= min; --n){
            console.log("knit - f" + n + " " + baseCarrier);
        }
        for (let n = min; n <= max; ++n){
            console.log("knit + f" + n + " " + baseCarrier);
        }
        rowCount += 1;
    }
}
else{
    for (let r = 0; r<= 4; ++r){
        for (let n = min; n <= max; ++n){
            console.log("knit + f" + n + " " + baseCarrier);
        }
        for (let n = max; n >= min; --n){
            console.log("knit - f" + n + " " + baseCarrier);    
        }
        rowCount += 1;
    }
}
    

//outhook all colors
for (let c = 0; c < numColors; ++c){
    currCarrier = carriers[c];
    console.log("outhook " + currCarrier);
}
