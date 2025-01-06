// "hitpoints" = "hull"
// "an entire game is one battle with many aliens"
// "implement a game that consists of multiple battles where
// enemies respawn for a new battle at the end of the old battle."
// StackOverflow

// spaceShip class definition
class spaceShip {
    constructor(hull, firepower, accuracy, x, y, pathToImage, missileNo, missilePower) {
        this.hull = hull;
        this.firepower = firepower;
        this.accuracy = accuracy;
        this.coords = [x,y];
        this.image = new Image();
        this.image.src = pathToImage;   
        this.missileNo = missileNo;
        this.missilePower = missilePower;
      
    }
    hitToHull(firepower) {
       this.hull -= firepower;
    }
}
class megaShip extends spaceShip {
    constructor(hull, firepower, accuracy, missileNo, missilePower) {
        super(hull, firepower, accuracy, x, y, pathToImage, missileNo, missilePower;
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

    async function getInput() {
        return new Promise((resolve) => {
            const continueButton = document.getElementById("continueButton");
            const retreatButton = document.getElementById("retreatButton");
            continueButton.addEventListener("click", () => { resolve("C"); }, { once: true });
            retreatButton.addEventListener("click", () => { resolve("R"); }, { once: true });
        });
    }
    
    async function main() {
        function setUp(fleetSize)   {
            const USSEl = document.getElementById("USS");
            const USSBoxEl = document.getElementById("USSBox");
            const aliensEl = document.getElementById("aliens");
            const aliensBoxEl = document.getElementById("aliensBox");
            resizeImage(USSEl, 60, 60);
            // Starting number of alien ships
            // populate alienFleet parameters
            for(let i=0; i<fleetSize; i++) {
              hull = 3.0 + 3.0*Math.random();
              firepower = 2.0 + 2.0*Math.random();
              accuracy = 0.6 + 0.2*Math.random();
              alienFleet[i] = new spaceShip(hull, firepower, accuracy, [10*i, 20*i], 0, 0);
              positionImage(USSBoxEl, USSEl, 50, 50);    
              positionImage(aliensBoxEl, aliensEl, alienFleet[i].coords[0], alienFleet[i].coords[1]);    
            }
            // checkpoint
            for(let i=0; i<fleetSize; i++) {
              console.log(alienFleet[i].hull)
            }
            return(alienFleet);
          }

      let fleetSize = 6 // Math.floor(Math.random() * 10) + 1;
      let iSurvive = true;
      let alienFleet = [];
      let aliens = 0;
      while(iSurvive) {
      console.log("Fleet size: ", fleetSize);
      ussAssembly = new spaceShip(20,5,0.7,[0,0],0,0);
      alienFleet = setUp(fleetSize);
      aliens = fleetSize-1;
      while(iSurvive) {
       [aliens, iSurvive] = Round(aliens, ussAssembly, alienFleet);
       if(aliens < 0) {
           console.log("You win");
           break;
       }
       if(!iSurvive) {
           console.log("You lose");
           break;
       }
       console.log("Waiting for user input...");
       const RoC = await getInput(); 
       console.log("User clicked the button. Continuing...");
       if(RoC.toLowerCase() === "r") {
        console.log("Retreat");
        return;
       } else {
        console.log("Continue");
       }
    }
      }
    }
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
    main();