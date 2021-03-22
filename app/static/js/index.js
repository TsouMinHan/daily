
let data = {
    title: "daily",
}

var app = new Vue({ 
    el: '#app',
    delimiters: ["[[", "]]"],
    data: data
});


CKEDITOR.replace("editor");