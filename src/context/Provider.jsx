import React, { useEffect, useState } from 'react'
import Context from './Context'

const Provider = ({children}) => {

const [products, setProducts]=useState([])
const [totalValue, setTotalValue]=useState(0)
const [uniqueProducts, setUniqueProducts]=useState([])

useEffect(()=>{
  init()
},[])

useEffect(()=>{
  getUniqueItems(products)
},[products])

const init = ()=>{
  getData()
}

const getData = ()=>{
    fetch('recipes/1.html')
    .then(response => response.text())
    .then(data => {
      // console.log(typeof(data))
      const parser = new DOMParser();
      const doc = parser.parseFromString(data, 'text/html');
      console.log(doc)
      const dets = [...doc.getElementsByTagName('det')];
      // console.log(dets)
  
      const products1 = dets.map(item=>{
          const name = item.getElementsByTagName('xprod')[0].textContent;
          const code = item.getElementsByTagName('cean')[0].textContent;
          const unit = item.getElementsByTagName('ucom')[0].textContent;
          const quan = +item.getElementsByTagName('qcom')[0].textContent;
          const vUnit = (+item.getElementsByTagName('vuncom')[0].textContent).toFixed(2);
          const vTotal = (+item.getElementsByTagName('vprod')[0].textContent).toFixed(2);
  
          return { name, code, unit, quan, vUnit, vTotal }
      })
      // console.log(products1);
      setProducts(products1)
  
      const totalValue1 = products1.reduce((acumulator, item)=>{
          const value = +item.vTotal
          return acumulator + value
      },0)
      // console.log(totalValue1)
      setTotalValue(totalValue1.toFixed(2))
  
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
  console.log(uniqueList);
  setUniqueProducts(uniqueList);
};

  return (
    <>
    <Context.Provider
    value={{
      products,
      totalValue
    }}>
        {children}
    </Context.Provider>
    </>
  )
}

export default Provider