// get total [done]
//  create product
// save local storage
// clear inputs
// read
// count
// delete
// update
// search
// clean data



// Start application crud js

let title = document.getElementById('title');
let price = document.getElementById('price');
let taxes = document.getElementById('taxes');
let discount = document.getElementById('discount');
let count = document.getElementById('count');
let total = document.getElementById('total');
let ads = document.getElementById('ads');
let category = document.getElementById('category');
let submit = document.getElementById('submit');
let mood = 'create';
let tmp;
// console.log( title, price, taxes, discount, count,total, category,submit );

// get total function
function getTotal() {
    if(price.value != '' && taxes.value != '' && ads.value != '' ){
        let result = (+price.value + +taxes.value + +ads.value) - +discount.value ;
        total.innerHTML = ' ' + result;
        total.style.backgroundColor = '#040'
    } else{
        total.innerHTML = '   ';
        total.style.backgroundColor = '#a00d02'
    }
}


// save local storage
let datapro;

if(localStorage.product != null){
    datapro = JSON.parse(localStorage.product);
}else{
    datapro = []
}
//  creat product
submit.onclick = function(){
    let newpro = {
        title: title.value.toLowerCase(),
        price: price.value,
        taxes: taxes.value,
        ads: ads.value,
        discount: discount.value,
        total: total.innerHTML,
        count: count.value,
        category: category.value.toLowerCase(),
    }

    if(mood === 'create'){
        if(newpro.count > 1){
            for(i = 0; i < newpro.count; i++){
                datapro.push(newpro);
            }
        } else{
            datapro.push(newpro);
        }   
    } else{
        datapro [tmp] = newpro;
        mood = 'create';
        submit.innerHTML = 'Create';
        count.style.display='block';
    }


    localStorage.setItem('product', JSON.stringify(datapro))
    // console.log(datapro)

    clearInputs();
    showdata()
}


// clear inputs
function clearInputs() {
    title.value = '';
    price.value = '';
    taxes.value = '';
    ads.value = '';
    discount.value = '';
    total.innerHTML = '';
    count.value = '';
    category.value = '';
}

// read data

function showdata(){
    getTotal();
    let table = '';
    for(let i = 0; i < datapro.length; i++ ){

        // table = datapro[i].title;
        // console.log(table);
        table +=`
        <tr>
            <td> ${i} </td>
            <td> ${datapro[i].title} </td>
            <td> ${datapro[i].price} </td>
            <td> ${datapro[i].ads} </td>
            <td> ${datapro[i].taxes}</td>
            <td> ${datapro[i].discount} </td>
            <td> ${datapro[i].total}</td>
            <td> ${datapro[i].category} </td>
            <td> <button onClick="updateData(${[i]})" id="update">update</button> </td>
            <td> <button onClick="deleteData(${[i]})" id="delete">delete</button> </td>
        </tr>
        `
    }
    document.getElementById('tbody').innerHTML = table;
   let btndelete = document.getElementById('DeleteAllData');
   if(datapro.length > 0) {
    btndelete.innerHTML = `
       <button onClick="deleteAllData()" id="deleteall">delete All (${datapro.length})</button>
       `
} else{
    btndelete.innerHTML = '';
}
}
showdata()

// Delete Data
function deleteData(i) {
    datapro.splice(i, 1);
    localStorage.product = JSON.stringify(datapro);
    showdata();
}

// delete All Data
function deleteAllData (){
    localStorage.clear();
    datapro.splice(0)
    showdata()
}

// Update Data Tr
function updateData(i){
    title.value = datapro[i].title;
    price.value = datapro[i].price;
    taxes.value = datapro[i].taxes;
    ads.value = datapro[i].ads;
    discount.value = datapro[i].discount;
    getTotal();
    count.style.display = 'none';
    category.value = datapro[i].category;
    submit.innerHTML = 'Update';
    mood = 'update';
    tmp = i;
    scroll({
        top: 0,
        behavior: 'smooth'
    })
}



// search

let searchMood = 'title';

function getSearchMood(id){
    let search = document.getElementById('search');
    if(id == 'searchTitle'){
        searchMood = 'title';
    }else {
        searchMood = 'category';
    }
    search.placeholder = 'Search By ' +searchMood;

    search.focus();
    search.value = '';
    showdata();
    console.log(searchMood);
}

function searchData(value){
    let table = '';

    for(let i =0; i < datapro.length; i++){
        if(searchMood == 'title'){
            if(datapro[i].title.includes(value.toLowerCase())){
                table +=`
                <tr>
                    <td> ${i} </td>
                    <td> ${datapro[i].title} </td>
                    <td> ${datapro[i].price} </td>
                    <td> ${datapro[i].ads} </td>
                    <td> ${datapro[i].taxes}</td>
                    <td> ${datapro[i].discount} </td>
                    <td> ${datapro[i].total}</td>
                    <td> ${datapro[i].category} </td>
                    <td> <button onClick="updateData(${[i]})" id="update">update</button> </td>
                    <td> <button onClick="deleteData(${[i]})" id="delete">delete</button> </td>
                </tr>
                `
            }
        } else{
        if(datapro[i].category.includes(value.toLowerCase())){
            table +=`
            <tr>
                <td> ${i} </td>
                <td> ${datapro[i].title} </td>
                <td> ${datapro[i].price} </td>
                <td> ${datapro[i].ads} </td>
                <td> ${datapro[i].taxes}</td>
                <td> ${datapro[i].discount} </td>
                <td> ${datapro[i].total}</td>
                <td> ${datapro[i].category} </td>
                <td> <button onClick="updateData(${[i]})" id="update">update</button> </td>
                <td> <button onClick="deleteData(${[i]})" id="delete">delete</button> </td>
            </tr>
            `
            }
        }
    }
    document.getElementById('tbody').innerHTML = table;
}
