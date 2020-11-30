const villainsList = [{
  id: 1,
  name: 'Captain Hook',
  movie: 'Peter Pan',
  slug: 'captain-hook',
}, {
  id: 2,
  name: 'Cruella de Vil',
  movie: 'One Hundred and One Dalmatians',
  slug: 'cruella-de-vil',
}, {
  id: 3,
  name: 'Gaston',
  movie: 'Beauty and the Beast',
  slug: 'gaston',
}]

const singleVillain = [{
  id: 4,
  name: 'Hades',
  movie: 'Hercules',
  slug: 'hades',
}]
const createVillain = {
  name: 'Red Skull',
  movie: 'Captain America: The First Avenger',
  slug: 'red-skull',
}

const createVillainResponse = {
  id: 21,
  name: 'Red Skull',
  movie: 'Captain America: The First Avenger',
  slug: 'red-skull',
  updatedAt: '2020-04-24T13:12:15.656Z',
  createdAt: '2020-04-24T13:12:15.656Z'
}

module.exports = { villainsList, singleVillain, createVillain, createVillainResponse }
