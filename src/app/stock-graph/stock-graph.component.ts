import { Component, OnInit } from '@angular/core';
import { makeRequest, Stock } from './data';
const alpha = require('alphavantage')({ key: '4DX4PNFZKGWMX4B3' });

function getMonthFromString(month: string) {
  return new Date(Date.parse(month + " 1, 2012")).getMonth()
}

@Component({
  selector: 'app-stock-graph',
  templateUrl: './stock-graph.component.html',
  styleUrls: ['./stock-graph.component.scss']
})
export class StockGraphComponent implements OnInit {
  public data: Stock[][] = [];
  constructor() {
  }

  ngOnInit() {
    this.fetchConsumerPriceIndex().then((value) => {
      this.data = [ ...this.data, value]
    })
    this.fetchStockData('MSFT').then((value) => {
      this.data = [ ...this.data, value]
    })
    console.log(this.data)
  }

  async fetchConsumerPriceIndex(): Promise<Stock[]> {
    const apiKey = '6f5062dafec142749a92391e389490a5'
    const fetchedData: string = await makeRequest("GET", `https://api.bls.gov/publicAPI/v2/timeseries/data/CUUR0000SA0?registrationkey=${apiKey}`)
    const parsedData = JSON.parse(fetchedData)
    const cpiData = parsedData["Results"]["series"][0]['data']
    const stockFormat = cpiData.map((datum: any) => {
      const { value, year, periodName } = datum
        const date = new Date(year, getMonthFromString(periodName), 1)
        const price: number = Number.parseFloat(value)
        const asStock = { time: date, open: price, high: price, low: price, close: price, volume: 1 }
        return asStock
    })
    const sortedStock = stockFormat.sort((a: Stock, b: Stock) => {
      return (a.time > b.time) ? 1 : -1
    })
    sortedStock.title = "Consumer Price Index [CUUR0000SA0]"
    return sortedStock
  }

  async fetchStockData(ticker: string): Promise<Stock[]> {
    const msftData = await alpha.data.monthly(ticker);
    const stockFormat: Stock[] = Object.entries(msftData["Monthly Time Series"]).map((
      value
    ) => {
      const date = new Date(value[0] as string)
      const prices = value[1] as any;
      const open: number = Number.parseFloat(prices['1. open'])
      const high: number = Number.parseFloat(prices['2. high'])
      const low: number = Number.parseFloat(prices['3. low'])
      const close: number = Number.parseFloat(prices['4. close'])
      const volume: number = Number.parseFloat(prices['5. volume'])
      return {
        time: date,
        open,
        high,
        low,
        close,
        volume
      }
    })
    const sortedStock = stockFormat.sort((a: Stock, b: Stock) => {
      return (a.time > b.time) ? 1 : -1
    })
    // @ts-ignore
    sortedStock.title = ticker
    return sortedStock
  }
}
