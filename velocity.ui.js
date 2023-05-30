/**
 * velocity-animate (C) 2014-2017 Julian Shapiro.
 *
 * Licensed under the MIT license. See LICENSE file in the project root for details.
 */

(function (global, factory) {
	typeof exports === 'object' && typeof module !== 'undefined' ? factory(require('velocity-animate')) :
	typeof define === 'function' && define.amd ? define(['velocity-animate'], factory) :
	(factory(global.Velocity));
}(this, (function (Velocity) { 'use strict';

	Velocity = Velocity && Velocity.hasOwnProperty('default') ? Velocity['default'] : Velocity;

	Velocity("registerSequence", "bounce", {
	    "duration": 1000,
	    "0,100%": {
	        transformOrigin: "center bottom"
	    },
	    "0%,20%,53%,80%,100%": {
	        transform: ["translate3d(0,0px,0)", "easeOutCubic"]
	    },
	    "40%,43%": {
	        transform: ["translate3d(0,-30px,0)", "easeInQuint"]
	    },
	    "70%": {
	        transform: ["translate3d(0,-15px,0)", "easeInQuint"]
	    },
	    "90%": {
	        transform: "translate3d(0,-4px,0)"
	    }
	});
	//# sourceMappingURL=bounce.js.map

	Velocity("registerSequence", "flash", {
	    "duration": 1000,
	    "0%,50%,100%": {
	        opacity: "1"
	    },
	    "25%,75%": {
	        opacity: "0"
	    }
	});
	//# sourceMappingURL=flash.js.map

	Velocity("registerSequence", "headShake", {
	    "duration": 1000,
	    "easing": "easeInOut",
	    "0%": {
	        transform: "translateX(0) rotateY(0)"
	    },
	    "6.5%": {
	        transform: "translateX(-6px) rotateY(-9deg)"
	    },
	    "18.5%": {
	        transform: "translateX(5px) rotateY(7deg)"
	    },
	    "31.5%": {
	        transform: "translateX(-3px) rotateY(-5deg)"
	    },
	    "43.5%": {
	        transform: "translateX(2px) rotateY(3deg)"
	    },
	    "50%": {
	        transform: "translateX(0) rotateY(0)"
	    }
	});
	//# sourceMappingURL=headShake.js.map

	Velocity("registerSequence", "jello", {
	    "duration": 1000,
	    "0%,100%": {
	        transformOrigin: "center"
	    },
	    "0%,11.1%,100%": {
	        transform: "skewX(0) skewY(0)"
	    },
	    "22.2%": {
	        transform: "skewX(-12.5deg) skewY(-12.5deg)"
	    },
	    "33.3%": {
	        transform: "skewX(6.25deg) skewY(6.25deg)"
	    },
	    "44.4%": {
	        transform: "skewX(-3.125deg) skewY(-3.125deg)"
	    },
	    "55.5%": {
	        transform: "skewX(1.5625deg) skewY(1.5625deg)"
	    },
	    "66.6%": {
	        transform: "skewX(-0.78125deg) skewY(-0.78125deg)"
	    },
	    "77.7%": {
	        transform: "skewX(0.390625deg) skewY(0.390625deg)"
	    },
	    "88.8%": {
	        transform: "skewX(-0.1953125deg) skewY(-0.1953125deg)"
	    }
	});
	//# sourceMappingURL=jello.js.map

	Velocity("registerSequence", "pulse", {
	    "duration": 1000,
	    "0%": {
	        transform: "scale3d(1,1,1)"
	    },
	    "50%": {
	        transform: "scale3d(1.05,1.05,1.05)"
	    },
	    "100%": {
	        transform: "scale3d(1,1,1)"
	    }
	});
	//# sourceMappingURL=pulse.js.map

	Velocity("registerSequence", "rubberBand", {
	    "duration": 1000,
	    "0%": {
	        transform: "scale3d(1,1,1)"
	    },
	    "30%": {
	        transform: "scale3d(1.25,0.75,1)"
	    },
	    "40%": {
	        transform: "scale3d(0.75,1.25,1)"
	    },
	    "50%": {
	        transform: "scale3d(1.15,0.85,1)"
	    },
	    "65%": {
	        transform: "scale3d(0.95,1.05,1)"
	    },
	    "75%": {
	        transform: "scale3d(1.05,0.95,1)"
	    },
	    "100%": {
	        transform: "scale3d(1,1,1)"
	    }
	});
	//# sourceMappingURL=rubberBand.js.map

	Velocity("registerSequence", "shake", {
	    "duration": 1000,
	    "0%,100%": {
	        transform: "translate3d(0,0,0)"
	    },
	    "10%,30%,50%,70%,90%": {
	        transform: "translate3d(-10px,0,0)"
	    },
	    "20%,40%,60%,80%": {
	        transform: "translate3d(10px,0,0)"
	    }
	});
	//# sourceMappingURL=shake.js.map

	Velocity("registerSequence", "swing", {
	    "duration": 1000,
	    "0%,100%": {
	        transform: "rotate3d(0,0,1,0deg)",
	        transformOrigin: "center"
	    },
	    "20%": {
	        transform: "rotate3d(0,0,1,15deg)"
	    },
	    "40%": {
	        transform: "rotate3d(0,0,1,-10deg)"
	    },
	    "60%": {
	        transform: "rotate3d(0,0,1,5deg)"
	    },
	    "80%": {
	        transform: "rotate3d(0,0,1,-5deg)"
	    }
	});

	Velocity("registerSequence", "tada", {
	    "duration": 1000,
	    "0%": {
	        transform: "scale3d(1,1,1) rotate3d(0,0,0,0)"
	    },
	    "10%,20%": {
	        transform: "scale3d(0.9,0.9,0.9) rotate3d(0,0,1,-3deg)"
	    },
	    "30%,50%,70%,90%": {
	        transform: "scale3d(1.1,1.1,1.1) rotate3d(0,0,1,3deg)"
	    },
	    "40%,60%,80%": {
	        transform: "scale3d(1.1,1.1,1.1) rotate3d(0,0,1,-3deg)"
	    },
	    "100%": {
	        transform: "scale3d(1, 1, 1) rotate3d(0,0,0,0)"
	    }
	});

	Velocity("registerSequence", "wobble", {
	    "duration": 1000,
	    "0%": {
	        transform: "translate3d(0,0,0) rotate3d(0,0,0,0)"
	    },
	    "15%": {
	        transform: "translate3d(-25%,0,0) rotate3d(0,0,1,-5deg)"
	    },
	    "30%": {
	        transform: "translate3d(20%,0,0) rotate3d(0,0,1,3deg)"
	    },
	    "45%": {
	        transform: "translate3d(-15%,0,0) rotate3d(0,0,1,-3deg)"
	    },
	    "60%": {
	        transform: "translate3d(10%,0,0) rotate3d(0,0,1,2deg)"
	    },
	    "75%": {
	        transform: "translate3d(-5%,0,0) rotate3d(0,0,1,-1deg)"
	    },
	    "100%": {
	        transform: "translate3d(0,0,0) rotate3d(0,0,0,0)"
	    }
	});
	//# sourceMappingURL=wobble.js.map

	//# sourceMappingURL=_all.js.map

	Velocity("registerSequence", "bounceIn", {
	    "duration": 750,
	    "easing": "easeOutCubic",
	    "0%": {
	        opacity: "0",
	        transform: "scale3d(0.3,0.3,0.3)"
	    },
	    "20%": {
	        transform: "scale3d(1.1,1.1,1.1)"
	    },
	    "40%": {
	        transform: "scale3d(0.9,0.9,0.9)"
	    },
	    "60%": {
	        opacity: "1",
	        transform: "scale3d(1.03,1.03,1.03)"
	    },
	    "80%": {
	        transform: "scale3d(0.97,0.97,0.97)"
	    },
	    "100%": {
	        opacity: "1",
	        transform: "scale3d(1,1,1)"
	    }
	});
	//# sourceMappingURL=bounceIn.js.map

	Velocity("registerSequence", "bounceInDown", {
	    "duration": 1000,
	    "0%": {
	        opacity: "0",
	        transform: "translate3d(0,-3000px,0)"
	    },
	    "60%": {
	        opacity: "1",
	        transform: ["translate3d(0,25px,0)", "easeOutCubic"]
	    },
	    "75%": {
	        transform: ["translate3d(0,-10px,0)", "easeOutCubic"]
	    },
	    "90%": {
	        transform: ["translate3d(0,5px,0)", "easeOutCubic"]
	    },
	    "100%": {
	        transform: ["translate3d(0,0,0)", "easeOutCubic"]
	    }
	});
	//# sourceMappingURL=bounceInDown.js.map

	Velocity("registerSequence", "bounceInLeft", {
	    "duration": 1000,
	    "0%": {
	        opacity: "0",
	        transform: "translate3d(-3000px,0,0)"
	    },
	    "60%": {
	        opacity: "1",
	        transform: ["translate3d(25px,0,0)", "easeOutCubic"]
	    },
	    "75%": {
	        transform: ["translate3d(-10px,0,0)", "easeOutCubic"]
	    },
	    "90%": {
	        transform: ["translate3d(5px,0,0)", "easeOutCubic"]
	    },
	    "100%": {
	        transform: ["translate3d(0,0,0)", "easeOutCubic"]
	    }
	});
	//# sourceMappingURL=bounceInLeft.js.map

	Velocity("registerSequence", "bounceInRight", {
	    "duration": 1000,
	    "0%": {
	        opacity: "0",
	        transform: "translate3d(3000px,0,0)"
	    },
	    "60%": {
	        opacity: "1",
	        transform: ["translate3d(-25px,0,0)", "easeOutCubic"]
	    },
	    "75%": {
	        transform: ["translate3d(10px,0,0)", "easeOutCubic"]
	    },
	    "90%": {
	        transform: ["translate3d(-5px,0,0)", "easeOutCubic"]
	    },
	    "100%": {
	        transform: ["translate3d(0,0,0)", "easeOutCubic"]
	    }
	});
	//# sourceMappingURL=bounceInRight.js.map

	Velocity("registerSequence", "bounceInUp", {
	    "duration": 1000,
	    "0%": {
	        opacity: "0",
	        transform: "translate3d(0,3000px,0)"
	    },
	    "60%": {
	        opacity: "1",
	        transform: ["translate3d(0,-25px,0)", "easeOutCubic"]
	    },
	    "75%": {
	        transform: ["translate3d(0,10px,0)", "easeOutCubic"]
	    },
	    "90%": {
	        transform: ["translate3d(0,-5px,0)", "easeOutCubic"]
	    },
	    "100%": {
	        transform: ["translate3d(0,0,0)", "easeOutCubic"]
	    }
	});
	//# sourceMappingURL=bounceInUp.js.map

	//# sourceMappingURL=_all.js.map

	Velocity("registerSequence", "bounceOut", {
	    "duration": 750,
	    "0%": {
	        opacity: "1",
	        transform: "scale3d(1,1,1)"
	    },
	    "20%": {
	        transform: "scale3d(0.9,0.9,0.9)"
	    },
	    "50%,55%": {
	        opacity: "1",
	        transform: "scale3d(1.1,1.1,1.1)"
	    },
	    "to": {
	        opacity: "0",
	        transform: "scale3d(0.3,0.3,0.3)"
	    }
	});
	//# sourceMappingURL=bounceOut.js.map

	Velocity("registerSequence", "bounceOutDown", {
	    "duration": 1000,
	    "0%": {
	        opacity: "1",
	        transform: "translate3d(0,0,0)"
	    },
	    "20%": {
	        transform: "translate3d(0,10px,0)"
	    },
	    "40%,45%": {
	        opacity: "1",
	        transform: "translate3d(0,-20px,0)"
	    },
	    "100%": {
	        opacity: "0",
	        transform: "translate3d(0,2000px,0)"
	    }
	});
	//# sourceMappingURL=bounceOutDown.js.map

	Velocity("registerSequence", "bounceOutLeft", {
	    "duration": 1000,
	    "0%": {
	        opacity: "1",
	        transform: "translate3d(0,0,0)"
	    },
	    "20%": {
	        opacity: "1",
	        transform: "translate3d(20px,0,0)"
	    },
	    "100%": {
	        opacity: "0",
	        transform: "translate3d(-2000px,0,0)"
	    }
	});
	//# sourceMappingURL=bounceOutLeft.js.map

	Velocity("registerSequence", "bounceOutRight", {
	    "duration": 1000,
	    "0%": {
	        opacity: "1",
	        transform: "translate3d(0,0,0)"
	    },
	    "20%": {
	        opacity: "1",
	        transform: "translate3d(-20px,0,0)"
	    },
	    "100%": {
	        opacity: "0",
	        transform: "translate3d(2000px,0,0)"
	    }
	});
	//# sourceMappingURL=bounceOutRight.js.map

	Velocity("registerSequence", "bounceOutUp", {
	    "duration": 1000,
	    "0%": {
	        opacity: "1",
	        transform: "translate3d(0,0,0)"
	    },
	    "20%": {
	        transform: "translate3d(0,-10px,0)"
	    },
	    "40%,45%": {
	        opacity: "1",
	        transform: "translate3d(0,20px,0)"
	    },
	    "100%": {
	        opacity: "0",
	        transform: "translate3d(0,-2000px,0)"
	    }
	});
	//# sourceMappingURL=bounceOutUp.js.map

	//# sourceMappingURL=_all.js.map

	Velocity("registerSequence", "fadeIn", {
	    "duration": 1000,
	    "0%": {
	        opacity: "0"
	    },
	    "100%": {
	        opacity: "1"
	    }
	});
	//# sourceMappingURL=fadeIn.js.map

	Velocity("registerSequence", "fadeInDown", {
	    "duration": 1000,
	    "0%": {
	        opacity: "0",
	        transform: "translate3d(0,-100%,0)"
	    },
	    "100%": {
	        opacity: "1",
	        transform: "translate3d(0,0,0)"
	    }
	});
	//# sourceMappingURL=fadeInDown.js.map

	Velocity("registerSequence", "fadeInDownBig", {
	    "duration": 1000,
	    "0%": {
	        opacity: "0",
	        transform: "translate3d(0,-2000px,0)"
	    },
	    "100%": {
	        opacity: "1",
	        transform: "translate3d(0,0,0)"
	    }
	});
	//# sourceMappingURL=fadeInDownBig.js.map

	Velocity("registerSequence", "fadeInLeft", {
	    "duration": 1000,
	    "0%": {
	        opacity: "0",
	        transform: "translate3d(-100%,0,0)"
	    },
	    "100%": {
	        opacity: "1",
	        transform: "translate3d(0,0,0)"
	    }
	});
	//# sourceMappingURL=fadeInLeft.js.map

	Velocity("registerSequence", "fadeInLeftBig", {
	    "duration": 1000,
	    "0%": {
	        opacity: "0",
	        transform: "translate3d(-2000px,0,0)"
	    },
	    "100%": {
	        opacity: "1",
	        transform: "translate3d(0,0,0)"
	    }
	});
	//# sourceMappingURL=fadeInLeftBig.js.map

	Velocity("registerSequence", "fadeInRight", {
	    "duration": 1000,
	    "0%": {
	        opacity: "0",
	        transform: "translate3d(100%,0,0)"
	    },
	    "100%": {
	        opacity: "1",
	        transform: "translate3d(0,0,0)"
	    }
	});
	//# sourceMappingURL=fadeInRight.js.map

	Velocity("registerSequence", "fadeInRightBig", {
	    "duration": 1000,
	    "0%": {
	        opacity: "0",
	        transform: "translate3d(2000px,0,0)"
	    },
	    "100%": {
	        opacity: "1",
	        transform: "translate3d(0,0,0)"
	    }
	});
	//# sourceMappingURL=fadeInRightBig.js.map

	Velocity("registerSequence", "fadeInUp", {
	    "duration": 1000,
	    "0%": {
	        opacity: "0",
	        transform: "translate3d(0,100%,0)"
	    },
	    "100%": {
	        opacity: "1",
	        transform: "translate3d(0,0,0)"
	    }
	});
	//# sourceMappingURL=fadeInUp.js.map

	Velocity("registerSequence", "fadeInUpBig", {
	    "duration": 1000,
	    "0%": {
	        opacity: "0",
	        transform: "translate3d(0,2000px,0)"
	    },
	    "100%": {
	        opacity: "1",
	        transform: "translate3d(0,0,0)"
	    }
	});
	//# sourceMappingURL=fadeInUpBig.js.map

	//# sourceMappingURL=_all.js.map

	Velocity("registerSequence", "fadeOut", {
	    "duration": 1000,
	    "0%": {
	        opacity: "1"
	    },
	    "100%": {
	        opacity: "0"
	    }
	});
	//# sourceMappingURL=fadeOut.js.map

	Velocity("registerSequence", "fadeOutDown", {
	    "duration": 1000,
	    "0%": {
	        opacity: "1",
	        transform: "translate3d(0,0,0)"
	    },
	    "100%": {
	        opacity: "0",
	        transform: "translate3d(0,100%,0)"
	    }
	});
	//# sourceMappingURL=fadeOutDown.js.map

	Velocity("registerSequence", "fadeOutDownBig", {
	    "duration": 1000,
	    "0%": {
	        opacity: "1",
	        transform: "translate3d(0,0,0)"
	    },
	    "100%": {
	        opacity: "0",
	        transform: "translate3d(0,2000px,0)"
	    }
	});
	//# sourceMappingURL=fadeOutDownBig.js.map

	Velocity("registerSequence", "fadeOutLeft", {
	    "duration": 1000,
	    "0%": {
	        opacity: "1",
	        transform: "translate3d(0,0,0)"
	    },
	    "100%": {
	        opacity: "0",
	        transform: "translate3d(-100%,0,0)"
	    }
	});
	//# sourceMappingURL=fadeOutLeft.js.map

	Velocity("registerSequence", "fadeOutLeftBig", {
	    "duration": 1000,
	    "0%": {
	        opacity: "1",
	        transform: "translate3d(0,0,0)"
	    },
	    "100%": {
	        opacity: "0",
	        transform: "translate3d(-2000px,0,0)"
	    }
	});
	//# sourceMappingURL=fadeOutLeftBig.js.map

	Velocity("registerSequence", "fadeOutRight", {
	    "duration": 1000,
	    "0%": {
	        opacity: "1",
	        transform: "translate3d(0,0,0)"
	    },
	    "100%": {
	        opacity: "0",
	        transform: "translate3d(100%,0,0)"
	    }
	});
	//# sourceMappingURL=fadeOutRight.js.map

	Velocity("registerSequence", "fadeOutRightBig", {
	    "duration": 1000,
	    "0%": {
	        opacity: "1",
	        transform: "translate3d(0,0,0)"
	    },
	    "100%": {
	        opacity: "0",
	        transform: "translate3d(2000px,0,0)"
	    }
	});
	//# sourceMappingURL=fadeOutRightBig.js.map

	Velocity("registerSequence", "fadeOutUp", {
	    "duration": 1000,
	    "0%": {
	        opacity: "1",
	        transform: "translate3d(0,0,0)"
	    },
	    "100%": {
	        opacity: "0",
	        transform: "translate3d(0,-100%,0)"
	    }
	});
	//# sourceMappingURL=fadeOutUp.js.map

	Velocity("registerSequence", "fadeOutUpBig", {
	    "duration": 1000,
	    "0%": {
	        opacity: "1",
	        transform: "translate3d(0,0,0)"
	    },
	    "100%": {
	        opacity: "0",
	        transform: "translate3d(0,-2000px,0)"
	    }
	});
	//# sourceMappingURL=fadeOutUpBig.js.map

	//# sourceMappingURL=_all.js.map

	Velocity("registerSequence", "flip", {
	    "duration": 1000,
	    "0%,100%": {
	        backfaceVisibility: "visible"
	    },
	    "0%": {
	        transform: ["perspective(400px) translate3d(0,0,0) rotate3d(0,1,0,-360deg) scale3d(1,1,1)", "easeOut"]
	    },
	    "40%": {
	        transform: ["perspective(400px) translate3d(0,0,150px) rotate3d(0,1,0,-190deg) scale3d(1,1,1)", "easeOut"]
	    },
	    "50%": {
	        transform: ["perspective(400px) translate3d(0,0,150px) rotate3d(0,1,0,-170deg) scale3d(1,1,1)", "easeIn"]
	    },
	    "80%": {
	        transform: ["perspective(400px) translate3d(0,0,0) rotate3d(0,1,0,0) scale3d(0.95,0.95,0.95)", "easeIn"]
	    },
	    "100%": {
	        transform: ["perspective(400px) translate3d(0,0,0) rotate3d(0,0,0,0) scale3d(1,1,1)", "ease-in"]
	    }
	});
	//# sourceMappingURL=flip.js.map

	Velocity("registerSequence", "flipInX", {
	    "duration": 1000,
	    "0%,100%": {
	        backfaceVisibility: "visible"
	    },
	    "0%": {
	        opacity: "0",
	        transform: "perspective(400px) rotate3d(1,0,0,90deg)"
	    },
	    "40%": {
	        transform: ["perspective(400px) rotate3d(1,0,0,-20deg)", "easeIn"]
	    },
	    "60%": {
	        opacity: "1",
	        transform: "perspective(400px) rotate3d(1,0,0,10deg)"
	    },
	    "80%": {
	        transform: "perspective(400px) rotate3d(1,0,0,-5deg)"
	    },
	    "100%": {
	        transform: "perspective(400px) rotate3d(1,0,0,0)"
	    }
	});
	//# sourceMappingURL=flipInX.js.map

	Velocity("registerSequence", "flipInY", {
	    "duration": 1000,
	    "0%,100%": {
	        backfaceVisibility: "visible"
	    },
	    "0%": {
	        opacity: "0",
	        transform: "perspective(400px) rotate3d(0,1,0,90deg)"
	    },
	    "40%": {
	        transform: ["perspective(400px) rotate3d(0,1,0,-20deg)", "easeIn"]
	    },
	    "60%": {
	        opacity: "1",
	        transform: "perspective(400px) rotate3d(0,1,0,10deg)"
	    },
	    "80%": {
	        transform: "perspective(400px) rotate3d(0,1,0,-5deg)"
	    },
	    "100%": {
	        transform: "perspective(400px) rotate3d(0,1,0,0)"
	    }
	});
	//# sourceMappingURL=flipInY.js.map

	Velocity("registerSequence", "flipOutX", {
	    "duration": 750,
	    "0%,100%": {
	        backfaceVisibility: "visible"
	    },
	    "0%": {
	        transform: "perspective(400px) rotate3d(1,0,0,0)"
	    },
	    "30%": {
	        opacity: "1",
	        transform: "perspective(400px) rotate3d(1,0,0,-20deg)"
	    },
	    "100%": {
	        opacity: "0",
	        transform: "perspective(400px) rotate3d(1,0,0,90deg)"
	    }
	});
	//# sourceMappingURL=flipOutX.js.map

	Velocity("registerSequence", "flipOutY", {
	    "duration": 750,
	    "0%,100%": {
	        backfaceVisibility: "visible"
	    },
	    "0%": {
	        transform: "perspective(400px) rotate3d(0,1,0,0)"
	    },
	    "30%": {
	        opacity: "1",
	        transform: "perspective(400px) rotate3d(0,1,0,-20deg)"
	    },
	    "100%": {
	        opacity: "0",
	        transform: "perspective(400px) rotate3d(0,1,0,90deg)"
	    }
	});
	//# sourceMappingURL=flipOutY.js.map

	//# sourceMappingURL=_all.js.map

	Velocity("registerSequence", "lightSpeedIn", {
	    "duration": 1000,
	    "easing": "easeOut",
	    "0%": {
	        opacity: "0",
	        transform: "translate3d(100%,0,0) skewX(-30deg)"
	    },
	    "60%": {
	        opacity: "1",
	        transform: "translate3d(40%,0,0) skewX(20deg)"
	    },
	    "80%": {
	        opacity: "1",
	        transform: "translate3d(20%,0,0) skewX(-5deg)"
	    },
	    "100%": {
	        opacity: "1",
	        transform: "translate3d(0,0,0) skew(0)"
	    }
	});
	//# sourceMappingURL=lightSpeedIn.js.map

	Velocity("registerSequence", "lightSpeedOut", {
	    "duration": 1000,
	    "easing": "easeIn",
	    "0%": {
	        opacity: "1",
	        transform: "translate3d(0,0,0) skewX(0)"
	    },
	    "100%": {
	        opacity: "0",
	        transform: "translate3d(100%,0,0) skewX(30deg)"
	    }
	});
	//# sourceMappingURL=lightSpeedOut.js.map

	//# sourceMappingURL=_all.js.map

	Velocity("registerSequence", "rotateIn", {
	    "duration": 1000,
	    "0%": {
	        opacity: "0",
	        transform: "rotate3d(0,0,1,-200deg)",
	        transformOrigin: "center"
	    },
	    "100%": {
	        opacity: "1",
	        transform: "translate3d(0,0,0)",
	        transformOrigin: "center"
	    }
	});
	//# sourceMappingURL=rotateIn.js.map

	Velocity("registerSequence", "rotateInDownLeft", {
	    "duration": 1000,
	    "0%": {
	        opacity: "0",
	        transform: "rotate3d(0,0,1,-45deg)",
	        transformOrigin: "left bottom"
	    },
	    "100%": {
	        opacity: "1",
	        transform: "translate3d(0,0,0)",
	        transformOrigin: "left bottom"
	    }
	});
	//# sourceMappingURL=rotateInDownLeft.js.map

	Velocity("registerSequence", "rotateInDownRight", {
	    "duration": 1000,
	    "0%": {
	        opacity: "0",
	        transform: "rotate3d(0,0,1,45deg)",
	        transformOrigin: "right bottom"
	    },
	    "100%": {
	        opacity: "1",
	        transform: "translate3d(0,0,0)",
	        transformOrigin: "right bottom"
	    }
	});
	//# sourceMappingURL=rotateInDownRight.js.map

	Velocity("registerSequence", "rotateInUpLeft", {
	    "duration": 1000,
	    "0%": {
	        opacity: "0",
	        transform: "rotate3d(0,0,1,45deg)",
	        transformOrigin: "left bottom"
	    },
	    "100%": {
	        opacity: "1",
	        transform: "translate3d(0,0,0)",
	        transformOrigin: "left bottom"
	    }
	});
	//# sourceMappingURL=rotateInUpLeft.js.map

	Velocity("registerSequence", "rotateInUpRight", {
	    "duration": 1000,
	    "0%": {
	        opacity: "0",
	        transform: "rotate3d(0,0,1,-90deg)",
	        transformOrigin: "right bottom"
	    },
	    "100%": {
	        opacity: "1",
	        transform: "translate3d(0,0,0)",
	        transformOrigin: "right bottom"
	    }
	});
	//# sourceMappingURL=rotateInUpRight.js.map

	//# sourceMappingURL=_all.js.map

	Velocity("registerSequence", "rotateOut", {
	    "duration": 1000,
	    "0%": {
	        opacity: "1",
	        transform: "translate3d(0,0,0)",
	        transformOrigin: "center"
	    },
	    "100%": {
	        opacity: "0",
	        transform: "rotate3d(0,0,1,200deg)",
	        transformOrigin: "center"
	    }
	});
	//# sourceMappingURL=rotateOut.js.map

	Velocity("registerSequence", "rotateOutDownLeft", {
	    "duration": 1000,
	    "0%": {
	        opacity: "1",
	        transform: "translate3d(0,0,0)",
	        transformOrigin: "left bottom"
	    },
	    "100%": {
	        opacity: "0",
	        transform: "rotate3d(0,0,1,45deg)",
	        transformOrigin: "left bottom"
	    }
	});
	//# sourceMappingURL=rotateOutDownLeft.js.map

	Velocity("registerSequence", "rotateOutDownRight", {
	    "duration": 1000,
	    "0%": {
	        opacity: "1",
	        transform: "translate3d(0,0,0)",
	        transformOrigin: "right bottom"
	    },
	    "100%": {
	        opacity: "0",
	        transform: "rotate3d(0,0,1,-45deg)",
	        transformOrigin: "right bottom"
	    }
	});
	//# sourceMappingURL=rotateOutDownRight.js.map

	Velocity("registerSequence", "rotateOutUpLeft", {
	    "duration": 1000,
	    "0%": {
	        opacity: "1",
	        transform: "translate3d(0,0,0)",
	        transformOrigin: "left bottom"
	    },
	    "100%": {
	        opacity: "0",
	        transform: "rotate3d(0,0,1,-45deg)",
	        transformOrigin: "left bottom"
	    }
	});
	//# sourceMappingURL=rotateOutUpLeft.js.map

	Velocity("registerSequence", "rotateOutUpRight", {
	    "duration": 1000,
	    "0%": {
	        opacity: "1",
	        transform: "translate3d(0,0,0)",
	        transformOrigin: "right bottom"
	    },
	    "100%": {
	        opacity: "0",
	        transform: "rotate3d(0,0,1,90deg)",
	        transformOrigin: "right bottom"
	    }
	});
	//# sourceMappingURL=rotateOutUpRight.js.map

	//# sourceMappingURL=_all.js.map

	Velocity("registerSequence", "slideInDown", {
	    "duration": 1000,
	    "0%": {
	        transform: "translate3d(0,-100%,0)",
	        visibility: "hidden",
	        opacity: "0"
	    },
	    "100%": {
	        transform: "translate3d(0,0,0)",
	        visibility: "visible",
	        opacity: "1"
	    }
	});
	//# sourceMappingURL=slideInDown.js.map

	Velocity("registerSequence", "slideInLeft", {
	    "duration": 1000,
	    "0%": {
	        transform: "translate3d(-100%,0,0)",
	        visibility: "hidden",
	        opacity: "0"
	    },
	    "100%": {
	        transform: "translate3d(0,0,0)",
	        visibility: "visible",
	        opacity: "1"
	    }
	});
	//# sourceMappingURL=slideInLeft.js.map

	Velocity("registerSequence", "slideInRight", {
	    "duration": 1000,
	    "0%": {
	        transform: "translate3d(100%,0,0)",
	        visibility: "hidden",
	        opacity: "0"
	    },
	    "100%": {
	        transform: "translate3d(0,0,0)",
	        visibility: "visible",
	        opacity: "1"
	    }
	});
	//# sourceMappingURL=slideInRight.js.map

	Velocity("registerSequence", "slideInUp", {
	    "duration": 1000,
	    "0%": {
	        transform: "translate3d(0,100%,0)",
	        visibility: "hidden",
	        opacity: "0"
	    },
	    "100%": {
	        transform: "translate3d(0,0,0)",
	        visibility: "visible",
	        opacity: "1"
	    }
	});
	//# sourceMappingURL=slideInUp.js.map

	//# sourceMappingURL=_all.js.map

	Velocity("registerSequence", "slideOutDown", {
	    "duration": 1000,
	    "0%": {
	        transform: "translate3d(0,0,0)",
	        visibility: "visible",
	        opacity: "1"
	    },
	    "100%": {
	        transform: "translate3d(0,-100%,0)",
	        visibility: "hidden",
	        opacity: "0"
	    }
	});
	//# sourceMappingURL=slideOutDown.js.map

	Velocity("registerSequence", "slideOutLeft", {
	    "duration": 1000,
	    "0%": {
	        transform: "translate3d(0,0,0)",
	        visibility: "visible",
	        opacity: "1"
	    },
	    "100%": {
	        transform: "translate3d(-100%,0,0)",
	        visibility: "hidden",
	        opacity: "0"
	    }
	});
	//# sourceMappingURL=slideOutLeft.js.map

	Velocity("registerSequence", "slideOutRight", {
	    "duration": 1000,
	    "0%": {
	        transform: "translate3d(0,0,0)",
	        visibility: "visible",
	        opacity: "1"
	    },
	    "100%": {
	        transform: "translate3d(100%,0,0)",
	        visibility: "hidden",
	        opacity: "0"
	    }
	});
	//# sourceMappingURL=slideOutRight.js.map

	Velocity("registerSequence", "slideOutUp", {
	    "duration": 1000,
	    "0%": {
	        transform: "translate3d(0,0,0)",
	        visibility: "visible",
	        opacity: "1"
	    },
	    "100%": {
	        transform: "translate3d(0,100%,0)",
	        visibility: "hidden",
	        opacity: "0"
	    }
	});
	//# sourceMappingURL=slideOutUp.js.map

	//# sourceMappingURL=_all.js.map

	Velocity("registerSequence", "hinge", {
	    "duration": 2000,
	    "0%": {
	        opacity: "1",
	        transform: "translate3d(0,0,0) rotate3d(0,0,1,0)",
	        transformOrigin: "top left"
	    },
	    "20%,60%": {
	        transform: ["translate3d(0,0,0) rotate3d(0,0,1,80deg)", "easeInOut"]
	    },
	    "40%,80%": {
	        opacity: "1",
	        transform: ["translate3d(0,0,0) rotate3d(0,0,1,60deg)", "easeInOut"]
	    },
	    "100%": {
	        opacity: "0",
	        transform: ["translate3d(0,700px,0) rotate3d(0,0,1,80deg)", "easeInOut"]
	    }
	});
	//# sourceMappingURL=hinge.js.map

	Velocity("registerSequence", "jackInTheBox", {
	    "duration": 1000,
	    "0%": {
	        opacity: "0",
	        transform: "scale(0.1) rotate(30deg)",
	        transformOrigin: "center bottom"
	    },
	    "50%": {
	        transform: "scale(0.5) rotate(-10deg)"
	    },
	    "70%": {
	        transform: "scale(0.7) rotate(3deg)"
	    },
	    "100%": {
	        opacity: "1",
	        transform: "scale(1) rotate(0)"
	    }
	});
	//# sourceMappingURL=jackInTheBox.js.map

	Velocity("registerSequence", "rollIn", {
	    "duration": 1000,
	    "0%": {
	        opacity: "0",
	        transform: "translate3d(-100%,0,0) rotate3d(0,0,1,-120deg)"
	    },
	    "100%": {
	        opacity: "1",
	        transform: "translate3d(0,0,0) rotate3d(0,0,1,0)"
	    }
	});
	//# sourceMappingURL=rollIn.js.map

	Velocity("registerSequence", "rollOut", {
	    "duration": 1000,
	    "0%": {
	        opacity: "1",
	        transform: "translate3d(0,0,0) rotate3d(0,0,1,0)"
	    },
	    "100%": {
	        opacity: "0",
	        transform: "translate3d(100%,0,0) rotate3d(0,0,1,120deg)"
	    }
	});
	//# sourceMappingURL=rollOut.js.map

	//# sourceMappingURL=_all.js.map

	Velocity("registerSequence", "zoomIn", {
	    "duration": 1000,
	    "0%": {
	        opacity: "0",
	        transform: "scale3d(0.3,0.3,0.3)"
	    },
	    "50%": {
	        opacity: "1"
	    },
	    "100%": {
	        transform: "scale3d(1,1,1)"
	    }
	});
	//# sourceMappingURL=zoomIn.js.map

	Velocity("registerSequence", "zoomInDown", {
	    "duration": 1000,
	    "0%": {
	        opacity: "0",
	        transform: "scale3d(0.1,0.1,0.1) translate3d(0,-1000px,0)"
	    },
	    "60%": {
	        opacity: "1",
	        transform: ["scale3d(0.475,0.475,0.475) translate3d(0,60px,0)", "easeInCubic"]
	    },
	    "100%": {
	        transform: ["scale3d(1,1,1) translate3d(0,0,0)", [0.175, 0.885, 0.32, 1]]
	    }
	});
	//# sourceMappingURL=zoomInDown.js.map

	Velocity("registerSequence", "zoomInLeft", {
	    "duration": 1000,
	    "0%": {
	        opacity: "0",
	        transform: "scale3d(0.1,0.1,0.1) translate3d(-1000px,0,0)"
	    },
	    "60%": {
	        opacity: "1",
	        transform: ["scale3d(0.475,0.475,0.475) translate3d(10px,0,0)", "easeInCubic"]
	    },
	    "100%": {
	        transform: ["scale3d(1,1,1) translate3d(0,0,0)", [0.175, 0.885, 0.32, 1]]
	    }
	});
	//# sourceMappingURL=zoomInLeft.js.map

	Velocity("registerSequence", "zoomInRight", {
	    "duration": 1000,
	    "0%": {
	        opacity: "0",
	        transform: "scale3d(0.1,0.1,0.1) translate3d(1000px,0,0)"
	    },
	    "60%": {
	        opacity: "1",
	        transform: ["scale3d(0.475,0.475,0.475) translate3d(-10px,0,0)", "easeInCubic"]
	    },
	    "100%": {
	        transform: ["scale3d(1,1,1) translate3d(0,0,0)", [0.175, 0.885, 0.32, 1]]
	    }
	});
	//# sourceMappingURL=zoomInRight.js.map

	Velocity("registerSequence", "zoomInUp", {
	    "duration": 1000,
	    "0%": {
	        opacity: "0",
	        transform: "scale3d(0.1,0.1,0.1) translate3d(0,1000px,0)"
	    },
	    "60%": {
	        opacity: "1",
	        transform: ["scale3d(0.475,0.475,0.475) translate3d(0,-60px,0)", "easeInCubic"]
	    },
	    "100%": {
	        transform: ["scale3d(1,1,1) translate3d(0,0,0)", [0.175, 0.885, 0.32, 1]]
	    }
	});
	//# sourceMappingURL=zoomInUp.js.map

	//# sourceMappingURL=_all.js.map

	Velocity("registerSequence", "zoomOut", {
	    "duration": 1000,
	    "0%": {
	        transform: "scale3d(1,1,1)"
	    },
	    "50%": {
	        opacity: "1"
	    },
	    "100%": {
	        opacity: "0",
	        transform: "scale3d(0.3,0.3,0.3)"
	    }
	});
	//# sourceMappingURL=zoomOut.js.map

	Velocity("registerSequence", "zoomOutDown", {
	    "duration": 1000,
	    "0%": {
	        transform: "scale3d(1,1,1) translate3d(0,0,0)"
	    },
	    "40%": {
	        opacity: "1",
	        transform: ["scale3d(0.475,0.475,0.475) translate3d(0,60px,0)", [0.55, 0.055, 0.675, 0.19]]
	    },
	    "100%": {
	        opacity: "0",
	        transform: ["scale3d(0.1,0.1,0.1) translate3d(0,-1000px,0)", [0.175, 0.885, 0.32, 1]]
	    }
	});
	//# sourceMappingURL=zoomOutDown.js.map

	Velocity("registerSequence", "zoomOutLeft", {
	    "duration": 1000,
	    "0%": {
	        opacity: "1",
	        transform: "scale(1) translate3d(0,0,0)",
	        transformOrigin: "left center"
	    },
	    "40%": {
	        opacity: "1",
	        transform: "scale(0.475) translate3d(42px,0,0)"
	    },
	    "100%": {
	        opacity: "0",
	        transform: "scale(0.1) translate3d(-2000px,0,0)",
	        transformOrigin: "left center"
	    }
	});
	//# sourceMappingURL=zoomOutLeft.js.map

	Velocity("registerSequence", "zoomOutRight", {
	    "duration": 1000,
	    "0%": {
	        opacity: "1",
	        transform: "scale(1) translate3d(0,0,0)",
	        transformOrigin: "right center"
	    },
	    "40%": {
	        opacity: "1",
	        transform: "scale(0.475) translate3d(-42px, 0, 0)"
	    },
	    "100%": {
	        opacity: "0",
	        transform: "scale(0.1) translate3d(2000px, 0, 0)",
	        transformOrigin: "right center"
	    }
	});
	//# sourceMappingURL=zoomOutRight.js.map

	Velocity("registerSequence", "zoomOutUp", {
	    "duration": 1000,
	    "0%": {
	        transform: "scale3d(1,1,1) translate3d(0,0,0)"
	    },
	    "40%": {
	        opacity: "1",
	        transform: ["scale3d(0.475,0.475,0.475) translate3d(0,-60px,0)", [0.55, 0.055, 0.675, 0.19]]
	    },
	    "100%": {
	        opacity: "0",
	        transform: ["scale3d(0.1,0.1,0.1) translate3d(0,1000px,0)", [0.175, 0.885, 0.32, 1]]
	    }
	});
	//# sourceMappingURL=zoomOutUp.js.map

	//# sourceMappingURL=_all.js.map

	//# sourceMappingURL=velocity.ui.js.map

})));
//# sourceMappingURL=velocity.ui.js.map
