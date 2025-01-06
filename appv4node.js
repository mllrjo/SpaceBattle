// "hitpoints" = "hull"
// "an entire game is one battle with many aliens"
// "implement a game that consists of multiple battles where
// enemies respawn for a new battle at the end of the old battle."
// StackOverflow
const readline = require('readline');
function getInput() {
    const interface = readline.createInterface({
     input: process.stdin,
     output: process.stdout
    });
    return new Promise(resolve => interface.question("Retreat or Continue: ", answer => {
        interface.close();
        resolve(answer);
    }))
}

// spaceShip class definition
class spaceShip {
    constructor(hull, firepower, accuracy, x, y, missileNo, missilePower) {
        this.hull = hull;
        this.firepower = firepower;
        this.accuracy = accuracy;
        this.missileNo = missileNo;
        this.missilePower = missilePower;
        this.coords = [x,y];
    }
    hitToHull(firepower) {
       this.hull -= firepower;
    }
}
class megaShip extends spaceShip {
    constructor(hull, firepower, accuracy, missileNo, missilePower) {
        super(hull, firepower, accuracy, missileNo, missilePower, x, y);
    }
}   



function resizeImage(pic, height, width) {
    pic.style.width = `${width}px`;
    pic.style.height = `${height}px`;
}

// Function to position the image within the box
function positionImage(box, pic, x, y) {
    const boxRect = box.getBoundingClientRect();
    const imgRect = pic.getBoundingClientRect();

    // Adjust positions to stay within the box bounds
    const adjustedX = Math.min(Math.max(x, 0), boxRect.width - imgRect.width);
    const adjustedY = Math.min(Math.max(y, 0), boxRect.height - imgRect.height);

    // Apply positions
    pic.style.left = `${adjustedX}px`;
    pic.style.top = `${adjustedY}px`;
}

(async () => {
// Get references to the elements
document.addEventListener("DOMContentLoaded", () => {
    const USSEl = document.getElementById("USS");
    USSEl.style.setProperty("width","40px","important");
    USSEl.style.setProperty("height","40px","important");
});
const boxEl = document.getElementById("box");
positionImage(boxEl, USSEl, 80, 60);    
resizeImage(USSEl, 30, 20);
// positionImage(boxEl, USSEl, 80, 60);
// my spaceShip usaAssembly
const ussAssembly = new spaceShip(20,5,0.7,0,0,0,0);
// Starting number of alien ships
let fleetSize = 6;
//  alienFleet array declaration
let alienFleet = []
// populate alienFleet parameters
for(let i=0; i<fleetSize; i++) {
    hull = 3.0 + 3.0*Math.random();
    firepower = 2.0 + 2.0*Math.random();
    accuracy = 0.6 + 0.2*Math.random();
    alienFleet[i] = new spaceShip(hull, firepower, accuracy, 0, 0);
}
// checkpoint
for(let i=0; i<fleetSize; i++) {
    //    console.log(i + " " + "hull: ", alien[i].hull)
    console.log(alienFleet[i].hull)
}
let aliens = fleetSize-1;
let iSurvive = true;
while(aliens >= 0 && iSurvive) {
    // console.log(aliens," ", iSurvive);
    [aliens, iSurvive] = Round(aliens, ussAssembly, alienFleet);
    if(aliens < 0) {
        console.log("You win");
        break;
    }
    const RoC = await getInput();
    if(RoC.toLowerCase() === "r") {
        console.log("Retreat")
        break;
    } else {
        console.log("Continue")
        continue;
    }
}
   
})(); // main

// returns aliens remaining if I survive this round
function Round(aliens, ussAssembly, alienFleet) {
    let iSurvive = true;
    while(iSurvive) {
      // I attack
      if (Math.random() < ussAssembly.accuracy) {
        alienFleet[aliens].hitToHull(ussAssembly.firepower);
        console.log('alien', aliens, 'hit with power ', ussAssembly.firepower, "remaining hull: ", alienFleet[aliens].hull);
      }
      // alien destroyed
      if(alienFleet[aliens].hull <= 0) {
        console.log('alien ' + aliens + ' destroyed');
        aliens--;
        return [aliens, true];
      }
      // alien survived and attacks
      if (Math.random() < alienFleet[aliens].accuracy) {
        ussAssembly.hitToHull(alienFleet[aliens].firepower);
        console.log("you're hit with power: ", alienFleet[aliens].firepower, "  your remaining hull: ", ussAssembly.hull);
      }
      // I'm destroyed: game over
      if(ussAssembly.hull <= 0) {
          console.log('You\'re destroyed: ', aliens+1, "aliens remaining");
          return [aliens, false];
      }
    }
}
