var MotherTree = (function () {

    var mothertree = this;
    this.mainBlock = document.getElementById("multi-derevo");
    this.body = document.querySelector('body');
    this.addingBlock = document.getElementById("adding");
    this.mainUL = document.getElementById("mainUL");
    var countForKey=0;

    this.arr = ["Taras", "facebok.com","Persik","ok.ru","petya" ,"facebook.com","Kiril", "vk.com", ["andriy","google.com"],
        ["kolya", "facebook.com", ["kolya", "facebook.com", ["kolya", "facebook.com","Persik","ok.ru","petya" ,"facebook.com","Kiril",
            "vk.com","Persik","ok.ru","petya" ,"facebook.com","Kiril", "vk.com", ["Persik","ok.ru"],"Persik","ok.ru"],"Persik","ok.ru",
            ["Persik","ok.ru"],"Persik","ok.ru"],"Persik","ok.ru"],"Persik","ok.ru","petya" ,"facebook.com","Kiril", "vk.com","Persik","ok.ru","petya" ,
        "facebook.com","Kiril", "vk.com"];

    var count=1;
    this.hasClass = function(elem, className) {
        return new RegExp("(^|\\s)" + className + "(\\s|$)").test(elem.className)
    };

    this.mainBlock.addEventListener("click", function (event) { //click showing alert of element and hide group
        var clickedElem = event.target;
        if (mothertree.hasClass(clickedElem, 'Content')) {
            return alert(clickedElem.innerHTML);
        }
        var node = clickedElem.parentNode;
        var node2 = node.parentNode;
        var node3 = node2.parentNode;
        if (mothertree.hasClass(node, 'ExpandLeaf')) {
            return
        }
        if (mothertree.hasClass(clickedElem, 'open')) { 
            var newClass = 'closed';
            event.target.innerHTML = "+";
            node3.children[1].className = "hide";
        }
        if (mothertree.hasClass(clickedElem, 'closed')) {
            var newClass = 'open';
            event.target.innerHTML = "-";
            node3.children[1].className = "show";
        }
        var regexp = /(^|\s)(closed|open)(\s|$)/;
        clickedElem.className = clickedElem.className.replace(regexp, '$1' + newClass + '$3');
    });


    this.intArr=function() { //init all elements in our tree
        arr.forEach(function (item, i, arr) {
            if (typeof item == "string" && item.match( /^([a-z]+)$/i ) ) {
                mothertree.mainUL.appendChild(makeElem(item, i, arr));
            }
            if (typeof item == "string" && item.match(/^([a-z]+)\.([a-z\.]{2,6})$/i)) {
                mothertree.mainUL.lastChild.lastChild.lastChild.lastChild.innerHTML += " " + item; //.appendChild(makeElem(item,i,arr));
            }
            if (item instanceof Array) {
                mothertree.mainUL.appendChild(makeanotherArr(item, i, arr));
            }
        });
        countForKey=0;
    };
    this.intArr();


    function makeElem(item, i, arr) { //method for creating element
        var element = document.createElement('li');
        if (i == arr.length - 1) {
            element.className = "last";
        }
        var span = document.createElement('span');
        var link = document.createElement('p');
        var Content = document.createElement('i');
        Content.className = "Content";
        Content.innerHTML = item;
        element.appendChild(span);
        span.appendChild(link);
        link.appendChild(Content);
        return element;
    }


    function makeanotherArr(item, i, arr) { //method for creating group and int arr inside
        var element = document.createElement('li');
        if (i == arr.length-1) {
            element.className = "last";
        }
        var newUL = document.createElement('ul');
        newUL.id="group"+count;
        newUL.className = "show";
        var em = document.createElement('em');
        em.className = "marker open";
        em.innerHTML = "-";
        var span = document.createElement('span');
        var link = document.createElement('p');
        var Content = document.createElement('i');
        Content.innerHTML = "group " + count;
        Content.style="font-weight:800";
        count++;
        element.appendChild(span);
        span.appendChild(link);
        link.appendChild(em);
        link.appendChild(Content);
        element.appendChild(newUL);
        item.forEach(function (item, i, arr) {
            if (typeof item == "string" && item.match(/^([a-z]+)$/i)) {
                newUL.appendChild(makeElem(item, i, arr));
            }
            if (typeof item == "string" && item.match(/^([a-z]+)\.([a-z\.]{2,6})$/i)) {
                newUL.lastChild.lastChild.lastChild.lastChild.innerHTML += " " + item;
            }
            if (item instanceof Array) {
                newUL.appendChild(makeanotherArr(item, i, arr))
            }
        });
        return element;
    }


    function select(){ //method for reading all input
        mothertree.addingBlock.select=document.getElementById("select");
        mothertree.addingBlock.none=document.getElementById("none");
        mothertree.addingBlock.yes=document.getElementById("yes");
        mothertree.addingBlock.names=document.getElementById("name");
        mothertree.addingBlock.url=document.getElementById("url");
        mothertree.addingBlock.add=document.getElementById("add");
        mothertree.addingBlock.select.innerHTML='<option value="Main" id="Main">Main</option>';
        mothertree.addingBlock.Main=document.getElementById("Main");
        for (var i=1;i<count;i++){
            var option=document.createElement('option');
            option.innerHTML="Group "+i;
            option.value="group"+i;
            mothertree.addingBlock.select.appendChild(option);
        }
    }
    select();

    this.addingBlock.add.onclick=function(){ //adding ellem or group in our arr
        for (var i = 0; i <  mothertree.addingBlock.select.options.length; i++) {
            var option = mothertree.addingBlock.select.options[i];
            if (option.selected) {

                if(mothertree.addingBlock.none.selected){ // adding element
                    var currentOption = i;
                    var countForArr=1;

                    (function searchArr(arr){
                        arr.forEach(function(item){

                            if(item instanceof Array && currentOption==countForArr){
                                if(mothertree.addingBlock.names.value!=NaN && mothertree.addingBlock.url.value.match(/^([a-z]+)\.([a-z\.]{2,6})$/i)) {
                                    item.push(mothertree.addingBlock.names.value);
                                    item.push(mothertree.addingBlock.url.value);
                                    while (mothertree.mainUL.firstChild) {
                                        mothertree.mainUL.removeChild(mothertree.mainUL.firstChild);
                                    }
                                    countForArr+=1;
                                    count=1;
                                    mothertree.intArr();
                                }
                            }

                            else if(item instanceof Array && countForArr!=currentOption) {
                                ++countForArr;
                                searchArr(item);

                            }
                        });
                    })(mothertree.arr);
                }

                if(mothertree.addingBlock.yes.selected){ //adding group
                    var currentOption = i;
                    var countForArr=1;
                    var newArr=[];
                    (function searchArr(arr){
                        arr.forEach(function(item, j, arr){
                            if(item instanceof Array && currentOption==countForArr){
                                if(mothertree.addingBlock.names.value!=NaN && mothertree.addingBlock.url.value.match(/^([a-z]+)\.([a-z\.]{2,6})$/i)) {
                                    newArr.push(mothertree.addingBlock.names.value);
                                    newArr.push(mothertree.addingBlock.url.value);
                                    item.push(newArr);
                                    while (mothertree.mainUL.firstChild) {
                                        mothertree.mainUL.removeChild(mothertree.mainUL.firstChild);
                                    }
                                    countForArr+=1;
                                    count=1;
                                    mothertree.intArr();
                                    select()

                                }
                            }

                            else if(item instanceof Array && countForArr!=currentOption) {
                                ++countForArr;
                                searchArr(item);

                            }
                        });
                    })(mothertree.arr);
                }
            }
            if(i==0 && option.selected){
                if(mothertree.addingBlock.none.selected){
                    if(mothertree.addingBlock.names.value!=NaN && mothertree.addingBlock.url.value.match(/^([a-z]+)\.([a-z\.]{2,6})$/i)) {
                        mothertree.arr.push(mothertree.addingBlock.names.value);
                        mothertree.arr.push(mothertree.addingBlock.url.value);
                        ++countForArr;
                        count=1;
                        while (mothertree.mainUL.firstChild) {
                            mothertree.mainUL.removeChild(mothertree.mainUL.firstChild);
                        }
                        mothertree.intArr();
                        select()

                    }
                }
                if(mothertree.addingBlock.yes.selected){
                    var newArr=[];
                    if(mothertree.addingBlock.names.value!=NaN && mothertree.addingBlock.url.value.match(/^([a-z]+)\.([a-z\.]{2,6})$/i)) {
                        newArr.push(mothertree.addingBlock.names.value);
                        newArr.push(mothertree.addingBlock.url.value);
                        mothertree.arr.push(newArr);
                        ++countForArr;
                        count=1;
                        while (mothertree.mainUL.firstChild) {
                            mothertree.mainUL.removeChild(mothertree.mainUL.firstChild);
                        }
                        mothertree.intArr();
                        select()
                    }
                }
            }
        }

    };
    this.body.addEventListener("wheel", function (e) { //scrolling
        var getFirstElement=document.querySelectorAll('i');
        var e = e || window.event;
        var delta = e.deltaY || e.detail || e.wheelDelta;
            if(!document.querySelector(".focus")){
                countForKey = countForKey + (delta / 100);
                getFirstElement[countForKey-1].className="Content focus";

            }
            else if(document.querySelector(".focus") && countForKey<getFirstElement.length-1 && delta>0){
                countForKey = countForKey + (delta / 100);
                getFirstElement[countForKey-1].className="Content";
                getFirstElement[countForKey].className="Content focus";

            }
            else if(document.querySelector(".focus") && delta<0 && countForKey>0){
                getFirstElement[countForKey-1].className="Content focus";
                getFirstElement[countForKey].className="Content";
                countForKey = countForKey + (delta / 100);
            }
    });

    this.body.onkeydown = function (e) {
        var getFirstElement=document.querySelectorAll('i');
        var keyCode = e.keyCode;
        if(keyCode==40){//down
            if(!document.querySelector(".focus")){
                countForKey++;
                getFirstElement[countForKey].className="Content focus";

            }
            else if(document.querySelector(".focus") && countForKey<getFirstElement.length-1){
                countForKey++;
                getFirstElement[countForKey-1].className="Content";
                getFirstElement[countForKey].className="Content focus";

            }
        }
        if(keyCode==38){//up
            if(document.querySelector(".focus") && countForKey>0 ){
                var getFirstElement=document.querySelectorAll('i');
                getFirstElement[countForKey-1].className="Content focus";
                getFirstElement[countForKey].className="Content";
                countForKey--;
            }
        }
        if(keyCode==13){//enter
            e.preventDefault();
            if(document.querySelector(".focus")){
                alert(document.querySelector(".focus").innerHTML);
            }
        }
    };
})();
