import React from 'react';
import './Keyboard.css';

export default function Keyboard(props) {
  const frequencyArray = [
    { value: 262, note: 'C', cssClass: 'white-key' },
    { value: 278, note: 'C#', cssClass: 'black-key' },
    { value: 294, note: 'D', cssClass: 'white-key'  },
    { value: 311, note: 'D#', cssClass: 'black-key'  },
    { value: 330, note: 'E', cssClass: 'white-key'  },
    { value: 349, note: 'F', cssClass: 'white-key'  },
    { value: 370, note: 'F#', cssClass: 'black-key'  },
    { value: 392, note: 'G', cssClass: 'white-key'  },
    { value: 415, note: 'G#', cssClass: 'black-key'  },
    { value: 440, note: 'A', cssClass: 'white-key'  },
    { value: 466, note: 'A#', cssClass: 'black-key'  },
    { value: 494, note: 'B', cssClass: 'white-key'  },
  ]
  return (
    <div className="keyboard-wrapper">
      {frequencyArray.map(frequency => (
        <div
          className={`note ${frequency.cssClass}`}
          key={frequency.value}
          onMouseDown={() => props.playNote(frequency.value)}
          onMouseUp={props.stopPlaying}
        >
          <button>
            <span>{frequency.note}</span>
          </button>
        </div>
      ))}
    </div>
  );
}
