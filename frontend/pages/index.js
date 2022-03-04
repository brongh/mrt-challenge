import styles from '../styles/Home.module.css'
import axios from 'axios'
import React, { useState, useEffect } from 'react'

const instance = axios.create({
  baseUrl: 'http://localhost:8000',
  timeout: 6000,
  headers: {
    "X-Custom-Header": "test"
  }
})

export default function Home() {
  const [allStations, setAllStations] = useState([""])
  useEffect(() => {
    fetch('http://localhost:8000/').then((data) => {
      return data.text()
    }).then((item) => {
      setAllStations([...allStations, ...JSON.parse(item)])
    })
  }, [])

  const [start, setStart] = useState("")
  const [end, setEnd] = useState("")
  const [loading, setLoading] = useState(false)
  const [routeData, setRouteData] = useState([])

  const handleStartChange = (e) => {
    setStart(e.target.value)
  }

  const handleEndChange = (e) => {
    setEnd(e.target.value)
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    if (loading) {
      return
    }
    setLoading(true)
    console.log("loading")
    const now = new Date()
    fetch(`http://localhost:8000/route?date=${now}&starting=${start}&ending=${end}`).then((data) => { return data.text() }).then((item) => {
      setRouteData(JSON.parse(item))
      setLoading(false)
    })
  }


  return (
    <div className={styles.container}>
      <main className={styles.main}>
        <div style={{ display: "flex", flexDirection: "column", alignItems: "center", padding: 10 }}>
          <div style={{ display: "flex", flexDirection: "row", padding: 8, border: "1px solid black" }}>
            <div style={{ margin: 8 }}>
              <h2>Starting Station</h2>
              <select style={{ padding: 6 }} value={start} onChange={handleStartChange}>
                {allStations && allStations.map((item, index) => {
                  return <option value={item} key={index}>{item}</option>
                })}
              </select>
            </div>
            <div style={{ margin: 8 }}>
              <h2>Ending Station</h2>
              <select style={{ padding: 6 }} value={end} onChange={handleEndChange}>
                {allStations && allStations.map((item, index) => {
                  return <option value={item} key={index}>{item}</option>
                })}
              </select>
            </div>
          </div>
          <button style={{ marginTop: 20 }} onClick={handleSubmit}>{loading ? "Loading..." : "Search Routes"}</button>
          <div style={{ display: "flex", flexDirection: "row", margin: 20 }}>
            {
              routeData && routeData.map((item, index) => {
                const lineData = []
                Object.keys(item).forEach((k) => {
                  if (k !== "totalCount" && k !== "duration") {
                    lineData.push(item[k])
                  }
                })
                console.log(lineData)
                const mapKeys = Object.keys(item).map((k) => {
                  if (k !== "totalCount" && k !== "duration") {
                    return k
                  }
                })

                return <div key={index} style={{ display: 'flex', flexDirection: "column", border: "1px solid black", padding: 10, margin: 10 }}>
                  {
                    lineData && lineData.map((i, lineKeys) => {
                      const firstStop = i[0]
                      const lastIndex = i.length - 1
                      const lastStop = i[lastIndex]
                      return <p key={lineKeys}>{`Travel ${i.length} stations from ${firstStop} to ${lastStop} on the ${mapKeys[lineKeys]} line`}</p>
                      // return <p key={lineKeys}>{`Travel ${i.length} stations on the ${mapKeys[lineKeys]} line`}</p>
                    })
                  }
                  <p>Time required: {item.duration}</p>
                  <p>Total stops: {item.totalCount}</p>
                </div>
              })
            }
          </div>
        </div>
      </main>

    </div>
  )
}
