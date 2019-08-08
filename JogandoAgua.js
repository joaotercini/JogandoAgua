class Element {	
	constructor(MaxValue) {
        this.Max = MaxValue;
        this.InWatershed = 0;
	}	
	Up() {
		if (this.InWatershed < this.Max) {
            this.InWatershed += 1;
            Update();
		}
	}	
	Down() {
		if (this.InWatershed > 0) {
            this.InWatershed -= 1;
            Update();
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
        var _Load = 648 * this.City.InWatershed + 1209 * this.Industry.InWatershed - 524 * this.TreatmentStation.InWatershed;
        if (_Load < 0) {
            _Load = 0;
        }
        return _Load;
    }
    get Income() {
        return 800 * this.City.InWatershed + 4000 * this.Industry.InWatershed + 900 * this.IrrigatedArea.InWatershed - 200 * this.TreatmentStation.InWatershed - 2000 * this.Dam.InWatershed;
    }
    get Concentration() {
        return this.Load / this.Flow / 0.0864;
    }
}

let Water = new Watershed();
console.log(Water);
window.onload = function () { Update(); };

function Update() {
    document.getElementById('flow').innerHTML = Water.Flow;
    document.getElementById('load').innerHTML = Water.Load;
    document.getElementById('income').innerHTML = Water.Income;
    document.getElementById('concentration').innerHTML = Water.Concentration;
    document.getElementById('city_out').innerHTML = Water.City.OutWatershed;
    document.getElementById('industry_out').innerHTML = Water.Industry.OutWatershed;
    document.getElementById('irrigated_area_out').innerHTML = Water.IrrigatedArea.OutWatershed;
    document.getElementById('treatment_station_out').innerHTML = Water.TreatmentStation.OutWatershed;
    document.getElementById('dam_out').innerHTML = Water.Dam.OutWatershed;
    document.getElementById('city_in').innerHTML = Water.City.InWatershed;
    document.getElementById('industry_in').innerHTML = Water.Industry.InWatershed;
    document.getElementById('irrigated_area_in').innerHTML = Water.IrrigatedArea.InWatershed;
    document.getElementById('treatment_station_in').innerHTML = Water.TreatmentStation.InWatershed;
    document.getElementById('dam_in').innerHTML = Water.Dam.InWatershed;
}