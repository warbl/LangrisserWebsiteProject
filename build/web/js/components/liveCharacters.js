/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
"use strict";
function liveCharacters(){
    function deleteCharacter (charId, td) {
        console.log("to delete user "+charId);

        if (confirm("Do you really want to delete user " + charId + "? ")) {

            // HERE YOU HAVE TO CALL THE DELETE API and the success function should run the 
            // following (delete the row that was clicked from the User Interface).
            ajax("webAPIs/deleteCharacterAPI.jsp?deleteId=" +charId, success, td);
            // get the row of the cell that was clicked 
            function success(obj){
                var dataRow = td.parentNode;
                var rowIndex = dataRow.rowIndex - 1; // adjust for oolumn header row?
                var dataTable = dataRow.parentNode;
                dataTable.deleteRow(rowIndex);
            }
        }
    }
    
    var contentDOM = document.createElement("div");
    contentDOM.classList.add("clickSort");
    ajax("webAPIs/listOtherAPI.jsp", success, contentDOM);
    function success(obj) {

        console.log("listOtherAPI.jsp AJAX successfully returned the following data");
        console.log(obj);

        // Remember: getting a successful ajax call does not mean you got data. 
        // There could have been a DB error (like DB unavailable). 
        if (obj.dbError.length > 0) {
            contentDOM.innerHTML += "Database Error Encountered: " + obj.dbError;
            return;
        }

        var heading = Utils.make({
            htmlTag: "h2",
            parent: contentDOM
        });
        Utils.make({// don't need reference to this span tag...
            htmlTag: "span",
            innerHTML: "Character List ",
            parent: heading
        });
        var img = Utils.make({
            htmlTag: "img",
            parent: heading
        });
        img.src = CRUD_icons.insert;
        img.onclick = function () {
            // By changing the URL, you invoke the user insert. 
            window.location.hash = "#/insertOther";
        };

        var newCharacterList = []; // empty array
                // modify properties (image and price) of the array of objects so it will look 
                // better on the page.
                for (var i = 0; i < obj.characterList.length; i++) {
                    newCharacterList[i] = {}; // i-th element of array is empty object.
                    newCharacterList[i].CharId = SortableTableUtils.makeNumber(obj.characterList[i].charactersId, false);
                    newCharacterList[i].CharName = SortableTableUtils.makeText(obj.characterList[i].charactersName);
                    newCharacterList[i]._CharImg = SortableTableUtils.makeImage(obj.characterList[i].charactersImg, "5rem");
                    newCharacterList[i].CharMainFaction = SortableTableUtils.makeText(obj.characterList[i].charactersMainFaction);
                    newCharacterList[i].CharBuffBool = SortableTableUtils.makeNumber(obj.characterList[i].charactersBuffBool, false);
                    newCharacterList[i].CharFactionNum = SortableTableUtils.makeNumber(obj.characterList[i].charactersFactionNum, false);
                    newCharacterList[i].WebUserId = SortableTableUtils.makeNumber(obj.characterList[i].webUserId, false);
                    newCharacterList[i].UserEmail = SortableTableUtils.makeText(obj.characterList[i].userEmail);
                    
                    newCharacterList[i]._Update = SortableTableUtils.makeLink(
                    "<img src='" + CRUD_icons.update + "'  style='width:1rem' />", // innerHTML of link
                    '#/characterUpdate/' + obj.characterList[i].charactersId         // href of link
                    );
                    
                    newCharacterList[i]._Delete = SortableTableUtils.makeImage(CRUD_icons.delete, '1rem');
            
                    // freeze the webUserId
                    const charId=obj.characterList[i].charactersId;
                    newCharacterList[i]._Delete.onclick = function () {
                        deleteCharacter(charId,this);
                    };
                    
                }

                // Making a DOM object, nothing shows yet... 
                contentDOM.appendChild(MakeClickSortTable("Characters", newCharacterList, "CharId", "pics/sortUpDown16.png"));
    } // end of function success

    return contentDOM;
}