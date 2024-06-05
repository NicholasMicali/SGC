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