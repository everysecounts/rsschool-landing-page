const sections = new Map();

export function registerSection(id, element) {
  if (!id || !element) return;
  sections.set(id, element);
}

export function unregisterSection(id) {
  sections.delete(id);
}

export function getSection(id) {
  return sections.get(id) ?? null;
}

export function clearSections() {
  sections.clear();
}
