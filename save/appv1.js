
class spaceShip {
    constructor(hull, firepower, accuracy) {
    this.hull = hull;
    this.firepower = firepower;
    this.accuracy = accuracy;
    }
}
const ussAssembly = new spaceShip(20,5,0.7);

al = new spaceShip[6];

class alienFleet {
    constructor() {
        this.aliens = []
    }
    newAlien(hull, firepower, accuracy) {
        let alien = new spaceShip(hull, firepower, accuracy)
        this.aliens.push(alien)
        return alien
    }
}

let alien = new alienFleet()
for(let i=1; i<6; i++) {
    hull = 3.0 + 3.0*Math.random();
    firepower = 2.0 + 2.0*Math.random();
    accuracy = 0.6 + 0.2*Math.random();
    alien.newAlien(hull, firepower, accuracy)
}
for(let i=1; i<6; i++) {
//    console.log(i + " " + "hull: ", alien[i].hull)
    console.log(alien.aliens[i].hull)
}
throw new Error()

// if alien ships remaining
while(aliens) {
    let alienSurvives = true
    let iSurvive = true
    while(alienSurvives && iSurvive) {
        // I attack
        // alien destroyed
            aliens--;
            // indicate alternative to retreat
            // if retreat, then break;
            continue;
        // alien survives and attackes
        // alien attack
        if (Math.random() < aliens[0].accuracy) {
            console.log('You have been hit!');
        }
        // if I'm destroyed, iSurvive = false; break;
        // Otherwise continue
    }
}
