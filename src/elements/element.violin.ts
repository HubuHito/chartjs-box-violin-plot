import BaseBoxElement from './base'
import { drawPoint } from 'chart.js/helpers'

export default class ViolinElement extends BaseBoxElement {
  static id = 'violinelement'
  static defaults = {
    ...BaseBoxElement.defaults
  }

  constructor(cfg) {
    super(cfg)
    if (cfg) {
			Object.assign(this, cfg)
		}
  }

  draw(ctx: CanvasRenderingContext2D) {
    const { violin, backgroundColor, borderColor,borderWidth } = this.options
    const { outliers = [], items = [] } = violin

    ctx.save()
    ctx.fillStyle = backgroundColor
    ctx.strokeStyle = borderColor
    ctx.lineWidth = borderWidth

    drawPoint(ctx, {
      pointStyle: 'rectRot',
      radius: 5,
      borderWidth: 1
    }, this.x, this.y)

    ctx.stroke()

    ctx.beginPath()
    this.drawViolin(ctx)
    ctx.stroke()
    ctx.fill()
    ctx.closePath()

    this.drawOutliers(ctx, outliers)

    ctx.restore()

    this.drawItems(ctx, items)
  }

  drawViolin(ctx: CanvasRenderingContext2D) {
    if (this.horizontal) {
      this.drawViolinHoriz(ctx)
    } else {
      this.drawViolinVert(ctx)
    }
  }

  drawViolinHoriz(ctx: CanvasRenderingContext2D) {
    const y = this.y
    const height = this.height
    const { violin = {} } = this.options
    const factor = (height / 2) / violin.maxEstimate
    ctx.moveTo(violin.min, y)
    violin.coords.forEach(({
      v,
      estimate
    }) => {
      ctx.lineTo(v, y - estimate * factor)
    })
    ctx.lineTo(violin.max, y)
    ctx.moveTo(violin.min, y)
    violin.coords.forEach(({
      v,
      estimate
    }) => {
      ctx.lineTo(v, y + estimate * factor)
    })
    ctx.lineTo(violin.max, y)
  }

  drawViolinVert(ctx: CanvasRenderingContext2D) {
    const x = this.x
    const width = this.width
    const { violin = {} } = this.options
    const factor = (width / 2) / violin.maxEstimate
    ctx.moveTo(x, violin.min)
    violin.coords.forEach(({
      v,
      estimate
    }) => {
      ctx.lineTo(x - estimate * factor, v)
    })
    ctx.lineTo(x, violin.max)
    ctx.moveTo(x, violin.min)
    violin.coords.forEach(({
      v,
      estimate
    }) => {
      ctx.lineTo(x + estimate * factor, v)
    })
    ctx.lineTo(x, violin.max)
  }
}