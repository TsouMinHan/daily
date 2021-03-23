
let data = {
    title: "daily"
}

var app = new Vue({
    el: '#app',
    delimiters: ["[[", "]]"],
    data: data,
    mounted: function () {

    },
    methods: {
        submitData: function () {
            const data = {
                content: document.querySelector("#editor").value,
                timestamp: Math.round(Date.now()/1000) // now 得到的是毫秒，再除 1000 變成秒數
            }
            let xhr = new XMLHttpRequest();

            xhr.open("post", "/api/save_daily", true);
            xhr.setRequestHeader('Content-type', 'application/json');
            xhr.send(JSON.stringify(data));
        }
    }
});

CKEDITOR.replace("editor");