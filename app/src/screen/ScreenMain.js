const Screen = require('./Screen');

/** Taja's index screen */
class ScreenMain extends Screen {
	/**
	 * Create ScreenMain
	 * @param {Taja} taja - Main context
	 * @param {Object} profile - Current user data
	 */
	constructor(taja, profile) {
		super(taja, profile);
	}

	/**
	 * Draw screen
	 * @override
	 * @param {number} delta
	 * @param {CanvasRenderingContext2D} ctx
	 */
	draw(delta, ctx) {

	}

	/**
	 * Fire when this screen appear screen
	 * @override
	 */
	async onShow() {

	}

	/**
	 * Fire when this screen disappear screen
	 * @override
	 */
	async onHide() {

	}
}

module.exports = ScreenMain;
