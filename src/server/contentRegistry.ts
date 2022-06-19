import { ContentItem } from './interfaces';
import registry, { RegistryInitOptions } from '../registry/index';

const isExternalLink = (ref) =>
  ref.startsWith('http://') || ref.startsWith('https://');

export default class ContentRegistry {
  registry = new Map<string, ContentItem>();

  async init(options: RegistryInitOptions) {
    let orphanedLinksCount = 0;

    // Loading registry with content pages
    await registry.init(options);

    for (const page of registry.getPagesData()) {
      const {
        content,
        description,
        headings,
        data,
        path,
        section,
        references,
        updatesInOriginalRepo,
        originalPath,
        translationLastUpdatedAt,
      } = page;

      // Check if links in the content lead to sensible destinations
      const { internalLinkDestinations } = registry;
      references.forEach((refItem) => {
        if (
          !isExternalLink(refItem) &&
          !internalLinkDestinations.has(refItem)
        ) {
          orphanedLinksCount++;
          console.warn(
            '\x1b[33mwarn\x1b[0m',
            `- found orphaned reference: ${refItem} on page ${path}`,
          );
        }
      });

      this.registry.set(data.slug, {
        content,
        description,
        hasContent: !!content,
        headings,
        ...data,
        path,
        originalPath,
        updatesInOriginalRepo,
        section,
        sourceLastUpdatetAt: 0,
        translationLastUpdatedAt,
      });
    }

    if (orphanedLinksCount > 0) {
      console.warn(
        `\x1b[33mfound ${orphanedLinksCount} orphaned reference${
          orphanedLinksCount > 1 ? 's' : ''
        }\x1b[0m`,
      );
    }
  }

  getAll(): ContentItem[] {
    return Array.from(this.registry.values());
  }

  getBySlug(id): ContentItem {
    return this.registry.get(id);
  }
}
