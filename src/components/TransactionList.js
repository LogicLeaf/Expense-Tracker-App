import React from "react";
export default function TransactionList({income , expense }){
    const combine=[...income,...expense]
    const list=combine.map((item,index)=>{
        return <h1 key={index}> {item.description} ${item.amount} type {item.choice} {item.date}</h1>
    })
    console.log(list)
    return(
        <>
       {list}
        </>
    )
}