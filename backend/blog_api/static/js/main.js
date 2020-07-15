console.log("hello");
document.addEventListener("DOMContentLoaded", function(event){
    let sc = document.createElement('script')
    sc.setAttribute('src', 'https://cdn.tiny.cloud/1/no-api-key/tinymce/5/tinymce.min.js')

    document.head.appendChild(sc)
    sc.onload = ()=>{
        tinymce.init({
            selector: '#id_article_description'
          });
    }
})