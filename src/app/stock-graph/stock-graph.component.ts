import { Component, OnInit } from '@angular/core';
import { makeRequest, Stock } from './data';
const alpha = require('alphavantage')({ key: '4DX4PNFZKGWMX4B3' });

function getMonthFromString(month: string) {
  return new Date(Date.parse(month + " 1, 2012")).getMonth()
}

function padData(stocks: Stock[][]) {
  let maxLength = 0;
  let maxIndex = NaN;
  for (let i = 0; i < stocks.length; ++i) {
    if (maxLength < stocks[i].length) {
      maxLength = Math.max(maxLength, stocks[i].length)
      maxIndex = i;
    }
  }
  for (let i = 0; i < stocks.length; ++i) {
    // @ts-ignore
    const stockTitle = stocks[i].title
    const remainingLength = maxLength - stocks[i].length;
    const padValue = stocks[i][0]
    const supplement: Stock[] = []
    for (let i = 0; i < remainingLength; ++i) {
      const subDate = stocks[maxIndex][i].time
      const newPad = padValue;
      newPad.time = subDate;
      supplement.push(newPad)
    }
    const paddedArray = supplement.concat(stocks[i]);
    // @ts-ignore
    paddedArray.title = stockTitle
    stocks[i] = paddedArray
  }
  return stocks
}

@Component({
  selector: 'app-stock-graph',
  templateUrl: './stock-graph.component.html',
  styleUrls: ['./stock-graph.component.sass']
})
export class StockGraphComponent implements OnInit {
  public data: Stock[][] = [];
  constructor() {
  }

  ngOnInit() {
    this.fetchConsumerPriceIndex().then((value) => {
      this.data = padData([...this.data, value])
    })
  }

  addStock(stock_ticker: string) {
    this.fetchStockData(stock_ticker).then((value) => {
      this.data = padData([...this.data, value])
    })
  }

  addBestStocks() {
    this.fetchStockData('AMZN').then((value) => {
      this.data = padData([...this.data, value])
    })
    this.fetchStockData('BRK.A').then((value) => {
      this.data = padData([...this.data, value])
    })
    this.fetchStockData('MCD').then((value) => {
      this.data = padData([...this.data, value])
    })
  }

  async fetchStockData(ticker: string): Promise<Stock[]> {
    const fetchedData = await fetch(`https://inflation-ninja-backend.htvef4ep6odoq.us-west-2.cs.amazonlightsail.com/getStock?ticker=${ticker}`,
      {
        method: 'GET',
        redirect: 'follow'
      });
    const fetchedJson = await fetchedData.json()
    const dates = Object.keys(fetchedJson)
    const stockData = dates.map((date: string /** YYYY-MM-DD */) => {
      const dateParse = date.split('-')
      const year = Number.parseInt(dateParse[0]);
      const month = Number.parseInt(dateParse[1]) - 1;
      const day = Number.parseInt(dateParse[2]);
      const formatDate = new Date(year, month, day);
      const dayData = fetchedJson[date];
      return {
        time: formatDate,
        open: dayData['open'],
        close: dayData['close'],
        low: dayData['low'],
        high: dayData['high'],
        volume: dayData['volume']
      }
    })
    const sortedStock = stockData.sort((a: Stock, b: Stock) => {
        return (a.time > b.time) ? 1 : -1
      })
      console.log(stockData);
      // @ts-ignore
      sortedStock.title = ticker
      return sortedStock;
    }
    async fetchConsumerPriceIndex(): Promise<Stock[]> {
      const fetchedData = await fetch(`https://inflation-ninja-backend.htvef4ep6odoq.us-west-2.cs.amazonlightsail.com/getStock?ticker=Inflation`,
      {
        method: 'GET',
        redirect: 'follow'
      });
    const fetchedJson = await fetchedData.json()
    const dates = Object.keys(fetchedJson)
    const stockData = dates.map((date: string /** YYYY-MM-DD */) => {
      const dayData = Number.parseFloat(fetchedJson[date]);
      const dateParse = date.split('-')
      const year = Number.parseInt(dateParse[0]);
      const month = Number.parseInt(dateParse[1]) - 1;
      const day = Number.parseInt(dateParse[2]);
      const formatDate = new Date(year, month, day);
      return {
        time: formatDate,
        open: dayData,
        close: dayData,
        low: dayData,
        high: dayData,
        volume: 1
      }
    })
    const sortedStock = stockData.sort((a: Stock, b: Stock) => {
        return (a.time > b.time) ? 1 : -1
      })
      console.log('sortedStock');
      console.log(sortedStock);
      // @ts-ignore
      sortedStock.title = 'Inflation (CPI)'
      return sortedStock;
    }
  
}
