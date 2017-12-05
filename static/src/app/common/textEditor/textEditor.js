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
    this.textareaElement = document.getElementById('article-input');
    this.myText = this.myText || '';
  }

  function buildImage(src) {
    return `\n<img height="300" style="margin: 0.5rem;" src="${src}">\n`;
  }

  function buildText() {
    return '\n<p>\nтекст\n</p>\n';
  }

  function getStartText(position) {
    return position + '\n<p>\n'.length;
  }

  function getEndText(position) {
    return position + '\n<p>\n'.length + 'текст'.length;
  }

  this.saveCursor = (e) => {
    this.myTextareaCursorPosition = e.srcElement.selectionStart;
  };

  this.addImage = () => {
    const position = this.myTextareaCursorPosition || this.myText.length;
    if (!this.myText) return;
    ModalService.addPicture().result.then(picture => {
      const stringToInsert = buildImage(picture.path);
      this.myText = TextService.insertString(position, this.myText, stringToInsert);
      TextService.setCursor(this.textareaElement, position + stringToInsert.length);
    });
  };

  this.addText = () => {
    const position = this.myTextareaCursorPosition || 0;
    const stringToInsert = buildText();
    this.myText = TextService.insertString(position, this.myText, stringToInsert);
    TextService.setCursor(this.textareaElement, getStartText(position), getEndText(position));
  };

  this.sortText = () => {
    this.myText = sortBy(this.myText.split('\n')).join('\n');
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
