//var BASE_URLINS = "https://rivyo.com/tfeedApi/";
var BASE_URLINS = "https://ifa.cirkleinc.com/";

var product_handle = "";
if (window.location.href.indexOf('products') > -1)
{
    product_handle = window.location.pathname.split('/').pop();
}
var pageno = 1;
window.loadScript = function (url, callback)
{
    var script = document.createElement("script");
    script.type = "text/javascript";
    // If the browser is Internet Explorer
    if (script.readyState)
    {
        script.onreadystatechange = function ()
        {
            if (script.readyState == "loaded" || script.readyState == "complete")
            {
                script.onreadystatechange = null;
                callback();
            }
        };
        // For any other browser
    } else
    {
        script.onload = function ()
        {
            callback();
        };
    }
    script.src = url;
    document.getElementsByTagName("head")[0].appendChild(script);
};

if ((typeof (jQuery) == 'undefined') || (parseInt(jQuery.fn.jquery) == 3 && parseFloat(jQuery.fn.jquery.replace(/^1\./, "")) < 2.1))
{
    loadScript('//ajax.googleapis.com/ajax/libs/jquery/2.2.4/jquery.min.js', function ()
    {
        jQuery321 = jQuery.noConflict(true);
        myJQueryCode(jQuery321);
        jqLoaded();
    });
} else {
    myJQueryCode(jQuery);
    jqLoaded();
}

function jqLoaded() {
//    if (Shopify.OptionSelectors == undefined) {
        var e = document.createElement("script");
        e.src = '';
        e.type="text/javascript";
//        e.addEventListener('load', scLoaded);
        document.getElementsByTagName("head")[0].appendChild(e);
//    } else {         
    //scLoaded();
//    }
}

