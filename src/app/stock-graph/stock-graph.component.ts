import { Component, OnInit } from '@angular/core';
import { normalize } from 'path';
import { AMZNData, makeRequest, Stock } from './data';

function getMonthFromString(month: string) {
  return new Date(Date.parse(month + " 1, 2012")).getMonth()
}

@Component({
  selector: 'app-stock-graph',
  templateUrl: './stock-graph.component.html',
  styleUrls: ['./stock-graph.component.scss']
})
export class StockGraphComponent implements OnInit {
  public data: Stock[] = [];
  constructor() {
  }

  ngOnInit() {
    this.fetchConsumerPriceIndex().then((value) => {
      this.data = value
    })
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
      return a.time > b.time
    })
    const firstValue: number = sortedStock[0].open;
    const normalizedStock: Stock[] = sortedStock.map((notNormalized: Stock) => {
      const normalized = notNormalized;
      normalized.low = 100 * normalized.low / firstValue
      normalized.high = 100 * normalized.high / firstValue
      normalized.open = 100 * normalized.open / firstValue
      return normalized
    })
    return normalizedStock
  }
}
