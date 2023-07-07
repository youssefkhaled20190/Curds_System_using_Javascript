// call all the inputs 
let tittle = document.getElementById('tittle');
let price = document.getElementById('price');
let ads = document.getElementById('ads');
let taxes = document.getElementById('taxes');
let discount = document.getElementById('discount');
let total = document.getElementById('total');
let count = document.getElementById('count');
let category = document.getElementById('category');
let search = document.getElementById('search');
let create  = document.getElementById('submit');
let tmp;
let mood = "create";


// console.log(tittle,price,ads,taxes,discount,count,category,search);


// get the total price of the product 
function GetTotal(){
    if (price.value != ''){
        let result = (+price.value + +ads.value + +taxes.value)- +discount.value;
        total.innerHTML = result;
        total.style.background =" #ec38bc";
    }else{
        total.innerHTML ='';
        total.style.background =" #f1b9e1";
    }
}

// create element 

let products;
if (localStorage.product !=null){
    products = JSON.parse(localStorage.product);
}else{
    products = [];
}
create.onclick = function (){
    let _newproduct = {
        Tittle : tittle.value.toLowerCase() ,
        Price : price.value,
        Ads : ads.value,
        Taxes : taxes.value,
        Discount : discount.value,
        Total :total.innerHTML,
        Count : count.value,
        Category : category.value.toLowerCase() ,
    }

    if (mood === 'create'){
        if(_newproduct.Count > 1){
            for(let i=0 ; i< _newproduct.Count ; i++){
                products.push(_newproduct);
            }
        }else{
            products.push(_newproduct);
        }
    }else{
        products[tmp]=_newproduct;
        mood = 'create';
        create.innerHTML = `create`;
        count.style.display="block";
        
    }
    
localStorage.setItem('product' , JSON.stringify(products));
ClearInputs()
ShowData()
}

// clear inputs after create it 

function ClearInputs (){
    tittle.value ="" 
    price.value = ""
    ads.value =""
    taxes.value=""
    discount.value=""
    total.innerHTML=""
    count.value=""
    category.value=""
}


// to read data 

function ShowData(){
    GetTotal()
    let table='';
    for(let i =0 ; i<products.length;i++){
         table +=`
        <tr>
        <td>${i}</td>
        <td>${products[i].Tittle}</td>
        <td>${products[i].Price}</td>
        <td>${products[i].Ads}</td>
        <td>${products[i].Taxes}</td>
        <td>${products[i].Discount}</td>
        <td>${products[i].Total}</td>
        <td>${products[i].Category}</td>
        <td><button onclick = "UpdataData(${i})" id="update">Update</button></td>
        <td><button  onclick="DeleteData(${i})" id="delete">Delete</button></td>
    </tr>
        `
    }
    document.getElementById("tbody").innerHTML=table;
    let DeleteButton = document.getElementById("delete_all");
    if(products.length > 0){
        DeleteButton.innerHTML=`
        <button onclick = "DeleteAll()">Delete All ( ${products.length} )</button> `
    }
    else{
        DeleteButton.innerHTML='';
    }
}

ShowData()

// delete specific data 
function DeleteData (id){
    products.splice(id,1);
    localStorage.products = JSON.stringify(products);
    ShowData()
}
// delete alldata
function DeleteAll(){
    localStorage.clear()
    products.splice(0)
    ShowData()
}
// Update alldata

function UpdataData(id){
    tittle.value=products[id].Tittle;
    price.value=products[id].Price;
    ads.value=products[id].Ads;
    taxes.value=products[id].Taxes;
    discount.value=products[id].Discount;
    category.value=products[id].Category;
    GetTotal()
    tmp=id;
    create.innerHTML = `Update`;
    count.style.display="none";
    mood = "update";
    scroll({
        top :0 ,
        behavior:'smooth'
    })
}

let search_mood = "";

function SearchMod(id){

if (id == 'SearchTittle'){
    search_mood = 'tittle';
    search.placeholder = 'Search By Title'
}else{
    search_mood = 'Category';
    search.placeholder = 'Search By Category'
}
search.focus()
console.log(search_mood)
search.value="";
ShowData()
}




function SearchData(value){
    let table="";
for(let i=0; i<products.length;i++){
    if(search_mood == 'tittle'){
    
        if (products[i].Tittle.includes(value.toLowerCase())){
            table +=`
            <tr>
            <td>${i}</td>
            <td>${products[i].Tittle}</td>
            <td>${products[i].Price}</td>
            <td>${products[i].Ads}</td>
            <td>${products[i].Taxes}</td>
            <td>${products[i].Discount}</td>
            <td>${products[i].Total}</td>
            <td>${products[i].Category}</td>
            <td><button onclick = "UpdataData(${i})" id="update">Update</button></td>
            <td><button  onclick="DeleteData(${i})" id="delete">Delete</button></td>
        </tr>
            ` 
    }
}else{
        if (products[i].Category.includes(value.toLowerCase())){
            table +=`
            <tr>
            <td>${i}</td>
            <td>${products[i].Tittle}</td>
            <td>${products[i].Price}</td>
            <td>${products[i].Ads}</td>
            <td>${products[i].Taxes}</td>
            <td>${products[i].Discount}</td>
            <td>${products[i].Total}</td>
            <td>${products[i].Category}</td>
            <td><button onclick = "UpdataData(${i})" id="update">Update</button></td>
            <td><button  onclick="DeleteData(${i})" id="delete">Delete</button></td>
        </tr>
            ` 
        }     
}
}
    document.getElementById("tbody").innerHTML=table;
}