exports.formatedDate = function() {
    let now = new Date();
    let s = "";
    let month = now.getMonth() < 10 ? "0" + now.getMonth() : "" + now.getMonth();
    let date = now.getDate() < 10 ? "0" + now.getDate() : "" + now.getDate();
    let hours = now.getHours() < 10 ? "0" + now.getHours() : "" + now.getHours();
    let mins = now.getMinutes() < 10 ? "0" + now.getMinutes() : "" + now.getMinutes();
    let secs = now.getSeconds() < 10 ? "0" + now.getSeconds() : "" + now.getSeconds();

    s += `${now.getFullYear()}-${month}-${date}`;
    s += ` (${hours}:${mins})`;
    return s;
}
