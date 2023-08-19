import React, { useEffect, useState } from 'react'
import Context from './Context'
import { CATEGORIES, MON, MONTHS, NUBANK, SANTANDER, TOTAL_FILES } from '../assets/data'
import * as XLSX from 'xlsx';

const Provider = ({children}) => {

////////////////////////////////////
// MERCADO //

const [purchases, setPurchases]=useState([])
const [months,setMonths]=useState([])
const [resumes,setResumes]=useState([])

useEffect(()=>{
  setMonths(getMonths(purchases))
},[purchases])

useEffect(()=>{
  // console.log(months)
  setResumes([])
  months.forEach((_,i)=>{
    const resume = getResume(months[i])
    setResumes(currentResumes=>[...currentResumes, resume])
  })
},[months])

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

          let category;
          let subcategory;
          CATEGORIES.map(cat=>{
            cat.subcategories.map(sub=>{
              if(sub.items.includes(name)){
                category = cat.category;
                subcategory = sub.subcategory;
              }
            })
          })
  
          return { name, code, category, subcategory, unit, quan, vUnit, vTotal }
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
    const existingMonth = months.find((item)=>item.month === purchase.month)
    if(!existingMonth){
      months.push({
        month: purchase.month,
        purchases: [
          purchase
        ]
      })
    }else{
      const index = months.indexOf(existingMonth)
      months[index].purchases.push(purchase)
    }
  })
  // console.log(months)
  return months
}

const getResume = (month)=>{
    const bigList = month.purchases.map(purchase=>{
        return purchase.uniqueProducts
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

  const resume = {products, month: month.month, totalValue}
  // console.log(resume)
  return resume
}

////////////////////////////////////
// NUBANK //

const [nubankPurch, setNubankPurch]=useState([])
const [nubankPeriods, setNubankPeriods]=useState([])

const getNubankPurch = ()=>{
  const items = NUBANK.map((item)=>{

    const day = +item.slice(0,2)
    const month = MON.indexOf(item.slice(3,6))+1
    const date = new Date(2023, month-1, day)
    const period = date.getDate() >= 2? date.getMonth()+1 : date.getMonth()!==0? date.getMonth() : 12
    const price = item.match(/\d+,\d+/)[0].replace(',','.');
    const parcela = item.match(/ - .*/)? item.match(/ - .*/)[0].slice(3,6) : '1/1';
    const description = item.match(/ - .*/)? item.slice(7, item.length - price.length - 6 - 1) : item.slice(7, item.length - price.length - 1);
    let type;
    if(description.slice(0,12)==='Pagamento em'){
      type = 'Pagamento'
    } else{
      type = 'Compra'
    }
  return { date, period, price: +price, description, parcela, type};
  })
  // console.log(items)
  return items;
}

const getPeriods = (purchases)=>{
  const periods = []
  purchases.forEach((purchase)=>{
    const existingPeriod = periods.find((item)=>item.period === purchase.period)
    if(!existingPeriod){
      periods.push({
        period: purchase.period,
        purchases: [
          purchase
        ]
      })
    }else{
      const index = periods.indexOf(existingPeriod)
      periods[index].purchases.push(purchase)
    }
  })
  console.log(periods)
  return periods
}

useEffect(()=>{
  setNubankPeriods(getPeriods(nubankPurch))
},[nubankPurch])

////////////////////////////////////
// SANTANDER //

const [santanderPurch, setSantanderPurch]=useState([])
const [santanderPeriods, setSantanderPeriods]=useState([])

const getSantanderPurch=()=>{
  const items = SANTANDER.map(item1=>{

    const period = +item1.slice(-1)

    const item = item1.slice(0,2)==='1 ' || item1.slice(0,2)==='2 ' ? item1.slice(2,-3) : item1.slice(0,-3)
    const day = +item.slice(0,2)
    const month = +item.slice(4,5)
    const date = new Date(2023, month-1, day)
    const price = item.match(/\d+,\d+/)[0].replace(',','.')
    const parcela = item.slice(5).match(/\d{2}\/\d{2}/)? item.slice(5).match(/\d{2}\/\d{2}/)[0] : '-';
    const description = item.slice(5).match(/\d{2}\/\d{2}/)? item.slice(6, item.length - price.length - 6 - 1) : item.slice(6, item.length - price.length - 1)

    return { date, period, price: +price, description, parcela};
  })
  // console.log(items)
  return items
}

useEffect(()=>{
  setSantanderPeriods(getPeriods(santanderPurch))
},[santanderPurch])

////////////////////////////////////
// GENERAL //

const init = ()=>{
  getPurchases()
  setNubankPurch(getNubankPurch())
  setSantanderPurch(getSantanderPurch())
}

useEffect(()=>{
  init()
},[])

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
      months,
      resumes,
      handleExport,
      santanderPeriods, nubankPeriods
    }}>
        {children}
    </Context.Provider>
    </>
  )
}

export default Provider