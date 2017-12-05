function TextService() {
  return {
    insertString(position, text, stringToInsert) {
      text = text || '';
      return text.slice(0, position) + stringToInsert + text.slice(position);
    },

    setCursor(input, positionStart, positionEnd) {
      setTimeout(function () {
        input.focus();
        input.setSelectionRange(positionStart, positionEnd || positionStart);
      }, 10);
    }
  }
}

TextService.$inject = [];

export default TextService;
