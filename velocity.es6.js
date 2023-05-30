/*
 * velocity-animate (C) 2014-2018 Julian Shapiro.
 *
 * Licensed under the MIT license. See LICENSE file in the project root for details.
 *
 * Runtime type checking methods.
 */
/**
 * Check if a variable is a boolean.
 */
function isBoolean(variable) {
    return variable === true || variable === false;
}
/**
 * Check if a variable is a function.
 */
function isFunction(variable) {
    return Object.prototype.toString.call(variable) === "[object Function]";
}
/**
 * Check if a variable is an HTMLElement or SVGElement.
 */
function isNode(variable) {
    return !!(variable && variable.nodeType);
}
/**
 * Check if a variable is a number.
 */
function isNumber(variable) {
    return typeof variable === "number";
}
/**
 * Check if a variable is a plain object (and not an instance).
 */
function isPlainObject(variable) {
    if (!variable || typeof variable !== "object" || variable.nodeType || Object.prototype.toString.call(variable) !== "[object Object]") {
        return false;
    }
    const proto = Object.getPrototypeOf(variable);
    return !proto || (proto.hasOwnProperty("constructor") && proto.constructor === Object);
}
/**
 * Check if a variable is a string.
 */
function isString(variable) {
    return typeof variable === "string";
}
/**
 * Check if a variable is the result of calling Velocity.
 */
function isVelocityResult(variable) {
    return variable && isNumber(variable.length) && isFunction(variable.velocity);
}
/**
 * Check if a variable is an array-like wrapped jQuery, Zepto or similar, where
 * each indexed value is a Node.
 */
function isWrapped(variable) {
    return variable
        && variable !== window
        && isNumber(variable.length)
        && !isString(variable)
        && !isFunction(variable)
        && !isNode(variable)
        && (variable.length === 0 || isNode(variable[0]));
}
/**
 * Check is a property is an enumerable member of an object.
 */
function propertyIsEnumerable(obj, property) {
    return Object.prototype.propertyIsEnumerable.call(obj, property);
}

/*
 * velocity-animate (C) 2014-2018 Julian Shapiro.
 *
 * Licensed under the MIT license. See LICENSE file in the project root for details.
 */
// Project
/**
 * Add a single className to an Element.
 */
function addClass(element, className) {
    if (element instanceof Element) {
        if (element.classList) {
            element.classList.add(className);
        }
        else {
            removeClass(element, className);
            element.className += (element.className.length ? " " : "") + className;
        }
    }
}
/**
 * Clone an array, works for array-like too.
 */
function cloneArray(arrayLike) {
    return Array.prototype.slice.call(arrayLike, 0);
}
/**
 * The <strong><code>defineProperty()</code></strong> function provides a
 * shortcut to defining a property that cannot be accidentally iterated across.
 */
function defineProperty(proto, name, value, readonly) {
    if (proto) {
        Object.defineProperty(proto, name, {
            configurable: !readonly,
            writable: !readonly,
            value,
        });
    }
}
/**
 * When there are multiple locations for a value pass them all in, then get the
 * first value that is valid.
 */
function getValue(...args) {
    for (const arg of args) {
        if (arg !== undefined && arg === arg) {
            return arg;
        }
    }
}
/**
 * Shim to get the current milliseconds - on anything except old IE it'll use
 * Date.now() and save creating an object. If that doesn't exist then it'll
 * create one that gets GC.
 */
const now = Date.now ? Date.now : () => {
    return (new Date()).getTime();
};
/**
 * Remove a single className from an Element.
 */
function removeClass(element, className) {
    if (element instanceof Element) {
        if (element.classList) {
            element.classList.remove(className);
        }
        else {
            // TODO: Need some jsperf tests on performance - can we get rid of the regex and maybe use split / array manipulation?
            element.className = element.className.replace(new RegExp(`(^|\\s)${className}(\\s|$)`, "gi"), " ");
        }
    }
}

/*
 * velocity-animate (C) 2014-2018 Julian Shapiro.
 *
 * Licensed under the MIT license. See LICENSE file in the project root for details.
 *
 * Actions that can be performed by passing a string instead of a propertiesMap.
 */
// Project
// Constants
const Actions = {};
/**
 * Used to register an action. This should never be called by users
 * directly, instead it should be called via  an action:<br/>
 * <code>Velocity("registerAction", "name", VelocityActionFn);</code>
 */
function registerAction(args, internal) {
    const name = args[0], callback = args[1];
    if (!isString(name)) {
        console.warn(`VelocityJS: Trying to set 'registerAction' name to an invalid value:`, name);
    }
    else if (!isFunction(callback)) {
        console.warn(`VelocityJS: Trying to set 'registerAction' callback to an invalid value:`, name, callback);
    }
    else if (Actions[name] && !propertyIsEnumerable(Actions, name)) {
        console.warn(`VelocityJS: Trying to override internal 'registerAction' callback`, name);
    }
    else if (internal === true) {
        defineProperty(Actions, name, callback);
    }
    else {
        Actions[name] = callback;
    }
}
registerAction(["registerAction", registerAction], true);

/*
 * velocity-animate (C) 2014-2018 Julian Shapiro.
 *
 * Licensed under the MIT license. See LICENSE file in the project root for details.
 *
 * Constants and defaults. These values should never change without a MINOR
 * version bump.
 */
/**
 * Without this it will only un-prefix properties that have a valid "normal"
 * version.
 */
const DURATION_FAST = 200;
const DURATION_NORMAL = 400;
const DURATION_SLOW = 600;
const FUZZY_MS_PER_SECOND = 980;
const DEFAULT_CACHE = true;
const DEFAULT_DELAY = 0;
const DEFAULT_DURATION = DURATION_NORMAL;
const DEFAULT_EASING = "swing";
const DEFAULT_FPSLIMIT = 60;
const DEFAULT_LOOP = 0;
const DEFAULT_PROMISE = true;
const DEFAULT_PROMISE_REJECT_EMPTY = true;
const DEFAULT_QUEUE = "";
const DEFAULT_REPEAT = 0;
const DEFAULT_SPEED = 1;
const DEFAULT_SYNC = true;
const CLASSNAME = "velocity-animating";
const Duration = {
    fast: DURATION_FAST,
    normal: DURATION_NORMAL,
    slow: DURATION_SLOW,
};

/*
 * velocity-animate (C) 2014-2018 Julian Shapiro.
 *
 * Licensed under the MIT license. See LICENSE file in the project root for details.
 */
// Project
// Constants
const Easings = {};
/**
 * Used to register a easing. This should never be called by users
 * directly, instead it should be called via an action:<br/>
 * <code>Velocity("registerEasing", "name", VelocityEasingFn);</code>
 */
function registerEasing(args) {
    const name = args[0], callback = args[1];
    if (!isString(name)) {
        console.warn(`VelocityJS: Trying to set 'registerEasing' name to an invalid value:`, name);
    }
    else if (!isFunction(callback)) {
        console.warn(`VelocityJS: Trying to set 'registerEasing' callback to an invalid value:`, name, callback);
    }
    else if (Easings[name]) {
        console.warn(`VelocityJS: Trying to override 'registerEasing' callback`, name);
    }
    else {
        Easings[name] = callback;
    }
}
registerAction(["registerEasing", registerEasing], true);
/**
 * Linear easing, used for sequence parts that don't have an actual easing
 * function.
 */
function linearEasing(percentComplete, startValue, endValue, property) {
    return startValue + percentComplete * (endValue - startValue);
}
/**
 * Swing is the default for jQuery and Velocity.
 */
function swingEasing(percentComplete, startValue, endValue) {
    return startValue + (0.5 - Math.cos(percentComplete * Math.PI) / 2) * (endValue - startValue);
}
/**
 * A less exaggerated version of easeInOutElastic.
 */
function springEasing(percentComplete, startValue, endValue) {
    return startValue + (1 - (Math.cos(percentComplete * 4.5 * Math.PI) * Math.exp(-percentComplete * 6))) * (endValue - startValue);
}
registerEasing(["linear", linearEasing]);
registerEasing(["swing", swingEasing]);
registerEasing(["spring", springEasing]);

/*
 * velocity-animate (C) 2014-2018 Julian Shapiro.
 *
 * Licensed under the MIT license. See LICENSE file in the project root for details.
 *
 * Bezier curve function generator. Copyright Gaetan Renaudeau. MIT License: http://en.wikipedia.org/wiki/MIT_License
 */
// Project
/**
 * Fix to a range of <code>0 <= num <= 1</code>.
 */
function fixRange(num) {
    return Math.min(Math.max(num, 0), 1);
}
function A(aA1, aA2) {
    return 1 - 3 * aA2 + 3 * aA1;
}
function B(aA1, aA2) {
    return 3 * aA2 - 6 * aA1;
}
function C(aA1) {
    return 3 * aA1;
}
function calcBezier(aT, aA1, aA2) {
    return ((A(aA1, aA2) * aT + B(aA1, aA2)) * aT + C(aA1)) * aT;
}
function getSlope(aT, aA1, aA2) {
    return 3 * A(aA1, aA2) * aT * aT + 2 * B(aA1, aA2) * aT + C(aA1);
}
function generateBezier(...args) {
    const NEWTON_ITERATIONS = 4, NEWTON_MIN_SLOPE = 0.001, SUBDIVISION_PRECISION = 0.0000001, SUBDIVISION_MAX_ITERATIONS = 10, kSplineTableSize = 11, kSampleStepSize = 1 / (kSplineTableSize - 1), float32ArraySupported = "Float32Array" in window;
    /* Must contain four args. */
    if (args.length !== 4) {
        return;
    }
    /* Args must be numbers. */
    for (let i = 0; i < 4; ++i) {
        if (typeof args[i] !== "number" || isNaN(args[i]) || !isFinite(args[i])) {
            return;
        }
    }
    /* X values must be in the [0, 1] range. */
    const mX1 = fixRange(args[0]);
    const mY1 = args[1];
    const mX2 = fixRange(args[2]);
    const mY2 = args[3];
    const mSampleValues = float32ArraySupported ? new Float32Array(kSplineTableSize) : new Array(kSplineTableSize);
    function newtonRaphsonIterate(aX, aGuessT) {
        for (let i = 0; i < NEWTON_ITERATIONS; ++i) {
            const currentSlope = getSlope(aGuessT, mX1, mX2);
            if (currentSlope === 0) {
                return aGuessT;
            }
            const currentX = calcBezier(aGuessT, mX1, mX2) - aX;
            aGuessT -= currentX / currentSlope;
        }
        return aGuessT;
    }
    function calcSampleValues() {
        for (let i = 0; i < kSplineTableSize; ++i) {
            mSampleValues[i] = calcBezier(i * kSampleStepSize, mX1, mX2);
        }
    }
    function binarySubdivide(aX, aA, aB) {
        let currentX, currentT, i = 0;
        do {
            currentT = aA + (aB - aA) / 2;
            currentX = calcBezier(currentT, mX1, mX2) - aX;
            if (currentX > 0) {
                aB = currentT;
            }
            else {
                aA = currentT;
            }
        } while (Math.abs(currentX) > SUBDIVISION_PRECISION && ++i < SUBDIVISION_MAX_ITERATIONS);
        return currentT;
    }
    function getTForX(aX) {
        const lastSample = kSplineTableSize - 1;
        let intervalStart = 0, currentSample = 1;
        for (; currentSample !== lastSample && mSampleValues[currentSample] <= aX; ++currentSample) {
            intervalStart += kSampleStepSize;
        }
        --currentSample;
        const dist = (aX - mSampleValues[currentSample]) / (mSampleValues[currentSample + 1] - mSampleValues[currentSample]), guessForT = intervalStart + dist * kSampleStepSize, initialSlope = getSlope(guessForT, mX1, mX2);
        if (initialSlope >= NEWTON_MIN_SLOPE) {
            return newtonRaphsonIterate(aX, guessForT);
        }
        else if (initialSlope === 0) {
            return guessForT;
        }
        else {
            return binarySubdivide(aX, intervalStart, intervalStart + kSampleStepSize);
        }
    }
    let precomputed = false;
    function precompute() {
        precomputed = true;
        if (mX1 !== mY1 || mX2 !== mY2) {
            calcSampleValues();
        }
    }
    const str = `generateBezier(${[mX1, mY1, mX2, mY2]})`, f = (percentComplete, startValue, endValue, property) => {
        if (!precomputed) {
            precompute();
        }
        if (percentComplete === 0) {
            return startValue;
        }
        if (percentComplete === 1) {
            return endValue;
        }
        if (mX1 === mY1 && mX2 === mY2) {
            return startValue + percentComplete * (endValue - startValue);
        }
        return startValue + calcBezier(getTForX(percentComplete), mY1, mY2) * (endValue - startValue);
    };
    f.getControlPoints = () => {
        return [{ x: mX1, y: mY1 }, { x: mX2, y: mY2 }];
    };
    f.toString = () => {
        return str;
    };
    return f;
}
/* Common easings */
const easeIn = generateBezier(0.42, 0, 1, 1), easeOut = generateBezier(0, 0, 0.58, 1), easeInOut = generateBezier(0.42, 0, 0.58, 1);
registerEasing(["ease", generateBezier(0.25, 0.1, 0.25, 1)]);
registerEasing(["easeIn", easeIn]);
registerEasing(["ease-in", easeIn]);
registerEasing(["easeOut", easeOut]);
registerEasing(["ease-out", easeOut]);
registerEasing(["easeInOut", easeInOut]);
registerEasing(["ease-in-out", easeInOut]);
registerEasing(["easeInSine", generateBezier(0.47, 0, 0.745, 0.715)]);
registerEasing(["easeOutSine", generateBezier(0.39, 0.575, 0.565, 1)]);
registerEasing(["easeInOutSine", generateBezier(0.445, 0.05, 0.55, 0.95)]);
registerEasing(["easeInQuad", generateBezier(0.55, 0.085, 0.68, 0.53)]);
registerEasing(["easeOutQuad", generateBezier(0.25, 0.46, 0.45, 0.94)]);
registerEasing(["easeInOutQuad", generateBezier(0.455, 0.03, 0.515, 0.955)]);
registerEasing(["easeInCubic", generateBezier(0.55, 0.055, 0.675, 0.19)]);
registerEasing(["easeOutCubic", generateBezier(0.215, 0.61, 0.355, 1)]);
registerEasing(["easeInOutCubic", generateBezier(0.645, 0.045, 0.355, 1)]);
registerEasing(["easeInQuart", generateBezier(0.895, 0.03, 0.685, 0.22)]);
registerEasing(["easeOutQuart", generateBezier(0.165, 0.84, 0.44, 1)]);
registerEasing(["easeInOutQuart", generateBezier(0.77, 0, 0.175, 1)]);
registerEasing(["easeInQuint", generateBezier(0.755, 0.05, 0.855, 0.06)]);
registerEasing(["easeOutQuint", generateBezier(0.23, 1, 0.32, 1)]);
registerEasing(["easeInOutQuint", generateBezier(0.86, 0, 0.07, 1)]);
registerEasing(["easeInExpo", generateBezier(0.95, 0.05, 0.795, 0.035)]);
registerEasing(["easeOutExpo", generateBezier(0.19, 1, 0.22, 1)]);
registerEasing(["easeInOutExpo", generateBezier(1, 0, 0, 1)]);
registerEasing(["easeInCirc", generateBezier(0.6, 0.04, 0.98, 0.335)]);
registerEasing(["easeOutCirc", generateBezier(0.075, 0.82, 0.165, 1)]);
registerEasing(["easeInOutCirc", generateBezier(0.785, 0.135, 0.15, 0.86)]);

/*
 * velocity-animate (C) 2014-2018 Julian Shapiro.
 *
 * Licensed under the MIT license. See LICENSE file in the project root for details.
 */
/* Runge-Kutta spring physics function generator. Adapted from Framer.js, copyright Koen Bok. MIT License: http://en.wikipedia.org/wiki/MIT_License */
/* Given a tension, friction, and duration, a simulation at 60FPS will first run without a defined duration in order to calculate the full path. A second pass
 then adjusts the time delta -- using the relation between actual time and duration -- to calculate the path for the duration-constrained animation. */
function springAccelerationForState(state) {
    return (-state.tension * state.x) - (state.friction * state.v);
}
function springEvaluateStateWithDerivative(initialState, dt, derivative) {
    const state = {
        x: initialState.x + derivative.dx * dt,
        v: initialState.v + derivative.dv * dt,
        tension: initialState.tension,
        friction: initialState.friction,
    };
    return {
        dx: state.v,
        dv: springAccelerationForState(state),
    };
}
function springIntegrateState(state, dt) {
    const a = {
        dx: state.v,
        dv: springAccelerationForState(state),
    }, b = springEvaluateStateWithDerivative(state, dt * 0.5, a), c = springEvaluateStateWithDerivative(state, dt * 0.5, b), d = springEvaluateStateWithDerivative(state, dt, c), dxdt = 1 / 6 * (a.dx + 2 * (b.dx + c.dx) + d.dx), dvdt = 1 / 6 * (a.dv + 2 * (b.dv + c.dv) + d.dv);
    state.x = state.x + dxdt * dt;
    state.v = state.v + dvdt * dt;
    return state;
}
function generateSpringRK4(tension, friction, duration) {
    const initState = {
        x: -1,
        v: 0,
        tension: parseFloat(tension) || 500,
        friction: parseFloat(friction) || 20,
    }, path = [0], tolerance = 1 / 10000, DT = 16 / 1000, haveDuration = duration != null; // deliberate "==", as undefined == null != 0
    let timeLapsed = 0, dt, lastState;
    /* Calculate the actual time it takes for this animation to complete with the provided conditions. */
    if (haveDuration) {
        /* Run the simulation without a duration. */
        timeLapsed = generateSpringRK4(initState.tension, initState.friction);
        /* Compute the adjusted time delta. */
        dt = timeLapsed / duration * DT;
    }
    else {
        dt = DT;
    }
    while (true) {
        /* Next/step function .*/
        lastState = springIntegrateState(lastState || initState, dt);
        /* Store the position. */
        path.push(1 + lastState.x);
        timeLapsed += 16;
        /* If the change threshold is reached, break. */
        if (!(Math.abs(lastState.x) > tolerance && Math.abs(lastState.v) > tolerance)) {
            break;
        }
    }
    /* If duration is not defined, return the actual time required for completing this animation. Otherwise, return a closure that holds the
     computed path and returns a snapshot of the position according to a given percentComplete. */
    return !haveDuration ? timeLapsed : (percentComplete, startValue, endValue) => {
        if (percentComplete === 0) {
            return startValue;
        }
        if (percentComplete === 1) {
            return endValue;
        }
        return startValue + path[Math.floor(percentComplete * (path.length - 1))] * (endValue - startValue);
    };
}

