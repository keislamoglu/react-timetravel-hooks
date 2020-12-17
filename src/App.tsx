import React from 'react'
import logo from './logo.svg'
import './App.css'
import { useCountdown, useRemainingTime } from './hooks'
import { TimeUnitLabelDefinition } from './interfaces'

function App() {
  const labels: TimeUnitLabelDefinition = {
    millennia: ['binyıl', 'binyıl', 'by'],
    centuries: ['yüzyıl', 'yüzyıl', 'yy'],
    decades: ['onyıl', 'onyıl', 'oy'],
    years: ['yıl', 'yıl', 'y'],
    weeks: ['hafta', 'hafta', 'h'],
    months: ['ay', 'ay', 'ay'],
    days: ['gün', 'gün', 'g'],
    hours: ['saat', 'saat', 'sa'],
    minutes: ['dakika', 'dakika', 'dk'],
    seconds: ['saniye', 'saniye', 'sn'],
    milliseconds: ['milisaniye', 'milisaniye', 'ms'],
  }
  const countdown = useCountdown(true, labels)
  const remaining = useRemainingTime(new Date('2020-12-13T23:56'), countdown)

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.tsx</code> and save to reload.
        </p>
        <a className="App-link" href="https://reactjs.org" target="_blank" rel="noopener noreferrer">
          Learn React
        </a>
        <div className="remaining-time">{remaining}</div>
      </header>
    </div>
  )
}

export default App
