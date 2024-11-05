const readline = require('readline');
const candyCornLogic = require('./train/cc');
const lollipopLogic = require('./train/lollipop');
const redbullLargeWaterLogic = require('./train/rblw');
const crime = require('./crime/crime');
const sixPacksLogic = require('./train/sixPacks');
const paddysPintsLogic = require('./train/pp');
const greenEggLargeWaterLogic = require('./train/greenEggLw');
// const mug = require('./mug/mug');

let nerve = 0;
let stam = 0;
let icu = false;
let iso = false;
let prison = "";

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

const promptUser = (question, callback) => {
  rl.question(question, (answer) => {
    callback(answer.trim());
  });
};

const handleTrainOptions = async () => {
  const statOptions = `Press '1' for Strength\nPress '2' for Defence\nPress '3' for Speed\nPress '0' for Main Menu\n`;
  const trainOptions = `Press '1' for Candy Corn (slot 3)\nPress '2' for Paddy's Pints (slot 3)\nPress '3' for Red bull & Large Water (rb: 2, lw:3)\nPress '4' for 6 packs (slot 2 & 3)\nPress '5' for Green Eggs & Large Water (egg: 2, lw: 3)\nPress '6' for Lollipops & Large Water (lp: 2, lw: 3)\nPress '0' for Main Menu\n`;

  let stat;

  promptUser(statOptions, async (answer) => {
    switch (answer) {
      case '1':
        stat = '4';
        break;
      case '2':
        stat = '6';
        break;
      case '3':
        stat = '5';
        break;
      case '0':
        handleMainOptions();
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
        case '6':
          lollipopLogic(stat);
          break;
        case '0':
          handleMainOptions();
          break;
        default:
          console.log('Invalid choice. Please choose a valid option.');
          handleTrainOptions();
          return;
      }
    });
  });
}

const handleCrimeStamOptions = () => {
  const itemOptions = `Press '1' for Large Water (slot 3)\nPress '2' for Small Water (slot 3)\nPress '3' for 100% stamina item (slot 3)\nPress '4' for 50% stamina item (slot 3)\nPress '5' for 30% stamina item (slot 3)\nPress '0' for Main Menu\n`;

  promptUser(itemOptions, (answer) => {
    switch (answer) {
      case '1':
        stam = 65;
        crime(nerve, stam, iso, icu, prison);
        break;
      case '2':
        stam = 80;
        crime(nerve, stam, iso, icu, prison);
        break;
      case '3':
        stam = 10;
        crime(nerve, stam, iso, icu, prison);
        break;
      case '4':
        stam = 50;
        crime(nerve, stam, iso, icu, prison);
        break;
      case '5':
        stam = 70;
        crime(nerve, stam, iso, icu, prison);
        break;
      case '0':
        handleMainOptions();
        break;
      default:
        console.log('Invalid choice. Please choose a valid option.');
        handleCrimeStamOptions(); 
    }
  });
};

const handleCrimeNerveOptions = () => {
  const itemOptions = `Press '1' for Candy Corn (slot 3)\nPress '2' for Paddy's Pints (slot 3)\nPress '3' for Blunts (slot 2)\nPress '4' for Pink Eggs (slot 2)\nPress '0' for Main Menu\n`;

  promptUser(itemOptions, (answer) => {
    switch (answer) {
      case '1':
        crime(nerve, stam, iso, icu, prison);
        break;
      case '2':
        icu = true;
        crime(nerve, stam, iso, icu, prison);
        break;
      case '3':
        iso = true;
        handleCrimeStamOptions();
        break;
      case '4':
        handleCrimeStamOptions();
        break;
      case '0':
        handleMainOptions();
        break;
      default:
        console.log('Invalid choice. Please choose a valid option.');
        handleCrimeNerveOptions(); 
    }
  });
};

const handlePrisonOptions = () => {
    const crimeOptions = `Press '1' for Arbour Hill\nPress '2' for South Dakota\nPress '0' for Main Menu\n`;
  
    promptUser(crimeOptions, (answer) => {
      switch (answer) {
        case '1':
          prison = "search-roof"
          nerve = 100;
          handleCrimeNerveOptions();
          break;
        case '2':
          prison = "steal-weapon"
          nerve = 20;
          handleCrimeNerveOptions(); 
          break;
        case '0':
          handleMainOptions();
          break;
        default:
          console.log('Invalid choice. Please choose a valid option.');
          handlePrisonOptions(); 
      }
    });
};

const handleMainOptions = () => {
  const mainOptions = `Press '1' to Train\nPress '2' to Crime\n`;

  promptUser(mainOptions, (answer) => {
    switch (answer) {
      case '1':
        handleTrainOptions();
        break;
      case '2':
        handlePrisonOptions();
        break;
      default:
        console.log('Invalid choice. Please choose a valid option.');
        handleMainOptions();
    }
  });
};

handleMainOptions();
