import _ from 'underscore';
import broccoli from './broccoli_base.js';

var myBroccoli = _.clone(broccoli);

myBroccoli.privSquadName = 'v6';

myBroccoli.broccoliBirthplace = function () {
    var self = this;

    // CONTROLLO SPAZIO FINITO
    if (_.indexOf(this.fieldArray, 0) === -1) {
      return -1;
    }

    let level1 = []; // FREE SPOTS
    let level2 = []; // + NO PIG AROUND
    let level3 = []; // + NO PIG LOOKING
    let level4 = []; // + 1 PASSO
    let level5 = []; // + 2 PASSI
    let levelUsed = [];

    // TODO MODIFICA PUMPKINS IN BROCCOLI

    // GUARDO MEGLIO 1 PASSO AVANTI
    let min_threatened_pumpkins = 99999;
    let min_threat_pos = [];
    _.each(_.range(this.tileRows*this.tileRows), function(pos) {
      let f = _.clone(self.fieldArray);
      f[pos] = 3;
      let threatened_pumpkins =
        self.gu.how_many_threatened_pumpkins(self.gu.simulate_move(f, 0)) +
        self.gu.how_many_threatened_pumpkins(self.gu.simulate_move(f, 1)) +
        self.gu.how_many_threatened_pumpkins(self.gu.simulate_move(f, 2)) +
        self.gu.how_many_threatened_pumpkins(self.gu.simulate_move(f, 3));
      if (threatened_pumpkins < min_threatened_pumpkins) {
        min_threatened_pumpkins = threatened_pumpkins;
        min_threat_pos = [pos];
      } else if (threatened_pumpkins == min_threatened_pumpkins) {
        min_threat_pos.push(pos);
      }
    });

    // GUARDO MEGLIO 2 PASSI AVANTI
    // (SOLO IL SECONDO PERCHE' FILTRO GIA' LE POSIZIONI MIGLIORI DEL PRIMO)
    let min_threatened_pumpkins2 = 99999;
    let min_threat_pos2 = [];
    _.each(_.range(this.tileRows * this.tileRows), (pos) => {
      // ELIMINO LE POSIZIONI NON IMPORTANTI (SCARTATE DAL PASSO 1)
      if (!_.contains(min_threat_pos, pos)) {
        return;
      }
      let f = _.clone(self.fieldArray);
      f[pos] = 3;
      let threatened_pumpkins2 = 0;
      _.each([0, 1, 2, 3], function(d1) {
        _.each([0, 1, 2, 3], function(d2) {
          threatened_pumpkins2 += self.gu.how_many_threatened_pumpkins(self.gu.simulate_move(self.gu.simulate_move(f, d1), d2));
        });
      });
      if (threatened_pumpkins2 < min_threatened_pumpkins2) {
        min_threatened_pumpkins2 = threatened_pumpkins2;
        min_threat_pos2 = [pos];
    } else if (threatened_pumpkins2 === min_threatened_pumpkins2) {
        min_threat_pos2.push(pos);
      }
    });

    // POPULATE GOOD AND BEST SPOTS
    _.each(_.range(this.tileRows * this.tileRows), (pos) => {
      if (self.fieldArray[pos] === 0 && !self.gu.is_pumpkin_around(pos)) {
        level1.push(pos);
        if (!self.gu.is_pig_around(pos)) {
          level2.push(pos);
          if (!self.gu.is_pig_looking(pos)) {
            level3.push(pos);
            if (_.contains(min_threat_pos, pos)) {
              level4.push(pos);
              if (_.contains(min_threat_pos2, pos)) {
                level5.push(pos);
              }
            }
          }
        }
      }
    });

    if (level5.length > 0) {
      levelUsed = level5;
    } else if (level4.length > 0) {
      levelUsed = level4;
    } else if (level3.length > 0) {
      levelUsed = level3;
    } else if (level2.length > 0) {
      levelUsed = level2;
    } else {
      levelUsed = level1;
    }

    // SELEZIONO UNA POSIZIONE CASUALE DAL LIVELLO PIU ALTO A DISPOSIZIONE
    return _.sample(levelUsed);
};

export default myBroccoli;
