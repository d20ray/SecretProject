const readline = require('readline');
const candyCornLogic = require('./train/cc');
const redbullLargeWaterLogic = require('./train/rblw');
const southDakotaCrime = require('./crimeSD/bluntLw');
const sixPacksLogic = require('./train/sixPacks');
const paddysPintsLogic = require('./train/pp');

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
  const trainOptions = `Press '1' for Candy Corn\nPress '2' for Paddy's Pints\nPress '3' for Red bull & Large Water\nPress '4' for 6 packs\n`;

  promptUser(trainOptions, async (answer) => {
    switch (answer) {
      case '1':
        candyCornLogic();
        break;
      case '2':
        paddysPintsLogic();
        break;
      case '3':
        redbullLargeWaterLogic();
        break;
      case '4':
        sixPacksLogic();
        break;
      default:
        console.log('Invalid choice. Please choose a valid option.');
        handleTrainOptions();
        return;
    }
  });
};

const handleCrimeOptions = () => {
    const crimeOptions = `Press '1' for Arbour Hill\nPress '2' for South Dakota\n`;
  
    promptUser(crimeOptions, (answer) => {
      switch (answer) {
        case '1':
          console.log('Not yet!!!!');
          handleCrimeOptions();
          break;
        case '2':
          console.log("South Dakota");
          confirmStaminaNerveItems();
          break;
        default:
          console.log('Invalid choice. Please choose a valid option.');
          handleCrimeOptions(); 
      }
    });
};

const confirmEnergyStaminaItems = () => {
    return new Promise((resolve) => {
      rl.question("Please confirm stamina item in quickslot 2 & energy item in quickslot 3? 'Y' or 'No':", (answer) => {
        if (answer === 'N' || answer === 'n') {
          confirmEnergyStaminaItems().then(resolve); 
        } else if (answer === 'Y' || answer === 'y') {
          resolve(true);
        } else {
          console.log('Invalid input. Please enter Y or N.');
          confirmEnergyStaminaItems().then(resolve); 
        }
      });
    });
};
  
const confirmStaminaNerveItems = () => {
    rl.question("Please confirm stamina item in quickslot 2 & nerve item in quickslot 3? 'Y' or 'No':", (answer) => {
        if (answer === 'N' || answer === 'n') {
        confirmStaminaNerveItems(); 
        } else if (answer === 'Y' || answer === 'y') {
        southDakotaCrime(); 
        rl.close();
        } else {
        console.log('Invalid input. Please enter Y or N.');
        confirmStaminaNerveItems(); 
        }
    });
};

const handleMainOptions = () => {
  const mainOptions = `Press '1' to Train\nPress '2' to Crime\nPress '3' to Return to Main Menu\n`;

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
      case '3':
        start();
        break;
      default:
        console.log('Invalid choice. Please choose a valid option.');
        handleMainOptions();
    }
  });
};


handleMainOptions();

