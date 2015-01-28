var $main = $('#main');
var $locations = $main.find('.locations');
var $weather = $main.find('.weather');

$main.find('.search').submit(function (e) {
    var address = $main.find('.address').val().trim();

    if (address.length) {
        $.ajax({
            url: '//maps.googleapis.com/maps/api/geocode/json',

            data: {
                sensor: false,
                address: address
            },

            success: function (r) {
                if (r.hasOwnProperty('results')) {
                    var displayLocations = function () {
                        $.each(r.results, function (i, result) {
                            var time = 100;

                            var $item = $('<li>').prop({
                                class: 'location'
                            }).css({
                                opacity: 0
                            }).data({
                                name: result.formatted_address,
                                coordinates: result.geometry.location.lat + ', ' + result.geometry.location.lng
                            }).text(
                                result.formatted_address
                            ).appendTo($locations);

                            $item.delay(i * time).animate({ opacity: 1 });
                            if (r.results.length === 1) {
                                $item.click();
                            }
                        });
                    };

                    if ('' === $locations.html()) {
                        displayLocations();
                    } else {
                        $locations.find('.location').fadeOut(function () {
                            $locations.empty();
                            displayLocations();
                        });
                    }
                }
            }
        });
    }

    return false;
}).find('.address').focus();

$locations.on('click', '.location', function (e) {
    var $this = $(this);
    var name = $this.data('name');
    var coordinates = $this.data('coordinates');

    if (coordinates.length) {
        $.ajax({
            url: 'https://api.forecast.io/forecast/2b6cef03e595b4c0bcbd51630c4191fa/' + encodeURIComponent(coordinates),

            dataType: 'jsonp',

            success: function (r) {
                var displayWeather = function () {
                    $weather.find('.location').text(name);
                    $weather.find('.conditions').text(r.currently.summary);
                    $weather.find('.temperature').text(r.currently.temperature);

                    var now = new Date();
                    console.log('Request made at '  + (now.getMonth() + 1) + '/' + now.getDate() + '/'
                    + now.getFullYear() + ' ' + now.getHours() + ':' + now.getMinutes() + ':'
                    + now.getSeconds() + ' for coordinates ' + coordinates);
                    console.log('Conditions for ' + name + ': ' + r.currently.summary + ', ' + r.currently.temperature
                    + '\u00b0');

                    $weather.fadeIn();
                };

                if (r.hasOwnProperty('currently')) {
                    if ($weather.is(':visible')) {
                        $weather.fadeOut(displayWeather);
                    } else {
                        displayWeather();
                    }
                } else {
                    // @todo error?
                }
            }
        });
    }

    return false;
});
