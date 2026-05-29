"use client"
import React, { useCallback, useEffect, useRef } from 'react'
import {
    EmblaCarouselType,
    EmblaEventType,
    EmblaOptionsType
} from 'embla-carousel'
import useEmblaCarousel from 'embla-carousel-react'
import { MapPin, StarIcon } from 'lucide-react'

import {
    PHOTO_STRIP_IMAGE_FALLBACK,
    type PhotoStripSlide
} from '@/lib/photo-strip'
import {NextButton, PrevButton, usePrevNextButtons} from "@/components/ui/EmblaCarouselArrowButtons";

const TWEEN_FACTOR_BASE = 0.2

export type { PhotoStripSlide } from '@/lib/photo-strip'

type PropType = {
    slides: PhotoStripSlide[]
    options?: EmblaOptionsType
    location?: string
    rating?: number | string
}



const PhotoStrip = (props: PropType) => {
    const { slides, options, location, rating } = props
    const safeSlides = slides.filter((slide) => slide.src)
    const [emblaRef, emblaApi] = useEmblaCarousel(options)
    const tweenFactor = useRef(0)
    const tweenNodes = useRef<HTMLElement[]>([])

    const {
        prevBtnDisabled,
        nextBtnDisabled,
        onPrevButtonClick,
        onNextButtonClick
    } = usePrevNextButtons(emblaApi)


    const setTweenNodes = useCallback((emblaApi: EmblaCarouselType): void => {
        tweenNodes.current = emblaApi.slideNodes().map((slideNode) => {
            return slideNode.querySelector('.embla__parallax__layer') as HTMLElement
        })
    }, [])

    const setTweenFactor = useCallback((emblaApi: EmblaCarouselType) => {
        tweenFactor.current = TWEEN_FACTOR_BASE * emblaApi.scrollSnapList().length
    }, [])

    const tweenParallax = useCallback(
        (emblaApi: EmblaCarouselType, event?: EmblaEventType) => {
            const engine = emblaApi.internalEngine()
            const scrollProgress = emblaApi.scrollProgress()
            const slidesInView = emblaApi.slidesInView()
            const isScrollEvent = event === 'scroll'

            emblaApi.scrollSnapList().forEach((scrollSnap, snapIndex) => {
                let diffToTarget = scrollSnap - scrollProgress
                const slidesInSnap = engine.slideRegistry[snapIndex]

                slidesInSnap.forEach((slideIndex) => {
                    if (isScrollEvent && !slidesInView.includes(slideIndex)) return

                    if (engine.options.loop) {
                        engine.slideLooper.loopPoints.forEach((loopItem) => {
                            const target = loopItem.target()

                            if (slideIndex === loopItem.index && target !== 0) {
                                const sign = Math.sign(target)

                                if (sign === -1) {
                                    diffToTarget = scrollSnap - (1 + scrollProgress)
                                }
                                if (sign === 1) {
                                    diffToTarget = scrollSnap + (1 - scrollProgress)
                                }
                            }
                        })
                    }

                    const translate = diffToTarget * (-1 * tweenFactor.current) * 100
                    const tweenNode = tweenNodes.current[slideIndex]
                    if (!tweenNode) return

                    tweenNode.style.transform = `translateX(${translate}%)`
                })
            })
        },
        []
    )

    useEffect(() => {
        if (!emblaApi) return

        emblaApi.reInit()
        setTweenNodes(emblaApi)
        setTweenFactor(emblaApi)
        tweenParallax(emblaApi)

        emblaApi
            .on('reInit', setTweenNodes)
            .on('reInit', setTweenFactor)
            .on('reInit', tweenParallax)
            .on('scroll', tweenParallax)
            .on('slideFocus', tweenParallax)

        return () => {
            emblaApi
                .off('reInit', setTweenNodes)
                .off('reInit', setTweenFactor)
                .off('reInit', tweenParallax)
                .off('scroll', tweenParallax)
                .off('slideFocus', tweenParallax)
        }
    }, [emblaApi, setTweenFactor, setTweenNodes, safeSlides.length, tweenParallax])

    return (
        <section className="photo-strip embla  px-4 py-6 sm:px-6">
            {(location || rating) && (
                <div className="mb-4 flex items-center gap-x-5 text-gray-800">
                    {location && (
                        <div className="flex items-center gap-x-1.5 text-sm font-semibold font-heading">
                            <MapPin className="fill-emerald-400 text-emerald-400" size={16} />
                            {location}
                        </div>
                    )}

                    {rating && (
                        <div className="flex items-center gap-x-1.5 text-sm font-semibold font-heading">
                            <StarIcon className="fill-amber-400 text-amber-400" size={16} />
                            {rating} / 5
                        </div>
                    )}
                </div>
            )}

            {safeSlides.length > 1 && (
                <div className="photo-strip__controls">
                    <div className="embla__buttons">
                        <PrevButton
                            className="text-gray-800"
                            onClick={onPrevButtonClick}
                            disabled={prevBtnDisabled}
                        />
                        <NextButton
                            className="text-gray-800"
                            onClick={onNextButtonClick}
                            disabled={nextBtnDisabled}
                        />
                    </div>
                </div>
            )}

            {safeSlides.length > 0 && (
                <div className="embla__viewport" ref={emblaRef}>
                    <div className="embla__container">
                        {safeSlides.map((slide, index) => (
                            <div className="embla__slide" key={`${slide.src}-${index}`}>
                                <div className="embla__parallax">
                                    <div className="embla__parallax__layer">
                                        <img
                                            className="embla__slide__img embla__parallax__img"
                                            src={slide.src}
                                            alt={slide.alt}
                                            onError={(event) => {
                                                const img = event.currentTarget
                                                if (img.dataset.fallbackApplied) return

                                                img.dataset.fallbackApplied = "true"
                                                img.src = PHOTO_STRIP_IMAGE_FALLBACK
                                            }}
                                        />
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            )}
        </section>
    )
}

export default PhotoStrip
