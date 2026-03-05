'use client';
import { useLayoutEffect, useRef, useCallback } from 'react';
import Lenis from 'lenis';

export const ScrollStackItem = ({ children, itemClassName = '' }) => (
    <div
        className={`scroll-stack-card relative w-full min-h-[20rem] h-auto my-12 p-1 rounded-xl transition-all duration-500 will-change-transform ${itemClassName}`.trim()}
        style={{
            backfaceVisibility: 'hidden',
            transformStyle: 'preserve-3d'
        }}
    >
        {children}
    </div>
);

const ScrollStack = ({
    children,
    className = '',
    itemDistance = 80, // Tighter stacking
    itemScale = 0.05,
    itemStackDistance = 40,
    stackPosition = '15%', // Higher up for better visibility
    scaleEndPosition = '5%',
    baseScale = 0.9,
    rotationAmount = 0,
    blurAmount = 0,
    useWindowScroll = true, // Default to true for Next.js App Router usually
    onStackComplete
}) => {
    const scrollerRef = useRef(null);
    const stackCompletedRef = useRef(false);
    const animationFrameRef = useRef(null);
    const lenisRef = useRef(null);
    const cardsRef = useRef([]);
    const lastTransformsRef = useRef(new Map());
    const isUpdatingRef = useRef(false);

    // ... (Keep core logic mostly the same, but optimize config above) ...

    const calculateProgress = useCallback((scrollTop, start, end) => {
        if (scrollTop < start) return 0;
        if (scrollTop > end) return 1;
        return (scrollTop - start) / (end - start);
    }, []);

    const parsePercentage = useCallback((value, containerHeight) => {
        if (typeof value === 'string' && value.includes('%')) {
            return (parseFloat(value) / 100) * containerHeight;
        }
        return parseFloat(value);
    }, []);

    const getScrollData = useCallback(() => {
        if (useWindowScroll) {
            return {
                scrollTop: window.scrollY,
                containerHeight: window.innerHeight,
                scrollContainer: document.documentElement
            };
        } else {
            const scroller = scrollerRef.current;
            return {
                scrollTop: scroller?.scrollTop || 0,
                containerHeight: scroller?.clientHeight || 0,
                scrollContainer: scroller
            };
        }
    }, [useWindowScroll]);

    const getElementOffset = useCallback(
        element => {
            if (useWindowScroll) {
                const rect = element.getBoundingClientRect();
                return rect.top + window.scrollY;
            } else {
                return element.offsetTop;
            }
        },
        [useWindowScroll]
    );

    const cardPositionsRef = useRef([]);

    const calculateCardPositions = useCallback(() => {
        if (!cardsRef.current.length) return;

        const { containerHeight } = getScrollData();
        const stackPositionPx = parsePercentage(stackPosition, containerHeight);
        const scaleEndPositionPx = parsePercentage(scaleEndPosition, containerHeight);

        const endElement = document.querySelector('.scroll-stack-end');
        const endElementTop = endElement ? getElementOffset(endElement) : 0;
        const pinEnd = endElementTop - containerHeight / 2;

        cardPositionsRef.current = cardsRef.current.map((card, i) => {
            const cardTop = getElementOffset(card);
            return {
                cardTop,
                triggerStart: cardTop - stackPositionPx - itemStackDistance * i,
                triggerEnd: cardTop - scaleEndPositionPx,
                pinStart: cardTop - stackPositionPx - itemStackDistance * i,
                pinEnd,
                stackPositionPx,
                itemStackDistance
            };
        });
    }, [
        getScrollData,
        parsePercentage,
        stackPosition,
        scaleEndPosition,
        useWindowScroll,
        getElementOffset,
        itemStackDistance
    ]);

    const updateCardTransforms = useCallback((currentScrollTop) => {
        if (!cardsRef.current.length || isUpdatingRef.current) return;

        isUpdatingRef.current = true;

        const { scrollTop: rawScrollTop } = getScrollData();
        const scrollTop = currentScrollTop ?? rawScrollTop;

        cardsRef.current.forEach((card, i) => {
            if (!card) return;

            const positionData = cardPositionsRef.current[i];
            if (!positionData) return;

            const {
                cardTop,
                pinStart,
                pinEnd,
                stackPositionPx,
                itemStackDistance,
                triggerStart,
                triggerEnd
            } = positionData;

            const scaleProgress = calculateProgress(scrollTop, triggerStart, triggerEnd);
            const targetScale = baseScale + i * itemScale;
            const scale = 1 - scaleProgress * (1 - targetScale);
            
            // Logic for pinning
            let translateY = 0;
            const isPinned = scrollTop >= pinStart && scrollTop <= pinEnd;

            if (isPinned) {
                translateY = scrollTop - cardTop + stackPositionPx + itemStackDistance * i;
            } else if (scrollTop > pinEnd) {
                translateY = pinEnd - cardTop + stackPositionPx + itemStackDistance * i;
            }

            // Optimization: Only update if changed significantly
            const newTransform = {
                translateY: Math.round(translateY * 100) / 100,
                scale: Math.round(scale * 1000) / 1000,
            };

            const lastTransform = lastTransformsRef.current.get(i);
            const hasChanged =
                !lastTransform ||
                Math.abs(lastTransform.translateY - newTransform.translateY) > 0.1 ||
                Math.abs(lastTransform.scale - newTransform.scale) > 0.001;

            if (hasChanged) {
                card.style.transform = `translate3d(0, ${newTransform.translateY}px, 0) scale(${newTransform.scale})`;
                // Subtle blur effect for depth
                card.style.opacity = scale < 0.9 ? 0.6 : 1; 
                card.style.filter = scale < 0.9 ? `blur(${(1-scale) * 10}px)` : 'none';
                
                lastTransformsRef.current.set(i, newTransform);
            }
        });

        isUpdatingRef.current = false;
    }, [itemScale, baseScale, calculateProgress, getScrollData]);

    const handleScroll = useCallback((e) => {
        updateCardTransforms(e?.scroll);
    }, [updateCardTransforms]);

    // Simplified Lenis setup for performance
    const setupLenis = useCallback(() => {
        const lenis = new Lenis({
            duration: 1.2,
            easing: t => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
            orientation: 'vertical',
            gestureOrientation: 'vertical',
            smoothWheel: true,
            wheelMultiplier: 1,
            touchMultiplier: 2,
        });

        lenis.on('scroll', handleScroll);

        const raf = time => {
            lenis.raf(time);
            animationFrameRef.current = requestAnimationFrame(raf);
        };
        animationFrameRef.current = requestAnimationFrame(raf);

        lenisRef.current = lenis;
    }, [handleScroll]);

    useLayoutEffect(() => {
        const cards = Array.from(document.querySelectorAll('.scroll-stack-card'));
        cardsRef.current = cards;

        cards.forEach((card, i) => {
            if (i < cards.length - 1) {
                card.style.marginBottom = `${itemDistance}px`;
            }
        });

        calculateCardPositions();
        if (useWindowScroll) setupLenis();
        updateCardTransforms();

        const handleResize = () => {
            calculateCardPositions();
            updateCardTransforms();
        };

        window.addEventListener('resize', handleResize);

        return () => {
            window.removeEventListener('resize', handleResize);
            if (animationFrameRef.current) cancelAnimationFrame(animationFrameRef.current);
            if (lenisRef.current) lenisRef.current.destroy();
        };
    }, [itemDistance, useWindowScroll, setupLenis, calculateCardPositions, updateCardTransforms]);

    return (
        <div className={`relative w-full ${className}`} ref={scrollerRef}>
            <div className="scroll-stack-inner pt-[10vh] pb-[20vh] min-h-screen">
                {children}
                <div className="scroll-stack-end w-full h-1" />
            </div>
        </div>
    );
};

export default ScrollStack;