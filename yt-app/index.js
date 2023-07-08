
let menuicon = document.querySelector(".menu-icon");
let sidbar = document.querySelector('.sidbar');
 let container=document.querySelector(".container")
 let filters =document.querySelector(".filters");
 let filterbtn = document.querySelector(".filterbtn");
let gridfilter = document.querySelector(".grid-filters");
let fil =document.querySelector("filtering");

menuicon.onclick=function(){
    container.classList.toggle("big-container");
    sidbar.classList.toggle("small-slider");
    filters.classList.toggle("big-filters");
    fil.classList.toggle("ht");
    // grid_filter.classList.toggle("grid_filtera");

}
filterbtn.onclick = function(){
    gridfilter.classList.toggle("bigfilter");

}

// -----------pop log in----
let username=JSON.parse(localStorage.getItem("username"));
let poplogin=document.getElementById("poplogin");
poplogin.innerText=username || "SIGN IN" ;

// ------------pop log in--------

document.querySelector("#loginpop").addEventListener("click",function(e){
    e.preventDefault();
    document.querySelector("#popup").style.display="flex";
})

document.querySelector(".close").addEventListener("click",function(){
    document.querySelector("#popup").style.display="none";
})


    //  --------------HOME-----------

    const Api_Key='AIzaSyC4kWakHlRtbP321G4yQev1dMMLjX1NoH0';

    // const video_http='https://www.googleapis.com/youtube/v3/videos?'
    // const video_data='https://www.googleapis.com/youtube/v3/channels?'
    
    
     fetch(` https://youtube.googleapis.com/youtube/v3/videos?part=snippet&chart=mostPopular&maxResults=200&key=${Api_Key}`)
     .then(res=> res . json())
     .then((data) => {
        //  console.log(data.items)
    
    
        // fetch(video_http + new URLSearchParams({
        //     key:Api_Key,
        //     part: 'snippet',
        //     chart:'mostPopular',
        //     maxResults:52,
        //     regionCode:'IN'
        // }))
        // .then(res=> res . json())
        // .then((data) => {
        //     console.log(data)
            
        // console.log(data)
        let Data=data.items
    
        Data.forEach(({snippet,id}) =>{

            
            const title=snippet.title
               
            const videoId=id;
    
            const thumbnail=snippet.thumbnails.high.url;
    
            const channel_name=snippet.channelTitle;
    
             const div = document.createElement('div')
             const img =document.createElement('img');
             img.src=thumbnail;
    
             const title_html=document.createElement("h4")
             title_html.innerText=title;
    
             const channel_html=document.createElement("h5");
             channel_html.innerText=channel_name;
    
             
             let data ={
                videoId,
                snippet,
             }
             div.onclick=()=>{
                storeClickedvideo(data)
             }
           
             div.append(img,title_html,channel_html);
    
             document.getElementById("container").append(div);
            //  console.log({snippet,id})
            // console.log(videoId)
            // console.log(data)
    
        })
        // const actual_data= data;
       
        // appendVideos(actual_data)
        
     })
     .catch(error => console.log(error));
    
    function storeClickedvideo(data){
    
     localStorage.setItem("clicked_item", JSON.stringify(data));
        window.location.href="video.html"
        // console.log("yes")
    }
    
      
    // --------HOME END---------------------
    
    



// -----------SEARCH------------------
let actual_data;

const API_KEY=`AIzaSyC4kWakHlRtbP321G4yQev1dMMLjX1NoH0`
const container_div=document.getElementById("container");
const searchVedios = async ()=> {
    try{
         const qurey=document.getElementById("query").value;

        const res =await fetch(`https://youtube.googleapis.com/youtube/v3/search?part=snippet&type=video&order=viewCount&videoEmbeddeable=true&order=date&maxResults=20&q=${qurey}&key=${API_KEY}`)

        const data=await res.json();
//    console.log(data)
        actual_data=data.items;
      
        appendVideos(actual_data)  

    }
    catch(error){
        console.log("error",error)
    }

};

// ()=>{sortTitle(actual_data)}


document.getElementById("today").addEventListener("click", sortTitle)
function sortTitle(data){
    data.sort(function(a,b){
     return a.snippet.title-b.snippet.title;
   })
   appendVideos(data)
   console.log(data)

}



const appendVideos=(data)=> {
    container_div.innerHTML=null;
   
    data.forEach(({snippet,id})=>{
        let filtering=document.querySelector(".filtering");
        filtering.style.display="block"
        const title=snippet.title;
           
        const videoId=id.videoId;

        const thumbnail=snippet.thumbnails.high.url;

        const channel_name=snippet.channelTitle;

         const div = document.createElement('div')
         const img =document.createElement('img');
         img.src=thumbnail;

         const title_html=document.createElement("h4")
         title_html.innerText=title;

         const channel_html=document.createElement("h5");
         channel_html.innerText=channel_name;

         
        //  let data ={
        //     videoId,
        //     snippet,
        //  }

         div.onclick=()=>{
            storeClickedvideo(data)
         }
       
         div.append(img,title_html,channel_html);

         container_div.append(div);
        // console.log(data)
    });
};

function storeClickedvideo(data){

 localStorage.setItem("clicked_item", JSON.stringify(data));
    window.location.href="video.html"
    console.log("yes")
}


// ------------SEARCH END------------