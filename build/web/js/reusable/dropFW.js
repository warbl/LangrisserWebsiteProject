/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */


function dropFW (dropHeaderClass, dropContentClass, hideClass, showClass) {
    
    window.onclick = function (event) {

        var clickedEle = event.target;  // this is the DOM element (anywhere on page) that was clicked.
        // console.log("clickedEle on next line");
        // console.log(clickedEle);

    var nextEle = clickedEle.parentElement.getElementsByTagName("div")[1];
    
        if (clickedEle.classList.contains(dropHeaderClass)) {

        if (nextEle.classList.contains(showClass)) {
             hide(nextEle);
         } else {
            var dropContentList = document.getElementsByClassName(dropContentClass);
            for (var i = 0; i < dropContentList.length; i++) {
                dropContentList[i].classList.remove(showClass);
                dropContentList[i].classList.add(hideClass);
            }
            show(nextEle);
         }


        } else {

            // This is when they click anywhere on the page (not a dropHeader).
            var dropContentList = document.getElementsByClassName(dropContentClass);
            for (var i = 0; i < dropContentList.length; i++) {
                dropContentList[i].classList.remove(showClass);
                dropContentList[i].classList.add(hideClass);
            }
        }

        // private function defined inside of another function
        function hide(ele) {
            ele.classList.remove(showClass);
            ele.classList.add(hideClass);
        }

        // private function defined inside of another function
        function show(ele) {
            ele.classList.remove(hideClass);
            ele.classList.add(showClass);
        }
    };  // window.onclick function 

}