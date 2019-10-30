const radarColor = {
  goldColor: {
    start: '#ffd753',
    end: '#ecc14a',
  },
  grayColor: {
    start: '#c9c9c9',
    end: '#9b9b9b',
  },
  greenColor: {
    start: '#69ddb5',
    end: '#3bb09f',
  },
};

const getStartColor = (score) => {
  if (score >= 70) {
    return radarColor.goldColor.end;
  } if (score >= 65) {
    return radarColor.greenColor.end;
  }
  return radarColor.grayColor.end;
};

const getEndColor = (score) => {
  if (score >= 70) {
    return radarColor.goldColor.end;
  } if (score >= 65) {
    return radarColor.greenColor.end;
  }
  return radarColor.grayColor.end;
};

export {
  getStartColor,
  getEndColor,
};
