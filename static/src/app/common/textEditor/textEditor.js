const textEditor = {
  restrict: 'E',
  template: require('./textEditor.html'),
  bindings: {
    myText: '=',
  },
  controller: TextEditorController
};

function TextEditorController(TextService, ModalService) {
  this.$onInit = () => {
    this.cursor = {
      start: 0,
      end: 0
    };
    this.textareaElement = document.getElementById('article-input');
    this.myText = this.myText || '';
  }

  this.saveCursor = (e) => {
    this.cursor.start = e.srcElement.selectionStart;
    this.cursor.end = e.srcElement.selectionEnd;
  };

  this.addImage = () => {
    const position = this.cursor.start || this.myText.length;
    if (!this.myText) return;
    ModalService.addPicture().result.then(picture => {
      const stringToInsert = TextService.buildImage(picture.path);
      this.myText = TextService.insertString(position, this.myText, stringToInsert);
      TextService.setCursor(this.textareaElement, position + stringToInsert.length);
    });
  };

  this.addText = () => {
    const position = this.cursor.start || 0;
    const stringToInsert = TextService.buildText();
    this.myText = TextService.insertString(position, this.myText, stringToInsert);
    TextService.setCursor(this.textareaElement, TextService.getStartText(position), TextService.getEndText(position));
  };

  this.sortText = () => {
    this.myText = sortBy(this.myText.split('\n')).join('\n');
  };

  this.wrapText = (wrap) => {
    const element = TextService.buildElement(wrap);
    this.myText = TextService.wrapByString(
      this.myText,
      element,
      this.cursor
    );
    TextService.setCursor(this.textareaElement, this.cursor.start);
  };

  this.handleKeyPress = (e) => {
    switch (e.code) {
      case "Enter":
        e.preventDefault();
        let position = e.srcElement.selectionStart;
        let stringToInsert = '\n</br>\n';
        this.myText = TextService.insertString(position, this.myText, stringToInsert);
        TextService.setCursor(e.srcElement, position + stringToInsert.length);
        break;
      default:
        break;
    }
  };
}

TextEditorController.$inject = ['TextService', 'ModalService'];

export default textEditor;
