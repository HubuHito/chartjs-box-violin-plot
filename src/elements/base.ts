import { Rectangle, IRectangleOptions, PointStyle } from 'chart.js'
import { drawPoint } from 'chart.js/helpers'
import { rnd } from '../data'

interface IBoxPlotRectangleOptions extends IRectangleOptions {
  boxplot?: any
  violin?: any
}

export default abstract class BaseBoxElement extends Rectangle {
  abstract draw(ctx: CanvasRenderingContext2D): void
  static defaults = {
    ...Rectangle.defaults,
    // borderWidth: 1,
    // outlierRadius: 2,
    // outlierColor: Rectangle.defaults.backgroundColor,
    // lowerColor: Rectangle.defaults.lowerColor,
    // medianColor: null,
    // itemRadius: 0,
    // itemStyle: 'circle',
    // itemBackgroundColor: Rectangle.defaults.backgroundColor,
    // itemBorderColor: Rectangle.defaults.borderColor,
    // hitPadding: 2,
    // outlierHitRadius: 4,
    // tooltipDecimals: 2
  }

  public options: IBoxPlotRectangleOptions = undefined
  public itemRadius = 4
  public itemBorderColor = Rectangle.defaults.borderColor || 'rgba(0,0,0,0.1)'
  public itemBackgroundColor = Rectangle.defaults.backgroundColor || 'rgba(0,0,0,0.1)'
  public itemStyle: PointStyle = 'circle'
  public itemBorderWidth = 1
  public horizontal = false
  public width = undefined
  public height = undefined
  public outlierRadius = 4
  public outlierColor = 'rgba(0,0,0,0.1)'

  // 绘制data数据点
  drawItems(ctx: CanvasRenderingContext2D, items: number[]) {
    if (items.length === 0 || this.itemRadius <= 0) return

    ctx.save()
    ctx.strokeStyle = this.itemBorderColor
    ctx.fillStyle = this.itemBackgroundColor
    // jitter based on random data
    // use the datesetindex and index to initialize the random number generator
    const random = rnd(1000)

    if (!this.horizontal) {
      items.forEach((v) => {
        drawPoint(ctx, { 
          pointStyle: this.itemStyle, 
          radius: this.itemRadius,
          borderWidth: this.itemBorderWidth
        }, this.x - this.width / 2 + random() * this.width, v)
      })
    } else {
      items.forEach((v) => {
        drawPoint(ctx, {
          pointStyle: this.itemStyle, 
          radius: this.itemRadius,
          borderWidth: this.itemBorderWidth
        }, v, this.y - this.height / 2 + random() * this.height)
      })
    }
    ctx.restore()
  }
  // 绘制dataset中配置的Outliers数据点
  drawOutliers(ctx: CanvasRenderingContext2D, outliers: number[]) {
    if (this.outlierRadius <= 0 || outliers.length === 0) return

    ctx.fillStyle = this.outlierColor
    ctx.beginPath()
    if (!this.horizontal) {
      // todo 属性名称
      outliers.forEach((v) => {
        drawPoint(ctx, {
          pointStyle: this.itemStyle,
          radius: this.outlierRadius,
          borderWidth: this.itemBorderWidth
        }, this.x, v)
      })
    } else {
      outliers.forEach((v) => {
        drawPoint(ctx, {
          pointStyle: this.itemStyle,
          radius: this.outlierRadius,
          borderWidth: this.itemBorderWidth
        }, v, this.y)
      })
    }
    ctx.fill()
    ctx.closePath()
  }
}
