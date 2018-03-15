console.log('yes');


const isNullOrUndef = value => value === null || value === undefined;


const maybe = value => ({
    isNothing:() => isNullOrUndef(value)
  })


const Maybe = {
  just:maybe,
  nothing:() => maybe(null)
}

const maybeNumberOne = Maybe.just("a value");
const maybeNumberTwo = Maybe.nothing();

const result1 = maybeNumberOne.isNothing(); // false
const result2 = maybeNumberTwo.isNothing(); // true

if(result1){
  console.log('use is here')
}
else{
  console.log('user is not here')
}


// const isNullorUndef = value => value === null || value === undefined;
// const maybe = value => ({
//   isNothing:() => isNullorUndef(value)
// })

// const ageLimit = limit => age => age > limit ? true : false;
// const adultLimt = ageLimit(21)
//
// const simpleMaybe = predicate => value => predicate(value);
// const nullMaybe = simpleMaybe(isNullOrUndef);
// const ageMaybe = simpleMaybe(adultLimt)



// const user = nullMaybe('user')
// const validateUserAge = ageMaybe(15)
//
// if(user){
//   console.log('there is a user')
// }
//
//
//
//
// if(validateUserAge){
//   console.log('horrah')
// }
// else{
//   console.log('too young')
// }




// const Maybe = {
//   just:maybe,
//   nothing:maybe(null)
// }


const maybe$ = value => ({
  isNothing:() => isNullOrUndef(value),
  map:transformer => !isNullOrUndef(value) ? Maybe$.just(transformer(value)) : Maybe$.nothing(),
  unfold:() => value
})


const Maybe$ = {
  just:maybe$,
  nothing:() => maybe$(null)
}

const maybeOne = Maybe$.just(5);
const man = maybeOne.map(value => value + 1)
console.log(man.unfold())


const maybeTwo = Maybe$.just(null);
const man2 = maybeTwo.map(value => value +2);
console.log(man2.unfold())