/*
 * velocity-animate (C) 2014-2018 Julian Shapiro.
 *
 * Licensed under the MIT license. See LICENSE file in the project root for details
 *
 * Step easing generator.
 */
// Constants
const cache$2 = {};
function generateStep(steps) {
    const fn = cache$2[steps];
    if (fn) {
        return fn;
    }
    return cache$2[steps] = (percentComplete, startValue, endValue) => {
        if (percentComplete === 0) {
            return startValue;
        }
        if (percentComplete === 1) {
            return endValue;
        }
        return startValue + Math.round(percentComplete * steps) * (1 / steps) * (endValue - startValue);
    };
}

/*
 * velocity-animate (C) 2014-2018 Julian Shapiro.
 *
 * Licensed under the MIT license. See LICENSE file in the project root for details.
 *
 * Validation functions used for various types of data that can be supplied.
 * All errors are reported in the non-minified version for development. If a
 * validation fails then it should return <code>undefined</code>.
 */
// Project
/**
 * Parse a duration value and return an ms number. Optionally return a
 * default value if the number is not valid.
 */
function parseDuration(duration, def) {
    if (isNumber(duration)) {
        return duration;
    }
    if (isString(duration)) {
        return Duration[duration.toLowerCase()]
            || parseFloat(duration.replace("ms", "")
                .replace("s", "000"));
    }
    return def == null ? undefined : parseDuration(def);
}
/**
 * Validate a <code>cache</code> option.
 */
function validateCache(value) {
    if (isBoolean(value)) {
        return value;
    }
    if (value != null) {
        console.warn(`VelocityJS: Trying to set 'cache' to an invalid value:`, value);
    }
}
/**
 * Validate a <code>begin</code> option.
 */
function validateBegin(value) {
    if (isFunction(value)) {
        return value;
    }
    if (value != null) {
        console.warn(`VelocityJS: Trying to set 'begin' to an invalid value:`, value);
    }
}
/**
 * Validate a <code>complete</code> option.
 */
function validateComplete(value, noError) {
    if (isFunction(value)) {
        return value;
    }
    if (value != null && !noError) {
        console.warn(`VelocityJS: Trying to set 'complete' to an invalid value:`, value);
    }
}
/**
 * Validate a <code>delay</code> option.
 */
function validateDelay(value) {
    const parsed = parseDuration(value);
    if (!isNaN(parsed)) {
        return parsed;
    }
    if (value != null) {
        console.error(`VelocityJS: Trying to set 'delay' to an invalid value:`, value);
    }
}
/**
 * Validate a <code>duration</code> option.
 */
function validateDuration(value, noError) {
    const parsed = parseDuration(value);
    if (!isNaN(parsed) && parsed >= 0) {
        return parsed;
    }
    if (value != null && !noError) {
        console.error(`VelocityJS: Trying to set 'duration' to an invalid value:`, value);
    }
}
/**
 * Validate a <code>easing</code> option.
 */
function validateEasing(value, duration, noError) {
    if (isString(value)) {
        // Named easing
        return Easings[value];
    }
    if (isFunction(value)) {
        return value;
    }
    // TODO: We should only do these if the correct function exists - don't force loading.
    if (Array.isArray(value)) {
        if (value.length === 1) {
            // Steps
            return generateStep(value[0]);
        }
        if (value.length === 2) {
            // springRK4 must be passed the animation's duration.
            // Note: If the springRK4 array contains non-numbers,
            // generateSpringRK4() returns an easing function generated with
            // default tension and friction values.
            return generateSpringRK4(value[0], value[1], duration);
        }
        if (value.length === 4) {
            // Note: If the bezier array contains non-numbers, generateBezier()
            // returns undefined.
            return generateBezier.apply(null, value) || false;
        }
    }
    if (value != null && !noError) {
        console.error(`VelocityJS: Trying to set 'easing' to an invalid value:`, value);
    }
}
/**
 * Validate a <code>fpsLimit</code> option.
 */
function validateFpsLimit(value) {
    if (value === false) {
        return 0;
    }
    else {
        const parsed = parseInt(value, 10);
        if (!isNaN(parsed) && parsed >= 0) {
            return Math.min(parsed, 60);
        }
    }
    if (value != null) {
        console.warn(`VelocityJS: Trying to set 'fpsLimit' to an invalid value:`, value);
    }
}
/**
 * Validate a <code>loop</code> option.
 */
function validateLoop(value) {
    switch (value) {
        case false:
            return 0;
        case true:
            return true;
        default:
            const parsed = parseInt(value, 10);
            if (!isNaN(parsed) && parsed >= 0) {
                return parsed;
            }
            break;
    }
    if (value != null) {
        console.warn(`VelocityJS: Trying to set 'loop' to an invalid value:`, value);
    }
}
/**
 * Validate a <code>progress</code> option.
 */
function validateProgress(value) {
    if (isFunction(value)) {
        return value;
    }
    if (value != null) {
        console.warn(`VelocityJS: Trying to set 'progress' to an invalid value:`, value);
    }
}
/**
 * Validate a <code>promise</code> option.
 */
function validatePromise(value) {
    if (isBoolean(value)) {
        return value;
    }
    if (value != null) {
        console.warn(`VelocityJS: Trying to set 'promise' to an invalid value:`, value);
    }
}
/**
 * Validate a <code>promiseRejectEmpty</code> option.
 */
function validatePromiseRejectEmpty(value) {
    if (isBoolean(value)) {
        return value;
    }
    if (value != null) {
        console.warn(`VelocityJS: Trying to set 'promiseRejectEmpty' to an invalid value:`, value);
    }
}
/**
 * Validate a <code>queue</code> option.
 */
function validateQueue(value, noError) {
    if (value === false || isString(value)) {
        return value;
    }
    if (value != null && !noError) {
        console.warn(`VelocityJS: Trying to set 'queue' to an invalid value:`, value);
    }
}
/**
 * Validate a <code>repeat</code> option.
 */
function validateRepeat(value) {
    switch (value) {
        case false:
            return 0;
        case true:
            return true;
        default:
            const parsed = parseInt(value, 10);
            if (!isNaN(parsed) && parsed >= 0) {
                return parsed;
            }
            break;
    }
    if (value != null) {
        console.warn(`VelocityJS: Trying to set 'repeat' to an invalid value:`, value);
    }
}
/**
 * Validate a <code>speed</code> option.
 */
function validateSpeed(value) {
    if (isNumber(value)) {
        return value;
    }
    if (value != null) {
        console.error(`VelocityJS: Trying to set 'speed' to an invalid value:`, value);
    }
}
/**
 * Validate a <code>sync</code> option.
 */
function validateSync(value) {
    if (isBoolean(value)) {
        return value;
    }
    if (value != null) {
        console.error(`VelocityJS: Trying to set 'sync' to an invalid value:`, value);
    }
}

/*
 * velocity-animate (C) 2014-2018 Julian Shapiro.
 *
 * Licensed under the MIT license. See LICENSE file in the project root for details.
 *
 * Velocity option defaults, which can be overriden by the user.
 */
// Project
// NOTE: Add the variable here, then add the default state in "reset" below.
let cache$1, begin, complete, delay, duration, easing, fpsLimit, loop, mobileHA, minFrameTime, promise, promiseRejectEmpty, queue$1, repeat, speed, sync;
class defaults {
    static reset() {
        cache$1 = DEFAULT_CACHE;
        begin = undefined;
        complete = undefined;
        delay = DEFAULT_DELAY;
        duration = DEFAULT_DURATION;
        easing = validateEasing(DEFAULT_EASING, DEFAULT_DURATION);
        fpsLimit = DEFAULT_FPSLIMIT;
        loop = DEFAULT_LOOP;
        minFrameTime = FUZZY_MS_PER_SECOND / DEFAULT_FPSLIMIT;
        promise = DEFAULT_PROMISE;
        promiseRejectEmpty = DEFAULT_PROMISE_REJECT_EMPTY;
        queue$1 = DEFAULT_QUEUE;
        repeat = DEFAULT_REPEAT;
        speed = DEFAULT_SPEED;
        sync = DEFAULT_SYNC;
    }
    static get cache() {
        return cache$1;
    }
    static set cache(value) {
        value = validateCache(value);
        if (value !== undefined) {
            cache$1 = value;
        }
    }
    static get begin() {
        return begin;
    }
    static set begin(value) {
        value = validateBegin(value);
        if (value !== undefined) {
            begin = value;
        }
    }
    static get complete() {
        return complete;
    }
    static set complete(value) {
        value = validateComplete(value);
        if (value !== undefined) {
            complete = value;
        }
    }
    static get delay() {
        return delay;
    }
    static set delay(value) {
        value = validateDelay(value);
        if (value !== undefined) {
            delay = value;
        }
    }
    static get duration() {
        return duration;
    }
    static set duration(value) {
        value = validateDuration(value);
        if (value !== undefined) {
            duration = value;
        }
    }
    static get easing() {
        return easing;
    }
    static set easing(value) {
        value = validateEasing(value, duration);
        if (value !== undefined) {
            easing = value;
        }
    }
    static get fpsLimit() {
        return fpsLimit;
    }
    static set fpsLimit(value) {
        value = validateFpsLimit(value);
        if (value !== undefined) {
            fpsLimit = value;
            minFrameTime = FUZZY_MS_PER_SECOND / value;
        }
    }
    static get loop() {
        return loop;
    }
    static set loop(value) {
        value = validateLoop(value);
        if (value !== undefined) {
            loop = value;
        }
    }
    static get mobileHA() {
        return mobileHA;
    }
    static set mobileHA(value) {
        if (isBoolean(value)) {
            mobileHA = value;
        }
    }
    static get minFrameTime() {
        return minFrameTime;
    }
    static get promise() {
        return promise;
    }
    static set promise(value) {
        value = validatePromise(value);
        if (value !== undefined) {
            promise = value;
        }
    }
    static get promiseRejectEmpty() {
        return promiseRejectEmpty;
    }
    static set promiseRejectEmpty(value) {
        value = validatePromiseRejectEmpty(value);
        if (value !== undefined) {
            promiseRejectEmpty = value;
        }
    }
    static get queue() {
        return queue$1;
    }
    static set queue(value) {
        value = validateQueue(value);
        if (value !== undefined) {
            queue$1 = value;
        }
    }
    static get repeat() {
        return repeat;
    }
    static set repeat(value) {
        value = validateRepeat(value);
        if (value !== undefined) {
            repeat = value;
        }
    }
    static get repeatAgain() {
        return repeat;
    }
    static get speed() {
        return speed;
    }
    static set speed(value) {
        value = validateSpeed(value);
        if (value !== undefined) {
            speed = value;
        }
    }
    static get sync() {
        return sync;
    }
    static set sync(value) {
        value = validateSync(value);
        if (value !== undefined) {
            sync = value;
        }
    }
}
Object.freeze(defaults);
// Reset to our default values, currently everything is undefined.
defaults.reset();

/*
 * velocity-animate (C) 2014-2018 Julian Shapiro.
 *
 * Licensed under the MIT license. See LICENSE file in the project root for details.
 *
 * Normalisations are used when getting or setting a (normally css compound
 * properties) value that can have a different order in different browsers.
 *
 * It can also be used to extend and create specific properties that otherwise
 * don't exist (such as for scrolling, or inner/outer dimensions).
 */
/**
 * The highest type index for finding the best normalization for a property.
 */
/**
 * Unlike "actions", normalizations can always be replaced by users.
 */
const Normalizations = [];
/**
 * Store a cross-reference to units to be added to specific normalization
 * functions if the user supplies a unit-less number.
 *
 * This is pretty much confined to adding "px" to several css properties.
 */
const NormalizationUnits = {};
/**
 * Any normalisations that should never be cached are listed here.
 * Faster than an array - https://jsperf.com/array-includes-and-find-methods-vs-set-has
 */
const NoCacheNormalizations = new Set();
/**
 * An array of classes used for the per-class normalizations. This
 * translates into a bitwise enum for quick cross-reference, and so that
 * the element doesn't need multiple <code>instanceof</code> calls every
 * frame.
 */
const constructors = [];
/**
 * A cache of the various constructors we've found and mapping to their real
 * name - saves expensive lookups.
 */
const constructorCache = new Map();

/*
 * velocity-animate (C) 2014-2018 Julian Shapiro.
 *
 * Licensed under the MIT license. See LICENSE file in the project root for details.
 */
// Project
// Constants
const dataName = "velocityData";
/**
 * Get (and create) the internal data store for an element.
 */
function Data(element) {
    // Use a string member so Uglify doesn't mangle it.
    const data = element[dataName];
    if (data) {
        return data;
    }
    const window = element.ownerDocument.defaultView;
    let types = 0;
    for (let index = 0; index < constructors.length; index++) {
        const constructor = constructors[index];
        if (isString(constructor)) {
            if (element instanceof window[constructor]) {
                types |= 1 << index; // tslint:disable-line:no-bitwise
            }
        }
        else if (element instanceof constructor) {
            types |= 1 << index; // tslint:disable-line:no-bitwise
        }
    }
    // Use an intermediate object so it errors on incorrect data.
    const newData = {
        types,
        count: 0,
        computedStyle: null,
        cache: {},
        queueList: {},
        lastAnimationList: {},
        lastFinishList: {},
        window,
    };
    Object.defineProperty(element, dataName, {
        value: newData,
    });
    return newData;
}

/*
 * velocity-animate (C) 2014-2018 Julian Shapiro.
 *
 * Licensed under the MIT license. See LICENSE file in the project root for details.
 */
// Constants
const isClient = window && window === window.window, windowScrollAnchor = isClient && window.pageYOffset !== undefined;
const State = {
    isClient,
    isMobile: isClient && /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent),
    isGingerbread: isClient && /Android 2\.3\.[3-7]/i.test(navigator.userAgent),
    prefixElement: isClient && document.createElement("div"),
    windowScrollAnchor,
    scrollAnchor: windowScrollAnchor ? window : (!isClient || document.documentElement || document.body.parentNode || document.body),
    scrollPropertyLeft: windowScrollAnchor ? "pageXOffset" : "scrollLeft",
    scrollPropertyTop: windowScrollAnchor ? "pageYOffset" : "scrollTop",
    className: CLASSNAME,
    isTicking: false,
    first: undefined,
    last: undefined,
    firstNew: undefined,
};

/*
 * velocity-animate (C) 2014-2018 Julian Shapiro.
 *
 * Licensed under the MIT license. See LICENSE file in the project root for details.
 *
 * AnimationCall queue
 */
// Project
/**
 * Simple queue management. Un-named queue is directly within the element data,
 * named queue is within an object within it.
 */
function animate(animation) {
    const prev = State.last;
    animation._prev = prev;
    animation._next = undefined;
    if (prev) {
        prev._next = animation;
    }
    else {
        State.first = animation;
    }
    State.last = animation;
    if (!State.firstNew) {
        State.firstNew = animation;
    }
    const element = animation.element, data = Data(element);
    if (!data.count++) {
        ////////////////////////
        // Feature: Classname //
        ////////////////////////
        addClass(element, State.className);
    }
}
/**
 * Add an item to an animation queue.
 */
function queue(element, animation, queueName) {
    const data = Data(element);
    if (queueName !== false) {
        // Store the last animation added so we can use it for the
        // beginning of the next one.
        data.lastAnimationList[queueName] = animation;
    }
    if (queueName === false) {
        animate(animation);
    }
    else {
        if (!isString(queueName)) {
            queueName = "";
        }
        let last = data.queueList[queueName];
        if (!last) {
            if (last === null) {
                data.queueList[queueName] = animation;
            }
            else {
                data.queueList[queueName] = null;
                animate(animation);
            }
        }
        else {
            while (last._next) {
                last = last._next;
            }
            last._next = animation;
            animation._prev = last;
        }
    }
}
/**
 * Start the next animation on this element's queue (named or default).
 *
 * @returns the next animation that is starting.
 */
function dequeue(element, queueName, skip) {
    if (queueName !== false) {
        if (!isString(queueName)) {
            queueName = "";
        }
        const data = Data(element), animation = data.queueList[queueName];
        if (animation) {
            data.queueList[queueName] = animation._next || null;
            if (!skip) {
                animate(animation);
            }
        }
        else if (animation === null) {
            delete data.queueList[queueName];
        }
        return animation;
    }
}
/**
 * Remove an animation from the active animation list. If it has a queue set
 * then remember it as the last animation for that queue, and free the one
 * that was previously there. If the animation list is completely empty then
 * mark us as finished.
 */
function freeAnimationCall(animation) {
    const next = animation._next, prev = animation._prev, queueName = animation.queue == null ? animation.options.queue : animation.queue;
    if (State.firstNew === animation) {
        State.firstNew = next;
    }
    if (State.first === animation) {
        State.first = next;
    }
    else if (prev) {
        prev._next = next;
    }
    if (State.last === animation) {
        State.last = prev;
    }
    else if (next) {
        next._prev = prev;
    }
    if (queueName) {
        const data = Data(animation.element);
        if (data) {
            animation._next = animation._prev = undefined;
        }
    }
}

/*
 * velocity-animate (C) 2014-2018 Julian Shapiro.
 *
 * Licensed under the MIT license. See LICENSE file in the project root for details.
 */
/**
 * Cache every camelCase match to avoid repeating lookups.
 */
const cache = {};
/**
 * Camelcase a property name into its JavaScript notation (e.g.
 * "background-color" ==> "backgroundColor"). Camelcasing is used to
 * normalize property names between and across calls.
 */
function camelCase(property) {
    const fixed = cache[property];
    if (fixed) {
        return fixed;
    }
    return cache[property] = property.replace(/-([a-z])/g, ($, letter) => letter.toUpperCase());
}

/*
 * velocity-animate (C) 2014-2018 Julian Shapiro.
 *
 * Licensed under the MIT license. See LICENSE file in the project root for details.
 *
 * Normalisations are used when getting or setting a (normally css compound
 * properties) value that can have a different order in different browsers.
 *
 * It can also be used to extend and create specific properties that otherwise
 * don't exist (such as for scrolling, or inner/outer dimensions).
 */
// Project
/**
 * Used to register a normalization. This should never be called by users
 * directly, instead it should be called via an action:<br/>
 * <code>Velocity("registerNormalization", "Element", "name", VelocityNormalizationsFn[, false]);</code>
 *
 * The second argument is the class of the animatable object. If this is passed
 * as a class name (ie, `"Element"` -> `window["Element"]`) then this will work
 * cross-iframe. If passed as an actual class (ie `Element`) then it will
 * attempt to find the class on the window and use that name instead. If it
 * can't find it then it will use the class passed, which allows for custom
 * animation targets, but will not work cross-iframe boundary.
 *
 * The fourth argument can be an explicit <code>false</code>, which prevents
 * the property from being cached. Please note that this can be dangerous
 * for performance!
 */
