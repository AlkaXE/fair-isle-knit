#!/bin/sh
':' //; exec "$(command -v nodejs || command -v node)" "$0" "$@"

//Parameters:


const C1 = "3";
const C2 = "1";
const C3 = "2";
const patw = 14;
const patt = 15;
const patr = 6;
let pattern =  [[2,1,2,2,1,2,1,2,1,2,1,2,2,1],
                [1,2,1,1,2,1,2,1,2,1,2,1,1,2],
                [2,1,1,1,1,2,1,2,1,2,1,1,1,1],
                [1,1,1,2,1,1,2,1,2,1,1,2,1,1],
                [1,3,1,1,3,1,1,3,1,1,3,1,1,3],
                [3,1,3,1,1,3,3,3,3,3,1,1,3,1],
                [1,3,1,3,1,3,1,1,1,3,1,3,1,3],
                [2,1,2,1,1,2,1,2,1,2,1,1,1,1],
                [1,3,1,3,1,3,1,1,1,3,1,3,1,3],
                [3,1,3,1,1,3,3,3,3,3,1,1,3,1],
                [1,3,1,1,3,1,1,3,1,1,3,1,1,3],
                [1,1,1,2,1,1,2,1,2,1,1,2,1,1],
                [2,1,1,1,1,2,1,2,1,2,1,1,1,1],
                [1,2,1,1,2,1,2,1,2,1,2,1,1,2],
                [2,1,2,2,1,2,1,2,1,2,1,2,2,1],
                ];
const Width = patw * patr;
const Height = 6;


console.log(";!knitout-2");
console.log(";;Carriers: 1 2 3 4 5 6 7 8 9 10");

//Alternating tucks cast-on:

console.log("inhook " + C1);

let min = 1;
let max = min + Width - 1;

for (let n = max; n >= min; --n) {
	if ((max-n) % 2 == 0) {
		console.log("tuck - f" + n + " " + C1);
	}
}
for (let n = min; n <= max; ++n) {
	if ((max-n)%2 == 1) {
		console.log("tuck + f" + n + " " + C1);
	}
}

console.log("releasehook " + C1);

for (let r = 0; r <= 2; ++r){
    for (let n = max; n >= min; --n){
        console.log("knit - f" + n + " " + C1);
    }
    for (let n = min; n <= max; ++n){
        console.log("knit + f" + n + " " + C1);
    }
}

//secureing other colors

for (let n = max; n>= min; n-=3){
    console.log("knit - f" + n + " " + C1);
}
console.log("inhook " + C2);
for (let n = max-1; n>= min; n-=3){
    console.log("knit - f" + n + " " + C2);
}
console.log("releasehook " + C2);
console.log("inhook " + C3);
for (let n = max-2; n>= min; n-=3){
    console.log("knit - f" + n + " " + C3);
}
console.log("releasehook " + C3);


for (let n = min; n<= max; ++n){
    console.log("knit + f" + n + " " + C1);
}
for (let n = max; n>= min; --n){
    console.log("knit - f" + n + " " + C1);
}
for (let n = min; n<= max; ++n){
    console.log("knit + f" + n + " " + C1);
}

//Pattern Begins
//repeating 14*15 pieces

let rowCount = 1;

for(let r=0; r <= Height; ++r){
    for (let h = 0; h < patt; ++h){
        rowCount += 1;
        if (rowCount%2 == 0){ //is Minus row
            //place C1 stitches
            for (let n = max; n>= min; n-= patw){
                for (let i =0; i<patw; i++){
                    if(pattern[h][i] == 1){
                        console.log("knit - f" + (n-i) + " " + C1);
                    }
                }
            }
            //place C2 stitches
            for (let n = max; n>= min; n-= patw){
                for (let i =0; i<patw; i++){
                    if(pattern[h][i] == 2){
                        console.log("knit - f" + (n-i) + " " + C2);
                    }
                }
            }
            //place C3 stitches
            for (let n = max; n>= min; n-= patw){
                for (let i =0; i<patw; i++){
                    if(pattern[h][i] == 3){
                        console.log("knit - f" + (n-i) + " " + C3);
                    }
                }
            }
        } else{
            //place C1 stitches
            for (let n = min; n <= max; n+= patw){
                for (let i =0; i<patw; i++){
                    if(pattern[h][patw-i-1] == 1){
                        console.log("knit + f" + (n+i) + " " + C1);
                    }
                }
            }
            //place C2 stitches
            for (let n = min; n <= max; n+= patw){
                for (let i =0; i<patw; i++){
                    if(pattern[h][patw-i-1] == 2){
                        console.log("knit + f" + (n+i) + " " + C2);
                    }
                }
            }
            //place C3 stitches
            for (let n = min; n <= max; n+= patw){
                for (let i =0; i<patw; i++){
                    if(pattern[h][patw-i-1] == 3){
                        console.log("knit + f" + (n+i) + " " + C3);
                    }
                }
            }
        }
    }
}

//end bit

for (let n = min; n<= max; ++n){
    console.log("knit + f" + n + " " + C1);
}
for (let n = max; n>= min; --n){
    console.log("knit - f" + n + " " + C1);
}
for (let n = min; n<= max; ++n){
    console.log("knit + f" + n + " " + C1);
}


for (let n = max; n>= min; n-=3){
    console.log("knit - f" + n + " " + C3);
}
for (let n = max-1; n>= min; n-=3){
    console.log("knit - f" + n + " " + C2);
}
for (let n = max-2; n>= min; n-=3){
    console.log("knit - f" + n + " " + C1);
}

for (let r = 0; r <= 2; ++r){
    for (let n = max; n >= min; --n){
        console.log("knit - f" + n + " " + C1);
    }
    for (let n = min; n <= max; ++n){
        console.log("knit + f" + n + " " + C1);
    }
}

console.log("outhook " + C1);
console.log("outhook " + C2);
console.log("outhook " + C3);

