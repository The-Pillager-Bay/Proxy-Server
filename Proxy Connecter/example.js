// a sample taken from the pillager bay's mc/mcbe.js

let _download_lock = false;
function download_and_decrypt(url, key, keyId, filename) {
    if(_download_lock) {
        alert("download already in progress");
        return;
    }
    _download_lock = true;
	window.downloadFileName = filename;
	window.downloadKeyId = keyId;
    

    status_cb("Starting download...");
    let xhr = new XMLHttpRequest();
	xhr.open("GET", window.location.protocol + '//' + window.location.host + "/tpb/proxy.php?url=" + url,true);		// Connect to xforge proxy network
    xhr.responseType = "blob";

    xhr.onprogress = function(e) {
        status_cb("Downloading: "+Math.round(e.loaded/e.total*100)+"%");
    };

    xhr.onload = async function(e) {
        if(xhr.status != 200) {
            alert("error downloading: "+xhr.status);
            _download_lock = false;
            return;
        }

		status_cb("Unpacking...");
        var arc = new zip.ZipReader(new zip.BlobReader(xhr.response));
        var entries = await arc.getEntries();

        for(var i = 0; i < entries.length; i++) {
            var entry = entries[i];
            const blob2 = await entry.getData(new zip.BlobWriter())
            const fs = new zip.fs.FS();
            await fs.importBlob(blob2);
            
            var manifest = fs.getChildByName("manifest.json");
            var txt = await manifest.getText();
            var manifestJson = JSON.parse(txt);
            var uuid = manifestJson.header.uuid;
            
            if(uuid == window.downloadKeyId) {
                let decryptor = new MarketplaceDecryptor(key, status_cb);
                 await decryptor.decrypt_inner_zip(fs);
				
				status_cb("Repacking...");
				var zipBlob = await fs.exportBlob({level: 0, compressionMethod:0});
				
				// Workaround chrome on android bug.
				var mcPackBlob = zipBlob.slice(0, zipBlob.size, "application/octlet-stream")

				var blobUrl = URL.createObjectURL(mcPackBlob);
				
				// Download plz
				status_cb("Done! (click here if the download didnt start!)")
				document.getElementById("dlStatus").href = blobUrl;
				document.getElementById("dlStatus").download = window.downloadFileName;
				if(!navigator.userAgent.toLowerCase().indexOf("safari") != -1)
					document.getElementById("dlStatus").click();
            }
        }
		
        _download_lock = false;
    }
	xhr.setRequestHeader( 'User-Agent', 'cpprestsdk/2.9.0');
	xhr.setRequestHeader( 'Access-Control-Allow-Origin', '*');
	xhr.send();
}