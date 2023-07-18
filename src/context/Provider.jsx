import React, { useEffect, useState } from 'react'
import Context from './Context'

const Provider = ({children}) => {

const [purchase, setPurchase]=useState({})

useEffect(()=>{
  init()
},[])

// useEffect(()=>{
//   console.log(purchase)
// },[purchase])

const init = ()=>{
  getData()
}

const getData = ()=>{
    fetch('recipes/1.html')
    .then(response => response.text())
    .then(data => {
      // console.log(typeof(data))
      const parser = new DOMParser();
      const doc = parser.parseFromString(data, 'text/html')
      // console.log(doc)

      const timeDate = doc.getElementsByTagName('datahora')[0].textContent;
      // console.log(timeDate)
      const date = timeDate.split(' ')[0]
      const time = timeDate.split(' ')[1]
      // console.log(date, time)

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
      
      setPurchase({products, uniqueProducts, totalValue, date, time})
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

  return (
    <>
    <Context.Provider
    value={{
      purchase
    }}>
        {children}
    </Context.Provider>
    </>
  )
}

export default Provider