

const templateManager = {};

// Fetches a template from the server - Han bruker stor T i TemplateManager
templateManager.getTemplate = async (path) => {
    let rawTemplate = (await fetch(path)).text();
    let div = document.createElement("div");
    div.innerHTML = rawTemplate;
    let template = div.firstChild;
    return template;
};

templateManager.cloneTemplate = (template, target) => {
    const clone = template.content.cloneNode(true);
    target.appendChild(clone);
    return clone;
}

export default templateManager;