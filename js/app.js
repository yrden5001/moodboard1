/* MOODBOARD: delegación de eventos sin JavaScript inline. */
(function () {
  'use strict';
  function splitArgs(source) {
    const out = []; let part = ''; let quote = ''; let depth = 0; let escaped = false;
    for (const ch of source) {
      if (escaped) { part += ch; escaped = false; continue; }
      if (ch === '\\' && quote) { part += ch; escaped = true; continue; }
      if (quote) { part += ch; if (ch === quote) quote = ''; continue; }
      if (ch === "'" || ch === '"' || ch === '`') { quote = ch; part += ch; continue; }
      if (ch === '(' || ch === '[' || ch === '{') depth++;
      if (ch === ')' || ch === ']' || ch === '}') depth--;
      if (ch === ',' && depth === 0) { out.push(part.trim()); part = ''; } else part += ch;
    }
    if (part.trim()) out.push(part.trim());
    return out;
  }
  function parseValue(value, element, event) {
    value = value.trim();
    if (value === 'this') return element;
    if (value === 'event') return event;
    if (value === 'true') return true;
    if (value === 'false') return false;
    if (value === 'null') return null;
    if (/^-?\d+(?:\.\d+)?$/.test(value)) return Number(value);
    if ((value[0] === "'" && value.at(-1) === "'") || (value[0] === '"' && value.at(-1) === '"')) return value.slice(1, -1).replace(/\\(['"\\])/g, '$1');
    return undefined;
  }
  function run(expression, element, event) {
    const redirect = expression.trim().match(/^window\.location\.href\s*=\s*(['\"])(.*?)\1\s*;?$/s);
    if (redirect) { window.location.href = redirect[2]; return; }
    const match = expression.trim().match(/^([\w$.]+)\s*\((.*)\)\s*;?$/s);
    if (!match) return;
    const name = match[1];
    const args = splitArgs(match[2]).map(value => parseValue(value, element, event));
    if (args.some(value => value === undefined)) return;
    if (name === 'window.print') { window.print(); return; }
    if (name === 'window.location.href') { window.location.href = args[0]; return; }
    const fn = name.split('.').reduce((obj, key) => obj && obj[key], window);
    if (typeof fn === 'function') fn.apply(window, args);
  }
  ['click', 'submit', 'change', 'input', 'keyup', 'load'].forEach(type => {
    document.addEventListener(type, function (event) {
      const attr = 'data-action-' + type;
      const element = event.target.closest('[' + attr + ']');
      if (!element) return;
      if (type === 'submit') event.preventDefault();
      run(element.getAttribute(attr), element, event);
    });
  });
})();
