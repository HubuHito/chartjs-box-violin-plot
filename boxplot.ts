import { DatasetController } from 'chart.js'

class MyType extends DatasetController {
  static id = 'MyType'
  static defaults = {
    datasetElementType: false,
    dataElementType: 'point',
    dataElementOptions: [
      'hitRadius',
      'radius'
    ],
    scales: {
      _index_: {
        type: 'category',
      },
      _value_: {
        type: 'linear',
      },
    }
  }
  static beforeRegister() {}
  static afterRegister() {}

  update(mode) {
    console.log('update')
    const { data: points = [] } = this._cachedMeta
    this.updateElements(points, 0, points.length, mode)
  }
  updateElements(points, start, count, mode) {
		const me = this;
		const reset = mode === 'reset';
		const {xScale, yScale, _stacked} = me._cachedMeta;
		const firstOpts = me.resolveDataElementOptions(start, mode);
		const sharedOptions = me.getSharedOptions(firstOpts);
		const includeOptions = me.includeOptions(mode, sharedOptions);
		let prevParsed = start > 0 && me.getParsed(start - 1);

		for (let i = start; i < start + count; ++i) {
			const point = points[i];
			const parsed = me.getParsed(i);
			const x = xScale.getPixelForValue(parsed.x, i);
			const y = reset ? yScale.getBasePixel() : yScale.getPixelForValue(_stacked ? me.applyStack(yScale, parsed) : parsed.y, i);
			const properties: any = {
				x,
				y,
				skip: isNaN(x) || isNaN(y),
				stop: false
			};

			if (includeOptions) {
				properties.options = sharedOptions || me.resolveDataElementOptions(i, mode);
			}

			me.updateElement(point, i, properties, mode);

			prevParsed = parsed;
		}

		me.updateSharedOptions(sharedOptions, mode, firstOpts);
	}
  draw() {
    super.draw()
  }
  removeHoverStyle() {}
  setHoverStyle() {}
}

export default MyType