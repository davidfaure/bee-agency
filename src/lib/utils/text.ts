export const animateTextIn = (
  lines: HTMLElement[],
  cssEasing: string = "cubic-bezier(0.02, 0.84, 0.04, 0.98)",
  stagger: number = 0.01,
  duration: number = 1.2,
  delay: number = 0.1,
  isPreloaderVisible: boolean = false
): void => {
  if (isPreloaderVisible) return;

  lines.forEach((letter, index) => {
    letter.style.transition = `transform ${duration}s ${
      index * stagger
    }s ${cssEasing}`;
    letter.style.transitionDelay = `${delay}s`;
    letter.style.transform = "translateY(0)";
  });
};

export const animateTextOut = (
  lines: HTMLElement[],
  trigger: boolean = false
): void => {
  if (trigger) return;

  lines.forEach((letter) => {
    letter.style.transform = "translateY(100%)";
  });
};

export const animateFadeIn = (
  elements: HTMLElement[],
  cssEasing: string = "cubic-bezier(0.25, 0.46, 0.45, 0.94)",
  stagger: number = 0.1,
  duration: number = 1,
  delay: number = 0
): void => {
  elements.forEach((element, index) => {
    element.style.transition = `opacity ${duration}s ${cssEasing}, transform ${duration}s ${cssEasing}`;
    element.style.transitionDelay = `${delay + index * stagger}s`;
    element.style.opacity = "1";
    element.style.transform = "translateY(0)";
  });
};

export const prepareFadeOut = (elements: HTMLElement[]): void => {
  elements.forEach((element) => {
    element.style.opacity = "0";
    element.style.transform = "translateY(20px)";
  });
};
