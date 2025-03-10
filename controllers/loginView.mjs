import templateManager from "../modules/templateManager.mjs";
const templateFile = "loginView.html";

const template = await templateManager.getTemplate(templateFile);

const loginView = templateManager.cloneTemplate(template, document.body);


loginView.getElementById("button").onclick = () => {
    console.log("Button clicked");
    // Do something
}


LoginViewController = {
    view: loginView,
}

export default LoginViewController;