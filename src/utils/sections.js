const sections = new Map();

function registerSection(id, element) {
  if (!id || !element) return;
  sections.set(id, element);
}

function unregisterSection(id) {
  sections.delete(id);
}

function getSection(id) {
  return sections.get(id) ?? null;
}

function clearSections() {
  sections.clear();
}

export { registerSection, unregisterSection, getSection, clearSections };
