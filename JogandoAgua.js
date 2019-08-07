class Element {	
	constructor(MaxValue) {
        this.Max = MaxValue;
        this.InWatershed = 0;
	}	
	Up() {
		if (this.InWatershed < this.Max) {
            this.InWatershed += 1;
		}
	}	
	Down() {
		if (this.InWatershed > 0) {
            this.InWatershed -= 1;
		}
    }
    get OutWatershed() {
        return this.Max - this.InWatershed;
    }
}

class Watershed {
	constructor() {
		this.City = new Element(5);
		this.Industry = new Element(6);
		this.IrrigatedArea = new Element(8);
		this.TreatmentStation = new Element(20);
		this.Dam = new Element(3);
	}
    get Flow() {
        return 1800 - 6 * this.City.InWatershed - 40 * this.Industry.InWatershed - 20 * this.IrrigatedArea.InWatershed + 1000 * this.Dam.InWatershed;
    }
    get Load() {
        return 648 * this.City.InWatershed + 1209 * this.Industry.InWatershed - 524 * this.TreatmentStation.InWatershed;
    }
    get Income() {
        return 800 * this.City.InWatershed + 4000 * this.Industry.InWatershed + 900 * this.IrrigatedArea.InWatershed - 200 * this.TreatmentStation.InWatershed - 2000 * this.Dam.InWatershed;
    }
    get Concentration() {
        return this.Load / this.Flow / 0.0864;
    }
}

let Water = new Watershed();
//Water.City.Up();
alert(Water.Flow);
console.log(Water);
    