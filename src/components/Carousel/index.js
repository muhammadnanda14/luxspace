import { addClass, removeClass } from "helpers/format/classNameModifier";
import React, { useRef, useState, useCallback, useLayoutEffect } from "react";

export default function Carousel({ children, refContainer }) {
  const refDragHandler = useRef(null);
  const containerClientRect = refContainer.current.getBoundingClientRect();
  const [index, setIndex] = useState(0);

  const threshold = 100;
  const itemToShow = window.innerWidth < 767 ? 1 : 4;
  const DIRECTION_LEFT = "DIRECTION_LEFT";
  const DIRECTION_RIGHT = "DIRECTION_RIGHT";

  const postInitial = useRef();
  const postX1 = useRef();
  const postX2 = useRef();
  const postFinal = useRef();
  const isAllowShift = useRef(true);
  const cards = useRef();
  const cardCount = cards.current?.length || 0;
  const cardSize = cards.current?.[0].offsetWidth || 0;

  const fnCheckIndex = useCallback(
    (e) => {
      if (e.propertyName === "left") {
        setTimeout(() => {
          removeClass(refDragHandler.current, "transition-all duration-200");
        }, 200);

        const isMobile = window.innerWidth < 767 ? 0 : -1;
        if (index <= 0) {
          refDragHandler.current.style.left = 0;
          setIndex(0);
        } else if (index >= cardCount - itemToShow) {
          refDragHandler.current.style.left = `${-((cardCount - itemToShow + isMobile) * cardSize)}px`;
          setIndex(cardCount - itemToShow);
        } else if (index === cardCount || index === cardCount - 1) {
          refDragHandler.current.style.left = `${-(cardCount - 1) * cardSize}px`;
          setIndex(cardCount - 1);
        }

        isAllowShift.current = true;
      }
    },
    [cardCount, cardSize, index, itemToShow]
  );

  const fnShiftItem = useCallback(
    (direction) => {
      addClass(refDragHandler.current, "transition-all duration-200");

      if (isAllowShift.current) {
        if (direction === DIRECTION_LEFT) {
          setIndex((prev) => prev + 1);
          refDragHandler.current.style.left = `${postInitial.current - cardSize}px`;
        } else if (direction === DIRECTION_RIGHT) {
          setIndex((prev) => prev - 1);
          refDragHandler.current.style.left = `${postInitial.current + cardSize}px`;
        }
      }
      isAllowShift.current = false;
    },
    [cardSize]
  );

  const onDragMove = useCallback(
    (e) => {
      e = e || window.event;
      e.preventDefault();

      if (e.type === "touchmove") {
        postX2.current = postX1.current - e.touches[0].clientX;
        postX1.current = e.touches[0].clientX;
      } else {
        postX2.current = postX1.current - e.clientX;
        postX1.current = e.clientX;
      }

      refDragHandler.current.style.left = `${refDragHandler.current.offsetLeft - postX2.current}px`;
    },
    [postX1, postX2]
  );

  const onDragEnd = useCallback(
    (e) => {
      e = e || window.event;
      e.preventDefault();

      postFinal.current = refDragHandler.current.offsetLeft;

      if (postFinal.current - postInitial.current < -threshold) {
        fnShiftItem(DIRECTION_LEFT);
      } else if (postFinal.current - postInitial.current > threshold) {
        fnShiftItem(DIRECTION_RIGHT);
      } else {
        refDragHandler.current.style.left = `${postInitial.current}px`;
      }

      document.onmouseup = null;
      document.onmousemove = null;
    },
    [fnShiftItem]
  );

  const onDragStart = useCallback(
    (e) => {
      e = e || window.event;
      e.preventDefault();

      postInitial.current = refDragHandler.current.offsetLeft;

      if (e.type === "touchstart") {
        postX1.current = e.touches[0].clientX;
      } else {
        postX1.current = e.clientX;
        document.onmouseup = onDragEnd;
        document.onmousemove = onDragMove;
      }
    },
    [onDragEnd, onDragMove]
  );

  const onClick = useCallback((e) => {
    e = e || window.event;
    !isAllowShift.current && e.preventDefault();
  }, []);

  useLayoutEffect(() => {
    const refForwardDragHandler = refDragHandler.current;

    refForwardDragHandler.onmousedown = onDragStart;
    refForwardDragHandler.addEventListener("touchstart", onDragStart);
    refForwardDragHandler.addEventListener("touchmove", onDragEnd);
    refForwardDragHandler.addEventListener("touchstart", onDragMove);
    refForwardDragHandler.addEventListener("click", onClick);
    refForwardDragHandler.addEventListener("transitioned", fnCheckIndex);

    return () => {
      refForwardDragHandler.onmousedown = onDragStart;
      refForwardDragHandler.removeEventListener("touchstart", onDragStart);
      refForwardDragHandler.removeEventListener("touchmove", onDragEnd);
      refForwardDragHandler.removeEventListener("touchstart", onDragMove);
      refForwardDragHandler.removeEventListener("click", onClick);
      refForwardDragHandler.removeEventListener("transitioned", fnCheckIndex);
    };
  }, [onDragStart, onDragEnd, onDragMove, onClick, fnCheckIndex]);

  //kok jadi ilang
  useLayoutEffect(() => {
    if (refDragHandler.current) {
      cards.current = refDragHandler.current.getElementByClassName("card");
    }
  }, []);
  // sampe sini

  return (
    <div ref={refDragHandler} className="flex -mx-4 flex-row relative" style={{ paddingLeft: containerClientRect.left - 16 }}>
      {children}
    </div>
  );
}
