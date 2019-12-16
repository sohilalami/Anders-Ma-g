var tl1 = gsap.timeline();

tl1.from('#_a_', {
        duration: .1,
        opacity: 0,
        x: 0
    })
    .to('#_a_', {
        x: -450
    });
tl1.from('#_n_', {
        duration: .2,
        opacity: 0,
        x: 0
    })
    .to('#_n_', {
        x: -450
    });
tl1.from('#_d_', {
        duration: .2,
        opacity: 0,
        x: 0
    })
    .to('#_d_', {
        x: -450
    });
tl1.from('#_e_', {
        duration: .2,
        opacity: 0,
        x: 0
    })
    .to('#_e_', {
        x: -450
    });
tl1.from('#_r_', {
        duration: .2,
        opacity: 0,
        x: 0
    })
    .to('#_r_', {
        x: -450
    });
tl1.from('#_s_', {
        duration: .2,
        opacity: 0,
        x: 0
    })
    .to('#_s_', {
        x: -450
    });

// tl1.from('#Layer_1', {opacity: 0});
tl1.from('#_maRechthoek_', {
    duration: 0,
    opacity: 0
});
tl1.from('#_m', {
    duration: 0,
    opacity: 0
}, "-=1");
tl1.from('#_aMa_', {
    duration: 0,
    opacity: 0
}, "-=1");
tl1.from('#_g_', {
    duration: 0,
    opacity: 0
}, "-=1");

tl1.to('#_a_', {
    duration: .0,

})
tl1.to('#_n_', {
    duration: .0,

}, "-=.1")
tl1.to('#_d_', {
    duration: .0,

}, "-=.1")
tl1.to('#_e_', {
    duration: .0,

}, "-=.1")
tl1.to('#_r_', {
    duration: .0,

}, "-=.1")
tl1.to('#_s_', {
    duration: .0,

}, "-=.1")
// https://greensock.com/forums/topic/14743-multi-colored-lines-in-svg/
TweenLite.defaultEase = Linear.easeNone;

var root = document.querySelector("svg");
var path = document.querySelector(".cls-6");

var total = 200;
var space = 2;
var length = path.getTotalLength();
var offset = length / total;

var colors = [

];

var gradient = [];

for (var i = 0; i < total; i++) {
    var amt = i / (total - 1);
    var rgb = lerpColors(colors, amt).map(color => Math.round(color));
    gradient.push(`rgb(${rgb})`);
}

TweenLite.set(path, {
    strokeDasharray: `${offset + space},${length - offset - space}`
});

var tl = gradient.reduce((tl, stroke, i) => {

    var clone = path.cloneNode(true);
    root.appendChild(clone);
    TweenLite.set(clone, {
        stroke,
        strokeDashoffset: -i * offset
    });
    return tl.to(clone, 2, {
        strokeDashoffset: `-=${length}`
    }, 0);
}, new TimelineMax({
    repeat: -1
}));

function lerp(start, end, amt) {
    return start + (end - start) * amt;
}

function lerpColor(start, end, amt) {
    var rgb = [];
    for (var i = 0; i < start.length; i++) {
        rgb[i] = lerp(start[i], end[i], amt);
    }
    return rgb;
}

function lerpColors(colors, amt) {
    if (amt >= 1) return colors[colors.length - 1];
    amt *= (colors.length - 1);
    var i = amt >> 0;
    return lerpColor(colors[i], colors[i + 1], amt - i);
}
