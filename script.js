const img = document.getElementById("img");
const output = document.getElementById("output");
const uploadedImage = document.getElementById("uploadedImage");

let model;

// Load the model when the page loads once.
const loadModel = async () => {
  try {
    model = await cocoSsd.load();
    console.log("Model loaded successfully");
  } catch (error) {
    console.error("Error loading model:", error);
  }
};

// Perform detection on the uploaded image.
const performDetection = async () => {
  try {
    output.innerHTML = ""; // Clear previous predictions
    const predictions = await model.detect(img);
    
    if (predictions.length === 0) {
      output.innerHTML = '<div class="text-xl text-center text-yellow-400">No objects detected</div>';
    } else {
      let outputString = predictions.map(prediction => 
        `<div class="text-xl mt-2 text-white text-center uppercase ml-2 bg-slate-900 px-3 py-1 rounded-xl">
          ${prediction.class} - ${Math.round(prediction.score * 100)}%
        </div>`
      ).join("");
      output.innerHTML = outputString;
    }
  } catch (error) {
    console.error("Error during detection:", error);
    output.innerHTML = '<div class="text-xl text-center text-red-400">Error detecting objects</div>';
  }
};

// Handle image upload and start the detection process.
uploadedImage.addEventListener("change", (e) => {
  const file = e.target.files[0];
  if (file) {
    img.src = URL.createObjectURL(file);
    img.onload = () => performDetection(); // Detect once the image has loaded
  } else {
    output.innerHTML = '<div class="text-xl text-center text-red-400">No image uploaded</div>';
  }
});

// Load the model on page load.
window.addEventListener("load", loadModel);
