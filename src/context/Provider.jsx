import React, { useEffect, useState } from 'react'
import Context from './Context'
import { MONTHS, TOTAL_FILES } from '../assets/data'
import * as XLSX from 'xlsx';

const Provider = ({children}) => {

const [purchases, setPurchases]=useState([])
const [months,setMonths]=useState([])
const [resumes,setResumes]=useState([])
const [purchPerMonth,setPurchPerMonth]=useState([])

useEffect(()=>{
  init()
},[])

useEffect(()=>{
  setMonths(getMonths(purchases))
},[purchases])

useEffect(()=>{
  setResumes([])
  months.forEach((_,i)=>{
    const resume = getResume(months[i], purchases)
    setResumes(currentResumes=>[...currentResumes, resume])
  })
},[months])

// useEffect(()=>{
//   console.log(resumes)
// },[resumes])

const init = ()=>{
  getPurchases()
}

const getPurchases = ()=>{
  const path = 'recipes/'
  const typeFile = '.html'

  for(let i=0; i<TOTAL_FILES; i++){
    const wholePath = path + i + typeFile
      getData(wholePath)
  }
}

const getData = (path)=>{
    fetch(path)
    .then(response => response.text())
    .then(data => {
      // console.log(typeof(data))
      const parser = new DOMParser();
      const doc = parser.parseFromString(data, 'text/html')
      // console.log(doc)

      const timeDate = doc.getElementsByTagName('dhemi')[0].textContent;
      // console.log(timeDate)
      const date = timeDate.split('T')[0]
      const time = timeDate.split('T')[1].split('-')[0]
      // console.log(date, time)
      const monthNumber = Number(date.split('-')[1])
      const month = MONTHS[monthNumber-1]
      // console.log(month)

      const dets = [...doc.getElementsByTagName('det')];
      // console.log(dets)
  
      const products = dets.map(item=>{
          const name = item.getElementsByTagName('xprod')[0].textContent;
          const code = item.getElementsByTagName('cean')[0].textContent;
          const unit = item.getElementsByTagName('ucom')[0].textContent;
          const quan = +item.getElementsByTagName('qcom')[0].textContent;
          const vUnit = (+item.getElementsByTagName('vuncom')[0].textContent).toFixed(2);
          const vTotal = (+item.getElementsByTagName('vprod')[0].textContent).toFixed(2);
  
          return { name, code, unit, quan, vUnit, vTotal }
      })
      // console.log(products);

      const uniqueProducts=getUniqueItems(products)
  
      const totalValue = products.reduce((acumulator, item)=>{
          const value = +item.vTotal
          return acumulator + value
      },0)
      // console.log(totalValue)

      const newPurchase = {products, uniqueProducts, totalValue, date, time, month}
      
      setPurchases(currentPurchases=>[...currentPurchases, newPurchase])
    })
    .catch(error => {
      console.error('Ocorreu um erro:', error);
    });
}

const getUniqueItems = (items) => {
  const uniqueList = [];
  items.forEach((product) => {
    const existingProduct = uniqueList.find((item) => item.name === product.name);

    if (existingProduct) {
      const updatedProduct = {
        ...existingProduct,
        quan: existingProduct.quan + product.quan,
        vTotal: +existingProduct.vTotal + +product.vTotal,
      };
      uniqueList[uniqueList.indexOf(existingProduct)] = updatedProduct;
    } else {
      uniqueList.push(product);
    }
  });
  // console.log(uniqueList);
  // setUniqueProducts(uniqueList);
  return uniqueList;
};

const getMonths = (purchases)=>{
  const months = []
  purchases.forEach((purchase)=>{
    const existingMonth = months.find((item)=>item === purchase.month)
    if(!existingMonth){
      months.push(purchase.month)
    }
  })
  // console.log(months)
  return months
}

const getResume = (month, purchases)=>{
    const bigList = purchases.map(purchase=>{
      if(purchase.month===month){
        return purchase.uniqueProducts
      }
      else{
        return ''
      }
    })
    let listOfProducts = []
    for(let i=0; i<bigList.length; i++){
      listOfProducts = [...listOfProducts,...bigList[i]]
    }
    // console.log(listOfProducts)
  const products = getUniqueItems(listOfProducts)

  const totalValue = products.reduce((acumulator, item)=>{
    const value = +item.vTotal
    return acumulator + value
},0)

  const resume = {products, month, totalValue}
  // console.log(resume)
  return resume
}

const getPurchPerMonth =()=>{
  
}

const handleExport = (object)=>{
    var wb = XLSX.utils.book_new(),
    ws = XLSX.utils.json_to_sheet(object)

    XLSX.utils.book_append_sheet(wb, ws, "MySheet1");

    XLSX.writeFile(wb, 'MyExcel.xlsx');
}

  return (
    <>
    <Context.Provider
    value={{
      purchases,
      resumes,
      handleExport
    }}>
        {children}
    </Context.Provider>
    </>
  )
}

export default Provider