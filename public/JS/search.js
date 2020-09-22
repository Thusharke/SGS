
function search(){
    var filter = document.querySelector("#filter");
    if(filter){
        if(filter.querySelector("#dept").value)
            var dept = filter.querySelector("#dept").value.toUpperCase();
        if(filter.querySelector("#cat").value)
            var cat = filter.querySelector("#cat").value.toUpperCase();
        var complaints = document.querySelectorAll(".comp");
        filter.style.display = "none";
        for(var i=0;i<complaints.length;i++){
            var field = complaints[i].querySelector("h1");
            if(field.querySelector("#dep"))
                var deptIn = field.querySelector("#dep").textContent.toUpperCase();
            if(field.querySelector("#catg"))
                var catIn = field.querySelector("#catg").textContent.toUpperCase();
            if((field.querySelector("#dep") && deptIn.indexOf(dept) == -1) && (field.querySelector("#catg") && catIn.indexOf(cat) == -1)){
                console.log("Hello")
                complaints[i].style.display="none";
            }else{
                console.log("hi");
                complaints[i].style.display=""; 
            }
        }
    }
    var body = document.querySelector("body");
    body.style.opacity = 1;
}