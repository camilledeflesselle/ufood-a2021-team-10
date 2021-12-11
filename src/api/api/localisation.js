export const getCoordinates = function() {
    return new Promise(function(resolve, reject) {
        navigator.geolocation.getCurrentPosition(resolve, reject);
    });
}

