import Infestation from "../Classes/Infestation";
import User from "../Classes/User";
import Product from "../Classes/Product";
import Equipment from "../Classes/Equipment";
import Email from "../Classes/Email";
import Address from "../Classes/Address";
import Payment from "../Classes/Payment";
import {loadUser, storeUser} from "./Storage";
import {NUMBER_OF_INFESTATIONS} from "./UsefulConstants";

//EXAMPLE FORMATS

export const PLAN = "Current Plan"


//Infestation pulls from Async
//User from a database


export let instantiated = false;


export function getBugsList(){
    let arr = [];
    for (let x = 0; x < NUMBER_OF_INFESTATIONS; ++x) {
            arr.push(getBugByID(x));
    }
    return arr;
}


export function getBugByID(id: number):Infestation{
    if(typeof Infestation.singles[id] === 'undefined'){
        new Infestation(id);
    }
    return Infestation.singles[id];
}

export function getProductByID(id: number):Product{
    if(typeof Product.singles[id] === 'undefined'){
        new Product(id);
    }
    return Product.singles[id]
}

export function getEquipmentByID(id:number):Equipment{
    if(typeof Equipment.singles[id] === 'undefined'){
        new Equipment(id);
    }
    return Equipment.singles[id];
}



export function getPreventionPlan():Infestation{
    return getBugByID(0);
}

export function getUser(){
    if(!User.theUser){
        new User();
        instantiateUser();
    }
    return User.theUser;
}

function instantiateUser(){
    loadUser().then(
        (hi)=>{
        User.theUser = hi;
        console.log("The user instantiated from Async at "+ User.theUser.toString());
        instantiated = true;
        }, 
        (hi) => { throw Error(hi)}
        );
}

export function save(){
    console.log("The user saved to Async at "+User.theUser.toString());
    storeUser(User.theUser).then(r => r,  (reason) =>{throw Error(reason)});
}
