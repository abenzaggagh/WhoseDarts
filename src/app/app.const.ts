import {Codable, Game, Games} from "./models/whose-darts.model";

export const HOME : Codable[] = [
  {
    name: "Jouer",
    code: "games"
  }, {
    name: "Tournoi",
    code: "tournament"
  }, {
    name: "À Propos",
    code: "about"
  }
]

export const CHECK_OUT = [
  {
    code: "SINGLE_OUT",
    label: "Single Out"
  },
  {
    code: "DOUBLE_OUT",
    label: "Double Out"
  },
  {
    code: "MASTER_OUT",
    label: "Master Out"
  }
];

export const NB_TOURS = [
  {
    code: "10",
    label: "10"
  },
  {
    code: "15",
    label: "15"
  },
  {
    code: "20",
    label: "20"
  },
  {
    code: "25",
    label: "25"
  },
  {
    code: "INFINI",
    label: "Infini"
  }
];

export const CHECK_IN = [
  {
    code: "SINGLE_IN",
    label: "Single In"
  },
  {
    code: "DOUBLE_IN",
    label: "Double In"
  },
  {
    code: "MASTER_IN",
    label: "Master In"
  }
];

export const CRICKET_MODE = [
  {
    code: "NORMAL",
    label: "Normal"
  },
  {
    code: "CUT_THE_THROAT",
    label: "Cut The Throat"
  }, {
    code: "NO_SCORE",
    label: "Sans Score"
  },
];

export const GAMES : Game[] = [
  {
    name: "301",
    code: Games.DARTS_301
  }, {
    name: "501",
    code: Games.DARTS_501
  }, {
    name: "701",
    code: Games.DARTS_701
  }, {
    name: "1001",
    code: Games.DARTS_1001
  }, {
    name: "Cricket",
    code: Games.CRICKET
  }, {
    name: "Golf",
    code: Games.HIGH_SCORE
  }, {
    name: "Parchess",
    code: Games.PARCHESS
  }, {
    name: "High Score",
    code: Games.HIGH_SCORE
  }
]
