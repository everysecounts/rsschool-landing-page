const sections = new Map();

function registerSection(id, element) {
  if (!id || !element) return;
  sections.set(id, element);
}

function getSection(id) {
  return sections.get(id) ?? null;
}

function clearSections() {
  sections.clear();
}

export { registerSection, getSection, clearSections };
