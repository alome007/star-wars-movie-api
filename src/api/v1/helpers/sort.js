function sortCharactetList(sort, query) {
  let characters = [];
  if (!query || query == undefined) {
    characters = sort.sort((a, b) => b.name.localeCompare(a.name));
  } else {
    switch (query.sortBy) {
      case "name":
        if (query.orderBy == "asc") {
          characters = sort.sort((a, b) => b.name.localeCompare(a.name));
        } else if (query.orderBy == "desc") {
          characters = sort.sort((a, b) => a.name.localeCompare(b.name));
        } else {
          //not recognised
          characters = sort.sort((a, b) => a.name.localeCompare(b.name));
        }
        break;
      case "height":
        if (query.orderBy == "asc") {
          characters = sort.sort((a, b) => b.gender.localeCompare(a.gender));
        } else if (query.orderBy == "desc") {
          characters = sort.sort((a, b) => a.gender.localeCompare(b.gender));
        } else {
          //not recognised
          characters = sort.sort((a, b) => a.gender.localeCompare(b.gender));
        }
        break;

      default:
        characters = sort.sort((a, b) => a.name.localeCompare(b.name));
    }

    //filter by gender logic
    if (query.gender) {
      characters = characters.filter(
        (character) => character.gender === query.gender
      );
    }
  }

  let metaData = {
    totalCharacter: characters.length,
    totalHeight: getTotalHeight(characters, query),
  };
  return {
    metaData,
    characters,
  };
}

function getTotalHeight(val, query) {
  let totalHeight = 0;

  if (query.gender) {
    val.filter((character) => (character.gender = query.gender));
    console.log(val.length);
  }
  for (var i = 0; i < val.length; i++) {
    totalHeight += parseInt(val[i].height);
  }

  return toFeet(totalHeight);
}

function toFeet(n) {
  var realFeet = (n * 0.3937) / 12;
  var feet = Math.floor(realFeet);
  var inches = Math.round((realFeet - feet) * 12);
  return `${feet}ft and ${inches}inches`;
}
module.exports = {
  sortCharactetList,
};
