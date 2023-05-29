
// window.Velocity.debug = 7
const names = [
  'bounce',
  'flash',
  'headShake',
  'jello',
  'pulse',
  'rubberBand',
  'shake',
  'swing',
  'tada',
  'wobble',
  'hinge',
  'jackInTheBox',
  'rollIn',
  'rollOut',
  'flipInY',
  'flipInX',
  'flipOutY',
  'flipOutX',
  'lightSpeedIn',
  'lightSpeedOut',
  'fadeIn',
  'fadeInDown',
  'fadeInDownBig',
  'fadeInLeft',
  'fadeInLeftBig',
  'fadeInRight',
  'fadeInRightBig',
  'fadeInUp',
  'fadeInUpBig',
  'fadeOut',
  'fadeOutDown',
  'fadeOutDownBig',
  'fadeOutLeft',
  'fadeOutLeftBig',
  'fadeOutRight',
  'fadeOutRightBig',
  'fadeOutUp',
  'fadeOutUpBig',
  'slideInDown',
  'slideInLeft',
  'slideInRight',
  'slideInUp',
  'slideOutDown',
  'slideOutLeft',
  'slideOutRight',
  'slideOutUp',
  'zoomIn',
  'zoomInDown',
  'zoomInLeft',
  'zoomInRight',
  'zoomInUp',
  'zoomOut',
  'zoomOutDown',
  'zoomOutLeft',
  'zoomOutRight',
  'zoomOutUp',
  'bounceIn',
  'bounceInDown',
  'bounceInLeft',
  'bounceInRight',
  'bounceInUp',
  'bounceOut',
  'bounceOutDown',
  'bounceOutLeft',
  'bounceOutRight',
  'bounceOutUp',
  'rotateIn',
  'rotateInDownLeft',
  'rotateInDownRight',
  'rotateInUpLeft',
  'rotateInUpRight',
  'rotateOut',
  'rotateOutDownLeft',
  'rotateOutDownRight',
  'rotateOutUpLeft',
  'rotateOutUpRight'
]



var buttons = names.map(name => ({
  name
}))

const content = buttons.map(button => `<button data-name="${button.name}">${button.name}</button>`).join('')
console.log($('#row .left'))
$('#row .left').html(content)


$('button').click(evt => {
  const name = evt.target.dataset.name
  console.log(name, 23333)
  run(name)
})

function run(name) {
  $('#app').velocity(name)
}
