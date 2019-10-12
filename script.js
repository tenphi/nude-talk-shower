import './node_modules/numl/dist/numl.dev.js';

class ShowerCode extends window.Nude.elements.NuBlock {
  static get nuTag() {
    return 'shower-code';
  }

  nuConnected() {
    const textarea = this.querySelector('textarea');

    if (!textarea) return;

    const code = textarea.value.replace(/^\n/, '').replace(/\n\s+$/, '');
    const indent = code.match(/^\s+/)
      ? code.match(/^\s+/)[0] : '';

    let output = '<pre>' + code
      .replace(/\</g, '&lt;')
      .replace(/\>/g, '&gt;')
      .split(/\n/g).map(s => '<code>' + s.replace(indent, '') + '</code>')
      .join('')
      .replace(/\[\[\!/g, '<mark class="important">')
      .replace(/\[\[/g, '<mark>')
      .replace(/\]\]/g, '</mark>')
      .replace(/&lt;\!\-\-/g, '<span class="comment">&lt;!--')
      .replace(/\-\-&gt;/g, '--&gt;</span>') + '</pre>';

    this.innerHTML = output;
  }
}

Nude.init(ShowerCode);
