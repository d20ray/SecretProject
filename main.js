const readline = require('readline');
const candyCornLogic = require('./train/cc');
const redbullLargeWaterLogic = require('./train/rblw');
const southDakotaCrime = require('./crimeSD/bluntLw');
const sixPacksLogic = require('./train/sixPacks');
const paddysPintsLogic = require('./train/pp');
const greenEggLargeWaterLogic = require('./train/greenEggLw');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

let train = false;
let crime = false;

const promptUser = (question, callback) => {
  rl.question(question, (answer) => {
    callback(answer.trim());
  });
};

const handleTrainOptions = async () => {
  const trainOptions = `Press '1' for Candy Corn (slot 3)\nPress '2' for Paddy's Pints (slot 3)\nPress '3' for Red bull & Large Water (rb: 2, lw:3)\nPress '4' for 6 packs (slot 2 & 3)\nPress '5' for Green Eggs & Large Water (Egg: 2, Water: 3)\n`;
  const statOptions = `Press '1' for Strength\nPress '2' for Defence\nPress '3' for Speed\n`;

  let stat;

  promptUser(statOptions, async (answer) => {
    switch (answer) {
      case '1':
        stat = 4;
        break;
      case '2':
        stat = 6;
        break;
      case '3':
        stat = 5;
        break;
      default:
        console.log('Invalid choice. Please choose a valid option.');
        handleTrainOptions();
        return;
    }

    promptUser(trainOptions, async (answer) => {
      switch (answer) {
        case '1':
          candyCornLogic(stat);
          break;
        case '2':
          paddysPintsLogic(stat);
          break;
        case '3':
          redbullLargeWaterLogic(stat);
          break;
        case '4':
          sixPacksLogic(stat);
          break;
        case '5':
          greenEggLargeWaterLogic(stat);
          break;
        default:
          console.log('Invalid choice. Please choose a valid option.');
          handleTrainOptions();
          return;
      }
    });
  });
}

const handleCrimeOptions = () => {
    const crimeOptions = `Press '1' for Arbour Hill\nPress '2' for South Dakota\n`;
  
    promptUser(crimeOptions, (answer) => {
      switch (answer) {
        case '1':
          console.log('Not yet!!!!');
          handleCrimeOptions();
          break;
        case '2':
          southDakotaCrime(); 
          break;
        default:
          console.log('Invalid choice. Please choose a valid option.');
          handleCrimeOptions(); 
      }
    });
};

const handleMainOptions = () => {
  const mainOptions = `Press '1' to Train\nPress '2' to Crime\n`;

  promptUser(mainOptions, (answer) => {
    switch (answer) {
      case '1':
        train = true;
        handleTrainOptions();
        break;
      case '2':
        crime = true;
        console.log('Crime chosen');
        handleCrimeOptions();
        break;
      default:
        console.log('Invalid choice. Please choose a valid option.');
        handleMainOptions();
    }
  });
};


handleMainOptions();

