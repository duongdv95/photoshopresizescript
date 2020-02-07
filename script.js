main ();

function main ()
{
    if (app.documents.length < 1)
    {
        alert ("No document open to resize.");
        return;
    }

    
    // Apply the resize to Photoshop's active (selected) document.
    var doc = app.activeDocument;
    app.preferences.rulerUnits = Units.PIXELS;
    
    // COLOR STUFF
    doc.changeMode(ChangeMode.RGB); 
    var white = new SolidColor(); 
    white.rgb.hexValue = "FFFFFF";
    app.backgroundColor = white;
    
    // Get the image size in pixels.
    var pixelWidth = new UnitValue (doc.width, doc.width.type);
    var pixelHeight = new UnitValue (doc.height, doc.height.type);
    
    // These can be changed to create images with different aspect ratios.
    var arHeight = 1;
    var arWidth = 1;

    var originalPhotoRatio = pixelWidth/pixelHeight
    if(originalPhotoRatio < 0.8) {
        arHeight = 5;
        arWidth = 4;
    }
    if(originalPhotoRatio >= 0.8 && originalPhotoRatio <= 1.91) {
        return
    }
    if(originalPhotoRatio > 1.91) {
        arHeight = 1
        arWidth  = 1.9
    }

    // Determine the target aspect ratio and the current aspect ratio of the image.
    var targetAr = arWidth / arHeight;
    var sourceAr = pixelWidth / pixelHeight;

    // Start by setting the current dimensions.
    var resizedWidth = pixelWidth;
    var resizedHeight = pixelHeight;

    // The source image aspect ratio determines which dimension, if any, needs to be changed.
    if (sourceAr < targetAr)
        resizedWidth = Math.ceil((arWidth * pixelHeight) / arHeight);
    else
        resizedHeight = (arHeight * pixelWidth) / arWidth;
    
    
    // Apply the change to the image.
    doc.resizeCanvas (resizedWidth, resizedHeight, AnchorPosition.MIDDLECENTER);
}            