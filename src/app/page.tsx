/* eslint-disable react-hooks/exhaustive-deps */
"use client"

import Image from 'next/image'
import styles from './page.module.css'
import { useEffect, useState } from 'react'
import usePlaylist from '@/hooks/usePlaylist'

export default function Home() {
  const [items,setItems]= useState<any>(null)
  const {getVideosByPlayListId,playlists} = usePlaylist()
  useEffect(()=>{
     getVideosByPlayListId('PLncU8Kg03RwzmriLO9nHYIpvxchbdx1zJ')

  },[])
  console.log(playlists);
  return (
    <main className={styles.main}>
     

      <div className={styles.center}>
        <Image
          className={styles.logo}
          src="/next.svg"
          alt="Next.js Logo"
          width={180}
          height={37}
          priority
        />
      </div>

   
    </main>
  )
}
