/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */


function makeChar (charParams) {

    var charObj = document.createElement("div"); 
    
    var charInfo = document.createElement("div");
    charObj.appendChild(charInfo);
    
    var charPic = document.createElement("img");
    charPic.src = charParams.charImg;
    charObj.appendChild(charPic);
    
    charObj.name = "noName";
    charObj.factions = "noFactions";
    charObj.buffs = charParams.buffs;
    var isBuffer = false;
    
    if(charObj.buffs !== null){
            isBuffer = true;
    }
    
    function assign(){
        if(charParams.name!==null){
            charObj.name = charParams.name;
        }
        if(charParams.factions!==null){
            charObj.factions = charParams.factions;
        }
    
        if(charParams.buffs !== null){
            isBuffer = true;
        }
    }
    
    function display() {
        charInfo.innerHTML = "Character name: " + charObj.name + "<br/> Factions: " + charObj.factions.toString();
        if(isBuffer){
            charInfo.innerHTML += "<br/>Buffs:" + charObj.buffs;
        }
    }

    charObj.setName = function (newName) {
        charObj.name = newName;
        display(); // show updated property on the page
    };

    charObj.setBuff = function (newBuff) {
        charObj.buffs = newBuff;
        if(charObj.buffs !== null){
            isBuffer = true;
        }
        
        display(); // show updated price on the page
    };
    
    charObj.appendToFactions = function (newFaction){
        charObj.factions.push(newFaction);
        display();
    };
    
    charObj.onmouseout = function() {
        console.log("onmouseout");
        assign();
        display();
    };

    assign();
    display(); // show initial properties on the page 
    return charObj;
}