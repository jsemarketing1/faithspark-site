import { visit } from 'unist-util-visit';
import type { Root, Image } from 'mdast';

export function remarkScriptureOverlay() {
  return (tree: Root) => {
    visit(tree, 'image', (node: Image, index, parent) => {
      const alt = node.alt || '';
      if (!alt.includes('|')) return;

      const [scripture, altText] = alt.split('|').map((s) => s.trim());
      const [quote, reference] = scripture.includes('—')
        ? scripture.split('—').map((s) => s.trim())
        : [scripture, ''];

      const html = `<div class="scripture-img-wrap">
  <img src="${node.url}" alt="${altText}" loading="lazy" />
  <div class="scripture-overlay">
    <p class="scripture-quote">${quote}</p>
    ${reference ? `<span class="scripture-ref">— ${reference}</span>` : ''}
  </div>
</div>`;

      (node as unknown as { type: string; value: string }).type = 'html';
      (node as unknown as { type: string; value: string }).value = html;
    });
  };
}
