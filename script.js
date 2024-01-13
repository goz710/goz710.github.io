 const apiKey = "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";

 const maxImages = 6;
 let selectedImageNumber = null;

 function getRandomNumber(min, max){
    return Math.floor(Math.random() * (max - min + 1)) + min;
 }
 //function to disable the generate button during process
 function disableGenerateButton(){
    document.getElementById("generate").disabled = true;
 }
 //function to enable the generate button after process
 function enableGenerateButton(){
    document.getElementById("generate").disabled = false;
 }
 //function to clear image grid
 function clearImageGrid(){
    const imageGrid = document.getElementById("image-grid");
    imageGrid.innerHTML = "";
 }
 //function to generate images
 async function generateImages(input){
    disableGenerateButton();
    clearImageGrid();

   const loading = document.getElementById("loading");
   loading.style.display = "block";
   const imageUrls = [];mmmm

      // Generate a number b/w 1 AND 10000 and append it to the prompt
   for(let i = 0; i < maxImages; i++){
      const randomNumber = getRandomNumber(1, 10000);
      const prompt = `${input} ${randomNumber}`;
      const response = await fetch(
          "https://api-inference.huggingface.co/models/prompthero/openjourney",
          {
              method: "POST",
              headers: {
               "Content-Type": "application/json",
               Authorization: `Bearer ${apiKey}`,
              },
              
              body: JSON.stringify({inputs: prompt}),
             
          }
      );

      if(!response.ok){
          alert("Failed to generate image!");
      }
      const blob = await response.blob();
   
      const imgUrl = URL.createObjectURL(blob);
      imageUrls.push(imgUrl);

      const img = document.createElement("img");
      img.src = imgUrl;
      img.alt = `art-${i + 1}`;
      img.onclick = () => downloadImage(imgUrl, i);
      document.getElementById("image-grid").appendChild(img);
   }
      loading.style.display = "none";
      enableGenerateButton();

      selectedImageNumber = null; //reset selected image
 }

      document.getElementById("generate").addEventListener
      ('click',()=>{
      const input = document.getElementById("user-prompt").value;
      generateImages(input);
   });
 
   function downloadImage(imgUrl, imageNumber){
      const link = document.createElement("a");
      link.href = imgUrl;
      //set file name based on selected image
      link.download = `image-${imageNumber + 1}.jpg`;
      link.click();
   }


 
 