function myJQueryCode(jQuery)
{
    if (!jQuery("link[href='" + BASE_URLINS + "static/assets/css/stylenew.css']").length > 0) {
        var linkx = document.createElement('link');
        linkx.rel = 'stylesheet';
        linkx.type = 'text/css';
        // linkx.href = BASE_URLINS + 'static/assets/css/style.css?v=' + Math.ceil(Math.random() * 10000000);
        linkx.href = BASE_URLINS + 'static/assets/css/stylenew.css';
        document.getElementsByTagName('head')[0].appendChild(linkx);
        
        
         var linkx = document.createElement('link');
        linkx.rel = 'stylesheet';
        linkx.type = 'text/css';
        // linkx.href = BASE_URLINS + 'static/assets/css/style.css?v=' + Math.ceil(Math.random() * 10000000);
        linkx.href = BASE_URLINS + 'static/assets/css/stylenew.css';
        document.getElementsByTagName('head')[0].appendChild(linkx);
    }

    !function (i)
    {
        "use strict";
        "function" == typeof define && define.amd ? define(["jquery"], i) : "undefined" != typeof exports ? module.exports = i(require("jquery")) : i(jQuery)
    }(function (i)
    {
        "use strict";
        var e = window.Slick1 ||
                {};
        (e = function ()
        {
            var e = 0;
            return function (t, o)
            {
                var s, n = this;
                n.defaults = {
                    accessibility: !0,
                    adaptiveHeight: !1,
                    appendArrows: i(t),
                    appendDots: i(t),
                    arrows: !0,
                    asNavFor: null,
                    prevArrow: '<button class="Slick1-prev" aria-label="Previous" type="button">Previous</button>',
                    nextArrow: '<button class="Slick1-next" aria-label="Next" type="button">Next</button>',
                    autoplay: !1,
                    autoplaySpeed: 3e3,
                    centerMode: !1,
                    centerPadding: "50px",
                    cssEase: "ease",
                    customPaging: function (e, t)
                    {
                        return i('<button type="button" />').text(t + 1)
                    },
                    dots: !1,
                    dotsClass: "Slick1-dots",
                    draggable: !0,
                    easing: "linear",
                    edgeFriction: .35,
                    fade: !1,
                    focusOnSelect: !1,
                    focusOnChange: !1,
                    infinite: !0,
                    initialSlide: 0,
                    lazyLoad: "ondemand",
                    mobileFirst: !1,
                    pauseOnHover: !0,
                    pauseOnFocus: !0,
                    pauseOnDotsHover: !1,
                    respondTo: "window",
                    responsive: null,
                    rows: 1,
                    rtl: !1,
                    slide: "",
                    slidesPerRow: 1,
                    slidesToShow: 1,
                    slidesToScroll: 1,
                    speed: 500,
                    swipe: !0,
                    swipeToSlide: !1,
                    touchMove: !0,
                    touchThreshold: 5,
                    useCSS: !0,
                    useTransform: !0,
                    variableWidth: !1,
                    vertical: !1,
                    verticalSwiping: !1,
                    waitForAnimate: !0,
                    zIndex: 1e3
                }, n.initials = {
                    animating: !1,
                    dragging: !1,
                    autoPlayTimer: null,
                    currentDirection: 0,
                    currentLeft: null,
                    currentSlide: 0,
                    direction: 1,
                    $dots: null,
                    listWidth: null,
                    listHeight: null,
                    loadIndex: 0,
                    $nextArrow: null,
                    $prevArrow: null,
                    scrolling: !1,
                    slideCount: null,
                    slideWidth: null,
                    $slideTrack: null,
                    $slides: null,
                    sliding: !1,
                    slideOffset: 0,
                    swipeLeft: null,
                    swiping: !1,
                    $list: null,
                    touchObject:
                            {},
                    transformsEnabled: !1,
                    unSlick1ed: !1
                }, i.extend(n, n.initials), n.activeBreakpoint = null, n.animType = null, n.animProp = null, n.breakpoints = [], n.breakpointSettings = [], n.cssTransitions = !1, n.focussed = !1, n.interrupted = !1, n.hidden = "hidden", n.paused = !0, n.positionProp = null, n.respondTo = null, n.rowCount = 1, n.shouldClick = !0, n.$slider = i(t), n.$slidesCache = null, n.transformType = null, n.transitionType = null, n.visibilityChange = "visibilitychange", n.windowWidth = 0, n.windowTimer = null, s = i(t).data("Slick1") ||
                        {}, n.options = i.extend(
                        {}, n.defaults, o, s), n.currentSlide = n.options.initialSlide, n.originalSettings = n.options, void 0 !== document.mozHidden ? (n.hidden = "mozHidden", n.visibilityChange = "mozvisibilitychange") : void 0 !== document.webkitHidden && (n.hidden = "webkitHidden", n.visibilityChange = "webkitvisibilitychange"), n.autoPlay = i.proxy(n.autoPlay, n), n.autoPlayClear = i.proxy(n.autoPlayClear, n), n.autoPlayIterator = i.proxy(n.autoPlayIterator, n), n.changeSlide = i.proxy(n.changeSlide, n), n.clickHandler = i.proxy(n.clickHandler, n), n.selectHandler = i.proxy(n.selectHandler, n), n.setPosition = i.proxy(n.setPosition, n), n.swipeHandler = i.proxy(n.swipeHandler, n), n.dragHandler = i.proxy(n.dragHandler, n), n.keyHandler = i.proxy(n.keyHandler, n), n.instanceUid = e++, n.htmlExpr = /^(?:\s*(<[\w\W]+>)[^>]*)$/, n.registerBreakpoints(), n.init(!0)
            }
        }()).prototype.activateADA = function ()
        {
            this.$slideTrack.find(".Slick1-active").attr(
                    {
                        "aria-hidden": "false"
                    }).find("a, input, button, select").attr(
                    {
                        tabindex: "0"
                    })
        }, e.prototype.addSlide = e.prototype.Slick1Add = function (e, t, o)
        {
            var s = this;
            if ("boolean" == typeof t)
                o = t, t = null;
            else if (t < 0 || t >= s.slideCount)
                return !1;
            s.unload(), "number" == typeof t ? 0 === t && 0 === s.$slides.length ? i(e).appendTo(s.$slideTrack) : o ? i(e).insertBefore(s.$slides.eq(t)) : i(e).insertAfter(s.$slides.eq(t)) : !0 === o ? i(e).prependTo(s.$slideTrack) : i(e).appendTo(s.$slideTrack), s.$slides = s.$slideTrack.children(this.options.slide), s.$slideTrack.children(this.options.slide).detach(), s.$slideTrack.append(s.$slides), s.$slides.each(function (e, t)
            {
                i(t).attr("data-Slick1-index", e)
            }), s.$slidesCache = s.$slides, s.reinit()
        }, e.prototype.animateHeight = function ()
        {
            var i = this;
            if (1 === i.options.slidesToShow && !0 === i.options.adaptiveHeight && !1 === i.options.vertical)
            {
                var e = i.$slides.eq(i.currentSlide).outerHeight(!0);
                i.$list.animate(
                        {
                            height: e
                        }, i.options.speed)
            }
        }, e.prototype.animateSlide = function (e, t)
        {
            var o = {},
                    s = this;
            s.animateHeight(), !0 === s.options.rtl && !1 === s.options.vertical && (e = -e), !1 === s.transformsEnabled ? !1 === s.options.vertical ? s.$slideTrack.animate(
                    {
                        left: e
                    }, s.options.speed, s.options.easing, t) : s.$slideTrack.animate(
                    {
                        top: e
                    }, s.options.speed, s.options.easing, t) : !1 === s.cssTransitions ? (!0 === s.options.rtl && (s.currentLeft = -s.currentLeft), i(
                    {
                        animStart: s.currentLeft
                    }).animate(
                    {
                        animStart: e
                    },
                    {
                        duration: s.options.speed,
                        easing: s.options.easing,
                        step: function (i)
                        {
                            i = Math.ceil(i), !1 === s.options.vertical ? (o[s.animType] = "translate(" + i + "px, 0px)", s.$slideTrack.css(o)) : (o[s.animType] = "translate(0px," + i + "px)", s.$slideTrack.css(o))
                        },
                        complete: function ()
                        {
                            t && t.call()
                        }
                    })) : (s.applyTransition(), e = Math.ceil(e), !1 === s.options.vertical ? o[s.animType] = "translate3d(" + e + "px, 0px, 0px)" : o[s.animType] = "translate3d(0px," + e + "px, 0px)", s.$slideTrack.css(o), t && setTimeout(function ()
            {
                s.disableTransition(), t.call()
            }, s.options.speed))
        }, e.prototype.getNavTarget = function ()
        {
            var e = this.options.asNavFor;
            return e && null !== e && (e = i(e).not(this.$slider)), e
        }, e.prototype.asNavFor = function (e)
        {
            var t = this.getNavTarget();
            null !== t && "object" == typeof t && t.each(function ()
            {
                var t = i(this).Slick1("getSlick1");
                t.unSlick1ed || t.slideHandler(e, !0)
            })
        }, e.prototype.applyTransition = function (i)
        {
            var e = this,
                    t = {};
            !1 === e.options.fade ? t[e.transitionType] = e.transformType + " " + e.options.speed + "ms " + e.options.cssEase : t[e.transitionType] = "opacity " + e.options.speed + "ms " + e.options.cssEase, !1 === e.options.fade ? e.$slideTrack.css(t) : e.$slides.eq(i).css(t)
        }, e.prototype.autoPlay = function ()
        {
            var i = this;
            i.autoPlayClear(), i.slideCount > i.options.slidesToShow && (i.autoPlayTimer = setInterval(i.autoPlayIterator, i.options.autoplaySpeed))
        }, e.prototype.autoPlayClear = function ()
        {
            this.autoPlayTimer && clearInterval(this.autoPlayTimer)
        }, e.prototype.autoPlayIterator = function ()
        {
            var i = this,
                    e = i.currentSlide + i.options.slidesToScroll;
            i.paused || i.interrupted || i.focussed || (!1 === i.options.infinite && (1 === i.direction && i.currentSlide + 1 === i.slideCount - 1 ? i.direction = 0 : 0 === i.direction && (e = i.currentSlide - i.options.slidesToScroll, i.currentSlide - 1 == 0 && (i.direction = 1))), i.slideHandler(e))
        }, e.prototype.buildArrows = function ()
        {
            var e = this;
            !0 === e.options.arrows && (e.$prevArrow = i(e.options.prevArrow).addClass("Slick1-arrow"), e.$nextArrow = i(e.options.nextArrow).addClass("Slick1-arrow"), e.slideCount > e.options.slidesToShow ? (e.$prevArrow.removeClass("Slick1-hidden").removeAttr("aria-hidden tabindex"), e.$nextArrow.removeClass("Slick1-hidden").removeAttr("aria-hidden tabindex"), e.htmlExpr.test(e.options.prevArrow) && e.$prevArrow.prependTo(e.options.appendArrows), e.htmlExpr.test(e.options.nextArrow) && e.$nextArrow.appendTo(e.options.appendArrows), !0 !== e.options.infinite && e.$prevArrow.addClass("Slick1-disabled").attr("aria-disabled", "true")) : e.$prevArrow.add(e.$nextArrow).addClass("Slick1-hidden").attr(
                    {
                        "aria-disabled": "true",
                        tabindex: "-1"
                    }))
        }, e.prototype.buildDots = function ()
        {
            var e, t, o = this;
            if (!0 === o.options.dots && o.slideCount > o.options.slidesToShow)
            {
                for (o.$slider.addClass("Slick1-dotted"), t = i("<ul />").addClass(o.options.dotsClass), e = 0; e <= o.getDotCount(); e += 1)
                    t.append(i("<li />").append(o.options.customPaging.call(this, o, e)));
                o.$dots = t.appendTo(o.options.appendDots), o.$dots.find("li").first().addClass("Slick1-active")
            }
        }, e.prototype.buildOut = function ()
        {
            var e = this;
            e.$slides = e.$slider.children(e.options.slide + ":not(.Slick1-cloned)").addClass("Slick1-slide"), e.slideCount = e.$slides.length, e.$slides.each(function (e, t)
            {
                i(t).attr("data-Slick1-index", e).data("originalStyling", i(t).attr("style") || "")
            }), e.$slider.addClass("Slick1-slider"), e.$slideTrack = 0 === e.slideCount ? i('<div class="Slick1-track"/>').appendTo(e.$slider) : e.$slides.wrapAll('<div class="Slick1-track"/>').parent(), e.$list = e.$slideTrack.wrap('<div class="Slick1-list"/>').parent(), e.$slideTrack.css("opacity", 0), !0 !== e.options.centerMode && !0 !== e.options.swipeToSlide || (e.options.slidesToScroll = 1), i("img[data-lazy]", e.$slider).not("[src]").addClass("Slick1-loading"), e.setupInfinite(), e.buildArrows(), e.buildDots(), e.updateDots(), e.setSlideClasses("number" == typeof e.currentSlide ? e.currentSlide : 0), !0 === e.options.draggable && e.$list.addClass("draggable")
        }, e.prototype.buildRows = function ()
        {
            var i, e, t, o, s, n, r, l = this;
            if (o = document.createDocumentFragment(), n = l.$slider.children(), l.options.rows > 0)
            {
                for (r = l.options.slidesPerRow * l.options.rows, s = Math.ceil(n.length / r), i = 0; i < s; i++)
                {
                    var d = document.createElement("div");
                    for (e = 0; e < l.options.rows; e++)
                    {
                        var a = document.createElement("div");
                        for (t = 0; t < l.options.slidesPerRow; t++)
                        {
                            var c = i * r + (e * l.options.slidesPerRow + t);
                            n.get(c) && a.appendChild(n.get(c))
                        }
                        d.appendChild(a)
                    }
                    o.appendChild(d)
                }
                l.$slider.empty().append(o), l.$slider.children().children().children().css(
                        {
                            width: 100 / l.options.slidesPerRow + "%",
                            display: "inline-block"
                        })
            }
        }, e.prototype.checkResponsive = function (e, t)
        {
            var o, s, n, r = this,
                    l = !1,
                    d = r.$slider.width(),
                    a = window.innerWidth || i(window).width();
            if ("window" === r.respondTo ? n = a : "slider" === r.respondTo ? n = d : "min" === r.respondTo && (n = Math.min(a, d)), r.options.responsive && r.options.responsive.length && null !== r.options.responsive)
            {
                for (o in s = null, r.breakpoints)
                    r.breakpoints.hasOwnProperty(o) && (!1 === r.originalSettings.mobileFirst ? n < r.breakpoints[o] && (s = r.breakpoints[o]) : n > r.breakpoints[o] && (s = r.breakpoints[o]));
                null !== s ? null !== r.activeBreakpoint ? (s !== r.activeBreakpoint || t) && (r.activeBreakpoint = s, "unSlick1" === r.breakpointSettings[s] ? r.unSlick1(s) : (r.options = i.extend(
                        {}, r.originalSettings, r.breakpointSettings[s]), !0 === e && (r.currentSlide = r.options.initialSlide), r.refresh(e)), l = s) : (r.activeBreakpoint = s, "unSlick1" === r.breakpointSettings[s] ? r.unSlick1(s) : (r.options = i.extend(
                        {}, r.originalSettings, r.breakpointSettings[s]), !0 === e && (r.currentSlide = r.options.initialSlide), r.refresh(e)), l = s) : null !== r.activeBreakpoint && (r.activeBreakpoint = null, r.options = r.originalSettings, !0 === e && (r.currentSlide = r.options.initialSlide), r.refresh(e), l = s), e || !1 === l || r.$slider.trigger("breakpoint", [r, l])
            }
        }, e.prototype.changeSlide = function (e, t)
        {
            var o, s, n = this,
                    r = i(e.currentTarget);
            switch (r.is("a") && e.preventDefault(), r.is("li") || (r = r.closest("li")), o = n.slideCount % n.options.slidesToScroll != 0 ? 0 : (n.slideCount - n.currentSlide) % n.options.slidesToScroll, e.data.message)
            {
                case "previous":
                    s = 0 === o ? n.options.slidesToScroll : n.options.slidesToShow - o, n.slideCount > n.options.slidesToShow && n.slideHandler(n.currentSlide - s, !1, t);
                    break;
                case "next":
                    s = 0 === o ? n.options.slidesToScroll : o, n.slideCount > n.options.slidesToShow && n.slideHandler(n.currentSlide + s, !1, t);
                    break;
                case "index":
                    var l = 0 === e.data.index ? 0 : e.data.index || r.index() * n.options.slidesToScroll;
                    n.slideHandler(n.checkNavigable(l), !1, t), r.children().trigger("focus");
                    break;
                default:
                    return
            }
        }, e.prototype.checkNavigable = function (i)
        {
            var e, t;
            if (t = 0, i > (e = this.getNavigableIndexes())[e.length - 1])
                i = e[e.length - 1];
            else
                for (var o in e)
                {
                    if (i < e[o])
                    {
                        i = t;
                        break
                    }
                    t = e[o]
                }
            return i
        }, e.prototype.cleanUpEvents = function ()
        {
            var e = this;
            e.options.dots && null !== e.$dots && (i("li", e.$dots).off("click.Slick1", e.changeSlide).off("mouseenter.Slick1", i.proxy(e.interrupt, e, !0)).off("mouseleave.Slick1", i.proxy(e.interrupt, e, !1)), !0 === e.options.accessibility && e.$dots.off("keydown.Slick1", e.keyHandler)), e.$slider.off("focus.Slick1 blur.Slick1"), !0 === e.options.arrows && e.slideCount > e.options.slidesToShow && (e.$prevArrow && e.$prevArrow.off("click.Slick1", e.changeSlide), e.$nextArrow && e.$nextArrow.off("click.Slick1", e.changeSlide), !0 === e.options.accessibility && (e.$prevArrow && e.$prevArrow.off("keydown.Slick1", e.keyHandler), e.$nextArrow && e.$nextArrow.off("keydown.Slick1", e.keyHandler))), e.$list.off("touchstart.Slick1 mousedown.Slick1", e.swipeHandler), e.$list.off("touchmove.Slick1 mousemove.Slick1", e.swipeHandler), e.$list.off("touchend.Slick1 mouseup.Slick1", e.swipeHandler), e.$list.off("touchcancel.Slick1 mouseleave.Slick1", e.swipeHandler), e.$list.off("click.Slick1", e.clickHandler), i(document).off(e.visibilityChange, e.visibility), e.cleanUpSlideEvents(), !0 === e.options.accessibility && e.$list.off("keydown.Slick1", e.keyHandler), !0 === e.options.focusOnSelect && i(e.$slideTrack).children().off("click.Slick1", e.selectHandler), i(window).off("orientationchange.Slick1.Slick1-" + e.instanceUid, e.orientationChange), i(window).off("resize.Slick1.Slick1-" + e.instanceUid, e.resize), i("[draggable!=true]", e.$slideTrack).off("dragstart", e.preventDefault), i(window).off("load.Slick1.Slick1-" + e.instanceUid, e.setPosition)
        }, e.prototype.cleanUpSlideEvents = function ()
        {
            var e = this;
            e.$list.off("mouseenter.Slick1", i.proxy(e.interrupt, e, !0)), e.$list.off("mouseleave.Slick1", i.proxy(e.interrupt, e, !1))
        }, e.prototype.cleanUpRows = function ()
        {
            var i, e = this;
            e.options.rows > 0 && ((i = e.$slides.children().children()).removeAttr("style"), e.$slider.empty().append(i))
        }, e.prototype.clickHandler = function (i)
        {
            !1 === this.shouldClick && (i.stopImmediatePropagation(), i.stopPropagation(), i.preventDefault())
        }, e.prototype.destroy = function (e)
        {
            var t = this;
            t.autoPlayClear(), t.touchObject = {}, t.cleanUpEvents(), i(".Slick1-cloned", t.$slider).detach(), t.$dots && t.$dots.remove(), t.$prevArrow && t.$prevArrow.length && (t.$prevArrow.removeClass("Slick1-disabled Slick1-arrow Slick1-hidden").removeAttr("aria-hidden aria-disabled tabindex").css("display", ""), t.htmlExpr.test(t.options.prevArrow) && t.$prevArrow.remove()), t.$nextArrow && t.$nextArrow.length && (t.$nextArrow.removeClass("Slick1-disabled Slick1-arrow Slick1-hidden").removeAttr("aria-hidden aria-disabled tabindex").css("display", ""), t.htmlExpr.test(t.options.nextArrow) && t.$nextArrow.remove()), t.$slides && (t.$slides.removeClass("Slick1-slide Slick1-active Slick1-center Slick1-visible Slick1-current").removeAttr("aria-hidden").removeAttr("data-Slick1-index").each(function ()
            {
                i(this).attr("style", i(this).data("originalStyling"))
            }), t.$slideTrack.children(this.options.slide).detach(), t.$slideTrack.detach(), t.$list.detach(), t.$slider.append(t.$slides)), t.cleanUpRows(), t.$slider.removeClass("Slick1-slider"), t.$slider.removeClass("Slick1-initialized"), t.$slider.removeClass("Slick1-dotted"), t.unSlick1ed = !0, e || t.$slider.trigger("destroy", [t])
        }, e.prototype.disableTransition = function (i)
        {
            var e = this,
                    t = {};
            t[e.transitionType] = "", !1 === e.options.fade ? e.$slideTrack.css(t) : e.$slides.eq(i).css(t)
        }, e.prototype.fadeSlide = function (i, e)
        {
            var t = this;
            !1 === t.cssTransitions ? (t.$slides.eq(i).css(
                    {
                        zIndex: t.options.zIndex
                    }), t.$slides.eq(i).animate(
                    {
                        opacity: 1
                    }, t.options.speed, t.options.easing, e)) : (t.applyTransition(i), t.$slides.eq(i).css(
                    {
                        opacity: 1,
                        zIndex: t.options.zIndex
                    }), e && setTimeout(function ()
            {
                t.disableTransition(i), e.call()
            }, t.options.speed))
        }, e.prototype.fadeSlideOut = function (i)
        {
            var e = this;
            !1 === e.cssTransitions ? e.$slides.eq(i).animate(
                    {
                        opacity: 0,
                        zIndex: e.options.zIndex - 2
                    }, e.options.speed, e.options.easing) : (e.applyTransition(i), e.$slides.eq(i).css(
                    {
                        opacity: 0,
                        zIndex: e.options.zIndex - 2
                    }))
        }, e.prototype.filterSlides = e.prototype.Slick1Filter = function (i)
        {
            var e = this;
            null !== i && (e.$slidesCache = e.$slides, e.unload(), e.$slideTrack.children(this.options.slide).detach(), e.$slidesCache.filter(i).appendTo(e.$slideTrack), e.reinit())
        }, e.prototype.focusHandler = function ()
        {
            var e = this;
            e.$slider.off("focus.Slick1 blur.Slick1").on("focus.Slick1 blur.Slick1", "*", function (t)
            {
                t.stopImmediatePropagation();
                var o = i(this);
                setTimeout(function ()
                {
                    e.options.pauseOnFocus && (e.focussed = o.is(":focus"), e.autoPlay())
                }, 0)
            })
        }, e.prototype.getCurrent = e.prototype.Slick1CurrentSlide = function ()
        {
            return this.currentSlide
        }, e.prototype.getDotCount = function ()
        {
            var i = this,
                    e = 0,
                    t = 0,
                    o = 0;
            if (!0 === i.options.infinite)
                if (i.slideCount <= i.options.slidesToShow)
                    ++o;
                else
                    for (; e < i.slideCount; )
                        ++o, e = t + i.options.slidesToScroll, t += i.options.slidesToScroll <= i.options.slidesToShow ? i.options.slidesToScroll : i.options.slidesToShow;
            else if (!0 === i.options.centerMode)
                o = i.slideCount;
            else if (i.options.asNavFor)
                for (; e < i.slideCount; )
                    ++o, e = t + i.options.slidesToScroll, t += i.options.slidesToScroll <= i.options.slidesToShow ? i.options.slidesToScroll : i.options.slidesToShow;
            else
                o = 1 + Math.ceil((i.slideCount - i.options.slidesToShow) / i.options.slidesToScroll);
            return o - 1
        }, e.prototype.getLeft = function (i)
        {
            var e, t, o, s, n = this,
                    r = 0;
            return n.slideOffset = 0, t = n.$slides.first().outerHeight(!0), !0 === n.options.infinite ? (n.slideCount > n.options.slidesToShow && (n.slideOffset = n.slideWidth * n.options.slidesToShow * -1, s = -1, !0 === n.options.vertical && !0 === n.options.centerMode && (2 === n.options.slidesToShow ? s = -1.5 : 1 === n.options.slidesToShow && (s = -2)), r = t * n.options.slidesToShow * s), n.slideCount % n.options.slidesToScroll != 0 && i + n.options.slidesToScroll > n.slideCount && n.slideCount > n.options.slidesToShow && (i > n.slideCount ? (n.slideOffset = (n.options.slidesToShow - (i - n.slideCount)) * n.slideWidth * -1, r = (n.options.slidesToShow - (i - n.slideCount)) * t * -1) : (n.slideOffset = n.slideCount % n.options.slidesToScroll * n.slideWidth * -1, r = n.slideCount % n.options.slidesToScroll * t * -1))) : i + n.options.slidesToShow > n.slideCount && (n.slideOffset = (i + n.options.slidesToShow - n.slideCount) * n.slideWidth, r = (i + n.options.slidesToShow - n.slideCount) * t), n.slideCount <= n.options.slidesToShow && (n.slideOffset = 0, r = 0), !0 === n.options.centerMode && n.slideCount <= n.options.slidesToShow ? n.slideOffset = n.slideWidth * Math.floor(n.options.slidesToShow) / 2 - n.slideWidth * n.slideCount / 2 : !0 === n.options.centerMode && !0 === n.options.infinite ? n.slideOffset += n.slideWidth * Math.floor(n.options.slidesToShow / 2) - n.slideWidth : !0 === n.options.centerMode && (n.slideOffset = 0, n.slideOffset += n.slideWidth * Math.floor(n.options.slidesToShow / 2)), e = !1 === n.options.vertical ? i * n.slideWidth * -1 + n.slideOffset : i * t * -1 + r, !0 === n.options.variableWidth && (o = n.slideCount <= n.options.slidesToShow || !1 === n.options.infinite ? n.$slideTrack.children(".Slick1-slide").eq(i) : n.$slideTrack.children(".Slick1-slide").eq(i + n.options.slidesToShow), e = !0 === n.options.rtl ? o[0] ? -1 * (n.$slideTrack.width() - o[0].offsetLeft - o.width()) : 0 : o[0] ? -1 * o[0].offsetLeft : 0, !0 === n.options.centerMode && (o = n.slideCount <= n.options.slidesToShow || !1 === n.options.infinite ? n.$slideTrack.children(".Slick1-slide").eq(i) : n.$slideTrack.children(".Slick1-slide").eq(i + n.options.slidesToShow + 1), e = !0 === n.options.rtl ? o[0] ? -1 * (n.$slideTrack.width() - o[0].offsetLeft - o.width()) : 0 : o[0] ? -1 * o[0].offsetLeft : 0, e += (n.$list.width() - o.outerWidth()) / 2)), e
        }, e.prototype.getOption = e.prototype.Slick1GetOption = function (i)
        {
            return this.options[i]
        }, e.prototype.getNavigableIndexes = function ()
        {
            var i, e = this,
                    t = 0,
                    o = 0,
                    s = [];
            for (!1 === e.options.infinite ? i = e.slideCount : (t = - 1 * e.options.slidesToScroll, o = - 1 * e.options.slidesToScroll, i = 2 * e.slideCount); t < i; )
                s.push(t), t = o + e.options.slidesToScroll, o += e.options.slidesToScroll <= e.options.slidesToShow ? e.options.slidesToScroll : e.options.slidesToShow;
            return s
        }, e.prototype.getSlick1 = function ()
        {
            return this
        }, e.prototype.getSlideCount = function ()
        {
            var e, t, o = this;
            return t = !0 === o.options.centerMode ? o.slideWidth * Math.floor(o.options.slidesToShow / 2) : 0, !0 === o.options.swipeToSlide ? (o.$slideTrack.find(".Slick1-slide").each(function (s, n)
            {
                if (n.offsetLeft - t + i(n).outerWidth() / 2 > -1 * o.swipeLeft)
                    return e = n, !1
            }), Math.abs(i(e).attr("data-Slick1-index") - o.currentSlide) || 1) : o.options.slidesToScroll
        }, e.prototype.goTo = e.prototype.Slick1GoTo = function (i, e)
        {
            this.changeSlide(
                    {
                        data:
                                {
                                    message: "index",
                                    index: parseInt(i)
                                }
                    }, e)
        }, e.prototype.init = function (e)
        {
            var t = this;
            i(t.$slider).hasClass("Slick1-initialized") || (i(t.$slider).addClass("Slick1-initialized"), t.buildRows(), t.buildOut(), t.setProps(), t.startLoad(), t.loadSlider(), t.initializeEvents(), t.updateArrows(), t.updateDots(), t.checkResponsive(!0), t.focusHandler()), e && t.$slider.trigger("init", [t]), !0 === t.options.accessibility && t.initADA(), t.options.autoplay && (t.paused = !1, t.autoPlay())
        }, e.prototype.initADA = function ()
        {
            var e = this,
                    t = Math.ceil(e.slideCount / e.options.slidesToShow),
                    o = e.getNavigableIndexes().filter(function (i)
            {
                return i >= 0 && i < e.slideCount
            });
            e.$slides.add(e.$slideTrack.find(".Slick1-cloned")).attr(
                    {
                        "aria-hidden": "true",
                        tabindex: "-1"
                    }).find("a, input, button, select").attr(
                    {
                        tabindex: "-1"
                    }), null !== e.$dots && (e.$slides.not(e.$slideTrack.find(".Slick1-cloned")).each(function (t)
            {
                var s = o.indexOf(t);
                if (i(this).attr(
                        {
                            role: "tabpanel",
                            id: "Slick1-slide" + e.instanceUid + t,
                            tabindex: -1
                        }), -1 !== s)
                {
                    var n = "Slick1-slide-control" + e.instanceUid + s;
                    i("#" + n).length && i(this).attr(
                            {
                                "aria-describedby": n
                            })
                }
            }), e.$dots.attr("role", "tablist").find("li").each(function (s)
            {
                var n = o[s];
                i(this).attr(
                        {
                            role: "presentation"
                        }), i(this).find("button").first().attr(
                        {
                            role: "tab",
                            id: "Slick1-slide-control" + e.instanceUid + s,
                            "aria-controls": "Slick1-slide" + e.instanceUid + n,
                            "aria-label": s + 1 + " of " + t,
                            "aria-selected": null,
                            tabindex: "-1"
                        })
            }).eq(e.currentSlide).find("button").attr(
                    {
                        "aria-selected": "true",
                        tabindex: "0"
                    }).end());
            for (var s = e.currentSlide, n = s + e.options.slidesToShow; s < n; s++)
                e.options.focusOnChange ? e.$slides.eq(s).attr(
                        {
                            tabindex: "0"
                        }) : e.$slides.eq(s).removeAttr("tabindex");
            e.activateADA()
        }, e.prototype.initArrowEvents = function ()
        {
            var i = this;
            !0 === i.options.arrows && i.slideCount > i.options.slidesToShow && (i.$prevArrow.off("click.Slick1").on("click.Slick1",
                    {
                        message: "previous"
                    }, i.changeSlide), i.$nextArrow.off("click.Slick1").on("click.Slick1",
                    {
                        message: "next"
                    }, i.changeSlide), !0 === i.options.accessibility && (i.$prevArrow.on("keydown.Slick1", i.keyHandler), i.$nextArrow.on("keydown.Slick1", i.keyHandler)))
        }, e.prototype.initDotEvents = function ()
        {
            var e = this;
            !0 === e.options.dots && e.slideCount > e.options.slidesToShow && (i("li", e.$dots).on("click.Slick1",
                    {
                        message: "index"
                    }, e.changeSlide), !0 === e.options.accessibility && e.$dots.on("keydown.Slick1", e.keyHandler)), !0 === e.options.dots && !0 === e.options.pauseOnDotsHover && e.slideCount > e.options.slidesToShow && i("li", e.$dots).on("mouseenter.Slick1", i.proxy(e.interrupt, e, !0)).on("mouseleave.Slick1", i.proxy(e.interrupt, e, !1))
        }, e.prototype.initSlideEvents = function ()
        {
            var e = this;
            e.options.pauseOnHover && (e.$list.on("mouseenter.Slick1", i.proxy(e.interrupt, e, !0)), e.$list.on("mouseleave.Slick1", i.proxy(e.interrupt, e, !1)))
        }, e.prototype.initializeEvents = function ()
        {
            var e = this;
            e.initArrowEvents(), e.initDotEvents(), e.initSlideEvents(), e.$list.on("touchstart.Slick1 mousedown.Slick1",
                    {
                        action: "start"
                    }, e.swipeHandler), e.$list.on("touchmove.Slick1 mousemove.Slick1",
                    {
                        action: "move"
                    }, e.swipeHandler), e.$list.on("touchend.Slick1 mouseup.Slick1",
                    {
                        action: "end"
                    }, e.swipeHandler), e.$list.on("touchcancel.Slick1 mouseleave.Slick1",
                    {
                        action: "end"
                    }, e.swipeHandler), e.$list.on("click.Slick1", e.clickHandler), i(document).on(e.visibilityChange, i.proxy(e.visibility, e)), !0 === e.options.accessibility && e.$list.on("keydown.Slick1", e.keyHandler), !0 === e.options.focusOnSelect && i(e.$slideTrack).children().on("click.Slick1", e.selectHandler), i(window).on("orientationchange.Slick1.Slick1-" + e.instanceUid, i.proxy(e.orientationChange, e)), i(window).on("resize.Slick1.Slick1-" + e.instanceUid, i.proxy(e.resize, e)), i("[draggable!=true]", e.$slideTrack).on("dragstart", e.preventDefault), i(window).on("load.Slick1.Slick1-" + e.instanceUid, e.setPosition), i(e.setPosition)
        }, e.prototype.initUI = function ()
        {
            var i = this;
            !0 === i.options.arrows && i.slideCount > i.options.slidesToShow && (i.$prevArrow.show(), i.$nextArrow.show()), !0 === i.options.dots && i.slideCount > i.options.slidesToShow && i.$dots.show()
        }, e.prototype.keyHandler = function (i)
        {
            var e = this;
            i.target.tagName.match("TEXTAREA|INPUT|SELECT") || (37 === i.keyCode && !0 === e.options.accessibility ? e.changeSlide(
                    {
                        data:
                                {
                                    message: !0 === e.options.rtl ? "next" : "previous"
                                }
                    }) : 39 === i.keyCode && !0 === e.options.accessibility && e.changeSlide(
                    {
                        data:
                                {
                                    message: !0 === e.options.rtl ? "previous" : "next"
                                }
                    }))
        }, e.prototype.lazyLoad = function ()
        {
            var e, t, o, s = this;

            function n(e)
            {
                i("img[data-lazy]", e).each(function ()
                {
                    var e = i(this),
                            t = i(this).attr("data-lazy"),
                            o = i(this).attr("data-srcset"),
                            n = i(this).attr("data-sizes") || s.$slider.attr("data-sizes"),
                            r = document.createElement("img");
                    r.onload = function ()
                    {
                        e.animate(
                                {
                                    opacity: 0
                                }, 100, function ()
                        {
                            o && (e.attr("srcset", o), n && e.attr("sizes", n)), e.attr("src", t).animate(
                                    {
                                        opacity: 1
                                    }, 200, function ()
                            {
                                e.removeAttr("data-lazy data-srcset data-sizes").removeClass("Slick1-loading")
                            }), s.$slider.trigger("lazyLoaded", [s, e, t])
                        })
                    }, r.onerror = function ()
                    {
                        e.removeAttr("data-lazy").removeClass("Slick1-loading").addClass("Slick1-lazyload-error"), s.$slider.trigger("lazyLoadError", [s, e, t])
                    }, r.src = t
                })
            }
            if (!0 === s.options.centerMode ? !0 === s.options.infinite ? o = (t = s.currentSlide + (s.options.slidesToShow / 2 + 1)) + s.options.slidesToShow + 2 : (t = Math.max(0, s.currentSlide - (s.options.slidesToShow / 2 + 1)), o = s.options.slidesToShow / 2 + 1 + 2 + s.currentSlide) : (t = s.options.infinite ? s.options.slidesToShow + s.currentSlide : s.currentSlide, o = Math.ceil(t + s.options.slidesToShow), !0 === s.options.fade && (t > 0 && t--, o <= s.slideCount && o++)), e = s.$slider.find(".Slick1-slide").slice(t, o), "anticipated" === s.options.lazyLoad)
                for (var r = t - 1, l = o, d = s.$slider.find(".Slick1-slide"), a = 0; a < s.options.slidesToScroll; a++)
                    r < 0 && (r = s.slideCount - 1), e = (e = e.add(d.eq(r))).add(d.eq(l)), r--, l++;
            n(e), s.slideCount <= s.options.slidesToShow ? n(s.$slider.find(".Slick1-slide")) : s.currentSlide >= s.slideCount - s.options.slidesToShow ? n(s.$slider.find(".Slick1-cloned").slice(0, s.options.slidesToShow)) : 0 === s.currentSlide && n(s.$slider.find(".Slick1-cloned").slice(-1 * s.options.slidesToShow))
        }, e.prototype.loadSlider = function ()
        {
            var i = this;
            i.setPosition(), i.$slideTrack.css(
                    {
                        opacity: 1
                    }), i.$slider.removeClass("Slick1-loading"), i.initUI(), "progressive" === i.options.lazyLoad && i.progressiveLazyLoad()
        }, e.prototype.next = e.prototype.Slick1Next = function ()
        {
            this.changeSlide(
                    {
                        data:
                                {
                                    message: "next"
                                }
                    })
        }, e.prototype.orientationChange = function ()
        {
            this.checkResponsive(), this.setPosition()
        }, e.prototype.pause = e.prototype.Slick1Pause = function ()
        {
            this.autoPlayClear(), this.paused = !0
        }, e.prototype.play = e.prototype.Slick1Play = function ()
        {
            var i = this;
            i.autoPlay(), i.options.autoplay = !0, i.paused = !1, i.focussed = !1, i.interrupted = !1
        }, e.prototype.postSlide = function (e)
        {
            var t = this;
            t.unSlick1ed || (t.$slider.trigger("afterChange", [t, e]), t.animating = !1, t.slideCount > t.options.slidesToShow && t.setPosition(), t.swipeLeft = null, t.options.autoplay && t.autoPlay(), !0 === t.options.accessibility && (t.initADA(), t.options.focusOnChange && i(t.$slides.get(t.currentSlide)).attr("tabindex", 0).focus()))
        }, e.prototype.prev = e.prototype.Slick1Prev = function ()
        {
            this.changeSlide(
                    {
                        data:
                                {
                                    message: "previous"
                                }
                    })
        }, e.prototype.preventDefault = function (i)
        {
            i.preventDefault()
        }, e.prototype.progressiveLazyLoad = function (e)
        {
            e = e || 1;
            var t, o, s, n, r, l = this,
                    d = i("img[data-lazy]", l.$slider);
            d.length ? (t = d.first(), o = t.attr("data-lazy"), s = t.attr("data-srcset"), n = t.attr("data-sizes") || l.$slider.attr("data-sizes"), (r = document.createElement("img")).onload = function ()
            {
                s && (t.attr("srcset", s), n && t.attr("sizes", n)), t.attr("src", o).removeAttr("data-lazy data-srcset data-sizes").removeClass("Slick1-loading"), !0 === l.options.adaptiveHeight && l.setPosition(), l.$slider.trigger("lazyLoaded", [l, t, o]), l.progressiveLazyLoad()
            }, r.onerror = function ()
            {
                e < 3 ? setTimeout(function ()
                {
                    l.progressiveLazyLoad(e + 1)
                }, 500) : (t.removeAttr("data-lazy").removeClass("Slick1-loading").addClass("Slick1-lazyload-error"), l.$slider.trigger("lazyLoadError", [l, t, o]), l.progressiveLazyLoad())
            }, r.src = o) : l.$slider.trigger("allImagesLoaded", [l])
        }, e.prototype.refresh = function (e)
        {
            var t, o, s = this;
            o = s.slideCount - s.options.slidesToShow, !s.options.infinite && s.currentSlide > o && (s.currentSlide = o), s.slideCount <= s.options.slidesToShow && (s.currentSlide = 0), t = s.currentSlide, s.destroy(!0), i.extend(s, s.initials,
                    {
                        currentSlide: t
                    }), s.init(), e || s.changeSlide(
                    {
                        data:
                                {
                                    message: "index",
                                    index: t
                                }
                    }, !1)
        }, e.prototype.registerBreakpoints = function ()
        {
            var e, t, o, s = this,
                    n = s.options.responsive || null;
            if ("array" === i.type(n) && n.length)
            {
                for (e in s.respondTo = s.options.respondTo || "window", n)
                    if (o = s.breakpoints.length - 1, n.hasOwnProperty(e))
                    {
                        for (t = n[e].breakpoint; o >= 0; )
                            s.breakpoints[o] && s.breakpoints[o] === t && s.breakpoints.splice(o, 1), o--;
                        s.breakpoints.push(t), s.breakpointSettings[t] = n[e].settings
                    }
                s.breakpoints.sort(function (i, e)
                {
                    return s.options.mobileFirst ? i - e : e - i
                })
            }
        }, e.prototype.reinit = function ()
        {
            var e = this;
            e.$slides = e.$slideTrack.children(e.options.slide).addClass("Slick1-slide"), e.slideCount = e.$slides.length, e.currentSlide >= e.slideCount && 0 !== e.currentSlide && (e.currentSlide = e.currentSlide - e.options.slidesToScroll), e.slideCount <= e.options.slidesToShow && (e.currentSlide = 0), e.registerBreakpoints(), e.setProps(), e.setupInfinite(), e.buildArrows(), e.updateArrows(), e.initArrowEvents(), e.buildDots(), e.updateDots(), e.initDotEvents(), e.cleanUpSlideEvents(), e.initSlideEvents(), e.checkResponsive(!1, !0), !0 === e.options.focusOnSelect && i(e.$slideTrack).children().on("click.Slick1", e.selectHandler), e.setSlideClasses("number" == typeof e.currentSlide ? e.currentSlide : 0), e.setPosition(), e.focusHandler(), e.paused = !e.options.autoplay, e.autoPlay(), e.$slider.trigger("reInit", [e])
        }, e.prototype.resize = function ()
        {
            var e = this;
            i(window).width() !== e.windowWidth && (clearTimeout(e.windowDelay), e.windowDelay = window.setTimeout(function ()
            {
                e.windowWidth = i(window).width(), e.checkResponsive(), e.unSlick1ed || e.setPosition()
            }, 50))
        }, e.prototype.removeSlide = e.prototype.Slick1Remove = function (i, e, t)
        {
            var o = this;
            if (i = "boolean" == typeof i ? !0 === (e = i) ? 0 : o.slideCount - 1 : !0 === e ? --i : i, o.slideCount < 1 || i < 0 || i > o.slideCount - 1)
                return !1;
            o.unload(), !0 === t ? o.$slideTrack.children().remove() : o.$slideTrack.children(this.options.slide).eq(i).remove(), o.$slides = o.$slideTrack.children(this.options.slide), o.$slideTrack.children(this.options.slide).detach(), o.$slideTrack.append(o.$slides), o.$slidesCache = o.$slides, o.reinit()
        }, e.prototype.setCSS = function (i)
        {
            var e, t, o = this,
                    s = {};
            !0 === o.options.rtl && (i = -i), e = "left" == o.positionProp ? Math.ceil(i) + "px" : "0px", t = "top" == o.positionProp ? Math.ceil(i) + "px" : "0px", s[o.positionProp] = i, !1 === o.transformsEnabled ? o.$slideTrack.css(s) : (s = {}, !1 === o.cssTransitions ? (s[o.animType] = "translate(" + e + ", " + t + ")", o.$slideTrack.css(s)) : (s[o.animType] = "translate3d(" + e + ", " + t + ", 0px)", o.$slideTrack.css(s)))
        }, e.prototype.setDimensions = function ()
        {
            var i = this;
            !1 === i.options.vertical ? !0 === i.options.centerMode && i.$list.css(
                    {
                        padding: "0px " + i.options.centerPadding
                    }) : (i.$list.height(i.$slides.first().outerHeight(!0) * i.options.slidesToShow), !0 === i.options.centerMode && i.$list.css(
                    {
                        padding: i.options.centerPadding + " 0px"
                    })), i.listWidth = i.$list.width(), i.listHeight = i.$list.height(), !1 === i.options.vertical && !1 === i.options.variableWidth ? (i.slideWidth = Math.ceil(i.listWidth / i.options.slidesToShow), i.$slideTrack.width(Math.ceil(i.slideWidth * i.$slideTrack.children(".Slick1-slide").length))) : !0 === i.options.variableWidth ? i.$slideTrack.width(5e3 * i.slideCount) : (i.slideWidth = Math.ceil(i.listWidth), i.$slideTrack.height(Math.ceil(i.$slides.first().outerHeight(!0) * i.$slideTrack.children(".Slick1-slide").length)));
            var e = i.$slides.first().outerWidth(!0) - i.$slides.first().width();
            !1 === i.options.variableWidth && i.$slideTrack.children(".Slick1-slide").width(i.slideWidth - e)
        }, e.prototype.setFade = function ()
        {
            var e, t = this;
            t.$slides.each(function (o, s)
            {
                e = t.slideWidth * o * -1, !0 === t.options.rtl ? i(s).css(
                        {
                            position: "relative",
                            right: e,
                            top: 0,
                            zIndex: t.options.zIndex - 2,
                            opacity: 0
                        }) : i(s).css(
                        {
                            position: "relative",
                            left: e,
                            top: 0,
                            zIndex: t.options.zIndex - 2,
                            opacity: 0
                        })
            }), t.$slides.eq(t.currentSlide).css(
                    {
                        zIndex: t.options.zIndex - 1,
                        opacity: 1
                    })
        }, e.prototype.setHeight = function ()
        {
            var i = this;
            if (1 === i.options.slidesToShow && !0 === i.options.adaptiveHeight && !1 === i.options.vertical)
            {
                var e = i.$slides.eq(i.currentSlide).outerHeight(!0);
                i.$list.css("height", e)
            }
        }, e.prototype.setOption = e.prototype.Slick1SetOption = function ()
        {
            var e, t, o, s, n, r = this,
                    l = !1;
            if ("object" === i.type(arguments[0]) ? (o = arguments[0], l = arguments[1], n = "multiple") : "string" === i.type(arguments[0]) && (o = arguments[0], s = arguments[1], l = arguments[2], "responsive" === arguments[0] && "array" === i.type(arguments[1]) ? n = "responsive" : void 0 !== arguments[1] && (n = "single")), "single" === n)
                r.options[o] = s;
            else if ("multiple" === n)
                i.each(o, function (i, e)
                {
                    r.options[i] = e
                });
            else if ("responsive" === n)
                for (t in s)
                    if ("array" !== i.type(r.options.responsive))
                        r.options.responsive = [s[t]];
                    else
                    {
                        for (e = r.options.responsive.length - 1; e >= 0; )
                            r.options.responsive[e].breakpoint === s[t].breakpoint && r.options.responsive.splice(e, 1), e--;
                        r.options.responsive.push(s[t])
                    }
            l && (r.unload(), r.reinit())
        }, e.prototype.setPosition = function ()
        {
            var i = this;
            i.setDimensions(), i.setHeight(), !1 === i.options.fade ? i.setCSS(i.getLeft(i.currentSlide)) : i.setFade(), i.$slider.trigger("setPosition", [i])
        }, e.prototype.setProps = function ()
        {
            var i = this,
                    e = document.body.style;
            i.positionProp = !0 === i.options.vertical ? "top" : "left", "top" === i.positionProp ? i.$slider.addClass("Slick1-vertical") : i.$slider.removeClass("Slick1-vertical"), void 0 === e.WebkitTransition && void 0 === e.MozTransition && void 0 === e.msTransition || !0 === i.options.useCSS && (i.cssTransitions = !0), i.options.fade && ("number" == typeof i.options.zIndex ? i.options.zIndex < 3 && (i.options.zIndex = 3) : i.options.zIndex = i.defaults.zIndex), void 0 !== e.OTransform && (i.animType = "OTransform", i.transformType = "-o-transform", i.transitionType = "OTransition", void 0 === e.perspectiveProperty && void 0 === e.webkitPerspective && (i.animType = !1)), void 0 !== e.MozTransform && (i.animType = "MozTransform", i.transformType = "-moz-transform", i.transitionType = "MozTransition", void 0 === e.perspectiveProperty && void 0 === e.MozPerspective && (i.animType = !1)), void 0 !== e.webkitTransform && (i.animType = "webkitTransform", i.transformType = "-webkit-transform", i.transitionType = "webkitTransition", void 0 === e.perspectiveProperty && void 0 === e.webkitPerspective && (i.animType = !1)), void 0 !== e.msTransform && (i.animType = "msTransform", i.transformType = "-ms-transform", i.transitionType = "msTransition", void 0 === e.msTransform && (i.animType = !1)), void 0 !== e.transform && !1 !== i.animType && (i.animType = "transform", i.transformType = "transform", i.transitionType = "transition"), i.transformsEnabled = i.options.useTransform && null !== i.animType && !1 !== i.animType
        }, e.prototype.setSlideClasses = function (i)
        {
            var e, t, o, s, n = this;
            if (t = n.$slider.find(".Slick1-slide").removeClass("Slick1-active Slick1-center Slick1-current").attr("aria-hidden", "true"), n.$slides.eq(i).addClass("Slick1-current"), !0 === n.options.centerMode)
            {
                var r = n.options.slidesToShow % 2 == 0 ? 1 : 0;
                e = Math.floor(n.options.slidesToShow / 2), !0 === n.options.infinite && (i >= e && i <= n.slideCount - 1 - e ? n.$slides.slice(i - e + r, i + e + 1).addClass("Slick1-active").attr("aria-hidden", "false") : (o = n.options.slidesToShow + i, t.slice(o - e + 1 + r, o + e + 2).addClass("Slick1-active").attr("aria-hidden", "false")), 0 === i ? t.eq(t.length - 1 - n.options.slidesToShow).addClass("Slick1-center") : i === n.slideCount - 1 && t.eq(n.options.slidesToShow).addClass("Slick1-center")), n.$slides.eq(i).addClass("Slick1-center")
            } else
                i >= 0 && i <= n.slideCount - n.options.slidesToShow ? n.$slides.slice(i, i + n.options.slidesToShow).addClass("Slick1-active").attr("aria-hidden", "false") : t.length <= n.options.slidesToShow ? t.addClass("Slick1-active").attr("aria-hidden", "false") : (s = n.slideCount % n.options.slidesToShow, o = !0 === n.options.infinite ? n.options.slidesToShow + i : i, n.options.slidesToShow == n.options.slidesToScroll && n.slideCount - i < n.options.slidesToShow ? t.slice(o - (n.options.slidesToShow - s), o + s).addClass("Slick1-active").attr("aria-hidden", "false") : t.slice(o, o + n.options.slidesToShow).addClass("Slick1-active").attr("aria-hidden", "false"));
            "ondemand" !== n.options.lazyLoad && "anticipated" !== n.options.lazyLoad || n.lazyLoad()
        }, e.prototype.setupInfinite = function ()
        {
            var e, t, o, s = this;
            if (!0 === s.options.fade && (s.options.centerMode = !1), !0 === s.options.infinite && !1 === s.options.fade && (t = null, s.slideCount > s.options.slidesToShow))
            {
                for (o = !0 === s.options.centerMode ? s.options.slidesToShow + 1 : s.options.slidesToShow, e = s.slideCount; e > s.slideCount - o; e -= 1)
                    t = e - 1, i(s.$slides[t]).clone(!0).attr("id", "").attr("data-Slick1-index", t - s.slideCount).prependTo(s.$slideTrack).addClass("Slick1-cloned");
                for (e = 0; e < o + s.slideCount; e += 1)
                    t = e, i(s.$slides[t]).clone(!0).attr("id", "").attr("data-Slick1-index", t + s.slideCount).appendTo(s.$slideTrack).addClass("Slick1-cloned");
                s.$slideTrack.find(".Slick1-cloned").find("[id]").each(function ()
                {
                    i(this).attr("id", "")
                })
            }
        }, e.prototype.interrupt = function (i)
        {
            i || this.autoPlay(), this.interrupted = i
        }, e.prototype.selectHandler = function (e)
        {
            var t = this,
                    o = i(e.target).is(".Slick1-slide") ? i(e.target) : i(e.target).parents(".Slick1-slide"),
                    s = parseInt(o.attr("data-Slick1-index"));
            s || (s = 0), t.slideCount <= t.options.slidesToShow ? t.slideHandler(s, !1, !0) : t.slideHandler(s)
        }, e.prototype.slideHandler = function (i, e, t)
        {
            var o, s, n, r, l, d, a = this;
            if (e = e || !1, !(!0 === a.animating && !0 === a.options.waitForAnimate || !0 === a.options.fade && a.currentSlide === i))
                if (!1 === e && a.asNavFor(i), o = i, l = a.getLeft(o), r = a.getLeft(a.currentSlide), a.currentLeft = null === a.swipeLeft ? r : a.swipeLeft, !1 === a.options.infinite && !1 === a.options.centerMode && (i < 0 || i > a.getDotCount() * a.options.slidesToScroll))
                    !1 === a.options.fade && (o = a.currentSlide, !0 !== t && a.slideCount > a.options.slidesToShow ? a.animateSlide(r, function ()
                    {
                        a.postSlide(o)
                    }) : a.postSlide(o));
                else if (!1 === a.options.infinite && !0 === a.options.centerMode && (i < 0 || i > a.slideCount - a.options.slidesToScroll))
                    !1 === a.options.fade && (o = a.currentSlide, !0 !== t && a.slideCount > a.options.slidesToShow ? a.animateSlide(r, function ()
                    {
                        a.postSlide(o)
                    }) : a.postSlide(o));
                else
                {
                    if (a.options.autoplay && clearInterval(a.autoPlayTimer), s = o < 0 ? a.slideCount % a.options.slidesToScroll != 0 ? a.slideCount - a.slideCount % a.options.slidesToScroll : a.slideCount + o : o >= a.slideCount ? a.slideCount % a.options.slidesToScroll != 0 ? 0 : o - a.slideCount : o, a.animating = !0, a.$slider.trigger("beforeChange", [a, a.currentSlide, s]), n = a.currentSlide, a.currentSlide = s, a.setSlideClasses(a.currentSlide), a.options.asNavFor && (d = (d = a.getNavTarget()).Slick1("getSlick1")).slideCount <= d.options.slidesToShow && d.setSlideClasses(a.currentSlide), a.updateDots(), a.updateArrows(), !0 === a.options.fade)
                        return !0 !== t ? (a.fadeSlideOut(n), a.fadeSlide(s, function ()
                        {
                            a.postSlide(s)
                        })) : a.postSlide(s), void a.animateHeight();
                    !0 !== t && a.slideCount > a.options.slidesToShow ? a.animateSlide(l, function ()
                    {
                        a.postSlide(s)
                    }) : a.postSlide(s)
                }
        }, e.prototype.startLoad = function ()
        {
            var i = this;
            !0 === i.options.arrows && i.slideCount > i.options.slidesToShow && (i.$prevArrow.hide(), i.$nextArrow.hide()), !0 === i.options.dots && i.slideCount > i.options.slidesToShow && i.$dots.hide(), i.$slider.addClass("Slick1-loading")
        }, e.prototype.swipeDirection = function ()
        {
            var i, e, t, o, s = this;
            return i = s.touchObject.startX - s.touchObject.curX, e = s.touchObject.startY - s.touchObject.curY, t = Math.atan2(e, i), (o = Math.round(180 * t / Math.PI)) < 0 && (o = 360 - Math.abs(o)), o <= 45 && o >= 0 ? !1 === s.options.rtl ? "left" : "right" : o <= 360 && o >= 315 ? !1 === s.options.rtl ? "left" : "right" : o >= 135 && o <= 225 ? !1 === s.options.rtl ? "right" : "left" : !0 === s.options.verticalSwiping ? o >= 35 && o <= 135 ? "down" : "up" : "vertical"
        }, e.prototype.swipeEnd = function (i)
        {
            var e, t, o = this;
            if (o.dragging = !1, o.swiping = !1, o.scrolling)
                return o.scrolling = !1, !1;
            if (o.interrupted = !1, o.shouldClick = !(o.touchObject.swipeLength > 10), void 0 === o.touchObject.curX)
                return !1;
            if (!0 === o.touchObject.edgeHit && o.$slider.trigger("edge", [o, o.swipeDirection()]), o.touchObject.swipeLength >= o.touchObject.minSwipe)
            {
                switch (t = o.swipeDirection())
                {
                    case "left":
                    case "down":
                        e = o.options.swipeToSlide ? o.checkNavigable(o.currentSlide + o.getSlideCount()) : o.currentSlide + o.getSlideCount(), o.currentDirection = 0;
                        break;
                    case "right":
                    case "up":
                        e = o.options.swipeToSlide ? o.checkNavigable(o.currentSlide - o.getSlideCount()) : o.currentSlide - o.getSlideCount(), o.currentDirection = 1
                }
                "vertical" != t && (o.slideHandler(e), o.touchObject = {}, o.$slider.trigger("swipe", [o, t]))
            } else
                o.touchObject.startX !== o.touchObject.curX && (o.slideHandler(o.currentSlide), o.touchObject = {})
        }, e.prototype.swipeHandler = function (i)
        {
            var e = this;
            if (!(!1 === e.options.swipe || "ontouchend" in document && !1 === e.options.swipe || !1 === e.options.draggable && -1 !== i.type.indexOf("mouse")))
                switch (e.touchObject.fingerCount = i.originalEvent && void 0 !== i.originalEvent.touches ? i.originalEvent.touches.length : 1, e.touchObject.minSwipe = e.listWidth / e.options.touchThreshold, !0 === e.options.verticalSwiping && (e.touchObject.minSwipe = e.listHeight / e.options.touchThreshold), i.data.action)
                {
                    case "start":
                        e.swipeStart(i);
                        break;
                    case "move":
                        e.swipeMove(i);
                        break;
                    case "end":
                        e.swipeEnd(i)
                }
        }, e.prototype.swipeMove = function (i)
        {
            var e, t, o, s, n, r, l = this;
            return n = void 0 !== i.originalEvent ? i.originalEvent.touches : null, !(!l.dragging || l.scrolling || n && 1 !== n.length) && (e = l.getLeft(l.currentSlide), l.touchObject.curX = void 0 !== n ? n[0].pageX : i.clientX, l.touchObject.curY = void 0 !== n ? n[0].pageY : i.clientY, l.touchObject.swipeLength = Math.round(Math.sqrt(Math.pow(l.touchObject.curX - l.touchObject.startX, 2))), r = Math.round(Math.sqrt(Math.pow(l.touchObject.curY - l.touchObject.startY, 2))), !l.options.verticalSwiping && !l.swiping && r > 4 ? (l.scrolling = !0, !1) : (!0 === l.options.verticalSwiping && (l.touchObject.swipeLength = r), t = l.swipeDirection(), void 0 !== i.originalEvent && l.touchObject.swipeLength > 4 && (l.swiping = !0, i.preventDefault()), s = (!1 === l.options.rtl ? 1 : -1) * (l.touchObject.curX > l.touchObject.startX ? 1 : -1), !0 === l.options.verticalSwiping && (s = l.touchObject.curY > l.touchObject.startY ? 1 : -1), o = l.touchObject.swipeLength, l.touchObject.edgeHit = !1, !1 === l.options.infinite && (0 === l.currentSlide && "right" === t || l.currentSlide >= l.getDotCount() && "left" === t) && (o = l.touchObject.swipeLength * l.options.edgeFriction, l.touchObject.edgeHit = !0), !1 === l.options.vertical ? l.swipeLeft = e + o * s : l.swipeLeft = e + o * (l.$list.height() / l.listWidth) * s, !0 === l.options.verticalSwiping && (l.swipeLeft = e + o * s), !0 !== l.options.fade && !1 !== l.options.touchMove && (!0 === l.animating ? (l.swipeLeft = null, !1) : void l.setCSS(l.swipeLeft))))
        }, e.prototype.swipeStart = function (i)
        {
            var e, t = this;
            if (t.interrupted = !0, 1 !== t.touchObject.fingerCount || t.slideCount <= t.options.slidesToShow)
                return t.touchObject = {}, !1;
            void 0 !== i.originalEvent && void 0 !== i.originalEvent.touches && (e = i.originalEvent.touches[0]), t.touchObject.startX = t.touchObject.curX = void 0 !== e ? e.pageX : i.clientX, t.touchObject.startY = t.touchObject.curY = void 0 !== e ? e.pageY : i.clientY, t.dragging = !0
        }, e.prototype.unfilterSlides = e.prototype.Slick1Unfilter = function ()
        {
            var i = this;
            null !== i.$slidesCache && (i.unload(), i.$slideTrack.children(this.options.slide).detach(), i.$slidesCache.appendTo(i.$slideTrack), i.reinit())
        }, e.prototype.unload = function ()
        {
            var e = this;
            i(".Slick1-cloned", e.$slider).remove(), e.$dots && e.$dots.remove(), e.$prevArrow && e.htmlExpr.test(e.options.prevArrow) && e.$prevArrow.remove(), e.$nextArrow && e.htmlExpr.test(e.options.nextArrow) && e.$nextArrow.remove(), e.$slides.removeClass("Slick1-slide Slick1-active Slick1-visible Slick1-current").attr("aria-hidden", "true").css("width", "")
        }, e.prototype.unSlick1 = function (i)
        {
            var e = this;
            e.$slider.trigger("unSlick1", [e, i]), e.destroy()
        }, e.prototype.updateArrows = function ()
        {
            var i = this;
            Math.floor(i.options.slidesToShow / 2), !0 === i.options.arrows && i.slideCount > i.options.slidesToShow && !i.options.infinite && (i.$prevArrow.removeClass("Slick1-disabled").attr("aria-disabled", "false"), i.$nextArrow.removeClass("Slick1-disabled").attr("aria-disabled", "false"), 0 === i.currentSlide ? (i.$prevArrow.addClass("Slick1-disabled").attr("aria-disabled", "true"), i.$nextArrow.removeClass("Slick1-disabled").attr("aria-disabled", "false")) : i.currentSlide >= i.slideCount - i.options.slidesToShow && !1 === i.options.centerMode ? (i.$nextArrow.addClass("Slick1-disabled").attr("aria-disabled", "true"), i.$prevArrow.removeClass("Slick1-disabled").attr("aria-disabled", "false")) : i.currentSlide >= i.slideCount - 1 && !0 === i.options.centerMode && (i.$nextArrow.addClass("Slick1-disabled").attr("aria-disabled", "true"), i.$prevArrow.removeClass("Slick1-disabled").attr("aria-disabled", "false")))
        }, e.prototype.updateDots = function ()
        {
            var i = this;
            null !== i.$dots && (i.$dots.find("li").removeClass("Slick1-active").end(), i.$dots.find("li").eq(Math.floor(i.currentSlide / i.options.slidesToScroll)).addClass("Slick1-active"))
        }, e.prototype.visibility = function ()
        {
            var i = this;
            i.options.autoplay && (document[i.hidden] ? i.interrupted = !0 : i.interrupted = !1)
        }, i.fn.Slick1 = function ()
        {
            var i, t, o = this,
                    s = arguments[0],
                    n = Array.prototype.slice.call(arguments, 1),
                    r = o.length;
            for (i = 0; i < r; i++)
                if ("object" == typeof s || void 0 === s ? o[i].Slick1 = new e(o[i], s) : t = o[i].Slick1[s].apply(o[i].Slick1, n), void 0 !== t)
                    return t;
            return o
        }
    });

    var shop_name = "";
    var scripts = document.getElementsByTagName('script');
    for (var i = 0, l = scripts.length; i < l; i++)
    {
        if (scripts[i].getAttribute('data-shopname') != null)
        {
            shop_name = scripts[i].getAttribute('data-shopname');
        }
    }

    var gallery_type = "";
    var scripts = document.getElementsByTagName('script');
    for (var i = 0, l = scripts.length; i < l; i++)
    {
        if (scripts[i].getAttribute('data-gallerytype') != null)
        {
            gallery_type = scripts[i].getAttribute('data-gallerytype');
        }
    }

    console.log(gallery_type);

    function instaItemGridInner(mediaPost, md, shop_data, gallery_type)
    {
        var mp = '';
        if ((gallery_type == 'homeGallery' && shop_data.insta_new_tab == '2') || (gallery_type == 'instaPhotoFeed' && shop_data.insta_new_tab_ipf == '2'))
        {
            mp += '   <a href="' + md.permalink + '" itemprop="contentUrl" data-size="480x360" target="_blank" class="insfeed-wrap ">';
        }
        var popup_class = '';
        if (shop_data.insta_new_tab == '3' || shop_data.insta_new_tab_ipf == '3') {
            popup_class = 'popup-slide';
        }
        mp += '<div class="instafeedItemWrap ' + popup_class + '">';
        if (md.media_type != 'VIDEO')
        {
            mp += '<img class="img-thumbnail img-fluid rte__no-indent" src="' + md.permalink + 'media/?size=l" itemprop="thumbnail" alt="" />';
        } else
        {
            mp += '<video width="100%" controls  itemprop="thumbnail" class="img-thumbnail img-fluid ">' +
                    '<source src="' + md.media_url + 'media/?size=l" type="video/mp4">' +
                    'Your browser does not support HTML5 video.' +
                    '</video>';
        }
        mp += '</div>';

        var cl = false;
        if (gallery_type == 'homeGallery' && (shop_data.insta_likes_comments_show == 'true' || shop_data.insta_caption_show == 'true'))
        {
            cl = true;
        }
        if (gallery_type == 'instaPhotoFeed' && (shop_data.insta_likes_comments_show_ipf == 'true' || shop_data.insta_caption_show_ipf == 'true'))
        {
            cl = true;
        }
        if (cl)
        {
            var popup_class = '';
            if (shop_data.insta_new_tab == '3' || shop_data.insta_new_tab_ipf == '3') {
                popup_class = 'popup-slide';
            }
            mp += '<div class="infeed-sld-cont instagram-text ' + popup_class + '">';
            if ((gallery_type == 'homeGallery' && shop_data.insta_caption_show == 'true') || (gallery_type == 'instaPhotoFeed' && shop_data.insta_caption_show_ipf == 'true'))
            {   //insta logo set
                if ((shop_data.insta_new_tab == 3 && shop_data.insta_caption_show == 'true' && shop_data.insta_likes_comments_show != 'true') || (shop_data.insta_new_tab_ipf == 3 && shop_data.insta_caption_show_ipf == 'true' && shop_data.insta_likes_comments_show_ipf != 'true')) {
                    mp += ' <p><svg width="32px" height="32px" viewBox="0 0 32 32" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"><defs><polygon id="path-1" points="0.0141176471 0.176470588 0.0141176471 32 31.8235294 32 31.8235294 0.176470588"></polygon></defs><g id="WEBSITE" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd"><g id="Homepage" transform="translate(-385.000000, -3063.000000)"><g id="instagram-tiles" transform="translate(-1.000000, 2781.000000)"><g id="tiles" transform="translate(0.000000, 113.000000)"><g id="Screen-Shot-2017-09-03-at-13.47.42" transform="translate(201.000000, 0.000000)"><g id="Group-6" transform="translate(112.000000, 169.000000)"><g id="instagram-logo" transform="translate(73.000000, 0.000000)"><g id="Group-3"><mask id="mask-2" fill="white"><use xlink:href="#path-1"></use></mask><g id="Clip-2"></g><path d="M23.0414118,0.176470588 L8.78211765,0.176470588 C3.93929412,0.176470588 0,4.116 0,8.95882353 L0,23.2178824 C0,28.0607059 3.93929412,32 8.78211765,32 L23.0414118,32 C27.8842353,32 31.8235294,28.0597647 31.8235294,23.2178824 L31.8235294,8.95882353 C31.8235294,4.116 27.8842353,0.176470588 23.0414118,0.176470588 Z M29,23.2178824 C29,26.5037647 26.3272941,29.1764706 23.0414118,29.1764706 L8.78211765,29.1764706 C5.49623529,29.1764706 2.82352941,26.5037647 2.82352941,23.2178824 L2.82352941,8.95882353 C2.82352941,5.67294118 5.49623529,3 8.78211765,3 L23.0414118,3 C26.3272941,3 29,5.67294118 29,8.95882353 L29,23.2178824 Z" id="Fill-1" fill="#FFFFFF" mask="url(#mask-2)"></path></g><path d="M16,8 C11.5884311,8 8,11.5886885 8,15.9994261 C8,20.4113115 11.5884311,24 16,24 C20.4106508,24 24,20.4113115 24,15.9994261 C24,11.5886885 20.4106508,8 16,8 Z M16,21.2443794 C13.1082291,21.2443794 10.7545048,18.8923227 10.7545048,15.9994261 C10.7545048,13.1076773 13.1073109,10.7537841 16,10.7537841 C18.8926891,10.7537841 21.2454952,13.1076773 21.2454952,15.9994261 C21.2454952,18.8923227 18.8917709,21.2443794 16,21.2443794 Z" id="Fill-4" fill="#FFFFFF"></path><path d="M24.0001136,5 C23.4744617,5 22.9585819,5.21229685 22.5876939,5.58506648 C22.2138515,5.95624503 22,6.47289465 22,7.0004546 C22,7.52596886 22.2147605,8.04193658 22.5876939,8.41470622 C22.9579001,8.78588476 23.4744617,9 24.0001136,9 C24.5273564,9 25.0414181,8.78588476 25.4141242,8.41470622 C25.7870576,8.04193658 26,7.52505967 26,7.0004546 C26,6.47289465 25.7870576,5.95624503 25.4141242,5.58506648 C25.0430089,5.21229685 24.5273564,5 24.0001136,5 Z" id="Fill-5" fill="#FFFFFF"></path></g></g></g></g></g></g></g></svg><br/>';
                }
                mp += '<div class="cont-wrap">' +
                        '<p class="captionText">';
                if (md.caption != '' && md.caption != undefined && md.caption != null)
                {
                    mp += md.caption;
                }
                mp += '</p>' +
                        '</div>';
            }
            if ((gallery_type == 'homeGallery' && shop_data.insta_likes_comments_show == 'true') || (gallery_type == 'instaPhotoFeed' && shop_data.insta_likes_comments_show_ipf == 'true'))
            {
                mp += '<div class="infeed-btn-cont">' +
                        '<div class="infeed-cmt infeed-opt">' +
                        '<span>' +
                        '<svg enable-background="new 0 0 511.072 511.072" height="512" viewBox="0 0 511.072 511.072" width="30" xmlns="http://www.w3.org/2000/svg">' +
                        '<g id="Speech_Bubble_48_">' +
                        '<g>' +
                        '<path d="m74.39 480.536h-36.213l25.607-25.607c13.807-13.807 22.429-31.765 24.747-51.246-36.029-23.644-62.375-54.751-76.478-90.425-14.093-35.647-15.864-74.888-5.121-113.482 12.89-46.309 43.123-88.518 85.128-118.853 45.646-32.963 102.47-50.387 164.33-50.387 77.927 0 143.611 22.389 189.948 64.745 41.744 38.159 64.734 89.63 64.734 144.933 0 26.868-5.471 53.011-16.26 77.703-11.165 25.551-27.514 48.302-48.593 67.619-46.399 42.523-112.042 65-189.83 65-28.877 0-59.01-3.855-85.913-10.929-25.465 26.123-59.972 40.929-96.086 40.929zm182-420c-124.039 0-200.15 73.973-220.557 147.285-19.284 69.28 9.143 134.743 76.043 175.115l7.475 4.511-.23 8.727c-.456 17.274-4.574 33.912-11.945 48.952 17.949-6.073 34.236-17.083 46.99-32.151l6.342-7.493 9.405 2.813c26.393 7.894 57.104 12.241 86.477 12.241 154.372 0 224.682-93.473 224.682-180.322 0-46.776-19.524-90.384-54.976-122.79-40.713-37.216-99.397-56.888-169.706-56.888z"/>' +
                        '</g>' +
                        '</g>' +
                        '</svg>' +
                        '</span><span>' + md.comments_count + '</span></div>' +
                        '<div class="infeed-like infeed-opt">' +
                        '<span>' +
                        '<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="30" x="0px" y="0px"viewBox="0 0 512 512" style="enable-background:new 0 0 512 512;" xml:space="preserve">' +
                        '<path d="M512,304c0-12.821-5.099-24.768-13.888-33.579c9.963-10.901,15.04-25.515,13.653-40.725                c-2.496-27.115-26.923-48.363-55.637-48.363H324.352c6.528-19.819,16.981-56.149,16.981-85.333c0-46.272-39.317-85.333-64-85.333                c-22.144,0-37.995,12.48-38.656,12.992c-2.539,2.027-4.011,5.099-4.011,8.341v72.341L173.205,237.44l-2.539,1.301v-4.075                c0-5.888-4.779-10.667-10.667-10.667H53.333C23.915,224,0,247.915,0,277.333V448c0,29.419,23.915,53.333,53.333,53.333h64                c23.061,0,42.773-14.72,50.197-35.264C185.28,475.2,209.173,480,224,480h195.819c23.232,0,43.563-15.659,48.341-37.248                c2.453-11.136,1.024-22.336-3.84-32.064c15.744-7.915,26.347-24.192,26.347-42.688c0-7.552-1.728-14.784-4.992-21.312                C501.419,338.752,512,322.496,512,304z M467.008,330.325c-4.117,0.491-7.595,3.285-8.917,7.232                c-1.301,3.947-0.213,8.277,2.816,11.136c5.419,5.099,8.427,11.968,8.427,19.307c0,13.461-10.176,24.768-23.637,26.325                c-4.117,0.491-7.595,3.285-8.917,7.232c-1.301,3.947-0.213,8.277,2.816,11.136c7.019,6.613,9.835,15.893,7.723,25.451                c-2.624,11.904-14.187,20.523-27.499,20.523H224c-17.323,0-46.379-8.128-56.448-18.219c-3.051-3.029-7.659-3.925-11.627-2.304                c-3.989,1.643-6.592,5.547-6.592,9.856c0,17.643-14.357,32-32,32h-64c-17.643,0-32-14.357-32-32V277.333c0-17.643,14.357-32,32-32                h96V256c0,3.691,1.92,7.125,5.077,9.088c3.115,1.877,7.04,2.069,10.368,0.448l21.333-10.667c2.155-1.067,3.883-2.859,4.907-5.056                l64-138.667c0.64-1.408,0.981-2.944,0.981-4.48V37.781C260.437,35.328,268.139,32,277.333,32C289.024,32,320,61.056,320,96                c0,37.547-20.437,91.669-20.629,92.203c-1.237,3.264-0.811,6.955,1.173,9.856c2.005,2.88,5.291,4.608,8.789,4.608h146.795                c17.792,0,32.896,12.736,34.389,28.992c1.131,12.16-4.715,23.723-15.189,30.187c-3.264,2.005-5.205,5.632-5.056,9.493                s2.368,7.317,5.781,9.088c9.024,4.587,14.613,13.632,14.613,23.573C490.667,317.461,480.491,328.768,467.008,330.325z"/>' +
                        '<path d="M160,245.333c-5.888,0-10.667,4.779-10.667,10.667v192c0,5.888,4.779,10.667,10.667,10.667s10.667-4.779,10.667-10.667                V256C170.667,250.112,165.888,245.333,160,245.333z"/>' +
                        '</svg>' +
                        '</span><span>' + md.like_count + '</span></div>' +
                        '</div>';

            }
            mp += '</div>';
        } else
        {
            // if ((gallery_type == 'homeGallery' && shop_data.insta_hover_media_title != '') || (gallery_type == 'instaPhotoFeed' && shop_data.insta_hover_media_title_ipf != ''))
            // {
            var popup_class = '';
            if (shop_data.insta_new_tab == '3' || shop_data.insta_new_tab_ipf == '3') {
                popup_class = 'popup-slide';
            }
            mp += '<div class="infeed-sld-cont instagram-text ' + popup_class + '">';
            mp += ' <p><svg width="32px" height="32px" viewBox="0 0 32 32" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"><defs><polygon id="path-1" points="0.0141176471 0.176470588 0.0141176471 32 31.8235294 32 31.8235294 0.176470588"></polygon></defs><g id="WEBSITE" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd"><g id="Homepage" transform="translate(-385.000000, -3063.000000)"><g id="instagram-tiles" transform="translate(-1.000000, 2781.000000)"><g id="tiles" transform="translate(0.000000, 113.000000)"><g id="Screen-Shot-2017-09-03-at-13.47.42" transform="translate(201.000000, 0.000000)"><g id="Group-6" transform="translate(112.000000, 169.000000)"><g id="instagram-logo" transform="translate(73.000000, 0.000000)"><g id="Group-3"><mask id="mask-2" fill="white"><use xlink:href="#path-1"></use></mask><g id="Clip-2"></g><path d="M23.0414118,0.176470588 L8.78211765,0.176470588 C3.93929412,0.176470588 0,4.116 0,8.95882353 L0,23.2178824 C0,28.0607059 3.93929412,32 8.78211765,32 L23.0414118,32 C27.8842353,32 31.8235294,28.0597647 31.8235294,23.2178824 L31.8235294,8.95882353 C31.8235294,4.116 27.8842353,0.176470588 23.0414118,0.176470588 Z M29,23.2178824 C29,26.5037647 26.3272941,29.1764706 23.0414118,29.1764706 L8.78211765,29.1764706 C5.49623529,29.1764706 2.82352941,26.5037647 2.82352941,23.2178824 L2.82352941,8.95882353 C2.82352941,5.67294118 5.49623529,3 8.78211765,3 L23.0414118,3 C26.3272941,3 29,5.67294118 29,8.95882353 L29,23.2178824 Z" id="Fill-1" fill="#FFFFFF" mask="url(#mask-2)"></path></g><path d="M16,8 C11.5884311,8 8,11.5886885 8,15.9994261 C8,20.4113115 11.5884311,24 16,24 C20.4106508,24 24,20.4113115 24,15.9994261 C24,11.5886885 20.4106508,8 16,8 Z M16,21.2443794 C13.1082291,21.2443794 10.7545048,18.8923227 10.7545048,15.9994261 C10.7545048,13.1076773 13.1073109,10.7537841 16,10.7537841 C18.8926891,10.7537841 21.2454952,13.1076773 21.2454952,15.9994261 C21.2454952,18.8923227 18.8917709,21.2443794 16,21.2443794 Z" id="Fill-4" fill="#FFFFFF"></path><path d="M24.0001136,5 C23.4744617,5 22.9585819,5.21229685 22.5876939,5.58506648 C22.2138515,5.95624503 22,6.47289465 22,7.0004546 C22,7.52596886 22.2147605,8.04193658 22.5876939,8.41470622 C22.9579001,8.78588476 23.4744617,9 24.0001136,9 C24.5273564,9 25.0414181,8.78588476 25.4141242,8.41470622 C25.7870576,8.04193658 26,7.52505967 26,7.0004546 C26,6.47289465 25.7870576,5.95624503 25.4141242,5.58506648 C25.0430089,5.21229685 24.5273564,5 24.0001136,5 Z" id="Fill-5" fill="#FFFFFF"></path></g></g></g></g></g></g></g></svg><br/>';
            if (gallery_type == 'homeGallery')
                mp += shop_data.insta_hover_media_title;
            else
                mp += shop_data.insta_hover_media_title_ipf;

            mp += '</p>';
            mp += '</div>';
            // }
        }
        if ((gallery_type == 'homeGallery' && shop_data.insta_new_tab == '2') || (gallery_type == 'instaPhotoFeed' && shop_data.insta_new_tab_ipf == '2'))
        {
            mp += '   </a>';
        }
        return mp;
    }

    function instaItemDetailPopup(mediaPost, md, shop_data, hasItems, gallery_type)
    {
        var mp = '';
        mp += '<div class="fs-normal-timeline fs-desktop fs-prepended-detail fs-wrapper" data-itemid="slide-' + md.id + '">' +
                '<div class="fs-timeline-detail" id="slide-' + md.id + '">' +
                '<div class="fs-detail-outer-container fs-add-to-cart-enabled">' +
                '<div class="fs-detail-container" id="media-popup">' +
                '<div class="fs-detail-content ' + hasItems + '">' +
                '<div class="fs-detail-left">' +
                '<div class="fs-image-container preview-img-tag">';
        if (md.media_type != 'VIDEO')
        {
            mp += '<img class="fs-detail-image" src="' + md.permalink + 'media/?size=l" alt="">'
        } else
        {
            var popup_class = '';
            if (shop_data.insta_new_tab == '3' || shop_data.insta_new_tab_ipf == '3') {
                popup_class = 'popup-slide';
            }
            mp += '<video width="100%" controls itemprop="thumbnail" class="img-thumbnail img-fluid ' + popup_class + '">' +
                    '<source src="' + md.media_url + 'media/?size=l" type="video/mp4">' +
                    'Your browser does not support HTML5 video.' +
                    '</video>';
        }
        mp += '</div>' +
                '</div>';
        if ((gallery_type == 'homeGallery' && shop_data.insta_caption_show == 'true') || (gallery_type == 'instaPhotoFeed' && shop_data.insta_caption_show_ipf == 'true'))
        {
            if (md.caption != '' && md.caption != undefined && md.caption != null)
            {
                mp += '<div class="fs-detail-right"><div class="fs-detail-title 1">' + md.caption + '</div></div>';
            }
        }
        mp += '<div class="fs-detail-nav-bar-close">' +
                '<button class="fs-detail-nav-button popup-slide-close" data-mediaid="' + md.media_id + '" tabindex="0" role="button" aria-label="close dialog" id="fs-detail-close">' +
                '<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" version="1.1" id="Capa_1" width="30px" height="30px"  x="0px" y="0px" viewBox="0 0 512.001 512.001" style="enable-background:new 0 0 512.001 512.001;" xml:space="preserve">' +
                '<path d="M284.286,256.002L506.143,34.144c7.811-7.811,7.811-20.475,0-28.285c-7.811-7.81-20.475-7.811-28.285,0L256,227.717    L34.143,5.859c-7.811-7.811-20.475-7.811-28.285,0c-7.81,7.811-7.811,20.475,0,28.285l221.857,221.857L5.858,477.859    c-7.811,7.811-7.811,20.475,0,28.285c3.905,3.905,9.024,5.857,14.143,5.857c5.119,0,10.237-1.952,14.143-5.857L256,284.287    l221.857,221.857c3.905,3.905,9.024,5.857,14.143,5.857s10.237-1.952,14.143-5.857c7.811-7.811,7.811-20.475,0-28.285    L284.286,256.002z" />' +
                '</svg>' +
                '</button>' +
                '</div>' +
                '<div class="fs-detail-nav-bar-arrows">' +
                '<button class="fs-detail-nav-button prevItem" id="fs-prev-post" tabindex="0" role="button" aria-label="previous post" disable="disable">' +
                '<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" version="1.1" id="Capa_1" width="30px" height="30px"  x="0px" y="0px" viewBox="0 0 512 512" style="enable-background:new 0 0 512 512;" xml:space="preserve">' +
                '<path d="M379.644,477.872l-207.299-207.73c-7.798-7.798-7.798-20.486,0.015-28.299L379.643,34.128    c7.803-7.819,7.789-20.482-0.029-28.284c-7.819-7.803-20.482-7.79-28.284,0.029L144.061,213.574    c-23.394,23.394-23.394,61.459-0.015,84.838L351.33,506.127c3.907,3.915,9.031,5.873,14.157,5.873    c5.111,0,10.224-1.948,14.128-5.844C387.433,498.354,387.446,485.691,379.644,477.872z" />' +
                '</svg>' +
                '</button>' +
                '<button class="fs-detail-nav-button nextItem" id="fs-next-post" tabindex="0" role="button" aria-label="next post">' +
                '<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" version="1.1" id="Capa_1" width="30px" height="30px"  x="0px" y="0px" viewBox="0 0 512 512" style="enable-background:new 0 0 512 512;" xml:space="preserve">' +
                '<path d="M367.954,213.588L160.67,5.872c-7.804-7.819-20.467-7.831-28.284-0.029c-7.819,7.802-7.832,20.465-0.03,28.284    l207.299,207.731c7.798,7.798,7.798,20.486-0.015,28.299L132.356,477.873c-7.802,7.819-7.789,20.482,0.03,28.284    c3.903,3.896,9.016,5.843,14.127,5.843c5.125,0,10.25-1.958,14.157-5.873l207.269-207.701    C391.333,275.032,391.333,236.967,367.954,213.588z" />' +
                '</svg>' +
                '</button>' +
                '</div>' +
                '</div>' +
                '</div>' +
                '</div>' +
                '</div>' +
                '</div>';
        return mp;
    }

    function instaCustomItemGrid(mediaPost, md, shop_data, gallery_type)
    {
        var productdata = md.tagproducts;
        if ((gallery_type == 'visibleGallery' && shop_data.popup_caption == 'true') || (gallery_type == 'productGallery' && shop_data.product_gallery_caption == 'true'))
        {
            if (md.caption == null || md.caption == '' || md.caption == undefined)
                var hasItems = 'noItems';
            else
                var hasItems = '';

        } else
        {
            var hasItems = 'noItems';
        }

        if (jQuery.isEmptyObject(productdata) != true)
            var hasItems = '';

        var mp = '';

        mp += '<div class="instafeedItemWrap popup-slide">';
        if (md.media_type != 'VIDEO')
        {
            mp += '<img class="img-thumbnail img-fluid" data-mediaid="' + md.media_id + '" src="' + md.permalink + 'media/?size=l"  itemprop="thumbnail" alt="" />';
        } else
        {
            mp += '<video width="100%" controls itemprop="thumbnail" class="img-thumbnail img-fluid">' +
                    '<source src="' + md.media_url + 'media/?size=l" data-mediaid="' + md.media_id + '" type="video/mp4">' +
                    'Your browser does not support HTML5 video.' +
                    '</video>';
        }
        mp += '</div>';

        var cl = false;
        if (gallery_type == 'visibleGallery' && (shop_data.popup_like_comments == 'true' || shop_data.popup_caption == 'true'))
        {
            cl = true;
        }
        if (gallery_type == 'productGallery' && (shop_data.product_gallery_like_comments == 'true' || shop_data.product_gallery_caption == 'true'))
        {
            cl = true;
        }

        if (cl)
        {
            mp += '<div class="infeed-sld-cont instagram-text  popup-slide">';

            if ((gallery_type == 'visibleGallery' && shop_data.popup_caption == 'true') || (gallery_type == 'productGallery' && shop_data.product_gallery_caption == 'true'))
            {
                if ((gallery_type == 'visibleGallery' && shop_data.popup_caption == 'true') || (gallery_type == 'productGallery' && shop_data.product_gallery_caption == 'true')) {
                    mp += ' <p><svg width="32px" height="32px" viewBox="0 0 32 32" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"><defs><polygon id="path-1" points="0.0141176471 0.176470588 0.0141176471 32 31.8235294 32 31.8235294 0.176470588"></polygon></defs><g id="WEBSITE" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd"><g id="Homepage" transform="translate(-385.000000, -3063.000000)"><g id="instagram-tiles" transform="translate(-1.000000, 2781.000000)"><g id="tiles" transform="translate(0.000000, 113.000000)"><g id="Screen-Shot-2017-09-03-at-13.47.42" transform="translate(201.000000, 0.000000)"><g id="Group-6" transform="translate(112.000000, 169.000000)"><g id="instagram-logo" transform="translate(73.000000, 0.000000)"><g id="Group-3"><mask id="mask-2" fill="white"><use xlink:href="#path-1"></use></mask><g id="Clip-2"></g><path d="M23.0414118,0.176470588 L8.78211765,0.176470588 C3.93929412,0.176470588 0,4.116 0,8.95882353 L0,23.2178824 C0,28.0607059 3.93929412,32 8.78211765,32 L23.0414118,32 C27.8842353,32 31.8235294,28.0597647 31.8235294,23.2178824 L31.8235294,8.95882353 C31.8235294,4.116 27.8842353,0.176470588 23.0414118,0.176470588 Z M29,23.2178824 C29,26.5037647 26.3272941,29.1764706 23.0414118,29.1764706 L8.78211765,29.1764706 C5.49623529,29.1764706 2.82352941,26.5037647 2.82352941,23.2178824 L2.82352941,8.95882353 C2.82352941,5.67294118 5.49623529,3 8.78211765,3 L23.0414118,3 C26.3272941,3 29,5.67294118 29,8.95882353 L29,23.2178824 Z" id="Fill-1" fill="#FFFFFF" mask="url(#mask-2)"></path></g><path d="M16,8 C11.5884311,8 8,11.5886885 8,15.9994261 C8,20.4113115 11.5884311,24 16,24 C20.4106508,24 24,20.4113115 24,15.9994261 C24,11.5886885 20.4106508,8 16,8 Z M16,21.2443794 C13.1082291,21.2443794 10.7545048,18.8923227 10.7545048,15.9994261 C10.7545048,13.1076773 13.1073109,10.7537841 16,10.7537841 C18.8926891,10.7537841 21.2454952,13.1076773 21.2454952,15.9994261 C21.2454952,18.8923227 18.8917709,21.2443794 16,21.2443794 Z" id="Fill-4" fill="#FFFFFF"></path><path d="M24.0001136,5 C23.4744617,5 22.9585819,5.21229685 22.5876939,5.58506648 C22.2138515,5.95624503 22,6.47289465 22,7.0004546 C22,7.52596886 22.2147605,8.04193658 22.5876939,8.41470622 C22.9579001,8.78588476 23.4744617,9 24.0001136,9 C24.5273564,9 25.0414181,8.78588476 25.4141242,8.41470622 C25.7870576,8.04193658 26,7.52505967 26,7.0004546 C26,6.47289465 25.7870576,5.95624503 25.4141242,5.58506648 C25.0430089,5.21229685 24.5273564,5 24.0001136,5 Z" id="Fill-5" fill="#FFFFFF"></path></g></g></g></g></g></g></g></svg><br/>';
                }
                mp += '<div class="cont-wrap">' +
                        '<p class="captionText">';

                if (md.caption != '' && md.caption != undefined && md.caption != null)
                {
                    mp += md.caption;
                }
                mp += '</p>' +
                        '</div>';
            }

            if ((gallery_type == 'visibleGallery' && shop_data.popup_like_comments == 'true') || (gallery_type == 'productGallery' && shop_data.product_gallery_like_comments == 'true'))
            {
                mp += '<div class="infeed-btn-cont">' +
                        '<div class="infeed-cmt infeed-opt">' +
                        '<span>' +
                        '<svg enable-background="new 0 0 511.072 511.072" height="512" viewBox="0 0 511.072 511.072" width="30" xmlns="http://www.w3.org/2000/svg">' +
                        '<g id="Speech_Bubble_48_">' +
                        '<g>' +
                        '<path d="m74.39 480.536h-36.213l25.607-25.607c13.807-13.807 22.429-31.765 24.747-51.246-36.029-23.644-62.375-54.751-76.478-90.425-14.093-35.647-15.864-74.888-5.121-113.482 12.89-46.309 43.123-88.518 85.128-118.853 45.646-32.963 102.47-50.387 164.33-50.387 77.927 0 143.611 22.389 189.948 64.745 41.744 38.159 64.734 89.63 64.734 144.933 0 26.868-5.471 53.011-16.26 77.703-11.165 25.551-27.514 48.302-48.593 67.619-46.399 42.523-112.042 65-189.83 65-28.877 0-59.01-3.855-85.913-10.929-25.465 26.123-59.972 40.929-96.086 40.929zm182-420c-124.039 0-200.15 73.973-220.557 147.285-19.284 69.28 9.143 134.743 76.043 175.115l7.475 4.511-.23 8.727c-.456 17.274-4.574 33.912-11.945 48.952 17.949-6.073 34.236-17.083 46.99-32.151l6.342-7.493 9.405 2.813c26.393 7.894 57.104 12.241 86.477 12.241 154.372 0 224.682-93.473 224.682-180.322 0-46.776-19.524-90.384-54.976-122.79-40.713-37.216-99.397-56.888-169.706-56.888z"/>' +
                        '</g>' +
                        '</g>' +
                        '</svg>' +
                        '</span><span>' + md.comments_count + '</span></div>' +
                        '<div class="infeed-like infeed-opt">' +
                        '<span>' +
                        '<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="30" x="0px" y="0px"viewBox="0 0 512 512" style="enable-background:new 0 0 512 512;" xml:space="preserve">' +
                        '<path d="M512,304c0-12.821-5.099-24.768-13.888-33.579c9.963-10.901,15.04-25.515,13.653-40.725                c-2.496-27.115-26.923-48.363-55.637-48.363H324.352c6.528-19.819,16.981-56.149,16.981-85.333c0-46.272-39.317-85.333-64-85.333                c-22.144,0-37.995,12.48-38.656,12.992c-2.539,2.027-4.011,5.099-4.011,8.341v72.341L173.205,237.44l-2.539,1.301v-4.075                c0-5.888-4.779-10.667-10.667-10.667H53.333C23.915,224,0,247.915,0,277.333V448c0,29.419,23.915,53.333,53.333,53.333h64                c23.061,0,42.773-14.72,50.197-35.264C185.28,475.2,209.173,480,224,480h195.819c23.232,0,43.563-15.659,48.341-37.248                c2.453-11.136,1.024-22.336-3.84-32.064c15.744-7.915,26.347-24.192,26.347-42.688c0-7.552-1.728-14.784-4.992-21.312                C501.419,338.752,512,322.496,512,304z M467.008,330.325c-4.117,0.491-7.595,3.285-8.917,7.232                c-1.301,3.947-0.213,8.277,2.816,11.136c5.419,5.099,8.427,11.968,8.427,19.307c0,13.461-10.176,24.768-23.637,26.325                c-4.117,0.491-7.595,3.285-8.917,7.232c-1.301,3.947-0.213,8.277,2.816,11.136c7.019,6.613,9.835,15.893,7.723,25.451                c-2.624,11.904-14.187,20.523-27.499,20.523H224c-17.323,0-46.379-8.128-56.448-18.219c-3.051-3.029-7.659-3.925-11.627-2.304                c-3.989,1.643-6.592,5.547-6.592,9.856c0,17.643-14.357,32-32,32h-64c-17.643,0-32-14.357-32-32V277.333c0-17.643,14.357-32,32-32                h96V256c0,3.691,1.92,7.125,5.077,9.088c3.115,1.877,7.04,2.069,10.368,0.448l21.333-10.667c2.155-1.067,3.883-2.859,4.907-5.056                l64-138.667c0.64-1.408,0.981-2.944,0.981-4.48V37.781C260.437,35.328,268.139,32,277.333,32C289.024,32,320,61.056,320,96                c0,37.547-20.437,91.669-20.629,92.203c-1.237,3.264-0.811,6.955,1.173,9.856c2.005,2.88,5.291,4.608,8.789,4.608h146.795                c17.792,0,32.896,12.736,34.389,28.992c1.131,12.16-4.715,23.723-15.189,30.187c-3.264,2.005-5.205,5.632-5.056,9.493                s2.368,7.317,5.781,9.088c9.024,4.587,14.613,13.632,14.613,23.573C490.667,317.461,480.491,328.768,467.008,330.325z"/>' +
                        '<path d="M160,245.333c-5.888,0-10.667,4.779-10.667,10.667v192c0,5.888,4.779,10.667,10.667,10.667s10.667-4.779,10.667-10.667                V256C170.667,250.112,165.888,245.333,160,245.333z"/>' +
                        '</svg>' +
                        '</span><span>' + md.like_count + '</span></div>' +
                        '</div>';
            }
            mp += '</div>';
        } else
        {
            if ((gallery_type == 'visibleGallery' && shop_data.popup_hover_media_title != '') || (gallery_type == 'productGallery' && shop_data.product_gallery_hover_media_title != ''))
            {
                mp += '<div class="shop-hover popup-slide">' +
                        '<p> <svg width="32px" height="32px" viewBox="0 0 32 32" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"><defs><polygon id="path-1" points="0.0141176471 0.176470588 0.0141176471 32 31.8235294 32 31.8235294 0.176470588"></polygon></defs><g id="WEBSITE" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd"><g id="Homepage" transform="translate(-385.000000, -3063.000000)"><g id="instagram-tiles" transform="translate(-1.000000, 2781.000000)"><g id="tiles" transform="translate(0.000000, 113.000000)"><g id="Screen-Shot-2017-09-03-at-13.47.42" transform="translate(201.000000, 0.000000)"><g id="Group-6" transform="translate(112.000000, 169.000000)"><g id="instagram-logo" transform="translate(73.000000, 0.000000)"><g id="Group-3"><mask id="mask-2" fill="white"><use xlink:href="#path-1"></use></mask><g id="Clip-2"></g><path d="M23.0414118,0.176470588 L8.78211765,0.176470588 C3.93929412,0.176470588 0,4.116 0,8.95882353 L0,23.2178824 C0,28.0607059 3.93929412,32 8.78211765,32 L23.0414118,32 C27.8842353,32 31.8235294,28.0597647 31.8235294,23.2178824 L31.8235294,8.95882353 C31.8235294,4.116 27.8842353,0.176470588 23.0414118,0.176470588 Z M29,23.2178824 C29,26.5037647 26.3272941,29.1764706 23.0414118,29.1764706 L8.78211765,29.1764706 C5.49623529,29.1764706 2.82352941,26.5037647 2.82352941,23.2178824 L2.82352941,8.95882353 C2.82352941,5.67294118 5.49623529,3 8.78211765,3 L23.0414118,3 C26.3272941,3 29,5.67294118 29,8.95882353 L29,23.2178824 Z" id="Fill-1" fill="#FFFFFF" mask="url(#mask-2)"></path></g><path d="M16,8 C11.5884311,8 8,11.5886885 8,15.9994261 C8,20.4113115 11.5884311,24 16,24 C20.4106508,24 24,20.4113115 24,15.9994261 C24,11.5886885 20.4106508,8 16,8 Z M16,21.2443794 C13.1082291,21.2443794 10.7545048,18.8923227 10.7545048,15.9994261 C10.7545048,13.1076773 13.1073109,10.7537841 16,10.7537841 C18.8926891,10.7537841 21.2454952,13.1076773 21.2454952,15.9994261 C21.2454952,18.8923227 18.8917709,21.2443794 16,21.2443794 Z" id="Fill-4" fill="#FFFFFF"></path><path d="M24.0001136,5 C23.4744617,5 22.9585819,5.21229685 22.5876939,5.58506648 C22.2138515,5.95624503 22,6.47289465 22,7.0004546 C22,7.52596886 22.2147605,8.04193658 22.5876939,8.41470622 C22.9579001,8.78588476 23.4744617,9 24.0001136,9 C24.5273564,9 25.0414181,8.78588476 25.4141242,8.41470622 C25.7870576,8.04193658 26,7.52505967 26,7.0004546 C26,6.47289465 25.7870576,5.95624503 25.4141242,5.58506648 C25.0430089,5.21229685 24.5273564,5 24.0001136,5 Z" id="Fill-5"></path></g></g></g></g></g></g></g></svg> <br/>';
                if (gallery_type == 'visibleGallery')
                    mp += shop_data.popup_hover_media_title;
                else
                    mp += shop_data.product_gallery_hover_media_title;
                mp += '</p>' +
                        '</div>';
            }
        }
        mp += '<div class="fs-normal-timeline fs-desktop fs-prepended-detail fs-wrapper"  data-itemid="slide-' + md.id + '">' +
                '<div class="fs-timeline-detail" id="slide-' + md.media_id + '">' +
                '<div class="fs-detail-outer-container fs-add-to-cart-enabled">' +
                '<div class="fs-detail-container" id="media-popup">' +
                '<div class="fs-detail-content ' + hasItems + '">' +
                '<div class="fs-detail-left">' +
                '<div class="fs-image-container preview-img-tag">';
        if (md.media_type != 'VIDEO')
        {
            mp += '<img class="fs-detail-image" src="' + md.permalink + 'media/?size=l" alt="">' +
                    '<div class="span-pos-add">';
            if (jQuery.isEmptyObject(productdata) != true)
            {
                var pro_cnt = 1;
                jQuery.each(productdata, function (i, n)
                {
                    mp += "<span class='pro-tag' id='test-" + i + "' style='left:" + productdata[i].left + "%;top:" + productdata[i].top + "%'>" + pro_cnt + "</span>";
                    pro_cnt++;
                });
            }
            mp += '</div>';
        } else
        {
            mp += '<video width="100%" controls itemprop="thumbnail" class="img-thumbnail img-fluid">' +
                    '<source src="' + md.media_url + 'media/?size=l" type="video/mp4">' +
                    'Your browser does not support HTML5 video.' +
                    '</video>';
        }
        mp += '</div>' +
                '</div>';
        if ((gallery_type == 'visibleGallery' && ((md.caption != '' && md.caption != undefined && md.caption != null) || productdata.length > 0)) || (gallery_type == 'productGallery' && ((md.caption != '' && md.caption != undefined && md.caption != null) || productdata.length > 0)))
        {
            mp += '<div class="fs-detail-right">';
            mp += '<div class="fs-products-title fs-single-product"></div>';
            var spanTag = '';
            if (jQuery.isEmptyObject(productdata) != true)
            {
                if (gallery_type == 'visibleGallery')
                    mp += '<center><h4>' + shop_data.popup_tag_item_media_title + '</h4></center>';
                else
                    mp += '<center><h4>' + shop_data.product_gallery_tag_item_media_title + '</h4></center>';
            }
            mp += '<div class="fs-detail-products">';

            if (jQuery.isEmptyObject(productdata) != true)
            {
                jQuery.each(productdata, function (i, n)
                {
                    var title = 'ADD TO CART';
                    if (shop_data.addtocart_title != null && shop_data.addtocart_title != undefined && shop_data.addtocart_title != '') {
                        title = shop_data.addtocart_title;
                    }
                    mp += '<div class="fs-product-column">' +
                            '<a class="fs-shop-link fs-link-list" href="#">' +
                            ' <div class="fs-detail-product-container fs-single-product">' +
                            '<img class="fs-detail-product-image" src="' + productdata[i].product_image + '" alt="Hybrid image">' +
                            '<div class="fs-underline"></div>' +
                            '</div>' +
                            '</a>' +
                            '<div class="fs-shopify-options  fs-single-product" data-link-id="4762850">' +
                            '<div class="fs-view">' +
                            '<a href="#">' +
                            '<span class="fs-product-name">' + productdata[i].product_name + '</span>' +
                            '<div class="fs-product-price">$' + productdata[i].product_price + '</div>' +
                            '</a>' +
                            '</div>' +
                            '<div class="fs-add">'

                            +
                            '<button class="fs-shopify-add-cart fs-shopify-add-cart-container" data-shop="' + shop_data.shop_domain + '" data-addtocart_title="' + title + '" data-soldout_title="' + shop_data.soldout_title + '" data-cancel_title="' + shop_data.cancel_title + '" data-added_text_title="' + shop_data.added_text_title + '" data-continue_shopping_text_title="' + shop_data.continue_shopping_text_title + '" data-checkout_title="' + shop_data.checkout_title + '" data-handle="' + productdata[i].product_handle + '"><span>' + title + '</span></button>' +
                            '</div>' +
                            '</div>' +
                            '</div>';
                });
            }
            mp += '</div>' +
                    '<div style="clear:both;"></div>';

            if ((gallery_type == 'visibleGallery' && shop_data.popup_caption == 'true') || (gallery_type == 'productGallery' && shop_data.product_gallery_caption == 'true'))
            {

                if (md.caption != '' && md.caption != undefined && md.caption != null)
                {
                    mp += '<div class="fs-detail-title 2">' + md.caption + '</div>';
                }
            }
            mp += '</div>';
        }
        mp += '<div class="fs-detail-nav-bar-close">' +
                '<button class="fs-detail-nav-button popup-slide-close" data-mediaid="' + md.media_id + '" tabindex="0" role="button" aria-label="close dialog" id="fs-detail-close">' +
                '<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" version="1.1" id="Capa_1" width="30px" height="30px"  x="0px" y="0px" viewBox="0 0 512.001 512.001" style="enable-background:new 0 0 512.001 512.001;" xml:space="preserve">' +
                '<path d="M284.286,256.002L506.143,34.144c7.811-7.811,7.811-20.475,0-28.285c-7.811-7.81-20.475-7.811-28.285,0L256,227.717    L34.143,5.859c-7.811-7.811-20.475-7.811-28.285,0c-7.81,7.811-7.811,20.475,0,28.285l221.857,221.857L5.858,477.859    c-7.811,7.811-7.811,20.475,0,28.285c3.905,3.905,9.024,5.857,14.143,5.857c5.119,0,10.237-1.952,14.143-5.857L256,284.287    l221.857,221.857c3.905,3.905,9.024,5.857,14.143,5.857s10.237-1.952,14.143-5.857c7.811-7.811,7.811-20.475,0-28.285    L284.286,256.002z" />' +
                '</svg>' +
                '</button>' +
                '</div>' +
                '<div class="fs-detail-nav-bar-arrows">' +
                '<button class="fs-detail-nav-button prevItem" id="fs-prev-post" tabindex="0" role="button" aria-label="previous post" disable="disable">' +
                '<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" version="1.1" id="Capa_1" width="30px" height="30px"  x="0px" y="0px" viewBox="0 0 512 512" style="enable-background:new 0 0 512 512;" xml:space="preserve">' +
                '<path d="M379.644,477.872l-207.299-207.73c-7.798-7.798-7.798-20.486,0.015-28.299L379.643,34.128    c7.803-7.819,7.789-20.482-0.029-28.284c-7.819-7.803-20.482-7.79-28.284,0.029L144.061,213.574    c-23.394,23.394-23.394,61.459-0.015,84.838L351.33,506.127c3.907,3.915,9.031,5.873,14.157,5.873    c5.111,0,10.224-1.948,14.128-5.844C387.433,498.354,387.446,485.691,379.644,477.872z" />' +
                '</svg>' +
                '</button>' +
                '<button class="fs-detail-nav-button nextItem" id="fs-next-post" tabindex="0" role="button" aria-label="next post">' +
                '<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" version="1.1" id="Capa_1" width="30px" height="30px"  x="0px" y="0px" viewBox="0 0 512 512" style="enable-background:new 0 0 512 512;" xml:space="preserve">' +
                '<path d="M367.954,213.588L160.67,5.872c-7.804-7.819-20.467-7.831-28.284-0.029c-7.819,7.802-7.832,20.465-0.03,28.284    l207.299,207.731c7.798,7.798,7.798,20.486-0.015,28.299L132.356,477.873c-7.802,7.819-7.789,20.482,0.03,28.284    c3.903,3.896,9.016,5.843,14.127,5.843c5.125,0,10.25-1.958,14.157-5.873l207.269-207.701    C391.333,275.032,391.333,236.967,367.954,213.588z" />' +
                '</svg>' +
                '</button>' +
                '</div>' +
                '</div>' +
                '</div><div class="fs-buy-container fs-unslid">   </div>' +
                '</div>' +
                '</div>' +
                '</div>';
        return mp;
    }

    if (shop_name != '' && shop_name != undefined && shop_name != null)
    {
        jQuery.ajax(
                {
                    url: BASE_URLINS + "insta-feed-fronted",
                    type: "GET",
                    data:
                            {
                                shop: shop_name,
                                gallery_type: gallery_type,
                                pageno: pageno,
                                product_handle: product_handle
                            },
                    dataType: "json",
                    //processData: false,
                    success: function (result)
                    {
                        if (result.msg == 200)
                        {
                            var Base_path = result.Base_url;
                            var shop_data = result.shop_data;
                            var mediaPost = '';
                            var cnt = 0;
                            var index = 0;
                            var csInstaCSS = '';

                            if (gallery_type == "homeGallery")
                            {


                                csInstaCSS += '<style>';
                                csInstaCSS += '#cs-instagram-feed-homeGallery .insta_images h3 { color: ' + shop_data.insta_heading_color + '; }';
                                csInstaCSS += '#cs-instagram-feed-homeGallery .instagram-text {background-color: ' + shop_data.insta_overlay_color + '; }';
                                csInstaCSS += '#cs-instagram-feed-homeGallery .captionText, #cs-instagram-feed-homeGallery span { color: ' + shop_data.insta_font_color + ' }';
                                csInstaCSS += '#cs-instagram-feed-homeGallery svg path { fill: ' + shop_data.insta_font_color + ' }';
                                csInstaCSS += '#cs-instagram-feed-homeGallery .instagram-text p {color: ' + shop_data.insta_font_color + '; }';
                                csInstaCSS += '</style>';


                                if (shop_data.insta_likes_comments_show == 'true')
                                {
                                    jQuery("#evmlikecomment").attr("checked", true);
                                    jQuery(".infeed-btn-cont").show();
                                } else
                                {
                                    jQuery("#evmlikecomment").attr("checked", false);
                                    jQuery(".infeed-btn-cont").hide();
                                }

                                //insta media

                                var mediadata = result.data;
                                var totalData = mediadata.length;

                                if (shop_data.insta_grid_choice != 'insta_slider')
                                {
                                    // console.log('insta_templte - '+shop_data.insta_templte);
                                    if (shop_data.insta_templte == 0)
                                    {
                                        var class_home = "";
                                        mediaPost += '' +
                                                '<div id="image-gallery" class="cardbox insta_images">' +
                                                '<div><center><h3>' + shop_data.insta_grid_title + '</h3></center></div>' +
                                                '<div class="card-content collapse show">' +
                                                '<div class="card-body  my-gallery" itemscope itemtype="">' +
                                                '<div class="row homeGallery gallery cs-row insta_images_card" data-link="' + shop_data.insta_new_tab + '">';
                                        jQuery.each(mediadata, function (i, n)
                                        {

                                            mediaPost += ' <figure class="cs-col-' + shop_data.insta_item_per_rows + ' cs-col-mob-' + shop_data.insta_mobile_item_per_rows + ' full-overlay instagram-item" itemprop="associatedMedia" itemscope itemtype="">';

                                            var x = instaItemGridInner(mediaPost, mediadata[i], shop_data, gallery_type);
                                            mediaPost += x;

                                            if (shop_data.insta_new_tab == '3')
                                            {

                                                if (mediadata[i].caption == '' || mediadata[i].caption == null || shop_data.insta_caption_show == 'false')
                                                    var hasItems = 'noItems';
                                                else
                                                    var hasItems = '';

                                                var y = instaItemDetailPopup(mediaPost, mediadata[i], shop_data, hasItems, gallery_type);
                                                mediaPost += y;

                                            }
                                            if (shop_data.insta_new_tab == '2' && mediadata[i].media_type == "CAROUSEL_ALBUM")
                                            {
                                                mediaPost += '<span class="multipal-img"><img src="' + BASE_URLINS + 'static/assets/images/other/multiple-img.png" alt="" /></span>';
                                            }
                                            mediaPost += ' </figure>';
                                        });
                                        mediaPost += '</div>';
                                        if (gallery_type == "instaPhotoFeed")
                                        {
                                            mediaPost += '<div class="load-more-btn">' +
                                                    '</div>';
                                        }
                                        mediaPost += '</div>' +
                                                '</div>' +
                                                '</div>';
                                    } else if (shop_data.insta_templte == 1)
                                    {
                                        mediaPost += '<div class="insta_images">' +
                                                '<div><center><h3>' + shop_data.insta_grid_title + '</h3></center></div>' +
                                                '<div class="instagram-gid grid-type-1 mobile-items-' + shop_data.insta_mobile_item_per_rows + ' insta_images_card" data-link="' + shop_data.insta_new_tab + '">';
                                        var grid_type = 4;
                                        for (i = 0; index < mediadata.length; i++)
                                        {
                                            if (grid_type == 4)
                                            {
                                                for (j = 0; j < 4; j++)
                                                {
                                                    if (index >= totalData)
                                                    {
                                                        break;
                                                    }
                                                    if (j == 0)
                                                    {
                                                        mediaPost += '<div class="instagram-item grid">';
                                                    }

                                                    mediaPost += '<div class="grid-inner-item " type="' + mediadata[index].media_type + '">';
                                                    // console.log(mediadata[index].media_type);
                                                    var x = instaItemGridInner(mediaPost, mediadata[index], shop_data, gallery_type);
                                                    mediaPost += x;

                                                    if (shop_data.insta_new_tab == '3')
                                                    {

                                                        if (mediadata[index].caption == '' || mediadata[index].caption == null || shop_data.insta_caption_show == 'false')
                                                            var hasItems = 'noItems';
                                                        else
                                                            var hasItems = '';

                                                        var y = instaItemDetailPopup(mediaPost, mediadata[index], shop_data, hasItems, gallery_type);
                                                        mediaPost += y;

                                                    }
                                                    if (shop_data.insta_new_tab == '2' && mediadata[index].media_type == "CAROUSEL_ALBUM")
                                                    {
                                                        mediaPost += '<span class="multipal-img"><img src="' + BASE_URLINS + 'static/assets/images/other/multiple-img.png" alt="" /></span>';
                                                    }
                                                    mediaPost += '</div>';

                                                    if (j == 3)
                                                    {
                                                        mediaPost += '</div>';
                                                    }
                                                    index++;
                                                    cnt++;
                                                }
                                                grid_type = 1;
                                            } else
                                            {
                                                if (index >= totalData)
                                                {
                                                    break;
                                                }
                                                if (mediadata[index].media_type != "VIDEO")
                                                {
                                                    mediaPost += '<div class="instagram-item" type="' + mediadata[index].media_type + '">';

                                                    var x = instaItemGridInner(mediaPost, mediadata[index], shop_data, gallery_type);
                                                    mediaPost += x;

                                                    if (shop_data.insta_new_tab == '3')
                                                    {

                                                        if (mediadata[index].caption == '' || mediadata[index].caption == null || shop_data.insta_caption_show == 'false')
                                                            var hasItems = 'noItems';
                                                        else
                                                            var hasItems = '';

                                                        var y = instaItemDetailPopup(mediaPost, mediadata[index], shop_data, hasItems, gallery_type);
                                                        mediaPost += y;

                                                    }
                                                    if (shop_data.insta_new_tab == '2' && mediadata[index].media_type == "CAROUSEL_ALBUM")
                                                    {
                                                        mediaPost += '<span class="multipal-img"><img src="' + BASE_URLINS + 'static/assets/images/other/multiple-img.png" alt="" /></span>';
                                                    }
                                                    mediaPost += '</div>';
                                                    index++;
                                                    cnt++;
                                                    grid_type = 4;
                                                }
                                            }
                                            if (cnt == 10)
                                            {
                                                cnt = 0;
                                                grid_type = grid_type == 1 ? 4 : 1;
                                            }
                                        }
                                        mediaPost += '</div>';
                                        if (gallery_type == "instaPhotoFeed")
                                        {
                                            mediaPost += '<div class="load-more-btn">' +
                                                    '</div>';
                                        }
                                        mediaPost += '</div>';
                                    } else if (shop_data.insta_templte == 2)
                                    {
                                        var grid_type = 2;
                                        var row_type = 1;
                                        var row_cnt = 0;
                                        mediaPost += '<div class="insta_images">' +
                                                '<div><center><h3>' + shop_data.insta_grid_title + '</h3></center></div>' +
                                                '<div class="instagram-gid grid-type-2 mobile-items-' + shop_data.insta_mobile_item_per_rows + ' insta_images_card" data-link="' + shop_data.insta_new_tab + '">';
                                        for (i = 0; index < totalData; i++)
                                        {
                                            if (grid_type == 2)
                                            {
                                                for (j = 0; j < 2; j++)
                                                {
                                                    if (index >= totalData)
                                                    {
                                                        break;
                                                    }
                                                    if (j == 0)
                                                    {
                                                        mediaPost += '<div class="instagram-item grid">';
                                                    }
                                                    mediaPost += '<div class="grid-inner-item" type="' + mediadata[index].media_type + '">';
                                                    var x = instaItemGridInner(mediaPost, mediadata[index], shop_data, gallery_type);
                                                    mediaPost += x;
                                                    if (shop_data.insta_new_tab == '3')
                                                    {
                                                        if (mediadata[index].caption == '' || mediadata[index].caption == null || shop_data.insta_caption_show == 'false')
                                                            var hasItems = 'noItems';
                                                        else
                                                            var hasItems = '';
                                                        var y = instaItemDetailPopup(mediaPost, mediadata[index], shop_data, hasItems, gallery_type);
                                                        mediaPost += y;
                                                    }
                                                    if (shop_data.insta_new_tab == '2' && mediadata[index].media_type == "CAROUSEL_ALBUM")
                                                    {
                                                        mediaPost += '<span class="multipal-img"><img src="' + BASE_URLINS + 'static/assets/images/other/multiple-img.png" alt="" /></span>';
                                                    }
                                                    mediaPost += '</div>';
                                                    if (j == 1)
                                                    {
                                                        mediaPost += '</div>';
                                                    }
                                                    index++;
                                                    cnt++;
                                                    row_cnt++;
                                                }
                                                grid_type = 1;
                                            } else
                                            {
                                                if (index >= totalData)
                                                {
                                                    break;
                                                }
                                                mediaPost += '<div class="instagram-item" type="' + mediadata[index].media_type + '">';
                                                var x = instaItemGridInner(mediaPost, mediadata[index], shop_data, gallery_type);
                                                mediaPost += x;
                                                if (shop_data.insta_new_tab == '3')
                                                {

                                                    if (mediadata[index].caption == '' || mediadata[index].caption == null || shop_data.insta_caption_show == 'false')
                                                        var hasItems = 'noItems';
                                                    else
                                                        var hasItems = '';

                                                    var y = instaItemDetailPopup(mediaPost, mediadata[index], shop_data, hasItems, gallery_type);
                                                    mediaPost += y;
                                                }
                                                if (shop_data.insta_new_tab == '2' && mediadata[index].media_type == "CAROUSEL_ALBUM")
                                                {
                                                    mediaPost += '<span class="multipal-img"><img src="' + BASE_URLINS + 'static/assets/images/other/multiple-img.png" alt="" /></span>';
                                                }
                                                mediaPost += '</div>';
                                                index++;
                                                cnt++;
                                                row_cnt++;
                                                grid_type = 2;
                                            }

                                            if (row_type == 1 && row_cnt == 5)
                                            {
                                                grid_type = grid_type == 1 ? 2 : 1;
                                            }
                                            if (row_type == 2 && row_cnt == 6)
                                            {
                                                grid_type = grid_type == 1 ? 2 : 1;
                                            }

                                            if (cnt == 8)
                                            {
                                                cnt = 0;
                                                row_cnt = 0;
                                                row_type = row_type == 1 ? 2 : 1;
                                                grid_type = grid_type == 1 ? 2 : 1;
                                            }
                                        }
                                        mediaPost += '</div>';
                                        if (gallery_type == "instaPhotoFeed")
                                        {
                                            mediaPost += '<div class="load-more-btn">' +
                                                    '</div>';
                                        }
                                        mediaPost += '</div>';
                                    } else if (shop_data.insta_templte == 3)
                                    {
                                        var grid_type = [
                                            [6, 1, 2],
                                            [2, 1, 6]
                                        ];
                                        var row_type = 1;
                                        mediaPost += '<div class="insta_images">' +
                                                '<div><center><h3>' + shop_data.insta_grid_title + '</h3></center></div>' +
                                                '<div class="instagram-gid grid-type-3 mobile-items-' + shop_data.insta_mobile_item_per_rows + ' insta_images_card" data-link="' + shop_data.insta_new_tab + '">';
                                        for (i = 0; index < totalData; i++)
                                        {
                                            var grid_type_index = (row_type == 1 ? 0 : 1);
                                            jQuery.each(grid_type[grid_type_index], function (grid_index, img_display)
                                            {
                                                if (img_display > 1)
                                                {
                                                    for (j = 0; j < img_display; j++)
                                                    {
                                                        if (index >= totalData)
                                                        {
                                                            return false;
                                                        }
                                                        if (j % 2 == 0)
                                                        {
                                                            mediaPost += '<div class="instagram-item grid">';
                                                        }
                                                        mediaPost += '<div class="grid-inner-item" type="' + mediadata[index].media_type + '">';
                                                        var x = instaItemGridInner(mediaPost, mediadata[index], shop_data, gallery_type);
                                                        mediaPost += x;
                                                        if (shop_data.insta_new_tab == '3')
                                                        {
                                                            if (mediadata[index].caption == '' || mediadata[index].caption == null || shop_data.insta_caption_show == 'false')
                                                                var hasItems = 'noItems';
                                                            else
                                                                var hasItems = '';
                                                            var y = instaItemDetailPopup(mediaPost, mediadata[index], shop_data, hasItems, gallery_type);
                                                            mediaPost += y;
                                                        }
                                                        if (shop_data.insta_new_tab == '2' && mediadata[index].media_type == "CAROUSEL_ALBUM")
                                                        {
                                                            mediaPost += '<span class="multipal-img"><img src="' + BASE_URLINS + 'static/assets/images/other/multiple-img.png" alt="" /></span>';
                                                        }
                                                        mediaPost += '</div>';
                                                        if (Math.abs(j % 2) == 1)
                                                        {
                                                            mediaPost += '</div>';
                                                        }
                                                        index++;
                                                        cnt++;
                                                    }
                                                } else
                                                {
                                                    if (index >= totalData)
                                                    {
                                                        return false;
                                                    }
                                                    mediaPost += '<div class="instagram-item" type="' + mediadata[index].media_type + '">';
                                                    var x = instaItemGridInner(mediaPost, mediadata[index], shop_data, gallery_type);
                                                    mediaPost += x;
                                                    if (shop_data.insta_new_tab == '3')
                                                    {
                                                        if (mediadata[index].caption == '' || mediadata[index].caption == null || shop_data.insta_caption_show == 'false')
                                                            var hasItems = 'noItems';
                                                        else
                                                            var hasItems = '';
                                                        var y = instaItemDetailPopup(mediaPost, mediadata[index], shop_data, hasItems, gallery_type);
                                                        mediaPost += y;
                                                    }
                                                    if (shop_data.insta_new_tab == '2' && mediadata[index].media_type == "CAROUSEL_ALBUM")
                                                    {
                                                        mediaPost += '<span class="multipal-img"><img src="' + BASE_URLINS + 'static/assets/images/other/multiple-img.png" alt="" /></span>';
                                                    }
                                                    mediaPost += '</div>';
                                                    index++;
                                                    cnt++;
                                                }
                                            });
                                            if (cnt == 9)
                                            {
                                                cnt = 0;
                                                row_type = row_type == 1 ? 2 : 1;
                                            }
                                        }
                                        mediaPost += '</div>';
                                        if (gallery_type == "instaPhotoFeed")
                                        {
                                            mediaPost += '<div class="load-more-btn">' +
                                                    '</div>';
                                        }
                                        mediaPost += '</div>';
                                    } else if (shop_data.insta_templte == 4)
                                    {
                                        var grid_type = 4;
                                        mediaPost += '<div class="insta_images">' +
                                                '<div><center><h3>' + shop_data.insta_grid_title + '</h3></center></div>' +
                                                '<div class="instagram-gid grid-type-4 mobile-items-' + shop_data.insta_mobile_item_per_rows + ' insta_images_card" data-link="' + shop_data.insta_new_tab + '">';
                                        for (i = 0; index < mediadata.length; i++)
                                        {
                                            if (grid_type == 4)
                                            {
                                                for (j = 0; j < 4; j++)
                                                {
                                                    if (index >= totalData)
                                                    {
                                                        break;
                                                    }
                                                    if (j == 0)
                                                    {
                                                        mediaPost += '<div class="instagram-item grid">';
                                                    }
                                                    mediaPost += '<div class="grid-inner-item" type="' + mediadata[index].media_type + '">';
                                                    var x = instaItemGridInner(mediaPost, mediadata[index], shop_data, gallery_type);
                                                    mediaPost += x;
                                                    if (shop_data.insta_new_tab == '3')
                                                    {
                                                        if (mediadata[index].caption == '' || mediadata[index].caption == null || shop_data.insta_caption_show == 'false')
                                                            var hasItems = 'noItems';
                                                        else
                                                            var hasItems = '';
                                                        var y = instaItemDetailPopup(mediaPost, mediadata[index], shop_data, hasItems, gallery_type);
                                                        mediaPost += y;
                                                    }
                                                    if (shop_data.insta_new_tab == '2' && mediadata[index].media_type == "CAROUSEL_ALBUM")
                                                    {
                                                        mediaPost += '<span class="multipal-img"><img src="' + BASE_URLINS + 'static/assets/images/other/multiple-img.png" alt="" /></span>';
                                                    }
                                                    mediaPost += '</div>';
                                                    if (j == 3)
                                                    {
                                                        mediaPost += '</div>';
                                                    }
                                                    index++;
                                                    cnt++;
                                                }
                                                grid_type = 1;
                                            } else
                                            {
                                                if (index >= totalData)
                                                {
                                                    break;
                                                }
                                                mediaPost += '<div class="instagram-item" type="' + mediadata[index].media_type + '">';
                                                var x = instaItemGridInner(mediaPost, mediadata[index], shop_data, gallery_type);
                                                mediaPost += x;
                                                if (shop_data.insta_new_tab == '3')
                                                {
                                                    if (mediadata[index].caption == '' || mediadata[index].caption == null || shop_data.insta_caption_show == 'false')
                                                        var hasItems = 'noItems';
                                                    else
                                                        var hasItems = '';
                                                    var y = instaItemDetailPopup(mediaPost, mediadata[index], shop_data, hasItems, gallery_type);
                                                    mediaPost += y;
                                                }
                                                if (shop_data.insta_new_tab == '2' && mediadata[index].media_type == "CAROUSEL_ALBUM")
                                                {
                                                    mediaPost += '<span class="multipal-img"><img src="' + BASE_URLINS + 'static/assets/images/other/multiple-img.png" alt="" /></span>';
                                                }
                                                mediaPost += '</div>';
                                                index++;
                                                cnt++;
                                                grid_type = 4;
                                            }
                                            if (cnt == 9)
                                            {
                                                cnt = 0;
                                                grid_type = grid_type == 1 ? 1 : 4;
                                            }
                                        }
                                        mediaPost += '</div>';
                                        if (gallery_type == "instaPhotoFeed")
                                        {
                                            mediaPost += '<div class="load-more-btn">' +
                                                    '</div>';
                                        }
                                        mediaPost += '</div>';
                                    }
                                } else
                                {
                                    mediaPost = '';
                                    mediaPost += '<div id="image-gallery" class="cardbox insta_images">' +
                                            '<div><center><h3>' + shop_data.insta_grid_title + '</h3></center></div>' +
                                            '<div class="card-content collapse show">' +
                                            '<div class="card-body  my-gallery" itemscope itemtype="">' +
                                            '<div class="homeGallery gallery cs-row cs-slick-slider grid insta_images_card" data-link="' + shop_data.insta_new_tab + '">';
                                    jQuery.each(mediadata, function (i, n)
                                    {
                                        if (mediadata[i].media_type != "VIDEO")
                                        {
                                            mediaPost += ' <div class="full-overlay instagram-item" itemprop="associatedMedia" itemscope itemtype="">';
                                            var x = instaItemGridInner(mediaPost, mediadata[i], shop_data, gallery_type);
                                            mediaPost += x;
                                            if (shop_data.insta_new_tab == '3')
                                            {
                                                if (mediadata[i].caption == '' || mediadata[i].caption == null || shop_data.insta_caption_show == 'false')
                                                    var hasItems = 'noItems';
                                                else
                                                    var hasItems = '';
                                                var y = instaItemDetailPopup(mediaPost, mediadata[i], shop_data, hasItems, gallery_type);
                                                mediaPost += y;
                                            }
                                            if (shop_data.insta_new_tab == '2' && mediadata[i].media_type == "CAROUSEL_ALBUM")
                                            {
                                                mediaPost += '<span class="multipal-img"><img src="' + BASE_URLINS + 'static/assets/images/other/multiple-img.png" alt="" /></span>';
                                            }
                                            mediaPost += ' </div>';
                                        }
                                    });
                                    mediaPost += '</div>'
                                            + '</div>'
                                            + '</div>'
                                            + '</div>';
                                }

                                jQuery('#cs-instagram-feed-' + gallery_type).html(csInstaCSS + mediaPost);
                                if (gallery_type == 'homeGallery' && shop_data.insta_grid_choice == 'insta_slider')
                                {
                                    jQuery(".cs-slick-slider").Slick1(
                                            {
                                                infinite: true,
                                                slidesToShow: shop_data.insta_item_per_rows,
                                                slidesToScroll: 1,
                                                speed: 1000,
                                                autoplay: shop_data.insta_auto_slider,
                                                autoplaySpeed: 5000,
                                                arrows: true,
                                                responsive: [
                                                    {
                                                        breakpoint: 767,
                                                        settings:
                                                                {
                                                                    slidesToShow: shop_data.insta_mobile_item_per_rows
                                                                }
                                                    }]
                                            });
                                }
                            }

                            if (gallery_type == 'instaPhotoFeed')
                            {

                                var mediadata = result.data;
                                var totalData = mediadata.length;
                                csInstaCSS += '<style>';
                                csInstaCSS += '#cs-instagram-feed-instaPhotoFeed .insta_images h3 { color: ' + shop_data.insta_heading_color_ipf + '; }';
                                csInstaCSS += '#cs-instagram-feed-instaPhotoFeed .instagram-text {background-color: ' + shop_data.insta_overlay_color_ipf + '; }';
                                csInstaCSS += '#cs-instagram-feed-instaPhotoFeed .captionText, #cs-instagram-feed-instaPhotoFeed span { color: ' + shop_data.insta_font_color_ipf + ' }';
                                csInstaCSS += '#cs-instagram-feed-instaPhotoFeed svg path { fill: ' + shop_data.insta_font_color_ipf + ' }';
                                csInstaCSS += '#cs-instagram-feed-instaPhotoFeed .instagram-text p {color: ' + shop_data.insta_font_color_ipf + '; }';
                                csInstaCSS += '</style>';
                                if (shop_data.insta_templte_ipf == 0)
                                {
                                    var class_home = "";
                                    mediaPost += '' +
                                            '<div id="image-gallery" class="cardbox insta_images">' +
                                            '<div><center><h3 style="color:' + shop_data.insta_heading_color_ipf + '">' + shop_data.insta_grid_title_ipf + '</h3></center></div>' +
                                            '<div class="card-content collapse show">' +
                                            '<div class="card-body  my-gallery" itemscope itemtype="">' +
                                            '<div class="row ' + class_home + ' gallery instagram-gid cs-row insta_images_card" data-link="' + shop_data.insta_new_tab_ipf + '">';
                                    jQuery.each(mediadata, function (i, n)
                                    {
                                        mediaPost += ' <figure class="cs-col-' + shop_data.insta_item_per_rows_ipf + ' cs-col-mob-' + shop_data.insta_mobile_item_per_rows_ipf + ' full-overlay instagram-item" itemprop="associatedMedia" itemscope itemtype="">';
                                        var x = instaItemGridInner(mediaPost, mediadata[i], shop_data, gallery_type);
                                        mediaPost += x;
                                        if (shop_data.insta_new_tab_ipf == '3')
                                        {
                                            if (mediadata[i].caption == '' || mediadata[i].caption == null || shop_data.insta_caption_show_ipf == 'false')
                                                var hasItems = 'noItems';
                                            else
                                                var hasItems = '';
                                            var y = instaItemDetailPopup(mediaPost, mediadata[i], shop_data, hasItems, gallery_type);
                                            mediaPost += y;
                                        }
                                        if (shop_data.insta_new_tab_ipf == '2' && mediadata[i].media_type == "CAROUSEL_ALBUM")
                                        {
                                            mediaPost += '<span class="multipal-img"><img src="' + BASE_URLINS + 'static/assets/images/other/multiple-img.png" alt="" /></span>';
                                        }
                                        mediaPost += ' </figure>';
                                    });
                                    mediaPost += '</div>';
                                    if (gallery_type == "instaPhotoFeed")
                                    {
                                        mediaPost += '<div class="load-more-btn">' +
                                                '</div>';
                                    }
                                    mediaPost += '</div>' +
                                            '</div>' +
                                            '</div>';
                                } else if (shop_data.insta_templte_ipf == 1)
                                {
                                    mediaPost += '<div class="insta_images">' +
                                            '<div><center><h3 style="color:' + shop_data.insta_heading_color_ipf + '">' + shop_data.insta_grid_title_ipf + '</h3></center></div>' +
                                            '<div class="instagram-gid grid-type-1 mobile-items-' + shop_data.insta_mobile_item_per_rows_ipf_ipf_ipf + ' insta_images_card" data-link="' + shop_data.insta_new_tab_ipf + '">';
                                    var grid_type = 4;
                                    for (i = 0; index < mediadata.length; i++)
                                    {
                                        if (grid_type == 4)
                                        {
                                            for (j = 0; j < 4; j++)
                                            {
                                                if (index >= totalData)
                                                {
                                                    break;
                                                }
                                                if (j == 0)
                                                {
                                                    mediaPost += '<div class="instagram-item grid">';
                                                }
                                                mediaPost += '<div class="grid-inner-item " type="' + mediadata[index].media_type + '">';
                                                var x = instaItemGridInner(mediaPost, mediadata[index], shop_data, gallery_type);
                                                mediaPost += x;
                                                if (shop_data.insta_new_tab_ipf == '3')
                                                {
                                                    if (mediadata[index].caption == '' || mediadata[index].caption == null || shop_data.insta_caption_show_ipf == 'false')
                                                        var hasItems = 'noItems';
                                                    else
                                                        var hasItems = '';
                                                    var y = instaItemDetailPopup(mediaPost, mediadata[index], shop_data, hasItems, gallery_type);
                                                    mediaPost += y;
                                                }
                                                if (shop_data.insta_new_tab_ipf == '2' && mediadata[index].media_type == "CAROUSEL_ALBUM")
                                                {
                                                    mediaPost += '<span class="multipal-img"><img src="' + BASE_URLINS + 'static/assets/images/other/multiple-img.png" alt="" /></span>';
                                                }
                                                mediaPost += '</div>';
                                                if (j == 3)
                                                {
                                                    mediaPost += '</div>';
                                                }
                                                index++;
                                                cnt++;
                                            }
                                            grid_type = 1;
                                        } else
                                        {
                                            if (index >= totalData)
                                            {
                                                break;
                                            }
                                            mediaPost += '<div class="instagram-item" type="' + mediadata[index].media_type + '">';
                                            var x = instaItemGridInner(mediaPost, mediadata[index], shop_data, gallery_type);
                                            mediaPost += x;
                                            if (shop_data.insta_new_tab_ipf == '3')
                                            {
                                                if (mediadata[index].caption == '' || mediadata[index].caption == null || shop_data.insta_caption_show_ipf == 'false')
                                                    var hasItems = 'noItems';
                                                else
                                                    var hasItems = '';
                                                var y = instaItemDetailPopup(mediaPost, mediadata[index], shop_data, hasItems, gallery_type);
                                                mediaPost += y;
                                            }
                                            if (shop_data.insta_new_tab_ipf == '2' && mediadata[index].media_type == "CAROUSEL_ALBUM")
                                            {
                                                mediaPost += '<span class="multipal-img"><img src="' + BASE_URLINS + 'static/assets/images/other/multiple-img.png" alt="" /></span>';
                                            }
                                            mediaPost += '</div>';
                                            index++;
                                            cnt++;
                                            grid_type = 4;
                                        }
                                        if (cnt == 10)
                                        {
                                            cnt = 0;
                                            grid_type = grid_type == 1 ? 4 : 1;
                                        }
                                    }
                                    mediaPost += '</div>';
                                    if (gallery_type == "instaPhotoFeed")
                                    {
                                        mediaPost += '<div class="load-more-btn">' +
                                                '</div>';
                                    }
                                    mediaPost += '</div>';
                                } else if (shop_data.insta_templte_ipf == 2)
                                {
                                    var grid_type = 2;
                                    var row_type = 1;
                                    var row_cnt = 0;
                                    mediaPost += '<div class="insta_images">' +
                                            '<div><center><h3 style="color:' + shop_data.insta_heading_color_ipf + '">' + shop_data.insta_grid_title_ipf + '</h3></center></div>' +
                                            '<div class="instagram-gid grid-type-2 mobile-items-' + shop_data.insta_mobile_item_per_rows_ipf_ipf + ' insta_images_card" data-link="' + shop_data.insta_new_tab_ipf + '">';
                                    for (i = 0; index < totalData; i++)
                                    {
                                        if (grid_type == 2)
                                        {
                                            for (j = 0; j < 2; j++)
                                            {
                                                if (index >= totalData)
                                                {
                                                    break;
                                                }
                                                if (j == 0)
                                                {
                                                    mediaPost += '<div class="instagram-item grid">';
                                                }
                                                mediaPost += '<div class="grid-inner-item" type="' + mediadata[index].media_type + '">';
                                                var x = instaItemGridInner(mediaPost, mediadata[index], shop_data, gallery_type);
                                                mediaPost += x;
                                                if (shop_data.insta_new_tab_ipf == '3')
                                                {
                                                    if (mediadata[index].caption == '' || mediadata[index].caption == null || shop_data.insta_caption_show_ipf == 'false')
                                                        var hasItems = 'noItems';
                                                    else
                                                        var hasItems = '';
                                                    var y = instaItemDetailPopup(mediaPost, mediadata[index], shop_data, hasItems, gallery_type);
                                                    mediaPost += y;
                                                }
                                                if (shop_data.insta_new_tab_ipf == '2' && mediadata[index].media_type == "CAROUSEL_ALBUM")
                                                {
                                                    mediaPost += '<span class="multipal-img"><img src="' + BASE_URLINS + 'static/assets/images/other/multiple-img.png" alt="" /></span>';
                                                }
                                                mediaPost += '</div>';
                                                if (j == 1)
                                                {
                                                    mediaPost += '</div>';
                                                }
                                                index++;
                                                cnt++;
                                                row_cnt++;
                                            }
                                            grid_type = 1;
                                        } else
                                        {
                                            if (index >= totalData)
                                            {
                                                break;
                                            }
                                            mediaPost += '<div class="instagram-item" type="' + mediadata[index].media_type + '">';
                                            var x = instaItemGridInner(mediaPost, mediadata[index], shop_data, gallery_type);
                                            mediaPost += x;
                                            if (shop_data.insta_new_tab_ipf == '3')
                                            {
                                                if (mediadata[index].caption == '' || mediadata[index].caption == null || shop_data.insta_caption_show_ipf == 'false')
                                                    var hasItems = 'noItems';
                                                else
                                                    var hasItems = '';
                                                var y = instaItemDetailPopup(mediaPost, mediadata[index], shop_data, hasItems, gallery_type);
                                                mediaPost += y;
                                            }
                                            if (shop_data.insta_new_tab_ipf == '2' && mediadata[index].media_type == "CAROUSEL_ALBUM")
                                            {
                                                mediaPost += '<span class="multipal-img"><img src="' + BASE_URLINS + 'static/assets/images/other/multiple-img.png" alt="" /></span>';
                                            }
                                            mediaPost += '</div>';
                                            index++;
                                            cnt++;
                                            row_cnt++;
                                            grid_type = 2;
                                        }
                                        if (row_type == 1 && row_cnt == 5)
                                        {
                                            grid_type = grid_type == 1 ? 2 : 1;
                                        }
                                        if (row_type == 2 && row_cnt == 6)
                                        {
                                            grid_type = grid_type == 1 ? 2 : 1;
                                        }
                                        if (cnt == 8)
                                        {
                                            cnt = 0;
                                            row_cnt = 0;
                                            row_type = row_type == 1 ? 2 : 1;
                                            grid_type = grid_type == 1 ? 2 : 1;
                                        }
                                    }
                                    mediaPost += '</div>';
                                    if (gallery_type == "instaPhotoFeed")
                                    {
                                        mediaPost += '<div class="load-more-btn">' +
                                                '</div>';
                                    }
                                    mediaPost += '</div>';
                                } else if (shop_data.insta_templte_ipf == 3)
                                {
                                    var grid_type = [
                                        [6, 1, 2],
                                        [2, 1, 6]
                                    ];
                                    var row_type = 1;
                                    mediaPost += '<div class="insta_images">' +
                                            '<div><center><h3 style="color:' + shop_data.insta_heading_color_ipf + '">' + shop_data.insta_grid_title_ipf + '</h3></center></div>' +
                                            '<div class="instagram-gid grid-type-3 mobile-items-' + shop_data.insta_mobile_item_per_rows_ipf_ipf + ' insta_images_card" data-link="' + shop_data.insta_new_tab_ipf + '">';
                                    for (i = 0; index < totalData; i++)
                                    {
                                        var grid_type_index = (row_type == 1 ? 0 : 1);
                                        jQuery.each(grid_type[grid_type_index], function (grid_index, img_display)
                                        {
                                            if (img_display > 1)
                                            {
                                                for (j = 0; j < img_display; j++)
                                                {
                                                    if (index >= totalData)
                                                    {
                                                        return false;
                                                    }
                                                    if (j % 2 == 0)
                                                    {
                                                        mediaPost += '<div class="instagram-item grid">';
                                                    }
                                                    mediaPost += '<div class="grid-inner-item" type="' + mediadata[index].media_type + '">';
                                                    var x = instaItemGridInner(mediaPost, mediadata[index], shop_data, gallery_type);
                                                    mediaPost += x;
                                                    if (shop_data.insta_new_tab_ipf == '3')
                                                    {
                                                        if (mediadata[index].caption == '' || mediadata[index].caption == null || shop_data.insta_caption_show_ipf == 'false')
                                                            var hasItems = 'noItems';
                                                        else
                                                            var hasItems = '';
                                                        var y = instaItemDetailPopup(mediaPost, mediadata[index], shop_data, hasItems, gallery_type);
                                                        mediaPost += y;
                                                    }
                                                    if (shop_data.insta_new_tab_ipf == '2' && mediadata[index].media_type == "CAROUSEL_ALBUM")
                                                    {
                                                        mediaPost += '<span class="multipal-img"><img src="' + BASE_URLINS + 'static/assets/images/other/multiple-img.png" alt="" /></span>';
                                                    }
                                                    mediaPost += '</div>';
                                                    if (Math.abs(j % 2) == 1)
                                                    {
                                                        mediaPost += '</div>';
                                                    }
                                                    index++;
                                                    cnt++;
                                                }
                                            } else
                                            {
                                                if (index >= totalData)
                                                {
                                                    return false;
                                                }
                                                mediaPost += '<div class="instagram-item" type="' + mediadata[index].media_type + '">';
                                                var x = instaItemGridInner(mediaPost, mediadata[index], shop_data, gallery_type);
                                                mediaPost += x;
                                                if (shop_data.insta_new_tab_ipf == '3')
                                                {
                                                    if (mediadata[index].caption == '' || mediadata[index].caption == null || shop_data.insta_caption_show_ipf == 'false')
                                                        var hasItems = 'noItems';
                                                    else
                                                        var hasItems = '';
                                                    var y = instaItemDetailPopup(mediaPost, mediadata[index], shop_data, hasItems, gallery_type);
                                                    mediaPost += y;
                                                }
                                                if (shop_data.insta_new_tab_ipf == '2' && mediadata[index].media_type == "CAROUSEL_ALBUM")
                                                {
                                                    mediaPost += '<span class="multipal-img"><img src="' + BASE_URLINS + 'static/assets/images/other/multiple-img.png" alt="" /></span>';
                                                }
                                                mediaPost += '</div>';
                                                index++;
                                                cnt++;
                                            }
                                        });
                                        if (cnt == 9)
                                        {
                                            cnt = 0;
                                            row_type = row_type == 1 ? 2 : 1;
                                        }
                                    }
                                    mediaPost += '</div>';
                                    if (gallery_type == "instaPhotoFeed")
                                    {
                                        mediaPost += '<div class="load-more-btn">' +
                                                '</div>';
                                    }
                                    mediaPost += '</div>';
                                } else if (shop_data.insta_templte_ipf == 4)
                                {
                                    var grid_type = 4;
                                    mediaPost += '<div class="insta_images">' +
                                            '<div><center><h3 style="color:' + shop_data.insta_heading_color_ipf + '">' + shop_data.insta_grid_title_ipf + '</h3></center></div>' +
                                            '<div class="instagram-gid grid-type-4 mobile-items-' + shop_data.insta_mobile_item_per_rows_ipf_ipf + ' insta_images_card" data-link="' + shop_data.insta_new_tab_ipf + '">';
                                    for (i = 0; index < mediadata.length; i++)
                                    {
                                        if (grid_type == 4)
                                        {
                                            for (j = 0; j < 4; j++)
                                            {
                                                if (index >= totalData)
                                                {
                                                    break;
                                                }
                                                if (j == 0)
                                                {
                                                    mediaPost += '<div class="instagram-item grid">';
                                                }
                                                mediaPost += '<div class="grid-inner-item" type="' + mediadata[index].media_type + '">';
                                                var x = instaItemGridInner(mediaPost, mediadata[index], shop_data, gallery_type);
                                                mediaPost += x;
                                                if (shop_data.insta_new_tab_ipf == '3')
                                                {
                                                    if (mediadata[index].caption == '' || mediadata[index].caption == null || shop_data.insta_caption_show_ipf == 'false')
                                                        var hasItems = 'noItems';
                                                    else
                                                        var hasItems = '';
                                                    var y = instaItemDetailPopup(mediaPost, mediadata[index], shop_data, hasItems, gallery_type);
                                                    mediaPost += y;
                                                }
                                                if (shop_data.insta_new_tab_ipf == '2' && mediadata[index].media_type == "CAROUSEL_ALBUM")
                                                {
                                                    mediaPost += '<span class="multipal-img"><img src="' + BASE_URLINS + 'static/assets/images/other/multiple-img.png" alt="" /></span>';
                                                }
                                                mediaPost += '</div>';
                                                if (j == 3)
                                                {
                                                    mediaPost += '</div>';
                                                }
                                                index++;
                                                cnt++;
                                            }
                                            grid_type = 1;
                                        } else
                                        {
                                            if (index >= totalData)
                                            {
                                                break;
                                            }
                                            mediaPost += '<div class="instagram-item" type="' + mediadata[index].media_type + '">';
                                            var x = instaItemGridInner(mediaPost, mediadata[index], shop_data, gallery_type);
                                            mediaPost += x;
                                            if (shop_data.insta_new_tab_ipf == '3')
                                            {
                                                if (mediadata[index].caption == '' || mediadata[index].caption == null || shop_data.insta_caption_show_ipf == 'false')
                                                    var hasItems = 'noItems';
                                                else
                                                    var hasItems = '';
                                                var y = instaItemDetailPopup(mediaPost, mediadata[index], shop_data, hasItems, gallery_type);
                                                mediaPost += y;
                                            }
                                            if (shop_data.insta_new_tab_ipf == '2' && mediadata[index].media_type == "CAROUSEL_ALBUM")
                                            {
                                                mediaPost += '<span class="multipal-img"><img src="' + BASE_URLINS + 'static/assets/images/other/multiple-img.png" alt="" /></span>';
                                            }
                                            mediaPost += '</div>';
                                            index++;
                                            cnt++;
                                            grid_type = 4;
                                        }
                                        if (cnt == 9)
                                        {
                                            cnt = 0;
                                            grid_type = grid_type == 1 ? 1 : 4;
                                        }
                                    }
                                    mediaPost += '</div>';
                                    if (gallery_type == "instaPhotoFeed")
                                    {
                                        mediaPost += '</div><div class="load-more-btn">' +
                                                '</div>';
                                    }
                                    mediaPost += '</div>';
                                }
                                jQuery('#cs-instagram-feed-' + gallery_type).html(csInstaCSS + mediaPost);

                                var nextPage = result.nextpagelink;

                                if (nextPage != '' && nextPage != undefined && nextPage != null)
                                {
                                    var load_more_btn = '<center><button class="button secondary" id="load_more" style="background:' + shop_data.insta_load_btn_bg_color + '" value="' + nextPage + '"><span style="color:' + shop_data.insta_load_btn_font_color + '">' + shop_data.insta_load_more + '</span></button></center>';
                                    jQuery(".load-more-btn").html(load_more_btn);
                                } else
                                {
                                    jQuery(".load-more-btn").html('');
                                }
                            }

                            if (gallery_type == "visibleGallery")
                            {
                                var mediadata = result.media;
                                var totalData = mediadata.length;
                                csInstaCSS += '<style>';
                                csInstaCSS += '#cs-instagram-feed-visibleGallery .insta_images h3 { color: ' + shop_data.popup_heading_color + '; }';
                                csInstaCSS += '#cs-instagram-feed-visibleGallery .shop-hover {background-color: ' + shop_data.popup_overlay_color + '; }';
                                csInstaCSS += '#cs-instagram-feed-visibleGallery .instagram-text {background-color: ' + shop_data.popup_overlay_color + '; }';
                                csInstaCSS += '#cs-instagram-feed-visibleGallery .instagram-text .captionText {color: ' + shop_data.popup_font_color + ' }';
                                csInstaCSS += '#cs-instagram-feed-visibleGallery .infeed-sld-cont svg path {fill: ' + shop_data.popup_font_color + ' }';
                                csInstaCSS += '#cs-instagram-feed-visibleGallery .instagram-text .infeed-opt svg path {fill: ' + shop_data.popup_font_color + ' }';
                                csInstaCSS += '#cs-instagram-feed-visibleGallery .instagram-text .infeed-opt span {color: ' + shop_data.popup_font_color + ' }';
                                csInstaCSS += '.fs-timeline-detail .fs-shopify-add-cart { background: ' + shop_data.popup_load_btn_bg_color + ' }';
                                csInstaCSS += '.fs-timeline-detail .fs-shopify-add-cart span{ color: ' + shop_data.popup_load_btn_font_color + ' }';
                                csInstaCSS += '.fs-timeline-detail #AddToCartMain { background: ' + shop_data.popup_load_btn_bg_color + ' }';
                                csInstaCSS += '.fs-timeline-detail #AddToCartMain span{ color: ' + shop_data.popup_load_btn_font_color + ' }';
                                csInstaCSS += '.fs-timeline-detail .fs-buy-button { background: ' + shop_data.popup_load_btn_bg_color + ' }';
                                csInstaCSS += '.fs-timeline-detail .fs-buy-button { color: ' + shop_data.popup_load_btn_font_color + ' }';
                                csInstaCSS += '</style>';
                                if (shop_data.plan != "basic_plan")
                                {

                                    if (shop_data.popup_templte == 0)
                                    {
                                        mediaPost += '' +
                                                '<div id="image-gallery" class="cardbox galleryParent insta_images" data-btnaction="' + shop_data.popup_button_action + '" data-link="3" data-countselector="' + shop_data.popup_cart_count_selector + '">';
                                        if (mediadata.length > 0)
                                        {
                                            if (shop_data.popup_gallery_grid_title != '' && shop_data.popup_gallery_grid_title != undefined && shop_data.popup_gallery_grid_title != null)
                                            {
                                                var visible_gallery_title = shop_data.popup_gallery_grid_title;
                                            } else
                                            {
                                                var visible_gallery_title = shop_data.instagram_account_name;
                                            }
                                            mediaPost += '<div><center><h3>' + visible_gallery_title + '</h3></center></div>';
                                        }
                                        mediaPost += '<div class="row gallery cs-row instagram-gid insta_images_card">';
                                        jQuery.each(mediadata, function (i, n)
                                        {

                                            mediaPost
                                                    += ' <figure class="cs-col-' + shop_data.popup_desktop_itemper_row + ' cs-col-mob-' + shop_data.popup_mobile_item_per_row + ' mobile-items-' + shop_data.popup_mobile_item_per_row + ' instagram-item" itemprop="associatedMedia" itemscope itemtype="">';
                                            var x = instaCustomItemGrid(mediaPost, mediadata[i], shop_data, gallery_type);
                                            mediaPost += x;
                                            mediaPost += ' </figure>';
                                        });
                                        mediaPost += '</div>'
                                                + '<div class="load-more-btn">'
                                                + '</div>'
                                                + '</div>';
                                    } else if (shop_data.popup_templte == 1)
                                    {
                                        mediaPost += '<div class="insta_images" data-link="3">';
                                        if (mediadata.length > 0)
                                        {
                                            if (shop_data.popup_gallery_grid_title != '' && shop_data.popup_gallery_grid_title != undefined && shop_data.popup_gallery_grid_title != null)
                                            {
                                                var visible_gallery_title = shop_data.popup_gallery_grid_title;
                                            } else
                                            {
                                                var visible_gallery_title = shop_data.instagram_account_name;
                                            }
                                            mediaPost += '<div class="galleryParent" data-btnaction="' + shop_data.popup_button_action + '" data-countselector="' + shop_data.popup_cart_count_selector + '" ><center><h3>' + visible_gallery_title + '</h3></center></div>';
                                        }
                                        mediaPost += '<div class="instagram-gid grid-type-1 mobile-items-' + shop_data.popup_mobile_item_per_row + ' insta_images_card">';
                                        var grid_type = 4;
                                        for (i = 0; index < mediadata.length; i++)
                                        {
                                            var productdata = mediadata[index].tagproducts;
                                            if (jQuery.isEmptyObject(productdata) != true || shop_data.popup_caption == 'true')
                                                var hasItems = '';
                                            else
                                                var hasItems = 'noItems';
                                            if (grid_type == 4)
                                            {
                                                for (j = 0; j < 4; j++)
                                                {
                                                    if (j == 0)
                                                    {
                                                        mediaPost += '<div class="instagram-item grid">';
                                                    }
                                                    if (index >= totalData)
                                                    {
                                                        break;
                                                    }
                                                    mediaPost += '<div class="grid-inner-item" type="' + mediadata[index].media_type + '">';

                                                    var x = instaCustomItemGrid(mediaPost, mediadata[index], shop_data, gallery_type);
                                                    mediaPost += x;

                                                    mediaPost += '</div>';

                                                    if (j == 3)
                                                    {
                                                        mediaPost += '</div>';
                                                    }
                                                    index++;
                                                    cnt++;
                                                }
                                                grid_type = 1;
                                            } else
                                            {
                                                if (index >= totalData)
                                                {
                                                    break;
                                                }
                                                mediaPost += '<div class="instagram-item " type="' + mediadata[index].media_type + '">';
                                                var x = instaCustomItemGrid(mediaPost, mediadata[index], shop_data, gallery_type);
                                                mediaPost += x;
                                                mediaPost += '</div>';
                                                index++;
                                                cnt++;
                                                grid_type = 4;
                                            }
                                            if (cnt == 10)
                                            {
                                                cnt = 0;
                                                grid_type = grid_type == 1 ? 4 : 1;
                                            }
                                        }
                                        mediaPost += '</div><div class="load-more-btn"></div></div>';
                                    } else if (shop_data.popup_templte == 2)
                                    {
                                        var grid_type = 2;
                                        var row_type = 1;
                                        var row_cnt = 0;
                                        mediaPost += '<div class="insta_images" data-link="3">';
                                        if (mediadata.length > 0)
                                        {
                                            if (shop_data.popup_gallery_grid_title != '' && shop_data.popup_gallery_grid_title != undefined && shop_data.popup_gallery_grid_title != null)
                                            {
                                                var visible_gallery_title = shop_data.popup_gallery_grid_title;
                                            } else
                                            {
                                                var visible_gallery_title = shop_data.instagram_account_name;
                                            }
                                            mediaPost += '<div class="galleryParent" data-btnaction="' + shop_data.popup_button_action + '" data-countselector="' + shop_data.popup_cart_count_selector + '"><center><h3>' + visible_gallery_title + '</h3></center></div>';
                                        }
                                        mediaPost += '<div class="instagram-gid grid-type-2 mobile-items-' + shop_data.popup_mobile_item_per_row + ' insta_images_card">';
                                        for (i = 0; index < totalData; i++)
                                        {
                                            var productdata = mediadata[index].tagproducts;
                                            if (jQuery.isEmptyObject(productdata) != true || shop_data.popup_caption == 'true')
                                                var hasItems = '';
                                            else
                                                var hasItems = 'noItems';
                                            if (grid_type == 2)
                                            {
                                                for (j = 0; j < 2; j++)
                                                {
                                                    if (index >= totalData)
                                                    {
                                                        break;
                                                    }
                                                    if (j == 0)
                                                    {
                                                        mediaPost += '<div class="instagram-item grid">';
                                                    }
                                                    mediaPost += '<div class="grid-inner-item" type="' + mediadata[index].media_type + '">';
                                                    var x = instaCustomItemGrid(mediaPost, mediadata[index], shop_data, gallery_type);
                                                    mediaPost += x;
                                                    mediaPost += '</div>';
                                                    if (j == 1)
                                                    {
                                                        mediaPost += '</div>';
                                                    }
                                                    index++;
                                                    cnt++;
                                                    row_cnt++;
                                                }
                                                grid_type = 1;
                                            } else
                                            {
                                                if (index >= totalData)
                                                {
                                                    break;
                                                }
                                                mediaPost += '<div class="instagram-item" type="' + mediadata[index].media_type + '">';
                                                var x = instaCustomItemGrid(mediaPost, mediadata[index], shop_data, gallery_type);
                                                mediaPost += x;
                                                mediaPost += '</div>';
                                                index++;
                                                cnt++;
                                                row_cnt++;
                                                grid_type = 2;
                                            }

                                            if (row_type == 1 && row_cnt == 5)
                                            {
                                                grid_type = grid_type == 1 ? 2 : 1;
                                            }
                                            if (row_type == 2 && row_cnt == 6)
                                            {
                                                grid_type = grid_type == 1 ? 2 : 1;
                                            }

                                            if (cnt == 8)
                                            {
                                                cnt = 0;
                                                row_cnt = 0;
                                                row_type = row_type == 1 ? 2 : 1;
                                                grid_type = grid_type == 1 ? 2 : 1;
                                            }
                                        }
                                        mediaPost += '</div><div class="load-more-btn"></div></div>';
                                    } else if (shop_data.popup_templte == 3)
                                    {
                                        var grid_type = [
                                            [6, 1, 2],
                                            [2, 1, 6]
                                        ];
                                        var row_type = 1;
                                        mediaPost += '<div class="insta_images" data-link="3">';
                                        if (mediadata.length > 0)
                                        {
                                            if (shop_data.popup_gallery_grid_title != '' && shop_data.popup_gallery_grid_title != undefined && shop_data.popup_gallery_grid_title != null)
                                            {
                                                var visible_gallery_title = shop_data.popup_gallery_grid_title;
                                            } else
                                            {
                                                var visible_gallery_title = shop_data.instagram_account_name;
                                            }
                                            mediaPost += '<div class="galleryParent" data-btnaction="' + shop_data.popup_button_action + '" data-countselector="' + shop_data.popup_cart_count_selector + '"><center><h3>' + visible_gallery_title + '</h3></center></div>';
                                        }
                                        mediaPost += '<div class="instagram-gid grid-type-3 mobile-items-' + shop_data.popup_mobile_item_per_row + ' insta_images_card">';
                                        for (i = 0; index < totalData; i++)
                                        {
                                            var grid_type_index = (row_type == 1 ? 0 : 1);

                                            jQuery.each(grid_type[grid_type_index], function (grid_index, img_display)
                                            {
                                                var productdata = mediadata[grid_index].tagproducts;
                                                if (jQuery.isEmptyObject(productdata) != true || shop_data.popup_caption == 'true')
                                                    var hasItems = '';
                                                else
                                                    var hasItems = 'noItems';
                                                if (img_display > 1)
                                                {
                                                    for (j = 0; j < img_display; j++)
                                                    {
                                                        if (index >= totalData)
                                                        {
                                                            return false;
                                                        }
                                                        if (j % 2 == 0)
                                                        {
                                                            mediaPost += '<div class="instagram-item grid">';
                                                        }
                                                        mediaPost += '<div class="grid-inner-item" type="' + mediadata[index].media_type + '">';
                                                        var x = instaCustomItemGrid(mediaPost, mediadata[index], shop_data);
                                                        mediaPost += x;
                                                        mediaPost += '</div>';
                                                        if (Math.abs(j % 2) == 1)
                                                        {
                                                            mediaPost += '</div>';
                                                        }
                                                        index++;
                                                        cnt++;
                                                    }
                                                } else
                                                {
                                                    if (index >= totalData)
                                                    {
                                                        return false;
                                                    }
                                                    mediaPost += '<div class="instagram-item" type="' + mediadata[index].media_type + '">';
                                                    var x = instaCustomItemGrid(mediaPost, mediadata[index], shop_data, gallery_type);
                                                    mediaPost += x;
                                                    mediaPost += '</div>';
                                                    index++;
                                                    cnt++;
                                                }
                                            });


                                            if (cnt == 9)
                                            {
                                                cnt = 0;
                                                row_type = row_type == 1 ? 2 : 1;
                                            }
                                        }
                                        mediaPost += '</div><div class="load-more-btn"></div></div>';
                                    } else if (shop_data.popup_templte == 4)
                                    {
                                        var grid_type = 4;
                                        mediaPost += '<div class="insta_images" data-link="3">';
                                        if (mediadata.length > 0)
                                        {
                                            if (shop_data.popup_gallery_grid_title != '' && shop_data.popup_gallery_grid_title != undefined && shop_data.popup_gallery_grid_title != null)
                                            {
                                                var visible_gallery_title = shop_data.popup_gallery_grid_title;
                                            } else
                                            {
                                                var visible_gallery_title = shop_data.instagram_account_name;
                                            }
                                            mediaPost += '<div class="galleryParent" data-btnaction="' + shop_data.popup_button_action + '" data-countselector="' + shop_data.popup_cart_count_selector + '"><center><h3>' + visible_gallery_title + '</h3></center></div>';
                                        }
                                        mediaPost += '<div class="instagram-gid grid-type-4 mobile-items-' + shop_data.popup_mobile_item_per_row + ' insta_images_card">';
                                        for (i = 0; index < mediadata.length; i++)
                                        {
                                            var productdata = mediadata[index].tagproducts;
                                            if (jQuery.isEmptyObject(productdata) != true || shop_data.popup_caption == 'true')
                                                var hasItems = '';
                                            else
                                                var hasItems = 'noItems';
                                            if (grid_type == 4)
                                            {
                                                for (j = 0; j < 4; j++)
                                                {
                                                    if (index >= totalData)
                                                    {
                                                        break;
                                                    }
                                                    if (j == 0)
                                                    {
                                                        mediaPost += '<div class="instagram-item grid">';
                                                    }
                                                    mediaPost += '<div class="grid-inner-item" type="' + mediadata[index].media_type + '">';
                                                    var x = instaCustomItemGrid(mediaPost, mediadata[index], shop_data, gallery_type);
                                                    mediaPost += x;
                                                    mediaPost += '</div>';

                                                    if (j == 3)
                                                    {
                                                        mediaPost += '</div>';
                                                    }
                                                    index++;
                                                    cnt++;
                                                }
                                                grid_type = 1;
                                            } else
                                            {
                                                if (index >= totalData)
                                                {
                                                    break;
                                                }
                                                mediaPost += '<div class="instagram-item" type="' + mediadata[index].media_type + '">';
                                                var x = instaCustomItemGrid(mediaPost, mediadata[index], shop_data, gallery_type);
                                                mediaPost += x;
                                                mediaPost += '</div>';
                                                index++;
                                                cnt++;
                                                grid_type = 4;
                                            }
                                            if (cnt == 9)
                                            {
                                                cnt = 0;
                                                grid_type = grid_type == 1 ? 1 : 4;
                                            }
                                        }
                                        mediaPost += '</div><div class="load-more-btn"></div><div>';
                                    }
                                }
                                jQuery('#cs-instagram-feed-' + gallery_type).html(csInstaCSS + mediaPost);

                                //next page link
                                var pagenumber = result.pageno;
                                if (pagenumber != '' && pagenumber != undefined && pagenumber != null)
                                {
                                    var load_more_btn = '<center><button class="button secondary" style="background:' + shop_data.popup_load_btn_bg_color + '" data-medialength="' + mediadata.length + '" id="load_more_media" data-shopname="' + shop_data.shop_name + '" data-pageno="' + pagenumber + '"><span style="color:' + shop_data.popup_load_btn_font_color + '">' + shop_data.popup_load_more_button_title + '</span></button></center>';
                                    jQuery(".load-more-btn").html(load_more_btn);
                                } else
                                {
                                    jQuery(".load-more-btn").html('');
                                }

                            }

                            if (gallery_type == "productGallery")
                            {
                                if (result.media)
                                {
                                    var mediadata = result.media;
                                    var totalData = mediadata.length;
                                    csInstaCSS += '<style>';
                                    csInstaCSS += '#cs-instagram-feed-productGallery h3 { color: ' + shop_data.product_gallery_heading_color + '; }';
                                    csInstaCSS += '#cs-instagram-feed-productGallery .shop-hover {background-color: ' + shop_data.product_gallery_overlay_color + '; }';
                                    csInstaCSS += '#cs-instagram-feed-productGallery .shop-hover p { color:' + shop_data.product_gallery_font_color + '; }';
                                    csInstaCSS += '#cs-instagram-feed-productGallery .shop-hover svg path { fill:' + shop_data.product_gallery_font_color + '; }';
                                    csInstaCSS += '.fs-timeline-detail .fs-shopify-add-cart { background: ' + shop_data.product_gallery_addtocart_btn_bg_color + ' }';
                                    csInstaCSS += '.fs-timeline-detail .fs-shopify-add-cart span{ color: ' + shop_data.product_gallery_addtocart_btn_font_color + ' }';
                                    csInstaCSS += '#cs-instagram-feed-productGallery .instagram-text {background-color: ' + shop_data.product_gallery_overlay_color + '; }';
                                    csInstaCSS += '#cs-instagram-feed-productGallery .instagram-text .captionText {color: ' + shop_data.product_gallery_font_color + ' }';
                                    csInstaCSS += '#cs-instagram-feed-productGallery .instagram-text .infeed-opt svg path {fill: ' + shop_data.product_gallery_font_color + ' }';
                                    csInstaCSS += '#cs-instagram-feed-productGallery .instagram-text .infeed-opt span {color: ' + shop_data.product_gallery_font_color + ' }';
                                    csInstaCSS += '.fs-timeline-detail #AddToCartMain { background: ' + shop_data.popup_load_btn_bg_color + ' }';
                                    csInstaCSS += '.fs-timeline-detail #AddToCartMain span{ color: ' + shop_data.popup_load_btn_font_color + ' }';
                                    csInstaCSS += '.fs-timeline-detail .fs-buy-button { background: ' + shop_data.popup_load_btn_bg_color + ' }';
                                    csInstaCSS += '.fs-timeline-detail .fs-buy-button { color: ' + shop_data.popup_load_btn_font_color + ' }';
                                    csInstaCSS += '</style>';
                                    if (shop_data.plan != "basic_plan")
                                    {
                                        if (shop_data.product_gallery_grid_choice != 'insta_slider')
                                        {
                                            if (shop_data.product_gallery_templte == 0)
                                            {
                                                mediaPost += '' +
                                                        '<div id="image-gallery" class="cardbox galleryParent insta_images" data-link="3" data-btnaction="' + shop_data.product_gallery_button_action + '" data-countselector="' + shop_data.product_gallery_cart_count_selector + '">';
                                                if (mediadata.length > 0)
                                                {
                                                    mediaPost += '<div><center><h3>' + shop_data.product_gallery_grid_title + '</h3></center></div>';
                                                }
                                                mediaPost += '<div class="row gallery cs-row insta_images_card">';
                                                jQuery.each(mediadata, function (i, n)
                                                {
                                                    //if(i < Number(shop_data.product_gallery_load_images)) {
                                                    mediaPost
                                                            += '<figure class="cs-col-' + shop_data.product_gallery_desktop_itemper_row + ' cs-col-mob-' + shop_data.product_gallery_mobile_itemper_row + ' instagram-item relative-div product-grid-' + shop_data.product_gallery_desktop_itemper_row + ' product-grid-mob-' + shop_data.product_gallery_mobile_itemper_row + '" itemprop="associatedMedia" itemscope itemtype="">';

                                                    var x = instaCustomItemGrid(mediaPost, mediadata[i], shop_data, gallery_type);
                                                    mediaPost += x;

                                                    mediaPost += ' </figure>';
                                                    //}
                                                });
                                                mediaPost += '</div>' +
                                                        '</div>';
                                            } else if (shop_data.product_gallery_templte == 1)
                                            {
                                                mediaPost += '<div class="insta_images" data-link="3">';
                                                if (mediadata.length > 0)
                                                {
                                                    mediaPost += '<div class="galleryParent" data-btnaction="' + shop_data.product_gallery_button_action + '" data-countselector="' + shop_data.product_gallery_cart_count_selector + '"><center><h3>' + shop_data.product_gallery_grid_title + '</h3></center></div>';
                                                }
                                                mediaPost += '<div class="instagram-gid grid-type-1 mobile-items-' + shop_data.product_gallery_mobile_itemper_row + ' insta_images">';
                                                var grid_type = 4;
                                                //var mti = (mediadata.length > Number(shop_data.product_gallery_load_images)) ? Number(shop_data.product_gallery_load_images) : mediadata.length;
                                                for (i = 0; index < totalData; i++)
                                                {

                                                    if (grid_type == 4)
                                                    {
                                                        for (j = 0; j < 4; j++)
                                                        {
                                                            if (j == 0)
                                                            {
                                                                mediaPost += '<div class="instagram-item grid">';
                                                            }
                                                            if (index >= totalData)
                                                            {
                                                                break;
                                                            }
                                                            mediaPost += '<div class="grid-inner-item" type="' + mediadata[index].media_type + '">';

                                                            var x = instaCustomItemGrid(mediaPost, mediadata[index], shop_data, gallery_type);
                                                            mediaPost += x;

                                                            mediaPost += '</div>';

                                                            if (j == 3)
                                                            {
                                                                mediaPost += '</div>';
                                                            }
                                                            index++;
                                                            cnt++;
                                                        }
                                                        grid_type = 1;
                                                    } else
                                                    {
                                                        if (index >= totalData)
                                                        {
                                                            break;
                                                        }
                                                        mediaPost += '<div class="instagram-item " type="' + mediadata[index].media_type + '">';
                                                        var x = instaCustomItemGrid(mediaPost, mediadata[index], shop_data, gallery_type);
                                                        mediaPost += x;
                                                        mediaPost += '</div>';
                                                        index++;
                                                        cnt++;
                                                        grid_type = 4;
                                                    }
                                                    if (cnt == 10)
                                                    {

                                                        cnt = 0;
                                                        grid_type = grid_type == 1 ? 4 : 1;
                                                    }


                                                }
                                                mediaPost += '</div></div>';
                                            } else if (shop_data.product_gallery_templte == 2)
                                            {
                                                var grid_type = 2;
                                                var row_type = 1;
                                                var row_cnt = 0;
                                                mediaPost += '<div class="insta_images" data-link="3">';
                                                if (mediadata.length > 0)
                                                {
                                                    mediaPost += '<div class="galleryParent" data-btnaction="' + shop_data.product_gallery_button_action + '" data-countselector="' + shop_data.product_gallery_cart_count_selector + '"><center><h3>' + shop_data.product_gallery_grid_title + '</h3></center></div>';
                                                }
                                                //var totalData = (mediadata.length > Number(shop_data.product_gallery_load_images)) ? Number(shop_data.product_gallery_load_images) : mediadata.length;
                                                mediaPost += '<div class="instagram-gid grid-type-2 mobile-items-' + shop_data.product_gallery_mobile_itemper_row + ' insta_images_card">';
                                                for (i = 0; index < totalData; i++)
                                                {

                                                    if (grid_type == 2)
                                                    {
                                                        for (j = 0; j < 2; j++)
                                                        {
                                                            if (index >= totalData)
                                                            {
                                                                break;
                                                            }
                                                            if (j == 0)
                                                            {
                                                                mediaPost += '<div class="instagram-item grid">';
                                                            }
                                                            mediaPost += '<div class="grid-inner-item" type="' + mediadata[index].media_type + '">';
                                                            var x = instaCustomItemGrid(mediaPost, mediadata[index], shop_data, gallery_type);
                                                            mediaPost += x;
                                                            mediaPost += '</div>';
                                                            if (j == 1)
                                                            {
                                                                mediaPost += '</div>';
                                                            }
                                                            index++;
                                                            cnt++;
                                                            row_cnt++;
                                                        }
                                                        grid_type = 1;
                                                    } else
                                                    {
                                                        if (index >= totalData)
                                                        {
                                                            break;
                                                        }
                                                        mediaPost += '<div class="instagram-item" type="' + mediadata[index].media_type + '">';
                                                        var x = instaCustomItemGrid(mediaPost, mediadata[index], shop_data, gallery_type);
                                                        mediaPost += x;
                                                        mediaPost += '</div>';
                                                        index++;
                                                        cnt++;
                                                        row_cnt++;
                                                        grid_type = 2;
                                                    }

                                                    if (row_type == 1 && row_cnt == 5)
                                                    {
                                                        grid_type = grid_type == 1 ? 2 : 1;
                                                    }
                                                    if (row_type == 2 && row_cnt == 6)
                                                    {
                                                        grid_type = grid_type == 1 ? 2 : 1;
                                                    }

                                                    if (cnt == 8)
                                                    {
                                                        cnt = 0;
                                                        row_cnt = 0;
                                                        row_type = row_type == 1 ? 2 : 1;
                                                        grid_type = grid_type == 1 ? 2 : 1;
                                                    }
                                                }
                                                mediaPost += '</div></div>';
                                            } else if (shop_data.product_gallery_templte == 3)
                                            {
                                                var grid_type = [
                                                    [6, 1, 2],
                                                    [2, 1, 6]
                                                ];
                                                var row_type = 1;
                                                mediaPost += '<div class="insta_images" data-link="3">';
                                                if (mediadata.length > 0)
                                                {
                                                    mediaPost += '<div class="galleryParent" data-btnaction="' + shop_data.product_gallery_button_action + '" data-countselector="' + shop_data.product_gallery_cart_count_selector + '"><center><h3>' + shop_data.product_gallery_grid_title + '</h3></center></div>';
                                                }
                                                mediaPost += '<div class="instagram-gid grid-type-3 mobile-items-' + shop_data.product_gallery_mobile_itemper_row + ' insta_images">';
                                                //var totalData = (mediadata.length > Number(shop_data.product_gallery_load_images)) ? Number(shop_data.product_gallery_load_images) : mediadata.length;
                                                for (i = 0; index < totalData; i++)
                                                {
                                                    var grid_type_index = (row_type == 1 ? 0 : 1);

                                                    jQuery.each(grid_type[grid_type_index], function (grid_index, img_display)
                                                    {

                                                        if (img_display > 1)
                                                        {
                                                            for (j = 0; j < img_display; j++)
                                                            {
                                                                if (index >= totalData)
                                                                {
                                                                    return false;
                                                                }
                                                                if (j % 2 == 0)
                                                                {
                                                                    mediaPost += '<div class="instagram-item grid">';
                                                                }
                                                                mediaPost += '<div class="grid-inner-item" type="' + mediadata[index].media_type + '">';
                                                                var x = instaCustomItemGrid(mediaPost, mediadata[index], shop_data, gallery_type);
                                                                mediaPost += x;
                                                                mediaPost += '</div>';
                                                                if (Math.abs(j % 2) == 1)
                                                                {
                                                                    mediaPost += '</div>';
                                                                }
                                                                index++;
                                                                cnt++;
                                                            }
                                                        } else
                                                        {
                                                            if (index >= totalData)
                                                            {
                                                                return false;
                                                            }
                                                            mediaPost += '<div class="instagram-item" type="' + mediadata[index].media_type + '">';
                                                            var x = instaCustomItemGrid(mediaPost, mediadata[index], shop_data, gallery_type);
                                                            mediaPost += x;
                                                            mediaPost += '</div>';
                                                            index++;
                                                            cnt++;
                                                        }
                                                    });


                                                    if (cnt == 9)
                                                    {
                                                        cnt = 0;
                                                        row_type = row_type == 1 ? 2 : 1;
                                                    }
                                                }
                                                mediaPost += '</div></div>';
                                            } else if (shop_data.product_gallery_templte == 4)
                                            {
                                                var grid_type = 4;
                                                mediaPost += '<div class="insta_images" data-link="3">';
                                                if (mediadata.length > 0)
                                                {
                                                    mediaPost += '<div class="galleryParent" data-btnaction="' + shop_data.product_gallery_button_action + '" data-countselector="' + shop_data.product_gallery_cart_count_selector + '"><center><h3>' + shop_data.product_gallery_grid_title + '</h3></center></div>';
                                                }
                                                mediaPost += '<div class="instagram-gid grid-type-4 mobile-items-' + shop_data.product_gallery_mobile_itemper_row + ' insta_images_card">';
                                                //var totalData = (mediadata.length > Number(shop_data.product_gallery_load_images)) ? Number(shop_data.product_gallery_load_images) : mediadata.length;
                                                for (i = 0; index < mediadata.length; i++)
                                                {

                                                    if (grid_type == 4)
                                                    {
                                                        for (j = 0; j < 4; j++)
                                                        {
                                                            if (index >= totalData)
                                                            {
                                                                break;
                                                            }
                                                            if (j == 0)
                                                            {
                                                                mediaPost += '<div class="instagram-item grid">';
                                                            }
                                                            mediaPost += '<div class="grid-inner-item" type="' + mediadata[index].media_type + '">';
                                                            var x = instaCustomItemGrid(mediaPost, mediadata[index], shop_data, gallery_type);
                                                            mediaPost += x;
                                                            mediaPost += '</div>';

                                                            if (j == 3)
                                                            {
                                                                mediaPost += '</div>';
                                                            }
                                                            index++;
                                                            cnt++;
                                                        }
                                                        grid_type = 1;
                                                    } else
                                                    {
                                                        if (index >= totalData)
                                                        {
                                                            break;
                                                        }
                                                        mediaPost += '<div class="instagram-item" type="' + mediadata[index].media_type + '">';
                                                        var x = instaCustomItemGrid(mediaPost, mediadata[index], shop_data, gallery_type);
                                                        mediaPost += x;
                                                        mediaPost += '</div>';
                                                        index++;
                                                        cnt++;
                                                        grid_type = 4;
                                                    }
                                                    if (cnt == 9)
                                                    {
                                                        cnt = 0;
                                                        grid_type = grid_type == 1 ? 1 : 4;
                                                    }
                                                }
                                                mediaPost += '</div></div>';
                                            }
                                        } else
                                        {
                                            mediaPost = '';

                                            mediaPost += '<div id="image-gallery insta_images" class="cardbox galleryParent" data-link="3" data-btnaction="' + shop_data.product_gallery_button_action + '" data-countselector="' + shop_data.product_gallery_cart_count_selector + '">' +
                                                    '<div><center><h3>' + shop_data.insta_grid_title + '</h3></center></div>' +
                                                    '<div class=" homeGallery gallery grid cs-row cs-slick-slider" data-link="3">';
                                            jQuery.each(mediadata, function (i, n)
                                            {

                                                mediaPost += ' <div class="  full-overlay instagram-item" itemprop="associatedMedia" itemscope itemtype="">';

                                                //var x = instaItemGridInner(mediaPost, mediadata[i], shop_data);
                                                //mediaPost +=x;

                                                //if(shop_data.insta_new_tab == '3') {

                                                if (mediadata[i].caption == '' || mediadata[i].caption == null || shop_data.product_gallery_caption == 'false')
                                                    var hasItems = 'noItems';
                                                else
                                                    var hasItems = '';

                                                var y = instaCustomItemGrid(mediaPost, mediadata[i], shop_data, gallery_type);
                                                mediaPost += y;

                                                //}
                                                mediaPost += ' </div>';

                                            });
                                            mediaPost += '</div>' +
                                                    '</div>';
                                        }

                                        jQuery('#cs-instagram-feed-' + gallery_type).html(csInstaCSS + mediaPost);

                                        if (shop_data.product_gallery_grid_choice == 'insta_slider')
                                        {
                                            jQuery(".cs-slick-slider").Slick1(
                                                    {
                                                        infinite: true,
                                                        slidesToShow: shop_data.insta_item_per_rows,
                                                        slidesToScroll: 1,
                                                        speed: 1000,
                                                        autoplay: shop_data.insta_auto_slider,
                                                        autoplaySpeed: 5000,
                                                        arrows: true,
                                                        responsive: [
                                                            {
                                                                breakpoint: 767,
                                                                settings:
                                                                        {
                                                                            slidesToShow: shop_data.insta_mobile_item_per_rows
                                                                        }
                                                            }]
                                                    });
                                        }
                                    }
                                }
                            }
                        }
                        if (result.msg == 404)
                        {
                            if (gallery_type == "productGallery")
                            {
                                if (window.location.href.indexOf('products') > -1)
                                {
                                    console.log(result.error);
                                }
                            } else
                            {
                                console.log(result.error);
                            }
                        }
                    },
                    error: function (xhr, status, error)
                    {
                        console.log(xhr);
                    },
                    complete: function (xhr, status)
                    {
                        if (status === 'error' || !xhr.responseText)
                        {
                            handleError();
                        } else
                        {
                            var mediaResponse = xhr.responseText;
                        }
                    }
                });

        if (gallery_type == "instaPhotoFeed")
        {
            jQuery(document).on('click', '#load_more', function (e)
            {
                e.preventDefault();
                var next_insta_media = jQuery('#load_more').val();
                jQuery('#load_more').text('Loding...');
                jQuery('#load_more').attr('disabled', 'disabled');
                jQuery.ajax(
                        {
                            url: BASE_URLINS + "insta-feed-fronted-more",
                            type: "POST",
                            data:
                                    {
                                        shop: shop_name,
                                        next_page: next_insta_media
                                    },
                            dataType: "JSON",
                            success: function (result)
                            {
                                jQuery('#load_more').text('Load more');
                                jQuery('#load_more').removeAttr('disabled');
                                if (result.msg == 200)
                                {
                                    //append media post
                                    var Base_path = result.Base_url;
                                    var shop_data = result.shop_data;
                                    var mediaPost = '';
                                    var mediadata = result.data;
                                    var cnt = 0;
                                    var index = 0;
                                    var totalData = mediadata.length;
                                    if (shop_data.insta_templte_ipf == 0)
                                    {
                                        mediaPost += '';
                                        jQuery.each(mediadata, function (i, n)
                                        {
                                            mediaPost += ' <figure class="cs-col-' + shop_data.insta_item_per_rows_ipf + ' cs-col-mob-' + shop_data.insta_mobile_item_per_rows_ipf + ' full-overlay instagram-item" itemprop="associatedMedia" itemscope itemtype="">';
                                            var x = instaItemGridInner(mediaPost, mediadata[i], shop_data, gallery_type);
                                            mediaPost += x;
                                            if (shop_data.insta_new_tab_ipf == '3')
                                            {
                                                if (mediadata[i].caption == '' || mediadata[i].caption == null || shop_data.insta_caption_show_ipf == 'false')
                                                    var hasItems = 'noItems';
                                                else
                                                    var hasItems = '';
                                                var y = instaItemDetailPopup(mediaPost, mediadata[i], shop_data, hasItems, gallery_type);
                                                mediaPost += y;
                                            }
                                            mediaPost += ' </figure>';
                                        });
                                    } else if (shop_data.insta_templte_ipf == 1)
                                    {
                                        var grid_type = 4;
                                        for (i = 0; index < mediadata.length; i++)
                                        {
                                            if (grid_type == 4)
                                            {
                                                for (j = 0; j < 4; j++)
                                                {
                                                    if (index >= totalData)
                                                    {
                                                        break;
                                                    }
                                                    if (j == 0)
                                                    {
                                                        mediaPost += '<div class="instagram-item grid">';
                                                    }
                                                    mediaPost += '<div class="grid-inner-item" type="' + mediadata[index].media_type + '">';
                                                    var x = instaItemGridInner(mediaPost, mediadata[index], shop_data, gallery_type);
                                                    mediaPost += x;
                                                    if (shop_data.insta_new_tab_ipf == '3')
                                                    {
                                                        if (mediadata[index].caption == '' || mediadata[index].caption == null || shop_data.insta_caption_show_ipf == 'false')
                                                            var hasItems = 'noItems';
                                                        else
                                                            var hasItems = '';
                                                        var y = instaItemDetailPopup(mediaPost, mediadata[index], shop_data, hasItems, gallery_type);
                                                        mediaPost += y;
                                                    }
                                                    mediaPost += '</div>';
                                                    if (j == 3)
                                                    {
                                                        mediaPost += '</div>';
                                                    }
                                                    index++;
                                                    cnt++;
                                                }
                                                grid_type = 1;
                                            } else
                                            {
                                                if (index >= totalData)
                                                {
                                                    break;
                                                }
                                                mediaPost += '<div class="instagram-item" type="' + mediadata[index].media_type + '">';
                                                var x = instaItemGridInner(mediaPost, mediadata[index], shop_data, gallery_type);
                                                mediaPost += x;
                                                if (shop_data.insta_new_tab_ipf == '3')
                                                {
                                                    if (mediadata[index].caption == '' || mediadata[index].caption == null || shop_data.insta_caption_show_ipf == 'false')
                                                        var hasItems = 'noItems';
                                                    else
                                                        var hasItems = '';
                                                    var y = instaItemDetailPopup(mediaPost, mediadata[index], shop_data, hasItems, gallery_type);
                                                    mediaPost += y;
                                                }
                                                mediaPost += '</div>';
                                                index++;
                                                cnt++;
                                                grid_type = 4;
                                            }
                                            if (cnt == 10)
                                            {
                                                cnt = 0;
                                                grid_type = grid_type == 1 ? 4 : 1;
                                            }
                                        }
                                    } else if (shop_data.insta_templte_ipf == 2)
                                    {
                                        var grid_type = 2;
                                        var row_type = 1;
                                        var row_cnt = 0;
                                        for (i = 0; index < totalData; i++)
                                        {
                                            if (grid_type == 2)
                                            {
                                                for (j = 0; j < 2; j++)
                                                {
                                                    if (index >= totalData)
                                                    {
                                                        break;
                                                    }
                                                    if (j == 0)
                                                    {
                                                        mediaPost += '<div class="instagram-item grid">';
                                                    }
                                                    mediaPost += '<div class="grid-inner-item" type="' + mediadata[index].media_type + '">';
                                                    var x = instaItemGridInner(mediaPost, mediadata[index], shop_data, gallery_type);
                                                    mediaPost += x;
                                                    if (shop_data.insta_new_tab_ipf == '3')
                                                    {
                                                        if (mediadata[index].caption == '' || mediadata[index].caption == null || shop_data.insta_caption_show_ipf == 'false')
                                                            var hasItems = 'noItems';
                                                        else
                                                            var hasItems = '';
                                                        var y = instaItemDetailPopup(mediaPost, mediadata[index], shop_data, hasItems, gallery_type);
                                                        mediaPost += y;
                                                    }
                                                    mediaPost += '</div>';
                                                    if (j == 1)
                                                    {
                                                        mediaPost += '</div>';
                                                    }
                                                    index++;
                                                    cnt++;
                                                    row_cnt++;
                                                }
                                                grid_type = 1;
                                            } else
                                            {
                                                if (index >= totalData)
                                                {
                                                    break;
                                                }
                                                mediaPost += '<div class="instagram-item" type="' + mediadata[index].media_type + '">';
                                                var x = instaItemGridInner(mediaPost, mediadata[index], shop_data, gallery_type);
                                                mediaPost += x;
                                                if (shop_data.insta_new_tab_ipf == '3')
                                                {
                                                    if (mediadata[index].caption == '' || mediadata[index].caption == null || shop_data.insta_caption_show_ipf == 'false')
                                                        var hasItems = 'noItems';
                                                    else
                                                        var hasItems = '';
                                                    var y = instaItemDetailPopup(mediaPost, mediadata[index], shop_data, hasItems, gallery_type);
                                                    mediaPost += y;
                                                }
                                                mediaPost += '</div>';
                                                index++;
                                                cnt++;
                                                row_cnt++;
                                                grid_type = 2;
                                            }
                                            if (row_type == 1 && row_cnt == 5)
                                            {
                                                grid_type = grid_type == 1 ? 2 : 1;
                                            }
                                            if (row_type == 2 && row_cnt == 6)
                                            {
                                                grid_type = grid_type == 1 ? 2 : 1;
                                            }
                                            if (cnt == 8)
                                            {
                                                cnt = 0;
                                                row_cnt = 0;
                                                row_type = row_type == 1 ? 2 : 1;
                                                grid_type = grid_type == 1 ? 2 : 1;
                                            }
                                        }
                                    } else if (shop_data.insta_templte_ipf == 3)
                                    {
                                        var grid_type = [
                                            [6, 1, 2],
                                            [2, 1, 6]
                                        ];
                                        var row_type = 1;
                                        for (i = 0; index < totalData; i++)
                                        {
                                            var grid_type_index = (row_type == 1 ? 0 : 1);
                                            jQuery.each(grid_type[grid_type_index], function (grid_index, img_display)
                                            {
                                                if (img_display > 1)
                                                {
                                                    for (j = 0; j < img_display; j++)
                                                    {
                                                        if (index >= totalData)
                                                        {
                                                            return false;
                                                        }
                                                        if (j % 2 == 0)
                                                        {
                                                            mediaPost += '<div class="instagram-item grid">';
                                                        }
                                                        mediaPost += '<div class="grid-inner-item" type="' + mediadata[index].media_type + '">';
                                                        var x = instaItemGridInner(mediaPost, mediadata[index], shop_data, gallery_type);
                                                        mediaPost += x;
                                                        if (shop_data.insta_new_tab_ipf == '3')
                                                        {
                                                            if (mediadata[index].caption == '' || mediadata[index].caption == null || shop_data.insta_caption_show_ipf == 'false')
                                                                var hasItems = 'noItems';
                                                            else
                                                                var hasItems = '';
                                                            var y = instaItemDetailPopup(mediaPost, mediadata[index], shop_data, hasItems, gallery_type);
                                                            mediaPost += y;
                                                        }
                                                        mediaPost += '</div>';
                                                        if (Math.abs(j % 2) == 1)
                                                        {
                                                            mediaPost += '</div>';
                                                        }
                                                        index++;
                                                        cnt++;
                                                    }
                                                } else
                                                {
                                                    if (index >= totalData)
                                                    {
                                                        return false;
                                                    }
                                                    mediaPost += '<div class="instagram-item" type="' + mediadata[index].media_type + '">';
                                                    var x = instaItemGridInner(mediaPost, mediadata[index], shop_data, gallery_type);
                                                    mediaPost += x;
                                                    if (shop_data.insta_new_tab_ipf == '3')
                                                    {
                                                        if (mediadata[index].caption == '' || mediadata[index].caption == null || shop_data.insta_caption_show_ipf == 'false')
                                                            var hasItems = 'noItems';
                                                        else
                                                            var hasItems = '';
                                                        var y = instaItemDetailPopup(mediaPost, mediadata[index], shop_data, hasItems, gallery_type);
                                                        mediaPost += y;
                                                    }
                                                    mediaPost += '</div>';
                                                    index++;
                                                    cnt++;
                                                }
                                            });
                                            if (cnt == 9)
                                            {
                                                cnt = 0;
                                                row_type = row_type == 1 ? 2 : 1;
                                            }
                                        }
                                    } else if (shop_data.insta_templte_ipf == 4)
                                    {
                                        var grid_type = 4;
                                        for (i = 0; index < mediadata.length; i++)
                                        {
                                            if (grid_type == 4)
                                            {
                                                for (j = 0; j < 4; j++)
                                                {
                                                    if (index >= totalData)
                                                    {
                                                        break;
                                                    }
                                                    if (j == 0)
                                                    {
                                                        mediaPost += '<div class="instagram-item grid">';
                                                    }
                                                    mediaPost += '<div class="grid-inner-item" type="' + mediadata[index].media_type + '">';
                                                    var x = instaItemGridInner(mediaPost, mediadata[index], shop_data, gallery_type);
                                                    mediaPost += x;
                                                    if (shop_data.insta_new_tab_ipf == '3')
                                                    {
                                                        if (mediadata[index].caption == '' || mediadata[index].caption == null || shop_data.insta_caption_show_ipf == 'false')
                                                            var hasItems = 'noItems';
                                                        else
                                                            var hasItems = '';
                                                        var y = instaItemDetailPopup(mediaPost, mediadata[index], shop_data, hasItems, gallery_type);
                                                        mediaPost += y;
                                                    }
                                                    mediaPost += '</div>';
                                                    if (j == 3)
                                                    {
                                                        mediaPost += '</div>';
                                                    }
                                                    index++;
                                                    cnt++;
                                                }
                                                grid_type = 1;
                                            } else
                                            {
                                                if (index >= totalData)
                                                {
                                                    break;
                                                }
                                                mediaPost += '<div class="instagram-item" type="' + mediadata[index].media_type + '">';
                                                var x = instaItemGridInner(mediaPost, mediadata[index], shop_data, gallery_type);
                                                mediaPost += x;
                                                if (shop_data.insta_new_tab_ipf == '3')
                                                {
                                                    if (mediadata[index].caption == '' || mediadata[index].caption == null || shop_data.insta_caption_show_ipf == 'false')
                                                        var hasItems = 'noItems';
                                                    else
                                                        var hasItems = '';
                                                    var y = instaItemDetailPopup(mediaPost, mediadata[index], shop_data, hasItems, gallery_type);
                                                    mediaPost += y;
                                                }
                                                mediaPost += '</div>';
                                                index++;
                                                cnt++;
                                                grid_type = 4;
                                            }
                                            if (cnt == 9)
                                            {
                                                cnt = 0;
                                                grid_type = grid_type == 1 ? 1 : 4;
                                            }
                                        }
                                    }
                                    var div = jQuery('.instagram-gid');
                                    div.append(mediaPost);
                                    //next page link
                                    var nextPage = result.nextmorepagelink;
                                    if (nextPage != '' && nextPage != undefined && nextPage != null)
                                    {
                                        var load_more_btn = '<center><button class="button secondary" id="load_more" style="background:' + shop_data.insta_load_btn_bg_color + '" value="' + nextPage + '"><span style="color:' + shop_data.insta_load_btn_font_color + '">' + shop_data.insta_load_more + '</span></button></center>';
                                        jQuery(".load-more-btn").html(load_more_btn);
                                    } else
                                    {
                                        jQuery(".load-more-btn").html('');
                                    }
                                }
                            }
                        });
            });
        }

        if (gallery_type == "visibleGallery")
        {

            jQuery('body').on('click', '#load_more_media', function (e)
            {
                e.preventDefault();
                var shopname = jQuery(this).data('shopname');
                var pageno = jQuery(this).data('pageno');
                var medialength = jQuery(this).data('medialength');
                loadMoreMedia(shopname, pageno, medialength);
            });


            function loadMoreMedia(shopname, pageno, medialength)
            {
                // alert(shopname);
                // alert(pageno);
                jQuery('#load_more_media').attr('disabled', 'disabled');
                jQuery.ajax(
                        {
                            url: BASE_URLINS + "insta-feed-fronted-visible-media-more",
                            type: "GET",
                            data:
                                    {
                                        shop: shopname,
                                        pageno: pageno
                                    },
                            dataType: "json",
                            success: function (result)
                            {
                                // alert('success');
                                jQuery('#load_more_media').removeAttr('disabled');
                                if (result.msg == 200)
                                {

                                    var Base_path = result.Base_url;
                                    var shop_data = result.shop_data;
                                    var pagenumber = result.pageno;

                                    //insta media
                                    var mediaPost = '';
                                    var mediadata = result.media;
                                    var cnt = 0;
                                    var index = 0;
                                    var totalData = mediadata.length;
                                    if (shop_data.popup_templte == 0)
                                    {
                                        jQuery.each(mediadata, function (i, n)
                                        {

                                            mediaPost
                                                    += ' <figure class="cs-col-' + shop_data.popup_desktop_itemper_row + ' cs-col-mob-' + shop_data.popup_mobile_item_per_row + ' mobile-items-' + shop_data.popup_mobile_item_per_row + ' instagram-item" itemprop="associatedMedia" itemscope itemtype="">';

                                            var x = instaCustomItemGrid(mediaPost, mediadata[i], shop_data, gallery_type);
                                            mediaPost += x;

                                            mediaPost += ' </figure>';

                                        });

                                        /*var div = jQuery('.gallery');
                                         div.append(mediaPost);
                                         
                                         //next page link
                                         var pagenumber = result.pageno;
                                         
                                         if(pagenumber != '' && pagenumber != undefined && pagenumber != null){
                                         var load_more_btn = '<p align="center"><button class="button secondary" id="load_more_media" data-shopname="'+shop_data.shop_name+'" data-pageno="'+pagenumber+'">'+shop_data.popup_load_more_button_title+'</button></p>';
                                         jQuery(".load_more_btn").html(load_more_btn);
                                         }else{
                                         jQuery(".load_more_btn").html('');
                                         }*/
                                    } else if (shop_data.popup_templte == 1)
                                    {
                                        var grid_type = 4;
                                        for (i = 0; index < mediadata.length; i++)
                                        {


                                            if (grid_type == 4)
                                            {
                                                for (j = 0; j < 4; j++)
                                                {
                                                    if (j == 0)
                                                    {
                                                        mediaPost += '<div class="instagram-item grid">';
                                                    }
                                                    if (index >= totalData)
                                                    {
                                                        break;
                                                    }
                                                    mediaPost += '<div class="grid-inner-item" type="' + mediadata[index].media_type + '">';
                                                    var x = instaCustomItemGrid(mediaPost, mediadata[index], shop_data, gallery_type);
                                                    mediaPost += x;
                                                    mediaPost += '</div>';

                                                    if (j == 3)
                                                    {
                                                        mediaPost += '</div>';
                                                    }
                                                    index++;
                                                    cnt++;
                                                }
                                                grid_type = 1;
                                            } else
                                            {
                                                if (index >= totalData)
                                                {
                                                    break;
                                                }
                                                mediaPost += '<div class="instagram-item " type="' + mediadata[index].media_type + '">';
                                                var x = instaCustomItemGrid(mediaPost, mediadata[index], shop_data, gallery_type);
                                                mediaPost += x;
                                                mediaPost += '</div>';
                                                index++;
                                                cnt++;
                                                grid_type = 4;
                                            }
                                            if (cnt == 10)
                                            {
                                                cnt = 0;
                                                grid_type = grid_type == 1 ? 4 : 1;
                                            }
                                        }
                                        // mediaPost += '<div class="load_more_btn"></div>';
                                    } else if (shop_data.popup_templte == 2)
                                    {
                                        var grid_type = 2;
                                        var row_type = 1;
                                        var row_cnt = 0;
                                        for (i = 0; index < totalData; i++)
                                        {

                                            if (grid_type == 2)
                                            {
                                                for (j = 0; j < 2; j++)
                                                {
                                                    if (index >= totalData)
                                                    {
                                                        break;
                                                    }
                                                    if (j == 0)
                                                    {
                                                        mediaPost += '<div class="instagram-item grid">';
                                                    }
                                                    mediaPost += '<div class="grid-inner-item" type="' + mediadata[index].media_type + '">';
                                                    var x = instaCustomItemGrid(mediaPost, mediadata[index], shop_data, gallery_type);
                                                    mediaPost += x;
                                                    mediaPost += '</div>';
                                                    if (j == 1)
                                                    {
                                                        mediaPost += '</div>';
                                                    }
                                                    index++;
                                                    cnt++;
                                                    row_cnt++;
                                                }
                                                grid_type = 1;
                                            } else
                                            {
                                                if (index >= totalData)
                                                {
                                                    break;
                                                }
                                                mediaPost += '<div class="instagram-item" type="' + mediadata[index].media_type + '">';
                                                var x = instaCustomItemGrid(mediaPost, mediadata[index], shop_data, gallery_type);
                                                mediaPost += x;
                                                mediaPost += '</div>';
                                                index++;
                                                cnt++;
                                                row_cnt++;
                                                grid_type = 2;
                                            }

                                            if (row_type == 1 && row_cnt == 5)
                                            {
                                                grid_type = grid_type == 1 ? 2 : 1;
                                            }
                                            if (row_type == 2 && row_cnt == 6)
                                            {
                                                grid_type = grid_type == 1 ? 2 : 1;
                                            }

                                            if (cnt == 8)
                                            {
                                                cnt = 0;
                                                row_cnt = 0;
                                                row_type = row_type == 1 ? 2 : 1;
                                                grid_type = grid_type == 1 ? 2 : 1;
                                            }
                                        }
                                    } else if (shop_data.popup_templte == 3)
                                    {
                                        var grid_type = [
                                            [6, 1, 2],
                                            [2, 1, 6]
                                        ];
                                        var row_type = 1;
                                        for (i = 0; index < totalData; i++)
                                        {
                                            var grid_type_index = (row_type == 1 ? 0 : 1);

                                            jQuery.each(grid_type[grid_type_index], function (grid_index, img_display)
                                            {
                                                var productdata = mediadata[index].tagproducts;
                                                if (jQuery.isEmptyObject(productdata) != true || shop_data.popup_caption == 'true')
                                                    var hasItems = '';
                                                else
                                                    var hasItems = 'noItems';
                                                if (img_display > 1)
                                                {
                                                    for (j = 0; j < img_display; j++)
                                                    {
                                                        if (index >= totalData)
                                                        {
                                                            return false;
                                                        }
                                                        if (j % 2 == 0)
                                                        {
                                                            mediaPost += '<div class="instagram-item grid">';
                                                        }
                                                        mediaPost += '<div class="grid-inner-item" type="' + mediadata[index].media_type + '">';
                                                        var x = instaCustomItemGrid(mediaPost, mediadata[index], shop_data, gallery_type);
                                                        mediaPost += x;
                                                        mediaPost += '</div>';
                                                        if (Math.abs(j % 2) == 1)
                                                        {
                                                            mediaPost += '</div>';
                                                        }
                                                        index++;
                                                        cnt++;
                                                    }
                                                } else
                                                {
                                                    if (index >= totalData)
                                                    {
                                                        return false;
                                                    }
                                                    mediaPost += '<div class="instagram-item" type="' + mediadata[index].media_type + '">';
                                                    var x = instaCustomItemGrid(mediaPost, mediadata[index], shop_data, gallery_type);
                                                    mediaPost += x;
                                                    mediaPost += '</div>';
                                                    index++;
                                                    cnt++;
                                                }
                                            });


                                            if (cnt == 9)
                                            {
                                                cnt = 0;
                                                row_type = row_type == 1 ? 2 : 1;
                                            }
                                        }
                                    } else if (shop_data.popup_templte == 4)
                                    {
                                        var grid_type = 4;
                                        for (i = 0; index < mediadata.length; i++)
                                        {

                                            if (grid_type == 4)
                                            {
                                                for (j = 0; j < 4; j++)
                                                {
                                                    if (index >= totalData)
                                                    {
                                                        break;
                                                    }
                                                    if (j == 0)
                                                    {
                                                        mediaPost += '<div class="instagram-item grid">';
                                                    }
                                                    mediaPost += '<div class="grid-inner-item" type="' + mediadata[index].media_type + '">';
                                                    var x = instaCustomItemGrid(mediaPost, mediadata[index], shop_data, gallery_type);
                                                    mediaPost += x;
                                                    mediaPost += '</div>';

                                                    if (j == 3)
                                                    {
                                                        mediaPost += '</div>';
                                                    }
                                                    index++;
                                                    cnt++;
                                                }
                                                grid_type = 1;
                                            } else
                                            {
                                                if (index >= totalData)
                                                {
                                                    break;
                                                }
                                                mediaPost += '<div class="instagram-item" type="' + mediadata[index].media_type + '">';
                                                var x = instaCustomItemGrid(mediaPost, mediadata[index], shop_data, gallery_type);
                                                mediaPost += x;

                                                mediaPost += '</div>';
                                                index++;
                                                cnt++;
                                                grid_type = 4;
                                            }
                                            if (cnt == 9)
                                            {
                                                cnt = 0;
                                                grid_type = grid_type == 1 ? 1 : 4;
                                            }
                                        }
                                    }

                                    //mediaPost += '<div class="load_more_btn"></div>';

                                    var div = jQuery('.instagram-gid');
                                    div.append(mediaPost);

                                    //next page link

                                    var pagenumber = result.pageno;
                                    var mediadata_length = result.start + result.limit;
                                    if (pagenumber != '' && pagenumber != undefined && pagenumber != null)
                                    {
                                        var load_more_btn = '<center><button class="button secondary" id="load_more_media" style="background:' + shop_data.popup_load_btn_bg_color + '" data-medialength="' + mediadata_length + '" data-shopname="' + shop_data.shop_name + '" data-pageno="' + pagenumber + '"><span style="color:' + shop_data.popup_load_btn_font_color + '">' + shop_data.popup_load_more_button_title + '</span></button></center>';
                                        jQuery(".load-more-btn").html(load_more_btn);
                                    } else
                                    {
                                        jQuery(".load-more-btn").html('');
                                    }


                                }
                                if (result.msg == 404)
                                {
                                    // alert(result.error);
                                    console.log(result.error);
                                    //jQuery('#cs-instagram-feed-'+gallery_type).html(result.error);
                                }
                            },
                            error: function (xhr, status, error)
                            {
                                console.log(xhr);
                            },
                            complete: function (xhr, status)
                            {
                                if (status === 'error' || !xhr.responseText)
                                {
                                    handleError();
                                } else
                                {
                                    var mediaResponse = xhr.responseText;
                                }
                            }
                        });
            }
        }

        jQuery('body').on('click', '.popup-slide', function ()
        {
            jQuery('body').addClass('popup-open');
            // jQuery(this).next('.fs-normal-timeline').fadeIn();
            var wh = jQuery(window).innerHeight();
            var st = jQuery(window).scrollTop();
            //var ph = jQuery(this).next('.fs-normal-timeline').height();
            //console.log(st,wh,ph);
            // jQuery('.fs-add-to-cart-enabled').css('top',(st-wh-100)+'px');
            jQuery('body > .fs-normal-timeline').remove();
            jQuery(this).next('.fs-normal-timeline').clone().appendTo("body").show().addClass('onBody');

        });
        jQuery('body').on('click', '.popup-slide-close', function ()
        {
            jQuery('body').removeClass('popup-open');
            jQuery('body > .fs-normal-timeline').remove();
            //jQuery(this).closest('.fs-normal-timeline').fadeOut();
        });

        jQuery('body').on('click', '.nextItem', function ()
        {
            var btn = jQuery(this);
            var x = jQuery('body.popup-open > .fs-normal-timeline').attr('data-itemid');
            var btn = jQuery('[data-itemid="' + x + '"]:not(.onBody) .nextItem');

            //console.log(btn);

            jQuery('body > .fs-normal-timeline').remove();
            //btn.closest('.fs-normal-timeline').fadeOut();      
            if (jQuery(btn).closest('.grid-inner-item').length > 0)
            {
                if (jQuery(btn).closest('.grid-inner-item').next('.grid-inner-item').length > 0)
                {
                    //btn.closest('.grid-inner-item').next('.grid-inner-item').find('.fs-normal-timeline').fadeIn();
                    jQuery(btn).closest('.grid-inner-item').next('.grid-inner-item').find('.fs-normal-timeline').clone().appendTo("body").show();
                } else
                {
                    if (jQuery(btn).closest('.instagram-item').next('.instagram-item').length > 0)
                    {
                        if (jQuery(btn).closest('.instagram-item').next('.instagram-item').find('.grid-inner-item').length > 0)
                        {
                            jQuery(btn).closest('.instagram-item').next('.instagram-item').find('.grid-inner-item').first().find('.fs-normal-timeline').clone().appendTo("body").show();
                        } else
                        {
                            jQuery(btn).closest('.instagram-item').next('.instagram-item').find('.fs-normal-timeline').clone().appendTo("body").show();
                        }
                    }
                }
            } else
            {

                if (jQuery(btn).closest('.instagram-item').next('.instagram-item').length > 0)
                {
                    if (jQuery(btn).closest('.instagram-item').next('.instagram-item').find('.grid-inner-item').length > 0)
                    {
                        jQuery(btn).closest('.instagram-item').next('.instagram-item').find('.grid-inner-item').first().find('.fs-normal-timeline').clone().appendTo("body").show();
                    } else
                    {
                        jQuery(btn).closest('.instagram-item').next('.instagram-item').find('.fs-normal-timeline').clone().appendTo("body").show();
                    }
                } else if (jQuery(btn).closest('.Slick1-slide').next('.Slick1-slide').length > 0)
                {

                    jQuery(btn).first().closest('.Slick1-slide').next('.Slick1-slide').find('.fs-normal-timeline').clone().appendTo("body").show();

                }
            }
            //jQuery(x).appendTo("body").show();
        });


        jQuery('body').on('click', '.prevItem', function ()
        {
            var btn = jQuery(this);
            //btn.closest('.fs-normal-timeline').fadeOut();
            var x = jQuery('body.popup-open > .fs-normal-timeline').attr('data-itemid');
            var btn = jQuery('[data-itemid="' + x + '"]:not(.onBody) .prevItem');
            jQuery('body > .fs-normal-timeline').remove();

            if (jQuery(btn).closest('.grid-inner-item').length > 0)
            {
                if (jQuery(btn).closest('.grid-inner-item').prev('.grid-inner-item').length > 0)
                {
                    jQuery(btn).closest('.grid-inner-item').prev('.grid-inner-item').find('.fs-normal-timeline').clone().appendTo("body").show();
                } else
                {
                    if (jQuery(btn).closest('.instagram-item').prev('.instagram-item').length > 0)
                    {
                        if (jQuery(btn).closest('.instagram-item').prev('.instagram-item').find('.grid-inner-item').length > 0)
                        {
                            jQuery(btn).closest('.instagram-item').prev('.instagram-item').find('.grid-inner-item').last().find('.fs-normal-timeline').clone().appendTo("body").show();
                        } else
                        {
                            jQuery(btn).closest('.instagram-item').prev('.instagram-item').find('.fs-normal-timeline').clone().appendTo("body").show();
                        }
                    }
                }
            } else
            {
                if (jQuery(btn).closest('.instagram-item').prev('.instagram-item').length > 0)
                {
                    if (jQuery(btn).closest('.instagram-item').prev('.instagram-item').find('.grid-inner-item').length > 0)
                    {
                        jQuery(btn).closest('.instagram-item').prev('.instagram-item').find('.grid-inner-item').last().find('.fs-normal-timeline').clone().appendTo("body").show();
                    } else
                    {
                        jQuery(btn).closest('.instagram-item').prev('.instagram-item').find('.fs-normal-timeline').clone().appendTo("body").show();
                    }
                } else if (jQuery(btn).closest('.Slick1-slide').prev('.Slick1-slide').length > 0)
                {

                    jQuery(btn).first().closest('.Slick1-slide').prev('.Slick1-slide').find('.fs-normal-timeline').clone().appendTo("body").show();

                }
            }
        });
        jQuery('body').on('click', '#fs-dismiss', function (e)
        {
            jQuery(this).closest('.fs-detail-outer-container').removeClass('fs-slid-active');
        });
        jQuery('body').on('click', '.fs-shopify-add-cart-container', function (e)
        {
            var addtocart = (jQuery(this).data('addtocart_title') != '' && jQuery(this).data('addtocart_title') != undefined && jQuery(this).data('addtocart_title') != null) ? jQuery(this).data('addtocart_title') : 'ADD TO CART',
                    soldout = (jQuery(this).data('soldout_title') != '' && jQuery(this).data('soldout_title') != undefined && jQuery(this).data('soldout_title') != null) ? jQuery(this).data('soldout_title') : 'Soldout',
                    cancel = (jQuery(this).data('cancel_title') != '' && jQuery(this).data('cancel_title') != undefined && jQuery(this).data('cancel_title') != null) ? jQuery(this).data('cancel_title') : 'Cancel',
                    added_text = (jQuery(this).data('added_text_title') != '' && jQuery(this).data('added_text_title') != undefined && jQuery(this).data('added_text_title') != null) ? jQuery(this).data('added_text_title') : 'Added to Cart',
                    continue_shopping_text = (jQuery(this).data('continue_shopping_text_title') != '' && jQuery(this).data('continue_shopping_text_title') != undefined && jQuery(this).data('continue_shopping_text_title') != null) ? jQuery(this).data('continue_shopping_text_title') : 'Continue Shopping',
                    checkout = (jQuery(this).data('checkout_title') != '' && jQuery(this).data('checkout_title') != undefined && jQuery(this).data('checkout_title') != null) ? jQuery(this).data('checkout_title') : 'Proceed to Checkout',
                    shop = jQuery(this).data('shop');

            var _self = jQuery(this);
            var url = jQuery(this).data('handle');
            console.log(jQuery('.galleryParent').data('btnaction'));
            if (jQuery('.galleryParent').data('btnaction') == 'add_produc') {
                jQuery(_self).closest('.fs-detail-outer-container').addClass('fs-slid-active');
                jQuery(_self).closest('.fs-detail-outer-container').find('.fs-buy-container').addClass('fs-loader').html('Loading Product information.....');
                jQuery.getJSON('/apps/csinstafeed?shop=' + shop + '&pro=' + url, function (result)
                {
                    var data = result.product;
                    var mf = result.format;
                    var selectOtionbtn = '';
                    var showAddTocart = '';
                    if (data.variants.length > 1)
                    {
                        var selectOtionbtn = '<span class="select_options_btn">Select Options</span>';
                        var opt = '<select id="productSelectMain-' + data.id + '" name="id" data-productid="' + data.id + '">';
                        var x = 0;
                        var selectedVID = '';
                        // console.log(data.variants);

                        jQuery.each(data.variants, function (key, value)
                        {
                            if (value.available == true && x == 0)
                            {
                                selectedVID = 'selected="selected"';
                                x = 1;
                            } else
                            {
                                selectedVID = '';
                            }
                            opt += '<option value="' + value.id + '" ' + selectedVID + ' >' + value.title + '</option>';
                        });
                        opt += '</select>'
                        var form_data = '<form action="/cart/add" class="addtocartForm productSelectMain-' + data.id + '"  data-productid="' + data.id + '" method="post">' +
                                '<div class="fs-large-text">' + data.title + '</div>' +
                                '<img id="fs-buy-featured-image" src=' + data.featured_image + '>' +
                                '<div class="select_option">' + opt + '</div>' +
                                '<button type="submit" name="add" id="AddToCartMain"><span>' + addtocart + '</span></button><a class="fs-buy-button fs-medium-text" tabindex="0" id="fs-dismiss">' + cancel + '</a>' +
                                '</form>';
                        jQuery(_self).closest('.fs-detail-outer-container').find('.fs-buy-container').html(form_data).removeClass('fs-loader');
                        var selectCallbackPro = function (variant, selector)
                        {
                            if (variant)
                            {
                                if (variant.featured_image) {
                                    jQuery('#fs-buy-featured-image').attr('src', variant.featured_image.src);
                                }
                                if (variant.price < variant.compare_at_price)
                                {
                                    jQuery('.addToCartSticky #ProductPrice').html(Shopify.formatMoney(variant.price, mf));
                                    jQuery('.addToCartSticky #ComparePrice').html(Shopify.formatMoney(variant.compare_at_price, mf));
                                } else
                                {
                                    jQuery('.addToCartSticky #ProductPrice').html(Shopify.formatMoney(variant.price, mf));
                                    jQuery('.addToCartSticky #ComparePrice').html('');
                                }
                            }
                            if (variant && variant.available)
                            {
                                jQuery('#AddToCartMain').removeAttr('disabled').removeClass('disabled').find('span').text(addtocart);
                            } else
                            {
                                jQuery('#AddToCartMain').addClass('disabled').attr('disabled', 'disabled').find('span').text(soldout);
                            }
                        };
                        if (data.variants.length > 1)
                        {
                            new Shopify.OptionSelectors('productSelectMain-' + data.id,
                                    {
                                        product: data,
                                        onVariantSelected: selectCallbackPro,
                                        enableHistoryState: false
                                    });
                        }

                        jQuery('body').on('click', '#AddToCartMain', function (e)
                        {
                            e.preventDefault();
                            var btn = jQuery(this);
                            var form = jQuery(this).closest('form');
                            var form_parent = jQuery(form).parent();
                            btn.attr('disabled', 'disabled');
                            jQuery(this).addClass('addtocart-button-loading');
                            jQuery.ajax(
                                    {
                                        type: 'POST',
                                        url: '/cart/add.js',
                                        data: form.serialize(),
                                        dataType: 'json',
                                        error: function (jqXHR, textStatus, errorThrown)
                                        {
                                            var response = jQuery.parseJSON(jqXHR.responseText);
                                            jQuery('.error').remove();
                                            form.append('<div class="error">' + response.description + '</div>');
                                            btn.removeAttr('disabled');
                                        }
                                    }).done(function (data)
                            {
                                jQuery('#AddToCartMain').removeClass('addtocart-button-loading');
                                btn.removeAttr('disabled');
                                var done_data = '<div class="fs-added-notification fs-buy-now-form"><div class="fs-large-text">' + added_text + '</div><div class="fs-isolation"></div><div class="fs-large-text">' + data.title + '</div><img id="fs-buy-featured-image" src=' + data.image + '><div class="fs-button-bar"><a class="fs-buy-button fs-medium-text" href="/cart/"  id="fs-proceed" >' + checkout + '</a><a class="fs-buy-button fs-medium-text" tabindex="0" id="fs-dismiss">' + continue_shopping_text + '</a></div></div>';
                                jQuery(_self).closest('.fs-detail-outer-container').find('.fs-buy-container').html(done_data).removeClass('fs-loader');
                            });
                        });
                    } else
                    {
                        jQuery.ajax(
                                {
                                    url: '/cart/add.js',
                                    type: 'POST',
                                    dataType: 'json',
                                    data:
                                            {
                                                id: data.variants[0].id,
                                                quantity: 1
                                            },
                                    async: false,
                                    error: function (err)
                                    {
                                        jQuery('.error').remove();
                                        form.append('<div class="error">' + err.description + '</div>');
                                    }
                                }).done(function (data)
                        {
                            jQuery(_self).closest('.fs-detail-outer-container').find('.fs-buy-container').html(form_data).removeClass('fs-loader');
                            var done_data = '<div class="fs-added-notification fs-buy-now-form"><div class="fs-large-text">' + added_text + '</div><div class="fs-isolation"></div><div class="fs-large-text">' + data.title + '</div><img id="fs-buy-featured-image" src=' + data.image + '><div class="fs-button-bar"><a class="fs-buy-button fs-medium-text" href="/cart/"  id="fs-proceed" >' + checkout + '</a><a class="fs-buy-button fs-medium-text" tabindex="0" id="fs-dismiss">' + continue_shopping_text + '</a></div></div>';
                            jQuery(_self).closest('.fs-detail-outer-container').find('.fs-buy-container').html(done_data).removeClass('fs-loader');
                        });
                    }
                });
            } else {
                console.log('refresh_page');
                window.location = "/products/" + url;
            }

        });
    }
}