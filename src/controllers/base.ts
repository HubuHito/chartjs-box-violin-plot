import { BarController, IChartMeta } from 'chart.js'
import BoxplotElement from '../elements/element.boxplot'

export default abstract class Base extends BarController {
  abstract setHoverStyle(element: BoxplotElement, datasetIndex: number, index: number): void
  // abstract draw(): void
  parseObjectData(meta: IChartMeta, data: any[], start: number, count: number) {
    const parseData = data.map(item => ({
      x: item.median,
      y: Number(item.median)
    }))
    return super.parseObjectData(meta, parseData, start, count)
  }
}