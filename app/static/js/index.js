
let data = {
    title: "daily",
    dailys: []
}

var app = new Vue({
    el: '#app',
    delimiters: ["[[", "]]"],
    data: data,
    mounted: function () {
        this.loadData();
    },
    methods: {
        submitData: function () {
            const data = {
                content: CKEDITOR.instances["editor"].getData(),
                timestamp: Math.round(Date.now()/1000) // now 得到的是毫秒，再除 1000 變成秒數
            }
            let xhr = new XMLHttpRequest();

            xhr.onreadystatechange = function() {
                if (xhr.readyState == XMLHttpRequest.DONE) {
                    const results = JSON.parse(xhr.responseText);
                    
                    if (results.status == "success"){
                        console.log(results.status)
                        CKEDITOR.instances["editor"].setData(""); // clear textarea
                    }
                }
            }

            xhr.open("post", "/api/save_daily", true);
            xhr.setRequestHeader('Content-type', 'application/json');
            xhr.send(JSON.stringify(data));
        },
        loadData: function () {
            let xhr = new XMLHttpRequest();
            xhr.onreadystatechange = function() {
                if (xhr.readyState == XMLHttpRequest.DONE) {
                    const results = JSON.parse(xhr.responseText);
                    
                    if (results.status == "success"){
                        data.dailys = results.dailys;
                    }
                }
            }

            xhr.open("post", "/api/load_daily", true);
            xhr.setRequestHeader("Content-type", "application/json");
            xhr.send({})
        }
    }
});

CKEDITOR.replace("editor");