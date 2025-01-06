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
        this.image = new Image(); // Dynamically create an image element
        this.image.src = pathToImage;
        this.image.style.position = "absolute"; // Ensure it can be positioned
        this.missileNo = missileNo;
        this.missilePower = missilePower;
      
    }
    hitToHull(firepower) {
       this.hull -= firepower;
    }

    render(parentElement) {
        this.image.style.left = `${this.coords[0]}px`;
        this.image.style.top = `${this.coords[1]}px`;
        parentElement.appendChild(this.image);
    }

    updatePosition(x, y) {
        this.coords = [x, y];
        this.image.style.left = `${x}px`;
        this.image.style.top = `${y}px`;
    }

    resize(width, height) {
        this.image.style.width = `${width}px`;
        this.image.style.height = `${height}px`;
    }

    adjustOpacity(opacity) {
        this.image.style.opacity = `${opacity}`;
    }
}

class megaShip extends spaceShip {
    constructor(hull, firepower, accuracy, x, y, pathToImage, missileNo, missilePower) {
        super(hull, firepower, accuracy, x, y, pathToImage, missileNo, missilePower);
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
              accuracy = 0.6 + 0.2*Math.random();
              firepower = 2.0 + 2.0*Math.random();
              alienFleet[i] = new spaceShip(hull, firepower, accuracy, 10*i, 20*i, "images/trumpFace.jpg", 0, 0);
              positionImage(USSBoxEl, USSEl, 50, 50);    
              positionImage(aliensBoxEl, aliensEl, alienFleet[i].coords[0], alienFleet[i].coords[1]);    
alienFleet[i].resize(20,20);
alienFleet[i].render(aliensBoxEl);
ussAssembly.render(USSBoxEl);
ussAssembly.updatePosition(200, 300);
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
      ussAssembly = new spaceShip(20,5,0.7,0,0,"images/trumpFace.jpg",0,0);
const USSBoxEl = document.getElementById("USSBox");
ussAssembly.resize(20,20);
ussAssembly.render(USSBoxEl);
ussAssembly.updatePosition(50, 70);
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
       console.log("Continue or Retreat?");
       const RoC = await getInput(); 
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
      const aliensEl = document.getElementById("aliens");
      const aliensBoxEl = document.getElementById("aliensBox");
      if (Math.random() < ussAssembly.accuracy) {
        alienFleet[aliens].hitToHull(ussAssembly.firepower);
        console.log('alien', aliens, 'hit with power ', ussAssembly.firepower, "remaining hull: ", alienFleet[aliens].hull);
        a_hull = alienFleet[aliens].hull >= 0 ? alienFleet[aliens].hull : 0;
        a_hull/=20.0;
        alienFleet[aliens].adjustOpacity(a_hull);
        // positionImage(aliensBoxEl, aliensEl, alienFleet[aliens].coords[0], alienFleet[aliens].coords[1]);
      }
      // alien destroyed
      if(alienFleet[aliens].hull <= 0) {
       console.log('alien ' + aliens + ' destroyed');
       alienFleet[aliens].adjustOpacity(0.0);
       aliens--;
       return [aliens, true];
      }
      // alien survived and attacks
      if (Math.random() < alienFleet[aliens].accuracy) {
        ussAssembly.hitToHull(alienFleet[aliens].firepower);
        a_hull = ussAssembly.hull >= 0 ? ussAssembly.hull : 0;
        a_hull/=20.0;
        ussAssembly.adjustOpacity(a_hull);
        console.log("you're hit with power: ", alienFleet[aliens].firepower, "  your remaining hull: ", ussAssembly.hull);
      }
      // I'm destroyed: game over
      if(ussAssembly.hull <= 0) {
       console.log('You\'re destroyed: ', aliens+1, "aliens remaining");
       ussAssembly.adjustOpacity(0.0);
       return [aliens, false];
      }
     }
    }
    main();