function registerNormalization(args) {
    const constructor = args[0], name = args[1], callback = args[2];
    if ((isString(constructor) && !(window[constructor] instanceof Object))
        || (!isString(constructor) && !(constructor instanceof Object))) {
        console.warn(`VelocityJS: Trying to set 'registerNormalization' constructor to an invalid value:`, constructor);
    }
    else if (!isString(name)) {
        console.warn(`VelocityJS: Trying to set 'registerNormalization' name to an invalid value:`, name);
    }
    else if (!isFunction(callback)) {
        console.warn(`VelocityJS: Trying to set 'registerNormalization' callback to an invalid value:`, name, callback);
    }
    else {
        let index = constructors.indexOf(constructor), nextArg = 3;
        if (index < 0 && !isString(constructor)) {
            if (constructorCache.has(constructor)) {
                index = constructors.indexOf(constructorCache.get(constructor));
            }
            else {
                for (const property in window) {
                    if (window[property] === constructor) {
                        index = constructors.indexOf(property);
                        if (index < 0) {
                            index = constructors.push(property) - 1;
                            Normalizations[index] = {};
                            constructorCache.set(constructor, property);
                        }
                        break;
                    }
                }
            }
        }
        if (index < 0) {
            index = constructors.push(constructor) - 1;
            Normalizations[index] = {};
        }
        Normalizations[index][name] = callback;
        if (isString(args[nextArg])) {
            const unit = args[nextArg++];
            let units = NormalizationUnits[unit];
            if (!units) {
                units = NormalizationUnits[unit] = [];
            }
            units.push(callback);
        }
        if (args[nextArg] === false) {
            NoCacheNormalizations.add(name);
        }
    }
}
/**
 * Used to check if a normalisation exists on a specific class.
 */
function hasNormalization(args) {
    const constructor = args[0], name = args[1];
    let index = constructors.indexOf(constructor);
    if (index < 0 && !isString(constructor)) {
        if (constructorCache.has(constructor)) {
            index = constructors.indexOf(constructorCache.get(constructor));
        }
        else {
            for (const property in window) {
                if (window[property] === constructor) {
                    index = constructors.indexOf(property);
                    break;
                }
            }
        }
    }
    return index >= 0 && Normalizations[index].hasOwnProperty(name);
}
/**
 * Get the unit to add to a unitless number based on the normalization used.
 */
function getNormalizationUnit(fn) {
    for (const unit in NormalizationUnits) {
        if (NormalizationUnits[unit].includes(fn)) {
            return unit;
        }
    }
    return "";
}
/**
 * Get the normalization for an element and propertyName combination. This
 * value should be cached at asking time, as it may change if the user adds
 * more normalizations.
 */
function getNormalization(element, propertyName) {
    const data = Data(element);
    let fn;
    for (let index = constructors.length - 1, types = data.types; !fn && index >= 0; index--) {
        if (types & (1 << index)) { // tslint:disable-line:no-bitwise
            fn = Normalizations[index][propertyName];
        }
    }
    return fn;
}
registerAction(["registerNormalization", registerNormalization]);
registerAction(["hasNormalization", hasNormalization]);

/*
 * velocity-animate (C) 2014-2018 Julian Shapiro.
 *
 * Licensed under the MIT license. See LICENSE file in the project root for details.
 */
const SequencesObject = {};

/*
 * velocity-animate (C) 2014-2018 Julian Shapiro.
 *
 * Licensed under the MIT license. See LICENSE file in the project root for details.
 */
// Constants
const rxColor6 = /#([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})/gi, rxColor3 = /#([a-f\d])([a-f\d])([a-f\d])/gi, rxColorName = /(rgba?\(\s*)?(\b[a-z]+\b)/g, rxRGB = /rgb(a?)\(([^\)]+)\)/gi, rxSpaces = /\s+/g;
/**
 * This is the list of color names -> rgb values. The object is in here so
 * that the actual name conversion can be in a separate file and not
 * included for custom builds.
 */
const ColorNames = {};
/**
 * Convert a hex list to an rgba value. Designed to be used in replace.
 */
function makeRGBA(ignore, r, g, b) {
    return `rgba(${parseInt(r, 16)},${parseInt(g, 16)},${parseInt(b, 16)},1)`;
}
/**
 * Replace any css colour name with its rgba() value. It is possible to use
 * the name within an "rgba(blue, 0.4)" string this way.
 */
function fixColors(str) {
    return str
        .replace(rxColor6, makeRGBA)
        .replace(rxColor3, ($0, r, g, b) => {
        return makeRGBA($0, r + r, g + g, b + b);
    })
        .replace(rxColorName, ($0, $1, $2) => {
        if (ColorNames[$2]) {
            return ($1 ? $1 : "rgba(") + ColorNames[$2] + ($1 ? "" : ",1)");
        }
        return $0;
    })
        .replace(rxRGB, ($0, $1, $2) => {
        return `rgba(${$2.replace(rxSpaces, "") + ($1 ? "" : ",1")})`;
    });
}

/*
 * velocity-animate (C) 2014-2018 Julian Shapiro.
 *
 * Licensed under the MIT license. See LICENSE file in the project root for details.
 */
// Project
/**
 * Figure out the dimensions for this width / height based on the
 * potential borders and whether we care about them.
 */
function augmentDimension(element, name, wantInner) {
    const isBorderBox = getPropertyValue(element, "boxSizing")
        .toString()
        .toLowerCase() === "border-box";
    if (isBorderBox === wantInner) {
        // in box-sizing mode, the CSS width / height accessors already
        // give the outerWidth / outerHeight.
        const sides = name === "width" ? ["Left", "Right"] : ["Top", "Bottom"], fields = [`padding${sides[0]}`, `padding${sides[1]}`, `border${sides[0]}Width`, `border${sides[1]}Width`];
        let augment = 0;
        for (const field of fields) {
            const value = parseFloat(getPropertyValue(element, field));
            if (!isNaN(value)) {
                augment += value;
            }
        }
        return wantInner ? -augment : augment;
    }
    return 0;
}

/*
 * velocity-animate (C) 2014-2018 Julian Shapiro.
 *
 * Licensed under the MIT license. See LICENSE file in the project root for details.
 */
// Project
function fixNullValue(propertyValue, name) {
    let pValue = propertyValue;
    const re = new RegExp(`${name}\\(([^\)]+)\\)`);
    const [, values = ""] = propertyValue.match(re) || [];
    if (values) {
        const value = values.split(",")
            .map((i) => i === "" ? 0 : i)
            .join(",");
        pValue = `${name}(${value})`;
    }
    return pValue;
}
/**
 * The singular setPropertyValue, which routes the logic for all
 * normalizations.
 */
function setPropertyValue(element, propertyName, propertyValue, fn) {
    // FIX: value is translate3d(x,,) is not valid transform value
    let pValue = propertyValue;
    if (propertyName === "transform") {
        if (propertyValue.includes("rotate")) {
            pValue = fixNullValue(propertyValue, "rotate3d");
        }
        else if (propertyValue.includes("translate")) {
            pValue = fixNullValue(propertyValue, "translate3d");
        }
    }
    console.log({ value: propertyValue, name: propertyName, pValue });
    const noCache = NoCacheNormalizations.has(propertyName), data = !noCache && Data(element);
    if (noCache || (data && data.cache[propertyName] !== propertyValue)) {
        // By setting it to undefined we force a true "get" later
        if (!noCache) {
            data.cache[propertyName] = pValue || undefined;
        }
        fn = fn || getNormalization(element, propertyName);
        if (fn) {
            fn(element, pValue);
        }
        if (Velocity$1.debug >= 2) {
            console.info(`Set "${propertyName}": "${pValue}"`, element);
        }
    }
}

/*
 * velocity-animate (C) 2014-2018 Julian Shapiro.
 *
 * Licensed under the MIT license. See LICENSE file in the project root for details.
 */
// Project
/**
 * Get the width or height of an element, pulled out as it can be used when the
 * in two locations so don't want to repeat it.
 */
function getWidthHeight(element, property) {
    return (element.getBoundingClientRect()[property] + augmentDimension(element, property, true)) + "px";
}
// TODO: This is still a complete mess
function computePropertyValue(element, property) {
    const data = Data(element), 
    // If computedStyle is cached, use it. If not then get the correct one
    // for the element to support cross-iframe boundaries.
    computedStyle = data.computedStyle ? data.computedStyle : data.window.getComputedStyle(element, null);
    let computedValue = 0;
    if (!data.computedStyle) {
        data.computedStyle = computedStyle;
    }
    if (computedStyle["display"] === "none") {
        switch (property) {
            case "width":
            case "height":
                // Browsers do not return height and width values for elements
                // that are set to display:"none". Thus, we temporarily toggle
                // display to the element type's default value.
                setPropertyValue(element, "display", "auto");
                computedValue = getWidthHeight(element, property);
                setPropertyValue(element, "display", "none");
                return String(computedValue);
        }
    }
    /* IE and Firefox do not return a value for the generic borderColor -- they only return individual values for each border side's color.
     Also, in all browsers, when border colors aren't all the same, a compound value is returned that Velocity isn't setup to parse.
     So, as a polyfill for querying individual border side colors, we just return the top border's color and animate all borders from that value. */
    /* TODO: There is a borderColor normalisation in legacy/ - figure out where this is needed... */
    computedValue = computedStyle[property];
    /* Fall back to the property's style value (if defined) when computedValue returns nothing,
     which can happen when the element hasn't been painted. */
    if (!computedValue) {
        computedValue = element.style[property];
    }
    /* For top, right, bottom, and left (TRBL) values that are set to "auto" on elements of "fixed" or "absolute" position,
     defer to jQuery for converting "auto" to a numeric value. (For elements with a "static" or "relative" position, "auto" has the same
     effect as being set to 0, so no conversion is necessary.) */
    /* An example of why numeric conversion is necessary: When an element with "position:absolute" has an untouched "left"
     property, which reverts to "auto", left's value is 0 relative to its parent element, but is often non-zero relative
     to its *containing* (not parent) element, which is the nearest "position:relative" ancestor or the viewport (and always the viewport in the case of "position:fixed"). */
    if (computedValue === "auto") {
        switch (property) {
            case "width":
            case "height":
                computedValue = getWidthHeight(element, property);
                break;
            case "top":
            case "left":
                const topLeft = true;
            case "right":
            case "bottom":
                const position = getPropertyValue(element, "position");
                if (position === "fixed" || (topLeft && position === "absolute")) {
                    // Note: this has no pixel unit on its returned values,
                    // we re-add it here to conform with
                    // computePropertyValue's behavior.
                    computedValue = element.getBoundingClientRect[property] + "px";
                    break;
                }
            // Deliberate fallthrough!
            default:
                computedValue = "0px";
                break;
        }
    }
    return computedValue ? String(computedValue) : "";
}
/**
 * Get a property value. This will grab via the cache if it exists, then
 * via any normalisations.
 */
function getPropertyValue(element, propertyName, fn, skipCache) {
    const data = Data(element);
    let propertyValue;
    if (NoCacheNormalizations.has(propertyName)) {
        skipCache = true;
    }
    if (!skipCache && data && data.cache[propertyName] != null) {
        propertyValue = data.cache[propertyName];
    }
    else {
        fn = fn || getNormalization(element, propertyName);
        if (fn) {
            propertyValue = fn(element);
            if (data) {
                data.cache[propertyName] = propertyValue;
            }
        }
    }
    if (Velocity$1.debug >= 2) {
        console.info(`Get "${propertyName}": "${propertyValue}"`, element);
    }
    return propertyValue;
}

/*
 * velocity-animate (C) 2014-2018 Julian Shapiro.
 *
 * Licensed under the MIT license. See LICENSE file in the project root for details.
 *
 * Tweens
 */
// Project
// Constants
const rxHex = /^#([A-f\d]{3}){1,2}$/i, commands = {
    function: (value, element, elements, elementArrayIndex, propertyName, tween) => {
        return value.call(element, elementArrayIndex, elements.length, propertyName);
    },
    number: (value, element, elements, elementArrayIndex, propertyName, tween) => {
        return String(value) + getNormalizationUnit(tween.fn);
    },
    string: (value, element, elements, elementArrayIndex, propertyName, tween) => {
        return fixColors(value);
    },
    undefined: (value, element, elements, elementArrayIndex, propertyName, tween) => {
        return fixColors(getPropertyValue(element, propertyName, tween.fn) || "");
    },
};
/**
 * Expand a VelocityProperty argument into a valid sparse Tween array. This
 * pre-allocates the array as it is then the correct size and slightly
 * faster to access.
 */
function expandProperties(animation, properties) {
    const tweens = animation.tweens = Object.create(null), elements = animation.elements, element = animation.element, elementArrayIndex = elements.indexOf(element), data = Data(element), queue = getValue(animation.queue, animation.options.queue), duration = getValue(animation.options.duration, defaults.duration);
    for (const property in properties) {
        if (properties.hasOwnProperty(property)) {
            const propertyName = camelCase(property), fn = getNormalization(element, propertyName);
            let valueData = properties[property];
            if (!fn && propertyName !== "tween") {
                if (Velocity$1.debug) {
                    console.log(`Skipping "${property}" due to a lack of browser support.`);
                }
                continue;
            }
            if (valueData == null) {
                if (Velocity$1.debug) {
                    console.log(`Skipping "${property}" due to no value supplied.`);
                }
                continue;
            }
            const tween = tweens[propertyName] = {};
            let endValue, startValue;
            tween.fn = fn;
            if (isFunction(valueData)) {
                // If we have a function as the main argument then resolve
                // it first, in case it returns an array that needs to be
                // split.
                valueData = valueData.call(element, elementArrayIndex, elements.length, elements);
            }
            if (Array.isArray(valueData)) {
                // valueData is an array in the form of
                // [ endValue, [, easing] [, startValue] ]
                const arr1 = valueData[1], arr2 = valueData[2];
                endValue = valueData[0];
                if ((isString(arr1) && (/^[\d-]/.test(arr1) || rxHex.test(arr1))) || isFunction(arr1) || isNumber(arr1)) {
                    startValue = arr1;
                }
                else if ((isString(arr1) && Easings[arr1]) || Array.isArray(arr1)) {
                    tween.easing = validateEasing(arr1, duration);
                    startValue = arr2;
                }
                else {
                    startValue = arr1 || arr2;
                }
            }
            else {
                endValue = valueData;
            }
            tween.end = commands[typeof endValue](endValue, element, elements, elementArrayIndex, propertyName, tween);
            if (startValue != null || (queue === false || data.queueList[queue] === undefined)) {
                tween.start = commands[typeof startValue](startValue, element, elements, elementArrayIndex, propertyName, tween);
                explodeTween(propertyName, tween);
            }
        }
    }
}
// TODO: Needs a better match for "translate3d" etc - a number must be preceded by some form of break...
const rxToken = /((?:[+\-*/]=)?(?:[+-]?\d*\.\d+|[+-]?\d+)[a-z%]*|(?:.(?!$|[+-]?\d|[+\-*/]=[+-]?\d))+.|.)/g, rxNumber = /^([+\-*/]=)?([+-]?\d*\.\d+|[+-]?\d+)(.*)$/;
/**
 * Find a pattern between multiple strings, return a VelocitySequence with
 * the pattern and the tokenised values.
 *
 * If number then animate.
 * If a string then must match.
 * If units then convert between them by wrapping in a calc().
 * - If already in a calc then nest another layer.
 * If in an rgba() then the first three numbers are rounded.
 */
