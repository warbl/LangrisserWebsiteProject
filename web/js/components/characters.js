/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
"use strict";
function characters(){
    
    
    var charactersDOM = document.createElement("div");
    
            // invoke ajax function to read cars.json and if the call was successful, 
            // run function processJSON, otherwise, put an error message in the DOM element 
            // that has id "listHere".
    ajax("json/characters.json", processCharData, charactersDOM);

    function processCharData(characterList) {

        console.log(characterList);  // car list as an array of objects

                /*    
                 "make": "Buick",
                 "photo": "http://cis-linux2.temple.edu/~sallyk/pics_car/buick.png",
                 "condition": "great",
                 "price": "15000"
                 */

                var newCharacterList = []; // empty array
                // modify properties (image and price) of the array of objects so it will look 
                // better on the page.
                for (var i = 0; i < characterList.length; i++) {
                    newCharacterList[i] = {}; // i-th element of array is empty object.
                    newCharacterList[i].CharId = SortableTableUtils.makeNumber(characterList[i].charactersId, false);
                    newCharacterList[i].CharName = SortableTableUtils.makeText(characterList[i].charactersName);
                    newCharacterList[i]._CharImg = SortableTableUtils.makeImage(characterList[i].charactersImg, "5rem");
                    newCharacterList[i].CharMainFaction = SortableTableUtils.makeText(characterList[i].charactersMainFaction);
                    newCharacterList[i].CharBuffBool = SortableTableUtils.makeNumber(characterList[i].charactersBuffBool, false);
                    newCharacterList[i].CharFactionNum = SortableTableUtils.makeNumber(characterList[i].charactersFactionNum, false);
                    newCharacterList[i].WebUserId = SortableTableUtils.makeNumber(characterList[i].webUserId, false);
                    
                }

                // Making a DOM object, nothing shows yet... 
                charactersDOM.appendChild(MakeClickSortTable("Characters", newCharacterList, "CharId", "pics/sortUpDown16.png"));

            }
            
    return charactersDOM;
}