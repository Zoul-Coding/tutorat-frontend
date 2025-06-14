import { useState } from "react";

const ShowMoreText = ({
  text = "",
  maxChars = 100,
  className = "",
}: {
  text?: string;
  maxChars?: number;
  className?: string;
}) => {
  const [isExpanded, setIsExpanded] = useState(false);

  const toggleText = () => {
    setIsExpanded((prev) => !prev);
  };

  const isLongText = text.length > maxChars;
  const displayText = isExpanded ? text : text.slice(0, maxChars);

  return (
    <div className={className}>
      <p>
        {displayText}
        {isLongText && !isExpanded && "..."}
      </p>

      {isLongText && (
        <button
          onClick={toggleText}
          className="text-black font-medium mt-1 hover:underline"
        >
          {isExpanded ? "Voir moins" : "Voir plus"}
        </button>
      )}
    </div>
  );
};

export default ShowMoreText;
