import water from './../asserts/images/types-icon/water.png'
import fire from './../asserts/images/types-icon/fire.png'
import electric from './../asserts/images/types-icon/electric.png'
import grass from './../asserts/images/types-icon/grass.png'
import rock from './../asserts/images/types-icon/rock.png'
import ground from './../asserts/images/types-icon/ground.png'
import fairy from './../asserts/images/types-icon/fairy.png'
import psychic from './../asserts/images/types-icon/psychic.png'
import flying from './../asserts/images/types-icon/flying.png'
import steel from './../asserts/images/types-icon/steel.png'
import fighting from './../asserts/images/types-icon/fighting.png'
import normal from './../asserts/images/types-icon/normal.png'
import ice from './../asserts/images/types-icon/ice.png'
import poison from './../asserts/images/types-icon/poison.png'
import dragon from './../asserts/images/types-icon/dragon.png'
import ghost from './../asserts/images/types-icon/ghost.png'
import bug from './../asserts/images/types-icon/bug.png'
import dark from './../asserts/images/types-icon/dark.png'

const options = {
  method: 'GET',
  headers: {
    'Content-Type': 'application/json'
  }
}

const LEGENDARIES_IDS = [144, 145, 146, 150, 151, 243, 244, 245, 249, 250, 251] // Gen 1, 2
for (let i = 377; i <= 386; i++) LEGENDARIES_IDS.push(i) // Gen 3
for (let i = 480; i <= 493; i++) LEGENDARIES_IDS.push(i) // Gen 4
for (let i = 638; i <= 649; i++) LEGENDARIES_IDS.push(i) // Gen 5
for (let i = 716; i <= 721; i++) LEGENDARIES_IDS.push(i) // Gen 6
for (let i = 785; i <= 809; i++) LEGENDARIES_IDS.push(i) // Gen 7

const REGIONS = {
  Kanto: {
    offset: 0,
    limit: 151
  },
  Johto: {
    offset: 151,
    limit: 100
  },
  Hoenn: {
    offset: 251,
    limit: 135
  },
  Sinnoh: {
    offset: 386,
    limit: 107
  },
  Unova: {
    offset: 493,
    limit: 156
  },
  Kalos: {
    offset: 649,
    limit: 72
  },
  Alola: {
    offset: 721,
    limit: 86
  },
}

const toTitleCase = function (str) {
  return str.charAt(0).toUpperCase() + str.substr(1).toLowerCase();
}

export async function getPokeData(pokeName) {

      const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokeName}`, options)
      const pokeData = await response.json();
  
      const {
        id, 
        name, 
        sprites, 
        stats, 
        types, 
      } = pokeData;
  
      const obj = {
        name: toTitleCase(name),
        sprites, 
        stats, 
        types, 
      };
  
      obj.legendary = LEGENDARIES_IDS.includes(id);
  
      let price = 0;
      for(let stat of stats)
        price += stat.base_stat
      price /= 6;

      const LEG = (obj.legendary) ? 7 : 1;
      obj.price_default = ((price ** (3)) * LEG / 100).toFixed(2);
      obj.price_shiny = (obj.price_default * 20).toFixed(2);
  
      return obj;
}

export async function getFilteredPokeList(filters) {

  let ret;
  if (filters === null) {
    const response = await fetch(`https://pokeapi.co/api/v2/pokemon?limit=151`, options)
    const pokeData = await response.json();
    const pokeNameList = await pokeData.results.map(item => item.name)
    ret =  await pokeNameList
  }
  else if(filters.searchName !== null && filters.searchName !== undefined) {
    try{
      const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${filters.searchName}`, options)
      const pokeData = await response.json();
      ret = [pokeData.name];
    } catch (error) {
      ret = [];
    }
  } 
  else {
    const allReturns = await getPreFilteredData(filters);
    const pokeNames = intersection(...allReturns)
    ret = await pokeNames;
  }

  setTimeout( async () => {}, 100)

  return ret

}

async function getPreFilteredData(filters) {
  return Promise.all(Object.keys(filters).map( async filter => {

    if (filters[filter] === null) {
      return []
    }
    const value = filters[filter]

    switch(filter) {

      case 'type_1': {
        const response = await fetch(`https://pokeapi.co/api/v2/type/${value}`, options)
        const pokeData = await response.json();
        const pokeNameList = await Promise.all(pokeData.pokemon.map(item => item.pokemon.name));
        return pokeNameList;  
      }

      case 'type_2': {
        const response = await fetch(`https://pokeapi.co/api/v2/type/${value}`, options)
        const pokeData = await response.json();
        const pokeNameList = await Promise.all(pokeData.pokemon.map(item => item.pokemon.name));
        return pokeNameList;
      }
      case 'region': {
        const response = await fetch(`https://pokeapi.co/api/v2/pokemon?offset=${REGIONS[value].offset}&limit=${REGIONS[value].limit}`, options)
        const pokeData = await response.json();
        const pokeNameList = await pokeData.results.map(item => item.name)
        return pokeNameList;
      }
      default:
        return [];
    }
  }))
}

function intersection() {

  const result = [];
  const discarded = [];

  const lists = arguments;

  let numNotEmpty = 0, index = -1;
  for(let i in arguments) {
    if(arguments[i].length > 0) {
      numNotEmpty++;
      index = i;
    }
  }
  if (numNotEmpty === 1 && index !== -1)
    return arguments[index];

  for(let i in lists) {
    for(let j in lists[i]) {
      let cur = lists[i][j]
      if(discarded.includes(cur)) {
        continue
      }
      if(!result.includes(cur)) {
        let existsInAll = true;
        for (let m in lists)
          if (lists[m].length > 0 && !lists[m].includes(cur)) {
            existsInAll = false;
            break;
          }
        if(existsInAll) 
          result.push(cur)
        else
          discarded.push(cur)
      }
      else {
        discarded.push(cur)
      }
      
    }
  }

  return result;
}

export function getTypesList() {
  return [
    'bug',
    'dark',
    'water',
    'fire',
    'electric',
    'grass',
    'rock',
    'ground',
    'fairy',
    'psychic',
    'flying',
    'steel',
    'fighting',
    'normal',
    'ice',
    'poison',
    'dragon',
    'ghost'
  ].sort()
}

export function getTypesIcon() {
  return {
    bug,
    dark,
    water,
    fire,
    electric,
    grass,
    rock,
    ground,
    fairy,
    psychic,
    flying,
    steel,
    fighting,
    normal,
    ice,
    poison,
    dragon,
    ghost
  }
}