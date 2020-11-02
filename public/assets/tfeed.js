var BASE_URLINS = "https://rivyo.com/thfeed/";
var pageno = 0;
var shop_name = "wc-ketan.myshopify.com";
window.loadScript = function (url, callback)
{
    var script = document.createElement("script");
    script.type = "text/javascript";
    if (script.readyState) {
        script.onreadystatechange = function () {
            if (script.readyState == "loaded" || script.readyState == "complete") {
                script.onreadystatechange = null;
                callback();
            }
        };
    } else {
        script.onload = function () {
            callback();
        };
    }
    script.src = url;
    document.getElementsByTagName("head")[0].appendChild(script);
};
if ((typeof (jQuery) == 'undefined') || (parseInt(jQuery.fn.jquery) == 3 && parseFloat(jQuery.fn.jquery.replace(/^1\./, "")) < 2.1)) {
    loadScript('https://ajax.googleapis.com/ajax/libs/jquery/3.5.1/jquery.min.js', function () {
        jQuery321 = jQuery.noConflict(false);
        myJQueryCode(jQuery321);
    });
} else {
    myJQueryCode(jQuery);
}

function myJQueryCode(jQuery) {
    if (!jQuery("link[href='" + BASE_URLINS + "assets/gallerysetting.css']").length > 0) {
        var linkx = document.createElement('link');
        linkx.rel = 'stylesheet';
        linkx.type = 'text/css';
        linkx.href = BASE_URLINS + 'assets/gallerysetting.css';
        document.getElementsByTagName('head')[0].appendChild(linkx);
    }
    if (!jQuery("link[href='" + BASE_URLINS + "assets/slick.css']").length > 0) {
        var linkx = document.createElement('link');
        linkx.rel = 'stylesheet';
        linkx.type = 'text/css';
        linkx.href = BASE_URLINS + 'assets/slick.css';
        document.getElementsByTagName('head')[0].appendChild(linkx);
    }
    !function (i) {
        "use strict";
        "function" == typeof define && define.amd ? define(["jquery"], i) : "undefined" != typeof exports ? module.exports = i(require("jquery")) : i(jQuery)
    }(function (i) {
        "use strict";
        var e = window.Slick || {};
        (e = function () {
            var e = 0;
            return function (t, o) {
                var s, n = this;
                n.defaults = {accessibility: !0, adaptiveHeight: !1, appendArrows: i(t), appendDots: i(t), arrows: !0, asNavFor: null, prevArrow: '<button class="slick-prev" aria-label="Previous" type="button">Previous</button>', nextArrow: '<button class="slick-next" aria-label="Next" type="button">Next</button>', autoplay: !1, autoplaySpeed: 3e3, centerMode: !1, centerPadding: "50px", cssEase: "ease", customPaging: function (e, t) {
                        return i('<button type="button" />').text(t + 1)
                    }, dots: !1, dotsClass: "slick-dots", draggable: !0, easing: "linear", edgeFriction: .35, fade: !1, focusOnSelect: !1, focusOnChange: !1, infinite: !0, initialSlide: 0, lazyLoad: "ondemand", mobileFirst: !1, pauseOnHover: !0, pauseOnFocus: !0, pauseOnDotsHover: !1, respondTo: "window", responsive: null, rows: 1, rtl: !1, slide: "", slidesPerRow: 1, slidesToShow: 1, slidesToScroll: 1, speed: 500, swipe: !0, swipeToSlide: !1, touchMove: !0, touchThreshold: 5, useCSS: !0, useTransform: !0, variableWidth: !1, vertical: !1, verticalSwiping: !1, waitForAnimate: !0, zIndex: 1e3}, n.initials = {animating: !1, dragging: !1, autoPlayTimer: null, currentDirection: 0, currentLeft: null, currentSlide: 0, direction: 1, $dots: null, listWidth: null, listHeight: null, loadIndex: 0, $nextArrow: null, $prevArrow: null, scrolling: !1, slideCount: null, slideWidth: null, $slideTrack: null, $slides: null, sliding: !1, slideOffset: 0, swipeLeft: null, swiping: !1, $list: null, touchObject: {}, transformsEnabled: !1, unslicked: !1}, i.extend(n, n.initials), n.activeBreakpoint = null, n.animType = null, n.animProp = null, n.breakpoints = [], n.breakpointSettings = [], n.cssTransitions = !1, n.focussed = !1, n.interrupted = !1, n.hidden = "hidden", n.paused = !0, n.positionProp = null, n.respondTo = null, n.rowCount = 1, n.shouldClick = !0, n.$slider = i(t), n.$slidesCache = null, n.transformType = null, n.transitionType = null, n.visibilityChange = "visibilitychange", n.windowWidth = 0, n.windowTimer = null, s = i(t).data("slick") || {}, n.options = i.extend({}, n.defaults, o, s), n.currentSlide = n.options.initialSlide, n.originalSettings = n.options, void 0 !== document.mozHidden ? (n.hidden = "mozHidden", n.visibilityChange = "mozvisibilitychange") : void 0 !== document.webkitHidden && (n.hidden = "webkitHidden", n.visibilityChange = "webkitvisibilitychange"), n.autoPlay = i.proxy(n.autoPlay, n), n.autoPlayClear = i.proxy(n.autoPlayClear, n), n.autoPlayIterator = i.proxy(n.autoPlayIterator, n), n.changeSlide = i.proxy(n.changeSlide, n), n.clickHandler = i.proxy(n.clickHandler, n), n.selectHandler = i.proxy(n.selectHandler, n), n.setPosition = i.proxy(n.setPosition, n), n.swipeHandler = i.proxy(n.swipeHandler, n), n.dragHandler = i.proxy(n.dragHandler, n), n.keyHandler = i.proxy(n.keyHandler, n), n.instanceUid = e++, n.htmlExpr = /^(?:\s*(<[\w\W]+>)[^>]*)$/, n.registerBreakpoints(), n.init(!0)
            }
        }()).prototype.activateADA = function () {
            this.$slideTrack.find(".slick-active").attr({"aria-hidden": "false"}).find("a, input, button, select").attr({tabindex: "0"})
        }, e.prototype.addSlide = e.prototype.slickAdd = function (e, t, o) {
            var s = this;
            if ("boolean" == typeof t)
                o = t, t = null;
            else if (t < 0 || t >= s.slideCount)
                return!1;
            s.unload(), "number" == typeof t ? 0 === t && 0 === s.$slides.length ? i(e).appendTo(s.$slideTrack) : o ? i(e).insertBefore(s.$slides.eq(t)) : i(e).insertAfter(s.$slides.eq(t)) : !0 === o ? i(e).prependTo(s.$slideTrack) : i(e).appendTo(s.$slideTrack), s.$slides = s.$slideTrack.children(this.options.slide), s.$slideTrack.children(this.options.slide).detach(), s.$slideTrack.append(s.$slides), s.$slides.each(function (e, t) {
                i(t).attr("data-slick-index", e)
            }), s.$slidesCache = s.$slides, s.reinit()
        }, e.prototype.animateHeight = function () {
            var i = this;
            if (1 === i.options.slidesToShow && !0 === i.options.adaptiveHeight && !1 === i.options.vertical) {
                var e = i.$slides.eq(i.currentSlide).outerHeight(!0);
                i.$list.animate({height: e}, i.options.speed)
            }
        }, e.prototype.animateSlide = function (e, t) {
            var o = {}, s = this;
            s.animateHeight(), !0 === s.options.rtl && !1 === s.options.vertical && (e = -e), !1 === s.transformsEnabled ? !1 === s.options.vertical ? s.$slideTrack.animate({left: e}, s.options.speed, s.options.easing, t) : s.$slideTrack.animate({top: e}, s.options.speed, s.options.easing, t) : !1 === s.cssTransitions ? (!0 === s.options.rtl && (s.currentLeft = -s.currentLeft), i({animStart: s.currentLeft}).animate({animStart: e}, {duration: s.options.speed, easing: s.options.easing, step: function (i) {
                    i = Math.ceil(i), !1 === s.options.vertical ? (o[s.animType] = "translate(" + i + "px, 0px)", s.$slideTrack.css(o)) : (o[s.animType] = "translate(0px," + i + "px)", s.$slideTrack.css(o))
                }, complete: function () {
                    t && t.call()
                }})) : (s.applyTransition(), e = Math.ceil(e), !1 === s.options.vertical ? o[s.animType] = "translate3d(" + e + "px, 0px, 0px)" : o[s.animType] = "translate3d(0px," + e + "px, 0px)", s.$slideTrack.css(o), t && setTimeout(function () {
                s.disableTransition(), t.call()
            }, s.options.speed))
        }, e.prototype.getNavTarget = function () {
            var e = this, t = e.options.asNavFor;
            return t && null !== t && (t = i(t).not(e.$slider)), t
        }, e.prototype.asNavFor = function (e) {
            var t = this.getNavTarget();
            null !== t && "object" == typeof t && t.each(function () {
                var t = i(this).slick("getSlick");
                t.unslicked || t.slideHandler(e, !0)
            })
        }, e.prototype.applyTransition = function (i) {
            var e = this, t = {};
            !1 === e.options.fade ? t[e.transitionType] = e.transformType + " " + e.options.speed + "ms " + e.options.cssEase : t[e.transitionType] = "opacity " + e.options.speed + "ms " + e.options.cssEase, !1 === e.options.fade ? e.$slideTrack.css(t) : e.$slides.eq(i).css(t)
        }, e.prototype.autoPlay = function () {
            var i = this;
            i.autoPlayClear(), i.slideCount > i.options.slidesToShow && (i.autoPlayTimer = setInterval(i.autoPlayIterator, i.options.autoplaySpeed))
        }, e.prototype.autoPlayClear = function () {
            var i = this;
            i.autoPlayTimer && clearInterval(i.autoPlayTimer)
        }, e.prototype.autoPlayIterator = function () {
            var i = this, e = i.currentSlide + i.options.slidesToScroll;
            i.paused || i.interrupted || i.focussed || (!1 === i.options.infinite && (1 === i.direction && i.currentSlide + 1 === i.slideCount - 1 ? i.direction = 0 : 0 === i.direction && (e = i.currentSlide - i.options.slidesToScroll, i.currentSlide - 1 == 0 && (i.direction = 1))), i.slideHandler(e))
        }, e.prototype.buildArrows = function () {
            var e = this;
            !0 === e.options.arrows && (e.$prevArrow = i(e.options.prevArrow).addClass("slick-arrow"), e.$nextArrow = i(e.options.nextArrow).addClass("slick-arrow"), e.slideCount > e.options.slidesToShow ? (e.$prevArrow.removeClass("slick-hidden").removeAttr("aria-hidden tabindex"), e.$nextArrow.removeClass("slick-hidden").removeAttr("aria-hidden tabindex"), e.htmlExpr.test(e.options.prevArrow) && e.$prevArrow.prependTo(e.options.appendArrows), e.htmlExpr.test(e.options.nextArrow) && e.$nextArrow.appendTo(e.options.appendArrows), !0 !== e.options.infinite && e.$prevArrow.addClass("slick-disabled").attr("aria-disabled", "true")) : e.$prevArrow.add(e.$nextArrow).addClass("slick-hidden").attr({"aria-disabled": "true", tabindex: "-1"}))
        }, e.prototype.buildDots = function () {
            var e, t, o = this;
            if (!0 === o.options.dots) {
                for (o.$slider.addClass("slick-dotted"), t = i("<ul />").addClass(o.options.dotsClass), e = 0; e <= o.getDotCount(); e += 1)
                    t.append(i("<li />").append(o.options.customPaging.call(this, o, e)));
                o.$dots = t.appendTo(o.options.appendDots), o.$dots.find("li").first().addClass("slick-active")
            }
        }, e.prototype.buildOut = function () {
            var e = this;
            e.$slides = e.$slider.children(e.options.slide + ":not(.slick-cloned)").addClass("slick-slide"), e.slideCount = e.$slides.length, e.$slides.each(function (e, t) {
                i(t).attr("data-slick-index", e).data("originalStyling", i(t).attr("style") || "")
            }), e.$slider.addClass("slick-slider"), e.$slideTrack = 0 === e.slideCount ? i('<div class="slick-track"/>').appendTo(e.$slider) : e.$slides.wrapAll('<div class="slick-track"/>').parent(), e.$list = e.$slideTrack.wrap('<div class="slick-list"/>').parent(), e.$slideTrack.css("opacity", 0), !0 !== e.options.centerMode && !0 !== e.options.swipeToSlide || (e.options.slidesToScroll = 1), i("img[data-lazy]", e.$slider).not("[src]").addClass("slick-loading"), e.setupInfinite(), e.buildArrows(), e.buildDots(), e.updateDots(), e.setSlideClasses("number" == typeof e.currentSlide ? e.currentSlide : 0), !0 === e.options.draggable && e.$list.addClass("draggable")
        }, e.prototype.buildRows = function () {
            var i, e, t, o, s, n, r, l = this;
            if (o = document.createDocumentFragment(), n = l.$slider.children(), l.options.rows > 1) {
                for (r = l.options.slidesPerRow * l.options.rows, s = Math.ceil(n.length / r), i = 0; i < s; i++) {
                    var d = document.createElement("div");
                    for (e = 0; e < l.options.rows; e++) {
                        var a = document.createElement("div");
                        for (t = 0; t < l.options.slidesPerRow; t++) {
                            var c = i * r + (e * l.options.slidesPerRow + t);
                            n.get(c) && a.appendChild(n.get(c))
                        }
                        d.appendChild(a)
                    }
                    o.appendChild(d)
                }
                l.$slider.empty().append(o), l.$slider.children().children().children().css({width: 100 / l.options.slidesPerRow + "%", display: "inline-block"})
            }
        }, e.prototype.checkResponsive = function (e, t) {
            var o, s, n, r = this, l = !1, d = r.$slider.width(), a = window.innerWidth || i(window).width();
            if ("window" === r.respondTo ? n = a : "slider" === r.respondTo ? n = d : "min" === r.respondTo && (n = Math.min(a, d)), r.options.responsive && r.options.responsive.length && null !== r.options.responsive) {
                s = null;
                for (o in r.breakpoints)
                    r.breakpoints.hasOwnProperty(o) && (!1 === r.originalSettings.mobileFirst ? n < r.breakpoints[o] && (s = r.breakpoints[o]) : n > r.breakpoints[o] && (s = r.breakpoints[o]));
                null !== s ? null !== r.activeBreakpoint ? (s !== r.activeBreakpoint || t) && (r.activeBreakpoint = s, "unslick" === r.breakpointSettings[s] ? r.unslick(s) : (r.options = i.extend({}, r.originalSettings, r.breakpointSettings[s]), !0 === e && (r.currentSlide = r.options.initialSlide), r.refresh(e)), l = s) : (r.activeBreakpoint = s, "unslick" === r.breakpointSettings[s] ? r.unslick(s) : (r.options = i.extend({}, r.originalSettings, r.breakpointSettings[s]), !0 === e && (r.currentSlide = r.options.initialSlide), r.refresh(e)), l = s) : null !== r.activeBreakpoint && (r.activeBreakpoint = null, r.options = r.originalSettings, !0 === e && (r.currentSlide = r.options.initialSlide), r.refresh(e), l = s), e || !1 === l || r.$slider.trigger("breakpoint", [r, l])
            }
        }, e.prototype.changeSlide = function (e, t) {
            var o, s, n, r = this, l = i(e.currentTarget);
            switch (l.is("a") && e.preventDefault(), l.is("li") || (l = l.closest("li")), n = r.slideCount % r.options.slidesToScroll != 0, o = n ? 0 : (r.slideCount - r.currentSlide) % r.options.slidesToScroll, e.data.message) {
                case"previous":
                    s = 0 === o ? r.options.slidesToScroll : r.options.slidesToShow - o, r.slideCount > r.options.slidesToShow && r.slideHandler(r.currentSlide - s, !1, t);
                    break;
                case"next":
                    s = 0 === o ? r.options.slidesToScroll : o, r.slideCount > r.options.slidesToShow && r.slideHandler(r.currentSlide + s, !1, t);
                    break;
                case"index":
                    var d = 0 === e.data.index ? 0 : e.data.index || l.index() * r.options.slidesToScroll;
                    r.slideHandler(r.checkNavigable(d), !1, t), l.children().trigger("focus");
                    break;
                default:
                    return
            }
        }, e.prototype.checkNavigable = function (i) {
            var e, t;
            if (e = this.getNavigableIndexes(), t = 0, i > e[e.length - 1])
                i = e[e.length - 1];
            else
                for (var o in e) {
                    if (i < e[o]) {
                        i = t;
                        break
                    }
                    t = e[o]
                }
            return i
        }, e.prototype.cleanUpEvents = function () {
            var e = this;
            e.options.dots && null !== e.$dots && (i("li", e.$dots).off("click.slick", e.changeSlide).off("mouseenter.slick", i.proxy(e.interrupt, e, !0)).off("mouseleave.slick", i.proxy(e.interrupt, e, !1)), !0 === e.options.accessibility && e.$dots.off("keydown.slick", e.keyHandler)), e.$slider.off("focus.slick blur.slick"), !0 === e.options.arrows && e.slideCount > e.options.slidesToShow && (e.$prevArrow && e.$prevArrow.off("click.slick", e.changeSlide), e.$nextArrow && e.$nextArrow.off("click.slick", e.changeSlide), !0 === e.options.accessibility && (e.$prevArrow && e.$prevArrow.off("keydown.slick", e.keyHandler), e.$nextArrow && e.$nextArrow.off("keydown.slick", e.keyHandler))), e.$list.off("touchstart.slick mousedown.slick", e.swipeHandler), e.$list.off("touchmove.slick mousemove.slick", e.swipeHandler), e.$list.off("touchend.slick mouseup.slick", e.swipeHandler), e.$list.off("touchcancel.slick mouseleave.slick", e.swipeHandler), e.$list.off("click.slick", e.clickHandler), i(document).off(e.visibilityChange, e.visibility), e.cleanUpSlideEvents(), !0 === e.options.accessibility && e.$list.off("keydown.slick", e.keyHandler), !0 === e.options.focusOnSelect && i(e.$slideTrack).children().off("click.slick", e.selectHandler), i(window).off("orientationchange.slick.slick-" + e.instanceUid, e.orientationChange), i(window).off("resize.slick.slick-" + e.instanceUid, e.resize), i("[draggable!=true]", e.$slideTrack).off("dragstart", e.preventDefault), i(window).off("load.slick.slick-" + e.instanceUid, e.setPosition)
        }, e.prototype.cleanUpSlideEvents = function () {
            var e = this;
            e.$list.off("mouseenter.slick", i.proxy(e.interrupt, e, !0)), e.$list.off("mouseleave.slick", i.proxy(e.interrupt, e, !1))
        }, e.prototype.cleanUpRows = function () {
            var i, e = this;
            e.options.rows > 1 && ((i = e.$slides.children().children()).removeAttr("style"), e.$slider.empty().append(i))
        }, e.prototype.clickHandler = function (i) {
            !1 === this.shouldClick && (i.stopImmediatePropagation(), i.stopPropagation(), i.preventDefault())
        }, e.prototype.destroy = function (e) {
            var t = this;
            t.autoPlayClear(), t.touchObject = {}, t.cleanUpEvents(), i(".slick-cloned", t.$slider).detach(), t.$dots && t.$dots.remove(), t.$prevArrow && t.$prevArrow.length && (t.$prevArrow.removeClass("slick-disabled slick-arrow slick-hidden").removeAttr("aria-hidden aria-disabled tabindex").css("display", ""), t.htmlExpr.test(t.options.prevArrow) && t.$prevArrow.remove()), t.$nextArrow && t.$nextArrow.length && (t.$nextArrow.removeClass("slick-disabled slick-arrow slick-hidden").removeAttr("aria-hidden aria-disabled tabindex").css("display", ""), t.htmlExpr.test(t.options.nextArrow) && t.$nextArrow.remove()), t.$slides && (t.$slides.removeClass("slick-slide slick-active slick-center slick-visible slick-current").removeAttr("aria-hidden").removeAttr("data-slick-index").each(function () {
                i(this).attr("style", i(this).data("originalStyling"))
            }), t.$slideTrack.children(this.options.slide).detach(), t.$slideTrack.detach(), t.$list.detach(), t.$slider.append(t.$slides)), t.cleanUpRows(), t.$slider.removeClass("slick-slider"), t.$slider.removeClass("slick-initialized"), t.$slider.removeClass("slick-dotted"), t.unslicked = !0, e || t.$slider.trigger("destroy", [t])
        }, e.prototype.disableTransition = function (i) {
            var e = this, t = {};
            t[e.transitionType] = "", !1 === e.options.fade ? e.$slideTrack.css(t) : e.$slides.eq(i).css(t)
        }, e.prototype.fadeSlide = function (i, e) {
            var t = this;
            !1 === t.cssTransitions ? (t.$slides.eq(i).css({zIndex: t.options.zIndex}), t.$slides.eq(i).animate({opacity: 1}, t.options.speed, t.options.easing, e)) : (t.applyTransition(i), t.$slides.eq(i).css({opacity: 1, zIndex: t.options.zIndex}), e && setTimeout(function () {
                t.disableTransition(i), e.call()
            }, t.options.speed))
        }, e.prototype.fadeSlideOut = function (i) {
            var e = this;
            !1 === e.cssTransitions ? e.$slides.eq(i).animate({opacity: 0, zIndex: e.options.zIndex - 2}, e.options.speed, e.options.easing) : (e.applyTransition(i), e.$slides.eq(i).css({opacity: 0, zIndex: e.options.zIndex - 2}))
        }, e.prototype.filterSlides = e.prototype.slickFilter = function (i) {
            var e = this;
            null !== i && (e.$slidesCache = e.$slides, e.unload(), e.$slideTrack.children(this.options.slide).detach(), e.$slidesCache.filter(i).appendTo(e.$slideTrack), e.reinit())
        }, e.prototype.focusHandler = function () {
            var e = this;
            e.$slider.off("focus.slick blur.slick").on("focus.slick blur.slick", "*", function (t) {
                t.stopImmediatePropagation();
                var o = i(this);
                setTimeout(function () {
                    e.options.pauseOnFocus && (e.focussed = o.is(":focus"), e.autoPlay())
                }, 0)
            })
        }, e.prototype.getCurrent = e.prototype.slickCurrentSlide = function () {
            return this.currentSlide
        }, e.prototype.getDotCount = function () {
            var i = this, e = 0, t = 0, o = 0;
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
        }, e.prototype.getLeft = function (i) {
            var e, t, o, s, n = this, r = 0;
            return n.slideOffset = 0, t = n.$slides.first().outerHeight(!0), !0 === n.options.infinite ? (n.slideCount > n.options.slidesToShow && (n.slideOffset = n.slideWidth * n.options.slidesToShow * -1, s = -1, !0 === n.options.vertical && !0 === n.options.centerMode && (2 === n.options.slidesToShow ? s = -1.5 : 1 === n.options.slidesToShow && (s = -2)), r = t * n.options.slidesToShow * s), n.slideCount % n.options.slidesToScroll != 0 && i + n.options.slidesToScroll > n.slideCount && n.slideCount > n.options.slidesToShow && (i > n.slideCount ? (n.slideOffset = (n.options.slidesToShow - (i - n.slideCount)) * n.slideWidth * -1, r = (n.options.slidesToShow - (i - n.slideCount)) * t * -1) : (n.slideOffset = n.slideCount % n.options.slidesToScroll * n.slideWidth * -1, r = n.slideCount % n.options.slidesToScroll * t * -1))) : i + n.options.slidesToShow > n.slideCount && (n.slideOffset = (i + n.options.slidesToShow - n.slideCount) * n.slideWidth, r = (i + n.options.slidesToShow - n.slideCount) * t), n.slideCount <= n.options.slidesToShow && (n.slideOffset = 0, r = 0), !0 === n.options.centerMode && n.slideCount <= n.options.slidesToShow ? n.slideOffset = n.slideWidth * Math.floor(n.options.slidesToShow) / 2 - n.slideWidth * n.slideCount / 2 : !0 === n.options.centerMode && !0 === n.options.infinite ? n.slideOffset += n.slideWidth * Math.floor(n.options.slidesToShow / 2) - n.slideWidth : !0 === n.options.centerMode && (n.slideOffset = 0, n.slideOffset += n.slideWidth * Math.floor(n.options.slidesToShow / 2)), e = !1 === n.options.vertical ? i * n.slideWidth * -1 + n.slideOffset : i * t * -1 + r, !0 === n.options.variableWidth && (o = n.slideCount <= n.options.slidesToShow || !1 === n.options.infinite ? n.$slideTrack.children(".slick-slide").eq(i) : n.$slideTrack.children(".slick-slide").eq(i + n.options.slidesToShow), e = !0 === n.options.rtl ? o[0] ? -1 * (n.$slideTrack.width() - o[0].offsetLeft - o.width()) : 0 : o[0] ? -1 * o[0].offsetLeft : 0, !0 === n.options.centerMode && (o = n.slideCount <= n.options.slidesToShow || !1 === n.options.infinite ? n.$slideTrack.children(".slick-slide").eq(i) : n.$slideTrack.children(".slick-slide").eq(i + n.options.slidesToShow + 1), e = !0 === n.options.rtl ? o[0] ? -1 * (n.$slideTrack.width() - o[0].offsetLeft - o.width()) : 0 : o[0] ? -1 * o[0].offsetLeft : 0, e += (n.$list.width() - o.outerWidth()) / 2)), e
        }, e.prototype.getOption = e.prototype.slickGetOption = function (i) {
            return this.options[i]
        }, e.prototype.getNavigableIndexes = function () {
            var i, e = this, t = 0, o = 0, s = [];
            for (!1 === e.options.infinite?i = e.slideCount:(t = - 1 * e.options.slidesToScroll, o = - 1 * e.options.slidesToScroll, i = 2 * e.slideCount); t < i; )
                s.push(t), t = o + e.options.slidesToScroll, o += e.options.slidesToScroll <= e.options.slidesToShow ? e.options.slidesToScroll : e.options.slidesToShow;
            return s
        }, e.prototype.getSlick = function () {
            return this
        }, e.prototype.getSlideCount = function () {
            var e, t, o = this;
            return t = !0 === o.options.centerMode ? o.slideWidth * Math.floor(o.options.slidesToShow / 2) : 0, !0 === o.options.swipeToSlide ? (o.$slideTrack.find(".slick-slide").each(function (s, n) {
                if (n.offsetLeft - t + i(n).outerWidth() / 2 > -1 * o.swipeLeft)
                    return e = n, !1
            }), Math.abs(i(e).attr("data-slick-index") - o.currentSlide) || 1) : o.options.slidesToScroll
        }, e.prototype.goTo = e.prototype.slickGoTo = function (i, e) {
            this.changeSlide({data: {message: "index", index: parseInt(i)}}, e)
        }, e.prototype.init = function (e) {
            var t = this;
            i(t.$slider).hasClass("slick-initialized") || (i(t.$slider).addClass("slick-initialized"), t.buildRows(), t.buildOut(), t.setProps(), t.startLoad(), t.loadSlider(), t.initializeEvents(), t.updateArrows(), t.updateDots(), t.checkResponsive(!0), t.focusHandler()), e && t.$slider.trigger("init", [t]), !0 === t.options.accessibility && t.initADA(), t.options.autoplay && (t.paused = !1, t.autoPlay())
        }, e.prototype.initADA = function () {
            var e = this, t = Math.ceil(e.slideCount / e.options.slidesToShow), o = e.getNavigableIndexes().filter(function (i) {
                return i >= 0 && i < e.slideCount
            });
            e.$slides.add(e.$slideTrack.find(".slick-cloned")).attr({"aria-hidden": "true", tabindex: "-1"}).find("a, input, button, select").attr({tabindex: "-1"}), null !== e.$dots && (e.$slides.not(e.$slideTrack.find(".slick-cloned")).each(function (t) {
                var s = o.indexOf(t);
                i(this).attr({role: "tabpanel", id: "slick-slide" + e.instanceUid + t, tabindex: -1}), -1 !== s && i(this).attr({"aria-describedby": "slick-slide-control" + e.instanceUid + s})
            }), e.$dots.attr("role", "tablist").find("li").each(function (s) {
                var n = o[s];
                i(this).attr({role: "presentation"}), i(this).find("button").first().attr({role: "tab", id: "slick-slide-control" + e.instanceUid + s, "aria-controls": "slick-slide" + e.instanceUid + n, "aria-label": s + 1 + " of " + t, "aria-selected": null, tabindex: "-1"})
            }).eq(e.currentSlide).find("button").attr({"aria-selected": "true", tabindex: "0"}).end());
            for (var s = e.currentSlide, n = s + e.options.slidesToShow; s < n; s++)
                e.$slides.eq(s).attr("tabindex", 0);
            e.activateADA()
        }, e.prototype.initArrowEvents = function () {
            var i = this;
            !0 === i.options.arrows && i.slideCount > i.options.slidesToShow && (i.$prevArrow.off("click.slick").on("click.slick", {message: "previous"}, i.changeSlide), i.$nextArrow.off("click.slick").on("click.slick", {message: "next"}, i.changeSlide), !0 === i.options.accessibility && (i.$prevArrow.on("keydown.slick", i.keyHandler), i.$nextArrow.on("keydown.slick", i.keyHandler)))
        }, e.prototype.initDotEvents = function () {
            var e = this;
            !0 === e.options.dots && (i("li", e.$dots).on("click.slick", {message: "index"}, e.changeSlide), !0 === e.options.accessibility && e.$dots.on("keydown.slick", e.keyHandler)), !0 === e.options.dots && !0 === e.options.pauseOnDotsHover && i("li", e.$dots).on("mouseenter.slick", i.proxy(e.interrupt, e, !0)).on("mouseleave.slick", i.proxy(e.interrupt, e, !1))
        }, e.prototype.initSlideEvents = function () {
            var e = this;
            e.options.pauseOnHover && (e.$list.on("mouseenter.slick", i.proxy(e.interrupt, e, !0)), e.$list.on("mouseleave.slick", i.proxy(e.interrupt, e, !1)))
        }, e.prototype.initializeEvents = function () {
            var e = this;
            e.initArrowEvents(), e.initDotEvents(), e.initSlideEvents(), e.$list.on("touchstart.slick mousedown.slick", {action: "start"}, e.swipeHandler), e.$list.on("touchmove.slick mousemove.slick", {action: "move"}, e.swipeHandler), e.$list.on("touchend.slick mouseup.slick", {action: "end"}, e.swipeHandler), e.$list.on("touchcancel.slick mouseleave.slick", {action: "end"}, e.swipeHandler), e.$list.on("click.slick", e.clickHandler), i(document).on(e.visibilityChange, i.proxy(e.visibility, e)), !0 === e.options.accessibility && e.$list.on("keydown.slick", e.keyHandler), !0 === e.options.focusOnSelect && i(e.$slideTrack).children().on("click.slick", e.selectHandler), i(window).on("orientationchange.slick.slick-" + e.instanceUid, i.proxy(e.orientationChange, e)), i(window).on("resize.slick.slick-" + e.instanceUid, i.proxy(e.resize, e)), i("[draggable!=true]", e.$slideTrack).on("dragstart", e.preventDefault), i(window).on("load.slick.slick-" + e.instanceUid, e.setPosition), i(e.setPosition)
        }, e.prototype.initUI = function () {
            var i = this;
            !0 === i.options.arrows && i.slideCount > i.options.slidesToShow && (i.$prevArrow.show(), i.$nextArrow.show()), !0 === i.options.dots && i.slideCount > i.options.slidesToShow && i.$dots.show()
        }, e.prototype.keyHandler = function (i) {
            var e = this;
            i.target.tagName.match("TEXTAREA|INPUT|SELECT") || (37 === i.keyCode && !0 === e.options.accessibility ? e.changeSlide({data: {message: !0 === e.options.rtl ? "next" : "previous"}}) : 39 === i.keyCode && !0 === e.options.accessibility && e.changeSlide({data: {message: !0 === e.options.rtl ? "previous" : "next"}}))
        }, e.prototype.lazyLoad = function () {
            function e(e) {
                i("img[data-lazy]", e).each(function () {
                    var e = i(this), t = i(this).attr("data-lazy"), o = i(this).attr("data-srcset"), s = i(this).attr("data-sizes") || n.$slider.attr("data-sizes"), r = document.createElement("img");
                    r.onload = function () {
                        e.animate({opacity: 0}, 100, function () {
                            o && (e.attr("srcset", o), s && e.attr("sizes", s)), e.attr("src", t).animate({opacity: 1}, 200, function () {
                                e.removeAttr("data-lazy data-srcset data-sizes").removeClass("slick-loading")
                            }), n.$slider.trigger("lazyLoaded", [n, e, t])
                        })
                    }, r.onerror = function () {
                        e.removeAttr("data-lazy").removeClass("slick-loading").addClass("slick-lazyload-error"), n.$slider.trigger("lazyLoadError", [n, e, t])
                    }, r.src = t
                })
            }
            var t, o, s, n = this;
            if (!0 === n.options.centerMode ? !0 === n.options.infinite ? s = (o = n.currentSlide + (n.options.slidesToShow / 2 + 1)) + n.options.slidesToShow + 2 : (o = Math.max(0, n.currentSlide - (n.options.slidesToShow / 2 + 1)), s = n.options.slidesToShow / 2 + 1 + 2 + n.currentSlide) : (o = n.options.infinite ? n.options.slidesToShow + n.currentSlide : n.currentSlide, s = Math.ceil(o + n.options.slidesToShow), !0 === n.options.fade && (o > 0 && o--, s <= n.slideCount && s++)), t = n.$slider.find(".slick-slide").slice(o, s), "anticipated" === n.options.lazyLoad)
                for (var r = o - 1, l = s, d = n.$slider.find(".slick-slide"), a = 0; a < n.options.slidesToScroll; a++)
                    r < 0 && (r = n.slideCount - 1), t = (t = t.add(d.eq(r))).add(d.eq(l)), r--, l++;
            e(t), n.slideCount <= n.options.slidesToShow ? e(n.$slider.find(".slick-slide")) : n.currentSlide >= n.slideCount - n.options.slidesToShow ? e(n.$slider.find(".slick-cloned").slice(0, n.options.slidesToShow)) : 0 === n.currentSlide && e(n.$slider.find(".slick-cloned").slice(-1 * n.options.slidesToShow))
        }, e.prototype.loadSlider = function () {
            var i = this;
            i.setPosition(), i.$slideTrack.css({opacity: 1}), i.$slider.removeClass("slick-loading"), i.initUI(), "progressive" === i.options.lazyLoad && i.progressiveLazyLoad()
        }, e.prototype.next = e.prototype.slickNext = function () {
            this.changeSlide({data: {message: "next"}})
        }, e.prototype.orientationChange = function () {
            var i = this;
            i.checkResponsive(), i.setPosition()
        }, e.prototype.pause = e.prototype.slickPause = function () {
            var i = this;
            i.autoPlayClear(), i.paused = !0
        }, e.prototype.play = e.prototype.slickPlay = function () {
            var i = this;
            i.autoPlay(), i.options.autoplay = !0, i.paused = !1, i.focussed = !1, i.interrupted = !1
        }, e.prototype.postSlide = function (e) {
            var t = this;
            t.unslicked || (t.$slider.trigger("afterChange", [t, e]), t.animating = !1, t.slideCount > t.options.slidesToShow && t.setPosition(), t.swipeLeft = null, t.options.autoplay && t.autoPlay(), !0 === t.options.accessibility && (t.initADA(), t.options.focusOnChange && i(t.$slides.get(t.currentSlide)).attr("tabindex", 0).focus()))
        }, e.prototype.prev = e.prototype.slickPrev = function () {
            this.changeSlide({data: {message: "previous"}})
        }, e.prototype.preventDefault = function (i) {
            i.preventDefault()
        }, e.prototype.progressiveLazyLoad = function (e) {
            e = e || 1;
            var t, o, s, n, r, l = this, d = i("img[data-lazy]", l.$slider);
            d.length ? (t = d.first(), o = t.attr("data-lazy"), s = t.attr("data-srcset"), n = t.attr("data-sizes") || l.$slider.attr("data-sizes"), (r = document.createElement("img")).onload = function () {
                s && (t.attr("srcset", s), n && t.attr("sizes", n)), t.attr("src", o).removeAttr("data-lazy data-srcset data-sizes").removeClass("slick-loading"), !0 === l.options.adaptiveHeight && l.setPosition(), l.$slider.trigger("lazyLoaded", [l, t, o]), l.progressiveLazyLoad()
            }, r.onerror = function () {
                e < 3 ? setTimeout(function () {
                    l.progressiveLazyLoad(e + 1)
                }, 500) : (t.removeAttr("data-lazy").removeClass("slick-loading").addClass("slick-lazyload-error"), l.$slider.trigger("lazyLoadError", [l, t, o]), l.progressiveLazyLoad())
            }, r.src = o) : l.$slider.trigger("allImagesLoaded", [l])
        }, e.prototype.refresh = function (e) {
            var t, o, s = this;
            o = s.slideCount - s.options.slidesToShow, !s.options.infinite && s.currentSlide > o && (s.currentSlide = o), s.slideCount <= s.options.slidesToShow && (s.currentSlide = 0), t = s.currentSlide, s.destroy(!0), i.extend(s, s.initials, {currentSlide: t}), s.init(), e || s.changeSlide({data: {message: "index", index: t}}, !1)
        }, e.prototype.registerBreakpoints = function () {
            var e, t, o, s = this, n = s.options.responsive || null;
            if ("array" === i.type(n) && n.length) {
                s.respondTo = s.options.respondTo || "window";
                for (e in n)
                    if (o = s.breakpoints.length - 1, n.hasOwnProperty(e)) {
                        for (t = n[e].breakpoint; o >= 0; )
                            s.breakpoints[o] && s.breakpoints[o] === t && s.breakpoints.splice(o, 1), o--;
                        s.breakpoints.push(t), s.breakpointSettings[t] = n[e].settings
                    }
                s.breakpoints.sort(function (i, e) {
                    return s.options.mobileFirst ? i - e : e - i
                })
            }
        }, e.prototype.reinit = function () {
            var e = this;
            e.$slides = e.$slideTrack.children(e.options.slide).addClass("slick-slide"), e.slideCount = e.$slides.length, e.currentSlide >= e.slideCount && 0 !== e.currentSlide && (e.currentSlide = e.currentSlide - e.options.slidesToScroll), e.slideCount <= e.options.slidesToShow && (e.currentSlide = 0), e.registerBreakpoints(), e.setProps(), e.setupInfinite(), e.buildArrows(), e.updateArrows(), e.initArrowEvents(), e.buildDots(), e.updateDots(), e.initDotEvents(), e.cleanUpSlideEvents(), e.initSlideEvents(), e.checkResponsive(!1, !0), !0 === e.options.focusOnSelect && i(e.$slideTrack).children().on("click.slick", e.selectHandler), e.setSlideClasses("number" == typeof e.currentSlide ? e.currentSlide : 0), e.setPosition(), e.focusHandler(), e.paused = !e.options.autoplay, e.autoPlay(), e.$slider.trigger("reInit", [e])
        }, e.prototype.resize = function () {
            var e = this;
            i(window).width() !== e.windowWidth && (clearTimeout(e.windowDelay), e.windowDelay = window.setTimeout(function () {
                e.windowWidth = i(window).width(), e.checkResponsive(), e.unslicked || e.setPosition()
            }, 50))
        }, e.prototype.removeSlide = e.prototype.slickRemove = function (i, e, t) {
            var o = this;
            if (i = "boolean" == typeof i ? !0 === (e = i) ? 0 : o.slideCount - 1 : !0 === e ? --i : i, o.slideCount < 1 || i < 0 || i > o.slideCount - 1)
                return!1;
            o.unload(), !0 === t ? o.$slideTrack.children().remove() : o.$slideTrack.children(this.options.slide).eq(i).remove(), o.$slides = o.$slideTrack.children(this.options.slide), o.$slideTrack.children(this.options.slide).detach(), o.$slideTrack.append(o.$slides), o.$slidesCache = o.$slides, o.reinit()
        }, e.prototype.setCSS = function (i) {
            var e, t, o = this, s = {};
            !0 === o.options.rtl && (i = -i), e = "left" == o.positionProp ? Math.ceil(i) + "px" : "0px", t = "top" == o.positionProp ? Math.ceil(i) + "px" : "0px", s[o.positionProp] = i, !1 === o.transformsEnabled ? o.$slideTrack.css(s) : (s = {}, !1 === o.cssTransitions ? (s[o.animType] = "translate(" + e + ", " + t + ")", o.$slideTrack.css(s)) : (s[o.animType] = "translate3d(" + e + ", " + t + ", 0px)", o.$slideTrack.css(s)))
        }, e.prototype.setDimensions = function () {
            var i = this;
            !1 === i.options.vertical ? !0 === i.options.centerMode && i.$list.css({padding: "0px " + i.options.centerPadding}) : (i.$list.height(i.$slides.first().outerHeight(!0) * i.options.slidesToShow), !0 === i.options.centerMode && i.$list.css({padding: i.options.centerPadding + " 0px"})), i.listWidth = i.$list.width(), i.listHeight = i.$list.height(), !1 === i.options.vertical && !1 === i.options.variableWidth ? (i.slideWidth = Math.ceil(i.listWidth / i.options.slidesToShow), i.$slideTrack.width(Math.ceil(i.slideWidth * i.$slideTrack.children(".slick-slide").length))) : !0 === i.options.variableWidth ? i.$slideTrack.width(5e3 * i.slideCount) : (i.slideWidth = Math.ceil(i.listWidth), i.$slideTrack.height(Math.ceil(i.$slides.first().outerHeight(!0) * i.$slideTrack.children(".slick-slide").length)));
            var e = i.$slides.first().outerWidth(!0) - i.$slides.first().width();
            !1 === i.options.variableWidth && i.$slideTrack.children(".slick-slide").width(i.slideWidth - e)
        }, e.prototype.setFade = function () {
            var e, t = this;
            t.$slides.each(function (o, s) {
                e = t.slideWidth * o * -1, !0 === t.options.rtl ? i(s).css({position: "relative", right: e, top: 0, zIndex: t.options.zIndex - 2, opacity: 0}) : i(s).css({position: "relative", left: e, top: 0, zIndex: t.options.zIndex - 2, opacity: 0})
            }), t.$slides.eq(t.currentSlide).css({zIndex: t.options.zIndex - 1, opacity: 1})
        }, e.prototype.setHeight = function () {
            var i = this;
            if (1 === i.options.slidesToShow && !0 === i.options.adaptiveHeight && !1 === i.options.vertical) {
                var e = i.$slides.eq(i.currentSlide).outerHeight(!0);
                i.$list.css("height", e)
            }
        }, e.prototype.setOption = e.prototype.slickSetOption = function () {
            var e, t, o, s, n, r = this, l = !1;
            if ("object" === i.type(arguments[0]) ? (o = arguments[0], l = arguments[1], n = "multiple") : "string" === i.type(arguments[0]) && (o = arguments[0], s = arguments[1], l = arguments[2], "responsive" === arguments[0] && "array" === i.type(arguments[1]) ? n = "responsive" : void 0 !== arguments[1] && (n = "single")), "single" === n)
                r.options[o] = s;
            else if ("multiple" === n)
                i.each(o, function (i, e) {
                    r.options[i] = e
                });
            else if ("responsive" === n)
                for (t in s)
                    if ("array" !== i.type(r.options.responsive))
                        r.options.responsive = [s[t]];
                    else {
                        for (e = r.options.responsive.length - 1; e >= 0; )
                            r.options.responsive[e].breakpoint === s[t].breakpoint && r.options.responsive.splice(e, 1), e--;
                        r.options.responsive.push(s[t])
                    }
            l && (r.unload(), r.reinit())
        }, e.prototype.setPosition = function () {
            var i = this;
            i.setDimensions(), i.setHeight(), !1 === i.options.fade ? i.setCSS(i.getLeft(i.currentSlide)) : i.setFade(), i.$slider.trigger("setPosition", [i])
        }, e.prototype.setProps = function () {
            var i = this, e = document.body.style;
            i.positionProp = !0 === i.options.vertical ? "top" : "left", "top" === i.positionProp ? i.$slider.addClass("slick-vertical") : i.$slider.removeClass("slick-vertical"), void 0 === e.WebkitTransition && void 0 === e.MozTransition && void 0 === e.msTransition || !0 === i.options.useCSS && (i.cssTransitions = !0), i.options.fade && ("number" == typeof i.options.zIndex ? i.options.zIndex < 3 && (i.options.zIndex = 3) : i.options.zIndex = i.defaults.zIndex), void 0 !== e.OTransform && (i.animType = "OTransform", i.transformType = "-o-transform", i.transitionType = "OTransition", void 0 === e.perspectiveProperty && void 0 === e.webkitPerspective && (i.animType = !1)), void 0 !== e.MozTransform && (i.animType = "MozTransform", i.transformType = "-moz-transform", i.transitionType = "MozTransition", void 0 === e.perspectiveProperty && void 0 === e.MozPerspective && (i.animType = !1)), void 0 !== e.webkitTransform && (i.animType = "webkitTransform", i.transformType = "-webkit-transform", i.transitionType = "webkitTransition", void 0 === e.perspectiveProperty && void 0 === e.webkitPerspective && (i.animType = !1)), void 0 !== e.msTransform && (i.animType = "msTransform", i.transformType = "-ms-transform", i.transitionType = "msTransition", void 0 === e.msTransform && (i.animType = !1)), void 0 !== e.transform && !1 !== i.animType && (i.animType = "transform", i.transformType = "transform", i.transitionType = "transition"), i.transformsEnabled = i.options.useTransform && null !== i.animType && !1 !== i.animType
        }, e.prototype.setSlideClasses = function (i) {
            var e, t, o, s, n = this;
            if (t = n.$slider.find(".slick-slide").removeClass("slick-active slick-center slick-current").attr("aria-hidden", "true"), n.$slides.eq(i).addClass("slick-current"), !0 === n.options.centerMode) {
                var r = n.options.slidesToShow % 2 == 0 ? 1 : 0;
                e = Math.floor(n.options.slidesToShow / 2), !0 === n.options.infinite && (i >= e && i <= n.slideCount - 1 - e ? n.$slides.slice(i - e + r, i + e + 1).addClass("slick-active").attr("aria-hidden", "false") : (o = n.options.slidesToShow + i, t.slice(o - e + 1 + r, o + e + 2).addClass("slick-active").attr("aria-hidden", "false")), 0 === i ? t.eq(t.length - 1 - n.options.slidesToShow).addClass("slick-center") : i === n.slideCount - 1 && t.eq(n.options.slidesToShow).addClass("slick-center")), n.$slides.eq(i).addClass("slick-center")
            } else
                i >= 0 && i <= n.slideCount - n.options.slidesToShow ? n.$slides.slice(i, i + n.options.slidesToShow).addClass("slick-active").attr("aria-hidden", "false") : t.length <= n.options.slidesToShow ? t.addClass("slick-active").attr("aria-hidden", "false") : (s = n.slideCount % n.options.slidesToShow, o = !0 === n.options.infinite ? n.options.slidesToShow + i : i, n.options.slidesToShow == n.options.slidesToScroll && n.slideCount - i < n.options.slidesToShow ? t.slice(o - (n.options.slidesToShow - s), o + s).addClass("slick-active").attr("aria-hidden", "false") : t.slice(o, o + n.options.slidesToShow).addClass("slick-active").attr("aria-hidden", "false"));
            "ondemand" !== n.options.lazyLoad && "anticipated" !== n.options.lazyLoad || n.lazyLoad()
        }, e.prototype.setupInfinite = function () {
            var e, t, o, s = this;
            if (!0 === s.options.fade && (s.options.centerMode = !1), !0 === s.options.infinite && !1 === s.options.fade && (t = null, s.slideCount > s.options.slidesToShow)) {
                for (o = !0 === s.options.centerMode?s.options.slidesToShow + 1:s.options.slidesToShow, e = s.slideCount; e > s.slideCount - o; e -= 1)
                    t = e - 1, i(s.$slides[t]).clone(!0).attr("id", "").attr("data-slick-index", t - s.slideCount).prependTo(s.$slideTrack).addClass("slick-cloned");
                for (e = 0; e < o + s.slideCount; e += 1)
                    t = e, i(s.$slides[t]).clone(!0).attr("id", "").attr("data-slick-index", t + s.slideCount).appendTo(s.$slideTrack).addClass("slick-cloned");
                s.$slideTrack.find(".slick-cloned").find("[id]").each(function () {
                    i(this).attr("id", "")
                })
            }
        }, e.prototype.interrupt = function (i) {
            var e = this;
            i || e.autoPlay(), e.interrupted = i
        }, e.prototype.selectHandler = function (e) {
            var t = this, o = i(e.target).is(".slick-slide") ? i(e.target) : i(e.target).parents(".slick-slide"), s = parseInt(o.attr("data-slick-index"));
            s || (s = 0), t.slideCount <= t.options.slidesToShow ? t.slideHandler(s, !1, !0) : t.slideHandler(s)
        }, e.prototype.slideHandler = function (i, e, t) {
            var o, s, n, r, l, d = null, a = this;
            if (e = e || !1, !(!0 === a.animating && !0 === a.options.waitForAnimate || !0 === a.options.fade && a.currentSlide === i))
                if (!1 === e && a.asNavFor(i), o = i, d = a.getLeft(o), r = a.getLeft(a.currentSlide), a.currentLeft = null === a.swipeLeft ? r : a.swipeLeft, !1 === a.options.infinite && !1 === a.options.centerMode && (i < 0 || i > a.getDotCount() * a.options.slidesToScroll))
                    !1 === a.options.fade && (o = a.currentSlide, !0 !== t ? a.animateSlide(r, function () {
                        a.postSlide(o)
                    }) : a.postSlide(o));
                else if (!1 === a.options.infinite && !0 === a.options.centerMode && (i < 0 || i > a.slideCount - a.options.slidesToScroll))
                    !1 === a.options.fade && (o = a.currentSlide, !0 !== t ? a.animateSlide(r, function () {
                        a.postSlide(o)
                    }) : a.postSlide(o));
                else {
                    if (a.options.autoplay && clearInterval(a.autoPlayTimer), s = o < 0 ? a.slideCount % a.options.slidesToScroll != 0 ? a.slideCount - a.slideCount % a.options.slidesToScroll : a.slideCount + o : o >= a.slideCount ? a.slideCount % a.options.slidesToScroll != 0 ? 0 : o - a.slideCount : o, a.animating = !0, a.$slider.trigger("beforeChange", [a, a.currentSlide, s]), n = a.currentSlide, a.currentSlide = s, a.setSlideClasses(a.currentSlide), a.options.asNavFor && (l = (l = a.getNavTarget()).slick("getSlick")).slideCount <= l.options.slidesToShow && l.setSlideClasses(a.currentSlide), a.updateDots(), a.updateArrows(), !0 === a.options.fade)
                        return!0 !== t ? (a.fadeSlideOut(n), a.fadeSlide(s, function () {
                            a.postSlide(s)
                        })) : a.postSlide(s), void a.animateHeight();
                    !0 !== t ? a.animateSlide(d, function () {
                        a.postSlide(s)
                    }) : a.postSlide(s)
                }
        }, e.prototype.startLoad = function () {
            var i = this;
            !0 === i.options.arrows && i.slideCount > i.options.slidesToShow && (i.$prevArrow.hide(), i.$nextArrow.hide()), !0 === i.options.dots && i.slideCount > i.options.slidesToShow && i.$dots.hide(), i.$slider.addClass("slick-loading")
        }, e.prototype.swipeDirection = function () {
            var i, e, t, o, s = this;
            return i = s.touchObject.startX - s.touchObject.curX, e = s.touchObject.startY - s.touchObject.curY, t = Math.atan2(e, i), (o = Math.round(180 * t / Math.PI)) < 0 && (o = 360 - Math.abs(o)), o <= 45 && o >= 0 ? !1 === s.options.rtl ? "left" : "right" : o <= 360 && o >= 315 ? !1 === s.options.rtl ? "left" : "right" : o >= 135 && o <= 225 ? !1 === s.options.rtl ? "right" : "left" : !0 === s.options.verticalSwiping ? o >= 35 && o <= 135 ? "down" : "up" : "vertical"
        }, e.prototype.swipeEnd = function (i) {
            var e, t, o = this;
            if (o.dragging = !1, o.swiping = !1, o.scrolling)
                return o.scrolling = !1, !1;
            if (o.interrupted = !1, o.shouldClick = !(o.touchObject.swipeLength > 10), void 0 === o.touchObject.curX)
                return!1;
            if (!0 === o.touchObject.edgeHit && o.$slider.trigger("edge", [o, o.swipeDirection()]), o.touchObject.swipeLength >= o.touchObject.minSwipe) {
                switch (t = o.swipeDirection()) {
                    case"left":
                    case"down":
                        e = o.options.swipeToSlide ? o.checkNavigable(o.currentSlide + o.getSlideCount()) : o.currentSlide + o.getSlideCount(), o.currentDirection = 0;
                        break;
                    case"right":
                    case"up":
                        e = o.options.swipeToSlide ? o.checkNavigable(o.currentSlide - o.getSlideCount()) : o.currentSlide - o.getSlideCount(), o.currentDirection = 1
                }
                "vertical" != t && (o.slideHandler(e), o.touchObject = {}, o.$slider.trigger("swipe", [o, t]))
            } else
                o.touchObject.startX !== o.touchObject.curX && (o.slideHandler(o.currentSlide), o.touchObject = {})
        }, e.prototype.swipeHandler = function (i) {
            var e = this;
            if (!(!1 === e.options.swipe || "ontouchend"in document && !1 === e.options.swipe || !1 === e.options.draggable && -1 !== i.type.indexOf("mouse")))
                switch (e.touchObject.fingerCount = i.originalEvent && void 0 !== i.originalEvent.touches ? i.originalEvent.touches.length : 1, e.touchObject.minSwipe = e.listWidth / e.options.touchThreshold, !0 === e.options.verticalSwiping && (e.touchObject.minSwipe = e.listHeight / e.options.touchThreshold), i.data.action) {
                    case"start":
                        e.swipeStart(i);
                        break;
                    case"move":
                        e.swipeMove(i);
                        break;
                    case"end":
                        e.swipeEnd(i)
                }
        }, e.prototype.swipeMove = function (i) {
            var e, t, o, s, n, r, l = this;
            return n = void 0 !== i.originalEvent ? i.originalEvent.touches : null, !(!l.dragging || l.scrolling || n && 1 !== n.length) && (e = l.getLeft(l.currentSlide), l.touchObject.curX = void 0 !== n ? n[0].pageX : i.clientX, l.touchObject.curY = void 0 !== n ? n[0].pageY : i.clientY, l.touchObject.swipeLength = Math.round(Math.sqrt(Math.pow(l.touchObject.curX - l.touchObject.startX, 2))), r = Math.round(Math.sqrt(Math.pow(l.touchObject.curY - l.touchObject.startY, 2))), !l.options.verticalSwiping && !l.swiping && r > 4 ? (l.scrolling = !0, !1) : (!0 === l.options.verticalSwiping && (l.touchObject.swipeLength = r), t = l.swipeDirection(), void 0 !== i.originalEvent && l.touchObject.swipeLength > 4 && (l.swiping = !0, i.preventDefault()), s = (!1 === l.options.rtl ? 1 : -1) * (l.touchObject.curX > l.touchObject.startX ? 1 : -1), !0 === l.options.verticalSwiping && (s = l.touchObject.curY > l.touchObject.startY ? 1 : -1), o = l.touchObject.swipeLength, l.touchObject.edgeHit = !1, !1 === l.options.infinite && (0 === l.currentSlide && "right" === t || l.currentSlide >= l.getDotCount() && "left" === t) && (o = l.touchObject.swipeLength * l.options.edgeFriction, l.touchObject.edgeHit = !0), !1 === l.options.vertical ? l.swipeLeft = e + o * s : l.swipeLeft = e + o * (l.$list.height() / l.listWidth) * s, !0 === l.options.verticalSwiping && (l.swipeLeft = e + o * s), !0 !== l.options.fade && !1 !== l.options.touchMove && (!0 === l.animating ? (l.swipeLeft = null, !1) : void l.setCSS(l.swipeLeft))))
        }, e.prototype.swipeStart = function (i) {
            var e, t = this;
            if (t.interrupted = !0, 1 !== t.touchObject.fingerCount || t.slideCount <= t.options.slidesToShow)
                return t.touchObject = {}, !1;
            void 0 !== i.originalEvent && void 0 !== i.originalEvent.touches && (e = i.originalEvent.touches[0]), t.touchObject.startX = t.touchObject.curX = void 0 !== e ? e.pageX : i.clientX, t.touchObject.startY = t.touchObject.curY = void 0 !== e ? e.pageY : i.clientY, t.dragging = !0
        }, e.prototype.unfilterSlides = e.prototype.slickUnfilter = function () {
            var i = this;
            null !== i.$slidesCache && (i.unload(), i.$slideTrack.children(this.options.slide).detach(), i.$slidesCache.appendTo(i.$slideTrack), i.reinit())
        }, e.prototype.unload = function () {
            var e = this;
            i(".slick-cloned", e.$slider).remove(), e.$dots && e.$dots.remove(), e.$prevArrow && e.htmlExpr.test(e.options.prevArrow) && e.$prevArrow.remove(), e.$nextArrow && e.htmlExpr.test(e.options.nextArrow) && e.$nextArrow.remove(), e.$slides.removeClass("slick-slide slick-active slick-visible slick-current").attr("aria-hidden", "true").css("width", "")
        }, e.prototype.unslick = function (i) {
            var e = this;
            e.$slider.trigger("unslick", [e, i]), e.destroy()
        }, e.prototype.updateArrows = function () {
            var i = this;
            Math.floor(i.options.slidesToShow / 2), !0 === i.options.arrows && i.slideCount > i.options.slidesToShow && !i.options.infinite && (i.$prevArrow.removeClass("slick-disabled").attr("aria-disabled", "false"), i.$nextArrow.removeClass("slick-disabled").attr("aria-disabled", "false"), 0 === i.currentSlide ? (i.$prevArrow.addClass("slick-disabled").attr("aria-disabled", "true"), i.$nextArrow.removeClass("slick-disabled").attr("aria-disabled", "false")) : i.currentSlide >= i.slideCount - i.options.slidesToShow && !1 === i.options.centerMode ? (i.$nextArrow.addClass("slick-disabled").attr("aria-disabled", "true"), i.$prevArrow.removeClass("slick-disabled").attr("aria-disabled", "false")) : i.currentSlide >= i.slideCount - 1 && !0 === i.options.centerMode && (i.$nextArrow.addClass("slick-disabled").attr("aria-disabled", "true"), i.$prevArrow.removeClass("slick-disabled").attr("aria-disabled", "false")))
        }, e.prototype.updateDots = function () {
            var i = this;
            null !== i.$dots && (i.$dots.find("li").removeClass("slick-active").end(), i.$dots.find("li").eq(Math.floor(i.currentSlide / i.options.slidesToScroll)).addClass("slick-active"))
        }, e.prototype.visibility = function () {
            var i = this;
            i.options.autoplay && (document[i.hidden] ? i.interrupted = !0 : i.interrupted = !1)
        }, i.fn.slick = function () {
            var i, t, o = this, s = arguments[0], n = Array.prototype.slice.call(arguments, 1), r = o.length;
            for (i = 0; i < r; i++)
                if ("object" == typeof s || void 0 === s ? o[i].slick = new e(o[i], s) : t = o[i].slick[s].apply(o[i].slick, n), void 0 !== t)
                    return t;
            return o
        }
    });


    var no_of_column = "";
    var gridmargin = "";
    var hovermargin = "";
    var mediadata = [];
    var shop_data = [];


    if (jQuery('#wc-instagram-feed').length) {
        var gallery_type = jQuery('#wc-instagram-feed').attr('data-gallerytype');
        var uniq_id = jQuery('#wc-instagram-feed').attr('data-id');
    } else {
        var gallery_type = "";
        var uniq_id = "";
    }


    function getdata() {
        if (shop_name != '' && shop_name != undefined && shop_name != null) {
            if (gallery_type == 'InstaProductTagFeed') {
                var product_id = __st.rid;
            } else {
                var product_id = '';
            }
            if (jQuery(window).width() < 576) {
                limit = "mobile";
            } else {
                limit = "desktop";
            }

            jQuery.ajax({
                url: BASE_URLINS + "feeddata",
                type: "GET",
                data: {shop: shop_name, page_no: pageno, 'gallery_type': gallery_type, 'product_id': product_id, "limit": limit, "uniq_id": uniq_id},
                dataType: "json",
                processData: true,
                success: function (result) {
                    if (result.response_code == 200) {
                        shop_data = result.shop_data;
                        if (result.data.data) {
                            if (gallery_type == 'InstaProductTagFeed') {
                                InstaProductTagFeed(shop_data, result.data);
                            } else if (gallery_type == 'InstaProductFeed') {
                                InstaProductFeed(shop_data, result.data, (pageno > 0) ? true : false);
                            }
                            if ((pageno <= 0)) {
                                calculation("", "0", "");
                            }
                        }
                    }
                    if (result.response_code == 404) {
                        console.log(result.error);
                    }
                },
                error: function (xhr, status, error) {
                    console.log(xhr);
                },
                complete: function (xhr, status) {
                    if (status === 'error' || !xhr.responseText) {
                        handleError();
                    } else {
                        var mediaResponse = xhr.responseText;
                    }
                }
            });
        }
    }


      function InstaProductTagFeed(shop_data, datalist) {

        if (jQuery(window).width() < 576) {
            no_of_column = shop_data.mobile_no_of_column;
            gridmargin = shop_data.mobile_grid_margin
        } else {
            no_of_column = shop_data.no_of_column;
            gridmargin = shop_data.grid_margin
        }
        mediadata = datalist.data;

        if (mediadata.length > 0) {
            
            var mediaPost = '<div class="th-insta-section-inner">';

            mediaPost += '<h' + shop_data.style + ' style="color:#aaa!important;text-align: ' + shop_data.position + ';">' + shop_data.embed_heading + '</h' + shop_data.style + '>';

            if (shop_data.display_type == '1') {
                mediaPost += '<div class="th-insta-container" ><ul class="th-insta-slider"  data-show="' + shop_data.cell_size + '" data-fixed="' + ((shop_data.cell_size.replace('px', '') <= 6) ? false : true) + '" style="margin-left:-10px;margin-right:-10px;" >';
            } else {
                mediaPost += '<div class="th-insta-container" style="padding-left:' + gridmargin + 'px;padding-right:' + gridmargin + 'px;"><ul class="th-insta-view th-insta-view-ul th-insta-col-' + no_of_column + '" style="margin-left:-' + gridmargin + 'px;margin-right:-' + gridmargin + 'px;margin-bottom:-' + gridmargin + 'px;">';
            }


            jQuery.each(datalist.data, function (i, n) {

                mediaPost += '<li class="th-insta-item popup-slide" style="padding-left:' + gridmargin + 'px  !important; padding-right:' + gridmargin + 'px !important; padding-bottom:' + (gridmargin * 2) + 'px  !important;  ' + ((shop_data.cell_size.replace('px', '') > 6) ? "width:" + shop_data.cell_size : "") + '"   data-id="' + i + '" >';

                mediaPost += '<div class="th-insta-feed-boxs">';
                if (n.media_type == 'VIDEO') {
                    mediaPost += '<div class="th-insta-feed-img hover" ><video width="100%" height="100%" ><source src="' + n.media_url + '" type="video/mp4"></video>';
                } else {
                    mediaPost += '<div class="th-insta-feed-img hover"  style="background-image:url(' + n.media_url + '); ' + ((shop_data.rounded_corner == 1) ? "border-radius:5px;" : "") + '">';
                }
                jQuery.each(JSON.parse(datalist.data[i].data), function (x, y) {
                    mediaPost += '<div class="point" style="top: ' + y.top_position + '%; left: ' + y.left_position + '%;">' + (x + 1) + '</div>';
                });
                if (JSON.parse(datalist.data[i].data)) {
                    mediaPost += '<div class="th-feed-linked-item-ico"><svg viewBox="0 0 26 26"><path d="M22.6835938,7.1357422c-0.0253906-0.3955078-0.3525391-0.703125-0.7490234-0.703125h-3.9697266V5.2597656  C17.9648438,2.9111328,15.7373047,1,13,1S8.0351563,2.9111328,8.0351563,5.2597656v1.1728516H4.0654297  c-0.3964844,0-0.7236328,0.3076172-0.7490234,0.703125L2.2509766,24.203125  c-0.0126953,0.2070313,0.0605469,0.4091797,0.2021484,0.5605469C2.5947266,24.9140625,2.7929688,25,3,25h20  c0.2070313,0,0.4052734-0.0859375,0.546875-0.2363281c0.1416016-0.1513672,0.2148438-0.3535156,0.2021484-0.5605469  L22.6835938,7.1357422z M9.5351563,5.2597656C9.5351563,3.7382813,11.0898438,2.5,13,2.5s3.4648438,1.2382813,3.4648438,2.7597656  v1.1728516H9.5351563V5.2597656z M8.0351563,7.9326172v1.6289063c0,0.4140625,0.3359375,0.75,0.75,0.75s0.75-0.3359375,0.75-0.75  V7.9326172h6.9296875v1.6289063c0,0.4140625,0.3359375,0.75,0.75,0.75s0.75-0.3359375,0.75-0.75V7.9326172h3.2646484  l0.6498413,10.4003906H4.1206665L4.7705078,7.9326172H8.0351563z M3.7978516,23.5l0.260376-4.1669922h17.8835449L22.2021484,23.5  H3.7978516z" fill="#FFF"></path></svg></div>';
                }
                mediaPost += '</div>';
                mediaPost += '</div>';
                mediaPost += '</li>';
            });
            mediaPost += '</ul>' + '</div>';
            mediaPost += '</div>';
            jQuery('#wc-instagram-feed').html(mediaPost);
            if (shop_data.display_type == '1') {
                slickrun();
            }
        }
    }


    function InstaProductFeed(shop_data, datalist, is_loadmore = false) {

        var mediaPost = '<div class="th-insta-section-inner">';

        if (jQuery(window).width() < 576) {
            no_of_column = shop_data.mobile_no_of_column;
            hovermargin = shop_data.mobile_hover_margin;
            gridmargin = shop_data.mobile_grid_margin
        } else {
            no_of_column = shop_data.no_of_column;
            hovermargin = shop_data.hover_margin
            gridmargin = shop_data.grid_margin
        }

        if (!is_loadmore) {
            jQuery("#wc-instagram-feed").empty();
            var oldlength = 0;

            if (shop_data.display_type == '1') {
                mediaPost += '<div class="th-insta-container"  ><ul class="th-insta-slider"  data-show="' + shop_data.cell_size + '" data-fixed="' + ((shop_data.cell_size.replace('px', '') <= 6) ? false : true) + '" style="margin-left:-10px;margin-right:-10px;" >';
            } else {
                mediaPost += '<div class="th-insta-container" style="padding-left:' + gridmargin + 'px;padding-right:' + gridmargin + 'px;">';
                mediaPost += '<ul class="th-insta-view th-insta-view-ul th-insta-col-' + no_of_column + '"  style="margin-left:-' + gridmargin + 'px;margin-right:-' + gridmargin + 'px;margin-bottom:-' + gridmargin + 'px;" >';
            }
            mediadata = datalist.data;
        } else {
            var oldlength = (mediadata.length);
        }

        jQuery.each(datalist.data, function (i, n) {
            if (is_loadmore) {
                mediadata.push(n);
            }
            mediaPost += '<li class="th-insta-item popup-slide"  data-id="' + (oldlength + i) + '" style="padding-left:' + gridmargin + 'px  !important; padding-right:' + gridmargin + 'px !important; padding-bottom:' + (gridmargin * 2) + 'px  !important;  ' + ((shop_data.cell_size.replace('px', '') > 6) ? "width:" + shop_data.cell_size : "") + '">';
            mediaPost += '<div class="th-insta-feed-boxs">';
            if (n.media_type == 'VIDEO') {
                mediaPost += '<div class="th-insta-feed-img"><video width="100%" height="100%" ><source src="' + n.media_url + '" type="video/mp4"></video></div>';
            } else {
                mediaPost += '<div class="th-insta-feed-img" style="background-image:url(' + n.media_url + ')"></div>';
            }
            if (JSON.parse(datalist.data[i].data)) {
                mediaPost += '<div class="th-feed-linked-item-ico"><svg viewBox="0 0 26 26"><path d="M22.6835938,7.1357422c-0.0253906-0.3955078-0.3525391-0.703125-0.7490234-0.703125h-3.9697266V5.2597656  C17.9648438,2.9111328,15.7373047,1,13,1S8.0351563,2.9111328,8.0351563,5.2597656v1.1728516H4.0654297  c-0.3964844,0-0.7236328,0.3076172-0.7490234,0.703125L2.2509766,24.203125  c-0.0126953,0.2070313,0.0605469,0.4091797,0.2021484,0.5605469C2.5947266,24.9140625,2.7929688,25,3,25h20  c0.2070313,0,0.4052734-0.0859375,0.546875-0.2363281c0.1416016-0.1513672,0.2148438-0.3535156,0.2021484-0.5605469  L22.6835938,7.1357422z M9.5351563,5.2597656C9.5351563,3.7382813,11.0898438,2.5,13,2.5s3.4648438,1.2382813,3.4648438,2.7597656  v1.1728516H9.5351563V5.2597656z M8.0351563,7.9326172v1.6289063c0,0.4140625,0.3359375,0.75,0.75,0.75s0.75-0.3359375,0.75-0.75  V7.9326172h6.9296875v1.6289063c0,0.4140625,0.3359375,0.75,0.75,0.75s0.75-0.3359375,0.75-0.75V7.9326172h3.2646484  l0.6498413,10.4003906H4.1206665L4.7705078,7.9326172H8.0351563z M3.7978516,23.5l0.260376-4.1669922h17.8835449L22.2021484,23.5  H3.7978516z" fill="#FFF"></path></svg></div>';
            }
            mediaPost += '<div class="th-insta-overlay" style="background-color: ' + shop_data.background_color + ';top: ' + hovermargin + 'px;left : ' + hovermargin + 'px;right: ' + hovermargin + 'px;bottom:' + hovermargin + 'px;">';
            mediaPost += '<div class="th-insta-overlay-contain">';
            mediaPost += '<span class="th-insta-flag"><svg viewBox="0 0 24 24" style="fill:' + shop_data.foreground_color + '" ><path  d="m12.004 5.838c-3.403 0-6.158 2.758-6.158 6.158 0 3.403 2.758 6.158 6.158 6.158 3.403 0 6.158-2.758 6.158-6.158 0-3.403-2.758-6.158-6.158-6.158zm0 10.155c-2.209 0-3.997-1.789-3.997-3.997s1.789-3.997 3.997-3.997 3.997 1.789 3.997 3.997c.001 2.208-1.788 3.997-3.997 3.997z"/><path d="m16.948.076c-2.208-.103-7.677-.098-9.887 0-1.942.091-3.655.56-5.036 1.941-2.308 2.308-2.013 5.418-2.013 9.979 0 4.668-.26 7.706 2.013 9.979 2.317 2.316 5.472 2.013 9.979 2.013 4.624 0 6.22.003 7.855-.63 2.223-.863 3.901-2.85 4.065-6.419.104-2.209.098-7.677 0-9.887-.198-4.213-2.459-6.768-6.976-6.976zm3.495 20.372c-1.513 1.513-3.612 1.378-8.468 1.378-5 0-7.005.074-8.468-1.393-1.685-1.677-1.38-4.37-1.38-8.453 0-5.525-.567-9.504 4.978-9.788 1.274-.045 1.649-.06 4.856-.06l.045.03c5.329 0 9.51-.558 9.761 4.986.057 1.265.07 1.645.07 4.847-.001 4.942.093 6.959-1.394 8.453z"/><circle cx="18.406" cy="5.595" r="1.439"/></svg></span>';
            mediaPost += '<span class="th-insta-date th-ig-font"   style="color:' + shop_data.foreground_color + ';display:' + ((shop_data.show_date == 1) ? "inline-block" : "none") + ';">' + n.datetime + '</span>';
            mediaPost += '<div class="th-insta-count-contain">';
            mediaPost += '<div class="th-insta-count-item"  style="display:' + ((shop_data.show_like_comment == 1) ? "inline-block" : "none") + ';"><svg viewBox="0 0 512 512" class="th-light-icon" style="fill:' + shop_data.foreground_color + '" ><path   d="M512,304c0-12.821-5.099-24.768-13.888-33.579c9.963-10.901,15.04-25.515,13.653-40.725 c-2.496-27.115-26.923-48.363-55.637-48.363H324.352c6.528-19.819,16.981-56.149,16.981-85.333c0-46.272-39.317-85.333-64-85.333 c-22.144,0-37.995,12.48-38.656,12.992c-2.539,2.027-4.011,5.099-4.011,8.341v72.341L173.205,237.44l-2.539,1.301v-4.075 c0-5.888-4.779-10.667-10.667-10.667H53.333C23.915,224,0,247.915,0,277.333V448c0,29.419,23.915,53.333,53.333,53.333h64 c23.061,0,42.773-14.72,50.197-35.264C185.28,475.2,209.173,480,224,480h195.819c23.232,0,43.563-15.659,48.341-37.248 c2.453-11.136,1.024-22.336-3.84-32.064c15.744-7.915,26.347-24.192,26.347-42.688c0-7.552-1.728-14.784-4.992-21.312 C501.419,338.752,512,322.496,512,304z M467.008,330.325c-4.117,0.491-7.595,3.285-8.917,7.232 c-1.301,3.947-0.213,8.277,2.816,11.136c5.419,5.099,8.427,11.968,8.427,19.307c0,13.461-10.176,24.768-23.637,26.325 c-4.117,0.491-7.595,3.285-8.917,7.232c-1.301,3.947-0.213,8.277,2.816,11.136c7.019,6.613,9.835,15.893,7.723,25.451 c-2.624,11.904-14.187,20.523-27.499,20.523H224c-17.323,0-46.379-8.128-56.448-18.219c-3.051-3.029-7.659-3.925-11.627-2.304 c-3.989,1.643-6.592,5.547-6.592,9.856c0,17.643-14.357,32-32,32h-64c-17.643,0-32-14.357-32-32V277.333c0-17.643,14.357-32,32-32 h96V256c0,3.691,1.92,7.125,5.077,9.088c3.115,1.877,7.04,2.069,10.368,0.448l21.333-10.667c2.155-1.067,3.883-2.859,4.907-5.056 l64-138.667c0.64-1.408,0.981-2.944,0.981-4.48V37.781C260.437,35.328,268.139,32,277.333,32C289.024,32,320,61.056,320,96    c0,37.547-20.437,91.669-20.629,92.203c-1.237,3.264-0.811,6.955,1.173,9.856c2.005,2.88,5.291,4.608,8.789,4.608h146.795 c17.792,0,32.896,12.736,34.389,28.992c1.131,12.16-4.715,23.723-15.189,30.187c-3.264,2.005-5.205,5.632-5.056,9.493 s2.368,7.317,5.781,9.088c9.024,4.587,14.613,13.632,14.613,23.573C490.667,317.461,480.491,328.768,467.008,330.325z"/><path d="M160,245.333c-5.888,0-10.667,4.779-10.667,10.667v192c0,5.888,4.779,10.667,10.667,10.667s10.667-4.779,10.667-10.667 V256C170.667,250.112,165.888,245.333,160,245.333z"/></svg><span class="th-insta-count-text"  style="color:' + shop_data.foreground_color + '">' + n.like_count + '</span></div>';
            mediaPost += '<div class="th-insta-count-item"  style="display:' + ((shop_data.show_like_comment == 1) ? "inline-block" : "none") + ';"><svg viewBox="-21 -47 682.66669 682" class="th-comment-icon" style="fill:' + shop_data.foreground_color + '" ><path  d="m552.011719-1.332031h-464.023438c-48.515625 0-87.988281 39.464843-87.988281 87.988281v283.972656c0 48.414063 39.300781 87.816406 87.675781 87.988282v128.863281l185.191407-128.863281h279.144531c48.515625 0 87.988281-39.472657 87.988281-87.988282v-283.972656c0-48.523438-39.472656-87.988281-87.988281-87.988281zm50.488281 371.960937c0 27.835938-22.648438 50.488282-50.488281 50.488282h-290.910157l-135.925781 94.585937v-94.585937h-37.1875c-27.839843 0-50.488281-22.652344-50.488281-50.488282v-283.972656c0-27.84375 22.648438-50.488281 50.488281-50.488281h464.023438c27.839843 0 50.488281 22.644531 50.488281 50.488281zm0 0"/><path d="m171.292969 131.171875h297.414062v37.5h-297.414062zm0 0"/><path d="m171.292969 211.171875h297.414062v37.5h-297.414062zm0 0"/><path d="m171.292969 291.171875h297.414062v37.5h-297.414062zm0 0"/></svg><span class="th-insta-count-text" style="color:' + shop_data.foreground_color + '">' + n.comments_count + '</span></div>';
            mediaPost += '</div>';
            mediaPost += '</div>';
            mediaPost += '</div>';
            mediaPost += '</div>';
            mediaPost += '</li>';
        });
        if (is_loadmore) {
            jQuery('.th-insta-view-ul').append(mediaPost);
        } else {
            mediaPost += '</ul>' + '</div>';
            mediaPost += '</div>';

            if (shop_data.show_load_more == "1") {
                if (mediadata.length < datalist.tatal_record && !is_loadmore) {
                    jQuery('.load_more_feed').remove();
                    jQuery('<div style="width: 100%;padding: 15px;text-align: center;" class="load_more_feed"><button class="btn btn-dark" id="load_more_feed" data-shopname="' + shop_name + '">Load more</button></div>').insertAfter('#wc-instagram-feed');
                }
            }
            jQuery("#wc-instagram-feed").html(mediaPost);
            jQuery("<style>.th-ig-font {font-family:" + shop_data.font_family + " !important;}</style>").insertBefore("#wc-instagram-feed");

        }
        if (shop_data.display_type == '1') {
            slickrun();
        }
        if (mediadata.length >= datalist.tatal_record) {
            jQuery('#load_more_feed').hide();
    }

    }


    jQuery('body').on('click', '.popup-slide', function () {
        opendetailspopup(jQuery(this).data('id'));
        return false;
    });
    jQuery('body').on('click', '.th-ig-modal-close', function () {
        jQuery('.th-ig-modal').remove();
    });
    jQuery('body').on('click', '.nextprev', function () {
        opendetailspopup(jQuery(this).data('id'));
    });

    var data_layer_index;

    jQuery(document).on("mouseenter", ".th-ig-layer-item", function () {
        data_layer_index = jQuery(this).attr('data-index');
        jQuery(this).addClass('focus-in');
        jQuery('.th-ig-product-card').addClass('opacity_in');
        jQuery('.th-ig-product-card[data-index="' + data_layer_index + '"]').addClass('focus-in').removeClass('opacity_in');
    });
    jQuery(document).on("mouseleave", ".th-ig-layer-item", function () {
        data_layer_index = jQuery(this).attr('data-index');
        jQuery(this).removeClass('focus-in');
        jQuery('.th-ig-product-card').removeClass('opacity_in');
        jQuery('.th-ig-product-card[data-index="' + data_layer_index + '"]').removeClass('focus-in');
    });
    jQuery(document).on("mouseenter", ".th-ig-product-card", function () {
        data_layer_index = jQuery(this).attr('data-index');
        jQuery('.th-ig-product-card').addClass('opacity_in');
        jQuery(this).addClass('focus-in').removeClass('opacity_in');
        jQuery('.th-ig-layer-item[data-index="' + data_layer_index + '"]').addClass('focus-in');
    });
    jQuery(document).on("mouseleave", ".th-ig-product-card", function () {
        data_layer_index = jQuery(this).attr('data-index');
        jQuery(this).removeClass('focus-in');
        jQuery('.th-ig-product-card').removeClass('opacity_in');
        jQuery('.th-ig-layer-item[data-index="' + data_layer_index + '"]').removeClass('focus-in');
    });


    jQuery('body').on('click', '#load_more_feed', function (e) {
        e.preventDefault();
        pageno = (pageno + 1);
        getdata();

    });

    window.calculation = function (feed_id, click, url = "") {
        jQuery.ajax({
            url: BASE_URLINS + "viewgallary",
            type: "POST",
            data: {shop: shop_name, 'feed_id': feed_id, 'gallery_type': gallery_type, "uniq_id": uniq_id, 'click': click},
            dataType: "json",
            processData: true,
            success: function (result)
            {
                if (result.response_code) {
                    if (url != '') {
                        window.open(url, '_blank');
                    } else {
                        return true;
                    }
                }
            },
        })
    }

    function opendetailspopup(i) {


        var model = '';
        var modelproduct = '';
        var modelpoints = '';
        jQuery('.th-ig-modal').remove();

        if (i >= mediadata.length) {
            i = 0;
        }
        if (mediadata[i]) {
            console.log(shop_data.subscribe);
            calculation(mediadata[i].insta_feed_id, "0", "");


            if (gallery_type == "InstaProductFeed") {
                var bybtn = shop_data.shop_button_cta;
            } else {
                var bybtn = shop_data.shop_button_cta;

            }
            jQuery.each(JSON.parse(mediadata[i].data), function (x, y) {
               
                modelproduct += '<li>';
                modelproduct += '<div class="th-ig-product-card" data-index="' + x + '">';
                modelproduct += '<figure><a  href="javascript:void(0);" onclick="calculation(' + mediadata[i].insta_feed_id + ',\'1\',\'https://' + shop_data.domain + '/products/' + y.shopify_handle_name + '\');"  href="" class="image__body"><img src="' + y.product_image + '" alt=""></a> <a class="th-ig-buy-now th-ig-font"   href="javascript:void(0);"   onclick="calculation(' + mediadata[i].insta_feed_id + ',\'1\',\'https://' + shop_data.domain + '/products/' + y.shopify_handle_name + '\');">' + bybtn + '</a> </figure>';
                modelproduct += '<div class="th-ig-pc-info">';
                modelproduct += '<div class="th-ig-pc-name th-ig-font" ><a  href="javascript:void(0);"  onclick="calculation(' + mediadata[i].insta_feed_id + ',\'1\',\'https://' + shop_data.domain + '/products/' + y.shopify_handle_name + '\');">' + y.product_title + '</a></div>';
                modelproduct += '<div class="th-ig-pc-prices" style="display:' + ((shop_data.shop_pricing == "1") ? "inline-block" : "none") + ';"> <span class="th-ig-pc-price th-ig-font" >$' + y.price + '</span> </div>';
                modelproduct += '</div>';
                modelproduct += '</div>';
                modelproduct += '</li>';
                if (gallery_type == "InstaProductFeed") {
                    if (mediadata[i]['show_hotspot'] == "1") {
                        modelpoints += '<div data-id="' + x + '" data-index="' + x + '" class="th-ig-layer-item th-ig-font" id="item' + x + '" style="top: ' + y.top_position + '%; left: ' + y.left_position + '%;">' + (x + 1) + '</div>';
                    }
                } else {
                    modelpoints += '<div data-id="' + x + '" data-index="' + x + '" class="th-ig-layer-item th-ig-font" id="item' + x + '" style="top: ' + y.top_position + '%; left: ' + y.left_position + '%;">' + (x + 1) + '</div>';
                }
            });
            model += '<div class="th-ig-modal th-ig-show th-ig-font">';
            model += '<div class="th-ig-modal-dialog">';
            model += '<div class="th-ig-modal-content">';
            if (shop_data.subscribe == "0") {
                model += '<div class="th-ig-powered-text th-ig-font"><a href="https://apps.shopify.com/search?q=thimatic" target="_blank">Powered by thimatic</a></div>';
            }

            model += '<button type="button" class="th-ig-modal-close" data-dismiss="modal" aria-label="Close">';
            model += '<svg viewBox="0 0 329.26933 329" ><path d="m194.800781 164.769531 128.210938-128.214843c8.34375-8.339844 8.34375-21.824219 0-30.164063-8.339844-8.339844-21.824219-8.339844-30.164063 0l-128.214844 128.214844-128.210937-128.214844c-8.34375-8.339844-21.824219-8.339844-30.164063 0-8.34375 8.339844-8.34375 21.824219 0 30.164063l128.210938 128.214843-128.210938 128.214844c-8.34375 8.339844-8.34375 21.824219 0 30.164063 4.15625 4.160156 9.621094 6.25 15.082032 6.25 5.460937 0 10.921875-2.089844 15.082031-6.25l128.210937-128.214844 128.214844 128.214844c4.160156 4.160156 9.621094 6.25 15.082032 6.25 5.460937 0 10.921874-2.089844 15.082031-6.25 8.34375-8.339844 8.34375-21.824219 0-30.164063zm0 0"/></svg>';
            model += '</button>';
            model += '<button type="button" class="th-ig-slide-arrow th-ig-prev-arrow nextprev" data-id="' + (i - 1) + '">';
            model += '<svg class="icon icon-chevron-left" viewBox="0 0 8 18"><path d="M7.55.978A.705.705 0 007.413.01a.663.663 0 00-.945.142L.019 9.06l6.433 8.558a.664.664 0 00.947.127.704.704 0 00.121-.972L1.713 9.046z"></path></svg>';
            model += '</button>';
            model += '<button type="button" class="th-ig-slide-arrow th-ig-next-arrow nextprev" data-id="' + (i + 1) + '">';
            model += '<svg class="icon icon-chevron-left" viewBox="0 0 8 18"><path d="M7.55.978A.705.705 0 007.413.01a.663.663 0 00-.945.142L.019 9.06l6.433 8.558a.664.664 0 00.947.127.704.704 0 00.121-.972L1.713 9.046z"></path></svg>';
            model += '</button>';
            model += '<div class="th-ig-modal-left-column">';

            if (mediadata[i].media_type == "VIDEO") {
                model += '<div class="th-ig-layer-contain"><video width="100%" height="100%" class="th-ig-item-image"  autoplay><source src="' + mediadata[i].media_url + '" type="video/mp4"></video>';
            } else {
                model += '<div class="th-ig-layer-contain"><img src="' + mediadata[i].media_url + '" class="th-ig-item-image" />';
                model += '<div class="th-ig-item-bg-image" style="background-image:url(' + mediadata[i].media_url + ')"></div>';
            }

            model += modelpoints;
            model += '</div>';
            model += '</div>';
            model += '<div class="th-ig-modal-right-column">';
            model += '<div class="th-ig-middle-container">';

            model += '<div class="th-ig-header-contain" style="display:' + ((shop_data.show_avtar == "1") ? "flex" : "none") + ';">';
            if (mediadata[i].logo) {
                model += '<div class="th-ig-avatar"><img src="' + mediadata[i].logo + '"></div>';
            }
            model += '<div class="th-ig-username th-ig-font"><a href="https://www.instagram.com/' + mediadata[i].username + '" target="_blank">@' + mediadata[i].username + '</a></div>';
            model += '</div>';

            model += '<ul class="th-ig-product-contain">';
            model += modelproduct;
            model += '</ul>';
            model += '<div class="th-ig-caption-text"><p class="th-ig-font">' + mediadata[i].caption + '</p></div>';
            model += '<div class="th-ig-meta-text"><p class="th-ig-font"><span class="th-ig-date">' + mediadata[i].datetime + '</span> View on <a href="' + mediadata[i].permalink + '" target="_blank">Instagram</a></p></div>';
            model += '</div>';
            model += '</div>';
            model += '</div>';
            model += '</div>';
            model += '</div>';
            jQuery(model).appendTo('body');
        }
    }

    function slickrun() {
        var th_slide_show = jQuery('ul.th-insta-slider').data('show');
        var th_slide_fixedWidth = jQuery('ul.th-insta-slider').data('fixed');
        var thSlideArrow = '<svg class="icon icon-chevron-left" viewBox="0 0 8 18"><path d="M7.55.978A.705.705 0 007.413.01a.663.663 0 00-.945.142L.019 9.06l6.433 8.558a.664.664 0 00.947.127.704.704 0 00.121-.972L1.713 9.046z"></path></svg>'
        jQuery('.th-insta-slider').slick({
            dots: false,
            infinite: true,
            speed: 300,
            slidesToShow: th_slide_show,
            slidesToScroll: 4,
            prevArrow: '<button type="button" class="slick-prev">' + thSlideArrow + '</button>',
            nextArrow: '<button type="button" class="slick-next">' + thSlideArrow + '</button>',
            variableWidth: th_slide_fixedWidth,
            autoplay: true,
            responsive: [
                {
                    breakpoint: 1024,
                    settings: {
                        slidesToShow: 4,
                        slidesToScroll: 4,
                        infinite: true,
                        dots: false
                    }
                },
                {
                    breakpoint: 576,
                    settings: {
                        slidesToShow: 2,
                        slidesToScroll: 2
                    }
                }
            ]
        });
    }
    var resizeTimeout;

    jQuery(window).resize(function () {
        clearTimeout(resizeTimeout);
        resizeTimeout = setTimeout(function () {
            pageno = 0;
            getdata();
        }, 1);
    });
    jQuery(document).ready(function () {
        getdata();
    });
    jQuery(document).on('click', '.th-ig-modal', function (e) {
        var container = jQuery(".th-ig-modal-dialog,.ant-select,.ant-select-dropdown");
        if (!container.is(e.target) && container.has(e.target).length === 0)
        {
            jQuery('.th-ig-modal-close').trigger("click");
        }
    });
}

