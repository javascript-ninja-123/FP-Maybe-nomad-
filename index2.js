const axios = require('axios');
///getting maybe function here
const isNullorUndef = value => value === null || value === undefined;
const maybe = value => ({
  isNothing: () => isNullorUndef(value),
  map:(fn) => !isNullorUndef(value) ? maybe(fn(value)) : maybe([]),
  compose:(...fns) => !isNullorUndef(value) ? maybe(fns.reduce((acc,fn) => fn(acc),value)) : maybe([]),
  unfold:() =>!isNullorUndef(value) ? value : []
})
///finally getting maybe function


const fetchCall = async(url) => {
  try{
    const response = await axios(url)
    return await response.data
  }
  catch(err){
    return err;
  }
}

const addId = num => obj => ({...obj, id:obj.id + num});
const filterId = num => obj => obj.id > num;
const addFiveToId = addId(5)
const addOneToId = addId(1)
const filterhigherThan10 = filterId(10)

const addFiveToUserGroup = users => users.map(addFiveToId);
const filterToUserGroup = users =>  users.filter(filterhigherThan10)

const getUserId = async () => {
  const users = await fetchCall('https://jsonplaceholder.typicode.com/users')
  return maybe(users)
  .compose(
    addFiveToUserGroup,
    filterToUserGroup
  )
  .unfold()
}

getUserId()
.then(v => console.log(v))

// const justDoit = async() => {
//     const users = await fetchCall('https://jsonplaceholder.typicode.com/users')
//     return users
//     .map(addOneToId)
//
// }


// justDoit()
// .then(v => console.log(v))
