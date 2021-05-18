
function home () {

    // ` this is a "back tick". Use it to define multi-line strings in JavaScript.
    var content = `
      <h2>Purpose of the Site</h2>
    
            <p>
                The purpose of this page is to create something akin to an online deckbuilder for Langrisser Mobile.
    
                <a href="https://sites.google.com/view/wikigrisser/home">This site</a> is generally a good resource but it doesn't have deckbuilding functionality.'
            </p>
    `;
    
    var ele = document.createElement("div");
    ele.innerHTML = content;
    return ele; 
}