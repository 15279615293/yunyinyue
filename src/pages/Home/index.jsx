import React from 'react'
import Carousels from './Carousels'
import Hot from './Hot'
import Album from './Album'
import List from './List'
import NewMv from './NewMv'
import Station from './Station'

export default function Index() {
  return (
    <div>
      <Carousels/>
      <Hot/>
      <Album/>
      <List/>
      <NewMv/>
      <Station/>
    </div>
  )
}
