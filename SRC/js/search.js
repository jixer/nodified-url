(function () {
    var searchVM =
    {
        urls: ko.observableArray([])
    };

    ko.applyBindings(searchVM);
    var searchPhrase = $("#searched-phrase").text();
    $.get('/apis/search/' + searchPhrase)
        .done(function (data, status, resp) {
            for (var i = 0; i < data.length; i++) {
                searchVM.urls.push(data[i]);
            }
        });
})();