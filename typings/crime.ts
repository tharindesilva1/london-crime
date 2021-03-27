export enum CrimeType {
  ALL = "All",
  WEAPON = "Possession of weapons",
  DRUGS = "Drugs",
  BIKE_THEFT = "Bicycle theft",
  CAR_THEFT = "Vehicle crime",
  SHOPLIFT = "Shoplifting",
  DMG_AND_ARSON = "Criminal damage and arson",
  ROBBERY = "Robbery",
  PUB_ORDER = "Public order",
  V_AND_S_OFFENCES = "Violence and sexual offences",
  BURGLARY = "Burglary",
  PERSON_THEFT = "Theft from the person",
}

export type TypeCount = { type: CrimeType; count: number };
