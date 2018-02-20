import React from 'react';

export default function Keyboard(props) {
  const frequencyArray = [
    { value: 262, note: 'C' },
    { value: 278, note: 'C#' },
    { value: 294, note: 'D' },
    { value: 311, note: 'D#' },
    { value: 330, note: 'E' },
    { value: 349, note: 'F' },
    { value: 370, note: 'F#' },
    { value: 392, note: 'G' },
    { value: 415, note: 'G#' },
    { value: 440, note: 'A' },
    { value: 466, note: 'A#' },
    { value: 494, note: 'B' },
  ]
  return (
    <div>
      {frequencyArray.map(frequency => (
        <button key={frequency.value} onMouseDown={() => props.playNote(frequency.value)} onMouseUp={props.stopPlaying}>
          {frequency.note}
        </button>
      ))}
    </div>
  );
}
