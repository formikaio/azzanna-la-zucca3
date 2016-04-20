import _ from 'underscore';

var broccoli = {
  privSquadName: '--',
  gu: {},
  fieldArray: [],
  tileRows: 0,

  init(gameUtils) {
    this.gu = gameUtils;
    this.fieldArray = gameUtils.getFieldArray();
    this.tileRows = gameUtils.getTileRows();
  },

  squadName() {
    return this.privSquadName;
  },

  broccoliBirthplace() {
    var self = this;

    console.log('PLEASE OVERRIDE THIS FUNCTION IN YOUR SQUAD');

    // CONTROLLO SPAZIO FINITO
    if (_.indexOf(this.fieldArray, 0) === -1) {
      return -1;
    }

    let level1 = []; // FREE SPOTS

    // POPULATE GOOD AND BEST SPOTS
    _.each(_.range(this.tileRows * this.tileRows), (pos) => {
      if (self.fieldArray[pos] === 0 && !self.gu.is_pumpkin_around(pos)) {
        level1.push(pos);
      }
    });

    // SELEZIONO UNA POSIZIONE CASUALE
    return _.sample(level1);
  },
};

export default broccoli;
