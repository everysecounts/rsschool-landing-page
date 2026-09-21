const pageSections = new Map();
const permanentSections = new Map();

function registerSection(id, element, options = {}) {
  if (!id || !element) {
    return;
  }
  if (options.permanent) {
    permanentSections.set(id, element);
    return;
  }
  pageSections.set(id, element);
}

function getSection(id) {
  return pageSections.get(id) ?? permanentSections.get(id) ?? null;
}

function clearSections() {
  pageSections.clear();
}

export { registerSection, getSection, clearSections };
