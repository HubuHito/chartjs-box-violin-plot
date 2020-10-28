import { UpdateMode, BarController } from 'chart.js'
import { asBoxPlotStats } from '../data'
import Base from './base'
import BoxplotElement from '../elements/element.boxplot'

export default class Boxplot extends Base {
  // 图表类型ID
  static id = 'boxplot'
  // 默认配置参数
  static defaults = {
    ...BarController.defaults,
    dataElementType: 'boxplotelement', // 自定义element
    animation: {
      // numbers: {
      //   type: 'number',
      //   properties: ['x', 'y', 'borderWidth', 'radius', 'width', 'height', 'sss']
      // }
    },
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

  // 调用BarController绘制方法
  // draw() {
  //   super.draw()
  // }

  // 设置dataset鼠标悬浮时的样式
  setHoverStyle(element: BoxplotElement, datasetIndex: number, index: number) {
    // todo
    // this.getStyle(index, true) // 获取当前样式
  }
  update(mode: UpdateMode) {
    // 调用BarController更新方法方法
    super.update(mode)
    this.updateMetaBoxplot(mode)
  }
  // 设置elements中的boxplot属性（绘制盒形图关键数据）
  private updateMetaBoxplot(mode: UpdateMode) {
    const meta = this.getMeta()
    meta.data.forEach((item, index) => {
      const properties = {
        options: {
          ...item.options, // 保留原有配置
          boxplot: this.calculateBoxPlotValuesPixels(index)
        }
      }
      this.updateElement(item, index, properties, mode)
    })
    console.log(meta.data)
  }
  // 盒形图数据 -> 像素装换
  private calculateBoxPlotValuesPixels(index: number) {
    const meta = this.getMeta()
    const { data = [] } = this.getDataset() || {}
    const currentMetaData = data[index]
    if (!currentMetaData) return null

    // const { ticks } = meta.vScale.options
    // 真实数据
    const boxplot = asBoxPlotStats(currentMetaData, {})
    // 真实数据对应的像素
    const boxplotPixel = {}

    Object.keys(boxplot).forEach((key, index) => {
      if (Array.isArray(boxplot[key])) {
        boxplotPixel[key] = boxplot[key].map(item => meta.vScale.getPixelForValue(Number(item), index))
      } else {
        boxplotPixel[key] = meta.vScale.getPixelForValue(Number(boxplot[key]), index)
      }
    })
    return boxplotPixel
  }
}