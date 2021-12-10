// Returns a random DNA base
const returnRandBase = () => {
  const dnaBases = ['A', 'T', 'C', 'G']
  return dnaBases[Math.floor(Math.random() * 4)] 
};

// Returns a random single stand of DNA containing 15 bases
const mockUpStrand = () => {
  const newStrand = []
  for (let i = 0; i < 15; i++) {
    newStrand.push(returnRandBase())
  }
  return newStrand
};

function pAequorFactory(specimenNum, dna){
  return {
    specimenNum,
    dna,
    mutate(){
      let rand = Math.floor(Math.random()*14);
      let currentBase = this.dna[rand];
      let rand2 = Math.floor(Math.random()*2);
      let newBase;
      switch (currentBase){
        case 'A': newBase = ['T','C','G'][rand2];
        case 'T': newBase = ['A','C','G'][rand2];
        case 'C': newBase = ['T','A','G'][rand2];
        case 'G': newBase = ['T','C','A'][rand2]
      };
      this.dna[rand] = newBase;
    },
    compareDNA(obj){
      let comparisonDNA = obj.dna;
      let thisDNA = this.dna;
      let numInCommon = 0;
      for (let i=0; i<thisDNA.length; i++){
        for(let j=0; j<comparisonDNA.length; j++){
          if (i===j && thisDNA[i]===comparisonDNA[j]){
            numInCommon ++;
          };
        };
      };
      console.log(`Specimen ${this.specimenNum} and specimen ${obj.specimenNum} have ${100*numInCommon/thisDNA.length}% DNA in common.`);
    },
    willLikelySurvive(){
      let count = 0;
      for (base of this.dna){
        if (base==='C' || base==='G'){
          count++;
        };
      };
      return (count/this.dna.length >= 0.6);
    }
  };
};

//test functions
let newSpecimen = pAequorFactory(1001, mockUpStrand());
console.log(newSpecimen);
newSpecimen.mutate();
console.log(newSpecimen);
let newSpecimen2 = pAequorFactory(2001, mockUpStrand());
console.log(newSpecimen2);
newSpecimen.compareDNA(newSpecimen2);
console.log(newSpecimen2.willLikelySurvive())

//create 30 instances of object
let pAequorArray = [];
for(let i=1; i<=30; i++){
  pAequorArray.push(pAequorFactory(i, mockUpStrand()));
}
