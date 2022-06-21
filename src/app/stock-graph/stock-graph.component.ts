import { Component, OnInit } from '@angular/core';
import { makeRequest, Stock } from './data';
const alpha = require('alphavantage')({ key: '4DX4PNFZKGWMX4B3' });

function getMonthFromString(month: string) {
  return new Date(Date.parse(month + " 1, 2012")).getMonth()
}

function getDaysInMonth(date: Date): number {
  const currentYear = date.getFullYear();
  const currentMonth = date.getMonth();
  const daysInCurrentMonth = new Date(currentYear, currentMonth, 0).getDate();
  return daysInCurrentMonth
}

function alignData(stocks: Stock[][]) {
  if (stocks.length <= 1) {
    return stocks;
  }
  let minLength = Number.POSITIVE_INFINITY;
  let minIndex = NaN;
  for (let i = 0; i < stocks.length; ++i) {
    if (minLength > stocks[i].length) {
      minLength = Math.min(minLength, stocks[i].length)
      minIndex = i;
    }
  }
  for (let i = 0; i < stocks.length; ++i) {
    const thisStock = stocks[i];
    const thisStockLength = thisStock.length;
    // @ts-ignore
    const stockTitle = thisStock.title
    const sliceStart = thisStockLength - minLength;
    const shortenedArray = thisStock.slice(sliceStart)
    // @ts-ignore
    shortenedArray.title = stockTitle
    stocks[i] = shortenedArray
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
  public loading: boolean = false;
  constructor() {
  }

  ngOnInit() {
    this.fetchConsumerPriceIndex().then((value) => {
      this.data = alignData([...this.data, value])
    })
  }

  addStock(stock_ticker: string) {
    this.loading = true;
    this.fetchStockData(stock_ticker).then((value) => {
      this.data = alignData([...this.data, value])
      this.loading = false;
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
    // @ts-ignore
    sortedStock.title = ticker
    console.log('SORTED STOCK $' + ticker)
    console.log(sortedStock)
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
    const dailyResolution: Stock[] = []
    sortedStock.forEach(
      (sorted) => {
        const daysToAdd = getDaysInMonth(sorted.time)
        for(let i = 0; i < daysToAdd; ++i) {
          dailyResolution.push(sorted)
        }
      }
    )
    // @ts-ignore
    dailyResolution.title = 'Inflation (CPI)'
    console.log("CPI")
    console.log(dailyResolution)
    return dailyResolution;
  }

}
