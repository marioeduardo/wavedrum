/**
 * Parse a markdown-style editing guide into structured items.
 *
 * Expected format:
 * ## Title
 * Content paragraph(s)
 * Tags: tag1, tag2, tag3
 *
 * Each H2 (##) starts a new section/item.
 */
export function parseGuide(markdown) {
  const sections = markdown.split(/^## /m).filter(Boolean);

  return sections.map((section, idx) => {
    const lines = section.trim().split('\n');
    const title = lines[0].trim();

    let tags = [];
    let contentLines = [];

    for (let i = 1; i < lines.length; i++) {
      const tagMatch = lines[i].match(/^\s*Tags?:\s*(.+)/i);
      if (tagMatch) {
        tags = tagMatch[1].split(',').map(t => t.trim()).filter(Boolean);
      } else {
        contentLines.push(lines[i]);
      }
    }

    return {
      id: `item-${idx}-${title.slice(0, 20).replace(/\s+/g, '-').toLowerCase()}`,
      title,
      content: contentLines.join('\n').trim(),
      tags,
    };
  });
}