function findPattern(parts, propertyName) {
    const partsLength = parts.length, tokens = [], indexes = [];
    let numbers;
    // First tokenise the strings - these have all values, we will pull
    // numbers later.
    for (let part = 0; part < partsLength; part++) {
        if (isString(parts[part])) {
            if (parts[part] === "") {
                tokens[part] = [""];
            }
            else {
                tokens[part] = cloneArray(parts[part].match(rxToken));
            }
            indexes[part] = 0;
            // If it matches more than one thing then we've got a number.
            numbers = numbers || tokens[part].length > 1;
            //console.log(`tokens:`, parts[part], tokens[part])
        }
        else {
            // We have an incomplete lineup, it will get tried again later...
            return;
        }
    }
    const sequence = [], pattern = (sequence.pattern = []), addString = (text) => {
        if (isString(pattern[pattern.length - 1])) {
            pattern[pattern.length - 1] += text;
        }
        else if (text) {
            pattern.push(text);
            for (let part = 0; part < partsLength; part++) {
                sequence[part].push(null);
            }
        }
    }, returnStringType = () => {
        if (numbers || pattern.length > 1) {
            //console.error(`Velocity: Trying to pattern match mis-matched strings "${propertyName}":`, parts);
            return;
        }
        const isDisplay = propertyName === "display", isVisibility = propertyName === "visibility";
        for (let part = 0; part < partsLength; part++) {
            const value = parts[part];
            sequence[part][0] = value;
            // Don't care about duration...
            sequence[part].easing = validateEasing((isDisplay && value === "none") || (isVisibility && value === "hidden") || (!isDisplay && !isVisibility) ? "at-end" : "at-start", 400);
        }
        pattern[0] = false;
        return sequence;
    };
    let more = true;
    for (let part = 0; part < partsLength; part++) {
        sequence[part] = [];
    }
    while (more) {
        const bits = [], units = [];
        let text, isUnitless = false, hasNumbers = false;
        for (let part = 0; part < partsLength; part++) {
            const index = indexes[part]++, token = tokens[part][index];
            if (token) {
                const num = token.match(rxNumber); // [ignore, change, number, unit]
                if (num) {
                    // It's a number, possibly with a += change and unit.
                    if (text) {
                        return returnStringType();
                    }
                    const digits = parseFloat(num[2]), unit = num[3], change = num[1] ? num[1][0] + unit : undefined, changeOrUnit = change || unit;
                    if (digits && !units.includes(changeOrUnit)) {
                        // Will be an empty string at the least.
                        units.push(changeOrUnit);
                    }
                    if (!unit) {
                        if (digits) {
                            hasNumbers = true;
                        }
                        else {
                            isUnitless = true;
                        }
                    }
                    bits[part] = change ? [digits, changeOrUnit, true] : [digits, changeOrUnit];
                }
                else if (bits.length) {
                    return returnStringType();
                }
                else {
                    // It's a string.
                    if (!text) {
                        text = token;
                    }
                    else if (text !== token) {
                        return returnStringType();
                    }
                }
            }
            else if (!part) {
                for (; part < partsLength; part++) {
                    const index2 = indexes[part]++;
                    if (tokens[part][index2]) {
                        return returnStringType();
                    }
                }
                // IMPORTANT: This is the exit point.
                more = false;
                break;
            }
            else {
                // Different
                return;
            }
        }
        if (text) {
            addString(text);
        }
        else if (units.length) {
            if (units.length === 2 && isUnitless && !hasNumbers) {
                // If we only have two units, and one is empty, and it's only empty on "0", then treat us as having one unit
                units.splice(units[0] ? 1 : 0, 1);
            }
            if (units.length === 1) {
                // All the same units, so append number then unit.
                const unit = units[0], firstLetter = unit[0];
                switch (firstLetter) {
                    case "+":
                    case "-":
                    case "*":
                    case "/":
                        if (propertyName) {
                            console.error(`Velocity: The first property must not contain a relative function "${propertyName}":`, parts);
                        }
                        return;
                }
                pattern.push(false);
                for (let part = 0; part < partsLength; part++) {
                    sequence[part].push(bits[part][0]);
                }
                addString(unit);
            }
            else {
                // Multiple units, so must be inside a calc.
                addString("calc(");
                const patternCalc = pattern.length - 1; // Store the beginning of our calc.
                for (let i = 0; i < units.length; i++) {
                    const unit = units[i], firstLetter = unit[0], isComplex = firstLetter === "*" || firstLetter === "/", isMaths = isComplex || firstLetter === "+" || firstLetter === "-";
                    if (isComplex) {
                        // TODO: Not sure this should be done automatically!
                        pattern[patternCalc] += "(";
                        addString(")");
                    }
                    if (i) {
                        addString(` ${isMaths ? firstLetter : "+"} `);
                    }
                    pattern.push(false);
                    for (let part = 0; part < partsLength; part++) {
                        const bit = bits[part], value = bit[1] === unit
                            ? bit[0]
                            : bit.length === 3
                                ? sequence[part - 1][sequence[part - 1].length - 1]
                                : isComplex ? 1 : 0;
                        sequence[part].push(value);
                    }
                    addString(isMaths ? unit.substring(1) : unit);
                }
                addString(")");
            }
        }
    }
    // We've got here, so a valid sequence - now check and fix RGB rounding
    // and calc() nesting...
    // TODO: Nested calc(a + calc(b + c)) -> calc(a + (b + c))
    for (let i = 0, inRGB = 0; i < pattern.length; i++) {
        const text = pattern[i];
        if (isString(text)) {
            if (inRGB && text.indexOf(",") >= 0) {
                inRGB++;
            }
            else if (text.indexOf("rgb") >= 0) {
                inRGB = 1;
            }
        }
        else if (inRGB) {
            if (inRGB < 4) {
                pattern[i] = true;
            }
            else {
                inRGB = 0;
            }
        }
    }
    return sequence;
}
/**
 * Convert a string-based tween with start and end strings, into a pattern
 * based tween with arrays.
 */
function explodeTween(propertyName, tween, duration, starting) {
    const startValue = tween.start, endValue = tween.end;
    if (!isString(endValue) || !isString(startValue)) {
        return;
    }
    let sequence = findPattern([startValue, endValue], propertyName);
    if (!sequence && starting) {
        // This little piece will take a startValue, split out the
        // various numbers in it, then copy the endValue into the
        // startValue while replacing the numbers in it to match the
        // original start numbers as a repeating sequence.
        // Finally this function will run again with the new
        // startValue and a now matching pattern.
        const startNumbers = startValue.match(/\d\.?\d*/g) || ["0"], count = startNumbers.length;
        let index = 0;
        sequence = findPattern([endValue.replace(/\d+\.?\d*/g, () => {
                return startNumbers[index++ % count];
            }), endValue], propertyName);
    }
    if (sequence) {
        if (Velocity$1.debug) {
            console.log(`Velocity: Sequence found:`, sequence);
        }
        sequence[0].percent = 0;
        sequence[1].percent = 1;
        tween.sequence = sequence;
        switch (tween.easing) {
            case Easings["at-start"]:
            case Easings["during"]:
            case Easings["at-end"]:
                sequence[0].easing = sequence[1].easing = tween.easing;
                break;
        }
    }
}
/**
 * Expand all queued animations that haven't gone yet
 *
 * This will automatically expand the properties map for any recently added
 * animations so that the start and end values are correct.
 */
function validateTweens(activeCall) {
    // This might be called on an already-ready animation
    if (State.firstNew === activeCall) {
        State.firstNew = activeCall._next;
    }
    // Check if we're actually already ready
    if (activeCall._flags & 1 /* EXPANDED */) { // tslint:disable-line:no-bitwise
        return;
    }
    const element = activeCall.element, tweens = activeCall.tweens, duration = getValue(activeCall.options.duration, defaults.duration);
    // tslint:disable-next-line:forin
    for (const propertyName in tweens) {
        const tween = tweens[propertyName];
        if (tween.start == null) {
            // Get the start value as it's not been passed in
            const startValue = getPropertyValue(activeCall.element, propertyName);
            if (isString(startValue)) {
                tween.start = fixColors(startValue);
                explodeTween(propertyName, tween, duration, true);
            }
            else if (!Array.isArray(startValue)) {
                console.warn(`bad type`, tween, propertyName, startValue);
            }
        }
        if (Velocity$1.debug) {
            console.log(`tweensContainer "${propertyName}": ${JSON.stringify(tween)}`, element);
        }
    }
    activeCall._flags |= 1 /* EXPANDED */; // tslint:disable-line:no-bitwise
}

/*
 * velocity-animate (C) 2014-2018 Julian Shapiro.
 *
 * Licensed under the MIT license. See LICENSE file in the project root for details.
 */
// Project
const rxPercents = /(\d*\.\d+|\d+\.?|from|to)/g;
function expandSequence(animation, sequence) {
    const tweens = animation.tweens = Object.create(null), element = animation.element;
    for (const propertyName in sequence.tweens) {
        if (sequence.tweens.hasOwnProperty(propertyName)) {
            const fn = getNormalization(element, propertyName);
            if (!fn && propertyName !== "tween") {
                if (Velocity$1.debug) {
                    console.log(`Skipping [${propertyName}] due to a lack of browser support.`);
                }
                continue;
            }
            tweens[propertyName] = {
                fn,
                sequence: sequence.tweens[propertyName],
            };
        }
    }
}
/**
 * Used to register a sequence. This should never be called by users
 * directly, instead it should be called via an action:<br/>
 * <code>Velocity("registerSequence", ""name", VelocitySequence);</code>
 */
function registerSequence(args) {
    if (isPlainObject(args[0])) {
        for (const name in args[0]) {
            if (args[0].hasOwnProperty(name)) {
                registerSequence([name, args[0][name]]);
            }
        }
    }
    else if (isString(args[0])) {
        const name = args[0], sequence = args[1];
        if (!isString(name)) {
            console.warn(`VelocityJS: Trying to set 'registerSequence' name to an invalid value:`, name);
        }
        else if (!isPlainObject(sequence)) {
            console.warn(`VelocityJS: Trying to set 'registerSequence' sequence to an invalid value:`, name, sequence);
        }
        else {
            if (SequencesObject[name]) {
                console.warn(`VelocityJS: Replacing named sequence:`, name);
            }
            const percents = {}, steps = new Array(100), properties = [], sequenceList = SequencesObject[name] = {}, duration = validateDuration(sequence.duration);
            sequenceList.tweens = {};
            if (isNumber(duration)) {
                sequenceList.duration = duration;
            }
            for (const part in sequence) {
                if (sequence.hasOwnProperty(part)) {
                    const keys = String(part)
                        .match(rxPercents);
                    if (keys) {
                        for (const key of keys) {
                            const percent = key === "from"
                                ? 0
                                : key === "to"
                                    ? 100
                                    : parseFloat(key);
                            if (percent < 0 || percent > 100) {
                                console.warn(`VelocityJS: Trying to use an invalid value as a percentage (0 <= n <= 100):`, name, percent);
                            }
                            else if (isNaN(percent)) {
                                console.warn(`VelocityJS: Trying to use an invalid number as a percentage:`, name, part, key);
                            }
                            else {
                                if (!percents[String(percent)]) {
                                    percents[String(percent)] = [];
                                }
                                percents[String(percent)].push(part);
                                for (const property in sequence[part]) {
                                    if (!properties.includes(property)) {
                                        properties.push(property);
                                    }
                                }
                            }
                        }
                    }
                }
            }
            const orderedPercents = Object.keys(percents)
                .sort((a, b) => {
                const a1 = parseFloat(a), b1 = parseFloat(b);
                return a1 > b1 ? 1 : a1 < b1 ? -1 : 0;
            });
            orderedPercents.forEach((key) => {
                steps.push.apply(percents[key]);
            });
            for (const property of properties) {
                const parts = [], propertyName = camelCase(property);
                for (const key of orderedPercents) {
                    for (const value of percents[key]) {
                        const stepProperties = sequence[value];
                        if (stepProperties[propertyName]) {
                            parts.push(isString(stepProperties[propertyName])
                                ? stepProperties[propertyName]
                                : stepProperties[propertyName][0]);
                        }
                    }
                }
                if (parts.length) {
                    const realSequence = findPattern(parts, propertyName);
                    let index = 0;
                    if (realSequence) {
                        for (const key of orderedPercents) {
                            for (const value of percents[key]) {
                                const originalProperty = sequence[value][propertyName];
                                if (originalProperty) {
                                    if (Array.isArray(originalProperty) && originalProperty.length > 1 && (isString(originalProperty[1]) || Array.isArray(originalProperty[1]))) {
                                        realSequence[index].easing = validateEasing(originalProperty[1], sequenceList.duration || DEFAULT_DURATION);
                                    }
                                    realSequence[index++].percent = parseFloat(key) / 100;
                                }
                            }
                        }
                        sequenceList.tweens[propertyName] = realSequence;
                    }
                }
            }
        }
    }
}
registerAction(["registerSequence", registerSequence], true);

/*
 * velocity-animate (C) 2014-2018 Julian Shapiro.
 *
 * Licensed under the MIT license. See LICENSE file in the project root for details.
 *
 * Call Completion
 */
// Project
/**
 * Call the complete method of an animation in a separate function so it can
 * benefit from JIT compiling while still having a try/catch block.
 */
function callComplete(activeCall) {
    const callback = activeCall.complete || activeCall.options.complete;
    if (callback) {
        try {
            const elements = activeCall.elements;
            callback.call(elements, elements, activeCall);
        }
        catch (error) {
            setTimeout(() => {
                throw error;
            }, 1);
        }
    }
}
/**
 * Complete an animation. This might involve restarting (for loop or repeat
 * options). Once it is finished we also check for any callbacks or Promises
 * that need updating.
 */
function completeCall(activeCall) {
    // TODO: Check if it's not been completed already
    const options = activeCall.options, queue = getValue(activeCall.queue, options.queue), isLoop = getValue(activeCall.loop, options.loop, defaults.loop), isRepeat = getValue(activeCall.repeat, options.repeat, defaults.repeat), isStopped = activeCall._flags & 8 /* STOPPED */; // tslint:disable-line:no-bitwise
    if (!isStopped && (isLoop || isRepeat)) {
        ////////////////////
        // Option: Loop   //
        // Option: Repeat //
        ////////////////////
        if (isRepeat && isRepeat !== true) {
            activeCall.repeat = isRepeat - 1;
        }
        else if (isLoop && isLoop !== true) {
            activeCall.loop = isLoop - 1;
            activeCall.repeat = getValue(activeCall.repeatAgain, options.repeatAgain, defaults.repeatAgain);
        }
        if (isLoop) {
            activeCall._flags ^= 64 /* REVERSE */; // tslint:disable-line:no-bitwise
        }
        if (queue !== false) {
            // Can't be called when stopped so no need for an extra check.
            Data(activeCall.element).lastFinishList[queue] = activeCall.timeStart + getValue(activeCall.duration, options.duration, defaults.duration);
        }
        activeCall.timeStart = activeCall.ellapsedTime = activeCall.percentComplete = 0;
        activeCall._flags &= ~4 /* STARTED */; // tslint:disable-line:no-bitwise
    }
    else {
        const element = activeCall.element, data = Data(element);
        if (!--data.count && !isStopped) {
            ////////////////////////
            // Feature: Classname //
            ////////////////////////
            removeClass(element, State.className);
        }
        //////////////////////
        // Option: Complete //
        //////////////////////
        // If this is the last animation in this list then we can check for
        // and complete calls or Promises.
        // TODO: When deleting an element we need to adjust these values.
        if (options && ++options._completed === options._total) {
            if (!isStopped && options.complete) {
                // We don't call the complete if the animation is stopped,
                // and we clear the key to prevent it being called again.
                callComplete(activeCall);
                options.complete = null;
            }
            const resolver = options._resolver;
            if (resolver) {
                // Fulfil the Promise
                resolver(activeCall.elements);
                delete options._resolver;
            }
        }
        ///////////////////
        // Option: Queue //
        ///////////////////
        if (queue !== false) {
            // We only do clever things with queues...
            if (!isStopped) {
                // If we're not stopping an animation, we need to remember
                // what time it finished so that the next animation in
                // sequence gets the correct start time.
                data.lastFinishList[queue] = activeCall.timeStart + getValue(activeCall.duration, options.duration, defaults.duration);
            }
            // Start the next animation in sequence, or delete the queue if
            // this was the last one.
            dequeue(element, queue);
        }
        // Cleanup any pointers, and remember the last animation etc.
        freeAnimationCall(activeCall);
    }
}

/*
 * velocity-animate (C) 2014-2018 Julian Shapiro.
 *
 * Licensed under the MIT license. See LICENSE file in the project root for details.
 */
/**
 * Remove nested `calc(0px + *)` or `calc(* + (0px + *))` correctly.
 */
function removeNestedCalc(value) {
    if (value.indexOf("calc(") >= 0) {
        const tokens = value.split(/([\(\)])/);
        let depth = 0;
        for (let i = 0; i < tokens.length; i++) {
            const token = tokens[i];
            switch (token) {
                case "(":
                    depth++;
                    break;
                case ")":
                    depth--;
                    break;
                default:
                    if (depth && token[0] === "0") {
                        tokens[i] = token.replace(/^0[a-z%]+ \+ /, "");
                    }
                    break;
            }
        }
        return tokens.join("")
            .replace(/(?:calc)?\(([0-9\.]+[a-z%]+)\)/g, "$1");
    }
    return value;
}

/*
 * velocity-animate (C) 2014-2018 Julian Shapiro.
 *
 * Licensed under the MIT license. See LICENSE file in the project root for details.
 *
 * Tick
 */
// Project
/**
 * Call the begin method of an animation in a separate function so it can
 * benefit from JIT compiling while still having a try/catch block.
 */
function beginCall(activeCall) {
    const callback = activeCall.begin || activeCall.options.begin;
    if (callback) {
        try {
            const elements = activeCall.elements;
            callback.call(elements, elements, activeCall);
        }
        catch (error) {
            setTimeout(() => {
                throw error;
            }, 1);
        }
    }
}
/**
 * Call the progress method of an animation in a separate function so it can
 * benefit from JIT compiling while still having a try/catch block.
 */
function progressCall(activeCall) {
    const callback = activeCall.progress || activeCall.options.progress;
    if (callback) {
        try {
            const elements = activeCall.elements, percentComplete = activeCall.percentComplete, options = activeCall.options, tweenValue = activeCall.tween;
            callback.call(elements, elements, percentComplete, Math.max(0, activeCall.timeStart + (activeCall.duration != null ? activeCall.duration : options.duration != null ? options.duration : defaults.duration) - lastTick), tweenValue !== undefined ? tweenValue : String(percentComplete * 100), activeCall);
        }
        catch (error) {
            setTimeout(() => {
                throw error;
            }, 1);
        }
    }
}
/**
 * Call callbacks, potentially run async with the main animation thread.
 */
function asyncCallbacks() {
    for (const activeCall of progressed) {
        progressCall(activeCall);
    }
    progressed.clear();
    for (const activeCall of completed) {
        completeCall(activeCall);
    }
    completed.clear();
}
/**************
 Timing
 **************/
const FRAME_TIME = 1000 / 60, 
/**
 * Animations with a Complete callback.
 */
completed = new Set(), 
/**
 * Animations with a Progress callback.
 */
progressed = new Set(), 
/**
 * Shim for window.performance in case it doesn't exist
 */
performance = (() => {
    const perf = window.performance || {};
    if (typeof perf.now !== "function") {
        const nowOffset = perf.timing && perf.timing.navigationStart ? perf.timing.navigationStart : now();
        perf.now = () => {
            return now() - nowOffset;
        };
    }
    return perf;
})(), 
/**
 * Proxy function for when rAF is not available.
 *
 * This should hopefully never be used as the browsers often throttle
 * this to less than one frame per second in the background, making it
 * completely unusable.
 */
rAFProxy = (callback) => {
    return setTimeout(callback, Math.max(0, FRAME_TIME - (performance.now() - lastTick)));
}, 
/**
 * Either requestAnimationFrame, or a shim for it.
 */
rAFShim = window.requestAnimationFrame || rAFProxy;
/**
 * Set if we are currently inside a tick() to prevent double-calling.
 */
let ticking, 
/**
 * A background WebWorker that sends us framerate messages when we're in
 * the background. Without this we cannot maintain frame accuracy.
 */
worker;
/**
 * The time that the last animation frame ran at. Set from tick(), and used
 * for missing rAF (ie, when not in focus etc).
 */
let lastTick = 0;
/**
 * WebWorker background function.
 *
 * When we're in the background this will send us a msg every tick, when in
 * the foreground it won't.
 *
 * When running in the background the browser reduces allowed CPU etc, so
 * we raun at 30fps instead of 60fps.
 */
