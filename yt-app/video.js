
const vedio_details_div=document.getElementById("vedio_details");

const playVideo = () => {
    let {videoId} = JSON.parse(localStorage.getItem("clicked_item"))
    // console.log("data:", data)

    let iframe= document.createElement("iframe")
    iframe.src =`https://www.youtube.com/embed/${videoId}?autoplay=1&mute=1`;

    iframe.width="900";
    iframe.height="515"
    iframe.setAttribute('allowfullscreen',true)
    
    vedio_details_div.append(iframe)


}
function openhome(){
   window.location.href="index.html"
}


const Api_Key='AIzaSyC4kWakHlRtbP321G4yQev1dMMLjX1NoH0';

fetch(` https://youtube.googleapis.com/youtube/v3/videos?part=snippet&chart=mostPopular&maxResults=200&key=${Api_Key}`)
     .then(res=> res . json())
     .then((data) => {
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
    
             document.getElementById("recomdvdos").append(div);
            })
            })
            .catch(error => console.log(error));
            function storeClickedvideo(data){
    
                localStorage.setItem("clicked_item", JSON.stringify(data));
                   window.location.href="video.html"
                   // console.log("yes")
               }
