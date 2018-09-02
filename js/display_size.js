window.onload = function() {
    fillInRatioMap()
    fillInUnitMap()
    addRatioOptionsToForm()
    addUnitOptionsToForm()
}

function $(x) {
    return document.getElementById(x);
}

const NUMBER_OF_DECIMALS = 2
const SELECTED_RATIO = "16:9"
const SELECTED_UNIT = "inch"

var unitMap
var ratioMap

var width
var height

function fillInRatioMap() {
    ratioMap = new Map()
    ratioMap.set("1:1", { x: 1.0, y: 1.0})
    ratioMap.set("5:4", { x: 5.0, y: 4.0})
    ratioMap.set("4:3", { x: 4.0, y: 3.0})
    ratioMap.set("3:2", { x: 3.0, y: 2.0})
    ratioMap.set("8:5", { x: 8.0, y: 5.0})
    ratioMap.set("5:3", { x: 5.0, y: 3.0})
    ratioMap.set("16:9", { x: 16.0, y: 9.0})
    ratioMap.set("21.3:9", { x: 21.3, y: 9.0})
}

function fillInUnitMap() {
    unitMap = new Map()
    unitMap.set("cm", 1.0)
    unitMap.set("inch", 2.54)
}

function addRatioOptionsToForm() {
    var select = $("ratio")
    for (const entry of ratioMap.entries()) {
        addSelectOption(select, entry[0], SELECTED_RATIO)
      }
}

function addUnitOptionsToForm() {
    var select = $("unit")
    for (const entry of unitMap.entries()) {
        addSelectOption(select, entry[0], SELECTED_UNIT)
      }
}

function addSelectOption(select, entry, SELECTED) {
    var opt = document.createElement('option');
    opt.value = entry;
    opt.innerHTML = entry;
    if(entry == SELECTED) {
        opt.selected = true
    }
    select.appendChild(opt);
}

function calculateDisplaySize() {
    var ratio = $("ratio").value
    var size = $("size").value
    var unit = $("unit").value

    generateDisplay(ratio, size * unitMap.get(unit))

    $("sizes").innerHTML = "It's width is " + width.toFixed(NUMBER_OF_DECIMALS) + " cm, and it's height is " + height.toFixed(NUMBER_OF_DECIMALS) + " cm. "
    $("area").innerHTML = "It's area is " + (width*height).toFixed(NUMBER_OF_DECIMALS) + " cm<sup>2</sup>. "
}

function generateDisplay(ratio, size) {
    var dSquare = size*size;
    var r = ratioMap.get(ratio)
    var sides = r.x*r.x + r.y*r.y;
    
    var xSquare = dSquare / sides;
    var x = Math.sqrt(xSquare);
    
    width = x*r.x
    height =x*r.y
}