function workerFn() {
    let interval;
    this.onmessage = (e) => {
        switch (e.data) {
            case true:
                if (!interval) {
                    interval = setInterval(() => {
                        this.postMessage(true);
                    }, 1000 / 30);
                }
                break;
            case false:
                if (interval) {
                    clearInterval(interval);
                    interval = 0;
                }
                break;
            default:
                this.postMessage(e.data);
                break;
        }
    };
}
try {
    // Create the worker - this might not be supported, hence the try/catch.
    worker = new Worker(URL.createObjectURL(new Blob([`(${workerFn})()`])));
    // Whenever the worker sends a message we tick()
    worker.onmessage = (e) => {
        if (e.data === true) {
            tick();
        }
        else {
            asyncCallbacks();
        }
    };
    // And watch for going to the background to start the WebWorker running.
    if (!State.isMobile && document.hidden !== undefined) {
        document.addEventListener("visibilitychange", () => {
            worker.postMessage(State.isTicking && document.hidden);
        });
    }
}
catch (e) {
    /*
     * WebWorkers are not supported in this format. This can happen in IE10
     * where it can't create one from a blob this way. We fallback, but make
     * no guarantees towards accuracy in this case.
     */
}
/**
 * Called on every tick, preferably through rAF. This is reponsible for
 * initialising any new animations, then starting any that need starting.
 * Finally it will expand any tweens and set the properties relating to
 * them. If there are any callbacks relating to the animations then they
 * will attempt to call at the end (with the exception of "begin").
 */
function tick(timestamp) {
    if (ticking) {
        // Should never happen - but if we've swapped back from hidden to
        // visibile then we want to make sure
        return;
    }
    ticking = true;
    /* An empty timestamp argument indicates that this is the first tick occurence since ticking was turned on.
     We leverage this metadata to fully ignore the first tick pass since RAF's initial pass is fired whenever
     the browser's next tick sync time occurs, which results in the first elements subjected to Velocity
     calls being animated out of sync with any elements animated immediately thereafter. In short, we ignore
     the first RAF tick pass so that elements being immediately consecutively animated -- instead of simultaneously animated
     by the same Velocity call -- are properly batched into the same initial RAF tick and consequently remain in sync thereafter. */
    if (timestamp !== false) {
        const timeCurrent = performance.now(), deltaTime = lastTick ? timeCurrent - lastTick : FRAME_TIME, defaultSpeed = defaults.speed, defaultEasing = defaults.easing, defaultDuration = defaults.duration;
        let activeCall, nextCall;
        if (deltaTime >= defaults.minFrameTime || !lastTick) {
            lastTick = timeCurrent;
            /********************
             Call Iteration
             ********************/
            // Expand any tweens that might need it.
            while (State.firstNew) {
                validateTweens(State.firstNew);
            }
            // Iterate through each active call.
            for (activeCall = State.first; activeCall && activeCall !== State.firstNew; activeCall = activeCall._next) {
                const element = activeCall.element, data = Data(element);
                // Check to see if this element has been deleted midway
                // through the animation. If it's gone then end this
                // animation.
                if (!element.parentNode || !data) {
                    // TODO: Remove safely - decrease count, delete data, remove from arrays
                    freeAnimationCall(activeCall);
                    continue;
                }
                // Don't bother getting until we can use these.
                const options = activeCall.options, flags = activeCall._flags;
                let timeStart = activeCall.timeStart;
                // If this is the first time that this call has been
                // processed by tick() then we assign timeStart now so that
                // it's value is as close to the real animation start time
                // as possible.
                if (!timeStart) {
                    const queue = activeCall.queue != null ? activeCall.queue : options.queue;
                    timeStart = timeCurrent - deltaTime;
                    if (queue !== false) {
                        timeStart = Math.max(timeStart, data.lastFinishList[queue] || 0);
                    }
                    activeCall.timeStart = timeStart;
                }
                // If this animation is paused then skip processing unless
                // it has been set to resume.
                if (flags & 16 /* PAUSED */) { // tslint:disable-line:no-bitwise
                    // Update the time start to accomodate the paused
                    // completion amount.
                    activeCall.timeStart += deltaTime;
                    continue;
                }
                // Check if this animation is ready - if it's synced then it
                // needs to wait for all other animations in the sync
                if (!(flags & 2 /* READY */)) { // tslint:disable-line:no-bitwise
                    activeCall._flags |= 2 /* READY */; // tslint:disable-line:no-bitwise
                    options._ready++;
                }
            }
            // Need to split the loop, as ready sync animations must all get
            // the same start time.
            for (activeCall = State.first; activeCall && activeCall !== State.firstNew; activeCall = nextCall) {
                const flags = activeCall._flags;
                nextCall = activeCall._next;
                if (!(flags & 2 /* READY */) || (flags & 16 /* PAUSED */)) { // tslint:disable-line:no-bitwise
                    continue;
                }
                const options = activeCall.options;
                if ((flags & 32 /* SYNC */) && options._ready < options._total) { // tslint:disable-line:no-bitwise
                    activeCall.timeStart += deltaTime;
                    continue;
                }
                const speed = activeCall.speed != null ? activeCall.speed : options.speed != null ? options.speed : defaultSpeed;
                let timeStart = activeCall.timeStart;
                // Don't bother getting until we can use these.
                if (!(flags & 4 /* STARTED */)) { // tslint:disable-line:no-bitwise
                    const delay = activeCall.delay != null ? activeCall.delay : options.delay;
                    // Make sure anything we've delayed doesn't start
                    // animating yet, there might still be an active delay
                    // after something has been un-paused
                    if (delay) {
                        if (timeStart + (delay / speed) > timeCurrent) {
                            continue;
                        }
                        activeCall.timeStart = timeStart += delay / (delay > 0 ? speed : 1);
                    }
                    activeCall._flags |= 4 /* STARTED */; // tslint:disable-line:no-bitwise
                    // The begin callback is fired once per call, not once
                    // per element, and is passed the full raw DOM element
                    // set as both its context and its first argument.
                    if (options._started++ === 0) {
                        options._first = activeCall;
                        if (options.begin) {
                            // Pass to an external fn with a try/catch block for optimisation
                            beginCall(activeCall);
                            // Only called once, even if reversed or repeated
                            options.begin = undefined;
                        }
                    }
                }
                if (speed !== 1) {
                    // On the first frame we may have a shorter delta
                    // const delta = Math.min(deltaTime, timeCurrent - timeStart);
                    activeCall.timeStart = timeStart += Math.min(deltaTime, timeCurrent - timeStart) * (1 - speed);
                }
                const activeEasing = activeCall.easing != null ? activeCall.easing : options.easing != null ? options.easing : defaultEasing, millisecondsEllapsed = activeCall.ellapsedTime = timeCurrent - timeStart, duration = activeCall.duration != null ? activeCall.duration : options.duration != null ? options.duration : defaultDuration, percentComplete = activeCall.percentComplete = Velocity$1.mock ? 1 : Math.min(millisecondsEllapsed / duration, 1), tweens = activeCall.tweens, reverse = flags & 64 /* REVERSE */; // tslint:disable-line:no-bitwise
                if (activeCall.progress || (options._first === activeCall && options.progress)) {
                    progressed.add(activeCall);
                }
                if (percentComplete === 1) {
                    completed.add(activeCall);
                }
                // tslint:disable-next-line:forin
                for (const property in tweens) {
                    // For every element, iterate through each property.
                    const tween = tweens[property], sequence = tween.sequence, pattern = sequence.pattern;
                    let currentValue = "", i = 0;
                    if (pattern) {
                        const easingComplete = (tween.easing || activeEasing)(percentComplete, 0, 1, property);
                        let best = 0;
                        for (let j = 0; j < sequence.length - 1; j++) {
                            if (sequence[j].percent < easingComplete) {
                                best = j;
                            }
                        }
                        const tweenFrom = sequence[best], tweenTo = sequence[best + 1] || tweenFrom, rawPercent = (percentComplete - tweenFrom.percent) / (tweenTo.percent - tweenFrom.percent), tweenPercent = reverse ? 1 - rawPercent : rawPercent, easing = tweenTo.easing || activeEasing || linearEasing;
                        for (; i < pattern.length; i++) {
                            const startValue = tweenFrom[i];
                            if (startValue == null) {
                                currentValue += pattern[i];
                            }
                            else {
                                const endValue = tweenTo[i];
                                if (startValue === endValue) {
                                    currentValue += startValue;
                                }
                                else {
                                    // All easings must deal with numbers except for our internal ones.
                                    const result = easing(tweenPercent, startValue, endValue, property);
                                    currentValue += pattern[i] !== true ? result : Math.round(result);
                                }
                            }
                        }
                        if (property !== "tween") {
                            if (percentComplete === 1) {
                                currentValue = removeNestedCalc(currentValue);
                            }
                            // TODO: To solve an IE<=8 positioning bug, the unit type must be dropped when setting a property value of 0 - add normalisations to legacy
                            setPropertyValue(activeCall.element, property, currentValue, tween.fn);
                        }
                        else {
                            // Skip the fake 'tween' property as that is only
                            // passed into the progress callback.
                            activeCall.tween = currentValue;
                        }
                    }
                    else {
                        console.warn(`VelocityJS: Missing pattern:`, property, JSON.stringify(tween[property]));
                        delete tweens[property];
                    }
                }
            }
            if (progressed.size || completed.size) {
                if (!document.hidden) {
                    asyncCallbacks();
                }
                else if (worker) {
                    worker.postMessage("");
                }
                else {
                    setTimeout(asyncCallbacks, 1);
                }
            }
        }
    }
    if (State.first) {
        State.isTicking = true;
        if (!document.hidden) {
            rAFShim(tick);
        }
        else if (!worker) {
            rAFProxy(tick);
        }
        else if (timestamp === false) {
            // Make sure we turn on the messages.
            worker.postMessage(true);
        }
    }
    else {
        State.isTicking = false;
        lastTick = 0;
        if (document.hidden && worker) {
            // Make sure we turn off the messages.
            worker.postMessage(false);
        }
    }
    ticking = false;
}

/*
 * velocity-animate (C) 2014-2018 Julian Shapiro.
 *
 * Licensed under the MIT license. See LICENSE file in the project root for details.
 *
 * Core "Velocity" function.
 */
// Project
let globalPromise;
try {
    globalPromise = Promise;
}
catch ( /**/_a) { /**/ }
const noPromiseOption = ", if that is deliberate then pass `promiseRejectEmpty:false` as an option";
/**
 * Patch a VelocityResult with a Promise.
 */
function patchPromise(promiseObject, result) {
    defineProperty(result, "promise", promiseObject);
    defineProperty(result, "then", promiseObject.then.bind(promiseObject));
    defineProperty(result, "catch", promiseObject.catch.bind(promiseObject));
    if (promiseObject.finally) {
        // Semi-standard
        defineProperty(result, "finally", promiseObject.finally.bind(promiseObject));
    }
}
/* tslint:enable:max-line-length */
function Velocity$2(...args) {
    const 
    /**
     * A shortcut to the default options.
     */
    defaults$1 = defaults, 
    /**
     * Cache of the first argument - this is used often enough to be saved.
     */
    args0 = args[0], 
    /**
     * To allow for expressive CoffeeScript code, Velocity supports an
     * alternative syntax in which "elements" (or "e"), "properties" (or
     * "p"), and "options" (or "o") objects are defined on a container
     * object that's passed in as Velocity's sole argument.
     *
     * Note: Some browsers automatically populate arguments with a
     * "properties" object. We detect it by checking for its default
     * "names" property.
     */
    // TODO: Confirm which browsers - if <=IE8 the we can drop completely
    syntacticSugar = isPlainObject(args0) && (args0.p || ((isPlainObject(args0.properties) && !args0.properties.names) || isString(args0.properties)));
    let 
    /**
     *  When Velocity is called via the utility function (Velocity()),
     * elements are explicitly passed in as the first parameter. Thus,
     * argument positioning varies.
     */
    argumentIndex = 0, 
    /**
     * The list of elements, extended with Promise and Velocity.
     */
    elements, 
    /**
     * The properties being animated. This can be a string, in which case it
     * is either a function for these elements, or it is a "named" animation
     * sequence to use instead. Named sequences start with either "callout."
     * or "transition.". When used as a callout the values will be reset
     * after finishing. When used as a transtition then there is no special
     * handling after finishing.
     */
    propertiesMap, 
    /**
     * Options supplied, this will be mapped and validated into
     * <code>options</code>.
     */
    optionsMap, 
    /**
     * If called via a chain then this contains the <b>last</b> calls
     * animations. If this does not have a value then any access to the
     * element's animations needs to be to the currently-running ones.
     */
    animations, 
    /**
     * The promise that is returned.
     */
    promise, 
    // Used when the animation is finished
    resolver, 
    // Used when there was an issue with one or more of the Velocity arguments
    rejecter;
    //console.log(`Velocity`, args)
    // First get the elements, and the animations connected to the last call if
    // this is chained.
    // TODO: Clean this up a bit
    // TODO: Throw error if the chain is called with elements as the first argument. isVelocityResult(this) && ( (isNode(arg0) || isWrapped(arg0)) && arg0 == this)
    if (isNode(this)) {
        // This is from a chain such as document.getElementById("").velocity(...)
        elements = [this];
    }
    else if (isWrapped(this)) {
        // This might be a chain from something else, but if chained from a
        // previous Velocity() call then grab the animations it's related to.
        elements = cloneArray(this);
        if (isVelocityResult(this)) {
            animations = this.velocity.animations;
        }
    }
    else if (syntacticSugar) {
        elements = cloneArray(args0.elements || args0.e);
        argumentIndex++;
    }
    else if (isNode(args0)) {
        elements = cloneArray([args0]);
        argumentIndex++;
    }
    else if (isWrapped(args0)) {
        elements = cloneArray(args0);
        argumentIndex++;
    }
    // Allow elements to be chained.
    if (elements) {
        defineProperty(elements, "velocity", Velocity$2.bind(elements));
        if (animations) {
            defineProperty(elements.velocity, "animations", animations);
        }
    }
    // Next get the propertiesMap and options.
    if (syntacticSugar) {
        propertiesMap = getValue(args0.properties, args0.p);
    }
    else {
        // TODO: Should be possible to call Velocity("pauseAll") - currently not possible
        propertiesMap = args[argumentIndex++];
    }
    // Get any options map passed in as arguments first, expand any direct
    // options if possible.
    const isReverse = propertiesMap === "reverse", isAction = !isReverse && isString(propertiesMap), maybeSequence = isAction && SequencesObject[propertiesMap], opts = syntacticSugar ? getValue(args0.options, args0.o) : args[argumentIndex];
    if (isPlainObject(opts)) {
        optionsMap = opts;
    }
    // Create the promise if supported and wanted.
    if (globalPromise && getValue(optionsMap && optionsMap.promise, defaults$1.promise)) {
        promise = new globalPromise((resolve, reject) => {
            rejecter = reject;
            // IMPORTANT:
            // If a resolver tries to run on a Promise then it will wait until
            // that Promise resolves - but in this case we're running on our own
            // Promise, so need to make sure it's not seen as one. Removing
            // these values for the duration of the resolve.
            // Due to being an async call, they should be back to "normal"
            // before the <code>.then()</code> function gets called.
            resolver = (result) => {
                if (isVelocityResult(result) && result.promise) {
                    delete result.then;
                    delete result.catch;
                    delete result.finally;
                    resolve(result);
                    patchPromise(result.promise, result);
                }
                else {
                    resolve(result);
                }
            };
        });
        if (elements) {
            patchPromise(promise, elements);
        }
    }
    if (promise) {
        const optionPromiseRejectEmpty = optionsMap && optionsMap.promiseRejectEmpty, promiseRejectEmpty = getValue(optionPromiseRejectEmpty, defaults$1.promiseRejectEmpty);
        if (!elements && !isAction) {
            if (promiseRejectEmpty) {
                rejecter(`Velocity: No elements supplied${isBoolean(optionPromiseRejectEmpty) ? "" : noPromiseOption}. Aborting.`);
            }
            else {
                resolver();
            }
        }
        else if (!propertiesMap) {
            if (promiseRejectEmpty) {
                rejecter(`Velocity: No properties supplied${isBoolean(optionPromiseRejectEmpty) ? "" : noPromiseOption}. Aborting.`);
            }
            else {
                resolver();
            }
        }
    }
    if ((!elements && !isAction) || !propertiesMap) {
        return promise;
    }
    // NOTE: Can't use isAction here due to type inference - there are callbacks
    // between so the type isn't considered safe.
    if (isAction) {
        const actionArgs = [], promiseHandler = promise && {
            _promise: promise,
            _resolver: resolver,
            _rejecter: rejecter,
        };
        while (argumentIndex < args.length) {
            actionArgs.push(args[argumentIndex++]);
        }
        // Velocity's behavior is categorized into "actions". If a string is
        // passed in instead of a propertiesMap then that will call a function
        // to do something special to the animation linked.
        // There is one special case - "reverse" - which is handled differently,
        // by being stored on the animation and then expanded when the animation
        // starts.
        const action = propertiesMap.replace(/\..*$/, ""), callback = Actions[action];
        if (callback) {
            const result = callback(actionArgs, elements, promiseHandler, propertiesMap);
            if (result !== undefined) {
                return result;
            }
            return elements || promise;
        }
        else if (!maybeSequence) {
            console.error(`VelocityJS: First argument (${propertiesMap}) was not a property map, a known action, or a registered redirect. Aborting.`);
            return;
        }
    }
    let hasValidDuration;
    if (isPlainObject(propertiesMap) || isReverse || maybeSequence) {
        /**
         * The options for this set of animations.
         */
        const options = {};
        let isSync = defaults$1.sync;
        // Private options first - set as non-enumerable, and starting with an
        // underscore so we can filter them out.
        if (promise) {
            defineProperty(options, "_promise", promise);
            defineProperty(options, "_rejecter", rejecter);
            defineProperty(options, "_resolver", resolver);
        }
        defineProperty(options, "_ready", 0);
        defineProperty(options, "_started", 0);
        defineProperty(options, "_completed", 0);
        defineProperty(options, "_total", 0);
        // Now check the optionsMap
        if (isPlainObject(optionsMap)) {
            const validDuration = validateDuration(optionsMap.duration);
            hasValidDuration = validDuration !== undefined;
            options.duration = getValue(validDuration, defaults$1.duration);
            options.delay = getValue(validateDelay(optionsMap.delay), defaults$1.delay);
            // Need the extra fallback here in case it supplies an invalid
            // easing that we need to overrride with the default.
            options.easing = validateEasing(getValue(optionsMap.easing, defaults$1.easing), options.duration) || validateEasing(defaults$1.easing, options.duration);
            options.loop = getValue(validateLoop(optionsMap.loop), defaults$1.loop);
            options.repeat = options.repeatAgain = getValue(validateRepeat(optionsMap.repeat), defaults$1.repeat);
            if (optionsMap.speed != null) {
                options.speed = getValue(validateSpeed(optionsMap.speed), 1);
            }
            if (isBoolean(optionsMap.promise)) {
                options.promise = optionsMap.promise;
            }
            options.queue = getValue(validateQueue(optionsMap.queue), defaults$1.queue);
            if (optionsMap.mobileHA && !State.isGingerbread) {
                /* When set to true, and if this is a mobile device, mobileHA automatically enables hardware acceleration (via a null transform hack)
                 on animating elements. HA is removed from the element at the completion of its animation. */
                /* Note: Android Gingerbread doesn't support HA. If a null transform hack (mobileHA) is in fact set, it will prevent other tranform subproperties from taking effect. */
                /* Note: You can read more about the use of mobileHA in Velocity's documentation: velocity-animate/#mobileHA. */
                options.mobileHA = true;
            }
            if (optionsMap.drag === true) {
                options.drag = true;
            }
            if (isNumber(optionsMap.stagger) || isFunction(optionsMap.stagger)) {
                options.stagger = optionsMap.stagger;
            }
            if (!isReverse) {
                if (optionsMap["display"] != null) {
                    propertiesMap.display = optionsMap["display"];
                    console.error(`Deprecated "options.display" used, this is now a property:`, optionsMap["display"]);
                }
                if (optionsMap["visibility"] != null) {
                    propertiesMap.visibility = optionsMap["visibility"];
                    console.error(`Deprecated "options.visibility" used, this is now a property:`, optionsMap["visibility"]);
                }
            }
            // TODO: Allow functional options for different options per element
            const optionsBegin = validateBegin(optionsMap.begin), optionsComplete = validateComplete(optionsMap.complete), optionsProgress = validateProgress(optionsMap.progress), optionsSync = validateSync(optionsMap.sync);
            if (optionsBegin != null) {
                options.begin = optionsBegin;
            }
            if (optionsComplete != null) {
                options.complete = optionsComplete;
            }
            if (optionsProgress != null) {
                options.progress = optionsProgress;
            }
            if (optionsSync != null) {
                isSync = optionsSync;
            }
        }
        else if (!syntacticSugar) {
            // Expand any direct options if possible.
            let offset = 0;
            options.duration = validateDuration(args[argumentIndex], true);
            if (options.duration === undefined) {
                options.duration = defaults$1.duration;
            }
            else {
                hasValidDuration = true;
                offset++;
            }
            if (!isFunction(args[argumentIndex + offset])) {
                // Despite coming before Complete, we can't pass a fn easing
                const easing = validateEasing(args[argumentIndex + offset], getValue(options && validateDuration(options.duration), defaults$1.duration), true);
                if (easing !== undefined) {
                    offset++;
                    options.easing = easing;
                }
            }
            const complete = validateComplete(args[argumentIndex + offset], true);
            if (complete !== undefined) {
                options.complete = complete;
            }
            options.delay = defaults$1.delay;
            options.loop = defaults$1.loop;
            options.repeat = options.repeatAgain = defaults$1.repeat;
        }
        if (isReverse && options.queue === false) {
            throw new Error("VelocityJS: Cannot reverse a queue:false animation.");
        }
        if (!hasValidDuration && maybeSequence && maybeSequence.duration) {
            options.duration = maybeSequence.duration;
        }
        // When a set of elements is targeted by a Velocity call, the set is
        // broken up and each element has the current Velocity call individually
        // queued onto it. In this way, each element's existing queue is
        // respected; some elements may already be animating and accordingly
        // should not have this current Velocity call triggered immediately
        // unless the sync:true option is used.
        const rootAnimation = {
            options,
            elements,
            _prev: undefined,
            _next: undefined,
            _flags: isSync ? 32 /* SYNC */ : 0,
            percentComplete: 0,
            ellapsedTime: 0,
            timeStart: 0,
        };
        animations = [];
        for (let index = 0; index < elements.length; index++) {
            const element = elements[index];
            let flags = 0;
            if (isNode(element)) { // TODO: This needs to check for valid animation targets, not just Elements
                if (isReverse) {
                    const lastAnimation = Data(element).lastAnimationList[options.queue];
                    propertiesMap = lastAnimation && lastAnimation.tweens;
                    if (!propertiesMap) {
                        console.error(`VelocityJS: Attempting to reverse an animation on an element with no previous animation:`, element);
                        continue;
                    }
                    flags |= 64 /* REVERSE */ & ~(lastAnimation._flags & 64 /* REVERSE */); // tslint:disable-line:no-bitwise
                }
                const animation = Object.assign({}, rootAnimation, { element, _flags: rootAnimation._flags | flags });
                options._total++;
                animations.push(animation);
                if (options.stagger) {
                    if (isFunction(options.stagger)) {
                        const num = optionCallback(options.stagger, element, index, elements.length, elements, "stagger");
                        if (isNumber(num)) {
                            animation.delay = options.delay + num;
                        }
                    }
                    else {
                        animation.delay = options.delay + (options.stagger * index);
                    }
                }
                if (options.drag) {
                    animation.duration = options.duration - (options.duration * Math.max(1 - (index + 1) / elements.length, 0.75));
                }
                if (maybeSequence) {
                    expandSequence(animation, maybeSequence);
                }
                else if (isReverse) {
                    // In this case we're using the previous animation, so
                    // it will be expanded correctly when that one runs.
                    animation.tweens = propertiesMap;
                }
                else {
                    animation.tweens = Object.create(null);
                    expandProperties(animation, propertiesMap);
                }
                queue(element, animation, options.queue);
            }
        }
        if (State.isTicking === false) {
            // If the animation tick isn't running, start it. (Velocity shuts it
            // off when there are no active calls to process.)
            tick(false);
        }
        if (animations) {
            defineProperty(elements.velocity, "animations", animations);
        }
    }
    /***************
     Chaining
     ***************/
    /* Return the elements back to the call chain, with wrapped elements taking precedence in case Velocity was called via the $.fn. extension. */
    return elements || promise;
}
/**
 * Call an option callback in a try/catch block and report an error if needed.
 */
