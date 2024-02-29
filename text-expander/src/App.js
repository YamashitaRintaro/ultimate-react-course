import { useState } from "react";
import "./App.css";


export default function App() {
  return (
    <div>
      <TextExpander>
        Space travel is the ultimate adventure! Imagine soaring past the stars
        and exploring new worlds. It's the stuff of dreams and science fiction,
        but believe it or not, space travel is a real thing. Humans and robots
        are constantly venturing out into the cosmos to uncover its secrets and
        push the boundaries of what's possible.
      </TextExpander>

      <TextExpander
        collapsedNumWords={20}
        expandButtonText="Show text"
        collapseButtonText="Collapse text"
        buttonColor="#ff6622"
      >
        Space travel requires some seriously amazing technology and
        collaboration between countries, private companies, and international
        space organizations. And while it's not always easy (or cheap), the
        results are out of this world. Think about the first time humans stepped
        foot on the moon or when rovers were sent to roam around on Mars.
      </TextExpander>

      <TextExpander expanded={true} className="box">
        Space missions have given us incredible insights into our universe and
        have inspired future generations to keep reaching for the stars. Space
        travel is a pretty cool thing to think about. Who knows what we'll
        discover next!
      </TextExpander>
    </div>
  );
}

// 1. childrenの単語数を算出。splitかな？
// 2. childrenの単語数 > collapsedNumWordsかどうかのブーリアン定数
// 3. expanded ? children全部 + expandButton : 先頭からcollapsedNumWords単語数のchildren + '...' + collapseButton
function TextExpander({
  expanded: initialExpanded = false,
  className = '',
  collapsedNumWords = 10,
  expandButtonText = 'Show more',
  collapseButtonText = 'Show less',
  buttonColor = 'blue',
  children
}) {
  const [isExpanded, setIsExpanded] = useState(initialExpanded);
  let displayChildren = children;

  if (typeof children === 'string') {
    const childrenWords = children.split(' ');
    const collapseChildren = childrenWords.slice(0, collapsedNumWords).join(' ');
    displayChildren = isExpanded ? children : collapseChildren + '...';
  }

  function handleToggleExpanded() {
    setIsExpanded(!isExpanded)
  }

  return (
    <div className={className}>
      {displayChildren}
      {renderToggleExpandButton({ buttonColor, buttonText: isExpanded ? collapseButtonText : expandButtonText, handleToggleExpanded })}
    </div>
  );
}

function renderToggleExpandButton({ buttonColor, buttonText, handleToggleExpanded }) {
  return (
    <button
      onClick={handleToggleExpanded}
      style={{ color: buttonColor }}>
      {buttonText}
    </button>
  )
}
