// constants.js

const cropConstants = {
  banana: {
    tickValues: [6.422, 26.851, 41.10, 126.387],
    subArcLimits: [26.851, 41.10, 126.387],
    max:126.387, //done
    min: 6.422,
  },
  chilli: {
    tickValues: [0, 2, 5, 10],
    subArcLimits: [2, 5, 10], //done
    max: 10,
    min: 2,
  },
  rice: {
    tickValues: [1.416, 2.218, 3.020, 5], //done
    subArcLimits: [2.218, 3.020, 5],
    max: 5,
    min: 1.416,
  },
  corn: {
    tickValues: [1.469, 4, 6, 8],
    subArcLimits: [4, 6, 8],
    max: 8, //done
    min: 1.469,
  },
  peanut: {
    tickValues: [ 0.737, 1.360, 1.675, 3.673],
    subArcLimits: [1.360, 1.675, 3.673],
    max: 3.673, //done
    min: 0.737,
  },
  potato: {
    tickValues: [0, 13.33, 15, 18],
    subArcLimits: [13.33, 15, 18],
    max: 18,
    min: 0, //done
  },
  sugarcane: {
    tickValues: [21.1, 51.72, 73.25, 100],
    subArcLimits: [51.72, 73.25, 100],
    max: 100,
    min: 21.1
  },
  tapioca: {
    tickValues: [5.33, 16.667, 24.5, 42.097],
    subArcLimits: [16.667, 24.5, 42.097],
    max: 42.097,
    min: 5.33,
  },
  wheat: {
    tickValues: [0.92, 2.00, 2.483, 5.068],
    subArcLimits: [2.00, 2.483, 5.068],
    max: 5.068,
    min: 0.92,
  },
  sweetpotato: {
    tickValues: [4.226, 9.240, 13.0346, 20],
    subArcLimits: [9.240, 13.0346, 20],
    max: 20,
    min: 4.226,
  },
};

export default cropConstants;
