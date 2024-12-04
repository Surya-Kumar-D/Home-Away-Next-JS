"use client";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import Title from "./Title";

function Description({ description }: { description: string }) {
  const [isFullDescriptionShown, setIsFullDescriptionShown] = useState(false);
  const isDescriptionLong = description.split(" ").length > 100;
  const displayedDescription =
    isDescriptionLong && !isFullDescriptionShown
      ? description.split(" ").splice(0, 100).join(" ") + "..."
      : description;
  const toggleDescription = () => {
    setIsFullDescriptionShown(!isFullDescriptionShown);
  };
  return (
    <article>
      <Title text="Description" />
      <p className="text-muted-foreground font-light leading-loose">
        {displayedDescription}
      </p>
      {isDescriptionLong && (
        <Button variant={"link"} className="pl-0" onClick={toggleDescription}>
          {isFullDescriptionShown ? "Show less" : "Show more"}
        </Button>
      )}
    </article>
  );
}

export default Description;
