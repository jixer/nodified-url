(function () {
    var createVM =
    {
        formData: {
            Url: ko.observable('http://example.com')
        },
        status: ko.observable('Not submitted yet'),
        submitUrl: function () {
            var jsonData = ko.toJS(this.formData);
            $.post('/apis/', jsonData)
                .always(function (data, status, resp) {
                    if (resp.status == 201) {
                        createVM.status("Succesfully created NeURL: " + data);
                    }
                    else {
                        createVM.status("Error occurred creating NeURL: [" + resp.status + "] " + data);
                    }
                });
        }
    };

    ko.applyBindings(createVM);
})();