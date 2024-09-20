export const roundUpto = (number: number, upto: number) => {
  return Number(number.toFixed(upto));
};

export const isBs = (entry: dbEntry) => entry.bolivar === "Bs.";
export const isBsF = (entry: dbEntry) => entry.bolivar === "Bs. F";
export const isBsS = (entry: dbEntry) => entry.bolivar === "Bs. S";
export const isBsD = (entry: dbEntry) => entry.bolivar === "Bs. D";