function optionCallback(fn, element, index, length, elements, option) {
    try {
        return fn.call(element, index, length, elements, option);
    }
    catch (e) {
        console.error(`VelocityJS: Exception when calling '${option}' callback:`, e);
    }
}

/*
 * velocity-animate (C) 2014-2018 Julian Shapiro.
 *
 * Licensed under the MIT license. See LICENSE file in the project root for details.
 */
// Project
/**
 * Used to patch any object to allow Velocity chaining. In order to chain an
 * object must either be treatable as an array - with a <code>.length</code>
 * property, and each member a Node, or a Node directly.
 *
 * By default Velocity will try to patch <code>window</code>,
 * <code>jQuery</code>, <code>Zepto</code>, and several classes that return
 * Nodes or lists of Nodes.
 */
function patch(proto, global) {
    try {
        defineProperty(proto, (global ? "V" : "v") + "elocity", Velocity$2);
    }
    catch (e) {
        console.warn(`VelocityJS: Error when trying to add prototype.`, e);
    }
}

/*
 * velocity-animate (C) 2014-2018 Julian Shapiro.
 *
 * Licensed under the MIT license. See LICENSE file in the project root for details.
 *
 * Finish all animation.
 */
// Project
/**
 * Check if an animation should be finished, and if so we set the tweens to
 * the final value for it, then call complete.
 */
function checkAnimationShouldBeFinished(animation, queueName, defaultQueue) {
    validateTweens(animation);
    if (queueName === undefined || queueName === getValue(animation.queue, animation.options.queue, defaultQueue)) {
        if (!(animation._flags & 4 /* STARTED */)) { // tslint:disable-line:no-bitwise
            // Copied from tick.ts - ensure that the animation is completely
            // valid and run begin() before complete().
            const options = animation.options;
            // The begin callback is fired once per call, not once per
            // element, and is passed the full raw DOM element set as both
            // its context and its first argument.
            if (options._started++ === 0) {
                options._first = animation;
                if (options.begin) {
                    // Pass to an external fn with a try/catch block for optimisation
                    beginCall(animation);
                    // Only called once, even if reversed or repeated
                    options.begin = undefined;
                }
            }
            animation._flags |= 4 /* STARTED */; // tslint:disable-line:no-bitwise
        }
        // tslint:disable-next-line:forin
        for (const property in animation.tweens) {
            const tween = animation.tweens[property], sequence = tween.sequence, pattern = sequence.pattern;
            let currentValue = "", i = 0;
            if (pattern) {
                const endValues = sequence[sequence.length - 1];
                for (; i < pattern.length; i++) {
                    const endValue = endValues[i];
                    currentValue += endValue == null ? pattern[i] : endValue;
                }
            }
            setPropertyValue(animation.element, property, currentValue, tween.fn);
        }
        completeCall(animation);
    }
}
/**
 * When the finish action is triggered, the elements' currently active call is
 * immediately finished. When an element is finished, the next item in its
 * animation queue is immediately triggered. If passed via a chained call
 * then this will only target the animations in that call, and not the
 * elements linked to it.
 *
 * A queue name may be passed in to specify that only animations on the
 * named queue are finished. The default queue is named "". In addition the
 * value of `false` is allowed for the queue name.
 *
 * An final argument may be passed in to clear an element's remaining queued
 * calls. This may only be the value `true`.
 */
function finish(args, elements, promiseHandler) {
    const queueName = validateQueue(args[0], true), defaultQueue = defaults.queue, finishAll = args[queueName === undefined ? 0 : 1] === true;
    if (isVelocityResult(elements) && elements.velocity.animations) {
        for (const animation of elements.velocity.animations) {
            checkAnimationShouldBeFinished(animation, queueName, defaultQueue);
        }
    }
    else {
        while (State.firstNew) {
            validateTweens(State.firstNew);
        }
        for (let activeCall = State.first, nextCall; activeCall && (finishAll || activeCall !== State.firstNew); activeCall = nextCall || State.firstNew) {
            nextCall = activeCall._next;
            if (!elements || elements.includes(activeCall.element)) {
                checkAnimationShouldBeFinished(activeCall, queueName, defaultQueue);
            }
        }
    }
    if (promiseHandler) {
        if (isVelocityResult(elements) && elements.velocity.animations && elements.then) {
            elements.then(promiseHandler._resolver);
        }
        else {
            promiseHandler._resolver(elements);
        }
    }
}
registerAction(["finish", finish], true);

/*
 * velocity-animate (C) 2014-2018 Julian Shapiro.
 *
 * Licensed under the MIT license. See LICENSE file in the project root for details.
 *
 * Get or set a value from one or more running animations.
 */
/**
 * Used to map getters for the various AnimationFlags.
 */
const animationFlags = {
    isExpanded: 1 /* EXPANDED */,
    isReady: 2 /* READY */,
    isStarted: 4 /* STARTED */,
    isStopped: 8 /* STOPPED */,
    isPaused: 16 /* PAUSED */,
    isSync: 32 /* SYNC */,
    isReverse: 64 /* REVERSE */,
};
/**
 * Get or set an option or running AnimationCall data value. If there is no
 * value passed then it will get, otherwise we will set.
 *
 * NOTE: When using "get" this will not touch the Promise as it is never
 * returned to the user.
 */
function option(args, elements, promiseHandler, action) {
    const key = args[0], queue = action.indexOf(".") >= 0 ? action.replace(/^.*\./, "") : undefined, queueName = queue === "false" ? false : validateQueue(queue, true);
    let animations, value = args[1];
    if (!key) {
        console.warn(`VelocityJS: Cannot access a non-existant key!`);
        return null;
    }
    // If we're chaining the return value from Velocity then we are only
    // interested in the values related to that call
    if (isVelocityResult(elements) && elements.velocity.animations) {
        animations = elements.velocity.animations;
    }
    else {
        animations = [];
        for (let activeCall = State.first; activeCall; activeCall = activeCall._next) {
            if (elements.indexOf(activeCall.element) >= 0 && getValue(activeCall.queue, activeCall.options.queue) === queueName) {
                animations.push(activeCall);
            }
        }
        // If we're dealing with multiple elements that are pointing at a
        // single running animation, then instead treat them as a single
        // animation.
        if (elements.length > 1 && animations.length > 1) {
            let i = 1, options = animations[0].options;
            while (i < animations.length) {
                if (animations[i++].options !== options) {
                    options = null;
                    break;
                }
            }
            // TODO: this needs to check that they're actually a sync:true animation to merge the results, otherwise the individual values may be different
            if (options) {
                animations = [animations[0]];
            }
        }
    }
    // GET
    if (value === undefined) {
        const result = [], flag = animationFlags[key];
        for (const animation of animations) {
            if (flag === undefined) {
                // A normal key to get.
                result.push(getValue(animation[key], animation.options[key]));
            }
            else {
                // A flag that we're checking against.
                result.push((animation._flags & flag) === 0); // tslint:disable-line:no-bitwise
            }
        }
        if (elements.length === 1 && animations.length === 1) {
            // If only a single animation is found and we're only targetting a
            // single element, then return the value directly
            return result[0];
        }
        return result;
    }
    // SET
    let isPercentComplete;
    switch (key) {
        case "cache":
            value = validateCache(value);
            break;
        case "begin":
            value = validateBegin(value);
            break;
        case "complete":
            value = validateComplete(value);
            break;
        case "delay":
            value = validateDelay(value);
            break;
        case "duration":
            value = validateDuration(value);
            break;
        case "fpsLimit":
            value = validateFpsLimit(value);
            break;
        case "loop":
            value = validateLoop(value);
            break;
        case "percentComplete":
            isPercentComplete = true;
            value = parseFloat(value);
            break;
        case "repeat":
        case "repeatAgain":
            value = validateRepeat(value);
            break;
        default:
            if (key[0] !== "_") {
                const num = parseFloat(value);
                if (value === String(num)) {
                    value = num;
                }
                break;
            }
        // deliberate fallthrough
        case "queue":
        case "promise":
        case "promiseRejectEmpty":
        case "easing":
        case "started":
            console.warn(`VelocityJS: Trying to set a read-only key:`, key);
            return;
    }
    if (value === undefined || value !== value) {
        console.warn(`VelocityJS: Trying to set an invalid value:${key}=${value} (${args[1]})`);
        return null;
    }
    for (const animation of animations) {
        if (isPercentComplete) {
            animation.timeStart = lastTick - (getValue(animation.duration, animation.options.duration, defaults.duration) * value);
        }
        else {
            animation[key] = value;
        }
    }
    if (promiseHandler) {
        if (isVelocityResult(elements) && elements.velocity.animations && elements.then) {
            elements.then(promiseHandler._resolver);
        }
        else {
            promiseHandler._resolver(elements);
        }
    }
}
registerAction(["option", option], true);

/*
 * velocity-animate (C) 2014-2018 Julian Shapiro.
 *
 * Licensed under the MIT license. See LICENSE file in the project root for details.
 *
 * Pause and resume animation.
 */
// Project
/**
 * Check if an animation should be paused / resumed.
 */
function checkAnimation(animation, queueName, defaultQueue, isPaused) {
    if (queueName === undefined || queueName === getValue(animation.queue, animation.options.queue, defaultQueue)) {
        if (isPaused) {
            animation._flags |= 16 /* PAUSED */; // tslint:disable-line:no-bitwise
        }
        else {
            animation._flags &= ~16 /* PAUSED */; // tslint:disable-line:no-bitwise
        }
    }
}
/**
 * Pause and Resume are call-wide (not on a per element basis). Thus, calling pause or resume on a
 * single element will cause any calls that contain tweens for that element to be paused/resumed
 * as well.
 */
function pauseResume(args, elements, promiseHandler, action) {
    const isPaused = action.indexOf("pause") === 0, queue = action.indexOf(".") >= 0 ? action.replace(/^.*\./, "") : undefined, queueName = queue === "false" ? false : validateQueue(args[0]), defaultQueue = defaults.queue;
    if (isVelocityResult(elements) && elements.velocity.animations) {
        for (const animation of elements.velocity.animations) {
            checkAnimation(animation, queueName, defaultQueue, isPaused);
        }
    }
    else {
        let activeCall = State.first;
        while (activeCall) {
            if (!elements || elements.includes(activeCall.element)) {
                checkAnimation(activeCall, queueName, defaultQueue, isPaused);
            }
            activeCall = activeCall._next;
        }
    }
    if (promiseHandler) {
        if (isVelocityResult(elements) && elements.velocity.animations && elements.then) {
            elements.then(promiseHandler._resolver);
        }
        else {
            promiseHandler._resolver(elements);
        }
    }
}
registerAction(["pause", pauseResume], true);
registerAction(["resume", pauseResume], true);

/*
 * velocity-animate (C) 2014-2018 Julian Shapiro.
 *
 * Licensed under the MIT license. See LICENSE file in the project root for details.
 *
 * Get or set a property from one or more elements.
 */
// Project
/**
 * Get or set a style of Nomralised property value on one or more elements.
 * If there is no value passed then it will get, otherwise we will set.
 *
 * NOTE: When using "get" this will not touch the Promise as it is never
 * returned to the user.
 *
 * This can fail to set, and will reject the Promise if it does so.
 *
 * Velocity(elements, "style", "property", "value") => elements;
 * Velocity(elements, "style", {"property": "value", ...}) => elements;
 * Velocity(element, "style", "property") => "value";
 * Velocity(elements, "style", "property") => ["value", ...];
 */
function propertyAction(args, elements, promiseHandler, action) {
    const property = args[0], value = args[1];
    if (!property) {
        console.warn(`VelocityJS: Cannot access a non-existant property!`);
        return null;
    }
    // GET
    if (value === undefined && !isPlainObject(property)) {
        if (Array.isArray(property)) {
            if (elements.length === 1) {
                const result = {};
                for (const prop of property) {
                    result[prop] = fixColors(getPropertyValue(elements[0], prop));
                }
                return result;
            }
            else {
                const result = [];
                for (const element of elements) {
                    const res = {};
                    for (const prop of property) {
                        res[prop] = fixColors(getPropertyValue(element, prop));
                    }
                    result.push(res);
                }
                return result;
            }
        }
        else {
            // If only a single animation is found and we're only targetting a
            // single element, then return the value directly
            if (elements.length === 1) {
                return fixColors(getPropertyValue(elements[0], property));
            }
            const result = [];
            for (const element of elements) {
                result.push(fixColors(getPropertyValue(element, property)));
            }
            return result;
        }
    }
    // SET
    const error = [];
    if (isPlainObject(property)) {
        for (const propertyName in property) {
            if (property.hasOwnProperty(propertyName)) {
                for (const element of elements) {
                    const propertyValue = property[propertyName];
                    if (isString(propertyValue) || isNumber(propertyValue)) {
                        setPropertyValue(element, propertyName, property[propertyName]);
                    }
                    else {
                        error.push(`Cannot set a property "${propertyName}" to an unknown type: ${typeof propertyValue}`);
                        console.warn(`VelocityJS: Cannot set a property "${propertyName}" to an unknown type:`, propertyValue);
                    }
                }
            }
        }
    }
    else if (isString(value) || isNumber(value)) {
        for (const element of elements) {
            setPropertyValue(element, property, String(value));
        }
    }
    else {
        error.push(`Cannot set a property "${property}" to an unknown type: ${typeof value}`);
        console.warn(`VelocityJS: Cannot set a property "${property}" to an unknown type:`, value);
    }
    if (promiseHandler) {
        if (error.length) {
            promiseHandler._rejecter(error.join(", "));
        }
        else if (isVelocityResult(elements) && elements.velocity.animations && elements.then) {
            elements.then(promiseHandler._resolver);
        }
        else {
            promiseHandler._resolver(elements);
        }
    }
}
registerAction(["property", propertyAction], true);

