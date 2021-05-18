/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

function twoChars() {

    var twoCharDOM = document.createElement("div");
    
    var altemuller = {
        charImg: "pics/altemuller.png",
        name: "Altemuller",
        factions: ["Empire's Honor", "Strategic Masters", "Dark Reincarnation"],
        buffs:"Strategic Masters"
    };
    
    var ashram = {
        charImg:"pics/ashram.png",
        name:"Ashram",
        factions: ["Strategic Masters", "Dark Reincarnation", "Heroes of Time"],
        buffs: null
    };

    var instructions = document.createElement("div");
    instructions.classList.add("charStyle");
    instructions.innerHTML = "On mouse out resets the name back to its original value. However, I intended this to reset all of the fields back to their initial values but it doesn't seem to work for the other two parameters. I'll need to work on this. <br>\n\
                                The change name and buff buttons are set mutators but the add factions appends to the list instead.<br><br>"
    twoCharDOM.appendChild(instructions);
    
    var myCharObj = makeChar(altemuller);
    myCharObj.classList.add("charStyle");
    twoCharDOM.appendChild(myCharObj);

    var myNameButton = document.createElement("button");
    myNameButton.innerHTML = "Change character name";
    twoCharDOM.appendChild(myNameButton);

    var myNameInput = document.createElement("input");
    twoCharDOM.appendChild(myNameInput);

    myNameButton.onclick = function () {
        myCharObj.setName(myNameInput.value);
    };
    
    var myBuffButton = document.createElement("button");
    myBuffButton.innerHTML = "Set Character Buffs";
    twoCharDOM.appendChild(myBuffButton);
    
    var myBuffInput = document.createElement("input");
    twoCharDOM.appendChild(myBuffInput);
    
    myBuffButton.onclick = function(){
        myCharObj.setBuff(myBuffInput.value);
    };
    
    var myFactionsButton = document.createElement("button");
    myFactionsButton.innerHTML = "Add Factions";
    twoCharDOM.appendChild(myFactionsButton);
    
    var myFactionsInput = document.createElement("input");
    twoCharDOM.appendChild(myFactionsInput);
    
    myFactionsButton.onclick = function(){
        myCharObj.appendToFactions(myFactionsInput.value);
    };
    


    var yourCharObj = makeChar(ashram);
    yourCharObj.classList.add("charStyle");
    twoCharDOM.appendChild(yourCharObj);

    var yourCharButton = document.createElement("button");
    yourCharButton.innerHTML = "Change Name";
    twoCharDOM.appendChild(yourCharButton);

    var yourCharInput = document.createElement("input");
    twoCharDOM.appendChild(yourCharInput);

    yourCharButton.onclick = function () {
        yourCharObj.setName(yourCharInput.value);
    };
    
    var yourBuffButton = document.createElement("button");
    yourBuffButton.innerHTML = "Set Character Buffs";
    twoCharDOM.appendChild(yourBuffButton);
    
    var yourBuffInput = document.createElement("input");
    twoCharDOM.appendChild(yourBuffInput);
    
    yourBuffButton.onclick = function(){
        yourCharObj.setBuff(yourBuffInput.value);
    };
    
    var yourFactionsButton = document.createElement("button");
    yourFactionsButton.innerHTML = "Add Factions";
    twoCharDOM.appendChild(yourFactionsButton);
    
    var yourFactionsInput = document.createElement("input");
    twoCharDOM.appendChild(yourFactionsInput);
    
    yourFactionsButton.onclick = function(){
        yourCharObj.appendToFactions(yourFactionsInput.value);
    };

    return twoCharDOM;
}

