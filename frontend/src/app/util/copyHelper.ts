export function copyToClipBoard(article) {
    if (document.queryCommandSupported && document.queryCommandSupported("copy")) {
        let textarea = document.createElement("textarea");
        textarea.textContent = article.link;
        textarea.style.position = "fixed";
        document.body.appendChild(textarea);
        textarea.select();
        try {
            document.execCommand("copy"); // Security exception may be thrown by some browsers.
        } catch (ex) {
            console.log(ex);
        } finally {
            document.body.removeChild(textarea);
        }
    }
}