/*
 * velocity-animate (C) 2014-2018 Julian Shapiro.
 *
 * Licensed under the MIT license. See LICENSE file in the project root for details.
 *
 * Actions that can be performed by passing a string instead of a propertiesMap.
 */
// Project
registerAction(["reverse", (args, elements, promiseHandler, action) => {
        // NOTE: Code needs to split out before here - but this is needed to prevent it being overridden
        throw new SyntaxError("VelocityJS: The 'reverse' action is built in and private.");
    }], true);

/*
 * velocity-animate (C) 2014-2018 Julian Shapiro.
 *
 * Licensed under the MIT license. See LICENSE file in the project root for details.
 *
 * Stop animation.
 */
// Project
/**
 * Check if an animation should be stopped, and if so then set the STOPPED
 * flag on it, then call complete.
 */
function checkAnimationShouldBeStopped(animation, queueName, defaultQueue) {
    validateTweens(animation);
    if (queueName === undefined || queueName === getValue(animation.queue, animation.options.queue, defaultQueue)) {
        animation._flags |= 8 /* STOPPED */; // tslint:disable-line:no-bitwise
        completeCall(animation);
    }
}
/**
 * When the stop action is triggered, the elements' currently active call is
 * immediately stopped. When an element is stopped, the next item in its
 * animation queue is immediately triggered. If passed via a chained call
 * then this will only target the animations in that call, and not the
 * elements linked to it.
 *
 * A queue name may be passed in to specify that only animations on the
 * named queue are stopped. The default queue is named "". In addition the
 * value of `false` is allowed for the queue name.
 *
 * An final argument may be passed in to clear an element's remaining queued
 * calls. This may only be the value `true`.
 *
 * Note: The stop command runs prior to Velocity's Queueing phase since its
 * behavior is intended to take effect *immediately*, regardless of the
 * element's current queue state.
 */
function stop(args, elements, promiseHandler, action) {
    const queueName = validateQueue(args[0], true), defaultQueue = defaults.queue, finishAll = args[queueName === undefined ? 0 : 1] === true;
    if (isVelocityResult(elements) && elements.velocity.animations) {
        for (const animation of elements.velocity.animations) {
            checkAnimationShouldBeStopped(animation, queueName, defaultQueue);
        }
    }
    else {
        while (State.firstNew) {
            validateTweens(State.firstNew);
        }
        for (let activeCall = State.first, nextCall; activeCall && (finishAll || activeCall !== State.firstNew); activeCall = nextCall || State.firstNew) {
            nextCall = activeCall._next;
            if (!elements || elements.includes(activeCall.element)) {
                checkAnimationShouldBeStopped(activeCall, queueName, defaultQueue);
            }
        }
    }
    if (promiseHandler) {
        if (isVelocityResult(elements) && elements.velocity.animations && elements.then) {
            elements.then(promiseHandler._resolver);
        }
        else {
            promiseHandler._resolver(elements);
        }
    }
}
registerAction(["stop", stop], true);

/*
 * velocity-animate (C) 2014-2018 Julian Shapiro.
 *
 * Licensed under the MIT license. See LICENSE file in the project root for details.
 *
 * Get or set a property from one or more elements.
 */
// Project
registerAction(["style", propertyAction], true);

/*
 * velocity-animate (C) 2014-2018 Julian Shapiro.
 *
 * Licensed under the MIT license. See LICENSE file in the project root for details.
 *
 * Get or set a property from one or more elements.
 */
// Project
/**
 *
 */
function tweenAction(args, elements, promiseHandler, action) {
    let requireForcefeeding;
    if (!elements) {
        if (!args.length) {
            console.info(`Velocity(<element>, \"tween\", percentComplete, property, end | [end, <easing>, <start>], <easing>) => value
Velocity(<element>, \"tween\", percentComplete, {property: end | [end, <easing>, <start>], ...}, <easing>) => {property: value, ...}`);
            return null;
        }
        elements = [document.body];
        requireForcefeeding = true;
    }
    else if (elements.length !== 1) {
        // TODO: Allow more than a single element to return an array of results
        throw new Error("VelocityJS: Cannot tween more than one element!");
    }
    const percentComplete = args[0], fakeAnimation = {
        elements,
        element: elements[0],
        queue: false,
        options: {
            duration: 1000,
        },
        tweens: null,
    }, result = {};
    let properties = args[1], singleResult, maybeSequence, easing = args[2], count = 0;
    if (isString(args[1])) {
        if (SequencesObject && SequencesObject[args[1]]) {
            maybeSequence = SequencesObject[args[1]];
            properties = {};
            easing = args[2];
        }
        else {
            singleResult = true;
            properties = {
                [args[1]]: args[2],
            };
            easing = args[3];
        }
    }
    else if (Array.isArray(args[1])) {
        singleResult = true;
        properties = {
            tween: args[1],
        };
        easing = args[2];
    }
    if (!isNumber(percentComplete) || percentComplete < 0 || percentComplete > 1) {
        throw new Error("VelocityJS: Must tween a percentage from 0 to 1!");
    }
    if (!isPlainObject(properties)) {
        throw new Error("VelocityJS: Cannot tween an invalid property!");
    }
    if (requireForcefeeding) {
        for (const property in properties) {
            if (properties.hasOwnProperty(property) && (!Array.isArray(properties[property]) || properties[property].length < 2)) {
                throw new Error("VelocityJS: When not supplying an element you must force-feed values: " + property);
            }
        }
    }
    const activeEasing = validateEasing(getValue(easing, defaults.easing), DEFAULT_DURATION);
    if (maybeSequence) {
        expandSequence(fakeAnimation, maybeSequence);
    }
    else {
        expandProperties(fakeAnimation, properties);
    }
    // tslint:disable-next-line:forin
    for (const property in fakeAnimation.tweens) {
        // For every element, iterate through each property.
        const propertyTween = fakeAnimation.tweens[property], sequence = propertyTween.sequence, pattern = sequence.pattern;
        let currentValue = "", i = 0;
        count++;
        if (pattern) {
            const easingComplete = (propertyTween.easing || activeEasing)(percentComplete, 0, 1, property);
            let best = 0;
            for (let j = 0; j < sequence.length - 1; j++) {
                if (sequence[j].percent < easingComplete) {
                    best = j;
                }
            }
            const tweenFrom = sequence[best], tweenTo = sequence[best + 1] || tweenFrom, tweenPercent = (percentComplete - tweenFrom.percent) / (tweenTo.percent - tweenFrom.percent), tweenEasing = tweenTo.easing || linearEasing;
            for (; i < pattern.length; i++) {
                const startValue = tweenFrom[i];
                if (startValue == null) {
                    currentValue += pattern[i];
                }
                else {
                    const endValue = tweenTo[i];
                    if (startValue === endValue) {
                        currentValue += startValue;
                    }
                    else {
                        // All easings must deal with numbers except for our internal ones.
                        const value = tweenEasing(tweenPercent, startValue, endValue, property);
                        currentValue += pattern[i] === true ? Math.round(value) : value;
                    }
                }
            }
            result[property] = currentValue;
        }
    }
    if (singleResult && count === 1) {
        for (const property in result) {
            if (result.hasOwnProperty(property)) {
                return result[property];
            }
        }
    }
    return result;
}
registerAction(["tween", tweenAction], true);

/*
 * velocity-animate (C) 2014-2018 Julian Shapiro.
 *
 * Licensed under the MIT license. See LICENSE file in the project root for details.
 */
// Project
/**
 * Converting from hex as it makes for a smaller file.
 */
const colorValues = {
    aliceblue: 0xF0F8FF,
    antiquewhite: 0xFAEBD7,
    aqua: 0x00FFFF,
    aquamarine: 0x7FFFD4,
    azure: 0xF0FFFF,
    beige: 0xF5F5DC,
    bisque: 0xFFE4C4,
    black: 0x000000,
    blanchedalmond: 0xFFEBCD,
    blue: 0x0000FF,
    blueviolet: 0x8A2BE2,
    brown: 0xA52A2A,
    burlywood: 0xDEB887,
    cadetblue: 0x5F9EA0,
    chartreuse: 0x7FFF00,
    chocolate: 0xD2691E,
    coral: 0xFF7F50,
    cornflowerblue: 0x6495ED,
    cornsilk: 0xFFF8DC,
    crimson: 0xDC143C,
    cyan: 0x00FFFF,
    darkblue: 0x00008B,
    darkcyan: 0x008B8B,
    darkgoldenrod: 0xB8860B,
    darkgray: 0xA9A9A9,
    darkgrey: 0xA9A9A9,
    darkgreen: 0x006400,
    darkkhaki: 0xBDB76B,
    darkmagenta: 0x8B008B,
    darkolivegreen: 0x556B2F,
    darkorange: 0xFF8C00,
    darkorchid: 0x9932CC,
    darkred: 0x8B0000,
    darksalmon: 0xE9967A,
    darkseagreen: 0x8FBC8F,
    darkslateblue: 0x483D8B,
    darkslategray: 0x2F4F4F,
    darkslategrey: 0x2F4F4F,
    darkturquoise: 0x00CED1,
    darkviolet: 0x9400D3,
    deeppink: 0xFF1493,
    deepskyblue: 0x00BFFF,
    dimgray: 0x696969,
    dimgrey: 0x696969,
    dodgerblue: 0x1E90FF,
    firebrick: 0xB22222,
    floralwhite: 0xFFFAF0,
    forestgreen: 0x228B22,
    fuchsia: 0xFF00FF,
    gainsboro: 0xDCDCDC,
    ghostwhite: 0xF8F8FF,
    gold: 0xFFD700,
    goldenrod: 0xDAA520,
    gray: 0x808080,
    grey: 0x808080,
    green: 0x008000,
    greenyellow: 0xADFF2F,
    honeydew: 0xF0FFF0,
    hotpink: 0xFF69B4,
    indianred: 0xCD5C5C,
    indigo: 0x4B0082,
    ivory: 0xFFFFF0,
    khaki: 0xF0E68C,
    lavender: 0xE6E6FA,
    lavenderblush: 0xFFF0F5,
    lawngreen: 0x7CFC00,
    lemonchiffon: 0xFFFACD,
    lightblue: 0xADD8E6,
    lightcoral: 0xF08080,
    lightcyan: 0xE0FFFF,
    lightgoldenrodyellow: 0xFAFAD2,
    lightgray: 0xD3D3D3,
    lightgrey: 0xD3D3D3,
    lightgreen: 0x90EE90,
    lightpink: 0xFFB6C1,
    lightsalmon: 0xFFA07A,
    lightseagreen: 0x20B2AA,
    lightskyblue: 0x87CEFA,
    lightslategray: 0x778899,
    lightslategrey: 0x778899,
    lightsteelblue: 0xB0C4DE,
    lightyellow: 0xFFFFE0,
    lime: 0x00FF00,
    limegreen: 0x32CD32,
    linen: 0xFAF0E6,
    magenta: 0xFF00FF,
    maroon: 0x800000,
    mediumaquamarine: 0x66CDAA,
    mediumblue: 0x0000CD,
    mediumorchid: 0xBA55D3,
    mediumpurple: 0x9370DB,
    mediumseagreen: 0x3CB371,
    mediumslateblue: 0x7B68EE,
    mediumspringgreen: 0x00FA9A,
    mediumturquoise: 0x48D1CC,
    mediumvioletred: 0xC71585,
    midnightblue: 0x191970,
    mintcream: 0xF5FFFA,
    mistyrose: 0xFFE4E1,
    moccasin: 0xFFE4B5,
    navajowhite: 0xFFDEAD,
    navy: 0x000080,
    oldlace: 0xFDF5E6,
    olive: 0x808000,
    olivedrab: 0x6B8E23,
    orange: 0xFFA500,
    orangered: 0xFF4500,
    orchid: 0xDA70D6,
    palegoldenrod: 0xEEE8AA,
    palegreen: 0x98FB98,
    paleturquoise: 0xAFEEEE,
    palevioletred: 0xDB7093,
    papayawhip: 0xFFEFD5,
    peachpuff: 0xFFDAB9,
    peru: 0xCD853F,
    pink: 0xFFC0CB,
    plum: 0xDDA0DD,
    powderblue: 0xB0E0E6,
    purple: 0x800080,
    rebeccapurple: 0x663399,
    red: 0xFF0000,
    rosybrown: 0xBC8F8F,
    royalblue: 0x4169E1,
    saddlebrown: 0x8B4513,
    salmon: 0xFA8072,
    sandybrown: 0xF4A460,
    seagreen: 0x2E8B57,
    seashell: 0xFFF5EE,
    sienna: 0xA0522D,
    silver: 0xC0C0C0,
    skyblue: 0x87CEEB,
    slateblue: 0x6A5ACD,
    slategray: 0x708090,
    slategrey: 0x708090,
    snow: 0xFFFAFA,
    springgreen: 0x00FF7F,
    steelblue: 0x4682B4,
    tan: 0xD2B48C,
    teal: 0x008080,
    thistle: 0xD8BFD8,
    tomato: 0xFF6347,
    turquoise: 0x40E0D0,
    violet: 0xEE82EE,
    wheat: 0xF5DEB3,
    white: 0xFFFFFF,
    whitesmoke: 0xF5F5F5,
    yellow: 0xFFFF00,
    yellowgreen: 0x9ACD32,
};
for (const name in colorValues) {
    if (colorValues.hasOwnProperty(name)) {
        const color = colorValues[name];
        ColorNames[name] = `${Math.floor(color / 65536)},${Math.floor(color / 256 % 256)},${(color % 256)}`;
    }
}

/*
 * velocity-animate (C) 2014-2018 Julian Shapiro.
 *
 * Licensed under the MIT license. See LICENSE file in the project root for details.
 *
 * Back easings, based on code from https://github.com/yuichiroharai/easeplus-velocity
 */
// Project
function registerBackIn(name, amount) {
    registerEasing([name, (percentComplete, startValue, endValue) => {
            if (percentComplete === 0) {
                return startValue;
            }
            if (percentComplete === 1) {
                return endValue;
            }
            return Math.pow(percentComplete, 2) * ((amount + 1) * percentComplete - amount) * (endValue - startValue);
        }]);
}
function registerBackOut(name, amount) {
    registerEasing([name, (percentComplete, startValue, endValue) => {
            if (percentComplete === 0) {
                return startValue;
            }
            if (percentComplete === 1) {
                return endValue;
            }
            return (Math.pow(--percentComplete, 2) * ((amount + 1) * percentComplete + amount) + 1) * (endValue - startValue);
        }]);
}
function registerBackInOut(name, amount) {
    amount *= 1.525;
    registerEasing([name, (percentComplete, startValue, endValue) => {
            if (percentComplete === 0) {
                return startValue;
            }
            if (percentComplete === 1) {
                return endValue;
            }
            percentComplete *= 2;
            return (percentComplete < 1
                ? (Math.pow(percentComplete, 2) * ((amount + 1) * percentComplete - amount))
                : (Math.pow(percentComplete - 2, 2) * ((amount + 1) * (percentComplete - 2) + amount) + 2)) * 0.5 * (endValue - startValue);
        }]);
}
registerBackIn("easeInBack", 1.7);
registerBackOut("easeOutBack", 1.7);
registerBackInOut("easeInOutBack", 1.7);
// TODO: Expose these as actions to register custom easings?

/*
 * velocity-animate (C) 2014-2018 Julian Shapiro.
 *
 * Licensed under the MIT license. See LICENSE file in the project root for details.
 *
 * Bounce easings, based on code from https://github.com/yuichiroharai/easeplus-velocity
 */
// Project
function easeOutBouncePercent(percentComplete) {
    if (percentComplete < 1 / 2.75) {
        return (7.5625 * percentComplete * percentComplete);
    }
    if (percentComplete < 2 / 2.75) {
        return (7.5625 * (percentComplete -= 1.5 / 2.75) * percentComplete + 0.75);
    }
    if (percentComplete < 2.5 / 2.75) {
        return (7.5625 * (percentComplete -= 2.25 / 2.75) * percentComplete + 0.9375);
    }
    return (7.5625 * (percentComplete -= 2.625 / 2.75) * percentComplete + 0.984375);
}
function easeInBouncePercent(percentComplete) {
    return 1 - easeOutBouncePercent(1 - percentComplete);
}
function easeInBounce(percentComplete, startValue, endValue) {
    if (percentComplete === 0) {
        return startValue;
    }
    if (percentComplete === 1) {
        return endValue;
    }
    return easeInBouncePercent(percentComplete) * (endValue - startValue);
}
function easeOutBounce(percentComplete, startValue, endValue) {
    if (percentComplete === 0) {
        return startValue;
    }
    if (percentComplete === 1) {
        return endValue;
    }
    return easeOutBouncePercent(percentComplete) * (endValue - startValue);
}
function easeInOutBounce(percentComplete, startValue, endValue) {
    if (percentComplete === 0) {
        return startValue;
    }
    if (percentComplete === 1) {
        return endValue;
    }
    return (percentComplete < 0.5
        ? easeInBouncePercent(percentComplete * 2) * 0.5
        : easeOutBouncePercent(percentComplete * 2 - 1) * 0.5 + 0.5) * (endValue - startValue);
}
registerEasing(["easeInBounce", easeInBounce]);
registerEasing(["easeOutBounce", easeOutBounce]);
registerEasing(["easeInOutBounce", easeInOutBounce]);

/*
 * velocity-animate (C) 2014-2018 Julian Shapiro.
 *
 * Licensed under the MIT license. See LICENSE file in the project root for details.
 *
 * Elastic easings, based on code from https://github.com/yuichiroharai/easeplus-velocity
 */
