export function formatTimestamp(timestamp) {
  const d = new Date(timestamp)
  return d.toLocaleString()
}

export function labelColor(vote) {
    if (vote > 0){
      return "label label-success";
    } else if (vote === 0) {
   	  return "label label-default";
    } else {
      return "label label-danger";
    }
 }

export function guid() {
  function random() {
    return Math.floor((1 + Math.random()) * 0x10000)
      .toString(16)
      .substring(1);
  }
  return random()
}