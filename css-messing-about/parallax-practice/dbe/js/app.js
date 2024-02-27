let controller = new ScrollMagic.Controller();
let timeline = new TimelineMax();

timeline
.to('.rock', 3, {y: -300})
.to('.girl', 3, {y: -200}, '-=3')
.to('.content', 3, {top: '0%'}, '-=3')
.to('bg1', 3, {height: '100svh'})

let scene = new ScrollMagic.Scene({
    triggerElement: 'section',
    duration: '150%',
    triggerHook: 0,
})
    .setTween(timeline)
    // hook up the animation to the scene.
    .setPin('section')
    // pin the section in place to allow the other div to come on top of it.
    .addTo(controller)
