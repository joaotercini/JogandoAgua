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
    document.getElementById('concentration').innerHTML = Water.Concentration.toFixed(2);
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

    if (Water.Concentration > 5) {
        $("#txtConcentration").css("color", "#F37178");
    } else {
        $("#txtConcentration").css("color", "#4688a3");
    }
}

$(function () {

    var classnameCity = document.getElementsByClassName("city");
    var fncCity = function () {
        $(this).appendTo("#divCity");
        Water.City.InWatershed = document.getElementById("watershed").getElementsByClassName("city").length;
        Update();
    };
    for (var i = 0; i < classnameCity.length; i++) {
        classnameCity[i].addEventListener('click', fncCity, false);
    }

    var classnameIndustry = document.getElementsByClassName("industry");
    var fncIndustry = function () {
        $(this).appendTo("#divIndustry");
        Water.Industry.InWatershed = document.getElementById("watershed").getElementsByClassName("industry").length;
        Update();
    };
    for (var i = 0; i < classnameIndustry.length; i++) {
        classnameIndustry[i].addEventListener('click', fncIndustry, false);
    }

    var classnameIrrigatedArea = document.getElementsByClassName("irrigatedarea");
    var fncIrrigatedArea = function () {
        $(this).appendTo("#divIrrigatedArea");
        Water.IrrigatedArea.InWatershed = document.getElementById("watershed").getElementsByClassName("irrigatedarea").length;
        Update();
    };
    for (var i = 0; i < classnameIrrigatedArea.length; i++) {
        classnameIrrigatedArea[i].addEventListener('click', fncIrrigatedArea, false);
    }

    var classnameTreatmentStation = document.getElementsByClassName("treatmentstation");
    var fncTreatmentStation = function () {
        $(this).appendTo("#divTreatmentStation");
        Water.TreatmentStation.InWatershed = document.getElementById("watershed").getElementsByClassName("treatmentstation").length;
        Update();
    };
    for (var i = 0; i < classnameTreatmentStation.length; i++) {
        classnameTreatmentStation[i].addEventListener('click', fncTreatmentStation, false);
    }

    var classnameDam = document.getElementsByClassName("dam");
    var fncDam = function () {
        $(this).appendTo("#divDam");
        Water.Dam.InWatershed = document.getElementById("watershed").getElementsByClassName("dam").length;
        Update();
    };
    for (var i = 0; i < classnameDam.length; i++) {
        classnameDam[i].addEventListener('click', fncDam, false);
    }

});

function allowDrop(ev) {
    ev.preventDefault();
}

function drag(ev) {
    ev.dataTransfer.setData("text", ev.target.id);
}

function dropWatershed(ev) {
    ev.preventDefault();
    var data = ev.dataTransfer.getData("text");
    ev.target.appendChild(document.getElementById(data));

    Water.City.InWatershed = document.getElementById("watershed").getElementsByClassName("city").length;
    Water.Industry.InWatershed = document.getElementById("watershed").getElementsByClassName("industry").length;    
    Water.IrrigatedArea.InWatershed = document.getElementById("watershed").getElementsByClassName("irrigatedarea").length;
    Water.TreatmentStation.InWatershed = document.getElementById("watershed").getElementsByClassName("treatmentstation").length;
    Water.Dam.InWatershed = document.getElementById("watershed").getElementsByClassName("dam").length;

    Update();
}

//function dropCity(ev) {
//    ev.preventDefault();
//    var data = ev.dataTransfer.getData("text");
//    var docId = document.getElementById(data);    
//    if (docId.classList.contains('city')) {
//        ev.target.appendChild(document.getElementById(data));
//        Update();
//    }    
//}




