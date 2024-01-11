import { getPlayList } from "@/api";
import { useState } from "react";

export default function usePlaylist() {
    const [state, setState] = useState({
        playlists: {},
        recentPlayLists: [],
        favourites: [],
    })

    const getVideosByPlayListId = async (playlistId: string, fource = false) => {

        if ((state as any).playlists[playlistId] && !fource) {
            return
        }
        let result = await getPlayList(playlistId)
       
        let cid: any, ct: any;
        result = result.map((item: any) => {
            const { channelId, title, description, thumbnails: { medium }, channelTitle } = item.snippet

            if (!cid) {
                cid = channelId
            }
            if (!ct) {
                ct = channelTitle
            }


            return {
                title,
                description,
                thumbnail: medium,
                channelTitle,
                contentDetails: item.contentDetails
            }
        })
        setState(prev => ({
            ...prev,
            playlists: {
                ...prev.playlists,
                [playlistId]: {
                    items: result,
                    playlistId,
                    chennelId: cid,
                    chennelTitle: ct
                }
            }
          
        }))
    }

    const addToRecent = async (playlistId: string) => {
        const result = await getPlayList(playlistId)
        setState(prev => ({
            ...prev,
            recentPlayLists: {
                ...prev.recentPlayLists
            },
            [playlistId]: result
        }))
    }

    const addToFavourite = async (playlistId: string) => {
        const result = await getPlayList(playlistId)
        setState(prev => ({
            ...prev,
            favourites: {
                ...prev.favourites
            },
            [playlistId]: result
        }))
    }

    const getVideosByPlayListIds = async (ids: string[] = []) => {

        return ids.map(id => (state as any)?.playlists[id])
    }

    return {
        playlists: state.playlists,
        favourites: getVideosByPlayListIds(state.favourites),
        recentPlayLists: getVideosByPlayListIds(state.recentPlayLists),
        getVideosByPlayListId,
        addToRecent,
        addToFavourite
    }
}
