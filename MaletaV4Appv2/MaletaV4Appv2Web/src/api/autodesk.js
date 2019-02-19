const backendUrl = 'https://autodesk-test.azurewebsites.net';
var documentId = 'urn:' + 'dXJuOmFkc2sub2JqZWN0czpvcy5vYmplY3Q6MmY3ZmZjZDc3YWNjNDM2ZmEyYTA4MmE2YzE4ZTFiNjNfYXBwcm8vQkxPQ08lMjBBLnJ2dA==';

var viewerApp;
var options = {
    env: 'AutodeskProduction',
    api: 'derivativeV2', 
    getAccessToken: getForgeToken
};

function getForgeToken(callback) {
    jQuery.ajax({
        url: backendUrl,
        success: function (res) {
            callback(res.access_token, res.expires_in);
        }
    });
}

function onDocumentLoadSuccess(doc) {
    var viewables = viewerApp.bubble.search({ 'type': 'geometry' });
    if (viewables.length === 0) {
        console.error('Document contains no viewables.');
        return;
    }

    viewerApp.selectItem(viewables[0].data, onItemLoadSuccess, onItemLoadFail);
}

function onDocumentLoadFailure(viewerErrorCode) {
    console.error('onDocumentLoadFailure() - errorCode:' + viewerErrorCode);
    jQuery('#MyViewerDiv').html('<p>Translation in progress... Please try refreshing the page.</p>');
}

function onItemLoadSuccess(viewer, item) {
    console.log('onItemLoadSuccess()!');
    console.log(viewer);
    console.log(item);

    console.log('Viewers are equal: ' + (viewer === viewerApp.getCurrentViewer()));
}

function onItemLoadFail(viewerErrorCode) {
    console.error('onLoadModelError() - errorCode:' + viewerErrorCode);
    jQuery('#MyViewerDiv').html('<p>There is an error fetching the translated SVF file. Please try refreshing the page.</p>');
}