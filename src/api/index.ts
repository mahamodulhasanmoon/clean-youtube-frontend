import axios from "axios"

const key = 'AIzaSyAUB8VS3N9_hwUzY5-OpmTUYYtYkeJL-NE'

export const getPlayList = async (playlistId='',pageToken='',result:[] | any=[]) =>{


    const url = `https://youtube.googleapis.com/youtube/v3/playlistItems?key=${key}&part=id,contentDetails,snippet&maxResults=50&playlistId=${playlistId}&pageToken=${pageToken}`

const {data} = await axios.get(url)
result = [...result, ...data.items]

if(data.nextPageToken){
   result = await getPlayList(playlistId,data.nextPageToken,[...result, ...data.items])
}
return result
}