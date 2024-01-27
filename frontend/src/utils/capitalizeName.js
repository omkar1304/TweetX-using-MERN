export default function capitalizeName(name) {

    const words = name.split(' ');
  
    const capitalizedWords = words.map(word => {
      return word.charAt(0).toUpperCase() + word.slice(1).toLowerCase();
    });
  
    // Join the words back together
    const capitalizedName = capitalizedWords.join(' ');
  
    return capitalizedName;
  }
  
