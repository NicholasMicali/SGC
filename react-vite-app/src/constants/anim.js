import { easeIn } from "framer-motion";

export const animateVerticalFadeIn = (delay, goDown = true) => ({
  animate: {
    opacity: 1,
    y: 0,
  },
  transition: {
    delay: delay,
    duration: 0.5,
  },
  initial: {
    opacity: 0,
    y: goDown ? 50 : -50,
  },
});

export const hoverScaleUp = {
  whileHover: {
    scale: 1.1,
  },
  whileTap: {
    scale: 0.9,
  },
};

export const animateQuickDownToUpWithDelay = (delay) => ({
  animate: {
    opacity: 1,
    y: 0,
  },
  transition: {
    delay: delay,
    duration: 0.2,
  },
  initial: {
    opacity: 0,
    y: 25,
  },
});

export const animateSideFadeIn = (left, delay = 0) => ({
  animate: {
    opacity: 1,
    x: 0,
  },
  transition: {
    duration: 0.5,
    delay: delay,
  },
  initial: {
    opacity: 0,
    x: left ? -50 : 50,
  },
});

export const animateTopDownOnTrigger = (trigger) => ({
  transition: {
    duration: 0.5,
  },
  initial: {
    opacity: 0,
    y: -50,
  },
  variants: {
    hidden: {
      opacity: 0,
      y: -50,
    },
    visible: {
      opacity: 1,
      y: 0,
    },
  },
  animate: trigger ? "visible" : "hidden",
});

export const animateMegaphoneHeart = (x, y, scale = 1) => ({
  initial: {
    x: -30,
    y: 30,
    opacity: 0,
    scale: 0
  },
  animate: {
    x: x,
    y: y,
    opacity: [0,1],
    scale: scale,
  },
  transition: {
    duration: 1,
    ease: "backInOut",
  },
})
