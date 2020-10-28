import Base from './base'
import { UpdateMode } from 'chart.js'
import { asViolinStats } from '../data'

export default class Violin extends Base {
  static id = 'violin'
  static defaults = {
    dataElementType: 'violinelement', // 自定义element
    points: 100,
    scales: {
      _index_: {
        type: 'category',
        offset: true,
        gridLines: {
          offsetGridLines: true
        }
      },
      _value_: {
        type: 'arraylinearscale',
        beginAtZero: true,
      }
    }
  }
  // 设置dataset鼠标悬浮时的样式
  setHoverStyle() {
  }
  update(mode: UpdateMode) {
    // 调用BarController更新方法方法
    super.update(mode)
    this.updateMetaViolin(mode)
  }
  // 设置elements中的violin属性
  private updateMetaViolin(mode: UpdateMode) {
    const meta = this.getMeta()
    meta.data.forEach((item, index) => {
      const properties = {
        options: {
          ...item.options, // 保留原有配置
          violin: this.calculateViolinValuesPixels(index)
        }
      }
      this.updateElement(item, index, properties, mode)
    })
    console.log(meta.data)
  }
  // 盒形图数据 -> 像素装换
  private calculateViolinValuesPixels(index: number) {
    const { data = [] } = this.getDataset() || {}
    const scale = this.getMeta().vScale
    const currentMetaData = data[index]

    const violin = asViolinStats(currentMetaData, {})

    if ((!Array.isArray(currentMetaData) && typeof currentMetaData === 'number' && !Number.isNaN) || violin == null) {
      return {
        min: currentMetaData,
        max: currentMetaData,
        median: currentMetaData,
        coords: [{v: currentMetaData, estimate: Number.NEGATIVE_INFINITY}],
        maxEstimate: Number.NEGATIVE_INFINITY
      }
    }

    const range = violin.max - violin.min
    const samples = []
    const inc = range / 100
    for (let v = violin.min; v <= violin.max && inc > 0; v += inc) {
      samples.push(v)
    }
    if (samples[samples.length - 1] !== violin.max) {
      samples.push(violin.max)
    }
    const coords = violin.coords || violin.kde(samples).map((v) => ({v: v[0], estimate: v[1]}))
    const violinPixel = {
      min: scale.getPixelForValue(violin.min, index),
      max: scale.getPixelForValue(violin.max, index),
      median: scale.getPixelForValue(violin.median, index),
      coords: coords.map(({v, estimate}) => ({v: scale.getPixelForValue(v, index), estimate})),
      maxEstimate: coords.reduce((a, d) => Math.max(a, d.estimate), Number.NEGATIVE_INFINITY)
    }
    return violinPixel
  }
}