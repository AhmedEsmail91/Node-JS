// fetch(url [, options])  
// .then(response => {    // Handle the response  })  
// .catch(error => {    // Handle any errors  });



// Increamenting the innerHTML of the tBody id with the data from the response

function prepareEditModal(productId, productName, productDescription, productPrice) {
    // Set the values of the modal's input fields
    document.getElementById('M_productName').value = productName;
    document.getElementById('M_productPrice').value = productPrice;
    document.getElementById('M_productDesc').value = productDescription;
    document.getElementById('exampleModalLongTitle').innerHTML = "Edit Product";
    // Update the onclick attribute of the Save changes button to include the productId
    document.querySelector('#saveChangesProduct').setAttribute('onclick', [`editProduct('${productId}')`]);
}

function showProducts(products){
    var cartona=``
    for (let index = 0; index < products.length; index++) {
        cartona+=
        `<tr>
            <td>${index+1}</td>
            <td>${products[index].name}</td>
            <td>${products[index].description}</td>
            <td>${products[index].price}</td>
            <td>

                <button class="btn btn-primary" data-toggle="modal" data-target="#edit" onclick="prepareEditModal('${products[index].id}', '${products[index].name}', '${products[index].description}', '${products[index].price}')">Edit</button>

                <button class="btn btn-danger" onclick="deleteProduct(${products[index].id})">Delete</button>
            </td>
        </tr>
    `}
    document.getElementById("tBody").innerHTML=cartona;
}
//API Calls
function callData(){
    const data=fetch('http://localhost:3000/products')
    .then(response => {
        return response.json();
    })
    .then(ResponseData => {
        if(ResponseData.message=="success")showProducts(ResponseData.data);
    })
    .catch(error => {
        console.log(error);
    });
}
callData() // to display the data on the page load

// Create the Table Data Dynamically using JavaScript Pure
// function tableCreate(Respose) {
//     var tblBody = document.getElementById("tableId");
//     var cols=Object.keys(Respose.data[0]);
//     var dataRows=Respose.data;

//     for (var j = 0; j <= dataRows.length; j++) {

//         var tr = document.createElement("tr");
//         //Making Indexing
//         var index=document.createElement("td");
//         index.innerHTML=j+1;
//         tr.appendChild(index);

//         //fill Data to Table
//         for (var i = 1; i < cols.length; i++) {

//             var cell = document.createElement("td");// create cell.
//             cell.innerHTML=dataRows[j][cols[i]];// fill cell with data.
//             tr.appendChild(cell);//append cell to row.
//         }
//         action_cell=document.createElement("td");
//         action_cell.setAttribute("class","row justify-content-around");
        
//         var actions=["Edit","Delete"];
//         for (let index = 0; index < actions.length; index++) {
//             var btn=document.createElement("button");

//             if (index==0) btn.setAttribute("class","btn btn-primary");
//             else btn.setAttribute("class","btn btn-danger");
//             btn.innerHTML=actions[index];
//             action_cell.appendChild(btn);
//             tr.appendChild(action_cell);
            
//         }
//         tblBody.appendChild(tr);// append row to table body.
//     }
// }

// get input for adding
function getInputValue(){
    let name=document.getElementById('productName').value;
    let price=document.getElementById('productPrice').value;
    let desc=document.getElementById('productDesc').value;
    return {name,price,desc};
}
//add product
function addProduct(){
    let productObject=getInputValue();
    fetch('http://localhost:3000/products',{
        method:'POST',
        headers:{
            'Content-Type':'application/json'
        },
        body:JSON.stringify(productObject)
    }).then(response=>{
        return response.json();
    }).then(data=>{
        callData()// instead of reloading the page to show changes
        console.log(data);
    }).catch(error=>{
        console.log(error);
    });
}
//delete product
function deleteProduct(product){
    fetch('http://localhost:3000/products/'+product,{
        method:'DELETE'
    }).then(response=>{
        return response.json();
    }).then(data=>{
        callData()// instead of reloading the page to show changes
        console.log(data.message);  
    }).catch(error=>{
        console.log(error);
    });
    
}
//edit product
function editProduct(productId){
    let name=document.getElementById('M_productName').value;
    let price=document.getElementById('M_productPrice').value;
    let desc=document.getElementById('M_productDesc').value;
    let productObject={name,price,desc}
    
    
    fetch("http://localhost:3000/products/"+productId,{
        method:'put',
        headers:{
            'Content-Type':'application/json'},
        body:JSON.stringify(productObject)
    }).then(response=>{
        return response.json();
    }).then(
        ResponseData=>{
            callData()// instead of reloading the page to show changes
            console.log(ResponseData.message);
        }
    )
    .catch(error=>{
        console.log(error);
    });
}