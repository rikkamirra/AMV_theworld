function TextService() {
  return {
    insertString(position, text, stringToInsert) {
      text = text || '';
      return text.slice(0, position) + stringToInsert + text.slice(position);
    },

    wrapByString(str, strElement, cursor) {
      return str.slice(0, cursor.start) + strElement.open + str.slice(cursor.start, cursor.end) + strElement.close + str.slice(cursor.end, str.length);
    },

    setCursor(input, positionStart, positionEnd) {
      setTimeout(function () {
        input.focus();
        input.setSelectionRange(positionStart, positionEnd || positionStart);
      }, 10);
    },

    buildImage(src) {
      return `\n<img height="300" style="margin: 0.5rem;" src="${src}">\n`;
    },

    buildText() {
      return '\n<p>\nтекст\n</p>\n';
    },

    buildElement(elContent) {
      return { open: `<${elContent}>`, close: `</${elContent}>` };
    },

    getStartText(position) {
      return position + '\n<p>\n'.length;
    },

    getEndText(position) {
      return position + '\n<p>\n'.length + 'текст'.length;
    },
  }
}

TextService.$inject = [];

export default TextService;
