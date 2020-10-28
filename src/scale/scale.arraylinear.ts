import { LinearScale, Element } from 'chart.js'
import { asValueStats } from '../data'

export default class ArratLinearScale extends LinearScale {
  static id = 'arraylinearscale'
  static defaults = {}
  determineDataLimits() {
    const { max, min } = this.getMinMax(false)
    this.max = max
    this.min = min

    // 计算原始数据的最大和最小值
    const metas = this.getMatchingVisibleMetas() || []
    metas.forEach((meta) => {
      const { data = [] } = meta.controller.getDataset()
      data.forEach((data: any, elementIndex) => {
        if (!this.chart.getDataVisibility(elementIndex)) return
        
        // todo
        const minStats = 'min'
        const maxStats = 'max'
        const stats = asValueStats(data, minStats, maxStats, this.options.ticks)
        let minValue
        let maxValue

        if (stats) {
          minValue = stats[minStats]
          maxValue = stats[maxStats]
        }

        if (this.min === null || minValue < this.min) {
          this.min = minValue
        }

        if (this.max === null || maxValue > this.max) {
          this.max = maxValue
        }
      })
    })
  }
}