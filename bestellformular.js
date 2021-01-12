var wein = [
    ["Marienthaler Stiftsberg Rotweincuvée", 3.60],
    ["Riesling Classic", 3.70],
    ["Silvaner Selection Rheinhessen", 6.90],
    ["Domäne Avelsbach Riesling Sekt", 6.15],
];

var array = wein; //used array

window.onload = function (){
    arrayToTable(array, "my_table");
}

document.getElementById("my_form").addEventListener("input", function () {
    for (let i = 1; i < array.length+1; i++) {
        checkIfNumber("input"+i.toString());
    }
});

document.getElementById("my_form").addEventListener("change", function () {
    for (let i = 1; i < array.length+1; i++) {
        rechne("input"+i.toString(), "preis"+i.toString(), "output"+i.toString());
    }

    if(document.getElementById("versandDHL").checked === true){
        versandDHL();
    }
    zwischensumme();
    MwSt();
});
document.getElementById("versandDHL").addEventListener("click", versandDHL);
document.getElementById("versandSpedition").addEventListener("click", versandSped);


function elementValue(stringID) {
    return document.getElementById(stringID).value;
}
function versandDHL() {
    if (document.getElementById("oversandSpedition").value != ""){
        document.getElementById("oversandSpedition").value = 0;
    }
    let anzahlFlaschen = 0;
    for (let i = 1; i < array.length+1; i++) {
        if (elementValue("input"+i.toString()) != ""){
            anzahlFlaschen += Number(elementValue("input"+i.toString()))
        }
    }
    if (anzahlFlaschen>12){
        window.alert("DHL Versand nur bis 12 Flaschen möglich")
        document.getElementById("oversandDHL").value = 0;
        document.getElementById("versandDHL").checked = false;
    }else{
        document.getElementById("oversandDHL").value = Number(document.getElementById("preisDHL").innerText);
    }
}

function versandSped() {
    if (document.getElementById("oversandDHL").value !== ""){
        document.getElementById("oversandDHL").value = 0;
    }
    document.getElementById("oversandSpedition").value = 15;
}

function checkIfNumber(stringID) {
    let elem = document.getElementById(stringID)
    let inputVal = Number(elem.value);
    if(inputVal!=null){
        if (isNaN(inputVal)) {
            elem.value = "";
            window.alert("NaN")
        }
    }
}

function rechne(idInput, idPreis, idOutput) {
    let priceElem = document.getElementById(idPreis);
    let outElem = document.getElementById(idOutput);
    let anzahl = Number(elementValue(idInput));
    let preis = Number(priceElem.innerText);

    let summe = anzahl * preis;

    summe = summe.toFixed(2);
    outElem.value = summe;
}

function zwischensumme() {
    let versand=0, summe = 0;
    for (let i = 1; i < array.length+1; i++) {
        let num, elemVal;
        elemVal = elementValue("output"+i.toString());
        if (elemVal != ""){
            num = Number(elemVal)
            summe = summe + num;
        }
    }

    console.log(summe);
    if(document.getElementById("versandDHL").checked){
        versand=Number(elementValue("oversandDHL"));
    }else if (document.getElementById("versandSpedition").checked){
        versand=Number(elementValue("oversandSpedition"));
    }else {
        versand=0;
    }
    summe+=versand;
    summe = summe.toFixed(2);
    console.log("zwischensumme "+summe);
    document.getElementById("oZwischensumme").value = summe;
}

function MwSt() {
    let wert = 0.19;
    let mwst, zwsumme, summe;
    if (elementValue("oZwischensumme") !== ""){
        zwsumme = Number(elementValue("oZwischensumme"));
        mwst =  Number(zwsumme) * wert;
        mwst = mwst.toFixed(2);
        zwsumme = zwsumme.toFixed(2);
        summe = Number(zwsumme) + Number(mwst);
        summe = Number(summe).toFixed(2);
        document.getElementById("oMwst").value = mwst;
        document.getElementById("oSumme").value = summe;
    }
}

function arrayToTable(array, tableid) {
    let table = document.getElementById(tableid);
    array.sort();
    array.reverse();
    const iterator = array.values();
    let in_id = array.length;
    let preis_id = array.length;
    let out_id = array.length;
    for (const value of iterator) {
        let row = table.insertRow(1);
        let weinname = value[0];
        let preis = value[1];
        let inputFeld = row.insertCell(0);
        let weinFeld = row.insertCell(1);
        let einzelpreisFeld = row.insertCell(2);
        einzelpreisFeld.setAttribute("id","preis"+preis_id.toString());
        let preisFeld = row.insertCell(3);
        let inputElement = document.createElement("INPUT");
        inputElement.setAttribute("type", "text");
        inputElement.setAttribute("id", "input"+in_id.toString());
        inputFeld.appendChild(inputElement);

        weinFeld.textContent = weinname;
        einzelpreisFeld.innerHTML = preis.toFixed(2);

        let preisElement = document.createElement("OUTPUT");
        preisElement.setAttribute("id","output"+out_id.toString());
        preisFeld.appendChild(preisElement);
        /*row.innerHTML = '<tr>\n' +
            '<td><input type="text" id=in_id-- ></td>\n' +
            '    <td>weinname</td>\n' +
            '<td id=preis_id-->preis</td>\n' +
            '    <td><output id=out_id-->0</output></td>\n' +
            '</tr>';

         */
        in_id--;
        out_id--;
        preis_id--;
    }

}

function myButton() {
    alert("Bestellung erfolgreich" +
        "\nTotal: "+document.getElementById("oSumme").value+"€")
}
/*<tr>
<td><input type="text" id="inMSR1" name="1"></td>
    <td>Marienthaler Stiftsberg Rotweincuvée</td>
<td id="preisMSR1">3.60</td>
    <td><output id="oMSR1">0</output></td>
</tr>
*/
