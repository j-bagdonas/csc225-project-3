jQuery(document).ready(function($){
    
    function createListItem(book){
        var $li = $('<li>');
        $li.addClass('list-group-item hover-style');
        $li.html(book.title);
        $li.data('bookId', book.id);
        return $li;
    };
    //ajax request and loading 
    var request = axios.get('http://csc225.mockable.io/books');
    $("#loader").css("display", "block");  
    request.then(function(response){
        $("#loader").css("display", "none");
        response.data.forEach(function(book){
            $('#book-list').append(createListItem(book));
         });
         $('#add-card').append('<p>').html("select a book").addClass("loader2");
         
         //click and display card
      $('.list-group-item').on('click', function () {
        $('#add-card').empty();
        $('#add-card').append('<div>').addClass('card');
        $(".card").append('<div>').addClass("loader2");
        $(".loader2").append('<h3>').html("Loading..");
        $('.list-group-item').removeClass('active');
        var bookId = $(this).data('bookId');
        $(this).addClass('active');
        
        axios.get('http://csc225.mockable.io/books/' + bookId).then(function(response){
            $('#add-card').removeClass('loader2');
            $(".card").empty();
        
            var $cover     = $('<img>').attr('src', response.data.cover).attr('alt', response.data.title).addClass("img-fluid align-self-center pt-3"),
                $title     = $('<h5>').html(response.data.title).addClass("d-flex align-self-center"),
                $author    = $('<p>').html('<strong>author: </strong>' + response.data.author),
                $language  = $('<p>').html('<strong>language: </strong>' + response.data.language),
                $link      = $('<a>').attr('href', response.data.link).html('<strong>link: </strong>' + response.data.link),
                $pages     = $('<p>').html('<strong>pages: </strong>' + response.data.pages),
                $year      = $('<p>').html('<strong>year: </strong>' + response.data.year);
                
            $(".card").append($cover, $title, $author, $language, $link, $pages, $year);
        }); 
      });
    }); 
});