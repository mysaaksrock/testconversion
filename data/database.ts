let nextId: number = 0;
const statById: { id: string, playerName1: string, playerName2: string, playerWin: boolean, score: number }[] = [];

export const addStatisticsPlayedGame = (name1: string, name2: string, playerWin: boolean, score: number) => {
  const item = {
    id: `${nextId++}`,
    playerName1: name1,
    playerName2: name2,
    playerWin,
    score,
  };

  statById.push(item);

  return item;
};

export const getStatisticById = (id: string) => statById.filter(item => item.id === id);
export const getAllStatistic = () => statById;