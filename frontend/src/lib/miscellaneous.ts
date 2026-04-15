export function truncateStringEllipsis(stringToTruncate: string, substringEnd: number): string {
  if (stringToTruncate.length > substringEnd) {
    //This handles the niche case where the truncated string
    //ends in a comma by removing it to make the result look better.
    //it's kinda stupid but yeah.
    let truncatedString: string;
    if (stringToTruncate[substringEnd - 4] == ",") {
      truncatedString = stringToTruncate.substring(0, substringEnd - 4);
    } else {
      truncatedString = stringToTruncate.substring(0, substringEnd);
    }

    return truncatedString + "...";
  }
  return stringToTruncate;
}
