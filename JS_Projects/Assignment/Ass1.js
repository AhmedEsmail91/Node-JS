function years_to_days(years){
    return years*365;
}
function smallest(array){
    var min=array[0];
    for (let index = 0; index < array.length; index++) {
        if(min>array[index])min=array[index];
    }
    return min;
}
let arr=[58,2,10,5,2,6,62]
console.log('smallest => '+smallest(arr)+'\n')
function bubble_sort(arr){
    check=false;
    for (let index = 0; index < array.length; index++) {
        element=array[index]
        if(element<0)check=true;
    }
    if(!check){for (let i = 0; i < arr.length; i++) {
        for (let j = i+1; j < arr.length; j++) {
           if(arr[i]>arr[j]){
            temp=arr[i];
            arr[i]=arr[j]
            arr[j]=temp
           }
        }
    }
    return arr }
    else{
        console.log("sorry can't execute")
        return;
    }
}
let array=[123,345,-56,7,78,0];
bubble_sort(array)
console.log("Sorting:")
console.log(array)