// Project
// Constants
const PI2 = Math.PI * 2;
function registerElasticIn(name, amplitude, period) {
    registerEasing([name, (percentComplete, startValue, endValue) => {
            if (percentComplete === 0) {
                return startValue;
            }
            if (percentComplete === 1) {
                return endValue;
            }
            return -(amplitude * Math.pow(2, 10 * (percentComplete -= 1)) * Math.sin((percentComplete - (period / PI2 * Math.asin(1 / amplitude))) * PI2 / period)) * (endValue - startValue);
        }]);
}
function registerElasticOut(name, amplitude, period) {
    registerEasing([name, (percentComplete, startValue, endValue) => {
            if (percentComplete === 0) {
                return startValue;
            }
            if (percentComplete === 1) {
                return endValue;
            }
            return (amplitude * Math.pow(2, -10 * percentComplete) * Math.sin((percentComplete - (period / PI2 * Math.asin(1 / amplitude))) * PI2 / period) + 1) * (endValue - startValue);
        }]);
}
function registerElasticInOut(name, amplitude, period) {
    registerEasing([name, (percentComplete, startValue, endValue) => {
            if (percentComplete === 0) {
                return startValue;
            }
            if (percentComplete === 1) {
                return endValue;
            }
            const s = period / PI2 * Math.asin(1 / amplitude);
            percentComplete = percentComplete * 2 - 1;
            return (percentComplete < 0
                ? -0.5 * (amplitude * Math.pow(2, 10 * percentComplete) * Math.sin((percentComplete - s) * PI2 / period))
                : amplitude * Math.pow(2, -10 * percentComplete) * Math.sin((percentComplete - s) * PI2 / period) * 0.5 + 1) * (endValue - startValue);
        }]);
}
registerElasticIn("easeInElastic", 1, 0.3);
registerElasticOut("easeOutElastic", 1, 0.3);
registerElasticInOut("easeInOutElastic", 1, 0.3 * 1.5);
// TODO: Expose these as actions to register custom easings?

/*
 * velocity-animate (C) 2014-2018 Julian Shapiro.
 *
 * Licensed under the MIT license. See LICENSE file in the project root for details.
 *
 * Easings to act on strings, either set at the start or at the end depending on
 * need.
 */
// Project
/**
 * Easing function that sets to the specified value immediately after the
 * animation starts.
 */
function atStart(percentComplete, startValue, endValue) {
    return percentComplete === 0
        ? startValue
        : endValue;
}
/**
 * Easing function that sets to the specified value while the animation is
 * running.
 */
function during(percentComplete, startValue, endValue) {
    return percentComplete === 0 || percentComplete === 1
        ? startValue
        : endValue;
}
/**
 * Easing function that sets to the specified value when the animation ends.
 */
function atEnd(percentComplete, startValue, endValue) {
    return percentComplete === 1
        ? endValue
        : startValue;
}
registerEasing(["at-start", atStart]);
registerEasing(["during", during]);
registerEasing(["at-end", atEnd]);

/*
 * velocity-animate (C) 2014-2018 Julian Shapiro.
 *
 * Licensed under the MIT license. See LICENSE file in the project root for details.
 */
// Project
/**
 * Get/set the inner/outer dimension.
 */
function getDimension$1(name, wantInner) {
    return ((element, propertyValue) => {
        if (propertyValue === undefined) {
            return augmentDimension(element, name, wantInner) + "px";
        }
        setPropertyValue(element, name, (parseFloat(propertyValue) - augmentDimension(element, name, wantInner)) + "px");
    });
}
registerNormalization(["Element", "innerWidth", getDimension$1("width", true)]);
registerNormalization(["Element", "innerHeight", getDimension$1("height", true)]);
registerNormalization(["Element", "outerWidth", getDimension$1("width", false)]);
registerNormalization(["Element", "outerHeight", getDimension$1("height", false)]);

/*
 * velocity-animate (C) 2014-2018 Julian Shapiro.
 *
 * Licensed under the MIT license. See LICENSE file in the project root for details.
 */
// Project
// Constants
const inlineRx = /^(b|big|i|small|tt|abbr|acronym|cite|code|dfn|em|kbd|strong|samp|let|a|bdo|br|img|map|object|q|script|span|sub|sup|button|input|label|select|textarea)$/i, listItemRx = /^(li)$/i, tableRowRx = /^(tr)$/i, tableRx = /^(table)$/i, tableRowGroupRx = /^(tbody)$/i;
function display(element, propertyValue) {
    const style = element.style;
    if (propertyValue === undefined) {
        return computePropertyValue(element, "display");
    }
    if (propertyValue === "auto") {
        const nodeName = element && element.nodeName, data = Data(element);
        if (inlineRx.test(nodeName)) {
            propertyValue = "inline";
        }
        else if (listItemRx.test(nodeName)) {
            propertyValue = "list-item";
        }
        else if (tableRowRx.test(nodeName)) {
            propertyValue = "table-row";
        }
        else if (tableRx.test(nodeName)) {
            propertyValue = "table";
        }
        else if (tableRowGroupRx.test(nodeName)) {
            propertyValue = "table-row-group";
        }
        else {
            // Default to "block" when no match is found.
            propertyValue = "block";
        }
        // IMPORTANT: We need to do this as getPropertyValue bypasses the
        // Normalisation when it exists in the cache.
        data.cache["display"] = propertyValue;
    }
    style.display = propertyValue;
}
registerNormalization(["Element", "display", display]);

/*
 * velocity-animate (C) 2014-2018 Julian Shapiro.
 *
 * Licensed under the MIT license. See LICENSE file in the project root for details.
 */
// Project
function clientWidth(element, propertyValue) {
    if (propertyValue == null) {
        return element.clientWidth + "px";
    }
}
function scrollWidth(element, propertyValue) {
    if (propertyValue == null) {
        return element.scrollWidth + "px";
    }
}
function clientHeight(element, propertyValue) {
    if (propertyValue == null) {
        return element.clientHeight + "px";
    }
}
function scrollHeight(element, propertyValue) {
    if (propertyValue == null) {
        return element.scrollHeight + "px";
    }
}
function scroll(direction, end) {
    return ((element, propertyValue) => {
        if (propertyValue == null) {
            // Make sure we have these values cached.
            getPropertyValue(element, "client" + direction, null, true);
            getPropertyValue(element, "scroll" + direction, null, true);
            return element["scroll" + end] + "px";
        }
        const value = parseFloat(propertyValue), unit = propertyValue.replace(String(value), "");
        switch (unit) {
            case "":
            case "px":
                element["scroll" + end] = value;
                break;
            case "%":
                const client = parseFloat(getPropertyValue(element, "client" + direction)), scrollValue = parseFloat(getPropertyValue(element, "scroll" + direction));
                element["scroll" + end] = Math.max(0, scrollValue - client) * value / 100;
                break;
        }
    });
}
registerNormalization(["HTMLElement", "scroll", scroll("Height", "Top"), false]);
registerNormalization(["HTMLElement", "scrollTop", scroll("Height", "Top"), false]);
registerNormalization(["HTMLElement", "scrollLeft", scroll("Width", "Left"), false]);
registerNormalization(["HTMLElement", "scrollWidth", scrollWidth]);
registerNormalization(["HTMLElement", "clientWidth", clientWidth]);
registerNormalization(["HTMLElement", "scrollHeight", scrollHeight]);
registerNormalization(["HTMLElement", "clientHeight", clientHeight]);

/*
 * velocity-animate (C) 2014-2018 Julian Shapiro.
 *
 * Licensed under the MIT license. See LICENSE file in the project root for details.
 *
 * This handles all CSS style properties. With browser prefixed properties it
 * will register a version that handles setting (and getting) both the prefixed
 * and non-prefixed version.
 */
// Project
/**
 * An RegExp pattern for the following list of css words using
 * http://kemio.com.ar/tools/lst-trie-re.php to generate:
 *
 * blockSize
 * borderBottomLeftRadius
 * borderBottomRightRadius
 * borderBottomWidth
 * borderImageOutset
 * borderImageWidth
 * borderLeftWidth
 * borderRadius
 * borderRightWidth
 * borderSpacing
 * borderTopLeftRadius
 * borderTopRightRadius
 * borderTopWidth
 * borderWidth
 * bottom
 * columnGap
 * columnRuleWidth
 * columnWidth
 * flexBasis
 * fontSize
 * gridColumnGap
 * gridGap
 * gridRowGap
 * height
 * inlineSize
 * left
 * letterSpacing
 * margin
 * marginBottom
 * marginLeft
 * marginRight
 * marginTop
 * maxBlockSize
 * maxHeight
 * maxInlineSize
 * maxWidth
 * minBlockSize
 * minHeight
 * minInlineSize
 * minWidth
 * objectPosition
 * outlineOffset
 * outlineWidth
 * padding
 * paddingBottom
 * paddingLeft
 * paddingRight
 * paddingTop
 * perspective
 * right
 * shapeMargin
 * strokeDashoffset
 * strokeWidth
 * textIndent
 * top
 * transformOrigin
 * width
 * wordSpacing
 */
// tslint:disable-next-line:max-line-length
const rxAddPx = /^(b(lockSize|o(rder(Bottom(LeftRadius|RightRadius|Width)|Image(Outset|Width)|LeftWidth|R(adius|ightWidth)|Spacing|Top(LeftRadius|RightRadius|Width)|Width)|ttom))|column(Gap|RuleWidth|Width)|f(lexBasis|ontSize)|grid(ColumnGap|Gap|RowGap)|height|inlineSize|le(ft|tterSpacing)|m(a(rgin(Bottom|Left|Right|Top)|x(BlockSize|Height|InlineSize|Width))|in(BlockSize|Height|InlineSize|Width))|o(bjectPosition|utline(Offset|Width))|p(adding(Bottom|Left|Right|Top)|erspective)|right|s(hapeMargin|troke(Dashoffset|Width))|t(extIndent|op|ransformOrigin)|w(idth|ordSpacing))$/;
/**
 * Return a Normalisation that can be used to set / get a prefixed style
 * property.
 */
function getSetPrefixed(propertyName, unprefixed) {
    return ((element, propertyValue) => {
        if (propertyValue === undefined) {
            return computePropertyValue(element, propertyName) || computePropertyValue(element, unprefixed);
        }
        element.style[propertyName] = element.style[unprefixed] = propertyValue;
    });
}
/**
 * Return a Normalisation that can be used to set / get a style property.
 */
function getSetStyle(propertyName) {
    return ((element, propertyValue) => {
        if (propertyValue === undefined) {
            return computePropertyValue(element, propertyName);
        }
        element.style[propertyName] = propertyValue;
    });
}
/**
 * Vendor prefixes. Chrome / Safari, Firefox, IE / Edge, Opera.
 */
const rxVendors = /^(webkit|moz|ms|o)[A-Z]/, prefixElement = State.prefixElement;
if (prefixElement) {
    for (const propertyName in prefixElement.style) {
        if (rxVendors.test(propertyName)) {
            const unprefixed = propertyName.replace(/^[a-z]+([A-Z])/, ($, letter) => letter.toLowerCase());
            {
                const addUnit = rxAddPx.test(unprefixed) ? "px" : undefined;
                registerNormalization(["Element", unprefixed, getSetPrefixed(propertyName, unprefixed), addUnit]);
            }
        }
        else if (!hasNormalization(["Element", propertyName])) {
            const addUnit = rxAddPx.test(propertyName) ? "px" : undefined;
            registerNormalization(["Element", propertyName, getSetStyle(propertyName), addUnit]);
        }
    }
}

/*
 * velocity-animate (C) 2014-2018 Julian Shapiro.
 *
 * Licensed under the MIT license. See LICENSE file in the project root for details.
 */
// Project
/**
 * Get/set an attribute.
 */
function getAttribute(name) {
    return ((element, propertyValue) => {
        if (propertyValue === undefined) {
            return element.getAttribute(name);
        }
        element.setAttribute(name, propertyValue);
    });
}
const base = document.createElement("div"), rxSubtype = /^SVG(.*)Element$/, rxElement = /Element$/;
Object.getOwnPropertyNames(window)
    .forEach((property) => {
    const subtype = rxSubtype.exec(property);
    if (subtype && subtype[1] !== "SVG") { // Don't do SVGSVGElement.
        try {
            const element = subtype[1] ? document.createElementNS("http://www.w3.org/2000/svg", (subtype[1] || "svg").toLowerCase()) : document.createElement("svg");
            // tslint:disable-next-line:forin
            for (const attribute in element) {
                // Although this isn't a tween without prototypes, we do
                // want to get hold of all attributes and not just own ones.
                const value = element[attribute];
                if (isString(attribute)
                    && !(attribute[0] === "o" && attribute[1] === "n")
                    && attribute !== attribute.toUpperCase()
                    && !rxElement.test(attribute)
                    && !(attribute in base)
                    && !isFunction(value)) {
                    // TODO: Should this all be set on the generic SVGElement, it would save space and time, but not as powerful
                    registerNormalization([property, attribute, getAttribute(attribute)]);
                }
            }
        }
        catch (e) {
            console.error(`VelocityJS: Error when trying to identify SVG attributes on ${property}.`, e);
        }
    }
});

/*
 * velocity-animate (C) 2014-2018 Julian Shapiro.
 *
 * Licensed under the MIT license. See LICENSE file in the project root for details.
 */
// Project
/**
 * Get/set the width or height.
 */
function getDimension(name) {
    return ((element, propertyValue) => {
        if (propertyValue === undefined) {
            // Firefox throws an error if .getBBox() is called on an SVG that isn't attached to the DOM.
            try {
                return element.getBBox()[name] + "px";
            }
            catch (e) {
                return "0px";
            }
        }
        element.setAttribute(name, propertyValue);
    });
}
registerNormalization(["SVGElement", "width", getDimension("width")]);
registerNormalization(["SVGElement", "height", getDimension("height")]);

/*
 * velocity-animate (C) 2014-2018 Julian Shapiro.
 *
 * Licensed under the MIT license. See LICENSE file in the project root for details.
 */
// Project
/**
 * A fake normalization used to allow the "tween" property easy access.
 */
function getSetTween(element, propertyValue) {
    if (propertyValue === undefined) {
        return "";
    }
}
registerNormalization(["Element", "tween", getSetTween]);

/*
 * velocity-animate (C) 2014-2017 Julian Shapiro.
 *
 * Licensed under the MIT license. See LICENSE file in the project root for details.
 */
// Automatically generated
const VERSION = "2.0.6";

/*
 * velocity-animate (C) 2014-2018 Julian Shapiro.
 *
 * Licensed under the MIT license. See LICENSE file in the project root for details.
 *
 * Extended Velocity members.
 */
// Project
const Velocity = Velocity$2;
Velocity.debug = 2;
/**
 * These parts of Velocity absolutely must be included, even if they're unused!
 */
var VelocityStatic;
(function (VelocityStatic) {
    /**
     * Actions cannot be replaced if they are internal (hasOwnProperty is false
     * but they still exist). Otherwise they can be replaced by users.
     *
     * All external method calls should be using actions rather than sub-calls
     * of Velocity itself.
     */
    VelocityStatic.Actions = Actions;
    /**
     * Our known easing functions.
     */
    VelocityStatic.Easings = Easings;
    /**
     * The currently registered sequences.
     */
    VelocityStatic.Sequences = SequencesObject;
    /**
     * Current internal state of Velocity.
     */
    VelocityStatic.State = State; // tslint:disable-line:no-shadowed-variable
    /**
     * Velocity option defaults, which can be overriden by the user.
     */
    VelocityStatic.defaults = defaults;
    /**
     * Used to patch any object to allow Velocity chaining. In order to chain an
     * object must either be treatable as an array - with a <code>.length</code>
     * property, and each member a Node, or a Node directly.
     *
     * By default Velocity will try to patch <code>window</code>,
     * <code>jQuery</code>, <code>Zepto</code>, and several classes that return
     * Nodes or lists of Nodes.
     */
    VelocityStatic.patch = patch;
    /**
     * Set to true, 1 or 2 (most verbose) to output debug info to console.
     */
    VelocityStatic.debug = false;
    /**
     * In mock mode, all animations are forced to complete immediately upon the
     * next rAF tick. If there are further animations queued then they will each
     * take one single frame in turn. Loops and repeats will be disabled while
     * <code>mock = true</code>.
     */
    VelocityStatic.mock = false;
    /**
     * Save our version number somewhere visible.
     */
    VelocityStatic.version = VERSION;
    /**
     * Added as a fallback for "import {Velocity} from 'velocity-animate';".
     */
    VelocityStatic.Velocity = Velocity$2; // tslint:disable-line:no-shadowed-variable
})(VelocityStatic || (VelocityStatic = {}));
/* IE detection. Gist: https://gist.github.com/julianshapiro/9098609 */
const IE = (() => {
    if (document.documentMode) {
        return document.documentMode;
    }
    else {
        for (let i = 7; i > 4; i--) {
            let div = document.createElement("div");
            div.innerHTML = `<!${"--"}[if IE ${i}]><span></span><![endif]-->`;
            if (div.getElementsByTagName("span").length) {
                div = null;
                return i;
            }
        }
    }
    return undefined;
})();
/******************
 Unsupported
 ******************/
if (IE <= 8) {
    throw new Error("VelocityJS cannot run on Internet Explorer 8 or earlier");
}
/******************
 Frameworks
 ******************/
if (window) {
    /*
     * Both jQuery and Zepto allow their $.fn object to be extended to allow
     * wrapped elements to be subjected to plugin calls. If either framework is
     * loaded, register a "velocity" extension pointing to Velocity's core
     * animate() method. Velocity also registers itself onto a global container
     * (window.jQuery || window.Zepto || window) so that certain features are
     * accessible beyond just a per-element scope. Accordingly, Velocity can
     * both act on wrapped DOM elements and stand alone for targeting raw DOM
     * elements.
     */
    const jQuery = window.jQuery, Zepto = window.Zepto;
    patch(window, true);
    patch(Element && Element.prototype);
    patch(NodeList && NodeList.prototype);
    patch(HTMLCollection && HTMLCollection.prototype);
    patch(jQuery, true);
    patch(jQuery && jQuery.fn);
    patch(Zepto, true);
    patch(Zepto && Zepto.fn);
}
// Make sure that the values within Velocity are read-only and upatchable.
for (const property in VelocityStatic) {
    if (VelocityStatic.hasOwnProperty(property)) {
        switch (typeof property) {
            case "number":
            case "boolean":
                defineProperty(Velocity, property, {
                    get() {
                        return VelocityStatic[property];
                    },
                    set(value) {
                        VelocityStatic[property] = value;
                    },
                }, true);
                break;
            default:
                defineProperty(Velocity, property, VelocityStatic[property], true);
                break;
        }
    }
}
Object.freeze(Velocity);
var Velocity$1 = Velocity; // tslint:disable-line:no-default-export

export { Velocity$1 as default };
