import { IChartTypeRegistry } from 'chart.js'

declare module 'chart.js' {
    interface IChartTypeRegistry {
      MyType: any
      boxplot: any
    }
}