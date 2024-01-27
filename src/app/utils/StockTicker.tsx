'use client'

import React, { useEffect, useState } from 'react'

import Marquee from 'react-fast-marquee'

interface Stock {
  symbol: string
  price: number
  change: number
  changePercent: number
}

const StockTickerItem: React.FC<{ symbol: string; stock: Stock }> = ({
  symbol,
  stock
}) => {
  return (
    <div className="mx-2 inline-flex flex-row items-center justify-center gap-3">
      <span className="font-bold text-white">{symbol}</span>
      <span
        className={`text-sm ${
          stock.change < 0 ? 'text-green-500' : 'text-red-500'
        }`}
      >
        ${stock.price.toFixed(2)}
      </span>
      <span
        className={`text-xs ${
          stock.change < 0 ? 'text-green-500' : 'text-red-500'
        }`}
      >
        ({stock.changePercent.toFixed(2)}%)
      </span>
    </div>
  )
}

const stockSymbols: string[] = [
  'TME',
  'BZ',
  'LI',
  'NTES',
  'ZTO',
  'BABA',
  'BIDU',
  'TCOM',
  'TAL',
  'YUMC'
]
const StockTicker: React.FC<{ className?: string }> = ({ className }) => {
  const [stocks, setStocks] = useState<Stock[]>([])
  const tickerClass = `relative overflow-hidden bg-black ${className || ''}`

  useEffect(() => {
    const fetchStocks = async () => {
      try {
        const apiKey = process.env.NEXT_PUBLIC_ALPHA_VANTAGE_API_KEY
        const promises = stockSymbols.map(symbol =>
          fetch(
            `https://www.alphavantage.co/query?function=GLOBAL_QUOTE&symbol=${symbol}&apikey=${apiKey}`
          ).then(response => response.json())
        )

        const results = await Promise.all(promises)
        const transformedData = results
          .map((result, index) => {
            const quote = result['Global Quote']
            if (quote) {
              const price = parseFloat(quote['05. price']) || 0
              const previousClose = parseFloat(quote['08. previous close']) || 0
              const change = price - previousClose
              const changePercent =
                previousClose !== 0 ? (change / previousClose) * 100 : 0

              return {
                symbol: stockSymbols[index],
                price,
                change,
                changePercent
              }
            }
            return null
          })
          .filter(stock => stock !== null)

        setStocks(transformedData as Stock[])
      } catch (error) {
        console.error('Error fetching stock data:', error)
      }
    }

    fetchStocks()
  }, [])

  return (
    <div className={tickerClass}>
      <Marquee pauseOnHover={false} gradient={false} speed={100}>
        {[...stocks, ...stocks].map(
          (stock, index) =>
            stock && (
              <StockTickerItem
                key={index}
                symbol={stock.symbol}
                stock={stock}
              />
            )
        )}
      </Marquee>
    </div>
  )
}

export default StockTicker
