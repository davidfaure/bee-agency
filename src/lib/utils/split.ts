interface SplitOptions {
  element: HTMLElement;
  expression?: string;
  append?: boolean;
}

function parseLine(line: string): string {
  line = line.trim();

  if (line === "" || line === " ") {
    return line;
  }

  return line === "<br>"
    ? "<br>"
    : `<span>${line}</span>${line.length > 1 ? " " : ""}`;
}

function splitText(text: string, expression: string): string[] {
  const splits = text.split("<br>");
  let words: string[] = [];

  splits.forEach((item, index) => {
    if (index > 0) {
      words.push("<br>");
    }

    words = words.concat(item.split(expression));

    let isLink = false;
    let link = "";
    const innerHTML: string[] = [];

    words.forEach((word) => {
      if (!isLink && (word.includes("<a") || word.includes("<strong"))) {
        link = "";
        isLink = true;
      }

      if (isLink) {
        link += ` ${word}`;
      }

      if (isLink && (word.includes("/a>") || word.includes("/strong>"))) {
        innerHTML.push(link);
        link = "";
      }

      if (!isLink && link === "") {
        innerHTML.push(word);
      }

      if (isLink && (word.includes("/a>") || word.includes("/strong>"))) {
        isLink = false;
      }
    });

    words = innerHTML;
  });

  return words;
}

export function split({
  element,
  expression = " ",
  append = true,
}: SplitOptions): NodeListOf<HTMLSpanElement> {
  const words = splitText(element.innerHTML.toString().trim(), expression);

  let innerHTML = "";

  words.forEach((line) => {
    if (line.indexOf("<br>") > -1) {
      const lines = line.split("<br>");

      lines.forEach((line, index) => {
        innerHTML += index > 0 ? "<br>" + parseLine(line) : parseLine(line);
      });
    } else {
      innerHTML += parseLine(line);
    }
  });

  element.innerHTML = innerHTML;

  const spans = element.querySelectorAll("span");

  if (append) {
    spans.forEach((span) => {
      const isSingleLetter = (span.textContent?.length || 0) === 1;
      const isNotEmpty = span.innerHTML.trim() !== "";
      const isNotAndCharacter = span.textContent !== "&";
      const isNotDashCharacter = span.textContent !== "-";

      if (
        isSingleLetter &&
        isNotEmpty &&
        isNotAndCharacter &&
        isNotDashCharacter
      ) {
        span.innerHTML = `${span.textContent}&nbsp;`;
      }
    });
  }

  return spans;
}

export function calculate(
  spans: NodeListOf<HTMLSpanElement> | HTMLElement[]
): HTMLElement[][] {
  const lines: HTMLElement[][] = [];
  let words: HTMLElement[] = [];

  const spansArray = Array.from(spans) as HTMLElement[];

  if (spansArray.length === 0) return lines;

  let position = spansArray[0].offsetTop;

  spansArray.forEach((span, index) => {
    if (span.offsetTop === position) {
      words.push(span);
    }

    if (span.offsetTop !== position) {
      lines.push(words);
      words = [];
      words.push(span);
      position = span.offsetTop;
    }

    if (index + 1 === spansArray.length) {
      lines.push(words);
    }
  });

  return lines;
}

export function splitSimple(element: HTMLElement): void {
  const text = element.textContent || "";
  const chars = text.split("");

  element.innerHTML = "";

  chars.forEach((char) => {
    const span = document.createElement("span");
    span.textContent = char;
    span.style.display = "inline-block";
    element.appendChild(span);
  });
}
