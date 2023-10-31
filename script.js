document.addEventListener("DOMContentLoaded", () => {
    const reportForm = document.getElementById("reportForm");
    const videoInput = document.getElementById("videoInput");
    const uploadButton = document.getElementById("uploadButton");
    const locationsList = document.getElementById("locationsList");

    reportForm.addEventListener("submit", (e) => {
        e.preventDefault();
        const location = document.getElementById("location").value;
        const description = document.getElementById("description").value;

        console.log("Incident reported:", location, description);
        document.getElementById("location").value = "";
        document.getElementById("description").value = "";
    });

    videoInput.addEventListener("change", () => {
        if (videoInput.files.length > 0) {
            uploadButton.style.display = "block";
        }
    });

    uploadButton.addEventListener("click", () => {
        console.log("Video uploaded");
        uploadButton.style.display = "none";
        videoInput.value = "";
    });

    fetch("db.json")
        .then(response => response.json())
        .then(data => {
            const locations = data.locations;
            locationsList.innerHTML = "";
            locations.forEach(location => {
                const listItem = document.createElement("li");
                listItem.textContent = location;
                const deleteButton = document.createElement("button");
    deleteButton.textContent = "Delete";
    deleteButton.classList.add("delete-button");

              deleteButton.addEventListener("click", () => {
                
        listItem.remove();
    });

    
    listItem.appendChild(deleteButton);   locationsList.appendChild(listItem);
            });

            const videos = data.videos;
            const featuredVideos = document.querySelector(".featured-videos");
            videos.forEach(video => {
                const videoDiv = document.createElement("div");
                videoDiv.className = "video";
                const iframe = document.createElement("iframe");
                iframe.width = "560";
                iframe.height = "315";
                iframe.src = `https://www.youtube.com/embed/${video.videoID}`;
                iframe.frameborder = "0";
                iframe.allowfullscreen = true;
                const p = document.createElement("p");
                p.textContent = video.title;
                videoDiv.appendChild(iframe);
                videoDiv.appendChild(p);
                featuredVideos.appendChild(videoDiv);
            });
        })
        .catch(error => {
            console.error("Error fetching data:", error);
        });
});

const submitReport=()=>{
    const location = document.querySelector('#location').value
    const description = document.querySelector('#description').value

    console.log(location, description)

    fetch("http://localhost:3000/reports",{
        method:"POST",
        headers:{
            'Content-Type':'application/json'
            },
            body:JSON.stringify({
                id: Math.random()*10,
                location: location,
                description: description
                }),
                }).then((res)=>{
                    return res.json();
                    }).then((data)=>{
                        alert('Your report has been submitted')
          

    });

}
