class spaceShip {
    constructor(hull, firepower, accuracy, x, y, missileNo = 0, missilePower = 0) {
        this.hull = hull;
        this.firepower = firepower;
        this.accuracy = accuracy;
        this.missileNo = missileNo;
        this.missilePower = missilePower;
        this.coords = [x, y];
    }
    hitToHull(firepower) {
        this.hull -= firepower;
    }
}

class megaShip extends spaceShip {
    constructor(hull, firepower, accuracy, missileNo, missilePower, x, y) {
        super(hull, firepower, accuracy, x, y, missileNo, missilePower);
    }
}

function resizeImage(pic, height, width) {
    pic.style.width = `${width}px`;
    pic.style.height = `${height}px`;
}

function positionImage(box, pic, x, y) {
    const boxRect = box.getBoundingClientRect();
    const imgRect = pic.getBoundingClientRect();

    const adjustedX = Math.min(Math.max(x, 0), boxRect.width - imgRect.width);
    const adjustedY = Math.min(Math.max(y, 0), boxRect.height - imgRect.height);

    pic.style.left = `${adjustedX}px`;
    pic.style.top = `${adjustedY}px`;
}

document.addEventListener("DOMContentLoaded", () => {
    async function getInput() {
        return new Promise((resolve) => {
            const continueButton = document.getElementById("continueButton");
            const retreatButton = document.getElementById("retreatButton");

            continueButton.addEventListener("click", () => resolve("C"), { once: true });
            retreatButton.addEventListener("click", () => resolve("R"), { once: true });
        });
    }

    async function main() {
        const USSEl = document.getElementById("USS");
        const boxEl = document.getElementById("box");
        positionImage(boxEl, USSEl, 80, 60);
        resizeImage(USSEl, 60, 60);

        const ussAssembly = new spaceShip(20, 5, 0.7, 0, 0);
        const fleetSize = 6;
        const alienFleet = [];

        // Populate alien fleet
        for (let i = 0; i < fleetSize; i++) {
            const hull = 3.0 + 3.0 * Math.random();
            const firepower = 2.0 + 2.0 * Math.random();
            const accuracy = 0.6 + 0.2 * Math.random();
            alienFleet.push(new spaceShip(hull, firepower, accuracy, 0, 0));
        }

        console.log("Alien fleet hulls:");
        alienFleet.forEach((alien, i) => console.log(`Alien ${i}: ${alien.hull.toFixed(2)}`));

        let aliens = fleetSize - 1;
        let iSurvive = true;

        while (aliens >= 0 && iSurvive) {
            [aliens, iSurvive] = Round(aliens, ussAssembly, alienFleet);
            if (aliens < 0) {
                console.log("You win! All aliens are defeated.");
                break;
            }

            console.log("Waiting for user input...");
            const RoC = await getInput();

            if (RoC.toLowerCase() === "r") {
                console.log("You chose to retreat. Game over.");
                break;
            } else {
                console.log("Continuing to fight...");
            }
        }

        if (!iSurvive) {
            console.log("You were destroyed. Game over.");
        }
    }

    function Round(aliens, ussAssembly, alienFleet) {
        while (true) {
            if (Math.random() < ussAssembly.accuracy) {
                alienFleet[aliens].hitToHull(ussAssembly.firepower);
                console.log(`Alien ${aliens} hit! Remaining hull: ${alienFleet[aliens].hull.toFixed(2)}`);
            }

            if (alienFleet[aliens].hull <= 0) {
                console.log(`Alien ${aliens} destroyed!`);
                return [aliens - 1, true];
            }

            if (Math.random() < alienFleet[aliens].accuracy) {
                ussAssembly.hitToHull(alienFleet[aliens].firepower);
                console.log(`USS Assembly hit! Remaining hull: ${ussAssembly.hull.toFixed(2)}`);
            }

            if (ussAssembly.hull <= 0) {
                return [aliens, false];
            }
        }
    }

    main();
});