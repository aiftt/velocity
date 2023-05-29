/*
 * velocity-animate (C) 2014-2018 Julian Shapiro.
 *
 * Licensed under the MIT license. See LICENSE file in the project root for details.
 */

// Typedefs
import {HTMLorSVGElement, VelocityNormalizationsFn} from "../../../velocity.d";

// Project
import Velocity from "../../velocity";
import {Data} from "../data";
import {getNormalization} from "../normalizations/normalizations";
import {NoCacheNormalizations} from "../normalizations/normalizationsObject";

/**
 * The singular setPropertyValue, which routes the logic for all
 * normalizations.
 */
export function setPropertyValue(element: HTMLorSVGElement, propertyName: string, propertyValue: any, fn?: VelocityNormalizationsFn) {

  // FIX: value is translate3d(x,,) is not valid transform value
  let pValue  = propertyValue
  if (propertyName === "transform") {
    const [, values = ''] = propertyValue.match(/translate3d\(([^\)]+)\)/) || []
    if (values) {
      const [x = 0, y = 0, z = 0] = values.split(",")
      pValue = `translate3d(${x || 0}, ${y || 0}, ${z || 0})`
    }
  }

	const noCache = NoCacheNormalizations.has(propertyName),
		data = !noCache && Data(element);

	if (noCache || (data && data.cache[propertyName] !== propertyValue)) {
		// By setting it to undefined we force a true "get" later
		if (!noCache) {
			data.cache[propertyName] = pValue || undefined;
		}
		fn = fn || getNormalization(element, propertyName);
		if (fn) {
			fn(element, pValue);
		}

		if (Velocity.debug >= 2) {
			console.info(`Set "${propertyName}": "${pValue}"`, element);
		}
	}
}
