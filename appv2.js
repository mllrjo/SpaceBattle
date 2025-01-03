// https://frontendinterviewquestions.medium.com/how-to-get-user-input-in-javascript-console-2961df401f84
const readline = require('readline');
// Create an interface for input and output streams
const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});
// Define the callback function
function getInput() {
    rl.question('[R]etreat or [C]ontinue: ', (answer) => {
        if(answer.toLowerCase() === 'r') {
            console.log(`You decided to retreat: ${answer}`);
            iRetreat = true;
            rl.close();
        } else {
           if(answer.toLowerCase() === 'c') {
                console.log(`You decided to continue: ${answer}`);
                iRetreat = false;
                rl.close();
            }
        }            
    })
};


// spaceShip class definition
class spaceShip {
    constructor(hull, firepower, accuracy) {
    this.hull = hull;
    this.firepower = firepower;
    this.accuracy = accuracy;
    }
}
// my spaceShip usaAssembly
const ussAssembly = new spaceShip(20,5,0.7);

// Starting number of alien ships
let fleetSize = 6;
//  alienFleet array declaration
let alienFleet = []
// populate alienFleet parameters
for(let i=0; i<fleetSize; i++) {
    hull = 3.0 + 3.0*Math.random();
    firepower = 2.0 + 2.0*Math.random();
    accuracy = 0.6 + 0.2*Math.random();
    alienFleet[i] = new spaceShip(hull, firepower, accuracy);
}
// checkpoint
for(let i=0; i<fleetSize; i++) {
    //    console.log(i + " " + "hull: ", alien[i].hull)
    console.log(alienFleet[i].hull)
}
let aliens = fleetSize-1;

// returns aliens remaining if I survive this round
function Round(aliens) {
    // if alien ships remaining
    while(aliens) {
      let iSurvive = true
      let iRetreat = false
      while(alienSurvives && iSurvive) {
        // I attack
        if (Math.random() < ussAssembly.accuracy) {
            alienFleet[aliens].hull -= ussAssembly.firepower;
            console.log('alien', aliens + 1, 'has been hit with power ', ussAssembly.firepower);
        }
        // alien destroyed
          if(alienFleet[aliens].hull <= 0) {
            console.log('alien ' + (aliens + 1) + ' destroyed: ', alienFleet[aliens].hull);
            alienSurvives = false;
            aliens--;
            return(aliens);
         }
         // alien survived and attacks
         if (Math.random() < alienFleet[aliens].accuracy) {
              ussAssembly.hull -= alienFleet[aliens].firepower;
              console.log("you're hit with power: ", alienFleet[aliens].firepower, " hull: ", ussAssembly.hull);
         }
         // I'm destroyed: game over
         if(ussAssembly.hull <= 0) {
             console.log('You\'re destroyed: ', aliens, ", ", ussAssembly.hull);
             iSurvive = false;
             break;
         }
     }
     if(!iSurvive || iRetreat) break;
 }
}
