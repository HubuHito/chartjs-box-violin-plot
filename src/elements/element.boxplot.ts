import BaseBoxElement from './base' 

export default class BoxplotElement extends BaseBoxElement {
  static id = 'boxplotelement'
  static defaults = {
    ...BaseBoxElement.defaults
  }

  private medianColor = undefined
  private lowerColor = undefined

  constructor(cfg) {
    super(cfg)
    if (cfg) {
			Object.assign(this, cfg);
		}
  }

  draw(ctx: CanvasRenderingContext2D) {
    const { boxplot, backgroundColor, borderColor,borderWidth } = this.options
    const { outliers = [], items = [] } = boxplot
    
    ctx.save()
    ctx.fillStyle = backgroundColor
    ctx.strokeStyle = borderColor
    ctx.lineWidth = borderWidth

    this.drawBoxPlot(ctx)
    this.drawOutliers(ctx, outliers)

    ctx.restore()
    this.drawItems(ctx, items)
  }
  drawBoxPlot(ctx: CanvasRenderingContext2D) {
    if (this.horizontal) {
      this.drawBoxPlotHoriz(ctx)
    } else {
      this.drawBoxPlotVert(ctx);
    }
  }
  // 绘制垂直盒形图
  drawBoxPlotVert(ctx: CanvasRenderingContext2D) {
    const { x, width } = this
    const { boxplot } = this.options
    const x0 = x - width / 2

    // Draw the q1>q3 box
    if (boxplot.q3 > boxplot.q1) {
      ctx.fillRect(x0, boxplot.q1, width, boxplot.q3 - boxplot.q1);
    } else {
      ctx.fillRect(x0, boxplot.q3, width, boxplot.q1 - boxplot.q3);
    }

    // Draw the median line
    ctx.save();
    if (this.medianColor) {
      ctx.strokeStyle = this.medianColor;
    }
    ctx.beginPath();
    ctx.moveTo(x0, boxplot.median);
    ctx.lineTo(x0 + width, boxplot.median);

    // fill the part below the median with lowerColor
    if (this.lowerColor) {
      ctx.fillStyle = this.lowerColor;
      if (boxplot.q3 > boxplot.q1) {
        ctx.fillRect(x0, boxplot.median, width, boxplot.q3 - boxplot.median);
      } else {
        ctx.fillRect(x0, boxplot.median, width, boxplot.q1 - boxplot.median);
      }
    }

    ctx.closePath();
    ctx.stroke();
    ctx.restore();

    // Draw the border around the main q1>q3 box
    if (boxplot.q3 > boxplot.q1) {
      ctx.strokeRect(x0, boxplot.q1, width, boxplot.q3 - boxplot.q1);
    } else {
      ctx.strokeRect(x0, boxplot.q3, width, boxplot.q1 - boxplot.q3);
    }

    // Draw the whiskers
    ctx.beginPath();
    ctx.moveTo(x0, boxplot.whiskerMin);
    ctx.lineTo(x0 + width, boxplot.whiskerMin);
    ctx.moveTo(x, boxplot.whiskerMin);
    ctx.lineTo(x, boxplot.q1);
    ctx.moveTo(x0, boxplot.whiskerMax);
    ctx.lineTo(x0 + width, boxplot.whiskerMax);
    ctx.moveTo(x, boxplot.whiskerMax);
    ctx.lineTo(x, boxplot.q3);
    ctx.closePath();
    ctx.stroke();
  }
  // 绘制水平盒形图
  drawBoxPlotHoriz(ctx: CanvasRenderingContext2D) {
    const { y, height } = this
    const { boxplot } = this.options
    const y0 = y - height / 2;

    // Draw the q1>q3 box
    if (boxplot.q3 > boxplot.q1) {
      ctx.fillRect(boxplot.q1, y0, boxplot.q3 - boxplot.q1, height);
    } else {
      ctx.fillRect(boxplot.q3, y0, boxplot.q1 - boxplot.q3, height);
    }

    // Draw the median line
    ctx.save();
    if (this.medianColor) {
      ctx.strokeStyle = this.medianColor;
    }
    ctx.beginPath();
    ctx.moveTo(boxplot.median, y0);
    ctx.lineTo(boxplot.median, y0 + height);
    ctx.closePath();
    ctx.stroke();
    ctx.restore();

    // Draw the border around the main q1>q3 box
    if (boxplot.q3 > boxplot.q1) {
      ctx.strokeRect(boxplot.q1, y0, boxplot.q3 - boxplot.q1, height);
    } else {
      ctx.strokeRect(boxplot.q3, y0, boxplot.q1 - boxplot.q3, height);
    }

    // Draw the whiskers
    ctx.beginPath();
    ctx.moveTo(boxplot.whiskerMin, y0);
    ctx.lineTo(boxplot.whiskerMin, y0 + height);
    ctx.moveTo(boxplot.whiskerMin, y);
    ctx.lineTo(boxplot.q1, y);
    ctx.moveTo(boxplot.whiskerMax, y0);
    ctx.lineTo(boxplot.whiskerMax, y0 + height);
    ctx.moveTo(boxplot.whiskerMax, y);
    ctx.lineTo(boxplot.q3, y);
    ctx.closePath();
    ctx.stroke();
  }
}
