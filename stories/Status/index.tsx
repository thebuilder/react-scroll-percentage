import { CSSProperties, default as React } from 'react'

type Props = { percentage: number }

const calcPercentage = (percentage: number) => Math.floor(percentage * 100)

const statusElement: CSSProperties = {
  position: 'fixed',
  top: 0,
  right: 0,
  height: 32,
  minWidth: 42,
  padding: '0 10px',
  background: 'rgba(255, 255, 255, 0.6)',
  display: 'flex',
  justifyContent: 'flex-end',
  alignItems: 'center',
  borderRadius: '0 0 0 10px',
}

const percentageStyle: CSSProperties = {
  fontFamily: 'monospace',
  fontSize: '1.25rem',
}

function Status({ percentage }: Props) {
  return (
    <div style={statusElement}>
      <span style={percentageStyle}>{calcPercentage(percentage)}%</span>
    </div>
  )
}

export default Status
