export const animateButton = (delay) => ({
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
      y: 50,
    }
})

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
    }
})

export const animateSideFadeIn = (left,delay = 0) => ({
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
    }
})